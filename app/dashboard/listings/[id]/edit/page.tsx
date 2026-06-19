import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { hasSupabase } from '@/lib/env'
import { getProduct } from '@/lib/catalog'
import ShareListing from '@/components/ShareListing'
import EditForm, { type EditDefaults } from './EditForm'

export const metadata = {
  title: 'Edit listing',
  description: 'Update title, price, niche, platforms, and status on an existing Skillzy listing.',
  robots: { index: false, follow: false },
}

async function loadDefaults(
  id: string,
  userId: string | null,
): Promise<EditDefaults | null> {
  // No user signed in (preview / demo) -> read from the static seed catalogue.
  if (!hasSupabase || !userId) {
    const p = getProduct(id)
    if (!p) return null
    return {
      id: p.id,
      slug: id,
      title: p.title,
      tagline: p.tagline,
      price: Number(p.price.replace(/[^0-9.]/g, '')),
      niche: p.niche ?? '',
      platforms: p.platformList.join(', '),
      status: 'live',
      featuredTier: p.featured ? 'showcase' : null,
      files: [],
    }
  }

  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('listings')
      .select(
        'id, title, tagline, price_cents, niche, platform_list, status, featured_tier',
      )
      .eq('slug', id)
      .eq('creator_id', userId)
      .single()

    if (!data) return null

    const { data: filesRows } = await supabase
      .from('files')
      .select('id, name, size_bytes, created_at')
      .eq('listing_id', data.id)
      .order('created_at', { ascending: true })

    return {
      id: data.id,
      slug: id,
      title: data.title,
      tagline: data.tagline ?? '',
      price: Math.round((data.price_cents ?? 0) / 100),
      niche: data.niche ?? '',
      platforms: (data.platform_list ?? []).join(', '),
      status: data.status,
      featuredTier: (data.featured_tier as string | null) ?? null,
      files: (filesRows ?? []).map((f) => ({
        id: f.id as string,
        name: f.name as string,
        size_bytes: (f.size_bytes as number | null) ?? null,
      })),
    }
  } catch {
    return null
  }
}

export default async function EditListingPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { featured?: string }
}) {
  const user = await getUser()
  const defaults = await loadDefaults(params.id, user?.id ?? null)
  if (!defaults) notFound()

  const featuredFlash =
    searchParams.featured === '1'
      ? 'success'
      : searchParams.featured === 'cancelled'
        ? 'cancelled'
        : null

  return (
    <div className="paper">
      {/* breadcrumb */}
      <div className="max-w-page mx-auto px-6 lg:px-10 pt-8 sm:pt-10">
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted"
        >
          <Link href="/dashboard?view=selling" className="hover:text-brand-gold transition-colors">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/marketplace/${params.id}`}
            className="hover:text-brand-gold transition-colors"
          >
            {defaults.title}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brand-ink">Edit</span>
        </nav>
      </div>

      <section className="px-6 lg:px-10 pt-10 sm:pt-14 pb-20">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            Edit listing
          </span>
          <h1
            className="font-display mt-5 text-5xl sm:text-6xl tracking-tight leading-[0.95]"
            style={{ letterSpacing: '-0.03em' }}
          >
            Tweak. <em className="italic text-brand-gold font-medium">Save.</em>
          </h1>
          <p className="mt-5 text-brand-muted">
            Changes to live listings publish instantly.
          </p>
        </div>

        <div className="mt-12 max-w-2xl">
          <EditForm defaults={defaults} featuredFlash={featuredFlash} />
        </div>

        <div id="share" className="mt-12 max-w-2xl scroll-mt-20">
          <ShareListing
            slug={params.id}
            refHandle={user?.handle}
            title={defaults.title}
            tagline={defaults.tagline}
          />
        </div>
      </section>
    </div>
  )
}
