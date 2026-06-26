---
name: airbnb-invoice-payment
description: Three modes. (1) Channel payout reconciliation — Airbnb 24h after check-in, Booking.com monthly, VRBO at booking; tracks fees + nets per property. (2) Direct booking invoice — Stripe hosted invoice URL, security deposit hold, lodging tax line. (3) Damage claims — Airbnb Resolution Center within 14 days of checkout, VRBO Damage Protection, Aircover evidence requirements (photo+timestamp+receipt+communication trail).
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: [stripe.invoice.create, stripe.paymentIntent.create]
---

# Channel payouts + direct invoicing + security deposits + damage claims

## Your job

Three jobs, depending on the booking channel:

1. **Channel payout reconciliation** — when Airbnb / VRBO /
   Booking.com pays out, verify the net matches expected per
   BUSINESS CONFIG rate × nights, minus channel fees, minus
   lodging tax auto-collected. Flag variances.
2. **Direct booking invoicing** — generate a Stripe invoice with
   hosted URL, place a security deposit authorization hold,
   reconcile after checkout (release or claim).
3. **Damage claims** — when something gets broken / stained /
   stolen, file via the right channel (Airbnb Resolution Center
   within 14 days, VRBO Damage Protection, Aircover) with the
   required evidence (photos with timestamps, receipts, comm
   trail).

Each mode has its own gotchas. The agent uses the right one based
on the booking source.

## Mode 1 — Channel payout reconciliation

### Per-channel payout mechanics

| Channel | When paid out | Fee model | Net to host |
|---|---|---|---|
| **Airbnb** | ~24 hours after guest check-in. Split-payout option (50% at check-in, 50% at midpoint of stay) for stays 28+ nights. | **Host-only fee: 15%** of subtotal (most hosts). Split-fee model (3% host + 14% guest) still available in some markets but Airbnb is pushing host-only. Currency conversion fee if currency mismatch. | Subtotal − 15% − lodging tax (auto-remitted in most US jurisdictions). Direct deposit to bank in 1-3 days from release. |
| **Booking.com** | Monthly (commission invoiced retrospectively — host pays Booking, not the other way). Booking.com Payments where enabled passes through guest payment to host. | **Commission 15-18%** depending on market + property level. Genius programme adds 5% (10% / 15% / 20% Genius levels). Preferred Partner +5%. | Subtotal − commission, paid out 15 days after stay end month if Booking.com Payments; otherwise host bills guest direct. |
| **VRBO / Stayz / Bookabach** | At booking (guest pays VRBO, VRBO pays host **after check-in**) with cancellation hold typical. Some markets pay 24h post-check-in. | **Pay-per-booking: ~5%** (8% with traveler fee model) OR **annual subscription $499/year** (no per-booking fee). | Subtotal − ~5%. Payments via VRBO Payments (Adyen-backed). |
| **Direct booking** | At booking (or per deposit schedule), via Stripe / Square. | **Stripe 2.9% + $0.30** (US); 1.7% + $0.30 (AU); 1.5% + 20p (UK); varies. No platform commission. | Subtotal − Stripe fee. |

### Reconciliation per booking

For every payout received, the agent reconciles:

```
PAYOUT RECONCILIATION — [property name] — booking [X]
=====================================================
Channel:                Airbnb
Booking ID:             HMABC123
Guest:                  [first name + last initial]
Stay dates:             [check-in] – [checkout] ([N] nights)
Expected per BUSINESS CONFIG:
  Base rate × nights:   $[X] × [N] = $[Y]
  Length-of-stay disc:  -$[Z] (if 7+/14+/28+)
  Cleaning fee:         $[A]
  Extra guest fee:      $[B]
  Subtotal expected:    $[T]
Channel deductions:
  Airbnb host fee 15%:  -$[F]
  Lodging tax (auto):   -$[L] (if applicable)
Net expected:           $[N_expected]
Net received:           $[N_received]
Variance:               $[N_received - N_expected]
Status:                 [MATCH / VARIANCE — investigate]
```

If variance > $1 — flag. Common causes:
- Guest currency mismatch + Airbnb conversion fee
- Last-minute price drop accepted via Smart Pricing not in
  BUSINESS CONFIG
- Co-host / cleaner payout deducted at source
- Refund issued mid-stay
- Lodging tax rate change

If variance is unexplained → surface to operator with the diff
breakdown.

### Net per booking after EVERYTHING

The agent surfaces the true net (revenue, not gross) per booking:

