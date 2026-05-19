import Link from 'next/link'
import ChatPanel from '@/components/memyselfi/ChatPanel'
import { getTwin, twins } from '@/lib/memyselfi/twins'

const demo = getTwin('maya')!

const steps = [
  {
    n: '01',
    t: 'Tell it who you are',
    d: 'Your story, your work, the things people always ask you. Five minutes of typing, not a training course.',
  },
  {
    n: '02',
    t: 'It learns your voice',
    d: 'Not just facts — how you say them. Blunt, warm, careful, funny. It answers like you, or it doesn’t answer.',
  },
  {
    n: '03',
    t: 'Share your link',
    d: 'memyselfi.ai/yourname. Send it to anyone. They talk to you, at 3am, while you sleep.',
  },
]

const useCases = [
  {
    tag: 'Creators',
    title: 'Let your audience talk to you',
    body: 'Ten thousand DMs you’ll never answer become one link that answers in your voice.',
    handle: 'maya',
  },
  {
    tag: 'Experts & coaches',
    title: 'Clone the answer you give 100 times',
    body: 'The same forty questions, handled. You keep the conversations that actually need you.',
    handle: 'theo',
  },
  {
    tag: 'Job-seekers',
    title: 'A résumé that talks back',
    body: 'Recruiters interrogate your experience before the first call. You show up already understood.',
    handle: 'devon',
  },
  {
    tag: 'Family & legacy',
    title: 'Keep a voice for the people you love',
    body: 'The stories, the recipes, the way they said things — kept, and still answering.',
    handle: 'nan',
  },
]

const faqs = [
  {
    q: 'Is this just a chatbot with my name on it?',
    a: 'No. A chatbot guesses. Your twin only says what you taught it, in the voice you set. When it doesn’t know, it says so — the way you would.',
  },
  {
    q: 'What does it say when it doesn’t know something?',
    a: 'It declines, in character. We’d rather your twin admit a gap than invent a version of you that never existed.',
  },
  {
    q: 'Who owns it?',
    a: 'You. Your twin, your link, your words. Export it or delete it whenever you want — it’s you, not us.',
  },
  {
    q: 'Do I need to be technical?',
    a: 'If you can write a long text message, you can build your twin. No prompts, no setup, no model wrangling.',
  },
]

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em]"
      style={{ color: 'var(--mmi-accent)' }}
    >
      {children}
    </span>
  )
}

