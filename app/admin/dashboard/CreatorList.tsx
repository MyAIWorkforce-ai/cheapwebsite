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
  // Which payout rail this creator is on:
  //   'stripe' — Stripe Connect enabled (payouts route via destination charge)
  //   'wise'   — Wise Business API (payouts route via nightly cron)
  //   'none'   — no payout method set (sales collect on the platform per §6)
  // Kept as a distinct field from `connected` so a creator on Wise
  // isn't mislabeled "no payout" just because Stripe isn't linked.
  payoutMethod: 'stripe' | 'wise' | 'none'
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
              <span className="min-w-0 flex items-center gap-2">
                {/* Payout-method badge — instantly scannable which rail
                    each creator is on. Stripe = gold (Skillzy default),
                    Wise = navy (international), None = outlined (not
                    payout-ready). Using text labels so it stays
                    readable in mono-typography contexts. */}
                <PayoutBadge method={c.payoutMethod} />
                <span className="min-w-0 flex-1">
                  <Link
                    href={`/admin/creators/${c.id}`}
                    className="font-mono text-sm border-b border-brand-ink/30 hover:text-brand-gold hover:border-brand-gold break-all"
                  >
                    {c.email}
                  </Link>
                  <span className="block text-xs text-brand-muted mt-0.5 truncate">
                    {c.name}
                    {c.handle !== '—' ? ` · @${c.handle}` : ''}
                    {c.payoutMethod === 'none' && c.sales > 0 ? ' · no payout method' : ''}
                  </span>
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

function PayoutBadge({ method }: { method: 'stripe' | 'wise' | 'none' }) {
  const config = {
    stripe: {
      label: 'STRIPE',
      title: 'Stripe Connect — payouts route via destination charge',
      className: 'bg-brand-gold border-brand-gold text-brand-ink',
    },
    wise: {
      label: 'WISE',
      title: 'Wise — international rail, payouts fired by nightly cron',
      className: 'bg-brand-navy border-brand-navy text-brand-cream',
    },
    none: {
      label: '—',
      title: 'No payout method set — sales stay on the platform',
      className: 'border-brand-hairline text-brand-muted bg-transparent',
    },
  }[method]
  return (
    <span
      aria-label={config.title}
      title={config.title}
      className={
        'shrink-0 inline-flex items-center justify-center min-w-[52px] px-1.5 py-0.5 border font-mono text-[10px] uppercase tracking-[0.12em] leading-none ' +
        config.className
      }
    >
      {config.label}
    </span>
  )
}
