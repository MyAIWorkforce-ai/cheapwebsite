import { ImageResponse } from 'next/og'
import { getPost, readingMinutes } from '@/lib/blog'

export const alt = 'Skillzy Field Notes'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function BlogOG({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  const title = post?.title ?? 'Skillzy Field Notes'
  const meta = post
    ? `Field Notes · ${readingMinutes(post)} min read`
    : 'Field Notes'
  const footer = post
    ? `${post.author} — ${post.authorRole}`
    : 'Skills, setups & guides — built by humans.'

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
            {meta}
          </span>
          <span
            style={{
              fontSize: title.length > 55 ? 64 : 84,
              fontWeight: 600,
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
            }}
          >
            {title}
          </span>
        </div>
        <span style={{ fontSize: 26, color: '#CCD2DD' }}>{footer}</span>
      </div>
    ),
    { ...size },
  )
}
