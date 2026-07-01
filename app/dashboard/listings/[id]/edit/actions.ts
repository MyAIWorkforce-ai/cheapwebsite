'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import JSZip from 'jszip'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { env, hasSupabase } from '@/lib/env'

export type EditState = {
  error?: string
  info?: string
}

export type FilesState = {
  error?: string
  info?: string
}

export type RedraftResult = {
  error?: string
  draft?: {
    title: string
    tagline: string
    niche: string
    platforms: string[]
    description: string[]
    whatYouGet: string[]
  }
}

const BUCKET = 'skillzy-products'
const MAX_FILE_SIZE = 50 * 1024 * 1024
// Cap the brief we send the draft model so a giant bundle can't
// blow up the token bill or hit a context limit. ~100K chars ≈ 25k
// tokens — comfortably inside Haiku 4.5's context window.
const MAX_BRIEF_CHARS = 100_000
// File suffixes worth feeding the model. Anything else (PDFs,
// images, audio) is named-only so the model still knows it exists.
const TEXTUAL_SUFFIXES = [
  '.md',
  '.mdx',
  '.txt',
  '.json',
  '.yml',
  '.yaml',
  '.toml',
  '.csv',
  '.tsv',
  '.html',
  '.htm',
  '.xml',
  '.ini',
  '.env',
  '.js',
  '.ts',
  '.tsx',
  '.jsx',
  '.py',
  '.rb',
  '.go',
  '.sh',
]
// Internal-only files baked into house bundles. Reading these
// would just re-feed the existing listing copy back to the model
// and bias it toward a near-identical re-draft.
const INTERNAL_ONLY_BASENAMES = new Set([
  'listing_copy.md',
  'publish.md',
])

