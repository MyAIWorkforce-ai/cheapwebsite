'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { subscribeToNewsletter, type NewsletterState } from '@/app/_actions/newsletter'

const initial: NewsletterState = {}

function Submit() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-ink border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors disabled:opacity-50"
    >
      {pending ? 'Adding…' : 'Subscribe →'}
    </button>
  )
}

export default function NewsletterForm() {
  const [state, action] = useFormState(subscribeToNewsletter, initial)

  return (
    <form action={action} className="mt-3">
      {state.ok ? (
        <p className="text-sm text-brand-gold-dark">
          ✿ You&rsquo;re in. We&rsquo;ll send the first dispatch soon.
        </p>
      ) : (
        <div className="flex items-baseline gap-3 border-b border-brand-hairline pb-2">
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="flex-1 bg-transparent outline-none text-sm py-1 placeholder:text-brand-muted/60"
          />
          <Submit />
        </div>
      )}
      {state.error && <p className="mt-2 text-xs text-red-700">{state.error}</p>}
    </form>
  )
}
