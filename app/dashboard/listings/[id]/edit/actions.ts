'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { hasSupabase } from '@/lib/env'

export type EditState = {
  error?: string
  info?: string
}

export async function updateListing(
  _prev: EditState,
  formData: FormData,
): Promise<EditState> {
  const id = String(formData.get('id') ?? '')
  if (!id) return { error: 'Missing listing id.' }

  const title = String(formData.get('title') ?? '').trim()
  const tagline = String(formData.get('tagline') ?? '').trim()
  const price = Number(formData.get('price') ?? 0)
  const niche = String(formData.get('niche') ?? '').trim() || null
  const platforms = String(formData.get('platforms') ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const status = String(formData.get('status') ?? 'live') as
    | 'live'
    | 'pending_review'
    | 'removed'

  if (!title) return { error: 'Title is required.' }
  if (!Number.isFinite(price) || price <= 0) return { error: 'Set a price.' }

  if (!hasSupabase) {
    return { info: 'Demo mode — change not saved.' }
  }

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/signin?next=/dashboard/listings')

  const { error } = await supabase
    .from('listings')
    .update({
      title,
      tagline,
      price_cents: Math.round(price * 100),
      niche,
      platform_list: platforms,
      status,
    })
    .eq('id', id)
    .eq('creator_id', user!.id)

  if (error) return { error: error.message }

  redirect('/dashboard?view=selling&saved=1')
}
