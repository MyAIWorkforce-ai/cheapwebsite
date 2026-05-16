import React from 'react'
import { ImageResponse } from 'next/og'
import { execFileSync, spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import {
  writeFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
} from 'node:fs'
import { join } from 'node:path'
import ffmpegPath from 'ffmpeg-static'

/**
 * Skillzy — end-to-end "list -> sell" explainer video.
 * Motion-graphics built from the brand system (not a screen recording).
 * Run: npm i ffmpeg-static --no-save && npx tsx scripts/gen-marketing-video.tsx
 * Output: marketing/video/skillzy-list-to-sell-9x16.mp4 (+ 1x1)
 */

const FONTCACHE = join(process.cwd(), 'scripts', '.fontcache')
const OUT = join(process.cwd(), 'marketing', 'video')
const TMP = join(process.cwd(), 'marketing', 'video', '.frames')

const C = {
  cream: '#E8ECF0',
  ink: '#0F1729',
  navy: '#0F1729',
  muted: '#5F6B7E',
  hairline: '#CCD2DD',
  gold: '#C19E50',
  goldSoft: '#DDB976',
}

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
async function fetchTTF(cssUrl: string, name: string): Promise<Buffer> {
  const cached = join(FONTCACHE, name)
  if (existsSync(cached)) return readFileSync(cached)
  const css = await fetch(cssUrl, { headers: { 'User-Agent': UA } }).then((r) => r.text())
  const m = css.match(/url\((https:\/\/[^)]+\.ttf)\)/)
  if (!m) throw new Error('no ttf: ' + name)
  const buf = Buffer.from(await fetch(m[1]).then((r) => r.arrayBuffer()))
  if (!existsSync(FONTCACHE)) mkdirSync(FONTCACHE, { recursive: true })
  writeFileSync(cached, buf)
  return buf
}
async function loadFonts() {
  const [f6, fi, i4, i6] = await Promise.all([
    fetchTTF('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&display=swap', 'fraunces-600.ttf'),
    fetchTTF('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,500&display=swap', 'fraunces-500-italic.ttf'),
    fetchTTF('https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap', 'inter-400.ttf'),
    fetchTTF('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap', 'inter-600.ttf'),
  ])
  return [
    { name: 'Fraunces', data: f6, weight: 600 as const, style: 'normal' as const },
    { name: 'Fraunces', data: fi, weight: 500 as const, style: 'italic' as const },
    { name: 'Inter', data: i4, weight: 400 as const, style: 'normal' as const },
    { name: 'Inter', data: i6, weight: 600 as const, style: 'normal' as const },
  ]
}

// ---- atoms -----------------------------------------------------------------
function Mark({ color, size }: { color: string; size: number }) {
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
function Squiggle({ color, width }: { color: string; width: number }) {
  return (
    <svg width={width} height={Math.round(width * 0.06)} viewBox="0 0 300 14" preserveAspectRatio="none" style={{ display: 'flex' }}>
      <path d="M2 9 C 40 -2, 80 14, 120 6 S 200 0, 240 8 S 290 4, 298 8" stroke={color} strokeWidth={3} strokeLinecap="round" fill="none" />
    </svg>
  )
}
type Tok = { t: string; em?: boolean; sq?: boolean }
function Headline({ lines, size, tone }: { lines: Tok[][]; size: number; tone: 'paper' | 'navy' }) {
  const base = tone === 'navy' ? C.cream : C.ink
  const tight = (s: string) => /^[.,!?;:%)’”]/.test(s)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: size * 0.06 }}>
      {lines.map((line, i) => (
        <div key={i} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', fontFamily: 'Fraunces', fontWeight: 600, fontSize: size, lineHeight: 1.0, letterSpacing: -size * 0.035, color: base }}>
          {line.map((raw, j) => {
            const text = raw.t.trim()
            const w = (
              <div key={`w${j}`} style={{ display: 'flex', position: 'relative' }}>
                <span style={{ color: raw.em ? C.gold : base, fontStyle: raw.em ? 'italic' : 'normal', fontWeight: raw.em ? 500 : 600 }}>{text}</span>
                {raw.sq ? (
                  <div style={{ display: 'flex', position: 'absolute', left: 0, bottom: -size * 0.18 }}>
                    <Squiggle color={C.gold} width={Math.max(140, text.length * size * 0.5)} />
                  </div>
                ) : null}
              </div>
            )
            if (j === 0 || tight(text)) return w
            return [<div key={`s${j}`} style={{ display: 'flex', width: size * 0.26 }} />, w]
          })}
        </div>
      ))}
    </div>
  )
}

