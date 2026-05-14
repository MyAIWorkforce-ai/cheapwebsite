/**
 * GET /api/download/:purchaseId
 *
 * Authenticates the buyer, verifies the purchase is paid, then issues
 * short-lived signed URLs for every file attached to the purchased
 * listing. Returns JSON:
 *
 *   { ok: true, listing: { title, slug }, files: [{ name, url, size_bytes }] }
 *
 * Signed URLs expire after 1 hour. Caller is expected to fetch them
 * immediately. Receipt-email links should go through this route, not
 * embed long-lived URLs directly.
 */
import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { hasSupabase } from '@/lib/env'

const BUCKET = 'skillzy-products'
const SIGNED_URL_TTL_SECONDS = 60 * 60

export const runtime = 'nodejs'

export async function GET(
  _req: Request,
  { params }: { params: { purchaseId: string } },
) {
  if (!hasSupabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
  }

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Sign in to download' }, { status: 401 })
  }

  // Verify ownership + paid status. RLS already restricts purchases to
  // buyer or creator; we add explicit status + id checks for clarity.
  const { data: purchase, error } = await supabase
    .from('purchases')
    .select(
      `
      id,
      status,
      buyer_id,
      listing_id,
      listings:listing_id ( id, slug, title )
    `,
    )
    .eq('id', params.purchaseId)
    .single()

  if (error || !purchase) {
    return NextResponse.json({ error: 'Purchase not found' }, { status: 404 })
  }
  if (purchase.buyer_id !== user.id) {
    return NextResponse.json({ error: 'Not your purchase' }, { status: 403 })
  }
  if (purchase.status !== 'paid') {
    return NextResponse.json(
      { error: `Purchase status is ${purchase.status}; downloads paused.` },
      { status: 403 },
    )
  }

  // Fetch the file rows for this listing using service-role (files.read
  // policy is creator-only; buyers don't have direct access).
  const admin = createServiceClient()
  const { data: files, error: filesError } = await admin
    .from('files')
    .select('name, storage_path, size_bytes')
    .eq('listing_id', purchase.listing_id)

  if (filesError) {
    return NextResponse.json({ error: filesError.message }, { status: 500 })
  }
  if (!files || files.length === 0) {
    return NextResponse.json(
      {
        ok: true,
        listing: extractListing(purchase),
        files: [],
        note: 'No files attached yet — the creator may still be uploading.',
      },
    )
  }

  const signed = await Promise.all(
    files.map(async (f) => {
      const { data, error: signErr } = await admin.storage
        .from(BUCKET)
        .createSignedUrl(f.storage_path, SIGNED_URL_TTL_SECONDS, {
          download: f.name,
        })
      return {
        name: f.name,
        size_bytes: f.size_bytes,
        url: data?.signedUrl ?? null,
        error: signErr?.message,
      }
    }),
  )

  return NextResponse.json({
    ok: true,
    listing: extractListing(purchase),
    files: signed,
    expiresInSeconds: SIGNED_URL_TTL_SECONDS,
  })
}

// Supabase nests joined rows as an array sometimes; flatten safely.
function extractListing(
  purchase: { listings?: unknown },
): { id: string; slug: string; title: string } | null {
  const l = purchase.listings as
    | { id: string; slug: string; title: string }
    | { id: string; slug: string; title: string }[]
    | null
    | undefined
  if (!l) return null
  if (Array.isArray(l)) return l[0] ?? null
  return l
}
