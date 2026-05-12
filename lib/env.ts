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
    fromEmail: process.env.RESEND_FROM_EMAIL || 'hello@skillzy.com',
  },
}

export const hasSupabase = Boolean(env.supabase.url && env.supabase.anonKey)
export const hasStripe = Boolean(env.stripe.secretKey)
export const hasResend = Boolean(env.resend.apiKey)
