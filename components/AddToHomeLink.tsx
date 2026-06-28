'use client'

import { useEffect, useState } from 'react'
import { resetInstallPromptDismissal } from './AddToHomeScreenPrompt'

// "Add Skillzy to your phone" rescue link rendered in the dashboard
// alongside Account settings / Payouts / Help. Self-hides on desktop
// and inside the already-installed PWA — it would just be noise
// otherwise. Tapping it clears the banner-dismissed flag and reloads,
// so the install prompt re-appears at the top of the dashboard.
export default function AddToHomeLink() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const ua = navigator.userAgent || ''
    const isMobile = /iPhone|iPad|iPod|Android/i.test(ua)
    if (!isMobile) return
    const nav = window.navigator as Navigator & { standalone?: boolean }
    const installed =
      nav.standalone === true ||
      window.matchMedia('(display-mode: standalone)').matches
    if (installed) return
    setShow(true)
  }, [])

  if (!show) return null

  return (
    <button
      type="button"
      onClick={() => resetInstallPromptDismissal()}
      className="text-brand-muted hover:text-brand-ink transition-colors text-left"
    >
      Add to phone
    </button>
  )
}
