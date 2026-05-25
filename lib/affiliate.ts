import 'server-only'
import { cookies } from 'next/headers'
import { hasSupabase } from '@/lib/env'
import { createServiceClient } from '@/lib/supabase/server'

// Affiliate program constants. Headline: "Earn 5% on every creator you
// refer." The 12-month window is fine-print (not advertised).
export const AFFILIATE_RATE = 0.05
export const ATTRIBUTION_DAYS = 365 // ~12 months
export const AFFILIATE_COOKIE = 'skz_aff'

/**
 * Set on a brand-new account: if a valid affiliate cookie is present,
 * tag this user as referred by that affiliate. Runs at sign-up time.
 *
 * Guards (silent, no-op if any fail):
 *  - never overwrite an existing referral (referred_by set once, ever)
 *  - never attribute to a non-existent affiliate handle
 *  - never self-refer (affiliate id == new user id)
 *
 * Best-effort: any error is swallowed so sign-up never breaks.
 */
export async function attributeReferral(userId: string): Promise<void> {
  if (!hasSupabase || !userId) return
  try {
    const code = cookies().get(AFFILIATE_COOKIE)?.value?.replace(/^@/, '').trim()
    if (!code) return

    const admin = createServiceClient()

    // Don't overwrite a prior referral.
    const { data: me } = await admin
      .from('profiles')
      .select('referred_by')
      .eq('id', userId)
      .maybeSingle()
    if (me?.referred_by) return

    // Resolve the affiliate by handle (citext-unique).
    const { data: aff } = await admin
      .from('profiles')
      .select('id')
      .eq('handle', code)
      .maybeSingle()
    if (!aff?.id) return

    // Self-referral hard block.
    if (aff.id === userId) return

    await admin
      .from('profiles')
      .update({ referred_by: aff.id, referred_at: new Date().toISOString() })
      .eq('id', userId)
  } catch {
    /* best effort */
  }
}

/**
 * Book a 5% affiliate earning for a paid sale, if the selling creator
 * was referred and still inside the 12-month window. Carved from
 * Skillzy's 20% — the creator's 80% is untouched.
 *
 * Fraud guards (silent no-op if any fail):
 *  - creator must have a referrer
 *  - within ATTRIBUTION_DAYS of referral
 *  - affiliate's Stripe account must NOT equal the creator's Stripe
 *    account (kills the "second account, same bank" self-deal)
 *
 * Idempotent via the unique(purchase_id) constraint. Best-effort —
 * wrapped so it can NEVER break purchase fulfilment.
 */
export async function recordAffiliateEarning(args: {
  creatorId: string | null | undefined
  purchaseId: string | null | undefined
  saleAmountCents: number
  currency?: string
}): Promise<void> {
  const { creatorId, purchaseId, saleAmountCents } = args
  if (!hasSupabase || !creatorId || !purchaseId || saleAmountCents <= 0) return
  try {
    const admin = createServiceClient()

    const { data: creator } = await admin
      .from('profiles')
      .select('referred_by, referred_at, stripe_account_id')
      .eq('id', creatorId)
      .maybeSingle()
    if (!creator?.referred_by) return

    // 12-month attribution window.
    if (creator.referred_at) {
      const ageMs = Date.now() - new Date(creator.referred_at as string).getTime()
      if (ageMs > ATTRIBUTION_DAYS * 24 * 60 * 60 * 1000) return
    }

    // Same-Stripe fraud guard.
    const { data: aff } = await admin
      .from('profiles')
      .select('stripe_account_id')
      .eq('id', creator.referred_by as string)
      .maybeSingle()
    if (
      aff?.stripe_account_id &&
      creator.stripe_account_id &&
      aff.stripe_account_id === creator.stripe_account_id
    ) {
      return
    }

    const amount = Math.round(saleAmountCents * AFFILIATE_RATE)
    if (amount <= 0) return

    await admin.from('affiliate_earnings').insert({
      affiliate_id: creator.referred_by,
      creator_id: creatorId,
      purchase_id: purchaseId,
      amount_cents: amount,
      currency: args.currency ?? 'usd',
      status: 'pending',
    })
  } catch {
    /* best effort — never break fulfilment */
  }
}

export type AffiliateSummary = {
  referredCount: number
  pendingCents: number
  paidCents: number
}

/** Dashboard data for the affiliate tab. */
export async function affiliateSummary(userId: string): Promise<AffiliateSummary> {
  const empty: AffiliateSummary = { referredCount: 0, pendingCents: 0, paidCents: 0 }
  if (!hasSupabase || !userId) return empty
  try {
    const admin = createServiceClient()
    const [{ count }, { data: earnings }] = await Promise.all([
      admin
        .from('profiles')
        .select('id', { count: 'exact', head: true })
        .eq('referred_by', userId),
      admin
        .from('affiliate_earnings')
        .select('amount_cents, status')
        .eq('affiliate_id', userId),
    ])
    let pendingCents = 0
    let paidCents = 0
    for (const e of earnings ?? []) {
      const c = (e.amount_cents as number) ?? 0
      if (e.status === 'paid') paidCents += c
      else if (e.status === 'pending' || e.status === 'approved') pendingCents += c
    }
    return { referredCount: count ?? 0, pendingCents, paidCents }
  } catch {
    return empty
  }
}
