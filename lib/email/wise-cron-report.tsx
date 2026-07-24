import { Resend } from 'resend'
import { env, hasResend } from '@/lib/env'
import { brandHeaderHtml } from './brand'
import { notifyTo } from './admin-notification'

let cached: Resend | null = null
function getResend() {
  if (!cached) cached = new Resend(env.resend.apiKey)
  return cached
}

export type WiseCronReport = {
  scanned: number
  paid: number
  skipped: number
  failed: number
  errors: Array<{ creatorId: string; reason: string }>
  totalPaidCents: number
  // Optional per-creator payment breakdown for the "paid" section.
  // Kept optional so future callers can send just the counts.
  payments?: Array<{
    creatorName?: string | null
    creatorHandle?: string | null
    amountCents: number
    currency: string
    wiseTransferId: string
  }>
}

/**
 * Post-run summary email sent to the founder inbox after every
 * nightly Wise cron. Silent on quiet nights (nothing paid + no
 * failures + no errors) so it isn't inbox noise. When something
 * happens, gives a clear one-glance snapshot + directs to the
 * admin dashboard for detail.
 *
 * Failures land as ⚠ with per-creator reasons so Toby knows
 * exactly what needs manual attention on Wise (usually
 * insufficient balance, rejected bank details, or a Wise API
 * hiccup that needs a retry from the admin panel).
 */
