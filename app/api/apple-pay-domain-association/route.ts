import { NextResponse } from 'next/server'

// Stripe's Apple Pay domain verification. Stripe → Settings → Payments
// → Apple Pay → Add new domain (skillzy.ai) gives a verification file.
// Paste its contents into the STRIPE_APPLE_PAY_VERIFICATION env var
// (Vercel project skillzyai, Production + Preview), then Stripe can
// fetch and verify it at:
//   https://skillzy.ai/.well-known/apple-developer-merchantid-domain-association
// (rewritten to this route via next.config.js)
//
// Once verified, Apple Pay appears automatically as a wallet option
// in the embedded Payment Element. Re-verification isn't needed unless
// the domain or Stripe account changes.
export function GET() {
  const body = process.env.STRIPE_APPLE_PAY_VERIFICATION?.trim()
  if (!body) {
    return new NextResponse('Apple Pay verification not configured.', {
      status: 404,
    })
  }
  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
