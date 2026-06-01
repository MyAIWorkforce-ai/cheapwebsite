'use client'

import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import { signUpWithPassword, type SignInState } from '@/app/signin/actions'
import PasswordInput from '@/components/PasswordInput'

const initial: SignInState = {}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-6 inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors disabled:opacity-60"
    >
      {pending ? 'Saving…' : 'Create account & save my purchase'}
      {!pending && <span aria-hidden>→</span>}
    </button>
  )
}

// Buyers who paid as a guest land here with a verified purchase but
// no session. The purchase still works (download link in the email
// stays valid forever), but if they sign up with the SAME email it
// auto-attaches to their dashboard via claimOrphanPurchases. This
// inline form makes that the obvious next step instead of dumping
// them at /dashboard which they can't access.
export default function GuestAccountPrompt({
  email,
}: {
  email: string
}) {
  const [state, action] = useFormState(signUpWithPassword, initial)

  return (
    <div className="mt-12 max-w-2xl border border-brand-ink bg-brand-cream-card p-7 sm:p-9">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
        Last step
      </span>
      <h2
        className="font-display mt-3 text-3xl sm:text-4xl tracking-tight leading-tight"
        style={{ letterSpacing: '-0.025em' }}
      >
        Keep this in your dashboard.
      </h2>
      <p className="mt-3 text-brand-muted max-w-prose">
        Add a password to <span className="font-semibold text-brand-ink">{email}</span> and
        your purchase attaches to your account — re-download anytime,
        from any device.
      </p>

      <form action={action} className="mt-7 space-y-5">
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="next" value="/dashboard" />

        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
            Email
          </span>
          <input
            type="email"
            value={email}
            readOnly
            className="mt-2 w-full bg-transparent border-b border-brand-hairline outline-none py-2 text-lg text-brand-muted"
          />
        </label>

        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
            Choose a password
          </span>
          <PasswordInput
            name="password"
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 pr-10 text-lg placeholder:text-brand-muted/60"
          />
        </label>

        <SubmitButton />

        {state.error && (
          <p className="text-sm text-red-700">{state.error}</p>
        )}
        {state.info && (
          <p className="text-sm text-brand-ink">{state.info}</p>
        )}
      </form>

      <p className="mt-7 text-sm text-brand-muted">
        Already have an account?{' '}
        <Link
          href={`/signin?email=${encodeURIComponent(email)}&next=/dashboard`}
          className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
        >
          Sign in instead
        </Link>{' '}
        — your purchase will appear in your dashboard automatically.
      </p>
    </div>
  )
}
