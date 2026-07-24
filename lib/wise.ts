import 'server-only'
import { env, hasWise, hasWiseToken } from '@/lib/env'

// Wise Business API client.
//
// Only the endpoints the nightly payout cron needs are implemented:
//   1. createQuote        — sync source USD → recipient's currency, get rate + fee
//   2. createRecipient    — one-per-creator account object (bank details / Wise email)
//   3. createTransfer     — books the movement, references the quote + recipient
//   4. fundTransfer       — pays the transfer from our Wise Business balance
//   5. getTransfer        — status polling (OUTGOING_PAYMENT_SENT, INCOMING_PAYMENT_WAITING, etc.)
//
// The API is Bearer-token'd; the token comes from Settings → API tokens
// in the Wise Business dashboard. `env.wise.apiUrl` is settable so the
// same code runs against sandbox during dev.
//
// Docs: https://docs.wise.com/api-docs (Wise Business v3 profiles + v1 transfers)

// ---------- Types (kept minimal — only what we actually read) ----------

export type WiseCountry = string // ISO alpha-2 (e.g. 'IN')
export type WiseCurrency = string // ISO 4217 (e.g. 'INR')

export type WiseQuote = {
  id: string
  targetAmount: number
  targetCurrency: WiseCurrency
  sourceAmount: number
  sourceCurrency: WiseCurrency
  rate: number
  // Wise returns a full fee breakdown — we only surface the total.
  totalFee: number
}

export type WiseRecipient = {
  id: number
  accountHolderName: string
  currency: WiseCurrency
  country: WiseCountry
}

export type WiseTransfer = {
  id: number
  status:
    | 'incoming_payment_waiting'
    | 'processing'
    | 'funds_converted'
    | 'outgoing_payment_sent'
    | 'cancelled'
    | 'funds_refunded'
    | 'bounced_back'
    | 'charged_back'
    | 'unknown'
  reference?: string
}

// Country-shaped bank details we accept from creators on the WiseCard
// form (see app/dashboard/payouts/WiseCard.tsx). The API needs slightly
// different shapes per corridor; we translate here.
export type CreatorPayoutDetails = {
  fullName: string
  country: WiseCountry
  currency: WiseCurrency
  // Wise account email — simplest path (Wise auto-routes to their bank).
  wiseEmail?: string
  // India-specific fields.
  accountNumber?: string
  ifscCode?: string
  // EU / IBAN corridors.
  iban?: string
  // Free-text for other countries — falls back to email-only path unless
  // we've explicitly mapped that corridor.
  other?: string
}

// ---------- Low-level fetch wrapper ----------

class WiseApiError extends Error {
  status: number
  body: unknown
  constructor(status: number, body: unknown, message: string) {
    super(message)
    this.status = status
    this.body = body
  }
}

async function wiseFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  // Token alone is enough to hit /v2/profiles for auto-discovery of
  // the business profile ID. Everything else needs the profile ID too,
  // which callers resolve via resolveProfileId() below.
  if (!hasWiseToken) {
    throw new WiseApiError(
      0,
      null,
      'Wise API is not configured — set WISE_API_TOKEN.',
    )
  }
  const url = `${env.wise.apiUrl.replace(/\/$/, '')}${path}`
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${env.wise.apiToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(init.headers ?? {}),
    },
    // Wise's edge is fast but not instant; give it room without hanging
    // the cron forever.
    signal: AbortSignal.timeout(20_000),
  })
  const raw = await res.text()
  const body = raw ? safeJsonParse(raw) : null
  if (!res.ok) {
    throw new WiseApiError(
      res.status,
      body,
      `Wise ${init.method ?? 'GET'} ${path} failed with ${res.status}`,
    )
  }
  return body as T
}

function safeJsonParse(raw: string): unknown {
  try {
    return JSON.parse(raw)
  } catch {
    return raw
  }
}

// ---------- Profile ID discovery ----------

// Cached in module scope — Wise profile IDs don't change once assigned,
// so we resolve once per warm process and reuse. Reset if the module
// reloads (deploys, cold starts) — cheap to re-resolve (one GET call).
let cachedProfileId: number | null = null

