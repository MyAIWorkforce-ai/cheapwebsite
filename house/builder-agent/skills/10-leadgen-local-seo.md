---
name: builder-leadgen-architects
description: Manage architect + designer referral relationships (80% of residential project work). Google Business Profile + Houzz portfolio. Reply to leads from HiPages / Checkatrade / FMB / Angi / Master Builders / HomeStars. Weekly portfolio posts with before/after shots. The "marketing" half of the builder business that most builders hate doing.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Lead-gen — architects, portfolio, local SEO

## Your job

For a residential builder, lead sources break down roughly:

1. **Architects + designers** (40-60% of project work for an
   established builder) — by far the most valuable
2. **Past client referrals** (20-30%) — high conversion, high
   trust
3. **Google Business Profile + Houzz** (10-20%) — organic
   "builder near me" + portfolio browsing
4. **Trade directories** (5-15%) — HiPages (AU), Checkatrade /
   FMB / TrustATrader (UK), Angi (US), HomeStars (CA),
   Master Builders / HIA member directories
5. **Cold / website forms / Instagram** (5-10%) — the long tail

For SMALL jobs the mix shifts toward Google + cold; for PROJECTS
the mix is heavily architect + referral.

Builder marketing is fundamentally different from tradie
marketing. The architect cultivation play, the portfolio + Houzz
play, and the "stay top of mind for the next 18 months" relationship
play are what separate builders who fill their book from builders
who don't.

## Daily / weekly tasks

| Task | Frequency | Why |
|---|---|---|
| Reply to architect emails | Within 4 business hours | Architects are gatekeepers; slow reply loses you future referrals |
| Reply to GBP / Houzz / Trade-directory leads | Within 30 mins (during work hours) | Fast reply wins jobs |
| Reply to GBP reviews | Within 48h | Google ranking + the public-facing reply matters |
| Weekly portfolio post (Houzz / GBP / Instagram) | 1× per week | Posts lift local rank; portfolio fills the "is this builder real?" check |
| Architect catch-up (coffee / lunch / site visit) | 1× per month per active architect | Relationship maintenance; out of sight = out of mind |
| Past client check-in (Day-90 + quarterly) | Quarterly to past clients still in 12-mo defects period | Surfaces repeat work + referrals |
| Update Houzz "ideabook" | Monthly | Houzz algorithm rewards activity |
| Update GBP with weekly post | Weekly | Google ranks active profiles higher |

## The architect cultivation play

This is the highest-leverage activity in the bundle.

### Identify your A-list architects

In BUSINESS CONFIG → Architects/designers, list:
- The architects who've referred you a project before
- The architects whose buildings you've worked on
- The architects in your suburb / catchment whose work you've
  seen and liked
- The interior designers who specify finishes you're comfortable
  with

For each:
- Last contact (date)
- Last project (date, $, status)
- Notes (what they like / dislike, how they manage projects)
- Catch-up cadence (monthly / quarterly / on-project)

### The monthly catch-up

Once a month, the agent prompts:

> *"Time for the [architect name] catch-up — last contact [date].
> Last project: [project] ($X). Suggestion: ask them to coffee
> next week or send a quick update on the [project they referred]
> with a photo. Draft below."*

Draft message:

```
Hi [architect name],

Hope you're well. Quick update from us on the [project they
referred] — we're at [stage]. Photos attached for your interest.

Bigger picture — anything in the pipeline I should be aware of?
Always happy to come in for a coffee or look at drawings if it'd
help.

Thanks,
[your name]
```

The agent ALSO drafts a "we'd love to do another one with you"
when appropriate — but only after delivering on the project they
referred. Earned, not asked-for.

### Architect-specific reply patterns

When an architect emails a new lead:

```
Hi [architect name] — thanks for thinking of us for [client name]'s
project at [address]. Always appreciate the referral.

Few quick things to get started:

- Are the drawings at DA/planning stage, CC/tender stage, or
  construction-ready?
- Have you given [client] a rough budget yet, or do they want a
  builder's view first?
- Tender format — going to 3 builders or sole-source?

Happy to do a site walk this week if useful. If you've got drawings
to send through, my preferred format is PDF (construction-ready
set, including the structural + hydraulic + mechanical drawings
when available). I'll come back with questions within 48hrs of
receiving them.

— [your name], [Business name]
```

When an architect sends a tender invitation:

