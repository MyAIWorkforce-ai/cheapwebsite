/**
 * POST /api/checkout/redeem-promo
 *
 * Validates a promo code against a listing and, for free codes,
 * creates a $0 purchase record + fulfils immediately (sends the
 * confirmation email with the download link). For partial-discount
 * codes (future) this will return a discount payload the embedded
 * Payment Element can apply — not implemented in v1.
 *
 * Request body:
 *   { listingId: string, code: string, email: string,
 *     buyerId?: string }
 *
 * Responses:
 *   200 { ok: true, redirectUrl: '/order/success?id=...' }
 *   400 { error: 'Code not found / expired / used up' }
 *   503 { error: 'Supabase not configured' }
 */
import { NextResponse, type NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { env, hasSupabase, hasResend } from '@/lib/env'
import { resolveProduct } from '@/lib/listings'
import { sendPurchaseConfirmation } from '@/lib/email/purchase-confirmation'
import { sendPromoRedemptionNotification } from '@/lib/email/promo-redemption'
import { orderIdFromIntent } from '@/lib/fulfillment'
import { freeToken } from '@/lib/delivery-token'
import { listingEmailAttachments } from '@/lib/delivery'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  if (!hasSupabase) {
    return NextResponse.json(
      { error: 'Supabase not configured.' },
      { status: 503 },
    )
  }

  const body = (await request.json().catch(() => ({}))) as {
    listingId?: string
    code?: string
    email?: string
    buyerId?: string | null
  }

  const listingId = String(body.listingId ?? '').trim()
  const codeRaw = String(body.code ?? '').trim()
  const email = String(body.email ?? '').trim().toLowerCase()

  if (!listingId || !codeRaw) {
    return NextResponse.json(
      { error: 'Missing listing id or code.' },
      { status: 400 },
    )
  }
  if (!email || !/.+@.+\..+/.test(email)) {
    return NextResponse.json(
      { error: 'Enter a valid email to receive the bundle.' },
      { status: 400 },
    )
  }

  const admin = createServiceClient()

  // Resolve the listing first (handles slug-or-id at the edge).
  const product = await resolveProduct(listingId)
  if (!product) {
    return NextResponse.json({ error: 'Listing not found.' }, { status: 404 })
  }

  // Look up the code case-insensitively, only active.
  const { data: promo } = await admin
    .from('listing_promo_codes')
    .select(
      'id, listing_id, code, discount_type, max_redemptions, redemption_count, active',
    )
    .eq('listing_id', product.id)
    .eq('active', true)
    .ilike('code', codeRaw)
    .maybeSingle()

  if (!promo) {
    return NextResponse.json(
      { error: 'That code isn’t valid for this listing.' },
      { status: 400 },
    )
  }

  if (
    promo.max_redemptions !== null &&
    promo.redemption_count >= (promo.max_redemptions as number)
  ) {
    return NextResponse.json(
      { error: 'This code has been used up.' },
      { status: 400 },
    )
  }

  // v1 only handles 'free'. Bail loudly on anything else so we don't
  // silently let a percent-off code through as a free copy.
  if (promo.discount_type !== 'free') {
    return NextResponse.json(
      { error: 'Promo discount type not supported yet.' },
      { status: 400 },
    )
  }

  // Synthesise a "free-purchase" stripe-style ref so the order page,
  // share-kit, and dashboard treat this consistently with paid sales.
  const fakeIntentId = `pi_free_${promo.id.replace(/-/g, '').slice(0, 16)}_${Date.now().toString(36)}`
  const orderId = orderIdFromIntent(fakeIntentId)

  // Insert the purchase row at $0. Mark status paid so the buyer can
  // immediately access the bundle on /order/success and the dashboard.
  const { data: purchase, error: insertErr } = await admin
    .from('purchases')
    .insert({
      buyer_id: body.buyerId ?? null,
      buyer_email: email,
      listing_id: product.id,
      amount_cents: 0,
      currency: product.price.toLowerCase().includes('aud') ? 'aud' : 'usd',
      platform_fee_cents: 0,
      creator_payout_cents: 0,
      stripe_payment_intent_id: fakeIntentId,
      promo_code_id: promo.id,
      status: 'paid',
    })
    .select('id')
    .single()

  if (insertErr || !purchase) {
    return NextResponse.json(
      { error: insertErr?.message ?? 'Could not record the redemption.' },
      { status: 500 },
    )
  }

  // Bump the redemption counter. Non-atomic (races on simultaneous
  // redeems) — fine for v1 founder-driven giveaways; needs a Postgres
  // function before any campaign that drives concurrent traffic.
  try {
    await admin
      .from('listing_promo_codes')
      .update({ redemption_count: (promo.redemption_count as number) + 1 })
      .eq('id', promo.id)
  } catch (err) {
    console.error('redeem-promo: counter bump failed', err)
  }

  // Build the no-login download URL with a signed freeToken — same
  // scheme the EmailGate uses for genuinely free listings. The
  // /order/free page validates the token and reveals the files
  // without requiring a Stripe PaymentIntent.
  const tok = freeToken(product.id, email)
  const site = env.siteUrl.replace(/\/$/, '')
  const downloadPageUrl = `${site}/order/free?listing=${encodeURIComponent(
    product.id,
  )}&email=${encodeURIComponent(email)}&t=${encodeURIComponent(tok)}`

  // Send the buyer confirmation, pointing the email CTA at the
  // signed /order/free URL so they can download without an account.
  if (hasResend) {
    try {
      const attachments = await listingEmailAttachments(product.id)
      await sendPurchaseConfirmation({
        to: email,
        product,
        orderId,
        downloadPageUrl,
        attachments,
      })
    } catch (err) {
      console.error('redeem-promo: confirmation email failed', err)
    }

    // Seller + founder notification — same template, two recipients.
    // Best-effort: failures here MUST NOT roll back the redemption,
    // since the buyer already has their bundle.
    try {
      const { data: listing } = await admin
        .from('listings')
        .select('creator_id, slug, title')
        .eq('id', product.id)
        .maybeSingle()
      const sellerSlug = (listing?.slug as string) ?? product.id
      const sellerTitle = (listing?.title as string) ?? product.title
      let sellerEmail: string | null = null
      if (listing?.creator_id) {
        const { data: userResp } = await admin.auth.admin.getUserById(
          listing.creator_id as string,
        )
        sellerEmail = userResp.user?.email ?? null
      }
      if (sellerEmail) {
        await sendPromoRedemptionNotification({
          to: sellerEmail,
          title: sellerTitle,
          slug: sellerSlug,
          code: (promo.code as string) ?? null,
          buyerEmail: email,
          orderId,
          kind: 'promo',
        })
      }
      const founderEmail =
        process.env.NOTIFY_EMAIL_SALE?.trim() ||
        process.env.NOTIFY_EMAIL?.trim() ||
        null
      if (founderEmail && founderEmail !== sellerEmail) {
        await sendPromoRedemptionNotification({
          to: founderEmail,
          title: sellerTitle,
          slug: sellerSlug,
          code: (promo.code as string) ?? null,
          buyerEmail: email,
          orderId,
          kind: 'promo',
        })
      }
    } catch (err) {
      console.error('redeem-promo: seller/founder notification failed', err)
    }
  }

  return NextResponse.json({
    ok: true,
    // Send the buyer to the same signed /order/free URL the email
    // points at, so the post-redemption page shows the file list
    // right away.
    redirectUrl: `/order/free?listing=${encodeURIComponent(
      product.id,
    )}&email=${encodeURIComponent(email)}&t=${encodeURIComponent(tok)}`,
  })
}
