import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { products, toCardProduct, type ProductType } from '@/lib/catalog'

export const metadata = {
  title: 'The catalogue',
  description:
    'Drop in. Agent supercharged. Browse skills, guides, and ready-to-go agent setups for Claude, OpenClaw, Hermes, n8n and more. Every listing reviewed by a human.',
  keywords: [
    'agent skills',
    'AI agent marketplace',
    'Claude skills',
    'n8n agents',
    'OpenClaw skills',
    'SKILL.md',
    'AI agent setups',
  ],
}

const filters: { label: string; type?: ProductType; key: string }[] = [
  { label: 'Agent Setups', type: 'Agent Setup', key: 'agent-setup' },
  { label: 'Skills', type: 'Skill', key: 'skill' },
  { label: 'Guides', type: 'Guide', key: 'guide' },
  { label: 'All', key: 'all' },
]

export default function MarketplacePage({
  searchParams,
}: {
  searchParams: { type?: string; q?: string; niche?: string; platform?: string }
}) {
  const activeKey = searchParams.type ?? 'all'
  const query = searchParams.q?.toLowerCase().trim()
  const niche = searchParams.niche?.toLowerCase().trim()
  const platform = searchParams.platform?.toLowerCase().trim()

  const filtered = products.filter((p) => {
    const f = filters.find((x) => x.key === activeKey)
    if (f?.type && p.type !== f.type) return false
    if (query) {
      const hay = `${p.title} ${p.tagline} ${p.creator.name} ${p.type} ${p.niche ?? ''}`.toLowerCase()
      if (!hay.includes(query)) return false
    }
    if (niche) {
      const slug = (p.niche ?? '').toLowerCase().replace(/\s+/g, '-')
      if (!slug.includes(niche) && (p.niche ?? '').toLowerCase() !== niche) return false
    }
    if (platform) {
      if (!p.platformList.some((pl) => pl.toLowerCase().includes(platform))) return false
    }
    return true
  })

  const platforms = Array.from(new Set(products.flatMap((p) => p.platformList))).sort()
  const niches = Array.from(new Set(products.map((p) => p.niche).filter(Boolean))) as string[]

  return (
    <div className="paper">
      <section className="px-6 lg:px-10 pt-14 pb-10 sm:pt-20 sm:pb-14 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            The goods
          </span>
          <h1
            className="font-display mt-5 text-5xl sm:text-7xl tracking-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            Drop in.{' '}
            <em className="italic text-brand-gold font-medium">Agent supercharged.</em>
          </h1>
          <p className="mt-5 text-brand-muted max-w-prose">
            Skills, guides, full agent setups. Every listing reviewed by a human.
            No mystery meat.
          </p>

          {/* search */}
          <form
            action="/marketplace"
            method="GET"
            className="mt-10 max-w-2xl"
          >
            <div className="flex items-baseline gap-3 border-b border-brand-ink pb-2">
              <svg
                aria-hidden
                className="w-4 h-4 text-brand-ink shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
                />
              </svg>
              <input
                type="search"
                name="q"
                defaultValue={searchParams.q ?? ''}
                placeholder="invoices, real estate, daily summary…"
                className="flex-1 bg-transparent outline-none font-display text-xl text-brand-ink placeholder:text-brand-muted/70 placeholder:italic"
                autoComplete="off"
              />
              <button
                type="submit"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-ink hover:text-brand-gold transition-colors"
              >
                Search →
              </button>
            </div>
          </form>
        </div>
      </section>

      <div className="max-w-page mx-auto px-6 lg:px-10 py-10 sm:py-14">
        {/* type tabs */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8 border-b border-brand-hairline pb-5">
          {filters.map((f) => {
            const active = f.key === activeKey
            const count =
              f.key === 'all'
                ? products.length
                : products.filter((p) => p.type === f.type).length
            return (
              <Link
                key={f.key}
                href={f.key === 'all' ? '/marketplace' : `/marketplace?type=${f.key}`}
                className={
                  'text-sm pb-1.5 border-b -mb-[21px] transition-colors ' +
                  (active
                    ? 'border-brand-gold text-brand-gold font-semibold'
                    : 'border-transparent text-brand-muted hover:text-brand-ink')
                }
              >
                {f.label}
                <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.18em]">
                  {count}
                </span>
              </Link>
            )
          })}
        </div>

        {/* niche + platform — quiet inline rows */}
        <div className="mb-10 space-y-3">
          <div className="flex items-baseline flex-wrap gap-x-1 gap-y-1.5 text-sm">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted mr-2">
              Niche
            </span>
            {niches.map((n, i) => {
              const slug = n.toLowerCase().replace(/\s+/g, '-')
              const active = niche === slug || niche === n.toLowerCase()
              const params = new URLSearchParams()
              if (activeKey !== 'all') params.set('type', activeKey)
              params.set('niche', slug)
              return (
                <span key={n} className="inline-flex items-baseline">
                  {i > 0 && (
                    <span className="text-brand-hairline px-0.5" aria-hidden>
                      ·
                    </span>
                  )}
                  <Link
                    href={`/marketplace?${params.toString()}`}
                    className={
                      'px-1.5 transition-colors ' +
                      (active
                        ? 'text-brand-gold font-semibold'
                        : 'text-brand-muted hover:text-brand-ink')
                    }
                  >
                    {n}
                  </Link>
                </span>
              )
            })}
            <span className="inline-flex items-baseline">
              <span className="text-brand-hairline px-0.5" aria-hidden>
                ·
              </span>
              <Link
                href={`/marketplace${activeKey !== 'all' ? `?type=${activeKey}` : ''}`}
                className={
                  'px-1.5 transition-colors ' +
                  (!niche
                    ? 'text-brand-gold font-semibold'
                    : 'text-brand-muted hover:text-brand-ink')
                }
              >
                All
              </Link>
            </span>
          </div>

          <div className="flex items-baseline flex-wrap gap-x-1 gap-y-1.5 text-sm">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted mr-2">
              Platform
            </span>
            {platforms.map((pl, i) => {
              const slug = pl.toLowerCase()
              const active = platform === slug
              const params = new URLSearchParams()
              if (activeKey !== 'all') params.set('type', activeKey)
              if (niche) params.set('niche', niche)
              params.set('platform', slug)
              return (
                <span key={pl} className="inline-flex items-baseline">
                  {i > 0 && (
                    <span className="text-brand-hairline px-0.5" aria-hidden>
                      ·
                    </span>
                  )}
                  <Link
                    href={`/marketplace?${params.toString()}`}
                    className={
                      'px-1.5 transition-colors ' +
                      (active
                        ? 'text-brand-gold font-semibold'
                        : 'text-brand-muted hover:text-brand-ink')
                    }
                  >
                    {pl}
                  </Link>
                </span>
              )
            })}
            <span className="inline-flex items-baseline">
              <span className="text-brand-hairline px-0.5" aria-hidden>
                ·
              </span>
              <Link
                href={`/marketplace${activeKey !== 'all' ? `?type=${activeKey}` : ''}${niche ? `${activeKey !== 'all' ? '&' : '?'}niche=${niche}` : ''}`}
                className={
                  'px-1.5 transition-colors ' +
                  (!platform
                    ? 'text-brand-gold font-semibold'
                    : 'text-brand-muted hover:text-brand-ink')
                }
              >
                All
              </Link>
            </span>
          </div>
        </div>

        {query && (
          <p className="mb-8 text-sm text-brand-muted">
            Results for{' '}
            <span className="text-brand-ink font-semibold">“{searchParams.q}”</span>.
          </p>
        )}

        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-3xl">Nothing matched. Try less.</p>
            <Link
              href="/marketplace"
              className="mt-4 inline-block text-sm border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
            >
              Clear filters →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-hairline border border-brand-hairline">
            {filtered.map((p, i) => (
              <ProductCard
                key={p.id}
                product={toCardProduct(p)}
                variant={i % 5 === 2 ? 'emerald' : 'cream'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
