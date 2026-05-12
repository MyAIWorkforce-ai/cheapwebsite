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
  title: 'Skillzy — Give your agent skills',
  description:
    'A marketplace for skills, guides, and ready-to-go agent setups. Made by humans, dropped into your agent.',
  openGraph: {
    title: 'Skillzy — Give your agent skills',
    description:
      'A marketplace for skills, guides, and ready-to-go agent setups. Made by humans, dropped into your agent.',
    url: 'https://skillzy.com',
    siteName: 'Skillzy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skillzy — Give your agent skills',
    description:
      'A marketplace for skills, guides, and ready-to-go agent setups.',
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
