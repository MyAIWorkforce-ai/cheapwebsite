import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProduct, getRelated, products, toCardProduct } from '@/lib/catalog'
import ProductCard from '@/components/ProductCard'
import GuaranteeBadge from '@/components/GuaranteeBadge'
import EmailGate from '@/components/EmailGate'
import StructuredData from '@/components/StructuredData'
import { pageMetadata } from '@/lib/seo'
import { productLd, breadcrumbLd, faqLd } from '@/lib/jsonld'

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const p = getProduct(params.id)
  if (!p) return { title: 'Not found — Skillzy' }
  const ratingBit =
    p.ratingCount > 0 ? ` ${p.rating}★ (${p.ratingCount} reviews).` : ''
  return pageMetadata({
    title: `${p.title} — AI ${p.type} — Skillzy`,
    description: `${p.tagline} By ${p.creator.name}.${ratingBit}`.slice(0, 160),
    path: `/marketplace/${p.id}`,
    keywords: [
      p.type,
      p.niche,
      ...p.platformList,
      p.creator.name,
      'Skillzy',
    ].filter(Boolean) as string[],
  })
}

function Stars({ rating, className = '' }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className="inline-flex items-center gap-[2px]" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = rating - i >= 0.5
          return (
            <svg
              key={i}
              className={
                'w-3.5 h-3.5 ' +
                (filled ? 'text-brand-gold' : 'text-brand-hairline')
              }
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.05 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 0 0 .95.69h4.165c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 0 0-.364 1.118l1.287 3.96c.3.922-.756 1.688-1.539 1.118l-3.37-2.448a1 1 0 0 0-1.176 0l-3.37 2.448c-.783.57-1.838-.196-1.539-1.118l1.287-3.96a1 1 0 0 0-.363-1.118L2.06 9.387c-.783-.57-.38-1.81.588-1.81h4.165a1 1 0 0 0 .95-.69l1.286-3.96Z" />
            </svg>
          )
        })}
      </span>
      <span className="text-sm">{rating.toFixed(1)}</span>
    </span>
  )
}

