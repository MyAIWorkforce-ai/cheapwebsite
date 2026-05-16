import Link from 'next/link'
import { notFound } from 'next/navigation'
import { products, toCardProduct } from '@/lib/catalog'
import {
  getNiche,
  getPlatform,
  nicheSlug,
  COMBO_PAGES,
} from '@/lib/content'
import ProductCard from '@/components/ProductCard'
import StructuredData from '@/components/StructuredData'
import { pageMetadata } from '@/lib/seo'
import { breadcrumbLd } from '@/lib/jsonld'

// Only the 10 highest-intent combos are pre-rendered (scope 2.4).
export function generateStaticParams() {
  return COMBO_PAGES
}

export function generateMetadata({
  params,
}: {
  params: { niche: string; platform: string }
}) {
  const n = getNiche(params.niche)
  const pl = getPlatform(params.platform)
  if (!n || !pl) return { title: 'Not found — Skillzy' }
  return pageMetadata({
    title: `${pl.name} AI Agents for ${n.name} — Skillzy`,
    description:
      `${pl.name} skills and setups built for ${n.pluralLong}. Drop-in, human-reviewed, no code.`.slice(
        0,
        160,
      ),
    path: `/for/${n.slug}/${pl.slug}`,
    keywords: [
      `${pl.name} ${n.name.toLowerCase()}`,
      `AI agent ${n.name.toLowerCase()} ${pl.name}`,
      'Skillzy',
    ],
  })
}

export default function ComboPage({
  params,
}: {
  params: { niche: string; platform: string }
}) {
  const n = getNiche(params.niche)
  const pl = getPlatform(params.platform)
  if (!n || !pl) notFound()

  const matches = products.filter(
    (p) =>
      p.niche &&
      nicheSlug(p.niche) === n.slug &&
      p.platformList.some((x) => x.toLowerCase() === pl.slug),
  )

  return (
    <div className="paper">
      <StructuredData
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: n.name, path: `/for/${n.slug}` },
          { name: pl.name, path: `/for/${n.slug}/${pl.slug}` },
        ])}
      />

      <div className="max-w-page mx-auto px-6 lg:px-10 pt-8 sm:pt-10">
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted"
        >
          <Link href={`/for/${n.slug}`} className="hover:text-brand-gold transition-colors">
            {n.name}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brand-ink">{pl.name}</span>
        </nav>
      </div>

      <section className="px-6 lg:px-10 pt-10 sm:pt-14 pb-12 sm:pb-16 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            {pl.name} · {n.name}
          </span>
          <h1
            className="font-display mt-5 text-5xl sm:text-7xl tracking-tight leading-[0.95] max-w-4xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            {pl.name} agents for {n.name},{' '}
            <em className="italic text-brand-gold font-medium">drop-in.</em>
          </h1>
          <p className="mt-6 text-xl text-brand-ink max-w-3xl leading-snug">
            {n.problemStatement} {pl.whyItMatters}
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-14 sm:py-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <h2
            className="font-display text-3xl sm:text-5xl tracking-tight mb-10"
            style={{ letterSpacing: '-0.03em' }}
          >
            {pl.name} listings for {n.name.toLowerCase()}.
          </h2>
          {matches.length === 0 ? (
            <div className="py-16 text-center bg-brand-cream-card border border-brand-hairline">
              <p className="font-display text-3xl">Open lane.</p>
              <p className="mt-2 text-brand-muted">
                No {pl.name} listings for {n.name.toLowerCase()} yet.{' '}
                <Link
                  href={`/for/${n.slug}`}
                  className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold"
                >
                  See all {n.name.toLowerCase()} listings
                </Link>{' '}
                or be first to build one.
              </p>
              <Link
                href="/sell"
                className="mt-6 inline-block text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
              >
                Start selling →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-hairline border border-brand-hairline">
              {matches.map((p) => (
                <ProductCard
                  key={p.id}
                  product={toCardProduct(p)}
                  variant={p.featured ? 'emerald' : 'cream'}
                />
              ))}
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={`/for/${n.slug}`}
              className="inline-flex items-center border border-brand-ink px-4 py-2 text-sm hover:bg-brand-navy hover:text-brand-cream hover:border-brand-navy transition-colors"
            >
              All AI agents for {n.name}
            </Link>
            <Link
              href={`/platforms/${pl.slug}`}
              className="inline-flex items-center border border-brand-ink px-4 py-2 text-sm hover:bg-brand-navy hover:text-brand-cream hover:border-brand-navy transition-colors"
            >
              All {pl.name} listings
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
