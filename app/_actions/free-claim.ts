'use server'

import { createServiceClient } from '@/lib/supabase/server'
import { env, hasSupabase, hasResend } from '@/lib/env'
import { resolveProduct, isSeedProductId } from '@/lib/listings'
import { freeToken } from '@/lib/delivery-token'
import { sendPurchaseConfirmation } from '@/lib/email/purchase-confirmation'
import { listingEmailAttachments } from '@/lib/delivery'

export type FreeClaimState = { ok?: boolean; error?: string }

/**
 * Free-listing claim. Unlike paid checkout there's no PaymentIntent,
 * so we record a £0 paid purchase (idempotent via a synthetic
 * stripe_payment_intent_id) and email a no-login, token-gated
 * download link. Demo/seed listings have no files — they just get
 * the newsletter signup, no false "download" promise.
 */
export async function claimFreeListing(
  _prev: FreeClaimState,
  formData: FormData,
): Promise<FreeClaimState> {
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase()
  const listingId = String(formData.get('listing') ?? '').trim()
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { error: 'Enter a valid email.' }
  }
  if (!listingId) return { error: 'Missing listing.' }

  // Newsletter funnel (best effort) — they opted in via the form copy.
  if (hasSupabase) {
    try {
      const sb = createServiceClient()
      await sb
        .from('subscribers')
        .insert({ email, source: `free:${listingId}` })
    } catch {
      /* duplicate / non-fatal */
    }
  }

  // Demo listings have no real files — don't promise a download.
  if (isSeedProductId(listingId)) return { ok: true }

  const product = await resolveProduct(listingId)
  if (!product || !product.free) {
    return { error: 'That listing isn’t available as a free download.' }
  }

  if (hasSupabase) {
    try {
      const sb = createServiceClient()
      const syntheticId = `free:${listingId}:${email}`
      const { data: existing } = await sb
        .from('purchases')
        .select('id')
        .eq('stripe_payment_intent_id', syntheticId)
        .maybeSingle()
      if (!existing) {
        await sb.from('purchases').insert({
          buyer_email: email,
          listing_id: listingId,
          amount_cents: 0,
          stripe_payment_intent_id: syntheticId,
          status: 'paid',
        })
      }
    } catch (err) {
      console.error('Free claim record failed', err)
    }
  }

  if (hasResend) {
    try {
      const attachments = await listingEmailAttachments(listingId)
      await sendPurchaseConfirmation({
        to: email,
        product,
        orderId: `FREE-${listingId.slice(0, 8).toUpperCase()}`,
        downloadPageUrl: `${env.siteUrl}/order/free?listing=${encodeURIComponent(
          listingId,
        )}&email=${encodeURIComponent(email)}&t=${freeToken(listingId, email)}`,
        attachments,
      })
    } catch (err) {
      console.error('Free claim email failed', err)
    }
  }

  return { ok: true }
}