export async function sendWiseCronReport(report: WiseCronReport) {
  if (!hasResend) return { skipped: 'no-resend' as const }
  const hadFailures = report.failed > 0 || report.errors.length > 0
  const hadPayments = report.paid > 0
  // Silent on quiet nights — no email if nothing happened.
  if (!hadFailures && !hadPayments) return { skipped: 'quiet-night' as const }

  const site = env.siteUrl.replace(/\/$/, '')
  const adminUrl = `${site}/admin/dashboard`
  const wiseUrl = 'https://wise.com/user/transactions'

  const money = (c: number) =>
    'USD ' +
    (c / 100).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  // Subject signals the urgency at a glance — a failure night gets
  // ⚠ + count front-and-centre so it's obvious in the inbox list.
  const subject = hadFailures
    ? `⚠ Wise cron: ${report.failed} failure${report.failed === 1 ? '' : 's'}${
        hadPayments ? `, ${report.paid} paid` : ''
      }`
    : `Wise cron: ${money(report.totalPaidCents)} paid to ${
        report.paid
      } creator${report.paid === 1 ? '' : 's'}`

  const paidRows = (report.payments ?? [])
    .map(
      (p) => `
        <tr>
          <td style="padding:6px 8px;border-bottom:1px solid #E8ECF0;">${
            p.creatorName ?? p.creatorHandle ?? '—'
          }${p.creatorHandle ? ` <span style="color:#5F6B7E;">(@${p.creatorHandle.replace(/^@/, '')})</span>` : ''}</td>
          <td style="padding:6px 8px;border-bottom:1px solid #E8ECF0;text-align:right;font-family:monospace;">${p.currency.toUpperCase()} ${(p.amountCents / 100).toFixed(2)}</td>
          <td style="padding:6px 8px;border-bottom:1px solid #E8ECF0;font-family:monospace;font-size:12px;color:#5F6B7E;">${p.wiseTransferId}</td>
        </tr>`,
    )
    .join('')

  const errorRows = report.errors
    .map(
      (e) => `
        <tr>
          <td style="padding:6px 8px;border-bottom:1px solid #E8ECF0;font-family:monospace;font-size:12px;">${e.creatorId.slice(0, 8)}…</td>
          <td style="padding:6px 8px;border-bottom:1px solid #E8ECF0;color:#b91c1c;">${e.reason}</td>
        </tr>`,
    )
    .join('')

  const html = `<!doctype html><html><body style="margin:0;background:#E8ECF0;font-family:Georgia,'Times New Roman',serif;color:#0F1729;">
    <div style="max-width:620px;margin:0 auto;padding:40px 28px;">
      ${brandHeaderHtml()}
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${hadFailures ? '#b91c1c' : '#C19E50'};margin:0;">
        Wise cron report
      </p>
      <h1 style="font-size:28px;line-height:1.15;letter-spacing:-0.02em;margin:14px 0 0;">
        ${
          hadFailures
            ? `⚠ ${report.failed} failure${report.failed === 1 ? '' : 's'} need attention`
            : `${money(report.totalPaidCents)} paid to ${report.paid} creator${report.paid === 1 ? '' : 's'}`
        }
      </h1>

      <table style="width:100%;border-collapse:collapse;font-family:Georgia,serif;font-size:14px;margin:24px 0 0;">
        <tr>
          <td style="padding:6px 0;color:#5F6B7E;">Wise creators scanned</td>
          <td style="padding:6px 0;text-align:right;">${report.scanned}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#5F6B7E;">Paid this run</td>
          <td style="padding:6px 0;text-align:right;color:${report.paid > 0 ? '#C19E50' : '#0F1729'};">${report.paid}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#5F6B7E;">Skipped (below $50 threshold)</td>
          <td style="padding:6px 0;text-align:right;">${report.skipped}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#5F6B7E;">Failed (need retry)</td>
          <td style="padding:6px 0;text-align:right;color:${report.failed > 0 ? '#b91c1c' : '#0F1729'};font-weight:${report.failed > 0 ? 'bold' : 'normal'};">${report.failed}</td>
        </tr>
        <tr>
          <td style="padding:10px 0 6px;color:#0F1729;font-weight:bold;border-top:1px solid #CCD2DD;">Total moved</td>
          <td style="padding:10px 0 6px;text-align:right;color:#C19E50;font-weight:bold;border-top:1px solid #CCD2DD;">${money(report.totalPaidCents)}</td>
        </tr>
      </table>

      ${
        paidRows
          ? `
        <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C19E50;margin:32px 0 8px;">Paid out</p>
        <table style="width:100%;border-collapse:collapse;font-family:Georgia,serif;font-size:14px;border-top:1px solid #CCD2DD;">
          ${paidRows}
        </table>`
          : ''
      }

      ${
        errorRows
          ? `
        <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#b91c1c;margin:32px 0 8px;">⚠ Failures</p>
        <table style="width:100%;border-collapse:collapse;font-family:Georgia,serif;font-size:14px;border-top:1px solid #CCD2DD;">
          <tr>
            <th style="padding:6px 8px;text-align:left;background:#fef2f2;color:#5F6B7E;font-weight:normal;font-size:12px;">Creator</th>
            <th style="padding:6px 8px;text-align:left;background:#fef2f2;color:#5F6B7E;font-weight:normal;font-size:12px;">Reason</th>
          </tr>
          ${errorRows}
        </table>
        <p style="font-size:13px;color:#5F6B7E;margin:14px 0 0;line-height:1.5;">
          Common causes: <em>insufficient Wise balance</em> (top up Wise Business + retry from admin dashboard), <em>recipient rejected by bank</em> (creator needs to fix their bank details), <em>Wise API hiccup</em> (retry usually works).
        </p>`
          : ''
      }

      <p style="margin:32px 0 0;">
        <a href="${adminUrl}" style="display:inline-block;background:#0F1729;color:#fff;font-weight:bold;text-decoration:none;padding:12px 22px;font-family:Georgia,serif;">Open admin dashboard →</a>
        <a href="${wiseUrl}" style="display:inline-block;color:#0F1729;font-weight:bold;text-decoration:underline;padding:12px 0 12px 16px;font-family:Georgia,serif;">Wise transactions →</a>
      </p>

      <hr style="border:none;border-top:1px solid #CCD2DD;margin:32px 0;" />
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#5F6B7E;margin:0;">Skillzy admin · Wise nightly cron</p>
    </div>
  </body></html>`

  const text = `Wise cron report

Scanned: ${report.scanned}
Paid this run: ${report.paid}
Skipped (below $50 threshold): ${report.skipped}
Failed (need retry): ${report.failed}
Total moved: ${money(report.totalPaidCents)}
${
  paidRows
    ? '\nPAID OUT:\n' +
      (report.payments ?? [])
        .map(
          (p) =>
            `  · ${p.creatorName ?? p.creatorHandle ?? '—'} — ${p.currency.toUpperCase()} ${(p.amountCents / 100).toFixed(2)} (Wise transfer ${p.wiseTransferId})`,
        )
        .join('\n')
    : ''
}
${
  errorRows
    ? '\nFAILURES (need attention):\n' +
      report.errors.map((e) => `  · ${e.creatorId.slice(0, 8)}… — ${e.reason}`).join('\n') +
      '\n\nCommon causes: insufficient Wise balance / bad bank details / Wise API hiccup.'
    : ''
}

Admin dashboard: ${adminUrl}
Wise transactions: ${wiseUrl}
`

  try {
    const res = await getResend().emails.send({
      from: `Skillzy AI <${env.resend.fromEmail}>`,
      // Wise cron activity is founder-alert territory — use the
      // NOTIFY_EMAIL_SALE routing (defaults to sales@skillzy.ai)
      // which is the same inbox that already receives revenue alerts.
      to: notifyTo('NOTIFY_EMAIL_SALE'),
      subject,
      html,
      text,
    })
    return { ok: true as const, id: res.data?.id ?? null }
  } catch (err) {
    return { ok: false as const, error: (err as Error).message }
  }
}
