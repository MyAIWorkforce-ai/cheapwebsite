import { NextResponse } from 'next/server'
import { getStripe, hasStripe } from '@/lib/stripe'
import { env, hasSupabase } from '@/lib/env'
import { createClient, createServiceClient } from '@/lib/supabase/server'

export async function POST() {
  if (!hasStripe || !hasSupabase) {
    return NextResponse.json(
      { error: 'Stripe Connect requires Stripe + Supabase keys' },
      { status: 400 },
    )
  }

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 })
  }

  const stripe = getStripe()
  const service = createServiceClient()

  try {
    const { data: profile } = await service
      .from('profiles')
      .select('stripe_account_id')
      .eq('id', user.id)
      .single()

    let accountId = profile?.stripe_account_id as string | null

    if (!accountId) {
      const account = await stripe.accounts.create({
        type: 'express',
        email: user.email,
        capabilities: {
          transfers: { requested: true },
          card_payments: { requested: true },
        },
        business_type: 'individual',
        metadata: { skillzy_user_id: user.id },
      })
      accountId = account.id
      await service
        .from('profiles')
        .update({ stripe_account_id: accountId })
        .eq('id', user.id)
    }

    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${env.siteUrl}/api/stripe/connect/refresh`,
      return_url: `${env.siteUrl}/dashboard?view=selling&onboarded=1`,
      type: 'account_onboarding',
    })

    return NextResponse.json({ url: accountLink.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Stripe Connect error'
    console.error('Stripe Connect onboarding failed', err)
    return NextResponse.json(
      {
        error:
          'Couldn’t start Stripe payout onboarding. This usually means Stripe Connect isn’t enabled on the platform account yet. (' +
          message +
          ')',
      },
      { status: 502 },
    )
  }
}
