---
name: airbnb-rate-quote
description: Quote a nightly rate for standard stays (1-27 nights). Read BUSINESS CONFIG per property + dynamic-pricing tool output (PriceLabs / Beyond / Wheelhouse) + length-of-stay discount tiers. Quote direct-booking customers off-platform with a sharper rate; respect Airbnb's no-off-platform rule for inquiries that came via Airbnb. Stay between min and max — never quote below the floor, never above the cap without operator override.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Rate quote — nightly rate decisioning

## Your job

Read the qualified inquiry from intake. Generate a clear nightly
rate quote within minutes (Superhost cadence — under 1hr is the
target). Send it back via the channel the guest used — unless it's
a direct off-platform inquiry, in which case you can sharpen the rate.

Three decisions to make:

1. **Which rate base?** PriceLabs / Beyond / Wheelhouse output, or
   the BUSINESS CONFIG base, or a seasonal multiplier? Never below
   min, never above max without operator override.
2. **Which length-of-stay tier?** 1-6 nights base / 7+ discount /
   14+ deeper discount / 27 nights but holding short of MTR (28+
   routes to skill 03)
3. **Direct or channel?** If the guest came in via Airbnb / Booking,
   you're effectively confirming the channel-rate (or asking the
   operator to override). If the guest came direct, you can quote
   sharper because there's no host fee.

## When to use this skill

- 1-27 night stays (28+ → `03-quote-project.md`)
- Standard single-property single-stay
- Both channel inquiries (where the channel rate is already shown
  but the guest is asking — confirm + answer their question) AND
  direct inquiries (where you generate the quote from scratch)
- Repeat-guest direct booking ("hey, can we come back end of June?")

Use `03-quote-project.md` instead if:

- Stay is 28+ nights (MTR pivot — different tax + insurance + cadence)
- Corporate block / sales team / film crew / relocation
- Multiple properties block-booked together
- Wedding / event hire (some hosts do, most don't — surface to
  operator)

## Reading the dynamic pricing tool

If BUSINESS CONFIG → Dynamic pricing tool is set:

| Tool | What you read | Quirk |
|---|---|---|
| **PriceLabs** | Per-night recommended rate from the calendar export / API | Their base + market-adjusted; tends to drift high in low-demand patches — check vs. occupancy |
| **Beyond Pricing** | Per-night dynamic price | More conservative than PriceLabs; smoother across the calendar |
| **Wheelhouse** | Per-night recommendation | Strong on weekly seasonality but less event-aware |
| **AirDNA Rentalizer** | Market median, not your listing — use only as a sanity check |
| **Manual** | Apply BUSINESS CONFIG → seasonal multipliers + event surge by hand |

**The agent never quotes below BUSINESS CONFIG → min rate.** If
PriceLabs spits out $115 and your min is $135, you quote $135 and
flag the gap in the weekly report (the tool may need a base-price
reset).

**The agent never quotes above BUSINESS CONFIG → max rate without
operator confirm.** Even on a Hobart Dark Mofo Saturday night, if
your max is $385 and PriceLabs says $510, you surface to operator:
*"PriceLabs is recommending $510 for [date] — that's $125 above the
max. Approve the override?"*

## Length-of-stay discount calculator (show working)

Read BUSINESS CONFIG → Length-of-stay discount tiers. Typical
configuration:

| Length | Typical discount | Why |
|---|---|---|
| 1-6 nights | 0% (base rate) | Standard turnover cadence |
| 7-13 nights | 8-12% | One turnover saved across the week |
| 14-27 nights | 15-20% | Two turnovers saved; lower wear |
| 28+ nights | Routes to MTR — see skill 03 | Different tax + cadence regime |

### Working example: 10-night stay, Battery Point Cottage

```
Inputs (from BUSINESS CONFIG):
  Base nightly:        $185
  Cleaning fee:        $95
  7+ night discount:   10%
  Min rate:            $135 (floor — agent never quotes below)

Inputs (from PriceLabs for these dates):
  Dynamic rate:        $205 (above base — late autumn premium)

Calculation:
  Nightly used:        $205 (dynamic > base, both above min)
  Nights:              10
  Subtotal:            $205 × 10 = $2,050
  Length discount:     10% off subtotal = -$205
  Subtotal after:      $1,845
  Cleaning:            $95
  Pre-tax total:       $1,940
  Lodging tax:         (auto via channel where reg'd — confirm in BUSINESS CONFIG)
  ADR after discount:  $184.50/night

Sanity check:          ADR $184.50 ≥ min $135 ✓ (clear of floor)
                       ADR $184.50 ≤ max $385 ✓ (under cap)
```

Show this working in your internal record so the operator can verify.
Don't show it to the guest — they see the headline total + nightly.

## Seasonal premium — the seasonal multiplier

If BUSINESS CONFIG → seasonal multipliers are set, apply on top of
the base:

