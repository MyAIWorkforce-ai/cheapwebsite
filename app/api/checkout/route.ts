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
    // Tell the team which demo someone tried to buy — a demand signal.
    try {
      const { getProduct } = await import('@/lib/catalog')
      const { sendDemoBuyAttemptNotification } = await import(
        '@/lib/email/admin-notification'
      )
      await sendDemoBuyAttemptNotification({
        title: getProduct(id)?.title ?? id,
        id,
        email: email ?? null,
      })
    } catch (err) {
      console.error('demo buy-attempt email failed', err)
    }
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
      // Fall through to the guard below.
    }
  }

  // BLOCK paid sales when the creator hasn't connected Stripe yet —
  // without a destination, the entire amount would route to the
  // Skillzy platform and the creator would get nothing. The UI hides
  // the Buy button in this case; this is the defense-in-depth layer
  // so a direct POST can't bypass it.
  if (!destinationAccount) {
    return NextResponse.json(
      {
        error:
          "This creator hasn't enabled payouts yet, so we can't accept your purchase. We'll open it the moment they connect Stripe.",
      },
      { status: 403 },
    )
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

  // Push the Skillzy brand onto the card statement as hard as the API
  // allows: a full "SKILLZY <product>" descriptor when the account
  // permits a dynamic one, else a SKILLZY suffix, else the account
  // default — but never fail checkout over a descriptor.
  const skillzyDescriptor = `SKILLZY ${product.title}`
    .toUpperCase()
    .replace(/[^A-Z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 22)

  // Suffix appended AFTER the account's own descriptor ("SKILLZY AI").
  // Use the product name only — NOT "SKILLZY" — so statements read
  // "SKILLZY AI* <PRODUCT>" instead of the doubled "SKILLZY AI* SKILLZY".
  const descriptorSuffix =
    product.title
      .toUpperCase()
      .replace(/[^A-Z0-9 ]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 10) || 'SKILL'

  const baseParams = {
    amount: unitAmountCents,
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
    description: product.title,
    ...(destinationAccount && {
      application_fee_amount: platformFee,
      transfer_data: { destination: destinationAccount },
    }),
    metadata: {
      listing_id: product.id,
      // Creator's @handle — saved on every charge so monthly reporting can
      // filter by metadata.creator_handle in the Stripe dashboard. Lets
      // Toby separate Skillzy House revenue from MyAIWorkforce revenue
      // in the connected Stripe account without picking through line items.
      creator_handle: product.creator.handle.replace(/^@/, ''),
      buyer_id: buyerId ?? '',
      buyer_email: (buyerEmail ?? '').trim().toLowerCase(),
      referrer_slug: request.cookies.get('skz_ref')?.value ?? '',
      referrer_channel: request.cookies.get('skz_ch')?.value ?? '',
    },
  }

  async function createPaymentIntent() {
    try {
      return await stripe.paymentIntents.create({
        ...baseParams,
        statement_descriptor: skillzyDescriptor,
      })
    } catch {
      try {
        return await stripe.paymentIntents.create({
          ...baseParams,
          statement_descriptor_suffix: descriptorSuffix,
        })
      } catch {
        return await stripe.paymentIntents.create(baseParams)
      }
    }
  }
  const intent = await createPaymentIntent()

  return NextResponse.json({
    mock: false,
    clientSecret: intent.client_secret,
    publishableKey: env.stripe.publishableKey,
  })
}
