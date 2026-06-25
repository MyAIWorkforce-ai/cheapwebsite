---
name: social-ideate-hooks
description: Generate hooks in batches for this week's calendar slots. Score each against learnings.md (what worked, what flopped) and the brand's banned-words list. Present 3 candidate hooks per slot; user picks. Hook frameworks library covers contrarian, specific-number, mistake callout, question, personal story, result + skepticism, transformation, future-pace, list, identity.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Ideate — hooks for this week's slots

## Your job

For each slot in this week's calendar, generate **3 candidate hooks**.
Read `learnings.md` first; rank candidates against what landed before.
Filter out anything that breaks BRAND CONFIG's banned-words list.
Present all options; user picks.

## What "hook" means

The first 1-2 lines of a post. On Reels/TikTok/Shorts, the first 1-2
seconds of audio/text. On a thumbnail, the title + image.

The hook decides whether the rest of the post gets read or watched.
**80% of the work, 100% of the time.** A great post with a weak hook
flops; a mid post with a great hook hits.

## The hook framework library

The agent's working library. Use these patterns to generate. Mix
across the week (don't run "contrarian" hooks four days in a row —
audience fatigues).

### 1. Contrarian

Take a widely-held belief and call it wrong. Specific, not vague.

- *"Stretching before a run won't fix your shin splints."*
- *"Most onboarding emails actively hurt activation."*
- *"Your bookkeeper is overcharging if they're billing hourly."*

When to use: hot-take pillar, demystify pillar, founder POV pillar.

When NOT to use: when the brand's voice is "calm + clinical" — too
combative.

### 2. Specific number

Replace "tips" with an exact count. Replace "things" with a category.

- *"Three drills I'd do before I'd ever buy new shoes."*
- *"Two CRM fields that doubled our reply rate."*
- *"Four bathroom fittings I'd never put back in my own house."*

When to use: educate pillar, listicle Reels, carousels.

When NOT to use: when the post can't actually deliver the count
honestly. Don't promise 5 things and ship 3.

### 3. Mistake callout

Name the mistake the audience is making.

- *"If your knee hurts at mile 3, this is usually why."*
- *"If your LinkedIn posts get views but no comments, this is why."*
- *"If your tomatoes split every January, you're watering wrong."*

When to use: educate, demystify pillars.

When NOT to use: when it reads condescending. Voice check before
shipping.

### 4. Question

Genuine, specific, not rhetorical.

- *"Why do runners who 'do strength' still get injured?"*
- *"What does it cost a B2B agency to lose a 12-month retainer?"*
- *"Why do most newsletters die at 1,000 subscribers?"*

When to use: any pillar; especially good for LinkedIn (LinkedIn algo
rewards questions that get answered in comments).

When NOT to use: if the answer is obvious — reads like wasted
attention.

### 5. Personal story

The "I" hook. Vulnerability + specificity.

- *"I cracked a rib because I ignored this for 6 months."*
- *"My first agency client fired us in week three. Here's what I do
  different now."*
- *"I lost $4k on Black Friday ads. Twice. Here's the fix."*

When to use: founder pillar, behind-the-scenes pillar, hot take.

When NOT to use: if the brand is a Company Page rather than a person.
Translate to "the team" or skip.

### 6. Result + skepticism

Frame a real result with a critical lens — earns trust.

- *"She PB'd 5km in 6 weeks. Here's what actually changed (and what
  didn't)."*
- *"They 3×'d MRR in a quarter. Most of it wasn't marketing."*

When to use: case study pillar.

When NOT to use: without permission from the named client.

### 7. Transformation / before-after

Hook on the gap between the two states.

- *"From limping at km 8 to running a 3:45 marathon — 9 months."*
- *"Same business. 3× the bookings. One scheduling change."*

When to use: case study pillar, before/after content.

When NOT to use: in regulated categories (cosmetic medicine, health,
weight loss) without TGA/FDA-compliant disclaimers — agent flags
and adds the right disclaimer.

### 8. Future pace

Show the listener their future state.

- *"In 6 months you'll either be running pain-free or paying for a
  new MRI. The drills below are the cheaper option."*
- *"In a year, your inbox will either be on fire or you'll have a
  system. Here's the system."*

When to use: leads pillar, conversion pillar.

When NOT to use: if it reads as fear-mongering. Voice check.

### 9. List / structural

The audience knows exactly what they're getting.

- *"5 things I check before booking a long run."*
- *"3 LinkedIn formats I'd start with if I were starting today."*

When to use: educate, listicle Reels, carousels.

When NOT to use: too often — entire feed of lists reads transactional.

### 10. Identity

Hook on who the listener is or wants to be.

- *"You're not a 'beginner runner' anymore. Here's what changes at
  10km/week."*
- *"You're past the side-project phase. Three things that change
  when you go full-time."*

When to use: identity / community pillar.

When NOT to use: when the identity claim is presumptuous. Test it
against ICP.

### 11. Behind-the-curtain

