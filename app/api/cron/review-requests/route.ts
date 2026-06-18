/**
 * GET /api/cron/review-requests
 *
 * Daily cron. For paid purchases without a review:
 *  - 2–4 days old → send the day-3 review request (once).
 *  - 7–9 days old → send the day-7 follow-up (once, only if still
 *    no review).
 *
 * Tracking columns on `purchases` (review_email_sent_at /
 * review_followup_sent_at) keep this idempotent across cron runs.
 *
 * Auth: if CRON_SECRET is set, require `Authorization: Bearer …`
 * (Vercel Cron sends it) or `?key=…`.
 */
import { NextResponse } from 'next/server'
import { env, hasResend, hasSupabase } from '@/lib/env'
import { createServiceClient } from '@/lib/supabase/server'
import { sendReviewRequest } from '@/lib/email/review-request'
import { reviewToken } from '@/lib/review-token'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const DAY = 24 * 60 * 60 * 1000

type PurchaseRow = {
  id: string
  buyer_email: string | null
  listings:
    | {
        title?: string | null
        type?: string | null
        profiles?:
          | { handle?: string | null }
          | { handle?: string | null }[]
          | null
      }
    | {
        title?: string | null
        type?: string | null
        profiles?:
          | { handle?: string | null }
          | { handle?: string | null }[]
          | null
      }[]
    | null
}

function listingDetails(row: PurchaseRow): {
  title: string
  type: string | undefined
  creatorHandle: string | null
} {
  const l = row.listings
  const flat = Array.isArray(l) ? (l[0] ?? null) : l
  if (!flat) {
    return { title: 'your purchase', type: undefined, creatorHandle: null }
  }
  const profilesRaw = flat.profiles
  const profile = Array.isArray(profilesRaw)
    ? (profilesRaw[0] ?? null)
    : (profilesRaw ?? null)
  return {
    title: flat.title ?? 'your purchase',
    type: flat.type ?? undefined,
    creatorHandle: profile?.handle ?? null,
  }
}

export async function GET(req: Request) {
  // Fail closed: refuse the request entirely when CRON_SECRET is unset,
  // rather than running unauthenticated (the previous behaviour).
  if (!env.cronSecret) {
    return NextResponse.json(
      { error: 'CRON_SECRET not configured' },
      { status: 503 },
    )
  }
  const auth = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  const key = new URL(req.url).searchParams.get('key')
  if (auth !== env.cronSecret && key !== env.cronSecret) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  if (!hasSupabase || !hasResend) {
    return NextResponse.json({ skipped: 'env-missing' })
  }

  const db = createServiceClient()
  const now = Date.now()
  const day3From = new Date(now - 4 * DAY).toISOString()
  const day3To = new Date(now - 2 * DAY).toISOString()
  const day7From = new Date(now - 9 * DAY).toISOString()
  const day7To = new Date(now - 7 * DAY).toISOString()

  // Day-3 batch
  const { data: day3, error: e1 } = await db
    .from('purchases')
    .select('id, buyer_email, listings:listing_id ( title, type, profiles:creator_id ( handle ) )')
    .eq('status', 'paid')
    .is('review_email_sent_at', null)
    .gte('created_at', day3From)
    .lte('created_at', day3To)
  if (e1) return NextResponse.json({ error: e1.message }, { status: 500 })

  let day3Sent = 0
  for (const p of (day3 ?? []) as PurchaseRow[]) {
    if (!p.buyer_email) continue
    const tok = reviewToken(p.id)
    const details = listingDetails(p)
    const res = await sendReviewRequest({
      to: p.buyer_email,
      title: details.title,
      type: details.type,
      creatorHandle: details.creatorHandle,
      purchaseId: p.id,
      token: tok,
      variant: 'day3',
    })
    if ('ok' in res || 'skipped' in res) {
      await db
        .from('purchases')
        .update({ review_email_sent_at: new Date().toISOString() })
        .eq('id', p.id)
      if ('ok' in res && res.ok) day3Sent++
    }
  }

  // Day-7 batch — skip if a review already exists
  const { data: day7, error: e2 } = await db
    .from('purchases')
    .select('id, buyer_email, listings:listing_id ( title, type, profiles:creator_id ( handle ) )')
    .eq('status', 'paid')
    .is('review_followup_sent_at', null)
    .gte('created_at', day7From)
    .lte('created_at', day7To)
  if (e2) return NextResponse.json({ error: e2.message }, { status: 500 })

  let day7Sent = 0
  for (const p of (day7 ?? []) as PurchaseRow[]) {
    if (!p.buyer_email) continue
    const { data: existingReview } = await db
      .from('reviews')
      .select('id')
      .eq('purchase_id', p.id)
      .maybeSingle()
    if (existingReview) {
      // Already reviewed — just mark followup done so we never check again
      await db
        .from('purchases')
        .update({ review_followup_sent_at: new Date().toISOString() })
        .eq('id', p.id)
      continue
    }
    const tok = reviewToken(p.id)
    const details = listingDetails(p)
    const res = await sendReviewRequest({
      to: p.buyer_email,
      title: details.title,
      type: details.type,
      creatorHandle: details.creatorHandle,
      purchaseId: p.id,
      token: tok,
      variant: 'day7',
    })
    if ('ok' in res || 'skipped' in res) {
      await db
        .from('purchases')
        .update({ review_followup_sent_at: new Date().toISOString() })
        .eq('id', p.id)
      if ('ok' in res && res.ok) day7Sent++
    }
  }

  return NextResponse.json({ ok: true, day3Sent, day7Sent })
}
