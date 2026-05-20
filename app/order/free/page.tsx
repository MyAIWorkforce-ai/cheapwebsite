import Link from 'next/link'
import { resolveProduct } from '@/lib/listings'
import { listingFiles } from '@/lib/delivery'
import { freeTokenValid } from '@/lib/delivery-token'

export const metadata = {
  title: 'Your free download',
  description: 'Your free Skillzy download.',
  robots: { index: false, follow: false },
}

export default async function FreeDownloadPage({
  searchParams,
}: {
  searchParams: { listing?: string; email?: string; t?: string }
}) {
  const listingId = searchParams.listing ?? ''
  const email = searchParams.email ?? ''
  const authorized =
    !!listingId &&
    !!email &&
    freeTokenValid(listingId, email, searchParams.t)

  const p = authorized ? await resolveProduct(listingId) : undefined
  const files = authorized && p ? await listingFiles(listingId) : []

  return (
    <div className="paper">
      <section className="px-6 lg:px-10 pt-16 sm:pt-24 pb-20 sm:pb-28">
        <div className="max-w-page mx-auto">
          <span
            className="inline-block font-mono text-[11px] uppercase tracking-[0.18em] px-3 py-1.5 bg-brand-gold text-brand-ink"
            style={{ transform: 'rotate(-2.5deg)' }}
          >
            Free ✿ Yours.
          </span>

          <h1
            className="font-display mt-7 text-[3.5rem] sm:text-[6.5rem] lg:text-[8rem] leading-[0.9] tracking-tight"
            style={{ letterSpacing: '-0.035em' }}
          >
            All <em className="italic text-brand-gold font-medium">yours.</em>
          </h1>

          {!authorized ? (
            <p className="mt-8 text-lg text-brand-muted max-w-2xl leading-relaxed">
              For your security, open the download link from the email we
              sent you — this page only reveals files through that secure
              link. Can’t find it? Write to{' '}
              <a
                href="mailto:hi@skillzy.ai"
                className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold"
              >
                hi@skillzy.ai
              </a>
              .
            </p>
          ) : (
            <>
              <p className="mt-8 text-xl text-brand-ink max-w-2xl">
                {p?.title ?? 'Your download'} — no charge, no account
                needed.
              </p>
              <div className="mt-12 bg-brand-cream-card border border-brand-ink p-7 sm:p-9 max-w-3xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted mb-4">
                  Download now
                </p>
                {files.length > 0 ? (
                  <ul className="space-y-3">
                    {files.map((f, i) => (
                      <li
                        key={f.name}
                        className={`flex items-center justify-between gap-4 ${
                          i < files.length - 1
                            ? 'border-b border-brand-hairline pb-3'
                            : ''
                        }`}
                      >
                        <span className="font-mono text-sm break-all">
                          {f.name}
                        </span>
                        <a
                          href={f.url}
                          className="font-mono text-[11px] uppercase tracking-[0.18em] border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold pb-0.5 whitespace-nowrap"
                        >
                          ↓ Download
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-brand-muted leading-relaxed">
                    Your files are being prepared — check back shortly, or
                    write to{' '}
                    <a
                      href="mailto:hi@skillzy.ai"
                      className="border-b border-brand-ink hover:text-brand-gold hover:border-brand-gold"
                    >
                      hi@skillzy.ai
                    </a>
                    .
                  </p>
                )}
              </div>
            </>
          )}

          <div className="mt-12">
            <Link
              href="/marketplace"
              className="text-sm border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
            >
              Browse the marketplace
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
