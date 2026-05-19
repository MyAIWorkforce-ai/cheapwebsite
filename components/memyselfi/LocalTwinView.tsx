'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Twin } from '@/lib/memyselfi/twins'
import { buildTwin, sanitizeHandle } from '@/lib/memyselfi/shape'
import TwinProfile from './TwinProfile'

// Demo fallback: a twin created in the builder but not yet published to the
// backend still lives in this browser's localStorage. This lets the public
// link work end-to-end even with no database configured.
export default function LocalTwinView({ handle }: { handle: string }) {
  const [twin, setTwin] = useState<Twin | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('mmi:draft')
      if (raw) {
        const d = JSON.parse(raw)
        const h = sanitizeHandle(d.handle || d.name || '')
        if (h && h === handle && d.name) {
          setTwin(buildTwin({ ...d, handle: h }))
        }
      }
    } catch {
      /* ignore */
    }
    setReady(true)
  }, [handle])

  if (!ready) return null

  if (twin) {
    return (
      <TwinProfile
        twin={twin}
        banner={
          <div
            className="mb-8 rounded-xl border px-4 py-3 text-[13px]"
            style={{
              borderColor: 'var(--mmi-line)',
              backgroundColor: 'var(--mmi-panel)',
              color: 'var(--mmi-muted)',
            }}
          >
            Draft preview — only you can see this. Publish it from{' '}
            <Link
              href="/memyselfi/create"
              className="underline"
              style={{ color: 'var(--mmi-accent)' }}
            >
              the builder
            </Link>{' '}
            to give it a real, shareable link.
          </div>
        }
      />
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-28 text-center">
      <h1
        className="font-display text-4xl sm:text-5xl"
        style={{ letterSpacing: '-0.03em', color: 'var(--mmi-text)' }}
      >
        No one’s here yet.
      </h1>
      <p className="mt-4 text-lg" style={{ color: 'var(--mmi-muted)' }}>
        There’s no twin at{' '}
        <span style={{ color: 'var(--mmi-text)' }}>memyselfi.ai/{handle}</span>.
        It could be yours.
      </p>
      <Link
        href="/memyselfi/create"
        className="mt-8 inline-block rounded-full px-7 py-3.5 text-sm font-semibold"
        style={{ backgroundColor: 'var(--mmi-accent)', color: '#0b0a14' }}
      >
        Claim this handle
      </Link>
    </div>
  )
}
