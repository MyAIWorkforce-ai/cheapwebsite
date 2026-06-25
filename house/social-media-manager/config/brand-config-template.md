# Brand config

Fill this in once. Every later skill reads from it. Re-edit anytime
the brand evolves — new platform, new region, new pillar, new voice.

```
BRAND CONFIG
============
Business:        <one sentence describing what you do>
Industry:        <e.g. hospitality, allied health, B2B SaaS,
                  D2C ecom, agency, solopreneur>
Locale:          <city, country — affects spelling, regulators,
                  calendar, working-hours windows>
Region:          <AU | NZ | UK | US | CA>
Sub-region:      <state / province for regulators where it matters —
                  e.g. NSW, Ontario, California, Quebec>
Timezone:        <e.g. Australia/Sydney, Europe/London,
                  America/New_York, America/Toronto>
Languages:       <English | English + French (Quebec) | English + ...>

Audience:        <who you serve, age band, what they want,
                  what they don't want>
ICP (one line):  <your single ideal customer described in one sentence
                  — e.g. "Sydney women 28-42 prepping for a half-
                  marathon who don't want a coach but want structure">

Primary CTA:     <book / buy / subscribe / apply / visit / DM>
Secondary CTA:   <save for later / share with a friend / comment a
                  question>
North star:      <one-sentence "what we're known for online" — the
                  filter every post idea passes>

Voice (2-3 words):  <e.g. "calm + clinical", "tradie no-nonsense",
                     "warm expert", "irreverent + sharp",
                     "premium quiet">
Voice examples:     <paste 3-5 sentences from your existing copy
                     that nail the voice — the agent reads these
                     for tonal calibration>

Content pillars (3-5):
  1.  <Pillar topic — angle — format slots>
      <One-line statement of the pillar's intent>
      Best formats:    <Reels / carousel / single-image / talking-
                        head / text-post / long-form YouTube>
      Best platforms:  <which platforms this pillar lives on>
      Audience reason: <why a follower would follow you for this>

  2.  ...
  3.  ...
  4.  ...
  5.  ...

Platforms active:    <Instagram, TikTok, LinkedIn, YouTube, Facebook,
                       X/Twitter, Threads, Pinterest, Snapchat,
                       Reddit, Discord>
Primary platform:    <the one we'd keep if we could only keep one>
Posting cadence:     <e.g. IG: 4/week, TikTok: daily, LinkedIn: 3/week,
                       YouTube: 1 long-form + 3 Shorts/week,
                       X: 5+/day, Pinterest: 10 pins/week>

Peak windows:        <best times to post, per platform — fill from
                      your analytics or use defaults from
                      knowledge/regional-reference.md>
  Instagram (feed):  <e.g. Tue 7-9pm, Thu 7-9pm, Sat 10am-12pm>
  Instagram (Reels): <e.g. daily 7-10am + 7-10pm>
  TikTok:            <daily 6-10pm>
  LinkedIn:          <Tue-Thu 7-9am, 12-1pm>
  YouTube long:      <weekend mid-afternoon>
  YouTube Shorts:    <daily 3-7pm>
  Facebook:          <Wed-Fri 1-4pm>
  X / Threads:       <weekdays 7-9am, 5-7pm>
  Pinterest:         <evenings 8-11pm, weekends>

Hashtag sets:
  Pillar 1:        #tag1 #tag2 #tag3 ...
  Pillar 2:        ...
  Pillar 3:        ...
  Brand:           #yourbrandhandle (always include this in every stack)
  Locale niche:    #yourcityservice (e.g. #brisbanecafes, #londonpilates)
  Community:       #communitytags
  Discovery:       #broaderdiscoverytags

Banned words/topics:  <words you'd never use; competitor names;
                       sensitive topics; off-brand; corporate slop —
                       e.g. "synergise, leverage, unpack, deep dive,
                       circle back, thought leadership, ecosystem">

Banned phrases (engagement-bait — always rewrite):
                      "STOP scrolling", "comment YES if you agree",
                      "tag a friend who needs this", "double tap if",
                      "save this if", "follow for more", "swipe up if",
                      "you won't believe", "this changes everything",
                      "the truth about", "what they don't want you
                      to know"

Hard "no" formats:   <e.g. no lip-sync trends, no political memes,
                       no engagement-bait hooks, no shirtless gym
                       content (for clinical brand)>

Disclosure rules (per region):
  AU/NZ:           #ad upfront in first 80 chars (AANA + ASA NZ)
  UK:              #ad / #gifted upfront in first 80 chars (ASA + CAP)
  US:              #ad upfront in first 80 chars (FTC); first-frame
                   disclosure on video within 3 sec
  CA:              #ad upfront; French equivalent #publicité for
                   Quebec audiences

Regulated category? (tick all that apply):
  [ ] Health / wellness / supplements    (TGA in AU, FDA in US,
                                          ASA stricter rules in UK)
  [ ] Financial / investing / crypto     (FCA in UK, SEC in US)
  [ ] Alcohol                            (state-by-state US,
                                          AANA alcohol code in AU)
  [ ] Gambling
  [ ] Children / under-13                (COPPA in US, GDPR-K in UK,
                                          AAP in AU)
  [ ] Food (HFSS in UK)
  [ ] Cosmetic / aesthetic medicine      (TGA in AU)

Links:
  Main link in bio:  <URL — Linktree, Beacons, Stan Store, or direct>
  Lead magnet:       <URL>
  Booking page:      <URL>
  Newsletter:        <URL>
  Shop:              <URL>
  UTM convention:    <e.g. utm_source=ig, utm_medium=social,
                       utm_campaign=<slot-label>>

Production tools available:
  Image (AI):      <Nano Banana / Midjourney / DALL-E / Stable Diffusion
                    / Adobe Firefly / Canva AI / none>
  Image (manual):  <camera roll / Canva / Figma / Adobe Express>
  Video (AI):      <Higgsfield / Sora / Runway / Veo / Pika / none>
  Video (manual):  <iPhone 15 Pro / Sony ZV-E10 / Sony A7C / DSLR /
                    other>
  Editing:         <CapCut / Adobe Premiere Pro / DaVinci Resolve /
                    InShot / VEED / Descript / Final Cut>
  Talking head:    <HeyGen / Synthesia / on-camera yourself /
                    someone else>
  Voice:           <ElevenLabs / your voice / hired VO>
  Lighting:        <Aputure / Godox / natural / ring light>
  Mics:            <Rode SmartLav / Rode Wireless Go II / iPhone
                    onboard / boom>

Publishing tool:    <Buffer / Hootsuite / Later / Sprout Social /
                      Sked Social / Pallyy / Publer / SocialBee /
                      Ayrshare / Postiz / n8n / Meta Business Suite /
                      TikTok Business Suite / native copy-paste / manual>
Approval channel:   <Telegram chat / Slack / email / none — your call>
  Bot token:         <stored in secrets, NOT in this file>
  Chat ID:           <number>
  Approvers:         <@user1, @user2 — list anyone whose ✅ unlocks
                       schedule>

Goal this quarter:
  Awareness:    <target follower count, target avg reach>
  Engagement:  <target saves, shares, comments per post>
  Leads:        <target link clicks, sign-ups, DMs>
  Conversions:  <target bookings, purchases, demos booked>

Brand assets:
  Logo (PNG):       <URL or path>
  Logo (SVG):       <URL or path>
  Colour palette:   <hex codes — primary / secondary / accent / neutral>
  Type stack:       <heading font / body font>
  Reference posts:  <3-5 URLs of your best posts the agent can pattern-
                      match against>
  Brand reference:  <URLs of 3-5 competitor / aspirational accounts —
                      the agent learns voice + format from these, NOT
                      copies>
```

