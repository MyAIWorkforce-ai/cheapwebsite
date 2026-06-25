---
name: site-discover
description: Read the incoming brief. Run a tight discovery interview so the agent has enough to plan a sitemap, scaffold the build, write real copy, and pick the right legal + analytics stack. Capture a single locked brief the next skills read from. Never start writing code in this skill.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Discovery — what are we building?

## Your job

Read whatever the user has given you (one-line brief, RFP doc,
client kickoff transcript) and figure out enough to:

1. **What kind of site?** (landing / marketing / small-biz / catalog
   / content hub / SaaS marketing / e-commerce)
2. **Who is it for?** (audience, awareness level, decision drivers)
3. **What's the one thing a visitor should do?** (single primary CTA)
4. **Region + region-specific obligations** (privacy law, language,
   tax)
5. **Stack preference + budget** (Next.js default, but buyer may
   have an opinion)
6. **Payments yes or no** (if yes, the Stripe Setup bundle handles it)

Then write the brief back to the user in `BUSINESS CONFIG` format
and confirm it before moving on. Don't write code in this skill.
Don't pick a sitemap in this skill. Both come next.

## First read — classify in your head

Before you reply, classify silently from the message you got:

| Signal | Initial classification |
|---|---|
| "I'm a [trade] in [town]" + service business + booking-ish | Local services site → small-biz shape |
| "I'm a coach / consultant / freelancer" + transformation language | Marketing shape with strong about + pricing |
| "I have a digital product / course / SaaS" + pricing tiers | SaaS marketing shape |
| "I'm an artist / photographer / portfolio" + visual emphasis | Portfolio shape (variant of small-biz) |
| "I sell [n] physical products" + n < 20 | Small-biz with simple catalog |
| "I sell [n] physical products" + n > 20 | E-commerce — flag scope concern |
| "Just a landing page for [thing]" | Landing shape |
| "Content site / publication" | Content hub shape |

This is just to seed your questions. Don't lock it in until the
user confirms.

## The interview — six questions, one at a time

Open with one short opener (no preamble):

> Quick discovery before we plan anything. Six questions, one at a
> time.

Then ask, ONE AT A TIME, waiting for each answer:

### 1. The business in one sentence

> *"In one sentence — who you are, who you serve, what you do for
> them?"*

Examples:
- *"I'm a plumber in Adelaide. I help homeowners get burst pipes
  fixed same-day."*
- *"I'm a solo bookkeeper in Auckland. I work with creative agencies
  doing $1-5M revenue."*
- *"I sell a Notion template that helps solo founders track investor
  conversations."*

If the user gives a vague answer ("I'm building a website for my
business"), ask one clarifying question — *"What does the business
do, and who's the customer?"*

### 2. Shape of the site

> *"Pick one: (a) one-page landing, (b) 3-5 page marketing site,
> (c) small-business site with about / services / gallery / contact,
> (d) catalog or e-commerce, (e) content hub or publication, (f)
> SaaS marketing, (g) other — describe."*

Confirm in 3-5 words what they picked.

### 3. The one thing

> *"What's the single most-important action a visitor should take?
> Book a callout, get a quote, call now, sign up for newsletter,
> buy the product, download an ebook, schedule a demo — pick the
> ONE."*

If they list three things, push back: *"Sites convert 2-3× better
with one clear primary CTA. Pick the highest-value one. The others
become secondary."*

### 4. Tone + brand

> *"Pick a tone in 2-3 words. Examples: 'calm + professional',
> 'tradie no-nonsense', 'premium boutique', 'indie + warm', 'expert
> + dry'. And any visual guidelines — a hex colour, a font you
> like, a logo file?"*

Capture the tone in the brief. Don't lock visuals yet — that's
skill 03/04.

### 5. Region + business basics

> *"Where's the business based, and where are your customers?
> Country, state/province, primary language. Are you selling into
> any other region too? Also — do you have an existing domain?"*

Why you need this:
- **Region** → privacy law, consent banner, legal pack
- **State / Province** → especially for AU (state-specific business
  rules), CA (Quebec changes everything)
- **Selling into other regions** → strictest privacy law wins
- **Existing domain** → registrar-specific DNS plan in skill 06

If they say *"Quebec"* or *"selling to Quebec"*, immediately flag
the French content requirement. Don't trap them with it later.

### 6. Payments

> *"Does this site need to take payments? Yes or no — if yes,
> roughly what's being sold and at what price (one-off, subscription,
> bookings, deposits)?"*

If yes: also ask *"Do you already have the Stripe Setup, end to
end. bundle? Skill 09 in this bundle hands off to it for the
payments craft."*

If no: confirm *"Just an information / lead-gen site, no checkout.
You can add Stripe later by saying 'add payments' — skill 09 picks
it up."*

## Optional follow-ups (only if needed)

Don't ask these unless the answer above was vague:

- **Awareness level** — *"How aware is your audience that they
  have this problem? Are they Googling the solution name, or do you
  need to teach them what the thing is?"* Drives content depth.
- **Existing content** — *"Do you have copy already, or are we
  writing from scratch? Photos? Logo? Testimonials?"* Drives skill
  04 estimate.
- **Competitors** — *"Three competitors whose sites you don't hate."*
  Drives stack + design decisions in skill 03.
- **Deadline** — *"When does this need to be live?"* Drives scope
  trade-offs.
- **Budget for paid tools** — *"Any budget for paid tools like
  Cookiebot, Plausible, hosted forms? Or all-free stack?"*

