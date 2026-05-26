// Content collections for the programmatic landing pages
// (/for/[niche], /platforms/[platform]). Plain TS object maps —
// matches the existing lib/catalog.ts pattern, no CMS.

export function nicheSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

export type NicheContent = {
  slug: string
  name: string
  pluralLong: string
  problemStatement: string
  commonTasks: { title: string; desc: string }[]
  exampleROI: string
  relatedNiches: string[] // slugs
  faq: { q: string; a: string }[]
}

const N = (
  name: string,
  pluralLong: string,
  problemStatement: string,
  commonTasks: { title: string; desc: string }[],
  exampleROI: string,
  relatedNiches: string[],
  faq: { q: string; a: string }[],
): NicheContent => ({
  slug: nicheSlug(name),
  name,
  pluralLong,
  problemStatement,
  commonTasks,
  exampleROI,
  relatedNiches,
  faq,
})

const T = (title: string, desc: string) => ({ title, desc })
const Q = (q: string, a: string) => ({ q, a })

const baseFaq = (niche: string): { q: string; a: string }[] => [
  Q(
    `Do I need to know how to code to use an AI agent for ${niche}?`,
    'No. Every Skillzy listing is drop-in — you paste a file into your agent, follow a short setup note, and it works. Skills and Agent Setups assume zero coding.',
  ),
  Q(
    'Which AI platforms does this work with?',
    'Listings are tagged with the agents they were built and tested on — usually Claude, OpenClaw, ChatGPT, or n8n. The SKILL.md format is portable to most agents.',
  ),
  Q(
    'Is the work reviewed before I buy it?',
    'Listings publish instantly — there is no review queue. Every creator must confirm they own the rights and that the files are safe and malware-free before it goes live, and we remove anything reported that breaks the rules. Ratings and reviews from real buyers surface quality over time.',
  ),
  Q(
    'What if it does not work for my business?',
    'Email hi@skillzy.ai with your order number and what went wrong. A human reviews every refund request — genuine cases where a listing did not deliver get sorted.',
  ),
]

