'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getUser } from '@/lib/auth'
import { isAdminEmail, hasSupabase } from '@/lib/env'
import { createServiceClient } from '@/lib/supabase/server'

// Every action re-verifies the caller is an admin — server actions are
// directly callable, so never trust the client.
async function ensureAdmin() {
  const user = await getUser()
  if (!isAdminEmail(user?.email)) throw new Error('Not authorized')
}

// Soft remove / restore a listing. We flip status rather than hard-delete:
// a listing with sales is protected by a restrict FK on purchases, and
// 'removed' already hides it from the marketplace (RLS reads status=live).
export async function setListingStatus(formData: FormData) {
  await ensureAdmin()
  if (!hasSupabase) return
  const id = String(formData.get('id') ?? '')
  const status = String(formData.get('status') ?? '')
  const creatorId = String(formData.get('creatorId') ?? '')
  if (!id || (status !== 'live' && status !== 'removed')) return

  const db = createServiceClient()
  await db.from('listings').update({ status }).eq('id', id)

  revalidatePath(`/admin/creators/${creatorId}`)
  revalidatePath('/admin/dashboard')
  revalidatePath('/marketplace')
}

export type DeleteState = { error?: string }

// Hard-delete an account (auth user → cascades the profile + their
// listings). If the creator has sales, the purchases restrict FK blocks
// the cascade and Supabase returns an error — surface it instead of
// crashing, so records are never silently destroyed.
export async function deleteAccount(
  _prev: DeleteState,
  formData: FormData,
): Promise<DeleteState> {
  await ensureAdmin()
  if (!hasSupabase) return { error: 'Supabase not configured.' }
  const userId = String(formData.get('userId') ?? '')
  if (!userId) return { error: 'Missing account id.' }

  const db = createServiceClient()
  const { error } = await db.auth.admin.deleteUser(userId)
  if (error) {
    return {
      error: `Couldn't delete: ${error.message}. If this creator has sales, remove their listings instead — the account is kept for transaction records.`,
    }
  }

  revalidatePath('/admin/dashboard')
  redirect('/admin/dashboard')
}
