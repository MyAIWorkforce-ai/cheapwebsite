'use client'

import { useFormState, useFormStatus } from 'react-dom'
import {
  registerDemoInterest,
  type DemoInterestState,
} from '@/app/_actions/demo-interest'

const initial: DemoInterestState = {}

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-7 w-full inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors disabled:opacity-60"
    >
      {pending ? 'One moment…' : label}
      {!pending && <span aria-hidden>→</span>}
    </button>
  )
}

// Demo/sample listings look buyable so we can read genuine demand,
// but there's no file to deliver. A click pings us (the action) and
// flips to a graceful "no longer available" message for the buyer.
export default function DemoInterest({
  listingId,
  ctaLabel,
}: {
  listingId: string
  ctaLabel: string
}) {
  const [state, action] = useFormState(registerDemoInterest, initial)

  if (state.ok) {
    return (
      <div className="mt-7 border border-brand-ink bg-brand-cream-card p-5 text-sm">
        <p className="font-display text-xl tracking-tight">
          Sorry — this isn’t available anymore.
        </p>
        <p className="mt-1.5 text-brand-muted">
          This was a sample listing. Browse the marketplace for agent skills
          and setups you can buy and download right now.
        </p>
      </div>
    )
  }

  return (
    <form action={action}>
      <input type="hidden" name="listing" value={listingId} />
      <Submit label={ctaLabel} />
    </form>
  )
}
