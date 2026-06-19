'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { hasSupabase } from '@/lib/env'

export type EditState = {
  error?: string
  info?: string
}

export type FilesState = {
  error?: string
  info?: string
}

const BUCKET = 'skillzy-products'
const MAX_FILE_SIZE = 50 * 1024 * 1024

function safeName(name: string) {
  return name
    .replace(/[^A-Za-z0-9._-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .slice(0, 80)
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
  if (!Number.isFinite(price) || price < 9)
    return { error: 'Minimum price is $9 (USD).' }

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

// Deletes one attached file: removes the Storage object, then the DB row.
// Ownership is enforced both by RLS (files policy joins to listings.creator_id)
// and by the explicit creator_id check on the listing.
export async function deleteListingFile(formData: FormData): Promise<void> {
  if (!hasSupabase) return
  const fileId = String(formData.get('fileId') ?? '')
  const listingSlug = String(formData.get('listingSlug') ?? '')
  if (!fileId || !listingSlug) return

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/signin')

  // Resolve storage path + verify creator owns the parent listing.
  const { data: row } = await supabase
    .from('files')
    .select('id, storage_path, listing_id, listings!inner ( creator_id )')
    .eq('id', fileId)
    .single()
  if (!row) return
  const listingJoin = row.listings as { creator_id?: string } | { creator_id?: string }[] | null
  const owner = Array.isArray(listingJoin)
    ? listingJoin[0]?.creator_id
    : listingJoin?.creator_id
  if (owner !== user!.id) return

  const admin = createServiceClient()
  await admin.storage.from(BUCKET).remove([row.storage_path])
  await admin.from('files').delete().eq('id', fileId)

  revalidatePath(`/dashboard/listings/${listingSlug}/edit`)
}

// Uploads one or more new files into the listing's bundle. Mirrors the
// pattern used in /sell/new (same storage path layout + DB schema) so a
// bundle edited here behaves identically to one uploaded at publish time.
export async function addListingFiles(
  _prev: FilesState,
  formData: FormData,
): Promise<FilesState> {
  if (!hasSupabase) return { info: 'Demo mode — files not saved.' }
  const listingId = String(formData.get('listingId') ?? '')
  const listingSlug = String(formData.get('listingSlug') ?? '')
  if (!listingId || !listingSlug) return { error: 'Missing listing id.' }

  const raw = formData.getAll('bundle')
  const files: File[] = raw.filter(
    (e): e is File => e instanceof File && e.size > 0,
  )
  if (files.length === 0) return { error: 'Pick at least one file to add.' }

  for (const f of files) {
    if (f.size > MAX_FILE_SIZE) {
      return { error: `${f.name} exceeds the 50 MB per-file limit.` }
    }
  }

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/signin')

  const { data: listing } = await supabase
    .from('listings')
    .select('id, creator_id')
    .eq('id', listingId)
    .eq('creator_id', user!.id)
    .single()
  if (!listing) return { error: 'Listing not found.' }

  const admin = createServiceClient()
  for (const f of files) {
    const path = `${user!.id}/${listing.id}/${safeName(f.name)}`
    const bytes = new Uint8Array(await f.arrayBuffer())
    const up = await admin.storage.from(BUCKET).upload(path, bytes, {
      contentType: f.type || 'application/octet-stream',
      upsert: true,
    })
    if (up.error) {
      return { error: `Upload failed for ${f.name}: ${up.error.message}` }
    }
    const fileRow = await admin.from('files').insert({
      listing_id: listing.id,
      name: f.name,
      storage_path: path,
      size_bytes: f.size,
    })
    if (fileRow.error) {
      return { error: `Could not record ${f.name}: ${fileRow.error.message}` }
    }
  }

  revalidatePath(`/dashboard/listings/${listingSlug}/edit`)
  return {
    info: `Added ${files.length} file${files.length === 1 ? '' : 's'}.`,
  }
}
