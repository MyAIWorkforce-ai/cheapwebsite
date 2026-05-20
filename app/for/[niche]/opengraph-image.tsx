import { ImageResponse } from 'next/og'
import { getNiche } from '@/lib/content'

export const alt = 'AI agents for your trade — Skillzy'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function NicheOG({ params }: { params: { niche: string } }) {
  const n = getNiche(params.niche)
  const title = n ? `AI Agents for ${n.name}` : 'Skillzy'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0F1729',
          color: '#E8ECF0',
          padding: '64px 80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'serif',
        }}
      >
        <span
          style={{
            fontSize: 34,
            fontWeight: 600,
            color: '#C19E50',
            letterSpacing: '-0.02em',
          }}
        >
          Skillzy
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 20,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#DDB976',
            }}
          >
            Drop-in, not DIY
          </span>
          <span
            style={{
              fontSize: 96,
              fontWeight: 600,
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            {title}
          </span>
        </div>
        <span style={{ fontSize: 26, color: '#CCD2DD' }}>
          Skills, setups & guides — built for the work you actually do.
        </span>
      </div>
    ),
    { ...size },
  )
}
