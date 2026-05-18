import { Resend } from 'resend'
import { env, hasResend } from '@/lib/env'

let cached: Resend | null = null
function getResend() {
  if (!cached) cached = new Resend(env.resend.apiKey)
  return cached
}

type Args = {
  productTitle: string
  listingId: string
  buyerEmail?: string | null
  referrer?: string | null
}

/**
 * Internal heads-up: a buyer tried to purchase a demo/sample listing.
 * Demo listings have no files to deliver, so the buyer is shown a
 * "no longer available" message — this email is purely a demand
 * signal for us (which samples people actually want to buy).
 *
 * Goes to ADMIN_EMAILS if configured, else the Skillzy inbox so it
 * still lands somewhere we read before that env var is set.
 */
export async function sendDemoInterestNotification({
  productTitle,
  listingId,
  buyerEmail,
  referrer,
}: Args) {
  if (!hasResend) return { skipped: true as const }

  const resend = getResend()
  const to = env.adminEmails.length ? env.adminEmails : [env.resend.fromEmail]
  const when = new Date().toUTCString()

  const subject = `Demo listing interest — ${productTitle}`

  const rows = [
    ['Listing', productTitle],
    ['Listing ID', listingId],
    ['Buyer email', buyerEmail || '— (not signed in)'],
    ['Referrer', referrer || '—'],
    ['When', when],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#5F6B7E;font-size:13px;">${k}</td><td style="padding:6px 0;font-size:14px;color:#0F1729;">${v}</td></tr>`,
    )
    .join('')

  const html = `<!doctype html>
  <html>
  <body style="margin:0;padding:32px;background:#E8ECF0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0F1729;">
    <div style="max-width:560px;margin:0 auto;background:#F2F4F8;border:1px solid #CCD2DD;padding:32px;">
      <div style="font-family:'Times New Roman',serif;font-size:32px;line-height:1.1;letter-spacing:-1px;">
        Someone tried to buy a sample.
      </div>
      <p style="margin:20px 0 0;font-size:15px;line-height:1.5;">
        A visitor clicked buy on a demo/sample listing (no file to
        deliver, so they were shown a “no longer available” message).
        Logging it as a demand signal.
      </p>
      <table style="margin-top:20px;border-collapse:collapse;">${rows}</table>
      <p style="margin-top:28px;font-size:12px;color:#5F6B7E;border-top:1px solid #CCD2DD;padding-top:16px;">
        Skillzy — internal notification.
      </p>
    </div>
  </body>
  </html>`

  const text = `Someone tried to buy a sample listing.

Listing: ${productTitle}
Listing ID: ${listingId}
Buyer email: ${buyerEmail || '— (not signed in)'}
Referrer: ${referrer || '—'}
When: ${when}

(No file to deliver — buyer shown "no longer available".)`

  return resend.emails.send({
    from: `Skillzy <${env.resend.fromEmail}>`,
    to,
    subject,
    html,
    text,
  })
}
