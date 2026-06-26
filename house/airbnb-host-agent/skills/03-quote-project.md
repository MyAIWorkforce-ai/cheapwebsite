---
name: airbnb-long-stay-quote
description: Quote 28+ night stays (MTR pivot) and corporate block bookings (sales teams, film crews, relocations). Different tax + insurance + cadence regime from short-stay — monthly housekeeping, included utilities, security bond, staged invoicing, and tenancy-law alertness. Always insist on a video walk-through call before confirming anything 60+ days. Surface to operator before commit — these are the bookings that fund the year or burn the year.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Long-stay quote — MTR pivot + corporate blocks

## Your job

Read the qualified inquiry. Decide whether it's an MTR (mid-term
rental, 28+ nights, individual or couple) or a corporate block
(sales team, film crew, relocation, insurance housing — multiple
guests on a company invoice). Then build an itemised quote the
guest's procurement team or relocations manager can actually approve.

These bookings fund the off-season. They also can sink you if the
wrong guest gets in for 90 days. Take them seriously.

## MTR vs corporate block — the split

| Signal | Class |
|---|---|
| 28-89 nights, individual / couple / small family, paid per-channel or direct | **MTR** — solo / couple / remote worker / sabbatical / between-houses / medical stay |
| 28+ nights, 3+ guests in a team configuration, company contact, "purchase order" / "invoice required" / "procurement" | **CORPORATE BLOCK** |
| 30+ nights, film / TV production crew, agent or production manager booking | **CORPORATE BLOCK** (film) — usually higher rate, more wear-and-tear |
| 30-180 nights, insurance company / displaced family (fire, flood, renovation) | **CORPORATE BLOCK** (insurance housing) — slower paperwork, reliable payer |
| 30-180 nights, relocation agency (Cartus, SIRVA, Crown, AIRINC, BGRS) | **CORPORATE BLOCK** (relocation) — strict terms, slow pay, high standards |

## The tax + insurance + tenancy pivot — flag at 28-30 nights

A short-term stay becoming a long-term stay isn't just a longer
stay. It crosses lines:

- **AU (NSW)**: 21+ consecutive nights is often considered residential
  tenancy under the Residential Tenancies Act; once you cross, the
  rules change (notice periods, bond rules, bond-board lodgement).
  Many hosts cap at 21 or 27 to stay short-term. Confirm with the
  operator and BUSINESS CONFIG.
- **AU (VIC)**: STRA 7.5% levy (from Jan 2025) applies to stays under
  28 days. Stays 28+ may be out of STRA levy but in residential
  tenancy under the Residential Tenancies Act 1997.
- **UK**: Stays over 28 days are often outside the FHL (Furnished
  Holiday Lettings) regime — and the FHL regime is being abolished
  in April 2025 anyway, so this matters less going forward. But
  long lets can flip into Assured Shorthold Tenancy territory in
  England; Scotland's PRT (Private Residential Tenancy) under the
  2016 Act kicks in. Insurance often distinguishes <31 vs 31+.
- **US**: State-by-state. NYC LL18 doesn't apply to 30+ day stays
  (which is the workaround many hosts use — non-hosted illegal at
  <30, legal at 30+). LA has similar carve-outs. Many state landlord-
  tenant laws apply once a guest hits 30+ days.
- **CA**: BC's Bill 35 (Short-Term Rental Accommodations Act, May
  2024) defines short-term as <90 nights; 90+ falls outside but
  Residential Tenancy Act may apply once habitual residence is
  established. Quebec / Montreal CITQ regime is similar.

**Surface to operator on any 28+ inquiry:**

> *"Inquiry is [N nights]. At this length, [residential tenancy /
> PRT / state landlord-tenant law / FHL boundary] may apply. Do
> you want me to (a) quote at MTR rate with standard STR terms and
> a clause limiting the stay to less than [the tenancy trigger]
> nights, (b) quote at MTR with a separate lodging agreement, or
> (c) decline and route them to a serviced-apartment provider?"*

The agent does not give legal advice. It flags the boundary and
escalates the operator's decision.

## Insurance pivot

