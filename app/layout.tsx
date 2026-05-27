import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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
  metadataBase: new URL('https://myaiworkforce.ai'),
  title: {
    default: 'My AI Workforce — Build the agent that does the work.',
    template: '%s — My AI Workforce',
  },
  description:
    'Tell us the job. We build you an AI agent that handles it — on the tools you already use, in the way you already work. No code.',
  keywords: [
    'build AI agent',
    'AI agent for business',
    'AI workforce',
    'custom AI agent',
    'AI automation',
    'Claude agent',
    'n8n agent',
    'no-code AI agent',
  ],
  authors: [{ name: 'My AI Workforce' }],
  creator: 'My AI Workforce',
  publisher: 'My AI Workforce',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'My AI Workforce — Build the agent that does the work.',
    description:
      'Tell us the job. We build you an AI agent that handles it — on the tools you already use. No code.',
    url: 'https://myaiworkforce.ai',
    siteName: 'My AI Workforce',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My AI Workforce — Build the agent that does the work.',
    description:
      'Tell us the job. We build you an AI agent that handles it. No code.',
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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
