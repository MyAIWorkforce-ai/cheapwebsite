import Link from 'next/link'

export const metadata = {
  title: 'Not found',
  robots: { index: false },
}

export default function MemyselfiNotFound() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-28 text-center">
      <span
        className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em]"
        style={{ color: 'var(--mmi-accent)' }}
      >
        404
      </span>
      <h1
        className="mt-5 font-display text-5xl sm:text-7xl"
        style={{ letterSpacing: '-0.03em', color: 'var(--mmi-text)' }}
      >
        There’s no one here.
      </h1>
      <p className="mt-5 text-lg" style={{ color: 'var(--mmi-muted)' }}>
        This page doesn’t exist — or the twin you’re after hasn’t been built
        yet.
      </p>
      <div className="mt-9 flex flex-wrap gap-4 justify-center">
        <Link
          href="/memyselfi"
          className="rounded-full px-6 py-3 text-sm font-semibold"
          style={{ backgroundColor: 'var(--mmi-accent)', color: '#0b0a14' }}
        >
          Back to memyselfi.ai
        </Link>
        <Link
          href="/memyselfi/create"
          className="rounded-full px-6 py-3 text-sm font-medium border"
          style={{ borderColor: 'var(--mmi-line)', color: 'var(--mmi-text)' }}
        >
          Build your twin
        </Link>
      </div>
    </div>
  )
}
