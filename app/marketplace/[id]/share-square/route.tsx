import { ImageResponse } from 'next/og'
import { getProduct } from '@/lib/catalog'

export const runtime = 'nodejs'

// 1080×1080 share asset (Instagram / LinkedIn). Right-click-save.
export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const p = getProduct(params.id)
  if (!p) return new Response('Not found', { status: 404 })

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0F1729',
          color: '#E8ECF0',
          padding: 88,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'serif',
        }}
      >
        <span style={{ fontSize: 40, fontWeight: 600, color: '#C19E50', letterSpacing: '-0.02em' }}>
          Skillzy
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 22,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#DDB976',
            }}
          >
            {p.type}
          </span>
          <span style={{ fontSize: 84, fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.02 }}>
            {p.title}
          </span>
          <span style={{ fontSize: 30, color: '#CCD2DD', lineHeight: 1.3 }}>
            {p.tagline}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: 28, color: '#CCD2DD' }}>
          <span>by {p.creator.name}</span>
          <span style={{ fontSize: 56, fontWeight: 600, fontStyle: 'italic', color: '#E8ECF0' }}>
            {p.free ? 'Free' : p.price}
          </span>
        </div>
      </div>
    ),
    { width: 1080, height: 1080 },
  )
}
