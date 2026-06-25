---
name: site-content-writing
description: Write the actual copy for every page based on BUSINESS CONFIG → Brand voice + Audience + Region. Page-by-page playbook for hero, social proof, features, services, about, pricing, FAQ, CTA. Match the regional English.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok]
tools: [file.write, file.read]
---

# Content writing — every page, in the right voice

## Your job

Take the scaffolded skeletons and fill them with real, audience-
specific, brand-voiced copy. No lorem ipsum. No "we're passionate
about quality." No "in today's fast-paced world."

You're writing for a specific audience, in a specific region, with
a specific brand voice — pull from BUSINESS CONFIG every line.

## The writing rules — for every page

### Voice
- **Match BUSINESS CONFIG → Brand voice.** "Tradie no-nonsense"
  reads completely different from "premium boutique."
- **Match BUSINESS CONFIG → Audience reading level.** Trades home-
  owners: plain English, short sentences, no jargon. SaaS
  engineers: technical precision welcome.
- **Match BUSINESS CONFIG → Language.** en-AU / en-NZ / en-GB use
  "organise / colour / centre." en-US / en-CA use "organize /
  color / center." Date format DD/MM/YYYY everywhere except en-US.
- **Read it aloud test.** If you wouldn't say it to a customer in
  person, don't write it.

### Length
- **Hero H1: 6-12 words.** Shorter is better.
- **Hero subhead: one sentence, ~15-25 words.**
- **Section H2: 3-7 words.**
- **Body paragraphs: max 3 lines (web-rendered).**
- **CTA labels: 2-4 words. Verb first.**
- **Service descriptions: 50-150 words each.**
- **About page: 300-600 words.**
- **Per-suburb page: 200-400 words. Genuinely specific.**
- **FAQ answer: 30-80 words each.**
- **Blog post: 800-1500 words.**

### Structure
- **One promise per page.** The H1 makes one. Body supports it.
- **One primary CTA per page.** Repeat the SAME CTA throughout —
  hero, mid-page, footer of section.
- **Lead with the answer.** Don't bury the value in paragraph 3.
- **Specific over generic.** "Replaced 50L Rheem gas HWS in 3 hours"
  beats "Reliable hot water service."

### Banned
- Marketing fluff: "passionate", "world-class", "best-in-class",
  "leverage", "synergy", "cutting-edge", "innovative"
- Empty proof: "Years of experience", "Industry-leading", "Customer
  satisfaction"
- Generic promises: "We care about quality", "We treat every job
  like it's our own"
- Emoji unless BUSINESS CONFIG → Tone don'ts allows them
- Exclamation marks unless BUSINESS CONFIG → Tone don'ts allows them

## Page 1 — the home page

### Hero block

Structure:

```
H1: <one clear promise — specific to the niche>
Subhead: <who it's for + what they get + light differentiator>
Primary CTA: <verb-first, 2-4 words>
Secondary CTA: <optional — "How it works" / "See pricing">
```

#### Examples by niche

**Local trades:**
```
H1: Emergency plumbing, Adelaide-wide, 24/7
Subhead: Burst pipes, blocked drains, no hot water — we're on the way
         within 90 minutes, any night of the week.
Primary CTA: Call (08) 1234 5678
Secondary CTA: Book online
```

**Coach / consultant:**
```
H1: Stop guessing what your investors want to hear
Subhead: 1:1 fundraising coaching for solo founders heading into a
         pre-seed or seed round. Eight weeks. Real meetings, real
         feedback.
Primary CTA: Book a discovery call
Secondary CTA: See past founders
```

**SaaS marketing:**
```
H1: Inventory that doesn't lie to your team
Subhead: Real-time stock counts across every store, every warehouse.
         No more "system says 12, shelf has 3." Built for retail teams
         with 5-50 locations.
Primary CTA: Start free trial
Secondary CTA: See it in action
```

**Bookkeeper / accountant:**
```
H1: Bookkeeping for Auckland creative agencies
Subhead: Xero-first, fixed monthly fee, deadline-driven. We work with
         5 agencies billing $1-5M and we'd like to work with one more.
Primary CTA: Get a quote
Secondary CTA: See our process
```

