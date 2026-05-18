'use client'

import { useState } from 'react'

export default function ConnectButton({ label }: { label: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onClick() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/stripe/connect/start', { method: 'POST' })
      const text = await res.text()
      let json: { url?: string; error?: string } = {}
      try {
        json = text ? JSON.parse(text) : {}
      } catch {
        // Non-JSON response (e.g. an upstream 500 HTML page) — don't let
        // the browser surface a cryptic JSON-parse error.
        throw new Error(`Onboarding failed (server error ${res.status})`)
      }
      if (!res.ok) throw new Error(json.error ?? 'Could not start onboarding')
      if (!json.url) throw new Error('No onboarding URL returned')
      window.location.href = json.url
    } catch (err) {
      setError((err as Error).message)
      setLoading(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-3.5 text-[15px] hover:bg-brand-gold-dark transition-colors disabled:opacity-60"
      >
        {loading ? 'Redirecting…' : label}
        {!loading && <span aria-hidden>→</span>}
      </button>
      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
    </>
  )
}
