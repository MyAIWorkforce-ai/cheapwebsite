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
}: Args) {
  if (!hasResend) return { skipped: true as const }

  const site = env.siteUrl.replace(/\/$/, '')
  const dashboard = `${site}/dashboard?view=selling`
  const payouts = `${site}/dashboard/payouts`
  const listing = `${site}/marketplace/${slug}`

  const cur = (currency || 'usd').toUpperCase()
  const money = (c: number) =>
    `${cur} ${(c / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

  const resend = getResend()
  const subject = `You just sold "${title}" on Skillzy`

  const html = `<!doctype html><html><body style="margin:0;background:#E8ECF0;font-family:Georgia,'Times New Roman',serif;color:#0F1729;">
    <div style="max-width:560px;margin:0 auto;padding:40px 28px;">
      ${brandHeaderHtml()}
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
      </p>

      <hr style="border:none;border-top:1px solid #CCD2DD;margin:32px 0;" />
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#5F6B7E;margin:0;">Skillzy</p>
      <p style="font-size:12px;color:#5F6B7E;margin:6px 0 0;">A marketplace for agent skills.</p>
    </div>
  </body></html>`

  const text = `You just sold "${title}" on Skillzy.

Sale total: ${money(amountCents)}
Skillzy 20%: ${money(amountCents - payoutCents)}
Your 80%: ${money(payoutCents)}
Order: ${orderId}

Dashboard: ${dashboard}
Payouts: ${payouts}
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
