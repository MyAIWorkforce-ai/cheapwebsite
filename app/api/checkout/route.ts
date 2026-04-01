import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const tierPriceMap: Record<string, number> = {
  'Quick Fix': 29700,
  'Full Refresh': 59700,
  'Complete Rebuild': 99700,
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      tier,
      price,
      websiteUrl,
      businessName,
      whatToUpdate,
      specificRequirements,
      name,
      email,
      phone,
    } = body

    const unitAmount = tierPriceMap[tier] || price * 100

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      currency: 'aud',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'aud',
            unit_amount: unitAmount,
            product_data: {
              name: `CheapWebsite — ${tier}`,
              description: `Website refresh for ${businessName} (${websiteUrl})`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        tier,
        websiteUrl: websiteUrl || '',
        businessName: businessName || '',
        whatToUpdate: (whatToUpdate || '').substring(0, 500),
        specificRequirements: (specificRequirements || '').substring(0, 500),
        customerName: name || '',
        email: email || '',
        phone: phone || '',
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://cheapwebsite.com.au'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://cheapwebsite.com.au'}/submit`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    console.error('Stripe checkout error:', err)
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
