'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { useState, useEffect } from 'react'
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

const PW_SET_KEY = 'skz_pw_set'

export function PasswordForm() {
  const [state, action] = useFormState(updateAccountPassword, initial)
  // Track whether a password has been set so the UI can say "connected"
  // and flip the button to "Change password". Persisted in
  // sessionStorage so it survives a reload. (Supabase doesn't expose a
  // reliable has-password flag, so we track the moment the user sets one
  // here — and once set, the label stays "Change password" thereafter.)
  const [hasPassword, setHasPassword] = useState(false)
  const [pw, setPw] = useState('')

  useEffect(() => {
    try {
      if (sessionStorage.getItem(PW_SET_KEY) === '1') setHasPassword(true)
    } catch {
      /* no-op */
    }
  }, [])

  useEffect(() => {
    if (state.info) {
      setHasPassword(true)
      setPw('') // clear the field so it's obvious the save took
      try {
        sessionStorage.setItem(PW_SET_KEY, '1')
      } catch {
        /* no-op */
      }
    }
  }, [state.info])

  return (
    <form action={action} className="space-y-5">
      {state.info ? (
        <div className="flex items-center gap-3 border border-brand-gold bg-brand-gold/10 px-4 py-4">
          <span aria-hidden className="text-brand-gold-dark text-2xl leading-none">✓</span>
          <span className="text-base text-brand-ink font-semibold">
            Done — your password is set. You can now sign in with email and
            password.
          </span>
        </div>
      ) : hasPassword ? (
        <div className="flex items-center gap-2 border border-brand-gold bg-brand-gold/10 px-4 py-3">
          <span aria-hidden className="text-brand-gold-dark">✓</span>
          <span className="text-sm text-brand-ink">
            Password connected. You can sign in with email and password.
          </span>
        </div>
      ) : null}
      <label className="block">
        <span className="label-cap text-brand-muted">
          {hasPassword ? 'Change password' : 'Set a password'}
        </span>
        <input
          type="password"
          name="password"
          required
          minLength={8}
          autoComplete="new-password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="At least 8 characters"
          className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 placeholder:text-brand-muted/60"
        />
      </label>
      {state.error && <p className="text-sm text-red-700">{state.error}</p>}
      <Submit label={hasPassword ? 'Change password' : 'Set password'} />
    </form>
  )
}
