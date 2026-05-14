import { Resend } from 'resend'
import { env, hasResend } from '@/lib/env'
import type { Product } from '@/lib/catalog'

type Args = {
  to: string
  product: Product
  orderId: string
  downloadUrls?: { name: string; url: string }[]
}

let cached: Resend | null = null
function getResend() {
  if (!cached) cached = new Resend(env.resend.apiKey)
  return cached
}

export async function sendPurchaseConfirmation({
  to,
  product,
  orderId,
  downloadUrls,
}: Args) {
  if (!hasResend) return { skipped: true as const }

  const resend = getResend()
  const subject = `Plugged in — ${product.title}`

  const downloads = (downloadUrls ?? [
    { name: `${product.id}.bundle.zip`, url: `${env.siteUrl}/dashboard` },
    { name: 'setup-guide.pdf', url: `${env.siteUrl}/dashboard` },
  ])
    .map(
      (f) =>
        `<li style="margin: 8px 0;"><a href="${f.url}" style="color:#C19E50;text-decoration:none;border-bottom:1px solid #C19E50;">${f.name}</a></li>`,
    )
    .join('')

  const html = `<!doctype html>
  <html>
  <body style="margin:0;padding:32px;background:#E8ECF0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0F1729;">
    <div style="max-width:560px;margin:0 auto;background:#F2F4F8;border:1px solid #CCD2DD;padding:32px;">
      <div style="font-family:'Times New Roman',serif;font-size:48px;line-height:1;letter-spacing:-1.5px;color:#0F1729;">
        Plugged in. <em style="color:#C19E50;">Done.</em>
      </div>
      <p style="margin:24px 0 0;font-size:16px;line-height:1.5;color:#0F1729;">
        Order <strong>№${orderId}</strong>. Below are your files. They also live
        on your <a href="${env.siteUrl}/dashboard" style="color:#0F1729;border-bottom:1px solid #0F1729;text-decoration:none;">Skillzy dashboard</a>, re-downloadable forever.
      </p>
      <div style="margin-top:24px;padding:16px;background:#FFFFFF;border:1px solid #CCD2DD;">
        <div style="font-family:'Times New Roman',serif;font-size:22px;line-height:1.2;">${product.title}</div>
        <div style="font-size:13px;color:#5F6B7E;margin-top:4px;">${product.type} · by ${product.creator.name}</div>
        <ul style="margin:16px 0 0;padding-left:18px;font-size:14px;">${downloads}</ul>
      </div>
      <p style="margin-top:32px;font-size:13px;color:#5F6B7E;">
        Questions? Reply to this email or write to
        <a href="mailto:hi@skillzy.ai" style="color:#5F6B7E;">hi@skillzy.ai</a>.
      </p>
      <p style="margin-top:32px;font-size:12px;color:#5F6B7E;border-top:1px solid #CCD2DD;padding-top:16px;">
        Skillzy — a marketplace for agent skills.
      </p>
    </div>
  </body>
  </html>`

  const text = `Plugged in. Done.\n\nOrder ${orderId}\n\n${product.title}\n${product.type} · by ${product.creator.name}\n\nDownloads (also on your dashboard at ${env.siteUrl}/dashboard):\n${(downloadUrls ?? [{ name: `${product.id}.bundle.zip`, url: '' }]).map((f) => `• ${f.name} ${f.url}`).join('\n')}\n\nQuestions? hi@skillzy.ai`

  return resend.emails.send({
    from: `Skillzy <${env.resend.fromEmail}>`,
    to,
    subject,
    html,
    text,
  })
}
