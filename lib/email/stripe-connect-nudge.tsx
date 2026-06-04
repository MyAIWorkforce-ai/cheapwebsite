import { Resend } from 'resend'
import { env, hasResend } from '@/lib/env'

let cached: Resend | null = null
function getResend() {
  if (!cached) cached = new Resend(env.resend.apiKey)
  return cached
}

function site() {
  return env.siteUrl.replace(/\/$/, '')
}

/**
 * 24h+ follow-up nudge for creators who published a paid listing
 * without connecting Stripe. Buyers see "not buyable yet" instead of
 * a Buy button, so the creator is earning $0 until they connect.
 * Fired once per creator from the /api/cron/stripe-nudge cron job;
 * idempotency is enforced via the app_metadata.stripe_nudge_sent_at
 * timestamp set by the cron after each send.
 */
export async function sendStripeConnectNudge({
  to,
  name,
  listingCount,
}: {
  to: string
  name?: string | null
  listingCount: number
}) {
  if (!hasResend) return { skipped: true as const }

  const resend = getResend()
  const firstName = (name?.trim().split(/\s+/)[0] ?? '').trim()
  const greeting = firstName ? `Hi ${firstName},` : 'Hi,'
  const listingPhrase =
    listingCount === 1 ? 'your listing is' : `your ${listingCount} listings are`
  const subject =
    listingCount === 1
      ? `Your Skillzy listing isn't earning yet`
      : `Your Skillzy listings aren't earning yet`

  const payoutsUrl = `${site()}/dashboard/payouts`

  const html = `<!doctype html><html><body style="margin:0;background:#E8ECF0;font-family:Georgia,'Times New Roman',serif;color:#0F1729;">
    <div style="max-width:560px;margin:0 auto;padding:40px 28px;">
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C19E50;margin:0;">60 seconds</p>
      <h1 style="font-size:34px;line-height:1.1;letter-spacing:-0.02em;margin:14px 0 0;">${
        listingCount === 1
          ? "You're earning $0 on this one."
          : "You're earning $0 on these."
      }</h1>

      <p style="font-size:16px;color:#0F1729;margin:20px 0 0;line-height:1.55;">
        ${greeting} ${listingPhrase} live on Skillzy — but buyers see
        a <em>&ldquo;not buyable yet&rdquo;</em> message instead of a
        checkout button, because your Stripe account isn&rsquo;t connected.
      </p>

      <p style="font-size:16px;color:#0F1729;margin:20px 0 0;line-height:1.55;">
        Connecting takes about 60 seconds. You keep <strong>80%</strong> of every sale; Stripe pays you direct on its normal settlement schedule. We never hold your money.
      </p>

      <p style="margin:28px 0 0;">
        <a href="${payoutsUrl}" style="display:inline-block;background:#C19E50;color:#0F1729;font-weight:bold;text-decoration:none;padding:14px 24px;font-family:Georgia,'Times New Roman',serif;">Connect Stripe →</a>
      </p>

      <p style="font-size:14px;color:#5F6B7E;margin:28px 0 0;line-height:1.55;">
        The moment Stripe says you&rsquo;re live, the Buy button flips on for every listing automatically — no re-publish needed.
      </p>

      <p style="font-size:14px;color:#5F6B7E;margin:24px 0 0;line-height:1.55;">
        Need a hand or hit a snag? Reply to this email or write to <a href="mailto:help@skillzy.ai" style="color:#5F6B7E;">help@skillzy.ai</a>.
      </p>

      <hr style="border:none;border-top:1px solid #CCD2DD;margin:32px 0;" />
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#5F6B7E;margin:0;">Skillzy</p>
      <p style="font-size:12px;color:#5F6B7E;margin:6px 0 0;">A marketplace for agent skills.</p>
    </div>
  </body></html>`

  const text = `${greeting} ${listingPhrase} live on Skillzy, but buyers see "not buyable yet" — Stripe isn't connected, so you're earning $0.

Connect Stripe (60 seconds): ${payoutsUrl}

You keep 80% of every sale. Stripe pays you direct.

Need help? help@skillzy.ai

— Skillzy`

  try {
    const res = await resend.emails.send({
      from: `Skillzy <${env.resend.fromEmail}>`,
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
