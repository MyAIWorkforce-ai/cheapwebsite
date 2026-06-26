# Setup — 15 minutes

You need three things to run this end-to-end. If you already have any
of them, skip ahead.

## 1. Pick an agent platform

Any of these work — pick whichever you already use:

- **Claude.ai** (Pro plan recommended). Create a Project, upload the
  entire `bookkeeper-agent/` folder, paste `MASTER_PROMPT.md` into
  the project instructions.
- **Claude Code** (terminal). `cd` into the folder, run Claude Code
  in that directory. Skills load automatically.
- **OpenClaw** — upload the SKILL.md files into the Skills tab,
  paste `MASTER_PROMPT.md` into the instructions.
- **ChatGPT** — create a Custom GPT, upload all files via Knowledge,
  paste `MASTER_PROMPT.md` into the instructions.
- **Gemini / Grok** — paste `MASTER_PROMPT.md` as the system prompt;
  attach the skills as knowledge files.

## 2. Connect your firm's billing tool (5 mins)

The agent generates client invoices with payment links. Pick one:

- **Ignition** (formerly Practice Ignition) — gold standard for
  bookkeepers. Engagement letter + recurring direct debit + price
  changes in one workflow. Use the **Stripe Setup, end to end.**
  Skillzy bundle if you don't have Stripe set up yet (Ignition
  pipes through Stripe).
- **GoCardless** — strong in UK / EU / AU for SEPA / BECS direct
  debit on recurring fixed-fee engagements. Cheaper per
  transaction than card; longer settlement window.
- **Stripe Invoicing direct** — fine if you bill ad-hoc more than
  recurring. Stripe Connect via Skillzy.
- **Xero invoicing or QuickBooks invoicing** — most firms already
  bill from here. The agent formats line items so they paste in
  cleanly.
- **Karbon Billing** (if on Karbon practice management) — invoices
  pull straight from time + budgets per engagement.

## 3. Connect a practice management + doc collection tool (optional but recommended)

The agent works best when it can see what's in/out of your queue:

- **Karbon** — the gold-standard practice management for
  bookkeepers and accountants. Threads emails, tasks, internal
  comments per client. The agent renders triage notes that paste
  straight into a Karbon work item.
- **Ignition** — covers engagement + billing + scope. The agent
  drafts engagement letters in Ignition's variable format.
- **Jetpack Workflow / Senta / FYI Docs / Iconic Practice / IRIS
  Star** — supported, agent formats output for paste-in.
- **Content Snare** / **Liscio** / **Jetpack** for client doc
  collection — agent drafts the request, you click send.
- **Manual** — fine. Agent maintains a master client list inline
  and runs the WIP report itself.

## 4. Set up email + Hubdoc/Dext forwarding (one-off, 10 mins)

The agent doesn't intercept emails — it reads what you forward to
it. The richer the inbox feed, the smarter the agent.

- **Easiest (3 mins)**: Manually paste each new prospect email +
  each lodgement letter + each ATO/HMRC letter into the agent
  chat. No setup. Fine for solo bookkeepers running 8-12 clients.
- **Email automation**: Set up a forwarding rule on your firm
  email (hello@yourfirm.com / accounts@yourfirm.com →
  agent inbox).
- **Hubdoc / Dext "unread" digest**: Forward the weekly digest so
  the agent knows which clients are behind on source docs.
- **Karbon / Ignition / Xero email triggers** via Zapier or Make
  for the advanced users — every new engagement, every BAS due,
  every unpaid invoice triggers the right skill.

## 5. First conversation

Once it's set up, type or say:

> *"Run intake — I want to set up the firm config first."*

The agent will walk you through `01-intake.md` (the firm-config
sub-routine) to fill in:

- Your jurisdictions (AU, NZ, UK, US, CA — and which states /
  provinces you work across)
- BAS-agent registration number (AU — required to lodge for fee)
  / TPB registration / HMRC AML supervision / NACPB / CPB Canada
- Software stack — Xero / QBO / MYOB / Sage subscriptions; Hubdoc /
  Dext / AutoEntry; Karbon / Ignition / Jetpack; payroll
- Service tiers + price points (Compliance only / Basic monthly /
  Full-service / CFO-lite)
- Working hours, capacity (clients per partner, hours per week
  available)
- Customer comms tone (formal / friendly / "tradie-friendly" /
  "professional services")
- Banned phrases (the things you've sworn off saying — e.g.
  "synergy", "value-add", "circle back")

Then it's ready.

## Coming back later

For ongoing weekly use, you don't need to do anything special. Just
paste the new prospect / lodgement letter / ATO letter and the
agent picks up. Or if you want to run a specific skill:

- *"Quote this catch-up: prospect just emailed, 14 months behind on
  BAS, sole-trade plumber, Xero file is a mess."*
- *"Generate the BAS cover letter for [Client] for the quarter
  ending [date]."*
- *"It's the 15th — run the month-end close calendar for July."*
- *"Time for this week's report — pull WIP, capacity, receivables."*

## If something gets stuck

- Tell the agent: *"Restart from skill X"* and it'll re-run that
  step.
- Or paste: *"Show me which skill you're using right now and what
  step you're on."*

## A note on the BAS-agent / MTD-agent line

This bundle prepares lodgements. Whether you can LODGE depends on
your registration. The agent reads BUSINESS CONFIG for:

- **AU**: TPB BAS Agent or Tax Agent registration number
- **NZ**: Tax agent or BAS-equivalent listing (less formal than AU)
- **UK**: HMRC agent code + MTD agent enrolment + AML supervision
- **US**: Most bookkeepers don't lodge — they prep, CPA / EA lodges.
  PTIN if doing returns.
- **CA**: Most bookkeepers don't lodge T2 — they prep, accountant
  lodges. GST/HST lodgement open to bookkeepers via RAC.

If you're NOT registered to lodge in your jurisdiction, the agent
will refuse to "lodge" and instead format the lodgement-ready pack
for handover to a registered agent. Same pattern as "if no gas
ticket, sub it out" in the plumber bundle. This is non-negotiable —
unlicensed lodgement is a regulatory offence in AU + UK.

That's it. Setup done.
