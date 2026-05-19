import Link from 'next/link'
import Wordmark from './Wordmark'

export default function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t" style={{ borderColor: 'var(--mmi-line)' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
          <div className="col-span-2 md:col-span-5">
            <Wordmark size="lg" />
            <p
              className="mt-4 text-sm leading-relaxed max-w-xs"
              style={{ color: 'var(--mmi-muted)' }}
            >
              An AI that is you. Your story, your voice, your way of thinking —
              at a link you own.
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] mb-4" style={{ color: 'var(--mmi-muted)' }}>
              Product
            </p>
            <ul className="space-y-2.5 text-sm" style={{ color: 'var(--mmi-text)' }}>
              <li><Link href="/memyselfi/how-it-works">How it works</Link></li>
              <li><Link href="/memyselfi/pricing">Pricing</Link></li>
              <li><Link href="/memyselfi/create">Make yours</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] mb-4" style={{ color: 'var(--mmi-muted)' }}>
              Live twins
            </p>
            <ul className="space-y-2.5 text-sm" style={{ color: 'var(--mmi-text)' }}>
              <li><Link href="/memyselfi/maya">Maya · founder</Link></li>
              <li><Link href="/memyselfi/theo">Theo · coach</Link></li>
              <li><Link href="/memyselfi/nan">Nan · family</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] mb-4" style={{ color: 'var(--mmi-muted)' }}>
              Company
            </p>
            <ul className="space-y-2.5 text-sm" style={{ color: 'var(--mmi-text)' }}>
              <li><Link href="/memyselfi/manifesto">Manifesto</Link></li>
              <li><a href="mailto:hello@memyselfi.ai">hello@memyselfi.ai</a></li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-6 border-t flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
          style={{ borderColor: 'var(--mmi-line)', color: 'var(--mmi-muted)' }}
        >
          <p>© {year} memyselfi.ai · A separate venture, built in parallel.</p>
          <p>Your twin says only what you taught it.</p>
        </div>
      </div>
    </footer>
  )
}
