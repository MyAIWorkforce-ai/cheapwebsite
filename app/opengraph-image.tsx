import { ImageResponse } from 'next/og'

export const alt = 'Skillzy — A marketplace for agent skills'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Default OG card. Renders the homepage tagline against the brand cream
// canvas with the gold flourish. Used for any route that doesn't override.
export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#E8ECF0',
          padding: '64px 80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'serif',
          color: '#0F1729',
        }}
      >
        {/* top: wordmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            fontSize: 44,
            fontWeight: 600,
            color: '#C19E50',
            letterSpacing: '-0.02em',
          }}
        >
          Skillzy
        </div>

        {/* middle: headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontWeight: 600,
            fontSize: 96,
            letterSpacing: '-0.04em',
            lineHeight: 0.98,
          }}
        >
          <span>Drop it in.</span>
          <span style={{ display: 'flex' }}>
            Agent{' '}
            <span style={{ fontStyle: 'italic', color: '#C19E50', marginLeft: 18 }}>
              supercharged.
            </span>
          </span>
        </div>

        {/* bottom: tagline + eyebrow */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 18,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#C19E50',
            }}
          >
            Built by creators
          </span>
          <span
            style={{
              fontSize: 28,
              color: '#5F6B7E',
              maxWidth: 880,
            }}
          >
            Pre-built skills, guides, and full agent setups. Plug them into any
            agent — yours levels up instantly.
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}
