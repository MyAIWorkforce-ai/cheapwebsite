'use client'

import Link from 'next/link'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Logo from './Logo'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()

  function handleSearch(e: FormEvent) {
    e.preventDefault()
    const q = query.trim()
    router.push(q ? `/marketplace?q=${encodeURIComponent(q)}` : '/marketplace')
    setMobileOpen(false)
  }

  return (
    <nav className="bg-white border-b border-brand-line sticky top-0 z-50">
      <div className="max-w-page mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 h-16">
          <Logo />

          {/* Search — middle, desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-auto">
            <div className="relative w-full">
              <svg
                aria-hidden
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
                />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search skills, guides, agent setups…"
                aria-label="Search the marketplace"
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-brand-line bg-white text-sm text-brand-ink placeholder:text-brand-muted focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
              />
            </div>
          </form>

          {/* Right actions — desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/signin"
              className="text-sm font-semibold text-brand-ink hover:text-brand-purple transition-colors px-3 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/sell"
              className="bg-brand-yellow text-brand-ink text-sm font-bold px-5 py-2.5 rounded-full hover:bg-brand-yellow-dark transition-colors"
            >
              Sell Your Skills
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="md:hidden ml-auto p-2 rounded-lg text-brand-ink hover:bg-slate-100"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile panel */}
        {mobileOpen && (
          <div className="md:hidden pb-5 pt-2 border-t border-brand-line">
            <form onSubmit={handleSearch} className="mb-4">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search skills, guides, agent setups…"
                aria-label="Search the marketplace"
                className="w-full px-4 py-2.5 rounded-full border border-brand-line text-base text-brand-ink placeholder:text-brand-muted focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
              />
            </form>
            <div className="flex flex-col gap-2">
              <Link
                href="/signin"
                className="text-base font-semibold text-brand-ink py-2"
                onClick={() => setMobileOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/sell"
                className="bg-brand-yellow text-brand-ink text-base font-bold px-5 py-3 rounded-full text-center"
                onClick={() => setMobileOpen(false)}
              >
                Sell Your Skills
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
