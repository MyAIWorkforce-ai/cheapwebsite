/**
 * POST /api/listings/[id]/feature-checkout
 *
 * Creates a Stripe Checkout session for the one-time $49 Showcase
 * featured-listing upgrade. The session goes to the Skillzy platform
 * account (NOT to the creator) — no Connect transfer, no application
 * fee. The webhook (kind === 'feature' metadata) flips
 * listings.featured_tier when the session settles.
 *
 * Auth: signed-in creator who owns the listing only.
 */
import { NextResponse, type NextRequest } from 'next/server'
import { getStripe, hasStripe } from '@/lib/stripe'
import { env, hasSupabase } from '@/lib/env'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

// Locked at $49 for the early-bird Showcase tier. Raise once we
// have conversion proof to put behind the price.
const FEATURE_PRICE_CENTS = 4900
const FEATURE_TIER = 'showcase' as const

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  if (!hasStripe) {
    return NextResponse.json(
      { error: 'Stripe is not configured.' },
      { status: 503 },
    )
  }
  if (!hasSupabase) {
    return NextResponse.json(
      { error: 'Supabase is not configured.' },
      { status: 503 },
    )
  }

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Sign in to feature a listing.' }, { status: 401 })
  }

  // Resolve listing by slug or id; either is acceptable since
  // /dashboard/listings/[id]/edit accepts both as the URL param.
  const { data: listing } = await supabase
    .from('listings')
    .select('id, slug, title, creator_id, featured_tier')
    .or(`slug.eq.${params.id},id.eq.${params.id}`)
    .single()

  if (!listing) {
    return NextResponse.json({ error: 'Listing not found.' }, { status: 404 })
  }
  if (listing.creator_id !== user.id) {
    return NextResponse.json(
      { error: 'You can only feature your own listings.' },
      { status: 403 },
    )
  }
  if (listing.featured_tier === FEATURE_TIER) {
    return NextResponse.json(
      { error: 'This listing is already featured.' },
      { status: 409 },
    )
  }

  const site = env.siteUrl.replace(/\/$/, '')
  const stripe = getStripe()

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: FEATURE_PRICE_CENTS,
            product_data: {
              name: 'Skillzy Showcase — featured listing',
              description: `Premium navy card + top placement for "${listing.title}". One-time, permanent.`,
            },
          },
        },
      ],
      // Metadata is how the webhook routes this away from a normal
      // listing purchase (kind === 'feature' takes the upgrade path
      // instead of recording a buyer purchase).
      metadata: {
        kind: 'feature',
        listing_id: listing.id as string,
        feature_tier: FEATURE_TIER,
        creator_id: user.id,
      },
      payment_intent_data: {
        // Same kind tag on the intent so a webhook that only sees the
        // intent (not the session) can still route correctly.
        metadata: {
          kind: 'feature',
          listing_id: listing.id as string,
          feature_tier: FEATURE_TIER,
        },
        // Statement descriptor suffix so the creator's card statement
        // reads "SKILLZY AI* SHOWCASE" not just the default.
        statement_descriptor_suffix: 'SHOWCASE',
      },
      success_url: `${site}/dashboard/listings/${listing.slug}/edit?featured=1`,
      cancel_url: `${site}/dashboard/listings/${listing.slug}/edit?featured=cancelled`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    )
  }
}
