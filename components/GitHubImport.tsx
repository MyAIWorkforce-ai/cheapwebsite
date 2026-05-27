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

type RepoFile = {
  name: string
  path: string
  size: number
  content: string
}

// One-click "bring your GitHub skill into Skillzy". Lists a creator's
// public repos, then pulls a chosen repo's README + text files,
// turns them into real File objects + a brief, and hands them up to
// the New Listing form (which then drafts the listing with AI).
export default function GitHubImport({
  defaultUsername,
  onImport,
  embedded = false,
}: {
  defaultUsername?: string
  onImport: (files: File[], brief: string) => void
  // When embedded inside the form (next to the file-drop), render without
  // the standalone full-width section wrapper so it inherits the form's
  // column width and spacing.
  embedded?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState(defaultUsername ?? '')
  const [repos, setRepos] = useState<Repo[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [importing, setImporting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState<string | null>(null)
  // File picker: after choosing a repo we fetch its files and let the
  // creator pick which to include — one file for a single skill, or
  // several to bundle (e.g. an Agent Setup).
  const [picker, setPicker] = useState<{
    repo: string
    description: string
    readme: string
    files: RepoFile[]
  } | null>(null)
  const [selected, setSelected] = useState<Set<string>>(new Set())

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

  // Step 1: fetch the repo's importable files, then open the picker.
  // The API returns each file's text content inline (so private repos
  // work too — the browser can't auth to raw.githubusercontent.com).
  async function loadRepo(owner: string, repo: string) {
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
      const files = ((json.files ?? []) as RepoFile[]).filter((f) => f.content)
      if (files.length === 0) {
        setError(
          'No importable files (.md, .json, .yaml, .txt) found in that repo.',
        )
        return
      }
      setPicker({
        repo,
        description: json.description ?? '',
        readme: json.readme ?? '',
        files,
      })
      // Default to everything selected (preserves the old one-click feel).
      setSelected(new Set(files.map((f) => f.path)))
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setImporting(null)
    }
  }

  function toggle(path: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(path)) next.delete(path)
      else next.add(path)
      return next
    })
  }

  // Step 2: assemble the chosen files into the listing. Brief includes
  // the selected files' content (truncated) so the AI draft reflects
  // exactly what was picked — vital when one skill is chosen from a
  // multi-skill repo.
  function confirmImport() {
    if (!picker) return
    const chosen = picker.files.filter((f) => selected.has(f.path))
    if (chosen.length === 0) return

    const files = chosen.map(
      (f) => new File([f.content], f.name, { type: 'text/plain' }),
    )

    const filesText = chosen
      .map((f) => `--- ${f.name} ---\n${f.content}`)
      .join('\n\n')
      .slice(0, 60000)
    const brief = [
      picker.description ? `Repo: ${picker.description}` : '',
      picker.readme ? `README:\n${picker.readme}` : '',
      filesText ? `FILES:\n${filesText}` : '',
    ]
      .filter(Boolean)
      .join('\n\n')

    onImport(files, brief)
    const repo = picker.repo
    setPicker(null)
    setDone(
      `Added ${files.length} file${files.length === 1 ? '' : 's'} from ${repo}. Scroll down — fields are pre-filled. Hit "Draft with AI" to polish, set a price, submit.`,
    )
  }

  const content = (
    <>
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
                {loading ? (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="inline-block animate-spin">✿</span> Loading…
                  </span>
                ) : (
                  'Find my repos'
                )}
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

            {!picker && repos && repos.length > 0 && (
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
                      onClick={() => loadRepo(username.trim(), r.name)}
                      disabled={importing !== null}
                      className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors disabled:opacity-50"
                    >
                      {importing === r.name ? (
                        <span className="inline-flex items-center gap-1.5">
                          <span className="inline-block animate-spin">✿</span> Loading…
                        </span>
                      ) : (
                        'Choose →'
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {picker && (
              <div className="mt-6 border border-brand-ink bg-white">
                <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-brand-hairline">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted truncate">
                    Choose files from {picker.repo}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setPicker(null)
                      setError(null)
                    }}
                    className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted hover:text-brand-ink transition-colors"
                  >
                    ← Back
                  </button>
                </div>

                <div className="flex items-center gap-4 px-4 py-2 border-b border-brand-hairline">
                  <button
                    type="button"
                    onClick={() =>
                      setSelected(new Set(picker.files.map((f) => f.path)))
                    }
                    className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-muted hover:text-brand-gold transition-colors"
                  >
                    Select all
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelected(new Set())}
                    className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-muted hover:text-brand-gold transition-colors"
                  >
                    Clear
                  </button>
                  <span className="ml-auto text-[11px] text-brand-muted">
                    {selected.size} of {picker.files.length} selected
                  </span>
                </div>

                <ul className="max-h-[300px] overflow-auto divide-y divide-brand-hairline">
                  {picker.files.map((f) => (
                    <li key={f.path}>
                      <label className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-brand-cream-card">
                        <input
                          type="checkbox"
                          checked={selected.has(f.path)}
                          onChange={() => toggle(f.path)}
                          className="accent-brand-gold w-4 h-4 shrink-0"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="font-mono text-sm block truncate">
                            {f.name}
                          </span>
                          {f.path !== f.name && (
                            <span className="text-[11px] text-brand-muted block truncate">
                              {f.path}
                            </span>
                          )}
                        </span>
                        <span className="shrink-0 text-[11px] text-brand-muted">
                          {(f.size / 1024).toFixed(0)} KB
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-brand-hairline">
                  <p className="text-[11px] text-brand-muted">
                    Pick one for a single skill, or several to bundle.
                  </p>
                  <button
                    type="button"
                    onClick={confirmImport}
                    disabled={selected.size === 0}
                    className="shrink-0 bg-brand-gold text-brand-ink font-semibold px-5 py-2.5 text-sm hover:bg-brand-gold-dark transition-colors disabled:opacity-50"
                  >
                    Import {selected.size} selected →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
    </>
  )

  if (embedded) return content

  return (
    <section className="px-6 lg:px-10 pt-10 sm:pt-12">
      <div className="max-w-page mx-auto">{content}</div>
    </section>
  )
}
