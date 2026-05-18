import { createHmac, timingSafeEqual } from 'crypto'

// Unguessable token bound to a PaymentIntent, so the no-login download
// page can't be reached by enumerating/guessing PaymentIntent ids. The
// HMAC key is a server-only secret (never shipped to the client).
const KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.STRIPE_SECRET_KEY ||
  'skillzy-delivery-fallback'

export function deliveryToken(paymentIntentId: string): string {
  return createHmac('sha256', KEY).update(paymentIntentId).digest('base64url')
}

export function deliveryTokenValid(
  paymentIntentId: string,
  token?: string | null,
): boolean {
  if (!token) return false
  const a = Buffer.from(token)
  const b = Buffer.from(deliveryToken(paymentIntentId))
  return a.length === b.length && timingSafeEqual(a, b)
}

// Free listings have no PaymentIntent — bind delivery to the
// (listing, email) pair instead, same HMAC scheme.
function freeKey(listingId: string, email: string): string {
  return `free:${listingId}:${email.trim().toLowerCase()}`
}

export function freeToken(listingId: string, email: string): string {
  return deliveryToken(freeKey(listingId, email))
}

export function freeTokenValid(
  listingId: string,
  email: string,
  token?: string | null,
): boolean {
  if (!token) return false
  const a = Buffer.from(token)
  const b = Buffer.from(freeToken(listingId, email))
  return a.length === b.length && timingSafeEqual(a, b)
}
