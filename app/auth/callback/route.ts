import { NextResponse, type NextRequest } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { claimOrphanPurchases } from '@/lib/auth'
import { hasSupabase } from '@/lib/env'

// OAuth + magic-link callback. Exchanges the code for a session, then bounces home.
export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  // Only allow same-site relative paths as `next` (guards against an
  // open-redirect via a crafted ?next=https://evil.com).
  const rawNext = url.searchParams.get('next')
  const next = rawNext && rawNext.startsWith('/') && !rawNext.startsWith('//')
    ? rawNext
    : '/dashboard'

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
      // Tag this account if they arrived via an affiliate link. No-op
      // if no cookie, already referred, or self-referral.
      const { attributeReferral } = await import('@/lib/affiliate')
      await attributeReferral(session.user.id)
    }

    // First time we've seen this account → ping the Skillzy team AND
    // send the new creator the welcome email. Both gated by an
    // admin-only app_metadata flag (the user can't set it from the
    // client), so each fires exactly once per signup. Never blocks login.
    if (session?.user?.id && !session.user.app_metadata?.admin_notified) {
      try {
        const admin = createServiceClient()
        const userEmail = session.user.email ?? null
        const userName =
          (session.user.user_metadata?.name as string | undefined) ?? null
        const userHandle =
          (session.user.user_metadata?.user_name as string | undefined) ??
          (session.user.user_metadata?.preferred_username as
            | string
            | undefined) ??
          null
        const { sendNewUserNotification } = await import(
          '@/lib/email/admin-notification'
        )
        await sendNewUserNotification({
          email: userEmail,
          name: userName,
          handle: userHandle,
        })
        if (userEmail) {
          const { sendWelcomeEmail } = await import('@/lib/email/welcome')
          await sendWelcomeEmail({ to: userEmail, name: userName })
        }
        const nextMeta = { ...session.user.app_metadata, admin_notified: true }
        await admin.auth.admin.updateUserById(session.user.id, {
          app_metadata: nextMeta,
        })
        // Keep the in-memory copy in sync so the GitHub block below merges
        // onto it instead of clobbering the flag we just set.
        session.user.app_metadata = nextMeta
      } catch (err) {
        console.error('admin new-user / welcome email failed', err)
      }
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
