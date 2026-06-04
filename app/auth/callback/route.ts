import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { createServiceClient } from '@/lib/supabase/server'
import { claimOrphanPurchases } from '@/lib/auth'
import { env, hasSupabase } from '@/lib/env'

// OAuth, magic-link, AND password-recovery callback.
//
// Two important things this route does differently from the previous
// version:
//
// 1. The Supabase server client writes session cookies onto OUR
//    redirect response (not next/headers). In a Route Handler that
//    returns NextResponse.redirect(), the next/headers cookies jar
//    does NOT propagate to the redirect response — so the browser
//    never received the session cookies after exchangeCodeForSession.
//    That's why magic-link sign-ins landed on /dashboard logged out.
//
// 2. The redirect response is created up front and threaded through
//    so every cookie write goes onto it.
export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  // Only allow same-site relative paths as `next` (guards against an
  // open-redirect via a crafted ?next=https://evil.com).
  const rawNext = url.searchParams.get('next')
  const next =
    rawNext && rawNext.startsWith('/') && !rawNext.startsWith('//')
      ? rawNext
      : '/dashboard'

  // Build the redirect response first so the Supabase client can
  // mutate ITS cookies. Without this the Set-Cookie headers get
  // dropped between the exchange and the user's browser.
  const response = NextResponse.redirect(new URL(next, request.url))

  if (hasSupabase && code) {
    const supabase = createServerClient(
      env.supabase.url,
      env.supabase.anonKey,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            response.cookies.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            response.cookies.set({ name, value: '', ...options })
          },
        },
      },
    )

    const {
      data: { session },
      error,
    } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      // Bad/expired/already-used code. Send to signin with a friendly
      // message rather than to /dashboard logged out.
      const url = new URL('/signin', request.url)
      url.searchParams.set(
        'error',
        'That link is no longer valid. Request a new one.',
      )
      return NextResponse.redirect(url)
    }

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
        session.user.app_metadata = nextMeta
      } catch (err) {
        console.error('admin new-user / welcome email failed', err)
      }
    }

    // GitHub OAuth: stash the provider access token in app_metadata so
    // the /api/github/* routes can pull a creator's private repos. The
    // provider_token is ONLY present in the session right after the
    // OAuth code exchange — never again — so we have to capture it here.
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

  return response
}
