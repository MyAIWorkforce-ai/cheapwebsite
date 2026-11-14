import { ImageResponse } from 'next/og'

export const alt =
  'Grok Bots on Skillzy — the marketplace for custom Grok agents. Drop-in, not DIY.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// OG card for /grok-bots. Buyer-side headline ("Drop in a Grok Bot") with
// a creator-side subline so the card works for both link audiences.
// Mirrors the hub hero so social previews land exactly where the click
// goes.
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
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <div
            style={{
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
              fontFamily: 'monospace',
              fontSize: 16,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#5F6B7E',
            }}
          >
            The Grok Bot marketplace
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontWeight: 600,
            fontSize: 108,
            letterSpacing: '-0.04em',
            lineHeight: 0.96,
          }}
        >
          <span style={{ display: 'flex' }}>
            Drop in a{' '}
            <span
              style={{
                fontStyle: 'italic',
                color: '#C19E50',
                marginLeft: 18,
              }}
            >
              Grok Bot.
            </span>
          </span>
          <span>Skip the build.</span>
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
            Drop-in, not DIY
          </span>
          <span
            style={{
              fontSize: 28,
              color: '#5F6B7E',
              maxWidth: 1000,
            }}
          >
            Niche-vertical Grok Bots built by operators. 5-min install.
            Creators keep 80%. Buyers own their copy, forever.
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}
