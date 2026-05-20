import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/catalog'
import { createServiceClient } from '@/lib/supabase/server'
import { hasSupabase, hasStripe } from '@/lib/env'

export const metadata = {
  title: 'Plugged in',
  description: 'Your Skillzy purchase is ready to drop into your agent.',
  robots: { index: false, follow: false },
}

function Sticker({
  children,
  rotate = '-3deg',
}: {
  children: React.ReactNode
  rotate?: string
}) {
  return (
    <span
      className="inline-block font-mono text-[11px] uppercase tracking-[0.18em] px-3 py-1.5 bg-brand-gold text-brand-ink"
      style={{ transform: `rotate(${rotate})` }}
    >
      {children}
    </span>
  )
}

type Resolved = {
  product: ReturnType<typeof getProduct>
  email: string
  orderId: string
}

async function resolvePurchase(
  sessionId: string | undefined,
  fallbackSlug: string | undefined,
): Promise<Resolved | null> {
  // Demo mode (no Stripe + no Supabase): allow a fallback slug lookup so
  // the prototype still demos. No PII is shown.
  if (!hasStripe && !hasSupabase && fallbackSlug) {
    const product = getProduct(fallbackSlug)
    if (!product) return null
    return { product, email: '', orderId: 'DEMO' }
  }

  if (!sessionId || !hasSupabase) return null

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('purchases')
    .select('buyer_email, listing_id, status, listings:listing_id (slug)')
    .eq('stripe_checkout_session_id', sessionId)
    .maybeSingle()
  if (error || !data || data.status !== 'paid') return null

  const slug = (data.listings as { slug?: string } | null)?.slug
  if (!slug) return null
  const product = getProduct(slug)
  if (!product) return null

  return {
    product,
    email: (data.buyer_email as string) ?? '',
    orderId: sessionId.replace('cs_', '').slice(0, 12).toUpperCase(),
  }
}

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: { id?: string; session_id?: string }
}) {
  const resolved = await resolvePurchase(searchParams.session_id, searchParams.id)
  if (!resolved) notFound()

  const { product: p, email, orderId } = resolved

  return (
    <div className="paper">
      <section className="px-6 lg:px-10 pt-16 sm:pt-24 pb-20 sm:pb-28">
        <div className="max-w-page mx-auto">
          <Sticker rotate="-2.5deg">Plugged in ✿ Done.</Sticker>

          <h1
            className="font-display mt-7 text-[3.5rem] sm:text-[6.5rem] lg:text-[8rem] leading-[0.9] tracking-tight"
            style={{ letterSpacing: '-0.035em' }}
          >
            That was{' '}
            <em className="italic text-brand-gold font-medium">easy.</em>
          </h1>

          <p className="mt-8 text-xl text-brand-ink max-w-2xl">
            {email ? (
              <>
                Your bundle is on its way to{' '}
                <span className="font-semibold">{email}</span>. It’ll also live
                on your dashboard, re-downloadable forever.
              </>
            ) : (
              <>Your bundle lives on your dashboard, re-downloadable forever.</>
            )}
          </p>

          {p && (
            <div className="mt-12 bg-brand-cream-card border border-brand-ink p-7 sm:p-9 max-w-3xl">
              <div className="flex items-start justify-between gap-6 flex-wrap">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                    {p.type} · {p.platformList.join(' · ')}
                  </p>
                  <p
                    className="font-display mt-3 text-3xl sm:text-4xl tracking-tight leading-tight"
                    style={{ letterSpacing: '-0.025em' }}
                  >
                    {p.title}
                  </p>
                  <p className="mt-2 text-sm text-brand-muted">
                    by {p.creator.name}
                  </p>
                </div>
                <span
                  className="font-display text-3xl text-brand-gold"
                  style={{ letterSpacing: '-0.025em' }}
                >
                  {p.price}
                </span>
              </div>
            </div>
          )}

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-px bg-brand-hairline border border-brand-hairline max-w-2xl">
            <div className="bg-brand-cream-card p-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                Order
              </span>
              <p
                className="font-display text-2xl mt-2"
                style={{ letterSpacing: '-0.02em' }}
              >
                №{orderId}
              </p>
            </div>
            {email && (
              <div className="bg-brand-cream-card p-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                  Sent to
                </span>
                <p
                  className="font-display text-lg mt-2 break-all"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {email}
                </p>
              </div>
            )}
          </div>

          <div className="mt-12 flex flex-wrap gap-3 sm:gap-4 items-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors"
            >
              Go to my dashboard
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/marketplace"
              className="text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
            >
              Browse more
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
