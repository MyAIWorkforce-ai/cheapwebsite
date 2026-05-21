'use client'

import { useRouter } from 'next/navigation'

/**
 * Niche + platform dropdowns for /marketplace. Submitting either select
 * navigates to /marketplace with the chosen value as a search-param, so
 * the server component re-renders with the new filter applied.
 *
 * Native <select> renders as the iOS / Android picker on mobile — by
 * far the cleanest UX for "pick one from a long list" on a touch screen.
 */
export default function MarketplaceFilters({
  niches,
  platforms,
  niche,
  platform,
  type,
  q,
}: {
  niches: string[]
  platforms: string[]
  niche?: string
  platform?: string
  type?: string
  q?: string
}) {
  const router = useRouter()

  function go(nextNiche: string, nextPlatform: string) {
    const params = new URLSearchParams()
    if (type && type !== 'all') params.set('type', type)
    if (q) params.set('q', q)
    if (nextNiche) params.set('niche', nextNiche)
    if (nextPlatform) params.set('platform', nextPlatform)
    const qs = params.toString()
    router.push(qs ? `/marketplace?${qs}` : '/marketplace')
  }

  function slug(s: string) {
    return s.toLowerCase().replace(/\s+/g, '-')
  }

  const selectCls =
    'mt-1 w-full bg-brand-cream-card border border-brand-hairline px-3 py-3 text-base text-brand-ink focus:border-brand-gold outline-none appearance-none cursor-pointer'

  return (
    <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      <label className="block">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
          Niche
        </span>
        <div className="relative">
          <select
            value={niche ?? ''}
            onChange={(e) => go(e.target.value, platform ?? '')}
            className={selectCls}
            aria-label="Filter by niche"
          >
            <option value="">All niches</option>
            {niches.map((n) => (
              <option key={n} value={slug(n)}>
                {n}
              </option>
            ))}
          </select>
          <span aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted">▾</span>
        </div>
      </label>

      <label className="block">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
          Platform
        </span>
        <div className="relative">
          <select
            value={platform ?? ''}
            onChange={(e) => go(niche ?? '', e.target.value)}
            className={selectCls}
            aria-label="Filter by platform"
          >
            <option value="">All platforms</option>
            {platforms.map((pl) => (
              <option key={pl} value={pl.toLowerCase()}>
                {pl}
              </option>
            ))}
          </select>
          <span aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted">▾</span>
        </div>
      </label>
    </div>
  )
}
