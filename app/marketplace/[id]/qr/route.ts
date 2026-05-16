import QRCode from 'qrcode'
import { getProduct } from '@/lib/catalog'
import { SITE_URL } from '@/lib/seo'

export const runtime = 'nodejs'

// QR code (PNG) that points straight at a listing's purchase page.
// Optional ?ref=<handle> is passed through so a seller sharing their
// own listing gets the sale attributed (the middleware reads ?ref=
// into the skz_ref cookie at landing).
//
//   /marketplace/<id>/qr            -> QR to the listing
//   /marketplace/<id>/qr?ref=harlow -> QR to the listing w/ referral
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const p = getProduct(params.id)
  if (!p) return new Response('Not found', { status: 404 })

  const ref = new URL(req.url).searchParams.get('ref')
  const target =
    `${SITE_URL}/marketplace/${p.id}` +
    (ref ? `?ref=${encodeURIComponent(ref)}` : '')

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
