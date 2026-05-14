import { ImageResponse } from 'next/og'
import { getCreatorByHandle, getProductsByCreatorHandle } from '@/lib/catalog'

export const alt = 'Skillzy creator'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function CreatorOG({ params }: { params: { handle: string } }) {
  const creator = getCreatorByHandle(params.handle)

  if (!creator) {
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

  const listings = getProductsByCreatorHandle(creator.handle).length

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
        {/* top: brand */}
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

        {/* middle: name + handle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 20,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#DDB976',
            }}
          >
            Creator
          </span>
          <span
            style={{
              fontSize: 110,
              fontWeight: 600,
              letterSpacing: '-0.035em',
              lineHeight: 1,
            }}
          >
            {creator.name}
          </span>
          <span
            style={{
              fontSize: 36,
              fontStyle: 'italic',
              color: '#C19E50',
              marginTop: 6,
            }}
          >
            {creator.handle}
          </span>
        </div>

        {/* bottom: bio + stats */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: 32,
          }}
        >
          <span style={{ fontSize: 26, color: '#CCD2DD', maxWidth: 720, lineHeight: 1.35 }}>
            {creator.bio}
          </span>
          <span
            style={{
              fontSize: 24,
              color: '#CCD2DD',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 4,
            }}
          >
            <span style={{ fontSize: 64, fontWeight: 600, color: '#E8ECF0', letterSpacing: '-0.03em' }}>
              {listings}
            </span>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 14,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#93A4BD',
              }}
            >
              Listings
            </span>
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}
