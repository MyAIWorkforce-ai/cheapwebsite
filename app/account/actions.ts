'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { hasSupabase } from '@/lib/env'

export type AccountState = { error?: string; info?: string }

function demoState(): AccountState {
  return { error: 'Demo mode — connect Supabase to update real accounts.' }
}

export async function updateProfile(
  _prev: AccountState,
  formData: FormData,
): Promise<AccountState> {
  if (!hasSupabase) return demoState()
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not signed in.' }

  const name = String(formData.get('name') ?? '').trim()
  const handle = String(formData.get('handle') ?? '').trim().toLowerCase().replace(/[^a-z0-9_-]/g, '')

  const { error } = await supabase
    .from('profiles')
    .update({ name: name || null, handle: handle || null })
    .eq('id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/account')
  revalidatePath(`/creator/${handle}`)
  return { info: 'Saved.' }
}

export async function updateEmail(
  _prev: AccountState,
  formData: FormData,
): Promise<AccountState> {
  if (!hasSupabase) return demoState()
  const supabase = createClient()

  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  if (!email) return { error: 'Email is required.' }

  const { error } = await supabase.auth.updateUser({ email })
  if (error) return { error: error.message }
  return {
    info: 'Confirmation sent — click the link in your inbox to finish the change.',
  }
}

export async function updateAccountPassword(
  _prev: AccountState,
  formData: FormData,
): Promise<AccountState> {
  if (!hasSupabase) return demoState()
  const supabase = createClient()

  const password = String(formData.get('password') ?? '')
  if (password.length < 8) return { error: 'Password needs at least 8 characters.' }

  const { error } = await supabase.auth.updateUser({ password })
  if (error) return { error: error.message }
  return { info: 'Password updated.' }
}
