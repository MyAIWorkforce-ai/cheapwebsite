import Link from 'next/link'
import { products, toCardProduct } from '@/lib/catalog'
import { liveDbProducts } from '@/lib/listings'
import ProductCard from '@/components/ProductCard'
import StructuredData from '@/components/StructuredData'
import { pageMetadata } from '@/lib/seo'
import { breadcrumbLd, collectionPageLd, faqLd } from '@/lib/jsonld'
import { HubCtaLink, TemplateDownloadButton } from './HubCtas'

// Bespoke marketing-grade landing page for Grok Bots as a category.
// Distinct from /platforms/grok-bots, which is the auto-generated SEO
// listing. This page is the SHAREABLE URL — the one that goes in a
// tweet reply to Greg Isenberg's thread or in creator outreach DMs.
// Targets higher-intent queries ("grok bot marketplace", "sell grok
// bot", "custom grok bot store") than the generic platform template.

export const metadata = pageMetadata({
  title:
    'Grok Bots — The marketplace for custom Grok agents. Drop-in. Not DIY.',
  description:
    'Buy drop-in Grok Bots built by creators for every industry — real estate, trades, bookkeeping, hospitality and more. Or sell your own. Creators keep 80%. Install in 5 minutes.',
  path: '/grok-bots',
  keywords: [
    'Grok Bots',
    'Grok Bot marketplace',
    'sell Grok Bot',
    'buy Grok Bot',
    'custom Grok bot',
    'Grok bot store',
    'Grok personas',
    'Grok character bots',
    'niche AI agent',
    'industry AI agent',
    'vertical AI agent',
    'drop-in AI agent',
  ],
})

const FAQS = [
  {
    q: 'What is a Grok Bot?',
    a: "A Grok Bot is a custom agent built on xAI's Grok — configured with a system prompt, knowledge files, and tool permissions to act as a specific persona or do a specific job. Not the same as Grok's in-app companions (Ani, Rudi, Valentine) — those are xAI's own characters. Grok Bots sold on Skillzy are creator-built, drop-in, and you own your copy forever.",
  },
  {
    q: 'How does buying a Grok Bot on Skillzy work?',
    a: 'Browse the marketplace, pick a bot, pay via Stripe. You immediately get a download — a zip bundle with the system prompt, knowledge files, setup guide, and test prompts. Open Grok Studio, follow the 5-minute install, and the bot runs in your own Grok account. No subscription, no ongoing dependency on the creator.',
  },
  {
    q: 'Can I sell a Grok Bot I built?',
    a: "Yes — Grok Bots are a first-class product type on Skillzy. Download our starter bundle template (standardised folder with a placeholder system-prompt.md, knowledge/, SETUP.md and LICENCE.md), fill it in with your bot's configuration, zip it, upload. Set a price. Creators keep 80% of every sale, paid instantly via Stripe Connect.",
  },
  {
    q: 'How much do Grok Bots sell for?',
    a: 'Typical range is $29–$149 depending on depth. A system-prompt-only bot sells for $9–$29. A small-knowledge bot for $29–$79. A full niche-vertical setup (prompt + knowledge + tools + walkthrough) for $79–$149. Multi-bot kits and agency-grade bundles go for $149+.',
  },
  {
    q: 'Do I need technical skills to install a Grok Bot?',
    a: "No. Every bundle includes a SETUP.md that walks you through the install in 5 minutes — paste the system prompt into Grok Studio, upload the knowledge files, toggle the right tool permissions, test with the included prompts. If you can use Grok Studio's UI, you can install a bot from Skillzy.",
  },
  {
    q: 'What stops someone from reselling my system prompt?',
    a: "Every bundle ships with a standard licence (template in the starter kit) that forbids redistribution, public posting, and rebrand-and-resell. Legal footing aside, the real protection is: your updates (v2, v3 as Grok evolves), the knowledge files and support you bundle, and your reputation as the known maker. Pirates don't update. Real buyers come back.",
  },
  {
    q: 'What niches / industries work best?',
    a: 'Anything with a repeatable, domain-heavy task. Current strong verticals: real estate (lead capture, listing drafting, follow-ups), trades (plumbers, electricians, builders — quoting, scheduling), bookkeeping (categorisation, BAS prep), hospitality (reservations, guest comms), healthcare admin, legal intake. The Greg Isenberg thesis of "one niche at a time" is real — generalist bots sell slowly, specialist bots sell well.',
  },
  {
    q: 'Does the bot work if xAI updates Grok?',
    a: 'Mostly yes — Grok Bots are configurations, not fine-tunes, so model updates generally improve them. If a specific Grok change breaks a bot, the creator ships an updated bundle and buyers get it in their Skillzy dashboard automatically (free updates are a common licence term).',
  },
  {
    q: "What's the difference between a Grok Bot and a Claude Skill?",
    a: "Different targets, same shape. A Claude Skill is a SKILL.md-based capability for Claude. A Grok Bot is a persona/configuration for Grok. Skillzy carries both — plus MCP servers, prompt packs, agent setups, guides, and scheduled loops — because operators mix platforms and shouldn't have to pick a marketplace per platform.",
  },
  {
    q: 'How do I get paid as a creator?',
    a: "Stripe Connect. You connect your own Stripe account once, buyers pay, Stripe routes 80% directly to you at transaction time. We never hold creator funds — no float risk, no payout delay. For creators in countries Stripe doesn't support (India, parts of MENA/LATAM), Wise is an alternative rail with the same 80/20 split.",
  },
]

