/**
 * AI-assisted listing draft. Takes a rough brief from a creator —
 * "real estate skill bundle, captures leads, drafts listings, follow
 * ups, used at my old agency for 240 listings" — and returns a
 * polished {title, tagline, niche, platforms[]} plus a longer
 * description the creator can edit.
 *
 * POST /api/listings/draft
 *   body: { brief: string, type: 'skill'|'guide'|'agent_setup' }
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
  const { brief, type } = await req.json().catch(() => ({}))
  const briefStr = String(brief ?? '').trim()
  const typeStr = String(type ?? 'skill') as 'skill' | 'guide' | 'agent_setup'

  if (!briefStr) {
    return NextResponse.json({ error: 'Brief is required.' }, { status: 400 })
  }

  if (!hasAnthropic) {
    return NextResponse.json(demoDraft(briefStr, typeStr))
  }

  const userPrompt = `Product type: ${typeStr}\n\nCreator brief:\n${briefStr}\n\nWrite the listing.`

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
        messages: [{ role: 'user', content: userPrompt }],
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
