'use client'

import Link from 'next/link'
import { useState } from 'react'
import Logo from './Logo'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo variant="light" />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/how-it-works" className="text-gray-600 hover:text-[#2563EB] transition-colors font-medium">
              How It Works
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-[#2563EB] transition-colors font-medium">
              Pricing
            </Link>
            <Link href="/#examples" className="text-gray-600 hover:text-[#2563EB] transition-colors font-medium">
              Examples
            </Link>
            <Link
              href="/submit"
              className="bg-[#2563EB] text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
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

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              <Link href="/how-it-works" className="text-gray-600 hover:text-[#2563EB] font-medium px-2" onClick={() => setMobileOpen(false)}>
                How It Works
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-[#2563EB] font-medium px-2" onClick={() => setMobileOpen(false)}>
                Pricing
              </Link>
              <Link href="/#examples" className="text-gray-600 hover:text-[#2563EB] font-medium px-2" onClick={() => setMobileOpen(false)}>
                Examples
              </Link>
              <Link
                href="/submit"
                className="bg-[#2563EB] text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
