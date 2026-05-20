import { NextResponse, type NextRequest } from 'next/server'
import type Stripe from 'stripe'
import { getStripe, hasStripe } from '@/lib/stripe'
import { env, hasSupabase, hasResend } from '@/lib/env'
import { createServiceClient } from '@/lib/supabase/server'
import { sendPurchaseConfirmation } from '@/lib/email/purchase-confirmation'
import { getProduct } from '@/lib/catalog'

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

  try {
    switch (event.type) {
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
        break
    }
  } catch (err) {
    // Return non-2xx so Stripe retries the webhook. Critical: never silently
    // drop a checkout.session.completed — that means a paid customer with no
    // purchase record on our side.
    console.error(`Webhook handler failed for ${event.type}:`, {
      event_id: event.id,
      object_id: (event.data.object as { id?: string })?.id,
      error: (err as Error).message,
    })
    return NextResponse.json(
      { error: 'Handler failed; Stripe will retry.' },
      { status: 500 },
    )
  }

  return NextResponse.json({ received: true })
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const listingSlug = (session.metadata?.listing_id as string | undefined) ?? null
  if (!listingSlug) return

  const product = getProduct(listingSlug)
  const buyerEmail =
    session.customer_details?.email ||
    (session.metadata?.buyer_email as string | undefined) ||
    ''

  // Record the purchase. If this fails we MUST surface the error so Stripe
  // retries — a paid customer with no purchase record is the worst outcome.
  if (hasSupabase) {
    const supabase = createServiceClient()

    // listings.id is a UUID, but checkout puts the slug in metadata. Look
    // up the row by slug to get the foreign key.
    const { data: listing, error: listingError } = await supabase
      .from('listings')
      .select('id')
      .eq('slug', listingSlug)
      .single()
    if (listingError || !listing) {
      throw new Error(
        `Listing not found for slug ${listingSlug}: ${listingError?.message ?? 'no row'}`,
      )
    }

    const amount = session.amount_total ?? 0
    const fee = Math.round(amount * 0.2)
    const payout = amount - fee
    const { error } = await supabase.from('purchases').upsert(
      {
        buyer_id: (session.metadata?.buyer_id as string | undefined) || null,
        buyer_email: buyerEmail,
        listing_id: listing.id,
        amount_cents: amount,
        currency: session.currency ?? 'usd',
        platform_fee_cents: fee,
        creator_payout_cents: payout,
        stripe_checkout_session_id: session.id,
        stripe_payment_intent_id: (session.payment_intent as string) ?? null,
        status: 'paid',
      },
      { onConflict: 'stripe_checkout_session_id' },
    )
    if (error) {
      throw new Error(`Failed to record purchase: ${error.message}`)
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
  if (!hasSupabase || !charge.payment_intent) return
  try {
    const supabase = createServiceClient()
    await supabase
      .from('purchases')
      .update({ status: 'refunded', refunded_at: new Date().toISOString() })
      .eq('stripe_payment_intent_id', charge.payment_intent as string)
  } catch (err) {
    console.error('Failed to mark refund', err)
  }
}
