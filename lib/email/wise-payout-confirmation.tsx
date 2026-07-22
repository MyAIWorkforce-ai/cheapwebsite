import { Resend } from 'resend'
import { env, hasResend } from '@/lib/env'
import { brandHeaderHtml } from './brand'

let cached: Resend | null = null
function getResend() {
  if (!cached) cached = new Resend(env.resend.apiKey)
  return cached
}

/**
 * Sent to a creator the moment the nightly Wise cron fires a payout
 * for them. Confirms:
 *   - How much (USD collected → target currency at Wise's rate)
 *   - How many sales are included in the batch
 *   - Wise transfer ID (for their own reconciliation against Wise)
 *   - Settlement expectation (~1-2 business days)
 *
 * Best-effort: cron proceeds if this fails. The DB is already updated
 * with paid_out_at + wise_transfer_id, so the creator can also verify
 * from their dashboard.
 */
export async function sendWisePayoutConfirmation({
  to,
  name,
  sourceCents,
  targetAmount,
  targetCurrency,
  wiseTransferId,
  purchaseCount,
}: {
  to: string
  name?: string | null
  sourceCents: number
  targetAmount: number
  targetCurrency: string
  wiseTransferId: string
  purchaseCount: number
}) {
  if (!hasResend) return { skipped: true as const }

  const site = env.siteUrl.replace(/\/$/, '')
  const dashboard = `${site}/dashboard?view=selling`
  const payouts = `${site}/dashboard/payouts`

  const firstName = (name?.trim().split(/\s+/)[0] ?? '').trim()
  const greeting = firstName ? `Hi ${firstName},` : 'Hi,'
  const sourceUsd = (sourceCents / 100).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  const targetFormatted = targetAmount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  const cur = targetCurrency.toUpperCase()
  const salesPhrase =
    purchaseCount === 1
      ? '1 sale'
      : `${purchaseCount} sales`

  const subject = `Your Skillzy payout is on its way — ${cur} ${targetFormatted}`

  const html = `<!doctype html><html><body style="margin:0;background:#E8ECF0;font-family:Georgia,'Times New Roman',serif;color:#0F1729;">
    <div style="max-width:560px;margin:0 auto;padding:40px 28px;">
      ${brandHeaderHtml()}
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C19E50;margin:0;">Payout sent</p>
      <h1 style="font-size:34px;line-height:1.1;letter-spacing:-0.02em;margin:14px 0 0;">${cur} ${targetFormatted} is on its way.</h1>

      <p style="font-size:16px;color:#5F6B7E;margin:18px 0 0;line-height:1.55;">
        ${greeting} we've just fired your Skillzy payout via Wise. It usually lands in your account in <strong>1&ndash;2 business days</strong>.
      </p>

      <div style="margin:28px 0;padding:18px;background:#fff;border:1px solid #CCD2DD;">
        <table style="width:100%;border-collapse:collapse;font-family:Georgia,'Times New Roman',serif;font-size:15px;">
          <tr><td style="padding:6px 0;color:#5F6B7E;">Sales included</td><td style="padding:6px 0;text-align:right;">${salesPhrase}</td></tr>
          <tr><td style="padding:6px 0;color:#5F6B7E;">Collected (USD)</td><td style="padding:6px 0;text-align:right;">USD ${sourceUsd}</td></tr>
          <tr><td style="padding:10px 0 6px;color:#0F1729;font-weight:bold;border-top:1px solid #CCD2DD;">Sent to you</td><td style="padding:10px 0 6px;text-align:right;color:#C19E50;font-weight:bold;border-top:1px solid #CCD2DD;">${cur} ${targetFormatted}</td></tr>
          <tr><td style="padding:6px 0;color:#5F6B7E;font-size:13px;">Wise transfer ID</td><td style="padding:6px 0;text-align:right;font-family:monospace;font-size:13px;color:#5F6B7E;">${wiseTransferId}</td></tr>
        </table>
      </div>

      <p style="font-size:14px;color:#5F6B7E;margin:24px 0 0;line-height:1.55;">
        The USD amount is what your listings sold for (net of Skillzy's 20% + Wise transfer fees). The final amount you receive in ${cur} depends on Wise's mid-market rate at transfer time.
      </p>

      <p style="margin:28px 0 0;">
        <a href="${dashboard}" style="display:inline-block;background:#C19E50;color:#0F1729;font-weight:bold;text-decoration:none;padding:14px 22px;font-family:Georgia,'Times New Roman',serif;">Open your dashboard →</a>
      </p>

      <p style="font-size:14px;color:#5F6B7E;margin:24px 0 0;line-height:1.55;">
        Update your Wise details on <a href="${payouts}" style="color:#0F1729;">Payouts</a>. Track the transfer directly on <a href="https://wise.com/user/transactions" style="color:#0F1729;">wise.com</a>.
      </p>

      <hr style="border:none;border-top:1px solid #CCD2DD;margin:32px 0;" />
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#5F6B7E;margin:0;">Skillzy</p>
      <p style="font-size:12px;color:#5F6B7E;margin:6px 0 0;">A marketplace for agent skills.</p>
    </div>
  </body></html>`

  const text = `${greeting} your Skillzy payout is on its way.

Sales included: ${salesPhrase}
Collected (USD): USD ${sourceUsd}
Sent to you: ${cur} ${targetFormatted}
Wise transfer ID: ${wiseTransferId}

Usually lands in your account in 1-2 business days. The final amount in ${cur} depends on Wise's mid-market rate at transfer time.

Dashboard: ${dashboard}
Wise details: ${payouts}

— Skillzy`

  try {
    const res = await getResend().emails.send({
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