export const NICHE_CONTENT: NicheContent[] = [
  N('Real Estate', 'real estate agencies and independent agents',
    'Agents lose deals in the gap between an enquiry landing and someone replying. Listings get written at midnight. Follow-up is the first thing to slip when you are showing property all day.',
    [
      T('Lead capture & qualify', 'Reply to a buyer enquiry in under a minute, qualify budget and timeline, book the viewing.'),
      T('Listing copy', 'Turn property facts into listing copy that sounds like you, not a brochure.'),
      T('Follow-up sequences', 'Multi-touch buyer and vendor follow-up that runs whether or not you remember.'),
      T('Comparable-sales reports', 'Assemble a CMA from raw sales data in minutes, not an afternoon.'),
      T('Market updates', 'Monthly suburb updates in your voice, sent to your database.'),
      T('Open-home admin', 'Sign-in capture, instant follow-up, hot-lead alerts to your phone.'),
    ],
    'A boutique agency ran the Real Estate setup across 240 listings over six months before it was published here. Follow-up went from “when I get to it” to under 60 seconds, and the agency credited it with two extra deals a month — a ~30× return on the listing price.',
    ['property-mgmt', 'builders', 'consultants'],
    baseFaq('real estate')),

  N('Property Mgmt', 'property managers and rent-roll operators',
    'Maintenance tickets fall through cracks. Owners want updates you do not have time to write. Lease renewals creep up unnoticed.',
    [
      T('Maintenance triage', 'Tenant report in, urgency assessed, right vendor dispatched, owner informed.'),
      T('Owner updates', 'Plain-English status updates owners actually read.'),
      T('Renewal tracking', 'Lease expiries flagged early with a drafted renewal offer.'),
      T('Arrears chasing', 'Firm-but-fair rent-arrears sequences that keep the tenant.'),
      T('Inspection scheduling', 'Routine inspections booked and confirmed without phone tag.'),
      T('Application screening', 'First-pass tenant application screening against your criteria.'),
    ],
    'One rent-roll cut “tickets that went quiet” to near zero by routing every maintenance report through a triage agent. The owner-update emails alone saved a property manager an estimated half-day a week.',
    ['real-estate', 'builders', 'tradies'],
    baseFaq('property management')),

  N('Tradies', 'trade businesses — sparkies, plumbers, chippies and the rest',
    'You are on the tools all day and the office work piles up at night. Quotes go out late or not at all. The good jobs go to whoever replied first.',
    [
      T('Fast quoting', 'Job photo and a few notes become an itemised quote before you have packed the van.'),
      T('Job follow-up', 'Quotes chased until they are won or dead — no awkward phone calls.'),
      T('Scheduling', 'Bookings slotted around your run, confirmed and reminded.'),
      T('Invoicing', 'Completed job to sent invoice without opening the laptop.'),
      T('Debtor chasing', 'Overdue invoices chased in a voice that keeps the customer.'),
      T('Compliance reminders', 'Certificates and safety docs tracked so nothing lapses.'),
    ],
    'A two-van operation reported quoting time dropping from “tonight, maybe” to minutes on site, and win rates up because they were first to respond. The setup paid for itself on the first won job.',
    ['electricians', 'plumbers', 'builders'],
    baseFaq('trades')),

  N('Builders', 'builders and construction contractors',
    'Variations, RFIs and progress claims are the paperwork that decides whether a job is profitable — and they are the first thing to slip when you are on site.',
    [
      T('Variations', 'Logged, priced and documented the moment they happen.'),
      T('RFIs', 'Drafted in the right format, tracked to an answer.'),
      T('Progress claims', 'Assembled from your job records, ready to send.'),
      T('Subbie chasing', 'Quotes and availability chased without the phone marathon.'),
      T('Client updates', 'Weekly build updates clients actually read.'),
      T('Compliance', 'Inspections and certificates tracked to completion.'),
    ],
    'A residential builder moved variation capture from “remember to write it up” to instant. On a single job that recovered several thousand dollars of un-billed variations that would otherwise have been forgotten.',
    ['tradies', 'electricians', 'plumbers'],
    baseFaq('building')),

  N('Plumbers', 'plumbing businesses and contractors',
    'Emergency calls at 2am you cannot triage. Quotes you write at the kitchen table. Jobs you never followed up.',
    [
      T('After-hours triage', 'Screens night calls — only the real emergencies wake you.'),
      T('On-site quoting', 'Photo and notes to itemised quote before you leave the job.'),
      T('Follow-up', 'Every quote chased to a yes or a no.'),
      T('Scheduling', 'Bookings slotted and confirmed around your run.'),
      T('Invoicing', 'Job done to invoice sent, no laptop.'),
      T('Reviews', 'Happy customers nudged for a review at the right moment.'),
    ],
    'A plumbing business stopped losing the “did they ever get back to me” jobs. Win rate climbed because quotes went out same-day instead of next week.',
    ['tradies', 'electricians', 'builders'],
    baseFaq('plumbing')),

  N('Electricians', 'electrical contractors and sparkies',
    'Certificates of compliance you forget to file. Quotes that take all night. Jobs that needed a follow-up you never sent.',
    [
      T('Compliance certs', 'Every job needing a cert tracked and nagged until filed.'),
      T('Quoting', 'Fast, itemised quotes from a photo and a note.'),
      T('Scheduling', 'Jobs booked around your run, confirmed automatically.'),
      T('Follow-up', 'Quotes chased so the work does not go cold.'),
      T('Invoicing', 'Completed job to invoice without the desk.'),
      T('Debtor chase', 'Overdue accounts chased politely and persistently.'),
    ],
    'A two-sparky operation eliminated missed compliance deadlines entirely and cut quoting from an evening job to minutes on site.',
    ['tradies', 'plumbers', 'builders'],
    baseFaq('electrical')),

  N('Accountants', 'accounting firms and sole practitioners',
    'BAS season is a scramble of chasing receipts and reconciling other people’s mess. The work that needs a brain is buried under the work that does not.',
    [
      T('Receipt chasing', 'Clients nudged for the missing docs until they send them.'),
      T('Categorisation', 'Transactions sorted against your rules, exceptions flagged.'),
      T('BAS drafting', 'A draft BAS assembled for a human to review and sign off.'),
      T('Client comms', 'Routine client questions answered in your firm’s voice.'),
      T('Deadline tracking', 'Lodgement dates tracked, clients warned early.'),
      T('Onboarding', 'New-client intake and document collection automated.'),
    ],
    'A small firm automated receipt chasing and first-pass categorisation, freeing roughly a day a week of senior time during BAS quarter — time redeployed to advisory work that actually bills.',
    ['bookkeepers', 'consultants', 'lawyers'],
    baseFaq('accounting')),

  N('Bookkeepers', 'bookkeepers and BAS agents',
    'You are the receipt-chaser, the categoriser and the debtor-chaser. Most of it does not need you — it needs a system that never gets tired of asking.',
    [
      T('Receipt parsing', 'Worst-case receipt photos and forwarded emails into clean line items.'),
      T('Debtor chasing', 'A four-stage overdue sequence that stays firm without burning the client.'),
      T('Categorisation', 'Transactions matched to your rules, oddities surfaced.'),
      T('Client reminders', 'Document requests that follow up themselves.'),
      T('Reconciliation prep', 'The boring half of recs done before you sit down.'),
      T('Reporting', 'Monthly client reports drafted from the numbers.'),
    ],
    'A solo bookkeeper put receipt chasing and debtor follow-up on autopilot and took on three more clients without more hours — the listing cost was recovered in the first week of one new client.',
    ['accountants', 'consultants', 'agencies'],
    baseFaq('bookkeeping')),

  N('Lawyers', 'law firms and sole practitioners',
    'Intake, conflict checks and engagement letters eat billable hours doing work that is structured enough to template — but risky enough that it never gets templated.',
    [
      T('Client intake', 'Structured new-matter intake before the first call.'),
      T('Conflict checks', 'First-pass conflict screening against your matter list.'),
      T('Engagement letters', 'Drafted from the intake, ready for review.'),
      T('Clause explainers', 'Dense clauses turned into plain English with risk flags.'),
      T('Matter updates', 'Routine client status updates drafted for sign-off.'),
      T('Document requests', 'Chasing clients for the documents you actually need.'),
    ],
    'A boutique firm moved intake and first-pass conflict checks out of fee-earner time. Partners estimated several recovered billable hours a week — and faster client onboarding.',
    ['accountants', 'consultants', 'agencies'],
    baseFaq('legal')),

  N('Consultants', 'independent consultants and advisory shops',
    'The work between the work — proposals, SOWs, status updates, invoices — is unbilled and never-ending.',
    [
      T('Proposals', 'Discovery notes become a proposal that sounds like you.'),
      T('Statements of work', 'Scoped, guard-railed against creep, ready to send.'),
      T('Status updates', 'Weekly client updates from your task tracker.'),
      T('Invoicing', 'First invoice raised the moment the SOW is signed.'),
      T('Discovery synthesis', 'Messy call notes into a structured brief.'),
      T('Follow-up', 'Proposals chased to a decision.'),
    ],
    'A solo consultant cut proposal turnaround from days to the same afternoon and stopped losing deals to slow paperwork. More proposals out, higher close rate.',
    ['agencies', 'accountants', 'marketing'],
    baseFaq('consulting')),

  N('Coaches', 'coaches and course creators',
    'Coaching is the easy part. Onboarding, session prep, accountability nudges and renewals are the part that eats your evenings.',
    [
      T('Onboarding', 'New clients intake themselves before session one.'),
      T('Session prep', 'Last session’s notes become next session’s plan.'),
      T('Accountability', 'Between-session nudges that keep clients moving.'),
      T('Renewals', 'Renewal conversations started at the right moment.'),
      T('Content repurposing', 'One idea into posts, emails and shorts.'),
      T('Scheduling', 'Booking and rescheduling without the back-and-forth.'),
    ],
    'A 1:1 coach automated onboarding and accountability nudges and added clients without adding admin nights. Retention improved because nobody fell through the cracks between sessions.',
    ['consultants', 'fitness', 'tutors'],
    baseFaq('coaching')),

  N('E-commerce', 'online stores and DTC brands',
    'Two questions — “where is my order” and “I want to return this” — are most of your support volume and none of your time should go to them.',
    [
      T('WISMO', 'Order-status questions answered with live tracking.'),
      T('Returns', 'Return requests handled end to end against your policy.'),
      T('Pre-sale questions', 'Product questions answered from your catalogue.'),
      T('Review responses', 'Every review answered in brand voice.'),
      T('Abandoned cart', 'Recovery sequences that do not sound like spam.'),
      T('Supplier comms', 'Routine supplier and 3PL emails drafted.'),
    ],
    'A DTC brand routed WISMO and returns through an agent and cut first-response time to seconds while halving the support hours a founder was personally absorbing.',
    ['marketing', 'agencies', 'restaurants'],
    baseFaq('e-commerce')),

  N('Hospitality', 'hospitality venues and operators',
    'Bookings, no-shows, supplier orders and roster gaps — the front-of-house admin that pulls staff off the floor.',
    [
      T('Reservations', 'Booking requests handled, confirmed and reminded.'),
      T('No-show chasing', 'Deposits and reminders that cut no-shows.'),
      T('Supplier orders', 'Weekly orders drafted from par levels.'),
      T('Rostering', 'Draft rosters from sales patterns and availability.'),
      T('Reviews', 'Every review answered, issues escalated.'),
      T('Function enquiries', 'Event enquiries qualified and quoted.'),
    ],
    'A venue cut no-shows materially with automated deposit-and-reminder flows and pulled a manager off reservation admin entirely.',
    ['restaurants', 'cafes', 'e-commerce'],
    baseFaq('hospitality')),

  N('Restaurants', 'restaurants and food venues',
    'Reservation DMs, no-shows and the weekly supplier order are jobs that should never touch a busy floor manager.',
    [
      T('Booking DMs', 'Instagram and message bookings answered and slotted.'),
      T('No-show flows', 'Reminders and deposits that keep tables full.'),
      T('Supplier orders', 'The weekly order drafted from your pars.'),
      T('Reviews', 'Answered fast, in your voice.'),
      T('Function quotes', 'Event enquiries qualified and quoted.'),
      T('Roster drafts', 'Next week’s roster from this week’s sales.'),
    ],
    'A single-site restaurant moved reservation DMs and no-show reminders off staff and recovered hours of floor-manager time every week.',
    ['hospitality', 'cafes', 'e-commerce'],
    baseFaq('restaurants')),

  N('Cafes', 'cafés and coffee businesses',
    'Small team, thin margins, and the owner doing rosters and supplier orders at 9pm.',
    [
      T('Roster drafting', 'Sales and availability into a fair draft roster.'),
      T('Supplier orders', 'Par-based orders drafted and sent.'),
      T('Catering enquiries', 'Qualified, quoted and booked.'),
      T('Reviews', 'Answered in a voice that sounds like the café.'),
      T('Loyalty comms', 'Regulars nudged without being annoying.'),
      T('Hiring', 'First-pass screening of casual applications.'),
    ],
    'A two-site café group cut roster drafting from a weekly evening job to a ten-minute review.',
    ['restaurants', 'hospitality', 'salons'],
    baseFaq('cafés')),

  N('Healthcare', 'clinics and allied-health practices',
    'The front desk cannot answer every call, every recall, and every intake form — and the ones it misses cost appointments.',
    [
      T('Booking', 'Appointment requests handled and confirmed.'),
      T('Reminders', 'SMS reminders that cut no-shows.'),
      T('Recalls', 'Recall lists built and sent every week.'),
      T('Intake', 'Digital intake completed before arrival.'),
      T('Triage', 'Enquiries sorted by urgency, urgent escalated.'),
      T('Results comms', 'Routine results-ready messages drafted.'),
    ],
    'A multi-practitioner clinic automated recalls and reminders and recovered a measurable share of the appointments that used to slip — the highest-ROI change they made that year.',
    ['dentists', 'vets', 'therapists'],
    baseFaq('healthcare')),

  N('Dentists', 'dental practices',
    'Six-month recalls are the lifeblood of a practice and the first thing that does not get done when the front desk is slammed.',
    [
      T('Recalls', 'The recall list built and sent weekly, in a voice that books.'),
      T('Reminders', 'Appointment reminders that cut no-shows.'),
      T('Treatment follow-up', 'Proposed treatment plans followed up, not forgotten.'),
      T('Intake', 'New-patient forms completed before the chair.'),
      T('Reviews', 'Happy patients nudged at the right moment.'),
      T('Waitlist', 'Cancellations backfilled from a waitlist automatically.'),
    ],
    'A practice that turned recalls back on via an agent reported the recall program paying for the listing many times over in its first month.',
    ['healthcare', 'vets', 'therapists'],
    baseFaq('dental')),

  N('Vets', 'veterinary clinics',
    'Phone tag eats the front desk. Triage, booking and post-op check-ins all queue behind a ringing phone.',
    [
      T('Triage', 'Enquiries sorted by urgency, the urgent escalated fast.'),
      T('Booking', 'Routine appointments booked without the phone.'),
      T('Post-op check-ins', 'Automated follow-up after procedures.'),
      T('Reminders', 'Vaccination and check-up recalls that go out.'),
      T('Intake', 'New-client and pet details captured before arrival.'),
      T('Reviews', 'Owners nudged for a review post-visit.'),
    ],
    'A clinic cut front-desk phone time sharply by handling triage and routine booking through an agent — staff redeployed to animals, not handsets.',
    ['healthcare', 'dentists', 'therapists'],
    baseFaq('veterinary')),

  N('Therapists', 'therapists and private mental-health practices',
    'The admin hour between clients is the one you never get back — intake, reminders, rebooking.',
    [
      T('Intake', 'New-client forms completed before session one.'),
      T('Reminders', 'Gentle, appropriate appointment reminders.'),
      T('Rebooking', 'Lapsed clients nudged back without pressure.'),
      T('Notes prep', 'Session prep from your running notes.'),
      T('Billing', 'Invoices and rebate paperwork drafted.'),
      T('Waitlist', 'New enquiries triaged and waitlisted.'),
    ],
    'A private practitioner reclaimed the between-client admin hour by automating intake, reminders and rebooking — effectively adding billable capacity without adding days.',
    ['healthcare', 'coaches', 'dentists'],
    baseFaq('therapy')),

  N('Education', 'schools, teachers and education businesses',
    'Marking and feedback are the work that does not scale. The hours go to admin the moment the bell rings.',
    [
      T('Marking drafts', 'Drafted grades and feedback against your rubric — you sign off.'),
      T('Feedback', 'Consistent, constructive written feedback at volume.'),
      T('Lesson prep', 'Plans drafted from your outcomes.'),
      T('Parent comms', 'Routine parent updates drafted in your voice.'),
      T('Plagiarism flags', 'Suspect submissions surfaced for review.'),
      T('Admin', 'Permission slips, reminders and chase-ups automated.'),
    ],
    'A teacher used a marking-draft agent to cut first-pass marking time substantially while keeping a human in the loop on every grade — never auto-released.',
    ['tutors', 'coaches', 'consultants'],
    baseFaq('education')),

  N('Tutors', 'private tutors and tutoring businesses',
    'Every student needs a tailored plan and you are building them from scratch between sessions.',
    [
      T('Session planning', 'Last session’s notes into next session’s plan.'),
      T('Practice sets', 'Targeted problems generated to the student’s level.'),
      T('Progress reports', 'Parent-ready progress updates drafted.'),
      T('Scheduling', 'Booking and rescheduling without the back-and-forth.'),
      T('Onboarding', 'New-student diagnostic and goal capture.'),
      T('Reminders', 'Session and payment reminders that send themselves.'),
    ],
    'A tutoring side-business doubled student load without more planning hours by automating session plans and progress reports.',
    ['education', 'coaches', 'consultants'],
    baseFaq('tutoring')),

  N('Fitness', 'personal trainers and gyms',
    'Onboarding, check-ins and renewals are the difference between retention and churn — and they are the first thing to slip when you are coaching all day.',
    [
      T('Onboarding', 'PAR-Q, goals and a starter program before session one.'),
      T('Check-ins', 'Between-session accountability that keeps clients on track.'),
      T('Renewals', 'Renewal conversations started before the lapse.'),
      T('Program drafts', 'Progressions drafted from logged sessions.'),
      T('Lead nudges', 'Trial leads followed up until they convert or decline.'),
      T('Scheduling', 'Sessions booked and reminded automatically.'),
    ],
    'A PT automated onboarding and weekly check-ins and lifted retention measurably — the recovered churn paid for the listing many times over.',
    ['coaches', 'salons', 'healthcare'],
    baseFaq('fitness')),

  N('Salons', 'salons, barbers and beauty businesses',
    'The booking DMs never stop and every one you miss is a chair sitting empty.',
    [
      T('Booking DMs', 'Instagram and message bookings answered and slotted.'),
      T('Waitlist', 'Cancellations backfilled from a waitlist.'),
      T('Reminders', 'No-show-cutting reminders and deposits.'),
      T('Rebooking', 'Clients nudged to rebook at the right interval.'),
      T('Reviews', 'Happy clients nudged for a review.'),
      T('Promotions', 'Quiet-day promotions sent to the right regulars.'),
    ],
    'A two-chair salon stopped losing booking DMs overnight and filled more quiet-day slots with targeted nudges.',
    ['fitness', 'cafes', 'healthcare'],
    baseFaq('salons')),

  N('Marketing', 'marketers and content teams',
    'Repurposing, scheduling and reporting eat the time that should go to strategy.',
    [
      T('Repurposing', 'One post into a thread, a newsletter and five shorts.'),
      T('Briefs', 'Creative briefs drafted from a one-line ask.'),
      T('Reporting', 'Weekly performance summaries written, not just charted.'),
      T('Inbox', 'Routine partnership and inbound emails triaged.'),
      T('Calendar', 'A month of content planned from a few themes.'),
      T('Review responses', 'Brand-voice responses at scale.'),
    ],
    'A small marketing team turned every long post into ten platform-shaped pieces, multiplying output without multiplying headcount.',
    ['agencies', 'consultants', 'e-commerce'],
    baseFaq('marketing')),

  N('Agencies', 'agencies and studios',
    'Status updates, proposals and scope management are the unbilled glue holding every client account together.',
    [
      T('Client updates', 'Weekly status from your task tracker, in your voice.'),
      T('Proposals', 'Discovery into proposal and SOW.'),
      T('Scope control', 'Scope-creep flagged before it becomes free work.'),
      T('Onboarding', 'New-client kickoff packs drafted.'),
      T('Reporting', 'Monthly account reports assembled.'),
      T('Invoicing', 'Milestones to invoices, automatically.'),
    ],
    'An agency standardised weekly client updates across every account, recovering account-manager hours and reducing “what’s the status” emails to near zero.',
    ['consultants', 'marketing', 'recruiters'],
    baseFaq('agency')),

  N('Recruiters', 'recruiters and talent teams',
    'Screening and scheduling are high-volume, low-judgement work that buries the actual recruiting.',
    [
      T('Screening', 'First-pass CV screening against the brief, scorecarded.'),
      T('Scheduling', 'Self-serve interview booking — no inbox tennis.'),
      T('Candidate comms', 'Status updates that keep candidates warm.'),
      T('Briefs', 'Role briefs drafted from a hiring-manager call.'),
      T('Shortlists', 'Structured shortlists with reasoning.'),
      T('Reference checks', 'Reference requests sent and chased.'),
    ],
    'A recruiter automated screening and scheduling and roughly doubled the roles they could run at once without dropping candidate experience.',
    ['agencies', 'consultants', 'marketing'],
    baseFaq('recruiting')),

  N('Photographers', 'photographers and studios',
    'The business half of photography — enquiry, booking, delivery, invoice — happens while you should be shooting.',
    [
      T('Enquiry handling', 'Enquiries qualified and quoted fast.'),
      T('Booking', 'Sessions booked, deposits taken, confirmed.'),
      T('Gallery delivery', 'Delivery emails and reminders automated.'),
      T('Invoicing', 'Final invoices raised and chased.'),
      T('Reviews', 'Clients nudged for a review after delivery.'),
      T('Rebooking', 'Past clients nudged for the next session.'),
    ],
    'A wedding photographer moved enquiry-to-invoice onto an agent and stopped losing leads that arrived while shooting.',
    ['designers', 'agencies', 'marketing'],
    baseFaq('photography')),

  N('Designers', 'designers and creative freelancers',
    'Proposals, handoffs and revision rounds are the admin that sits between you and the next paid project.',
    [
      T('Proposals', 'Scoped proposals from a discovery note.'),
      T('Handoff packs', 'Dev-ready specs and token lists generated.'),
      T('Revision tracking', 'Rounds tracked against scope.'),
      T('Invoicing', 'Milestone invoices raised automatically.'),
      T('Feedback synthesis', 'Messy client feedback into a clean action list.'),
      T('Portfolio', 'Case-study drafts from finished projects.'),
    ],
    'A freelance designer cut proposal-to-start time in half and stopped doing unscoped revisions for free.',
    ['photographers', 'agencies', 'marketing'],
    baseFaq('design')),
]

