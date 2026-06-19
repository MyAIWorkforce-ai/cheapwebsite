import Link from 'next/link'
import { getUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { hasSupabase } from '@/lib/env'
import ShareListing from '@/components/ShareListing'
import ProfileShareKit from '@/components/ProfileShareKit'
import DoneInit from './DoneInit'
import ShowcaseOfferButton from './ShowcaseOfferButton'

export const metadata = {
  title: 'Listing live',
  robots: { index: false, follow: false },
}

function humanise(slug: string) {
  return slug
    .replace(/-[a-z0-9]{1,4}$/i, '')
    .replace(/-/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase())
}

async function loadListing(slug: string, userId?: string) {
  if (!hasSupabase || !userId) return null
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('listings')
      .select('title, tagline, featured_tier')
      .eq('slug', slug)
      .eq('creator_id', userId)
      .single()
    return data as {
      title: string
      tagline: string
      featured_tier: string | null
    } | null
  } catch {
    return null
  }
}

async function payoutsReady(userId?: string): Promise<boolean> {
  if (!hasSupabase || !userId) return false
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('profiles')
      .select('stripe_payouts_enabled')
      .eq('id', userId)
      .maybeSingle()
    return Boolean(data?.stripe_payouts_enabled)
  } catch {
    return false
  }
}

