import Link from 'next/link'
import { products, toCardProduct } from '@/lib/catalog'
import ProductCard from '@/components/ProductCard'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Latest on Skillzy — The Dispatch',
  description:
    'The newest skills, setups, and guides on Skillzy. Built by humans, dropped into your agent. Updated continuously.',
  path: '/dispatch',
  keywords: ['new AI agent skills', 'latest Skillzy listings', 'new SKILL.md'],
})

// Public "what's new" surface — shareable, indexable, zero-maintenance.
// Newsletter *sending* lives in Beehiiv; this is the on-site archive.
export default function DispatchPage() {
  // Featured first, then the rest — newest-feeling ordering without
  // fragile date math on seed data.
  const ordered = [...products].sort(
    (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false),
  )
  const latest = ordered.slice(0, 24)

  return (
    <div className="paper">
      <section className="px-6 lg:px-10 pt-16 sm:pt-24 pb-12 sm:pb-16 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            The Dispatch
          </span>
          <h1
            className="font-display mt-5 text-5xl sm:text-7xl tracking-tight leading-[0.95]"
            style={{ letterSpacing: '-0.03em' }}
          >
            Fresh off the{' '}
            <em className="italic text-brand-gold font-medium">bench.</em>
          </h1>
          <p className="mt-6 text-xl text-brand-ink max-w-2xl leading-snug">
            The newest skills, setups, and guides — built and tested by the
            humans who do the work. Want it in your inbox every other Friday?
            Sign up in the footer.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-14 sm:py-20">
        <div className="max-w-page mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-hairline border border-brand-hairline">
            {latest.map((p) => (
              <ProductCard
                key={p.id}
                product={toCardProduct(p)}
                variant={p.featured ? 'emerald' : 'cream'}
              />
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/marketplace"
              className="text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
            >
              See the whole catalogue →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
