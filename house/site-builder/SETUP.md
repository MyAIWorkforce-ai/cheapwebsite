# Setup — 10 minutes

You need three things to run this end-to-end. If you already have any
of them, skip ahead.

## 1. Pick an agent platform

Any of these work — pick whichever you already use:

- **Claude.ai** (Pro plan recommended for the larger context window).
  Create a Project, upload the entire `site-builder/` folder, paste
  `MASTER_PROMPT.md` into the project instructions.
- **Claude Code** (terminal). `cd` into the folder, run Claude Code
  in that directory. Skills load automatically.
- **OpenClaw** — upload the SKILL.md files into the Skills tab,
  paste `MASTER_PROMPT.md` into the instructions.
- **ChatGPT** — create a Custom GPT, upload all files via Knowledge,
  paste `MASTER_PROMPT.md` into the instructions.
- **Gemini / Grok** — paste `MASTER_PROMPT.md` as the system prompt;
  attach the skills as knowledge files.

## 2. Set up the supporting accounts (one-off, ~10 mins total)

The agent doesn't need accounts to draft, but it needs them to ship.
Set up whichever of these you'll actually use. The defaults work for
95% of small-business sites.

### Required for every build
- **GitHub** — `github.com/join` (free). Hosts the source code.
- **Vercel** — `vercel.com/signup` (free tier covers most small
  sites). Sign up *with GitHub* so the connection is pre-authorised.
- A **domain registrar account** — only needed if you want a custom
  domain. Defaults: **Cloudflare Registrar** (at-cost, no upsells)
  or **Porkbun** (cheap + sane UI). For `.com.au` / `.nz` the agent
  routes you to the right registrar for the TLD.

### Optional (the agent suggests these at the right step)
- **Analytics** — pick one when you reach skill 08:
  - **Plausible** (privacy-first, defaults for AU/NZ/UK/EU buyers —
    cookieless, ~$9/mo)
  - **Google Analytics 4** (free, ubiquitous, needs cookie consent
    in AU/NZ/UK/EU/CA)
  - **Vercel Analytics** (built into Vercel, simplest)
  - **Fathom / Simple Analytics / PostHog** — alternatives the
    agent knows
- **Consent banner** — needed for GA4 / Meta / third-party trackers
  in AU/NZ/UK/EU/CA:
  - **Cookiebot** (paid, robust, default for EU/UK)
  - **Iubenda** (paid, generates the privacy policy too)
  - **Termly** (free tier — good for solo founders)
  - **CookieYes** (free tier — good for solo founders)
- **Form / lead capture** — needed if the site has a contact form:
  - **Formspree** (free tier — 50 submissions/mo)
  - **Basin** (free tier — 100 submissions/mo)
  - **Web3Forms** (free, no account needed)
  - **Tally** (forms + light database — free)
- **Email + CRM** (if you want leads to land somewhere structured):
  - **HubSpot Free CRM**, **Pipedrive**, **Folk**, **Attio**
  - For email lists: **ConvertKit (Kit)**, **MailerLite**, **Loops**
- **Stripe** (if the site takes payments) — set it up via the
  **Stripe Setup, end to end.** bundle. Skill 09 hands you off.

## 3. First conversation

Once it's set up, type or say:

> *"Run discovery — I want to build [one-line description of the
> site]."*

The agent will:

1. Walk you through `01-discover.md` — what kind of site, who it's
   for, brand voice, region, payments yes/no
2. Lock in the brief with `config/business-config-template.md`
3. Route to `02-information-architecture.md` for the sitemap
4. Continue through scaffold → content → deploy → DNS → SEO →
   analytics → forms → launch

## Coming back later

For changes after launch, you don't need to do anything special.
Just say:

> *"Change the headline on the home page to 'Same-day plumbing,
> Adelaide-wide'."*

The agent picks up at `12-maintain-update.md`. Or if you want a
specific skill:

- *"Re-do the SEO pass — we want to rank for 'emergency plumber
  Norwood'"* → loads `07-seo-onpage.md`
- *"Add a pricing page"* → loads `04-content-writing.md` →
  `02-information-architecture.md` (sitemap update) → publishes
- *"Add Stripe payments"* → loads `09-payments-integration.md`,
  hands you off to the Stripe Setup bundle

## If something gets stuck

- Tell the agent: *"Restart from skill X"* and it'll re-run that
  step.
- Or paste: *"Show me which skill you're using right now and what
  step you're on."*
- If a deploy fails, the agent will ask you to paste the full
  Vercel build log. Always paste the full log — agents diagnose 10×
  faster than guessing from a one-line summary.

## What you don't need

- You don't need to know how to code. The agent gives you exact
  commands to run.
- You don't need design experience. The agent generates the layout
  and applies a coherent brand from the config.
- You don't need to be technical with DNS. The agent walks every
  registrar through the right A / CNAME records, screenshot by
  screenshot if needed.
- You don't need a paid hosting plan. The defaults (Vercel free,
  Cloudflare DNS free) cover small-business traffic comfortably.

## What you do need

- A clear idea of who the site is for and what the one thing is
  you want a visitor to do. The discover skill teases this out if
  you haven't thought about it.
- A device with a browser and a terminal (Mac/Linux/Windows all
  work — the agent gives platform-specific commands).
- Patience for ~10 minutes of one-time account setup. After that,
  every later build reuses the same accounts.

That's it. Setup done.
