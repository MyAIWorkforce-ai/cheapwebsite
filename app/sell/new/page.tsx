import Link from 'next/link'
import { getUser } from '@/lib/auth'
import NewListingForm from './NewListingForm'

export const metadata = {
  title: 'New listing',
  description:
    'Publish a skill, guide, prompt pack, agent setup, or scheduled loop on Skillzy. Five short sections — the AI drafts most of it from your file.',
  keywords: [
    'publish AI skill',
    'list AI agent',
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

export default async function NewListingPage() {
  const user = await getUser()
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
            Drop your files in — the AI writes the listing. List it once, sell it forever.
          </p>
        </div>
      </section>

      <NewListingForm githubUser={user?.handle} isSignedIn={Boolean(user)} />
    </div>
  )
}
