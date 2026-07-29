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
    // Upsert (not update) so a missing profile row doesn't silently
    // drop the connection. Older accounts created before the
    // handle_new_user trigger was hardened (2026-05-26) can lack a
    // profile row — a bare .update().eq() would return 0 rows
    // affected and silently proceed to redirect the creator to
    // ?onboarded=1 with nothing saved. Reproducing exactly this
    // bug for Badger Claw / @badgerclaw (2026-07-28).
    //
    // Also: if the update DOES affect a row but returns an error
    // (permission, network, etc.), log it loud and bounce to the
    // error page so the creator sees a real signal instead of the
    // false "onboarded=1" success flash.
    const upsertRes = await service
      .from('profiles')
      .upsert(
        { id: user.id, stripe_account_id: connectedAccountId },
        { onConflict: 'id' },
      )
      .select('id')
      .single()

    if (upsertRes.error) {
      console.error(
        'stripe-connect-return: profile upsert failed — connection NOT saved',
        {
          userId: user.id,
          connectedAccountId,
          error: upsertRes.error,
        },
      )
      return NextResponse.redirect(
        new URL('/dashboard/payouts?connect=error', request.url),
      )
    }

    // Reconcile payouts_enabled from the live account.
    await syncPayoutStatus(user.id)

    return NextResponse.redirect(
      new URL('/dashboard/payouts?onboarded=1', request.url),
    )
  } catch (err) {
    console.error('stripe-connect-return: unhandled failure', err)
    return NextResponse.redirect(
      new URL('/dashboard/payouts?connect=error', request.url),
    )
  }
}
