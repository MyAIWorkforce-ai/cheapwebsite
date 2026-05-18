import { NextResponse, type NextRequest } from 'next/server'
import { getStripe, hasStripe, platformFeeAmount } from '@/lib/stripe'
import { env } from '@/lib/env'
import { resolveProduct, isSeedProductId } from '@/lib/listings'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { hasSupabase } from '@/lib/env'

// Config probe — lets the checkout page initialise the embedded Stripe
// Payment Element (deferred mode) before a PaymentIntent exists, without
// leaking any secret. The intent itself is created by POST at submit time.
export async function GET() {
  return NextResponse.json({
    mock: !hasStripe,
    publishableKey: env.stripe.publishableKey,
  })
}

export async function POST(request: NextRequest) {
  const { id, email } = (await request.json().catch(() => ({}))) as {
    id?: string
    email?: string
  }

  if (!id) {
    return NextResponse.json({ error: 'Missing listing id' }, { status: 400 })
  }

  // 1. Demo/showcase listings are not for sale (no files to deliver).
  if (isSeedProductId(id)) {
    return NextResponse.json(
      { error: 'This is a sample listing and isn’t for sale yet.' },
      { status: 403 },
    )
  }

  // 2. Resolve the real (DB-backed) listing.
  const product = await resolveProduct(id)
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

  // 5. Create a PaymentIntent. We deliberately use the embedded Payment
  //    Element (not hosted Checkout) so the buyer stays on a Skillzy-branded
  //    page and never sees the underlying shared Stripe account's name.
  //    No receipt_email is set — Skillzy sends its own branded confirmation
  //    via Resend from the webhook, so Stripe's account-branded receipt
  //    never reaches the buyer.
  const stripe = getStripe()
  const intent = await stripe.paymentIntents.create({
    amount: unitAmountCents,
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
    description: product.title,
    // Card statement suffix — appears after the account-level prefix.
    // Stripe truncates to 22 chars and strips disallowed characters.
    statement_descriptor_suffix: product.id
      .toUpperCase()
      .replace(/[^A-Z0-9 ]/g, '-')
      .slice(0, 22),
    ...(destinationAccount && {
      application_fee_amount: platformFee,
      transfer_data: { destination: destinationAccount },
    }),
    metadata: {
      listing_id: product.id,
      buyer_id: buyerId ?? '',
      buyer_email: buyerEmail ?? '',
      referrer_slug: request.cookies.get('skz_ref')?.value ?? '',
      referrer_channel: request.cookies.get('skz_ch')?.value ?? '',
    },
  })

  return NextResponse.json({
    mock: false,
    clientSecret: intent.client_secret,
    publishableKey: env.stripe.publishableKey,
  })
}
