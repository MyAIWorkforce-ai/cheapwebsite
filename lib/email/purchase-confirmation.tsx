import { Resend } from 'resend'
import { env, hasResend } from '@/lib/env'
import type { Product } from '@/lib/catalog'

type Args = {
  to: string
  product: Product
  orderId: string
  // No-login page that re-verifies the payment and serves fresh
  // download links every visit. Preferred over embedding links that
  // expire before the buyer opens the email.
  downloadPageUrl?: string
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
  downloadPageUrl,
}: Args) {
  if (!hasResend) return { skipped: true as const }

  const resend = getResend()
  const subject = `Your Skillzy order — ${product.title}`

  const downloadUrl = downloadPageUrl ?? `${env.siteUrl}/dashboard`

  const html = `<!doctype html>
  <html>
  <body style="margin:0;padding:32px;background:#E8ECF0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0F1729;">
    <div style="max-width:560px;margin:0 auto;background:#F2F4F8;border:1px solid #CCD2DD;padding:32px;">
      <div style="font-family:'Times New Roman',serif;font-size:44px;line-height:1.05;letter-spacing:-1.2px;color:#0F1729;">
        You&rsquo;re all set.
      </div>
      <p style="margin:24px 0 0;font-size:16px;line-height:1.5;color:#0F1729;">
        Order <strong>№${orderId}</strong>. Your purchase is ready.
      </p>
      <div style="margin-top:24px;padding:16px;background:#FFFFFF;border:1px solid #CCD2DD;">
        <div style="font-family:'Times New Roman',serif;font-size:22px;line-height:1.2;">${product.title}</div>
        <div style="font-size:13px;color:#5F6B7E;margin-top:4px;">${product.type} · by ${product.creator.name}</div>
      </div>
      <p style="margin-top:24px;">
        <a href="${downloadUrl}" style="display:inline-block;background:#C19E50;color:#0F1729;font-weight:600;text-decoration:none;padding:14px 28px;font-size:15px;">Download your files →</a>
      </p>
      <p style="margin-top:20px;font-size:13px;color:#5F6B7E;line-height:1.5;">
        This link re-checks your order and gives you fresh download links
        every time, so it keeps working — no sign-in needed. Bookmark it
        to re-download any time.
      </p>
      <p style="margin-top:32px;font-size:13px;color:#5F6B7E;">
        Questions? Reply to this email or write to
        <a href="mailto:help@skillzy.ai" style="color:#5F6B7E;">help@skillzy.ai</a>.
      </p>
      <p style="margin-top:32px;font-size:12px;color:#5F6B7E;border-top:1px solid #CCD2DD;padding-top:16px;">
        Skillzy — a marketplace for agent skills.
      </p>
    </div>
  </body>
  </html>`

  const text = `You're all set.\n\nOrder ${orderId}\n\n${product.title}\n${product.type} · by ${product.creator.name}\n\nDownload your files (no sign-in needed, keeps working):\n${downloadUrl}\n\nQuestions? help@skillzy.ai`

  return resend.emails.send({
    from: `Skillzy AI <${env.resend.fromEmail}>`,
    to,
    subject,
    html,
    text,
  })
}
