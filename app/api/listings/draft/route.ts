/**
 * AI-assisted listing draft. Takes a rough brief from a creator —
 * "real estate skill bundle, captures leads, drafts listings, follow
 * ups, used at my old agency for 240 listings" — and returns a
 * polished {title, tagline, niche, platforms[]} plus a longer
 * description the creator can edit.
 *
 * POST /api/listings/draft
 *   body: { brief?: string, type: 'skill'|'guide'|'agent_setup',
 *           pdfBase64?: string, pdfName?: string }
 *   Claude reads a dropped PDF natively (document block); a text
 *   brief works too. At least one must be present.
 *   200 -> { title, tagline, niche, platforms[], description[], whatYouGet[] }
 *
 * Demo mode (no ANTHROPIC_API_KEY): returns a deterministic stub so
 * the form still feels alive without a key configured.
 */
import { NextResponse } from 'next/server'
import { env, hasAnthropic } from '@/lib/env'

export const runtime = 'nodejs'

// Rate limit guards. The endpoint stays open to anonymous visitors so
// "drop a file, see your listing in seconds" still works as the hook,
// but we bound the cost surface area:
//   - per-IP daily cap: stops one machine running up the bill
//   - global hourly cap: stops a botnet running up the bill catastrophically
//
// State is kept in-process per Vercel function instance. Functions warm
// for a few minutes then cold-start, so this is a soft per-instance
// limit — fine for casual abuse, not bulletproof. Add Vercel KV /
// Upstash if you need a hard global counter.
const PER_IP_DAILY = 10
const GLOBAL_HOURLY = 50

type Counter = { count: number; resetAt: number }
const perIp: Map<string, Counter> = (globalThis as { __skillzyPerIp?: Map<string, Counter> }).__skillzyPerIp ?? new Map()
;(globalThis as { __skillzyPerIp?: Map<string, Counter> }).__skillzyPerIp = perIp
const globalCounter: Counter = (globalThis as { __skillzyGlobal?: Counter }).__skillzyGlobal ?? { count: 0, resetAt: Date.now() + 3600_000 }
;(globalThis as { __skillzyGlobal?: Counter }).__skillzyGlobal = globalCounter

function rateLimitCheck(ip: string): { ok: true } | { ok: false; reason: string } {
  const now = Date.now()
  // Global hourly bucket
  if (now > globalCounter.resetAt) {
    globalCounter.count = 0
    globalCounter.resetAt = now + 3600_000
  }
  if (globalCounter.count >= GLOBAL_HOURLY) {
    return { ok: false, reason: 'AI drafts are busy right now. Try again in a few minutes.' }
  }
  // Per-IP daily bucket
  let entry = perIp.get(ip)
  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + 86_400_000 }
    perIp.set(ip, entry)
  }
  if (entry.count >= PER_IP_DAILY) {
    return {
      ok: false,
      reason:
        'You’ve used today’s AI drafts. Sign in to keep going, or come back tomorrow.',
    }
  }
  entry.count++
  globalCounter.count++
  return { ok: true }
}

function callerIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0]?.trim() || 'unknown'
  return req.headers.get('x-real-ip')?.trim() || 'unknown'
}

const SYSTEM = `You write Skillzy product listings. Skillzy is a marketplace for AI agent skills, guides, and ready-to-go agent setups, dropped into a buyer's agent.

Voice:
- Punchy. Short sentences. Verbs first.
- No hype, no exclamation marks, no emoji.
- Title is a noun-led phrase ending in a period, e.g. "Real Estate, end to end."
- Tagline is one sentence; starts with a verb.

Reply with ONLY valid JSON matching this exact shape — no prose, no markdown, no code fences:
{
  "title": string,
  "tagline": string,
  "niche": string,
  "platforms": string[],
  "description": string[],
  "whatYouGet": string[]
}

Rules:
- "description" is 2–3 short paragraphs.
- "whatYouGet" is 4–7 concrete bullet items (no leading dash, no period).
- "platforms" picks from: Claude, OpenClaw, Manus, ChatGPT, Hermes, Gemini, Grok, Ollama, Mistral, DeepSeek, n8n, Make, Zapier. Pick only the ones the brief implies.
- "niche" is a short label like "Real Estate", "Tradies", "Healthcare", "Hospitality", "Coaches", "E-commerce".`

type DraftResult = {
  title: string
  tagline: string
  niche: string
  platforms: string[]
  description: string[]
  whatYouGet: string[]
}

