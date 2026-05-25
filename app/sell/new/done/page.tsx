import Link from 'next/link'
import { getUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { hasSupabase } from '@/lib/env'
import ShareListing from '@/components/ShareListing'
import ProfileShareKit from '@/components/ProfileShareKit'
import DoneInit from './DoneInit'

export const metadata = {
  title: 'Listing submitted',
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
      .select('title, tagline')
      .eq('slug', slug)
      .eq('creator_id', userId)
      .single()
    return data as { title: string; tagline: string } | null
  } catch {
    return null
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
