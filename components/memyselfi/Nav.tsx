'use client'

import Link from 'next/link'
import { useState } from 'react'
import Wordmark from './Wordmark'

const links = [
  { href: '/memyselfi/how-it-works', label: 'How it works' },
  { href: '/memyselfi/pricing', label: 'Pricing' },
  { href: '/memyselfi/manifesto', label: 'Manifesto' },
  { href: '/memyselfi/maya', label: 'See one live' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur"
      style={{
        borderColor: 'var(--mmi-line)',
        backgroundColor: 'rgba(8, 7, 15, 0.72)',
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center gap-8">
        <Wordmark />

        <nav className="hidden md:flex items-center gap-7 ml-auto">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm transition-colors"
              style={{ color: 'var(--mmi-muted)' }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/memyselfi/create"
            className="text-sm font-semibold rounded-full px-4 py-2 transition-transform hover:scale-[1.03]"
            style={{ backgroundColor: 'var(--mmi-accent)', color: '#0b0a14' }}
          >
            Make mine
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          className="ml-auto md:hidden p-2 -mr-2"
          style={{ color: 'var(--mmi-text)' }}
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M3 7h18M3 17h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <div
          className="md:hidden border-t"
          style={{ borderColor: 'var(--mmi-line)', backgroundColor: 'var(--mmi-bg)' }}
        >
          <div className="max-w-6xl mx-auto px-5 py-5 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-[15px]"
                style={{ color: 'var(--mmi-text)' }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/memyselfi/create"
              onClick={() => setOpen(false)}
              className="mt-2 text-center text-sm font-semibold rounded-full px-4 py-3"
              style={{ backgroundColor: 'var(--mmi-accent)', color: '#0b0a14' }}
            >
              Make mine
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
