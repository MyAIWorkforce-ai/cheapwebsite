'use client'

import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import { requestPasswordReset, type SignInState } from '@/app/signin/actions'

const initial: SignInState = {}

function Submit() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 bg-brand-gold text-brand-ink font-semibold px-6 py-3.5 text-[15px] hover:bg-brand-gold-dark transition-colors disabled:opacity-60"
    >
      {pending ? 'Sending…' : 'Send reset link'}
    </button>
  )
}

export default function ResetForm({ demoMode }: { demoMode: boolean }) {
  const [state, action] = useFormState(requestPasswordReset, initial)
  return (
    <>
      {demoMode && (
        <div className="mt-6 p-3 border border-brand-hairline bg-brand-cream-card text-xs text-brand-muted">
          Demo mode — set Supabase env vars to enable real password reset.
        </div>
      )}
      <form action={action} className="mt-10 flex flex-col gap-5">
        <label className="block">
          <span className="label-cap text-brand-muted">Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 placeholder:text-brand-muted/60"
          />
        </label>
        {state.error && <p className="text-sm text-red-700">{state.error}</p>}
        {state.info && <p className="text-sm text-brand-gold-dark">{state.info}</p>}
        <Submit />
      </form>
      <p className="mt-8 text-sm text-brand-muted">
        Remembered it?{' '}
        <Link
          href="/signin"
          className="text-brand-ink border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
        >
          Sign in
        </Link>
      </p>
    </>
  )
}