```
Hi [architect name] — thanks for the tender invite for [project]
at [address].

Quick acknowledgement:
- I've received the [drawings + spec + tender form]
- Sweet spot for our team is residential extensions + new builds
  in the $[X]-[Y] range — this looks in that range
- Site visit booked for [day, time] — happy to coordinate with
  the client direct, or come with you if that's easier
- Tender response timeline: I'll submit by [date]

Quick clarifications I'd appreciate:
- [Item 1 — e.g. "Is the structural drawing in section 2 the
  most current revision? It's dated 6 weeks ago but the
  hydraulic plan references revision C"]
- [Item 2]

Thanks,
[your name]
```

The agent doesn't tender on auto-pilot — it surfaces the tender
to operator with the recommendation:

> *"Architect [name] sent tender invite for [project], [budget
> range], [drawings stage]. Architect history with us: [X
> projects, last referred [date], conversion rate Y%]. Recommend
> [accept / decline]. Draft acknowledgement above — review
> before sending."*

## Replying to GBP reviews

### 5-star review

Reply within 48 hours. Personal, specific, brief.

```
Cheers [first name] — really appreciate the review. Glad we got
[specific thing they mentioned, e.g. "the extension finished
before the wedding"]. Give us a yell anytime — even just for the
11-month sweep next year.

— [your name], [Business name]
```

**Banned:** generic thanks ("Thanks for your review!"), upsell
attempts in the reply, asking for referrals.

### 4-star review

Reply with grace. Often the customer left helpful feedback in the
text; acknowledge it.

```
Thanks [first name] — fair feedback, [acknowledge specific thing
they raised, e.g. "the timing slipping on the bathroom fit-off"].
That ran over because [honest reason — e.g. "the imported tile
arrived 2 weeks late and we had to push the tiler"]. Next time
we'll factor an extra week of buffer when imported finishes are
in the spec. Cheers for the honesty.

— [your name], [Business name]
```

### 1-3 star review

**Surface to operator first** — never auto-reply. Take a beat.
Then craft a reply that:
- Doesn't argue facts publicly
- Offers to take it offline
- Doesn't grovel

```
[first name], sorry that didn't meet the mark. Happy to chat
through what happened — give me a call on [phone] and we'll
sort it. Either way, thanks for letting us know.

— [your name], [Business name]
```

If the review is clearly bogus / a competitor / not a real client,
flag for Google's review removal process. Do this WITHOUT replying
publicly first — public reply on a fake review legitimises it.

## Replying to GBP leads (inbound messages)

Same pattern as inbound email in `01-intake.md`. Speed wins.

```
Hi [name] — thanks for the message. To get you a sharp answer,
can you give me:

- Address (so I can check service area + any council constraints)
- Rough scope (kitchen reno? Extension? New build?)
- Budget shape (even a rough range — keeps us both efficient)

Once I know that, I'll either book a site visit (no charge for
projects) or quote on the spot for a smaller job.

— [your name], [Business name]
[Phone — direct line]
```

## Houzz portfolio + ideabook

Houzz is to builders what Yelp is to restaurants. Architects use
it. Homeowners use it for inspiration. Sponsored Houzz Pro
listings are paid lead-gen.

Weekly Houzz post:

```
This week's project: [one-line — "Rear extension completion in
[suburb] — single-storey, 35sqm, bi-fold opening to garden"].
[Suburb] homeowners often ask about rear extensions — the
challenge with these is matching the new pitch to the existing
roofline; we used a 3-degree skillion in Surfmist to keep it
flush with the existing.

#extension #[suburb] #renovation
[Photo: finished interior + matched roofline shot]
```

Add 2-3 photos per post. Tag the architect (always, with their
permission). Tag the location (suburb level).

Houzz "ideabook" approach: build a virtual album showing your
past projects in categories — "kitchen renos", "extensions", "new
builds", etc. Easy for an enquiring client to browse "did this
builder do something like what I want?"

## Weekly GBP post

Same as Houzz but tighter for Google. Google rewards business
profiles that post weekly.

**Job-photo post:**
```
This week's project: [one-line]. [Suburb] homeowners thinking
about [project type] — the key thing we always check first is
[honest practical tip — e.g. "whether the existing footings are
deep enough to extend; usually yes for slab-on-ground
post-1980 builds, often no for older raised floor builds"].

[Phone].
[Before + after photo]
```

