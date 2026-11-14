'use client'

import { useEffect, useRef } from 'react'
import { track } from '@/lib/analytics'

// Runs once when the "you're listed" page loads:
//  - clears the saved listing draft (publish succeeded, so the next
//    listing should start clean)
//  - scrolls to the top (the redirect was landing mid/bottom of page)
//  - fires the GA4 + Google Ads "listing_published" conversion event
//    (no-op unless NEXT_PUBLIC_ADS_LABEL_LISTING_PUBLISHED is set)
export default function DoneInit({ listingId }: { listingId?: string }) {
  const fired = useRef(false)
  useEffect(() => {
    if (fired.current) return
    fired.current = true
    try {
      localStorage.removeItem('skz_listing_draft_v1')
    } catch {
      /* storage blocked — non-fatal */
    }
    window.scrollTo(0, 0)
    track.listingPublished(listingId)
  }, [listingId])
  return null
}
