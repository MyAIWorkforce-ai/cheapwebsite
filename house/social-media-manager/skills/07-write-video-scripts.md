---
name: social-write-video-scripts
description: Write short-form video scripts for Reels, TikTok, YouTube Shorts (15-30 sec / 30-60 sec / 60-90 sec / 1-3 min) and long-form YouTube (5-15 min). Structure library — hook-payoff, listicle, talking-head, story arc, demo, before-after, day-in-the-life, reaction. Pacing notes, on-screen text cues, B-roll list, CTA.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Video scripts — Reels / TikTok / Shorts / long-form YouTube

## Your job

For every video slot with a picked hook, write a full script with:

- The opening hook (first 1-2 seconds)
- The body (scene beats or talking-head paragraphs)
- The CTA close
- On-screen text cues
- B-roll list (what to cut to)
- Pacing notes (when to cut, when to hold)
- Sound bed / audio direction

## Duration target by format

Pull from `knowledge/platform-spec-sheet.md`:

| Format | Sweet spot | Cap |
|---|---|---|
| Instagram Reels | 7-22 sec (best reach) / 22-60 sec (still good) | 3 min |
| TikTok | 15-60 sec | 10 min |
| YouTube Shorts | 30-60 sec | 60 sec (90 sec coming) |
| YouTube long-form | 8-15 min for tutorials / 6-10 for opinion | 12 hrs |
| LinkedIn native video | 30-90 sec | 10 min |
| Facebook Reels | 30-60 sec | 90 sec |
| X video | 30-60 sec (free), longer on Premium | 2 min 20 sec free |

## Short-form script structure library

Eight structures cover ~95% of weekly slots. Pick the one that fits
the hook + pillar.

### Structure 1 — Hook → Payoff (single beat)

Best for: "Aha" moments, one-tip videos, demos.

```
[0-1s]   HOOK on screen + voiceover
[1-7s]   Build / setup / context
[7-12s]  Payoff / answer
[12-15s] CTA
```

Used for: contrarian hooks, mistake-callouts, question hooks where the
answer is short.

### Structure 2 — Listicle (3-5 beats)

Best for: "3 things…", "5 mistakes…", before-vs-after stacks.

```
[0-1s]   HOOK + first beat tease
[1-4s]   Beat 1
[4-7s]   Beat 2
[7-10s]  Beat 3
[10-15s] Payoff (best beat last) + CTA
```

Used for: specific-number hooks, list hooks.

### Structure 3 — Talking head (direct address)

Best for: opinions, hot takes, founder POV, explainers.

```
[0-2s]   HOOK delivered direct-to-camera
[2-25s]  Argument / story / explanation in 2-3 short paragraphs
[25-30s] CTA + handoff
```

Used for: founder pillar, hot takes, personal story hooks.

### Structure 4 — Story arc (setup → tension → resolution)

Best for: case studies, personal stories, transformation.

```
[0-1s]   HOOK on the setup (the "before")
[1-4s]   Setup — what was the situation
[4-12s]  Tension — what broke / what was hard / the obstacle
[12-20s] Resolution — what worked
[20-25s] Lesson + CTA
```

Used for: case study pillar, behind-the-scenes pillar, personal story
hooks.

### Structure 5 — Demo (show, don't tell)

Best for: physical products, drills, recipes, techniques.

```
[0-1s]   HOOK — "Here's the thing I'll show you"
[1-4s]   What you'll need / setup
[4-15s]  The demo — visual, step-by-step
[15-20s] Result + tip + CTA
```

Used for: educate pillar, product brand demos, drill demos.

### Structure 6 — Before / after

Best for: transformation pillar, case study with visuals.

```
[0-1s]   HOOK + before frame
[1-3s]   Hold on before — let viewer absorb
[3-8s]   The work (timelapse, montage, key reps)
[8-15s]  After reveal — clean cut, hold
[15-20s] How long / what changed / CTA
```

Used for: case study, transformation, build-in-public.

### Structure 7 — Day-in-the-life

Best for: behind-the-scenes pillar, founder pillar.

```
[0-1s]   HOOK — "What a day looks like as a [role]"
[1-6s]   Morning beat
[6-12s]  Mid-day beat
[12-18s] Afternoon beat
[18-25s] Evening / reflection
[25-30s] CTA — "Want more of these? [Where to follow]"
```

