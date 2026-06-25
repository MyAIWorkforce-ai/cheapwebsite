# Social Media Manager Agent, end to end.

A full social media desk for your agent. Strategy, production,
scheduling, engagement, reporting — one loop, one agent, every
platform you care about.

Reads your brand config (voice, pillars, platforms, banned words,
hashtag sets, peak windows, region), ideates against your content
pillars, briefs production into AI image and video tools, writes
native captions per platform, runs a hard pre-publish gate, schedules
into your peak windows, triages comments and DMs, and updates a
running `learnings.md` so the agent gets sharper every week — tracking
what hooks, formats, and times actually work for *your* account.

Built for one-person businesses that want agency-grade output without
agency rates, in-house teams that want a tireless intern, and small
agencies running 5-20 clients who need a repeatable system instead of
five sets of post-it notes.

Works the same in Australia, New Zealand, the United Kingdom, the
United States, and Canada — the regional reference inside the bundle
maps every disclosure rule (AANA / ASA / FTC / Competition Bureau /
ASA NZ), every regulator (ACCC, CMA, FCA, FDA, SEC, OQLF), every
spelling convention (`-ise` vs `-ize`, `colour` vs `color`), every
working-hours window per platform, and every solemn / commercial day
in the calendar.

## The full loop

```
intake  →  strategy  →  calendar  →  ideate  →  production briefs
        →  captions + scripts  →  hashtag stacks  →  pre-publish gate
        →  schedule + Telegram approval  →  user / scheduler publishes
        →  engagement triage  →  weekly report  →  learnings update
        → (next week)
```

Maintains a running `learnings.md` so the agent gets sharper every
week — tracking which hooks landed, which flopped, which formats hit
on the metric that matters per pillar (reach for awareness, saves /
shares for engagement, link clicks for leads, conversions for sales),
which posting windows actually moved the needle, and which hashtag
stacks performed.

Repurposes one asset across multiple platforms and formats: one 9:16
master video feeds Instagram Reels, TikTok, YouTube Shorts, Facebook
Reels, and LinkedIn vertical-video without re-shooting; one 2:3
master image fans into Pinterest Pins, Instagram carousels, and
LinkedIn document posts.

## What's in this bundle

```
social-media-manager/
├── README.md                       ← this file
├── SETUP.md                        ← buyer onboarding (10-minute setup)
├── MASTER_PROMPT.md                ← orchestrator system prompt
├── LISTING_COPY.md                 ← internal: copy used for the listing
├── PUBLISH.md                      ← internal: how to publish the listing
├── config/
│   ├── brand-config-template.md    ← voice, pillars, banned words,
│   │                                  hashtag sets, region, peak windows
│   └── learnings-template.md       ← the running learnings file
├── skills/
│   ├── 01-intake.md                ← interview the buyer + fill brand config
│   ├── 02-strategy-pillars.md      ← lock 3–5 content pillars + north star
│   ├── 03-weekly-calendar.md       ← peak-window calendar + pillar rotation
│   ├── 04-ideate-hooks.md          ← hooks in batches, scored against learnings
│   ├── 05-production-briefs.md     ← briefs for Nano Banana, Higgsfield,
│   │                                  HeyGen, ElevenLabs (image / video / voice)
│   ├── 06-write-captions.md        ← native captions per platform, truncation
│   │                                  + hashtag caps respected
│   ├── 07-write-video-scripts.md   ← Reels / TikTok / Shorts + talking-head
│   │                                  + long-form YouTube
│   ├── 08-hashtag-stacks.md        ← per-platform hashtag stacks
│   ├── 09-pre-publish-gate.md      ← the gate every post passes before scheduling
│   ├── 10-publish-integrations.md  ← Buffer / Hootsuite / Later / Sprout /
│   │                                  Sked / Ayrshare / Postiz / n8n / native
│   │                                  / Telegram approval
│   ├── 11-engagement-replies.md    ← reply + DM triage playbook
│   └── 12-weekly-learnings.md      ← end-of-week report → learnings.md
├── templates/
│   ├── caption-formats-per-platform.md     ← per-platform character cheat sheet
│   ├── carousel-script-template.md         ← IG carousel + LinkedIn doc post
│   ├── reel-script-template.md             ← Reel / TikTok / Shorts skeleton
│   ├── talking-head-brief.md               ← HeyGen / camera / ElevenLabs
│   ├── telegram-approval-template.md       ← human-in-the-loop sign-off
│   ├── short-form-script-formulas.md       ← formula library (hook→tease→deliver→CTA)
│   ├── weekly-creative-review.md           ← Friday creative review
│   ├── monthly-client-report.md            ← agency-grade client report
│   ├── dm-auto-responder-triage.md         ← inbound DM triage script
│   ├── influencer-outreach-dm.md           ← creator outreach + briefing
│   ├── comment-moderation-guidelines.md    ← what to hide / pin / reply / ignore
│   └── crisis-comms-script.md              ← when a post catches fire
└── knowledge/
    ├── regional-reference.md       ← AU / NZ / UK / US / CA full reference
    └── platform-spec-sheet.md      ← character limits, aspect ratios, algo signals
```

