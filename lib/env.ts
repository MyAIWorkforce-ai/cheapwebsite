// Centralised, type-safe access to env vars.
// Missing keys are allowed — the code that reads them falls back to mock mode.

export const env = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',

  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  },

  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  },

  resend: {
    apiKey: process.env.RESEND_API_KEY || '',
    fromEmail: process.env.EMAIL_FROM || process.env.RESEND_FROM_EMAIL || 'hi@skillzy.ai',
  },

  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY || '',
    model: process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001',
  },

  // Comma-separated emails allowed into /admin and admin endpoints.
  adminEmails: (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean),

  // Optional shared secret for cron endpoints (Vercel Cron sends it).
  cronSecret: process.env.CRON_SECRET || '',

  // Wise Business API — used by /api/cron/wise-payouts to pay creators
  // in the ~115 countries Stripe Connect doesn't reach. Absence of any
  // of these makes the Wise cron a no-op (safe on preview/dev, and
  // safe on prod until the Wise Business account approval lands).
  wise: {
    apiToken: process.env.WISE_API_TOKEN || '',
    // Numeric ID of the Wise business profile that owns the balance
    // funds are sent from. Get this from Wise dashboard → Settings.
    profileId: process.env.WISE_PROFILE_ID || '',
    // Point at 'https://api.sandbox.transferwise.tech' during dev and
    // 'https://api.wise.com' in production. Default is production so a
    // forgotten env var in prod doesn't accidentally hit sandbox.
    apiUrl: process.env.WISE_API_URL || 'https://api.wise.com',
    // Payout threshold — creators whose pending Wise balance crosses
    // this fire on the next nightly cron. Override for testing.
    payoutThresholdCents: Number(
      process.env.WISE_PAYOUT_THRESHOLD_CENTS || 50 * 100,
    ),
  },
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false
  return env.adminEmails.includes(email.toLowerCase())
}

export const hasSupabase = Boolean(env.supabase.url && env.supabase.anonKey)
export const hasStripe = Boolean(env.stripe.secretKey)
export const hasResend = Boolean(env.resend.apiKey)
export const hasAnthropic = Boolean(env.anthropic.apiKey)
// Full Wise integration requires both the API token AND the profile
// ID (transfers are always sent FROM a specific profile). Missing
// either makes the cron a no-op so nothing silently breaks.
export const hasWise = Boolean(env.wise.apiToken && env.wise.profileId)
