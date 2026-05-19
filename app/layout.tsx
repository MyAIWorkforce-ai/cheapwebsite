import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ChromeGate from '@/components/ChromeGate'

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

export const metadata: Metadata = {
  metadataBase: new URL('https://skillzy.ai'),
  title: {
    default: 'Skillzy — Drop it in. Agent supercharged.',
    template: '%s — Skillzy',
  },
  description:
    'A marketplace for skills, guides, and ready-to-go agent setups. Built by creators. Plug them into any agent — yours levels up instantly.',
  keywords: [
    'AI agent marketplace',
    'agent skills',
    'agent setups',
    'Claude skills',
    'OpenClaw',
    'n8n',
    'AI prompts',
    'SKILL.md',
    'sell AI skills',
    'creator marketplace',
  ],
  authors: [{ name: 'Skillzy' }],
  creator: 'Skillzy',
  publisher: 'Skillzy',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Skillzy — Drop it in. Agent supercharged.',
    description:
      'A marketplace for skills, guides, and ready-to-go agent setups. Built by creators.',
    url: 'https://skillzy.ai',
    siteName: 'Skillzy',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skillzy — Drop it in. Agent supercharged.',
    description:
      'A marketplace for skills, guides, and ready-to-go agent setups.',
  },
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
        <ChromeGate>
          <Navbar />
        </ChromeGate>
        <main>{children}</main>
        <ChromeGate>
          <Footer />
        </ChromeGate>
      </body>
    </html>
  )
}
