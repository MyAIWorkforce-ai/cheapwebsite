# Crisis-comms script

When a post catches fire (for the wrong reasons) — what to do in the
first 60 minutes, the first 24 hours, and the first week. Templates
for the brand statement, the response cadence, and the escalation
path.

Used by `11-engagement-replies.md` when the crisis-detection threshold
trips, and by the operator when something blows up that the agent
didn't see coming.

This isn't legal advice. Major crises (lawsuit, regulator inquiry,
police involvement, mass-media coverage) require legal counsel
involvement.

---

## What counts as a crisis

The agent treats it as a crisis when ANY of:

- **5+ negative comments on a single post within 1 hour** (or 10
  within a day) — coordinated or organic
- **The post is being screenshotted and shared externally** (X,
  Reddit, news sites)
- **Mainstream media or influencer with 100k+ followers has
  highlighted the post negatively**
- **A regulator, public official, or industry body has commented or
  referenced the post**
- **Someone has been named publicly** without consent in the post
- **Health, safety, or financial harm is being alleged**
- **Coordinated review-bombing** is hitting Google Business Profile,
  Trustpilot, or app stores
- **A staff member, customer, or partner has been doxed**
- **An "apology" is being demanded** by a public figure or community

When in doubt: surface to the operator. The agent does NOT solo a
crisis.

---

## The 5-stage protocol

### Stage 1 — STOP (within 5 min)

The instinct is to reply, defend, explain. Don't.

**Actions:**

- Stop all scheduled posts on every channel (pause Buffer / Hootsuite
  / etc.)
- Stop any active paid promotions of the trigger post
- Take screenshots / archive everything for the record
- Notify the operator immediately

**Do NOT:**

- Delete the post (looks like cover-up; screenshots already exist)
- Argue in comments
- Issue an apology before you understand what happened
- Make jokes
- Post anything else

---

### Stage 2 — ASSESS (within 30 min)

The operator + agent + any team members make a quick assessment.

**Questions:**

1. **What actually happened?** Read the post + comments + any external
   shares (X, Reddit, news). Get to the literal facts.
2. **Is the criticism valid?** Sometimes yes. Sometimes the post is
   poorly worded; sometimes it's wrong; sometimes it's right but
   tone-deaf. Be honest internally.
3. **Who's involved?** Internal (staff slip-up, employee post),
   external (campaign that didn't land), customer-facing (something
   you sold went wrong), partner-related (creator collab issue).
4. **What's the scale?** Local community Twitter storm vs national
   press coverage are different.
5. **Are there legal implications?** Defamation, IP, regulator
   interest, employment law, privacy breach — escalate to legal
   counsel.

**Output of assessment:**

```
CRISIS ASSESSMENT — <date> <time>

Trigger:        <one sentence — what post / what content>
Detected by:    <agent / operator / external mention>
Scale:          <Local / Regional / National / International>
Validity:       <Valid criticism / Partially valid / Invalid /
                 Unclear>
Stakeholders:   <who's affected — customers / staff / partners /
                 community>
Legal exposure: <None / Possible / Likely — escalate to counsel>

Decision:       <Acknowledge & address / Acknowledge & investigate /
                 Defend & contextualise / No response / Delete post>
```

---

### Stage 3 — RESPOND (within 60 min)

If the assessment says respond, do it FAST. Slow responses look
worse than imperfect ones.

#### Response template 1 — Acknowledge & address (post was wrong)

If criticism is valid and the post should not have gone up:

```
We saw the criticism on [post] — and we hear it.

[Brief acknowledgment of what was wrong, in plain language.
Don't hedge. Don't blame "the algorithm" or "an error".]

[What we're doing about it — specific, actionable, within reach.
Not vague promises.]

[We'll [keep listening / take feedback / improve our process /
deactivate the post / refund affected customers / whatever
specific action].]

— [name + title, signed by a human]
```

Example (a brand that posted something tone-deaf on a solemn day):

```
We posted a sales promotion on Anzac Day this morning. That was
the wrong call. We've removed it and we're sorry.

We have processes that should have caught this — they didn't, and
that's on us. We're tightening the calendar review with our team
this week so it doesn't happen again.

Thanks to everyone who flagged it.

— Jamie, Founder, [Brand]
```

#### Response template 2 — Acknowledge & investigate (we don't know yet)

If the situation is unclear and you need time:

```
We've seen the concerns raised about [topic] and we're looking
into it right now.

[We'll have more to say within [specific timeline — 24h, 48h, end
of week]. We won't speculate before we have facts.]

Thanks for the patience.

— [name + title]
```

Then HONOUR THE TIMELINE. If you said 24h, ship at 24h even if it's
just an update.

#### Response template 3 — Defend & contextualise (post was right; criticism is misread)

If criticism is based on misreading the post and your position is
defensible:

```
Quick context on [post]:

[Brief, plain explanation of what we meant + why.]

[Acknowledgment that the criticism makes sense if you read it the
way they did, but here's the actual position.]

[If we'd say it again, we'd say it the same way, OR we'd phrase it
differently next time to avoid the misread.]

— [name + title]
```

Use sparingly. Don't dig in just to be right.

#### Response template 4 — No response (it'll pass)

Sometimes the best response is no response. Use when:

