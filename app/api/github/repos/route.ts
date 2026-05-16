/**
 * GET /api/github/repos?username=<gh-username>
 *
 * Lists a user's public repositories so a creator can pick one to
 * turn into a Skillzy listing. Unauthenticated GitHub API is fine
 * for public repos (60 req/hr/IP); set GITHUB_TOKEN in env to raise
 * the limit to 5000/hr.
 */
import { NextResponse } from 'next/server'

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
}

export async function GET(req: Request) {
  const username = new URL(req.url).searchParams
    .get('username')
    ?.trim()
    .replace(/^@/, '')
  if (!username || !/^[A-Za-z0-9-]{1,39}$/.test(username)) {
    return NextResponse.json({ error: 'Enter a valid GitHub username.' }, { status: 400 })
  }

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'skillzy-import',
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
      { headers, cache: 'no-store' },
    )
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
      }))
    return NextResponse.json({ repos })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
