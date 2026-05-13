import Link from 'next/link'
import { getProduct } from '@/lib/catalog'

export const metadata = {
  title: 'Plugged in',
  description: 'Your Skillzy purchase is ready to drop into your agent.',
  robots: { index: false, follow: false },
}

function Sticker({
  children,
  rotate = '-3deg',
}: {
  children: React.ReactNode
  rotate?: string
}) {
  return (
    <span
      className="inline-block font-mono text-[11px] uppercase tracking-[0.18em] px-3 py-1.5 bg-brand-gold text-brand-ink"
      style={{ transform: `rotate(${rotate})` }}
    >
      {children}
    </span>
  )
}

export default function OrderSuccessPage({
  searchParams,
}: {
  searchParams: { id?: string; email?: string }
}) {
  const p = searchParams.id ? getProduct(searchParams.id) : undefined
  const orderId = (Math.random().toString(36).slice(2, 6) + Date.now().toString(36).slice(-4)).toUpperCase()
  const email = searchParams.email || 'you@example.com'

  return (
    <div className="paper">
      <section className="px-6 lg:px-10 pt-16 sm:pt-24 pb-20 sm:pb-28">
        <div className="max-w-page mx-auto">
          <Sticker rotate="-2.5deg">Plugged in ✿ Done.</Sticker>

          <h1
            className="font-display mt-7 text-[3.5rem] sm:text-[6.5rem] lg:text-[8rem] leading-[0.9] tracking-tight"
            style={{ letterSpacing: '-0.035em' }}
          >
            That was{' '}
            <em className="italic text-brand-gold font-medium">easy.</em>
          </h1>

          <p className="mt-8 text-xl text-brand-ink max-w-2xl">
            Your bundle is on its way to{' '}
            <span className="font-semibold">{email}</span>. It’ll also live on
            your dashboard, re-downloadable forever.
          </p>

          {p && (
            <div className="mt-12 bg-brand-cream-card border border-brand-ink p-7 sm:p-9 max-w-3xl">
              <div className="flex items-start justify-between gap-6 flex-wrap">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                    {p.type} · {p.platformList.join(' · ')}
                  </p>
                  <p
                    className="font-display mt-3 text-3xl sm:text-4xl tracking-tight leading-tight"
                    style={{ letterSpacing: '-0.025em' }}
                  >
                    {p.title}
                  </p>
                  <p className="mt-2 text-sm text-brand-muted">
                    by {p.creator.name}
                  </p>
                </div>
                <span
                  className="font-display text-3xl text-brand-gold"
                  style={{ letterSpacing: '-0.025em' }}
                >
                  {p.price}
                </span>
              </div>

              <div className="mt-7 pt-6 border-t border-brand-hairline">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted mb-4">
                  Download now
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between gap-4 border-b border-brand-hairline pb-3">
                    <span className="font-mono text-sm">
                      {p.id}.bundle.zip
                    </span>
                    <a
                      href="#"
                      className="font-mono text-[11px] uppercase tracking-[0.18em] border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
                    >
                      ↓ Download
                    </a>
                  </li>
                  <li className="flex items-center justify-between gap-4 border-b border-brand-hairline pb-3">
                    <span className="font-mono text-sm">setup-guide.pdf</span>
                    <a
                      href="#"
                      className="font-mono text-[11px] uppercase tracking-[0.18em] border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
                    >
                      ↓ Download
                    </a>
                  </li>
                  <li className="flex items-center justify-between gap-4">
                    <span className="font-mono text-sm">receipt.pdf</span>
                    <a
                      href="#"
                      className="font-mono text-[11px] uppercase tracking-[0.18em] border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5"
                    >
                      ↓ Download
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-px bg-brand-hairline border border-brand-hairline max-w-2xl">
            <div className="bg-brand-cream-card p-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                Order
              </span>
              <p
                className="font-display text-2xl mt-2"
                style={{ letterSpacing: '-0.02em' }}
              >
                №{orderId}
              </p>
            </div>
            <div className="bg-brand-cream-card p-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                Sent to
              </span>
              <p
                className="font-display text-lg mt-2 break-all"
                style={{ letterSpacing: '-0.02em' }}
              >
                {email}
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-3 sm:gap-4 items-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-ink font-semibold px-7 py-4 text-[15px] hover:bg-brand-gold-dark transition-colors"
            >
              Go to my dashboard
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/marketplace"
              className="text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
            >
              Browse more
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
