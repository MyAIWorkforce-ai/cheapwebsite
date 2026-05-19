'use client'

import { useEffect } from 'react'

// Runs once when the "you're listed" page loads:
//  - clears the saved listing draft (publish succeeded, so the next
//    listing should start clean)
//  - scrolls to the top (the redirect was landing mid/bottom of page)
export default function DoneInit() {
  useEffect(() => {
    try {
      localStorage.removeItem('skz_listing_draft_v1')
    } catch {
      /* storage blocked — non-fatal */
    }
    window.scrollTo(0, 0)
  }, [])
  return null
}
