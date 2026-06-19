import { ImageResponse } from 'next/og'
import { getCreatorByHandle, getProductsByCreatorHandle } from '@/lib/catalog'
import { dbCreatorByHandle } from '@/lib/listings'

export const alt = 'Skillzy creator'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function CreatorOG({
  params,
}: {
  params: { handle: string }
}) {
  // Try the static seed catalogue first (Harlow, Ledgerlab, etc.) so
  // we keep their richer hand-written bios. Fall through to the DB so
  // real creators (Skillzy House and anyone after) get a populated OG
  // card instead of the bare "Skillzy" placeholder iMessage was
  // surfacing before.
  let name: string | null = null
  let handle: string | null = null
  let bio: string | null = null
  let listings = 0

  const seed = getCreatorByHandle(params.handle)
  if (seed) {
    name = seed.name
    handle = seed.handle
    bio = seed.bio
    listings = getProductsByCreatorHandle(seed.handle).length
  } else {
    const dbHit = await dbCreatorByHandle(params.handle)
    if (dbHit) {
      name = dbHit.creator.name
      handle = dbHit.creator.handle
      bio = dbHit.creator.bio || 'Skillzy creator. Drop-in agent skills, setups & guides.'
      listings = dbHit.products.length
    }
  }

  if (!name) {
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
            fontSize: 110,
            fontFamily: 'serif',
            fontWeight: 600,
            letterSpacing: '-0.025em',
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
            {name}
          </span>
          <span
            style={{
              fontSize: 36,
              fontStyle: 'italic',
              color: '#C19E50',
              marginTop: 6,
            }}
          >
            {handle}
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
            {bio}
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