Used for: behind-the-scenes, founder POV, "show the work" content.

### Structure 8 — Reaction / commentary

Best for: hot take pillar, trend response.

```
[0-1s]   HOOK — "I'm watching [X] and have thoughts"
[1-3s]   Setup the thing being reacted to
[3-15s]  Reaction + commentary (split screen often works here)
[15-20s] Conclusion + CTA
```

Used for: hot take, trend response. Permission and fair-use rules
apply.

## Long-form YouTube structure

For 5-15 min video.

```
[0:00 – 0:15]   HOOK — first 15 seconds carry the whole video
                  - Tease the payoff
                  - Show the most compelling shot
                  - Promise what they'll get

[0:15 – 0:45]   INTRO — who you are, why this video, what's coming
                  - One sentence about you
                  - Tease the 3-5 things in the video
                  - "Stick around" close

[0:45 – 8:00]   BODY — the actual content
                  - Chapter 1, 2, 3, 4, 5
                  - Cut every 3-8 sec to maintain pacing
                  - B-roll over every dialogue beat
                  - Each chapter has its own mini-hook

[8:00 – 10:00]  PAYOFF + recap
                  - The "so what" of the whole thing
                  - Quick recap of the 3-5 chapters
                  - Next-step CTA

[10:00 – 10:30] OUTRO + end screen
                  - Two-video end screen card
                  - Subscribe ask (only if voice allows)
                  - "Watch next" card
```

## Output — one script per slot (short-form)

```
VIDEO SCRIPT — <day, platform, slot, pillar>
Hook:           <picked hook from 04>
Structure:      <Hook-Payoff / Listicle / Talking-head / Story arc /
                 Demo / Before-after / Day-in-life / Reaction>
Duration:       <target seconds>
Aspect ratio:   9:16
Caption file:   <link to caption from 06>
Visual brief:   <link to production brief from 05>

SCRIPT:
[0-1s]
  ON-SCREEN:   "<hook text large + bold>"
  VO/A:        "<voiceover line>"
  CAMERA:      <static / push-in / overhead>
  SHOT:        <wide / medium / close>

[1-4s]
  ON-SCREEN:   "<small subtitle>"
  VO/A:        "<voiceover line>"
  B-ROLL:      <what to cut to>
  CAMERA:      <move>

[continue per beat — listed by time range]

[final 3s]
  ON-SCREEN:   "<CTA — short>"
  VO/A:        "<spoken CTA>"
  END-CARD:    <branded card — handle + main link>

EDITING NOTES
- Cut on every voice beat (every 2-3 sec max for TikTok / 1-2 sec
  fastest)
- Captions burned in (use CapCut auto-caption + manual proof — don't
  rely on platform auto-captions)
- First frame = hook held for 1 sec for algorithm thumbnail
- Sound: <native trending audio if it doesn't fight VO / brand
  music / silent>
- Music ducks under VO (-12 dB during dialogue, -6 dB elsewhere)
- LUFS: -14 to -16 for social
- Export 1080×1920 MP4 H.264 30 fps
```

## Output — one script per slot (long-form YouTube)

```
LONG-FORM VIDEO SCRIPT — <slot, pillar>
Title:          <60-char hook for thumbnail>
Hook line:      <first line of voiceover>
Duration:       <target minutes>
Aspect:         16:9

THUMBNAIL CONCEPT
  Face:          <yes / no>
  Big text:      <3-5 words max>
  Visual:        <description>

OPEN (0:00 – 0:45)
  [Hook line — strongest visual + verbal hit]
  [Intro — who, what, why]

CHAPTER 1 — <chapter title> (0:45 – 2:30)
  Mini-hook:    <opens the chapter>
  Beats:
    - <beat 1>
    - <beat 2>
    - <beat 3>
  Visuals:      <b-roll list>
  Closes with:  <transition into chapter 2>

CHAPTER 2 — ...
...

PAYOFF (8:00 – 10:00)
  Recap:        <quick 3-point recap>
  CTA:          <where to go next>

OUTRO (10:00 – 10:30)
  End-screen:   <2-video card + subscribe>

CHAPTER TIMESTAMPS (for description)
0:00 – Hook
0:45 – Intro
2:30 – Chapter 2
...

PRODUCTION NOTES
  Setup:        <camera, lens, lighting, audio>
  B-roll list:  <list of supplementary shots needed>
  Music:        <licensed track / brand bed>
```

