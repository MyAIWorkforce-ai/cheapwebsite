import React from 'react'
import { ImageResponse } from 'next/og'
import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Skillzy — Instagram content generator.
 * Renders on-brand 1080x1350 (4:5) carousel/static slides to marketing/instagram.
 * Run: npx tsx scripts/gen-marketing-images.tsx
 */

const W = 1080
const H = 1350
const OUT = join(process.cwd(), 'marketing', 'instagram')
const FONTCACHE = join(process.cwd(), 'scripts', '.fontcache')

const C = {
  cream: '#E8ECF0',
  creamCard: '#F2F4F8',
  ink: '#0F1729',
  navy: '#0F1729',
  navyDeep: '#080D1A',
  muted: '#5F6B7E',
  hairline: '#CCD2DD',
  gold: '#C19E50',
  goldSoft: '#DDB976',
  goldDark: '#9C7E3D',
  creamOnNavy: '#E8ECF0',
}

// ---- fonts -----------------------------------------------------------------
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'

async function fetchTTF(cssUrl: string, cacheName: string): Promise<Buffer> {
  const cached = join(FONTCACHE, cacheName)
  if (existsSync(cached)) return readFileSync(cached)
  const css = await fetch(cssUrl, { headers: { 'User-Agent': UA } }).then((r) => r.text())
  const m = css.match(/url\((https:\/\/[^)]+\.ttf)\)/)
  if (!m) throw new Error('no ttf in css for ' + cacheName)
  const buf = Buffer.from(await fetch(m[1]).then((r) => r.arrayBuffer()))
  if (!existsSync(FONTCACHE)) mkdirSync(FONTCACHE, { recursive: true })
  writeFileSync(cached, buf)
  return buf
}

async function loadFonts() {
  const [fraunces600, frauncesItalic, inter400, inter600] = await Promise.all([
    fetchTTF(
      'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&display=swap',
      'fraunces-600.ttf',
    ),
    fetchTTF(
      'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,500&display=swap',
      'fraunces-500-italic.ttf',
    ),
    fetchTTF(
      'https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap',
      'inter-400.ttf',
    ),
    fetchTTF(
      'https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap',
      'inter-600.ttf',
    ),
  ])
  return [
    { name: 'Fraunces', data: fraunces600, weight: 600 as const, style: 'normal' as const },
    { name: 'Fraunces', data: frauncesItalic, weight: 500 as const, style: 'italic' as const },
    { name: 'Inter', data: inter400, weight: 400 as const, style: 'normal' as const },
    { name: 'Inter', data: inter600, weight: 600 as const, style: 'normal' as const },
  ]
}

// ---- brand atoms -----------------------------------------------------------
type Tone = 'paper' | 'navy'

function Squiggle({ color, width }: { color: string; width: number }) {
  return (
    <svg
      width={width}
      height={Math.round(width * 0.06)}
      viewBox="0 0 300 14"
      preserveAspectRatio="none"
      style={{ display: 'flex' }}
    >
      <path
        d="M2 9 C 40 -2, 80 14, 120 6 S 200 0, 240 8 S 290 4, 298 8"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

// Brand flourish — stands in for the site's ✿ (not in Fraunces/Inter).
function Mark({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'flex' }}>
      <g fill={color}>
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="4.5" r="3" />
        <circle cx="12" cy="19.5" r="3" />
        <circle cx="4.5" cy="12" r="3" />
        <circle cx="19.5" cy="12" r="3" />
      </g>
    </svg>
  )
}

function Sticker({ children, tone = 'gold' }: { children: string; tone?: 'gold' | 'cream' }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        transform: 'rotate(-2.5deg)',
        background: tone === 'gold' ? C.gold : C.cream,
        color: C.ink,
        fontFamily: 'Inter',
        fontWeight: 600,
        fontSize: 22,
        letterSpacing: 4,
        textTransform: 'uppercase',
        padding: '12px 22px',
      }}
    >
      <Mark color={C.ink} size={20} />
      {children}
    </div>
  )
}

function Eyebrow({ children, color }: { children: string; color: string }) {
  return (
    <div
      style={{
        display: 'flex',
        color,
        fontFamily: 'Inter',
        fontWeight: 600,
        fontSize: 23,
        letterSpacing: 5,
        textTransform: 'uppercase',
      }}
    >
      {children}
    </div>
  )
}

