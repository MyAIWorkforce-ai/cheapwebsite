import { NextResponse, type NextRequest } from 'next/server'
import { getStripe, hasStripe } from '@/lib/stripe'
import { hasSupabase } from '@/lib/env'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { syncPayoutStatus } from '@/lib/stripe-connect'
import { verifyConnectState } from '@/lib/connect-state'

/**
 * Stripe OAuth callback. The creator has authorised their own Stripe
 * account; Stripe sends us a `code` + our signed `state`. We:
 *   1. verify state matches the signed-in user (CSRF guard),
 *   2. exchange the code for their real account id (stripe_user_id),
 *   3. save it + reconcile payout status,
 * then bounce them to the payouts page.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const error = url.searchParams.get('error')

  // Creator declined / Stripe returned an error.
  if (error) {
    return NextResponse.redirect(
      new URL('/dashboard/payouts?connect=cancelled', request.url),
    )
  }

  if (!hasStripe || !hasSupabase || !code) {
    return NextResponse.redirect(
      new URL('/dashboard/payouts?connect=error', request.url),
    )
  }

  try {
    const stateUserId = verifyConnectState(state)

    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // State must be valid AND match the currently signed-in user.
    if (!user || !stateUserId || stateUserId !== user.id) {
      return NextResponse.redirect(
        new URL('/dashboard/payouts?connect=error', request.url),
      )
    }

    // Exchange the authorization code for the connected account id.
    const token = await getStripe().oauth.token({
      grant_type: 'authorization_code',
      code,
    })
    const connectedAccountId = token.stripe_user_id
    if (!connectedAccountId) {
      return NextResponse.redirect(
        new URL('/dashboard/payouts?connect=error', request.url),
      )
    }

    const service = createServiceClient()
    await service
      .from('profiles')
      .update({ stripe_account_id: connectedAccountId })
      .eq('id', user.id)

    // Reconcile payouts_enabled from the live account.
    await syncPayoutStatus(user.id)

    return NextResponse.redirect(
      new URL('/dashboard/payouts?onboarded=1', request.url),
    )
  } catch {
    return NextResponse.redirect(
      new URL('/dashboard/payouts?connect=error', request.url),
    )
  }
}
