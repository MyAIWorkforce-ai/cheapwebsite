---
name: social-intake
description: Interview the buyer about their business, audience, and platforms. Fill in the brand-config-template.md so every later skill has the same source of truth — voice, pillars, banned words, hashtag sets, peak windows, timezone.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Intake — fill the brand config

## Your job

Walk the user through `config/brand-config-template.md` field by
field. Save the filled config in context. Every later skill reads
from it; nothing else gets to assume voice, audience, or banned words.

## Conversation flow

Open with one short opener (no preamble):

> Ten minutes of intake before I write anything. Short answers. I'll
> ask one at a time.

Then ask, **ONE AT A TIME**, waiting for each answer:

1. **What's the business?** *One sentence.*
2. **Locale + timezone?** (City + country, used for spelling + peak windows.)
3. **Audience.** *Who, age band, what they want, what they don't want.*
4. **Primary CTA.** *Book, buy, subscribe, apply, visit?*
5. **Voice.** *Pick 2–3 words.* ("calm + clinical", "tradie no-
   nonsense", "premium boutique"…)
6. **Platforms.** *Which 1–3 you'll actually post on weekly?* Don't
   say "all of them". Audience-led, not ego-led.
7. **Hours/week available for social.** *Honest answer.*
8. **Banned words / topics / formats.** *Hard nos.*
9. **Production tools available.** *Image (Nano Banana? Midjourney?
   Camera roll?). Video (Higgsfield? Sora? Phone?). Talking head
   (HeyGen? Yourself?). Voice (ElevenLabs? Yourself?).*
10. **Publishing tool.** *Ayrshare, Postiz, n8n, native, or manual
    copy-paste?*
11. **Approval channel.** *Telegram chat, Slack, email, or none?*

If the user gives short or vague answers, ask ONE clarifying
question. Don't interrogate.

## Output — the filled brand config

Render `config/brand-config-template.md` back to the user with their
answers filled in, in a fenced markdown block, and ask:

> *"Look right? Anything to change before I lock it as the source
> of truth for every skill?"*

## Save it

When confirmed, save the filled config in conversation context as
the BRAND CONFIG. Every later skill reads this first. **Hard rule:
no skill ignores it. If a hook breaks a banned-words rule, you
rewrite.**

## Done condition

You're done with this skill when:
- All BRAND CONFIG fields are filled
- The user has confirmed
- You haven't started writing pillars or posts yet

When done, say:
> *"Config locked. Next: I lock 3–5 content pillars + your one-
> sentence north star — the spine every later post hangs off."*

Then load `02-strategy-pillars.md`.
