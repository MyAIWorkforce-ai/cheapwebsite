import type { Twin, Knowledge } from './twins'

export type TwinInput = {
  name: string
  handle: string
  role: string
  location: string
  tagline: string
  bio: string
  accent: string
  voice: string
  facts: { topic: string; answer: string }[]
}

const STOP = new Set([
  'the', 'and', 'for', 'with', 'that', 'this', 'your', 'you', 'are', 'was',
  'how', 'what', 'why', 'when', 'who', 'about', 'from', 'into', 'have', 'has',
])

function tagsFrom(topic: string, answer: string): string[] {
  const words = `${topic} ${answer}`
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w))
  return Array.from(new Set([...topic.toLowerCase().split(/\s+/), ...words])).slice(
    0,
    10,
  )
}

export function sanitizeHandle(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^@/, '')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 24)
}

export function buildTwin(input: TwinInput): Twin {
  const shortName = input.name.trim().split(/\s+/)[0] || input.name.trim()
  const bioParas = input.bio
    .split(/\n{2,}|\r\n\r\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .slice(0, 2)

  const knowledge: Knowledge[] = input.facts
    .filter((f) => f.topic.trim() && f.answer.trim())
    .map((f) => ({
      q: f.topic.trim(),
      tags: tagsFrom(f.topic, f.answer),
      a: f.answer.trim(),
    }))

  const voice = input.voice.trim()
  const greeting = `Hi — I’m ${shortName}’s twin. ${
    input.tagline.trim() ||
    `I think and answer the way ${shortName} does.`
  } Ask me anything.`

  return {
    handle: sanitizeHandle(input.handle || input.name),
    name: input.name.trim(),
    shortName,
    role: input.role.trim() || 'Built with memyselfi.ai',
    location: input.location.trim(),
    tagline: input.tagline.trim(),
    accent: /^#[0-9a-fA-F]{6}$/.test(input.accent) ? input.accent : '#8C7BFF',
    bio: bioParas.length ? bioParas : [input.tagline.trim() || ''],
    greeting,
    suggestions: knowledge.slice(0, 4).map((k) => k.q || 'Tell me about yourself'),
    deflections: [
      `That’s outside what ${shortName} taught me — I’d rather not make it up. Try one of the things I do know.`,
      voice
        ? `Honestly? Not my area. ${shortName} keeps me ${voice.toLowerCase()}, and that means not bluffing.`
        : `I don’t have a real answer to that. Ask me what I actually know.`,
    ],
    knowledge,
  }
}
