/**
 * GET /api/github/repo?owner=<o>&repo=<r>
 *
 * Pulls everything needed to draft a listing from a repo:
 *   - description
 *   - README (decoded, truncated)
 *   - importable text files (.md/.markdown/.yaml/.yml/.json/.txt/
 *     .prompt) up to a size cap, with raw download URLs so the
 *     client can fetch + attach them to the new listing.
 */
import { NextResponse } from 'next/server'
import { hasSupabase } from '@/lib/env'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

const TEXT_EXT = /\.(md|markdown|yaml|yml|json|txt|prompt)$/i
const MAX_FILE_BYTES = 200_000
const MAX_FILES = 25

async function callerGitHubToken(): Promise<string | null> {
  if (!hasSupabase) return null
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const token = user?.app_metadata?.github_access_token
    return typeof token === 'string' && token.length > 0 ? token : null
  } catch {
    return null
  }
}

async function ghHeaders() {
  const h: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'skillzy-import',
  }
  // Prefer the signed-in user's token so private repos work; otherwise
  // fall back to the platform PAT (public repos only, raises rate limit).
  const userToken = await callerGitHubToken()
  if (userToken) {
    h.Authorization = `Bearer ${userToken}`
  } else if (process.env.GITHUB_TOKEN) {
    h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  return h
}

export async function GET(req: Request) {
  const sp = new URL(req.url).searchParams
  const owner = sp.get('owner')?.trim().replace(/^@/, '')
  const repo = sp.get('repo')?.trim()
  if (
    !owner ||
    !repo ||
    !/^[A-Za-z0-9-]{1,39}$/.test(owner) ||
    !/^[A-Za-z0-9._-]{1,100}$/.test(repo)
  ) {
    return NextResponse.json({ error: 'Bad owner/repo.' }, { status: 400 })
  }

  const headers = await ghHeaders()

  try {
    const metaRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      { headers, cache: 'no-store' },
    )
    if (!metaRes.ok) {
      return NextResponse.json(
        { error: `Repo not found (${metaRes.status}).` },
        { status: metaRes.status === 404 ? 404 : 502 },
      )
    }
    const meta = await metaRes.json()
    const branch: string = meta.default_branch ?? 'main'

    // README (best-effort).
    let readme = ''
    const readmeRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      { headers, cache: 'no-store' },
    )
    if (readmeRes.ok) {
      const r = await readmeRes.json()
      if (r.content) {
        readme = Buffer.from(r.content, 'base64')
          .toString('utf8')
          .slice(0, 8000)
      }
    }

    // Recursive tree → importable text files. We fetch each file's
    // contents server-side so the import works for private repos too
    // (the browser can't authenticate to raw.githubusercontent.com).
    const treeRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
      { headers, cache: 'no-store' },
    )
    type FileOut = {
      name: string
      path: string
      size: number
      content: string
    }
    const files: FileOut[] = []
    if (treeRes.ok) {
      const tree = await treeRes.json()
      const wanted = (tree.tree ?? [])
        .filter(
          (n: { type: string; path: string; size?: number }) =>
            n.type === 'blob' &&
            TEXT_EXT.test(n.path) &&
            (n.size ?? 0) <= MAX_FILE_BYTES,
        )
        .slice(0, MAX_FILES) as Array<{ path: string; size?: number }>

      // Pull each file via the Contents API in parallel — works for
      // private repos when the caller is authenticated. Skip silently
      // on per-file errors so one bad file doesn't kill the import.
      const fetched = await Promise.all(
        wanted.map(async (n) => {
          try {
            const fileRes = await fetch(
              `https://api.github.com/repos/${owner}/${repo}/contents/${n.path}?ref=${branch}`,
              { headers, cache: 'no-store' },
            )
            if (!fileRes.ok) return null
            const body = (await fileRes.json()) as {
              content?: string
              encoding?: string
            }
            if (!body.content) return null
            const text = Buffer.from(body.content, body.encoding === 'base64' ? 'base64' : 'utf8').toString('utf8')
            return {
              name: n.path.split('/').pop() as string,
              path: n.path,
              size: n.size ?? text.length,
              content: text,
            } as FileOut
          } catch {
            return null
          }
        }),
      )
      for (const f of fetched) if (f) files.push(f)
    }

    return NextResponse.json({
      name: repo,
      description: (meta.description as string) ?? '',
      homepage: (meta.homepage as string) ?? '',
      private: !!meta.private,
      readme,
      files,
    })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
