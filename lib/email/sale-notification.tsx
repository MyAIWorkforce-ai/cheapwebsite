import { Resend } from 'resend'
import { env, hasResend } from '@/lib/env'
import { brandHeaderHtml } from './brand'

type Args = {
  to: string
  title: string
  slug: string
  amountCents: number
  payoutCents: number
  currency: string
  orderId: string
  // How this sale routed. Drives which "your money is coming" copy the
  // email shows.
  //   'stripe' — Stripe Connect destination charge already split the
  //              80% into the creator's Stripe. Standard cha-ching copy.
  //   'wise'   — Amount is queued against their Wise balance; the
  //              nightly cron sends it once the balance crosses $50 USD.
  //   'none'   — No payout method set at sale time. Cha-ching still,
  //              but with a light invite-forward to set up payouts so
  //              the NEXT sale reaches them.
  payoutMethod?: 'stripe' | 'wise' | 'none'
  // Kept for backwards compatibility with older callsites. When
  // present overrides payoutMethod (true → 'stripe', false → 'none').
  payoutsConnected?: boolean
  // Wise creators see the running pending balance in the email so they
  // know how close they are to the $50 payout threshold.
  pendingWiseBalanceCents?: number
}

let cached: Resend | null = null
function getResend() {
  if (!cached) cached = new Resend(env.resend.apiKey)
  return cached
}

