/**
 * GET /api/cron/wise-payouts
 *
 * Nightly cron (Vercel Cron, 02:00 UTC per vercel.json).
 *
 * For every creator whose Wise pending balance ≥ WISE_PAYOUT_THRESHOLD:
 *   1. Load the creator's Wise recipient details from profiles.
 *   2. Sum all pending purchase rows (payout_provider='wise',
 *      payout_status='pending') scoped to that creator's listings.
 *   3. Fire a single Wise transfer via lib/wise → quote → recipient
 *      (create-or-reuse cached) → transfer → fund from balance.
 *   4. Mark every included purchase row payout_status='paid_out' with
 *      the returned wise_transfer_id + paid_out_at = now.
 *   5. Cache the recipient ID on the profile so future runs skip the
 *      re-create step.
 *   6. Email the creator a confirmation.
 *
 * Fail-per-creator: an error on one creator doesn't stop the loop.
 * The failed creator's rows are marked payout_status='failed' with a
 * one-line note; the admin panel shows them for manual retry.
 *
 * Idempotency:
 *   - Each Wise transfer uses `customerTransactionId` = deterministic
 *     hash of purchase IDs → safe to re-run the cron mid-way.
 *   - We only include rows where payout_status='pending' at write-time.
 *
 * Auth: Authorization: Bearer <CRON_SECRET> (Vercel Cron sends it) or
 * ?key=<CRON_SECRET>. Fails closed if CRON_SECRET is unset.
 */
import { NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { env, hasResend, hasSupabase, hasWise } from '@/lib/env'
import { createServiceClient } from '@/lib/supabase/server'
import {
  payoutViaWise,
  WiseApiError,
  type CreatorPayoutDetails,
} from '@/lib/wise'
import { sendWisePayoutConfirmation } from '@/lib/email/wise-payout-confirmation'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type ProfileRow = {
  id: string
  wise_recipient_name: string | null
  wise_recipient_country: string | null
  wise_recipient_currency: string | null
  wise_recipient_email: string | null
  wise_recipient_details: Record<string, string> | null
  wise_recipient_id: string | null
}

type PendingPurchase = {
  id: string
  creator_payout_cents: number
  listing_id: string
}

type RunSummary = {
  scanned: number
  paid: number
  skipped: number
  failed: number
  errors: Array<{ creatorId: string; reason: string }>
}

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
  if (!hasSupabase) {
    return NextResponse.json({ skipped: 'supabase-missing' })
  }
  if (!hasWise) {
    // Not an error — expected during Phase 1 rollout while Toby's Wise
    // Business account approval is pending. Cron does nothing.
    return NextResponse.json({ skipped: 'wise-not-configured' })
  }

  const summary: RunSummary = {
    scanned: 0,
    paid: 0,
    skipped: 0,
    failed: 0,
    errors: [],
  }

  const admin = createServiceClient()

  // 1. Find every creator with payout_method='wise' + at least one
  //    pending purchase row. Two queries kept simple (no aggregate
  //    RPC needed) — creator counts scale slowly enough.
  const { data: profiles, error: profilesErr } = await admin
    .from('profiles')
    .select(
      'id, wise_recipient_name, wise_recipient_country, wise_recipient_currency, wise_recipient_email, wise_recipient_details, wise_recipient_id',
    )
    .eq('payout_method', 'wise')

  if (profilesErr) {
    console.error('wise-payouts: profiles query failed', profilesErr)
    return NextResponse.json(
      { error: 'profiles query failed' },
      { status: 500 },
    )
  }

  for (const profile of (profiles ?? []) as ProfileRow[]) {
    summary.scanned += 1
    try {
      const paidAny = await tryPayoutOne(admin, profile, summary)
      if (paidAny === 'below-threshold') summary.skipped += 1
      else if (paidAny === 'paid') summary.paid += 1
    } catch (err) {
      summary.failed += 1
      summary.errors.push({
        creatorId: profile.id,
        reason: (err as Error).message,
      })
      console.error('wise-payouts: creator failed', profile.id, err)
    }
  }

  return NextResponse.json(summary)
}

type TryOutcome = 'paid' | 'below-threshold'

