import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'
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
  title: 'Skillzy — AI agent skills, setups & guides. Drop-in, not DIY.',
  description:
    'Pre-built AI agent skills, full setups, and guides for Claude, n8n, OpenClaw, ChatGPT and more. Built for tradies, real estate, bookkeepers, and 20+ trades.',
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
        <Navbar />
        <main>{children}</main>
        <Footer />
        {/* The Dispatch slide-in is paused until we have ~50 creators.
            Component kept in repo — re-add <NewsletterSlideIn /> here to revive. */}
      </body>
    </html>
  )
}
