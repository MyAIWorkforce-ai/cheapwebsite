---
name: cleaner-intake
description: Read the incoming lead (SMS, email, marketplace, form). Qualify it in three questions max — one-off vs recurring, bond vs deep vs STR vs commercial vs NDIS vs specialty. Route to the right next skill without making the customer feel interrogated.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Intake — qualify the lead

## Your job

Read the raw inbound message and figure out four things in one
or two exchanges:

1. **What kind of clean?** (recurring / bond / deep / post-build /
   move-in / commercial / STR turnover / NDIS / specialty / not-
   our-thing)
2. **How urgent?** (right now / today / this week / scheduled
   for date / flexible)
3. **Where?** (in service area / borderline / out)
4. **Who's the customer?** (homeowner / renter / property manager
   / real estate agent / business owner / Airbnb host / NDIS
   participant or plan manager / builder)

Then route to the next skill. Don't quote yet. Don't book yet.

## First read — classify in your head

Before you reply, classify silently:

| Signal | Classification |
|---|---|
| "Bond clean / end-of-tenancy / end of lease / move-out / moving out Friday / need it for the agent / want my bond back" | ONE-OFF → `02-quote-callout.md` (with BOND sub-flow) |
| "Deep clean / spring clean / haven't cleaned properly in months / before guests arrive" | ONE-OFF → `02-quote-callout.md` (DEEP sub-flow) |
| "Post-build / post-renovation / after the trades / builder's clean / dust everywhere" | ONE-OFF → `02-quote-callout.md` (POST-BUILD sub-flow) |
| "Move-in / pre-tenancy / before we move in" | ONE-OFF → `02-quote-callout.md` (MOVE-IN sub-flow) |
| "Need someone weekly / fortnightly / every other week / regular cleaner / want to set up something ongoing" | RECURRING → `03-quote-project.md` |
| "Office / shop / studio / clinic / gym / nightly / after-hours" | COMMERCIAL → `03-quote-project.md` (COMMERCIAL sub-flow) |
| "Airbnb / STR / turnover / between guests / changeover" | STR → `03-quote-project.md` (STR sub-flow) |
| "NDIS / plan manager / participant / plan funding" | NDIS → `02-quote-callout.md` or `03-quote-project.md` (with NDIS compliance gate) |
| "Window cleaner / carpet steam / oven only / pressure wash / gutter / one specific service" | SPECIALTY → `02-quote-callout.md` (SPECIALTY sub-flow) |
| "Flood / sewage on the floor / something just spilled / urgent / can someone come now" | URGENT → `08-emergency-247.md` |
| "Anything in BUSINESS CONFIG → Services you DON'T do (incl. mould, biohazard, asbestos)" | DECLINE politely + suggest specialist |