type Token = { t: string; em?: boolean; squiggle?: boolean }
type Line = Token[]

function Headline({
  lines,
  size,
  tone,
}: {
  lines: Line[]
  size: number
  tone: Tone
}) {
  const base = tone === 'navy' ? C.cream : C.ink
  const tight = (s: string) => /^[.,!?;:%)’”]/.test(s)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: size * 0.06 }}>
      {lines.map((line, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            fontFamily: 'Fraunces',
            fontWeight: 600,
            fontSize: size,
            lineHeight: 1.0,
            letterSpacing: -size * 0.035,
            color: base,
          }}
        >
          {line.map((raw, j) => {
            const text = raw.t.trim()
            const word = (
              <div
                key={`w${j}`}
                style={{ display: 'flex', position: 'relative' }}
              >
                <span
                  style={{
                    color: raw.em ? C.gold : base,
                    fontStyle: raw.em ? 'italic' : 'normal',
                    fontWeight: raw.em ? 500 : 600,
                  }}
                >
                  {text}
                </span>
                {raw.squiggle ? (
                  <div
                    style={{
                      display: 'flex',
                      position: 'absolute',
                      left: 0,
                      bottom: -size * 0.18,
                    }}
                  >
                    <Squiggle
                      color={C.gold}
                      width={Math.max(140, text.length * size * 0.5)}
                    />
                  </div>
                ) : null}
              </div>
            )
            if (j === 0 || tight(text)) return word
            return [
              <div key={`s${j}`} style={{ display: 'flex', width: size * 0.26 }} />,
              word,
            ]
          })}
        </div>
      ))}
    </div>
  )
}

function Footer({
  tone,
  index,
  total,
  swipe,
}: {
  tone: Tone
  index?: number
  total?: number
  swipe?: boolean
}) {
  const sub = tone === 'navy' ? 'rgba(232,236,240,0.55)' : C.muted
  const mark = C.gold
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: `1px solid ${tone === 'navy' ? 'rgba(232,236,240,0.18)' : C.hairline}`,
        paddingTop: 28,
      }}
    >
      <div
        style={{
          display: 'flex',
          fontFamily: 'Fraunces',
          fontWeight: 600,
          fontSize: 34,
          color: mark,
          letterSpacing: -1,
        }}
      >
        Skillzy
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
        {swipe ? (
          <div
            style={{
              display: 'flex',
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: 20,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: mark,
            }}
          >
            Swipe →
          </div>
        ) : null}
        {index && total ? (
          <div
            style={{
              display: 'flex',
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: 20,
              letterSpacing: 3,
              color: sub,
            }}
          >
            {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: 20,
              letterSpacing: 3,
              color: sub,
            }}
          >
            skillzy.ai
          </div>
        )}
      </div>
    </div>
  )
}

function Frame({
  tone,
  children,
}: {
  tone: Tone
  children: React.ReactNode
}) {
  const bg = tone === 'navy' ? C.navy : C.cream
  return (
    <div
      style={{
        width: W,
        height: H,
        display: 'flex',
        background: bg,
        padding: 30,
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: `1px solid ${tone === 'navy' ? 'rgba(232,236,240,0.16)' : C.hairline}`,
          padding: '70px 72px',
        }}
      >
        {children}
      </div>
    </div>
  )
}

// ---- slide kinds -----------------------------------------------------------
type Slide =
  | {
      kind: 'cover'
      tone: Tone
      sticker?: string
      headline: Line[]
      sub?: string
      total?: number
      swipe?: boolean
    }
  | {
      kind: 'step'
      tone: Tone
      n: string
      eyebrow: string
      title: string
      desc: string
      index: number
      total: number
    }
  | {
      kind: 'point'
      tone: Tone
      eyebrow: string
      headline: Line[]
      sub?: string
      index: number
      total: number
    }
  | {
      kind: 'stat'
      tone: Tone
      big: string
      label: string
      desc: string
      eyebrow: string
      index?: number
      total?: number
    }
  | {
      kind: 'quote'
      tone: Tone
      quote: Line[]
      who: string
    }
  | {
      kind: 'cta'
      tone: Tone
      eyebrow: string
      headline: Line[]
      pill: string
      url: string
    }

