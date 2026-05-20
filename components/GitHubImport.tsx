'use client'

import { useState } from 'react'

type Repo = {
  name: string
  fullName: string
  description: string
  url: string
  updated: string
  language: string
  stars: number
}

// One-click "bring your GitHub skill into Skillzy". Lists a creator's
// public repos, then pulls a chosen repo's README + text files,
// turns them into real File objects + a brief, and hands them up to
// the New Listing form (which then drafts the listing with AI).
export default function GitHubImport({
  defaultUsername,
  onImport,
}: {
  defaultUsername?: string
  onImport: (files: File[], brief: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState(defaultUsername ?? '')
  const [repos, setRepos] = useState<Repo[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [importing, setImporting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState<string | null>(null)

  async function fetchRepos() {
    if (!username.trim()) {
      setError('Enter your GitHub username.')
      return
    }
    setLoading(true)
    setError(null)
    setRepos(null)
    try {
      const res = await fetch(
        `/api/github/repos?username=${encodeURIComponent(username.trim())}`,
      )
      const json = await res.json()
      if (!res.ok) {
        setError(json.error ?? `Failed (${res.status})`)
        return
      }
      setRepos(json.repos as Repo[])
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  async function importRepo(owner: string, repo: string) {
    setImporting(repo)
    setError(null)
    setDone(null)
    try {
      const res = await fetch(
        `/api/github/repo?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`,
      )
      const json = await res.json()
      if (!res.ok) {
        setError(json.error ?? `Failed (${res.status})`)
        return
      }

      // Pull each importable file's raw content into a real File.
      const files: File[] = []
      for (const f of (json.files ?? []) as {
        name: string
        rawUrl: string
      }[]) {
        try {
          const r = await fetch(f.rawUrl)
          if (!r.ok) continue
          const text = await r.text()
          files.push(
            new File([text], f.name, { type: 'text/plain' }),
          )
        } catch {
          /* skip a file that won't fetch */
        }
      }

      const brief = [
        json.description ? `Repo: ${json.description}` : '',
        json.readme ? `README:\n${json.readme}` : '',
      ]
        .filter(Boolean)
        .join('\n\n')

      onImport(files, brief)
      setDone(
        `Imported ${files.length} file${files.length === 1 ? '' : 's'} from ${repo}. Scroll down — fields are pre-filled. Hit "Draft with AI" to polish, set a price, submit.`,
      )
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setImporting(null)
    }
  }

  return (
    <section className="px-6 lg:px-10 pt-10 sm:pt-12">
      <div className="max-w-page mx-auto">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-4 border border-brand-ink bg-brand-cream-card px-6 py-5 text-left hover:bg-white transition-colors"
        >
          <span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              Came from GitHub?
            </span>
            <span
              className="block font-display text-2xl mt-1 tracking-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              Import a repo in one click.
            </span>
          </span>
          <span aria-hidden className="text-2xl text-brand-muted">
            {open ? '–' : '+'}
          </span>
        </button>

        {open && (
          <div className="border border-t-0 border-brand-ink bg-brand-cream-card p-6 sm:p-7">
            <p className="text-sm text-brand-muted leading-relaxed">
              Already built skills on GitHub? Pull a repo straight in —
              we&rsquo;ll grab the README and the SKILL.md / config files and
              pre-fill your listing. You set the price and get paid. No
              copy-pasting.
            </p>

            <div className="mt-5 flex items-stretch gap-3 max-w-md">
              <div className="flex items-center gap-2 flex-1 border-b border-brand-ink">
                <span className="text-brand-muted">@</span>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="your-github-username"
                  className="flex-1 bg-transparent outline-none py-2 text-sm font-mono"
                />
              </div>
              <button
                type="button"
                onClick={fetchRepos}
                disabled={loading}
                className="shrink-0 bg-brand-gold text-brand-ink font-semibold px-5 py-2.5 text-sm hover:bg-brand-gold-dark transition-colors disabled:opacity-60"
              >
                {loading ? 'Loading…' : 'Find my repos'}
              </button>
            </div>

            {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
            {done && (
              <p className="mt-4 text-sm text-brand-gold-dark">{done}</p>
            )}

            {repos && repos.length === 0 && (
              <p className="mt-4 text-sm text-brand-muted">
                No public repos found for that user.
              </p>
            )}

            {repos && repos.length > 0 && (
              <ul className="mt-6 divide-y divide-brand-hairline border-y border-brand-hairline max-h-[420px] overflow-auto">
                {repos.map((r) => (
                  <li
                    key={r.fullName}
                    className="py-4 flex items-start justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <p className="font-mono text-sm truncate">{r.name}</p>
                      {r.description && (
                        <p className="text-xs text-brand-muted mt-0.5 line-clamp-2">
                          {r.description}
                        </p>
                      )}
                      <p className="text-[11px] text-brand-muted mt-1">
                        {r.language && `${r.language} · `}★ {r.stars}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => importRepo(username.trim(), r.name)}
                      disabled={importing !== null}
                      className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors disabled:opacity-50"
                    >
                      {importing === r.name ? 'Importing…' : 'Import →'}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
