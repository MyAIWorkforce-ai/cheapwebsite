'use client'

import Link from 'next/link'
import { useEffect } from 'react'

// Route-segment error boundary. Catches render/server errors below /app
// and shows a styled fallback instead of the default Next error screen.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Surface to whatever monitoring we wire up later.
    console.error(error)
  }, [error])

  return (
    <div className="paper px-6 lg:px-10 py-20 sm:py-28 min-h-[60vh]">
      <div className="max-w-2xl mx-auto">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
          Error · 500
        </span>
        <h1
          className="font-display mt-5 text-5xl sm:text-7xl tracking-tight leading-[0.95]"
          style={{ letterSpacing: '-0.03em' }}
        >
          Something{' '}
          <em className="italic text-brand-gold font-medium">snapped.</em>
        </h1>
        <p className="mt-6 text-brand-muted max-w-prose">
          We logged the issue. Try again — usually that&rsquo;s enough. If
          it keeps happening, ping{' '}
          <a
            href="mailto:help@skillzy.ai"
            className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
          >
            help@skillzy.ai
          </a>
          {error.digest && (
            <>
              {' '}and quote ref{' '}
              <code className="font-mono text-sm bg-brand-cream-card px-1.5 py-0.5">
                {error.digest}
              </code>
              .
            </>
          )}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-6 py-3.5 text-[15px] hover:bg-brand-gold-dark transition-colors"
          >
            Try again
            <span aria-hidden>↻</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
          >
            Back to home →
          </Link>
        </div>
      </div>
    </div>
  )
}
