'use client'

import { useState } from 'react'

export default function ShowcaseOfferButton({ slug }: { slug: string }) {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function start() {
    setPending(true)
    setError(null)
    try {
      const res = await fetch(
        `/api/listings/${encodeURIComponent(slug)}/feature-checkout`,
        { method: 'POST' },
      )
      const j = await res.json().catch(() => ({}))
      if (!res.ok || !j.url) {
        setError(j.error ?? 'Could not start checkout.')
        setPending(false)
        return
      }
      window.location.href = j.url as string
    } catch (err) {
      setError((err as Error).message)
      setPending(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={start}
        disabled={pending}
        className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-3.5 text-[15px] hover:bg-brand-gold-dark transition-colors disabled:opacity-60"
      >
        {pending ? 'Opening checkout…' : 'Make this Showcase — $49'}
      </button>
      {error && (
        <p className="mt-3 text-sm text-red-500">{error}</p>
      )}
    </>
  )
}
