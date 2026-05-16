'use client'

import { useState } from 'react'

// Creator distribution kit: the direct purchase link + a QR that
// points at it (both carrying ?ref=<handle> for attribution), PLUS
// a where-to-post checklist and ready-to-paste promo copy. The whole
// point is to remove every excuse not to distribute.
export default function ShareListing({
  slug,
  refHandle,
  title,
  tagline,
}: {
  slug: string
  refHandle?: string
  title: string
  tagline: string
}) {
  const [copied, setCopied] = useState<string | null>(null)

  const base =
    typeof window !== 'undefined' ? window.location.origin : 'https://skillzy.ai'

  // Per-surface tagged links — ?ref attributes to the creator, ?c
  // tells them which channel actually converted.
  function mk(channel: string) {
    const qs = new URLSearchParams()
    if (refHandle) qs.set('ref', refHandle.replace(/^@/, ''))
    qs.set('c', channel)
    return `${base}/marketplace/${slug}?${qs.toString()}`
  }
  const refQ = (channel: string) => {
    const qs = new URLSearchParams()
    if (refHandle) qs.set('ref', refHandle.replace(/^@/, ''))
    qs.set('c', channel)
    return `?${qs.toString()}`
  }

  const link = mk('link')
  const qrSrc = `/marketplace/${slug}/qr${refQ('qr')}`
  const shortLink = mk('social')
  const longLink = mk('post')

  const shortPromo = `Just listed "${title}" on Skillzy — ${tagline} Drop it into your agent: ${shortLink}`
  const longPromo = `I put "${title}" on Skillzy.\n\n${tagline}\n\nIt's a drop-in agent skill — no setup tutorial, no DIY. Paste it into Claude / OpenClaw / n8n and it just works.\n\nGrab it here: ${longLink}`

  async function copy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied((k) => (k === key ? null : k)), 1800)
    } catch {
      /* clipboard blocked — text is still selectable */
    }
  }

  const channels = [
    'Instagram — bio link + a story with the QR',
    'LinkedIn — post the long version, tag the niche',
    'X / Twitter — the short version + the square image',
    'Facebook groups for your trade',
    'Your email signature + your next newsletter',
    'WhatsApp / SMS to past clients who’d use it',
    'Printed: business card, flyer, A-frame, the van',
    'Any forum, Slack, or Discord where your buyers hang out',
  ]

  return (
    <div className="border border-brand-ink bg-brand-cream-card p-6 sm:p-7">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
        Sell it yourself
      </span>
      <h3
        className="font-display text-2xl mt-2 tracking-tight"
        style={{ letterSpacing: '-0.02em' }}
      >
        Your link, QR &amp; promo kit.
      </h3>
      <p className="mt-2 text-sm text-brand-muted leading-relaxed">
        You earn the same 80% whether Skillzy sends the buyer or you do —
        so send them. Everything below already has your referral baked in,
        so every sale you drive is tracked to you.
      </p>

      {/* link + QR */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 items-start">
        <div>
          <label className="block">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
              Direct purchase link
            </span>
            <div className="mt-2 flex items-stretch border-b border-brand-ink">
              <input
                readOnly
                value={link}
                onFocus={(e) => e.currentTarget.select()}
                className="flex-1 bg-transparent outline-none py-2 text-sm font-mono truncate"
              />
              <button
                type="button"
                onClick={() => copy(link, 'link')}
                className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] px-3 hover:text-brand-gold transition-colors"
              >
                {copied === 'link' ? 'Copied' : 'Copy'}
              </button>
            </div>
          </label>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={qrSrc}
              download={`skillzy-${slug}-qr.png`}
              className="font-mono text-[11px] uppercase tracking-[0.18em] border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
            >
              ↓ Download QR
            </a>
            <a
              href={`/marketplace/${slug}/share-square`}
              download={`skillzy-${slug}-square.png`}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted hover:text-brand-ink transition-colors"
            >
              Square image
            </a>
            <a
              href={`/marketplace/${slug}/share-wide`}
              download={`skillzy-${slug}-wide.png`}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted hover:text-brand-ink transition-colors"
            >
              Wide image
            </a>
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={qrSrc}
          alt={`QR code linking to ${title}`}
          width={132}
          height={132}
          className="border border-brand-hairline bg-white p-2 self-center sm:self-start"
        />
      </div>

      {/* ready-to-paste promo copy */}
      <div className="mt-7 border-t border-brand-hairline pt-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
          Copy &amp; paste this
        </span>
        <div className="mt-3 space-y-4">
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                Short — X, SMS, Instagram caption
              </span>
              <button
                type="button"
                onClick={() => copy(shortPromo, 'short')}
                className="font-mono text-[11px] uppercase tracking-[0.18em] hover:text-brand-gold transition-colors"
              >
                {copied === 'short' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="mt-2 text-sm bg-white border border-brand-hairline p-3 leading-relaxed">
              {shortPromo}
            </p>
          </div>
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                Long — LinkedIn, email, newsletter
              </span>
              <button
                type="button"
                onClick={() => copy(longPromo, 'long')}
                className="font-mono text-[11px] uppercase tracking-[0.18em] hover:text-brand-gold transition-colors"
              >
                {copied === 'long' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="mt-2 text-sm bg-white border border-brand-hairline p-3 leading-relaxed whitespace-pre-line">
              {longPromo}
            </p>
          </div>
        </div>
      </div>

      {/* where to post it */}
      <div className="mt-7 border-t border-brand-hairline pt-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
          Post it in these 8 spots — first 24 hours
        </span>
        <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-brand-muted">
          {channels.map((c, i) => (
            <li key={i} className="flex items-start gap-2">
              <span aria-hidden className="text-brand-gold mt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-brand-muted">
          The creators who sell most aren’t the best builders — they’re the
          ones who posted the link everywhere in week one.
        </p>
      </div>
    </div>
  )
}
