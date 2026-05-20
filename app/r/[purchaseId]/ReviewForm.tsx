'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function ReviewForm({
  purchaseId,
  token,
  initialStars,
  initialBody,
  listingSlug,
  preselectFromUrl,
}: {
  purchaseId: string
  token: string
  initialStars: number
  initialBody: string
  listingSlug: string | null
  preselectFromUrl: boolean
}) {
  const [stars, setStars] = useState(initialStars)
  const [body, setBody] = useState(initialBody)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const autoSaved = useRef(false)

  async function save(s: number, b: string) {
    if (s < 1 || s > 5) return
    setSaving(true)
    setError(null)
    try {
      const res = await fetch('/api/reviews/submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ purchaseId, token, stars: s, body: b }),
      })
      const j = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(j.error ?? 'Could not save your review.')
        return
      }
      setSaved(true)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setSaving(false)
    }
  }

  // If the buyer clicked a star button in the email, the URL already
  // tells us their rating — save it immediately so even closing the
  // tab now still records the click.
  useEffect(() => {
    if (
      preselectFromUrl &&
      initialStars >= 1 &&
      initialStars <= 5 &&
      !autoSaved.current
    ) {
      autoSaved.current = true
      void save(initialStars, initialBody)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mt-10">
      <div
        className="flex items-center gap-1"
        role="radiogroup"
        aria-label="Rating"
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => {
              setStars(n)
              void save(n, body)
            }}
            className={
              'text-4xl sm:text-5xl transition-colors leading-none p-1 ' +
              (n <= stars
                ? 'text-brand-gold'
                : 'text-brand-hairline hover:text-brand-gold')
            }
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
            aria-checked={n === stars}
            role="radio"
          >
            ★
          </button>
        ))}
      </div>

      {stars > 0 && (
        <>
          <label className="block mt-7">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
              Optional — anything you’d tell other buyers?
            </span>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              maxLength={1000}
              placeholder="What worked, what didn’t — keep it real."
              className="mt-3 w-full border border-brand-hairline focus:border-brand-gold outline-none p-3 text-sm bg-transparent"
            />
          </label>
          <button
            type="button"
            onClick={() => save(stars, body)}
            disabled={saving}
            className="mt-4 inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-6 py-3 text-sm hover:bg-brand-gold-dark transition-colors disabled:opacity-60"
          >
            {saving ? 'Saving…' : saved ? 'Saved — update' : 'Save review'}
          </button>
          {saved && (
            <p className="mt-3 text-sm text-brand-gold-dark">
              Thanks — your review is in.
            </p>
          )}
        </>
      )}

      {error && <p className="mt-4 text-sm text-red-700">{error}</p>}

      {listingSlug && (
        <p className="mt-8 text-sm text-brand-muted">
          <Link
            href={`/marketplace/${listingSlug}`}
            className="border-b border-brand-muted hover:text-brand-ink hover:border-brand-ink"
          >
            ← Back to the listing
          </Link>
        </p>
      )}
    </div>
  )
}