export default function MemyselfiHome() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 mmi-grid" aria-hidden />
        <div className="absolute inset-0 mmi-glow" aria-hidden />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="mmi-fade-up">
              <Eyebrow>Your mind, at a link</Eyebrow>
              <h1
                className="mt-5 font-display text-[2.9rem] sm:text-6xl lg:text-7xl leading-[0.98]"
                style={{ letterSpacing: '-0.03em', color: 'var(--mmi-text)' }}
              >
                An AI that{' '}
                <span style={{ color: 'var(--mmi-accent)' }}>is you</span>.
              </h1>
              <p
                className="mt-6 text-lg sm:text-xl leading-relaxed max-w-xl"
                style={{ color: 'var(--mmi-muted)' }}
              >
                memyselfi turns who you are — your story, your voice, your way
                of thinking — into an AI people can talk to. At{' '}
                <span style={{ color: 'var(--mmi-text)' }}>
                  memyselfi.ai/yourname
                </span>
                . Always you. Always on.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/memyselfi/create"
                  className="rounded-full px-6 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.03]"
                  style={{ backgroundColor: 'var(--mmi-accent)', color: '#0b0a14' }}
                >
                  Build my twin — free
                </Link>
                <Link
                  href="#try"
                  className="text-sm font-medium border-b pb-0.5 transition-colors"
                  style={{ color: 'var(--mmi-text)', borderColor: 'var(--mmi-muted)' }}
                >
                  Or talk to one first
                </Link>
              </div>
              <p className="mt-5 text-[13px]" style={{ color: 'var(--mmi-muted)' }}>
                No prompts. No setup. The one on the right is real — try it.
              </p>
            </div>

            <div className="mmi-fade-up" style={{ animationDelay: '0.12s' }}>
              <ChatPanel twin={demo} compact />
            </div>
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="border-y" style={{ borderColor: 'var(--mmi-line)' }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
          <p
            className="font-display text-2xl sm:text-4xl leading-tight max-w-4xl"
            style={{ letterSpacing: '-0.02em', color: 'var(--mmi-text)' }}
          >
            You answer the same questions for the rest of your life — to fans,
            clients, recruiters, your own grandchildren.{' '}
            <span style={{ color: 'var(--mmi-muted)' }}>
              memyselfi answers them the way you would, so you only show up for
              the conversations that need the real you.
            </span>
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <Eyebrow>Three steps</Eyebrow>
        <h2
          className="mt-4 font-display text-3xl sm:text-5xl"
          style={{ letterSpacing: '-0.025em', color: 'var(--mmi-text)' }}
        >
          From you, to a twin, today.
        </h2>
        <div className="mt-12 grid md:grid-cols-3 gap-px rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--mmi-line)', backgroundColor: 'var(--mmi-line)' }}>
          {steps.map((s) => (
            <div
              key={s.n}
              className="p-8"
              style={{ backgroundColor: 'var(--mmi-panel)' }}
            >
              <span
                className="font-display text-4xl"
                style={{ color: 'var(--mmi-accent)' }}
              >
                {s.n}
              </span>
              <h3
                className="mt-4 text-xl font-semibold"
                style={{ color: 'var(--mmi-text)' }}
              >
                {s.t}
              </h3>
              <p
                className="mt-2.5 text-[15px] leading-relaxed"
                style={{ color: 'var(--mmi-muted)' }}
              >
                {s.d}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/memyselfi/how-it-works"
            className="text-sm font-medium border-b pb-0.5"
            style={{ color: 'var(--mmi-accent)', borderColor: 'var(--mmi-accent)' }}
          >
            See exactly how it stays in your voice →
          </Link>
        </div>
      </section>

      {/* USE CASES */}
      <section className="border-t" style={{ borderColor: 'var(--mmi-line)' }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
          <Eyebrow>Who builds one</Eyebrow>
          <h2
            className="mt-4 font-display text-3xl sm:text-5xl"
            style={{ letterSpacing: '-0.025em', color: 'var(--mmi-text)' }}
          >
            One idea. Very different reasons.
          </h2>
          <div className="mt-12 grid sm:grid-cols-2 gap-5">
            {useCases.map((u) => (
              <Link
                key={u.tag}
                href={`/memyselfi/${u.handle}`}
                className="group rounded-2xl border p-7 transition-colors"
                style={{
                  borderColor: 'var(--mmi-line)',
                  backgroundColor: 'var(--mmi-panel)',
                }}
              >
                <Eyebrow>{u.tag}</Eyebrow>
                <h3
                  className="mt-3 text-xl font-semibold"
                  style={{ color: 'var(--mmi-text)' }}
                >
                  {u.title}
                </h3>
                <p
                  className="mt-2.5 text-[15px] leading-relaxed"
                  style={{ color: 'var(--mmi-muted)' }}
                >
                  {u.body}
                </p>
                <span
                  className="mt-4 inline-block text-sm font-medium"
                  style={{ color: 'var(--mmi-accent)' }}
                >
                  Talk to {u.handle}’s twin →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRY */}
      <section id="try" className="border-t" style={{ borderColor: 'var(--mmi-line)' }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
          <Eyebrow>Live now</Eyebrow>
          <h2
            className="mt-4 font-display text-3xl sm:text-5xl"
            style={{ letterSpacing: '-0.025em', color: 'var(--mmi-text)' }}
          >
            Don’t take our word. Take theirs.
          </h2>
          <p className="mt-4 max-w-xl" style={{ color: 'var(--mmi-muted)' }}>
            Four real twins, four different people. Pick a fight, ask for
            advice, try to trip them up.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {twins.map((t) => (
              <Link
                key={t.handle}
                href={`/memyselfi/${t.handle}`}
                className="rounded-2xl border p-6 transition-transform hover:-translate-y-0.5"
                style={{
                  borderColor: 'var(--mmi-line)',
                  backgroundColor: 'var(--mmi-panel)',
                }}
              >
                <span
                  className="grid place-items-center w-11 h-11 rounded-full text-sm font-semibold"
                  style={{ backgroundColor: t.accent, color: '#0b0a14' }}
                >
                  {t.shortName.slice(0, 2).toUpperCase()}
                </span>
                <h3
                  className="mt-4 font-semibold"
                  style={{ color: 'var(--mmi-text)' }}
                >
                  {t.name}
                </h3>
                <p className="text-[13px]" style={{ color: 'var(--mmi-muted)' }}>
                  {t.role}
                </p>
                <p
                  className="mt-3 text-[14px] leading-relaxed"
                  style={{ color: 'var(--mmi-muted)' }}
                >
                  {t.tagline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="border-t" style={{ borderColor: 'var(--mmi-line)' }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <div>
            <Eyebrow>Pricing</Eyebrow>
            <h2
              className="mt-4 font-display text-3xl sm:text-5xl max-w-xl"
              style={{ letterSpacing: '-0.025em', color: 'var(--mmi-text)' }}
            >
              Free to be yourself. Pay only to scale yourself.
            </h2>
            <p className="mt-4 max-w-md" style={{ color: 'var(--mmi-muted)' }}>
              Your twin and your public link are free, forever. Pro adds custom
              voice, analytics, and the ability to charge for access.
            </p>
          </div>
          <Link
            href="/memyselfi/pricing"
            className="shrink-0 rounded-full px-6 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.03]"
            style={{ backgroundColor: 'var(--mmi-accent)', color: '#0b0a14' }}
          >
            See the plans
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t" style={{ borderColor: 'var(--mmi-line)' }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20">
          <Eyebrow>Honest answers</Eyebrow>
          <h2
            className="mt-4 font-display text-3xl sm:text-5xl"
            style={{ letterSpacing: '-0.025em', color: 'var(--mmi-text)' }}
          >
            The questions you’d ask us.
          </h2>
          <div className="mt-10 divide-y" style={{ borderColor: 'var(--mmi-line)' }}>
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary
                  className="cursor-pointer list-none flex items-center justify-between gap-4 text-lg font-medium"
                  style={{ color: 'var(--mmi-text)' }}
                >
                  {f.q}
                  <span
                    className="transition-transform group-open:rotate-45 text-2xl leading-none"
                    style={{ color: 'var(--mmi-accent)' }}
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p
                  className="mt-3 text-[15px] leading-relaxed"
                  style={{ color: 'var(--mmi-muted)' }}
                >
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t" style={{ borderColor: 'var(--mmi-line)' }}>
        <div className="absolute inset-0 mmi-glow" aria-hidden />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-24 text-center">
          <h2
            className="font-display text-4xl sm:text-6xl"
            style={{ letterSpacing: '-0.03em', color: 'var(--mmi-text)' }}
          >
            There will be a you that never sleeps.
          </h2>
          <p
            className="mt-5 text-lg max-w-xl mx-auto"
            style={{ color: 'var(--mmi-muted)' }}
          >
            The only question is whether you build it, or someone builds a worse
            one without you.
          </p>
          <Link
            href="/memyselfi/create"
            className="mt-9 inline-block rounded-full px-8 py-4 text-sm font-semibold transition-transform hover:scale-[1.03]"
            style={{ backgroundColor: 'var(--mmi-accent)', color: '#0b0a14' }}
          >
            Build my twin — free
          </Link>
        </div>
      </section>
    </div>
  )
}
