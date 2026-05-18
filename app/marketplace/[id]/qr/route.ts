import QRCode from 'qrcode'
import { resolveProduct } from '@/lib/listings'
import { SITE_URL } from '@/lib/seo'

export const runtime = 'nodejs'

// QR code (PNG) that points straight at a listing's purchase page.
// Optional ?ref=<handle> is passed through so a creator sharing their
// own listing gets the sale attributed (the middleware reads ?ref=
// into the skz_ref cookie at landing).
//
//   /marketplace/<id>/qr            -> QR to the listing
//   /marketplace/<id>/qr?ref=harlow -> QR to the listing w/ referral
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const p = await resolveProduct(params.id)
  if (!p) return new Response('Not found', { status: 404 })

  const sp = new URL(req.url).searchParams
  const ref = sp.get('ref')
  const ch = sp.get('c')
  const qs = new URLSearchParams()
  if (ref) qs.set('ref', ref)
  if (ch) qs.set('c', ch)
  const target =
    `${SITE_URL}/marketplace/${p.id}` +
    (qs.toString() ? `?${qs.toString()}` : '')

  const png = await QRCode.toBuffer(target, {
    type: 'png',
    errorCorrectionLevel: 'M',
    margin: 2,
    width: 600,
    color: { dark: '#0F1729', light: '#FFFFFF' },
  })

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400, immutable',
      'Content-Disposition': `inline; filename="skillzy-${p.id}-qr.png"`,
    },
  })
}
