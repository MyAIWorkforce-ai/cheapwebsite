import Link from 'next/link'
import Logo from './Logo'

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
          </div>

          <div className="md:col-span-3">
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
              <li><Link href="/sell" className="hover:text-brand-gold transition-colors">Sell</Link></li>
              <li><Link href="/contact" className="hover:text-brand-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="label-cap text-brand-gold mb-4">Fine print</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/terms" className="hover:text-brand-gold transition-colors">Terms</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-gold transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-brand-hairline flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-brand-muted">
            © {year} Skillzy &nbsp;·&nbsp; Set in Fraunces &amp; Inter
          </p>
          <div className="flex items-center gap-5 text-brand-muted">
            <a href="https://x.com/skillzy" aria-label="X" className="hover:text-brand-gold transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.91l-5.41-7.07L4.4 22H1.14l8.02-9.17L1 2h7.06l4.9 6.48L18.24 2Zm-1.22 18h1.84L7.07 4H5.1l11.92 16Z" />
              </svg>
            </a>
            <a href="https://github.com/skillzy" aria-label="GitHub" className="hover:text-brand-gold transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 .5C5.73.5.66 5.58.66 11.86c0 5.02 3.25 9.27 7.76 10.78.57.11.78-.25.78-.55v-2.13c-3.16.69-3.83-1.36-3.83-1.36-.52-1.31-1.26-1.66-1.26-1.66-1.03-.71.08-.69.08-.69 1.14.08 1.74 1.18 1.74 1.18 1.01 1.74 2.66 1.24 3.31.95.1-.74.4-1.24.72-1.53-2.52-.29-5.17-1.27-5.17-5.64 0-1.25.44-2.27 1.17-3.07-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.16 1.17a10.9 10.9 0 0 1 5.76 0c2.2-1.48 3.15-1.17 3.15-1.17.63 1.58.24 2.74.12 3.03.73.8 1.16 1.82 1.16 3.07 0 4.39-2.66 5.34-5.2 5.62.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.78.55a11.36 11.36 0 0 0 7.76-10.78C23.34 5.58 18.27.5 12 .5Z" />
              </svg>
            </a>
            <a href="mailto:hello@skillzy.com" aria-label="Email" className="hover:text-brand-gold transition-colors">
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
