---
name: social-pre-publish-gate
description: Run every post through a hard checklist before scheduling. Catches voice drift, banned words, wrong CTA, broken first-line truncation, missing hashtags, off-aspect ratio, missing #ad disclosure (region-specific), assets that don't match the platform, and substantiation gaps on claim language. Anything that fails kicks back for a rewrite.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Pre-publish gate — the last quality check

## Your job

Before any post reaches the scheduling skill, every post passes a
hard checklist. Failures kick back for a rewrite. The gate stops "I
clicked send too fast" mistakes from going live and stops the brand
from shipping regulatory violations.

This is the agent's QA layer. Treat it like a code review for posts.
Be specific about what failed and where to send it back.

## The full checklist

For each post (caption, video, image), confirm — line by line — in a
fenced block:

```
GATE — <day, time, platform, slot, pillar>

CONTENT
[ ] On-voice (matches BRAND CONFIG voice 2-3 words)
[ ] Voice example match (calibration against BRAND CONFIG voice
    examples — if the caption sounds nothing like the references,
    flag)
[ ] No banned words / topics / formats (BRAND CONFIG + corporate
    slop list)
[ ] No engagement-bait phrases ("STOP scrolling", "Comment YES",
    "Tag a friend who needs this", "Double tap if", "Save this if",
    "Swipe up if", "You won't believe", "This changes everything",
    "The truth about", "What they don't want you to know")
[ ] No corporate slop (synergise, leverage, unpack, deep dive,
    circle back, thought leadership, ecosystem unless literal,
    elevate, curated, journey of a brand, going forward, touch
    base, low-hanging fruit, bandwidth, value-add)
[ ] Hook fits in first-line cutoff (80-125 chars per platform)
[ ] CTA matches BRAND CONFIG primary or secondary CTA
[ ] No fake urgency ("Last chance" — only if literally true; "Only
    today" — only if literally true; "Limited spots" — only if real
    cap exists)
[ ] No unsubstantiated claims ("best", "first", "only", "fastest",
    "guaranteed", "doctor recommended", "scientifically proven" —
    all must have evidence)
[ ] No competitor names accidentally included
[ ] Regional spelling correct (AU/NZ/UK = -ise/colour; US = -ize/color;
    CA = house style)
[ ] No emoji in first line unless brand voice mandates

REGIONAL + REGULATORY
[ ] Region-appropriate disclosure if paid/gifted (#ad / #gifted /
    #publicité — upfront, first 80 chars)
[ ] On-video disclosure if paid (first 3 sec — required US FTC; AU
    AANA; UK ASA strongly preferred)
[ ] French content for Quebec audiences where applicable (French ≥
    English by OQLF Law 25)
[ ] Regulated category disclaimers if applicable:
    - Health / wellness / supplements → TGA / FDA / ASA wording
    - Financial / crypto → FCA / SEC compliant
    - Alcohol → age-gated, not promoting excessive consumption
    - HFSS food (UK) → no targeting under-16, not before 9pm
    - Cosmetic / aesthetic → TGA before/after rules in AU
[ ] Calendar-aware (no commercial post on Anzac Day, Memorial Day,
    Remembrance Day, Truth & Reconciliation Day)

HASHTAGS
[ ] Hashtag count within platform cap (IG 10 practical, LinkedIn 3,
    TikTok 5, X 0-1, Pinterest 0)
[ ] Brand hashtag included (every stack)
[ ] No banned topic hashtags
[ ] No mega-tags drowning the post (100M+ posts)
[ ] No spelling errors in tags (dead tag if so)
[ ] Stack rotated from previous post (no two identical stacks this
    week)

ASSETS (video / image)
[ ] Aspect ratio correct (9:16 for Reels/Shorts/TikTok, 1:1 or 4:5
    for IG feed, 16:9 for YouTube long, 2:3 for Pinterest)
[ ] Resolution ≥ 1080p (video) / 1080×1080+ (image)
[ ] First frame holds hook for ≥1 second (video — algorithm thumb)
[ ] Burned-in captions present (video — don't rely on platform
    auto-captions)
[ ] No watermarks from other tools (CapCut, Canva, TikTok download —
    strip on export)
[ ] No accidental text from production tool overlaid
[ ] Music license OK (platform-native audio for organic; licensed
    for paid)
[ ] Voice match if AI voiceover (matches BRAND CONFIG voice ID)

LINKS + CTA
[ ] Link in bio updated if this post references it
[ ] LinkedIn: link in first comment, not first line of post
[ ] UTM parameters added to outbound links (utm_source=ig,
    utm_medium=social, utm_campaign=<slot label>)
[ ] Free-tool links (Calendly, Cal.com, Linktree) tested in
    incognito
[ ] Bio link works on mobile (most platforms strip query strings)

LEGAL + ACCESS
[ ] Permission from any person/client featured (especially clinic,
    studio, behind-the-scenes content with identifiable people)
[ ] Music license OK (use platform-native audio library when
    possible; no copyrighted tracks ripped from movies/games/etc.)
[ ] No copyrighted footage from films/shows/games/news without
    fair-use basis
[ ] Alt-text written for image posts (accessibility + SEO)
[ ] Disclosure tag if it's an ad/sponsorship (#ad #sponsored
    #gifted)
[ ] If reposting UGC, permission documented + credit added

SCHEDULING + PUBLISHING
[ ] Scheduled for the peak window in BRAND CONFIG
[ ] Local timezone correct (no 3am posts from timezone mixup)
[ ] If using Telegram approval: pasted into approval channel +
    waiting on sign-off
[ ] No duplicate post going up within 24h on the same platform
[ ] Not posted during solemn day (Anzac Day, Memorial Day,
    Remembrance Day, Truth & Reconciliation Day)
[ ] Production brief asset finalised + file attached / linked

OUTCOME: <PASS | FAIL>

If FAIL:
  Items to fix:        <list the unchecked items>
  Send back to skill:  <05-production-briefs / 06-write-captions /
                        07-write-video-scripts / 08-hashtag-stacks /
                        04-ideate-hooks>
  Notes for rewrite:   <one line on what specifically to change>
```

