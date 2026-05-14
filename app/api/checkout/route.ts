import { NextResponse, type NextRequest } from 'next/server'
import { getStripe, hasStripe, platformFeeAmount } from '@/lib/stripe'
import { env } from '@/lib/env'
import { getProduct } from '@/lib/catalog'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { hasSupabase } from '@/lib/env'

export async function POST(request: NextRequest) {
  const { id, email } = (await request.json().catch(() => ({}))) as {
    id?: string
    email?: string
  }

  if (!id) {
    return NextResponse.json({ error: 'Missing listing id' }, { status: 400 })
  }

  // 1. Resolve the product. For now we use the static catalogue;
  //    when DB-backed listings ship, we'll prefer those.
  const product = getProduct(id)
  if (!product) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
  }

  // 2. If Stripe isn't configured, signal a mock checkout.
  if (!hasStripe) {
    return NextResponse.json({
      mock: true,
      redirectUrl: `/order/success?id=${id}${email ? `&email=${encodeURIComponent(email)}` : ''}`,
    })
  }

  // 3. Figure out the destination Stripe account (creator), if Connect is set up.
  let destinationAccount: string | null = null
  if (hasSupabase) {
    try {
      const supabase = createServiceClient()
      const { data } = await supabase
        .from('profiles')
        .select('stripe_account_id, stripe_payouts_enabled, handle')
        .eq('handle', product.creator.handle.replace(/^@/, ''))
        .single()
      if (data?.stripe_account_id && data.stripe_payouts_enabled) {
        destinationAccount = data.stripe_account_id
      }
    } catch {
      // Fall through to platform-only charge.
    }
  }

  // 4. Identify the buyer if signed in.
  let buyerEmail = email
  let buyerId: string | undefined
  if (hasSupabase) {
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user?.email) {
        buyerEmail = buyerEmail ?? user.email
        buyerId = user.id
      }
    } catch {
      /* no-op */
    }
  }

  const amount = Number(product.price.replace(/[^0-9.]/g, ''))
  const unitAmountCents = Math.round(amount * 100)
  const platformFee = platformFeeAmount(unitAmountCents)

  // 5. Create the Stripe Checkout Session.
  const stripe = getStripe()
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: buyerEmail,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: unitAmountCents,
          product_data: {
            name: product.title,
            description: product.tagline,
            metadata: { listing_id: product.id, type: product.type },
          },
        },
        quantity: 1,
      },
    ],
    payment_intent_data: {
      // Card statement suffix — appears after the account-level prefix
      // (e.g. "SKILLZY*REAL-ESTATE-SETUP"). Stripe truncates to 22
      // chars max for the suffix and strips disallowed characters.
      statement_descriptor_suffix: product.id
        .toUpperCase()
        .replace(/[^A-Z0-9 ]/g, '-')
        .slice(0, 22),
      ...(destinationAccount && {
        application_fee_amount: platformFee,
        transfer_data: { destination: destinationAccount },
      }),
    },
    metadata: {
      listing_id: product.id,
      buyer_id: buyerId ?? '',
      buyer_email: buyerEmail ?? '',
    },
    success_url: `${env.siteUrl}/order/success?id=${product.id}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.siteUrl}/marketplace/${product.id}?canceled=1`,
  })

  return NextResponse.json({ mock: false, redirectUrl: session.url })
}
