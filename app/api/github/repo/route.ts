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

export const runtime = 'nodejs'

const TEXT_EXT = /\.(md|markdown|yaml|yml|json|txt|prompt)$/i
const MAX_FILE_BYTES = 200_000
const MAX_FILES = 25

function ghHeaders() {
  const h: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'skillzy-import',
  }
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
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

  const headers = ghHeaders()

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

    // Recursive tree → importable text files.
    const treeRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
      { headers, cache: 'no-store' },
    )
    let files: { name: string; path: string; size: number; rawUrl: string }[] =
      []
    if (treeRes.ok) {
      const tree = await treeRes.json()
      files = (tree.tree ?? [])
        .filter(
          (n: { type: string; path: string; size?: number }) =>
            n.type === 'blob' &&
            TEXT_EXT.test(n.path) &&
            (n.size ?? 0) <= MAX_FILE_BYTES,
        )
        .slice(0, MAX_FILES)
        .map((n: { path: string; size?: number }) => ({
          name: n.path.split('/').pop() as string,
          path: n.path,
          size: n.size ?? 0,
          rawUrl: `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${n.path}`,
        }))
    }

    return NextResponse.json({
      name: repo,
      description: (meta.description as string) ?? '',
      homepage: (meta.homepage as string) ?? '',
      readme,
      files,
    })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
