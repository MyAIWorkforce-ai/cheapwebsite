'use client'

import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { subscribeToNewsletter, type NewsletterState } from '@/app/_actions/newsletter'
import { track } from '@/lib/analytics'

const initial: NewsletterState = {}

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors disabled:opacity-60"
    >
      {pending ? 'Sending…' : label}
      {!pending && <span aria-hidden>→</span>}
    </button>
  )
}

// Free-listing email gate. Captures the email (newsletter funnel),
// then reveals the "it's in your inbox" state. The actual file
// delivery rides the same email/dashboard path as paid items.
export default function EmailGate({
  listingId,
  ctaLabel,
}: {
  listingId: string
  ctaLabel: string
}) {
  const [state, action] = useFormState(subscribeToNewsletter, initial)

  useEffect(() => {
    if (state.ok) {
      track.newsletterSignup(`free:${listingId}`)
      track.freeListingDownload(listingId)
    }
  }, [state.ok, listingId])

  if (state.ok) {
    return (
      <div className="mt-7 border border-brand-gold bg-brand-cream-card p-5 text-sm">
        <p className="font-display text-xl tracking-tight">Check your inbox.</p>
        <p className="mt-1.5 text-brand-muted">
          The download link is on its way. It also lives in your dashboard if
          you sign in with this email.
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="mt-7">
      <input type="hidden" name="source" value={`free:${listingId}`} />
      <label className="block">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
          Your email — it’s free
        </span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="mt-2 w-full bg-transparent border-b border-brand-ink focus:border-brand-gold outline-none py-2 text-lg placeholder:text-brand-muted/60"
        />
      </label>
      <div className="mt-5">
        <Submit label={ctaLabel} />
      </div>
      {state.error && (
        <p className="mt-3 text-sm text-red-700">{state.error}</p>
      )}
      <p className="mt-3 text-xs text-brand-muted">
        We’ll add you to The Dispatch (every other Friday). Unsubscribe any
        time.
      </p>
    </form>
  )
}