#### What makes a hero work

- **The H1 answers "what is this" in under 2 seconds.** If a visitor
  has to read the subhead to figure out the niche, the H1 failed.
- **The subhead adds the "for whom" + "what's different."**
- **The CTA is a clear next step**, not "Learn more."

### Social proof block

Options, ranked by impact:

1. **Recognisable client logos** (best) — 4-6 logos in a row
2. **A single hero testimonial** — quote + name + role + photo + 5
   stars (specific praise > generic)
3. **Stat block** — "Booked 1,200+ jobs · 4.9★ across 230 reviews ·
   On the way in <90 mins" (3 stats max)
4. **Case study card** — one client outcome with a number
5. **Trust marks** — "Master Plumber", "Xero Certified Partner",
   "Stripe Verified", "Trade me Trusted" — region-relevant

Write the actual testimonial in the buyer's words — never invent.
If no testimonials yet, lean on stat block or trust marks. Honesty
beats fake quotes.

### Features / services preview

If small-biz / marketing / SaaS — show 3-6 features or services with
a one-line description + icon (or per-service photo).

```
Service / Feature   |  One-line description
--------------------|--------------------------------
Burst pipes 24/7    |  On-site within 90 mins. Fixed-price.
Hot water swaps     |  Gas, electric, heat pump. Same-day.
Bathroom renos      |  From rough-in to fit-off. Compliance cert.
Blocked drains      |  Camera + jetter. We find it, fix it, prove it.
```

Each one links to the deeper services page or anchors lower on the
home page.

### FAQ block

4-6 questions buyers actually ask. Don't make these up — pull from:
- Real questions in the buyer's inbox / DM history
- "People also ask" on Google for the primary keyword
- BUSINESS CONFIG → Audience awareness level (lower awareness = more
  basic questions)

Each answer: 30-80 words. Plain English. Honest.

#### Local trades example

```
Q: How quickly can you get here?
A: For emergencies (burst pipe, sewage backing up, no hot water in
   winter), within 90 minutes of confirming the job. For standard
   bookings, we usually have same-day or next-day slots.

Q: Do you charge a callout fee?
A: Yes — $130 covers the first 30 minutes on site. We tell you the
   fee before we leave the office so there are no surprises. Most
   jobs are quoted upfront after we've seen the issue.

Q: Are you licensed?
A: Yes — Victorian Building Authority registered plumber, VBA #
   12345. Public liability insurance covers $20M. Gas Type A
   ticketed too, so we can quote and certify gas work.

Q: Do you take card on-site?
A: Yes — tap, Apple Pay, Google Pay, or EFT. Most invoices get a
   Stripe payment link too if you'd rather pay later in the day.
```

#### Coach example

```
Q: How is this different from a course?
A: Courses give you content. This gives you outside eyes on YOUR
   pitch deck, YOUR investor list, YOUR conversations as they
   happen. Eight 1:1 sessions over eight weeks, scoped to your
   round.

Q: What stage of founder is this for?
A: Solo founders heading into pre-seed or seed. If you've raised
   institutional money before, you're past where I'd add the most
   value — happy to recommend someone better.

Q: Do you take equity?
A: No — flat fee. I don't want a stake in 50 companies; I want to
   be useful to 6 founders a year.
```

### Final CTA block

End the home page with a focused CTA section. Repeat the same
primary CTA from the hero. One short reinforcement of the promise,
then the button.

```
H2: <repeat the promise in different words>
Body: <one sentence on why now / why us>
CTA: <same primary CTA as hero>
```

## Page 2 — about

Length: 300-600 words. One page, no sub-sections.

### Structure

