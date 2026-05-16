'use client'

import { useState } from 'react'

// Seller distribution kit: the direct purchase link + a QR that
// points at it, both carrying ?ref=<handle> so sales driven through
// the seller's own channels attribute back to them.
export default function ShareListing({
  slug,
  refHandle,
}: {
  slug: string
  refHandle?: string
}) {
  const [copied, setCopied] = useState(false)

  const base =
    typeof window !== 'undefined' ? window.location.origin : 'https://skillzy.ai'
  const ref = refHandle ? `?ref=${encodeURIComponent(refHandle)}` : ''
  const link = `${base}/marketplace/${slug}${ref}`
  const qrSrc = `/marketplace/${slug}/qr${ref}`

  async function copy() {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked — user can still select the text */
    }
  }

  return (
    <div className="border border-brand-ink bg-brand-cream-card p-6 sm:p-7">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
        Sell it yourself
      </span>
      <h3
        className="font-display text-2xl mt-2 tracking-tight"
        style={{ letterSpacing: '-0.02em' }}
      >
        Your link & QR.
      </h3>
      <p className="mt-2 text-sm text-brand-muted leading-relaxed">
        Drop this link in your bio, emails, or DMs — or print the QR for a
        flyer, card, or van. Every sale through it is tracked to you.
      </p>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 items-start">
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
                onClick={copy}
                className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] px-3 hover:text-brand-gold transition-colors"
              >
                {copied ? 'Copied' : 'Copy'}
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
          alt={`QR code linking to the ${slug} listing`}
          width={132}
          height={132}
          className="border border-brand-hairline bg-white p-2 self-center sm:self-start"
        />
      </div>
    </div>
  )
}
