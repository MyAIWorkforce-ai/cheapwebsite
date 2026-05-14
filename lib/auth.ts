import { createClient, createServiceClient } from '@/lib/supabase/server'
import { hasSupabase } from '@/lib/env'

export type SessionUser = {
  id: string
  email: string
  name?: string
  handle?: string
  avatar?: string
}

// Returns the signed-in user, or null in any of these cases:
//  - Supabase env vars are missing (demo mode)
//  - The visitor has no session
export async function getUser(): Promise<SessionUser | null> {
  if (!hasSupabase) return null
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user || !user.email) return null
    return {
      id: user.id,
      email: user.email,
      name:
        (user.user_metadata?.name as string | undefined) ||
        user.email.split('@')[0],
      handle:
        (user.user_metadata?.user_name as string | undefined) ||
        (user.user_metadata?.preferred_username as string | undefined),
      avatar: user.user_metadata?.avatar_url as string | undefined,
    }
  } catch {
    return null
  }
}

/**
 * Claim purchases that were made as a guest with this user's email,
 * before they had an account. Idempotent — only updates rows where
 * buyer_id is still NULL. Uses the service-role client to bypass RLS
 * since the buyer doesn't yet own those rows.
 *
 * Returns the number of purchases that were just linked. Safe to
 * call on every /dashboard page load — the query is indexed on
 * buyer_email and short-circuits to 0 updates after the first claim.
 */
export async function claimOrphanPurchases(
  user: SessionUser,
): Promise<number> {
  if (!hasSupabase) return 0
  try {
    const admin = createServiceClient()
    const { data, error } = await admin
      .from('purchases')
      .update({ buyer_id: user.id })
      .eq('buyer_email', user.email)
      .is('buyer_id', null)
      .select('id')
    if (error) {
      console.error('claimOrphanPurchases:', error.message)
      return 0
    }
    return data?.length ?? 0
  } catch (err) {
    console.error('claimOrphanPurchases threw:', err)
    return 0
  }
}
