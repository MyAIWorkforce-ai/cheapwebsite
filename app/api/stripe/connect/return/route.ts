import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { syncPayoutStatus } from '@/lib/stripe-connect'

// Stripe redirects the seller here after onboarding. There is no
// webhook, so this is where we reconcile `stripe_payouts_enabled`
// from the live Stripe account before sending them back to the
// dashboard. Always resilient — a sync failure must not strand the
// seller on an error page.
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      await syncPayoutStatus(user.id)
    }
  } catch {
    /* fall through — the payouts page self-heals on next view */
  }
  return NextResponse.redirect(
    new URL('/dashboard?view=selling&onboarded=1', request.url),
  )
}
