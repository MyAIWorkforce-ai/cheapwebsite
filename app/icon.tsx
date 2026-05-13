import { ImageResponse } from 'next/og'

// Next.js icon convention. Renders the file on demand into a favicon.
export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0F1729',
          color: '#C19E50',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          fontWeight: 600,
          fontSize: 48,
          letterSpacing: '-0.04em',
        }}
      >
        S
      </div>
    ),
    { ...size },
  )
}
