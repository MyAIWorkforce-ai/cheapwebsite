'use client'

import { useState } from 'react'

/**
 * Affiliate tab content. Every Skillzy account gets this — share your
 * link, earn 5% of the sales of any creator who signs up through it.
 * (12-month window is fine-print, not shown here.) Works for pure
 * influencers too: you don't need to sell anything to refer.
 */
export default function AffiliatePanel({
  handle,
  referredCount,
  pendingCents,
  paidCents,
  payoutsEnabled,
}: {
  handle?: string
  referredCount: number
  pendingCents: number
  paidCents: number
  payoutsEnabled: boolean
}) {
  const [copied, setCopied] = useState(false)
  const code = (handle ?? '').replace(/^@/, '')
  const link = code ? `https://skillzy.ai/?aff=${encodeURIComponent(code)}` : ''

  function copy() {
    if (!link) return
    navigator.clipboard?.writeText(link).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  const money = (c: number) =>
    `$${(c / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

  return (
    <div className="max-w-3xl">
      <h2
        className="font-display text-3xl sm:text-4xl tracking-tight"
        style={{ letterSpacing: '-0.03em' }}
      >
        Refer creators. <em className="italic text-brand-gold font-medium">Earn 5%.</em>
      </h2>
      <p className="mt-3 text-brand-muted max-w-prose leading-relaxed">
        Share your link. Anyone who signs up and sells through it earns
        you 5% of their sales — paid on top of anything you make selling
        your own. You don&rsquo;t need to list a thing to earn.
      </p>

      {/* The link */}
      <div className="mt-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
          Your affiliate link
        </span>
        {link ? (
          <div className="mt-2 flex items-stretch gap-2 max-w-xl">
            <input
              readOnly
              value={link}
              className="flex-1 bg-transparent border-b border-brand-hairline py-2 text-sm font-mono text-brand-ink outline-none"
            />
            <button
              type="button"
              onClick={copy}
              className="shrink-0 bg-brand-gold text-brand-ink font-semibold px-5 py-2 text-sm hover:bg-brand-gold-dark transition-colors"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        ) : (
          <p className="mt-2 text-sm text-brand-muted">
            Set a handle on your account to get your affiliate link.
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-px bg-brand-hairline border border-brand-hairline">
        <div className="bg-brand-cream-card p-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
            Creators referred
          </span>
          <p className="font-display text-4xl mt-2" style={{ letterSpacing: '-0.03em' }}>
            {referredCount}
          </p>
        </div>
        <div className="bg-brand-cream-card p-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
            Pending
          </span>
          <p
            className="font-display text-4xl mt-2 text-brand-gold"
            style={{ letterSpacing: '-0.03em' }}
          >
            {money(pendingCents)}
          </p>
          <p className="mt-1 text-xs text-brand-muted">Not yet paid out</p>
        </div>
        <div className="bg-brand-cream-card p-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
            Paid
          </span>
          <p className="font-display text-4xl mt-2" style={{ letterSpacing: '-0.03em' }}>
            {money(paidCents)}
          </p>
        </div>
      </div>

      {/* Cash out */}
      {!payoutsEnabled && (pendingCents > 0 || referredCount > 0) && (
        <div className="mt-8 border-2 border-brand-gold bg-brand-gold/10 p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            To get paid
          </p>
          <p className="mt-2 text-sm text-brand-ink leading-relaxed">
            Connect Stripe to cash out your affiliate earnings — same
            one-click setup creators use. You only need it when you&rsquo;re
            ready to withdraw.
          </p>
          <a
            href="/dashboard/payouts"
            className="mt-4 inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-6 py-3 text-sm hover:bg-brand-gold-dark transition-colors"
          >
            Connect Stripe <span aria-hidden>→</span>
          </a>
        </div>
      )}

      <div className="mt-10 p-5 bg-brand-cream-card border border-brand-hairline text-sm text-brand-muted leading-relaxed">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold block mb-2">
          How it works
        </span>
        Share your link anywhere — socials, your audience, DMs. When
        someone signs up through it and sells on Skillzy, you earn 5% of
        their sales. It never comes out of their cut. Pending earnings
        become payable once approved, then pay out to your Stripe on the
        usual schedule.
      </div>
    </div>
  )
}
