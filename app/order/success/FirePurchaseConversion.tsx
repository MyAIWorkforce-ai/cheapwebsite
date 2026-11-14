'use client'

import { useEffect, useRef } from 'react'
import { track } from '@/lib/analytics'

// Fires the GA4 purchase + Google Ads conversion event exactly once
// per order-success page load. Dedup guard prevents double-fire on
// React 18 strict-mode's intentional double-render in development.
// Only invoked when the server has verified the payment, so garbage
// visits to /order/success don't pollute the funnel.
export default function FirePurchaseConversion({
  productId,
  orderId,
  valueUsd,
}: {
  productId: string
  orderId: string
  valueUsd?: number
}) {
  const fired = useRef(false)
  useEffect(() => {
    if (fired.current) return
    fired.current = true
    track.checkoutCompleted(productId, {
      value: valueUsd,
      transactionId: orderId,
    })
  }, [productId, orderId, valueUsd])
  return null
}
