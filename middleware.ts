import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl

  // "All platforms" is the default catalogue view, not a real platform
  // slug, so /platforms/all has no page. Send it to the full marketplace
  // instead of 404ing.
  if (url.pathname === '/platforms/all') {
    return NextResponse.redirect(new URL('/marketplace', request.url), 301)
  }

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

  // Channel tag (?c=qr|social|post|profile|print|link) so creators
  // can see which surface actually converts.
  const ch = url.searchParams.get('c')
  if (ch) {
    res.cookies.set('skz_ch', ch.slice(0, 16), {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      sameSite: 'lax',
    })
  }

  // Affiliate attribution (?aff=<handle>) — 30-day cookie. Read at
  // sign-up to tag the new creator as referred by this affiliate.
  const aff = url.searchParams.get('aff')
  if (aff) {
    res.cookies.set('skz_aff', aff.slice(0, 64), {
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