function render(slide: Slide): React.ReactNode {
  if (slide.kind === 'cover') {
    return (
      <Frame tone={slide.tone}>
        <div style={{ display: 'flex' }}>
          {slide.sticker ? <Sticker>{slide.sticker}</Sticker> : <div style={{ display: 'flex' }} />}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <Headline lines={slide.headline} size={104} tone={slide.tone} />
          {slide.sub ? (
            <div
              style={{
                display: 'flex',
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: 34,
                lineHeight: 1.35,
                color: slide.tone === 'navy' ? 'rgba(232,236,240,0.85)' : C.muted,
                maxWidth: 820,
              }}
            >
              {slide.sub}
            </div>
          ) : null}
        </div>
        <Footer tone={slide.tone} total={slide.total} swipe={slide.swipe} />
      </Frame>
    )
  }

  if (slide.kind === 'step') {
    return (
      <Frame tone={slide.tone}>
        <Eyebrow color={C.gold}>{slide.eyebrow}</Eyebrow>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Fraunces',
              fontWeight: 600,
              fontSize: 200,
              color: C.gold,
              letterSpacing: -8,
              lineHeight: 1,
            }}
          >
            {slide.n}
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Fraunces',
              fontWeight: 600,
              fontSize: 78,
              color: slide.tone === 'navy' ? C.cream : C.ink,
              letterSpacing: -2,
              marginTop: 18,
            }}
          >
            {slide.title}
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: 36,
              lineHeight: 1.35,
              color: slide.tone === 'navy' ? 'rgba(232,236,240,0.82)' : C.muted,
              marginTop: 26,
              maxWidth: 800,
            }}
          >
            {slide.desc}
          </div>
        </div>
        <Footer tone={slide.tone} index={slide.index} total={slide.total} />
      </Frame>
    )
  }

  if (slide.kind === 'point') {
    return (
      <Frame tone={slide.tone}>
        <Eyebrow color={C.gold}>{slide.eyebrow}</Eyebrow>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          <Headline lines={slide.headline} size={88} tone={slide.tone} />
          {slide.sub ? (
            <div
              style={{
                display: 'flex',
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: 34,
                lineHeight: 1.35,
                color: slide.tone === 'navy' ? 'rgba(232,236,240,0.85)' : C.muted,
                maxWidth: 820,
              }}
            >
              {slide.sub}
            </div>
          ) : null}
        </div>
        <Footer tone={slide.tone} index={slide.index} total={slide.total} />
      </Frame>
    )
  }

  if (slide.kind === 'stat') {
    return (
      <Frame tone={slide.tone}>
        <Eyebrow color={slide.tone === 'navy' ? C.goldSoft : C.gold}>{slide.eyebrow}</Eyebrow>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Fraunces',
              fontWeight: 600,
              fontSize: 320,
              color: slide.tone === 'navy' ? C.goldSoft : C.gold,
              letterSpacing: -14,
              lineHeight: 0.9,
            }}
          >
            {slide.big}
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Fraunces',
              fontWeight: 600,
              fontSize: 64,
              color: slide.tone === 'navy' ? C.cream : C.ink,
              marginTop: 24,
            }}
          >
            {slide.label}
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: 34,
              color: slide.tone === 'navy' ? 'rgba(232,236,240,0.78)' : C.muted,
              marginTop: 16,
            }}
          >
            {slide.desc}
          </div>
        </div>
        <Footer tone={slide.tone} index={slide.index} total={slide.total} />
      </Frame>
    )
  }

  if (slide.kind === 'quote') {
    return (
      <Frame tone={slide.tone}>
        <div
          style={{
            display: 'flex',
            fontFamily: 'Fraunces',
            fontWeight: 600,
            fontSize: 90,
            color: C.gold,
            lineHeight: 1,
          }}
        >
          “
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          <Headline lines={slide.quote} size={76} tone={slide.tone} />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: `1px solid ${slide.tone === 'navy' ? 'rgba(232,236,240,0.18)' : C.hairline}`,
            paddingTop: 28,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: 26,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: slide.tone === 'navy' ? 'rgba(232,236,240,0.7)' : C.muted,
            }}
          >
            {slide.who}
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Fraunces',
              fontWeight: 600,
              fontSize: 34,
              color: C.gold,
            }}
          >
            Skillzy
          </div>
        </div>
      </Frame>
    )
  }

  // cta
  return (
    <Frame tone={slide.tone}>
      <Eyebrow color={C.goldSoft}>{slide.eyebrow}</Eyebrow>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
        <Headline lines={slide.headline} size={100} tone={slide.tone} />
        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              background: C.gold,
              color: C.ink,
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: 32,
              padding: '24px 40px',
            }}
          >
            {slide.pill}
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(232,236,240,0.18)',
          paddingTop: 28,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'Fraunces',
            fontWeight: 600,
            fontSize: 34,
            color: C.gold,
          }}
        >
          Skillzy
        </div>
        <div
          style={{
            display: 'flex',
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: 26,
            letterSpacing: 3,
            color: 'rgba(232,236,240,0.75)',
          }}
        >
          {slide.url}
        </div>
      </div>
    </Frame>
  )
}

