import Link from 'next/link'
import ProductCard, { type Product, type ProductType } from '@/components/ProductCard'

export const metadata = {
  title: 'Marketplace — Skillzy',
  description:
    'Browse skills, guides, and ready-to-go agent setups for Claude, OpenClaw, n8n and more.',
}

const catalog: Product[] = [
  {
    id: 'real-estate-agent-setup',
    type: 'Agent Setup',
    title: 'Real Estate Agent in a Box',
    creator: 'Harlow Realty Tools',
    rating: 4.9,
    ratingCount: 218,
    price: '$249',
    emoji: '🏡',
    accent: 'bg-purple-50',
  },
  {
    id: 'bookkeeper-agent-setup',
    type: 'Agent Setup',
    title: 'Bookkeeper & BAS Assistant',
    creator: 'Ledgerlab',
    rating: 4.8,
    ratingCount: 142,
    price: '$199',
    emoji: '📒',
    accent: 'bg-yellow-50',
  },
  {
    id: 'tradie-agent-setup',
    type: 'Agent Setup',
    title: 'Tradie Quote & Invoice Agent',
    creator: 'Sitebench',
    rating: 4.9,
    ratingCount: 96,
    price: '$179',
    emoji: '🔨',
    accent: 'bg-slate-100',
  },
  {
    id: 'ecom-support-agent-setup',
    type: 'Agent Setup',
    title: 'E-commerce Support Agent',
    creator: 'Storefront Labs',
    rating: 4.7,
    ratingCount: 311,
    price: '$299',
    emoji: '🛒',
    accent: 'bg-purple-50',
  },
  {
    id: 'coach-agent-setup',
    type: 'Agent Setup',
    title: 'Coaching & Client Notes',
    creator: 'practice.os',
    rating: 4.8,
    ratingCount: 74,
    price: '$149',
    emoji: '🎯',
    accent: 'bg-yellow-50',
  },
  {
    id: 'restaurant-agent-setup',
    type: 'Agent Setup',
    title: 'Restaurant Ops Agent',
    creator: 'Front of House',
    rating: 4.6,
    ratingCount: 51,
    price: '$129',
    emoji: '🍽️',
    accent: 'bg-slate-100',
  },
  {
    id: 'daily-summary-email',
    type: 'Skill',
    title: 'Daily Summary Email',
    creator: 'Jonas K.',
    rating: 4.8,
    ratingCount: 412,
    price: '$12',
    emoji: '📬',
    accent: 'bg-yellow-50',
  },
  {
    id: 'website-scraper',
    type: 'Skill',
    title: 'Website Scraper',
    creator: 'datajedi',
    rating: 4.6,
    ratingCount: 188,
    price: '$19',
    emoji: '🕸️',
    accent: 'bg-slate-100',
  },
  {
    id: 'invoice-generator',
    type: 'Skill',
    title: 'Invoice Generator',
    creator: 'paperless.io',
    rating: 4.9,
    ratingCount: 524,
    price: '$15',
    emoji: '🧾',
    accent: 'bg-purple-50',
  },
  {
    id: 'review-responder',
    type: 'Skill',
    title: 'Review Responder',
    creator: 'Kai M.',
    rating: 4.7,
    ratingCount: 233,
    price: '$9',
    emoji: '⭐',
    accent: 'bg-yellow-50',
  },
  {
    id: 'wire-claude-and-n8n',
    type: 'Guide',
    title: 'Wire Claude + n8n Together',
    creator: 'Mira S.',
    rating: 4.9,
    ratingCount: 178,
    price: '$14',
    emoji: '🧩',
    accent: 'bg-slate-100',
  },
  {
    id: 'first-skill-md',
    type: 'Guide',
    title: 'Your First SKILL.md',
    creator: 'agentschool',
    rating: 4.8,
    ratingCount: 402,
    price: '$9',
    emoji: '📘',
    accent: 'bg-purple-50',
  },
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
    <div className="px-5 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="max-w-page mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-ink">
            Marketplace
          </h1>
          <p className="mt-2 text-brand-muted">
            Skills, guides, and ready-to-go agent setups. Drop them in.
          </p>
        </header>

        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => {
            const active = f.key === activeKey
            return (
              <Link
                key={f.key}
                href={f.key === 'all' ? '/marketplace' : `/marketplace?type=${f.key}`}
                className={
                  'px-4 py-2 rounded-full text-sm font-semibold border transition-colors ' +
                  (active
                    ? 'bg-brand-ink text-white border-brand-ink'
                    : 'bg-white text-brand-ink border-brand-line hover:border-brand-ink')
                }
              >
                {f.label}
              </Link>
            )
          })}
        </div>

        {query && (
          <p className="mb-6 text-sm text-brand-muted">
            Showing results for <span className="text-brand-ink font-semibold">“{searchParams.q}”</span>.
          </p>
        )}

        {products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-brand-muted">Nothing matched that search.</p>
            <Link
              href="/marketplace"
              className="inline-block mt-4 text-brand-purple font-semibold"
            >
              Clear filters →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
