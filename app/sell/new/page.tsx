import Link from 'next/link'
import NewListingForm from './NewListingForm'

export const metadata = {
  title: 'New listing',
  description:
    'Publish a skill, guide, agent setup, or Grok Bot on Skillzy. Five sections, ten minutes. Creators keep 80%, forever.',
  keywords: [
    'publish AI skill',
    'list AI agent',
    'sell Grok Bot',
    'Grok Bot marketplace',
    'niche AI agent',
    'creator onboarding',
    'SKILL.md',
    'sell on Skillzy',
  ],
}

function Sticker({
  children,
  rotate = '-3deg',
  tone = 'mustard',
}: {
  children: React.ReactNode
  rotate?: string
  tone?: 'mustard' | 'emerald'
}) {
  const toneClass =
    tone === 'mustard'
      ? 'bg-brand-gold text-brand-ink'
      : 'bg-brand-navy text-brand-cream'
  return (
    <span
      className={`inline-block font-mono text-[11px] uppercase tracking-[0.18em] px-3 py-1.5 ${toneClass}`}
      style={{ transform: `rotate(${rotate})` }}
    >
      {children}
    </span>
  )
}

export default function NewListingPage() {
  return (
    <div className="paper">
      {/* breadcrumb */}
      <div className="max-w-page mx-auto px-6 lg:px-10 pt-8 sm:pt-10">
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted"
        >
          <Link href="/sell" className="hover:text-brand-gold transition-colors">
            Sell
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brand-ink">New listing</span>
        </nav>
      </div>

      {/* hero */}
      <section className="px-6 lg:px-10 pt-10 sm:pt-14 pb-16 sm:pb-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <Sticker rotate="-2deg">New listing</Sticker>
          <h1
            className="font-display mt-7 text-5xl sm:text-7xl tracking-tight leading-[0.95]"
            style={{ letterSpacing: '-0.03em' }}
          >
            <span className="block">Built something good?</span>
            <span className="block">
              <em className="italic text-brand-gold font-medium">
                Get paid.
              </em>
            </span>
          </h1>
          <p className="mt-7 text-xl text-brand-ink max-w-2xl">
            Built a Grok Bot or a niche agent for a specific industry?
            Drop it in. 80% is yours — forever.
          </p>
          <p className="mt-3 text-sm text-brand-muted max-w-2xl">
            Five sections, ten minutes. List it once, sell it forever.
          </p>

          {/* Grok Bot creator path — template + guide in one row.
              Drops in above the form so creators see it before they
              start wrestling with the generic uploader. */}
          <div className="mt-10 border border-brand-ink bg-brand-cream-card p-5 sm:p-6 max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              Selling a Grok Bot?
            </p>
            <p className="mt-2 text-brand-ink">
              Grab the starter bundle (prompt, knowledge, licence, setup
              doc — all pre-structured), or read the 10-minute guide
              first.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="/templates/skillzy-grok-bot-bundle.zip"
                download
                className="inline-flex items-center gap-2 bg-brand-ink text-white font-semibold px-4 py-2.5 text-sm hover:bg-brand-gold hover:text-brand-ink transition-colors"
              >
                Download template (.zip)
                <span aria-hidden>↓</span>
              </a>
              <Link
                href="/guides/sell-grok-bot"
                className="inline-flex items-center gap-2 border border-brand-ink text-brand-ink font-semibold px-4 py-2.5 text-sm hover:bg-brand-ink hover:text-white transition-colors"
              >
                Read the guide
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <NewListingForm />
    </div>
  )
}
