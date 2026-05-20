'use server'

import { redirect } from 'next/navigation'
import { randomBytes } from 'node:crypto'
import { createClient } from '@/lib/supabase/server'
import { hasSupabase } from '@/lib/env'

export type PublishState = {
  error?: string
  info?: string
}

const ALLOWED_TYPES = new Set(['skill', 'guide', 'agent_setup'])
const MIN_PRICE = 1
const MAX_PRICE = 999

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
  const title = String(formData.get('title') ?? '').trim().slice(0, 120)
  const tagline = String(formData.get('tagline') ?? '').trim().slice(0, 240)
  const typeRaw = String(formData.get('type') ?? 'skill')
  const type = (ALLOWED_TYPES.has(typeRaw) ? typeRaw : 'skill') as
    | 'skill'
    | 'guide'
    | 'agent_setup'
  const price = Number(formData.get('price') ?? 0)
  const niche = String(formData.get('niche') ?? '').trim().slice(0, 60) || null
  const platforms = String(formData.get('platforms') ?? '')
    .split(',')
    .map((s) => s.trim().slice(0, 40))
    .filter(Boolean)
    .slice(0, 10)

  if (!title) return { error: 'Title is required.' }
  if (!tagline) return { error: 'Tagline is required.' }
  if (!Number.isFinite(price) || price < MIN_PRICE || price > MAX_PRICE) {
    return { error: `Price must be between $${MIN_PRICE} and $${MAX_PRICE}.` }
  }

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

  // 8 random hex chars makes slug collisions effectively impossible even
  // under concurrent submissions.
  const suffix = randomBytes(4).toString('hex')
  const { error } = await supabase.from('listings').insert({
    creator_id: user!.id,
    slug: `${slugify(title)}-${suffix}`,
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