Most STR insurers distinguish stays <30 vs 30+:

- **Proper (US)**: separate STR vs MTR coverage; some policies cap
  stay length
- **Pikl (UK)**: short-let policy typically up to 31 days; over that
  may need separate lodging insurance
- **Sharemaster (AU)**: STR liability up to 90 days typically; over
  that, residential landlord cover
- **Square One (CA)**: STR rider up to 30 days; over that, landlord
  policy

**Always check BUSINESS CONFIG → STR insurance policy and confirm
the max stay length covered.** If the quote would exceed it, surface
to operator before confirming.

## Insist on a video walk-through call before confirming

Always require a video walk-through (Zoom / Google Meet / WhatsApp
video, 15-20 min) before confirming any stay 60+ nights, or any
corporate block. Reasons:

- The guest sees the place + you see them — fewer "the photos lied"
  disputes 30 days in
- You can show the working space (desk, monitor, power, second
  screen) and the kitchen + laundry — critical for MTR guests
- The guest mentions any accessibility / pet / kid / equipment needs
  in conversation
- For corporate blocks, the company contact tours the place with you
  + asks the questions their guests will ask
- You read the energy — sketchy bookings reveal themselves on a
  video call long before they reveal themselves at check-in

Skip the call only if:
- The guest is a repeat direct guest with prior stay history
- The corporate contact is a known relocation agency you've worked
  with before (Cartus, SIRVA, etc.)

## Pricing structure — MTR

MTR rate is a different animal from nightly rate. The right way:

```
Inputs (from BUSINESS CONFIG):
  Base nightly:          $185
  28+ discount tier:     25% off base
  Cleaning fee:          $95 (per turnover — applied once for entry, mid-stay deep clean billed separately)
  Utilities:             included (standard for MTR — guests expect it)
  Wifi:                  included (always)
  Weekly housekeeping:   included or charged? (BUSINESS CONFIG)
  Mid-stay deep clean:   one at ~ 28 days, included or extra?

Pricing example: 60-night stay
  Nightly base:          $185
  28+ discount applied:  $185 × 0.75 = $138.75/night
  Subtotal nights:       $138.75 × 60 = $8,325
  Entry cleaning:        $95
  Weekly housekeeping:   included
  Mid-stay deep clean:   $130 (1 mid-stay clean at the 30-night mark)
  Utilities (incl):      $0 to guest (typically $80-180/month built into the rate)
  Wifi:                  $0
  Pre-tax total:         $8,550
  Lodging tax:           varies — check whether channel auto-collects at 28+
                         (Airbnb DOES at 28+ in some jurisdictions, doesn't
                          in others — confirm in your dashboard)
  Total:                 $8,550 (+ tax if separately collected)

  Effective monthly:     ~$4,275/month
  Effective ADR:         $142.50/night
```

Sanity check vs the alternative (full nightly × 60 with no discount):
$185 × 60 + $95 cleaning = $11,195. The MTR discount saves the guest
$2,645, but you save 5+ turnovers worth of cleaning labour + linen
wear, you have predictable revenue for 2 months, and you don't pay
channel fees on each new stay.

## Pricing structure — corporate block

Corporate blocks need a quote format the procurement team can paste
into their PO system. Itemise hard:

```
SCOPE — [Company name], [N guests], [N nights], [property name]

Inputs:
  Base nightly:          $185
  Corporate rate:        $145/night (negotiated — sits between MTR and standard)
  Number of guests:      6 (team)
  Stay length:           30 nights (Mar 5 → Apr 4)
  Configuration:         Whole house — 4 BR / 3 bath / sleeps 8

Pricing:
  Nightly rate × nights: $145 × 30 = $4,350
  Extra guest fee:       2 guests over standard 4: $25 × 2 × 30 = $1,500
  Entry cleaning:        $150 (heavier setup for team stay)
  Weekly housekeeping:   $80/visit × 4 visits = $320
  Mid-stay deep clean:   $130
  Utilities cap:         $250 included (overage at cost if exceeded — meter-read at start + end)
  Wifi (300+ Mbps):      included
  Linen rotation:        included weekly
  Consumables:           $120 (coffee, tea, soap, paper, dishwasher tabs — restocked weekly)
  Subtotal:              $6,820
  Lodging tax:           $X (state + city)
  Pre-tax:               $6,820
  GST/VAT (if billed):   $X
  TOTAL:                 $X (one invoice or staged — see Payment Terms)

Payment terms (corporate):
  50% deposit on PO acceptance — secures dates
  Balance invoiced day of arrival, Net 14
  Security bond: $1,500 held (refunded within 7 days of checkout, minus damages)
  Cancellation: 60+ days = 10% retained / 30-60 days = 50% / <30 days = 100%
```

