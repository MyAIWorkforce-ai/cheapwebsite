import { NextResponse } from 'next/server'
import { hasSupabase } from '@/lib/env'
import { createServiceClient } from '@/lib/supabase/server'
import { reviewTokenValid } from '@/lib/review-token'

export const runtime = 'nodejs'

// Public no-login endpoint. The /r/[purchaseId] page POSTs here.
// Auth is the HMAC review token, not a Supabase session.
export async function POST(req: Request) {
  if (!hasSupabase) {
    return NextResponse.json({ error: 'unavailable' }, { status: 500 })
  }
  let payload: {
    purchaseId?: string
    token?: string
    stars?: number
    body?: string
  } = {}
  try {
    payload = await req.json()
  } catch {
    /* fall through to validation */
  }
  const { purchaseId, token, stars, body } = payload
  if (!purchaseId || !token) {
    return NextResponse.json({ error: 'bad request' }, { status: 400 })
  }
  if (!reviewTokenValid(purchaseId, token)) {
    return NextResponse.json({ error: 'invalid token' }, { status: 403 })
  }
  if (typeof stars !== 'number' || stars < 1 || stars > 5) {
    return NextResponse.json({ error: 'rating must be 1–5' }, { status: 400 })
  }

  const db = createServiceClient()
  const { data: purchase } = await db
    .from('purchases')
    .select('id, listing_id, buyer_id, status')
    .eq('id', purchaseId)
    .single()
  if (!purchase || purchase.status !== 'paid') {
    return NextResponse.json({ error: 'purchase not found' }, { status: 404 })
  }

  const trimmedBody = (body ?? '').trim().slice(0, 1000) || null
  const { data: existing } = await db
    .from('reviews')
    .select('id')
    .eq('purchase_id', purchaseId)
    .maybeSingle()

  if (existing) {
    const { error } = await db
      .from('reviews')
      .update({ rating: stars, body: trimmedBody })
      .eq('purchase_id', purchaseId)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  } else {
    const { error } = await db.from('reviews').insert({
      purchase_id: purchaseId,
      buyer_id: purchase.buyer_id ?? null,
      listing_id: purchase.listing_id,
      rating: stars,
      body: trimmedBody,
    })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