// ---- content ---------------------------------------------------------------
// Carousel 1 — THE BIG IDEA (problem -> drop-it-in promise)
const explainer: Slide[] = [
  {
    kind: 'cover',
    tone: 'paper',
    sticker: 'Built by creators',
    headline: [
      [{ t: 'Your agent' }],
      [{ t: 'is ' }, { t: 'dumber', em: true, squiggle: true }],
      [{ t: 'than it' }],
      [{ t: 'should be.' }],
    ],
    sub: 'Generic models guess. They have never done your job.',
    total: 7,
    swipe: true,
  },
  {
    kind: 'point',
    tone: 'paper',
    eyebrow: 'The problem',
    headline: [[{ t: 'Prompting' }], [{ t: 'it ' }, { t: 'forever', em: true }], [{ t: 'is not' }], [{ t: 'a system.' }]],
    sub: 'You re-explain the same context every single time. Nothing sticks.',
    index: 2,
    total: 7,
  },
  {
    kind: 'point',
    tone: 'paper',
    eyebrow: 'The fix',
    headline: [[{ t: 'Drop in' }], [{ t: 'a ' }, { t: 'skill', em: true, squiggle: true }, { t: '.' }]],
    sub: 'A packaged capability built by someone who already does the work. Files in, agent leveled up.',
    index: 3,
    total: 7,
  },
  {
    kind: 'point',
    tone: 'paper',
    eyebrow: 'Three flavors',
    headline: [[{ t: 'Skills.' }], [{ t: 'Guides.' }], [{ t: 'Full ' }, { t: 'setups', em: true }, { t: '.' }]],
    sub: 'One sharp task, a playbook from someone who did it, or the whole agent in a box.',
    index: 4,
    total: 7,
  },
  {
    kind: 'point',
    tone: 'paper',
    eyebrow: 'Works with',
    headline: [[{ t: 'Any' }], [{ t: 'agent', em: true }, { t: ' you' }], [{ t: 'already' }], [{ t: 'run.' }]],
    sub: 'Claude · ChatGPT · Gemini · Grok · Ollama · Mistral · n8n · Make · Zapier.',
    index: 5,
    total: 7,
  },
  {
    kind: 'quote',
    tone: 'navy',
    quote: [
      [{ t: 'You ' }, { t: 'build', em: true }, { t: '.' }],
      [{ t: 'We sell.' }],
      [{ t: 'They ' }, { t: 'use', em: true }, { t: '.' }],
    ],
    who: 'The creators’ revolution',
  },
  {
    kind: 'cta',
    tone: 'navy',
    eyebrow: 'Start here',
    headline: [[{ t: 'Drop it in.' }], [{ t: 'Agent ' }, { t: 'smarter', em: true }, { t: '.' }]],
    pill: 'Browse skills →',
    url: 'skillzy.ai',
  },
]