- Low scale (5-10 negative comments, no external shares)
- Bad-faith criticism only (trolls, clearly not real customers)
- The post is solid and the criticism will fade
- The brand has a strong track record on the topic

Still: pause posting for the day. Don't pour fuel on the fire by
posting something cheerful while the crisis is hot.

#### Response template 5 — Delete the post (last resort)

ONLY delete the post if:

- It contains a factual error that can't be corrected with a comment
- It contains someone's private info posted without consent
- It violates law (defamation, IP, regulatory)
- Legal counsel advises

Then post a separate explanation:

```
We've removed [post] because [specific reason].

[Acknowledgment that screenshots exist and don't go away.]

[What we'd do differently.]

— [name + title]
```

NEVER delete a post just because it's getting negative comments.
That reads as cover-up and amplifies the criticism.

---

### Stage 4 — MONITOR (next 24-48 hours)

After the response:

- Track sentiment across:
  - Comments on original post
  - Comments on response post (if separate)
  - Mentions on other platforms (X, Reddit, Threads)
  - DMs
  - Email / direct contact
- Reply to substantive responses to the brand statement
  (acknowledge, not argue)
- Do NOT engage with bad-faith pile-ons
- Document every public-figure or media mention
- Watch for second-wave criticism — sometimes a poorly-worded
  response triggers a second crisis

**Cadence:**

- Hour 1-4: monitor every 15 min
- Hour 4-24: monitor hourly
- Day 2: monitor every 4 hours
- Day 3+: standard cadence

---

### Stage 5 — REVIEW (within 1 week)

Post-mortem. Honest, not blame-driven.

```
CRISIS REVIEW — <date> — <one-line description>

TIMELINE
[Hour-by-hour what happened, what we did, when]

WHAT WENT WRONG
[Plain language — the actual failure point]

WHAT WE DID RIGHT
[Fast response / clear acknowledgment / followed up — whatever
applies]

WHAT WE'D DO DIFFERENTLY
[Specific process changes — calendar review, voice gate, approval
chain]

OUTCOME
- Reach of original post:        <N>
- Reach of brand statement:      <N>
- Sentiment trend:               <details>
- Followers lost:                <N>
- Followers gained:              <N>
- Direct sales impact:           <if measurable>
- Mainstream press hits:         <list>
- Legal escalations:             <list>

PROCESS CHANGES
- [ ] <specific change to prevent recurrence>
- [ ] <specific change>

LEARNINGS LOGGED
- Updated learnings.md with:
  - <hook / framework / format flagged>
  - <calendar guard added>
- Updated BRAND CONFIG → banned topics with:
  - <new banned topic / phrase>
```

Log the review in `learnings.md` → Crisis incidents section.

Don't hide the post-mortem from the team. Crises happen; what
separates good brands from bad is the discipline of learning from
them.

---

## When NOT to apologise

There's a strong instinct to apologise to make the criticism stop.
Apologising for something the brand didn't actually do wrong:

- Reads as weakness / lack of confidence
- Invites more criticism (the precedent is "they apologise when
  pushed")
- Misleads customers about what the brand believes

Hold position when the position is defensible. "Defend &
contextualise" template is the right move.

---

## When the agent gets it wrong

Sometimes the agent will draft a response that's too defensive, too
apologetic, too hedging, too jokey. The operator overrides.

If the operator is uncertain, route to:

- Trusted advisor / mentor / board
- PR / comms specialist (for major brands)
- Legal counsel (for any legal exposure)
- Industry peer who's handled similar (informal network)

The agent does not handle a crisis alone.

---

## Per-region nuances

### AU / NZ
- ACCC may take interest if misleading claims involved
- AANA review possible if disclosure missing on paid content
- Australian press is small + connected — major crisis = national
  press within hours

### UK
- ASA may rule on misleading claims; rulings are public
- CMA on green claims, fake reviews
- UK press is aggressive on brand stories

### US
- FTC for endorsement / disclosure issues
- State AGs may take interest in consumer harm
- Social media pile-ons can run for weeks
- Class action risk on consumer-facing brand failures

### CA
- Competition Bureau for misleading claims
- Quebec OQLF for French language compliance breaches
- Ad Standards Canada rulings public

---

## Pre-crisis hygiene

Most crises are preventable. Run these checks regularly:

- **Pre-publish gate** (`09-pre-publish-gate.md`) catches most
  in-content issues
- **Calendar awareness** prevents solemn-day misposts
- **Voice consistency** prevents tone-deaf misfires
- **Substantiation** prevents claims that get retracted
- **Disclosure** prevents regulator interest
- **Customer service inbox** prevents complaints escalating to
  social

The crisis-comms script is the fallback. The gate + the calendar +
the voice are the prevention.

---

## Crisis-comms drill (quarterly)

Once per quarter, the brand or agency should run a fire drill:

1. Imagine a likely crisis (eg. "what if a Reel we posted got
   screenshotted with a typo as a slur?")
2. Walk through the 5-stage protocol
3. Time the response — could you do Stage 1 in 5 min? Stage 3 in
   60 min?
4. Identify gaps (who's the spokesperson? who has admin access to
   pause posts? who calls legal?)
5. Document the drill outcome

A drilled team responds faster and cleaner than a team that's only
read the playbook.
