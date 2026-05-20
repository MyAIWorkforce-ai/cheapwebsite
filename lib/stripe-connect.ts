import 'server-only'
import { getStripe, hasStripe } from '@/lib/stripe'
import { hasSupabase } from '@/lib/env'
import { createServiceClient } from '@/lib/supabase/server'

export type PayoutStatus = {
  stripe_account_id: string | null
  stripe_payouts_enabled: boolean
}

/**
 * Source of truth for "can this seller be paid". There is deliberately
 * no Stripe webhook (see HANDOFF), so the `stripe_payouts_enabled`
 * flag is reconciled by pulling the account from Stripe and writing
 * the result back. Called on return from onboarding and whenever the
 * payouts page is viewed while still pending — so it self-heals
 * without a webhook. Never throws: on any failure it returns the
 * current DB values so callers can render safely.
 */
export async function syncPayoutStatus(
  userId: string,
): Promise<PayoutStatus> {
  const fallback: PayoutStatus = {
    stripe_account_id: null,
    stripe_payouts_enabled: false,
  }
  if (!hasStripe || !hasSupabase) return fallback

  const service = createServiceClient()

  let accountId: string | null = null
  let dbEnabled = false
  try {
    const { data } = await service
      .from('profiles')
      .select('stripe_account_id, stripe_payouts_enabled')
      .eq('id', userId)
      .single()
    accountId = (data?.stripe_account_id as string | null) ?? null
    dbEnabled = Boolean(data?.stripe_payouts_enabled)
  } catch {
    return fallback
  }

  if (!accountId) return { stripe_account_id: null, stripe_payouts_enabled: false }

  // Pull the live account state from Stripe.
  try {
    const account = await getStripe().accounts.retrieve(accountId)
    const enabled =
      account.payouts_enabled === true && account.charges_enabled === true

    if (enabled !== dbEnabled) {
      await service
        .from('profiles')
        .update({ stripe_payouts_enabled: enabled })
        .eq('id', userId)
    }
    return { stripe_account_id: accountId, stripe_payouts_enabled: enabled }
  } catch {
    // Stripe Connect not enabled yet, or a transient error — keep
    // whatever the DB already had rather than breaking the page.
    return { stripe_account_id: accountId, stripe_payouts_enabled: dbEnabled }
  }
}
