# Setup — 5 minutes

You'll need three free accounts. If you already have them, skip ahead.

1. **GitHub** — github.com → sign up (free)
2. **Vercel** — vercel.com → sign up with your GitHub account (free)
3. **A domain registrar account** — only needed if you want a custom
   domain. Any registrar works (GoDaddy, Cloudflare, Namecheap,
   Porkbun, Vercel Domains). If you don't have one yet, the agent
   will buy one for you via Vercel Domains during the deploy step.

## Plus an agent platform

Pick one — any of these work:

- **Claude.ai** (Pro plan recommended for the larger context window).
  Create a Project, upload the `site-builder/` folder, paste
  `MASTER_PROMPT.md` into the project instructions.
- **Claude Code** (terminal). `cd` into the `site-builder/` folder,
  run Claude Code in that directory. The skills load automatically.
- **OpenClaw** — upload the SKILL.md files into the Skills tab,
  paste `MASTER_PROMPT.md` into the instructions.
- **ChatGPT** — create a Custom GPT, upload all files via Knowledge,
  paste `MASTER_PROMPT.md` into the instructions.

## First conversation

Once it's set up, type or say:

> *"I want to build a [one-line description of the site]."*

The agent will start with `01-discover.md` and walk you through every
step. You're never more than 1 reply from "what's next?"

## If something gets stuck

- Tell the agent: *"Restart from skill X"* and it'll re-run that step.
- Or paste this in: *"Show me which skill you're using right now and
  what step you're on."*

That's it. Setup done.
