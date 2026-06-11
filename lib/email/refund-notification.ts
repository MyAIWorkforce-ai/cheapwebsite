import { Resend } from 'resend'
import { env, hasResend } from '@/lib/env'
import { brandHeaderHtml } from './brand'

// Refund notifications — three audiences, one module. Each function
// is silent if Resend isn't configured. Fired from the `charge.refunded`
// webhook in app/api/webhooks/stripe/route.ts.

let cached: Resend | null = null
function getResend() {
  if (!cached) cached = new Resend(env.resend.apiKey)
  return cached
}

function site() {
  return env.siteUrl.replace(/\/$/, '')
}

function money(cents: number, currency: string) {
  const cur = (currency || 'usd').toUpperCase()
  return `${cur} ${(cents / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

// 1. Buyer: "Your refund is on its way."
export async function sendBuyerRefundEmail({
  to,
  title,
  amountCents,
  currency,
  orderId,
}: {
  to: string
  title: string
  amountCents: number
  currency: string
  orderId: string
}) {
  if (!hasResend) return { skipped: true as const }
  const resend = getResend()
  const amount = money(amountCents, currency)
  const subject = `Your Skillzy refund — ${title}`

  const html = `<!doctype html><html><body style="margin:0;background:#E8ECF0;font-family:Georgia,'Times New Roman',serif;color:#0F1729;">
    <div style="max-width:560px;margin:0 auto;padding:40px 28px;">
      ${brandHeaderHtml()}
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C19E50;margin:0;">Refund</p>
      <h1 style="font-size:34px;line-height:1.1;letter-spacing:-0.02em;margin:14px 0 0;">Your refund is on its way.</h1>
      <p style="font-size:16px;color:#0F1729;margin:18px 0 0;line-height:1.55;">
        We've refunded <strong>${amount}</strong> for your purchase of <strong>${title}</strong>. It usually lands back on the same card within 3–10 business days, depending on your bank.
      </p>
      <div style="margin:24px 0;padding:18px;background:#fff;border:1px solid #CCD2DD;font-size:15px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px 0;color:#5F6B7E;">Listing</td><td style="padding:6px 0;text-align:right;">${title}</td></tr>
          <tr><td style="padding:6px 0;color:#5F6B7E;">Refund amount</td><td style="padding:6px 0;text-align:right;">${amount}</td></tr>
          <tr><td style="padding:6px 0;color:#5F6B7E;font-size:13px;">Order</td><td style="padding:6px 0;text-align:right;font-family:monospace;font-size:13px;color:#5F6B7E;">${orderId}</td></tr>
        </table>
      </div>
      <p style="font-size:14px;color:#5F6B7E;margin:24px 0 0;line-height:1.55;">
        Questions or something not right? Reply to this email or write to
        <a href="mailto:help@skillzy.ai" style="color:#5F6B7E;">help@skillzy.ai</a>.
      </p>
      <hr style="border:none;border-top:1px solid #CCD2DD;margin:32px 0;" />
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#5F6B7E;margin:0;">Skillzy</p>
      <p style="font-size:12px;color:#5F6B7E;margin:6px 0 0;">A marketplace for agent skills.</p>
    </div>
  </body></html>`

  const text = `Your Skillzy refund is on its way.

Listing: ${title}
Refund amount: ${amount}
Order: ${orderId}

Funds usually land back on the same card within 3–10 business days.

Questions? help@skillzy.ai`

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

// 2. Seller: "Heads up — refund on your sale of X."
export async function sendSellerRefundEmail({
  to,
  title,
  slug,
  amountCents,
  payoutCents,
  currency,
  orderId,
}: {
  to: string
  title: string
  slug: string
  amountCents: number
  payoutCents: number
  currency: string
  orderId: string
}) {
  if (!hasResend) return { skipped: true as const }
  const resend = getResend()
  const sale = money(amountCents, currency)
  const clawback = money(payoutCents, currency)
  const dashboard = `${site()}/dashboard?view=selling`
  const listing = `${site()}/marketplace/${slug}`
  const subject = `Refund issued on your sale of "${title}"`

  const html = `<!doctype html><html><body style="margin:0;background:#E8ECF0;font-family:Georgia,'Times New Roman',serif;color:#0F1729;">
    <div style="max-width:560px;margin:0 auto;padding:40px 28px;">
      ${brandHeaderHtml()}
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C19E50;margin:0;">Heads up</p>
      <h1 style="font-size:32px;line-height:1.1;letter-spacing:-0.02em;margin:14px 0 0;">A refund was issued on a sale.</h1>
      <p style="font-size:16px;color:#0F1729;margin:18px 0 0;line-height:1.55;">
        A buyer has been refunded for <strong>${title}</strong>. Stripe will reverse <strong>${clawback}</strong> from your next payout (or as a negative balance if there's nothing pending). This is automatic — you don't need to do anything.
      </p>
      <div style="margin:24px 0;padding:18px;background:#fff;border:1px solid #CCD2DD;font-size:15px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px 0;color:#5F6B7E;">Listing</td><td style="padding:6px 0;text-align:right;">${title}</td></tr>
          <tr><td style="padding:6px 0;color:#5F6B7E;">Original sale</td><td style="padding:6px 0;text-align:right;">${sale}</td></tr>
          <tr><td style="padding:6px 0;color:#5F6B7E;">Your share reversed</td><td style="padding:6px 0;text-align:right;color:#B91C1C;">−${clawback}</td></tr>
          <tr><td style="padding:6px 0;color:#5F6B7E;font-size:13px;">Order</td><td style="padding:6px 0;text-align:right;font-family:monospace;font-size:13px;color:#5F6B7E;">${orderId}</td></tr>
        </table>
      </div>
      <p style="font-size:16px;color:#0F1729;margin:24px 0 0;">
        <a href="${dashboard}" style="display:inline-block;background:#C19E50;color:#0F1729;font-weight:bold;text-decoration:none;padding:14px 22px;font-family:Georgia,'Times New Roman',serif;">Open your dashboard →</a>
      </p>
      <p style="font-size:14px;color:#5F6B7E;margin:24px 0 0;line-height:1.55;">
        Want context on why? Reply and we'll share what we know.
        Your listing is still live: <a href="${listing}" style="color:#5F6B7E;">${listing.replace(site() + '/', '/')}</a>.
      </p>
      <hr style="border:none;border-top:1px solid #CCD2DD;margin:32px 0;" />
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#5F6B7E;margin:0;">Skillzy</p>
    </div>
  </body></html>`

  const text = `A refund was issued on your sale of "${title}".

Original sale: ${sale}
Your share reversed: -${clawback}
Order: ${orderId}

Stripe will reverse this from your next payout automatically.

Dashboard: ${dashboard}`

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

// 3. Founder (sales@): refund happened — buyer + seller + amounts for
// pattern-watching (high refund rate per listing = quality problem).
export async function sendFounderRefundEmail({
  title,
  amountCents,
  currency,
  buyerEmail,
  sellerEmail,
  sellerHandle,
  orderId,
}: {
  title: string
  amountCents: number
  currency: string
  buyerEmail?: string | null
  sellerEmail?: string | null
  sellerHandle?: string | null
  orderId: string
}) {
  if (!hasResend) return { skipped: true as const }

  const sellerLabel = sellerHandle
    ? sellerEmail
      ? `@${sellerHandle} (${sellerEmail})`
      : `@${sellerHandle}`
    : sellerEmail

  const resend = getResend()
  const amount = money(amountCents, currency)
  const subject = `Refund: ${title} — ${amount}`

  const rows = [
    ['Listing', title],
    ['Refunded', amount],
    ['Buyer', buyerEmail],
    ['Seller', sellerLabel],
    ['Order', orderId],
  ]
    .filter(([, v]) => Boolean(v))
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 0;color:#5F6B7E;">${k}</td><td style="padding:6px 0;text-align:right;">${v}</td></tr>`,
    )
    .join('')

  const html = `<!doctype html><html><body style="margin:0;background:#E8ECF0;font-family:Georgia,'Times New Roman',serif;color:#0F1729;">
    <div style="max-width:560px;margin:0 auto;padding:40px 28px;">
      ${brandHeaderHtml()}
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C19E50;margin:0;">Refund</p>
      <h1 style="font-size:30px;line-height:1.15;letter-spacing:-0.02em;margin:12px 0 0;">A refund was processed.</h1>
      <div style="margin:24px 0;padding:18px;background:#fff;border:1px solid #CCD2DD;">
        <table style="width:100%;border-collapse:collapse;font-size:15px;">${rows}</table>
      </div>
      <p style="font-size:13px;color:#5F6B7E;margin:0;">Buyer + seller have both been emailed. Stripe handles the funds reversal automatically.</p>
    </div>
  </body></html>`

  const text = `Refund: ${title} — ${amount}. Buyer: ${buyerEmail ?? '—'}. Seller: ${sellerLabel ?? '—'}. Order ${orderId}.`

  try {
    const res = await resend.emails.send({
      from: `Skillzy AI <${env.resend.fromEmail}>`,
      to:
        process.env.NOTIFY_EMAIL_SALE?.trim() ||
        process.env.NOTIFY_EMAIL?.trim() ||
        env.resend.fromEmail,
      subject,
      html,
      text,
    })
    return { ok: true as const, id: res.data?.id ?? null }
  } catch (err) {
    return { ok: false as const, error: (err as Error).message }
  }
}
