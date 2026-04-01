import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CheapWebsite.com.au — Professional Website Refresh. Without the Agency Price Tag.',
  description: 'Submit your URL today — we\'ll modernise your site, fix broken links, update content and improve your SEO. Delivered in 48 hours. From $297.',
  keywords: 'website refresh, cheap website, website redesign, Australia, affordable web design',
  openGraph: {
    title: 'CheapWebsite.com.au — Professional Website Refresh',
    description: 'Modernise your website from $297. 48-hour delivery. No agency markup.',
    url: 'https://cheapwebsite.com.au',
    siteName: 'CheapWebsite.com.au',
    locale: 'en_AU',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-AU">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
