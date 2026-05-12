import Link from 'next/link'

export const metadata = {
  title: 'New listing — Skillzy',
  description: 'Publish a skill, guide, or agent setup on Skillzy.',
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
      ? 'bg-brand-mustard text-brand-ink'
      : 'bg-brand-emerald text-brand-cream'
  return (
    <span
      className={`inline-block font-mono text-[11px] uppercase tracking-[0.18em] px-3 py-1.5 ${toneClass}`}
      style={{ transform: `rotate(${rotate})` }}
    >
      {children}
    </span>
  )
}

const types = [
  {
    key: 'skill',
    title: 'Skill',
    price: '$9 — $29 typical',
    desc: 'One SKILL.md. One job, done sharp.',
  },
  {
    key: 'guide',
    title: 'Guide',
    price: '$9 — $24 typical',
    desc: 'A how-to people will actually read.',
  },
  {
    key: 'setup',
    title: 'Agent Setup',
    price: '$49 — $499+ typical',
    desc: 'The whole agent. The moneymaker.',
    recommended: true,
  },
]

export default function NewListingPage() {
  return (
    <div className="paper">
      {/* breadcrumb */}
      <div className="max-w-page mx-auto px-6 lg:px-10 pt-8 sm:pt-10">
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted"
        >
          <Link href="/sell" className="hover:text-brand-emerald transition-colors">
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
            className="font-display mt-7 text-5xl sm:text-7xl lg:text-[6.5rem] tracking-tight leading-[0.95]"
            style={{ letterSpacing: '-0.03em' }}
          >
            Ship a thing.{' '}
            <em className="italic text-brand-emerald font-medium">
              Get paid.
            </em>
          </h1>
          <p className="mt-7 text-xl text-brand-ink max-w-2xl">
            Five sections, ten minutes. The AI does the writing so you don’t
            have to.
          </p>
        </div>
      </section>

      {/* STEP 1 — type */}
      <Step number="01" title="Pick a type">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-hairline border border-brand-hairline">
          {types.map((t) => (
            <label
              key={t.key}
              className="relative bg-brand-cream-card p-6 sm:p-7 cursor-pointer hover:bg-white transition-colors"
            >
              {t.recommended && (
                <span className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-[0.18em] bg-brand-emerald text-brand-cream px-2 py-0.5">
                  Best margins
                </span>
              )}
              <input
                type="radio"
                name="type"
                value={t.key}
                defaultChecked={t.key === 'setup'}
                className="sr-only peer"
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                {t.price}
              </span>
              <h3
                className="font-display text-2xl sm:text-3xl mt-3 tracking-tight peer-checked:text-brand-emerald"
                style={{ letterSpacing: '-0.02em' }}
              >
                {t.title}
              </h3>
              <p className="mt-2 text-sm text-brand-muted">{t.desc}</p>
            </label>
          ))}
        </div>
      </Step>

      {/* STEP 2 — files */}
      <Step number="02" title="Drop in your files">
        <div className="bg-brand-cream-card border border-brand-hairline p-7 sm:p-10">
          <div className="border-2 border-dashed border-brand-hairline p-10 sm:p-14 text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-emerald">
              Drag & drop
            </span>
            <p
              className="font-display text-2xl sm:text-3xl mt-3 tracking-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              SKILL.md, prompts, configs, templates.
            </p>
            <p className="mt-2 text-sm text-brand-muted">
              Or <span className="underline">browse</span>. We accept .md, .yaml, .json, .pdf, .zip.
            </p>
          </div>
          <p className="mt-5 text-xs text-brand-muted">
            Every upload is virus-scanned, then a human reviews your first
            listing within 24 hours. No surprises later.
          </p>
        </div>
      </Step>

      {/* STEP 3 — AI-assisted description (the differentiator) */}
      <section className="relative px-6 lg:px-10 py-16 sm:py-24 border-t border-brand-hairline bg-brand-emerald-deep text-brand-cream overflow-hidden">
        <div
          aria-hidden
          className="absolute top-8 right-8 sm:top-14 sm:right-16 hidden sm:block"
        >
          <Sticker tone="mustard" rotate="6deg">
            The differentiator
          </Sticker>
        </div>

        <div className="max-w-page mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cream/70">
            №03 · The good part
          </span>
          <h2
            className="font-display mt-5 text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.95]"
            style={{ letterSpacing: '-0.03em' }}
          >
            Let the AI{' '}
            <em className="italic text-brand-mustard-soft font-medium">
              write it.
            </em>
          </h2>
          <p className="mt-5 text-brand-cream/85 max-w-2xl text-lg">
            Talk into the mic, drop a doc, paste your notes. We’ll draft the
            whole listing — title, tagline, description, what’s-inside, setup
            steps, use cases. Refine by voice until it sounds like you.
          </p>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-px bg-brand-cream/10 border border-brand-cream/15">
            {/* INPUT */}
            <div className="lg:col-span-5 bg-brand-emerald-deep p-6 sm:p-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cream/70">
                Tell it what you built
              </span>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-cream text-brand-ink font-medium px-4 py-3 text-sm hover:bg-white transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
                    <rect x="9" y="3" width="6" height="12" rx="3" />
                    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" strokeLinecap="round" />
                  </svg>
                  Talk
                </button>
                <button
                  type="button"
                  className="flex-1 inline-flex items-center justify-center gap-2 border border-brand-cream/30 text-brand-cream font-medium px-4 py-3 text-sm hover:bg-brand-cream/10 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
                    <path d="M14 3v4a2 2 0 0 0 2 2h4M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9L14 3Z" />
                  </svg>
                  Upload
                </button>
                <button
                  type="button"
                  className="flex-1 inline-flex items-center justify-center gap-2 border border-brand-cream/30 text-brand-cream font-medium px-4 py-3 text-sm hover:bg-brand-cream/10 transition-colors"
                >
                  Type
                </button>
              </div>

              <textarea
                rows={9}
                defaultValue="Real estate skill bundle — captures leads, drafts listings, follows up. Built it for my old agency, used it on 240+ properties."
                className="mt-4 w-full bg-brand-emerald-deep border border-brand-cream/15 focus:border-brand-cream/40 outline-none p-3 text-sm text-brand-cream placeholder:text-brand-cream/40 font-mono"
                aria-label="Describe what you built"
              />

              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cream/60">
                Or refine by voice
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Make it shorter', 'More casual', 'Emphasise time saved', 'Speak to solo agents'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="text-xs px-3 py-1.5 border border-brand-cream/30 text-brand-cream hover:bg-brand-cream/10 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* PREVIEW */}
            <div className="lg:col-span-7 bg-brand-cream-card text-brand-ink p-6 sm:p-8 overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-emerald">
                  Live draft · sign off when ready
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                  Drafting…
                </span>
              </div>

              <h3
                className="font-display text-3xl sm:text-4xl mt-5 tracking-tight"
                style={{ letterSpacing: '-0.02em' }}
              >
                Real Estate, end to end.
              </h3>
              <p className="mt-3 text-brand-muted">
                Lead capture, listings, follow-ups, market reports. Plug it in,
                get an agent that runs the desk.
              </p>

              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-emerald mt-6">
                What’s inside
              </p>
              <ul className="mt-2 text-sm space-y-1.5 list-disc pl-5 text-brand-ink">
                <li>12 SKILL.md files covering leads, listings, follow-ups</li>
                <li>System prompts for buyer + seller + rental scenarios</li>
                <li>CRM connectors: HubSpot, Pipedrive, Follow Up Boss</li>
                <li>14-page setup guide with screenshots</li>
              </ul>

              <div className="mt-7 flex gap-3 flex-wrap">
                <button
                  type="button"
                  className="bg-brand-emerald text-brand-cream font-medium px-5 py-2.5 text-sm hover:bg-brand-emerald-deep transition-colors"
                >
                  Sign off →
                </button>
                <button
                  type="button"
                  className="border border-brand-ink text-brand-ink font-medium px-5 py-2.5 text-sm hover:bg-brand-ink hover:text-brand-cream transition-colors"
                >
                  Edit manually
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STEP 4 — price */}
      <Step number="04" title="Set your price">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 bg-brand-cream-card border border-brand-hairline p-7 sm:p-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-emerald">
              You set the price
            </span>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-6xl text-brand-ink" style={{ letterSpacing: '-0.03em' }}>
                $
              </span>
              <input
                type="text"
                inputMode="numeric"
                defaultValue="249"
                className="font-display text-6xl bg-transparent border-b border-brand-ink focus:border-brand-emerald outline-none w-40 py-1"
                style={{ letterSpacing: '-0.03em' }}
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted ml-3">
                USD
              </span>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-px bg-brand-hairline border border-brand-hairline">
              <div className="bg-brand-cream-card p-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                  You keep
                </span>
                <p
                  className="font-display text-3xl mt-2 text-brand-emerald"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  $199.20
                </p>
                <p className="text-xs text-brand-muted">per sale, paid to Stripe</p>
              </div>
              <div className="bg-brand-cream-card p-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                  Skillzy keeps
                </span>
                <p
                  className="font-display text-3xl mt-2"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  $49.80
                </p>
                <p className="text-xs text-brand-muted">20%, keeps the lights on</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <h3
              className="font-display text-2xl tracking-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              How to think about price
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-brand-muted">
              <li>
                <span className="text-brand-ink font-semibold">Skills</span>: $9–$29.
                Singular, useful, easy yes.
              </li>
              <li>
                <span className="text-brand-ink font-semibold">Guides</span>: $9–$24.
                Charge for the thinking, not the page count.
              </li>
              <li>
                <span className="text-brand-ink font-semibold">Agent Setups</span>: $49–$499+.
                Replaces a contractor or a SaaS — price like one.
              </li>
            </ul>
          </div>
        </div>
      </Step>

      {/* STEP 5 — submit */}
      <Step number="05" title="Submit for review">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <ul className="lg:col-span-7 bg-brand-cream-card border border-brand-hairline divide-y divide-brand-hairline">
            {[
              {
                title: 'Auto-scan',
                body: 'Every upload is scanned for malware, secrets, and copyright theft. Takes 30 seconds.',
              },
              {
                title: 'Human review on first listing',
                body: 'A real person looks at your first listing within 24 hours. Returning creators ship instantly.',
              },
              {
                title: 'Connect Stripe at publish',
                body: 'One click. We never hold your money — Stripe pays you direct on every sale.',
              },
              {
                title: 'Live the same day',
                body: 'Approved listings go live within an hour. Your dashboard shows the first sale come in.',
              },
            ].map((s) => (
              <li key={s.title} className="p-6 sm:p-7">
                <h4
                  className="font-display text-xl tracking-tight"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {s.title}
                </h4>
                <p className="mt-2 text-sm text-brand-muted">{s.body}</p>
              </li>
            ))}
          </ul>

          <div className="lg:col-span-5">
            <Link
              href="/dashboard?view=selling"
              className="inline-flex items-center gap-2 bg-brand-emerald text-brand-cream font-medium px-7 py-4 text-[15px] hover:bg-brand-emerald-deep transition-colors"
            >
              Submit for review
              <span aria-hidden>→</span>
            </Link>
            <p className="mt-4 text-xs text-brand-muted max-w-xs">
              Mock flow for the prototype. Real publishing kicks in once
              auth + Stripe Connect are wired up.
            </p>
          </div>
        </div>
      </Step>
    </div>
  )
}

function Step({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="px-6 lg:px-10 py-14 sm:py-20 border-t border-brand-hairline">
      <div className="max-w-page mx-auto">
        <div className="flex items-baseline gap-6 mb-8 sm:mb-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-emerald">
            №{number}
          </span>
          <h2
            className="font-display text-3xl sm:text-5xl tracking-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  )
}
