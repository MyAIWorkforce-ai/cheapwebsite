import { seedProducts } from './catalog-seed'
import { PLATFORM_OPTIONS } from './options'

// Cards keep platform context tight: 1–3 platforms render the names,
// every-platform listings collapse to "All agents" (no 13-item run-on),
// and anything in between shows the first few + "+N".
function formatPlatformsForCard(list: string[]): string {
  if (list.length === 0) return ''
  if (list.length >= PLATFORM_OPTIONS.length) return 'All agents'
  if (list.length <= 3) return list.join(' · ')
  return `${list.slice(0, 3).join(' · ')} · +${list.length - 3}`
}


export type ProductType = 'Skill' | 'Guide' | 'Agent Setup'

export type Review = {
  author: string
  location?: string
  rating: number
  date: string
  body: string
}

export type Faq = { q: string; a: string }

export type UseCase = { who: string; what: string }

export type Step = { n: string; title: string; desc: string }

export type Creator = {
  name: string
  handle: string
  bio: string
  totalSales: number
  joined: string
  // Whether the creator has connected Stripe and has payouts enabled.
  // Buyer-facing surfaces use this to disable the Buy button on
  // paid listings whose creator can't actually receive money yet
  // (avoids silently routing the whole sale to Skillzy). Undefined
  // on seed/demo creators — they bypass real checkout anyway.
  payoutsEnabled?: boolean
}

export type Product = {
  id: string
  // Public URL slug. Falls back to `id` for seed/demo listings.
  slug?: string
  type: ProductType
  title: string
  tagline: string
  niche?: string
  featured?: boolean
  free?: boolean
  creator: Creator
  platformList: string[]
  rating: number
  ratingCount: number
  price: string
  version: string
  updated: string
  description: string[]
  whatYouGet: string[]
  howItWorks: Step[]
  skillMdPreview?: string
  videoUrl?: string
  videoLabel?: string
  useCases?: UseCase[]
  reviews: Review[]
  faqs: Faq[]
  relatedIds: string[]
}

const creators: Record<string, Creator> = {
  harlow: {
    name: 'Harlow Realty Tools',
    handle: '@harlow',
    bio: 'Real-estate operators turned agent builders. We sold the agency, kept the tooling.',
    totalSales: 1284,
    joined: 'March 2026',
  },
  ledgerlab: {
    name: 'Ledgerlab',
    handle: '@ledgerlab',
    bio: 'Three accountants and an engineer. We built this so we could stop using it ourselves.',
    totalSales: 612,
    joined: 'February 2026',
  },
  sitebench: {
    name: 'Sitebench',
    handle: '@sitebench',
    bio: 'Quote it. Bill it. Get back on site. Tools for the trades.',
    totalSales: 401,
    joined: 'April 2026',
  },
  storefront: {
    name: 'Storefront Labs',
    handle: '@storefrontlabs',
    bio: 'E-commerce ops nerds. We respond to your customers so you can sleep.',
    totalSales: 942,
    joined: 'January 2026',
  },
  practiceos: {
    name: 'practice.os',
    handle: '@practiceos',
    bio: 'Coaching software for coaches. By a coach. Who got tired of Notion.',
    totalSales: 188,
    joined: 'April 2026',
  },
  fronthouse: {
    name: 'Front of House',
    handle: '@fronthouse',
    bio: 'Two restaurant owners with too many tabs open.',
    totalSales: 96,
    joined: 'May 2026',
  },
  jonas: {
    name: 'Jonas Krüger',
    handle: '@jonask',
    bio: 'Indie builder. Berlin. I publish one skill a fortnight.',
    totalSales: 1820,
    joined: 'January 2026',
  },
  paperless: {
    name: 'paperless.io',
    handle: '@paperless',
    bio: 'We made invoices fun. Don’t fact-check that.',
    totalSales: 2104,
    joined: 'February 2026',
  },
  datajedi: {
    name: 'datajedi',
    handle: '@datajedi',
    bio: 'Scrapers, parsers, pipelines. Quiet little tools that do the boring work.',
    totalSales: 740,
    joined: 'February 2026',
  },
  kai: {
    name: 'Kai Mendoza',
    handle: '@kaim',
    bio: 'Replies to Google reviews so you don’t have to. Manila → the internet.',
    totalSales: 502,
    joined: 'March 2026',
  },
  mira: {
    name: 'Mira Sato',
    handle: '@mirasato',
    bio: 'Builds agents for fun. Writes about them on weekends.',
    totalSales: 1244,
    joined: 'January 2026',
  },
  agentschool: {
    name: 'agentschool',
    handle: '@agentschool',
    bio: 'A small classroom for people teaching themselves to build agents.',
    totalSales: 3502,
    joined: 'November 2025',
  },
  promptforge: {
    name: 'promptforge',
    handle: '@promptforge',
    bio: 'Prompt patterns that survive a model upgrade.',
    totalSales: 1780,
    joined: 'December 2025',
  },
}

