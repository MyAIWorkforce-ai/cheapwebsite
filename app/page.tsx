import Link from 'next/link'
import ProductCard, { type Product } from '@/components/ProductCard'

const agentSetups: Product[] = [
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
]

const skills: Product[] = [
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
]

const guides: Product[] = [
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
  {
    id: 'crm-integrations',
    type: 'Guide',
    title: 'Connect Your CRM in 20 mins',
    creator: 'Bo P.',
    rating: 4.6,
    ratingCount: 87,
    price: '$19',
    emoji: '🔌',
    accent: 'bg-yellow-50',
  },
  {
    id: 'agent-prompt-patterns',
    type: 'Guide',
    title: 'Agent Prompt Patterns',
    creator: 'promptforge',
    rating: 4.9,
    ratingCount: 612,
    price: '$24',
    emoji: '🧠',
    accent: 'bg-slate-100',
  },
]

const niches = [
  { name: 'Real Estate', slug: 'real-estate', emoji: '🏡' },
  { name: 'Accountants', slug: 'accountants', emoji: '📊' },
  { name: 'Builders', slug: 'builders', emoji: '🔨' },
  { name: 'E-commerce', slug: 'ecommerce', emoji: '🛒' },
  { name: 'Coaches', slug: 'coaches', emoji: '🎯' },
  { name: 'Lawyers', slug: 'lawyers', emoji: '⚖️' },
  { name: 'Marketing', slug: 'marketing', emoji: '📣' },
  { name: 'Hospitality', slug: 'hospitality', emoji: '🍽️' },
]

function Section({
  eyebrow,
  title,
  href,
  children,
}: {
  eyebrow?: string
  title: string
  href?: { label: string; url: string }
  children: React.ReactNode
}) {
  return (
    <section className="px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
      <div className="max-w-page mx-auto">
        <div className="flex items-end justify-between gap-4 mb-7 sm:mb-10">
          <div>
            {eyebrow && (
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-purple mb-2">
                {eyebrow}
              </p>
            )}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
              {title}
            </h2>
          </div>
          {href && (
            <Link
              href={href.url}
              className="hidden sm:inline-flex items-center text-sm font-semibold text-brand-ink hover:text-brand-purple transition-colors"
            >
              {href.label} →
            </Link>
          )}
        </div>
        {children}
        {href && (
          <div className="sm:hidden mt-6">
            <Link
              href={href.url}
              className="inline-flex items-center text-sm font-semibold text-brand-purple"
            >
              {href.label} →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

function ProductRow({ products }: { products: Product[] }) {
  return (
    <div className="-mx-5 sm:mx-0 px-5 sm:px-0 overflow-x-auto sm:overflow-visible">
      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 min-w-min">
        {products.map((p) => (
          <div key={p.id} className="w-[72vw] max-w-[18rem] sm:w-auto sm:max-w-none shrink-0">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="px-5 sm:px-6 lg:px-8 pt-14 sm:pt-24 pb-14 sm:pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6 sm:mb-8">
            <span
              aria-hidden
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-brand-purple flex items-center justify-center text-white font-black text-4xl sm:text-5xl"
            >
              S
            </span>
          </div>
          <h1 className="text-6xl sm:text-8xl font-extrabold tracking-tight text-brand-purple leading-none">
            Skillzy
          </h1>
          <p className="mt-6 text-2xl sm:text-3xl font-semibold text-brand-ink tracking-tight">
            Give your agent skills.
          </p>
          <p className="mt-5 text-lg text-brand-muted max-w-xl mx-auto">
            Browse thousands of skills, guides, and ready-to-go agent setups. Drop them in. Done.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/marketplace"
              className="bg-brand-yellow text-brand-ink font-bold px-8 py-4 rounded-full text-base hover:bg-brand-yellow-dark transition-colors"
            >
              Browse the Marketplace
            </Link>
            <Link
              href="/sell"
              className="border-2 border-brand-ink text-brand-ink font-semibold px-8 py-4 rounded-full text-base hover:bg-brand-ink hover:text-white transition-colors"
            >
              Sell Your Skills
            </Link>
          </div>
        </div>
      </section>

      {/* Agent Setups — highest-value tier leads */}
      <Section
        eyebrow="Plug-and-play"
        title="Browse Agent Setups"
        href={{ label: 'See all agent setups', url: '/marketplace?type=agent-setup' }}
      >
        <ProductRow products={agentSetups} />
      </Section>

      {/* Skills */}
      <Section
        eyebrow="One capability at a time"
        title="Browse Skills"
        href={{ label: 'See all skills', url: '/marketplace?type=skill' }}
      >
        <ProductRow products={skills} />
      </Section>

      {/* Guides */}
      <Section
        eyebrow="How-to docs"
        title="Browse Guides"
        href={{ label: 'See all guides', url: '/marketplace?type=guide' }}
      >
        <ProductRow products={guides} />
      </Section>

      {/* Featured Niches */}
      <section className="px-5 sm:px-6 lg:px-8 py-14 sm:py-20 bg-slate-50 border-y border-brand-line">
        <div className="max-w-page mx-auto">
          <div className="mb-8 sm:mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-purple mb-2">
              By niche
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
              Find an agent for your work
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {niches.map((n) => (
              <Link
                key={n.slug}
                href={`/marketplace?niche=${n.slug}`}
                className="group flex items-center gap-3 p-4 sm:p-5 bg-white rounded-xl border border-brand-line hover:border-brand-purple hover:shadow-sm transition-[border-color,box-shadow] duration-200"
              >
                <span className="text-2xl" aria-hidden>
                  {n.emoji}
                </span>
                <span className="font-semibold text-brand-ink group-hover:text-brand-purple transition-colors">
                  {n.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Creator */}
      <section className="px-5 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-page mx-auto">
          <div className="bg-brand-purple rounded-3xl px-6 sm:px-12 py-12 sm:py-16 text-center">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Built something good? Sell it.
            </h2>
            <p className="mt-4 text-lg text-purple-100 max-w-xl mx-auto">
              Publish skills, guides, and agent setups. Keep 80% of every sale.
            </p>
            <Link
              href="/sell"
              className="inline-block mt-8 bg-brand-yellow text-brand-ink font-bold px-8 py-4 rounded-full text-base hover:bg-brand-yellow-dark transition-colors"
            >
              Become a Creator
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
