import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'
import ScrollToTopOnRouteChange from '@/components/ScrollToTopOnRouteChange'
import { organizationLd, websiteLd } from '@/lib/jsonld'

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

// Site-wide defaults only. Each route sets its OWN title, description,
// and self-referencing canonical via lib/seo.ts → pageMetadata().
// No catch-all canonical here — that was the duplicate-content bug.
export const metadata: Metadata = {
  metadataBase: new URL('https://skillzy.ai'),
  title: 'Skillzy — Global marketplace for Claude Skills, MCP servers, agent setups, prompt packs, guides & loops. Drop-in, not DIY.',
  description:
    'Global marketplace for pre-built Claude Skills, MCP servers, AI agent setups, prompt packs, guides, and scheduled loops. Built by creators worldwide for Claude, Cursor, Windsurf, ChatGPT, n8n and more. Drop-in for developers, tradies, real estate, bookkeepers, and 20+ trades.',
  authors: [{ name: 'Skillzy' }],
  creator: 'Skillzy',
  publisher: 'Skillzy',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // PWA / iOS install metadata. Manifest auto-served from app/manifest.ts.
  // appleWebApp lets iOS Safari treat "Add to Home Screen" as a standalone
  // app (no Safari chrome) with a black-translucent status bar that blends
  // into the brand navy.
  appleWebApp: {
    capable: true,
    title: 'Skillzy',
    statusBarStyle: 'black-translucent',
  },
  applicationName: 'Skillzy',
  formatDetection: {
    telephone: false,
  },
}

// Status bar + safe-area + responsive defaults. Separate export per
// Next.js 14 convention.
export const viewport: Viewport = {
  themeColor: '#0F1729',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans">
        <StructuredData data={[organizationLd(), websiteLd()]} />
        <ScrollToTopOnRouteChange />
        <Navbar />
        <main>{children}</main>
        <Footer />
        {/* The Dispatch slide-in is paused until we have ~50 creators.
            Component kept in repo — re-add <NewsletterSlideIn /> here to revive. */}
      </body>
    </html>
  )
}
