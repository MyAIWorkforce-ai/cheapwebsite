'use client'

import { useEffect, useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'

// Belt-and-braces scroll restoration: every time the route changes
// (a new page, or a server-action redirect), pin the window to the
// top and keep it there for a couple of seconds in case a late-
// rendering element (Stripe iframe, autofocused input) tries to drag
// the page back down. Bails the instant the user scrolls deliberately,
// so it never fights a real scroll gesture.
export default function ScrollToTopOnRouteChange() {
  const pathname = usePathname()

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    // Don't clobber a deep-link hash (#section).
    if (window.location.hash) return

    window.scrollTo(0, 0)

    let userScrolled = false
    const onUserScroll = () => {
      userScrolled = true
    }
    window.addEventListener('wheel', onUserScroll, { passive: true })
    window.addEventListener('touchmove', onUserScroll, { passive: true })
    window.addEventListener('keydown', onUserScroll)

    const pin = () => {
      if (userScrolled) return
      if (window.scrollY > 0) window.scrollTo(0, 0)
    }
    const timers = [50, 150, 400, 900, 1800].map((ms) =>
      window.setTimeout(pin, ms),
    )

    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('wheel', onUserScroll)
      window.removeEventListener('touchmove', onUserScroll)
      window.removeEventListener('keydown', onUserScroll)
    }
  }, [pathname])

  return null
}