/**
 * The business Wise profile ID this integration transacts under.
 *
 * Two ways it's resolved (in priority order):
 *   1. WISE_PROFILE_ID env var — set only if you need to pin to a
 *      specific profile (e.g. login owns multiple businesses).
 *   2. Auto-discovery: GET /v2/profiles → pick the business profile.
 *      Removes the "hunt for the numeric ID in Wise's UI" step for
 *      the operator; matters because Wise's UI genuinely doesn't
 *      surface the profile ID in an obvious place.
 *
 * Throws WiseApiError if no business profile is found on the account.
 */
export async function resolveProfileId(): Promise<number> {
  if (env.wise.profileId) {
    const parsed = Number(env.wise.profileId)
    if (Number.isFinite(parsed)) return parsed
  }
  if (cachedProfileId != null) return cachedProfileId
  const profiles = await wiseFetch<
    Array<{ id: number; type: string; businessName?: string; fullName?: string }>
  >('/v2/profiles')
  const business = profiles.find((p) => p.type === 'business')
  if (!business) {
    throw new WiseApiError(
      0,
      profiles,
      'Auto-discovery found no business profile on this Wise account — set WISE_PROFILE_ID or add a business profile in Wise.',
    )
  }
  cachedProfileId = business.id
  return business.id
}

// ---------- 1. Quote ----------

/**
 * Create a QUOTE — Wise's rate-lock on a specific source-currency ↔
 * target-currency conversion. Quote IDs are single-use; we create a
 * fresh one per transfer. sourceAmount is in DOLLARS (not cents) to
 * match Wise's API.
 */
export async function createQuote(opts: {
  sourceAmountUsd: number
  targetCurrency: WiseCurrency
}): Promise<WiseQuote> {
  const profileId = await resolveProfileId()
  const body = await wiseFetch<{
    id: string
    sourceAmount: number
    targetAmount: number
    rate: number
    paymentOptions: Array<{
      payIn: string
      payOut: string
      fee: { total: number }
    }>
  }>(`/v3/profiles/${profileId}/quotes`, {
    method: 'POST',
    body: JSON.stringify({
      sourceCurrency: 'USD',
      targetCurrency: opts.targetCurrency,
      sourceAmount: opts.sourceAmountUsd,
      // BALANCE = pay in from our Wise account balance. The alternative
      // (BANK_TRANSFER) would ask us to top up manually per transfer.
      preferredPayIn: 'BALANCE',
    }),
  })
  const balanceOption = body.paymentOptions.find(
    (p) => p.payIn === 'BALANCE',
  )
  return {
    id: body.id,
    sourceAmount: body.sourceAmount,
    targetAmount: body.targetAmount,
    sourceCurrency: 'USD',
    targetCurrency: opts.targetCurrency,
    rate: body.rate,
    totalFee: balanceOption?.fee.total ?? 0,
  }
}

// ---------- 2. Recipient ----------

/**
 * Create a RECIPIENT ACCOUNT on our profile. Wise calls this an
 * "account requirement" — the shape differs per country. We map the
 * common corridors here and fall back to email-only if bank details
 * aren't recognised for the target country.
 */
