// Additional seed listings. Kept separate from catalog.ts so the
// hand-authored "hero" listings stay readable. Each spec carries the
// buyer-facing copy that must be unique (title / tagline / description
// / what-you-get); the builder fills type-appropriate boilerplate
// (how-it-works, a couple of reviews, FAQs, version) so detail pages
// never render empty without bloating every entry by hand.

import type { Product, Creator, ProductType, Step } from '@/lib/catalog'

// ---- creators -------------------------------------------------------

const C = {
  voltline: { name: 'Voltline', handle: '@voltline', bio: 'Sparkies who automated the boring half of the job. Now we sell the automation.', totalSales: 0, joined: 'May 2026' },
  pipefit: { name: 'Pipefit Studio', handle: '@pipefit', bio: 'Two plumbers and a backend dev. We quote faster than we used to.', totalSales: 0, joined: 'May 2026' },
  brickwork: { name: 'Brickwork', handle: '@brickwork', bio: 'Builders. We made an agent so the office stops calling us at 7am.', totalSales: 0, joined: 'May 2026' },
  paraclete: { name: 'Paraclete', handle: '@paraclete', bio: 'Ex-firm lawyers. We template the parts that shouldn’t cost $400/hr.', totalSales: 0, joined: 'April 2026' },
  benchnote: { name: 'Benchnote', handle: '@benchnote', bio: 'Accountants who got tired of chasing receipts. Built the chaser.', totalSales: 0, joined: 'April 2026' },
  caretone: { name: 'Caretone', handle: '@caretone', bio: 'Clinic operators. Front desk should never miss a call again.', totalSales: 0, joined: 'May 2026' },
  toothmark: { name: 'Toothmark', handle: '@toothmark', bio: 'Dental practice managers. Recalls that actually go out.', totalSales: 0, joined: 'May 2026' },
  pawpost: { name: 'Pawpost', handle: '@pawpost', bio: 'Vet clinic crew. Less phone tag, more animals.', totalSales: 0, joined: 'May 2026' },
  quietroom: { name: 'Quietroom', handle: '@quietroom', bio: 'Therapists. Admin shouldn’t eat the hour between clients.', totalSales: 0, joined: 'April 2026' },
  chalkline: { name: 'Chalkline', handle: '@chalkline', bio: 'Teachers building the marking robot we always wanted.', totalSales: 0, joined: 'April 2026' },
  reps: { name: 'Reps', handle: '@reps', bio: 'PTs and gym owners. Onboarding and check-ins on autopilot.', totalSales: 0, joined: 'May 2026' },
  chairfive: { name: 'Chair Five', handle: '@chairfive', bio: 'Salon owners. The booking DMs handle themselves now.', totalSales: 0, joined: 'May 2026' },
  northbound: { name: 'Northbound', handle: '@northbound', bio: 'Agency operators. We sell the SOPs we run internally.', totalSales: 0, joined: 'March 2026' },
  shutterbox: { name: 'Shutterbox', handle: '@shutterbox', bio: 'Photographers. Galleries delivered, invoices sent, while we shoot.', totalSales: 0, joined: 'May 2026' },
  hiremind: { name: 'Hiremind', handle: '@hiremind', bio: 'Recruiters. Screening and scheduling without the inbox.', totalSales: 0, joined: 'April 2026' },
  draftpad: { name: 'Draftpad', handle: '@draftpad', bio: 'Designers automating the proposal-to-handoff slog.', totalSales: 0, joined: 'May 2026' },
  keyset: { name: 'Keyset', handle: '@keyset', bio: 'Property managers. Maintenance triage that doesn’t lose tickets.', totalSales: 0, joined: 'April 2026' },
  brewline: { name: 'Brewline', handle: '@brewline', bio: 'Café owners. Orders, rosters, suppliers — handled.', totalSales: 0, joined: 'May 2026' },
} satisfies Record<string, Creator>

// ---- spec -----------------------------------------------------------

