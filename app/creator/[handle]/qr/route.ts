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
  const ref = new URL(req.url).searchParams.get('ref')
  const target =
    `${SITE_URL}/creator/${encodeURIComponent(handle)}` +
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
      'Content-Disposition': `inline; filename="skillzy-${handle}-qr.png"`,
    },
  })
}