## Hard rules

- **Hook in second 0-1.** If your hook arrives at second 4, scroll.
- **Captions burned in.** ~80% of short-form is watched on mute.
- **Cut every 2-3 sec on TikTok, 2-4 sec on Reels.** Static = thumb-
  stop killer. Long-form can hold longer (3-8 sec) with engaging
  motion or B-roll.
- **Aspect 9:16** unless the slot is explicitly LinkedIn long-form
  or YouTube long-form.
- **End on a CTA that fits the BRAND CONFIG primary CTA** — don't
  send TikTok viewers to a LinkedIn link unless it's the main CTA.
- **No fake urgency.** "Last chance!" "ONLY today!" not allowed
  unless literally true. Same for "limited spots" without a real cap.
- **No engagement bait on-screen** — same banned list as captions.
- **Music license** — use platform-native audio for organic posts;
  licensed music for paid posts (Epidemic Sound, Artlist, Musicbed,
  Soundstripe, or your own brand music).
- **Voice match** — TalkingHead scripts must read in the brand voice
  when spoken aloud, not just on the page.
- **Regional language + disclosure** — same rules as captions. If
  the post is paid/gifted, on-screen `#ad` disclosure within first
  3 sec of video (US FTC; AU/UK also require upfront).

## Per-platform tweaks

| Platform | Length sweet spot | Cut cadence | First-frame text size | Sound |
|---|---|---|---|---|
| IG Reels | 7-22 sec | every 2-3s | Big, centred | Trending native audio OK |
| TikTok | 15-60 sec | every 1-2s; faster than IG | Medium, off-centre | Trending audio + voice |
| YouTube Shorts | 30-60 sec | every 2-3s | Big, top third (avoid UI overlay) | Native or brand music |
| LinkedIn vid | 30-90 sec | every 3-5s | Big, captioned | Mostly silent + voice (autoplay muted) |
| FB Reels | 30-60 sec | every 2-3s | Big, centred | Same as IG Reels |
| YouTube long | 8-15 min | 3-8 sec | Used sparingly | Licensed music bed + voice |

## Pacing checklist

- **Sec 0-1:** Hook delivered. If hook isn't there yet, re-cut.
- **Sec 1-3:** Promise — what's the viewer about to get?
- **Every 2-3 sec:** New shot, new B-roll, new line. Static = drop-off.
- **Final 3 sec:** CTA + end-card. Cleanly resolved.

## Anti-patterns (auto-rewrite)

- Hook arriving after second 2 → re-cut to lead with hook
- 4+ second static shot → re-cut with B-roll or motion
- "Wait for it…" framing → cut, give the payoff faster
- Engagement-bait CTA ("Comment YES" / "Tag a friend") → rewrite
- Missing burned-in captions → reject; rewrite production brief to
  include caption pass
- "Like and subscribe" sign-off → rewrite to specific CTA
- End-card runs 5+ seconds → cut to 1-2 sec
- VO over-explains visual ("here you can see I'm holding a hammer"
  while holding a hammer) → cut VO
- Trending audio that fights the VO → mute the trending and use
  brand bed under VO

## Confirm + handoff

Present scripts together. Ask:

> *"Scripts done. Want any tightened, restructured, or moved to a
> different structure? Otherwise next is hashtag stacks per slot,
> then the pre-publish gate."*

## Done condition

- Every video slot has a script with hook, body, CTA, pacing notes,
  B-roll list, audio direction
- User confirmed or asked for tweaks

When done, say:

> *"Scripts ready. Next: hashtag stacks per slot."*

Then load `08-hashtag-stacks.md`.

## When the user wants to test a new structure

If the user says "let's try a day-in-the-life this week" or "haven't
done a story arc, want to test one", log it as an open experiment in
`learnings.md` and tag the script:

> *"Open experiment: testing 'story arc' structure for case study
> pillar this week. Will be scored against pillar average at end of
> week."*

`12-weekly-learnings.md` closes the experiment Friday.
