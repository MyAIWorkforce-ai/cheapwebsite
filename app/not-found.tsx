import Link from 'next/link'

export const metadata = {
  title: 'Unplugged — Skillzy',
}

export default function NotFound() {
  return (
    <div className="paper">
      <section className="px-6 lg:px-10 pt-20 sm:pt-32 pb-24 sm:pb-32">
        <div className="max-w-page mx-auto">
          <span
            className="inline-block font-mono text-[11px] uppercase tracking-[0.18em] px-3 py-1.5 bg-brand-mustard text-brand-ink"
            style={{ transform: 'rotate(-3deg)' }}
          >
            404 · Unplugged
          </span>

          <h1
            className="font-display mt-8 text-[4rem] sm:text-[9rem] lg:text-[12rem] leading-[0.88] tracking-tight text-brand-ink"
            style={{ letterSpacing: '-0.035em' }}
          >
            <span className="block">Nothing</span>
            <span className="block">
              <em className="italic text-brand-emerald font-medium">to plug in.</em>
            </span>
          </h1>

          <p className="mt-10 text-xl text-brand-ink max-w-xl">
            This page doesn’t exist. It might never have. Either way — back to
            the goods.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 bg-brand-emerald text-brand-cream font-medium px-7 py-4 text-[15px] hover:bg-brand-emerald-deep transition-colors"
            >
              Back to the marketplace
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/"
              className="text-sm text-brand-ink hover:text-brand-emerald transition-colors border-b border-brand-ink hover:border-brand-emerald pb-0.5"
            >
              Or back to the start
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
