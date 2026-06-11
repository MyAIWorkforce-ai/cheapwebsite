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
 * Welcome email for every new Skillzy account — fires once per signup
 * (gated by an admin-only app_metadata flag so password retries and
 * subsequent sign-ins don't re-send). Creator-leaning since that's
 * who we're recruiting, but the second CTA covers buyers too.
 */
export async function sendWelcomeEmail({
  to,
  name,
}: {
  to: string
  name?: string | null
}) {
  if (!hasResend) return { skipped: true as const }

  const resend = getResend()
  const firstName = (name?.trim().split(/\s+/)[0] ?? '').trim()
  const greeting = firstName ? `Hi ${firstName},` : 'Welcome,'

  const payoutsUrl = `${site()}/dashboard/payouts`
  const sellUrl = `${site()}/sell/new`
  const marketplaceUrl = `${site()}/marketplace`

  const subject = `Welcome to Skillzy — your next step`

  const html = `<!doctype html><html><body style="margin:0;background:#E8ECF0;font-family:Georgia,'Times New Roman',serif;color:#0F1729;">
    <div style="max-width:560px;margin:0 auto;padding:40px 28px;">
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C19E50;margin:0;">Welcome</p>
      <h1 style="font-size:34px;line-height:1.1;letter-spacing:-0.02em;margin:14px 0 0;">You&rsquo;re in.</h1>

      <p style="font-size:16px;color:#0F1729;margin:20px 0 0;line-height:1.55;">
        ${greeting} thanks for joining Skillzy — a marketplace for AI agent skills, guides, and ready-to-go setups, made by humans, dropped into your agent.
      </p>

      <p style="font-size:16px;color:#0F1729;margin:24px 0 0;line-height:1.55;">
        Two ways to use it:
      </p>

      <div style="margin:20px 0 0;padding:20px;background:#fff;border:1px solid #CCD2DD;">
        <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C19E50;margin:0;">1 · Sell</p>
        <p style="font-size:16px;color:#0F1729;margin:8px 0 0;line-height:1.55;">
          Have a working skill, setup, or guide? Two quick steps to start earning:
        </p>
        <ul style="margin:10px 0 0;padding-left:18px;font-size:15px;color:#0F1729;line-height:1.6;">
          <li><strong>Connect Stripe</strong> so we can pay you. You keep 80% of every sale.</li>
          <li><strong>List your first item</strong> — drop a file in, our AI drafts it for you.</li>
        </ul>
        <p style="margin:16px 0 0;">
          <a href="${payoutsUrl}" style="display:inline-block;background:#C19E50;color:#0F1729;font-weight:bold;text-decoration:none;padding:12px 20px;font-family:Georgia,'Times New Roman',serif;margin-right:8px;">Connect Stripe →</a>
          <a href="${sellUrl}" style="display:inline-block;background:#fff;color:#0F1729;font-weight:bold;text-decoration:none;padding:12px 20px;font-family:Georgia,'Times New Roman',serif;border:1px solid #0F1729;">List a skill →</a>
        </p>
      </div>

      <div style="margin:16px 0 0;padding:20px;background:#fff;border:1px solid #CCD2DD;">
        <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C19E50;margin:0;">2 · Browse</p>
        <p style="font-size:16px;color:#0F1729;margin:8px 0 0;line-height:1.55;">
          Looking for a ready-made skill or setup instead? The marketplace has skills, guides, and full agent setups — drop them straight into Claude, ChatGPT, n8n, and more.
        </p>
        <p style="margin:16px 0 0;">
          <a href="${marketplaceUrl}" style="display:inline-block;color:#0F1729;font-weight:bold;text-decoration:underline;font-family:Georgia,'Times New Roman',serif;">Open the marketplace →</a>
        </p>
      </div>

      <p style="font-size:14px;color:#5F6B7E;margin:28px 0 0;line-height:1.55;">
        Got a question? Reply to this email — a human reads every one. Or write to <a href="mailto:help@skillzy.ai" style="color:#5F6B7E;">help@skillzy.ai</a>.
      </p>

      <hr style="border:none;border-top:1px solid #CCD2DD;margin:32px 0;" />
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#5F6B7E;margin:0;">Skillzy</p>
      <p style="font-size:12px;color:#5F6B7E;margin:6px 0 0;">A marketplace for agent skills.</p>
    </div>
  </body></html>`

  const text = `${greeting} welcome to Skillzy.

Two ways to use it:

1. SELL. Connect Stripe and list your first skill, guide, or setup.
   - Connect Stripe (you keep 80% of every sale): ${payoutsUrl}
   - List your first item: ${sellUrl}

2. BROWSE. Drop a ready-made skill into your agent (Claude, ChatGPT, n8n, …):
   ${marketplaceUrl}

Got a question? Reply to this email or write to help@skillzy.ai.

— Skillzy`

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
