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
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false
  return env.adminEmails.includes(email.toLowerCase())
}

export const hasSupabase = Boolean(env.supabase.url && env.supabase.anonKey)
export const hasStripe = Boolean(env.stripe.secretKey)
export const hasResend = Boolean(env.resend.apiKey)
export const hasAnthropic = Boolean(env.anthropic.apiKey)
