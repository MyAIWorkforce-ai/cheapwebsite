'use client'

import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import { signup, login, type AuthState } from '@/app/memyselfi/actions'

const inputCls =
  'w-full rounded-lg px-3.5 py-2.5 text-[14px] outline-none'
const inputStyle = {
  backgroundColor: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--mmi-line)',
  color: 'var(--mmi-text)',
} as const

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full px-6 py-3 text-sm font-semibold disabled:opacity-50 transition-transform hover:scale-[1.02]"
      style={{ backgroundColor: 'var(--mmi-accent)', color: '#0b0a14' }}
    >
      {pending ? 'One moment…' : label}
    </button>
  )
}

export default function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const action = mode === 'signup' ? signup : login
  const [state, formAction] = useFormState<AuthState, FormData>(action, {})

  return (
    <form action={formAction} className="space-y-4">
      {mode === 'signup' && (
        <label className="block">
          <span
            className="block text-[13px] font-semibold mb-1.5"
            style={{ color: 'var(--mmi-text)' }}
          >
            Your name
          </span>
          <input
            name="name"
            autoComplete="name"
            className={inputCls}
            style={inputStyle}
            placeholder="Maya Okafor"
          />
        </label>
      )}
      <label className="block">
        <span
          className="block text-[13px] font-semibold mb-1.5"
          style={{ color: 'var(--mmi-text)' }}
        >
          Email
        </span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          className={inputCls}
          style={inputStyle}
          placeholder="you@example.com"
        />
      </label>
      <label className="block">
        <span
          className="block text-[13px] font-semibold mb-1.5"
          style={{ color: 'var(--mmi-text)' }}
        >
          Password
        </span>
        <input
          name="password"
          type="password"
          autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
          className={inputCls}
          style={inputStyle}
          placeholder={mode === 'signup' ? 'At least 8 characters' : '••••••••'}
        />
      </label>

      {state.error && (
        <p
          className="text-[13px] rounded-lg px-3 py-2"
          style={{
            color: '#ffb4b4',
            backgroundColor: 'rgba(255,80,80,0.08)',
            border: '1px solid rgba(255,80,80,0.25)',
          }}
        >
          {state.error}
        </p>
      )}

      <Submit label={mode === 'signup' ? 'Create account' : 'Log in'} />

      <p className="text-[13px] text-center" style={{ color: 'var(--mmi-muted)' }}>
        {mode === 'signup' ? (
          <>
            Already have one?{' '}
            <Link
              href="/memyselfi/login"
              className="underline"
              style={{ color: 'var(--mmi-accent)' }}
            >
              Log in
            </Link>
          </>
        ) : (
          <>
            New here?{' '}
            <Link
              href="/memyselfi/signup"
              className="underline"
              style={{ color: 'var(--mmi-accent)' }}
            >
              Create an account
            </Link>
          </>
        )}
      </p>
    </form>
  )
}
