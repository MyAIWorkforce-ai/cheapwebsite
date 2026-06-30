import Link from 'next/link'
import Logo from './Logo'
// NewsletterForm import kept commented during the Dispatch pause —
// uncomment + restore the footer block when reviving (~50 creators).
// import NewsletterForm from './NewsletterForm'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-brand-hairline">
      <div className="max-w-page mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Logo size="lg" />
            <p className="mt-5 text-sm text-brand-muted max-w-sm leading-relaxed">
              A marketplace for skills, guides, and ready-to-go agent setups.
              Made by humans. Dropped into your agent.
            </p>

            {/* The Dispatch newsletter is paused until ~50–100 creators
                are on the platform. Until we have something worth
                dispatching about, no point collecting signups. The
                form component, server action, and Beehiiv fallback
                chain are kept in the repo for fast revival — see
                HANDOFF "Phase 2 / Content / marketplace". */}
          </div>

          <div className="md:col-span-2">
            <p className="label-cap text-brand-gold mb-4">Catalogue</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/marketplace?type=agent-setup" className="hover:text-brand-gold transition-colors">Agent Setups</Link></li>
              <li><Link href="/marketplace?type=skill" className="hover:text-brand-gold transition-colors">Skills</Link></li>
              <li><Link href="/marketplace?type=guide" className="hover:text-brand-gold transition-colors">Guides</Link></li>
              <li><Link href="/marketplace" className="hover:text-brand-gold transition-colors">All</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="label-cap text-brand-gold mb-4">Skillzy</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-brand-gold transition-colors">About</Link></li>
              <li><Link href="/how-it-works" className="hover:text-brand-gold transition-colors">How it works</Link></li>
              <li><Link href="/blog" className="hover:text-brand-gold transition-colors">Field Notes</Link></li>
              <li><Link href="/dispatch" className="hover:text-brand-gold transition-colors">Latest</Link></li>
              <li><Link href="/sell" className="hover:text-brand-gold transition-colors">Sell</Link></li>
              <li><Link href="/affiliates" className="hover:text-brand-gold transition-colors">Refer &amp; earn</Link></li>
              <li><a href="https://myaiworkforce.ai/buildagent" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">Build my agent</a></li>
              <li><Link href="/help" className="hover:text-brand-gold transition-colors">Help</Link></li>
              <li><Link href="/find-my-order" className="hover:text-brand-gold transition-colors">Find my order</Link></li>
              <li><Link href="/contact" className="hover:text-brand-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="label-cap text-brand-gold mb-4">Fine print</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/terms" className="hover:text-brand-gold transition-colors">Terms</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-gold transition-colors">Privacy</Link></li>
              <li><Link href="/refunds" className="hover:text-brand-gold transition-colors">Refunds</Link></li>
              <li><Link href="/dmca" className="hover:text-brand-gold transition-colors">IP &amp; Takedown</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-brand-hairline flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-brand-muted">
            © {year} Skillzy.ai
          </p>
          <div className="flex items-center gap-5 text-brand-muted">
            {/* All Skillzy social handles are @skillzyai. LinkedIn is
                deliberately omitted until that account is live; YouTube
                and GitHub were removed when the broader social set went
                live. Order: Facebook, Instagram, X, TikTok, Threads, Email. */}
            <a
              href="https://facebook.com/skillzyai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Skillzy on Facebook"
              className="hover:text-brand-gold transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M13 22v-8h2.7l.4-3.1H13V8.9c0-.9.3-1.5 1.6-1.5H16V4.6c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9v2.5H7.3V14h2.7v8H13Z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/skillzyai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Skillzy on Instagram"
              className="hover:text-brand-gold transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://x.com/skillzyai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Skillzy on X"
              className="hover:text-brand-gold transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.91l-5.41-7.07L4.4 22H1.14l8.02-9.17L1 2h7.06l4.9 6.48L18.24 2Zm-1.22 18h1.84L7.07 4H5.1l11.92 16Z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@skillzyai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Skillzy on TikTok"
              className="hover:text-brand-gold transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.99a8.16 8.16 0 0 0 4.77 1.52V7.07a4.79 4.79 0 0 1-1.84-.38Z" />
              </svg>
            </a>
            <a
              href="https://www.threads.net/@skillzyai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Skillzy on Threads"
              className="hover:text-brand-gold transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12.18 2C6.65 2 2.5 6.05 2.5 12s4.15 10 9.68 10c5.34 0 9.32-3.6 9.32-8.85 0-3.7-2.15-5.8-4.7-6.7-.5-3.05-2.84-4.45-5.34-4.45-2.27 0-4.45 1.05-5.46 3.27l1.62.7c.65-1.4 2.03-2.17 3.65-2.17 1.78 0 3.32 1.07 3.7 3.25-1.7-.22-3.5-.06-5 .56-2.3.95-3.18 2.85-2.7 4.62.43 1.62 1.97 2.78 3.97 2.78 1.5 0 2.95-.54 3.92-1.72.9-1.05 1.34-2.5 1.18-4.02 1.84.78 3.16 2.4 3.16 5 0 4.1-3.1 6.85-7.43 6.85-4.5 0-7.92-3.18-7.92-8.13S7.78 3.85 12.18 3.85c2.83 0 5.18 1.36 6.4 3.62l1.6-.85C18.65 3.78 15.7 2 12.18 2Zm.84 9.97c.92 0 1.85.13 2.6.4-.06 1.1-.4 2.05-.97 2.7-.6.7-1.5 1.08-2.5 1.08-1.16 0-2-.55-2.18-1.28-.22-.85.32-1.8 1.65-2.32.4-.16.85-.27 1.4-.34.0 0 0 0 0 0Z" />
              </svg>
            </a>
            <a
              href="mailto:hi@skillzy.ai"
              aria-label="Email Skillzy"
              className="hover:text-brand-gold transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