// Carousel 2 — HOW EASY IT IS TO BUY
const buy: Slide[] = [
  {
    kind: 'cover',
    tone: 'paper',
    sticker: '60 seconds',
    headline: [[{ t: 'Buy a skill' }], [{ t: 'faster than' }], [{ t: 'you ' }, { t: 'prompt', em: true, squiggle: true }, { t: '.' }]],
    sub: 'From “my agent can’t do this” to “done” — in four steps.',
    total: 6,
    swipe: true,
  },
  {
    kind: 'step',
    tone: 'paper',
    n: '01',
    eyebrow: 'Buying · Step 01',
    title: 'Search it',
    desc: 'Type the job: invoices, real-estate follow-ups, daily summaries. Filter by platform and niche.',
    index: 2,
    total: 6,
  },
  {
    kind: 'step',
    tone: 'paper',
    n: '02',
    eyebrow: 'Buying · Step 02',
    title: 'Pick it',
    desc: 'Real reviews, version, what you get, and which agents it runs on. No guesswork.',
    index: 3,
    total: 6,
  },
  {
    kind: 'step',
    tone: 'paper',
    n: '03',
    eyebrow: 'Buying · Step 03',
    title: 'Checkout',
    desc: 'One Stripe checkout. Instant access — no account hoops, no waiting on a human.',
    index: 4,
    total: 6,
  },
  {
    kind: 'step',
    tone: 'paper',
    n: '04',
    eyebrow: 'Buying · Step 04',
    title: 'Drop it in',
    desc: 'Download the files, drop them into your agent. It just got sharper. That’s the whole thing.',
    index: 5,
    total: 6,
  },
  {
    kind: 'cta',
    tone: 'navy',
    eyebrow: 'Your move',
    headline: [[{ t: 'Find the' }], [{ t: 'skill', em: true }, { t: ' you' }], [{ t: 'needed.' }]],
    pill: 'Browse the marketplace →',
    url: 'skillzy.ai/marketplace',
  },
]

// Carousel 3 — HOW EASY IT IS TO LIST / SELL
const sell: Slide[] = [
  {
    kind: 'cover',
    tone: 'paper',
    sticker: 'For creators',
    headline: [[{ t: 'You built' }], [{ t: 'something ' }, { t: 'good', em: true, squiggle: true }, { t: '.' }], [{ t: 'Sell it.' }]],
    sub: 'It’s sitting on your laptop. It could be earning while you sleep.',
    total: 8,
    swipe: true,
  },
  {
    kind: 'step',
    tone: 'paper',
    n: '01',
    eyebrow: 'Selling · Step 01',
    title: 'Sign up',
    desc: 'Email or one-click GitHub. No profile to fill in, no application to wait on.',
    index: 2,
    total: 8,
  },
  {
    kind: 'step',
    tone: 'paper',
    n: '02',
    eyebrow: 'Selling · Step 02',
    title: 'Drop your files',
    desc: 'Skill, guide, or a full agent setup. The thing you already made — upload it as-is.',
    index: 3,
    total: 8,
  },
  {
    kind: 'step',
    tone: 'paper',
    n: '03',
    eyebrow: 'Selling · Step 03',
    title: 'AI writes the listing',
    desc: 'Talk, type, or drop notes. Skillzy drafts the title, blurb, features and setup. Refine by voice until it sounds like you.',
    index: 4,
    total: 8,
  },
  {
    kind: 'step',
    tone: 'paper',
    n: '04',
    eyebrow: 'Selling · Step 04',
    title: 'Quick review',
    desc: 'Auto-scan plus a human look at your first listing. Usually live in under 24 hours.',
    index: 5,
    total: 8,
  },
  {
    kind: 'step',
    tone: 'paper',
    n: '05',
    eyebrow: 'Selling · Step 05',
    title: 'Connect Stripe',
    desc: 'One click at publish. Payouts go straight to your account. Skillzy never holds the money.',
    index: 6,
    total: 8,
  },
  {
    kind: 'stat',
    tone: 'navy',
    eyebrow: 'The deal',
    big: '80%',
    label: 'Stays with you',
    desc: 'Every sale. No exceptions. List once — earn forever. ∞ resales per listing.',
    index: 7,
    total: 8,
  },
  {
    kind: 'cta',
    tone: 'navy',
    eyebrow: 'Become a creator',
    headline: [[{ t: 'List once.' }], [{ t: 'Earn ' }, { t: 'forever', em: true }, { t: '.' }]],
    pill: 'Start selling →',
    url: 'skillzy.ai/sell',
  },
]