const baseProducts: Product[] = [
  // ===== AGENT SETUPS =====
  {
    id: 'bookkeeper-agent-setup',
    type: 'Agent Setup',
    title: 'Bookkeeper & BAS.',
    tagline: 'Categorise expenses, chase receipts, prep BAS. An agent that does the boring half of bookkeeping.',
    niche: 'Accountants',
    creator: creators.ledgerlab,
    platformList: ['Claude', 'n8n'],
    rating: 4.8,
    ratingCount: 3,
    price: '$199',
    version: 'v1.2',
    updated: '7 May 2026',
    description: [
      'A bookkeeping agent built by people who actually do BAS. It categorises transactions, chases receipts, flags weird stuff, and produces a BAS-ready summary on the first of the quarter without being asked.',
      'Doesn’t replace your accountant. Replaces the four nights a quarter you stop liking your job.',
    ],
    whatYouGet: [
      '8 SKILL.md files: categorisation, GST detection, receipt chasing, BAS prep, ATO updates summariser, client reminders, weekly P&L, anomaly flagging',
      'Chart-of-accounts mapping for Xero, MYOB, QuickBooks',
      'Email templates for chasing missing receipts (firm but human)',
      'BAS workpaper template — fills itself in',
      'Setup guide with the gotchas we hit',
    ],
    howItWorks: [
      { n: '01', title: 'Download', desc: 'Bundle hits your inbox.' },
      { n: '02', title: 'Map accounts', desc: 'One-time setup. Map your chart of accounts to ours. Half an hour.' },
      { n: '03', title: 'Connect', desc: 'Xero/MYOB/QuickBooks via the included connectors.' },
      { n: '04', title: 'Let it run', desc: 'It’ll find its rhythm in a week.' },
    ],
    skillMdPreview: `---
name: gst-detect
description: Detects GST on transactions, flags anything ambiguous for review.
allowed_platforms: [claude, n8n]
tools:
  - accounting.fetch_transactions
  - accounting.update_transaction
---

# GST detection

Pull the last week of uncategorised transactions.
For each:
  - If supplier ABN is known, infer GST treatment.
  - If amount > $82.50 and no supplier ABN, flag for review.
  - If foreign currency, flag for manual GST decision.
Output: a clean queue for the bookkeeper, sorted by confidence.
`,
    useCases: [
      { who: 'Solo bookkeeper', what: 'Cut quarterly BAS prep from days to an afternoon.' },
      { who: 'Small firm', what: 'Standardise treatment across clients. No more "well I do it this way."' },
      { who: 'Founder doing their own books', what: 'Stop dreading the first of July.' },
    ],
    reviews: [
      { author: 'Priya M.', location: 'Brisbane', rating: 5, date: '4 May 2026', body: 'The receipt-chasing emails are scarily polite. My clients respond.' },
      { author: 'Jonas W.', location: 'Perth', rating: 5, date: '28 Apr 2026', body: 'Saved me a week of work in the first quarter. Five stars, would BAS again.' },
      { author: 'Lila T.', location: 'Adelaide', rating: 4, date: '12 Apr 2026', body: 'Xero connector hiccuped once, fixed in v1.2. Solid otherwise.' },
    ],
    faqs: [
      { q: 'Does it lodge BAS for me?', a: 'No. It prepares the workpaper. A human lodges. We’re not stupid.' },
      { q: 'Will it replace my accountant?', a: 'No. It makes you cheaper for your accountant to work with.' },
      { q: 'What about non-AU tax?', a: 'GST logic is AU/NZ-shaped. Other regions are coming. Vote in the changelog.' },
    ],
    relatedIds: ['invoice-generator', 'first-skill-md'],
  },

  {
    id: 'tradie-agent-setup',
    type: 'Agent Setup',
    title: 'On-site Tradie Ops.',
    tagline: 'Quote it, schedule it, invoice it. From the back of the ute.',
    niche: 'Tradies',
    featured: true,
    creator: creators.sitebench,
    platformList: ['Claude', 'Make', 'Zapier'],
    rating: 4.9,
    ratingCount: 5,
    price: '$179',
    version: 'v1.1',
    updated: '3 May 2026',
    description: [
      'A foreman that lives in your phone. Drop in a job photo and a few notes, it spits out a quote your customer will sign. Job done? It invoices on the spot.',
      'No CRM to learn. No software to babysit. Built for trades because trades didn’t ask for software.',
    ],
    whatYouGet: [
      '6 SKILL.md files: quoting, scheduling, invoicing, supplier price tracking, client follow-ups, job photo summaries',
      'Quote and invoice templates (PDF, your branding)',
      'Supplier price-list scaffold for the 30 most common items',
      'Voice-note-to-quote skill: dictate, get a draft',
      'Setup guide written like a smoko chat',
    ],
    howItWorks: [
      { n: '01', title: 'Bundle in your inbox', desc: 'After checkout. Re-download anytime.' },
      { n: '02', title: 'Drop into your agent', desc: 'Two minutes. We don’t make you read a manual.' },
      { n: '03', title: 'Forward a job', desc: 'Email, voice note, photo. The agent takes it from there.' },
      { n: '04', title: 'Sign and bill', desc: 'Quote out same day. Invoice out same job.' },
    ],
    skillMdPreview: `---
name: quote-from-voicenote
description: Turn a voice note + photos into a customer-ready quote.
allowed_platforms: [claude, make]
tools:
  - storage.fetch_attachments
  - pdf.generate
  - email.send
---

# Quote from voice note

When a job dictation lands:

1. Transcribe the voice note.
2. Match line items against the supplier price-list.
3. Add a 15% margin (configurable per job type).
4. Generate the quote PDF using the template.
5. Email it to the customer with a one-tap "Sign here" link.
`,
    useCases: [
      { who: 'Sparkie', what: 'Voice-note a callout, quote’s in the customer’s inbox before you’re back in the ute.' },
      { who: 'Builder', what: 'End-of-day photo dump becomes a progress summary for the client.' },
      { who: 'Plumber', what: 'Materials list cross-checks against your supplier’s current pricing.' },
    ],
    reviews: [
      { author: 'Macca', location: 'Brisbane', rating: 5, date: '30 Apr 2026', body: 'No bs. Got my first quote out from a voice note on day one. Bought a slab.' },
      { author: 'Steve K.', location: 'Newcastle', rating: 5, date: '24 Apr 2026', body: 'Wife says I’m on the phone less. That’s the only review I need.' },
      { author: 'Nikolai P.', location: 'Christchurch', rating: 4, date: '18 Apr 2026', body: 'Supplier list needed a tweak for NZ pricing but easy fix.' },
    ],
    faqs: [
      { q: 'Do I need new software?', a: 'No. It bolts into whatever you use for email and accounting.' },
      { q: 'Is there an app?', a: 'No app. It’s your agent. Talk to it via email or your messaging tool of choice.' },
      { q: 'What if a quote is wrong?', a: 'You see it before it goes out. Edit one line, send.' },
    ],
    relatedIds: ['invoice-generator', 'review-responder', 'wire-claude-and-n8n'],
  },

  {
    id: 'ecom-support-agent-setup',
    type: 'Agent Setup',
    title: 'E-commerce Support.',
    tagline: 'Answers your tickets, writes the apology, processes the return. Sleeps when it wants.',
    niche: 'E-commerce',
    creator: creators.storefront,
    platformList: ['Claude', 'OpenClaw', 'Zapier'],
    rating: 4.7,
    ratingCount: 6,
    price: '$299',
    version: 'v2.0',
    updated: '10 May 2026',
    description: [
      'A customer-support agent for stores doing 50–2,000 orders a day. It triages tickets, writes the reply, escalates the spicy ones, and updates your help-desk so nothing slips.',
      'Speaks your brand. Knows your shipping. Doesn’t panic when a customer types in caps.',
    ],
    whatYouGet: [
      '10 SKILL.md files: triage, returns, refunds, shipping queries, product questions, escalation, apology drafting, review pull',
      'Zendesk + Gorgias + Help Scout connectors',
      'Brand-voice tuning file (you fill it in once)',
      'Shopify + Shipstation hooks',
      'Setup guide, 22 pages, with worked examples',
    ],
    howItWorks: [
      { n: '01', title: 'Download', desc: 'After purchase. Permanent re-download on your dashboard.' },
      { n: '02', title: 'Brand-voice fill', desc: 'Fifteen minutes. Three sample replies do the trick.' },
      { n: '03', title: 'Wire your help-desk', desc: 'Pre-built connectors. Toggle which actions are auto-vs-suggest.' },
      { n: '04', title: 'Pilot for 48 hours', desc: 'Run on a fraction of inbound first. Then open the floodgates.' },
    ],
    skillMdPreview: `---
name: triage-and-route
description: First-touch triage for inbound tickets across email + chat.
allowed_platforms: [claude, openclaw]
tools:
  - helpdesk.fetch_ticket
  - helpdesk.update_ticket
  - shop.order_lookup
---

# Triage & route

For each new ticket:
  - Detect intent: return, refund, shipping, product, complaint, other.
  - If "complaint" + caps + 3+ sensitive words: route to human, never auto-reply.
  - If "shipping" and order exists: pull tracking, draft reply, mark "ready to send".
  - Otherwise: draft a reply, attach confidence score, mark "needs review".
`,
    useCases: [
      { who: 'DTC brand', what: '70%+ of tickets answered before a human reads them. Founders get their evenings back.' },
      { who: 'Apparel store', what: 'Returns flow stops being the worst part of Monday morning.' },
      { who: 'Marketplace seller', what: 'Consistent voice across 5,000 SKUs and a dozen ticket types.' },
    ],
    reviews: [
      { author: 'Leah O.', location: 'London', rating: 5, date: '5 May 2026', body: 'CSAT went up after we rolled it out. I had to double-check.' },
      { author: 'Bren V.', location: 'Auckland', rating: 5, date: '29 Apr 2026', body: 'Worth the price five times over in BFCM alone.' },
      { author: 'Mat S.', location: 'Toronto', rating: 4, date: '15 Apr 2026', body: 'Wanted more Klaviyo hooks. Said it’s on the roadmap.' },
    ],
    faqs: [
      { q: 'Will it reply on its own?', a: 'Only the ones you let it. Auto-vs-suggest is a per-skill toggle.' },
      { q: 'What about Klaviyo?', a: 'Marketing flows aren’t in scope here, but a sister skill drops soon.' },
      { q: 'Multi-store?', a: 'Yes. Brand-voice file per store. Same backbone.' },
    ],
    relatedIds: ['review-responder', 'invoice-generator', 'agent-prompt-patterns'],
  },

  {
    id: 'coach-agent-setup',
    type: 'Agent Setup',
    title: 'Coach & Client Notes.',
    tagline: 'Session notes, follow-ups, content drafts. The bit between sessions, done.',
    niche: 'Coaches',
    creator: creators.practiceos,
    platformList: ['Claude'],
    rating: 4.8,
    ratingCount: 1,
    price: '$149',
    version: 'v1.0',
    updated: '1 May 2026',
    description: [
      'For coaches and consultants who like the coaching part and not the admin part. Drop in a session transcript, get clean notes back. Forget to follow up? It won’t.',
      'Privacy-first: all client data stays on your agent. We never see it.',
    ],
    whatYouGet: [
      '5 SKILL.md files: session note formatter, follow-up scheduler, content idea miner, client onboarding, weekly recap',
      'Onboarding question pack (50 questions, grouped by use case)',
      'Email cadences for high-ticket and group programs',
      'Setup guide, 8 pages',
    ],
    howItWorks: [
      { n: '01', title: 'Download', desc: 'In your inbox. Re-download from your dashboard.' },
      { n: '02', title: 'Add your style', desc: 'Drop in 3 of your existing session notes. The agent picks up your shape.' },
      { n: '03', title: 'Hook your calendar', desc: 'Calendar connector via included template.' },
      { n: '04', title: 'Coach', desc: 'The admin runs in the background.' },
    ],
    skillMdPreview: `---
name: session-note
description: Turn a session transcript into client-ready notes + action items.
allowed_platforms: [claude]
tools:
  - transcript.fetch
  - doc.generate
---

# Session note

Input: a raw transcript (yours or auto-transcribed).
Output: a one-pager with
  - 3-line session summary
  - Themes (max 3)
  - Action items (assignee + due date)
  - One question to sit with before next session
Voice: the coach's. Pull from the brand-voice file.
`,
    useCases: [
      { who: '1:1 coach', what: 'Cleans up your post-session admin in 2 minutes per client.' },
      { who: 'Group program lead', what: 'Group-session recap goes out within an hour, every time.' },
      { who: 'Consultant', what: 'Discovery-call summaries that look like you wrote them at 9am, not 11pm.' },
    ],
    reviews: [
      { author: 'Maya R.', location: 'Sydney', rating: 5, date: '6 May 2026', body: 'Got my Sundays back. That’s the review.' },
      { author: 'Karthik V.', location: 'Bangalore', rating: 5, date: '25 Apr 2026', body: 'My clients commented on how good the notes are now. Not even kidding.' },
      { author: 'Inge L.', location: 'Amsterdam', rating: 4, date: '11 Apr 2026', body: 'Would love a Dutch language tweak. Hint hint.' },
    ],
    faqs: [
      { q: 'Where does the client data go?', a: 'Stays in your agent. We don’t see it. We don’t want to.' },
      { q: 'Does it work for therapy?', a: 'Use your professional judgement. We don’t market it as a clinical tool.' },
      { q: 'Languages?', a: 'English-first. Tested on Spanish, German, Portuguese.' },
    ],
    relatedIds: ['daily-summary-email', 'agent-prompt-patterns', 'first-skill-md'],
  },

  {
    id: 'restaurant-agent-setup',
    type: 'Agent Setup',
    title: 'Front of House Ops.',
    tagline: 'Bookings, reviews, supplier chases, menu rewrites. While service is on.',
    niche: 'Hospitality',
    creator: creators.fronthouse,
    platformList: ['Claude'],
    rating: 4.6,
    ratingCount: 4,
    price: '$129',
    version: 'v1.0',
    updated: '28 Apr 2026',
    description: [
      'A back-office agent for restaurants and cafes. It answers booking emails, replies to reviews like a normal person, chases suppliers, and rewrites your menu when the chef changes the special.',
      'Built in a busy 60-seater. Tested at 7:30pm on a Saturday.',
    ],
    whatYouGet: [
      '6 SKILL.md files: booking confirmations, review replies, supplier follow-ups, menu rewrite, weekly takings recap, staff roster reminders',
      'Menu template (a clean one, not a Word doc)',
      'Review-reply tone guide: warm for 5s, real for 3s, ungrudging for 1s',
      'Setup guide',
    ],
    howItWorks: [
      { n: '01', title: 'Bundle in your inbox', desc: 'After purchase.' },
      { n: '02', title: 'Drop into your agent', desc: 'No technical sweat.' },
      { n: '03', title: 'Plug your email + reviews', desc: 'Gmail/Google Business. Five minutes each.' },
      { n: '04', title: 'Open the doors', desc: 'It handles the inbox. You handle the room.' },
    ],
    skillMdPreview: `---
name: review-reply
description: Replies to Google reviews in a tone that matches the venue.
allowed_platforms: [claude]
tools:
  - reviews.fetch
  - reviews.reply
---

# Review reply

For each new review:
  - 5 stars: warm, specific, thank the named server if mentioned.
  - 3-4 stars: acknowledge the gap, offer a path back.
  - 1-2 stars: zero defensiveness. Acknowledge, apologise, take it offline.
Never: emojis, exclamation marks more than one, "we strive to."
`,
    useCases: [
      { who: 'Cafe owner', what: 'Stop rewriting "thanks so much!" thirty times a week.' },
      { who: 'Restaurant manager', what: 'Booking emails answered between covers.' },
      { who: 'Multi-venue group', what: 'One agent, three venues, three voices.' },
    ],
    reviews: [
      { author: 'Sam P.', location: 'Wellington', rating: 5, date: '2 May 2026', body: 'Did a week’s worth of review replies in twenty minutes.' },
      { author: 'Ruby A.', location: 'Hobart', rating: 4, date: '20 Apr 2026', body: 'Menu rewrite is borderline magic.' },
      { author: 'Olu A.', location: 'Lagos', rating: 5, date: '14 Apr 2026', body: 'Adapted to our voice fast. Customers haven’t noticed it isn’t me.' },
    ],
    faqs: [
      { q: 'Does it take bookings?', a: 'It answers and confirms. Actual booking lands in your existing system (OpenTable, Resy, the Google form, whatever).' },
      { q: 'POS integration?', a: 'Soft integration via the weekly takings recap. Tight integrations next.' },
      { q: 'Multiple venues?', a: 'Yes. One brand-voice file per venue.' },
    ],
    relatedIds: ['review-responder', 'daily-summary-email', 'wire-claude-and-n8n'],
  },

  // ===== SKILLS =====
  {
    id: 'daily-summary-email',
    type: 'Skill',
    title: 'Daily Summary Email',
    tagline: 'One email at 7am with what mattered yesterday. No clutter.',
    creator: creators.jonas,
    platformList: ['Claude', 'n8n'],
    rating: 4.8,
    ratingCount: 6,
    price: '$12',
    version: 'v2.1',
    updated: '4 May 2026',
    description: [
      'A SKILL.md that pulls from your inbox, calendar, and the data sources you point it at, then hands you one short email at the hour you choose.',
      'Five years of indie tinkering with morning-routine apps distilled into one file. No dashboards, no chasing.',
    ],
    whatYouGet: [
      'The SKILL.md (drop-in)',
      'A 1-page README with the four config knobs you might want to turn',
      'Three sample emails so you know what good output looks like',
    ],
    howItWorks: [
      { n: '01', title: 'Drop in', desc: 'Upload the SKILL.md to your agent.' },
      { n: '02', title: 'Point at sources', desc: 'Email, calendar, plus any custom data you want pulled.' },
      { n: '03', title: 'Pick a time', desc: 'Default is 7am local. Change in one line.' },
    ],
    skillMdPreview: `---
name: daily-summary-email
description: One short email at 7am. The day, distilled.
allowed_platforms: [claude, n8n]
tools:
  - email.read
  - calendar.read
  - email.send
config:
  send_at: "07:00"
  to: "you@example.com"
  max_bullets: 7
---

# Daily summary email

Look at the last 24 hours of:
  - email (you can fold in only items marked important)
  - calendar (today's events + tomorrow's prep needed)
  - whatever extras the user wires in

Write it like a friend would:
  - one-line opener
  - 5-7 bullets, max
  - one closer line with the one thing that matters most
Send before send_at. Skip weekends unless told otherwise.
`,
    reviews: [
      { author: 'Pia S.', rating: 5, date: '8 May 2026', body: 'It reads like a friend. I don’t hate my inbox anymore.' },
      { author: 'Renzo D.', rating: 5, date: '26 Apr 2026', body: 'Stopped using three apps. This replaced all of them.' },
      { author: 'James K.', rating: 4, date: '12 Apr 2026', body: 'Pricey for a single skill but bought it twice (work + personal). Worth it.' },
    ],
    faqs: [
      { q: 'Do I need anything else?', a: 'Just an agent that runs scheduled tasks.' },
      { q: 'Will it pick up Slack?', a: 'Yes, if you give it Slack access via your agent.' },
    ],
    relatedIds: ['review-responder', 'invoice-generator', 'agent-prompt-patterns'],
  },

  {
    id: 'invoice-generator',
    type: 'Skill',
    title: 'Invoice Generator',
    tagline: 'Voice note in, PDF invoice out.',
    creator: creators.paperless,
    platformList: ['Claude', 'n8n'],
    rating: 0,
    ratingCount: 0,
    price: '$15',
    version: 'v3.2',
    updated: '11 May 2026',
    description: [
      'A SKILL.md that takes an email, a voice note, or a one-line spec and gives you back a clean invoice PDF, ready to send.',
      'Handles GST, foreign currency, payment terms, late-fee logic, and three template styles. Sounds boring. Is boring. That’s the point.',
    ],
    whatYouGet: [
      'The SKILL.md',
      '3 PDF templates (clean, classic, minimal)',
      'A "your details" config you fill out once',
    ],
    howItWorks: [
      { n: '01', title: 'Drop in', desc: 'Upload to your agent.' },
      { n: '02', title: 'Fill details once', desc: 'Your business, ABN, payment terms.' },
      { n: '03', title: 'Use it', desc: 'Email the agent a job. Get a PDF back.' },
    ],
    skillMdPreview: `---
name: invoice-generator
description: From a job spec, return a clean invoice PDF.
allowed_platforms: [claude, n8n]
tools:
  - pdf.generate
  - email.send
config:
  currency: "AUD"
  tax_label: "GST 10%"
  terms_days: 14
---

# Invoice generator

Input: a job description (email, transcript, or one-line spec).
Output: a single PDF invoice with:
  - Sender details (from config)
  - Customer details (parsed from input)
  - Line items (with optional discount)
  - Tax + total
  - Payment terms
Send: as an attachment, with a one-line covering email.
`,
    reviews: [
      { author: 'Mim H.', rating: 5, date: '9 May 2026', body: 'Three minutes after install I sent a real invoice. Bonkers.' },
      { author: 'Carl P.', rating: 5, date: '30 Apr 2026', body: 'PDF actually looks good. That’s rare.' },
      { author: 'Jane O.', rating: 5, date: '22 Apr 2026', body: 'Replaced a $39/mo SaaS for $15 once. Sold.' },
    ],
    faqs: [
      { q: 'Can it sync with Xero?', a: 'It can email the PDF to your Xero inbox. Sync via the connector in the related Agent Setups.' },
      { q: 'Multi-currency?', a: 'Yes. Set per-invoice or per-customer.' },
    ],
    relatedIds: ['daily-summary-email', 'bookkeeper-agent-setup', 'website-scraper'],
  },

  {
    id: 'website-scraper',
    type: 'Skill',
    title: 'Website Scraper',
    tagline: 'Point. Click. Get structured data.',
    creator: creators.datajedi,
    platformList: ['OpenClaw', 'Claude'],
    rating: 4.6,
    ratingCount: 2,
    price: '$19',
    version: 'v1.6',
    updated: '6 May 2026',
    description: [
      'Tell the agent a URL and what you want. It returns structured JSON. Handles pagination, JS-rendered pages, rate limits, and the politeness rules.',
      'For when you need a one-off pull and don’t feel like writing puppeteer for the hundredth time.',
    ],
    whatYouGet: [
      'The SKILL.md',
      'A 2-page guide on writing good "what you want" descriptions',
      'A small library of example scrapes (product pages, listings, directories)',
    ],
    howItWorks: [
      { n: '01', title: 'Drop in', desc: 'Upload to your agent.' },
      { n: '02', title: 'Ask it to scrape', desc: 'URL + plain-English description of the fields.' },
      { n: '03', title: 'Get JSON back', desc: 'Or CSV. Or pasted into your spreadsheet, your choice.' },
    ],
    skillMdPreview: `---
name: website-scraper
description: Fetch a URL, extract structured data described in plain English.
allowed_platforms: [openclaw, claude]
tools:
  - http.fetch
  - browser.render
config:
  user_agent: "skillzy-scraper/1.6 (+contact@example.com)"
  respect_robots: true
  rate_limit_ms: 1200
---

# Website scraper

Input:
  - url: the page or list to scrape
  - schema: plain-English description of the fields you want
  - pagination: optional follow-link rule

Behaviour:
  - Render with JS only if needed.
  - Respect robots.txt unless explicitly overridden.
  - Backoff on 429.
  - Return clean JSON conforming to the requested schema.
`,
    reviews: [
      { author: 'Asa F.', rating: 5, date: '7 May 2026', body: 'Replaced a $200/mo scraping tool. I should be annoyed but mostly I’m thrilled.' },
      { author: 'Yumi K.', rating: 4, date: '24 Apr 2026', body: 'Works great except on one site behind a tough WAF. Fair enough.' },
      { author: 'Dom P.', rating: 5, date: '16 Apr 2026', body: 'Great for product research. Pulls competitor pricing every Monday.' },
    ],
    faqs: [
      { q: 'Is this legal?', a: 'You’re responsible for what you scrape. The skill respects robots.txt by default.' },
      { q: 'Will it bypass logins?', a: 'No. Not a thing we sell.' },
      { q: 'JS-heavy sites?', a: 'Yes. It renders when it has to.' },
    ],
    relatedIds: ['invoice-generator', 'review-responder', 'ecom-support-agent-setup'],
  },

  {
    id: 'review-responder',
    type: 'Skill',
    title: 'Review Responder',
    tagline: 'Replies to Google reviews in your voice. No "we strive to."',
    creator: creators.kai,
    platformList: ['Claude'],
    rating: 4.7,
    ratingCount: 2,
    price: '$9',
    version: 'v1.3',
    updated: '5 May 2026',
    description: [
      'Reads your incoming Google reviews, drafts a reply in your tone, posts when you say so.',
      'Tested across cafes, dentists, plumbers, gyms, dog groomers. Yes, dog groomers.',
    ],
    whatYouGet: [
      'The SKILL.md',
      'A voice file (you fill once)',
      'A small playbook for 1-star reviews',
    ],
    howItWorks: [
      { n: '01', title: 'Drop in', desc: 'Upload to your agent.' },
      { n: '02', title: 'Connect reviews', desc: 'Google Business via the agent’s connector.' },
      { n: '03', title: 'Approve flow', desc: 'Auto-post 4-5 stars; review-then-post for 1-3.' },
    ],
    skillMdPreview: `---
name: review-responder
description: Drafts replies to reviews in your tone, posts on approval.
allowed_platforms: [claude]
tools:
  - reviews.fetch
  - reviews.reply
config:
  auto_post_threshold: 4
  signature: "— Skillzy team"
---

# Review responder

For each new review:
  - Identify rating, theme, named staff, and emotional weather.
  - Pull tone from the voice file.
  - Draft a reply.
  - If rating >= auto_post_threshold, post.
  - Else, queue for human review.
Never: defensive language, exclamation marks > 1, "we strive to."
`,
    reviews: [
      { author: 'Patrice O.', rating: 5, date: '10 May 2026', body: 'My dentist husband is happy. That’s rare.' },
      { author: 'Tom G.', rating: 5, date: '27 Apr 2026', body: 'Caught a 1-star early, gave us a chance to fix it. Brilliant.' },
      { author: 'Sally B.', rating: 4, date: '13 Apr 2026', body: 'Wished it handled Yelp too. Maybe next version.' },
    ],
    faqs: [
      { q: 'Yelp/Tripadvisor?', a: 'Google-first. Others on the roadmap.' },
      { q: 'Multi-location?', a: 'Yes. One voice file per location.' },
      { q: 'Will it post fake-sounding replies?', a: 'It tries hard not to. There’s a rule list. You can add to it.' },
    ],
    relatedIds: ['daily-summary-email', 'restaurant-agent-setup', 'ecom-support-agent-setup'],
  },

  // ===== GUIDES =====
  {
    id: 'wire-claude-and-n8n',
    type: 'Guide',
    title: 'Wire Claude into n8n in a weekend.',
    tagline: '60-page guide. From zero to a working agent that does real work.',
    creator: creators.mira,
    platformList: ['Claude', 'n8n'],
    rating: 4.9,
    ratingCount: 1,
    price: '$14',
    version: 'Edition 2',
    updated: '8 May 2026',
    description: [
      'A practical guide to wiring Claude into n8n so it can do real work for you. Not theory. Not "here’s the docs page." Step-by-step builds of three actual agents.',
      'Read it on a Saturday, live by Sunday.',
    ],
    whatYouGet: [
      '60-page PDF and Markdown bundle',
      '3 worked builds: daily summariser, invoice flow, lead capture',
      'A "things that broke for me" appendix',
      'All the n8n workflow exports you need',
    ],
    howItWorks: [
      { n: '01', title: 'Download', desc: 'PDF + .md + the n8n exports land in your inbox.' },
      { n: '02', title: 'Read part 1', desc: 'The 20-minute setup. Get an agent saying hello.' },
      { n: '03', title: 'Build along', desc: 'Three builds, evening by evening.' },
    ],
    reviews: [
      { author: 'Hank R.', rating: 5, date: '6 May 2026', body: 'Best $14 I’ve spent on a Saturday in a long time.' },
      { author: 'Liz T.', rating: 5, date: '22 Apr 2026', body: 'Cleared up everything the docs left fuzzy.' },
      { author: 'Sven A.', rating: 4, date: '11 Apr 2026', body: 'A couple of screenshots out of date but easy to follow.' },
    ],
    faqs: [
      { q: 'Total beginner OK?', a: 'If you can install an app and read a paragraph, you’re fine.' },
      { q: 'Updates?', a: 'Free updates for the life of this edition.' },
    ],
    relatedIds: ['first-skill-md', 'agent-prompt-patterns'],
  },

  {
    id: 'first-skill-md',
    type: 'Guide',
    title: 'Your first SKILL.md, the right way.',
    tagline: 'The short version of "how to publish a skill people will actually buy."',
    creator: creators.agentschool,
    platformList: ['Claude', 'OpenClaw'],
    rating: 4.8,
    ratingCount: 3,
    price: '$9',
    version: 'Edition 3',
    updated: '2 May 2026',
    description: [
      '32 pages on writing a SKILL.md that does its one job well. Naming. Scoping. Inputs. Outputs. Common traps. What makes a skill sell.',
      'For your first skill. Or your tenth, if your tenth is still messy.',
    ],
    whatYouGet: [
      '32-page PDF',
      'A SKILL.md template with comments',
      '10 worked examples (good + bad)',
    ],
    howItWorks: [
      { n: '01', title: 'Download', desc: 'PDF + template hit your inbox.' },
      { n: '02', title: 'Skim it', desc: 'It’s short. The shape of a good skill is mostly the shape of a good thought.' },
      { n: '03', title: 'Publish one', desc: 'Use the template. List it on Skillzy.' },
    ],
    reviews: [
      { author: 'Otis K.', rating: 5, date: '3 May 2026', body: 'My second skill sold in a week. Wouldn’t have published the first without this.' },
      { author: 'Roni P.', rating: 5, date: '18 Apr 2026', body: 'Cleaned up my scoping immediately. Worth ten times the price.' },
      { author: 'Mei L.', rating: 4, date: '10 Apr 2026', body: 'I wanted more on pricing strategy. Maybe a follow-up?' },
    ],
    faqs: [
      { q: 'Will this help me sell on Skillzy?', a: 'Yes. We literally use it ourselves.' },
      { q: 'Skill type coverage?', a: 'Skill, Guide, Setup are all touched on; deep on Skill.' },
    ],
    relatedIds: ['agent-prompt-patterns', 'wire-claude-and-n8n', 'daily-summary-email'],
  },

  {
    id: 'agent-prompt-patterns',
    type: 'Guide',
    title: 'Patterns for prompts that hold up.',
    tagline: 'Prompt patterns that survive a model upgrade.',
    creator: creators.promptforge,
    platformList: ['Claude', 'ChatGPT', 'Hermes', 'Mistral'],
    rating: 4.9,
    ratingCount: 4,
    price: '$24',
    version: 'Edition 4',
    updated: '9 May 2026',
    description: [
      'Eighteen prompt patterns that’ve been tested across model upgrades, jailbreak attempts, and the long tail of weird real-world input. Each pattern includes the failure mode it solves and a template you can paste.',
      'Built for builders. Skip the theory. Read the patterns. Build better agents.',
    ],
    whatYouGet: [
      '80-page PDF',
      '18 ready-to-paste prompt templates',
      'A "things that look like patterns but aren’t" appendix',
    ],
    howItWorks: [
      { n: '01', title: 'Download', desc: 'PDF + templates.' },
      { n: '02', title: 'Read a pattern', desc: 'They’re 3 pages each. No filler.' },
      { n: '03', title: 'Paste into your agent', desc: 'Adjust the slots. Done.' },
    ],
    reviews: [
      { author: 'Anders B.', rating: 5, date: '11 May 2026', body: 'The "guardrail-then-creativity" pattern alone is worth the cover price.' },
      { author: 'Manjit D.', rating: 5, date: '1 May 2026', body: 'Carried me through a model migration without breaking the agent.' },
      { author: 'Lina C.', rating: 5, date: '21 Apr 2026', body: 'Best $24 I’ve spent on prompt content. Not even close.' },
    ],
    faqs: [
      { q: 'Model-specific?', a: 'No. The patterns work across Claude, GPT, Hermes, Mistral.' },
      { q: 'Updates?', a: 'Edition updates are free if you bought a prior edition.' },
    ],
    relatedIds: ['first-skill-md', 'wire-claude-and-n8n', 'ecom-support-agent-setup'],
  },
]

