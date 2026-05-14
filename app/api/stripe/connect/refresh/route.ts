import { NextResponse, type NextRequest } from 'next/server'

// Stripe will redirect here if the onboarding link expires.
// Bounce the creator back to /sell so they can restart.
export async function GET(_request: NextRequest) {
  return NextResponse.redirect(new URL('/sell?stripe=refresh', _request.url))
}
