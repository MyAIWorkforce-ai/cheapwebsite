import { createServiceClient } from '@/lib/supabase/server'
import { hasSupabase } from '@/lib/env'

const BUCKET = 'skillzy-products'
const SIGNED_URL_TTL_SECONDS = 60 * 60

export type DeliveryFile = {
  name: string
  url: string
  sizeBytes: number | null
}

/**
 * Signed, short-lived download URLs for every file attached to a
 * listing. Used by the post-payment success page and the confirmation
 * email's download page — both no-login, because the caller has
 * already proven the purchase via a succeeded Stripe PaymentIntent.
 *
 * Returns [] when Supabase is unconfigured or the listing has no files
 * (seed/demo listings have none). Callers must render a graceful
 * "being prepared" state rather than dead links in that case.
 */
export async function listingFiles(
  listingId: string,
): Promise<DeliveryFile[]> {
  if (!hasSupabase) return []
  try {
    const admin = createServiceClient()
    const { data: files, error } = await admin
      .from('files')
      .select('name, storage_path, size_bytes')
      .eq('listing_id', listingId)
    if (error || !files || files.length === 0) return []

    const signed = await Promise.all(
      files.map(async (f) => {
        const { data } = await admin.storage
          .from(BUCKET)
          .createSignedUrl(f.storage_path, SIGNED_URL_TTL_SECONDS, {
            download: f.name,
          })
        return data?.signedUrl
          ? { name: f.name, url: data.signedUrl, sizeBytes: f.size_bytes ?? null }
          : null
      }),
    )
    return signed.filter((f): f is DeliveryFile => f !== null)
  } catch {
    return []
  }
}

// Hard cap on what we'll attach to the confirmation email. Above this,
// the link in the email is the only delivery — many providers strip /
// quarantine large zips and some have per-message ceilings around 25MB.
const MAX_ATTACH_BYTES = 5 * 1024 * 1024

export type EmailAttachment = { filename: string; path: string }

/**
 * Download-bytes-by-URL list suitable for Resend's `attachments` API.
 * Returns [] when total attachment payload would exceed the safe email
 * size cap, when storage is unconfigured, or when the listing has no
 * files. The download link in the email still works in those cases —
 * attachments are a convenience, not the source of truth.
 */
export async function listingEmailAttachments(
  listingId: string,
): Promise<EmailAttachment[]> {
  const files = await listingFiles(listingId)
  if (files.length === 0) return []
  const total = files.reduce((sum, f) => sum + (f.sizeBytes ?? 0), 0)
  if (total === 0 || total > MAX_ATTACH_BYTES) return []
  return files.map((f) => ({ filename: f.name, path: f.url }))
}
