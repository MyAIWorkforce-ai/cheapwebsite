# Setup — 10 minutes

You only need three things to run this: an agent platform, a place
to keep your finished posts before they go live, and 10 minutes to
fill out the brand config.

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
  paste `MASTER_PROMPT.md` into the Custom GPT instructions.
- **Gemini / Grok** — paste the contents of `MASTER_PROMPT.md` as the
  system prompt; attach the skills + knowledge files as context.
- **n8n / Make / Zapier** — advanced: treat each SKILL as a prompt
  block. Each weekly run kicks off `04-ideate-hooks` and chains
  through `12-weekly-learnings`. See `10-publish-integrations.md`
  for the webhook structure.

## 2. Pick where finished posts will land

The agent doesn't post to the platforms by itself (that part is
human-in-the-loop on purpose — every major platform's terms of service
ban most automated posting, and human review keeps mistakes off the
feed). Pick one landing pad:

- **A scheduler with API support** — Buffer, Hootsuite, Later, Sprout
  Social, Sked Social, Pallyy, Publer, SocialBee, Ayrshare, Postiz.
  Agent writes the caption, you paste or push via API depending on
  the scheduler. See `10-publish-integrations.md` for tool-by-tool
  instructions.
- **A Telegram approval bot** — agent posts each finished slot into
  a Telegram chat for your sign-off. You react ✅ to approve, ❌ to
  send back for rewrite. Setup in `templates/telegram-approval-
  template.md`.
- **A Google Doc / Notion page** per week — the agent writes finished
  captions + scripts there, you copy/paste into the native app or your
  scheduler. Simple, low-tech, works fine.
- **Your phone Notes app** — easiest. Agent gives you the caption,
  you paste while you film/shoot.

Whichever you pick, tell the agent in discovery. It'll format outputs
to match.

## 3. Pick your production tools (optional)

The agent works with whatever you have. If you have AI tools, it'll
brief them. If you don't, it'll give you a phone-shot shot list and
a Canva template structure. Tell it in discovery what you have access
to. Common combos:

- **Pure phone shooter** — iPhone or Android, Capcut or InShot for
  editing, Canva for static graphics. Agent gives shot lists +
  templates.
- **Solo creator stack** — Sony ZV-E10 or iPhone 15 Pro + Rode
  Wireless Go II + Aputure / Godox key light + Capcut / Premiere
  Pro. Agent gives scripts + setup notes.
- **AI-first stack** — Nano Banana / Midjourney for image, Higgsfield
  / Sora / Runway for video, HeyGen for avatar talking head,
  ElevenLabs for voice. Agent gives full prompt blocks.
- **Hybrid** — phone-shot for raw, AI for B-roll + headers. Agent
  briefs both per slot.

## 4. First conversation

Once it's set up, type or say:

> *"Run intake — I want to plan and write the next week of social
> content."*

The agent will start with `01-intake.md` and capture your brand,
audience, platforms, region, and production tools. Then it locks the
brief and you're ready to ideate, write, and schedule.

If you're an agency setting up for a client, say:

> *"Run intake for a new client — I'm an agency, this is client #X."*

The agent will fill the brand config for this client only and keep
client-specific learnings separate.

## 5. Coming back later

For ongoing weekly use, say:

> *"Time for this week's content — start at idea generation."*

The agent jumps straight to `04-ideate-hooks.md` and runs the loop.
It already has the brand config + last week's learnings loaded.

For agency multi-client setups:

> *"This week's posts for [Client Name]."*

The agent loads the right brand config and learnings.

## 6. If something gets stuck

- Tell the agent: *"Restart from skill X"* and it'll re-run that step.
- Or paste: *"Show me which skill you're using right now and what
  step you're on."*
- For a hard reset: *"Reload MASTER_PROMPT and start fresh."*

## 7. If you change platforms or regions

If the brand expands into a new platform (added TikTok, dropping X)
or a new region (US client opens AU presence), tell the agent:

> *"Update brand config — adding TikTok / removing X / expanding to
> AU."*

The agent re-reads the brand config and the regional reference, and
all later outputs respect the change.

## Optional: connect the analytics loop

For the sharpest weekly learnings, the agent works best if you paste
in real numbers. Sources that work:

- Native dashboards — Instagram Insights, TikTok Analytics, LinkedIn
  Analytics, YouTube Studio
- Scheduler insights — Buffer Analyze, Later Analytics, Sprout Insights
- Third-party — Iconosquare, SocialPilot, Brandwatch

Paste the previous week's data on Fridays before the `12-weekly-
learnings.md` skill runs.

## Optional: connect your inbox

If you want the agent to triage comments + DMs daily, paste them in
each morning, or set up a unified inbox tool (Sprout, Hootsuite,
Buffer Engage) and paste the export.

Setup done. The full first run — intake + strategy + calendar +
this week's posts — takes about 90 minutes. After that, weekly cycles
take 30-45 minutes of your time end-to-end.
