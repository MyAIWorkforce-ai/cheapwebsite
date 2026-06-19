import Link from 'next/link'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Help & FAQ — Skillzy',
  description:
    'Answers for buyers and creators — how purchases work, how refunds work, how creator payouts work, what a SKILL.md is, and more.',
  path: '/help',
  keywords: ['Skillzy help', 'FAQ', 'support', 'how Skillzy works'],
})

type QA = { q: string; a: React.ReactNode }

const buyer: QA[] = [
  {
    q: 'What is Skillzy?',
    a: 'A marketplace for skills, guides, and ready-to-go agent setups, made by humans, dropped into the agent you already use. Claude, OpenClaw, ChatGPT, n8n, and the rest.',
  },
  {
    q: 'What’s the difference between a Skill, a Guide, and an Agent Setup?',
    a: (
      <>
        <strong>Skills</strong> are single-purpose bundles — usually a SKILL.md plus the configs, schemas, and examples it needs — one job done sharp.{' '}
        <strong>Guides</strong> are short reads that teach you to build something yourself.{' '}
        <strong>Agent Setups</strong> are the whole agent — every prompt, config, and connector
        for a complete line of work in one purchase.
      </>
    ),
  },
  {
    q: 'How do I "drop it in" — what does that actually mean?',
    a: 'Open your agent (Claude, ChatGPT, OpenClaw, n8n — whatever you use), drop the files in, and tell it to use the skill. The agent takes it from there. Most are working inside two minutes.',
  },
  {
    q: 'What if the listing doesn’t work?',
    a: (
      <>
        Email{' '}
        <a
          href="mailto:help@skillzy.ai"
          className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
        >
          help@skillzy.ai
        </a>{' '}
        with your order number and what went wrong. We look at every
        request in good faith. Refunds aren&rsquo;t automatic and
        aren&rsquo;t time-boxed, but a genuine case where the listing
        didn&rsquo;t deliver what was promised gets sorted.
      </>
    ),
  },
  {
    q: 'Can I re-download my purchase later?',
    a: 'Yes — every purchase lives in your dashboard forever, even if the creator updates or pulls the listing. Old versions stay downloadable.',
  },
  {
    q: 'I bought as a guest and lost the email. How do I get my files?',
    a: (
      <>
        Two options.{' '}
        <Link
          href="/find-my-order"
          className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
        >
          Find my order
        </Link>{' '}
        resends the download link to the email you bought with — works
        even without an account. Or sign up with that same email and your
        purchase auto-attaches to your dashboard, with permanent re-downloads.
      </>
    ),
  },
  {
    q: 'Do I need to know how to code?',
    a: 'No for Skills and Agent Setups. They’re drop-in. Guides assume you can read and follow a step list.',
  },
  {
    q: 'How is payment handled?',
    a: 'Stripe runs every checkout — Skillzy never sees your card. Stripe pays the creator directly. We take a 20% platform fee, which also covers Stripe’s processing fees, so the creator gets a clean 80% of what you paid.',
  },
]

const creator: QA[] = [
  {
    q: 'How much does Skillzy take?',
    a: '20%. Creators keep a clean 80% of every sale — full stop. Stripe’s standard processing fees (around 2.9% + 30¢) come out of Skillzy’s 20%, not yours. The cut you see on the listing is the cut that lands in your account.',
  },
  {
    q: 'How do payouts work?',
    a: (
      <>
        Connect your Stripe account from{' '}
        <Link
          href="/dashboard/payouts"
          className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
        >
          Dashboard → Payouts
        </Link>
        . Stripe pays you direct on every sale on the cadence you set inside Stripe. Skillzy
        never holds your money.
      </>
    ),
  },
  {
    q: 'How many times can I sell the same listing?',
    a: 'Unlimited. List once, sell it forever. You set the price; we don’t cap units.',
  },
  {
    q: 'How fast does my listing go live?',
    a: 'Instant. The moment you publish, it’s live at /marketplace/<your-slug> and your share link + QR work straight away. You stay responsible for what you upload — only list work you have the rights to. Reports of malware, infringement, or junk get acted on quickly (see our IP & Takedown policy).',
  },
  {
    q: 'Can I update a listing after it’s live?',
    a: 'Yes — every edit (price, tagline, niche, status, files) is instant. No re-review queue.',
  },
  {
    q: 'What’s a SKILL.md, exactly?',
    a: (
      <>
        A plain Markdown file that tells an agent how to do one thing. The
        first line names the skill; the rest is the prompt — intent, inputs,
        steps, outputs. Buyers don’t need to write one; every listing already
        ships with the SKILL.md ready to drop into the agent. Browse the{' '}
        <Link
          href="/marketplace?type=skill"
          className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
        >
          skills on the marketplace
        </Link>{' '}
        to see them in action.
      </>
    ),
  },
  {
    q: 'What if a buyer disputes or refunds?',
    a: 'Skillzy doesn’t advertise a refund window. Buyers email us with a reason and we look at the case in good faith. If a refund is granted, it reverses through Stripe and your Stripe balance shows the deduction on the next reconciliation. Card-issuer chargebacks are handled by Stripe; we step in if it’s clearly bad-faith.',
  },
  {
    q: 'Can I sell on Skillzy and somewhere else?',
    a: 'Yes. No exclusivity clauses, no algorithmic curation deciding who eats. Your work is yours.',
  },
]