export async function createRecipient(
  details: CreatorPayoutDetails,
): Promise<WiseRecipient> {
  const profileId = await resolveProfileId()
  const payload = buildRecipientPayload(details, profileId)
  const body = await wiseFetch<{
    id: number
    accountHolderName: string
    currency: string
    country: string
  }>(`/v1/accounts`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  return {
    id: body.id,
    accountHolderName: body.accountHolderName,
    currency: body.currency,
    country: body.country,
  }
}

function buildRecipientPayload(
  details: CreatorPayoutDetails,
  profileId: number,
) {
  // Common envelope Wise expects on every recipient.
  const base = {
    profile: profileId,
    accountHolderName: details.fullName,
    currency: details.currency,
    ownedByCustomer: false,
  }

  // Wise-email path — works globally as long as the creator has a
  // Wise personal account. Simplest, no country-specific fields.
  if (details.wiseEmail) {
    return {
      ...base,
      type: 'email',
      details: {
        email: details.wiseEmail,
        legalType: 'PRIVATE',
      },
    }
  }

  // India: INR to a local bank account.
  if (
    details.country === 'IN' &&
    details.accountNumber &&
    details.ifscCode
  ) {
    return {
      ...base,
      type: 'indian',
      currency: 'INR',
      details: {
        accountNumber: details.accountNumber,
        ifscCode: details.ifscCode,
        legalType: 'PRIVATE',
      },
    }
  }

  // EU IBAN corridors.
  if (details.iban) {
    return {
      ...base,
      type: 'iban',
      details: {
        iban: details.iban.replace(/\s+/g, ''),
        legalType: 'PRIVATE',
      },
    }
  }

  // Unknown corridor. Wise's API needs country-specific fields — we
  // refuse rather than book a transfer that will bounce. Cron catches
  // this as a per-creator failure and surfaces it on the admin panel.
  throw new WiseApiError(
    0,
    null,
    `No recipient mapping for country=${details.country} without wiseEmail`,
  )
}

// ---------- 3. Transfer ----------

/**
 * Create a TRANSFER — the booking Wise uses to move money. Requires
 * a fresh quote + an existing recipient. `reference` shows up on the
 * recipient's bank statement (16 chars max in most corridors).
 */
export async function createTransfer(opts: {
  quoteId: string
  recipientId: number
  reference?: string
  externalId: string // idempotency key — use our purchase_id or a hash
}): Promise<WiseTransfer> {
  const body = await wiseFetch<{
    id: number
    status: string
    reference?: string
  }>(`/v1/transfers`, {
    method: 'POST',
    body: JSON.stringify({
      targetAccount: opts.recipientId,
      quoteUuid: opts.quoteId,
      customerTransactionId: opts.externalId,
      details: {
        reference: (opts.reference ?? 'Skillzy payout').slice(0, 16),
        transferPurpose: 'verification.transfers.purpose.other',
        sourceOfFunds: 'verification.source.of.funds.other',
      },
    }),
  })
  return {
    id: body.id,
    status: (body.status?.toLowerCase() as WiseTransfer['status']) ?? 'unknown',
    reference: body.reference,
  }
}

// ---------- 4. Fund transfer from balance ----------

/**
 * Pull the money for a transfer out of our Wise Business BALANCE.
 * Without this call the transfer sits waiting for a bank top-up
 * forever. Idempotent — Wise no-ops re-funding a paid transfer.
 */
export async function fundTransfer(transferId: number): Promise<{
  status: string
  errorCode?: string
}> {
  const profileId = await resolveProfileId()
  const body = await wiseFetch<{ type: string; status: string; errorCode?: string }>(
    `/v3/profiles/${profileId}/transfers/${transferId}/payments`,
    {
      method: 'POST',
      body: JSON.stringify({ type: 'BALANCE' }),
    },
  )
  return { status: body.status, errorCode: body.errorCode }
}

// ---------- 5. Get transfer status ----------

/** Poll a transfer's current status. Used by the admin panel + retries. */
export async function getTransfer(transferId: number): Promise<WiseTransfer> {
  const body = await wiseFetch<{
    id: number
    status: string
    reference?: string
  }>(`/v1/transfers/${transferId}`)
  return {
    id: body.id,
    status: (body.status?.toLowerCase() as WiseTransfer['status']) ?? 'unknown',
    reference: body.reference,
  }
}

// ---------- 6. End-to-end helper ----------

/**
 * Everything the cron needs in one call: quote → create-or-reuse
 * recipient → create transfer → fund from balance. Returns the
 * Wise transfer ID + final status. Throws on any step failure so
 * the caller can log + mark the DB row failed.
 */
export async function payoutViaWise(opts: {
  amountUsdCents: number
  targetCurrency: WiseCurrency
  details: CreatorPayoutDetails
  cachedRecipientId?: number
  externalId: string
  reference?: string
}): Promise<{
  transferId: number
  recipientId: number
  status: string
  targetAmount: number
  targetCurrency: string
  feeSourceMinorUnits: number
}> {
  const sourceUsd = opts.amountUsdCents / 100
  const quote = await createQuote({
    sourceAmountUsd: sourceUsd,
    targetCurrency: opts.targetCurrency,
  })
  const recipientId =
    opts.cachedRecipientId ??
    (await createRecipient(opts.details)).id
  const transfer = await createTransfer({
    quoteId: quote.id,
    recipientId,
    reference: opts.reference,
    externalId: opts.externalId,
  })
  const funded = await fundTransfer(transfer.id)
  return {
    transferId: transfer.id,
    recipientId,
    status: funded.status,
    targetAmount: quote.targetAmount,
    targetCurrency: opts.targetCurrency,
    feeSourceMinorUnits: Math.round(quote.totalFee * 100),
  }
}

export { WiseApiError }
