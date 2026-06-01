'use client'

import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import { useState } from 'react'
import PasswordInput from '@/components/PasswordInput'
import {
  signInWithEmail,
  signInWithPassword,
  signInWithGitHub,
  signInWithGoogle,
  type SignInState,
} from './actions'

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 bg-brand-gold text-brand-ink font-semibold px-6 py-3.5 text-[15px] hover:bg-brand-gold-dark transition-colors disabled:opacity-60"
    >
      {pending ? 'Working…' : label}
    </button>
  )
}

function ProviderButton({
  action,
  next,
  children,
}: {
  action: (formData: FormData) => Promise<void>
  next?: string
  children: React.ReactNode
}) {
  return (
    <form action={action}>
      {next && <input type="hidden" name="next" value={next} />}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-3 border border-brand-hairline bg-brand-cream-card py-3.5 text-sm hover:border-brand-ink transition-colors"
      >
        {children}
      </button>
    </form>
  )
}

const initial: SignInState = {}

export default function SignInForm({
  demoMode,
  oauthError,
  sentEmail,
  defaultEmail,
  next,
}: {
  demoMode: boolean
  oauthError?: string
  sentEmail?: string
  defaultEmail?: string
  next?: string
}) {
  const [mode, setMode] = useState<'link' | 'password'>('password')
  const [email, setEmail] = useState(defaultEmail ?? '')
  const [linkState, linkAction] = useFormState(signInWithEmail, initial)
  const [pwState, pwAction] = useFormState(signInWithPassword, initial)
  const state = mode === 'link' ? linkState : pwState

  // The magic-link action redirects to /signin?sent=<email> on success,
  // so the "Check your email" panel is driven by the URL — it survives
  // any reload, including the mobile pre-hydration native form submit
  // that was making it vanish. The password action can also surface an
  // info message (e.g. confirm-your-email), so honour that too.
  const sentMsg =
    sentEmail !== undefined
      ? 'Check your inbox. We sent a one-time sign-in link.'
      : state.info
  if (sentMsg) {
    const shownEmail = sentEmail || email || ''
    return (
      <div className="mt-10 border border-brand-gold bg-brand-cream-card p-7 text-center">
        <div
          className="font-display text-3xl tracking-tight"
          style={{ letterSpacing: '-0.02em' }}
        >
          Check your email
        </div>
        <p className="mt-3 text-sm text-brand-ink leading-relaxed">
          {sentMsg}
          {shownEmail && (
            <>
              {' '}
              We sent it to{' '}
              <span className="font-semibold">{shownEmail}</span>.
            </>
          )}
        </p>
        <p className="mt-4 text-xs text-brand-muted leading-relaxed">
          Open the email and click the link to finish signing in. Can’t
          find it? Check spam, or use a different email below.
        </p>
        <Link
          href="/signin"
          className="inline-block mt-5 text-sm border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
        >
          Use a different email
        </Link>
      </div>
    )
  }

  return (
    <>
      {demoMode && (
        <div className="mt-6 p-3 border border-brand-hairline bg-brand-cream-card text-xs text-brand-muted">
          Demo mode — auth requires Supabase env vars. See{' '}
          <span className="font-mono">.env.example</span>.
        </div>
      )}

      {oauthError && (
        <div className="mt-6 p-3 border border-red-300 bg-red-50 text-sm text-red-700">
          Couldn’t sign in with that provider: {oauthError}. Try the email
          link below instead.
        </div>
      )}

      {/* Primary: email + password. Magic link is offered as a secondary
          option below (it can be slow to arrive), and OAuth sits between. */}
      {mode === 'password' ? (
        <form action={pwAction} className="mt-10 flex flex-col gap-5">
          {next && <input type="hidden" name="next" value={next} />}
          <label className="block">
            <span className="label-cap text-brand-muted">Email</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 placeholder:text-brand-muted/60"
            />
          </label>
          <label className="block">
            <span className="label-cap text-brand-muted">Password</span>
            <PasswordInput
              name="password"
              required
              autoComplete="current-password"
            />
          </label>
          <div className="flex justify-end -mt-3">
            <Link
              href="/auth/reset"
              className="text-xs text-brand-muted hover:text-brand-gold transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          {state.error && <p className="text-sm text-red-700">{state.error}</p>}
          <Submit label="Sign in" />
        </form>
      ) : (
        <form action={linkAction} className="mt-10 flex flex-col gap-5">
          {next && <input type="hidden" name="next" value={next} />}
          <label className="block">
            <span className="label-cap text-brand-muted">Email</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 placeholder:text-brand-muted/60"
            />
          </label>
          <p className="text-xs text-brand-muted -mt-2">
            We email a one-time link — it can take a minute to arrive. No password.
          </p>
          {state.error && <p className="text-sm text-red-700">{state.error}</p>}
          <Submit label="Send sign-in link" />
        </form>
      )}

      <div className="my-8 flex items-center gap-4 label-cap text-brand-muted">
        <span className="flex-1 h-px bg-brand-hairline" />
        or
        <span className="flex-1 h-px bg-brand-hairline" />
      </div>

      <div className="flex flex-col gap-3">
        <ProviderButton action={signInWithGoogle} next={next}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden>
            <path
              fill="#EA4335"
              d="M12 10.2v3.9h5.45c-.24 1.4-1.7 4.12-5.45 4.12a6.21 6.21 0 1 1 0-12.42c1.94 0 3.24.83 3.99 1.54l2.72-2.62C16.95 3.13 14.7 2 12 2 6.92 2 2.83 6.08 2.83 11.16S6.92 20.33 12 20.33c6.93 0 9.18-4.86 9.18-7.83 0-.53-.06-.93-.13-1.34H12z"
            />
          </svg>
          Continue with Google
        </ProviderButton>
        <ProviderButton action={signInWithGitHub} next={next}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 .5C5.73.5.66 5.58.66 11.86c0 5.02 3.25 9.27 7.76 10.78.57.11.78-.25.78-.55v-2.13c-3.16.69-3.83-1.36-3.83-1.36-.52-1.31-1.26-1.66-1.26-1.66-1.03-.71.08-.69.08-.69 1.14.08 1.74 1.18 1.74 1.18 1.01 1.74 2.66 1.24 3.31.95.1-.74.4-1.24.72-1.53-2.52-.29-5.17-1.27-5.17-5.64 0-1.25.44-2.27 1.17-3.07-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.16 1.17a10.9 10.9 0 0 1 5.76 0c2.2-1.48 3.15-1.17 3.15-1.17.63 1.58.24 2.74.12 3.03.73.8 1.16 1.82 1.16 3.07 0 4.39-2.66 5.34-5.2 5.62.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.78.55a11.36 11.36 0 0 0 7.76-10.78C23.34 5.58 18.27.5 12 .5Z" />
          </svg>
          Continue with GitHub
        </ProviderButton>
      </div>

      <p className="mt-6 text-center text-sm text-brand-muted">
        {mode === 'password' ? (
          <button
            type="button"
            onClick={() => setMode('link')}
            className="hover:text-brand-gold transition-colors border-b border-brand-muted/40 hover:border-brand-gold pb-0.5"
          >
            Prefer a one-time email link instead?
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setMode('password')}
            className="hover:text-brand-gold transition-colors border-b border-brand-muted/40 hover:border-brand-gold pb-0.5"
          >
            Use email + password instead
          </button>
        )}
      </p>

      <p className="mt-8 text-sm text-brand-muted">
        New here?{' '}
        <Link
          href={next ? `/signup?next=${encodeURIComponent(next)}` : '/signup'}
          className="text-brand-ink border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
        >
          Create an account
        </Link>
      </p>
    </>
  )
}
