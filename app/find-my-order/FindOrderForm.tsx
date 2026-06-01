'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { resendOrderLinks, type FindOrderState } from './actions'

const initial: FindOrderState = {}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-6 inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-8 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors disabled:opacity-60"
    >
      {pending ? 'Sending…' : 'Resend my download link'}
      {!pending && <span aria-hidden>→</span>}
    </button>
  )
}

export default function FindOrderForm() {
  const [state, action] = useFormState(resendOrderLinks, initial)
  return (
    <form action={action} className="mt-10">
      <label className="block">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
          Email used at checkout
        </span>
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-lg placeholder:text-brand-muted/60"
        />
      </label>
      <SubmitButton />
      {state.message && (
        <p
          className={`mt-5 text-sm ${state.ok ? 'text-brand-ink' : 'text-red-700'}`}
        >
          {state.message}
        </p>
      )}
    </form>
  )
}
