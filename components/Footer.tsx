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
              <li><Link href="/sell" className="hover:text-brand-gold transition-colors">Sell</Link></li>
              <li><Link href="/help" className="hover:text-brand-gold transition-colors">Help</Link></li>
              <li><Link href="/contact" className="hover:text-brand-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="label-cap text-brand-gold mb-4">Fine print</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/terms" className="hover:text-brand-gold transition-colors">Terms</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-gold transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-brand-hairline flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-brand-muted">
            © {year} Skillzy.ai
          </p>
          <div className="flex items-center gap-5 text-brand-muted">
            {/*
              TODO: re-enable when Skillzy social accounts exist.
              Need to register:
                - x.com/skillzyai      (or whatever the handle ends up)
                - github.com/skillzy   (org for open-source skill libs)
              Until then, only the support email is shown.
            */}
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
