import Link from 'next/link'
import ProductCard, { type Product, type ProductType } from '@/components/ProductCard'

export const metadata = {
  title: 'The catalogue — Skillzy',
  description:
    'Browse skills, guides, and ready-to-go agent setups for Claude, OpenClaw, n8n and more.',
}

const catalog: Product[] = [
  { id: 'real-estate-agent-setup', type: 'Agent Setup', title: 'Real Estate, end to end.', creator: 'Harlow Realty Tools', platform: 'Claude · n8n', rating: 4.9, ratingCount: 218, price: '$249' },
  { id: 'bookkeeper-agent-setup', type: 'Agent Setup', title: 'Bookkeeper & BAS.', creator: 'Ledgerlab', platform: 'Claude', rating: 4.8, ratingCount: 142, price: '$199' },
  { id: 'tradie-agent-setup', type: 'Agent Setup', title: 'On-site Tradie Ops.', creator: 'Sitebench', platform: 'Claude · Make', rating: 4.9, ratingCount: 96, price: '$179' },
  { id: 'ecom-support-agent-setup', type: 'Agent Setup', title: 'E-commerce Support.', creator: 'Storefront Labs', platform: 'Claude · Zapier', rating: 4.7, ratingCount: 311, price: '$299' },
  { id: 'coach-agent-setup', type: 'Agent Setup', title: 'Coach & Client Notes.', creator: 'practice.os', platform: 'Claude', rating: 4.8, ratingCount: 74, price: '$149' },
  { id: 'restaurant-agent-setup', type: 'Agent Setup', title: 'Front of House Ops.', creator: 'Front of House', platform: 'Claude', rating: 4.6, ratingCount: 51, price: '$129' },
  { id: 'daily-summary-email', type: 'Skill', title: 'Daily Summary Email', creator: 'Jonas Krüger', platform: 'Claude', rating: 4.8, ratingCount: 412, price: '$12' },
  { id: 'website-scraper', type: 'Skill', title: 'Website Scraper', creator: 'datajedi', platform: 'OpenClaw', rating: 4.6, ratingCount: 188, price: '$19' },
  { id: 'invoice-generator', type: 'Skill', title: 'Invoice Generator', creator: 'paperless.io', platform: 'Claude · n8n', rating: 4.9, ratingCount: 524, price: '$15' },
  { id: 'review-responder', type: 'Skill', title: 'Review Responder', creator: 'Kai Mendoza', platform: 'Claude', rating: 4.7, ratingCount: 233, price: '$9' },
  { id: 'wire-claude-and-n8n', type: 'Guide', title: 'Wire Claude into n8n in a weekend.', creator: 'Mira Sato', platform: 'Claude · n8n', rating: 4.9, ratingCount: 178, price: '$14' },
  { id: 'first-skill-md', type: 'Guide', title: 'Your first SKILL.md, the right way.', creator: 'agentschool', platform: 'All platforms', rating: 4.8, ratingCount: 402, price: '$9' },
]

const filters: { label: string; type?: ProductType; key: string }[] = [
  { label: 'All', key: 'all' },
  { label: 'Agent Setups', type: 'Agent Setup', key: 'agent-setup' },
  { label: 'Skills', type: 'Skill', key: 'skill' },
  { label: 'Guides', type: 'Guide', key: 'guide' },
]

export default function MarketplacePage({
  searchParams,
}: {
  searchParams: { type?: string; q?: string; niche?: string }
}) {
  const activeKey = searchParams.type ?? 'all'
  const query = searchParams.q?.toLowerCase().trim()

  const products = catalog.filter((p) => {
    const filter = filters.find((f) => f.key === activeKey)
    if (filter?.type && p.type !== filter.type) return false
    if (query) {
      const hay = `${p.title} ${p.creator} ${p.type}`.toLowerCase()
      if (!hay.includes(query)) return false
    }
    return true
  })

  return (
    <div className="paper">
      <section className="px-6 lg:px-10 pt-14 pb-10 sm:pt-20 sm:pb-14 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="label-cap text-brand-emerald">The Catalogue</span>
          <h1
            className="font-display mt-5 text-5xl sm:text-7xl tracking-tight"
            style={{ letterSpacing: '-0.025em' }}
          >
            Everything, in one place.
          </h1>
          <p className="mt-5 text-brand-muted max-w-prose">
            Skills, guides, and ready-to-go agent setups. Filter by type, search
            by name. Every listing is human-reviewed.
          </p>
        </div>
      </section>

      <div className="max-w-page mx-auto px-6 lg:px-10 py-10 sm:py-14">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-10 border-b border-brand-hairline pb-5">
          {filters.map((f) => {
            const active = f.key === activeKey
            return (
              <Link
                key={f.key}
                href={f.key === 'all' ? '/marketplace' : `/marketplace?type=${f.key}`}
                className={
                  'text-sm pb-1.5 border-b -mb-[21px] transition-colors ' +
                  (active
                    ? 'border-brand-emerald text-brand-emerald font-semibold'
                    : 'border-transparent text-brand-muted hover:text-brand-ink')
                }
              >
                {f.label}
                <span className="ml-2 label-cap">
                  {f.key === 'all'
                    ? catalog.length
                    : catalog.filter((p) => p.type === f.type).length}
                </span>
              </Link>
            )
          })}
        </div>

        {query && (
          <p className="mb-8 text-sm text-brand-muted">
            Results for{' '}
            <span className="text-brand-ink font-semibold">“{searchParams.q}”</span>.
          </p>
        )}

        {products.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-3xl">Nothing matched.</p>
            <Link
              href="/marketplace"
              className="mt-4 inline-block text-sm border-b border-brand-ink hover:text-brand-emerald hover:border-brand-emerald pb-0.5"
            >
              Clear filters →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-hairline border border-brand-hairline">
            {products.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                variant={i % 5 === 2 ? 'emerald' : 'cream'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