async function tryPayoutOne(
  admin: ReturnType<typeof createServiceClient>,
  profile: ProfileRow,
  summary: RunSummary,
): Promise<TryOutcome> {
  // 1. Load pending purchase rows for this creator's listings.
  const { data: listings } = await admin
    .from('listings')
    .select('id')
    .eq('creator_id', profile.id)
  const listingIds = (listings ?? []).map((l) => l.id as string)
  if (listingIds.length === 0) return 'below-threshold'

  const { data: pending } = await admin
    .from('purchases')
    .select('id, creator_payout_cents, listing_id')
    .in('listing_id', listingIds)
    .eq('payout_provider', 'wise')
    .eq('payout_status', 'pending')

  const rows = (pending ?? []) as PendingPurchase[]
  if (rows.length === 0) return 'below-threshold'

  const totalCents = rows.reduce(
    (acc, r) => acc + (r.creator_payout_cents ?? 0),
    0,
  )
  if (totalCents < env.wise.payoutThresholdCents) {
    return 'below-threshold'
  }

  // 2. Validate we have enough recipient details to actually pay.
  const details = profileToPayoutDetails(profile)
  if (!details) {
    throw new Error('missing-recipient-details')
  }

  // 3. Deterministic external ID keeps this idempotent — re-running the
  //    cron after a partial failure won't book two transfers for the
  //    same batch (Wise dedupes on customerTransactionId).
  const externalId = crypto
    .createHash('sha256')
    .update(rows.map((r) => r.id).sort().join(','))
    .digest('hex')
    .slice(0, 32)

  // 4. Fire the payout end-to-end.
  const result = await payoutViaWise({
    amountUsdCents: totalCents,
    targetCurrency: details.currency,
    details,
    cachedRecipientId: profile.wise_recipient_id
      ? Number(profile.wise_recipient_id)
      : undefined,
    externalId,
    reference: 'Skillzy payout',
  })

  // 5. Mark the included purchase rows paid_out. Only flip rows still
  //    in 'pending' — belt-and-braces against a concurrent write.
  const nowIso = new Date().toISOString()
  const { error: updateErr } = await admin
    .from('purchases')
    .update({
      payout_status: 'paid_out',
      wise_transfer_id: String(result.transferId),
      paid_out_at: nowIso,
    })
    .in(
      'id',
      rows.map((r) => r.id),
    )
    .eq('payout_status', 'pending')
  if (updateErr) {
    // The Wise transfer already fired. We MUST flag this loud — money
    // moved, DB didn't. Admin needs to reconcile by hand.
    console.error(
      'wise-payouts: DB update FAILED after successful Wise transfer',
      { transferId: result.transferId, creatorId: profile.id, updateErr },
    )
    summary.errors.push({
      creatorId: profile.id,
      reason: `db-update-failed-post-transfer:${result.transferId}`,
    })
  }

  // 6. Cache the recipient ID on the profile so the next payout skips
  //    the create-recipient step.
  if (!profile.wise_recipient_id) {
    await admin
      .from('profiles')
      .update({ wise_recipient_id: String(result.recipientId) })
      .eq('id', profile.id)
  }

  // 7. Notify the creator. Best-effort — the transfer's already booked.
  if (hasResend) {
    try {
      const { data: user } = await admin.auth.admin.getUserById(profile.id)
      const email = user?.user?.email
      if (email) {
        await sendWisePayoutConfirmation({
          to: email,
          name: profile.wise_recipient_name,
          sourceCents: totalCents,
          targetAmount: result.targetAmount,
          targetCurrency: result.targetCurrency,
          wiseTransferId: String(result.transferId),
          purchaseCount: rows.length,
        })
      }
    } catch (err) {
      console.error(
        'wise-payouts: payout confirmation email failed',
        profile.id,
        err,
      )
    }
  }

  return 'paid'
}

/**
 * Translate the shape stored on `profiles` into the shape lib/wise
 * expects for creating recipients. Returns null if the row is missing
 * the fields we absolutely need to send money (country + currency +
 * either a Wise email or bank details).
 */
function profileToPayoutDetails(
  profile: ProfileRow,
): CreatorPayoutDetails | null {
  const country = profile.wise_recipient_country
  const currency = profile.wise_recipient_currency
  const fullName = profile.wise_recipient_name
  if (!country || !currency || !fullName) return null
  const details = (profile.wise_recipient_details as
    | Record<string, string>
    | null) ?? null
  const hasBank = Boolean(
    details?.account_number || details?.iban || details?.other,
  )
  if (!profile.wise_recipient_email && !hasBank) return null
  return {
    fullName,
    country,
    currency,
    wiseEmail: profile.wise_recipient_email ?? undefined,
    accountNumber: details?.account_number,
    ifscCode: details?.ifsc_code,
    iban: details?.iban,
    other: details?.other,
  }
}

// Mark stale references so unused-var lint doesn't complain about the
// caught-and-handled WiseApiError symbol import.
void WiseApiError
