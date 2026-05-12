import Link from 'next/link'
import Logo from './Logo'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-brand-line bg-white">
      <div className="max-w-page mx-auto px-5 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex flex-col gap-3 max-w-sm">
            <Logo />
            <p className="text-sm text-brand-muted">
              Give your agent skills. A marketplace for skills, guides, and ready-to-go agent setups.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <Link href="/about" className="text-brand-ink hover:text-brand-purple transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-brand-ink hover:text-brand-purple transition-colors">
              Contact
            </Link>
            <Link href="/terms" className="text-brand-ink hover:text-brand-purple transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-brand-ink hover:text-brand-purple transition-colors">
              Privacy
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://x.com/skillzy"
              aria-label="Skillzy on X"
              className="text-brand-muted hover:text-brand-purple transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.91l-5.41-7.07L4.4 22H1.14l8.02-9.17L1 2h7.06l4.9 6.48L18.24 2Zm-1.22 18h1.84L7.07 4H5.1l11.92 16Z" />
              </svg>
            </a>
            <a
              href="https://github.com/skillzy"
              aria-label="Skillzy on GitHub"
              className="text-brand-muted hover:text-brand-purple transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 .5C5.73.5.66 5.58.66 11.86c0 5.02 3.25 9.27 7.76 10.78.57.11.78-.25.78-.55v-2.13c-3.16.69-3.83-1.36-3.83-1.36-.52-1.31-1.26-1.66-1.26-1.66-1.03-.71.08-.69.08-.69 1.14.08 1.74 1.18 1.74 1.18 1.01 1.74 2.66 1.24 3.31.95.1-.74.4-1.24.72-1.53-2.52-.29-5.17-1.27-5.17-5.64 0-1.25.44-2.27 1.17-3.07-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.16 1.17a10.9 10.9 0 0 1 5.76 0c2.2-1.48 3.15-1.17 3.15-1.17.63 1.58.24 2.74.12 3.03.73.8 1.16 1.82 1.16 3.07 0 4.39-2.66 5.34-5.2 5.62.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.78.55a11.36 11.36 0 0 0 7.76-10.78C23.34 5.58 18.27.5 12 .5Z" />
              </svg>
            </a>
            <a
              href="mailto:hello@skillzy.com"
              aria-label="Email Skillzy"
              className="text-brand-muted hover:text-brand-purple transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-brand-line text-xs text-brand-muted">
          © {year} Skillzy. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
