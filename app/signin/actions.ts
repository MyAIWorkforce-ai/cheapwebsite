'use server'

import { redirect } from 'next/navigation'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { env, hasSupabase } from '@/lib/env'

export type SignInState = {
  error?: string
  info?: string
}

function demoState(): SignInState {
  return {
    error:
      'Auth is in demo mode. Set NEXT_PUBLIC_SUPABASE_URL and the anon key to enable real sign-in.',
  }
}

// Email magic-link sign-in / sign-up (no password).
export async function signInWithEmail(
  _prev: SignInState,
  formData: FormData,
): Promise<SignInState> {
  if (!hasSupabase) return demoState()

  const email = String(formData.get('email') ?? '').trim()
  const next = String(formData.get('next') ?? '').trim()
  if (!email) return { error: 'Email is required.' }

  const safeNext = next && next.startsWith('/') ? next : ''
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${env.siteUrl}/auth/callback${safeNext ? `?next=${encodeURIComponent(safeNext)}` : ''}`,
    },
  })

  if (error) return { error: error.message }
  // Redirect to a URL that carries the "sent" state. This survives a
  // full page reload (the mobile no-JS / pre-hydration submit case),
  // so the "Check your email" panel always shows and never vanishes.
  redirect(
    `/signin?sent=${encodeURIComponent(email)}${safeNext ? `&next=${encodeURIComponent(safeNext)}` : ''}`,
  )
}

// Password sign-in.
export async function signInWithPassword(
  _prev: SignInState,
  formData: FormData,
): Promise<SignInState> {
  if (!hasSupabase) return demoState()

  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const next = String(formData.get('next') ?? '').trim()
  if (!email || !password) return { error: 'Email and password required.' }

  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }

  // Claim guest-checkout purchases made with this email pre-account.
  if (data.user?.email && data.user.id) {
    const { claimOrphanPurchases } = await import('@/lib/auth')
    await claimOrphanPurchases({ id: data.user.id, email: data.user.email })
  }

  redirect(next && next.startsWith('/') ? next : '/dashboard')
}

// Password sign-up (new account).
export async function signUpWithPassword(
  _prev: SignInState,
  formData: FormData,
): Promise<SignInState> {
  if (!hasSupabase) return demoState()

  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const name = String(formData.get('name') ?? '').trim()
  const next = String(formData.get('next') ?? '').trim()
  if (!email || !password) return { error: 'Email and password required.' }
  if (password.length < 8) return { error: 'Password needs at least 8 characters.' }

  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name: name || undefined },
      emailRedirectTo: `${env.siteUrl}/auth/callback`,
    },
  })

  if (error) return { error: error.message }

  // Supabase returns success (anti-enumeration) when the email is
  // already registered — distinguishable by an empty `identities`
  // array. Surface a clear "already exists, sign in instead" message
  // so the user isn't dropped back to a blank form thinking nothing
  // happened.
  if (
    data.user &&
    (!data.user.identities || data.user.identities.length === 0)
  ) {
    return {
      error: 'That email already has an account. Sign in instead.',
    }
  }

  // If email confirmation is OFF in Supabase, signUp returns a live
  // session — sign them straight in and continue, no dead-end "check
  // your inbox" step. (Recommended: keep confirmation off so listing
  // a skill is fast — see OFFICE-LIST.)
  if (data.session && data.user?.email && data.user.id) {
    const { claimOrphanPurchases } = await import('@/lib/auth')
    await claimOrphanPurchases({ id: data.user.id, email: data.user.email })
    const { attributeReferral } = await import('@/lib/affiliate')
    await attributeReferral(data.user.id)

    // Founder "new signup" alert. Password signups never hit
    // /auth/callback (where the OAuth/magic-link alert lives), so fire it
    // here. Guarded by an admin-only flag so it only sends once.
    if (!data.user.app_metadata?.admin_notified) {
      try {
        const { sendNewUserNotification } = await import(
          '@/lib/email/admin-notification'
        )
        await sendNewUserNotification({
          email: data.user.email,
          name: name || null,
          handle: null,
        })
        if (data.user.email) {
          const { sendWelcomeEmail } = await import('@/lib/email/welcome')
          await sendWelcomeEmail({
            to: data.user.email,
            name: name || null,
          })
        }
        const admin = createServiceClient()
        await admin.auth.admin.updateUserById(data.user.id, {
          app_metadata: { ...data.user.app_metadata, admin_notified: true },
        })
      } catch (err) {
        console.error('admin new-user / welcome email (signup) failed', err)
      }
    }

    redirect(next && next.startsWith('/') ? next : '/dashboard')
  }

  // Otherwise Supabase still requires email confirmation.
  return {
    info: 'Account created. Check your inbox to confirm your email and sign in.',
  }
}

// Request a password-reset email.
export async function requestPasswordReset(
  _prev: SignInState,
  formData: FormData,
): Promise<SignInState> {
  if (!hasSupabase) return demoState()

  const email = String(formData.get('email') ?? '').trim()
  if (!email) return { error: 'Email is required.' }

  const supabase = createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    // Route through /auth/callback so the recovery code is exchanged
    // for a real session (cookies written onto the redirect response)
    // BEFORE the user lands on the password form. Without this hop
    // the password form sees "Auth session missing!" because the
    // tokens never made it into cookies.
    redirectTo: `${env.siteUrl}/auth/callback?next=/auth/update-password`,
  })
  if (error) return { error: error.message }
  return { info: 'If that account exists, we just emailed you a reset link.' }
}

// Set a new password (used after the reset link is clicked).
export async function updatePassword(
  _prev: SignInState,
  formData: FormData,
): Promise<SignInState> {
  if (!hasSupabase) return demoState()

  const password = String(formData.get('password') ?? '')
  if (password.length < 8) return { error: 'Password needs at least 8 characters.' }

  const supabase = createClient()
  const { error } = await supabase.auth.updateUser({ password })
  if (error) return { error: error.message }

  redirect('/dashboard?password=updated')
}

// Where to bounce back to after OAuth — carry an optional `next` so a
// creator who signed up mid-listing returns to /sell/new (their draft
// is preserved client-side). OAuth always creates a live session, so
// there's never an email-confirmation dead-end on this path.
function oauthCallback(formData?: FormData): string {
  const next = formData ? String(formData.get('next') ?? '').trim() : ''
  const safe = next && next.startsWith('/') ? next : ''
  return `${env.siteUrl}/auth/callback${safe ? `?next=${encodeURIComponent(safe)}` : ''}`
}

// OAuth: GitHub.
export async function signInWithGitHub(formData?: FormData) {
  if (!hasSupabase) redirect('/signin?error=demo')
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: oauthCallback(formData),
      // Request the `repo` scope so creators can import from their
      // private repos via /sell/new. Public profile + email are the
      // default minimum.
      scopes: 'read:user user:email repo',
    },
  })
  if (error || !data?.url) {
    redirect(`/signin?error=${encodeURIComponent(error?.message ?? 'OAuth failed')}`)
  }
  redirect(data.url)
}

// OAuth: Google.
export async function signInWithGoogle(formData?: FormData) {
  if (!hasSupabase) redirect('/signin?error=demo')
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: oauthCallback(formData) },
  })
  if (error || !data?.url) {
    redirect(`/signin?error=${encodeURIComponent(error?.message ?? 'OAuth failed')}`)
  }
  redirect(data.url)
}

export async function signOut() {
  if (!hasSupabase) redirect('/')
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/')
}