export default async function ListingDonePage({
  searchParams,
}: {
  searchParams: { slug?: string }
}) {
  const slug = searchParams.slug ?? ''
  const user = await getUser()
  const row = slug ? await loadListing(slug, user?.id) : null
  const canBePaid = await payoutsReady(user?.id)

  const title = row?.title ?? (slug ? humanise(slug) : 'Your listing')
  const tagline =
    row?.tagline ?? 'Drop-in AI agent skill — paste it in and go.'
  const displayName = user?.name ?? user?.email?.split('@')[0] ?? 'there'

  return (
    <div className="paper">
      <DoneInit />
      <section className="px-6 lg:px-10 pt-16 sm:pt-24 pb-12 sm:pb-16 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            ✿ Live
          </span>
          <h1
            className="font-display mt-5 text-5xl sm:text-7xl tracking-tight leading-[0.95]"
            style={{ letterSpacing: '-0.03em' }}
          >
            Done. Your listing is{' '}
            <em className="italic text-brand-gold font-medium">
              live.
            </em>
          </h1>
          <p className="mt-6 text-xl text-brand-ink max-w-2xl leading-snug">
            <span className="font-semibold">{title}</span> is{' '}
            <span className="font-semibold text-brand-gold-dark">live now</span>{' '}
            — buyers can find it, buy it, and download it immediately. Your
            link, QR code, and profile below all work straight away.
          </p>
          <p className="mt-4 text-brand-muted max-w-2xl">
            Don&rsquo;t wait for the marketplace to send buyers. You earn the
            same 80% when you send them yourself — and everything below already
            has your referral baked in. The creators who win are the ones who
            post the link everywhere in week one.
          </p>
        </div>
      </section>

      {/* Get-paid prompt — only if they haven't connected Stripe yet.
          This is the one thing standing between a sale and money in
          their account, so it sits above the share kit. */}
      {!canBePaid && (
        <section className="px-6 lg:px-10 py-10 sm:py-12 border-b border-brand-hairline bg-brand-gold/10">
          <div className="max-w-page mx-auto max-w-3xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              ⚠ One step left to get paid
            </span>
            <h2
              className="font-display mt-3 text-3xl sm:text-4xl tracking-tight"
              style={{ letterSpacing: '-0.025em' }}
            >
              Connect Stripe so your sales reach your bank.
            </h2>
            <p className="mt-3 text-brand-ink leading-relaxed">
              Your listing is live and buyable right now — but until you
              connect Stripe, any sale can&rsquo;t pay out to you. It&rsquo;s
              about 30 seconds: link your existing Stripe account (or make one
              in the same flow), confirm a couple of details, done. You keep
              80% of every sale, paid straight into your own account.
            </p>
            <Link
              href="/dashboard/payouts"
              className="mt-6 inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors"
            >
              Connect Stripe now
              <span aria-hidden>→</span>
            </Link>
            <p className="mt-3 text-xs text-brand-muted">
              Takes ~30 seconds. You can do it now or any time from your
              dashboard — but a sale before you connect will sit waiting.
            </p>
          </div>
        </section>
      )}

      {/* The kit, at peak motivation */}
      <section className="px-6 lg:px-10 py-12 sm:py-16 border-b border-brand-hairline">
        <div className="max-w-page mx-auto max-w-3xl space-y-10">
          <ShareListing
            slug={slug}
            refHandle={user?.handle}
            title={title}
            tagline={tagline}
          />
          <ProfileShareKit handle={user?.handle} name={displayName} />
        </div>
      </section>

      {/* Showcase upsell — only if this listing isn't already featured.
          Shows what the navy card looks like in situ + lets them buy
          the upgrade in one tap, while motivation is high. */}
      {row && row.featured_tier !== 'showcase' && (
        <section className="px-6 lg:px-10 py-14 sm:py-20 border-b border-brand-hairline bg-brand-navy text-brand-cream">
          <div className="max-w-page mx-auto max-w-3xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              ✿ Showcase — optional upgrade
            </span>
            <h2
              className="font-display mt-4 text-3xl sm:text-5xl tracking-tight leading-[1.05]"
              style={{ letterSpacing: '-0.025em' }}
            >
              Put it{' '}
              <em className="italic text-brand-gold font-medium">
                top of the marketplace.
              </em>
            </h2>
            <p className="mt-5 text-brand-cream/85 max-w-xl leading-relaxed">
              Showcase tier: your listing gets the premium navy card (the one
              you&rsquo;re looking at) and sorts above every standard listing
              on{' '}
              <span className="text-brand-cream font-semibold">
                /marketplace
              </span>
              , every niche page, and every platform page. One-time{' '}
              <span className="text-brand-gold font-semibold">$49</span>,
              permanent for v1. Early-bird launch price — goes up once we
              have conversion data behind it.
            </p>
            <p className="mt-4 text-brand-cream/65 text-sm max-w-xl">
              Skip it for now if you&rsquo;d rather see how the listing
              performs first — it&rsquo;s also available any time from
              Dashboard → Edit listing.
            </p>
            <div className="mt-7">
              <ShowcaseOfferButton slug={slug} />
            </div>
          </div>
        </section>
      )}

      {/* Next actions */}
      <section className="px-6 lg:px-10 py-14 sm:py-20">
        <div className="max-w-page mx-auto grid grid-cols-1 sm:grid-cols-2 gap-px bg-brand-hairline border border-brand-hairline">
          <Link
            href="/sell/new"
            className="bg-brand-cream-card p-8 hover:bg-white transition-colors group"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              Got more?
            </span>
            <p
              className="font-display mt-3 text-2xl sm:text-3xl tracking-tight"
              style={{ letterSpacing: '-0.025em' }}
            >
              List another{' '}
              <span className="text-brand-gold group-hover:translate-x-1 inline-block transition-transform">
                →
              </span>
            </p>
            <p className="mt-2 text-sm text-brand-muted">
              Skills sitting on GitHub? Import the next repo in one click.
            </p>
          </Link>
          <Link
            href="/dashboard?view=selling"
            className="bg-brand-cream-card p-8 hover:bg-white transition-colors group"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              Track it
            </span>
            <p
              className="font-display mt-3 text-2xl sm:text-3xl tracking-tight"
              style={{ letterSpacing: '-0.025em' }}
            >
              Go to dashboard{' '}
              <span className="text-brand-gold group-hover:translate-x-1 inline-block transition-transform">
                →
              </span>
            </p>
            <p className="mt-2 text-sm text-brand-muted">
              Sales, referral earnings, and listing status live here.
            </p>
          </Link>
        </div>
      </section>
    </div>
  )
}
