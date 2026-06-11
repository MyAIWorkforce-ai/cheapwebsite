import { Resend } from 'resend'
import { env, hasResend } from '@/lib/env'
import { brandHeaderHtml } from './brand'

type Args = {
  to: string
  title: string
  purchaseId: string
  token: string
  variant: 'day3' | 'day7'
}

let cached: Resend | null = null
function getResend() {
  if (!cached) cached = new Resend(env.resend.apiKey)
  return cached
}

// Branded "rate your purchase" email. The 5 star buttons each link
// to /r/<purchaseId>?t=<token>&s=<n> — a click records the star
// immediately and lands the buyer on a page where they can optionally
// add a comment.
export async function sendReviewRequest({
  to,
  title,
  purchaseId,
  token,
  variant,
}: Args) {
  if (!hasResend) return { skipped: true as const }

  const site = env.siteUrl.replace(/\/$/, '')
  const baseUrl = `${site}/r/${purchaseId}?t=${encodeURIComponent(token)}`

  const star = (n: number, label: string) =>
    `<a href="${baseUrl}&s=${n}" style="display:inline-block;text-decoration:none;font-size:34px;line-height:1;padding:8px 10px;color:#C19E50;" title="${label}">★</a>`

  const stars = [
    star(1, 'Awful'),
    star(2, 'Meh'),
    star(3, 'OK'),
    star(4, 'Good'),
    star(5, 'Great'),
  ].join('')

  const subject =
    variant === 'day3'
      ? `How was "${title}"?`
      : `Quick favour — rate your Skillzy purchase`

  const intro =
    variant === 'day3'
      ? `Hope <strong>${title}</strong> is working for you. A quick rating helps other buyers and keeps the marketplace honest. One click below — or add a comment if you've got the time.`
      : `Still haven't rated <strong>${title}</strong>? One click is enough — we won't ask again after this.`

  const resend = getResend()

  const html = `<!doctype html><html><body style="margin:0;background:#E8ECF0;font-family:Georgia,'Times New Roman',serif;color:#0F1729;">
    <div style="max-width:560px;margin:0 auto;padding:40px 28px;">
      ${brandHeaderHtml()}
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C19E50;margin:0;">Rate your purchase</p>
      <h1 style="font-size:30px;line-height:1.15;letter-spacing:-0.02em;margin:14px 0 0;">${variant === 'day3' ? 'How was it?' : 'One last nudge.'}</h1>
      <p style="font-size:16px;color:#5F6B7E;margin:18px 0 0;line-height:1.55;">${intro}</p>

      <div style="margin:28px 0;padding:18px;background:#fff;border:1px solid #CCD2DD;text-align:center;">
        <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#5F6B7E;margin:0 0 10px;">Tap your rating</p>
        <p style="margin:0;">${stars}</p>
        <p style="margin:14px 0 0;">
          <a href="${baseUrl}" style="font-size:14px;color:#0F1729;text-decoration:underline;">… or leave a comment too</a>
        </p>
      </div>

      <hr style="border:none;border-top:1px solid #CCD2DD;margin:32px 0;" />
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#5F6B7E;margin:0;">Skillzy</p>
      <p style="font-size:12px;color:#5F6B7E;margin:6px 0 0;">A marketplace for agent skills.</p>
    </div>
  </body></html>`

  const text = `${variant === 'day3' ? 'How was it?' : 'One last nudge.'}

${intro.replace(/<\/?[^>]+>/g, '')}

1 star:  ${baseUrl}&s=1
2 stars: ${baseUrl}&s=2
3 stars: ${baseUrl}&s=3
4 stars: ${baseUrl}&s=4
5 stars: ${baseUrl}&s=5

Leave a comment too: ${baseUrl}
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
