import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Webhook error'
    console.error('Webhook signature verification failed:', message)
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const meta = session.metadata || {}

    const orderData = {
      stripe_session_id: session.id,
      tier: meta.tier || '',
      price: (session.amount_total || 0) / 100,
      website_url: meta.websiteUrl || '',
      business_name: meta.businessName || '',
      what_to_update: meta.whatToUpdate || '',
      specific_requirements: meta.specificRequirements || '',
      name: meta.customerName || '',
      email: meta.email || session.customer_email || '',
      phone: meta.phone || '',
      status: 'paid',
    }

    // Save to Supabase
    const { error: dbError } = await supabase
      .from('website_orders')
      .insert([orderData])

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      // Don't fail the webhook — table may not exist yet
    }

    // Send notification email via Resend
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'toby@myaiworkforce.ai',
        subject: `New website order! ${meta.tier} - ${meta.businessName} - ${meta.websiteUrl}`,
        html: `
          <h2>New Website Order! 🎉</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px; font-weight: bold; border: 1px solid #eee;">Tier</td><td style="padding: 8px; border: 1px solid #eee;">${meta.tier}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border: 1px solid #eee;">Price</td><td style="padding: 8px; border: 1px solid #eee;">$${orderData.price} AUD</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border: 1px solid #eee;">Business</td><td style="padding: 8px; border: 1px solid #eee;">${meta.businessName}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border: 1px solid #eee;">Website URL</td><td style="padding: 8px; border: 1px solid #eee;"><a href="${meta.websiteUrl}">${meta.websiteUrl}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border: 1px solid #eee;">Customer</td><td style="padding: 8px; border: 1px solid #eee;">${meta.customerName}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border: 1px solid #eee;">Email</td><td style="padding: 8px; border: 1px solid #eee;"><a href="mailto:${meta.email}">${meta.email}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border: 1px solid #eee;">Phone</td><td style="padding: 8px; border: 1px solid #eee;">${meta.phone || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border: 1px solid #eee;">What to update</td><td style="padding: 8px; border: 1px solid #eee;">${meta.whatToUpdate}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border: 1px solid #eee;">Specific requirements</td><td style="padding: 8px; border: 1px solid #eee;">${meta.specificRequirements || 'None'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border: 1px solid #eee;">Stripe Session</td><td style="padding: 8px; border: 1px solid #eee;">${session.id}</td></tr>
          </table>
          <p style="margin-top: 20px;">
            <a href="https://cheapwebsite.com.au/admin" style="background: #2563EB; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold;">
              View in Admin →
            </a>
          </p>
        `,
      })
    } catch (emailErr) {
      console.error('Resend email error:', emailErr)
    }
  }

  return NextResponse.json({ received: true })
}
