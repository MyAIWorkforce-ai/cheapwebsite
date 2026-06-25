---
name: social-write-captions
description: Write native captions per platform. Respect Instagram truncation (125 chars before "more"), LinkedIn no-link-in-first-line, TikTok 100-char rule, X 280-char cap, hashtag caps per platform, regional spelling and disclosure rules, and BRAND CONFIG voice + banned words.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Captions — native per platform

## Your job

For every slot with a picked hook, write the full caption in the
platform's native format. Truncation rules, hashtag caps, line-break
conventions, CTA placement, and regional disclosure all change per
platform.

The caption isn't an afterthought to the video / image — it's its own
craft. Same hook in three different captions performs differently.

## Per-platform rules (hard)

Pull deep numbers from `knowledge/platform-spec-sheet.md`.

| Platform | Caption length | First-line cutoff | Hashtag count | Link strategy |
|---|---|---|---|---|
| Instagram (feed) | 100-200 words | 125 chars before "...more" | 5-10 mixed | Link in bio (URLs in caption not clickable) |
| Instagram (Reels) | 50-80 words | 80 chars critical | 3-5 | Link in bio |
| Instagram (Stories) | 250 chars per sticker | Sticker = hook | 1-3 sticker hashtags | Link sticker available |
| TikTok | 100-300 chars | 100 chars visible | 3-5 broad+niche | Link in bio (1k+ followers) |
| LinkedIn | 800-1500 chars (3000 max) | 140 chars before "see more" | 3 max | Link in first comment, NEVER first line of post |
| X / Twitter | 280 chars per post (free); thread for longer | The tweet IS the hook | 0-1 (hurts reach) | Inline OK; or in reply for better reach |
| Threads | 500 chars | First line | 0-1 | Inline OK |
| Facebook | 50-150 words | 80 chars | 0-2 (negligible impact) | Inline OK |
| YouTube long-form | 5,000 chars description; 60 char title | Title visible; first 150 chars of desc above fold | 3 in description (not title — hurts CTR) | In description |
| YouTube Shorts | Same | Title = hook | 3 in description | In description |
| Pinterest | Pin title 100 chars + 500 char desc | Title = SEO | 0 (skip) | In Pin URL |
| Snapchat | 250 chars | – | – | Snap link sticker |

## First-line hook (the most important line)

The first 80-140 characters of every caption decide whether the post
gets read. Rules:

- **Front-load the hook.** No "Hey guys", no preamble.
- **Don't bury the lede.** If the killer line is in paragraph 3, it's
  in the wrong paragraph.
- **Match the on-screen hook to the caption hook (mostly).** For
  Reels/TikTok, the caption can be a variant of the on-screen hook;
  carousel caption hook should be different ("why this carousel" vs
  "what's in slide 1").
- **No emoji in the first line** unless brand voice mandates.

## CTA library

Pick one per post. Match to the slot's pillar goal.

| Goal | CTA examples |
|---|---|
| Awareness (followers) | "Follow [@handle] for [specific topic]" — only if voice allows |
| Engagement (saves) | "Save this for the next time [scenario]" |
| Engagement (shares) | "Send this to a [specific friend type] who [specific situation]" |
| Engagement (comments) | "What's your take on [specific thing]?" — answer your own first to seed |
| Leads (link clicks) | "Full [thing] in the link in bio" / "DM [keyword] for the [resource]" |
| Leads (DM) | "DM 'BOOK' and I'll send you the booking link" |
| Conversion (sale) | "Link to [product] in bio — [specific scarcity if real]" |
| Community | "Comment your [specific thing] — I read every one" |

**Banned CTAs** (auto-rewrite):

- "Follow for more" → too vague, reads desperate
- "Like and subscribe" → YouTube ages 2017
- "Tag a friend who needs this" → engagement-bait
- "Double tap if you agree" → engagement-bait
- "Comment YES" — engagement-bait
- "Save this if…" — passive-aggressive

## Caption structure templates

### Template 1 — Text-led (carousel, single image, LinkedIn, feed)

```
[Hook line — front-loaded, hits the platform first-line cutoff]

[Body — 2-4 short paragraphs. White space matters. Each paragraph
one idea.]

[Takeaway / payoff — what they walk away with]

[CTA — one of the library above]

[hashtags — per BRAND CONFIG sets, per-platform cap]
```

### Template 2 — Video caption (caption sits below video — Reels, TikTok, Shorts)

