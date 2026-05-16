import Link from 'next/link'
import { notFound } from 'next/navigation'
import { products, toCardProduct } from '@/lib/catalog'
import {
  getAllNiches,
  getNiche,
  getPlatform,
  nicheSlug,
} from '@/lib/content'
import ProductCard from '@/components/ProductCard'
import StructuredData from '@/components/StructuredData'
import { pageMetadata } from '@/lib/seo'
import { breadcrumbLd, faqLd } from '@/lib/jsonld'

export function generateStaticParams() {
  return getAllNiches().map((n) => ({ niche: n.slug }))
}

export function generateMetadata({ params }: { params: { niche: string } }) {
  const n = getNiche(params.niche)
  if (!n) return { title: 'Not found — Skillzy' }
  return pageMetadata({
    title: `AI Agents for ${n.name} — Skillzy`,
    description:
      `Drop-in AI agent skills, setups, and guides built for ${n.pluralLong}. No SKILL.md syntax required.`.slice(
        0,
        160,
      ),
    path: `/for/${n.slug}`,
    keywords: [
      `AI agent for ${n.name.toLowerCase()}`,
      `${n.name} automation`,
      `${n.name} AI`,
      'Skillzy',
    ],
  })
}

export default function NichePage({ params }: { params: { niche: string } }) {
  const n = getNiche(params.niche)
  if (!n) notFound()

  const matches = products.filter(
    (p) => p.niche && nicheSlug(p.niche) === n.slug,
  )
  const platforms = Array.from(
    new Set(matches.flatMap((p) => p.platformList)),
  ).slice(0, 10)
  const related = n.relatedNiches
    .map((s) => getNiche(s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))

  return (
    <div className="paper">
      <StructuredData
        data={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'For', path: '/marketplace' },
            { name: n.name, path: `/for/${n.slug}` },
          ]),
          faqLd(n.faq),
        ]}
      />

      {/* breadcrumb */}
      <div className="max-w-page mx-auto px-6 lg:px-10 pt-8 sm:pt-10">
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted"
        >
          <Link href="/" className="hover:text-brand-gold transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/marketplace" className="hover:text-brand-gold transition-colors">
            For
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brand-ink">{n.name}</span>
        </nav>
      </div>

      {/* hero */}
      <section className="px-6 lg:px-10 pt-10 sm:pt-14 pb-12 sm:pb-16 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            For {n.name.toLowerCase()}
          </span>
          <h1
            className="font-display mt-5 text-5xl sm:text-7xl tracking-tight leading-[0.95] max-w-4xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            AI agents for {n.name},{' '}
            <em className="italic text-brand-gold font-medium">ready to drop in.</em>
          </h1>
          <p className="mt-6 text-xl text-brand-ink max-w-3xl leading-snug">
            {n.problemStatement}
          </p>
          <div className="mt-8">
            <a
              href="#listings"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors"
            >
              Browse {n.name.toLowerCase()} listings
              <span aria-hidden>↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* what they automate */}
      <section className="px-6 lg:px-10 py-14 sm:py-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <h2
            className="font-display text-3xl sm:text-5xl tracking-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            What they automate.
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-hairline border border-brand-hairline">
            {n.commonTasks.map((t, i) => (
              <div key={i} className="bg-brand-cream-card p-6 sm:p-7">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3
                  className="font-display text-xl sm:text-2xl mt-3 tracking-tight"
                  style={{ letterSpacing: '-0.018em' }}
                >
                  {t.title}
                </h3>
                <p className="mt-2 text-sm text-brand-muted leading-relaxed">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* listings */}
      <section id="listings" className="px-6 lg:px-10 py-14 sm:py-20 border-b border-brand-hairline scroll-mt-20">
        <div className="max-w-page mx-auto">
          <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
            <h2
              className="font-display text-3xl sm:text-5xl tracking-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              Listings for {n.name.toLowerCase()}.
            </h2>
            <Link
              href="/marketplace"
              className="text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
            >
              See the whole catalogue →
            </Link>
          </div>

          {matches.length === 0 ? (
            <div className="py-16 text-center bg-brand-cream-card border border-brand-hairline">
              <p className="font-display text-3xl">First mover advantage.</p>
              <p className="mt-2 text-brand-muted">
                No {n.name.toLowerCase()} listings yet — be the creator who
                owns this niche.
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
        </div>
      </section>

      {/* ROI */}
      <section className="px-6 lg:px-10 py-14 sm:py-20 border-b border-brand-hairline bg-brand-navy text-brand-cream">
        <div className="max-w-page mx-auto max-w-3xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cream/70">
            Real ROI
          </span>
          <p className="mt-5 font-display text-2xl sm:text-3xl leading-snug tracking-tight">
            {n.exampleROI}
          </p>
        </div>
      </section>

      {/* works with */}
      {platforms.length > 0 && (
        <section className="px-6 lg:px-10 py-14 sm:py-16 border-b border-brand-hairline">
          <div className="max-w-page mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              Works with
            </span>
            <div className="mt-5 flex flex-wrap gap-3">
              {platforms.map((pl) => {
                const slug = pl.toLowerCase()
                const p = getPlatform(slug)
                return p ? (
                  <Link
                    key={pl}
                    href={`/platforms/${p.slug}`}
                    className="inline-flex items-center border border-brand-ink px-4 py-2 text-sm hover:bg-brand-navy hover:text-brand-cream hover:border-brand-navy transition-colors"
                  >
                    {pl}
                  </Link>
                ) : (
                  <span
                    key={pl}
                    className="inline-flex items-center border border-brand-hairline px-4 py-2 text-sm text-brand-muted"
                  >
                    {pl}
                  </span>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="px-6 lg:px-10 py-14 sm:py-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <header className="lg:col-span-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              FAQ
            </span>
            <h2
              className="font-display mt-3 text-3xl sm:text-4xl tracking-tight"
              style={{ letterSpacing: '-0.025em' }}
            >
              Straight answers.
            </h2>
          </header>
          <dl className="lg:col-span-8 divide-y divide-brand-hairline border-y border-brand-hairline">
            {n.faq.map((f, i) => (
              <div key={i} className="py-6">
                <dt
                  className="font-display text-xl tracking-tight"
                  style={{ letterSpacing: '-0.018em' }}
                >
                  {f.q}
                </dt>
                <dd className="mt-2 text-brand-muted leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* related niches + blog link */}
      <section className="px-6 lg:px-10 py-14 sm:py-20">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            Related
          </span>
          <div className="mt-5 flex flex-wrap gap-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/for/${r.slug}`}
                className="inline-flex items-center border border-brand-ink px-4 py-2 text-sm hover:bg-brand-navy hover:text-brand-cream hover:border-brand-navy transition-colors"
              >
                AI agents for {r.name}
              </Link>
            ))}
            <Link
              href="/sell"
              className="inline-flex items-center border border-brand-ink px-4 py-2 text-sm hover:bg-brand-navy hover:text-brand-cream hover:border-brand-navy transition-colors"
            >
              Sell a {n.name.toLowerCase()} listing →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
