# Comment moderation guidelines

What to hide, what to pin, what to leave alone, when to report, and
when to surface to the human. Drop-in playbook for moderating comments
across Instagram, TikTok, Facebook, LinkedIn, YouTube, X, and
Pinterest.

Used by `11-engagement-replies.md` for the moderation half of triage.

---

## The four-action model

For every incoming comment, the agent picks one of:

1. **Engage** — reply, like, pin, or amplify
2. **Hide** — quietly remove from public view (most platforms have
   this; original commenter can still see their own comment)
3. **Delete** — fully remove (visible to original commenter as
   deleted)
4. **Report** — escalate to platform + block

Plus two human-only actions:

5. **Surface** — escalate to human for judgment
6. **Crisis** — multiple negative coordinated comments → trigger
   crisis-comms script

---

## Decision tree

For each comment:

```
Is it a real person engaging genuinely?
├── YES → Is it substantive (>4 words, not just emoji)?
│       ├── YES → ENGAGE (reply via 11-engagement-replies)
│       └── NO  → LIKE (acknowledgment is enough)
│
└── NO  → What kind of non-engagement?
        ├── Spam (link spam, follow-bait, ✨🔥👇 only) → HIDE
        ├── Off-topic noise → HIDE
        ├── Mild trolling / argumentative → leave (don't feed)
        ├── Personal attack / harassment → DELETE + REPORT
        ├── Threats / slurs / illegal → REPORT + BLOCK + SURFACE
        ├── Coordinated negative pile-on → CRISIS protocol
        └── Impersonation of brand → REPORT impersonation
```

---

## What to engage with

### Pin-worthy comments (top 1-3 per post)

Pin comments that:

- **Add value** ("Tried this last week — also helps to do X")
- **Ask a great question** that brings out a great answer in your
  reply
