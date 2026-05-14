'use server'

import { createClient } from '@/lib/supabase/server'
import { env, hasSupabase } from '@/lib/env'

export type NewsletterState = {
  ok?: boolean
  error?: string
}

/**
 * Newsletter sign-up. Two storage paths:
 *   1. If RESEND_AUDIENCE_ID is configured, add to that Resend audience.
 *   2. Otherwise, insert into the public.subscribers table in Supabase.
 * Either path succeeds → returns ok. Demo mode (no Supabase + no audience)
 * returns ok without storing so the form still feels real.
 */
export async function subscribeToNewsletter(
  _prev: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { error: 'Enter a valid email.' }
  }

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
      if (!res.ok) {
        // Treat already-subscribed as success.
        if (res.status === 409) return { ok: true }
        const body = await res.text()
        return { error: `Couldn’t add you (${res.status}). ${body.slice(0, 120)}` }
      }
      return { ok: true }
    } catch (err) {
      return { error: (err as Error).message }
    }
  }

  if (hasSupabase) {
    try {
      const supabase = createClient()
      const { error } = await supabase.from('subscribers').insert({ email })
      // duplicate email = success from the user's POV
      if (error && error.code !== '23505') {
        return { error: error.message }
      }
      return { ok: true }
    } catch (err) {
      return { error: (err as Error).message }
    }
  }

  // Demo mode: nothing to store, but acknowledge.
  return { ok: true }
}
