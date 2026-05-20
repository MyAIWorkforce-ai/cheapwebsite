import { ImageResponse } from 'next/og'
import { resolveProduct } from '@/lib/listings'

export const runtime = 'nodejs'

// 1200×675 share asset (X / Twitter). Right-click-save.
export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const p = await resolveProduct(params.id)
  if (!p) return new Response('Not found', { status: 404 })

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#E8ECF0',
          color: '#0F1729',
          padding: 64,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 34, fontWeight: 600, color: '#C19E50', letterSpacing: '-0.02em' }}>
            Skillzy
          </span>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 16,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              border: '1px solid #0F1729',
              padding: '6px 14px',
            }}
          >
            {p.type}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 1000 }}>
          <span style={{ fontSize: 76, fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.02 }}>
            {p.title}
          </span>
          <span style={{ fontSize: 30, color: '#5F6B7E', lineHeight: 1.3 }}>
            {p.tagline}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: 26, color: '#5F6B7E' }}>
          <span>by {p.creator.name}</span>
          <span style={{ fontSize: 52, fontWeight: 600, fontStyle: 'italic', color: '#0F1729' }}>
            {p.free ? 'Free' : p.price}
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 675 },
  )
}