```
TRUE NET — booking [X]
=======================
Gross booking:          $[gross]
Less channel fee:       -$[fee]
Less lodging tax:       -$[tax]
Less cleaning cost:     -$[cleaner]  (from supplier invoice)
Less consumables:       -$[supplies] (estimated per BUSINESS CONFIG)
Less laundry:           -$[laundry]
Less utilities allocation: -$[util]   (period allocation)
Less commission to co-host: -$[co]    (if applicable)
NET PROFIT:             $[net]
NET PROFIT / NIGHT:     $[net]/[N] = $[per night]

For per-property revenue + RevPAR reporting in weekly summary.
```

This is the number that actually matters — gross ADR is vanity.

## Mode 2 — Direct booking invoice generation

Direct bookings are where the operator earns most margin (no
15-18% channel fee) and where invoicing falls on the host.

### When this mode runs

- Direct-booking site (Hostfully / OwnerRez / Lodgify / Hospitable
  direct widget / WordPress + plugin) takes a booking
- Operator manually accepts a direct inquiry off-platform (post-
  Airbnb-message, post-LinkedIn, repeat guest)
- Corporate / MTR / 28+ night stay (see `03-quote-project.md`)

### Invoice template

```
INVOICE — [Business / Trading name]
====================================
Invoice #:      INV-[YYYYMM]-[N]
Issued:         [date]
Due:            [Net 0 / Due on booking / per quote terms]

BILL TO
[Guest name]
[Guest billing address]
[Guest company / ABN / VAT if corporate booking]

STAY DETAILS
Property:               [property internal name]
Address:                [property address]
Check-in:               [date, time]
Check-out:              [date, time]
Nights:                 [N]
Guests:                 [G]

LINE ITEMS

| Item                                    | Qty  | Unit       | Total    |
|---|---|---|---|
| Accommodation — base rate × nights      | [N]  | $[rate]    | $[X]     |
| Length-of-stay discount [%]             |      |            | -$[Y]    |
| Cleaning fee                            | 1    | $[clean]   | $[clean] |
| Extra guest fee ([n] above [G_base])    | [Nx] | $[fee]     | $[Z]     |
| Pet fee (if applicable)                 | 1    | $[pet]     | $[pet]   |
| **Subtotal**                            |      |            | **$[ST]**|
| Lodging tax — [GST 10% / VAT 20% /      |      |            |          |
|   state TOT / GET + TAT etc.]           |      |            | $[tax]   |
| Security deposit (refundable hold)      | 1    | $[dep]     | $[dep]   |
| Less deposit paid [date]                |      |            | -$[paid] |
| **TOTAL DUE**                           |      |            | **$[T]** |

PAYMENT
Pay via Stripe (instant — covers card, Apple Pay, Google Pay):
[Stripe hosted_invoice_url]

Or EFT:
  BSB / Sort / Routing: [from BUSINESS CONFIG]
  Acct:                 [from BUSINESS CONFIG]
  Ref:                  INV-[YYYYMM]-[N]

SECURITY DEPOSIT
A $[X] refundable security deposit is held via Stripe authorization
for the duration of your stay + 5 days after checkout. No charge
unless a claim is made.

CANCELLATION POLICY
[From BUSINESS CONFIG → direct booking cancellation policy — e.g.
 "Full refund 14+ days before check-in. 50% refund 7-13 days before.
 No refund <7 days. Force majeure considered case-by-case."]

HOUSE RULES
Linked in the booking confirmation. Brief: no parties, no smoking,
quiet 10pm-7am, max guests as booked.

Thanks for booking direct — repeat guests get [BUSINESS CONFIG →
direct discount, e.g. "10% off next stay"].

[Operator name]
[Trading as]
[ABN / VAT / EIN]
[Email + mobile]
```

### Stripe invoice generation

If BUSINESS CONFIG has Stripe connected:

```json
{
  "customer": "[create or retrieve by email]",
  "description": "INV-[YYYYMM]-[N] — [property] [check-in to checkout]",
  "metadata": {
    "property": "[property internal name]",
    "booking_ref": "[ref]",
    "check_in": "[date]",
    "check_out": "[date]",
    "nights": "[N]"
  },
  "collection_method": "send_invoice",
  "days_until_due": 0,
  "currency": "[from BUSINESS CONFIG]"
}
```

Add line items via `invoice.lineItems.create`, then `invoice.finalize`
to lock and get the `hosted_invoice_url`.

For security deposit, separate `paymentIntent` with
`capture_method: manual` to authorize without capturing — the hold
sits on the card for 7 days (extendable to 30 with Stripe extended
authorizations).

