/**
 * GET /api/cron/stripe-nudge
 *
 * Daily cron. For creators who:
 *   - have at least one PAID live listing older than 24h
 *   - haven't connected Stripe (stripe_account_id is null), and
 *   - haven't already been nudged (no app_metadata.stripe_nudge_sent_at)
 * send a one-shot follow-up email pointing them at /dashboard/payouts.
 *
 * Idempotent: each send writes app_metadata.stripe_nudge_sent_at on
 * the auth user, so re-runs (or a delayed Stripe connection on the
 * creator's side) won't duplicate the nudge.
 *
 * Auth: requires Authorization: Bearer <CRON_SECRET> (Vercel Cron
 * sends it) or ?key=<CRON_SECRET>. Fails closed if CRON_SECRET is
 * not set.
 */
import { NextResponse } from 'next/server'
import { env, hasResend, hasSupabase } from '@/lib/env'
import { createServiceClient } from '@/lib/supabase/server'
import { sendStripeConnectNudge } from '@/lib/email/stripe-connect-nudge'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const DAY = 24 * 60 * 60 * 1000

export async function GET(req: Request) {
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

  const admin = createServiceClient()
  const cutoff = new Date(Date.now() - DAY).toISOString()

  // 1. Profiles without a connected Stripe account.
  const { data: profiles, error: profilesErr } = await admin
    .from('profiles')
    .select('id, name')
    .is('stripe_account_id', null)

  if (profilesErr) {
    console.error('stripe-nudge: profiles query failed', profilesErr)
    return NextResponse.json({ error: 'profiles query failed' }, { status: 500 })
  }

  let scanned = 0
  let eligible = 0
  let sent = 0
  const errors: Array<{ id: string; reason: string }> = []

  for (const p of profiles ?? []) {
    scanned += 1
    try {
      // 2. Does this creator have at least one paid live listing
      //    older than 24h? If not, no point nudging — they may have
      //    just signed up or only listed free items.
      const { count: paidListings } = await admin
        .from('listings')
        .select('id', { count: 'exact', head: true })
        .eq('creator_id', p.id as string)
        .eq('status', 'live')
        .gt('price_cents', 0)
        .lt('created_at', cutoff)

      if (!paidListings || paidListings === 0) continue
      eligible += 1

      // 3. Has this creator already been nudged?
      const { data: userResp } = await admin.auth.admin.getUserById(
        p.id as string,
      )
      const u = userResp.user
      if (!u?.email) continue
      if (u.app_metadata?.stripe_nudge_sent_at) continue

      // 4. Send + record.
      const result = await sendStripeConnectNudge({
        to: u.email,
        name: (p.name as string | null) ?? null,
        listingCount: paidListings,
      })
      if ('ok' in result && result.ok) {
        await admin.auth.admin.updateUserById(p.id as string, {
          app_metadata: {
            ...u.app_metadata,
            stripe_nudge_sent_at: new Date().toISOString(),
          },
        })
        sent += 1
      } else if ('error' in result) {
        errors.push({ id: p.id as string, reason: result.error ?? 'unknown' })
      }
    } catch (err) {
      errors.push({
        id: p.id as string,
        reason: (err as Error).message,
      })
    }
  }

  return NextResponse.json({
    ok: true,
    scanned,
    eligible,
    sent,
    errors: errors.length ? errors : undefined,
  })
}
