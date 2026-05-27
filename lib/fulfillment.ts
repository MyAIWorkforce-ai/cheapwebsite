import type Stripe from 'stripe'
import { env, hasSupabase, hasResend } from '@/lib/env'
import { createServiceClient } from '@/lib/supabase/server'
import { sendPurchaseConfirmation } from '@/lib/email/purchase-confirmation'
import { sendSaleNotification } from '@/lib/email/sale-notification'
import { resolveProduct } from '@/lib/listings'
import { deliveryToken } from '@/lib/delivery-token'

export function orderIdFromIntent(intentId: string) {
  return intentId.replace(/^pi_/, '').slice(0, 12).toUpperCase()
}

/**
 * Record a paid order + send the Skillzy confirmation email.
 *
 * Called from BOTH the Stripe webhook and the post-payment return page,
 * so checkout works even if no webhook endpoint is configured. The
 * Supabase row doubles as the idempotency guard — whichever path runs
 * first inserts it; later runs (webhook retries, page refreshes, the
 * other path) see it and bail before emailing again.
 */
export async function fulfillPaymentIntent(intent: Stripe.PaymentIntent) {
  const listingId =
    (intent.metadata?.listing_id as string | undefined) ?? null
  if (!listingId) return
  if (intent.status !== 'succeeded') return

  const product = await resolveProduct(listingId)
  const buyerEmail = (
    intent.receipt_email ||
    (intent.metadata?.buyer_email as string | undefined) ||
    ''
  )
    .trim()
    .toLowerCase()

  const amount = intent.amount_received ?? intent.amount ?? 0
  const currency = intent.currency ?? 'usd'

  // Did the money actually route to a creator? A destination charge
  // sets transfer_data.destination at PaymentIntent creation time. If
  // it's absent, the whole amount stayed on the platform — the creator
  // got nothing — so we must record that honestly rather than claiming
  // an 80% payout that never happened.
  const destination =
    typeof intent.transfer_data?.destination === 'string'
      ? intent.transfer_data.destination
      : (intent.transfer_data?.destination?.id ?? null)
  const routedToCreator = Boolean(destination)
  const fee = routedToCreator ? Math.round(amount * 0.2) : amount
  const payout = routedToCreator ? amount - Math.round(amount * 0.2) : 0

  if (!routedToCreator) {
    console.error(
      'Sale recorded but NOT routed to a creator — full amount stayed on the platform.',
      {
        payment_intent: intent.id,
        listing_id: listingId,
        amount_cents: amount,
        reason:
          'transfer_data.destination was not set at checkout (creator had no connected/payouts-enabled Stripe account when the buyer paid).',
      },
    )
  }

  async function emailBuyer() {
    if (!hasResend || !buyerEmail || !product) return
    try {
      await sendPurchaseConfirmation({
        to: buyerEmail,
        product,
        orderId: orderIdFromIntent(intent.id),
        downloadPageUrl: `${env.siteUrl}/order/success?payment_intent=${intent.id}&id=${listingId}&t=${deliveryToken(intent.id)}`,
      })
    } catch (err) {
      console.error('Failed to send purchase email', err)
    }
  }

  // Seller "you sold X" email. Needs Supabase to look up the listing's
  // creator and their auth email — silent no-op if either is missing.
  async function emailSeller() {
    if (!hasResend || !hasSupabase || !product) return
    try {
      const supabase = createServiceClient()
      const { data: listing } = await supabase
        .from('listings')
        .select('creator_id, slug, title')
        .eq('id', listingId)
        .single()
      if (!listing?.creator_id) return
      const { data: userResp } = await supabase.auth.admin.getUserById(
        listing.creator_id as string,
      )
      const sellerEmail = userResp.user?.email
      if (!sellerEmail) return
      await sendSaleNotification({
        to: sellerEmail,
        title: (listing.title as string) ?? product.title,
        slug: (listing.slug as string) ?? listingId,
        amountCents: amount,
        payoutCents: payout,
        currency,
        orderId: orderIdFromIntent(intent.id),
      })
    } catch (err) {
      console.error('Failed to send seller sale notification', err)
    }
  }

  // Founder "new sale" alert to hi@skillzy.ai — fired once per recorded
  // sale (gated by the same fresh-insert guard as the other emails).
  async function emailFounder() {
    if (!hasResend) return
    try {
      const { sendNewSaleNotification } = await import(
        '@/lib/email/admin-notification'
      )
      await sendNewSaleNotification({
        title: product?.title ?? listingId ?? 'Listing',
        amountCents: amount,
        skillzyCents: fee,
        payoutCents: payout,
        currency,
        buyerEmail: buyerEmail || null,
        orderId: orderIdFromIntent(intent.id),
        routedToCreator,
      })
    } catch (err) {
      console.error('Failed to send founder sale notification', err)
    }
  }

  // No DB to dedupe against — best-effort single send.
  if (!hasSupabase) {
    await emailBuyer()
    return
  }

  // The recorded purchase row is the idempotency guard AND the thing
  // the dashboards read. Email ONLY after a row is freshly recorded:
  // if it already exists we've emailed once already; if recording
  // fails we must not email (otherwise every success-page reload
  // re-sends). Downloads still work regardless via the success page.
  try {
    const supabase = createServiceClient()

    const { data: existing } = await supabase
      .from('purchases')
      .select('id')
      .eq('stripe_payment_intent_id', intent.id)
      .maybeSingle()
    if (existing) return

    const { data: inserted, error: insertError } = await supabase
      .from('purchases')
      .insert({
        buyer_id: (intent.metadata?.buyer_id as string | undefined) || null,
        buyer_email: buyerEmail,
        listing_id: listingId,
        amount_cents: amount,
        currency,
        platform_fee_cents: fee,
        creator_payout_cents: payout,
        stripe_payment_intent_id: intent.id,
        referrer_slug:
          (intent.metadata?.referrer_slug as string | undefined) || null,
        referrer_channel:
          (intent.metadata?.referrer_channel as string | undefined) || null,
        status: 'paid',
      })
      .select('id')
      .single()
    if (insertError || !inserted) {
      console.error('Failed to record purchase', insertError)
      return
    }

    // Book an affiliate earning if the selling creator was referred.
    // Best-effort + fully guarded — never blocks the sale.
    try {
      const { data: listing } = await supabase
        .from('listings')
        .select('creator_id')
        .eq('id', listingId)
        .maybeSingle()
      if (listing?.creator_id) {
        const { recordAffiliateEarning } = await import('@/lib/affiliate')
        await recordAffiliateEarning({
          creatorId: listing.creator_id as string,
          purchaseId: inserted.id as string,
          saleAmountCents: amount,
          currency,
        })
      }
    } catch {
      /* affiliate accounting is best-effort */
    }
  } catch (err) {
    console.error('Failed to record purchase', err)
    return
  }

  await emailBuyer()
  await emailSeller()
  await emailFounder()
}
