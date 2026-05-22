'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
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
  if (!email) return { error: 'Email is required.' }

  const supabase = createClient()
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${env.siteUrl}/auth/callback` },
  })

  if (error) return { error: error.message }
  // Redirect to a URL that carries the "sent" state. This survives a
  // full page reload (the mobile no-JS / pre-hydration submit case),
  // so the "Check your email" panel always shows and never vanishes.
  redirect(`/signin?sent=${encodeURIComponent(email)}`)
}

// Password sign-in.
export async function signInWithPassword(
  _prev: SignInState,
  formData: FormData,
): Promise<SignInState> {
  if (!hasSupabase) return demoState()

  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  if (!email || !password) return { error: 'Email and password required.' }

  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }

  // Claim guest-checkout purchases made with this email pre-account.
  if (data.user?.email && data.user.id) {
    const { claimOrphanPurchases } = await import('@/lib/auth')
    await claimOrphanPurchases({ id: data.user.id, email: data.user.email })
  }

  redirect('/dashboard')
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
  if (!email || !password) return { error: 'Email and password required.' }
  if (password.length < 8) return { error: 'Password needs at least 8 characters.' }

  const supabase = createClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name: name || undefined },
      emailRedirectTo: `${env.siteUrl}/auth/callback`,
    },
  })

  if (error) return { error: error.message }
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
    redirectTo: `${env.siteUrl}/auth/update-password`,
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

// OAuth: GitHub.
export async function signInWithGitHub() {
  if (!hasSupabase) redirect('/signin?error=demo')
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${env.siteUrl}/auth/callback`,
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
export async function signInWithGoogle() {
  if (!hasSupabase) redirect('/signin?error=demo')
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${env.siteUrl}/auth/callback` },
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
