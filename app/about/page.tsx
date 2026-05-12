export const metadata = {
  title: 'About — Skillzy',
  description:
    'Skillzy is a marketplace for skills, guides, and ready-to-go agent setups.',
}

export default function AboutPage() {
  return (
    <article className="paper px-6 lg:px-10 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-emerald">
          About
        </span>
        <h1
          className="font-display mt-5 text-5xl sm:text-7xl tracking-tight leading-[1]"
          style={{ letterSpacing: '-0.03em' }}
        >
          We sell the{' '}
          <em className="italic text-brand-emerald font-medium">good stuff.</em>
        </h1>

        <div className="mt-12 max-w-prose space-y-6 text-lg leading-relaxed">
          <p>
            Skillzy is a marketplace where creators sell <strong>skills</strong>,{' '}
            <strong>guides</strong>, and full plug-and-play <strong>agent setups</strong>{' '}
            built for AI agents — Claude, OpenClaw, n8n, and the rest.
          </p>
          <p>
            Buyers browse, purchase, and drop them into their own agent. No
            assembly, no five-tab tutorial. Done.
          </p>
          <p>
            Three product types. <strong>Skills</strong> do one thing well.{' '}
            <strong>Guides</strong> teach the parts the docs skip. <strong>Agent Setups</strong>{' '}
            are the headliner: a complete agent for a single line of work,
            bundled into one purchase.
          </p>
          <p>
            Creators keep <strong>80% of every sale.</strong> Stripe handles
            payouts. The platform never holds your money.
          </p>
          <p className="text-brand-muted">
            Get in touch:{' '}
            <a
              href="mailto:hello@skillzy.com"
              className="text-brand-ink border-b border-brand-ink hover:text-brand-emerald hover:border-brand-emerald pb-0.5"
            >
              hello@skillzy.com
            </a>
          </p>
        </div>
      </div>
    </article>
  )
}