If the user is clear on the six above, skip these. Don't interrogate.

## Output — the SITE BRIEF

Once you have all six answers, write the brief back to the user in
this exact shape, in a fenced markdown block. Ask them to confirm
(*"Look right? Anything to change?"*) before moving on:

```
SITE BRIEF
==========
Who:               <one sentence — who they are, who they serve, what
                    they do>
Shape:             <landing | marketing | small-biz | catalog |
                    content-hub | saas-marketing | portfolio | other>
Primary CTA:       <single most-important action>
Secondary CTA:     <optional fallback>
Tone:              <2-3 words>
Brand color:       <hex or "TBD">
Audience:          <one sentence>
Awareness:         <unaware | problem-aware | solution-aware | most-aware>

Region:            <Australia | New Zealand | United Kingdom | United States | Canada | Other>
State / Province:  <if relevant>
Language:          <en-AU | en-NZ | en-GB | en-US | en-CA | fr-CA | bilingual>
Selling to:        <list any other regions reached>

Existing domain:   <yes — what is it / no — register fresh>
Stack preference:  <Next.js (default) / Astro / WordPress / Webflow / Other>
Payments:          <yes — what they sell, price; no; or later>
Has Stripe Setup
  bundle:          <yes / no — n/a if Payments=no>

Deadline:          <date or "no rush">
Budget for paid tools: <$X/mo or "all-free">
```

Save this brief in conversation context. Every later skill reads
from it. Also write it to `config/business-config-template.md`
(the agent walks the user through filling the remaining fields
during skill 02).

## Then — fill the BUSINESS CONFIG

Once the brief is locked, walk the user through the rest of
`config/business-config-template.md`. Don't dump the whole template;
ask field-group by field-group:

1. **Audience deep-dive** — primary persona, devices, reading level
2. **Brand** — colours, typography, logo, imagery style
3. **Pages in scope** — confirm the shape's default pages, plus any
   extras (blog? gallery? booking page? FAQ?)
4. **SEO targets** — primary keyword, geo target, competitors
5. **Content notes** — existing copy / photos / testimonials / blockers
6. **Banned phrases** — voice guardrails

For each field group, ask *"Want to fill these now or skip and let
me default?"* If they skip, the agent uses regional defaults +
flags them at each later step.

## Region-specific flags (raise these now, not later)

While running discovery, if any of these apply, surface them clearly
**before** moving to skill 02:

| Flag | When to raise | What to say |
|---|---|---|
| `.com.au` domain | AU buyer wants `.com.au` | *"`.com.au` requires an active ABN. Got one?"* |
| `.ca` domain | CA buyer wants `.ca` | *"`.ca` has a Canadian Presence Requirement (CIRA verifies). Citizen, resident, or registered corp?"* |
| `.us` domain | US buyer wants `.us` | *"`.us` requires US nexus. Confirm you're a US person or entity?"* |
| Quebec audience | Region=CA + State=Quebec OR selling to Quebec | *"Quebec Law 25 + Bill 96 — French content required for any Quebec consumer-facing site. We'll need bilingual EN/FR copy and a French-first version. Want to confirm scope?"* |
| Health data / kids / finance | Industry signals | *"This brushes <HIPAA / COPPA / FCA>. The privacy policy will need a lawyer's eyes, not just the template. Want me to flag it in the legal pack?"* |
| US + any state with privacy law | US buyer | *"US is a privacy patchwork — CCPA/CPRA + ~15 state laws. We'll add a 'Do Not Sell or Share' link and consent banner by default. OK?"* |
| Public sector (UK) | UK buyer + gov / charity / public | *"Public Sector Bodies Accessibility Regs 2018 require WCAG 2.1 AA + accessibility statement. We'll bake both in. OK?"* |
| Sensitive product (alcohol, gambling, financial advice) | Signals | *"<industry-specific> ads + content rules apply — ASA / ACMA / FTC. We'll keep the copy claims-clean and flag any need for disclaimers."* |

Don't paper over these. They cost more to fix at launch.

## Hard rules

- **Never start writing code in this skill.** Discovery only.
- **Don't pick a stack here either** — that's skill 03. Capture the
  buyer's preference; don't commit.
- **Never invent regional rules.** If the buyer is in a region the
  bundle doesn't cover precisely (India, Singapore, South Africa,
  Mexico), say so and propose using the closest match (UK for
  India/SA/Singapore, US for Mexico) with a flag to consult a
  local lawyer for the privacy policy.
- **Confirm the brief before advancing.** No skill 02 until the
  buyer types "yes" / "looks good" / "ship it" or similar.
- **One CTA, always.** Push back hard if the buyer wants three
  equally weighted CTAs. The home page conversion gospel: one
  clear primary CTA wins.
- **Surface scope creep early.** If the buyer ticks "small-biz + blog
  + gallery + portal + booking + chat", surface that this is a
  multi-week build and offer to phase it.

## Done condition

You're done with this skill when:
- All 6 brief fields are filled
- The BUSINESS CONFIG region-specific defaults are confirmed
- The buyer has explicitly approved the SITE BRIEF
- Any region / industry red flags have been surfaced
- You have NOT started writing code, picking a sitemap, or scaffolding

When done, say:
> *"Brief locked. Moving to information architecture — we'll lay
> out the sitemap and conversion paths next, then scaffold."*

Then load `02-information-architecture.md`.
