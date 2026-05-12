'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Logo from './Logo'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const router = useRouter()

  // The homepage doesn't need a nav. Identity sits inside the page itself.
  if (pathname === '/') return null

  function onSearch(e: FormEvent) {
    e.preventDefault()
    const value = q.trim()
    router.push(value ? `/marketplace?q=${encodeURIComponent(value)}` : '/marketplace')
    setOpen(false)
  }

  return (
    <nav className="border-b border-brand-hairline bg-brand-cream/85 backdrop-blur supports-[backdrop-filter]:bg-brand-cream/70 sticky top-0 z-40">
      <div className="max-w-page mx-auto px-6 lg:px-10 h-16 flex items-center gap-8">
        <Logo size="md" />

        <form onSubmit={onSearch} className="hidden md:flex flex-1 max-w-md mx-auto">
          <div className="relative w-full">
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search the catalogue"
              aria-label="Search"
              className="w-full bg-transparent border-b border-brand-hairline focus:border-brand-emerald outline-none text-sm py-2 placeholder:text-brand-muted text-brand-ink transition-colors"
            />
          </div>
        </form>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/marketplace"
            className="text-sm text-brand-ink hover:text-brand-emerald transition-colors"
          >
            Marketplace
          </Link>
          <Link
            href="/sell"
            className="text-sm text-brand-ink hover:text-brand-emerald transition-colors"
          >
            Sell
          </Link>
          <Link
            href="/signin"
            className="text-sm text-brand-ink hover:text-brand-emerald transition-colors"
          >
            Sign in
          </Link>
        </div>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          className="ml-auto md:hidden p-2 -mr-2 text-brand-ink"
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M3 7h18M3 17h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-brand-hairline bg-brand-cream">
          <div className="max-w-page mx-auto px-6 py-5 flex flex-col gap-4">
            <form onSubmit={onSearch}>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search the catalogue"
                aria-label="Search"
                className="w-full bg-transparent border-b border-brand-hairline focus:border-brand-emerald outline-none text-base py-2 placeholder:text-brand-muted"
              />
            </form>
            <Link href="/marketplace" onClick={() => setOpen(false)} className="py-2">Marketplace</Link>
            <Link href="/sell" onClick={() => setOpen(false)} className="py-2">Sell</Link>
            <Link href="/signin" onClick={() => setOpen(false)} className="py-2">Sign in</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