```json
{
  "amount": [deposit in cents],
  "currency": "[currency]",
  "customer": "[customer id]",
  "capture_method": "manual",
  "description": "Security deposit — [property] [dates]",
  "metadata": {
    "type": "security_deposit",
    "booking_ref": "[ref]"
  }
}
```

After checkout + cleaner all-clear:
- No damage → `paymentIntent.cancel` to release hold
- Damage → `paymentIntent.capture` for the claim amount (see
  damage claims below)

### Send the invoice

```
EMAIL SUBJECT: Invoice INV-[YYYYMM]-[N] — [property] [dates]

Hi [first name],

Here's the invoice for your stay at [property name],
[check-in] – [checkout].

Total: $[T]. Pay via the Stripe link in the invoice — covers card,
Apple Pay, Google Pay.

Security deposit of $[X] is held as an authorization on the card
you provide at checkout — no charge unless something needs claiming.

Welcome pack + check-in instructions land 24h before arrival.

Any questions, just reply.

Thanks for booking direct,
[Operator first name]
```

## Mode 3 — Damage claims

When a checkout reveals damage / stain / missing item / extra
cleaning needed.

### Step 1 — Document the damage (within hours of checkout)

The cleaner is your evidence collector. The cleaner's "all clear"
report (see `04-dispatch.md`) must include any damage photos at
this moment. Adding photos later weakens claims.

Required evidence per claim:

```
DAMAGE EVIDENCE PACK — [property] — booking [X]
================================================
Date/time of checkout: [timestamp]
Date/time damage discovered: [timestamp from cleaner]
Date/time photographed: [timestamp from EXIF on photo]

Photos (with visible date/time metadata):
- Wide shot of room / area
- Close-up of damage
- Reference shot (clean version pre-stay, from listing photos or
  prior turnover)

Item details:
- What:               [e.g. "white cotton sheet set, queen"]
- Brand / model:      [if applicable]
- Original cost:      $[X] (with original receipt if available)
- Replacement cost:   $[Y] (with quote / receipt for replacement)

Cleaner statement:
- Cleaner's name + signature / acknowledgement
- "Found in this condition at turnover [time]; not present at prior
   turnover [date]"

Communication trail:
- Guest message at check-in (any flag at arrival?)
- Mid-stay messages
- Any guest acknowledgement post-checkout
- Channel inbox screenshots
```

### Step 2 — File via the correct channel within the window

| Booking source | Where to file | Deadline | Coverage cap |
|---|---|---|---|
| **Airbnb** | Resolution Center → "Request money" or Aircover Damage Protection | **14 DAYS from checkout** OR before next guest checks in (whichever is sooner) | Aircover up to $3M USD equivalent (subject to deductible / process) |
| **VRBO** | Damage Protection (where guest purchased) OR Damage Deposit (where refundable deposit taken) | Varies — Damage Protection 14 days typical; Damage Deposit per VRBO policy | Depends on policy / deposit |
| **Booking.com** | Booking.com doesn't formally support damage claims — host bills guest directly (Booking is a marketing channel, not a payment custodian in most cases) | Direct billing per local law | Per host's own policy |
| **Direct booking** | Capture Stripe security deposit hold | Within 7-day Stripe authorization window (or 30 with extended auth) | Up to deposit amount |

### Airbnb Aircover claim — the form

```
AIRCOVER DAMAGE CLAIM — DRAFT
==============================
Property:           [internal name]
Guest:              [first name + last initial]
Reservation:        [code]
Checkout:           [date]
Next check-in:      [date — if any]

DAMAGE
Item / area:        [specific — "1 queen sheet set, stained beyond
                     wash"]
What happened:      [factual, no emotion — "discovered at turnover
                     by cleaner [name] at [time]. Sheet has [colour]
                     stain across [size area], does not wash out
                     after 2 cycles at 60°C with stain treatment."]
Estimated value:    USD $[X] (replacement) — receipts attached

EVIDENCE ATTACHED
1. Photo of damage with timestamp (camera + EXIF)
2. Photo of same area clean (from prior turnover [date])
3. Receipt for replacement / quote for replacement
4. Cleaner statement (text message screenshot)
5. Reservation comm trail (guest at check-in: "all good", no flag
    at arrival)

REQUEST
Reimbursement of USD $[X] for replacement, transferred via Airbnb.

Note: Guest has not been contacted directly outside Airbnb (per
Airbnb Aircover policy — all comms via Airbnb messaging).
```

The Aircover process:
1. Contact guest via Airbnb (give them 24h to respond) BEFORE
   filing claim
2. If guest agrees → Airbnb processes payment (host gets paid,
   guest charged)
