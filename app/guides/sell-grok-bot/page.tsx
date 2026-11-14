import Link from 'next/link'

export const metadata = {
  title: 'How to sell a Grok Bot',
  description:
    'Package the Grok Bot you built into a drop-in bundle buyers can install in 5 minutes. Export the system prompt, bundle the knowledge files, write the handover doc, pick a price. 10 minutes end to end.',
  keywords: [
    'sell Grok Bot',
    'export Grok Bot',
    'Grok Bot marketplace',
    'how to package a Grok Bot',
    'Grok Studio export',
    'niche AI agent',
  ],
}

export default function SellGrokBotGuide() {
  return (
    <article className="paper px-6 lg:px-10 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto">
        <nav className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted mb-5">
          <Link href="/guides" className="hover:text-brand-ink">
            Guides
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brand-ink">Sell a Grok Bot</span>
        </nav>

        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
          Creator guide
        </span>
        <h1
          className="font-display mt-5 text-5xl sm:text-7xl tracking-tight leading-[1]"
          style={{ letterSpacing: '-0.03em' }}
        >
          How to sell a{' '}
          <em className="italic text-brand-gold font-medium">Grok Bot.</em>
        </h1>
        <p className="mt-6 text-xl text-brand-muted leading-snug max-w-2xl">
          You trained it. You know it works. Here&rsquo;s how to package it
          so someone else can install it in their own Grok account in five
          minutes — and pay you $29–$149 for the privilege.
        </p>

        <div className="mt-14 max-w-prose space-y-10 text-lg leading-relaxed">
          <section>
            <h2
              className="font-display text-3xl tracking-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              First — what you&rsquo;re actually selling
            </h2>
            <p className="mt-4">
              You can&rsquo;t fine-tune Grok&rsquo;s model (xAI reserves
              that). What you built is a <strong>configuration</strong> — a
              system prompt plus knowledge files plus tool permissions plus
              example conversations. The whole thing lives in Grok Studio.
            </p>
            <p className="mt-4">
              Grok doesn&rsquo;t yet have a one-click &ldquo;export my
              bot&rdquo; button, so the sellable artifact is a{' '}
              <strong>bundle</strong> — a zip file of the pieces a buyer
              needs to recreate your bot inside their own Grok account.
              They pay once, follow a 5-minute setup doc, and own a clean
              copy running in their account. You never touch their Grok.
            </p>
          </section>

          <section>
            <h2
              className="font-display text-3xl tracking-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              The 10-minute packaging process
            </h2>

            <h3 className="font-display text-xl mt-6">
              1. Download the Skillzy bundle template
            </h3>
            <p className="mt-2">
              We&rsquo;ve done the folder structure and placeholder files
              for you. Grab the starter kit:
            </p>
            <p className="mt-4">
              <a
                href="/templates/skillzy-grok-bot-bundle.zip"
                download
                className="inline-flex items-center gap-2 bg-brand-ink text-white font-semibold px-5 py-3 text-sm hover:bg-brand-gold hover:text-brand-ink transition-colors"
              >
                Download bundle template (.zip)
                <span aria-hidden>↓</span>
              </a>
            </p>

            <h3 className="font-display text-xl mt-8">
              2. Export your system prompt
            </h3>
            <p className="mt-2">
              Open Grok Studio → your bot → <strong>Instructions</strong>.
              Select everything in the field, copy, and paste it into
              <code className="font-mono text-base bg-brand-cream-card px-1.5 py-0.5 rounded">
                system-prompt.md
              </code>{' '}
              in the template. Keep the Markdown structure clean — buyers
              skim this file before trusting your bot with their money.
            </p>

            <h3 className="font-display text-xl mt-8">
              3. Bundle your knowledge files
            </h3>
            <p className="mt-2">
              Drag the PDFs, docs, Markdown files, or data your bot uses
              into the{' '}
              <code className="font-mono text-base bg-brand-cream-card px-1.5 py-0.5 rounded">
                knowledge/
              </code>{' '}
              folder. Use your originals, not re-downloads from Grok —
              Grok compresses files on upload and the copies won&rsquo;t
              be the same quality. Keep individual files under 20 MB.
            </p>

            <h3 className="font-display text-xl mt-8">
              4. Document the tool permissions
            </h3>
            <p className="mt-2">
              If your bot uses Grok&rsquo;s built-in tools (Web Search,
              DeepSearch, Code Execution, Vision, etc.), list them in{' '}
              <code className="font-mono text-base bg-brand-cream-card px-1.5 py-0.5 rounded">
                tool-permissions.md
              </code>{' '}
              with a one-line reason each. If it doesn&rsquo;t need any,
              delete that file — a cleaner bundle looks more professional.
            </p>

            <h3 className="font-display text-xl mt-8">
              5. Write 8–12 test prompts
            </h3>
            <p className="mt-2">
              Fill in{' '}
              <code className="font-mono text-base bg-brand-cream-card px-1.5 py-0.5 rounded">
                test-prompts.md
              </code>{' '}
              with a mix of quick wins, realistic jobs, and one or two
              edge cases. The buyer uses these to confirm the install
              worked. Trust forms in the first 30 seconds — give them
              something easy to try first.
            </p>

            <h3 className="font-display text-xl mt-8">
              6. Fill in the licence
            </h3>
            <p className="mt-2">
              Open{' '}
              <code className="font-mono text-base bg-brand-cream-card px-1.5 py-0.5 rounded">
                LICENCE.md
              </code>{' '}
              and swap in your name, support terms (free updates for 12
              months? 30 days email? as-is?) and any custom conditions.
              The template protects you from the obvious risks
              (redistribution, prompt leaks, clone-and-resell) without
              being a wall of legalese.
            </p>

            <h3 className="font-display text-xl mt-8">
              7. Delete the README, zip, upload
            </h3>
            <p className="mt-2">
              Remove{' '}
              <code className="font-mono text-base bg-brand-cream-card px-1.5 py-0.5 rounded">
                README.md
              </code>{' '}
              (meant for you, not the buyer) and{' '}
              <code className="font-mono text-base bg-brand-cream-card px-1.5 py-0.5 rounded">
                knowledge/README.md
              </code>
              . Zip the folder. Head to{' '}
              <Link
                href="/sell/new"
                className="text-brand-ink border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
              >
                /sell/new
              </Link>
              , drop the zip in, set a price, publish.
            </p>
          </section>

          <section>
            <h2
              className="font-display text-3xl tracking-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              Pricing — what to charge
            </h2>
            <div className="mt-5 border border-brand-hairline">
              <div className="grid grid-cols-2 gap-px bg-brand-hairline">
                <div className="bg-brand-cream-card p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand-muted">
                    Bundle shape
                  </p>
                </div>
                <div className="bg-brand-cream-card p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand-muted">
                    Suggested price
                  </p>
                </div>
                <div className="bg-white p-4">System prompt only</div>
                <div className="bg-white p-4">$9 – $29</div>
                <div className="bg-white p-4">Prompt + small knowledge base</div>
                <div className="bg-white p-4">$29 – $79</div>
                <div className="bg-white p-4">
                  Full niche-vertical setup (prompt + knowledge + tools + docs)
                </div>
                <div className="bg-white p-4">$79 – $149</div>
                <div className="bg-white p-4">Multi-bot or agency-grade kit</div>
                <div className="bg-white p-4">$149+</div>
              </div>
            </div>
            <p className="mt-4 text-brand-muted">
              Price for volume, not scarcity. Sell 500 at $49 beats 10 at
              $999 — and leakage hurts you less when the base is wide.
            </p>
          </section>

          <section>
            <h2
              className="font-display text-3xl tracking-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              Protecting your IP
            </h2>
            <p className="mt-4">
              Honest answer: you can&rsquo;t fully stop someone copying
              your system prompt once it&rsquo;s in their hands. Every
              prompt marketplace has this problem. What actually protects
              creators:
            </p>
            <ul className="mt-4 space-y-2 list-disc list-inside">
              <li>
                <strong>Terms of use</strong> in the bundle (the template
                includes a standard one) — gives you legal footing if a
                blatant rip surfaces.
              </li>
              <li>
                <strong>Updates</strong> — ship v2, v3, v4 as Grok evolves.
                Pirates don&rsquo;t update. Real buyers come back for the
                new version in their Skillzy dashboard.
              </li>
              <li>
                <strong>Bundle more than the prompt</strong> — knowledge
                files, example prompts, a walkthrough video, 30 days of
                email support. All harder to pirate than text.
              </li>
              <li>
                <strong>Build reputation</strong> — buyers come to
                &ldquo;the bot by [your name]&rdquo; for the ongoing
                relationship, not just the file.
              </li>
            </ul>
          </section>

          <section>
            <h2
              className="font-display text-3xl tracking-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              Ready?
            </h2>
            <p className="mt-4">
              Download the template, fill it in, ship it.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/templates/skillzy-grok-bot-bundle.zip"
                download
                className="inline-flex items-center gap-2 bg-brand-ink text-white font-semibold px-6 py-3 text-sm hover:bg-brand-gold hover:text-brand-ink transition-colors"
              >
                Download template
                <span aria-hidden>↓</span>
              </a>
              <Link
                href="/sell/new"
                className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-6 py-3 text-sm hover:bg-brand-gold-dark transition-colors"
              >
                Publish your bot
                <span aria-hidden>→</span>
              </Link>
            </div>
          </section>

          <p className="pt-10 border-t border-brand-hairline text-brand-muted">
            Questions?{' '}
            <a
              href="mailto:hi@skillzy.ai"
              className="text-brand-ink border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
            >
              hi@skillzy.ai
            </a>
          </p>
        </div>
      </div>
    </article>
  )
}