function safeName(name: string) {
  return name
    .replace(/[^A-Za-z0-9._-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .slice(0, 80)
}

function isTextual(name: string): boolean {
  const n = name.toLowerCase()
  return TEXTUAL_SUFFIXES.some((suf) => n.endsWith(suf))
}

function isInternal(name: string): boolean {
  return INTERNAL_ONLY_BASENAMES.has(name.toLowerCase().split('/').pop() ?? '')
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
  // Type is optional on this update — some legacy edit paths won't submit
  // it. When present it lets a creator reclassify (e.g. "this was really a
  // Skill, not a Full Agent Setup") without asking support.
  const rawType = String(formData.get('type') ?? '').trim()
  const type =
    rawType === 'skill' ||
    rawType === 'guide' ||
    rawType === 'agent_setup' ||
    rawType === 'prompt_pack' ||
    rawType === 'loop'
      ? rawType
      : null

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
      ...(type ? { type } : {}),
    })
    .eq('id', id)
    .eq('creator_id', user!.id)

  if (error) return { error: error.message }

  // Bust the caches that surface this listing so a title/type/price
  // change (or a status flip to removed) reflects immediately for
  // buyers + the creator's profile page. Best-effort — the ISR
  // windows still catch anything that misses here.
  try {
    revalidatePath('/marketplace')
    const { data: row } = await supabase
      .from('listings')
      .select('slug, profiles:creator_id ( handle )')
      .eq('id', id)
      .maybeSingle()
    const listingSlug = (row?.slug as string | null) ?? null
    if (listingSlug) revalidatePath(`/marketplace/${listingSlug}`)
    const profilesRaw = (row?.profiles as unknown) ?? null
    const profileHandle =
      Array.isArray(profilesRaw)
        ? ((profilesRaw[0] as { handle?: string | null } | undefined)?.handle ?? null)
        : ((profilesRaw as { handle?: string | null } | null)?.handle ?? null)
    if (profileHandle) revalidatePath(`/creator/${profileHandle.replace(/^@/, '')}`)
    revalidatePath('/dashboard')
  } catch {
    /* opportunistic */
  }

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

// Reads every attached file, extracts text (including from zips),
// and asks the listing-draft AI to suggest fresh title / tagline /
// niche / platforms / description / whatYouGet based on what's
// actually in the bundle. Used when the bundle changes shape and
// the existing copy may be stale.
//
// Internal-only files (LISTING_COPY.md, PUBLISH.md) are skipped —
// feeding the existing listing copy back would just produce a
// near-identical re-draft.
export async function redraftListingFromBundle(
  listingId: string,
  listingSlug: string,
): Promise<RedraftResult> {
  if (!hasSupabase) {
    return { error: 'Demo mode — Supabase not configured.' }
  }
  if (!listingId || !listingSlug) {
    return { error: 'Missing listing id.' }
  }

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Sign in to re-draft.' }

  const { data: listing } = await supabase
    .from('listings')
    .select('id, creator_id, type')
    .eq('id', listingId)
    .eq('creator_id', user!.id)
    .single()
  if (!listing) return { error: 'Listing not found.' }

  const { data: fileRows } = await supabase
    .from('files')
    .select('id, name, storage_path, size_bytes')
    .eq('listing_id', listing.id)
    .order('created_at', { ascending: true })
  if (!fileRows || fileRows.length === 0) {
    return { error: 'No attached files to read — upload the bundle first.' }
  }

  const admin = createServiceClient()
  const briefSections: string[] = []
  let totalChars = 0

  for (const row of fileRows) {
    if (totalChars >= MAX_BRIEF_CHARS) break
    const dl = await admin.storage.from(BUCKET).download(row.storage_path)
    if (dl.error || !dl.data) continue
    const bytes = new Uint8Array(await dl.data.arrayBuffer())
    const lowerName = (row.name as string).toLowerCase()

    if (lowerName.endsWith('.zip')) {
      try {
        const zip = await JSZip.loadAsync(bytes)
        const entries = Object.values(zip.files).filter((f) => !f.dir)
        for (const entry of entries) {
          if (totalChars >= MAX_BRIEF_CHARS) break
          if (isInternal(entry.name)) continue
          if (!isTextual(entry.name)) {
            briefSections.push(`--- ${entry.name} (binary, name only) ---`)
            continue
          }
          const text = await entry.async('string')
          const trimmed = text.slice(0, MAX_BRIEF_CHARS - totalChars)
          briefSections.push(`--- ${entry.name} ---\n${trimmed}`)
          totalChars += trimmed.length
        }
      } catch {
        briefSections.push(`--- ${row.name} (could not extract zip) ---`)
      }
      continue
    }

    if (isInternal(row.name as string)) continue

    if (!isTextual(row.name as string)) {
      briefSections.push(`--- ${row.name} (binary, name only) ---`)
      continue
    }
    const text = new TextDecoder().decode(bytes)
    const trimmed = text.slice(0, MAX_BRIEF_CHARS - totalChars)
    briefSections.push(`--- ${row.name} ---\n${trimmed}`)
    totalChars += trimmed.length
  }

  if (briefSections.length === 0) {
    return {
      error: 'Nothing readable in the bundle — check the attached files.',
    }
  }

  const brief = briefSections.join('\n\n')

  // Call the same draft endpoint /sell/new uses. Server-to-server
  // call inside the same Vercel deploy, so no public URL needed.
  // We resolve the host from the request origin via env — falling
  // back to a localhost dev URL.
  const site = env.siteUrl.replace(/\/$/, '')
  try {
    const res = await fetch(`${site}/api/listings/draft`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        brief,
        type: (listing.type as string) ?? 'agent_setup',
      }),
    })
    if (!res.ok) {
      const j = await res.json().catch(() => ({ error: 'Draft failed.' }))
      return {
        error: `Draft failed (${res.status}): ${j.error ?? 'unknown'}`,
      }
    }
    const draft = await res.json()
    return {
      draft: {
        title: String(draft.title ?? ''),
        tagline: String(draft.tagline ?? ''),
        niche: String(draft.niche ?? ''),
        platforms: Array.isArray(draft.platforms)
          ? draft.platforms.map(String)
          : [],
        description: Array.isArray(draft.description)
          ? draft.description.map(String)
          : [],
        whatYouGet: Array.isArray(draft.whatYouGet)
          ? draft.whatYouGet.map(String)
          : [],
      },
    }
  } catch (err) {
    return { error: (err as Error).message }
  }
}