3. If guest disagrees → escalate to Aircover Damage Protection
   (Airbnb adjudicates)
4. Aircover assesses, may approve full / partial / deny
5. If approved → Aircover pays host even if guest refuses

**Aircover gotchas:**
- Submit within 14 days OR before next guest checks in (whichever
  first) — miss this and the claim is rejected outright.
- Photos must have **visible date/time metadata** (EXIF in
  digital photo, or visible timestamp on a phone screenshot of
  the photo's date).
- Receipts must be for **identical or equivalent replacement** —
  cannot upgrade to a $200 sheet set if the original was $50.
- "Normal wear and tear" is excluded — small marks, minor
  dishwasher scratches, etc., don't qualify.
- Cash payouts can be slow (2-8 weeks). Don't budget for fast
  recovery.

### VRBO Damage Protection claim

Similar workflow — file via VRBO host dashboard → claims. VRBO's
Damage Deposit (refundable) is simpler if taken upfront — host
captures and refunds the difference.

### Direct booking damage capture

```
SECURITY DEPOSIT CAPTURE — booking [X]
=======================================
Property:           [property]
Guest:              [name]
Deposit hold:       $[X] via Stripe payment_intent_[id]
Claim amount:       $[Y] ([itemised])
Action:             Stripe paymentIntent.capture with amount $[Y]
                    Release of remainder ($[X-Y]) automatic
Guest notification email:
```

Email to guest:

```
EMAIL SUBJECT: Security deposit claim — [property] [dates]

Hi [first name],

After cleaning [property] following your stay [dates], the cleaner
found [factual description].

I've claimed $[Y] of your $[X] security deposit to cover [itemised:
e.g. replacement cost of stained sheet set + extra hours of cleaning
time]. Receipts attached.

The remaining $[X-Y] is released back to your card today — should
appear in 5-10 business days depending on your bank.

Photos + receipts attached.

If you believe this isn't right, reply within 7 days and we'll work
through it. Stripe's dispute process is also available to you.

Thanks,
[Operator first name]
```

## Cleaning fee handling per BUSINESS CONFIG

Two models:

- **Separate cleaning fee line** (most common) — guest sees a
  cleaning charge separately on the booking. Operator gets the
  full amount as revenue, pays cleaner from operating account.
- **Built into ADR** (some MTR and corporate bookings) — no
  separate cleaning line, the nightly rate is set higher to
  absorb it.

BUSINESS CONFIG → cleaning fee → "built into ADR or separate" tells
the agent which to render in the invoice. For channel bookings,
this is set in the channel listing (not in the invoice the agent
generates — the agent only generates invoices for direct).

## Lodging tax line — region calibration

For direct bookings, host collects + remits (unless an exemption
applies):

| Region | Tax line in invoice | Rate | Remitter |
|---|---|---|---|
| **AU GST** | "GST (10%)" | 10% on full booking if host GST-registered (>$75k turnover) | Host (BAS quarterly) |
| **AU — VIC STRA levy** | "STRA Levy (7.5%)" | 7.5% on accommodation (stays <28 nights) from Jan 2025 | Platform-collected from channels, host-collected on direct |
| **NZ GST** | "GST (15%)" | 15% if host GST-registered (>$60k) or via Marketplace Rules | Host or marketplace |
| **UK VAT** | "VAT (20%)" | 20% if host VAT-registered (>£90k) | Host (quarterly return) |
| **US** | "State sales tax X% + city occupancy tax Y%" | State + city varies (e.g. CA 7.25% + SF TOT 14% + Tourism Improvement 1-2.5%) | Host (state) + host (city) for direct |
| **CA GST/HST/PST** | "GST 5% + PST/QST X%" or "HST 13-15%" | Province-specific | Host or marketplace per province rules |

The agent never invents a tax rate. If the rate isn't in BUSINESS
CONFIG, asks the operator.

## Security deposit logic per channel

| Channel | Deposit model | Agent role |
|---|---|---|
| **Airbnb** | Airbnb does NOT take a refundable deposit. Aircover is the recovery vehicle. Hosts CAN list a "security deposit" amount as informational but no funds are held. | Agent does NOT promise refundable deposit on Airbnb. Sets Aircover claim expectation. |
| **VRBO** | Supports refundable deposit ($X held by VRBO Payments, released after stay). Also offers Damage Protection (guest pays small fee, covers up to claim limit). | Agent verifies deposit amount in listing matches BUSINESS CONFIG. |
| **Booking.com** | No standard deposit — host can request at check-in via authorization, but channel doesn't custody it. | Agent flags — direct authorization is operator-side. |
| **Direct booking** | Stripe authorization hold ($X for duration of stay + 5 days). | Agent generates the paymentIntent.create with capture_method:manual. |

## Channel fee tracker — net per booking

The agent maintains a per-booking ledger:

```
BOOKING LEDGER — month [YYYY-MM]
=================================
| Date    | Property | Channel | Gross  | Fee%  | Tax    | Net     |
|---------|----------|---------|--------|-------|--------|---------|
| Mar 12  | BPC      | Airbnb  | $740   | 15%   | $0     | $629    |
| Mar 14  | BPC      | VRBO    | $480   | 5%    | $0     | $456    |
| Mar 16  | EHC      | Direct  | $1240  | 2.9%+30c| $124  | $1080   |
| Mar 19  | BPC      | Booking | $620   | 18%   | $0     | $508    |
| ...                                                              |
| TOTAL                            | $3,080 |       | $124   | $2,673 |
```

Per-property and per-channel split feeds the weekly report
(`12-weekly-report.md`).

## Hard rules

- **Never file an Airbnb damage claim more than 14 days after
  checkout OR after the next guest checks in.** Late = denied.
- **Never claim against a guest without evidence**: photo with
  timestamp + receipt + cleaner statement. Hunches don't qualify.
- **Never list "security deposit" as if Airbnb holds funds.**
  Airbnb's deposit is informational only — Aircover is the
  actual recovery.
- **Always render the lodging tax line correctly for the region.**
  AU GST 10%, NZ GST 15%, UK VAT 20%, US state+city, CA per
  province. Wrong rate = invoice rejection + tax exposure.
- **Always include the Stripe hosted_invoice_url in the email**,
  not a copy of the invoice as a PDF only. Guests need to click
  to pay.
- **Always show the deposit credit clearly** if a deposit was
  taken — original total, less deposit, equals due now.
- **Never bill a guest for "normal wear and tear"** — scuff on
  floor, faint stain, broken plate. The agent's rule of thumb:
  if the host wouldn't bill a friend, don't claim against the
  guest. Aircover refuses these anyway.
- **Always reconcile every channel payout** against BUSINESS
  CONFIG expected rate. Variance > $1 = surface to operator.
- **Channel fee is the single biggest cost — track it ruthlessly.**
  An 18% Booking.com Genius commission is genuinely the
  difference between profitable and not.

## Reading the learnings.md

Open `learnings.md`. If:
- Repeat direct guest → mention it on the invoice ("welcome back —
  10% repeat discount applied")
- Property has a history of damage claims → tighten deposit + add
  photos to welcome pack as expectation-setting
- Guest had previous Aircover claim resolved against them → flag
  in screening (`01-intake.md`)
- Channel-fee pattern shift (Airbnb raises host-only fee, VRBO
  changes subscription model) → flag in weekly report for rate
  recalibration
- Specific property consistently has variance between expected and
  received → audit BUSINESS CONFIG rate vs. channel listing rate
  (commonly drift)

## Workflow

1. **Channel booking** → channel payout fires → agent reconciles
   → flags variance / logs net
2. **Direct booking** → agent generates Stripe invoice + security
   deposit hold → sends to guest → tracks payment → on checkout,
   releases or captures deposit
3. **Damage discovered at turnover** → cleaner photos + report →
   agent assembles evidence pack → drafts claim → submits via right
   channel within deadline → tracks resolution
4. **End of period** → per-property revenue + net reported (feeds
   `12-weekly-report.md`)

## Confirm + handoff

For channel booking:
> *"Payout reconciled — [channel] paid $[X], expected $[Y],
> variance [Z] [reason]. Net per booking $[N]. Logged."*

For direct booking:
> *"Invoice INV-[X] sent to [guest] for $[T]. Stripe hosted URL
> embedded. Security deposit hold $[D] authorized. Awaiting payment
> — due [date]."*

For damage claim:
> *"Aircover / VRBO claim drafted for [guest], $[X], evidence pack
> attached. Submit via [channel] within [N] days. Awaiting your
> review before I file."*

Hand off to:
- `04-dispatch.md` after payment cleared (booking proceeds to
  pre-arrival sequence)
- `12-weekly-report.md` for end-of-week per-property revenue +
  net
- `11-followup-reviews.md` after deposit released — review request
  (don't request review during open damage dispute)

## Done condition

- Every channel booking reconciled
- Direct booking invoiced + paid + deposit handled
- Damage claims filed within deadline with full evidence pack
- Per-property net tracked
- Channel fees + lodging tax tracked
- Logged in `learnings.md` for the weekly cycle