## How it works

1. **Drop it in your agent.** Claude, OpenClaw, ChatGPT, Gemini,
   Grok — drop the `social-media-manager/` folder into a project,
   Custom GPT knowledge base, or skills tab.
2. **Load the orchestrator.** Paste `MASTER_PROMPT.md` as the system
   prompt. It routes every request to the right skill and pulls
   region-specific rules from `knowledge/regional-reference.md`.
3. **Fill the brand config.** First run, the agent walks you through
   `config/brand-config-template.md` — voice, pillars, platforms,
   region, banned words, hashtag sets, peak posting windows, timezone,
   disclosure requirements.
4. **Run the weekly cycle.** Every week: ideate → produce → write
   captions + scripts → run the pre-publish gate → schedule (or push
   to Telegram for approval, then schedule). After posts go live,
   paste analytics back and the agent triages replies + updates
   `learnings.md` for the next cycle.

## What the buyer ends up with

- A locked **brand config** — voice, pillars, banned words, hashtag
  sets, peak windows, region, timezone, primary CTA, north star, and
  production tools available
- A **weekly + monthly calendar** mapped to platforms and pillar
  rotation, set against an honest cadence the buyer can actually keep
- A **library of hooks** in batches, scored against past learnings
- **Production briefs** ready to paste into Nano Banana, Midjourney,
  Higgsfield, Sora, HeyGen, ElevenLabs, Synthesia — plus phone-shot
  shot lists for buyers without AI tools and gear recs (Rode SmartLav,
  Wireless Go II, Sony ZV-E10, iPhone 15 Pro, Aputure, Godox)
- **Native captions per platform** — respecting Instagram truncation,
  LinkedIn no-link-in-first-line, TikTok 100-char rule, X 280-char
  cap, Pinterest keyword-first
- **Video scripts** for 15-30 sec / 30-60 sec / 60-90 sec / 1-3 min
  short-form and 5-15 min long-form YouTube
