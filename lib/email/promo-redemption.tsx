import { Resend } from 'resend'
import { env, hasResend } from '@/lib/env'
import { brandHeaderHtml } from './brand'

type Args = {
  to: string
  title: string
  slug: string
  code: string | null
  buyerEmail: string | null
  orderId: string
  // 'promo' = a promo code redemption, 'free' = a free-listing claim.
  // The two paths are operationally identical (zero-cost purchase row,
  // signed download link) but the seller copy reads better when we
  // name the actual mechanism.
  kind: 'promo' | 'free'
}

let cached: Resend | null = null
function getResend() {
  if (!cached) cached = new Resend(env.resend.apiKey)
  return cached
}

/**
 * Notify the seller (and CC sales@skillzy.ai for founder visibility)
 * when a buyer redeems a promo code or claims a free listing. Separate
 * from the paid-sale email so the "Your 80%: $0.00" math doesn't show
 * up — the copy here owns the "no money, but somebody just used your
 * code" narrative.
 */
export async function sendPromoRedemptionNotification({
  to,
  title,
  slug,
  code,
  buyerEmail,
  orderId,
  kind,
}: Args) {
  if (!hasResend) return { skipped: true as const }

  const site = env.siteUrl.replace(/\/$/, '')
  const dashboard = `${site}/dashboard?view=selling`
  const listing = `${site}/marketplace/${slug}`

  const resend = getResend()
  const headline =
    kind === 'promo'
      ? code
        ? `Promo code "${code}" redeemed on "${title}"`
        : `A promo code was redeemed on "${title}"`
      : `Someone claimed your free listing "${title}"`
  const subject = headline

  const buyerLine = buyerEmail
    ? `Buyer: <strong>${buyerEmail}</strong>`
    : 'Buyer email not captured.'
  const codeLine = code
    ? `Code redeemed: <strong style="font-family:monospace">${code}</strong>`
    : ''

  const html = `<!doctype html><html><body style="margin:0;background:#E8ECF0;font-family:Georgia,'Times New Roman',serif;color:#0F1729;">
    <div style="max-width:560px;margin:0 auto;padding:40px 28px;">
      ${brandHeaderHtml()}
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C19E50;margin:0;">${kind === 'promo' ? 'Promo redeemed' : 'Free claim'}</p>
      <h1 style="font-size:30px;line-height:1.15;letter-spacing:-0.02em;margin:14px 0 0;">${headline}</h1>
      <p style="font-size:16px;color:#5F6B7E;margin:18px 0 0;">
        ${buyerLine}<br/>
        ${codeLine ? `${codeLine}<br/>` : ''}
        Order: <span style="font-family:monospace;">${orderId}</span>
      </p>

      <p style="font-size:16px;color:#0F1729;margin:28px 0 0;">
        <a href="${dashboard}" style="display:inline-block;background:#C19E50;color:#0F1729;font-weight:bold;text-decoration:none;padding:14px 22px;font-family:Georgia,'Times New Roman',serif;">Open your dashboard →</a>
      </p>

      <p style="font-size:14px;color:#5F6B7E;margin:24px 0 0;line-height:1.55;">
        Listing: <a href="${listing}" style="color:#0F1729;">${listing.replace(site + '/', '/')}</a>.
        The buyer already has the bundle — confirmation email + download link sent.
      </p>

      <hr style="border:none;border-top:1px solid #CCD2DD;margin:32px 0;" />
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#5F6B7E;margin:0;">Skillzy</p>
      <p style="font-size:12px;color:#5F6B7E;margin:6px 0 0;">A marketplace for agent skills.</p>
    </div>
  </body></html>`

  const text = `${headline}

${buyerEmail ? `Buyer: ${buyerEmail}\n` : ''}${code ? `Code: ${code}\n` : ''}Order: ${orderId}

Dashboard: ${dashboard}
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
