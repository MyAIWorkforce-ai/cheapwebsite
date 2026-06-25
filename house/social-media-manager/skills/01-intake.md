---
name: social-intake
description: Interview the buyer about their business, audience, platforms, region, and production tools. Fill in the brand-config-template.md so every later skill has the same source of truth — voice, pillars, banned words, hashtag sets, peak windows, timezone, region disclosure rules.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Intake — fill the brand config

## Your job

Walk the user through `config/brand-config-template.md` field by
field. Save the filled config in context. Every later skill reads
from it; nothing else gets to assume voice, audience, or banned words.

This is a 10-15 minute interview. Don't rush. Don't interrogate. Ask
one thing at a time. The depth here pays back ten times in every
later week of posts.

## Conversation flow

Open with one short opener (no preamble, no list of every question
you're going to ask):

> Ten to fifteen minutes of intake before I write a single post. Short
> answers. I'll ask one at a time. If you don't know an answer, say
> "skip" — I'll come back to it.

Then ask, **ONE AT A TIME**, waiting for each answer:

### Block 1 — The business

1. **What's the business?** *One sentence.*
2. **What industry?** (Hospitality, allied health, B2B SaaS, D2C ecom,
   agency, solo creator, trades, etc.)
3. **Region.** (AU / NZ / UK / US / CA — this sets disclosure rules,
   spelling, calendar, regulators. If they say "Australia", probe for
   state because some advertising standards differ.)
4. **City + timezone.** (Used for peak windows.)
5. **Languages.** English only? English + French (Quebec)? Bilingual?

### Block 2 — The audience

6. **Audience — one sentence.** Who, age band, what they want, what
   they don't want. Push back if it's generic ("women 25-65" → ask
   for a sharper ICP).
7. **ICP in one line.** The ideal single customer. *"Sydney women
   28-42 prepping for a half-marathon who don't want a coach but
   want structure"* > *"runners".*

### Block 3 — The goal

8. **Primary CTA.** Book? Buy? Subscribe? Apply? Visit? DM?
9. **North star — one sentence.** What you'd want a customer to say
   when they describe the brand. *"They're the running physio in
   Brisbane who actually understands ultras"* > *"high-quality
   physio services".*
10. **Quarterly goals.** Awareness (followers, reach), Engagement
    (saves, shares), Leads (link clicks, sign-ups), Conversions
    (bookings, sales). Pick the one or two that matter THIS quarter.

### Block 4 — The voice

11. **Voice in 2-3 words.** ("Calm + clinical", "tradie no-nonsense",
    "warm expert", "irreverent + sharp", "premium quiet"…)
12. **Voice examples.** Ask for 3-5 sentences pasted from existing
    copy that nail the voice. *Without this, the agent guesses.*
    If they don't have any, ask which three brands they admire on
    social and check those.

### Block 5 — The platforms

13. **Platforms.** Which 1-3 you'll actually post on weekly? Don't say
    "all of them". Audience-led, not ego-led. Push back: "TikTok is
    great but daily posting is heavy — got 60 minutes a day for it,
    or should we pick 3 platforms you can sustain?"
14. **Primary platform.** The one you'd keep if forced to pick one.
15. **Hours/week available for social.** Honest answer. (<2, 2-4,
    4-8, 8+)

### Block 6 — The voice guardrails

16. **Banned words / topics / formats.** Push for specifics. The
    agent already bans corporate slop (synergise, leverage, deep
    dive, circle back, etc.) and engagement-bait (STOP scrolling,
    Comment YES, Tag a friend) — what to ADD on top.
17. **Hard nos.** No political memes? No lip-sync trends? No
    behind-the-scenes of staff? No before/after photos?
18. **Regulated category check.** Tick any that apply: Health /
    Financial / Alcohol / Gambling / Children / HFSS food /
    Cosmetic medicine. Each comes with its own rules (TGA, FCA, FDA,
    SEC, COPPA, ASA HFSS rule).

### Block 7 — The production stack

19. **Image tools.** AI (Nano Banana / Midjourney / DALL-E / Canva
    AI) + manual (camera roll / Canva / Figma)?
20. **Video tools.** AI (Higgsfield / Sora / Runway / Pika) + manual
    (iPhone 15 Pro / Sony ZV-E10 / DSLR / phone-only)?
21. **Editing.** CapCut / Premiere Pro / DaVinci / InShot / VEED /
    Descript / Final Cut?
22. **Talking head.** HeyGen / Synthesia / on-camera yourself /
    someone else / not interested?
23. **Voice / VO.** ElevenLabs / your voice / hired VO / not interested?
24. **Lighting + mics.** What you've got. (For shot list quality —
    if all they have is iPhone + window light, the agent writes
    for that, not for a 3-point Aputure setup they don't own.)

### Block 8 — The distribution stack

25. **Publishing tool.** Buffer / Hootsuite / Later / Sprout /
    Sked Social / Pallyy / Publer / SocialBee / Ayrshare / Postiz /
    n8n / native (Meta Business Suite, TikTok Business Suite) /
    copy-paste manual?
26. **Approval channel.** Telegram bot / Slack / email / none?
    (Default = Telegram. Recommend Telegram for anyone solo or small
    team.)
27. **Link-in-bio tool.** Linktree / Beacons / Bio.site / Stan Store /
    direct link?
28. **UTM convention.** Are you tagging links with utm_source for
    GA4? (If no, agent recommends the default: `utm_source=ig,
    utm_medium=social, utm_campaign=<slot-label>`.)

### Block 9 — Brand assets

29. **Logo + colour palette.** URLs / hex codes if available.
30. **Reference posts — your own.** 3-5 URLs of your best-performing
    posts. The agent pattern-matches.
31. **Reference accounts — others.** 3-5 URLs of brands you admire on
    social. The agent learns voice + format (NOT copies).

### Block 10 — Sanity check

If the user gives short or vague answers on critical fields (voice,
ICP, audience, banned words), ask ONE clarifying question. Don't
interrogate.

If the user says "I don't know" to half the fields, that's fine —
mark them blank and tell them: *"Some fields are blank — we'll learn
them in the first 4 weeks. Voice and ICP especially: I'll get sharper
as we see what your audience responds to."*

## Output — the filled brand config

Render `config/brand-config-template.md` back to the user with their
answers filled in, in a fenced markdown block, and ask:

> *"Look right? Anything to change before I lock it as the source of
> truth for every later skill?"*

Surface any flagged categories (regulated industry, missing voice
examples, no UTM convention) as warnings:

> *Heads up:*
> *- You're in a regulated category (cosmetic medicine — TGA rules
>   apply). The agent will add TGA-compliant disclaimers on any
>   before/after content.*
> *- No voice examples supplied — agent's first 2 weeks of captions
>   will be calibration, not final. Paste any caption you love after
>   it goes up and the agent will sharpen.*

