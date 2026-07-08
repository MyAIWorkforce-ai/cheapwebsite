import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import MarketplaceFilters from '@/components/MarketplaceFilters'
import { products, toCardProduct, NICHES, PLATFORMS, type ProductType } from '@/lib/catalog'
import { liveDbProducts } from '@/lib/listings'
import { pageMetadata } from '@/lib/seo'

// Canonical strips query strings → /marketplace?type=skill etc. all
// canonicalise to https://skillzy.ai/marketplace (per SEO scope 1.1).
export const metadata = pageMetadata({
  title: 'Browse AI Agent Skills, Guides, Prompt Packs, Setups & Loops — Skillzy',
  description:
    'Drop-in AI agent skills, guides, prompt packs, full setups, and scheduled loops built by creators in the field. Filter by trade, platform, or type. Works with Claude, n8n, OpenClaw, Make, Zapier.',
  path: '/marketplace',
  keywords: [
    'AI agent skills',
    'AI agent marketplace',
    'AI prompt packs',
    'AI agent loops',
    'scheduled AI workflows',
    'Claude skills',
    'n8n agents',
    'OpenClaw skills',
    'SKILL.md',
    'AI agent setups',
  ],
})

const filters: { label: string; type?: ProductType; key: string }[] = [
  { label: 'Skills', type: 'Skill', key: 'skill' },
  { label: 'Guides', type: 'Guide', key: 'guide' },
  { label: 'Prompt Packs', type: 'Prompt Pack', key: 'prompt-pack' },
  { label: 'Loops', type: 'Loop', key: 'loop' },
  { label: 'Full Agent Setups', type: 'Agent Setup', key: 'agent-setup' },
  { label: 'All', key: 'all' },
]

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: { type?: string; q?: string; niche?: string; platform?: string }
}) {
  const activeKey = searchParams.type ?? 'all'
  const query = searchParams.q?.toLowerCase().trim()
  const niche = searchParams.niche?.toLowerCase().trim()
  const platform = searchParams.platform?.toLowerCase().trim()

  // Real seller listings only on the buyer-facing marketplace grid —
  // sample seed listings are hidden here (they still resolve via direct
  // URL and still appear on demo creator pages, but they no longer
  // clutter the general browse now that real creators are shipping).
  // Featured listings float to the top, BUT we interleave a regular
  // listing between each pair so two navy cards never sit next to each
  // other in the grid.
  const merged = [
    ...(await liveDbProducts()),
    ...products.filter((p) => !p.sample),
  ]
  const featuredList = merged.filter((p) => p.featured)
  const regularList = merged.filter((p) => !p.featured)
  const interleaved: typeof merged = []
  for (let i = 0; i < featuredList.length; i++) {
    interleaved.push(featuredList[i])
    // Drop one regular listing between each pair of featured so two
    // navy cards never end up adjacent.
    if (i < featuredList.length - 1 && regularList.length > 0) {
      interleaved.push(regularList.shift()!)
    }
  }
  const allProducts = [...interleaved, ...regularList]

  const filtered = allProducts.filter((p) => {
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

  // Master platform list (lib/catalog.ts) so every supported platform
  // shows in the filter even with no listings yet, merged with any custom
  // platforms creators added on their listings (case-insensitive dedupe).
  const platformMap = new Map<string, string>()
  for (const p of [...PLATFORMS, ...allProducts.flatMap((x) => x.platformList)]) {
    const key = p.toLowerCase()
    if (!platformMap.has(key)) platformMap.set(key, p)
  }
  const platforms = Array.from(platformMap.values()).sort()
  // Master niche list (defined in lib/catalog.ts) — shows every niche
  // in the filter even before listings exist in it.
  const niches = [...NICHES] as string[]

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
            Skills, guides, full agent setups. Built by creators who actually
            run them. Drop one in and go.
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
                placeholder="Search a skill, guide, niche, platform…"
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
                ? allProducts.length
                : allProducts.filter((p) => p.type === f.type).length
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

        {/* niche + platform — native dropdowns (iOS picker on mobile) */}
        <MarketplaceFilters
          niches={niches}
          platforms={platforms}
          niche={niche}
          platform={platform}
          type={activeKey}
          q={searchParams.q}
        />

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
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={toCardProduct(p)}
                variant={p.featured ? 'emerald' : 'cream'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