- **Validate the brand voice** ("This is exactly what I was looking
  for")
- **Set the tone** for the comment section you want

Pin sparingly — pinned comment becomes the brand's signal of what
kind of conversation it wants here.

### Reply-worthy comments

Reply to:

- Genuine questions
- Specific compliments with context ("Tried it, worked")
- Thoughtful disagreement (don't shy from disagreement that's well-
  argued — engagement spikes and brand reads confident)
- First-time commenters (especially within first 24h of a post going
  live)

Drafts come from `11-engagement-replies.md`.

### Like-only worthy

Like (but don't reply to):

- Generic emoji / one-word compliments ("🔥", "Nice", "🙌")
- Tags of a friend without context ("@friend look")
- Quick validations that don't need a reply chain

A like acknowledges; not every comment needs a written reply.

---

## What to hide

Hide (don't delete) — the original commenter can still see their
own comment, but no one else can:

### Spam

- **Link spam** ("DM me to learn how to make $5k/week")
- **Follow-baiting** ("Follow me for X", "Check my page")
- **Generic flood** (✨🔥💯👇 with no engagement value)
- **Bot replies** (auto-generated text, unrelated to post)
- **Self-promo from competitors**

### Off-topic / low-value

- Comments unrelated to the post
- Repeated previous comment (some users post the same comment on
  every post — hide after the second time)
- Brand-irrelevant tags ("@friend lol" — no context)

### Mild noise

- One-word negative ("ugh") without substance
- Trolling that's clearly not real engagement

Hiding keeps the comment section clean without escalating with the
commenter. They don't know they've been hidden.

---

## What to delete

Delete (and the commenter sees it gone):

- **Spam advertising** (someone trying to sell their thing in your
  comments)
- **Hate speech that targets a person**
- **Personal attacks on you, your team, or featured customers**
- **Misinformation that could harm** (medical, financial, legal
  misinfo on your post)
- **Doxing attempts** (sharing someone's private info)

After delete: block the user if pattern continues.

---

## What to report (and block)

Report to platform + block:

- **Threats** of physical harm (to anyone)
- **Slurs** (racial, homophobic, transphobic, ableist)
- **Sexual harassment**
- **CSAM** or any illegal content
- **Impersonation** of the brand or its people
- **Coordinated harassment** (multiple accounts piling on)
- **Spam at scale** (one account spamming multiple posts)

Each platform has its reporting flow:

| Platform | Path |
|---|---|
| Instagram | Comment → three dots → Report |
| Facebook | Same |
| TikTok | Comment → press and hold → Report |
| LinkedIn | Comment → three dots → Report |
| YouTube | Comment → three dots → Report |
| X | Comment → three dots → Report |
| Pinterest | Comment → flag |

After reporting: block to remove the user from your audience.

---

## What to surface to the human

The agent does NOT moderate alone on:

- **Legal-adjacent comments** (refund disputes, medical advice
  requests, defamation accusations)
- **Comments from journalists, regulators, or government accounts**
- **Comments from your own customers raising complaints**
- **Comments containing a person's private info**
- **Comments that may be a sign of mental-health crisis** (someone
  expressing distress in your comments)

For each: pause and surface:

> *"This comment needs your judgment. Here's the comment:
> [text]. My read: [observation]. Want me to draft a holding
> response, surface to your customer service, or wait for you to
> handle?"*

---

## What to leave alone (don't feed)

Some comments are best ignored entirely. The instinct to reply
strengthens the troll's hook.

Leave alone:

- **Mild trolling that's clearly bait** ("This is dumb" — engagement
  bait for the troll)
- **Reactionary one-liners** ("OK boomer" / "Cringe" — no engagement
  value either way)
- **Comments that argue with strawmen** (commenter is fighting an
  argument you didn't make)

Don't hide, don't reply, don't engage. Lets the comment fade
naturally.

---

## Crisis protocol

When **5+ negative comments hit one post in <1 hour**, OR a coordinated
pile-on pattern is detected (same phrasing across accounts, screenshot
sharing), trigger crisis-comms (`templates/crisis-comms-script.md`):

1. STOP engaging with individual comments
2. SURFACE to user immediately
3. PAUSE the post's promotion (if running ads)
4. ASSESS whether to:
   - Hide the post (last resort)
   - Add a brand response in comments
   - Post a separate statement
   - Wait it out (sometimes the right move)
5. DOCUMENT all comments + accounts involved
6. LOG in `learnings.md` → Algorithm notes for future reference

Don't reply to individual pile-on comments. Don't argue back. Don't
delete the post unless legally required — deleting reads as guilt
and screenshots already exist.

---

## Per-platform nuances

### Instagram

- **Hide vs Delete**: Hide keeps the commenter unaware. Delete is
  visible.
- **Restrict**: Soft-block. Their comments are only visible to them
  until you approve. Useful for ex-customers / borderline trolls.
- **Comment filter**: Settings → Hidden Words → keyword filter. Add
  brand-specific banned terms (slurs, your direct competitors,
  known troll handles).
- **Pin up to 3 comments**.

### TikTok

- **Filter**: Filter all comments → admin approves before they post.
  Useful for high-traffic / controversial brands.
- **Block hashtags / keywords** in comment filter.
- **Reply with video**: high engagement — use it on great questions.
- **Pin up to 3 comments**.

### Facebook

- **Hide vs delete**: same as Instagram.
- **Page moderation**: keyword filter in Page Settings.
- **Group moderation**: stricter; remove member + ban for repeat
  offenders.

### LinkedIn

- **Delete**: no "hide". Either it's there or it's gone.
- **Mute conversation**: removes notifications without removing
  comment.
- **Report and block** for harassment.
- **Pin one comment**.

### YouTube

- **Held for review**: configurable in Studio. Useful filter.
- **Hidden users**: per-channel ban list.
- **Comment moderators**: appoint trusted users.
- **Pin one comment per video**.

### X

- **Hide replies**: collapses but doesn't remove.
- **Block / mute**: standard escalation.
- **Filtered notifications**: lower exposure to mass-reply trolls.

### Pinterest

- Comments are rare; mostly just moderate spam.

---

## Pre-emptive comment filters (set once, save weekly)

Each platform allows keyword filters. Set these for every brand:

```
Common spam keywords to auto-filter:
- "DM me" + ("$" OR "rich" OR "secret")
- "follow back"
- "growth hack"
- "free crypto" / "Bitcoin"
- "OnlyFans" (unless that's your industry)
- "promo code" + non-affiliated brands
- Known troll usernames specific to the brand

Brand-specific filters:
- Competitor names (auto-hide so you don't see promo)
- Slurs (filter list pulled from platform default + add your own)
- Spam patterns (your brand may have specific bot phrases)
```

The agent maintains this list per brand in BRAND CONFIG.

---

## Tone for replies in moderation

When you do reply (to disagreement, criticism, or borderline negative):

- **Acknowledge, don't dismiss** ("Fair — I can see why you'd read
  it that way")
- **Stay specific** ("Here's the thinking behind…")
- **Don't argue facts in public** if it's not productive (take to
  DM)
- **Don't engage in personal exchanges**
- **Don't apologise reflexively** — if the brand is wrong, apologise;
  if it's not, hold position calmly

Banned in replies:
- Sarcasm (reads worse on screen than in person)
- Defensive corporate language ("We strive to…")
- Mockery (even of a clearly-wrong commenter)
- "Educate yourself" energy
- Dismissals ("That's just your opinion")

---

## Logging into learnings.md

Track:

- **Patterns hidden** (which keywords filter most spam)
- **Negative-feedback themes** (recurring criticism worth addressing
  in content)
- **Top engaged commenters** (potential UGC / community member /
  ambassador candidates)
- **Crisis incidents** (post-mortem on what triggered, how
  responded, what the agent will do differently)

Feed back into `12-weekly-learnings.md` and `learnings.md`.

---

## Quarterly moderation review

Every 12 weeks, review:

- Filter list — too aggressive (legit comments hidden)? Too loose
  (spam getting through)?
- Pattern of negative feedback — is it consistent enough to address
  in content?
- Engaged commenter list — anyone consistently great worth a DM?
- Block list — anyone overdue for unblocking (sometimes people
  reform; sometimes you blocked the wrong account)?

Surface in the quarterly review prompt from `learnings-template.md`.