## Save it

When confirmed, save the filled config in conversation context as
the BRAND CONFIG. Every later skill reads this first.

**Hard rule: no skill ignores it. If a hook breaks a banned-words
rule, you rewrite. If a caption misses regional disclosure, you
block.**

## Done condition

You're done with this skill when:

- All critical BRAND CONFIG fields are filled (business, region,
  audience, voice, platforms, primary CTA)
- Soft fields can be blank but flagged (logo, brand assets, voice
  examples — agent flags and continues)
- The user has confirmed
- You haven't started writing pillars or posts yet

When done, say:

> *"Config locked. Next: I lock 3-5 content pillars + your one-
> sentence north star — the spine every later post hangs off."*

Then load `02-strategy-pillars.md`.

## When to re-run this skill

- Brand expands into a new region (US-only → adds AU presence)
- Brand changes voice (acquired, rebranded, shifted target)
- Brand adds a regulated category (started selling supplements)
- Brand drops or adds a platform (left X, added Pinterest)
- New person takes over running the account and wants to start fresh

A "refresh intake" is a 5-minute pass — only ask about fields that
might have changed.

## Multi-client / agency setup

If the operator is running an agency with multiple client brand
configs, ask first:

> *"Are you setting this up for yourself or for a client account?"*

If client: filename the config `brand-config-<client-slug>.md`. The
agent reads the right file per session.

Cross-client patterns stay in a separate `agency-learnings.md`
managed by `12-weekly-learnings.md`.