If outside service area → confirm the address, decline politely
with a suggestion of a competitor in their area (good karma,
small world — they'll send you the next out-of-area job).

## The compliance gate

If the message mentions NDIS, aged care, working in family homes
with kids, school, or care facility, check BUSINESS CONFIG →
Compliance clearances:

- **AU NDIS:** must have NDIS Worker Screening Check + NDIS
  Worker Orientation Module. If either missing → decline NDIS
  portion, refer to NDIS-registered cleaner.
- **AU family homes with kids:** WWCC required in some states for
  in-home services with children present. If missing in a
  WWCC-required state → flag the operator and decline that visit
  pattern, or recommend visits when kids aren't home.
- **UK care homes / schools / similar vulnerable settings:**
  Enhanced DBS + vulnerable sector required. If missing →
  decline.
- **CA vulnerable populations:** vulnerable sector check
  required. If missing → decline.

If the operator is not cleared, the cert can't be issued — the
work must be sub-contracted to a cleared cleaner. Same logic as
gas ticket in the plumber bundle.

## Reply template — keep it under 60 words

The first reply does three things and three things only:

1. **Acknowledge what they need** (paraphrase so they know you
   read it)
2. **Ask the one missing fact** (address, bed count, date,
   photos, NDIS plan type, etc.)
3. **Set a clear next step** ("I'll get you a quote within 30
   minutes of that detail")

```
G'day [name] — sounds like [their issue, paraphrased — e.g.
"3-bed unit bond clean for Friday in [suburb]"]. To get you a
sharp quote, can you [missing fact — e.g. "tell me roughly how
many bedrooms + bathrooms and whether you need carpet steam
clean too? Most landlords require it for bond return"]? I'll
send a quote and a time window straight back.

— [your name], [Business name]
```

For STR hosts, skip ahead — they usually know exactly what they
want:

```
Hi [name] — got it, [N-bed] turnover on [date]. To lock in our
turnover crew, can you confirm:
- Address + lockbox / smart-lock code / key location
- Check-out time + check-in time (so we know the window)
- Linen supply (you provide on-site? we collect from laundry?)
- Restock items list (coffee pods, paper, etc.)?

I'll come back with a quote + crew assignment.

— [your name], [Business name]
```

For commercial inquiries (offices / shops / gyms), the questions
are different — site visit usually required:

```
Hi [name] — happy to quote a nightly / weekly clean for
[business type]. Couple of quick questions before a site visit:
- Square metres (roughly)
- Number of WCs + kitchens
- After-hours access OK? (alarm code / key holder?)
- Existing cleaner? (transitioning or new contract?)
- Frequency you're after (daily / weekly / twice-weekly)

I'll come walk through the site this week, then quote.

— [your name]
```

## Common missing facts to ask for

- **Address** (always, every time, unless they've already given
  it)
- **Photos** of the property (for bond cleans — landlord
  agent photos, prior inspection photos, current condition. For
  post-build — interior, for deep — kitchen + bathrooms first)
- **Bedroom + bathroom count** (drives bond clean and deep
  clean quotes more than anything)
- **Furnished or unfurnished?** (bond cleans on furnished are
  faster)
- **Smoker?** (bond cleans on smoker properties are 2× the time
  and chems)
- **Pets?** (lifts time + chems for residential — pet hair, smell
  treatment, separate vac kit)
- **Date / window** ("Friday / this week / flexible")
- **Lease end date** (for bond cleans — gives drop-dead deadline)
- **Property manager / agent** (which agent — some are notoriously
  picky)
- **Carpet?** (do you need steam clean too — bond requirement)
- **Existing cleaner** (transitioning or new contract — for
  recurring)
- **Frequency** (one-off / weekly / fortnightly / monthly — for
  recurring sells)
- **Phone number** (if they wrote in via form / email, get a
  mobile for on-the-way SMS)
- **NDIS plan type** (NDIA-managed / plan-managed / self-managed
  — drives invoicing)
- **Access** (lockbox code, smart-lock, key under mat, owner
  present, neighbour holds key)

Never ask more than TWO missing facts at a time. If you need
five facts, ask the highest-priority two first, then the next
two after they reply. Bond clean Friday → "bed/bath count +
carpet steam needed?" beats "what brand is your oven?".

## Bond clean specific intake

Bond cleans need extra detail because the customer's bond
deposit is on the line. Ask:

```
For the bond clean, a few more quick questions so I can quote
sharp:

1. Bed count + bath count + roughly when the lease ends?
2. Any carpet — and does the landlord require steam clean as
   part of the bond return? (Most do.)
3. Smoker / non-smoker property? (Smokers take 2× the time, fair
   to know upfront.)
4. Pets? (Same — pet hair adds time + chems.)
5. Property manager / agent name? (Some agents are pickier than
   others — I'll plan accordingly.)
6. Any photos of the current state? Even one of the kitchen +
   bathroom helps massively.

Once I have those, I'll quote with our 72-hour bond guarantee
included — if the agent flags anything, we come back free within
72 hours and re-clean.

— [your name]
```

The "72-hour bond guarantee" line converts. Lead with it.

## STR turnover specific intake

```
Hi [name] — confirming the turnover details:

- Property address + access (lockbox code / smart-lock / key
  spot)
- Bed count + bath count
- Standard turnover OR deep (between long stays)?
- Linen supply: do you keep linens on-site or do we collect /
  laundry?
- Restock list: what guest amenities go in every turnover?
  (coffee, tea, sugar, paper, soap, shampoo, etc.)
- Check-out time + check-in time (turnover window)
- Photo evidence: do you want a photo pack sent to your inbox
  after every turn? (Most hosts say yes — protects you on guest
  damage disputes.)

Once confirmed I'll book the crew in and lock in a per-turnover
rate. If you do >4 turns/month I'll quote a per-turnover
contract rate.

— [your name]
```

## NDIS-specific intake

```
Hi [name] — happy to help. Quick NDIS-specific questions:

- Is the participant NDIA-managed, plan-managed, or
  self-managed? (Drives how we invoice.)
- If plan-managed, who's the plan manager + their billing email?
- What's the funded support category? (Most home cleans go under
  "Assistance with Daily Life" or "Household Tasks" depending
  on the plan.)
- How many hours per week / fortnight does the plan fund for
  cleaning?
- Any specific risks or accommodations the participant has flagged?
  (Sensory — chem choice; mobility — work-around equipment; etc.)
- Anyone else in the household / on the plan we should be aware of?

I'll come back with a quote that fits the plan + a service
agreement we can lodge with your plan manager.

— [your name]
[NDIS Worker Screening # X — confirms cleared]
```

## Out-of-area decline

If the address is more than `BUSINESS CONFIG → service area +
travel` away:

```
Thanks [name] — unfortunately that's just outside our service
area. I'd recommend [competitor name or "a cleaner in your area
via Airtasker / Hipages / Bark / Thumbtack / your local Facebook
group"]. If you can't find anyone, write back and we'll see if
we can fit you in with a travel surcharge.

— [your name]
```

## Outside-our-trade decline

If the job is in BUSINESS CONFIG → "Services you DON'T do":

```
Thanks [name] — that one's actually outside what we do (we don't
do [the thing] — usually because [honest reason: "mould
remediation needs an IICRC mould cert and specialist gear" /
"crime scene / biohazard goes to specialist trauma cleaners by
law in most states" / "asbestos is licensed removal only"]).

Best bet is [suggest who, if you know — e.g. "[specialist
business] do these and we refer to them often"].

— [your name]
```

## Save the lead in context

Every triaged lead, save in conversation context as:

```
LEAD #<n> — <timestamp>
Customer:    <name>, <phone>, <email>
Address:     <full>
Type:        <bond | deep | move-in | post-build | recurring-residential |
              commercial | str-turnover | ndis | specialty | declined>
Sub-detail:  <bed count, sqm, frequency, etc.>
Urgency:     <today | this week | scheduled date | flexible>
Job summary: <one line — e.g. "3-bed unit bond clean,
              Friday, Surry Hills, carpet steam yes">
Source:      <SMS | email | form | GBP message | Airtasker | Hipages |
              Bark | Thumbtack | TaskRabbit | referral>
Compliance gate: <NDIS clearance reqd Y/N — held Y/N>
                <WWCC reqd Y/N — held Y/N>
                <DBS reqd Y/N — held Y/N>
Next skill:  <02 | 03 | 04 | 08 | declined>
```

The weekly report (`12-weekly-report.md`) reads these to compute
conversion rates by source.

## Done condition

You're done with this skill when:
- The lead is classified
- The address + missing facts are captured (or the customer was
  asked for them)
- Compliance gate is checked
- The next skill is loaded

When done, say:
> *"Lead captured: [one-line summary]. Loading [next skill]."*

Then load the next skill.
