import Link from 'next/link'
import DownloadList from './DownloadList'

export const metadata = {
  title: 'Download',
  robots: { index: false, follow: false },
}

export default function DownloadPage({
  params,
}: {
  params: { purchaseId: string }
}) {
  return (
    <div className="paper">
      <div className="max-w-page mx-auto px-6 lg:px-10 pt-8 sm:pt-10">
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted"
        >
          <Link href="/dashboard?view=buying" className="hover:text-brand-gold transition-colors">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brand-ink">Download</span>
        </nav>
      </div>

      <section className="px-6 lg:px-10 pt-10 sm:pt-14 pb-20">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            Re-download
          </span>
          <h1
            className="font-display mt-5 text-5xl sm:text-7xl tracking-tight leading-[0.95]"
            style={{ letterSpacing: '-0.03em' }}
          >
            Your{' '}
            <em className="italic text-brand-gold font-medium">bundle.</em>
          </h1>
          <p className="mt-5 text-brand-muted">
            Links below are signed and expire in an hour. Refresh the page
            to issue fresh links any time.
          </p>
        </div>

        <div className="mt-10 max-w-2xl">
          <DownloadList purchaseId={params.purchaseId} />
        </div>
      </section>
    </div>
  )
}
