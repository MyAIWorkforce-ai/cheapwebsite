'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { hasSupabase } from '@/lib/env'

export type PublishState = {
  error?: string
  info?: string
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

export async function publishListing(
  _prev: PublishState,
  formData: FormData,
): Promise<PublishState> {
  const title = String(formData.get('title') ?? '').trim()
  const tagline = String(formData.get('tagline') ?? '').trim()
  const type = String(formData.get('type') ?? 'skill') as
    | 'skill'
    | 'guide'
    | 'agent_setup'
  const price = Number(formData.get('price') ?? 0)
  const niche = String(formData.get('niche') ?? '').trim() || null
  const platforms = String(formData.get('platforms') ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  if (!title) return { error: 'Title is required.' }
  if (!tagline) return { error: 'Tagline is required.' }
  if (!Number.isFinite(price) || price <= 0) return { error: 'Set a price.' }

  if (!hasSupabase) {
    return {
      info: 'Demo mode — listing not actually published. Set Supabase env vars to persist.',
    }
  }

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect('/signin?next=/sell/new')
  }

  const { error } = await supabase.from('listings').insert({
    creator_id: user!.id,
    slug: `${slugify(title)}-${Date.now().toString(36).slice(-4)}`,
    type,
    status: 'pending_review',
    title,
    tagline,
    niche,
    price_cents: Math.round(price * 100),
    platform_list: platforms,
  })

  if (error) return { error: error.message }

  redirect('/dashboard?view=selling&submitted=1')
}
