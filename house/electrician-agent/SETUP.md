# Setup — 10 minutes

You need three things to run this end-to-end. If you already have any
of them, skip ahead.

## 1. Pick an agent platform

Any of these work — pick whichever you already use:

- **Claude.ai** (Pro plan recommended). Create a Project, upload the
  entire `electrician-agent/` folder, paste `MASTER_PROMPT.md` into
  the project instructions.
- **Claude Code** (terminal). `cd` into the folder, run Claude Code in
  that directory. Skills load automatically.
- **OpenClaw** — upload the SKILL.md files into the Skills tab, paste
  `MASTER_PROMPT.md` into the instructions.
- **ChatGPT** — create a Custom GPT, upload all files via Knowledge,
  paste `MASTER_PROMPT.md` into the instructions.
- **Gemini / Grok** — paste `MASTER_PROMPT.md` as the system prompt;
  attach the skills as knowledge files.

## 2. Connect a payments tool (one-off, 5 mins)

The agent generates invoices with payment links. Pick one:

- **Stripe** — most flexible, works in every country in the regional
  reference. Use the **Stripe Setup, end to end.** Skillzy bundle if
  you don't have Stripe set up yet.
- **Square** — easier for sparkies who also take card payments on a
  reader. Works in AU/US/UK/CA.
- **Tradify / ServiceM8 / Fergus** — trades-specific tools that already
  do invoicing. Agent can format quotes for paste-in to these.
- **Bank transfer only** — fine, agent just generates the BSB/SWIFT
  details on each invoice. No payment integration needed.

## 3. Set up call/text/email forwarding (one-off, 10 mins)

The agent doesn't intercept calls or messages — it reads what you
forward to it. Pick the cheapest path:

- **Easiest (5 mins)**: Manually paste each new lead into the agent
  chat. No setup. Works fine for solo sparkies doing 1–5 leads/day.
- **SMS automation**: Get an **OpenPhone**, **TextMagic**, or
  **Twilio** number with email-forwarding turned on. Every inbound
  SMS lands in your agent's inbox / Slack / Telegram.
- **Email automation**: Set up a forwarding rule on your business
  email (jobs@yoursparky.com.au → agent inbox) so quote requests get
  read automatically.
- **Form integration**: If you have a website with a "request a quote"
  form, Zapier/Make/n8n it into the agent.

## 4. First conversation

Once it's set up, type or say:

> *"Run intake — I want to set up the business config first."*

The agent will walk you through `01-intake.md` to fill in your
hourly rate, callout fee, service area, ABN/VAT, insurance, suppliers,
payment method, off-hours rules. Then it's ready.

## Coming back later

For ongoing weekly use, you don't need to do anything special. Just
paste the new lead and the agent picks up. Or if you want to run a
specific skill:

- *"Quote this callout: [paste customer message]"*
- *"Generate the COC for this job: [job details]"*
- *"Time for this week's report — pull the numbers."*

## If something gets stuck

- Tell the agent: *"Restart from skill X"* and it'll re-run that step.
- Or paste: *"Show me which skill you're using right now and what
  step you're on."*

That's it. Setup done.
