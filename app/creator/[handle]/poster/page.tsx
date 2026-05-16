import Link from 'next/link'
import { getCreatorByHandle } from '@/lib/catalog'
import { SITE_URL } from '@/lib/seo'

export const metadata = {
  title: 'Printable poster',
  robots: { index: false, follow: false },
}

// A print-optimised one-pager: big QR + headline a creator can stick
// on the van, shopfront, A-frame, or hand out as a flyer. Cmd/Ctrl-P
// gives a clean sheet (print CSS in globals.css isolates .print-poster).
export default function PosterPage({
  params,
}: {
  params: { handle: string }
}) {
  const handle = params.handle.replace(/^@/, '')
  const creator = getCreatorByHandle(handle) || getCreatorByHandle(`@${handle}`)
  const name = creator?.name ?? `@${handle}`
  const profileUrl = `${SITE_URL}/creator/${handle}`
  const qrSrc = `/creator/${handle}/qr?ref=${encodeURIComponent(handle)}`

  return (
    <div className="paper">
      <div className="max-w-page mx-auto px-6 lg:px-10 pt-8 sm:pt-10 no-print">
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted"
        >
          <Link href="/dashboard?view=selling" className="hover:text-brand-gold transition-colors">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brand-ink">Poster</span>
        </nav>
        <p className="mt-6 text-sm text-brand-muted">
          Press <kbd className="font-mono">⌘/Ctrl + P</kbd> to print or save as
          PDF. Everything but the poster is hidden on print.
        </p>
      </div>

      {/* The printable sheet */}
      <div className="print-poster px-6 py-16 sm:py-24">
        <div className="max-w-xl mx-auto text-center border border-brand-ink p-10 sm:p-14 bg-white">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
            On Skillzy
          </p>
          <h1
            className="font-display mt-5 text-4xl sm:text-6xl tracking-tight leading-[1]"
            style={{ letterSpacing: '-0.03em' }}
          >
            {name}&rsquo;s{' '}
            <em className="italic text-brand-gold font-medium">agent skills.</em>
          </h1>
          <p className="mt-4 text-brand-muted">
            Drop-in AI agent skills, setups &amp; guides. No setup tutorials —
            paste and go.
          </p>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrSrc}
            alt={`Scan to see ${name}'s listings on Skillzy`}
            width={280}
            height={280}
            className="mx-auto mt-8 border border-brand-hairline bg-white p-3"
          />

          <p className="mt-6 font-mono text-sm tracking-tight">
            {profileUrl.replace('https://', '')}
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight" style={{ letterSpacing: '-0.02em' }}>
            Scan it. Drop it in. Done.
          </p>
        </div>
      </div>

      <div className="max-w-page mx-auto px-6 lg:px-10 pb-16 no-print">
        <Link
          href="/dashboard?view=selling"
          className="text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
        >
          ← Back to dashboard
        </Link>
      </div>
    </div>
  )
}
