---
name: social-pre-publish-gate
description: Run every post through a hard checklist before scheduling. Catches voice drift, banned words, wrong CTA, broken first-line truncation, missing hashtags, off-aspect ratio, and assets that don't match the platform. Anything that fails kicks back for a rewrite.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Pre-publish gate — the last quality check

## Your job

Before any post reaches the scheduling skill, every post passes a
hard checklist. Failures kick back for a rewrite. The gate is what
stops "I clicked send too fast" mistakes from going live.

## The checklist

For each post (caption, video, image), confirm — line by line — in
a fenced block:

```
GATE — <day, platform, slot, pillar>

CONTENT
[ ] On-voice (matches BRAND CONFIG voice 2-3 words)
[ ] No banned words / topics / formats
[ ] Hook fits in first 80-125 chars (platform-specific)
[ ] CTA matches BRAND CONFIG primary CTA
[ ] No engagement-bait phrases ("STOP scrolling", "Comment YES", etc.)
[ ] No fake urgency ("Last chance" — only if literally true)
[ ] No competitor names accidentally included
[ ] Hashtag count within platform cap (IG 10, LinkedIn 3, etc.)
[ ] Brand hashtag included

ASSETS
[ ] Aspect ratio correct (9:16 for Reels/Shorts/TikTok, 1:1 or 4:5 IG feed)
[ ] Resolution ≥ 1080p (video) / 1080×1080+ (image)
[ ] First frame holds hook for ≥1 second (video)
[ ] Burned-in captions (video — don't rely on auto-captions)
[ ] No watermarks from other tools (CapCut, Canva — strip on export)
[ ] No accidental text from production tool overlaid

LINKS + CTA
[ ] Link in bio updated if this post references it
[ ] LinkedIn: link in first comment, not first line of post
[ ] UTM parameters added to outbound links (utm_source=ig,
    utm_medium=social, utm_campaign=<slot label>)
[ ] Free-tool links (Calendly, Cal.com) tested in incognito

LEGAL + ACCESS
[ ] Permission from any person/client featured (especially clinic/
    studio behind-the-scenes)
[ ] Music license OK (use platform-native audio library when possible)
[ ] No copyrighted footage from films/shows/games
[ ] Alt-text written for image posts (accessibility + SEO)
[ ] Disclosure tag if it's an ad/sponsorship (#ad #sponsored)

PUBLISHING
[ ] Scheduled for the peak window in BRAND CONFIG
[ ] If using Telegram approval: pasted into approval channel + waiting
    on sign-off
[ ] No duplicate post going up within 24h on the same platform

OUTCOME: <PASS / FAIL>
If FAIL:
  Items to fix: <list the unchecked items>
  Send back to: <which skill — 05-production-briefs / 06-write-captions /
                 07-write-video-scripts / 08-hashtag-stacks>
```

## Rules

- **Run the gate per post, not per week.** Every post = its own gate.
- **One fail = blocked.** Don't ship "mostly passing". Fix it first.
- **Don't silent-pass.** If a banned word slipped through, surface
  the rewrite so the user can confirm.
- **Telegram approval** (if BRAND CONFIG → Approval channel = Telegram)
  is a separate human sign-off step on top of the gate. Both must
  pass before scheduling.

## Confirm + handoff

Present all gate results in a single message. For any FAIL, walk
back to the relevant skill, fix, and re-gate.

> *"Gate run. <N> passed, <M> failed. Failures sent back to be
> rewritten. Once they re-pass, I'll move to scheduling."*

## Done condition

- Every slot this week has PASSED the gate
- No silent overrides

When done, say:
> *"All slots passed. Next: scheduling — what goes where, when, on
> which channel."*

Then load `10-publish-integrations.md`.
