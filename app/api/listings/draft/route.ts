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
- "platforms" picks from: Claude, OpenClaw, ChatGPT, Hermes, Gemini, Grok, Ollama, Mistral, DeepSeek, n8n, Make, Zapier. Pick only the ones the brief implies.
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