Always include the security bond line for corporate blocks. Sales
teams break things. Film crews break MORE things.

## When you can quote vs when you need a walk-through

| Stay length | Walk-through call required? |
|---|---|
| 28-44 nights, MTR, individual / couple | Optional — strongly recommend |
| 45-59 nights, MTR | Strongly recommend |
| 60+ nights, MTR | **Required** |
| Any corporate block | **Required** |
| Film / TV crew | **Required** + lock down security bond + production insurance certificate |
| Insurance housing (displaced family) | **Required** + verify insurance company's letter of guarantee |
| Relocation agency repeat client | Optional |

## The quote — structured in 5 sections

Long-stay quotes always go by email (corporate blocks may also need
a PDF — generate from this email body if asked):

```
Subject: Long-stay proposal — [property] — [dates]

Hi [first name],

Proposal for your stay at [property name] from [arrival] to
[departure] — [N nights / approx N months].

1. SCOPE
- Whole [house / apartment]: [bedrooms / beds / bathrooms]
- Sleeps [N] (your party: [N])
- Working desk + monitor + wired ethernet (300+ Mbps via [Eero mesh])
- Fully equipped kitchen (induction / gas hob, oven, dishwasher,
  full-size fridge)
- Laundry in-unit ([washer + dryer])
- Parking: [1 off-street spot in driveway / street parking — explain]
- Smart lock for self check-in (Igloohome / RemoteLock — code rotated
  per booking)
- Heating + cooling: [reverse-cycle / central HVAC / ducted gas]

2. MONTHLY RATE
- Base nightly: $185
- Mid-term discount (28+ nights): 25% off → $138.75/night
- Total nightly × nights: $138.75 × 60 = $8,325
- Effective monthly rate: ~$4,275/month

3. INCLUSIONS
- All utilities (electricity, gas, water) — included up to $250/month
  (overage billed at cost — typical usage is well within)
- Internet (Eero mesh, 300+ Mbps)
- Weekly housekeeping (1 cleaner visit per week — linen rotation,
  bathroom + kitchen reset, surface clean)
- Mid-stay deep clean at the 30-night mark (oven, fridge, bathrooms)
- Linen + bath towel set per guest, rotated weekly
- Consumables restock (coffee, tea, soap, dish tabs, paper) on the
  weekly visit
- 24/7 host contact for any issue ([host number])

4. PRICING BREAKDOWN
| Item                              | Amount      |
|---|---|
| Nightly × 60 (at MTR rate)        | $8,325.00   |
| Entry cleaning                    | $95.00      |
| Mid-stay deep clean (1)           | $130.00     |
| Weekly housekeeping (8 visits)    | included    |
| Utilities                         | included (cap $250/mo) |
| Wifi                              | included    |
| Linen rotation                    | included    |
| Consumables                       | included    |
| Pre-tax subtotal                  | $8,550.00   |
| Lodging tax                       | [auto via channel OR itemised here at state+city rate] |
| **Total**                         | **$X**      |

5. TERMS
- Stay length: [60 nights — does not exceed [residential tenancy /
  PRT / FHL] threshold per our standard letting agreement]
- Booking platform: [direct via Stripe / Airbnb-confirmed if booking
  via Airbnb — note Airbnb's MTR Aircover only covers up to a certain
  limit]
- Payment: 50% on confirmation, balance 14 days before arrival
  (or staged monthly for stays 90+ — see below)
- Security bond: $500 held via Stripe / channel (refunded within 7
  days of checkout)
- Cancellation: 60+ days out = full refund less 10% admin / 30-60
  days = 50% refund / <30 days = no refund (mitigated by re-let)
- Damages: at-cost replacement + 15% admin
- Pets: [allowed / not allowed] per BUSINESS CONFIG
- Smoking: strictly no, anywhere on the property
- No parties / events
- Maximum guests: [N as booked]
- Stay length is for [agreed dates only — extension by mutual agreement
  + re-quote, not assumed]

WHAT'S NOT INCLUDED
- Personal cleaning between weekly visits (yours to maintain)
- Long-distance phone calls / streaming subscriptions beyond what's
  set up (Netflix / Stan / Prime are configured to the property
  account — feel free to use)
- Anything that would push the stay into [residential tenancy / PRT]
  territory under [region's] law — happy to clarify if you have
  questions about the agreement structure
- Pet-related cleaning if pets approved (separate pet fee + bond)

WHAT'S INCLUDED THAT OTHER MTR LISTINGS DON'T
- Mid-stay deep clean at no extra cost
- Linen + towels rotated weekly
- 24/7 host (not just a property manager who picks up Monday to
  Friday)
- Local-knowledge guide (best coffee, grocery, gym, doctor) on
  arrival

Available for a 15-min video walk-through this week if useful before
you commit — [Zoom / Google Meet / WhatsApp video, your call].

Reply "go ahead" and I'll send the booking link + initial invoice.

Thanks,
[host name]
[Business name]
[STR registration #]
[Insurance: [STR carrier] policy #X]
```