export default function ProductDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const p = getProduct(params.id)
  if (!p) notFound()

  const isSetup = p.type === 'Agent Setup'
  const isGuide = p.type === 'Guide'

  const related = getRelated(p)

  const headlineCta =
    isSetup ? 'Get the setup' : isGuide ? 'Get the guide' : 'Get the skill'

  const filterTypeKey =
    p.type === 'Agent Setup' ? 'agent-setup' : p.type === 'Skill' ? 'skill' : 'guide'

  const filterLabel =
    p.type === 'Agent Setup' ? 'Agent Setups' : p.type === 'Skill' ? 'Skills' : 'Guides'

  return (
    <div className="paper">
      <StructuredData
        data={[
          productLd(p),
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Marketplace', path: '/marketplace' },
            { name: p.title, path: `/marketplace/${p.id}` },
          ]),
          ...(p.faqs && p.faqs.length > 0 ? [faqLd(p.faqs)] : []),
        ]}
      />
      {/* breadcrumb */}
      <div className="max-w-page mx-auto px-6 lg:px-10 pt-8 sm:pt-10">
        <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
          <Link href="/marketplace" className="hover:text-brand-gold transition-colors">
            Marketplace
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/marketplace?type=${filterTypeKey}`}
            className="hover:text-brand-gold transition-colors"
          >
            {filterLabel}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brand-ink">{p.title}</span>
        </nav>
      </div>

      {/* HERO */}
      <section className="px-6 lg:px-10 pt-10 sm:pt-14 pb-14 sm:pb-20">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                {p.type}
              </span>
              {p.niche && (
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                  · {p.niche}
                </span>
              )}
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                · {p.version} · Updated {p.updated}
              </span>
            </div>

            <h1
              className="font-display mt-5 text-5xl sm:text-7xl lg:text-[5.5rem] tracking-tight leading-[0.95]"
              style={{ letterSpacing: '-0.03em' }}
            >
              {p.title}
            </h1>
            <p className="mt-6 text-xl sm:text-2xl text-brand-muted leading-snug max-w-3xl">
              {p.tagline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <span>
                by{' '}
                <Link
                  href={`/creator/${p.creator.handle.replace(/^@/, '')}`}
                  className="font-semibold text-brand-ink border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
                >
                  {p.creator.name}
                </Link>{' '}
                <span className="text-brand-muted">{p.creator.handle}</span>
              </span>
              <Stars rating={p.rating} className="text-brand-ink" />
              <span className="text-brand-muted">({p.ratingCount} reviews)</span>
              <span className="text-brand-muted">·</span>
              <span className="text-brand-muted">
                {p.creator.totalSales.toLocaleString()} sales
              </span>
            </div>

            <div className="mt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted mb-2">
                Compatible with
              </p>
              <div className="flex flex-wrap gap-2">
                {p.platformList.map((platform) => (
                  <Link
                    key={platform}
                    href={`/platforms/${platform.toLowerCase()}`}
                    className="font-mono text-[11px] uppercase tracking-[0.18em] border border-brand-hairline px-2.5 py-1.5 text-brand-ink hover:border-brand-ink hover:bg-brand-navy hover:text-brand-cream transition-colors"
                  >
                    {platform}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* BUY CARD */}
          <aside className="lg:col-span-4">
            <div className="bg-brand-cream-card border border-brand-ink p-7 sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                Buy once. Yours forever.
              </p>
              <p
                className="font-display text-6xl sm:text-7xl mt-3 text-brand-ink"
                style={{ letterSpacing: '-0.04em' }}
              >
                {p.price}
              </p>
              <p className="text-sm text-brand-muted mt-2">
                {p.free
                  ? 'Free. Yours forever. Re-download any time.'
                  : `One-time. ${isSetup ? 'Re-installable forever.' : 'Re-download forever.'}`}
              </p>

              {p.free ? (
                <EmailGate listingId={p.id} ctaLabel={headlineCta} />
              ) : (
                <Link
                  href={`/checkout/${p.id}`}
                  className="mt-7 w-full inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors"
                >
                  {headlineCta}
                  <span aria-hidden>→</span>
                </Link>
              )}

              <ul className="mt-6 space-y-2.5 text-sm text-brand-ink">
                <li className="flex items-start gap-2">
                  <span aria-hidden className="text-brand-gold">✓</span>
                  Files emailed instantly
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden className="text-brand-gold">✓</span>
                  Re-download from your dashboard
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden className="text-brand-gold">✓</span>
                  Scanned + reviewed by Skillzy
                </li>
              </ul>

              <p className="mt-6 pt-5 border-t border-brand-hairline text-xs text-brand-muted">
                Secure checkout via Stripe. Creators keep 80% of every sale.
              </p>
            </div>

            <div className="mt-5">
              <GuaranteeBadge />
            </div>

            <p className="mt-5 text-xs text-brand-muted">
              New to this?{' '}
              <a
                href="/how-it-works"
                className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold"
              >
                How it works →
              </a>
            </p>
          </aside>
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="px-6 lg:px-10 py-16 sm:py-24 border-t border-brand-hairline">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2
              className="font-display text-4xl sm:text-5xl tracking-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              What it{' '}
              <em className="italic text-brand-gold font-medium">does.</em>
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-5 text-lg leading-relaxed">
            {p.description.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="px-6 lg:px-10 py-16 sm:py-24 border-t border-brand-hairline">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2
              className="font-display text-4xl sm:text-5xl tracking-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              What’s{' '}
              <em className="italic text-brand-gold font-medium">inside.</em>
            </h2>
            <p className="mt-3 text-brand-muted">
              Everything you need in the bundle. No tutorials. No assembly.
            </p>
          </div>
          <ul className="lg:col-span-8 space-y-px bg-brand-hairline border-t border-b border-brand-hairline">
            {p.whatYouGet.map((item, i) => (
              <li
                key={i}
                className="bg-brand-cream-card p-5 sm:p-6 flex items-baseline gap-5"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted shrink-0 w-10">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-base sm:text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 lg:px-10 py-16 sm:py-24 border-t border-brand-hairline">
        <div className="max-w-page mx-auto">
          <h2
            className="font-display text-4xl sm:text-6xl tracking-tight max-w-3xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            Drop it in.{' '}
            <em className="italic text-brand-gold font-medium">Press go.</em>
          </h2>

          <ol className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-hairline border border-brand-hairline">
            {p.howItWorks.map((step) => (
              <li key={step.n} className="bg-brand-cream-card p-7 sm:p-8">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                  №{step.n}
                </span>
                <h3
                  className="font-display text-2xl mt-4 tracking-tight"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-brand-muted leading-relaxed">
                  {step.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SKILL.MD PREVIEW */}
      {p.skillMdPreview && (
        <section className="px-6 lg:px-10 py-16 sm:py-24 border-t border-brand-hairline bg-brand-navy-deep text-brand-cream">
          <div className="max-w-page mx-auto">
            <div className="flex items-end justify-between gap-6 flex-wrap mb-8 sm:mb-10">
              <h2
                className="font-display text-4xl sm:text-6xl tracking-tight"
                style={{ letterSpacing: '-0.03em' }}
              >
                How it{' '}
                <em className="italic text-brand-gold-soft font-medium">thinks.</em>
              </h2>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cream/70">
                Excerpt · {p.type === 'Guide' ? 'guide.md' : 'SKILL.md'}
              </span>
            </div>
            <pre className="font-mono text-[13px] sm:text-sm leading-relaxed bg-brand-navy-deep border border-brand-cream/15 p-5 sm:p-8 overflow-x-auto whitespace-pre">
              <code>{p.skillMdPreview}</code>
            </pre>
          </div>
        </section>
      )}

      {/* USE CASES */}
      {p.useCases && p.useCases.length > 0 && (
        <section className="px-6 lg:px-10 py-16 sm:py-24 border-t border-brand-hairline">
          <div className="max-w-page mx-auto">
            <h2
              className="font-display text-4xl sm:text-6xl tracking-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              Who plugs{' '}
              <em className="italic text-brand-gold font-medium">this in.</em>
            </h2>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-hairline border border-brand-hairline">
              {p.useCases.map((u, i) => (
                <div key={i} className="bg-brand-cream-card p-7 sm:p-8">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                    {u.who}
                  </span>
                  <p className="mt-4 text-lg leading-relaxed">{u.what}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CREATOR */}
      <section className="px-6 lg:px-10 py-16 sm:py-24 border-t border-brand-hairline">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2
              className="font-display text-4xl sm:text-5xl tracking-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              About the{' '}
              <em className="italic text-brand-gold font-medium">creator.</em>
            </h2>
          </div>
          <div className="lg:col-span-8">
            <div className="bg-brand-cream-card border border-brand-hairline p-7 sm:p-9">
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <Link
                  href={`/creator/${p.creator.handle.replace(/^@/, '')}`}
                  className="font-display text-3xl tracking-tight hover:text-brand-gold transition-colors"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {p.creator.name}
                </Link>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                  {p.creator.handle}
                </span>
              </div>
              <p className="mt-4 text-lg max-w-prose">{p.creator.bio}</p>

              <dl className="mt-7 grid grid-cols-3 gap-4 sm:gap-6 max-w-md">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                    Sales
                  </dt>
                  <dd className="font-display text-2xl mt-1">
                    {p.creator.totalSales.toLocaleString()}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                    Rating
                  </dt>
                  <dd className="font-display text-2xl mt-1">
                    {p.rating.toFixed(1)}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                    Joined
                  </dt>
                  <dd className="font-display text-2xl mt-1">{p.creator.joined}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="px-6 lg:px-10 py-16 sm:py-24 border-t border-brand-hairline">
        <div className="max-w-page mx-auto">
          <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
            <div>
              <h2
                className="font-display text-4xl sm:text-6xl tracking-tight"
                style={{ letterSpacing: '-0.03em' }}
              >
                What buyers{' '}
                <em className="italic text-brand-gold font-medium">say.</em>
              </h2>
              <div className="mt-4 flex items-center gap-3">
                <Stars rating={p.rating} />
                <span className="text-sm text-brand-muted">
                  Based on {p.ratingCount} verified buyers
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-hairline border border-brand-hairline">
            {p.reviews.map((r, i) => (
              <article key={i} className="bg-brand-cream-card p-7 sm:p-8">
                <Stars rating={r.rating} />
                <p className="mt-4 text-base leading-relaxed text-brand-ink">
                  “{r.body}”
                </p>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                  {r.author}
                  {r.location ? ` · ${r.location}` : ''} · {r.date}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-10 py-16 sm:py-24 border-t border-brand-hairline">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2
              className="font-display text-4xl sm:text-5xl tracking-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              Things people{' '}
              <em className="italic text-brand-gold font-medium">ask.</em>
            </h2>
          </div>
          <dl className="lg:col-span-8 divide-y divide-brand-hairline border-y border-brand-hairline">
            {p.faqs.map((faq, i) => (
              <div key={i} className="py-6 sm:py-7">
                <dt className="font-display text-xl sm:text-2xl tracking-tight">
                  {faq.q}
                </dt>
                <dd className="mt-3 text-base text-brand-muted leading-relaxed max-w-prose">
                  {faq.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* SLIM CTA + REPORT */}
      <section className="px-6 lg:px-10 py-10 sm:py-14 border-t border-brand-hairline">
        <div className="max-w-page mx-auto flex items-center justify-between flex-wrap gap-6">
          <a
            href={`mailto:hi@skillzy.ai?subject=Report%20listing%20${encodeURIComponent(p.id)}`}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted hover:text-brand-ink transition-colors"
          >
            Report this listing
          </a>
          <Link
            href={p.free ? '#top' : `/checkout/${p.id}`}
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-3.5 text-[15px] hover:bg-brand-gold-dark transition-colors"
          >
            {headlineCta} — {p.free ? 'Free' : p.price}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="px-6 lg:px-10 py-20 sm:py-28">
          <div className="max-w-page mx-auto">
            <h2
              className="font-display text-4xl sm:text-6xl tracking-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              You might also{' '}
              <em className="italic text-brand-gold font-medium">drop in.</em>
            </h2>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-hairline border border-brand-hairline">
              {related.map((r, i) => (
                <ProductCard
                  key={r.id}
                  product={toCardProduct(r)}
                  variant={i === 1 ? 'emerald' : 'cream'}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky mobile buy bar — lg:hidden, always reachable */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-brand-ink bg-brand-cream-card/95 backdrop-blur supports-[backdrop-filter]:bg-brand-cream-card/80">
        <div className="flex items-center justify-between gap-4 px-5 py-3">
          <div className="min-w-0">
            <p className="font-display text-2xl leading-none" style={{ letterSpacing: '-0.03em' }}>
              {p.free ? 'Free' : p.price}
            </p>
            <p className="text-[11px] text-brand-muted truncate">{p.title}</p>
          </div>
          <Link
            href={p.free ? '#top' : `/checkout/${p.id}`}
            className="shrink-0 inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-5 py-3 text-sm hover:bg-brand-gold-dark transition-colors"
          >
            {headlineCta}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
      {/* spacer so the sticky bar never covers footer content on mobile */}
      <div className="lg:hidden h-20" aria-hidden />
    </div>
  )
}