export default function HelpPage() {
  return (
    <article className="paper">
      <section className="px-6 lg:px-10 pt-16 sm:pt-24 pb-12 sm:pb-16 border-b border-brand-hairline">
        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            Help
          </span>
          <h1
            className="font-display mt-5 text-5xl sm:text-7xl tracking-tight leading-[0.95]"
            style={{ letterSpacing: '-0.03em' }}
          >
            Answers,{' '}
            <em className="italic text-brand-gold font-medium">straight.</em>
          </h1>
          <p className="mt-5 text-brand-muted max-w-prose">
            For everything not answered below, email{' '}
            <a
              href="mailto:help@skillzy.ai"
              className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
            >
              help@skillzy.ai
            </a>
            . A real person reads every message.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-16 sm:py-20 border-b border-brand-hairline">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <header className="lg:col-span-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              For buyers
            </span>
            <h2
              className="font-display mt-3 text-3xl sm:text-4xl tracking-tight"
              style={{ letterSpacing: '-0.025em' }}
            >
              Buying & using.
            </h2>
            <p className="mt-3 text-sm text-brand-muted">
              How purchase, download, and refund work.
            </p>
          </header>
          <div className="lg:col-span-8">
            <dl className="divide-y divide-brand-hairline border-y border-brand-hairline">
              {buyer.map((qa, i) => (
                <div key={i} className="py-6 sm:py-7 grid grid-cols-12 gap-4 items-baseline">
                  <span className="col-span-12 sm:col-span-1 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="col-span-12 sm:col-span-11">
                    <dt
                      className="font-display text-xl sm:text-2xl tracking-tight"
                      style={{ letterSpacing: '-0.018em' }}
                    >
                      {qa.q}
                    </dt>
                    <dd className="mt-2.5 text-brand-muted text-base leading-relaxed">
                      {qa.a}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-16 sm:py-20">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <header className="lg:col-span-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              For creators
            </span>
            <h2
              className="font-display mt-3 text-3xl sm:text-4xl tracking-tight"
              style={{ letterSpacing: '-0.025em' }}
            >
              Selling & getting paid.
            </h2>
            <p className="mt-3 text-sm text-brand-muted">
              The cuts, the cadence, the catches.
            </p>
          </header>
          <div className="lg:col-span-8">
            <dl className="divide-y divide-brand-hairline border-y border-brand-hairline">
              {creator.map((qa, i) => (
                <div key={i} className="py-6 sm:py-7 grid grid-cols-12 gap-4 items-baseline">
                  <span className="col-span-12 sm:col-span-1 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="col-span-12 sm:col-span-11">
                    <dt
                      className="font-display text-xl sm:text-2xl tracking-tight"
                      style={{ letterSpacing: '-0.018em' }}
                    >
                      {qa.q}
                    </dt>
                    <dd className="mt-2.5 text-brand-muted text-base leading-relaxed">
                      {qa.a}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex items-center gap-5 flex-wrap">
              <Link
                href="/sell"
                className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-6 py-3.5 text-[15px] hover:bg-brand-gold-dark transition-colors"
              >
                Start selling
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/marketplace"
                className="text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
              >
                See what sells →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
