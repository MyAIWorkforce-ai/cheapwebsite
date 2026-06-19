import { NextResponse, type NextRequest } from 'next/server'
import type Stripe from 'stripe'
import { getStripe, hasStripe } from '@/lib/stripe'
import { env, hasSupabase, hasResend } from '@/lib/env'
import { createServiceClient } from '@/lib/supabase/server'
import { sendPurchaseConfirmation } from '@/lib/email/purchase-confirmation'
import { resolveProduct } from '@/lib/listings'
import { fulfillPaymentIntent } from '@/lib/fulfillment'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  if (!hasStripe) {
    return NextResponse.json({ ok: true, mock: true })
  }

  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 })
  }

  const stripe = getStripe()
  const rawBody = await request.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, env.stripe.webhookSecret)
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook signature failed: ${(err as Error).message}` },
      { status: 400 },
    )
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const intent = event.data.object as Stripe.PaymentIntent
      await fulfillPaymentIntent(intent)
      break
    }
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      await handleCheckoutCompleted(session)
      break
    }
    case 'account.updated': {
      const account = event.data.object as Stripe.Account
      await handleAccountUpdated(account)
      break
    }
    case 'charge.refunded': {
      const charge = event.data.object as Stripe.Charge
      await handleChargeRefunded(charge)
      break
    }
    default:
      // Ignore other events for now.
      break
  }

  return NextResponse.json({ received: true })
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const listingId = (session.metadata?.listing_id as string | undefined) ?? null
  if (!listingId) return

  // Showcase featured-listing upgrade — different code path: flip
  // the listing's featured_tier, don't record a purchase, don't
  // send a buyer email. The session pays the platform, not the
  // creator, so there's no fulfilment to do.
  const kind = (session.metadata?.kind as string | undefined) ?? null
  if (kind === 'feature') {
    if (!hasSupabase) return
    try {
      const supabase = createServiceClient()
      const tier =
        (session.metadata?.feature_tier as string | undefined) ?? 'showcase'
      await supabase
        .from('listings')
        .update({
          featured_tier: tier,
          featured_started_at: new Date().toISOString(),
        })
        .eq('id', listingId)
    } catch (err) {
      console.error('Failed to flip featured_tier', err)
    }
    return
  }

  const product = await resolveProduct(listingId)
  const buyerEmail =
    session.customer_details?.email ||
    (session.metadata?.buyer_email as string | undefined) ||
    ''

  // Record the purchase.
  if (hasSupabase) {
    try {
      const supabase = createServiceClient()
      const amount = session.amount_total ?? 0
      const fee = Math.round(amount * 0.2)
      const payout = amount - fee
      await supabase.from('purchases').upsert(
        {
          buyer_id: (session.metadata?.buyer_id as string | undefined) || null,
          buyer_email: buyerEmail,
          listing_id: listingId,
          amount_cents: amount,
          currency: session.currency ?? 'usd',
          platform_fee_cents: fee,
          creator_payout_cents: payout,
          stripe_checkout_session_id: session.id,
          stripe_payment_intent_id: (session.payment_intent as string) ?? null,
          referrer_slug:
            (session.metadata?.referrer_slug as string | undefined) || null,
          referrer_channel:
            (session.metadata?.referrer_channel as string | undefined) || null,
          status: 'paid',
        },
        { onConflict: 'stripe_checkout_session_id' },
      )
    } catch (err) {
      console.error('Failed to record purchase', err)
    }
  }

  // Email the buyer.
  if (hasResend && buyerEmail && product) {
    try {
      await sendPurchaseConfirmation({
        to: buyerEmail,
        product,
        orderId: session.id.replace('cs_', '').slice(0, 12).toUpperCase(),
      })
    } catch (err) {
      console.error('Failed to send purchase email', err)
    }
  }
}

async function handleAccountUpdated(account: Stripe.Account) {
  if (!hasSupabase) return
  try {
    const supabase = createServiceClient()
    await supabase
      .from('profiles')
      .update({
        stripe_payouts_enabled: account.charges_enabled && account.payouts_enabled,
      })
      .eq('stripe_account_id', account.id)
  } catch (err) {
    console.error('Failed to update account state', err)
  }
}

async function handleChargeRefunded(charge: Stripe.Charge) {
  const intentId = (charge.payment_intent as string | null) ?? null
  if (!intentId) return

  // Mark the purchase row as refunded; pull back enough context to
  // email the buyer, seller, and Skillzy. Idempotency: Stripe can
  // re-deliver this event, so we only send the emails the FIRST time
  // we see status flip from paid -> refunded.
  if (!hasSupabase) return

  try {
    const supabase = createServiceClient()

    const { data: existing } = await supabase
      .from('purchases')
      .select(
        'id, listing_id, buyer_email, amount_cents, creator_payout_cents, currency, status',
      )
      .eq('stripe_payment_intent_id', intentId)
      .maybeSingle()
    if (!existing) return
    if (existing.status === 'refunded') return // already processed

    await supabase
      .from('purchases')
      .update({ status: 'refunded', refunded_at: new Date().toISOString() })
      .eq('id', existing.id as string)

    if (!hasResend) return

    const listingId = existing.listing_id as string
    const buyerEmail = (existing.buyer_email as string | null) ?? null
    const amountCents = (existing.amount_cents as number) ?? 0
    const payoutCents = (existing.creator_payout_cents as number) ?? 0
    const currency = (existing.currency as string) ?? 'usd'

    // Pull listing + seller details (same shape as the sale path).
    const { data: listing } = await supabase
      .from('listings')
      .select('creator_id, slug, title')
      .eq('id', listingId)
      .single()
    const title = (listing?.title as string) ?? 'Skillzy listing'
    const slug = (listing?.slug as string) ?? listingId
    const orderId = intentId.replace(/^pi_/, '').slice(0, 12).toUpperCase()

    let sellerEmail: string | null = null
    let sellerHandle: string | null = null
    if (listing?.creator_id) {
      try {
        const { data: userResp } = await supabase.auth.admin.getUserById(
          listing.creator_id as string,
        )
        sellerEmail = userResp.user?.email ?? null
        const { data: profile } = await supabase
          .from('profiles')
          .select('handle')
          .eq('id', listing.creator_id as string)
          .maybeSingle()
        sellerHandle = (profile?.handle as string | null) ?? null
      } catch (err) {
        console.error('Seller lookup on refund failed', err)
      }
    }

    const {
      sendBuyerRefundEmail,
      sendSellerRefundEmail,
      sendFounderRefundEmail,
    } = await import('@/lib/email/refund-notification')

    const tasks: Promise<unknown>[] = [
      sendFounderRefundEmail({
        title,
        amountCents,
        currency,
        buyerEmail,
        sellerEmail,
        sellerHandle,
        orderId,
      }),
    ]
    if (buyerEmail) {
      tasks.push(
        sendBuyerRefundEmail({
          to: buyerEmail,
          title,
          amountCents,
          currency,
          orderId,
        }),
      )
    }
    if (sellerEmail) {
      tasks.push(
        sendSellerRefundEmail({
          to: sellerEmail,
          title,
          slug,
          amountCents,
          payoutCents,
          currency,
          orderId,
        }),
      )
    }
    await Promise.all(tasks)
  } catch (err) {
    console.error('Failed to mark refund', err)
  }
}