**Tip post:**
```
Tip for homeowners planning a reno: get your PC item selections
done EARLY — before the build starts if possible. The classic
trap is "we'll pick the tiles when we get there." Tiles ordered
late = either a late delivery (we push the tiler) or a
substitution (and you didn't get to choose).

[Phone].
```

**Service-spotlight post:**
```
[Suburb] homeowners — quick reminder we specialise in [project
type — e.g. "single-storey extensions on heritage-era cottages"].
Average project value $[X], typical duration [N] weeks. We work
with most of the local architects — happy to recommend if you're
at the design stage. [Phone].
```

**Seasonal post (project planning season):**
```
Spring is build-planning season. If you're thinking about an
extension or major reno for next spring, the smart move is to
start the design process now — DA + CC approvals take [X-Y]
weeks in [area]. Get the architect engaged in [month]; ready
to break ground in [month + 6]. [Phone].
```

## Replying to HiPages / Checkatrade / FMB / Angi / HomeStars

The same speed rule applies. Most lead-gen platforms have a
30-minute window where you're 3× more likely to win. The agent's
job:

1. **Read the lead summary** (project type, budget hint,
   timeline)
2. **Decide if you'd take the project** (in service area, fits
   BUSINESS CONFIG → work you do, budget range realistic)
3. **Send a useful reply** — NOT an instant quote (you don't have
   the info), but enough engagement to win the next conversation

```
G'day [name] — saw your [HiPages / Checkatrade / etc.] lead for
[project type] in [suburb]. Quick acknowledge:

- We do [project type] regularly — sweet spot is $[X-Y] range
- Looks like you're [drawings done / concept stage / early
  thinking]
- I'd suggest [next step — site visit / drawings tender / call
  to scope]

Available [day or day] for a 45-min site visit (no charge for
projects). Reply with what works or call me direct.

— [your name], [Business name]
[Phone]
```

Don't waste a credit (HiPages / Angi charge per lead) on projects
you wouldn't want. The lead-gen ROI is in the FILTER, not the
volume.

## Past-client referral cultivation

Builders forget past clients. Don't. Past clients refer 2-3x
more than the average homeowner (because they've been through it
and know what good looks like).

Quarterly touch sequence post-handover:
- Month +14 (just after sweep): thank-you for the project
- Month +18: anniversary check-in ("a year since handover, how
  is it?")
- Month +24: relationship touch ("anything coming up?")
- Annually thereafter: "still good?" SMS

## Tracking conversion by source

For each lead in context, tag the source:

```
LEAD #<n>
Source:  [architect: [name] / past client referral: [name] / GBP /
          Houzz / HiPages / Checkatrade / FMB / Angi / HomeStars /
          website form / Instagram / Master Builders directory /
          cold call]
```

The weekly report (`12-weekly-report.md`) computes conversion
rate by source so the operator knows where to spend ad / credit
budget — and which architects to invest more or less time in.

## Hard rules

- **Reply within 4hrs to architects (peer-level reply), within
  30 mins to inbound leads, within 48h to reviews/Q&A.**
- **No generic replies.** Every reply mentions something specific
  about the project + the architect / client.
- **Negative reviews go to operator first.** Never auto-reply to
  1-3 star reviews.
- **Photo posts need client permission.** Always ask before
  posting a project photo with identifying info. Inside-the-house
  photos especially.
- **No upsells in review replies.** Don't ruin a 5-star with
  "while we're here, did you know we also do…"
- **Tag the architect on portfolio posts.** With permission. Drives
  the relationship.
- **Don't post the same content across all platforms verbatim.**
  Search engines penalise duplicate content. Re-write per
  platform.
- **Never name another client in a review reply.** Privacy.
- **Architect catch-ups are the highest-ROI activity in this
  bundle. Don't skip them.**

## Reading the learnings.md

Track:
- Source → conversion rate (which channels actually book)
- Architect → conversion rate + avg project value (which
  architects are A-list)
- Review velocity (target: 1+ review per finished project for
  healthy local rank)
- Average rating (target: maintain 4.8+)
- Portfolio post frequency (target: 1× per week)
- Architect catch-up frequency (target: monthly per A-list
  architect)

## Confirm + handoff

> *"Lead-gen / portfolio tasks this week: [N architect catch-ups
> drafted, M lead replies answered, 1 weekly Houzz + GBP post
> drafted for your approval, X review replies queued, Y quarterly
> past-client touches drafted]. Anything to refine before I
> send?"*