| Example | Multiplier |
|---|---|
| Peak (Dec-Feb in AU coastal, Jul-Aug in northern hemisphere) | +25% on base |
| Shoulder (Mar / Oct AU, Apr / Sep northern) | +10% |
| Low (May-Aug AU, Nov-Feb northern non-ski) | base |
| Ski peak (Jul-Sep in AU alpine, Dec-Mar northern alpine) | +30-50% |

The PriceLabs / Beyond rate usually has these baked in. If you're
quoting manually (no tool), apply the multiplier explicitly.

## Last-minute fill logic

If the dates are within 7 days of today AND the calendar shows
empty:

- Check BUSINESS CONFIG → last-minute discount (typically 10%)
- Apply to the dynamic rate (or base) — but **never go below the
  min rate**
- This is the one case where the agent can sharpen without operator
  confirm — that empty night is a $0 night otherwise

Surface to operator only if applying last-minute would mean dropping
below min.

## Event-driven surge

If the dates overlap a local event in BUSINESS CONFIG → event surge
list, apply the surge multiplier:

| Event examples | Typical surge |
|---|---|
| Hobart Dark Mofo (Jun) | +60-100% |
| Edinburgh Fringe (Aug) | +80-150% |
| Melbourne F1 / Albert Park GP | +50-80% |
| SXSW Austin | +100-200% |
| Coachella weekend (Indio) | +200%+ |
| New Year's Eve everywhere | +50-100% |
| Major sporting final / playoffs in host city | +50-100% |
| Regional wine festivals, music festivals | +30-60% |
| Conference week in the listing's city | +20-40% |

If the dynamic tool already shows event surge baked in, you're done.
If you're manual, apply the multiplier — and check vs. max.

## Direct-booking quote vs channel-rate confirm

### If inquiry came via Airbnb / Booking / Stayz / VRBO

- **Don't quote off-platform.** Airbnb in particular explicitly
  prohibits steering guests off-platform until they've booked.
  Booking.com penalises the same. Stayz / VRBO is slightly more
  permissive but still considered bad form pre-booking.
- The channel already shows the guest the nightly rate. Your job is
  to confirm + answer their question + nudge them to book.
- If the operator wants to override the channel-shown rate (e.g.
  PriceLabs surged it too high for what this guest will pay), the
  override is done in the channel dashboard — NOT in the message
  thread.

Reply template:

```
Hi [first name] — yes, [4 nights Mar 12-16] is all open. The rate
you're seeing on the listing is what we'd charge. Hit "Reserve" when
you're ready and you'll get the door code + check-in details a few
days out.

— [host first name]
```

### If inquiry came direct (direct site / SMS / email / repeat guest / referral)

