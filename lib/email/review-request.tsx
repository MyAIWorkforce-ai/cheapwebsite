import { Resend } from 'resend'
import { env, hasResend } from '@/lib/env'
import { brandHeaderHtml } from './brand'

type ListingType = 'skill' | 'guide' | 'agent_setup' | string

type Args = {
  to: string
  title: string
  type?: ListingType
  creatorHandle?: string | null
  purchaseId: string
  token: string
  variant: 'day3' | 'day7'
}

let cached: Resend | null = null
function getResend() {
  if (!cached) cached = new Resend(env.resend.apiKey)
  return cached
}

// Map the DB type enum to the word we write in the body. Lowercase,
// natural sentence flow ("hope the skill works" / "hope the agent setup works").
function typeWord(t?: ListingType): string {
  if (t === 'guide') return 'guide'
  if (t === 'agent_setup') return 'agent setup'
  if (t === 'skill') return 'skill'
  return 'listing'
}

/**
 * Branded "rate your purchase" email. The 5 star buttons each link to
 * /r/<purchaseId>?t=<token>&s=<n>. A single click in the email pre-records
 * the star rating the moment the buyer lands on the page (useEffect in
 * ReviewForm) — so even if they immediately close the tab, the rating
 * counts. The honest framing: Skillzy is new, real reviews from real
 * buyers are how the marketplace grows.
 */
export async function sendReviewRequest({
  to,
  title,
  type,
  creatorHandle,
  purchaseId,
  token,
  variant,
}: Args) {
  if (!hasResend) return { skipped: true as const }

  const site = env.siteUrl.replace(/\/$/, '')
  const baseUrl = `${site}/r/${purchaseId}?t=${encodeURIComponent(token)}`
  const word = typeWord(type)
  const cleanHandle = (creatorHandle ?? '').replace(/^@/, '').trim()
  const by = cleanHandle ? ` by <strong>@${cleanHandle}</strong>` : ''
  const byText = cleanHandle ? ` by @${cleanHandle}` : ''

  const star = (n: number, label: string) =>
    `<a href="${baseUrl}&s=${n}" style="display:inline-block;text-decoration:none;font-size:42px;line-height:1;padding:8px 10px;color:#C19E50;" title="${label}">★</a>`

  const stars = [
    star(1, '1 star'),
    star(2, '2 stars'),
    star(3, '3 stars'),
    star(4, '4 stars'),
    star(5, '5 stars'),
  ].join('')

  // Subject + headline differ between the day-3 first ask and the
  // day-7 last-chance nudge.
  const subject =
    variant === 'day3'
      ? `How was the ${word} "${title}"? (10 seconds)`
      : `Last call — rate "${title}"`
  const headline =
    variant === 'day3' ? 'How did it go?' : 'One last nudge.'

  // Day-3 body: warm thanks, honest "we're new + your review really
  // matters" framing, one-tap CTA.
  const day3Body = `<p style="font-size:16px;color:#0F1729;margin:18px 0 0;line-height:1.55;">
        Hi,
      </p>
      <p style="font-size:16px;color:#0F1729;margin:14px 0 0;line-height:1.55;">
        Thanks for picking up the ${word} <strong>${title}</strong>${by} on Skillzy. Hope it's already doing the job in your agent.
      </p>
      <p style="font-size:15px;color:#0F1729;margin:18px 0 0;line-height:1.6;">
        Honest ask: Skillzy is new, and the marketplace runs on reviews from buyers like you. Your rating decides which listings get found, which creators get featured, and how fast Skillzy grows into something worth coming back to. A single tap — under 10 seconds — makes a real difference.
      </p>`

  // Day-7 body: short last-chance, same gratitude tone, no guilt.
  const day7Body = `<p style="font-size:16px;color:#0F1729;margin:18px 0 0;line-height:1.55;">
        Hi,
      </p>
      <p style="font-size:16px;color:#0F1729;margin:14px 0 0;line-height:1.55;">
        Quick last nudge — we never got your rating for <strong>${title}</strong>${by}. One tap helps the creator${cleanHandle ? ` (@${cleanHandle})` : ''} and helps Skillzy point the next buyer at the right thing.
      </p>
      <p style="font-size:14px;color:#5F6B7E;margin:14px 0 0;line-height:1.55;">
        Won't bug you again after this. Thanks for being one of the early ones.
      </p>`

  const body = variant === 'day3' ? day3Body : day7Body

  const html = `<!doctype html><html><body style="margin:0;background:#E8ECF0;font-family:Georgia,'Times New Roman',serif;color:#0F1729;">
    <div style="max-width:560px;margin:0 auto;padding:40px 28px;">
      ${brandHeaderHtml()}
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C19E50;margin:0;">Rate your purchase</p>
      <h1 style="font-size:32px;line-height:1.15;letter-spacing:-0.02em;margin:14px 0 0;">${headline}</h1>
      ${body}

      <div style="margin:32px 0;padding:22px;background:#fff;border:1px solid #CCD2DD;text-align:center;">
        <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#5F6B7E;margin:0 0 14px;">Tap your rating</p>
        <p style="margin:0;line-height:1;">${stars}</p>
        <p style="margin:18px 0 0;font-size:13px;color:#5F6B7E;">
          One tap is enough. <a href="${baseUrl}" style="color:#0F1729;text-decoration:underline;">Add a sentence too</a> if you have a minute — honest is better than polished.
        </p>
      </div>

      <hr style="border:none;border-top:1px solid #CCD2DD;margin:32px 0;" />
      <p style="font-size:13px;color:#5F6B7E;margin:0;line-height:1.55;">
        Thanks,<br/>The Skillzy team
      </p>
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#5F6B7E;margin:18px 0 0;">Skillzy</p>
      <p style="font-size:12px;color:#5F6B7E;margin:4px 0 0;">A marketplace for agent skills, made by humans.</p>
    </div>
  </body></html>`

  // Plain-text fallback.
  const introText =
    variant === 'day3'
      ? `Hi,

Thanks for picking up the ${word} "${title}"${byText} on Skillzy. Hope it's already doing the job in your agent.

Honest ask: Skillzy is new, and the marketplace runs on reviews from buyers like you. Your rating decides which listings get found, which creators get featured, and how fast Skillzy grows into something worth coming back to. A single tap — under 10 seconds — makes a real difference.`
      : `Hi,

Quick last nudge — we never got your rating for "${title}"${byText}. One tap helps the creator${cleanHandle ? ` (@${cleanHandle})` : ''} and helps Skillzy point the next buyer at the right thing.

Won't bug you again after this. Thanks for being one of the early ones.`

  const text = `${headline}

${introText}

Tap your rating:
1 star:  ${baseUrl}&s=1
2 stars: ${baseUrl}&s=2
3 stars: ${baseUrl}&s=3
4 stars: ${baseUrl}&s=4
5 stars: ${baseUrl}&s=5

Add a sentence too: ${baseUrl}

Thanks,
The Skillzy team
`

  const resend = getResend()
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
