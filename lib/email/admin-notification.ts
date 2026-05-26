import { Resend } from 'resend'
import { env, hasResend } from '@/lib/env'

// Internal "keep the team in the loop" notifications — sent to Skillzy
// itself (the from address, hi@skillzy.ai by default) whenever a new
// account signs up or a new listing goes live. Especially useful early
// on. Never blocks the user-facing flow; failures are swallowed by the
// caller's try/catch.

let cached: Resend | null = null
function getResend() {
  if (!cached) cached = new Resend(env.resend.apiKey)
  return cached
}

// Where the alerts land. Defaults to the Skillzy from address.
function notifyTo() {
  return process.env.NOTIFY_EMAIL || env.resend.fromEmail
}

function site() {
  return env.siteUrl.replace(/\/$/, '')
}

function shell(eyebrow: string, heading: string, bodyHtml: string) {
  return `<!doctype html><html><body style="margin:0;background:#E8ECF0;font-family:Georgia,'Times New Roman',serif;color:#0F1729;">
    <div style="max-width:560px;margin:0 auto;padding:40px 28px;">
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C19E50;margin:0;">${eyebrow}</p>
      <h1 style="font-size:30px;line-height:1.15;letter-spacing:-0.02em;margin:12px 0 0;">${heading}</h1>
      ${bodyHtml}
    </div>
  </body></html>`
}

export async function sendNewUserNotification({
  email,
  name,
  handle,
}: {
  email?: string | null
  name?: string | null
  handle?: string | null
}) {
  if (!hasResend) return { skipped: true as const }
  const resend = getResend()

  const rows = [
    ['Email', email],
    ['Name', name],
    ['Handle', handle ? `@${handle}` : null],
  ]
    .filter(([, v]) => Boolean(v))
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 0;color:#5F6B7E;">${k}</td><td style="padding:6px 0;text-align:right;">${v}</td></tr>`,
    )
    .join('')

  const html = shell(
    'New signup',
    'A new account just joined.',
    `<div style="margin:24px 0;padding:18px;background:#fff;border:1px solid #CCD2DD;">
      <table style="width:100%;border-collapse:collapse;font-size:15px;">${rows}</table>
    </div>
    <p style="font-size:14px;color:#5F6B7E;margin:0;">Creators page: ${site()}/creator/${handle ?? ''}</p>`,
  )

  const text = `New Skillzy signup.\nEmail: ${email ?? '—'}\nName: ${name ?? '—'}\nHandle: ${handle ? '@' + handle : '—'}`

  try {
    const res = await resend.emails.send({
      from: `Skillzy <${env.resend.fromEmail}>`,
      to: notifyTo(),
      subject: `New signup${email ? `: ${email}` : ''}`,
      html,
      text,
    })
    return { ok: true as const, id: res.data?.id ?? null }
  } catch (err) {
    return { ok: false as const, error: (err as Error).message }
  }
}

export async function sendNewListingNotification({
  title,
  slug,
  type,
  priceCents,
  currency = 'usd',
  creatorEmail,
  creatorHandle,
}: {
  title: string
  slug: string
  type: string
  priceCents: number
  currency?: string
  creatorEmail?: string | null
  creatorHandle?: string | null
}) {
  if (!hasResend) return { skipped: true as const }
  const resend = getResend()

  const cur = (currency || 'usd').toUpperCase()
  const price = `${cur} ${(priceCents / 100).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
  const listingUrl = `${site()}/marketplace/${slug}`

  const rows = [
    ['Title', title],
    ['Type', type],
    ['Price', price],
    ['Creator', creatorHandle ? `@${creatorHandle}` : creatorEmail],
  ]
    .filter(([, v]) => Boolean(v))
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 0;color:#5F6B7E;">${k}</td><td style="padding:6px 0;text-align:right;">${v}</td></tr>`,
    )
    .join('')

  const html = shell(
    'New listing',
    'A new listing just went live.',
    `<div style="margin:24px 0;padding:18px;background:#fff;border:1px solid #CCD2DD;">
      <table style="width:100%;border-collapse:collapse;font-size:15px;">${rows}</table>
    </div>
    <p style="font-size:14px;color:#5F6B7E;margin:0;">View it: ${listingUrl}</p>`,
  )

  const text = `New Skillzy listing: ${title} (${type}), ${price}.\nCreator: ${creatorHandle ? '@' + creatorHandle : creatorEmail ?? '—'}\n${listingUrl}`

  try {
    const res = await resend.emails.send({
      from: `Skillzy <${env.resend.fromEmail}>`,
      to: notifyTo(),
      subject: `New listing: ${title}`,
      html,
      text,
    })
    return { ok: true as const, id: res.data?.id ?? null }
  } catch (err) {
    return { ok: false as const, error: (err as Error).message }
  }
}

export async function sendDemoBuyAttemptNotification({
  title,
  id,
  email,
}: {
  title: string
  id: string
  email?: string | null
}) {
  if (!hasResend) return { skipped: true as const }
  const resend = getResend()

  const rows = [
    ['Listing', title],
    ['Listing ID', id],
    ['Tried by', email],
  ]
    .filter(([, v]) => Boolean(v))
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 0;color:#5F6B7E;">${k}</td><td style="padding:6px 0;text-align:right;">${v}</td></tr>`,
    )
    .join('')

  const html = shell(
    'Demand signal',
    'Someone tried to buy a sample listing.',
    `<div style="margin:24px 0;padding:18px;background:#fff;border:1px solid #CCD2DD;">
      <table style="width:100%;border-collapse:collapse;font-size:15px;">${rows}</table>
    </div>
    <p style="font-size:14px;color:#5F6B7E;margin:0;">This is a non-buyable demo — worth prioritising a real version, or recruiting a creator to fill it.</p>`,
  )

  const text = `Someone tried to buy the sample listing "${title}" (${id})${email ? ` — ${email}` : ''}. Non-buyable demo — a demand signal worth acting on.`

  try {
    const res = await resend.emails.send({
      from: `Skillzy <${env.resend.fromEmail}>`,
      to: notifyTo(),
      subject: `Buy attempt on sample: ${title}`,
      html,
      text,
    })
    return { ok: true as const, id: res.data?.id ?? null }
  } catch (err) {
    return { ok: false as const, error: (err as Error).message }
  }
}
