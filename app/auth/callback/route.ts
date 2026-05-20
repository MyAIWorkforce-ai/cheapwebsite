import { NextResponse, type NextRequest } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
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

    // GitHub OAuth: stash the provider access token in app_metadata so
    // the /api/github/* routes can pull a creator's private repos. The
    // provider_token is ONLY present in the session right after the
    // OAuth code exchange — never again — so we have to capture it
    // here. app_metadata is admin-controlled (the user can't tamper
    // with it from the client).
    const providerToken = session?.provider_token
    if (
      providerToken &&
      session?.user?.app_metadata?.provider === 'github' &&
      session.user.id
    ) {
      try {
        const admin = createServiceClient()
        await admin.auth.admin.updateUserById(session.user.id, {
          app_metadata: {
            ...session.user.app_metadata,
            github_access_token: providerToken,
          },
        })
      } catch (err) {
        console.error('Failed to store GitHub access token', err)
      }
    }
  }

  return NextResponse.redirect(new URL(next, request.url))
}