export type PlatformContent = {
  slug: string
  name: string
  category: 'llm' | 'automation'
  description: string
  whyItMatters: string
  setupTime: string
  faq: { q: string; a: string }[]
}

const P = (
  name: string,
  slug: string,
  category: 'llm' | 'automation',
  description: string,
  whyItMatters: string,
  setupTime: string,
): PlatformContent => ({
  slug,
  name,
  category,
  description,
  whyItMatters,
  setupTime,
  faq: [
    Q(`Do Skillzy listings work with ${name}?`, `Yes — listings tagged ${name} are built and tested on it. The SKILL.md format is portable, so most listings work even when ${name} is not the primary tag.`),
    Q('Do I need to be technical?', 'No. You paste a file in and follow a short setup note. No code.'),
    Q('How long does setup take?', `Typically around ${setupTime} for a single skill; full Agent Setups take a little longer.`),
  ],
})

export const PLATFORM_CONTENT: PlatformContent[] = [
  P('Claude', 'claude', 'llm', 'Anthropic’s Claude — the most common home for Skillzy skills. Strong at long instructions, tools, and structured output.', 'Claude handles SKILL.md-style instructions natively and is the platform most listings are authored against. If you only learn one, learn this.', '2 minutes'),
  P('OpenClaw', 'openclaw', 'llm', 'An open agent runtime popular with operators who want local control and a skills folder.', 'OpenClaw’s skills folder maps directly to the SKILL.md format — drop-in is genuinely drop-in.', '5 minutes'),
  P('Manus', 'manus', 'llm', 'An autonomous AI agent that plans and runs multi-step tasks end to end.', 'Manus executes whole workflows on its own — drop-in skills give it the domain know-how to run a real line of work, not just chat.', '10 minutes'),
  P('Hermes', 'hermes', 'llm', 'A capable open model family used where self-hosting matters.', 'Hermes covers the privacy-sensitive cases — same skills, your infrastructure.', '15 minutes'),
  P('ChatGPT', 'chatgpt', 'llm', 'OpenAI’s ChatGPT, including custom GPTs and the assistants API.', 'A huge install base. Many Skillzy skills ship a ChatGPT-shaped variant so non-technical buyers can use what they already have.', '3 minutes'),
  P('Gemini', 'gemini', 'llm', 'Google’s Gemini models and Workspace integration.', 'Gemini is where a lot of Workspace-native businesses already are — skills meet them there.', '5 minutes'),
  P('Grok', 'grok', 'llm', 'xAI’s Grok, with real-time data access.', 'Grok suits listings that lean on current information. The instruction format still ports cleanly.', '5 minutes'),
  P('Ollama', 'ollama', 'llm', 'Run open models locally with Ollama.', 'Ollama is the answer when data cannot leave the building. Same listings, fully local.', '20 minutes'),
  P('Mistral', 'mistral', 'llm', 'Mistral’s efficient open models.', 'Mistral covers cost-sensitive, high-volume automation where every token counts.', '10 minutes'),
  P('DeepSeek', 'deepseek', 'llm', 'DeepSeek’s strong, low-cost models.', 'DeepSeek is increasingly the budget workhorse — skills run the same, cheaper.', '10 minutes'),
  P('n8n', 'n8n', 'automation', 'The open-source workflow automation tool. Skillzy ships n8n flows for many setups.', 'n8n is how non-developers wire an agent into real tools — CRMs, email, calendars — without code. Agent Setups lean on it heavily.', '15 minutes'),
  P('Make', 'make', 'automation', 'A visual automation platform (formerly Integromat).', 'Make is the no-code glue between an agent and the apps a business already runs.', '15 minutes'),
  P('Zapier', 'zapier', 'automation', 'The most widely-used automation platform.', 'Zapier means a skill can reach thousands of apps a small business already uses, with zero engineering.', '10 minutes'),
]

// ---- loaders --------------------------------------------------------

export function getAllNiches() {
  return NICHE_CONTENT
}
export function getNiche(slug: string) {
  return NICHE_CONTENT.find((n) => n.slug === slug)
}
export function getAllPlatforms() {
  return PLATFORM_CONTENT
}
export function getPlatform(slug: string) {
  return PLATFORM_CONTENT.find((p) => p.slug === slug)
}

// Top-10 highest-intent niche×platform combos to pre-render first.
export const COMBO_PAGES: { niche: string; platform: string }[] = [
  { niche: 'electricians', platform: 'claude' },
  { niche: 'plumbers', platform: 'claude' },
  { niche: 'real-estate', platform: 'claude' },
  { niche: 'bookkeepers', platform: 'n8n' },
  { niche: 'real-estate', platform: 'n8n' },
  { niche: 'tradies', platform: 'claude' },
  { niche: 'accountants', platform: 'claude' },
  { niche: 'coaches', platform: 'claude' },
  { niche: 'agencies', platform: 'n8n' },
  { niche: 'e-commerce', platform: 'claude' },
]
