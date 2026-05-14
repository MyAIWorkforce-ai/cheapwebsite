'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { useState } from 'react'
import { publishListing, type PublishState } from './actions'

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
    key: 'agent_setup',
    title: 'Agent Setup',
    price: '$49 — $499+ typical',
    desc: 'The whole agent. The moneymaker.',
    recommended: true,
  },
]

const initial: PublishState = {}

function Submit() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors disabled:opacity-60"
    >
      {pending ? 'Submitting…' : 'Submit for review'}
      <span aria-hidden>→</span>
    </button>
  )
}

function StepShell({
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
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
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

export default function NewListingForm() {
  const [state, action] = useFormState(publishListing, initial)
  const [price, setPrice] = useState(249)

  const platformFeeCents = Math.round(price * 100 * 0.2)
  const youKeepCents = price * 100 - platformFeeCents

  return (
    <form action={action}>
      {/* STEP 1 — type */}
      <StepShell number="01" title="Pick a type">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-hairline border border-brand-hairline">
          {types.map((t) => (
            <label
              key={t.key}
              className="relative bg-brand-cream-card p-6 sm:p-7 cursor-pointer hover:bg-white transition-colors"
            >
              {t.recommended && (
                <span className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-[0.18em] bg-brand-navy text-brand-cream px-2 py-0.5">
                  Best margins
                </span>
              )}
              <input
                type="radio"
                name="type"
                value={t.key}
                defaultChecked={t.key === 'agent_setup'}
                className="sr-only peer"
                required
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                {t.price}
              </span>
              <h3
                className="font-display text-2xl sm:text-3xl mt-3 tracking-tight peer-checked:text-brand-gold"
                style={{ letterSpacing: '-0.02em' }}
              >
                {t.title}
              </h3>
              <p className="mt-2 text-sm text-brand-muted">{t.desc}</p>
            </label>
          ))}
        </div>
      </StepShell>

      {/* STEP 2 — files (mock for v1; uploads coming once bucket policies land) */}
      <StepShell number="02" title="Drop in your files">
        <div className="bg-brand-cream-card border border-brand-hairline p-7 sm:p-10">
          <div className="border-2 border-dashed border-brand-hairline p-10 sm:p-14 text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              Upload coming soon
            </span>
            <p
              className="font-display text-2xl sm:text-3xl mt-3 tracking-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              SKILL.md, prompts, configs, templates.
            </p>
            <p className="mt-2 text-sm text-brand-muted">
              For the first launch, mail your bundle to{' '}
              <a
                href="mailto:hi@skillzy.ai"
                className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
              >
                hi@skillzy.ai
              </a>{' '}
              after you submit. Real drag-and-drop lands shortly.
            </p>
          </div>
        </div>
      </StepShell>

      {/* STEP 3 — write it */}
      <StepShell number="03" title="Write it">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-7 max-w-2xl">
            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                Title
              </span>
              <input
                type="text"
                name="title"
                required
                placeholder="Real Estate, end to end."
                className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 font-display text-2xl placeholder:text-brand-muted/60"
                style={{ letterSpacing: '-0.018em' }}
              />
            </label>

            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                Tagline
              </span>
              <textarea
                name="tagline"
                rows={2}
                required
                placeholder="One sentence that tells a buyer what their agent gets."
                className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-lg placeholder:text-brand-muted/60"
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <label className="block">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                  Niche
                </span>
                <input
                  type="text"
                  name="niche"
                  placeholder="Real Estate, Builders, Bookkeeping…"
                  className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-lg placeholder:text-brand-muted/60"
                />
              </label>
              <label className="block">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                  Platforms (comma-separated)
                </span>
                <input
                  type="text"
                  name="platforms"
                  placeholder="Claude, OpenClaw, n8n"
                  className="mt-2 w-full bg-transparent border-b border-brand-hairline focus:border-brand-gold outline-none py-2 text-lg placeholder:text-brand-muted/60"
                />
              </label>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="bg-brand-cream-card border border-brand-hairline p-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                Tips
              </span>
              <ul className="mt-4 text-sm text-brand-muted space-y-2 leading-relaxed">
                <li>· Title in caps + period (e.g. <em>Real Estate, end to end.</em>) reads punchier.</li>
                <li>· Tagline starts with a verb (<em>captures leads</em>, <em>writes invoices</em>).</li>
                <li>· Pick the niche your buyer searches first.</li>
              </ul>
            </div>
          </aside>
        </div>
      </StepShell>

      {/* STEP 4 — price */}
      <StepShell number="04" title="Set your price">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 bg-brand-cream-card border border-brand-hairline p-7 sm:p-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
              You set the price
            </span>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-6xl text-brand-ink" style={{ letterSpacing: '-0.03em' }}>
                $
              </span>
              <input
                type="number"
                inputMode="numeric"
                name="price"
                min={1}
                step={1}
                value={price}
                onChange={(e) => setPrice(Math.max(0, Number(e.target.value) || 0))}
                className="font-display text-6xl bg-transparent border-b border-brand-ink focus:border-brand-gold outline-none w-40 py-1"
                style={{ letterSpacing: '-0.03em' }}
                required
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
                  className="font-display text-3xl mt-2 text-brand-gold"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  ${(youKeepCents / 100).toFixed(2)}
                </p>
                <p className="text-xs text-brand-muted">per sale &times; unlimited resales</p>
              </div>
              <div className="bg-brand-cream-card p-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                  Skillzy keeps
                </span>
                <p
                  className="font-display text-3xl mt-2"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  ${(platformFeeCents / 100).toFixed(2)}
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
      </StepShell>

      {/* STEP 5 — submit */}
      <StepShell number="05" title="Submit for review">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <ul className="lg:col-span-7 bg-brand-cream-card border border-brand-hairline divide-y divide-brand-hairline">
            {[
              {
                title: 'Auto-scan',
                body: 'Every upload is scanned for malware, secrets, and copyright theft. Takes 30 seconds.',
              },
              {
                title: 'Human review on first listing',
                body: 'A real person looks at your first listing within 24 hours. Returning creators publish instantly.',
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
            <Submit />

            {state.error && (
              <p className="mt-4 text-sm text-red-700">{state.error}</p>
            )}
            {state.info && (
              <p className="mt-4 text-sm text-brand-gold-dark">{state.info}</p>
            )}

            <p className="mt-5 text-xs text-brand-muted max-w-xs">
              Once approved, your listing lands at <code>/marketplace/{'{slug}'}</code>.
              You can edit price, tagline, status from your dashboard at any time.
            </p>
          </div>
        </div>
      </StepShell>
    </form>
  )
}