function demoDraft(brief: string, type: string): DraftResult {
  const verb = type === 'guide' ? 'Read it. Build it.' : 'Drop it in. Done.'
  return {
    title: 'Your skill, polished.',
    tagline: `${brief.slice(0, 60) || 'Captures, drafts, follows up'} — in one bundle.`,
    niche: 'Real Estate',
    platforms: ['Claude', 'OpenClaw'],
    description: [
      'Demo draft — set ANTHROPIC_API_KEY in your env vars to get a real Claude-written draft here.',
      verb,
    ],
    whatYouGet: [
      'SKILL.md for the core capability',
      'System prompts for buyer + seller flows',
      'Example outputs to seed evaluation',
      'A 5-minute setup guide',
    ],
  }
}

export async function POST(req: Request) {
  // Anonymous use is allowed by design — the drop-a-file-and-watch-it-
  // draft moment is the conversion hook. The rate limiter caps the
  // damage if a bot decides to abuse it.
  const limit = rateLimitCheck(callerIp(req))
  if (!limit.ok) {
    return NextResponse.json({ error: limit.reason }, { status: 429 })
  }

  const { brief, type, pdfBase64, pdfName } = await req
    .json()
    .catch(() => ({}))
  const briefStr = String(brief ?? '').trim()
  const typeStr = String(type ?? 'skill') as 'skill' | 'guide' | 'agent_setup'
  const pdf = typeof pdfBase64 === 'string' ? pdfBase64.trim() : ''
  const pdfLabel = String(pdfName ?? 'the attached document').trim()

  if (!briefStr && !pdf) {
    return NextResponse.json(
      { error: 'Add a brief or drop a file first.' },
      { status: 400 },
    )
  }

  if (!hasAnthropic) {
    // Seed the stub from whatever we have so the form still fills in.
    return NextResponse.json(demoDraft(briefStr || pdfLabel, typeStr))
  }

  const instruction = pdf
    ? `Product type: ${typeStr}\n\nThe creator dropped a document ("${pdfLabel}"). Read it in full and write the listing from what it actually describes.${
        briefStr ? `\n\nThey also added: ${briefStr}` : ''
      }\n\nWrite the listing.`
    : `Product type: ${typeStr}\n\nCreator brief:\n${briefStr}\n\nWrite the listing.`

  const userContent = pdf
    ? [
        {
          type: 'document',
          source: {
            type: 'base64',
            media_type: 'application/pdf',
            data: pdf,
          },
        },
        { type: 'text', text: instruction },
      ]
    : instruction

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': env.anthropic.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: env.anthropic.model,
        max_tokens: 1024,
        system: SYSTEM,
        messages: [{ role: 'user', content: userContent }],
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      return NextResponse.json(
        { error: `Anthropic ${res.status}: ${body.slice(0, 200)}` },
        { status: 502 },
      )
    }

    const json = await res.json()

    // Per-draft cost telemetry. Anthropic returns token counts on every
    // response; we log them + a USD estimate so real cost-per-listing is
    // visible in the Vercel logs instead of guessed. Rates are Haiku 4.5
    // ($1/1M in, $5/1M out) — update if env.anthropic.model changes.
    const u = json?.usage ?? {}
    const inTok = Number(u.input_tokens ?? 0)
    const outTok = Number(u.output_tokens ?? 0)
    const usdEst = (inTok / 1e6) * 1 + (outTok / 1e6) * 5
    console.log(
      `[listing-draft] model=${env.anthropic.model} source=${pdf ? 'pdf' : 'text'} ` +
        `type=${typeStr} in=${inTok} out=${outTok} ~$${usdEst.toFixed(4)}`,
    )

    const text: string = json?.content?.[0]?.text ?? ''
    const stripped = text.replace(/^```(?:json)?\s*|\s*```$/g, '').trim()
    let parsed: DraftResult
    try {
      parsed = JSON.parse(stripped)
    } catch {
      return NextResponse.json(
        { error: 'Model returned non-JSON. Try again.', raw: text },
        { status: 502 },
      )
    }

    // Light shape guard.
    return NextResponse.json({
      title: String(parsed.title ?? '').trim(),
      tagline: String(parsed.tagline ?? '').trim(),
      niche: String(parsed.niche ?? '').trim(),
      platforms: Array.isArray(parsed.platforms) ? parsed.platforms.map(String) : [],
      description: Array.isArray(parsed.description) ? parsed.description.map(String) : [],
      whatYouGet: Array.isArray(parsed.whatYouGet) ? parsed.whatYouGet.map(String) : [],
    })
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    )
  }
}
