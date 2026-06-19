# Social Media Manager, end to end.

A full social media desk for your agent. Strategy, production,
scheduling — one loop, one agent, every platform you care about.
Reads your brand config (voice, pillars, platforms, banned words),
ideates against your content pillars, briefs production into AI
image and video tools (Nano Banana, Higgsfield, HeyGen, ElevenLabs),
writes native captions per platform, runs a pre-publish gate, and
schedules into your peak windows.

Built for one-person businesses that want agency-grade output without
agency rates — or for in-house teams that want a tireless intern.

## The full loop

```
intake  →  strategy  →  ideate  →  produce  →  write  →  pre-publish gate
        →  schedule  →  publish  →  analyse  →  iterate
```

Maintains a running `learnings.md` so the agent gets sharper every
week — tracking what hooks, formats, and times work best for *your*
audience, not generic best-practice.

Repurposes one asset across multiple platforms and formats: one 9:16
master video feeds Instagram Reels, TikTok, YouTube Shorts, and
Facebook Stories without re-shooting.

## What's in this bundle

```
social-media-manager/
├── README.md                       ← this file
├── SETUP.md                        ← buyer onboarding (10-minute setup)
├── MASTER_PROMPT.md                ← orchestrator system prompt
├── LISTING_COPY.md                 ← internal: copy used for the listing
├── PUBLISH.md                      ← internal: how to publish the listing
├── config/
│   ├── brand-config-template.md    ← voice, pillars, banned words, hashtag sets
│   └── learnings-template.md       ← the running learnings file
├── skills/
│   ├── 01-intake.md                ← interview the buyer + fill brand config
│   ├── 02-strategy-pillars.md      ← lock 3–5 content pillars
│   ├── 03-weekly-calendar.md       ← peak-window calendar + pillar rotation
│   ├── 04-ideate-hooks.md          ← hooks in batches, scored against learnings
│   ├── 05-production-briefs.md     ← briefs for Nano Banana, Higgsfield,
│   │                                  HeyGen, ElevenLabs (image / video / voice)
│   ├── 06-write-captions.md        ← native captions per platform, truncation
│   │                                  + hashtag caps respected
│   ├── 07-write-video-scripts.md   ← Reels / TikTok / Shorts + talking-head
│   ├── 08-hashtag-stacks.md        ← per-platform hashtag stacks
│   ├── 09-pre-publish-gate.md      ← the gate every post passes before scheduling
│   ├── 10-publish-integrations.md  ← Ayrshare, Postiz, n8n, Telegram approval
│   ├── 11-engagement-replies.md    ← reply + DM triage playbook
│   └── 12-weekly-learnings.md      ← end-of-week report → learnings.md
└── templates/
    ├── caption-formats-per-platform.md
    ├── carousel-script-template.md
    ├── reel-script-template.md
    ├── talking-head-brief.md
    └── telegram-approval-template.md
```

## How it works

1. **Drop it in your agent.** Claude, OpenClaw, ChatGPT, Gemini,
   Grok — drop the `social-media-manager/` folder into a project or
   knowledge base.
2. **Load the orchestrator.** Paste `MASTER_PROMPT.md` as the system
   prompt. It routes every request to the right skill.
3. **Fill the brand config.** First run, the agent walks you through
   `config/brand-config-template.md` — voice, pillars, platforms,
   banned words, hashtag sets, peak posting windows, timezone.
4. **Run the weekly cycle.** Every week: ideate → produce → write
   captions + scripts → run the pre-publish gate → schedule. After
   posts go live, the agent reads the analytics you paste back in
   and updates `learnings.md` for the next cycle.

## What the buyer ends up with

- A locked **brand config** (voice, pillars, banned words, hashtag
  sets, peak windows, timezone)
- A **weekly + monthly calendar** mapped to platforms + pillar rotation
- A **library of hooks** in batches, scored against past learnings
- **Production briefs** ready to paste into Nano Banana (image),
  Higgsfield (video), HeyGen (talking head), ElevenLabs (voice)
- **Native captions per platform** — respecting Instagram truncation,
  LinkedIn no-link-in-first-line, TikTok 100-char rule, X character cap
- A **pre-publish gate checklist** every post passes before it's
  scheduled (legal, on-voice, no banned words, correct CTA, link in
  the right place)
- **Publishing integrations** via Ayrshare, Postiz, n8n, or native
  platform APIs — with a Telegram approval step so nothing posts
  without your eyes on it
- A **running learnings.md** that gets smarter every week — tracking
  what hooks, formats, and times work best for *your* account
- Measurement against the goal that matters: reach for awareness,
  saves/shares for engagement, link clicks for leads, conversions
  for sales

## Platforms it manages

Universal — Instagram, TikTok, LinkedIn, X, Facebook, YouTube Shorts,
Threads, Pinterest. Agent adapts hooks, caption length, hashtag
count, and video pacing per surface.

## Agent platforms it runs on

- **Claude** (Claude Code, Claude Projects, Claude.ai with file uploads)
- **OpenClaw** (drop straight into skills tab)
- **ChatGPT** (paste into Custom GPT instructions / Project files)
- **Gemini / Grok** (paste skills as a system prompt + knowledge files)
- **n8n / Make / Zapier** (advanced — treat each SKILL as a prompt block)

## Support

Reply to your confirmation email or write to `creators@skillzy.ai`.