const NICHE_CHIPS = [
  'Real Estate',
  'Plumbers',
  'Electricians',
  'Builders',
  'Bookkeepers',
  'Dentists',
  'Hospitality',
  'Recruiters',
  'Marketing',
  'E-commerce',
]

export default async function GrokBotsHubPage() {
  // Live DB listings tagged Grok Bots first, then demo catalogue. Cap
  // the grid to 12 — anything more goes to the marketplace filter
  // page via the CTA.
  const live = await liveDbProducts().catch(() => [])
  const merged = [...live, ...products]
  const grokBots = merged
    .filter((p) =>
      p.platformList.some(
        (platform) => platform.toLowerCase() === 'grok bots',
      ),
    )
    .slice(0, 12)

  return (
    <div className="paper">
      <StructuredData
        data={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Grok Bots', path: '/grok-bots' },
          ]),
          collectionPageLd({
            name: 'Grok Bots on Skillzy',
            description:
              'Drop-in custom Grok Bots built by creators for every industry. Buy one in 5 minutes or sell your own, 80% yours.',
            path: '/grok-bots',
            itemCount: grokBots.length,
          }),
          faqLd(FAQS),
        ]}
      />

      {/* HERO */}
      <section className="px-6 lg:px-10 pt-16 sm:pt-24 pb-16 sm:pb-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            The Grok Bot marketplace
          </span>
          <h1
            className="font-display mt-5 text-5xl sm:text-7xl lg:text-[8rem] tracking-tight leading-[0.95]"
            style={{ letterSpacing: '-0.03em' }}
          >
            Drop in a{' '}
            <em className="italic text-brand-gold font-medium">Grok Bot.</em>
            <br />
            Skip the build.
          </h1>
          <p className="mt-10 text-xl sm:text-2xl leading-snug max-w-3xl text-brand-ink">
            Custom <strong className="font-semibold">Grok Bots</strong> built
            by operators who already shipped them — real-estate agents,
            tradies, bookkeepers, recruiters. Drop one into your Grok and
            you&rsquo;re running. Creators keep 80%. You own your copy
            forever.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <HubCtaLink
              href="/marketplace?platform=grok+bots"
              cta="browse"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors"
            >
              Browse Grok Bots
              <span aria-hidden>→</span>
            </HubCtaLink>
            <HubCtaLink
              href="/sell/new"
              cta="sell"
              className="inline-flex items-center gap-2 border border-brand-ink text-brand-ink font-semibold px-7 py-4 text-[15px] hover:bg-brand-ink hover:text-white transition-colors"
            >
              Sell your Grok Bot
              <span aria-hidden>→</span>
            </HubCtaLink>
          </div>
        </div>
      </section>

      {/* WHY — three-column trust block */}
      <section className="px-6 lg:px-10 py-16 sm:py-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            Why Skillzy
          </span>
          <h2
            className="font-display mt-4 text-4xl sm:text-5xl tracking-tight max-w-3xl"
            style={{ letterSpacing: '-0.025em' }}
          >
            The marketplace for the Grok Bot era.
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <p className="font-display text-5xl text-brand-gold">80%</p>
              <h3 className="font-display text-xl mt-3">Creators keep it.</h3>
              <p className="mt-2 text-brand-muted leading-relaxed">
                Every sale, forever. No tiered pricing, no payout thresholds,
                no subscription to the platform. Stripe Connect routes 80%
                directly to the creator at the moment of purchase.
              </p>
            </div>
            <div>
              <p className="font-display text-5xl text-brand-gold">5 min</p>
              <h3 className="font-display text-xl mt-3">Buyer to running.</h3>
              <p className="mt-2 text-brand-muted leading-relaxed">
                Every bundle ships with a SETUP.md the buyer follows in
                Grok Studio. Paste the prompt, upload the knowledge, flip
                the tool toggles, test. Done.
              </p>
            </div>
            <div>
              <p className="font-display text-5xl text-brand-gold">You own it</p>
              <h3 className="font-display text-xl mt-3">No creator lock-in.</h3>
              <p className="mt-2 text-brand-muted leading-relaxed">
                The bot runs in your own Grok account. If the creator
                vanishes tomorrow, your bot still works. Modify, extend,
                adapt — it&rsquo;s yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LISTINGS GRID */}
      <section className="px-6 lg:px-10 py-16 sm:py-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                Live Grok Bots
              </span>
              <h2
                className="font-display mt-4 text-4xl sm:text-5xl tracking-tight"
                style={{ letterSpacing: '-0.025em' }}
              >
                Shipped by creators. Ready to drop in.
              </h2>
            </div>
            <Link
              href="/marketplace?platform=grok+bots"
              className="text-sm border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
            >
              See all →
            </Link>
          </div>

          {grokBots.length === 0 ? (
            <div className="mt-14 border border-brand-hairline bg-brand-cream-card p-10 text-center">
              <p className="font-display text-2xl">
                First Grok Bot listing coming soon.
              </p>
              <p className="mt-3 text-brand-muted max-w-xl mx-auto">
                If you&rsquo;ve built one, this is your chance to be the
                first listed. 80% yours from the moment someone buys it.
              </p>
              <Link
                href="/sell/new"
                className="mt-6 inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-6 py-3 text-sm hover:bg-brand-gold-dark transition-colors"
              >
                List the first one
                <span aria-hidden>→</span>
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-hairline border border-brand-hairline">
              {grokBots.map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={toCardProduct(p)}
                  variant={i === 0 || p.featured ? 'emerald' : 'cream'}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* NICHES — SEO internal-link cluster for future vertical pages */}
      <section className="px-6 lg:px-10 py-16 sm:py-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            By industry
          </span>
          <h2
            className="font-display mt-4 text-4xl sm:text-5xl tracking-tight max-w-3xl"
            style={{ letterSpacing: '-0.025em' }}
          >
            A Grok Bot for your line of work.
          </h2>
          <p className="mt-4 text-lg text-brand-muted max-w-2xl">
            The best Grok Bots are niche. One industry, done well, beats a
            generalist every time. Pick yours:
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {NICHE_CHIPS.map((niche) => (
              <Link
                key={niche}
                href={`/marketplace?niche=${encodeURIComponent(
                  niche.toLowerCase().replace(/\s+/g, '-'),
                )}&platform=grok+bots`}
                className="inline-flex items-center gap-2 border border-brand-hairline bg-brand-cream-card px-4 py-2.5 text-sm hover:border-brand-gold hover:text-brand-gold transition-colors"
              >
                {niche}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CREATOR CTA — big section targeting the "sell grok bot" query */}
      <section className="px-6 lg:px-10 py-20 sm:py-24 bg-brand-navy text-brand-cream">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            For creators
          </span>
          <h2
            className="font-display mt-4 text-5xl sm:text-7xl tracking-tight max-w-4xl text-brand-cream"
            style={{ letterSpacing: '-0.03em' }}
          >
            Built a Grok Bot?{' '}
            <em className="italic text-brand-gold font-medium">
              Sell it here.
            </em>
          </h2>
          <p className="mt-8 text-xl leading-snug max-w-2xl text-brand-cream/85">
            You trained it. You know it works. Package it with our starter
            bundle (prompt, knowledge, licence, setup doc — already
            structured) and have your first listing live in ten minutes.
            Keep 80% of every sale. Forever.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <TemplateDownloadButton
              source="grok_bots_hub_creator_section"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors"
            >
              Download bundle template (.zip)
              <span aria-hidden>↓</span>
            </TemplateDownloadButton>
            <HubCtaLink
              href="/guides/sell-grok-bot"
              cta="guide"
              className="inline-flex items-center gap-2 border border-brand-cream text-brand-cream font-semibold px-7 py-4 text-[15px] hover:bg-brand-cream hover:text-brand-ink transition-colors"
            >
              Read the 10-min guide
              <span aria-hidden>→</span>
            </HubCtaLink>
            <HubCtaLink
              href="/sell/new"
              cta="sell"
              className="inline-flex items-center gap-2 text-brand-cream underline underline-offset-4 decoration-brand-gold hover:text-brand-gold transition-colors px-2 py-4 text-[15px]"
            >
              Or publish now
              <span aria-hidden>→</span>
            </HubCtaLink>
          </div>
        </div>
      </section>

      {/* FAQ — big SEO payload (matches JSON-LD above) */}
      <section className="px-6 lg:px-10 py-16 sm:py-24 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            FAQ
          </span>
          <h2
            className="font-display mt-4 text-4xl sm:text-5xl tracking-tight"
            style={{ letterSpacing: '-0.025em' }}
          >
            Questions, answered.
          </h2>
          <dl className="mt-12 divide-y divide-brand-hairline border-y border-brand-hairline">
            {FAQS.map((item) => (
              <div key={item.q} className="py-7">
                <dt
                  className="font-display text-xl sm:text-2xl tracking-tight"
                  style={{ letterSpacing: '-0.015em' }}
                >
                  {item.q}
                </dt>
                <dd className="mt-3 text-brand-ink leading-relaxed max-w-prose">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 lg:px-10 py-20 sm:py-24">
        <div className="max-w-page mx-auto text-center">
          <h2
            className="font-display text-5xl sm:text-7xl tracking-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            Drop one in.{' '}
            <em className="italic text-brand-gold font-medium">
              Go to work.
            </em>
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/marketplace?platform=grok+bots"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors"
            >
              Browse Grok Bots
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/sell/new"
              className="inline-flex items-center gap-2 border border-brand-ink text-brand-ink font-semibold px-7 py-4 text-[15px] hover:bg-brand-ink hover:text-white transition-colors"
            >
              Sell yours
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
