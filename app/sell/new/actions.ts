'use server'

import { redirect } from 'next/navigation'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { hasSupabase } from '@/lib/env'
import { normalizeVideoUrl } from '@/lib/video'

export type PublishState = {
  error?: string
  info?: string
}

const BUCKET = 'skillzy-products'
const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50 MB per file (matches Supabase bucket cap)

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

// Sanitise a filename for use as a Storage path segment.
function safeName(name: string) {
  return name
    .replace(/[^A-Za-z0-9._-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .slice(0, 80)
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
  // Walkthrough video: we store the link only (never the file). Reject
  // anything not on the embed host allowlist instead of silently saving
  // a dead/unsafe URL.
  const videoUrl = normalizeVideoUrl(String(formData.get('video_url') ?? ''))

  // Optional AI-drafted extras (hidden inputs on the form).
  let description: string[] = []
  let whatYouGet: string[] = []
  try {
    const d = JSON.parse(String(formData.get('description') ?? '[]'))
    if (Array.isArray(d)) description = d.map(String).filter(Boolean)
  } catch {
    /* no-op */
  }
  try {
    const w = JSON.parse(String(formData.get('what_you_get') ?? '[]'))
    if (Array.isArray(w)) whatYouGet = w.map(String).filter(Boolean)
  } catch {
    /* no-op */
  }

  // Bundle files (zero or more). FormData.getAll preserves order.
  const rawBundle = formData.getAll('bundle')
  const bundle: File[] = rawBundle.filter(
    (entry): entry is File => entry instanceof File && entry.size > 0,
  )

  for (const f of bundle) {
    if (f.size > MAX_FILE_SIZE) {
      return { error: `${f.name} exceeds the 25 MB per-file limit.` }
    }
  }

  if (!title) return { error: 'Title is required.' }
  if (!tagline) return { error: 'Tagline is required.' }
  if (!Number.isFinite(price) || price <= 0) return { error: 'Set a price.' }
  if (
    description.some((d) => /ANTHROPIC_API_KEY|^\s*Demo draft/i.test(d))
  ) {
    return {
      error:
        'The AI draft did not generate. Write a short description before publishing.',
    }
  }
  const rawVideo = String(formData.get('video_url') ?? '').trim()
  if (rawVideo && !videoUrl) {
    return {
      error:
        'That video link isn’t supported. Use a Loom, YouTube, or Vimeo URL — or leave it blank.',
    }
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

  // 1. Create the listing row.
  const slug = `${slugify(title)}-${Date.now().toString(36).slice(-4)}`
  const { data: inserted, error } = await supabase
    .from('listings')
    .insert({
      creator_id: user!.id,
      slug,
      type,
      status: 'live',
      title,
      tagline,
      niche,
      price_cents: Math.round(price * 100),
      platform_list: platforms,
      description,
      what_you_get: whatYouGet,
    })
    .select('id')
    .single()

  if (error || !inserted) return { error: error?.message ?? 'Could not save listing.' }

  // 2. Upload any files to Storage at {creator_id}/{listing_id}/{file}
  //    and write a row in public.files for each. Uses the service-role
  //    client to bypass RLS for the writes.
  if (bundle.length > 0) {
    const admin = createServiceClient()
    for (const f of bundle) {
      const path = `${user!.id}/${inserted.id}/${safeName(f.name)}`
      const bytes = new Uint8Array(await f.arrayBuffer())
      const up = await admin.storage
        .from(BUCKET)
        .upload(path, bytes, {
          contentType: f.type || 'application/octet-stream',
          upsert: true,
        })
      if (up.error) {
        return { error: `Upload failed for ${f.name}: ${up.error.message}` }
      }
      const fileRow = await admin.from('files').insert({
        listing_id: inserted.id,
        name: f.name,
        storage_path: path,
        size_bytes: f.size,
      })
      if (fileRow.error) {
        return { error: `Could not record ${f.name}: ${fileRow.error.message}` }
      }
    }
  }

  // Email the creator their share kit (link + QR + promo) so it's in
  // their inbox too — never block the publish if mail fails.
  if (user!.email) {
    try {
      const { sendListingShareKit } = await import(
        '@/lib/email/listing-share-kit'
      )
      await sendListingShareKit({
        to: user!.email,
        title,
        tagline,
        slug,
        handle:
          (user!.user_metadata?.user_name as string | undefined) ||
          (user!.user_metadata?.preferred_username as string | undefined),
      })
    } catch (err) {
      console.error('share-kit email failed', err)
    }
  }

  redirect(`/sell/new/done?slug=${encodeURIComponent(slug)}`)
}