```
H1: <a real-world claim — not "About Us">
   e.g. "Plumber on the south side, since 2014."
   e.g. "Three creative-agency bookkeepers, working from Mt Eden."
   e.g. "Built by retail ops leads who got tired of broken stock counts."

Lead paragraph: The origin — one sentence that's specific and true.
   "Started Smith Plumbing after 12 years on the tools with Reece's
   biggest commercial accounts. Wanted to do residential work the
   way commercial does it — show up when you said, fix it the
   right way, leave with a cert."

Middle paragraph(s): What you do and why you do it that way. Be
   specific about the way you work, not just what you do.

Trust signals: licensing, insurance, training, certifications,
   trade body memberships — region-specific.

Optional: photo of the operator(s). Real photo, not stock.

Final CTA: link back to the primary CTA — book, quote, sign up.
```

### Examples — the difference between filler and real

Bad:
> About Us. With years of industry experience, our passionate team
> is dedicated to providing world-class service to our valued
> customers. We believe in quality, integrity, and customer
> satisfaction.

Good:
> Smith Plumbing. Since 2014.
>
> I started Smith Plumbing after twelve years on the tools with
> Reece's biggest commercial accounts. Commercial taught me how to
> work — show up on time, fix it right, certify it, leave clean. I
> wanted to do residential work the same way.
>
> Solo plumber, gas-ticketed, drainage endorsed. I do the work and
> I send the invoice. No call centre, no apprentice arriving instead
> of me. If you booked Smith, you get Smith.
>
> Victorian Building Authority registered (VBA PL 12345), Gas Type
> A ticket (VBA GFL 67890), $20M public liability through CGU. ABN
> 12 345 678 901.
>
> Most of my work comes from word of mouth in Carlton, Fitzroy,
> Brunswick, Northcote. If you're nearby and need a plumber, I'd
> like to be yours.
>
> [Book a callout]

That's 200 words and the buyer learns the operator's name,
licensing numbers, years of experience, work style, service area,
and how to act on it. No fluff.

## Page 3 — services

### Structure

```
H1: <services positioning — not just "Our Services">
   e.g. "What we fix, replace, and install"

Brief intro: one sentence on how you work generally.

Per-service section (repeat for each):
   H2: <service name>
   Body: 50-150 words — what it covers, typical scope, who it's for
   Price band (if comfortable): "From $X. Most jobs $X-Y."
   Per-service CTA: <get a quote for this / book this>

Closing: link to /contact or per-service deeper page.
```

### Per-service writing

Each service description must answer:

1. **What is it?** (in a sentence the buyer would use)
2. **What's included / what's not?** (scope clarity)
3. **Roughly how long?** (sets expectations)
4. **Roughly how much?** (transparency — band, not exact)
5. **Why us for this one?** (differentiator)

#### Example

```
## Hot water replacement

We swap out hot water units — gas, electric, heat pump, or
continuous-flow — same day for most call-outs before 10am.

What's included: remove the old unit, install the new one,
re-pressurise, test, commission, register the warranty, and
issue the Plumbing Compliance Certificate. Gas work includes
the Type A cert (we hold the ticket).

What's not: roof or floor repairs to get to a hard-to-reach
cylinder; those we quote separately if needed.

Time: ~3 hours typical. Same-day if confirmed before 10am.

Price band: $1,800-$3,400 supplied + installed depending on
size, brand, and gas / electric / heat pump. Heat pump units
attract energy rebates in some states — we'll factor those in.

We're a Rheem and Rinnai preferred installer (means we get the
unit faster and the warranty's registered same day).

[Get a hot water quote →]
```

## Page 4 — pricing

Only write a pricing page if BUSINESS CONFIG → Has pricing page = yes.

### Structure

```
H1: <Pricing positioning — confident, specific>
   e.g. "Honest pricing, on the website where it belongs"
   e.g. "Fixed monthly fee. No timesheet billing."

Intro: one or two sentences on philosophy
   e.g. "Same rates every customer. No 'special quote' games."

Per-tier or per-service pricing table:
   Tier name | What's included | Price | CTA

For services with variable pricing, use bands:
   Service | Typical price | What changes the price
   --------+---------------+-----------------------
   Callout | $130 + $110/hr | After-hours +$150
   Hot water swap | $1,800-3,400 | Brand, size, gas vs electric

For SaaS-style:
   Free | Starter | Pro | Enterprise
   $0 / $X / $Y / Contact

FAQ on pricing: 3-5 questions

CTA: get a quote / start free trial / contact sales
```