// Saves a re-drafted set of fields onto the listing. Only writes
// the fields the user actually ticked to accept; the rest stay
// untouched. Mirrors the column set updateListing writes, plus the
// jsonb description + what_you_get columns the static catalogue
// also reads from.
export async function applyRedraft(
  _prev: EditState,
  formData: FormData,
): Promise<EditState> {
  if (!hasSupabase) return { info: 'Demo mode — nothing saved.' }
  const listingId = String(formData.get('listingId') ?? '')
  const listingSlug = String(formData.get('listingSlug') ?? '')
  if (!listingId || !listingSlug) return { error: 'Missing listing id.' }

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/signin')

  // Build the partial update from whichever fields the form ticked.
  const patch: Record<string, unknown> = {}
  const maybe = (key: string, value: unknown) => {
    if (formData.get(`accept_${key}`) === 'on') patch[key] = value
  }
  maybe('title', String(formData.get('title') ?? '').trim())
  maybe('tagline', String(formData.get('tagline') ?? '').trim())
  maybe('niche', String(formData.get('niche') ?? '').trim() || null)
  maybe(
    'platform_list',
    String(formData.get('platforms') ?? '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  )
  if (formData.get('accept_description') === 'on') {
    try {
      patch.description = JSON.parse(
        String(formData.get('description') ?? '[]'),
      )
    } catch {
      /* ignore — leave description untouched */
    }
  }
  if (formData.get('accept_whatYouGet') === 'on') {
    try {
      patch.what_you_get = JSON.parse(
        String(formData.get('whatYouGet') ?? '[]'),
      )
    } catch {
      /* ignore */
    }
  }

  if (Object.keys(patch).length === 0) {
    return { info: 'Nothing ticked — no changes applied.' }
  }

  const { error } = await supabase
    .from('listings')
    .update(patch)
    .eq('id', listingId)
    .eq('creator_id', user!.id)
  if (error) return { error: error.message }

  revalidatePath(`/dashboard/listings/${listingSlug}/edit`)
  return { info: `Applied ${Object.keys(patch).length} change${Object.keys(patch).length === 1 ? '' : 's'} from the re-draft.` }
}

// ---------- Promo codes ----------

export type PromoCodeState = {
  error?: string
  info?: string
}

/**
 * Create a free ("100% off") promo code for one of the creator's
 * listings. v1 is free-only — schema is shaped for percent-off later
 * without a migration.
 *
 * Code is normalised to uppercase and trimmed. Uniqueness is enforced
 * by the partial unique index (listing_id, upper(code)).
 */
export async function createPromoCode(
  _prev: PromoCodeState,
  formData: FormData,
): Promise<PromoCodeState> {
  if (!hasSupabase) return { info: 'Demo mode — code not saved.' }

  const listingId = String(formData.get('listingId') ?? '').trim()
  const listingSlug = String(formData.get('listingSlug') ?? '').trim()
  const codeRaw = String(formData.get('code') ?? '').trim().toUpperCase()
  const maxRedemptionsRaw = String(formData.get('maxRedemptions') ?? '').trim()
  const maxRedemptions = maxRedemptionsRaw ? Number(maxRedemptionsRaw) : null

  if (!listingId || !listingSlug) return { error: 'Missing listing id.' }
  if (!codeRaw) return { error: 'Pick a code.' }
  if (codeRaw.length > 40) return { error: 'Code is too long (40 chars max).' }
  if (!/^[A-Z0-9_-]+$/.test(codeRaw))
    return { error: 'Use letters, numbers, dashes, underscores only.' }
  if (maxRedemptions !== null && (!Number.isInteger(maxRedemptions) || maxRedemptions < 1))
    return { error: 'Max redemptions must be a whole number ≥ 1.' }

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/signin?next=/dashboard/listings')

  // Verify ownership before inserting.
  const { data: listing } = await supabase
    .from('listings')
    .select('id')
    .eq('id', listingId)
    .eq('creator_id', user!.id)
    .single()
  if (!listing) return { error: 'Listing not found.' }

  const { error } = await supabase.from('listing_promo_codes').insert({
    listing_id: listing.id,
    code: codeRaw,
    discount_type: 'free',
    max_redemptions: maxRedemptions,
    active: true,
  })

  if (error) {
    // Likely the unique constraint — surface a friendlier message.
    if (error.message?.toLowerCase().includes('unique') || error.code === '23505')
      return { error: `Code "${codeRaw}" already exists on this listing.` }
    return { error: error.message }
  }

  revalidatePath(`/dashboard/listings/${listingSlug}/edit`)
  return {
    info: `Code ${codeRaw} created — ${
      maxRedemptions ? `${maxRedemptions} redemptions` : 'unlimited'
    }, 100% off.`,
  }
}

/**
 * Soft-delete: mark a code inactive. Keeps audit trail of past
 * redemptions. RLS plus the explicit creator_id check below double-
 * gate ownership.
 */
export async function deactivatePromoCode(formData: FormData): Promise<void> {
  if (!hasSupabase) return
  const codeId = String(formData.get('codeId') ?? '').trim()
  const listingSlug = String(formData.get('listingSlug') ?? '').trim()
  if (!codeId || !listingSlug) return

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/signin')

  const { data: row } = await supabase
    .from('listing_promo_codes')
    .select('id, listings!inner ( creator_id )')
    .eq('id', codeId)
    .single()
  if (!row) return
  const listing = row.listings as { creator_id?: string } | { creator_id?: string }[] | null
  const owner = Array.isArray(listing) ? listing[0]?.creator_id : listing?.creator_id
  if (owner !== user!.id) return

  await supabase
    .from('listing_promo_codes')
    .update({ active: false })
    .eq('id', codeId)

  revalidatePath(`/dashboard/listings/${listingSlug}/edit`)
}
