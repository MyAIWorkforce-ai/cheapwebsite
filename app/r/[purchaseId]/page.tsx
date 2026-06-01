import Link from 'next/link'
import { reviewTokenValid } from '@/lib/review-token'
import { createServiceClient } from '@/lib/supabase/server'
import { hasSupabase } from '@/lib/env'
import ReviewForm from './ReviewForm'

export const metadata = {
  title: 'Rate your purchase — Skillzy',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

type ListingJoin = { title?: string | null; slug?: string | null }

function flattenListing(l: ListingJoin | ListingJoin[] | null): ListingJoin {
  if (!l) return {}
  return Array.isArray(l) ? (l[0] ?? {}) : l
}

function NotFound() {
  return (
    <div className="paper px-6 lg:px-10 py-24">
      <div className="max-w-xl mx-auto">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
          Rate your purchase
        </span>
        <h1
          className="font-display mt-4 text-4xl sm:text-5xl tracking-tight"
          style={{ letterSpacing: '-0.03em' }}
        >
          Link invalid or expired.
        </h1>
        <p className="mt-5 text-brand-muted">
          If you bought a Skillzy listing and want to leave a review, email{' '}
          <a
            href="mailto:help@skillzy.ai"
            className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
          >
            help@skillzy.ai
          </a>{' '}
          with your order number — we&rsquo;ll send a fresh link.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
        >
          ← Home
        </Link>
      </div>
    </div>
  )
}

export default async function ReviewPage({
  params,
  searchParams,
}: {
  params: { purchaseId: string }
  searchParams: { t?: string; s?: string }
}) {
  const token = searchParams.t ?? ''
  if (!reviewTokenValid(params.purchaseId, token) || !hasSupabase) {
    return <NotFound />
  }

  const db = createServiceClient()
  const { data: purchase } = await db
    .from('purchases')
    .select('id, status, listings:listing_id (title, slug)')
    .eq('id', params.purchaseId)
    .single()
  if (!purchase || purchase.status !== 'paid') return <NotFound />

  const { data: existing } = await db
    .from('reviews')
    .select('rating, body')
    .eq('purchase_id', params.purchaseId)
    .maybeSingle()

  const listing = flattenListing(
    purchase.listings as ListingJoin | ListingJoin[] | null,
  )
  const presetStars = parseInt(searchParams.s ?? '', 10)
  const validPreset = presetStars >= 1 && presetStars <= 5
  const initialStars =
    (existing?.rating as number | undefined) ?? (validPreset ? presetStars : 0)

  return (
    <div className="paper px-6 lg:px-10 py-16 sm:py-24">
      <div className="max-w-xl mx-auto">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
          Rate your purchase
        </span>
        <h1
          className="font-display mt-4 text-4xl sm:text-5xl tracking-tight leading-[1.05]"
          style={{ letterSpacing: '-0.03em' }}
        >
          How was{' '}
          <em className="italic font-medium text-brand-gold">
            {listing.title ?? 'your purchase'}
          </em>
          ?
        </h1>
        <p className="mt-4 text-brand-muted">
          {existing
            ? 'You can update your rating and add a comment any time.'
            : 'Tap your rating below. Add a comment if you have a minute.'}
        </p>

        <ReviewForm
          purchaseId={params.purchaseId}
          token={token}
          initialStars={initialStars}
          initialBody={(existing?.body as string | null) ?? ''}
          listingSlug={listing.slug ?? null}
          preselectFromUrl={!existing && validPreset}
        />
      </div>
    </div>
  )
}