// Standalone static posts
const statics: { name: string; slide: Slide }[] = [
  {
    name: 'static-manifesto',
    slide: {
      kind: 'quote',
      tone: 'navy',
      quote: [
        [{ t: 'The old' }],
        [{ t: 'marketplaces' }],
        [{ t: 'took ' }, { t: '70%', em: true }, { t: '.' }],
        [{ t: 'We take 20.' }],
      ],
      who: 'The creators’ revolution',
    },
  },
  {
    name: 'static-dropitin',
    slide: {
      kind: 'cover',
      tone: 'paper',
      sticker: 'A marketplace for agent skills',
      headline: [[{ t: 'Drop it in.' }], [{ t: 'Your agent' }], [{ t: 'just got ' }, { t: 'smarter', em: true, squiggle: true }, { t: '.' }]],
      sub: 'Pre-built skills, guides, and full agent setups from creators in the field.',
    },
  },
  {
    name: 'static-stat-infinity',
    slide: {
      kind: 'stat',
      tone: 'paper',
      eyebrow: 'List once',
      big: '∞',
      label: 'Resales per listing',
      desc: 'Build it one time. It keeps earning every time someone drops it in.',
    },
  },
]

// Reel/short title cards
const reelCards: { name: string; slide: Slide }[] = [
  {
    name: 'reel-01-title',
    slide: {
      kind: 'cover',
      tone: 'navy',
      sticker: 'Reel',
      headline: [[{ t: 'I made my' }], [{ t: 'agent ' }, { t: 'smarter', em: true }], [{ t: 'in 60s.' }]],
      sub: 'No code. No new tool. Just one file.',
    },
  },
  {
    name: 'reel-02-title',
    slide: {
      kind: 'cover',
      tone: 'navy',
      sticker: 'Reel',
      headline: [[{ t: 'I sold a' }], [{ t: 'prompt ' }, { t: 'once', em: true }, { t: '.' }], [{ t: 'It still pays.' }]],
      sub: 'List once. Keep 80%. Earn forever.',
    },
  },
  {
    name: 'reel-03-title',
    slide: {
      kind: 'cover',
      tone: 'navy',
      sticker: 'Reel',
      headline: [[{ t: 'Stop ' }, { t: 're-explaining', em: true }], [{ t: 'yourself to' }], [{ t: 'a robot.' }]],
      sub: 'Package it once. Drop it in forever.',
    },
  },
]

// ---- run -------------------------------------------------------------------
async function writeSlide(fonts: any, dir: string, file: string, slide: Slide) {
  const img = new ImageResponse(render(slide) as any, { width: W, height: H, fonts })
  const buf = Buffer.from(await img.arrayBuffer())
  const full = join(OUT, dir)
  if (!existsSync(full)) mkdirSync(full, { recursive: true })
  writeFileSync(join(full, file), buf)
  console.log(`  ${dir}/${file}  (${(buf.length / 1024).toFixed(0)} kb)`)
}

async function main() {
  if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true })
  console.log('loading fonts…')
  const fonts = await loadFonts()

  console.log('carousel-1-explainer')
  for (let i = 0; i < explainer.length; i++)
    await writeSlide(fonts, 'carousel-1-explainer', `${String(i + 1).padStart(2, '0')}.png`, explainer[i])

  console.log('carousel-2-buy')
  for (let i = 0; i < buy.length; i++)
    await writeSlide(fonts, 'carousel-2-buy', `${String(i + 1).padStart(2, '0')}.png`, buy[i])

  console.log('carousel-3-sell')
  for (let i = 0; i < sell.length; i++)
    await writeSlide(fonts, 'carousel-3-sell', `${String(i + 1).padStart(2, '0')}.png`, sell[i])

  console.log('statics')
  for (const s of statics) await writeSlide(fonts, 'statics', `${s.name}.png`, s.slide)

  console.log('reel-cards')
  for (const s of reelCards) await writeSlide(fonts, 'reel-cards', `${s.name}.png`, s.slide)

  console.log('done →', OUT)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
