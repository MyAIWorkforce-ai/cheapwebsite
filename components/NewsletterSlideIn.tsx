'use client'

import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { subscribeToNewsletter, type NewsletterState } from '@/app/_actions/newsletter'

const initial: NewsletterState = {}
const COOKIE = 'skz_dispatch_dismissed'

function hasCookie() {
  if (typeof document === 'undefined') return false
  return document.cookie.split('; ').some((c) => c.startsWith(`${COOKIE}=`))
}
function setDismissed() {
  const d = new Date()
  d.setDate(d.getDate() + 30)
  document.cookie = `${COOKIE}=1; expires=${d.toUTCString()}; path=/; samesite=lax`
}

function Submit() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-ink border-b border-brand-ink pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors disabled:opacity-50"
    >
      {pending ? 'Adding…' : 'Subscribe →'}
    </button>
  )
}

// Slides in once the visitor passes ~60% of the page. Dismissible;
// dismissal sets a 30-day cookie. Never shows on dashboard/auth/
// checkout (caller controls mount), and respects reduced motion via
// a simple transition.
export default function NewsletterSlideIn() {
  const [visible, setVisible] = useState(false)
  const [closed, setClosed] = useState(false)
  const [state, action] = useFormState(subscribeToNewsletter, initial)

  useEffect(() => {
    if (hasCookie()) return
    const onScroll = () => {
      const scrolled =
        window.scrollY + window.innerHeight
      const ratio = scrolled / document.documentElement.scrollHeight
      if (ratio >= 0.6) {
        setVisible(true)
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (closed || hasCookie()) return null

  function dismiss() {
    setDismissed()
    setClosed(true)
  }

  return (
    <div
      aria-hidden={!visible}
      className={
        'fixed bottom-4 right-4 z-50 w-[min(92vw,360px)] border border-brand-ink bg-brand-cream-card shadow-xl transition-all duration-500 ' +
        (visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0 pointer-events-none')
      }
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="label-cap text-brand-gold">The dispatch</p>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="text-brand-muted hover:text-brand-ink leading-none text-lg -mt-1"
          >
            ×
          </button>
        </div>
        {state.ok ? (
          <p className="mt-2 text-sm text-brand-gold-dark">
            ✿ You&rsquo;re in. First dispatch soon.
          </p>
        ) : (
          <>
            <p className="mt-2 text-sm text-brand-muted">
              New listings, creator interviews, the occasional discount. Every
              other Friday.
            </p>
            <form action={action} className="mt-3">
              <input type="hidden" name="source" value="slidein" />
              <div className="flex items-baseline gap-3 border-b border-brand-hairline pb-2">
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="flex-1 bg-transparent outline-none text-sm py-1 placeholder:text-brand-muted/60"
                />
                <Submit />
              </div>
              {state.error && (
                <p className="mt-2 text-xs text-red-700">{state.error}</p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  )
}
