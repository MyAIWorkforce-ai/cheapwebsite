import type Stripe from 'stripe'
import { env, hasSupabase, hasResend } from '@/lib/env'
import { createServiceClient } from '@/lib/supabase/server'
import { sendPurchaseConfirmation } from '@/lib/email/purchase-confirmation'
import { getProduct } from '@/lib/catalog'

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

  const product = getProduct(listingId)
  const buyerEmail =
    intent.receipt_email ||
    (intent.metadata?.buyer_email as string | undefined) ||
    ''

  if (hasSupabase) {
    try {
      const supabase = createServiceClient()

      const { data: existing } = await supabase
        .from('purchases')
        .select('id')
        .eq('stripe_payment_intent_id', intent.id)
        .maybeSingle()
      if (existing) return

      const amount = intent.amount_received ?? intent.amount ?? 0
      const fee = Math.round(amount * 0.2)
      const payout = amount - fee
      await supabase.from('purchases').insert({
        buyer_id: (intent.metadata?.buyer_id as string | undefined) || null,
        buyer_email: buyerEmail,
        listing_id: listingId,
        amount_cents: amount,
        currency: intent.currency ?? 'usd',
        platform_fee_cents: fee,
        creator_payout_cents: payout,
        stripe_payment_intent_id: intent.id,
        referrer_slug:
          (intent.metadata?.referrer_slug as string | undefined) || null,
        referrer_channel:
          (intent.metadata?.referrer_channel as string | undefined) || null,
        status: 'paid',
      })
    } catch (err) {
      console.error('Failed to record purchase', err)
    }
  }

  if (hasResend && buyerEmail && product) {
    try {
      await sendPurchaseConfirmation({
        to: buyerEmail,
        product,
        orderId: orderIdFromIntent(intent.id),
        downloadPageUrl: `${env.siteUrl}/order/success?payment_intent=${intent.id}&id=${listingId}`,
      })
    } catch (err) {
      console.error('Failed to send purchase email', err)
    }
  }
}
