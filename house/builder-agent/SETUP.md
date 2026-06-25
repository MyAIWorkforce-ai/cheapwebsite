# Setup — 10 minutes

You need three things to run this end-to-end. If you already have
any of them, skip ahead.

## 1. Pick an agent platform

Any of these work — pick whichever you already use:

- **Claude.ai** (Pro plan recommended). Create a Project, upload the
  entire `builder-agent/` folder, paste `MASTER_PROMPT.md` into the
  project instructions.
- **Claude Code** (terminal). `cd` into the folder, run Claude Code
  in that directory. Skills load automatically.
- **OpenClaw** — upload the SKILL.md files into the Skills tab,
  paste `MASTER_PROMPT.md` into the instructions.
- **ChatGPT** — create a Custom GPT, upload all files via Knowledge,
  paste `MASTER_PROMPT.md` into the instructions.
- **Gemini / Grok** — paste `MASTER_PROMPT.md` as the system prompt;
  attach the skills as knowledge files.

## 2. Connect a payments tool (one-off, 5 mins)

The agent generates progress claims with payment links. Pick one:

- **Stripe** — most flexible, works in every country in the regional
  reference. Note: large progress claims (>$10k) sometimes go
  smoother through bank EFT than card — Stripe's still useful for
  the small deposits and PC item top-ups. Use the **Stripe Setup,
  end to end.** Skillzy bundle if you don't have Stripe set up yet.
- **Xero / MYOB / QuickBooks** — most builders run accounting in
  one of these. The agent can format progress claims to paste-in
  rather than charging directly. This is often the simpler path
  for established builders.
- **simPRO / Buildxact / CoConstruct / Buildertrend / Procore** —
  builder-specific tools that already do progress claims. The agent
  can format the claim breakdown for paste-in.
- **Bank transfer only** — fine for residential builders working
  with established clients. Agent generates BSB/SWIFT/IBAN details
  on each claim. No integration needed.

## 3. Set up enquiry forwarding (one-off, 10 mins)

The agent doesn't intercept calls — it reads what you forward to
it. Pick the cheapest path:

- **Easiest (5 mins)**: Manually paste each new enquiry into the
  agent chat. No setup. Works fine for residential builders running
  3–8 active projects.
- **Email automation**: Set up a forwarding rule on your business
  email (enquiries@yourbuild.com.au → agent inbox) so website
  enquiries get read automatically.
- **Form integration**: If you have a website with a "request a
  quote" or "start a project" form, Zapier/Make/n8n it into the
  agent.
- **Architect / designer referral inbox**: If 80% of your work
  comes via architects, set them up with a dedicated reply-to that
  goes to the agent — keeps the enquiry trail clean.

## 4. First conversation

Once it's set up, type or say:

> *"Run intake — I want to set up the business config first."*

The agent will walk you through `01-intake.md` to fill in your
business config: builder licence number, insurance, contract type
(HIA / NZS / JCT / AIA / CCDC), regional approval pathway, base
rates, preferred subbies and suppliers, deposit cap, retention
policy, PC markup, variation markup, off-hours rules. Then it's
ready.

## Coming back later

For ongoing weekly use, you don't need to do anything special. Just
paste the new enquiry and the agent picks up. Or if you want to run
a specific skill:

- *"Quote this enquiry: [paste client message about a rear
  extension]"*
- *"Generate the next progress claim for [project name] — frame
  stage complete."*
- *"Time for this week's WIP report — pull the numbers."*
- *"Run the 11-month defects sweep for [previous project]."*

## If something gets stuck

- Tell the agent: *"Restart from skill X"* and it'll re-run that
  step.
- Or paste: *"Show me which skill you're using right now and what
  step you're on."*

That's it. Setup done.
