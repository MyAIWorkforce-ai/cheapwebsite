# Setup — 10 minutes

You need three things to run this end-to-end. If you already have
any of them, skip ahead.

## 1. Pick an agent platform

Any of these work — pick whichever you already use:

- **Claude.ai** (Pro plan recommended). Create a Project, upload
  the entire `cleaner-agent/` folder, paste `MASTER_PROMPT.md`
  into the project instructions.
- **Claude Code** (terminal). `cd` into the folder, run Claude
  Code in that directory. Skills load automatically.
- **OpenClaw** — upload the SKILL.md files into the Skills tab,
  paste `MASTER_PROMPT.md` into the instructions.
- **ChatGPT** — create a Custom GPT, upload all files via
  Knowledge, paste `MASTER_PROMPT.md` into the instructions.
- **Gemini / Grok** — paste `MASTER_PROMPT.md` as the system
  prompt; attach the skills as knowledge files.

## 2. Connect a payments tool (one-off, 5 mins)

The agent generates invoices with payment links AND handles
recurring contracts via direct debit. Pick the right tool for
your customer mix:

- **Stripe** — most flexible. Card + Apple Pay + ACH (US) +
  PayTo / Direct Debit (AU) + BACS (UK) all in one. Use the
  **Stripe Setup, end to end.** Skillzy bundle if you don't
  have Stripe set up yet.
- **GoCardless** — best UK + EU direct debit. If 60%+ of your
  income is recurring contracts in the UK, this beats Stripe on
  fees for direct debit specifically. Combine with Stripe for
  card invoices.
- **Square** — easier for cleaners who take card on site or run
  a small POS for one-off retail customers. Works in AU/US/UK/CA.
- **Jobber / Housecall Pro / ServiceM8 / ZenMaid / Launch27 /
  Booking Koala** — cleaning-specific field service tools that
  do invoicing + scheduling + payments in one. Agent formats
  quotes and job records for paste-in or API push.
- **Xero / MYOB / QuickBooks / FreshBooks / Wave** — for
  accounting and invoicing only. Agent generates invoices in the
  right format for your books.
- **Bank transfer / EFT only** — fine, agent generates BSB / SWIFT
  / IBAN details on each invoice. No payment integration needed.
  Caveat: recurring contracts on EFT-only see a 6-8% drop in
  on-time payment vs direct debit — flag this to the operator.

## 3. Set up call / text / email forwarding (one-off, 10 mins)

The agent doesn't intercept calls or messages — it reads what
you forward to it. Pick the cheapest path:

- **Easiest (5 mins)**: Manually paste each new lead into the
  agent chat. No setup. Works fine for solo cleaners doing 1-5
  leads/day.
- **SMS automation**: Get an **OpenPhone**, **TextMagic**, or
  **Twilio** number with email-forwarding turned on. Every inbound
  SMS lands in your agent's inbox / Slack / Telegram.
- **Email automation**: Set up a forwarding rule on your business
  email (jobs@yourcleaning.com.au → agent inbox) so quote
  requests get read automatically.
- **Form integration**: If you have a website with a "request a
  quote" form, Zapier / Make / n8n it into the agent.
- **Job marketplace forwarding**: Airtasker / Hipages / Bark /
  Thumbtack / TaskRabbit all send leads via email or in-app — set
  the email to forward to the agent.

## 4. (Optional but recommended) Compliance docs in one folder

Cleaners get asked for these constantly. Drop into the agent's
knowledge base on first run so it can reference / attach them:

- Public liability certificate of currency (PDF from your insurer)
- Worker comp / employer's liability (where applicable)
- Police check (current — refresh annually)
- WWCC / DBS / vulnerable sector check (per region)
- NDIS Worker Screening Check + NDIS Worker Orientation Module
  certificate (AU only — only if you do NDIS work)
- BICSc certification (UK — if you have it)
- CIMS-GB certification (US — if you have it)
- SDS folder for every chem you use (mandatory — most chems have
  this online from manufacturer)
- ABN / VAT / EIN / BN

## 5. First conversation

Once it's set up, type or say:

> *"Run intake — I want to set up the business config first."*

The agent will walk you through `01-intake.md` to fill in your
services (residential recurring, bond, commercial nightly, STR,
specialty), region, rates per job type, public liability,
compliance docs, chem suppliers, crew, payment method, off-hours
rules. Then it's ready.

## Coming back later

For ongoing weekly use, you don't need to do anything special.
Just paste the new lead and the agent picks up. Or if you want
to run a specific skill:

- *"Quote this bond clean: [paste customer message — 3-bed unit
  Sydney Inner West, lease ends Friday]"*
- *"Set up a recurring fortnightly contract for the Smiths —
  4-bed in Northcote, prefers Wed mornings"*
- *"Generate the STR turnover photo pack for the Bourke St
  Airbnb done today"*
- *"Time for this week's report — pull the numbers."*

## If something gets stuck

- Tell the agent: *"Restart from skill X"* and it'll re-run that
  step.
- Or paste: *"Show me which skill you're using right now and
  what step you're on."*

That's it. Setup done.
