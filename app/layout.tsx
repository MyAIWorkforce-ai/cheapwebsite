import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Skillzy — Give your agent skills',
  description:
    'Browse thousands of skills, guides, and ready-to-go agent setups for Claude, OpenClaw, n8n and more. Drop them in. Done.',
  keywords:
    'AI agent skills, Claude skills, OpenClaw, n8n, agent setups, SKILL.md, AI marketplace',
  openGraph: {
    title: 'Skillzy — Give your agent skills',
    description:
      'Browse thousands of skills, guides, and ready-to-go agent setups. Drop them in. Done.',
    url: 'https://skillzy.com',
    siteName: 'Skillzy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skillzy — Give your agent skills',
    description:
      'Browse thousands of skills, guides, and ready-to-go agent setups. Drop them in. Done.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
