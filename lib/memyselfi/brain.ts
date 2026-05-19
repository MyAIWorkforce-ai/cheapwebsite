import type { Twin, Knowledge } from './twins'

const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'if', 'is', 'are', 'was', 'were', 'be',
  'been', 'being', 'do', 'does', 'did', 'have', 'has', 'had', 'i', 'you', 'your',
  'me', 'my', 'we', 'our', 'they', 'it', 'its', 'to', 'of', 'in', 'on', 'for',
  'with', 'about', 'as', 'at', 'by', 'from', 'so', 'that', 'this', 'these',
  'those', 'what', 'how', 'why', 'when', 'who', 'can', 'could', 'should',
  'would', 'will', 'tell', 'give', 'get', 'please', 'just', 'really', 'some',
  'any', 'there', 'their', 'them', 'into', 'out', 'up', 'down', 'over',
])

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, ' ')
    .split(/\s+/)
    .map((w) => w.replace(/^['-]+|['-]+$/g, ''))
    .filter((w) => w.length > 1 && !STOPWORDS.has(w))
}

function scoreEntry(queryTokens: string[], entry: Knowledge): number {
  const tagList = entry.tags.flatMap((t) => tokenize(t))
  const tagSet = new Set(tagList)
  const qSet = new Set(entry.q ? tokenize(entry.q) : [])
  const aSet = new Set(tokenize(entry.a))

  let score = 0
  for (const qt of queryTokens) {
    if (tagSet.has(qt)) score += 5
    else if (tagList.some((tt) => tt.startsWith(qt) || qt.startsWith(tt)))
      score += 3

    if (qSet.has(qt)) score += 2
    if (aSet.has(qt)) score += 1
  }
  return score
}

export type Reply = {
  text: string
  // true when the twin had a confident, knowledge-backed answer.
  grounded: boolean
}

export function respond(twin: Twin, message: string, turn: number): Reply {
  const tokens = tokenize(message)

  if (tokens.length === 0) {
    return {
      text:
        twin.deflections[turn % twin.deflections.length] ||
        'Ask me something — I’m better with a real question.',
      grounded: false,
    }
  }

  let best: Knowledge | null = null
  let bestScore = 0
  for (const entry of twin.knowledge) {
    const s = scoreEntry(tokens, entry)
    if (s > bestScore) {
      bestScore = s
      best = entry
    }
  }

  // Require a real signal, scaled a little by question length so a single
  // strong keyword still lands but vague one-word prods don't over-trigger.
  const threshold = tokens.length <= 2 ? 4 : 5

  if (best && bestScore >= threshold) {
    return { text: best.a, grounded: true }
  }

  return {
    text: twin.deflections[turn % twin.deflections.length],
    grounded: false,
  }
}
