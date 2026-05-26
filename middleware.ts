import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // "All platforms" is the default marketplace view, not a real platform
  // slug, so /platforms/all has no page. Send it to the full catalogue
  // instead of 404ing.
  if (request.nextUrl.pathname === '/platforms/all') {
    return NextResponse.redirect(new URL('/marketplace', request.url), 301)
  }

  return await updateSession(request)
}

export const config = {
  matcher: [
    // Run on every request except static assets and Next internals.
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
