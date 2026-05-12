import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { getUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { hasSupabase } from '@/lib/env'
import { getProduct } from '@/lib/catalog'
import EditForm, { type EditDefaults } from './EditForm'

export const metadata = {
  title: 'Edit listing — Skillzy',
}

async function loadDefaults(id: string, userId: string): Promise<EditDefaults | null> {
  if (!hasSupabase) {
    // Demo fallback: read from the static seed catalogue.
    const p = getProduct(id)
    if (!p) return null
    return {
      id: p.id,
      title: p.title,
      tagline: p.tagline,
      price: Number(p.price.replace(/[^0-9.]/g, '')),
      niche: p.niche ?? '',
      platforms: p.platformList.join(', '),
      status: 'live',
    }
  }

  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('listings')
      .select('id, title, tagline, price_cents, niche, platform_list, status')
      .eq('id', id)
      .eq('creator_id', userId)
      .single()

    if (!data) return null
    return {
      id: data.id,
      title: data.title,
      tagline: data.tagline ?? '',
      price: Math.round((data.price_cents ?? 0) / 100),
      niche: data.niche ?? '',
      platforms: (data.platform_list ?? []).join(', '),
      status: data.status,
    }
  } catch {
    return null
  }
}

export default async function EditListingPage({
  params,
}: {
  params: { id: string }
}) {
  const user = await getUser()

  if (hasSupabase && !user) {
    redirect(`/signin?next=/dashboard/listings/${params.id}/edit`)
  }

  const defaults = await loadDefaults(params.id, user?.id ?? 'demo')
  if (!defaults) notFound()

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
            Changes to live listings publish instantly. Big rewrites kick off
            another quick human review.
          </p>
        </div>

        <div className="mt-12 max-w-2xl">
          <EditForm defaults={defaults} />
        </div>
      </section>
    </div>
  )
}
