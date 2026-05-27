'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Logo from './Logo'
import { MARKETPLACE_URL } from '@/lib/brand'
import type { SessionUser } from '@/lib/auth'

export default function NavbarClient({ user }: { user: SessionUser | null }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isHome = pathname === '/'

  if (isHome) {
    return (
      <div className="absolute top-3 right-4 sm:top-5 sm:right-6 z-50">
        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="p-2 text-brand-ink/70 hover:text-brand-ink transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M3 7h18M3 17h18" />}
          </svg>
        </button>
        {open && (
          <div className="absolute right-0 mt-1 w-48 bg-brand-cream border border-brand-hairline shadow-lg flex flex-col py-1">
            <Link href="/contact" onClick={() => setOpen(false)} className="px-4 py-2.5 text-sm text-brand-ink hover:bg-brand-gold/15">Build my agent</Link>
            <a href={MARKETPLACE_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="px-4 py-2.5 text-sm text-brand-ink hover:bg-brand-gold/15">Marketplace ↗</a>
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="px-4 py-2.5 text-sm text-brand-ink hover:bg-brand-gold/15">Dashboard</Link>
                <form action="/auth/signout" method="POST">
                  <button type="submit" className="w-full text-left px-4 py-2.5 text-sm text-brand-muted hover:bg-brand-gold/15">Sign out</button>
                </form>
              </>
            ) : (
              <Link href="/signin" onClick={() => setOpen(false)} className="px-4 py-2.5 text-sm text-brand-ink hover:bg-brand-gold/15">Sign in</Link>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <nav className="border-b border-brand-hairline bg-brand-cream/85 backdrop-blur supports-[backdrop-filter]:bg-brand-cream/70 sticky top-0 z-40">
      <div className="max-w-page mx-auto px-6 lg:px-10 h-16 flex items-center gap-8">
        <Logo size="sm" />

        <div className="hidden md:flex items-center gap-6 ml-auto">
          <a
            href={MARKETPLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-brand-ink hover:text-brand-gold transition-colors"
          >
            Marketplace ↗
          </a>
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm text-brand-ink hover:text-brand-gold transition-colors">
                Dashboard
              </Link>
              <form action="/auth/signout" method="POST">
                <button
                  type="submit"
                  className="text-sm text-brand-muted hover:text-brand-gold transition-colors"
                  aria-label={`Sign out (${user.email})`}
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link href="/signin" className="text-sm text-brand-ink hover:text-brand-gold transition-colors">
              Sign in
            </Link>
          )}
          <Link
            href="/contact"
            className="bg-brand-gold text-brand-ink font-semibold text-sm px-5 py-2 hover:bg-brand-gold-dark transition-colors"
          >
            Build my agent
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
            <Link href="/contact" onClick={() => setOpen(false)} className="py-2 font-semibold">Build my agent</Link>
            <a href={MARKETPLACE_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="py-2">Marketplace ↗</a>
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="py-2">Dashboard</Link>
                <form action="/auth/signout" method="POST">
                  <button type="submit" className="py-2 text-brand-muted">Sign out</button>
                </form>
              </>
            ) : (
              <Link href="/signin" onClick={() => setOpen(false)} className="py-2">
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
