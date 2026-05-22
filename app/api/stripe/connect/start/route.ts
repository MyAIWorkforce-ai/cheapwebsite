import { NextResponse } from 'next/server'
import { hasStripe } from '@/lib/stripe'
import { env, hasSupabase } from '@/lib/env'
import { createClient } from '@/lib/supabase/server'
import { signConnectState } from '@/lib/connect-state'

/**
 * Standard Connect via OAuth. Sends the creator to Stripe to authorise
 * their OWN existing Stripe account (not a new Express account). After
 * they approve, Stripe redirects to /api/stripe/connect/return with a
 * code we exchange for their account id. Sales then pay 80% straight
 * into the account they already use — visible in their normal Stripe
 * dashboard.
 *
 * Requires STRIPE_CONNECT_CLIENT_ID (ca_…) from the platform Stripe
 * Connect settings, and the return URL registered there as a redirect.
 */
export async function POST() {
  if (!hasStripe || !hasSupabase) {
    return NextResponse.json(
      { error: 'Stripe Connect requires Stripe + Supabase keys' },
      { status: 400 },
    )
  }

  const clientId = process.env.STRIPE_CONNECT_CLIENT_ID
  if (!clientId) {
    return NextResponse.json(
      {
        error:
          'Stripe Connect isn’t finished setting up. (Missing STRIPE_CONNECT_CLIENT_ID — see OFFICE-LIST.)',
      },
      { status: 503 },
    )
  }

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 })
  }

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: 'read_write',
    redirect_uri: `${env.siteUrl}/api/stripe/connect/return`,
    state: signConnectState(user.id),
    'stripe_user[email]': user.email ?? '',
  })

  return NextResponse.json({
    url: `https://connect.stripe.com/oauth/authorize?${params.toString()}`,
  })
}
