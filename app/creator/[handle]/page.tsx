import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  allCreatorHandles,
  getCreatorByHandle,
  getProductsByCreatorHandle,
  toCardProduct,
} from '@/lib/catalog'
import ProductCard from '@/components/ProductCard'

export function generateStaticParams() {
  return allCreatorHandles().map((handle) => ({ handle }))
}

export function generateMetadata({ params }: { params: { handle: string } }) {
  const creator = getCreatorByHandle(params.handle)
  if (!creator) return { title: 'Creator not found — Skillzy' }
  return {
    title: `${creator.name} — Skillzy`,
    description: creator.bio,
  }
}

export default function CreatorPage({ params }: { params: { handle: string } }) {
  const creator = getCreatorByHandle(params.handle)
  const items = getProductsByCreatorHandle(params.handle)
  if (!creator || items.length === 0) notFound()

  const avgRating =
    items.reduce((acc, p) => acc + p.rating * p.ratingCount, 0) /
    Math.max(
      1,
      items.reduce((acc, p) => acc + p.ratingCount, 0),
    )

  return (
    <div className="paper">
      {/* breadcrumb */}
      <div className="max-w-page mx-auto px-6 lg:px-10 pt-8 sm:pt-10">
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted"
        >
          <Link href="/marketplace" className="hover:text-brand-gold transition-colors">
            Marketplace
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brand-ink">{creator.name}</span>
        </nav>
      </div>

      {/* HERO */}
      <section className="px-6 lg:px-10 pt-10 sm:pt-14 pb-16 sm:pb-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            Creator · {creator.handle}
          </span>
          <h1
            className="font-display mt-5 text-5xl sm:text-7xl lg:text-[7rem] tracking-tight leading-[0.95]"
            style={{ letterSpacing: '-0.03em' }}
          >
            {creator.name}
          </h1>
          <p className="mt-7 text-xl text-brand-ink max-w-2xl leading-relaxed">
            {creator.bio}
          </p>

          <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-px bg-brand-hairline border border-brand-hairline max-w-3xl">
            <div className="bg-brand-cream-card p-5">
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                Sales
              </dt>
              <dd
                className="font-display text-3xl mt-1.5 text-brand-gold"
                style={{ letterSpacing: '-0.03em' }}
              >
                {creator.totalSales.toLocaleString()}
              </dd>
            </div>
            <div className="bg-brand-cream-card p-5">
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                Listings
              </dt>
              <dd
                className="font-display text-3xl mt-1.5"
                style={{ letterSpacing: '-0.03em' }}
              >
                {items.length}
              </dd>
            </div>
            <div className="bg-brand-cream-card p-5">
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                Avg rating
              </dt>
              <dd
                className="font-display text-3xl mt-1.5"
                style={{ letterSpacing: '-0.03em' }}
              >
                {avgRating.toFixed(1)}
              </dd>
            </div>
            <div className="bg-brand-cream-card p-5">
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                Joined
              </dt>
              <dd
                className="font-display text-3xl mt-1.5"
                style={{ letterSpacing: '-0.03em' }}
              >
                {creator.joined}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* LISTINGS */}
      <section className="px-6 lg:px-10 py-16 sm:py-24">
        <div className="max-w-page mx-auto">
          <h2
            className="font-display text-4xl sm:text-6xl tracking-tight mb-10"
            style={{ letterSpacing: '-0.03em' }}
          >
            What they{' '}
            <em className="italic text-brand-gold font-medium">sell.</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-hairline border border-brand-hairline">
            {items.map((p, i) => (
              <ProductCard
                key={p.id}
                product={toCardProduct(p)}
                variant={i % 5 === 2 ? 'emerald' : 'cream'}
              />
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${normalizeHandleEmail(creator.handle)}`}
              className="text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
            >
              Contact {creator.name} →
            </a>
            <Link
              href="/marketplace"
              className="text-sm text-brand-muted hover:text-brand-ink transition-colors"
            >
              Back to the catalogue
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function normalizeHandleEmail(handle: string) {
  const h = handle.replace(/^@/, '').toLowerCase()
  return `${h}@creator.skillzy.ai`
}