The video carries the hook. Caption is context + CTA.

```
[1-2 sentences expanding the video's point — NOT a re-explanation]

[1 line: where to go next — link in bio / DM keyword / save]

[hashtags]
```

### Template 3 — LinkedIn long-form

```
[Hook — 1-2 lines. NO URL. Front-loaded.]

[Body — 4-6 short paragraphs. 1-3 sentences each. White space
between. Stories outperform listicles 3:1 on LinkedIn.]

[Specific takeaway or question to the reader — drives comments]

[Optional sign-off]

[#tag1 #tag2 #tag3]  ← max 3
```

**Drop the URL in the first comment, not in the post body.**
LinkedIn dampens posts with first-line URLs.

### Template 4 — Twitter / X thread

```
1/  [Hook tweet — complete-feeling on its own, punchy]

2/  [Beat 2 — one specific point, ≤220 chars]

3/  [Beat 3 — one specific point]

4-7/ [Continue 1 idea per tweet]

[Closer tweet — payoff + CTA, link to long-form / book a call]
```

### Template 5 — YouTube description

```
[First 150 chars — visible above "show more". Front-load.]

[Second paragraph — value teaser, what they'll learn]

Timestamps:
0:00 – Intro
0:45 – [Topic 1]
2:30 – [Topic 2]
…

Resources mentioned:
- [URL]
- [URL]

About this channel:
[2 sentences]

#tag1 #tag2 #tag3
```

### Template 6 — Pinterest

```
Pin title (100 chars max): [keyword + secondary keyword + hook]
  Example: "3-step running drill for shin splints (physio-approved)"

Pin description (500 chars):
[Lead with the search keyword. Pinterest is a search engine.]
[Body — 2-3 sentences of why this works.]
[CTA — what they'll find when they click through.]
```

## Per-region spelling + disclosure

Pull from `knowledge/regional-reference.md`.

### AU / NZ
- Spelling: `-ise` (organise, realise), `colour`, `centre`,
  `behaviour`, `programme` (programme TV; program software)
- Disclosure (if paid/gifted): `#ad` in first 80 chars (AANA + ASA NZ)
- Vocab OK: arvo, brekkie, mate (if voice allows), no worries, heaps,
  cheers
- Calendar: Anzac Day (Apr 25 — solemn, no commercial), Australia Day
  (Jan 26 — divisive, skip or tread carefully), Matariki (NZ — June,
  Māori New Year), EOFY (June 30 — sale period)

### UK
- Spelling: `-ise`, `colour`, `centre`, `behaviour`, `programme`
- Disclosure: `#ad` or `#gifted` in first 80 chars (ASA + CAP)
- Vocab OK: cheers, brilliant, sorted, gutted, knackered, mate
- Calendar: Remembrance Day (Nov 11 — solemn), Bonfire Night
  (Nov 5), Christmas, Boxing Day, Mother's Day (March/April — not
  May like US), Halloween (huge commercial), Pride Month (June)

### US
- Spelling: `-ize` (organize), `color`, `center`, `behavior`,
  `program`
- Disclosure: `#ad` in first 80 chars (FTC); first 3 sec of video
  must include verbal or text disclosure
- Vocab varies regionally (y'all, dude, hella) — use if brand voice
  allows
- Calendar: Memorial Day (last Mon May — solemn-ish), Independence
  Day (Jul 4), Labor Day (first Mon Sept), Thanksgiving (4th Thurs
  Nov), Black Friday + Cyber Monday (largest sale events of year),
  Mother's Day (May), Father's Day (June), Halloween, Super Bowl

### CA
- Spelling: mixed (`-ize` + `colour` common) — match house style
- Disclosure: `#ad` + French equivalent (`#publicité`) for Quebec
  audiences
- Calendar: Canada Day (Jul 1), Thanksgiving (2nd Mon Oct — note:
  earlier than US), Truth & Reconciliation Day (Sep 30 — solemn),
  Remembrance Day (Nov 11 — solemn), Saint-Jean-Baptiste (Jun 24 —
  important in QC), Boxing Day, Victoria Day
- French content for Quebec: French equal or larger than English
  (OQLF Law 25); use proper tutoiement/vouvoiement per brand voice

## Output — one block per slot

For each slot:

```
SLOT — <day, time, platform, format, pillar>
Hook:        <picked hook from 04>
Visual:      <reference to production brief from 05>

CAPTION:
<full caption respecting platform rules>

CTA:         <one of the library>
Hashtags:    <stack from BRAND CONFIG — choose set that fits this
              pillar; per-platform cap respected>
First-comment (LinkedIn only): <if applicable — the URL to drop in
                                comment 1 to avoid algo penalty>
Disclosure flag: <none | #ad | #gifted | #publicité>
Notes:       <anything the user needs to know — eg. "respect Anzac
              Day timing — don't schedule for Apr 25">
```

## Hard rules — auto-rewrite if violated

- **Banned words** from BRAND CONFIG → silent rewrite, never present
- **Engagement bait** ("STOP scrolling", "Comment YES", "Tag a friend
  who needs this", "Double tap if", "Save this if", "Swipe up if",
  "You won't believe") → rewrite into honest CTA
- **Truncation** — Instagram front line must hold up before "...more"
- **LinkedIn first-line link** — NEVER put a URL in the first line.
  Drop in first comment instead.
- **Hashtag cap** per platform — don't exceed (IG 10 max practical,
  LinkedIn 3, X 0-1)
