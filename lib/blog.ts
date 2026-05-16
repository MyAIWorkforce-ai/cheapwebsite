// Editorial posts. Structured TS (no MDX toolchain) — matches the
// lib/catalog.ts / lib/content.ts pattern. Body is an ordered list
// of blocks the renderer maps to elements.

export type Block =
  | { t: 'h2'; text: string }
  | { t: 'p'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'quote'; text: string }
  | { t: 'listing'; id: string; label: string } // inline featured-listing card

export type Post = {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  updatedAt: string
  author: string
  authorRole: string
  tags: string[]
  relatedListings: string[]
  body: Block[]
}

const P = (text: string): Block => ({ t: 'p', text })
const H = (text: string): Block => ({ t: 'h2', text })
const UL = (items: string[]): Block => ({ t: 'ul', items })
const QUOTE = (text: string): Block => ({ t: 'quote', text })
const L = (id: string, label: string): Block => ({ t: 'listing', id, label })

export const POSTS: Post[] = [
  {
    slug: 'what-is-a-skill-md-file',
    title: 'What is a SKILL.md file (and why it matters in 2026)',
    excerpt:
      'The single file that turns a general AI into a specialist at one job — explained without the jargon.',
    publishedAt: '2026-05-20',
    updatedAt: '2026-05-20',
    author: 'Toby Banks',
    authorRole: 'Founder, Skillzy',
    tags: ['skill.md', 'guides', 'fundamentals'],
    relatedListings: ['first-skill-md', 'agent-prompt-patterns'],
    body: [
      P('Every working AI agent is a stack of small, specific capabilities. A SKILL.md file is how you hand the agent one of those capabilities — cleanly, repeatably, without re-explaining it every time.'),
      H('The short version'),
      P('A SKILL.md is a Markdown file with a small header (what the skill is, what tools it can touch) and a body that tells the agent exactly how to do one job: the intent, the inputs, the steps, the output. You drop it into your agent’s skills folder. The agent picks it up. Done.'),
      H('Why a file, not a prompt?'),
      P('Prompts evaporate. A file is versioned, shareable, and reviewable. It survives a model upgrade. It can be sold, bought, and improved by someone who is not you. That is the whole basis of a skills marketplace.'),
      UL([
        'Portable — the same file works across Claude, OpenClaw, and most agents',
        'Reviewable — a human can read it before trusting it',
        'Composable — ten small skills beat one giant prompt',
      ]),
      H('What good looks like'),
      P('A good SKILL.md does one thing. It names the failure mode it solves. It is boring to read, which is the point — boring is predictable, and predictable is what you want running unattended.'),
      L('first-skill-md', 'Your first SKILL.md, the right way'),
      P('If you are writing your own, start with the guide above. If you would rather buy one that already works, the catalogue is full of them.'),
    ],
  },
  {
    slug: 'claude-vs-chatgpt-small-business',
    title: 'Claude vs ChatGPT for small business automation',
    excerpt:
      'Both can run your back office. Here is the honest difference for a non-technical operator.',
    publishedAt: '2026-05-23',
    updatedAt: '2026-05-23',
    author: 'Toby Banks',
    authorRole: 'Founder, Skillzy',
    tags: ['claude', 'chatgpt', 'comparison'],
    relatedListings: ['review-responder', 'daily-summary-email'],
    body: [
      P('If you run a small business and want an agent doing real work — quoting, replying, summarising — you will end up choosing between Claude and ChatGPT. Here is the version without the benchmark charts.'),
      H('Where Claude wins'),
      P('Long, structured instructions. SKILL.md-style files were practically designed for the way Claude follows multi-step instructions and respects tool boundaries. If you are buying drop-in skills, Claude is the path of least resistance.'),
      H('Where ChatGPT wins'),
      P('Install base and familiarity. Your team probably already uses it. Custom GPTs are a low-friction way to get a non-technical person running a skill without touching a settings panel they fear.'),
      H('The honest answer'),
      P('It matters less than the skill itself. A well-built skill ports between both. Pick the one your team will actually open every morning, then buy skills tagged for it.'),
      L('review-responder', 'Customer review responder'),
      L('daily-summary-email', 'Daily summary email'),
    ],
  },
  {
    slug: 'ai-agent-for-electricians',
    title: 'How to build an AI agent for electricians (real example)',
    excerpt:
      'From “I quote at 9pm” to quotes out on site, follow-ups handled, certs never missed.',
    publishedAt: '2026-05-27',
    updatedAt: '2026-05-27',
    author: 'Toby Banks',
    authorRole: 'Founder, Skillzy',
    tags: ['electricians', 'claude', 'case-study'],
    relatedListings: ['electrician-ops-setup', 'compliance-cert-reminder'],
    body: [
      P('A two-van electrical business had the same problem every trade business has: the job stops at 5pm, the office work starts at 9pm, and the good leads went cold while the quote sat unwritten.'),
      H('What they automated'),
      UL([
        'Quote from a photo + a voice note, on site',
        'Follow-up until the quote is won or dead',
        'Certificate-of-compliance tracking that nags until filed',
        'Polite debtor chasing that keeps the customer',
      ]),
      H('How it was wired'),
      P('No code. An Agent Setup dropped into their agent, connected to Xero and a job-management tool with the included flows. Setup was an evening, once.'),
      QUOTE('We stopped losing the “did they ever get back to me” jobs. That was the whole game.'),
      L('electrician-ops-setup', 'Sparky Ops, wired'),
      P('The full setup is in the catalogue. If you only fix one thing first, fix compliance certs — it is the cheapest listing and the one that stops a fine.'),
      L('compliance-cert-reminder', 'Compliance cert chaser'),
    ],
  },
]

export function getAllPosts(): Post[] {
  return [...POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}
export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug)
}
export function readingMinutes(p: Post): number {
  const words = p.body.reduce((acc, b) => {
    if (b.t === 'p' || b.t === 'h2' || b.t === 'quote') return acc + b.text.split(/\s+/).length
    if (b.t === 'ul') return acc + b.items.join(' ').split(/\s+/).length
    return acc
  }, 0)
  return Math.max(2, Math.round(words / 200))
}
