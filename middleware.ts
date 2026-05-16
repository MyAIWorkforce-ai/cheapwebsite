import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl

  // 301 the legacy query-string filter URLs to the canonical
  // programmatic landing pages (SEO scope 2.5).
  if (url.pathname === '/marketplace') {
    const niche = url.searchParams.get('niche')
    const platform = url.searchParams.get('platform')
    if (niche) {
      return NextResponse.redirect(new URL(`/for/${niche}`, request.url), 301)
    }
    if (platform) {
      return NextResponse.redirect(
        new URL(`/platforms/${platform}`, request.url),
        301,
      )
    }
  }

  const res = await updateSession(request)

  // Capture creator referral attribution (scope 5.1) — 30-day cookie.
  const ref = url.searchParams.get('ref')
  if (ref) {
    res.cookies.set('skz_ref', ref, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      sameSite: 'lax',
    })
  }

  return res
}

export const config = {
  matcher: [
    // Run on every request except static assets and Next internals.
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
