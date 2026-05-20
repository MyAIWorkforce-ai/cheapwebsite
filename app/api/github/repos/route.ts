/**
 * GET /api/github/repos
 *
 * Two modes:
 *   - If the caller is signed in via GitHub (we stored their access
 *     token at auth callback time in app_metadata.github_access_token),
 *     return THEIR repos (including private) via /user/repos.
 *   - Otherwise, fall back to the public-only `?username=…` listing
 *     via /users/<username>/repos.
 *
 * The platform GITHUB_TOKEN PAT is used as a final fallback to raise
 * the anonymous rate limit (60 → 5000/hr); it only sees public repos.
 */
import { NextResponse } from 'next/server'
import { hasSupabase } from '@/lib/env'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

type Repo = {
  name: string
  full_name: string
  description: string | null
  html_url: string
  updated_at: string
  language: string | null
  stargazers_count: number
  fork: boolean
  archived: boolean
  private: boolean
}

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

export async function GET(req: Request) {
  const username = new URL(req.url).searchParams
    .get('username')
    ?.trim()
    .replace(/^@/, '')

  const userToken = await callerGitHubToken()

  // Build the request. If the caller is signed-in via GitHub use
  // their token + their authenticated repo list (includes private).
  // Otherwise fall back to anonymous public listing for the supplied
  // username.
  let url: string
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'skillzy-import',
  }

  if (userToken) {
    url =
      'https://api.github.com/user/repos?per_page=100&sort=updated&visibility=all&affiliation=owner,collaborator'
    headers.Authorization = `Bearer ${userToken}`
  } else {
    if (!username || !/^[A-Za-z0-9-]{1,39}$/.test(username)) {
      return NextResponse.json(
        { error: 'Sign in with GitHub or enter a valid username.' },
        { status: 400 },
      )
    }
    url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }
  }

  try {
    const res = await fetch(url, { headers, cache: 'no-store' })
    if (res.status === 401) {
      return NextResponse.json(
        { error: 'Your GitHub session expired. Sign in again.' },
        { status: 401 },
      )
    }
    if (res.status === 404) {
      return NextResponse.json({ error: 'No such GitHub user.' }, { status: 404 })
    }
    if (res.status === 403) {
      return NextResponse.json(
        { error: 'GitHub rate limit hit. Try again shortly.' },
        { status: 429 },
      )
    }
    if (!res.ok) {
      return NextResponse.json(
        { error: `GitHub error (${res.status}).` },
        { status: 502 },
      )
    }
    const raw = (await res.json()) as Repo[]
    const repos = raw
      .filter((r) => !r.fork && !r.archived)
      .map((r) => ({
        name: r.name,
        fullName: r.full_name,
        description: r.description ?? '',
        url: r.html_url,
        updated: r.updated_at,
        language: r.language ?? '',
        stars: r.stargazers_count,
        private: !!r.private,
      }))
    return NextResponse.json({ repos })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
