'use client'

import { usePathname } from 'next/navigation'

// Skillzy and memyselfi.ai are separate businesses sharing one Next.js app.
// memyselfi.ai owns its own chrome, so the shared Skillzy nav/footer must
// never bleed into any /memyselfi route.
export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname === '/memyselfi' || pathname.startsWith('/memyselfi/')) {
    return null
  }
  return <>{children}</>
}