- **Brand voice** — voice 2-3 words from BRAND CONFIG. If a caption
  reads off-voice (clinical brand sounding casual; tradie brand
  sounding corporate), rewrite.
- **Regional spelling** — wrong region's spelling = silent rewrite
- **Disclosure** — `#ad` / `#gifted` / `#publicité` upfront when
  brand has paid/gifted relationship. Missing disclosure = HARD STOP
  before the gate.
- **Substantiation** — "best", "first", "only", "guaranteed", "fastest"
  must be defensible per ACCC / ASA / FTC / Competition Bureau /
  AANA. If not defensible, rewrite.
- **No corporate slop** — synergise, leverage, unpack, deep dive,
  circle back, thought leadership, ecosystem (unless literal), all
  banned in user-facing copy.
- **Regulated category** — TGA / FDA / FCA / SEC / HFSS rules
  applied; agent flags any caption that crosses into regulated
  territory.

## Per-niche caption patterns

### Allied health / clinical

Calm, clinical, specific. No exclamation marks. No "amazing!" or
"incredible!". Reference evidence where possible.

```
Heel pain at km 3 is usually not the shoes. Three-quarter
length the cause is a weak hip — specifically glute medius. Here's
the 3-step screen we run, plus what we do if the screen comes back
positive.

Save this for the next time someone asks about heel pain.

[hashtags]
```

### B2B SaaS / agency

Numbers, frameworks, specifics. Comma-free for X/Threads but normal
punctuation elsewhere.

```
We doubled reply rate on cold email in 6 weeks.

Two changes:
1. We cut the subject line to under 40 chars
2. We A/B'd the first sentence and dropped any with the word "I"

Reply rate went from 4.2% to 9.1%. Pipeline grew accordingly.

Full breakdown of what we tested in the link in comments.

[hashtags]
```

### Hospitality

Sensory, specific, photo-led.

```
The pistachio loaf is back. Five-day cold ferment, brown butter top.

We made twelve. They'll be gone by 2.

Open till 3pm Sat. [Address].

[hashtags]
```

### Solo creator / coach

Personal, conversational, contrarian.

```
I cancelled my $497 cohort last week.

Two people signed up. I refunded both. Here's what I'd do
differently if I ran a launch again — and why I think most coaches
should run fewer launches with more direct outreach.

[Full breakdown in the carousel.]

[hashtags]
```

### Trades

Plain, direct, helpful.

```
Burst flexi hose under the sink this morning. Pre-2010 rubber.

If your house was built or refurbed pre-2015, check yours. They
last ~10 years. New stainless braided ones are $15 and last 10×
longer.

Burst flexis are the #1 cause of internal water damage. Worth a
five-minute check.

[hashtags]
```

## Confirm + handoff

> *"Captions written. One per slot with hashtags + CTAs. Want me to
> tweak any, or move to the video scripts?"*

## Done condition

- Every slot has a full native caption
- Hashtags chosen from BRAND CONFIG sets (per-platform cap respected)
- Regional spelling + disclosure applied
- User confirmed or asked for tweaks

When done, say:

> *"Captions done. Next: video scripts for Reel/TikTok/Shorts slots,
> then hashtag stacks per slot, then the pre-publish gate."*

Then load `07-write-video-scripts.md` (skip if no video slots).