### Pricing copy rules

- **Lead with the price band.** Don't bury it behind a form.
- **Be honest about what's not included.** Materials extra? Say so.
- **Match your audience's awareness.** Plain pricing for buyers
  who know what the thing is; explanation pricing for buyers who
  don't.
- **Currency + tax disclosure** — see region-specific section below.

## Page 5 — contact

### Structure

```
H1: <Contact positioning — direct>
   e.g. "Get a plumbing quote"
   e.g. "Tell us about your project"

Brief: one sentence — what happens after they submit
   e.g. "Reply within 30 minutes business hours, or by 9am next day."

Form: 4-6 fields max
   Required: name, email or phone, message
   Optional: address, preferred contact method, urgency

OR for low-volume: just put the email + phone, no form.

Alternative contact methods:
   Phone (click-to-call on mobile)
   Email (mailto:)
   Hours (when you actually reply)
   Address (if visiting in person)
   Map embed (if relevant)

Reply SLA: "Reply within X" — set the expectation honestly.
```

Form copy:
- **Submit button label:** "Send", "Get a quote", "Book the call" —
  NOT "Submit" alone.
- **Confirmation message:** "Got it. Reply within 2 hours" — not
  "Thank you for your submission."
- **Error message:** plain English, not "ValidationError: Field 'X'."

## Page 6 — service-areas/[suburb]

For local trades. Per-suburb landing pages.

### Structure

```
H1: <Service> in <Suburb>
   e.g. "Plumber in Norwood"

Lead paragraph: genuinely suburb-specific
   "Norwood's a mix of pre-1940 cottages with copper mains running
   through wall cavities and post-2000 new builds with PEX. Most
   of our Norwood call-outs are burst flexis under kitchen sinks
   (the cottages) and blocked dishwasher drain lines (the new
   builds). We're on the way within 45 minutes from Stepney."

Local trust signals: how long serving the area, % of work from this
   suburb, recognisable nearby work
   "Half our weekly work is in the Norwood / Kent Town / Stepney
   triangle. We did the Norwood Town Hall back-of-house refurb
   plumbing in 2022."

Services tailored to the suburb:
   - The 2-3 most-relevant services here
   - Each with a per-suburb CTA

Phone CTA at top + bottom (sticky in header)

Schema: LocalBusiness with areaServed = this suburb
```

### Local SEO writing rules

- **Don't templated-fill.** Per-suburb pages must be actually
  different. Google's local spam detection (and reviewers) will
  catch repeated paragraphs. Write each suburb fresh, with at
  least 100 words of suburb-specific content.
- **Local landmarks, housing stock, common issues.** What makes
  THIS suburb different.
- **Real client work in the area** (with permission).
- **Suburb name in H1, H2, and 2-3 times in body.** Natural, not
  stuffed.

## Page 7 — FAQ (if standalone)

If the brief calls for a dedicated FAQ page, structure:

```
H1: <Frequently asked — make it specific>
   e.g. "Plumbing questions, answered"

Categorise: 3-5 categories, 4-6 Q&As each
   - Pricing & callouts
   - Hot water
   - Drains & blockages
   - Gas
   - Emergencies

Each Q is a heading; each A is 30-80 words.

Wrap in FAQPage schema — skill 07 handles this.
```

## Page 8 — blog post

### Structure

```
H1: <Post title — clear, scannable, includes the keyword>
   e.g. "How to find your main water shut-off valve (and why it
        matters at 2am)"

Meta: date, author, read time (3 min, 5 min)

Lead: TL;DR or strong hook in the first 50 words

Body: H2 sub-sections, short paragraphs, bullets where helpful,
   photos where helpful

End: practical takeaway + CTA (relevant to post — e.g. "If you
   can't find yours, we'll help you locate it on the next callout
   for free.")
```

### Blog rules

