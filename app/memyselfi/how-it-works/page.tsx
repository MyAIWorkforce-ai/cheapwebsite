import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How it works',
  description:
    'How memyselfi turns who you are into an AI that answers in your voice — and refuses to make things up.',
}

const sections = [
  {
    n: '01',
    t: 'You answer, in your words',
    d: 'No prompt engineering, no training jargon. You write the questions people actually ask you and the answers you actually give. That text is the raw material — not a generic model pretending to be you.',
  },
  {
    n: '02',
    t: 'It maps your knowledge',
    d: 'Each thing you teach it becomes a piece of knowledge with the language you used. When someone asks something, your twin finds the closest thing you actually said and answers from that — not from the open internet.',
  },
  {
    n: '03',
    t: 'It borrows your voice',
    d: 'You describe how you sound in a few words. Your twin keeps that register everywhere — including, crucially, when it has to say “I don’t know.”',
  },
  {
    n: '04',
    t: 'It refuses to invent you',
    d: 'The thing that makes a twin trustworthy is the thing it won’t do. When a question falls outside what you taught it, it declines — in your voice — instead of hallucinating a person who never existed.',
  },
  {
    n: '05',
    t: 'You own the link',
    d: 'memyselfi.ai/yourname is yours. Share it, gate it, charge for it, export it, or delete it. Your twin is your property, not our dataset.',
  },
]

export default function HowItWorks() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16">
      <span
        className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em]"
        style={{ color: 'var(--mmi-accent)' }}
      >
        How it works
      </span>
      <h1
        className="mt-4 font-display text-4xl sm:text-6xl"
        style={{ letterSpacing: '-0.03em', color: 'var(--mmi-text)' }}
      >
        It only knows what you tell it.
      </h1>
      <p
        className="mt-5 text-lg leading-relaxed"
        style={{ color: 'var(--mmi-muted)' }}
      >
        Most “AI you” tools are a generic model wearing your name. memyselfi is
        the opposite: a small, honest thing that says only what you taught it,
        the way you’d say it.
      </p>

      <div className="mt-14 space-y-12">
        {sections.map((s) => (
          <div key={s.n} className="flex gap-6">
            <span
              className="font-display text-3xl shrink-0 w-12"
              style={{ color: 'var(--mmi-accent)' }}
            >
              {s.n}
            </span>
            <div>
              <h2
                className="text-2xl font-semibold"
                style={{ color: 'var(--mmi-text)' }}
              >
                {s.t}
              </h2>
              <p
                className="mt-3 text-[15px] leading-relaxed"
                style={{ color: 'var(--mmi-muted)' }}
              >
                {s.d}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-16 rounded-2xl border p-8"
        style={{
          borderColor: 'var(--mmi-line)',
          backgroundColor: 'var(--mmi-panel)',
        }}
      >
        <h2
          className="font-display text-2xl"
          style={{ color: 'var(--mmi-text)' }}
        >
          Five minutes. That’s the whole ask.
        </h2>
        <Link
          href="/memyselfi/create"
          className="mt-5 inline-block rounded-full px-6 py-3 text-sm font-semibold"
          style={{ backgroundColor: 'var(--mmi-accent)', color: '#0b0a14' }}
        >
          Build my twin
        </Link>
      </div>
    </div>
  )
}