- Off-platform is fine — they came to you direct.
- Sharper rate is fine — no host fee (Airbnb's 15% host-only fee
  isn't in the equation; Stripe is ~2.9% + 30¢ instead).
- This is where you build the repeat-guest book — direct guests
  who get a sharp rate the second time come back the third time.

Reply template (SMS, under 320 chars):

```
Hi [first name] — [Battery Point Cottage] is open [Mar 12-16, 4
nights]. Direct rate $945 all-in (incl cleaning), works out
$236/night — about $40/night under Airbnb. Reply YES + I'll send
the booking link, deposit's 30%.

— [host name]
```

Reply template (email — longer is fine):

```
Subject: [Battery Point Cottage] — [Mar 12-16] direct quote

Hi [first name],

Confirming [Battery Point Cottage] is open [Mar 12-16] for [4
nights]. Direct-booking rate:

| Item                           | Amount    |
|---|---|
| Nightly rate                   | $205 × 4  |
| Subtotal                       | $820      |
| Cleaning fee                   | $95       |
| Pre-tax total                  | $915      |
| Lodging tax (incl)             | included  |
| **Total**                      | **$915**  |
| ADR                            | $228.75   |

That's around $40/night sharper than the Airbnb rate — direct booking
saves you the channel fee and gets you straight onto our calendar.

To lock it in:
- 30% deposit on confirmation ($274.50) via Stripe
- Balance 14 days before check-in
- Cancellation: full refund 14 days out, 50% 7-14 days, no refund <7

Reply "go ahead" and I'll send the Stripe link.

Thanks,
[host name]
[Business name]
```

### Off-platform caveat — say it once explicitly

If the guest came via Airbnb and asks for your direct contact, the
correct response is to keep it on the platform until they've booked:

```
Hi [first name] — happy to chat directly once you're booked. For
now, easiest is to hit "Reserve" on the Airbnb listing and I'll
send through wifi + check-in straight after. Anything else you need
to know about the place to make the call?

— [host first name]
```

If they push back, surface to operator — don't violate the platform
rule unilaterally. Operator can choose to take the risk; the agent
doesn't.

## Customer-facing send templates

### Airbnb / VRBO / Booking — confirming a channel-rate inquiry (under 80 words)

```
Hi [first name] — yes, [Mar 12-16] is all open, sleeps [4 across 1
K + 2 S]. Rate on the listing is what we'd charge — works out
[$945] for the [4 nights] incl cleaning. Hit "Reserve" when you're
ready, I'll send door code + wifi a couple days before.

Anything else you need to know before locking it in?

— [host first name]
```

### Direct SMS (under 320 chars)

```
Hi [first name] — [property] open [dates, N nights]. Direct rate
[$total] all-in (incl cleaning), [$ADR]/night. About [$X] under
Airbnb. Reply YES + I'll send the booking link, deposit 30%.

— [host name]
```

### Direct email (longer is fine)

```
Subject: [property] — [dates] direct quote

Hi [first name],

[Property] is open [dates] for [N nights]. Direct-booking rate:

| Item                | Amount    |
|---|---|
| Nightly rate        | $X × N    |
| Subtotal            | $X        |
| Length discount     | -$X (Y%)  |
| Cleaning fee        | $X        |
| Pre-tax total       | $X        |
| Lodging tax         | included  |
| **Total**           | **$X**    |
| ADR                 | $X        |

That's around [$X/night] sharper than the channel rate. Direct
booking goes straight onto our calendar and saves the platform fee.

To lock it in:
- 30% deposit on confirmation via Stripe
- Balance 14 days before check-in
- Cancellation: [per BUSINESS CONFIG → direct booking policy]

Reply "go ahead" and I'll send the Stripe link.

Thanks,
[host name]
[Business name]
```

## Hard rules — auto-rewrite if violated

- **Never quote below BUSINESS CONFIG → min rate.** Even if PriceLabs
  says so. Flag in weekly report — your floor may need a reset.
- **Never quote above BUSINESS CONFIG → max rate without operator
  override.** Surface and wait.
- **Never quote off-platform on an Airbnb / Booking / Stayz / VRBO
  inquiry pre-booking.** Confirm channel rate, keep them on the
  platform until they reserve.
- **Always show the nightly + the total + the cleaning fee
  explicitly.** Hidden cleaning is the #1 review complaint after
  cleanliness itself.
- **Always show the length-of-stay discount as a line item** when
  it applies. Guests notice it; they tell their friends.
- **Always show "incl tax" or "+ tax (X%)" explicitly.** Lodging tax
  silence is a checkout-flow killer.
- **Never auto-discount in an Airbnb inquiry.** That's a channel
  Special Offer flow — surface to operator if you want to send one.
- **No emoji** unless BUSINESS CONFIG voice asks for it.
- **Banned phrases** from BUSINESS CONFIG → silent rewrite.

## Reading the learnings.md before quoting

Open `learnings.md`. If:

- The property is in the **win — push** column for this week of year
  → quote confidently at the dynamic rate; don't auto-discount.
- The property is in the **hurting RevPAR** column → quote at the
  min floor + flag the property in the weekly report (you may need
  a listing refresh, photo update, or title rewrite via `10-leadgen`).
- The channel is in the **weak channel mix** column for this property
  (e.g. Booking is sending you party guests) → tighten the screening
  + raise the security deposit on Booking inquiries.
- The current week is in the **dynamic-pricing under-quoted** list
  → check the dynamic tool more carefully + consider a manual bump
  with operator sign-off.
- The guest is a **repeat direct guest** → apply the repeat-guest
  discount (typically 10%) per BUSINESS CONFIG.
- The guest's country / channel matches the **slow-pay** pattern
  → tighten direct-booking payment terms (full payment on
  confirmation, no 30/70 split).

## Outputting the internal record

For each quote sent, save in context:

```
QUOTE #<n> — <timestamp local TZ>
Lead:            LEAD #<n>
Property:        <internal name>
Channel:         <Airbnb | VRBO | Booking | Stayz | Direct | SMS | Email>
Stay class:      <standard 1-6 | extended 7-13 | extended 14-27>
Dates:           <DD-DD MMM YYYY> (<N nights>)
Guests:          <count>
Rate base:       <PriceLabs / Beyond / Wheelhouse / Manual / BUSINESS CONFIG base>
Nightly used:    $<X>
Length discount: <Y%>
Cleaning fee:    $<X>
Lodging tax:     <auto via channel | itemised on direct>
Total quoted:    $<X> all-in
ADR after disc:  $<X>
Floor check:     <ADR ≥ min ✓ | floor violated — surfaced>
Cap check:       <ADR ≤ max ✓ | cap exceeded — surfaced for override>
Off-platform:    <yes — direct/SMS/email | no — channel inquiry>
Status:          <awaiting reply | booked | declined | override-pending>
```

## Confirm + handoff

Tell the operator:

> *"Quote sent: [$total, $ADR/night] for [property, dates, N nights,
> N guests]. Channel: [X]. Floor + cap checks: [clean / flagged].
> Watching for reply — will load `04-dispatch.md` on confirmation."*

If reply doesn't come within 24 hours on an Airbnb inquiry, prompt
the operator to send a Special Offer (a channel-native nudge that's
better received than a chase message):

> *"24h on [LEAD #n] — want me to draft a Special Offer at [$X] for
> the operator to send via the Airbnb dashboard? Avoids the
> follow-up-message awkwardness."*

After two nudges, mark the lead as `lapsed` in the weekly report
and move on.
