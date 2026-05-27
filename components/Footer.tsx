import Link from 'next/link'
import Logo from './Logo'
import NewsletterForm from './NewsletterForm'
import { BRAND, MARKETPLACE_URL } from '@/lib/brand'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-brand-hairline">
      <div className="max-w-page mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Logo size="md" />
            <p className="mt-5 text-sm text-brand-muted max-w-sm leading-relaxed">
              Build the AI agent that does the work — for your business, on the
              tools you already use. No code.
            </p>

            <div className="mt-8 max-w-sm">
              <p className="label-cap text-brand-gold mb-2">The dispatch</p>
              <p className="text-xs text-brand-muted leading-relaxed">
                What agents can do now, build notes, the occasional release.
                Every other Friday.
              </p>
              <NewsletterForm />
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="label-cap text-brand-gold mb-4">{BRAND.name}</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/contact" className="hover:text-brand-gold transition-colors">Build my agent</Link></li>
              <li><Link href="/about" className="hover:text-brand-gold transition-colors">About</Link></li>
              <li><Link href="/help" className="hover:text-brand-gold transition-colors">Help</Link></li>
              <li><Link href="/contact" className="hover:text-brand-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="label-cap text-brand-gold mb-4">Skills</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={MARKETPLACE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">
                  Skillzy marketplace ↗
                </a>
              </li>
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
            © {year} {BRAND.name} &nbsp;·&nbsp; Set in Fraunces &amp; Inter
          </p>
          <div className="flex items-center gap-5 text-brand-muted">
            <a href={BRAND.x} aria-label="X" className="hover:text-brand-gold transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.91l-5.41-7.07L4.4 22H1.14l8.02-9.17L1 2h7.06l4.9 6.48L18.24 2Zm-1.22 18h1.84L7.07 4H5.1l11.92 16Z" />
              </svg>
            </a>
            <a href={`mailto:${BRAND.email}`} aria-label="Email" className="hover:text-brand-gold transition-colors">
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
