import { createHmac, timingSafeEqual } from 'crypto'

// Signed state for the Stripe Connect OAuth handshake. Binds the
// authorize request to the signed-in user so an attacker can't trick a
// logged-in creator into linking the ATTACKER's Stripe account to the
// victim's Skillzy profile (which would redirect the victim's payouts).
const KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.STRIPE_SECRET_KEY ||
  'skillzy-connect-state-fallback'

export function signConnectState(userId: string): string {
  const sig = createHmac('sha256', KEY).update(userId).digest('base64url')
  return `${userId}.${sig}`
}

export function verifyConnectState(
  state: string | null | undefined,
): string | null {
  if (!state) return null
  const dot = state.lastIndexOf('.')
  if (dot < 1) return null
  const userId = state.slice(0, dot)
  const provided = state.slice(dot + 1)
  const expected = createHmac('sha256', KEY).update(userId).digest('base64url')
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  return userId
}