## Staged payment terms for corporate blocks (>$10k)

For any quote total over $10k, stage the payments. Cashflow-friendly
for the guest, risk-managed for you:

```
- 25% deposit on PO acceptance — locks dates
- 25% on arrival day
- 25% at the midpoint (or end of month 1 for 60-day stays)
- 25% at the start of the final week
- Security bond ($X) held separately, refunded 7 days post-checkout
```

For relocation agencies (Cartus, SIRVA, AIRINC, etc.) — they pay
on their own terms (often Net 30 or Net 45). Quote them firmly but
expect:
- Their PO format, not yours
- Their cancellation rights (often more generous than your standard)
- Their inspection requirements (some agencies want their own
  pre-arrival inspection — accommodate)
- Slower pay but lower risk of default

## Hard rules — auto-rewrite if violated

- **Itemise inclusions explicitly.** "All inclusive" is a red flag
  to procurement teams. Show what's in.
- **Show the effective monthly rate** alongside the total. Corporate
  guests think in months; helping them see the monthly makes the
  number easier to compare to corporate housing alternatives
  (Blueground, Furnished Finder, Sonder, Mint House).
- **Always include the tenancy boundary flag** if the stay crosses
  the regional threshold. Don't hide it; it protects both sides.
- **Always include a security bond** for stays 60+ nights or for
  corporate blocks. Standard is $500-$1,500 depending on property
  value.
- **Always include the cancellation policy** explicitly in the
  email body, not just a footnote.
- **Always include the "what's not included" section.** This is the
  line that protects you from scope creep — "the team also needs
  weekend airport runs" / "we'd like to swap out the artwork".
- **Always specify the insurance carrier + STR registration** at the
  bottom of corporate quotes. Procurement teams check.
- **Always offer the video walk-through** for 60+ nights / any
  corporate block. Required, not optional.
- **Never confirm a 28+ stay without surfacing the tenancy boundary
  flag to the operator.** Operator decides whether to accept; agent
  flags.
- **Never quote below BUSINESS CONFIG → min rate** even at MTR
  discount. If MTR math takes you below min, raise the floor in
  your discount tier — your config needs adjusting.
- **Banned phrases** from BUSINESS CONFIG → silent rewrite.

## Furnished Finder / Blueground / Sonder context

If the guest is comparing to:

- **Furnished Finder** — the dominant MTR marketplace in the US,
  free to guests, hosts pay. Tends to attract travel nurses (10-13
  week assignments), travelling professionals, and insurance
  housing. Lower fees than Airbnb but slower bookings.
