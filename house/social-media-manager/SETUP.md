# Setup — 5 minutes

You only need two things to run this: an agent platform and a place
to keep your finished posts before they go live.

## 1. Pick an agent platform

Any of these work — pick whichever you already use:

- **Claude.ai** (Pro plan recommended for the larger context window).
  Create a Project, upload the entire `social-media-manager/` folder,
  paste `MASTER_PROMPT.md` into the project instructions.
- **Claude Code** (terminal). `cd` into the folder, run Claude Code
  in that directory. Skills load automatically.
- **OpenClaw** — upload the SKILL.md files into the Skills tab, paste
  `MASTER_PROMPT.md` into the instructions.
- **ChatGPT** — create a Custom GPT, upload all files via Knowledge,
  paste `MASTER_PROMPT.md` into the instructions.
- **Gemini / Grok** — paste the contents of `MASTER_PROMPT.md` as the
  system prompt; attach the skills as knowledge files.

## 2. Pick where finished posts will land

The agent doesn't post for you (that part is human-in-the-loop on
purpose — platform terms ban most automated posting). Pick one
landing pad:

- **A Google Doc / Notion page** per week — the agent writes finished
  captions + scripts there, you copy/paste into the native app.
- **A scheduler** like Buffer, Later, Metricool, or Publer — agent
  writes the caption, you paste into the scheduler with the asset.
- **Your phone Notes app** — easiest. Agent gives you the caption,
  you paste while you film/shoot.

Whichever you pick, tell the agent in discovery. It'll format outputs
to match.

## 3. First conversation

Once it's set up, type or say:

> *"Run discovery — I want to plan and write the next week of social
> content."*

The agent will start with `01-discover.md` and capture your brand,
audience, and platforms. Then it locks the brief and you're ready to
ideate, write, and schedule.

## Coming back later

For ongoing weekly use, say:

> *"Time for this week's content — start at idea generation."*

The agent jumps straight to `04-ideate-hooks.md` and runs the loop.

## If something gets stuck

- Tell the agent: *"Restart from skill X"* and it'll re-run that step.
- Or paste: *"Show me which skill you're using right now and what
  step you're on."*

Setup done.
