'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { updatePassword, type SignInState } from '@/app/signin/actions'
import PasswordInput from '@/components/PasswordInput'

const initial: SignInState = {}

function Submit() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 bg-brand-gold text-brand-ink font-semibold px-6 py-3.5 text-[15px] hover:bg-brand-gold-dark transition-colors disabled:opacity-60"
    >
      {pending ? 'Saving…' : 'Set new password'}
    </button>
  )
}

export default function UpdatePasswordForm({ demoMode }: { demoMode: boolean }) {
  const [state, action] = useFormState(updatePassword, initial)
  return (
    <>
      {demoMode && (
        <div className="mt-6 p-3 border border-brand-hairline bg-brand-cream-card text-xs text-brand-muted">
          Demo mode — set Supabase env vars to enable real password updates.
        </div>
      )}
      <form action={action} className="mt-10 flex flex-col gap-5">
        <label className="block">
          <span className="label-cap text-brand-muted">New password</span>
          <PasswordInput
            name="password"
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="At least 8 characters"
          />
        </label>
        {state.error && <p className="text-sm text-red-700">{state.error}</p>}
        {state.info && <p className="text-sm text-brand-gold-dark">{state.info}</p>}
        <Submit />
      </form>
    </>
  )
}
