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
  {
    slug: 'n8n-vs-make-vs-zapier-for-ai-agents',
    title: 'n8n vs Make vs Zapier for AI agents',
    excerpt:
      'Which one to wire your agent into when you are not a developer — and the one to avoid for this job.',
    publishedAt: '2026-05-30',
    updatedAt: '2026-05-30',
    author: 'Toby Banks',
    authorRole: 'Founder, Skillzy',
    tags: ['n8n', 'make', 'zapier', 'comparison'],
    relatedListings: ['wire-claude-and-n8n', 'first-skill-md'],
    body: [
      P('You bought a skill. Now it needs to touch your real tools — your inbox, your invoicing, your job board. That connective layer is where n8n, Make, and Zapier live. They are not the agent. They are the wiring.'),
      H('Zapier'),
      P('Easiest to start, hardest to scale. If your skill does one trigger and one action, Zapier gets you live tonight. Costs climb fast once a skill fires hundreds of times a day, and complex branching gets ugly.'),
      H('Make'),
      P('The middle. Visual, cheaper per operation than Zapier, handles branching and loops without a fight. The learning curve is a weekend, not an hour. Most non-technical operators settle here.'),
      H('n8n'),
      P('The one we tag most skills for. Self-hostable, no per-operation tax, and it does not flinch at the multi-step flows real agent work needs. It asks more of you up front and pays it back every month after.'),
      H('The honest call'),
      P('Start on whatever you already pay for. Move to n8n the first time a bill or a branching limit makes you wince. The skill itself ports between all three — that is the point of buying one built properly.'),
      L('wire-claude-and-n8n', 'Wire Claude into n8n'),
      L('first-skill-md', 'Your first SKILL.md, the right way'),
    ],
  },
  {
    slug: 'bookkeepers-bas-with-an-ai-agent',
    title: 'How bookkeepers are handling BAS with an AI agent',
    excerpt:
      'The quarterly scramble, automated down to a review-and-lodge. A real workflow, not a demo.',
    publishedAt: '2026-06-03',
    updatedAt: '2026-06-03',
    author: 'Toby Banks',
    authorRole: 'Founder, Skillzy',
    tags: ['bookkeeping', 'bas', 'case-study'],
    relatedListings: ['bas-prep-assistant', 'receipt-parser', 'bookkeeper-agent-setup'],
    body: [
      P('BAS time is not hard. It is just relentless — chasing receipts, coding the odd ones, reconciling, then sanity-checking before lodging. A bookkeeper running a dozen clients does that loop a dozen times a quarter.'),
      H('What gets automated'),
      UL([
        'Receipts in from email and photo, parsed and coded',
        'Outliers flagged for a human, not silently guessed',
        'A reconciliation pass with the discrepancies listed plainly',
        'A BAS-ready summary you review, not one that lodges itself',
      ]),
      H('The line we hold'),
      P('The agent prepares. A human lodges. Anything touching a tax authority should have a person who signs off — the skill is built to stop at exactly that line, on purpose.'),
      L('receipt-parser', 'Receipt parser'),
      L('bas-prep-assistant', 'BAS prep assistant'),
      QUOTE('It turned three days of quarterly grind into an afternoon of checking.'),
      P('If you run a book of clients, the full setup wires the lot together. Start with the receipt parser if you want one win this week.'),
      L('bookkeeper-agent-setup', 'Bookkeeper agent setup'),
    ],
  },
  {
    slug: 'best-ai-agent-platforms-non-technical',
    title: 'The best AI agent platforms for non-technical operators',
    excerpt:
      'You do not need to code. You do need to pick the right place to stand. Here is the shortlist.',
    publishedAt: '2026-06-06',
    updatedAt: '2026-06-06',
    author: 'Toby Banks',
    authorRole: 'Founder, Skillzy',
    tags: ['platforms', 'beginners', 'comparison'],
    relatedListings: ['guide-first-agent-20-min', 'first-skill-md'],
    body: [
      P('Every week someone asks which platform to use to run an agent for their business. The honest answer is shorter than the marketing makes it sound.'),
      H('If you want it working today'),
      P('Claude with skills. Drop a SKILL.md in, it runs. The least to learn, the most that ports later. This is where we point most first-timers.'),
      H('If your team already lives in ChatGPT'),
      P('Use that. A custom GPT is a low-fear way to get a non-technical person running a skill without a settings panel they dread. Familiarity beats theoretically-better.'),
      H('If you need it touching other tools'),
      P('You will add n8n or Make underneath. That is plumbing, not a platform choice — pick the agent first, wire it second.'),
      H('What does not matter'),
      P('Benchmarks. Model leaderboards. The thing that decides whether this works is whether the skill running on it was built by someone who did the job. Pick the platform your team will open every morning, then buy skills built for it.'),
      L('guide-first-agent-20-min', 'Your first agent in 20 minutes'),
      L('first-skill-md', 'Your first SKILL.md, the right way'),
    ],
  },
  {
    slug: 'how-to-price-a-skill-you-built',
    title: 'How to price a skill you built',
    excerpt:
      'Underprice and it looks broken. Overprice and it never sells. Where the number actually sits.',
    publishedAt: '2026-06-10',
    updatedAt: '2026-06-10',
    author: 'Toby Banks',
    authorRole: 'Founder, Skillzy',
    tags: ['creators', 'pricing', 'guides'],
    relatedListings: ['guide-pricing-your-skill', 'first-skill-md'],
    body: [
      P('You built something that works. Now you have to put a number on it, and the number is doing more work than you think — it is the first signal a buyer reads about whether this is real.'),
      H('Price the outcome, not the file'),
      P('Nobody buys a Markdown file. They buy the three hours a week it gives back, or the fine it stops. Anchor to what the problem costs them, then take a fraction of it.'),
      H('Cheap is not a strategy'),
      P('A skill priced like a coffee reads like a toy. The buyers you want — operators with a real problem — will skip it because the price says it cannot be serious. Confidence is part of the product.'),
      H('Where most land'),
      UL([
        'A single sharp skill: enough to mean it, low enough to try',
        'A guide that teaches a method: more — you are selling judgement',
        'A full agent setup: the most — it replaces a process, not a task',
      ]),
      P('You keep the large majority of every sale here, so the right price is the one that respects the buyer and the work — not the lowest one you can stomach.'),
      L('guide-pricing-your-skill', 'Pricing your skill'),
      L('first-skill-md', 'Your first SKILL.md, the right way'),
    ],
  },
  {
    slug: 'ai-agent-for-plumbers',
    title: 'AI agent for plumbers: quote on site, get paid faster',
    excerpt:
      'The job ends at 5. The quoting and chasing should not start at 9. Here is the fix, plumber-specific.',
    publishedAt: '2026-06-13',
    updatedAt: '2026-06-13',
    author: 'Toby Banks',
    authorRole: 'Founder, Skillzy',
    tags: ['plumbers', 'trades', 'case-study'],
    relatedListings: ['plumber-quote-engine', 'debtor-chase-skill', 'tradie-agent-setup'],
    body: [
      P('A plumber loses money in two places that have nothing to do with plumbing: the quote that never got written, and the invoice that never got chased. Both happen after hours, when you are done.'),
      H('Quote before you leave the driveway'),
      P('Photo, voice note, done. The agent turns what you saw into a priced quote and sends it before the next job. The lead is still warm. That is the whole margin.'),
      H('Chase without being the bad guy'),
      P('Polite, scheduled, persistent debtor follow-up that keeps the customer. You stop being the one who has to send the awkward text, and the money still comes in.'),
      QUOTE('The quotes go out same day now. We are not the cheapest and we still win them, because we are the first.'),
      L('plumber-quote-engine', 'Plumber quote engine'),
      L('debtor-chase-skill', 'Debtor chase'),
      P('Want it all wired together with your job tool and Xero? The trade setup is one evening, once.'),
      L('tradie-agent-setup', 'Tradie agent setup'),
    ],
  },
  {
    slug: 'human-built-vs-auto-generated-skills',
    title: 'Human-built vs auto-generated agent skills',
    excerpt:
      'Every big lab now has a skills store. Here is why a marketplace of human-tested ones still matters.',
    publishedAt: '2026-06-17',
    updatedAt: '2026-06-17',
    author: 'Toby Banks',
    authorRole: 'Founder, Skillzy',
    tags: ['positioning', 'quality', 'fundamentals'],
    relatedListings: ['agent-prompt-patterns', 'first-skill-md'],
    body: [
      P('Anthropic, OpenAI, Google, and the rest are all shipping skill libraries. Most of what fills them is model-generated — plausible, generic, and never run against a real business on a bad day.'),
      H('The gap auto-generation cannot close'),
      P('A generated skill knows what a quote looks like. It does not know that this trade always gets burned on variations, or that this clinic must never confirm a booking without a deposit. That knowledge comes from doing the job, getting it wrong, and fixing it.'),
      H('What human-built actually buys you'),
      UL([
        'It has failed already — somewhere other than your business',
        'It stops at the lines a person decided were dangerous',
        'Someone can tell you why it works, not just that it does',
      ]),
      H('Why this is the whole point'),
      P('Every skill here was built by someone who needed it, ran it, and sells it because it held up. That is not a feature we added. It is the only reason to choose a marketplace over a generated list inside a model.'),
      L('agent-prompt-patterns', 'Agent prompt patterns'),
      L('first-skill-md', 'Your first SKILL.md, the right way'),
    ],
  },
  {
    slug: 'ai-for-real-estate-agents',
    title: 'AI for real estate agents: never let a lead go cold',
    excerpt:
      'The enquiry that came in at 8pm Saturday is the one you lost. An agent that does not sleep fixes that.',
    publishedAt: '2026-06-20',
    updatedAt: '2026-06-20',
    author: 'Toby Banks',
    authorRole: 'Founder, Skillzy',
    tags: ['real-estate', 'lead-response', 'case-study'],
    relatedListings: ['real-estate-agent-setup', 'after-hours-triage'],
    body: [
      P('In real estate the lead does not wait for office hours. The portal enquiry at 8pm Saturday goes to whoever replies first, and most of the time that is not you — you were at an open or asleep.'),
      H('What the agent covers'),
      UL([
        'Instant, on-brand first reply to every enquiry, any hour',
        'Qualifies — budget, timeframe, finance — before it reaches you',
        'Books the inspection or call straight into your calendar',
        'Hands you a warm, sorted lead instead of a cold form',
      ]),
      H('Where the human stays in'),
      P('It never negotiates and never makes promises on price. It buys you the first ten minutes so the relationship is still yours to win.'),
      QUOTE('We were losing weekend enquiries to faster agents. Now we are the fast agent.'),
      L('after-hours-triage', 'After-hours triage'),
      L('real-estate-agent-setup', 'Real estate agent setup'),
    ],
  },
  {
    slug: 'cafe-roster-and-front-desk-one-agent',
    title: 'How a cafe runs its roster and front desk with one agent',
    excerpt:
      'Two of the most annoying jobs in hospitality, handled — so the owner can be on the floor, not the phone.',
    publishedAt: '2026-06-24',
    updatedAt: '2026-06-24',
    author: 'Toby Banks',
    authorRole: 'Founder, Skillzy',
    tags: ['hospitality', 'cafe', 'case-study'],
    relatedListings: ['cafe-roster-helper', 'restaurant-front-desk', 'restaurant-agent-setup'],
    body: [
      P('A small cafe loses its owner to two jobs that are pure admin: building next week’s roster around everyone’s availability, and answering the same five questions on the phone all day.'),
      H('The roster'),
      P('Availability in, constraints applied — hours, certs, who cannot close — a draft roster out for you to approve. The argument about who got the bad shift becomes a thirty-second review.'),
      H('The front desk'),
      P('Hours, bookings, “are you dog friendly”, “do you do gluten free” — answered instantly, consistently, without pulling someone off the machine. Anything real still rings through.'),
      QUOTE('I got my Sunday night back. That used to be roster night.'),
      L('cafe-roster-helper', 'Cafe roster helper'),
      L('restaurant-front-desk', 'Restaurant front desk'),
      P('Running a bigger venue? The full hospitality setup wires bookings, comms, and roster together.'),
      L('restaurant-agent-setup', 'Restaurant agent setup'),
    ],
  },
  {
    slug: 'what-to-check-before-you-trust-a-skill',
    title: 'What to check before you trust a skill from a marketplace',
    excerpt:
      'A five-minute review that tells you whether a skill is safe to point at your real business.',
    publishedAt: '2026-06-27',
    updatedAt: '2026-06-27',
    author: 'Toby Banks',
    authorRole: 'Founder, Skillzy',
    tags: ['buyers', 'safety', 'fundamentals'],
    relatedListings: ['first-skill-md', 'agent-prompt-patterns'],
    body: [
      P('A skill is just instructions you are about to let run against your inbox, your customers, or your money. Before you trust one, read it like you would a contractor’s quote — for five minutes.'),
      H('Read it, do not just run it'),
      P('A good skill is boring and legible. If you cannot follow what it does in a plain read, that is not sophistication — it is a risk you cannot see.'),
      H('Find the stop lines'),
      UL([
        'Where does it hand back to a human, and is that the right place?',
        'What does it refuse to do — send money, confirm without a deposit, lodge anything?',
        'What does it touch, and does that match what it claims to need?',
      ]),
      H('Who built it'),
      P('The thing worth paying for is that a person did this job, got it wrong, and fixed it. A skill with a named builder who can tell you why it works beats a generated one that only says that it does.'),
      P('If you write your own, the SKILL.md guide covers the safe shape. If you are buying, every listing here names its builder on purpose.'),
      L('first-skill-md', 'Your first SKILL.md, the right way'),
      L('agent-prompt-patterns', 'Agent prompt patterns'),
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
