import { ImageResponse } from 'next/og'

export const alt =
  'Sell AI Agent Skills on Skillzy — List once, earn forever'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// OG card for /sell. Creator-side messaging: list once, earn forever,
// 80/20 split. Mirrors the page hero so socials/IM previews match the
// landing experience instead of falling back to the homepage card.
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
          <span>List once.</span>
          <span style={{ display: 'flex' }}>
            Earn{' '}
            <span style={{ fontStyle: 'italic', color: '#C19E50', marginLeft: 18 }}>
              forever.
            </span>
          </span>
        </div>

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
            For creators
          </span>
          <span
            style={{
              fontSize: 28,
              color: '#5F6B7E',
              maxWidth: 880,
            }}
          >
            Publish in minutes. Connect Stripe. Get paid direct.
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}
