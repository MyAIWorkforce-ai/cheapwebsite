'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type FileRow = {
  name: string
  size_bytes: number | null
  url: string | null
  error?: string
}

type Resp = {
  ok?: true
  error?: string
  listing?: { id: string; slug: string; title: string } | null
  files?: FileRow[]
  note?: string
  expiresInSeconds?: number
}

export default function DownloadList({ purchaseId }: { purchaseId: string }) {
  const [state, setState] = useState<{ loading: true } | { loading: false; data: Resp }>(
    { loading: true },
  )

  useEffect(() => {
    let cancelled = false
    fetch(`/api/download/${purchaseId}`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => !cancelled && setState({ loading: false, data }))
      .catch((err) => !cancelled && setState({ loading: false, data: { error: String(err) } }))
    return () => {
      cancelled = true
    }
  }, [purchaseId])

  if (state.loading) {
    return <p className="text-sm text-brand-muted">Generating signed URLs…</p>
  }

  const data = state.data
  if (data.error) {
    return (
      <div className="p-5 border border-brand-hairline bg-brand-cream-card">
        <p className="font-display text-2xl tracking-tight">Can&rsquo;t get the bundle.</p>
        <p className="mt-2 text-sm text-red-700">{data.error}</p>
        <Link
          href="/dashboard?view=buying"
          className="mt-4 inline-block text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
        >
          Back to dashboard →
        </Link>
      </div>
    )
  }

  return (
    <div>
      {data.listing && (
        <div className="mb-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
            Listing
          </span>
          <p
            className="font-display text-3xl mt-1 tracking-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            {data.listing.title}
          </p>
        </div>
      )}

      {data.note && (
        <p className="text-sm text-brand-muted bg-brand-cream-card border border-brand-hairline p-4 mb-6">
          {data.note}
        </p>
      )}

      {data.files && data.files.length > 0 && (
        <ul className="divide-y divide-brand-hairline border-y border-brand-hairline">
          {data.files.map((f, i) => (
            <li key={`${f.name}-${i}`} className="py-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-mono text-sm truncate">{f.name}</p>
                <p className="text-xs text-brand-muted">
                  {f.size_bytes ? (f.size_bytes / 1024).toFixed(1) + ' KB' : ''}
                </p>
              </div>
              {f.url ? (
                <a
                  href={f.url}
                  download={f.name}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
                >
                  ↓ Download
                </a>
              ) : (
                <span className="text-xs text-red-700">{f.error ?? 'No URL'}</span>
              )}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-8 text-xs text-brand-muted">
        Refresh this page any time to issue fresh links.
      </p>
    </div>
  )
}
