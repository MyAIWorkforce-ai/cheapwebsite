import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { claimOrphanPurchases } from '@/lib/auth'
import { hasSupabase } from '@/lib/env'

// OAuth + magic-link callback. Exchanges the code for a session, then bounces home.
export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const next = url.searchParams.get('next') ?? '/dashboard'

  if (hasSupabase && code) {
    const supabase = createClient()
    const {
      data: { session },
    } = await supabase.auth.exchangeCodeForSession(code)

    // Right after the session is established, claim any guest-checkout
    // purchases that were made with this email but never linked to an
    // account. Idempotent — safe even if the user has signed in before.
    if (session?.user?.email && session.user.id) {
      await claimOrphanPurchases({
        id: session.user.id,
        email: session.user.email,
      })
    }
  }

  return NextResponse.redirect(new URL(next, request.url))
}