type Scene = {
  tone: 'paper' | 'navy'
  eyebrow: string
  headline: Tok[][]
  sub?: string
  pill?: string
  big?: string
  vo: string
}

function Frame({
  scene,
  W,
  H,
  foot,
}: {
  scene: Scene
  W: number
  H: number
  foot: string
}) {
  const tone = scene.tone
  const bg = tone === 'navy' ? C.navy : C.cream
  const subc = tone === 'navy' ? 'rgba(232,236,240,0.85)' : C.muted
  const hl = tone === 'navy' ? 'rgba(232,236,240,0.18)' : C.hairline
  const pad = Math.round(W * 0.085)
  const hSize = scene.big ? Math.round(W * 0.085) : Math.round(W * 0.092)
  return (
    <div style={{ width: W, height: H, display: 'flex', background: bg, padding: 28 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: `1px solid ${hl}`, padding: `${pad}px ${pad}px` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, transform: 'rotate(-2.5deg)', alignSelf: 'flex-start', background: C.gold, color: C.ink, fontFamily: 'Inter', fontWeight: 600, fontSize: Math.round(W * 0.022), letterSpacing: 4, textTransform: 'uppercase', padding: '14px 24px' }}>
          <Mark color={C.ink} size={Math.round(W * 0.02)} />
          {scene.eyebrow}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: Math.round(W * 0.045) }}>
          {scene.big ? (
            <div style={{ display: 'flex', fontFamily: 'Fraunces', fontWeight: 600, fontSize: Math.round(W * 0.34), color: tone === 'navy' ? C.goldSoft : C.gold, lineHeight: 0.9, letterSpacing: -W * 0.012 }}>
              {scene.big}
            </div>
          ) : null}
          <Headline lines={scene.headline} size={hSize} tone={tone} />
          {scene.sub ? (
            <div style={{ display: 'flex', fontFamily: 'Inter', fontWeight: 400, fontSize: Math.round(W * 0.034), lineHeight: 1.35, color: subc, maxWidth: W * 0.82 }}>
              {scene.sub}
            </div>
          ) : null}
          {scene.pill ? (
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex', background: C.gold, color: C.ink, fontFamily: 'Inter', fontWeight: 600, fontSize: Math.round(W * 0.032), padding: '22px 38px' }}>
                {scene.pill}
              </div>
            </div>
          ) : null}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${hl}`, paddingTop: 26 }}>
          <div style={{ display: 'flex', fontFamily: 'Fraunces', fontWeight: 600, fontSize: Math.round(W * 0.034), color: C.gold, letterSpacing: -1 }}>Skillzy</div>
          <div style={{ display: 'flex', fontFamily: 'Inter', fontWeight: 600, fontSize: Math.round(W * 0.02), letterSpacing: 3, color: subc }}>{foot}</div>
        </div>
      </div>
    </div>
  )
}

// ---- journeys --------------------------------------------------------------
type Journey = { id: string; name: string; foot: string; scenes: Scene[] }

const sell: Scene[] = [
  { tone: 'paper', eyebrow: 'For creators', headline: [[{ t: 'You built' }], [{ t: 'something ' }, { t: 'good', em: true, sq: true }, { t: '.' }]], sub: 'It’s on your laptop. It could be earning while you sleep.', vo: 'You built something good. It is just sitting there.' },
  { tone: 'paper', eyebrow: 'List · Step 01', headline: [[{ t: 'Sign up' }]], sub: '30 seconds. Email or one-click GitHub. No application.', pill: 'Step 1 of 6', vo: 'Step one. Sign up. Email, or one click GitHub.' },
  { tone: 'paper', eyebrow: 'List · Step 02', headline: [[{ t: 'Drop your' }], [{ t: 'files' }]], sub: 'Skill, guide, or full agent setup — upload it as-is.', pill: 'Step 2 of 6', vo: 'Step two. Drop your files. Upload it as is.' },
  { tone: 'paper', eyebrow: 'List · Step 03', headline: [[{ t: 'AI writes' }], [{ t: 'the ' }, { t: 'listing', em: true }]], sub: 'Talk or type. It drafts the title, blurb and features.', pill: 'Step 3 of 6', vo: 'Step three. The A I writes your listing.' },
  { tone: 'paper', eyebrow: 'List · Step 04', headline: [[{ t: 'Quick' }], [{ t: 'review' }]], sub: 'Auto-scan plus a human look. Live in under 24 hours.', pill: 'Step 4 of 6', vo: 'Step four. A quick review. Live in a day.' },
  { tone: 'paper', eyebrow: 'List · Step 05', headline: [[{ t: 'Connect' }], [{ t: 'Stripe' }]], sub: 'One click. Payouts go straight to you. We never hold it.', pill: 'Step 5 of 6', vo: 'Step five. Connect Stripe. Paid direct.' },
  { tone: 'navy', eyebrow: 'You’re live', headline: [[{ t: 'In the' }], [{ t: 'marketplace', em: true }, { t: '.' }]], sub: 'Listed once. Found by every buyer searching that job.', pill: 'Step 6 of 6', vo: 'And you are live in the marketplace.' },
  { tone: 'navy', eyebrow: 'Sold', headline: [[{ t: 'Someone' }], [{ t: 'dropped it ' }, { t: 'in', em: true }, { t: '.' }]], sub: 'Stripe splits the sale the moment it happens.', vo: 'Then it sells. Someone drops it in.' },
  { tone: 'navy', eyebrow: 'Paid', big: '80%', headline: [[{ t: 'Stays with ' }, { t: 'you', em: true }, { t: '.' }]], sub: 'Every sale. No exceptions. ∞ resales per listing.', vo: 'You keep eighty percent. Every sale. Forever.' },
  { tone: 'navy', eyebrow: 'Become a creator', headline: [[{ t: 'List once.' }], [{ t: 'Earn ' }, { t: 'forever', em: true }, { t: '.' }]], pill: 'skillzy.ai/sell →', vo: 'List once. Earn forever. Skillzy dot A I, slash sell.' },
]

const buy: Scene[] = [
  { tone: 'paper', eyebrow: 'For buyers', headline: [[{ t: 'Your agent' }], [{ t: 'can’t do ' }, { t: 'that', em: true, sq: true }, { t: '.' }]], sub: 'Generic models guess. They’ve never done your job.', vo: 'Your agent can not do that. It has never done your job.' },
  { tone: 'paper', eyebrow: 'Buy · Step 01', headline: [[{ t: 'Search' }], [{ t: 'it' }]], sub: 'Type the job: invoices, follow-ups, daily summaries.', pill: 'Step 1 of 4', vo: 'Step one. Search the job.' },
  { tone: 'paper', eyebrow: 'Buy · Step 02', headline: [[{ t: 'Pick' }], [{ t: 'it' }]], sub: 'Real reviews, version, what you get, which agents it runs on.', pill: 'Step 2 of 4', vo: 'Step two. Pick it. Real reviews, real versions.' },
  { tone: 'paper', eyebrow: 'Buy · Step 03', headline: [[{ t: 'Check' }], [{ t: 'out' }]], sub: 'One Stripe checkout. Instant access. No hoops.', pill: 'Step 3 of 4', vo: 'Step three. Check out. One Stripe click.' },
  { tone: 'paper', eyebrow: 'Buy · Step 04', headline: [[{ t: 'Drop it' }], [{ t: 'in' }]], sub: 'Download the files, drop them into your agent.', pill: 'Step 4 of 4', vo: 'Step four. Drop it into your agent.' },
  { tone: 'navy', eyebrow: 'Result', headline: [[{ t: 'It just got' }], [{ t: 'smarter', em: true }, { t: '.' }]], sub: 'Built by someone who already does the work.', vo: 'And it just got smarter.' },
  { tone: 'navy', eyebrow: 'Total time', big: '60s', headline: [[{ t: 'That’s the' }], [{ t: 'whole ' }, { t: 'thing', em: true }, { t: '.' }]], sub: 'No subscription. No onboarding call. It just works.', vo: 'Sixty seconds. That is the whole thing.' },
  { tone: 'navy', eyebrow: 'Your move', headline: [[{ t: 'Find the' }], [{ t: 'skill', em: true }, { t: ' you need.' }]], pill: 'skillzy.ai/marketplace →', vo: 'Find the skill you needed. Skillzy dot A I, slash marketplace.' },
]

const JOURNEYS: Journey[] = [
  { id: 'list-to-sell', name: 'List → Sell', foot: 'skillzy.ai/sell', scenes: sell },
  { id: 'find-and-drop', name: 'Find → Drop in', foot: 'skillzy.ai/marketplace', scenes: buy },
]

const FPS = 30
const T = 0.4 // crossfade seconds
const LEAD = 0.35 // quiet before the VO starts inside a scene
const TAIL = 0.55 // quiet after the VO before crossfade out
const SR = 44100
const FORMATS: { name: string; W: number; H: number }[] = [
  { name: '9x16', W: 1080, H: 1920 },
  { name: '1x1', W: 1080, H: 1080 },
]

// ---- voiceover -------------------------------------------------------------
// Offline eSpeak (mespeak) so it works on the network allowlist. To use a real
// voice instead, drop NN.mp3 / NN.wav into marketing/video/vo/<journeyId>/ and
// rerun — present files override the synthesized track.
const require = createRequire(import.meta.url)
let mespeak: any
function initVoice() {
  mespeak = require('mespeak')
  mespeak.loadConfig(require('mespeak/src/mespeak_config.json'))
  mespeak.loadVoice(require('mespeak/voices/en/en-us.json'))
}
function synthVO(text: string, outWav: string) {
  const buf = mespeak.speak(text, { rawdata: 'buffer', speed: 178, pitch: 46, amplitude: 100, wordgap: 1 })
  writeFileSync(outWav, Buffer.from(buf))
}
function audioDuration(file: string): number {
  const r = spawnSync(ffmpegPath as unknown as string, ['-hide_banner', '-i', file], { encoding: 'utf8' })
  const m = (r.stderr || '').match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/)
  if (!m) throw new Error('no duration for ' + file)
  return +m[1] * 3600 + +m[2] * 60 + +m[3]
}
function findOverride(dir: string, i: number): string | null {
  for (const ext of ['mp3', 'wav', 'm4a', 'aac']) {
    const p = join(dir, `${String(i).padStart(2, '0')}.${ext}`)
    if (existsSync(p)) return p
  }
  return null
}

async function renderScenes(fonts: any, scenes: Scene[], foot: string, W: number, H: number, dir: string) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  for (let i = 0; i < scenes.length; i++) {
    const img = new ImageResponse(<Frame scene={scenes[i]} W={W} H={H} foot={foot} />, { width: W, height: H, fonts })
    writeFileSync(join(dir, `${String(i).padStart(2, '0')}.png`), Buffer.from(await img.arrayBuffer()))
  }
}

function encode(
  framesDir: string,
  audio: string[],
  durs: number[],
  W: number,
  H: number,
  outFile: string,
) {
  const n = durs.length
  const args: string[] = ['-y']
  for (let i = 0; i < n; i++)
    args.push('-framerate', String(FPS), '-loop', '1', '-t', durs[i].toFixed(3), '-i', join(framesDir, `${String(i).padStart(2, '0')}.png`))
  for (let i = 0; i < n; i++) args.push('-i', audio[i])

  // cumulative geometry for variable-length crossfade chain
  const cumPre: number[] = [0]
  for (let i = 0; i < n; i++) cumPre.push(cumPre[i] + durs[i])
  const total = cumPre[n] - (n - 1) * T
  const sceneStart = (i: number) => (i === 0 ? 0 : cumPre[i] - (i - 1) * T)

  const parts: string[] = []
  for (let i = 0; i < n; i++) parts.push(`[${i}:v]scale=${W}:${H},setsar=1,format=yuv420p,fps=${FPS}[v${i}]`)
  let prev = 'v0'
  for (let i = 1; i < n; i++) {
    const off = (cumPre[i] - i * T).toFixed(3)
    const out = i === n - 1 ? 'vx' : `x${i}`
    parts.push(`[${prev}][v${i}]xfade=transition=fade:duration=${T}:offset=${off}[${out}]`)
    prev = out
  }
  parts.push(`[vx]fade=t=in:st=0:d=0.4,fade=t=out:st=${(total - 0.5).toFixed(3)}:d=0.5[vf]`)

  const alabels: string[] = []
  for (let i = 0; i < n; i++) {
    const delay = Math.round((sceneStart(i) + LEAD) * 1000)
    parts.push(`[${n + i}:a]aformat=channel_layouts=stereo:sample_rates=${SR},adelay=${delay}|${delay}[a${i}]`)
    alabels.push(`[a${i}]`)
  }
  parts.push(
    `${alabels.join('')}amix=inputs=${n}:normalize=0:dropout_transition=0[amix];` +
      `[amix]aresample=${SR},dynaudnorm=f=220:g=7,afade=t=in:st=0:d=0.2,afade=t=out:st=${(total - 0.6).toFixed(3)}:d=0.6,apad,atrim=0:${total.toFixed(3)}[aud]`,
  )

  args.push(
    '-filter_complex', parts.join(';'),
    '-map', '[vf]', '-map', '[aud]',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p',
    '-r', String(FPS), '-c:a', 'aac', '-b:a', '160k',
    '-movflags', '+faststart', '-t', total.toFixed(3),
    outFile,
  )
  execFileSync(ffmpegPath as unknown as string, args, { stdio: ['ignore', 'ignore', 'inherit'] })
}

async function main() {
  if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true })
  console.log('loading fonts…')
  const fonts = await loadFonts()
  initVoice()

  for (const j of JOURNEYS) {
    const n = j.scenes.length
    const voDir = join(OUT, 'vo', j.id)
    const voOut = join(TMP, j.id, 'vo')
    if (!existsSync(voOut)) mkdirSync(voOut, { recursive: true })

    console.log(`voiceover: ${j.name} (${n} lines)`)
    const audio: string[] = []
    const durs: number[] = []
    for (let i = 0; i < n; i++) {
      const override = existsSync(voDir) ? findOverride(voDir, i) : null
      let file: string
      if (override) {
        file = override
      } else {
        file = join(voOut, `${String(i).padStart(2, '0')}.wav`)
        synthVO(j.scenes[i].vo, file)
      }
      const d = audioDuration(file)
      audio.push(file)
      durs.push(Math.min(5.6, Math.max(2.5, LEAD + d + TAIL)))
    }

    for (const f of FORMATS) {
      const fdir = join(TMP, j.id, f.name)
      console.log(`  render ${n} scenes @ ${f.W}x${f.H} (${f.name})`)
      await renderScenes(fonts, j.scenes, j.foot, f.W, f.H, fdir)
      const out = join(OUT, `skillzy-${j.id}-${f.name}.mp4`)
      console.log(`  encode → ${out}`)
      encode(fdir, audio, durs, f.W, f.H, out)
    }
  }
  rmSync(TMP, { recursive: true, force: true })
  console.log('done →', OUT)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
