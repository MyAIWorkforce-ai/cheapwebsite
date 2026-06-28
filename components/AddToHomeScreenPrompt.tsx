'use client'

import { useEffect, useState } from 'react'

// Exposed so the dashboard's "Add to phone" rescue link can clear the
// dismissed flag and bring the banner back even after a "Not now" tap.
// SSR-safe: stored under the same key the banner reads from.
const DISMISS_LOCALSTORAGE_KEY = 'skillzy:install-prompt-dismissed'
export function resetInstallPromptDismissal() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(DISMISS_LOCALSTORAGE_KEY)
  } catch {
    /* private mode / disabled storage — nothing to clear */
  }
  // Force any mounted prompt to re-evaluate by reloading the page; the
  // useEffect re-checks localStorage on next mount.
  window.location.reload()
}

// Chrome / Edge expose a non-standard event so the page can trigger the
// install prompt programmatically. iOS Safari doesn't — there we just
// show the manual instructions because Apple gates "Add to Home Screen"
// behind the share sheet.
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

type Platform = 'ios' | 'android' | 'other'

const DISMISS_KEY = DISMISS_LOCALSTORAGE_KEY

function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'other'
  const ua = navigator.userAgent || ''
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios'
  if (/Android/i.test(ua)) return 'android'
  return 'other'
}

function isStandalone(): boolean {
  if (typeof window === 'undefined') return false
  // iOS sets navigator.standalone; everyone else uses display-mode.
  const nav = window.navigator as Navigator & { standalone?: boolean }
  if (nav.standalone === true) return true
  return window.matchMedia('(display-mode: standalone)').matches
}

/**
 * Compact "Add Skillzy to your home screen" prompt rendered above the
 * dashboard on mobile. Self-suppresses if:
 *   - the user is on desktop (no real value)
 *   - the site is already installed (matchMedia / navigator.standalone)
 *   - the user previously dismissed it (localStorage flag)
 *
 * On Android Chrome / Edge the gold CTA fires the real install prompt
 * via the beforeinstallprompt event. On iOS Safari there's no API for
 * that, so the prompt shows the manual share-sheet steps instead.
 */
export default function AddToHomeScreenPrompt() {
  const [visible, setVisible] = useState(false)
  const [platform, setPlatform] = useState<Platform>('other')
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [showIosSteps, setShowIosSteps] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (isStandalone()) return
    const p = detectPlatform()
    if (p === 'other') return
    let dismissed = false
    try {
      dismissed = window.localStorage.getItem(DISMISS_KEY) === '1'
    } catch {
      /* private mode / disabled storage — show it anyway */
    }
    if (dismissed) return
    setPlatform(p)
    setVisible(true)

    if (p === 'android') {
      const handler = (e: Event) => {
        e.preventDefault()
        setInstallEvent(e as BeforeInstallPromptEvent)
      }
      window.addEventListener('beforeinstallprompt', handler)
      return () => window.removeEventListener('beforeinstallprompt', handler)
    }
    return
  }, [])

  function dismiss() {
    try {
      window.localStorage.setItem(DISMISS_KEY, '1')
    } catch {
      /* fine — at worst we re-show next visit */
    }
    setVisible(false)
  }

  async function install() {
    if (platform === 'ios') {
      setShowIosSteps(true)
      return
    }
    if (installEvent) {
      try {
        await installEvent.prompt()
        const choice = await installEvent.userChoice
        if (choice.outcome === 'accepted') {
          dismiss()
        }
      } catch {
        /* user cancelled or browser blocked — keep the prompt up */
      }
    }
  }

  if (!visible) return null

  return (
    <div className="mb-6 border border-brand-gold bg-brand-cream-card p-5 sm:p-6 flex items-start gap-4">
      <div className="flex-shrink-0">
        <img
          src="/icon-512.jpg"
          alt=""
          width={44}
          height={44}
          className="rounded-lg border border-brand-hairline"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
          Add to home screen
        </p>
        <p
          className="font-display mt-1 text-xl tracking-tight"
          style={{ letterSpacing: '-0.02em' }}
        >
          Skillzy on your home screen.
        </p>
        <p className="mt-2 text-sm text-brand-muted leading-snug">
          One tap to your dashboard, no browser bar, opens like an app.
        </p>

        {showIosSteps && platform === 'ios' && (
          <ol className="mt-4 text-sm text-brand-ink space-y-1.5 list-decimal list-inside">
            <li>
              Tap the <strong>Share</strong> icon at the bottom of Safari
              (square with an arrow).
            </li>
            <li>
              Scroll down and tap{' '}
              <strong>&ldquo;Add to Home Screen&rdquo;</strong>.
            </li>
            <li>
              Tap <strong>Add</strong> in the top right.
            </li>
          </ol>
        )}

        <div className="mt-4 flex flex-wrap gap-3 items-center">
          {!showIosSteps && (
            <button
              type="button"
              onClick={install}
              className="bg-brand-gold text-brand-ink font-semibold px-5 py-2.5 text-sm hover:bg-brand-gold-dark transition-colors"
            >
              {platform === 'ios' ? 'Show me how' : 'Add to home screen'}
            </button>
          )}
          <button
            type="button"
            onClick={dismiss}
            className="text-sm text-brand-muted underline underline-offset-4 hover:text-brand-ink"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  )
}
