export const metadata = {
  title: 'About — Skillzy',
  description:
    'Skillzy is a marketplace where creators sell skills, guides, and ready-to-go agent setups for AI agents.',
}

export default function AboutPage() {
  return (
    <article className="px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-brand-ink">
          About Skillzy
        </h1>

        <div className="mt-8 space-y-5 text-lg text-brand-ink">
          <p>
            Skillzy is a marketplace where creators sell skills, guides, and full plug-and-play agent setups built for AI agents — Claude, OpenClaw, n8n, and other platforms.
          </p>
          <p>
            Buyers browse, purchase, and drop them straight into their own agent. Done.
          </p>
          <p>
            Three product types: <strong>Skills</strong> (one capability at a time), <strong>Guides</strong> (human-readable how-to docs), and <strong>Agent Setups</strong> (full niche-specific agent packages — real estate, builders, accountants, anything).
          </p>
          <p>
            Creators keep <strong>80% of every sale</strong>. Payouts happen automatically through Stripe — no platform-held funds, no manual transfers.
          </p>
          <p className="text-brand-muted">
            Got a question or a partnership idea? Email{' '}
            <a href="mailto:hello@skillzy.com" className="text-brand-purple font-semibold hover:underline">
              hello@skillzy.com
            </a>
            .
          </p>
        </div>
      </div>
    </article>
  )
}
