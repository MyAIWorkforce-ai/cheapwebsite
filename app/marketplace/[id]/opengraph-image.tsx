import { ImageResponse } from 'next/og'
import { getProduct } from '@/lib/catalog'

export const alt = 'Skillzy listing'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function ProductOG({ params }: { params: { id: string } }) {
  const p = getProduct(params.id)

  if (!p) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#E8ECF0',
            color: '#0F1729',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 80,
            fontFamily: 'serif',
          }}
        >
          Skillzy
        </div>
      ),
      { ...size },
    )
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#E8ECF0',
          padding: '56px 72px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'serif',
          color: '#0F1729',
        }}
      >
        {/* top row: wordmark + type tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <span
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: '#C19E50',
              letterSpacing: '-0.02em',
            }}
          >
            Skillzy
          </span>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 16,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#0F1729',
              border: '1px solid #0F1729',
              padding: '6px 14px',
            }}
          >
            {p.type}
          </span>
        </div>

        {/* middle: title + tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 1050 }}>
          <span
            style={{
              fontSize: 88,
              fontWeight: 600,
              letterSpacing: '-0.035em',
              lineHeight: 1.02,
            }}
          >
            {p.title}
          </span>
          <span style={{ fontSize: 32, color: '#5F6B7E', lineHeight: 1.3 }}>
            {p.tagline}
          </span>
        </div>

        {/* bottom: creator + price */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            width: '100%',
            fontSize: 28,
            color: '#5F6B7E',
          }}
        >
          <span>by {p.creator.name}</span>
          <span
            style={{
              fontSize: 56,
              color: '#0F1729',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              fontStyle: 'italic',
            }}
          >
            {p.price}
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}
