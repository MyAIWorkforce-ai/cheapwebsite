import { createHmac, timingSafeEqual } from 'crypto'

// HMAC-signed token bound to a purchase id, so review-request emails
// can carry an unguessable link that the no-login /r/<purchaseId>
// page can verify. Mirrors lib/delivery-token.ts. The HMAC key is a
// server-only secret (never shipped to the client).
const KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.STRIPE_SECRET_KEY ||
  'skillzy-review-fallback'

export function reviewToken(purchaseId: string): string {
  return createHmac('sha256', KEY)
    .update(`review:${purchaseId}`)
    .digest('base64url')
}

export function reviewTokenValid(
  purchaseId: string,
  token?: string | null,
): boolean {
  if (!token) return false
  const a = Buffer.from(token)
  const b = Buffer.from(reviewToken(purchaseId))
  return a.length === b.length && timingSafeEqual(a, b)
}