## Fill rules

- **One sentence per field.** If it's running long, you're including
  too much. Cut to the spine.
- **Be honest about cadence.** Three posts a week sustained beats
  seven posts a week for two weeks then nothing.
- **Be honest about audience.** "Women 25-65 who like coffee" is not
  an audience. "Sydney women 28-42 who run 5km+ weekly and want a
  smarter coffee routine" is.
- **Banned words matter.** This is what stops the agent from sounding
  generic. Include words you genuinely hate to read. The default list
  bans the worst corporate slop; add your specifics.
- **Disclosure is non-negotiable.** Even if you've "never done a paid
  post", fill it in. Sponsorship sneaks up on you.
- **Voice examples are the most important field.** The agent calibrates
  off these. Skip them and your captions read generic.
- **Update peak windows after 4 weeks.** Defaults are best-practice;
  your real peaks come from your account analytics. The agent updates
  them automatically in `12-weekly-learnings.md` once data exists.

## When the brand evolves

Tell the agent: *"Update brand config — change <field> to <new
value>."* The agent re-reads the file and all later outputs respect
the change.

Common updates:

- **Adding a platform** — agent re-runs `03-weekly-calendar.md` to
  rebuild the cadence including the new platform
- **Dropping a platform** — agent re-runs `03-weekly-calendar.md` to
  redistribute slots
- **New region** — agent re-reads `knowledge/regional-reference.md`
  and updates spelling, disclosure, calendar, working windows
- **New pillar** — agent re-runs `02-strategy-pillars.md` to integrate
  the new pillar into the monthly rotation
- **Voice shift** — agent re-runs the next `06-write-captions.md` pass
  against the new voice examples

## Agency setup — running multiple clients

If you're an agency running 5+ accounts, fork one `brand-config.md`
per client. Filename: `brand-config-<client-slug>.md`. The agent reads
the one matching the active client.

Tell the agent at the start of every session:
> *"Loading brand config for <Client Name>."*

The `learnings.md` for each client also stays separate —
`learnings-<client-slug>.md`. Cross-client insight (eg. "carousels
hit on all 4 wellness clients this quarter") is kept in a separate
`agency-learnings.md`.

## Sanity check before locking

Read through every field. If any reads "generic", the agent's outputs
will too. The three most-failed fields:

1. **Voice (2-3 words)** — "professional and friendly" is generic.
   "Calm + clinical" or "tradie no-nonsense" actually shape voice.
2. **ICP (one line)** — generic ICPs = generic content. Specific ICPs
   = content that converts.
3. **Banned words/topics** — without specifics, the agent will use
   defaults. With specifics, it sounds like you wrote it.

Lock when you'd be comfortable showing this config to a future hire.
