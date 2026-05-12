import Stripe from 'stripe'
import { env, hasStripe } from '@/lib/env'

let cached: Stripe | null = null

export function getStripe(): Stripe {
  if (!hasStripe) {
    throw new Error('Stripe is not configured. Set STRIPE_SECRET_KEY.')
  }
  if (!cached) {
    cached = new Stripe(env.stripe.secretKey, {
      apiVersion: '2026-03-25.dahlia',
      typescript: true,
    })
  }
  return cached
}

export { hasStripe }

// Skillzy's marketplace cut.
export const PLATFORM_FEE_PERCENT = 20

export function platformFeeAmount(unitAmountCents: number) {
  return Math.round(unitAmountCents * (PLATFORM_FEE_PERCENT / 100))
}
