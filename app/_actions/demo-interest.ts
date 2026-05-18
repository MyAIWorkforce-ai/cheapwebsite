'use server'

import { cookies } from 'next/headers'
import { isSeedProductId, resolveProduct } from '@/lib/listings'
import { getUser } from '@/lib/auth'
import { hasResend } from '@/lib/env'
import { sendDemoInterestNotification } from '@/lib/email/demo-interest'

export type DemoInterestState = { ok?: boolean }

/**
 * A buyer clicked buy on a demo/sample listing. There's nothing to
 * deliver, so we email ourselves the demand signal and tell the
 * client to show the "no longer available" message. Always resolves
 * ok — the buyer-facing outcome never depends on the email landing.
 */
export async function registerDemoInterest(
  _prev: DemoInterestState,
  formData: FormData,
): Promise<DemoInterestState> {
  const listingId = String(formData.get('listing') ?? '').trim()
  // Only the demo/sample catalogue uses this path.
  if (!listingId || !isSeedProductId(listingId)) return { ok: true }

  const product = await resolveProduct(listingId)
  const title = product?.title ?? listingId

  let buyerEmail: string | null = null
  try {
    const user = await getUser()
    buyerEmail = user?.email ?? null
  } catch {
    /* not signed in — fine */
  }

  const referrer = cookies().get('skz_ref')?.value ?? null

  if (hasResend) {
    try {
      await sendDemoInterestNotification({
        productTitle: title,
        listingId,
        buyerEmail,
        referrer,
      })
    } catch (err) {
      console.error('Demo interest notification failed', err)
    }
  }

  return { ok: true }
}
