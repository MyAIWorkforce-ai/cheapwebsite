'use client'

import { useState } from 'react'
import { disconnectStripe } from './actions'

/**
 * Unlinks the current Stripe account so the creator can connect a
 * different one. Two-tap confirm so it's not fired by accident — money
 * routing depends on it.
 */
export default function DisconnectButton() {
  const [confirming, setConfirming] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onConfirm() {
    setBusy(true)
    setError(null)
    const res = await disconnectStripe()
    if (res.error) {
      setError(res.error)
      setBusy(false)
      return
    }
    // Reload so the page re-reads profile state (now disconnected).
    window.location.href = '/dashboard/payouts'
  }

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="text-xs text-brand-muted hover:text-red-700 underline underline-offset-4 transition-colors"
      >
        Disconnect / change Stripe account
      </button>
    )
  }

  return (
    <div className="border border-red-300 bg-red-50 p-4">
      <p className="text-sm text-brand-ink">
        Disconnect this Stripe account? New sales stop paying out to it
        immediately. You&rsquo;ll need to connect a new account to keep
        selling. Your existing Stripe account isn&rsquo;t closed — just
        unlinked from Skillzy.
      </p>
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={onConfirm}
          disabled={busy}
          className="bg-red-700 text-white font-semibold px-4 py-2 text-sm hover:bg-red-800 transition-colors disabled:opacity-60"
        >
          {busy ? 'Disconnecting…' : 'Yes, disconnect'}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          disabled={busy}
          className="text-sm text-brand-muted hover:text-brand-ink"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
