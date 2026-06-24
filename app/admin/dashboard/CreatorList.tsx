'use client'

import { useState } from 'react'
import Link from 'next/link'

type CreatorRow = {
  id: string
  email: string
  name: string
  handle: string
  joined: string
  listings: number
  sales: number
  purchases: number
  connected: boolean
}

// Two views over the same roster:
//   - 'accounts'  → every signed-up user, with listings + sales + bought
//   - 'creators'  → only accounts with at least one listing
// Both share the same row shape; the wrapper filters + relabels.
type Mode = 'accounts' | 'creators'

export default function CreatorList({
  creators,
  mode = 'accounts',
}: {
  creators: CreatorRow[]
  mode?: Mode
}) {
  const [q, setQ] = useState('')
  const rows = mode === 'creators' ? creators.filter((c) => c.listings > 0) : creators
  const term = q.trim().toLowerCase()
  const filtered = term
    ? rows.filter(
        (c) =>
          c.email.toLowerCase().includes(term) ||
          c.name.toLowerCase().includes(term) ||
          c.handle.toLowerCase().includes(term),
      )
    : rows

  const heading = mode === 'creators' ? 'Creators' : 'Accounts'
  const emptyAll = mode === 'creators' ? 'No creators yet.' : 'No accounts yet.'

  return (
    <div>
      <div className="flex items-end justify-between gap-4 flex-wrap mb-4">
        <h2
          className="font-display text-2xl tracking-tight"
          style={{ letterSpacing: '-0.02em' }}
        >
          {heading} ({rows.length})
        </h2>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by email, name, or handle…"
          aria-label={`Search ${heading.toLowerCase()}`}
          className="w-full sm:w-80 bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-sm placeholder:text-brand-muted/60"
        />
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-brand-muted">{emptyAll}</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-brand-muted">No {heading.toLowerCase()} match “{q}”.</p>
      ) : (
        <ul className="divide-y divide-brand-hairline border-y border-brand-hairline">
          {filtered.map((c) => (
            <li
              key={c.id}
              className="py-3 flex items-baseline justify-between gap-4"
            >
              <span className="min-w-0">
                <Link
                  href={`/admin/creators/${c.id}`}
                  className="font-mono text-sm border-b border-brand-ink/30 hover:text-brand-gold hover:border-brand-gold break-all"
                >
                  {c.email}
                </Link>
                <span className="block text-xs text-brand-muted mt-0.5 truncate">
                  {c.name}
                  {c.handle !== '—' ? ` · @${c.handle}` : ''}
                  {!c.connected && c.sales > 0 ? ' · no payout' : ''}
                </span>
              </span>
              <span className="font-mono text-xs text-brand-muted shrink-0 text-right">
                {c.listings} listing{c.listings === 1 ? '' : 's'} · {c.sales}{' '}
                sale{c.sales === 1 ? '' : 's'} · {c.purchases} bought
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
