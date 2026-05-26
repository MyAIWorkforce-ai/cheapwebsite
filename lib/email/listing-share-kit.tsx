import { Resend } from 'resend'
import { env, hasResend } from '@/lib/env'

type Args = {
  to: string
  title: string
  tagline: string
  slug: string
  handle?: string
}

let cached: Resend | null = null
function getResend() {
  if (!cached) cached = new Resend(env.resend.apiKey)
  return cached
}

// Sent to the creator the moment they submit a listing. Mirrors the
// on-site success screen + dashboard kit so the link/QR/promo also
// lives in their inbox. Channel-tagged c=email so email-driven sales
// attribute correctly.
export async function sendListingShareKit({
  to,
  title,
  tagline,
  slug,
  handle,
}: Args) {
  if (!hasResend) return { skipped: true as const }

  const site = env.siteUrl.replace(/\/$/, '')
  const ref = handle ? `&ref=${encodeURIComponent(handle.replace(/^@/, ''))}` : ''
  const link = `${site}/marketplace/${slug}?c=email${ref}`
  const qr = `${site}/marketplace/${slug}/qr?c=email${ref}`
  const dashboard = `${site}/dashboard?view=selling`
  // On-site share screen — has real one-tap Copy buttons (email itself
  // can't run the clipboard JS, so we send creators here to copy).
  const kit = `${site}/sell/new/done?slug=${encodeURIComponent(slug)}`

  const shortPromo = `Just listed "${title}" on Skillzy — ${tagline} Drop it into your agent: ${link}`

  const resend = getResend()
  const subject = `You're listed — here's your link & QR for "${title}"`

  const html = `<!doctype html><html><body style="margin:0;background:#E8ECF0;font-family:Georgia,'Times New Roman',serif;color:#0F1729;">
    <div style="max-width:560px;margin:0 auto;padding:40px 28px;">
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C19E50;margin:0;">Submitted</p>
      <h1 style="font-size:34px;line-height:1.1;letter-spacing:-0.02em;margin:14px 0 0;">You're listed. Now go sell it.</h1>
      <p style="font-size:16px;color:#5F6B7E;margin:18px 0 0;">
        <strong>${title}</strong> is in review — a human checks first listings within 24 hours, then it goes live. You earn the same 80% whether Skillzy sends the buyer or you do, so send them. Everything below has your referral baked in.
      </p>

      <div style="margin:28px 0;padding:18px;background:#fff;border:1px solid #CCD2DD;">
        <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#5F6B7E;margin:0 0 8px;">Your link</p>
        <a href="${link}" style="font-family:monospace;font-size:14px;color:#0F1729;word-break:break-all;">${link}</a>
      </div>

      <div style="text-align:center;margin:28px 0;">
        <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#5F6B7E;margin:0 0 12px;">Your QR — save it, print it, stick it on the van</p>
        <img src="${qr}" alt="QR code to your listing" width="220" height="220" style="border:1px solid #CCD2DD;background:#fff;padding:10px;" />
      </div>

      <div style="margin:28px 0;padding:18px;background:#fff;border:1px solid #CCD2DD;">
        <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#5F6B7E;margin:0 0 8px;">Copy &amp; paste this</p>
        <p style="font-size:14px;line-height:1.5;margin:0;">${shortPromo}</p>
      </div>

      <p style="margin:16px 0 0;">
        <a href="${kit}" style="background:#0F1729;color:#fff;font-weight:bold;text-decoration:none;padding:12px 22px;display:inline-block;">Open your share kit — one-tap copy →</a>
      </p>
      <p style="font-size:12px;color:#5F6B7E;margin:8px 0 0;">Email can&rsquo;t copy text for you — tap above to open your kit on Skillzy, where one tap copies your link or the ready-made post.</p>

      <p style="font-size:14px;color:#5F6B7E;margin:24px 0 0;">
        <strong>Post it in the first 24 hours:</strong> Instagram bio + a story with the QR · LinkedIn · X · Facebook trade groups · your email signature · WhatsApp to past clients · printed on a card or the van. The creators who sell most are the ones who posted everywhere in week one.
      </p>

      <p style="margin:32px 0 0;">
        <a href="${dashboard}" style="background:#C19E50;color:#0F1729;font-weight:bold;text-decoration:none;padding:12px 22px;display:inline-block;">Go to your dashboard →</a>
      </p>

      <p style="font-size:12px;color:#5F6B7E;border-top:1px solid #CCD2DD;margin:32px 0 0;padding-top:16px;">
        Skillzy — built by humans, dropped into your agent. Questions? <a href="mailto:hi@skillzy.ai" style="color:#5F6B7E;">hi@skillzy.ai</a>
      </p>
    </div>
  </body></html>`

  const text = `You're listed. Now go sell it.

"${title}" is in review (live within ~24h). You earn 80% whether Skillzy sends the buyer or you do — so send them.

Your link: ${link}
Your QR:   ${qr}

Copy & paste:
${shortPromo}

One-tap copy buttons (link + ready-made post): ${kit}

Post it everywhere in week one — IG bio + story QR, LinkedIn, X, FB groups, email signature, WhatsApp, printed on the van.

Dashboard: ${dashboard}

Skillzy — hi@skillzy.ai`

  return resend.emails.send({
    from: `Skillzy <${env.resend.fromEmail}>`,
    to,
    subject,
    html,
    text,
  })
}
