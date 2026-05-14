'use client'

import { useFormState, useFormStatus } from 'react-dom'
import {
  updateProfile,
  updateEmail,
  updateAccountPassword,
  type AccountState,
} from './actions'

const initial: AccountState = {}

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-brand-gold text-brand-ink font-semibold px-6 py-3 text-[15px] hover:bg-brand-gold-dark transition-colors disabled:opacity-60"
    >
      {pending ? 'Saving…' : label}
    </button>
  )
}

function Field({
  state,
}: {
  state: AccountState
}) {
  if (state.error) return <p className="text-sm text-red-700">{state.error}</p>
  if (state.info) return <p className="text-sm text-brand-gold-dark">{state.info}</p>
  return null
}

export function ProfileForm({
  defaultName,
  defaultHandle,
}: {
  defaultName: string
  defaultHandle: string
}) {
  const [state, action] = useFormState(updateProfile, initial)
  return (
    <form action={action} className="space-y-5">
      <label className="block">
        <span className="label-cap text-brand-muted">Name</span>
        <input
          type="text"
          name="name"
          defaultValue={defaultName}
          autoComplete="name"
          className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2"
        />
      </label>
      <label className="block">
        <span className="label-cap text-brand-muted">Handle</span>
        <div className="mt-2 flex items-baseline gap-2 border-b border-brand-hairline focus-within:border-brand-gold">
          <span className="text-brand-muted">@</span>
          <input
            type="text"
            name="handle"
            defaultValue={defaultHandle}
            pattern="[a-z0-9_-]+"
            placeholder="yourhandle"
            className="flex-1 bg-transparent outline-none py-2 placeholder:text-brand-muted/60"
          />
        </div>
        <p className="mt-1 text-xs text-brand-muted">
          Lowercase letters, numbers, dashes. Lives at /creator/{'{handle}'}.
        </p>
      </label>
      <Field state={state} />
      <Submit label="Save profile" />
    </form>
  )
}

export function EmailForm({ defaultEmail }: { defaultEmail: string }) {
  const [state, action] = useFormState(updateEmail, initial)
  return (
    <form action={action} className="space-y-5">
      <label className="block">
        <span className="label-cap text-brand-muted">Email</span>
        <input
          type="email"
          name="email"
          defaultValue={defaultEmail}
          required
          autoComplete="email"
          className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2"
        />
      </label>
      <p className="text-xs text-brand-muted">
        We&rsquo;ll send a confirmation link to the new address before the
        change goes through.
      </p>
      <Field state={state} />
      <Submit label="Change email" />
    </form>
  )
}

export function PasswordForm() {
  const [state, action] = useFormState(updateAccountPassword, initial)
  return (
    <form action={action} className="space-y-5">
      <label className="block">
        <span className="label-cap text-brand-muted">New password</span>
        <input
          type="password"
          name="password"
          required
          minLength={8}
          autoComplete="new-password"
          placeholder="At least 8 characters"
          className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 placeholder:text-brand-muted/60"
        />
      </label>
      <Field state={state} />
      <Submit label="Update password" />
    </form>
  )
}