- **Blueground** — corporate furnished apartments, premium tier,
  monthly rates. If the guest compares your rate to Blueground in
  the same neighbourhood, you should typically be 20-30% sharper
  (they're branded, you're independent).
- **Sonder / Mint House** — aparthotel chains. Compare on amenities
  + clean handover, not just price.
- **Long-term unfurnished** — if the guest is comparing to renting
  unfurnished for 6 months, you can't compete on price-per-night,
  but you win on (a) no lease, no bond board, no setup, (b)
  utilities + wifi + housekeeping all included, (c) flexible end
  date.

Position accordingly in your email.

## Reading the learnings.md before quoting

Open `learnings.md`. If:

- The property has the **MTR-strong** flag → quote confidently at
  the MTR tier; this is the property's sweet spot.
- The property has the **MTR-weak** flag (wear-and-tear issues,
  noise issues, inadequate workspace) → upgrade the workspace first
  before quoting; or decline politely and route them elsewhere.
- The corporate guest's company is in the **slow-pay** column →
  tighten terms: 50% on PO, balance 7 days before arrival, no Net
  terms. (Some film production companies are notorious for this.)
- The corporate guest's company is in the **repeat-client** column
  → proactively offer the same property + similar terms; this is
  retention gold.
- The dates overlap a peak event period → check whether MTR discount
  still applies (some hosts cap MTR discount during peak — say so
  per BUSINESS CONFIG).
- A previous MTR guest at this property left a low review citing
  workspace / wifi / kitchen issues → flag the open issue + plan
  to address before the new guest arrives.

## Outputting the internal record

For each long-stay quote, save in context:

```
QUOTE #<n> — <timestamp local TZ>
Lead:               LEAD #<n>
Property:           <internal name>
Stay class:         <MTR-individual | MTR-couple | corporate-team |
                     corporate-film | corporate-insurance | corporate-relocation>
Channel:            <Airbnb 28+ | VRBO | Furnished Finder | Direct | Relocation agency>
Dates:              <DD MMM - DD MMM YYYY> (<N nights / N months>)
Guests:             <count>
Walk-through call:  <required | scheduled DD/MM | done | waived (reason)>
Tenancy flag:       <below threshold | at threshold — surfaced | above — surfaced>
Insurance fit:      <within STR policy | exceeds — surfaced>
Nightly base:       $<X>
MTR discount %:     <X>
Nightly used:       $<X>
Inclusions:         <utilities, wifi, weekly housekeeping, mid-stay deep clean>
Pre-tax subtotal:   $<X>
Security bond:      $<X>
Lodging tax:        <auto via channel | itemised | tax-exempt at this length>
TOTAL:              $<X>
Effective monthly:  $<X>/mo
Effective ADR:      $<X>/night
Payment terms:      <50/50 | 25/25/25/25 | per relocation agency PO terms>
Operator sign-off:  <pending | given DD/MM> (REQUIRED before sending)
Status:             <draft | sent | accepted | walk-through booked | declined>
```

## Confirm + handoff — ALWAYS wait for operator sign-off

Tell the operator:

> *"Long-stay quote drafted: $[X] for [property, dates, N nights /
> N months]. Stay class: [MTR / corporate]. Tenancy boundary flag:
> [below / at / above]. Walk-through: [required / scheduled].
> Review before sending? This goes out by email + you should
> read every line."*

**Never send a long-stay quote without operator review.** These
quotes are the contract; a typo in inclusions or a wrong cancellation
clause can cost $5k+ to unwind. The agent drafts; the operator sends.

Once accepted:
- Schedule the walk-through call if not done
- Generate the deposit invoice via `06-invoice-payment.md`
- Block the calendar across all channels (channel manager job)
- Add to the recurring-maintenance schedule via `09-recurring-
  maintenance.md` (mid-stay deep clean + weekly housekeeping)
- Hand off the pre-arrival sequence to `04-dispatch.md`

For corporate blocks specifically: confirm the security bond is
collected before arrival, not after. Cleanup of bond claims post-stay
is messy; collecting upfront is the only protection that works.
