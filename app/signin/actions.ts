'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { env, hasSupabase } from '@/lib/env'

export type SignInState = {
  error?: string
  info?: string
}

export async function signInWithEmail(
  _prev: SignInState,
  formData: FormData,
): Promise<SignInState> {
  if (!hasSupabase) {
    return {
      error:
        'Auth is in demo mode. Set NEXT_PUBLIC_SUPABASE_URL and the anon key to enable real sign-in.',
    }
  }

  const email = String(formData.get('email') ?? '').trim()
  if (!email) return { error: 'Email is required.' }

  const supabase = createClient()
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${env.siteUrl}/auth/callback`,
    },
  })

  if (error) return { error: error.message }
  return {
    info: 'Check your inbox. We sent a one-time link to sign in.',
  }
}

export async function signInWithGitHub() {
  if (!hasSupabase) {
    redirect('/signin?error=demo')
  }

  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${env.siteUrl}/auth/callback`,
    },
  })

  if (error || !data?.url) {
    redirect(`/signin?error=${encodeURIComponent(error?.message ?? 'OAuth failed')}`)
  }

  redirect(data.url)
}

export async function signInWithGoogle() {
  if (!hasSupabase) {
    redirect('/signin?error=demo')
  }

  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${env.siteUrl}/auth/callback`,
    },
  })

  if (error || !data?.url) {
    redirect(`/signin?error=${encodeURIComponent(error?.message ?? 'OAuth failed')}`)
  }

  redirect(data.url)
}

export async function signOut() {
  if (!hasSupabase) {
    redirect('/')
  }

  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/')
}