What the audience doesn't normally see.

- *"Here's the exact pricing sheet I send to new clients."*
- *"Inside our Friday review — what we cut from this week's content
  plan and why."*

When to use: behind-the-scenes pillar.

When NOT to use: when "behind the curtain" is just a meeting nobody
cares about.

### 12. Pattern interrupt

Open with something the algorithm hasn't seen 1,000 times today.

- *"Filming this from the back of a burst-pipe job at 11pm."*
- *"This invoice cost me a client. Here's why I'd send it again."*

When to use: pattern-fatigued surfaces (TikTok especially).

When NOT to use: as substitute for substance. Pattern interrupt + no
payoff = unfollow.

## Banned hook framework

**Engagement-bait.** No *"STOP scrolling"*, no *"Comment YES if you
agree"*, no fake-urgency, no *"You won't believe what happened
next"*. The agent rewrites any of these silently.

Also banned:

- **Clickbait without payoff** — "The truth about [common thing]" then
  no truth in the post
- **Fake mystery** — "Wait for it…" with nothing happening
- **Borrowed cred** — "MIT scientists discovered…" with no source
- **Manufactured emergency** — "Last chance!" when nothing ends

## Reading learnings.md before drafting

Open `learnings.md`. For this week's slots, note:

- **Frameworks in the "Hooks that landed" list** — bias drafts toward
  these for matching pillars
- **Frameworks in the "Hooks that flopped" list** — avoid these
  unless the brand explicitly wants to retry
- **Banned, refined** — never resurrect these phrases
- **Open experiments** — if there's a hook framework being tested,
  draft one of this week's slots in that framework

If `learnings.md` has < 4 weeks of data, treat as exploratory — draft
across frameworks evenly to learn what hits.

## Per-platform hook length

| Platform | Max hook chars | Hold time |
|---|---|---|
| Instagram feed | 80-125 chars (front of caption) | Holds until "...more" tap |
| Instagram Reels | 6-8 words on-screen + 1 sec voiceover | First frame visible |
| TikTok | 4-6 words on-screen + 1-2 sec | First frame |
| LinkedIn | 100-140 chars before "see more" | Holds in feed |
| YouTube title | 60 chars visible | Combined with thumbnail |
| YouTube Shorts | 4-6 words on-screen + 2 sec | First frame |
| X / Threads | 280 chars (the tweet IS the hook) | – |
| Facebook | 60-80 chars | Holds in feed |
| Pinterest | 100 chars (keyword-led, not hook) | Search surface |

The agent generates per-platform-appropriate lengths.

## Output — one block per slot

For each calendar slot this week, render:

```
SLOT — <day, time, platform, format, pillar>

Hook A: <hook text>
        Framework:       <which one from the library>
        Format fit:      <why it suits the format>
        Learnings note:  <e.g. "Contrarian hooks averaged +12% reach
                          last 4 weeks for this pillar">
        Risk:            <any voice / regional / compliance flag>

Hook B: <hook text>
        Framework:       <which one>
        ...

Hook C: <hook text>
        Framework:       <which one>
        ...

→ My pick: <A / B / C> because <one line>
```

Always give a pick — but make it clear it's a recommendation, not the
final answer. User can override.

## Hard rules

- **Read `learnings.md` first.** Bias toward frameworks in the
  "landed" list; avoid ones in the "flopped" list.
- **Respect BRAND CONFIG banned words / topics / phrases.** Silent
  rewrite.
- **Don't repeat a hook framework more than twice** in one week's slate.
- **Per-platform length cap** — each hook fits its platform's first-
  line / first-frame budget.
- **No engagement-bait phrases** — auto-rewrite.
- **Regional spelling.** AU/NZ/UK = `-ise`, `colour`. US = `-ize`,
  `color`. CA = mixed (default to client's house style).
- **No unsubstantiated claims** — "best", "first", "only", "guaranteed"
  must be defensible.

## Confirm + handoff

> *"Three hooks per slot, scored against your learnings. Pick A/B/C
> for each, or say 'rewrite slot X' and I'll draft three new ones.
> Once picked, I write the full captions, then video scripts, then
> hashtag stacks."*

Save picked hooks in context.

## Done condition

- Every slot in this week's calendar has a picked hook
- User confirmed all picks
- Picks logged for `12-weekly-learnings.md` to score later

When done, say:

> *"Hooks picked. Next: production briefs for the visual assets, then
> full captions for text/carousel slots, video scripts for Reel/
> TikTok/Shorts slots, hashtag stacks per platform."*

Then load `05-production-briefs.md`.

## When the user wants to test a new framework

If the user says "I want to try a new framework this week" or
"Generate 3 hot takes for me to choose from", add an open experiment
to `learnings.md`:

```
Open experiment: Testing "Hot take" hook framework this week
  Definition of done: 3 hot takes posted, scored against pillar average
  Hypothesis: <what we expect>
```

`12-weekly-learnings.md` closes the experiment at end of week.