- **Write for a real reader query.** Not "SEO bait" content.
  Answer the question the buyer's customer would type.
- **800-1500 words.** Shorter is fine if the answer is short.
  Don't pad.
- **Specific over generic.** "Three reasons your dishwasher pump
  burned out" beats "Common dishwasher problems."
- **One CTA at the end, contextual.**

## Region-specific copy notes

### Currency + tax disclosure

| Region | Display format | Where |
|---|---|---|
| AU | "$1,200 inc GST" | Pricing, services, invoices |
| NZ | "$1,200 inc GST" | Same |
| UK | "£1,200 inc VAT" (B2C); "£1,000 ex VAT" (B2B) | Same |
| US | "$1,200" + "Tax calculated at checkout" | Same |
| CA | "$1,200 CAD" + "Tax at checkout" | Same |

For multi-region selling, default to ex-tax + dynamic per region.

### Date format

- **DD/MM/YYYY** for AU, NZ, UK, CA
- **MM/DD/YYYY** for US
- **Written form** ("1 January 2026") is universally clear.

### Spelling

- **en-AU / en-NZ / en-GB / en-CA**: organise, colour, centre,
  honour, programme (vs program for code), licence (noun) / license
  (verb)
- **en-US**: organize, color, center, honor, program, license
  (both)

Match BUSINESS CONFIG → Language. Mixing reads sloppy.

### Phone format

- **AU**: 0X XXXX XXXX (national) or +61 X XXXX XXXX (international)
- **NZ**: 0X XXX XXXX or +64 X XXX XXXX
- **UK**: 0XXXX XXXXXX or +44 XXXX XXXXXX
- **US/CA**: (XXX) XXX-XXXX or +1 (XXX) XXX-XXXX

Always click-to-call on mobile: `<a href="tel:+61412345678">`.

### Business identifier disclosure

| Region | What to show in footer |
|---|---|
| AU | ABN (or ACN + ABN) |
| NZ | NZBN (recommended, not mandatory for marketing site) |
| UK | Company number (mandatory for Ltd/LLP/PLC per Companies Act 2006 s82) — plus registered office address |
| US | EIN not displayed publicly; state contractor licence if trades |
| CA | BN + provincial registration if applicable |

### Bilingual (Quebec) copy

If BUSINESS CONFIG → Language = bilingual + Region = CA + State = Quebec,
trigger bilingual mode:

- French version is the default (predominant per Bill 96)
- English version on `/en/`
- Both have the same structure
- Hire a native French translator OR use DeepL + native review
- Don't machine-translate without review

## Workflow

For every page:

1. **Read BUSINESS CONFIG + brief** for voice, audience, tone don'ts
2. **Read the page's job from the sitemap**
3. **Draft the copy** in a fenced block
4. **Show it to the user** — never write to file silently
5. **Iterate** on their feedback
6. **Save to file** when approved
7. **Move to the next page**

Don't write every page in one go without checkpointing. Voice
drifts. Show + confirm + save, page by page.

## Hard rules

- **No lorem ipsum. Never.** Even draft copy is real.
- **No "we are passionate about X."** Show, don't claim.
- **One H1 per page. Always.**
- **No exclamation marks unless the brand allows them.**
- **Never invent testimonials.** Use real ones or skip.
- **Never invent licence numbers or business identifiers.** Pull
  from BUSINESS CONFIG; if missing, ask.
- **Match the regional English.** Don't mix en-AU and en-US copy
  on the same site.
- **Click-to-call all phone numbers on mobile.**
- **Local SEO pages must be genuinely different.** No fill-in-the-
  blank suburb templates.
- **Every page ends in a CTA.** Even the about page.

## Done condition

You're done with this skill when:
- Every page in the sitemap has real, approved copy in the file
- BUSINESS CONFIG → Brand voice is honoured throughout
- Region-specific spelling, currency, phone, date format are
  consistent
- The user has read every page and approved
- The site builds + renders the new copy locally

When done, say:
> *"Content's in. Site's ready to deploy. Moving to Vercel."*

Then load `05-deploy-vercel.md`.