// Sent to the SELLER the moment a buyer completes a purchase. Plain,
// branded, no buyer PII (we mediate). Idempotent by virtue of being
// fired only after the purchase row is freshly inserted.
export async function sendSaleNotification({
  to,
  title,
  slug,
  amountCents,
  payoutCents,
  currency,
  orderId,
  payoutMethod,
  payoutsConnected,
  pendingWiseBalanceCents = 0,
}: Args) {
  if (!hasResend) return { skipped: true as const }

  const site = env.siteUrl.replace(/\/$/, '')
  const dashboard = `${site}/dashboard?view=selling`
  const payouts = `${site}/dashboard/payouts`
  const listing = `${site}/marketplace/${slug}`

  // Resolve the effective payout method. Legacy callers pass
  // payoutsConnected only; new callers pass payoutMethod directly. If
  // both are absent we default to 'stripe' (matches historic behaviour).
  const method: 'stripe' | 'wise' | 'none' =
    payoutMethod ??
    (payoutsConnected === false
      ? 'none'
      : payoutsConnected === true
        ? 'stripe'
        : 'stripe')

  const cur = (currency || 'usd').toUpperCase()
  const money = (c: number) =>
    `${cur} ${(c / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  // Hypothetical 80% on this sale amount — used in the unconnected
  // variant to show the creator what they'll receive on the NEXT
  // sale once a payout method is set. Not a promise of back-payment.
  const wouldHaveEarned = Math.round(amountCents * 0.8)
  const WISE_THRESHOLD_CENTS = 50 * 100

  const resend = getResend()
  const subject =
    method === 'stripe'
      ? `You just sold "${title}" on Skillzy`
      : method === 'wise'
        ? `You just sold "${title}" — queued for your Wise payout`
        : `🎉 Your listing sold — set up payouts to receive it`

  const body =
    method === 'stripe'
      ? `
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C19E50;margin:0;">Cha-ching</p>
      <h1 style="font-size:34px;line-height:1.1;letter-spacing:-0.02em;margin:14px 0 0;">You just made a sale.</h1>
      <p style="font-size:16px;color:#5F6B7E;margin:18px 0 0;">
        Someone bought <strong>${title}</strong>. Their files are on the way; your share is on the way too — Stripe pays you direct on its usual settlement schedule.
      </p>

      <div style="margin:28px 0;padding:18px;background:#fff;border:1px solid #CCD2DD;">
        <table style="width:100%;border-collapse:collapse;font-family:Georgia,'Times New Roman',serif;font-size:15px;">
          <tr><td style="padding:6px 0;color:#5F6B7E;">Sale total</td><td style="padding:6px 0;text-align:right;">${money(amountCents)}</td></tr>
          <tr><td style="padding:6px 0;color:#5F6B7E;">Skillzy 20%</td><td style="padding:6px 0;text-align:right;">${money(amountCents - payoutCents)}</td></tr>
          <tr><td style="padding:10px 0 6px;color:#0F1729;font-weight:bold;border-top:1px solid #CCD2DD;">Your 80%</td><td style="padding:10px 0 6px;text-align:right;color:#C19E50;font-weight:bold;border-top:1px solid #CCD2DD;">${money(payoutCents)}</td></tr>
          <tr><td style="padding:6px 0;color:#5F6B7E;font-size:13px;">Order</td><td style="padding:6px 0;text-align:right;font-family:monospace;font-size:13px;color:#5F6B7E;">${orderId}</td></tr>
        </table>
      </div>

      <p style="font-size:16px;color:#0F1729;margin:24px 0 0;">
        <a href="${dashboard}" style="display:inline-block;background:#C19E50;color:#0F1729;font-weight:bold;text-decoration:none;padding:14px 22px;font-family:Georgia,'Times New Roman',serif;">Open your dashboard →</a>
      </p>

      <p style="font-size:14px;color:#5F6B7E;margin:24px 0 0;line-height:1.55;">
        See every sale + total earned on your <a href="${dashboard}" style="color:#0F1729;">dashboard</a>.
        Check payout status on <a href="${payouts}" style="color:#0F1729;">Payouts</a>.
        Your live listing: <a href="${listing}" style="color:#0F1729;">${listing.replace(site + '/', '/')}</a>.
      </p>`
      : method === 'wise'
        ? `
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C19E50;margin:0;">Cha-ching</p>
      <h1 style="font-size:34px;line-height:1.1;letter-spacing:-0.02em;margin:14px 0 0;">You just made a sale.</h1>
      <p style="font-size:16px;color:#5F6B7E;margin:18px 0 0;">
        Someone bought <strong>${title}</strong>. Their files are on the way; your 80% has been queued against your Wise payout balance.
      </p>

      <div style="margin:28px 0;padding:18px;background:#fff;border:1px solid #CCD2DD;">
        <table style="width:100%;border-collapse:collapse;font-family:Georgia,'Times New Roman',serif;font-size:15px;">
          <tr><td style="padding:6px 0;color:#5F6B7E;">Sale total</td><td style="padding:6px 0;text-align:right;">${money(amountCents)}</td></tr>
          <tr><td style="padding:6px 0;color:#5F6B7E;">Skillzy 20%</td><td style="padding:6px 0;text-align:right;">${money(amountCents - payoutCents)}</td></tr>
          <tr><td style="padding:10px 0 6px;color:#0F1729;font-weight:bold;border-top:1px solid #CCD2DD;">Your 80%</td><td style="padding:10px 0 6px;text-align:right;color:#C19E50;font-weight:bold;border-top:1px solid #CCD2DD;">${money(payoutCents)}</td></tr>
          ${
            pendingWiseBalanceCents > 0
              ? `<tr><td style="padding:6px 0;color:#5F6B7E;font-size:13px;">Pending balance</td><td style="padding:6px 0;text-align:right;font-size:13px;color:#5F6B7E;">${money(pendingWiseBalanceCents)}${
                  pendingWiseBalanceCents >= WISE_THRESHOLD_CENTS
                    ? ' <span style="color:#C19E50;">— sends on next Wise run</span>'
                    : ` <span style="color:#5F6B7E;">— $50 threshold</span>`
                }</td></tr>`
              : ''
          }
          <tr><td style="padding:6px 0;color:#5F6B7E;font-size:13px;">Order</td><td style="padding:6px 0;text-align:right;font-family:monospace;font-size:13px;color:#5F6B7E;">${orderId}</td></tr>
        </table>
      </div>

      <p style="font-size:15px;color:#0F1729;margin:24px 0 0;line-height:1.55;">
        Wise transfers fire nightly once your pending balance crosses <strong>US$50</strong>. Money usually lands in your Wise account 1–2 business days later.
      </p>

      <p style="font-size:16px;color:#0F1729;margin:24px 0 0;">
        <a href="${dashboard}" style="display:inline-block;background:#C19E50;color:#0F1729;font-weight:bold;text-decoration:none;padding:14px 22px;font-family:Georgia,'Times New Roman',serif;">Open your dashboard →</a>
      </p>

      <p style="font-size:14px;color:#5F6B7E;margin:24px 0 0;line-height:1.55;">
        Update your Wise details on <a href="${payouts}" style="color:#0F1729;">Payouts</a>.
        Your live listing: <a href="${listing}" style="color:#0F1729;">${listing.replace(site + '/', '/')}</a>.
      </p>`
        : `
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C19E50;margin:0;">Your first sale</p>
      <h1 style="font-size:34px;line-height:1.1;letter-spacing:-0.02em;margin:14px 0 0;">🎉 Someone just bought your listing.</h1>
      <p style="font-size:16px;color:#5F6B7E;margin:18px 0 0;">
        <strong>${title}</strong> just sold for <strong>${money(amountCents)}</strong>. Real money, real demand.
      </p>

      <div style="margin:28px 0;padding:18px;background:#fff;border:1px solid #CCD2DD;">
        <p style="margin:0;font-size:15px;color:#0F1729;line-height:1.55;">
          <strong>Set up payouts to start receiving sales.</strong><br/>
          Two options: <strong>Stripe Connect</strong> (US, UK, AU, EU + 40 more) or <strong>Wise</strong> (India, Nigeria, LatAm + ~115 more). Either way you get <strong style="color:#C19E50;">80% (${money(wouldHaveEarned)})</strong> from a sale like this.
        </p>
      </div>

      <p style="font-size:16px;color:#0F1729;margin:24px 0 0;">
        <a href="${payouts}" style="display:inline-block;background:#C19E50;color:#0F1729;font-weight:bold;text-decoration:none;padding:14px 22px;font-family:Georgia,'Times New Roman',serif;">Set up payouts →</a>
      </p>

      <p style="font-size:13px;color:#5F6B7E;margin:24px 0 0;line-height:1.55;">
        Takes about 2 minutes. Skillzy doesn't pay out retroactively, so the sooner you're connected, the sooner sales land in your bank.
      </p>

      <p style="font-size:14px;color:#5F6B7E;margin:24px 0 0;line-height:1.55;">
        Order ${orderId} · Listing: <a href="${listing}" style="color:#0F1729;">${listing.replace(site + '/', '/')}</a>
      </p>`

  const html = `<!doctype html><html><body style="margin:0;background:#E8ECF0;font-family:Georgia,'Times New Roman',serif;color:#0F1729;">
    <div style="max-width:560px;margin:0 auto;padding:40px 28px;">
      ${brandHeaderHtml()}
      ${body}

      <hr style="border:none;border-top:1px solid #CCD2DD;margin:32px 0;" />
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#5F6B7E;margin:0;">Skillzy</p>
      <p style="font-size:12px;color:#5F6B7E;margin:6px 0 0;">A marketplace for agent skills.</p>
    </div>
  </body></html>`

  const text =
    method === 'stripe'
      ? `You just sold "${title}" on Skillzy.

Sale total: ${money(amountCents)}
Skillzy 20%: ${money(amountCents - payoutCents)}
Your 80%: ${money(payoutCents)}
Order: ${orderId}

Dashboard: ${dashboard}
Payouts: ${payouts}
Listing: ${listing}
`
      : method === 'wise'
        ? `You just sold "${title}" on Skillzy.

Sale total: ${money(amountCents)}
Skillzy 20%: ${money(amountCents - payoutCents)}
Your 80% (queued for Wise): ${money(payoutCents)}${
            pendingWiseBalanceCents > 0
              ? `\nPending balance: ${money(pendingWiseBalanceCents)} (Wise threshold: US$50)`
              : ''
          }
Order: ${orderId}

Wise transfers fire nightly once your pending balance crosses US$50. Money usually lands in your Wise account 1–2 business days later.

Dashboard: ${dashboard}
Wise details: ${payouts}
Listing: ${listing}
`
        : `Your listing "${title}" just sold for ${money(amountCents)} — real money, real demand.

Set up payouts to start receiving sales. Two options: Stripe Connect (US, UK, AU, EU + more) or Wise (India, Nigeria, LatAm + ~115 more countries). Either way you get 80% (${money(wouldHaveEarned)}) from a sale like this.

Set up: ${payouts}

Takes about 2 minutes. Skillzy doesn't process payouts retroactively, so the sooner you're set up, the sooner sales land.

Order: ${orderId}
Listing: ${listing}
`

  try {
    const res = await resend.emails.send({
      from: `Skillzy AI <${env.resend.fromEmail}>`,
      to,
      subject,
      html,
      text,
    })
    return { ok: true as const, id: res.data?.id ?? null }
  } catch (err) {
    return { ok: false as const, error: (err as Error).message }
  }
}
