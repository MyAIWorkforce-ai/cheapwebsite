'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import PasswordInput from '@/components/PasswordInput'

// Supabase recovery flow lives in the URL HASH (#access_token=...&type=recovery).
// The hash never reaches the server, so the previous server-action approach
// always saw "Auth session missing". Switching this form to the browser
// Supabase client lets it pick up the hash on mount and call updateUser
// directly from the client once the session is established.

type Status =
  | { kind: 'checking' }
  | { kind: 'ready' }
  | { kind: 'expired' }
  | { kind: 'saving' }
  | { kind: 'error'; message: string }
  | { kind: 'done' }

export default function UpdatePasswordForm({ demoMode }: { demoMode: boolean }) {
  const [status, setStatus] = useState<Status>(
    demoMode ? { kind: 'ready' } : { kind: 'checking' },
  )
  const router = useRouter()

  useEffect(() => {
    if (demoMode) return

    const supabase = createClient()
    let settled = false

    // The PASSWORD_RECOVERY event fires once @supabase/ssr has finished
    // exchanging the hash tokens into a real session.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (settled) return
      if (
        event === 'PASSWORD_RECOVERY' ||
        (event === 'SIGNED_IN' && session) ||
        (event === 'INITIAL_SESSION' && session)
      ) {
        settled = true
        setStatus({ kind: 'ready' })
      }
    })

    // Belt-and-braces: if the client already processed the hash before
    // we attached the listener, getSession() returns the session straight
    // away.
    ;(async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (settled) return
      if (session) {
        settled = true
        setStatus({ kind: 'ready' })
      }
    })()

    // If neither path resolved within a couple of seconds, the link is
    // missing, expired, or already used.
    const expiryTimer = setTimeout(() => {
      if (!settled) {
        settled = true
        setStatus({ kind: 'expired' })
      }
    }, 2500)

    return () => {
      subscription.unsubscribe()
      clearTimeout(expiryTimer)
    }
  }, [demoMode])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (demoMode) return

    const fd = new FormData(e.currentTarget)
    const password = String(fd.get('password') ?? '')
    if (password.length < 8) {
      setStatus({ kind: 'error', message: 'Password needs at least 8 characters.' })
      return
    }

    setStatus({ kind: 'saving' })
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setStatus({ kind: 'error', message: error.message })
      return
    }
    setStatus({ kind: 'done' })
    setTimeout(() => router.push('/dashboard?password=updated'), 800)
  }

  if (status.kind === 'checking') {
    return (
      <p className="mt-10 text-sm text-brand-muted">
        Verifying your reset link…
      </p>
    )
  }

  if (status.kind === 'expired') {
    return (
      <div className="mt-10 border border-brand-hairline bg-brand-cream-card p-6">
        <p className="font-display text-2xl tracking-tight">
          This reset link has expired.
        </p>
        <p className="mt-3 text-sm text-brand-muted leading-relaxed">
          Reset links are single-use and time out for security. Request a
          fresh one and we&rsquo;ll email it straight away.
        </p>
        <Link
          href="/auth/reset"
          className="mt-5 inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-6 py-3 text-[14px] hover:bg-brand-gold-dark transition-colors"
        >
          Send a new reset link
          <span aria-hidden>→</span>
        </Link>
      </div>
    )
  }

  if (status.kind === 'done') {
    return (
      <div className="mt-10 border border-brand-hairline bg-brand-cream-card p-6">
        <p className="font-display text-2xl tracking-tight">
          Password updated. Signing you in…
        </p>
      </div>
    )
  }

  return (
    <>
      {demoMode && (
        <div className="mt-6 p-3 border border-brand-hairline bg-brand-cream-card text-xs text-brand-muted">
          Demo mode — set Supabase env vars to enable real password updates.
        </div>
      )}
      <form onSubmit={onSubmit} className="mt-10 flex flex-col gap-5">
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
        {status.kind === 'error' && (
          <p className="text-sm text-red-700">{status.message}</p>
        )}
        <button
          type="submit"
          disabled={status.kind === 'saving'}
          className="mt-2 bg-brand-gold text-brand-ink font-semibold px-6 py-3.5 text-[15px] hover:bg-brand-gold-dark transition-colors disabled:opacity-60"
        >
          {status.kind === 'saving' ? 'Saving…' : 'Set new password'}
        </button>
      </form>
    </>
  )
}
