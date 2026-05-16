'use server'

import { createClient } from '@/lib/supabase/server'
import { env, hasSupabase } from '@/lib/env'

export type NewsletterState = {
  ok?: boolean
  error?: string
}

/**
 * Newsletter sign-up. Order of preference:
 *   1. Beehiiv (if BEEHIIV_API_KEY + BEEHIIV_PUBLICATION_ID set) —
 *      the growth/sending platform. We also mirror into Supabase so
 *      the list is always owned + portable.
 *   2. Resend Audience (if RESEND_AUDIENCE_ID set).
 *   3. Supabase public.subscribers table.
 *   4. Demo mode — acknowledge without storing.
 *
 * `source` (hidden field on every form: footer / slidein / free:<id>
 * / blog) is passed through so signups can be attributed.
 */
async function mirrorToSupabase(email: string, source: string) {
  if (!hasSupabase) return
  try {
    const supabase = createClient()
    const { error } = await supabase
      .from('subscribers')
      .insert({ email, source })
    if (error && error.code !== '23505') {
      console.error('subscribers mirror:', error.message)
    }
  } catch (err) {
    console.error('subscribers mirror threw:', err)
  }
}

export async function subscribeToNewsletter(
  _prev: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const source = String(formData.get('source') ?? 'footer').slice(0, 60)
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { error: 'Enter a valid email.' }
  }

  // 1. Beehiiv (preferred — handles sending + growth tooling).
  const beehiivKey = process.env.BEEHIIV_API_KEY
  const beehiivPub = process.env.BEEHIIV_PUBLICATION_ID
  if (beehiivKey && beehiivPub) {
    try {
      const res = await fetch(
        `https://api.beehiiv.com/v2/publications/${beehiivPub}/subscriptions`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${beehiivKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            reactivate_existing: true,
            send_welcome_email: true,
            utm_source: 'skillzy',
            utm_medium: source,
          }),
        },
      )
      if (!res.ok && res.status !== 409) {
        const body = await res.text()
        return {
          error: `Couldn’t add you (${res.status}). ${body.slice(0, 120)}`,
        }
      }
      await mirrorToSupabase(email, source)
      return { ok: true }
    } catch (err) {
      return { error: (err as Error).message }
    }
  }

  // 2. Resend Audience.
  const audienceId = process.env.RESEND_AUDIENCE_ID
  if (audienceId && env.resend.apiKey) {
    try {
      const res = await fetch(
        `https://api.resend.com/audiences/${audienceId}/contacts`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${env.resend.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, unsubscribed: false }),
        },
      )
      if (!res.ok && res.status !== 409) {
        const body = await res.text()
        return {
          error: `Couldn’t add you (${res.status}). ${body.slice(0, 120)}`,
        }
      }
      await mirrorToSupabase(email, source)
      return { ok: true }
    } catch (err) {
      return { error: (err as Error).message }
    }
  }

  // 3. Supabase only.
  if (hasSupabase) {
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('subscribers')
        .insert({ email, source })
      if (error && error.code !== '23505') {
        return { error: error.message }
      }
      return { ok: true }
    } catch (err) {
      return { error: (err as Error).message }
    }
  }

  // 4. Demo mode.
  return { ok: true }
}