- A **pre-publish gate checklist** every post passes before it's
  scheduled — voice, banned words, hook truncation, CTA, hashtag cap,
  aspect ratio, captions burned in, disclosure (#ad / #gifted /
  #publicité) per region
- **Publishing integrations** for Buffer, Hootsuite, Later, Sprout
  Social, Sked Social (AU strong), Pallyy, Publer, SocialBee, Ayrshare,
  Postiz, n8n, Meta Business Suite, TikTok Business Suite, LinkedIn
  Campaign Manager, YouTube Studio — with a Telegram approval step so
  nothing posts without sign-off
- **Engagement triage** — comments and DMs sorted into respond / save
  for FAQ / route to sales / hide / report, with replies drafted in
  the brand voice
- **Influencer outreach + briefing** — DM templates, brief
  templates, deliverable checklists, FTC/ASA/AANA-compliant disclosure
  baked in
- **Comment moderation guidelines** — what to hide, what to pin, what
  to leave alone, and a crisis-comms script for the day a post catches
  fire
- A **running learnings.md** that gets smarter every week
- A **weekly creative review** and a **monthly client report** for
  agencies running 5+ accounts

## Platforms it manages

Universal — Instagram, TikTok, LinkedIn, YouTube (long-form + Shorts),
Facebook (Pages + Reels + Groups + Marketplace), X / Twitter, Threads,
Pinterest, Snapchat, Reddit, Discord. Agent adapts hooks, caption
length, hashtag count, aspect ratio, and video pacing per surface.

## Regions it works in

- **Australia** — ACCC, AANA Code, ACMA, TGA; `#ad` in first 80
  chars; spelling `-ise`/`-our`; AEST/AEDT windows; Australia Day,
  Anzac Day, EOFY, Black Friday handled correctly
- **New Zealand** — NZ ASA, Commerce Commission; same disclosure
  patterns as AU; Matariki, Waitangi Day handled
- **United Kingdom** — ASA + CAP code, CMA, ICO, FCA; `#ad` /
  `#gifted` mandatory; GMT/BST windows; Remembrance Day solemn;
  HFSS food advertising rules
- **United States** — FTC Endorsement Guides, FDA, SEC, COPPA, CCPA;
  `#ad` mandatory + first-frame disclosure on video; EST/CST/MST/PST
  windows; Memorial / Independence / Thanksgiving / Black Friday /
  Cyber Monday
- **Canada** — Competition Bureau, CRTC, Ad Standards Canada, Quebec
  Law 25 + OQLF; `#ad` + French equivalent (`#publicité`) for Quebec
  audiences; bilingual content rules; Truth & Reconciliation Day,
  Saint-Jean-Baptiste handled

The regional reference inside the bundle maps every term — you don't
need to teach the agent which country you're in beyond filling out the
brand config.

## Agent platforms it runs on

- **Claude** (Claude Code, Claude Projects, Claude.ai with file uploads)
- **OpenClaw** (drop straight into Skills tab)
- **ChatGPT** (Custom GPT instructions + Project files)
- **Gemini / Grok** (paste skills as a system prompt + knowledge files)
- **n8n / Make / Zapier** (advanced — treat each SKILL as a prompt block)

## Tools it integrates with

- **Schedulers**: Buffer, Hootsuite, Later, Sprout Social, Sked Social,
  Pallyy, Loomly, Planoly, ContentStudio, Publer, SocialBee, Meta
  Business Suite, TikTok Business Suite, LinkedIn Campaign Manager,
  YouTube Studio, Ayrshare, Postiz, n8n
- **Analytics**: native dashboards, Sprout, Hootsuite Insights,
  Brandwatch, Mention, BuzzSumo, Iconosquare, SocialPilot
- **Content creation**: Canva, Capcut, Adobe Premiere Pro, InShot,
  VEED, Descript, Figma, Adobe Express; Midjourney, DALL-E, Stable
  Diffusion, Nano Banana for image; Higgsfield, Sora, Runway for
  video; Synthesia, HeyGen for avatar video; ElevenLabs for voice
- **AI writing**: ChatGPT, Claude, Gemini, Jasper, Copy.ai, Writesonic,
  AdCreative.ai; native Meta AI + TikTok Symphony
- **Listening + monitoring**: Mention, Brand24, Talkwalker, Awario,
  Hootsuite Streams
- **Influencer marketing**: Aspire, Grin, CreatorIQ, IMA, Tribe (AU),
  Vamp (AU), TikTok Creator Marketplace, Meta Creator Studio
- **Link tools**: Linktree, Beacons, Bio.site, Stan Store, Magic.link
- **UTM + tracking**: Bitly, Rebrandly, GA4 UTMs, Google Tag Manager

## Support

Reply to your confirmation email or write to `creators@skillzy.ai`.
