'use client'

import Link from 'next/link'
import { useState } from 'react'

// Catalogue-wide share kit: one link + QR for a creator's entire
// profile, plus paste-ready promo and a link to the printable poster.
export default function ProfileShareKit({
  handle,
  name,
}: {
  handle?: string
  name: string
}) {
  const [copied, setCopied] = useState<string | null>(null)

  if (!handle) {
    return (
      <div className="border border-brand-ink bg-brand-cream-card p-6 sm:p-7">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
          Your catalogue link
        </span>
        <p className="mt-3 text-sm text-brand-muted">
          Set a handle first — it becomes your public profile URL and
          unlocks your catalogue-wide link, QR, and printable poster.
        </p>
        <Link
          href="/account"
          className="mt-4 inline-block text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
        >
          Set your handle →
        </Link>
      </div>
    )
  }

  const clean = handle.replace(/^@/, '')
  const base =
    typeof window !== 'undefined' ? window.location.origin : 'https://skillzy.ai'
  const refQ = `?ref=${encodeURIComponent(clean)}&c=profile`
  const link = `${base}/creator/${clean}${refQ}`
  const qrSrc = `/creator/${clean}/qr${refQ}`

  const promo = `All my AI agent skills, in one place on Skillzy. Drop-in, no setup tutorials. ${link}`

  async function copy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied((k) => (k === key ? null : k)), 1800)
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <div className="border border-brand-ink bg-brand-cream-card p-6 sm:p-7">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
        Your whole catalogue
      </span>
      <h3
        className="font-display text-2xl mt-2 tracking-tight"
        style={{ letterSpacing: '-0.02em' }}
      >
        One link for everything you sell.
      </h3>
      <p className="mt-2 text-sm text-brand-muted leading-relaxed">
        This points at your full profile — every listing you have, now and
        future. Put it in your bio. Referral is baked in.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 items-start">
        <div>
          <div className="flex items-stretch border-b border-brand-ink">
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

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={qrSrc}
              download={`skillzy-${clean}-qr.png`}
              className="font-mono text-[11px] uppercase tracking-[0.18em] border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
            >
              ↓ Download QR
            </a>
            <Link
              href={`/creator/${clean}/poster`}
              className="font-mono text-[11px] uppercase tracking-[0.18em] border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
            >
              Printable poster →
            </Link>
            <button
              type="button"
              onClick={() => copy(promo, 'promo')}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted hover:text-brand-ink transition-colors"
            >
              {copied === 'promo' ? 'Promo copied' : 'Copy promo text'}
            </button>
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={qrSrc}
          alt={`QR code linking to ${name}'s Skillzy profile`}
          width={132}
          height={132}
          className="border border-brand-hairline bg-white p-2 self-center sm:self-start"
        />
      </div>
    </div>
  )
}
