import type { Metadata } from 'next'
import Nav from '@/components/memyselfi/Nav'
import SiteFooter from '@/components/memyselfi/SiteFooter'

export const metadata: Metadata = {
  metadataBase: new URL('https://memyselfi.ai'),
  title: {
    default: 'memyselfi.ai — An AI that is you',
    template: '%s · memyselfi.ai',
  },
  description:
    'memyselfi.ai turns who you are — your story, your voice, your way of thinking — into an AI people can talk to at a link you own. Always you. Always on.',
  applicationName: 'memyselfi.ai',
  keywords: [
    'personal AI',
    'AI twin',
    'digital twin',
    'AI clone',
    'AI persona',
    'chat with me AI',
    'AI version of yourself',
  ],
  alternates: { canonical: '/memyselfi' },
  openGraph: {
    title: 'memyselfi.ai — An AI that is you',
    description:
      'Turn who you are into an AI people can talk to. At a link you own.',
    url: 'https://memyselfi.ai',
    siteName: 'memyselfi.ai',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'memyselfi.ai — An AI that is you',
    description: 'Turn who you are into an AI people can talk to.',
  },
}

export default function MemyselfiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mmi-root min-h-screen flex flex-col font-sans">
      <Nav />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  )
}
