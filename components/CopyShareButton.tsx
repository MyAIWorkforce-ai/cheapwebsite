'use client'

import { useState } from 'react'

/**
 * Prominent one-tap share button for listing + creator pages.
 *
 * On mobile (anything with navigator.share — iOS Safari, Android
 * Chrome) it opens the native share sheet so the visitor can fire
 * straight into iMessage / WhatsApp / Mail. On desktop it falls back
 * to clipboard copy with a brief "Copied" pulse.
 *
 * Caller passes a relative path or absolute URL; the button resolves
 * to a full https URL so the shared link works outside the Skillzy
 * tab the visitor copied it from.
 */
export default function CopyShareButton({
  url,
  shareTitle,
  shareText,
  label = 'Copy link',
  tone = 'gold',
  className = '',
}: {
  url: string
  shareTitle?: string
  shareText?: string
  /** Button text — default "Copy link". Overrides: "Send to a friend", etc. */
  label?: string
  /** Visual tone: gold (default) or navy (light bg cards) or cream (dark bg). */
  tone?: 'gold' | 'navy' | 'cream'
  className?: string
}) {
  const [state, setState] = useState<'idle' | 'shared' | 'copied'>('idle')

  function resolve(): string {
    if (/^https?:\/\//i.test(url)) return url
    if (typeof window === 'undefined') return url
    return `${window.location.origin}${url.startsWith('/') ? url : `/${url}`}`
  }

  async function go() {
    const full = resolve()
    // Prefer the native share sheet on mobile — it's the actual
    // "send to a friend" flow the user expects, not a clipboard
    // copy they then have to paste somewhere.
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          url: full,
          title: shareTitle,
          text: shareText,
        })
        setState('shared')
        setTimeout(() => setState('idle'), 1600)
        return
      } catch {
        /* user cancelled the sheet — fall through to clipboard */
      }
    }
    try {
      await navigator.clipboard.writeText(full)
      setState('copied')
      setTimeout(() => setState('idle'), 1600)
    } catch {
      /* clipboard blocked — best we can do is no-op visibly */
    }
  }

  const base =
    'inline-flex items-center gap-2 font-semibold px-5 py-2.5 text-sm transition-colors disabled:opacity-60'
  const toneClasses =
    tone === 'gold'
      ? 'bg-brand-gold text-brand-ink hover:bg-brand-gold-dark'
      : tone === 'navy'
        ? 'bg-brand-navy text-brand-cream hover:bg-brand-ink border border-brand-gold'
        : 'bg-brand-cream text-brand-ink hover:bg-white border border-brand-gold'

  return (
    <button
      type="button"
      onClick={go}
      aria-label={label}
      className={`${base} ${toneClasses} ${className}`.trim()}
    >
      {state === 'idle' && (
        <>
          <svg
            aria-hidden
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          {label}
        </>
      )}
      {state === 'shared' && (
        <>
          <span aria-hidden>✓</span>
          Shared
        </>
      )}
      {state === 'copied' && (
        <>
          <span aria-hidden>✓</span>
          Link copied
        </>
      )}
    </button>
  )
}