type Spec = {
  id: string
  type: ProductType
  title: string
  tagline: string
  niche: string
  creator: Creator
  platforms: string[]
  price: string
  rating: number
  ratingCount: number
  description: string[]
  whatYouGet: string[]
  free?: boolean
}

const SPECS: Spec[] = [
  // Electricians
  { id: 'electrician-ops-setup', type: 'Agent Setup', title: 'Sparky Ops, wired.', tagline: 'Quotes, compliance certs, job follow-ups — your agent runs the back office from the van.', niche: 'Electricians', creator: C.voltline, platforms: ['Claude', 'n8n', 'Make'], price: '$229', rating: 4.8, ratingCount: 64, description: ['A complete electrical-contracting desk. Inbound job request in, qualified quote out, compliance reminders scheduled, follow-up sent.', 'Built on a real two-van operation across six months of jobs.'], whatYouGet: ['9 SKILL.md files: quoting, scheduling, compliance, follow-up, debtor chase', 'Quote templates priced for AU/NZ/UK sparkies', 'Certificate-of-compliance reminder cadence', 'n8n flows for Xero + Tradify'] },
  { id: 'compliance-cert-reminder', type: 'Skill', title: 'Compliance cert chaser.', tagline: 'Never miss a certificate-of-compliance deadline again.', niche: 'Electricians', creator: C.voltline, platforms: ['Claude', 'n8n'], price: '$19', rating: 4.7, ratingCount: 38, description: ['One job, done sharp: tracks every job that needs a compliance cert and nags until it’s filed.'], whatYouGet: ['1 SKILL.md', 'Reminder cadence config', 'Example certificate log'] },

  // Plumbers
  { id: 'plumber-quote-engine', type: 'Agent Setup', title: 'Plumbing quotes, fast.', tagline: 'Photo in, itemised quote out, follow-up booked — before you’ve packed up the van.', niche: 'Plumbers', creator: C.pipefit, platforms: ['Claude', 'OpenClaw', 'Make'], price: '$199', rating: 4.9, ratingCount: 51, description: ['Turns a job photo + a few notes into a clean itemised quote, then chases it until it’s won or dead.', 'Priced from a working plumbing business.'], whatYouGet: ['8 SKILL.md files', 'Itemised quote templates', 'Win/loss follow-up sequences', 'Tradify + Xero connectors'] },
  { id: 'after-hours-triage', type: 'Skill', title: 'After-hours call triage.', tagline: 'Sorts the 2am “is this an emergency” calls so you only wake for the real ones.', niche: 'Plumbers', creator: C.pipefit, platforms: ['Claude', 'OpenClaw'], price: '$24', rating: 4.6, ratingCount: 29, description: ['Screens after-hours messages, decides urgency, books non-urgent for morning, escalates the floods.'], whatYouGet: ['1 SKILL.md', 'Urgency rubric', 'Escalation config'] },

  // Builders
  { id: 'builder-site-admin', type: 'Agent Setup', title: 'Site admin, off your plate.', tagline: 'Variations, RFIs, subbie chasing, progress claims — handled while you’re on the tools.', niche: 'Builders', creator: C.brickwork, platforms: ['Claude', 'n8n'], price: '$279', rating: 4.7, ratingCount: 33, description: ['The office job a builder hates, done by an agent: variations logged, RFIs drafted, subbies chased, progress claims assembled.'], whatYouGet: ['11 SKILL.md files', 'Variation + RFI templates', 'Progress-claim builder', 'Subbie follow-up cadences'] },

  // Accountants / Bookkeepers
  { id: 'bas-prep-assistant', type: 'Agent Setup', title: 'BAS prep, de-stressed.', tagline: 'Chases the missing receipts, reconciles the mess, drafts the BAS for your review.', niche: 'Accountants', creator: C.benchnote, platforms: ['Claude', 'n8n', 'Make'], price: '$189', rating: 4.8, ratingCount: 72, description: ['The quarterly scramble, automated up to the point a human signs off. Receipt chasing, categorisation, draft BAS.'], whatYouGet: ['7 SKILL.md files', 'Client receipt-chase sequences', 'Categorisation rules', 'Xero + MYOB connectors'] },
  { id: 'receipt-parser', type: 'Skill', title: 'Messy receipt parser.', tagline: 'Photo or forwarded email in. Clean line items out.', niche: 'Bookkeepers', creator: C.benchnote, platforms: ['Claude', 'OpenClaw', 'n8n'], price: '$15', rating: 4.7, ratingCount: 88, description: ['Extracts structured line items from the worst receipt photos and forwarded confirmation emails.'], whatYouGet: ['1 SKILL.md', 'Output schema', 'Example inputs + outputs'] },
  { id: 'debtor-chase-skill', type: 'Skill', title: 'Polite debtor chaser.', tagline: 'Chases overdue invoices in a voice that keeps the client.', niche: 'Bookkeepers', creator: C.benchnote, platforms: ['Claude', 'n8n'], price: '$18', rating: 4.6, ratingCount: 41, description: ['A four-stage overdue-invoice sequence that stays firm without burning the relationship.'], whatYouGet: ['1 SKILL.md', '4-stage cadence', 'Tone config'] },

  // Lawyers
  { id: 'intake-and-conflict-check', type: 'Agent Setup', title: 'Client intake, screened.', tagline: 'New-matter intake, conflict check, engagement letter draft — before the first call.', niche: 'Lawyers', creator: C.paraclete, platforms: ['Claude', 'n8n'], price: '$299', rating: 4.9, ratingCount: 26, description: ['Structured intake, a first-pass conflict check against your matter list, and a drafted engagement letter for review.'], whatYouGet: ['6 SKILL.md files', 'Intake form logic', 'Conflict-check rubric', 'Engagement-letter templates'] },
  { id: 'contract-clause-explainer', type: 'Skill', title: 'Plain-English clause explainer.', tagline: 'Pastes a clause, returns what it actually means and what to watch.', niche: 'Lawyers', creator: C.paraclete, platforms: ['Claude'], price: '$22', rating: 4.5, ratingCount: 35, description: ['Turns dense contract language into plain English plus a risk flag. Not legal advice — a fast first read.'], whatYouGet: ['1 SKILL.md', 'Risk-flag rubric', 'Worked examples'] },

  // Consultants / Agencies
  { id: 'proposal-to-sow', type: 'Agent Setup', title: 'Proposal → SOW → invoice.', tagline: 'Discovery notes in. Proposal, statement of work, and first invoice out.', niche: 'Consultants', creator: C.northbound, platforms: ['Claude', 'n8n', 'Make'], price: '$219', rating: 4.8, ratingCount: 44, description: ['The agency paperwork pipeline: messy discovery notes become a proposal, an SOW, and a Stripe invoice.'], whatYouGet: ['8 SKILL.md files', 'Proposal + SOW templates', 'Scope-creep guardrails', 'Stripe + HubSpot connectors'] },
  { id: 'weekly-client-update', type: 'Skill', title: 'Weekly client update, written.', tagline: 'Turns your task tracker into a client update they actually read.', niche: 'Agencies', creator: C.northbound, platforms: ['Claude', 'n8n'], price: '$16', rating: 4.7, ratingCount: 57, description: ['Pulls the week’s done/doing/blocked and writes the status email in your voice.'], whatYouGet: ['1 SKILL.md', 'Voice config', 'Asana/Linear/Notion adapters'] },

  // Coaches
  { id: 'coach-client-engine', type: 'Agent Setup', title: 'Coaching ops in a box.', tagline: 'Onboarding, session prep, accountability nudges, renewals — handled.', niche: 'Coaches', creator: C.reps, platforms: ['Claude', 'OpenClaw', 'Make'], price: '$169', rating: 4.8, ratingCount: 61, description: ['The non-coaching half of coaching: intake, pre-session prep, between-session nudges, renewal asks.'], whatYouGet: ['9 SKILL.md files', 'Onboarding sequence', 'Accountability nudge cadences', 'Calendar + Stripe connectors'] },

  // E-commerce
  { id: 'returns-and-wismo', type: 'Agent Setup', title: 'Returns + “where is my order”.', tagline: 'The two queries that eat your support inbox, automated end to end.', niche: 'E-commerce', creator: C.brewline, platforms: ['Claude', 'n8n', 'Zapier'], price: '$159', rating: 4.7, ratingCount: 79, description: ['WISMO and returns are 70% of e-com tickets. This handles both, escalates the rest.'], whatYouGet: ['7 SKILL.md files', 'Returns policy logic', 'Carrier tracking lookups', 'Shopify + Gorgias connectors'] },

  // Hospitality / Restaurants / Cafes
  { id: 'restaurant-front-desk', type: 'Agent Setup', title: 'Bookings & DMs, covered.', tagline: 'Reservation requests, no-show chasing, supplier orders — off the floor staff’s plate.', niche: 'Restaurants', creator: C.brewline, platforms: ['Claude', 'OpenClaw', 'Make'], price: '$149', rating: 4.6, ratingCount: 48, description: ['Handles the reservation DMs, confirms and reminds, chases no-shows, and drafts the weekly supplier order.'], whatYouGet: ['6 SKILL.md files', 'Reservation flow', 'No-show cadence', 'Supplier-order template'] },
  { id: 'cafe-roster-helper', type: 'Skill', title: 'Café roster drafter.', tagline: 'Last week’s sales + staff availability → next week’s roster.', niche: 'Cafes', creator: C.brewline, platforms: ['Claude', 'n8n'], price: '$17', rating: 4.5, ratingCount: 22, description: ['Drafts a roster from sales patterns and availability. You approve, it sends.'], whatYouGet: ['1 SKILL.md', 'Availability schema', 'Fairness rules'] },

  // Healthcare / Dentists / Vets / Therapists
  { id: 'clinic-front-desk', type: 'Agent Setup', title: 'Clinic front desk, never busy.', tagline: 'Booking, reminders, recalls, intake forms — your phone stops ringing off the hook.', niche: 'Healthcare', creator: C.caretone, platforms: ['Claude', 'OpenClaw', 'n8n'], price: '$239', rating: 4.9, ratingCount: 53, description: ['The clinic front desk, automated: bookings, SMS reminders, recall lists, and digital intake before arrival.'], whatYouGet: ['10 SKILL.md files', 'Reminder + recall cadences', 'Intake form logic', 'Cliniko/HotDoc adapters'] },
  { id: 'dental-recall-engine', type: 'Skill', title: 'Dental recall engine.', tagline: 'Six-month recalls that actually go out, in a voice that books.', niche: 'Dentists', creator: C.toothmark, platforms: ['Claude', 'n8n'], price: '$21', rating: 4.7, ratingCount: 31, description: ['Builds and sends the recall list every week. Patients book instead of ignoring.'], whatYouGet: ['1 SKILL.md', 'Recall cadence', 'Booking-link logic'] },
  { id: 'vet-phone-tag-killer', type: 'Skill', title: 'Vet phone-tag killer.', tagline: 'Triage, booking, and post-op check-ins without the front-desk phone marathon.', niche: 'Vets', creator: C.pawpost, platforms: ['Claude', 'OpenClaw'], price: '$23', rating: 4.6, ratingCount: 27, description: ['Screens enquiries by urgency, books the routine, escalates the urgent, checks in post-op.'], whatYouGet: ['1 SKILL.md', 'Urgency rubric', 'Post-op check-in cadence'] },
  { id: 'therapy-admin-hour', type: 'Skill', title: 'Get the admin hour back.', tagline: 'Intake, reminders, and rebooking so the hour between clients is yours.', niche: 'Therapists', creator: C.quietroom, platforms: ['Claude', 'n8n'], price: '$20', rating: 4.8, ratingCount: 36, description: ['Handles intake forms, appointment reminders, and gentle rebooking nudges. HIPAA-aware prompts.'], whatYouGet: ['1 SKILL.md', 'Reminder cadence', 'Rebooking nudge config'] },

  // Education / Tutors
  { id: 'marking-assistant', type: 'Agent Setup', title: 'Marking, drafted.', tagline: 'Rubric in, marked drafts with feedback out — you review and release.', niche: 'Education', creator: C.chalkline, platforms: ['Claude'], price: '$129', rating: 4.7, ratingCount: 45, description: ['Drafts grades and written feedback against your rubric. A teacher signs off — it never auto-releases.'], whatYouGet: ['5 SKILL.md files', 'Rubric ingestion', 'Feedback-tone config', 'Plagiarism flagging'] },
  { id: 'tutor-session-planner', type: 'Skill', title: 'Tutor session planner.', tagline: 'Last session’s notes → next session’s plan, in 30 seconds.', niche: 'Tutors', creator: C.chalkline, platforms: ['Claude', 'OpenClaw'], price: '$14', rating: 4.6, ratingCount: 33, description: ['Reads your running notes and drafts a focused next-session plan with practice problems.'], whatYouGet: ['1 SKILL.md', 'Plan template', 'Practice-set generator'] },

  // Fitness / Salons
  { id: 'pt-onboarding-flow', type: 'Skill', title: 'PT client onboarding.', tagline: 'Par-Q, goals, baseline, and a starter program — sent before session one.', niche: 'Fitness', creator: C.reps, platforms: ['Claude', 'Make'], price: '$19', rating: 4.7, ratingCount: 40, description: ['Collects health screening + goals, returns a baseline assessment plan and a starter program draft.'], whatYouGet: ['1 SKILL.md', 'Par-Q logic', 'Starter-program template'] },
  { id: 'salon-booking-dms', type: 'Skill', title: 'Salon booking DMs.', tagline: 'The Instagram “do you have Saturday” messages, answered and booked.', niche: 'Salons', creator: C.chairfive, platforms: ['Claude', 'OpenClaw'], price: '$18', rating: 4.5, ratingCount: 52, description: ['Answers booking DMs, checks the calendar, books or waitlists, confirms.'], whatYouGet: ['1 SKILL.md', 'Calendar adapter', 'Waitlist logic'] },

  // Marketing
  { id: 'content-repurposer', type: 'Skill', title: 'One post → ten.', tagline: 'A long post becomes a thread, a newsletter blurb, and five shorts.', niche: 'Marketing', creator: C.northbound, platforms: ['Claude', 'OpenClaw'], price: '$16', rating: 4.6, ratingCount: 91, description: ['Turns one piece of content into platform-shaped variants without sounding recycled.'], whatYouGet: ['1 SKILL.md', 'Per-platform voice configs', 'Examples'] },

  // Recruiters
  { id: 'recruiter-screen-schedule', type: 'Agent Setup', title: 'Screen + schedule, hands-off.', tagline: 'CV in, structured screen out, interview booked — inbox stays empty.', niche: 'Recruiters', creator: C.hiremind, platforms: ['Claude', 'n8n', 'Make'], price: '$179', rating: 4.7, ratingCount: 38, description: ['First-pass screening against the brief, structured scorecard, and self-serve interview scheduling.'], whatYouGet: ['7 SKILL.md files', 'Scorecard rubric', 'Scheduling flow', 'ATS adapters'] },

  // Photographers / Designers
  { id: 'shoot-to-invoice', type: 'Agent Setup', title: 'Shoot → gallery → paid.', tagline: 'Enquiry, booking, gallery delivery, and invoice — while you’re behind the lens.', niche: 'Photographers', creator: C.shutterbox, platforms: ['Claude', 'Make', 'Zapier'], price: '$159', rating: 4.8, ratingCount: 29, description: ['The business half of photography: enquiry to booking to gallery delivery to paid invoice.'], whatYouGet: ['6 SKILL.md files', 'Enquiry + booking flow', 'Gallery-delivery templates', 'Stripe invoicing'] },
  { id: 'designer-handoff-pack', type: 'Skill', title: 'Designer handoff pack.', tagline: 'Turns a finished file into a clean dev-ready handoff doc.', niche: 'Designers', creator: C.draftpad, platforms: ['Claude'], price: '$15', rating: 4.5, ratingCount: 24, description: ['Generates the spec, token list, and notes a developer actually needs.'], whatYouGet: ['1 SKILL.md', 'Handoff template', 'Token-export format'] },

  // Property Mgmt
  { id: 'maintenance-triage', type: 'Agent Setup', title: 'Maintenance triage that never drops a ticket.', tagline: 'Tenant report in, vendor dispatched, owner informed, ticket tracked to close.', niche: 'Property Mgmt', creator: C.keyset, platforms: ['Claude', 'n8n', 'Make'], price: '$209', rating: 4.7, ratingCount: 34, description: ['The maintenance loop, closed: triage the report, dispatch the right vendor, keep the owner informed, chase to completion.'], whatYouGet: ['8 SKILL.md files', 'Triage rubric', 'Vendor dispatch logic', 'Owner-update cadence'] },

  // Guides (cross-niche)
  { id: 'guide-first-agent-20-min', type: 'Guide', title: 'Your first agent in 20 minutes.', tagline: 'Non-developer? Wire Claude into your work in one sitting.', niche: 'Education', creator: C.chalkline, platforms: ['Claude', 'OpenClaw'], price: '$12', rating: 4.8, ratingCount: 64, description: ['A no-jargon walkthrough from zero to a working agent doing one real task in your business.'], whatYouGet: ['28-page PDF', 'Copy-paste starter SKILL.md', 'Three worked examples'] },
  { id: 'guide-pricing-your-skill', type: 'Guide', title: 'Pricing your skill, right.', tagline: 'What to charge so it sells and you’re not leaving money on the table.', niche: 'Consultants', creator: C.northbound, platforms: ['Claude'], price: '$14', rating: 4.6, ratingCount: 30, description: ['The pricing logic behind listings that actually convert on Skillzy. Real numbers, real reasoning.'], whatYouGet: ['18-page PDF', 'Pricing worksheet', 'Three teardowns'] },

  // ===== FREE — top of funnel (email-gated) =====
  { id: 'free-daily-standup', type: 'Skill', title: 'Daily standup summary.', tagline: 'Bullet points in, a Slack-ready standup out. Free.', niche: 'Agencies', creator: C.northbound, platforms: ['Claude', 'OpenClaw'], price: 'Free', rating: 4.7, ratingCount: 120, free: true, description: ['A free taste of what a good skill feels like: paste your rough notes, get a clean standup your team will actually read.'], whatYouGet: ['1 SKILL.md', 'Slack-format output', 'Tone config'] },
  { id: 'free-invoice-parser', type: 'Skill', title: 'Invoice line-item parser.', tagline: 'Messy invoice text in. Structured line items out. Free.', niche: 'Bookkeepers', creator: C.benchnote, platforms: ['Claude', 'n8n'], price: 'Free', rating: 4.6, ratingCount: 98, free: true, description: ['Free, useful, and a fair preview of the paid bookkeeping skills. Extracts structured data from invoice text.'], whatYouGet: ['1 SKILL.md', 'Output schema', 'Worked examples'] },
  { id: 'free-review-responder-starter', type: 'Skill', title: 'Review responder — starter.', tagline: 'A stripped-down review responder. Free to try.', niche: 'E-commerce', creator: C.brewline, platforms: ['Claude'], price: 'Free', rating: 4.5, ratingCount: 76, free: true, description: ['The free starter version of the paid Review Responder. One tone, one channel, genuinely useful.'], whatYouGet: ['1 SKILL.md', 'Brand-voice config', 'Examples'] },
  { id: 'free-first-agent-guide', type: 'Guide', title: 'Your first AI agent in 20 minutes.', tagline: 'Non-dev walkthrough: wire Claude into Telegram. Free.', niche: 'Education', creator: C.chalkline, platforms: ['Claude'], price: 'Free', rating: 4.8, ratingCount: 210, free: true, description: ['A free, no-jargon walkthrough that gets a non-developer from zero to a working agent in one sitting.'], whatYouGet: ['Step-by-step guide', 'Copy-paste starter', 'Troubleshooting notes'] },
  { id: 'free-skillmd-cheatsheet', type: 'Guide', title: 'The SKILL.md cheat sheet.', tagline: 'One page. Every field. Free reference.', niche: 'Education', creator: C.chalkline, platforms: ['Claude', 'OpenClaw'], price: 'Free', rating: 4.7, ratingCount: 156, free: true, description: ['A single-page reference for the SKILL.md format. Print it, pin it, ship faster.'], whatYouGet: ['1-page PDF', 'Field-by-field reference', 'Common mistakes'] },
]

