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
import { checkRateLimit, callerIp } from '@/lib/rate-limit'
import { getUser } from '@/lib/auth'

export const runtime = 'nodejs'

// Anonymous is intentional — "drop a file, see your listing in seconds"
// is the conversion hook. Bounds on AI spend:
//   - anon per-IP daily: tight, so a botnet can't farm drafts
//   - signed-in per-user daily: 10× the anon cap so real creators
//     can list a dozen products in one sitting without hitting a wall
//   - global hourly: catastrophic-bill circuit breaker
//
// Backend is Upstash Redis (persistent) if UPSTASH_REDIS_REST_URL and
// UPSTASH_REDIS_REST_TOKEN are set; in-memory per-instance otherwise
// (soft limit — counters reset on Vercel cold-start).
const ANON_DAILY = 10
const USER_DAILY = 100
const GLOBAL_HOURLY = 200

function todayBucket() {
  return new Date().toISOString().slice(0, 10) // YYYY-MM-DD
}

function hourBucket() {
  const d = new Date()
  return `${d.toISOString().slice(0, 13)}` // YYYY-MM-DDTHH
}

const SYSTEM = `You write Skillzy product listings. Skillzy is a global marketplace for AI agent skills, guides, ready-to-go agent setups, curated prompt packs, scheduled loops (recurring workflows that run themselves), and MCP servers (Model Context Protocol servers — packaged tool/data-source connectors a buyer plugs into their Claude / Cursor / Windsurf agent) — dropped into a buyer's agent or copied straight into Claude/ChatGPT.

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
  // Global hourly cap first — catastrophic-bill protection.
  const globalCheck = await checkRateLimit(`draft:global:${hourBucket()}`, {
    max: GLOBAL_HOURLY,
    windowSec: 3600,
    reason: 'AI drafts are busy right now. Try again in a few minutes.',
  })
  if (!globalCheck.ok) {
    return NextResponse.json({ error: globalCheck.reason }, { status: 429 })
  }

  // Signed-in creators get a much larger per-user budget than anon
  // visitors. Anon visitors stay capped per-IP so a single machine
  // can't farm the API.
  const user = await getUser().catch(() => null)
  if (user) {
    const userCheck = await checkRateLimit(
      `draft:user:${user.id}:${todayBucket()}`,
      {
        max: USER_DAILY,
        windowSec: 86_400,
        reason:
          "You've used today's AI draft budget. It resets at midnight UTC — or email help@skillzy.ai if you're working on a bigger batch and need a lift.",
      },
    )
    if (!userCheck.ok) {
      return NextResponse.json({ error: userCheck.reason }, { status: 429 })
    }
  } else {
    const ip = callerIp(req)
    const ipCheck = await checkRateLimit(`draft:ip:${ip}:${todayBucket()}`, {
      max: ANON_DAILY,
      windowSec: 86_400,
      reason:
        "You've used today's AI drafts. Sign in to keep going (signed-in creators get a much larger daily budget), or come back tomorrow.",
    })
    if (!ipCheck.ok) {
      return NextResponse.json({ error: ipCheck.reason }, { status: 429 })
    }
  }

  const { brief, type, pdfs, pdfBase64, pdfName } = await req
    .json()
    .catch(() => ({}))
  const briefStr = String(brief ?? '').trim()
  const typeStr = String(type ?? 'skill') as
    | 'skill'
    | 'guide'
    | 'agent_setup'
    | 'prompt_pack'
    | 'loop'
    | 'mcp_server'

  // Normalise PDFs to a list. Accept the new `pdfs` array (multiple docs)
  // or the legacy single pdfBase64/pdfName. Capped to bound request size.
  const pdfList: { data: string; name: string }[] = Array.isArray(pdfs)
    ? pdfs
        .filter(
          (p: unknown): p is { data: string; name?: string } =>
            !!p &&
            typeof (p as { data?: unknown }).data === 'string' &&
            (p as { data: string }).data.trim().length > 0,
        )
        .map((p) => ({
          data: p.data.trim(),
          name: String(p.name ?? 'document.pdf').trim(),
        }))
        .slice(0, 8)
    : typeof pdfBase64 === 'string' && pdfBase64.trim()
      ? [
          {
            data: pdfBase64.trim(),
            name: String(pdfName ?? 'the attached document').trim(),
          },
        ]
      : []

  if (!briefStr && pdfList.length === 0) {
    return NextResponse.json(
      { error: 'Add a brief or drop a file first.' },
      { status: 400 },
    )
  }

  if (!hasAnthropic) {
    // Seed the stub from whatever we have so the form still fills in.
    return NextResponse.json(
      demoDraft(briefStr || pdfList[0]?.name || 'the attached document', typeStr),
    )
  }

  const instruction =
    pdfList.length > 0
      ? `Product type: ${typeStr}\n\nThe creator attached ${pdfList.length} document${
          pdfList.length > 1 ? 's' : ''
        } (${pdfList
          .map((p) => `"${p.name}"`)
          .join(
            ', ',
          )}). Read ALL of them in full and write a single listing that accurately covers everything they describe together.${
          briefStr ? `\n\nThey also added: ${briefStr}` : ''
        }\n\nWrite the listing.`
      : `Product type: ${typeStr}\n\nCreator brief:\n${briefStr}\n\nWrite the listing.`

  const userContent =
    pdfList.length > 0
      ? [
          ...pdfList.map((p) => ({
            type: 'document',
            source: {
              type: 'base64',
              media_type: 'application/pdf',
              data: p.data,
            },
          })),
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
        // 2048 leaves enough headroom for a full structured listing
        // (title + tagline + niche + platforms[] + description[2-3] +
        // whatYouGet[4-7]) without risking a mid-JSON cutoff that the
        // parser would then misread as non-JSON. 1024 was tight on
        // longer descriptions.
        max_tokens: 2048,
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
      `[listing-draft] model=${env.anthropic.model} source=${pdfList.length ? `${pdfList.length}pdf` : 'text'} ` +
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