## Severity tiers

Some failures block; others warn.

### HARD STOP (must fix before scheduling)

- Missing disclosure (#ad / #gifted / #publicité) on paid/gifted
  content
- Unsubstantiated claim ("best", "guaranteed", "fastest")
- Banned word or topic from BRAND CONFIG
- Wrong aspect ratio
- Posting on a solemn day (Anzac, Memorial, Remembrance, TRC)
- Regulated category content without disclaimer (health, financial,
  cosmetic, alcohol, gambling)
- Music without license (copyrighted track ripped from elsewhere)
- Featured person without permission
- LinkedIn URL in first line
- Watermark from production tool still visible

### SOFT WARN (suggest fix, can override with confirmation)

- Voice slightly off-calibration (close but not perfect)
- Hashtag stack identical to last week's
- First-line hook just over the 125-char cutoff
- Missing alt-text
- UTM parameters missing
- Caption slightly over platform sweet-spot length
- Hook framework repeated 3+ times this week

## Per-region check additions

Run the regional check from `knowledge/regional-reference.md`:

### AU/NZ
- Spelling check: `-ise`, `colour`, `centre`, `behaviour`
- Disclosure: `#ad` first 80 chars
- AANA: substantiation on testimonials, comparison claims
- ACCC: misleading claims test
- TGA: if cosmetic / health
- Calendar: Anzac Day Apr 25 — solemn
- NZ-specific: Matariki, Waitangi Day

### UK
- Spelling check: `-ise`, `colour`, `centre`
- Disclosure: `#ad` or `#gifted` first 80 chars
- ASA / CAP: substantiation
- CMA green claims: "eco", "sustainable", "natural" must be
  substantiated (Green Claims Code)
- FCA: financial promo compliant
- HFSS: food advertising rules (under-16, pre-9pm)
- Calendar: Remembrance Day Nov 11 — solemn

### US
- Spelling check: `-ize`, `color`, `center`
- FTC: `#ad` upfront + first-frame on video
- FDA: health claim wording
- SEC: financial promo
- COPPA: not "directed at" under-13s
- CCPA: California data capture
- Calendar: Memorial Day, Independence Day, Thanksgiving, Black
  Friday + Cyber Monday

### CA
- Spelling: house style (mixed)
- Disclosure: `#ad` + French `#publicité` for Quebec
- Quebec Law 25: French ≥ English in commercial communications
- Competition Bureau: substantiation; Green Claims Guide 2024
- Calendar: Truth & Reconciliation Day Sep 30 — solemn

## Rules

- **Run the gate per post, not per week.** Every post = its own gate.
- **One HARD STOP = blocked.** Don't ship "mostly passing".
- **Don't silent-pass.** If a banned word slipped through, surface
  the rewrite so the user can confirm.
- **Telegram approval** (if BRAND CONFIG → Approval channel =
  Telegram) is a separate human sign-off step ON TOP OF the gate.
  Both must pass before scheduling.
- **Log the gate result** even on PASS — useful for `12-weekly-
  learnings.md` to spot which slots typically hit which warns.

## Output

For a week of posts:

```
GATE SUMMARY — Week of <date>
============================
Total slots:       <N>
Passed:            <X>
Failed:            <Y> — sent back for rewrite
Soft-warned:       <Z> — flagged for review

DETAIL PER SLOT BELOW
[per-slot gate blocks]
```

## Confirm + handoff

Present all gate results in a single message. For any FAIL, walk back
to the relevant skill, fix, and re-gate.

> *"Gate run. <N> passed, <M> failed. Failures sent back to be
> rewritten. Once they re-pass, I'll move to scheduling."*

For agency-grade output, the gate run also produces a summary log
that goes into the weekly client report.

## Done condition

- Every slot this week has PASSED the gate (HARD STOP items resolved)
- Soft warns are acknowledged or fixed
- No silent overrides
- Telegram approvals queued if applicable

When done, say:

> *"All slots passed. Next: scheduling — what goes where, when, on
> which channel."*

Then load `10-publish-integrations.md`.

## When the gate keeps failing the same slot

If a slot fails the gate 3 times in a row, surface to the user
honestly:

> *"This slot is fighting me. Voice keeps drifting / claim keeps
> being un-substantiable / hook keeps reading bait. Want to drop this
> slot from the week and replace with a fresh angle, or push through
> with another rewrite?"*

Don't bury repeated failures. Three failed rewrites = the angle
isn't right, not the writing.
