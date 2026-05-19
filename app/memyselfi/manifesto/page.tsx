import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Manifesto',
  description: 'Why memyselfi.ai exists.',
}

export default function Manifesto() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20">
      <span
        className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em]"
        style={{ color: 'var(--mmi-accent)' }}
      >
        Manifesto
      </span>

      <div
        className="mt-8 space-y-7 font-display text-2xl sm:text-[2rem] leading-[1.3]"
        style={{ letterSpacing: '-0.02em', color: 'var(--mmi-text)' }}
      >
        <p>
          There is already an AI version of you. It’s in a recruiter’s notes,
          a fan’s imagination, a model’s training data. It’s just{' '}
          <span style={{ color: 'var(--mmi-accent)' }}>not yours</span>, and
          it’s usually wrong.
        </p>
        <p
          className="text-xl sm:text-2xl"
          style={{ color: 'var(--mmi-muted)' }}
        >
          You spend your life answering the same questions. The same forty
          things, to clients, to your audience, to your kids. Every answer is a
          small piece of you, given away and never kept.
        </p>
        <p>memyselfi keeps them.</p>
        <p
          className="text-xl sm:text-2xl"
          style={{ color: 'var(--mmi-muted)' }}
        >
          Not a chatbot with your headshot. Not a model guessing what you’d
          say. A small, honest thing that says only what you taught it, in the
          voice you set, and admits the rest.
        </p>
        <p>
          Because the alternative isn’t “no AI version of you.” The
          alternative is{' '}
          <span style={{ color: 'var(--mmi-accent)' }}>
            someone else’s version of you
          </span>
          .
        </p>
        <p
          className="text-xl sm:text-2xl"
          style={{ color: 'var(--mmi-muted)' }}
        >
          So build yours. Own the link. Keep the voice. Decide what it knows
          and what it won’t pretend to.
        </p>
        <p>Me. Myself. I — and an AI that finally gets which is which.</p>
      </div>

      <Link
        href="/memyselfi/create"
        className="mt-14 inline-block rounded-full px-7 py-3.5 text-sm font-semibold"
        style={{ backgroundColor: 'var(--mmi-accent)', color: '#0b0a14' }}
      >
        Build mine
      </Link>
    </div>
  )
}
