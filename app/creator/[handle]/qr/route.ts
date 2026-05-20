import QRCode from 'qrcode'
import { SITE_URL } from '@/lib/seo'

export const runtime = 'nodejs'

// QR (PNG) for a creator's whole catalogue — points at their public
// /creator/<handle> profile. ?ref= is passed through so traffic the
// creator drives to their own profile is attributed.
//
//   /creator/<handle>/qr            -> QR to the profile
//   /creator/<handle>/qr?ref=harlow -> QR w/ referral
export async function GET(
  req: Request,
  { params }: { params: { handle: string } },
) {
  const handle = params.handle.replace(/^@/, '')
  const sp = new URL(req.url).searchParams
  const ref = sp.get('ref')
  const ch = sp.get('c')
  const qs = new URLSearchParams()
  if (ref) qs.set('ref', ref)
  if (ch) qs.set('c', ch)
  const target =
    `${SITE_URL}/creator/${encodeURIComponent(handle)}` +
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
      'Content-Disposition': `inline; filename="skillzy-${handle}-qr.png"`,
    },
  })
}