// ---- builder --------------------------------------------------------

function howItWorks(type: ProductType): Step[] {
  if (type === 'Guide') {
    return [
      { n: '01', title: 'Buy', desc: 'One purchase, yours forever. Re-download any time.' },
      { n: '02', title: 'Read', desc: 'Short, no filler. Built to finish in one sitting.' },
      { n: '03', title: 'Apply', desc: 'Use the templates. Ship the thing.' },
    ]
  }
  if (type === 'Skill') {
    return [
      { n: '01', title: 'Download', desc: 'Buy once, get the SKILL.md by email and on your dashboard.' },
      { n: '02', title: 'Drop it in', desc: 'Paste it into your agent’s skills folder. One minute.' },
      { n: '03', title: 'Run it', desc: 'Your agent picks up the new capability immediately.' },
    ]
  }
  return [
    { n: '01', title: 'Download', desc: 'Buy once, get the bundle by email and on your dashboard.' },
    { n: '02', title: 'Drop it in', desc: 'Upload the SKILL.md files to your agent. A few minutes.' },
    { n: '03', title: 'Connect', desc: 'Wire up your tools with the setup guide.' },
    { n: '04', title: 'Press go', desc: 'The agent runs the desk. You handle the people part.' },
  ]
}

function faqs(s: Spec) {
  return [
    { q: 'Which agents does this work with?', a: `Built and tested on ${s.platforms.slice(0, 2).join(' and ')}. The SKILL.md format is portable to most agents.` },
    { q: 'Do I need to be technical?', a: s.type === 'Guide' ? 'No. If you can follow a step list, you can do this.' : 'No. Drop the files in and follow the setup notes. No code.' },
    { q: 'Can I customise the voice?', a: 'Yes — there’s a config block you edit once and the whole thing shifts to sound like you.' },
  ]
}

function reviews(s: Spec) {
  const cities = ['Sydney', 'Auckland', 'Melbourne', 'Brisbane', 'Perth', 'London', 'Austin']
  const c1 = cities[s.id.length % cities.length]
  const c2 = cities[(s.id.length + 3) % cities.length]
  return [
    { author: 'Verified buyer', location: c1, rating: 5, date: '6 May 2026', body: 'Paid for itself the first week. Exactly what the listing said.' },
    { author: 'Verified buyer', location: c2, rating: s.rating >= 4.7 ? 5 : 4, date: '28 Apr 2026', body: 'Took a little setup, then it just ran. Worth it.' },
  ]
}

export const seedProducts: Product[] = SPECS.map((s) => ({
  id: s.id,
  type: s.type,
  title: s.title,
  tagline: s.tagline,
  niche: s.niche,
  free: s.free,
  creator: s.creator,
  platformList: s.platforms,
  rating: s.rating,
  ratingCount: s.ratingCount,
  price: s.price,
  version: 'v1.0',
  updated: '14 May 2026',
  description: s.description,
  whatYouGet: s.whatYouGet,
  howItWorks: howItWorks(s.type),
  reviews: reviews(s),
  faqs: faqs(s),
  relatedIds: [],
}))
