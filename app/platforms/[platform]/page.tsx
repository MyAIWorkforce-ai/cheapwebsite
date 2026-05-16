import Link from 'next/link'
import { notFound } from 'next/navigation'
import { products, toCardProduct } from '@/lib/catalog'
import { getAllPlatforms, getPlatform } from '@/lib/content'
import ProductCard from '@/components/ProductCard'
import StructuredData from '@/components/StructuredData'
import { pageMetadata } from '@/lib/seo'
import { breadcrumbLd, faqLd } from '@/lib/jsonld'
import { getAllPosts, readingMinutes } from '@/lib/blog'

export function generateStaticParams() {
  return getAllPlatforms().map((p) => ({ platform: p.slug }))
}

export function generateMetadata({
  params,
}: {
  params: { platform: string }
}) {
  const pl = getPlatform(params.platform)
  if (!pl) return { title: 'Not found — Skillzy' }
  const matches = products.filter((p) =>
    p.platformList.some((x) => x.toLowerCase() === pl.slug),
  )
  return pageMetadata({
    title: `${pl.name} Agent Skills, Setups & Templates — Skillzy`,
    description:
      `Ready-to-run skills and setups for ${pl.name}. Browse ${matches.length}+ listings reviewed by humans.`.slice(
        0,
        160,
      ),
    path: `/platforms/${pl.slug}`,
    keywords: [
      `${pl.name} agent`,
      `${pl.name} skills`,
      `${pl.name} automation`,
      'Skillzy',
    ],
  })
}

export default function PlatformPage({
  params,
}: {
  params: { platform: string }
}) {
  const pl = getPlatform(params.platform)
  if (!pl) notFound()

  const matches = products.filter((p) =>
    p.platformList.some((x) => x.toLowerCase() === pl.slug),
  )

  // Field Notes tagged for this platform — builds the platform →
  // post → listing internal-link cluster.
  const platformPosts = getAllPosts()
    .filter((post) =>
      post.tags.some((t) => t.toLowerCase() === pl.slug),
    )
    .slice(0, 3)

  return (
    <div className="paper">
      <StructuredData
        data={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Platforms', path: '/marketplace' },
            { name: pl.name, path: `/platforms/${pl.slug}` },
          ]),
          faqLd(pl.faq),
        ]}
      />

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
            Platforms
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brand-ink">{pl.name}</span>
        </nav>
      </div>

      <section className="px-6 lg:px-10 pt-10 sm:pt-14 pb-12 sm:pb-16 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            {pl.category === 'automation' ? 'Automation platform' : 'AI platform'}
          </span>
          <h1
            className="font-display mt-5 text-5xl sm:text-7xl tracking-tight leading-[0.95] max-w-4xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            {pl.name} agent skills,{' '}
            <em className="italic text-brand-gold font-medium">setups & templates.</em>
          </h1>
          <p className="mt-6 text-xl text-brand-ink max-w-3xl leading-snug">
            {pl.description}
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-14 sm:py-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <header className="lg:col-span-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              Why it matters
            </span>
            <h2
              className="font-display mt-3 text-3xl sm:text-4xl tracking-tight"
              style={{ letterSpacing: '-0.025em' }}
            >
              What you can build with {pl.name}.
            </h2>
          </header>
          <div className="lg:col-span-8 space-y-5 text-lg leading-relaxed text-brand-muted max-w-prose">
            <p>{pl.whyItMatters}</p>
            <p className="text-brand-ink">
              Typical setup time:{' '}
              <span className="font-semibold">{pl.setupTime}</span> for a single
              skill.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-14 sm:py-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
            <h2
              className="font-display text-3xl sm:text-5xl tracking-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              Listings for {pl.name}.
            </h2>
            <Link
              href="/marketplace"
              className="text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
            >
              Whole catalogue →
            </Link>
          </div>
          {matches.length === 0 ? (
            <div className="py-16 text-center bg-brand-cream-card border border-brand-hairline">
              <p className="font-display text-3xl">Nothing here yet.</p>
              <p className="mt-2 text-brand-muted">
                Be the first to publish a {pl.name} listing.
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

      <section className="px-6 lg:px-10 py-14 sm:py-20">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <header className="lg:col-span-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              FAQ
            </span>
            <h2
              className="font-display mt-3 text-3xl sm:text-4xl tracking-tight"
              style={{ letterSpacing: '-0.025em' }}
            >
              {pl.name}, answered.
            </h2>
          </header>
          <dl className="lg:col-span-8 divide-y divide-brand-hairline border-y border-brand-hairline">
            {pl.faq.map((f, i) => (
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

      {platformPosts.length > 0 && (
        <section className="px-6 lg:px-10 py-14 sm:py-20 border-t border-brand-hairline">
          <div className="max-w-page mx-auto">
            <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
              <h2
                className="font-display text-3xl sm:text-5xl tracking-tight"
                style={{ letterSpacing: '-0.03em' }}
              >
                Field Notes on{' '}
                <em className="italic text-brand-gold font-medium">
                  {pl.name}.
                </em>
              </h2>
              <Link
                href="/blog"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted hover:text-brand-gold transition-colors"
              >
                All Field Notes →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-hairline border border-brand-hairline">
              {platformPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-brand-cream-card p-6 sm:p-7 hover:bg-white transition-colors"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                    {readingMinutes(post)} min read
                  </span>
                  <h3
                    className="font-display text-xl sm:text-2xl mt-3 tracking-tight group-hover:text-brand-gold transition-colors"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm text-brand-muted leading-relaxed">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
