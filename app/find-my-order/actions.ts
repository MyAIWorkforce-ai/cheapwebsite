'use server'

import { createServiceClient } from '@/lib/supabase/server'
import { env, hasResend, hasSupabase } from '@/lib/env'
import { resolveProduct } from '@/lib/listings'
import { deliveryToken } from '@/lib/delivery-token'
import {
  sendPurchaseConfirmation,
} from '@/lib/email/purchase-confirmation'
import { orderIdFromIntent } from '@/lib/fulfillment'

export type FindOrderState = {
  ok?: boolean
  // Generic message — we don't reveal whether the email matched, so
  // the page can't be used to enumerate buyers.
  message?: string
}

const GENERIC =
  "If we have a purchase tied to that email, we just resent the download link. Check your inbox (and spam folder) in the next minute or two."

export async function resendOrderLinks(
  _prev: FindOrderState,
  formData: FormData,
): Promise<FindOrderState> {
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase()
  if (!email || !email.includes('@')) {
    return { message: 'Enter a valid email address.' }
  }

  // Always return the same message regardless of whether we found
  // anything — never leak buyer existence.
  if (!hasSupabase || !hasResend) {
    return { ok: true, message: GENERIC }
  }

  try {
    const supabase = createServiceClient()
    const { data: rows } = await supabase
      .from('purchases')
      .select('listing_id, stripe_payment_intent_id')
      .eq('buyer_email', email)
      .eq('status', 'paid')
      .not('stripe_payment_intent_id', 'is', null)

    if (rows && rows.length) {
      for (const row of rows) {
        const listingId = row.listing_id as string | null
        const intentId = row.stripe_payment_intent_id as string | null
        if (!listingId || !intentId) continue
        const product = await resolveProduct(listingId)
        if (!product) continue
        try {
          await sendPurchaseConfirmation({
            to: email,
            product,
            orderId: orderIdFromIntent(intentId),
            downloadPageUrl: `${env.siteUrl}/order/success?payment_intent=${intentId}&id=${listingId}&t=${deliveryToken(intentId)}`,
          })
        } catch (err) {
          console.error('find-my-order resend failed', err)
        }
      }
    }
  } catch (err) {
    console.error('find-my-order lookup failed', err)
  }

  return { ok: true, message: GENERIC }
}
