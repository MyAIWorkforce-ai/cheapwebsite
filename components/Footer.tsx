import Link from 'next/link'
import Logo from './Logo'
import NewsletterForm from './NewsletterForm'

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

            <div className="mt-8 max-w-sm">
              <p className="label-cap text-brand-gold mb-2">The dispatch</p>
              <p className="text-xs text-brand-muted leading-relaxed">
                New listings, creator interviews, the occasional discount.
                Every other Friday.
              </p>
              <NewsletterForm />
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="label-cap text-brand-gold mb-4">Catalogue</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/marketplace?type=agent-setup" className="hover:text-brand-gold transition-colors">Agent Setups</Link></li>
              <li><Link href="/marketplace?type=skill" className="hover:text-brand-gold transition-colors">Skills</Link></li>
              <li><Link href="/marketplace?type=guide" className="hover:text-brand-gold transition-colors">Guides</Link></li>
              <li><Link href="/marketplace" className="hover:text-brand-gold transition-colors">All of it</Link></li>
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
              <li><a href="https://myaiworkforce.ai" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">Build my agent</a></li>
              <li><Link href="/help" className="hover:text-brand-gold transition-colors">Help</Link></li>
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
            {/*
              Social icons render as visual placeholders until the Skillzy
              accounts exist. TODO when accounts are live, wrap each icon
              back in an <a href="..."> and remove the `title` attribute.
              Accounts to register:
                - x.com / twitter
                - github.com (org for open-source skill libs)
                - instagram.com
                - facebook.com
                - youtube.com
            */}
            <span title="Coming soon" aria-label="X (coming soon)" className="opacity-60">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.91l-5.41-7.07L4.4 22H1.14l8.02-9.17L1 2h7.06l4.9 6.48L18.24 2Zm-1.22 18h1.84L7.07 4H5.1l11.92 16Z" />
              </svg>
            </span>
            <span title="Coming soon" aria-label="GitHub (coming soon)" className="opacity-60">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 .5C5.73.5.66 5.58.66 11.86c0 5.02 3.25 9.27 7.76 10.78.57.11.78-.25.78-.55v-2.13c-3.16.69-3.83-1.36-3.83-1.36-.52-1.31-1.26-1.66-1.26-1.66-1.03-.71.08-.69.08-.69 1.14.08 1.74 1.18 1.74 1.18 1.01 1.74 2.66 1.24 3.31.95.1-.74.4-1.24.72-1.53-2.52-.29-5.17-1.27-5.17-5.64 0-1.25.44-2.27 1.17-3.07-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.16 1.17a10.9 10.9 0 0 1 5.76 0c2.2-1.48 3.15-1.17 3.15-1.17.63 1.58.24 2.74.12 3.03.73.8 1.16 1.82 1.16 3.07 0 4.39-2.66 5.34-5.2 5.62.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.78.55a11.36 11.36 0 0 0 7.76-10.78C23.34 5.58 18.27.5 12 .5Z" />
              </svg>
            </span>
            <span title="Coming soon" aria-label="Instagram (coming soon)" className="opacity-60">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
              </svg>
            </span>
            <span title="Coming soon" aria-label="Facebook (coming soon)" className="opacity-60">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M13 22v-8h2.7l.4-3.1H13V8.9c0-.9.3-1.5 1.6-1.5H16V4.6c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9v2.5H7.3V14h2.7v8H13Z" />
              </svg>
            </span>
            <span title="Coming soon" aria-label="YouTube (coming soon)" className="opacity-60">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M23 7.1c-.3-1-1-1.8-2-2C19 5 12 5 12 5s-7 0-9 .1c-1 .2-1.7 1-2 2C1 9 1 12 1 12s0 3 .1 4.9c.3 1 1 1.8 2 2C5 19 12 19 12 19s7 0 9-.1c1-.2 1.7-1 2-2C23 15 23 12 23 12s0-3-.1-4.9ZM10 15V9l5 3-5 3Z" />
              </svg>
            </span>
            <a href="mailto:hi@skillzy.ai" aria-label="Email" className="hover:text-brand-gold transition-colors">
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
