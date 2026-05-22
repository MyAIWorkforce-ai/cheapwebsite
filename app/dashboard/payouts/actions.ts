'use server'

import { revalidatePath } from 'next/cache'
import { getUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { hasSupabase } from '@/lib/env'

export type DisconnectState = { error?: string; info?: string }

/**
 * Unlink the creator's Stripe Connect account from their Skillzy
 * profile so they can connect a different one. This does NOT delete
 * or close the Stripe account itself — it just clears the link on our
 * side (stripe_account_id + stripe_payouts_enabled). New sales stop
 * routing to the old account immediately; the creator reconnects to
 * pick a new destination.
 */
export async function disconnectStripe(): Promise<DisconnectState> {
  if (!hasSupabase) return { error: 'Demo mode — Stripe is not configured.' }
  const user = await getUser()
  if (!user) return { error: 'Sign in first.' }

  try {
    const supabase = createClient()
    const { error } = await supabase
      .from('profiles')
      .update({ stripe_account_id: null, stripe_payouts_enabled: false })
      .eq('id', user.id)
    if (error) return { error: error.message }
    revalidatePath('/dashboard/payouts')
    return { info: 'Stripe disconnected. Connect a new account to keep selling.' }
  } catch (err) {
    return { error: (err as Error).message }
  }
}