// Hand-authored hero listings + the generated seed batch (lib/catalog-seed.ts).
export const products: Product[] = [...baseProducts, ...seedProducts]

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getRelated(p: Product): Product[] {
  return p.relatedIds
    .map((id) => products.find((q) => q.id === id))
    .filter((q): q is Product => Boolean(q))
}

function normalizeHandle(raw: string): string {
  return raw.replace(/^@/, '').toLowerCase()
}

export function getProductsByCreatorHandle(handle: string): Product[] {
  const h = normalizeHandle(handle)
  return products.filter((p) => normalizeHandle(p.creator.handle) === h)
}

export function getCreatorByHandle(handle: string): Creator | undefined {
  const found = getProductsByCreatorHandle(handle)[0]
  return found?.creator
}

export function allCreatorHandles(): string[] {
  const set = new Set<string>()
  for (const p of products) set.add(normalizeHandle(p.creator.handle))
  return Array.from(set)
}

// Master niche list. Powers the marketplace filter row + the "Pick
// your hustle" chip grid on the homepage, so every niche stays
// visible even before a listing exists in it. Order roughly groups
// related trades together.
// Master platform list — every agent platform Skillzy supports, shown in
// the marketplace filter even before any listing uses it. Mirrors the
// "Works with" line on the homepage. Creators can still add their own.
export const PLATFORMS = [
  'ChatGPT',
  'Claude',
  'DeepSeek',
  'Gemini',
  'Grok',
  'Hermes',
  'Make',
  'Manus',
  'Mistral',
  'n8n',
  'Ollama',
  'OpenClaw',
  'Zapier',
]

export const NICHES = [
  'Real Estate',
  'Property Mgmt',
  'Tradies',
  'Builders',
  'Plumbers',
  'Electricians',
  'Accountants',
  'Bookkeepers',
  'Lawyers',
  'Consultants',
  'Coaches',
  'E-commerce',
  'Hospitality',
  'Restaurants',
  'Cafes',
  'Healthcare',
  'Dentists',
  'Vets',
  'Therapists',
  'Education',
  'Tutors',
  'Fitness',
  'Salons',
  'Marketing',
  'Agencies',
  'Recruiters',
  'Photographers',
  'Designers',
] as const

export type CardProduct = {
  id: string
  type: ProductType
  title: string
  tagline?: string
  creator: string
  platform?: string
  rating: number
  ratingCount: number
  featured?: boolean
  free?: boolean
  price: string
}

export function toCardProduct(p: Product): CardProduct {
  return {
    id: p.id,
    type: p.type,
    title: p.title,
    tagline: p.tagline,
    creator: p.creator.name,
    platform: formatPlatformsForCard(p.platformList),
    rating: p.rating,
    ratingCount: p.ratingCount,
    price: p.price,
    featured: p.featured,
    free: p.free,
  }
}
