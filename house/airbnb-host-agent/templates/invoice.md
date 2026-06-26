# Direct booking invoice + security deposit + damages

For direct-booking stays (Stripe-paid or EFT), corporate / MTR
billing, and any post-stay damage assessments. Channel-booked
stays (Airbnb / VRBO / Booking.com) are paid by the platform —
the agent does NOT issue a guest invoice for those; refer to
`06-invoice-payment.md` for channel payout reconciliation
instead.

```
INVOICE — [Trading as]
=========================
Invoice #:      INV-[YYYYMM]-[N]
Issued:         [date]
Due:            [date — per BUSINESS CONFIG payment terms]
Booking ref:    [DQ-... / LSP-... — the matching quote ref]

BILL TO
[Guest name / Company name]
[Billing address — full]
[ABN / VAT / EIN if corporate]
[Billing email]

STAY
Property:           [Property internal name]
Address:            [full street address]
Check-in:           [day, date], from [3pm]
Check-out:          [day, date], by [11am]
Nights:             [N]
Guests:             [N adults + N kids]
Pets:               [None / agreed type + count]

LINE ITEMS

| Item                                  | Qty   | Unit price | Total     |
|---|---|---|---|
| Nightly accommodation                 | [N]   | $[X]/night | $[X]      |
| Length-of-stay discount               | [N]   | -$[X]/night| -$[X]     |
| ([7+ / 14+ / 28+ nights, -X%])                                          |
| Seasonal / event premium              | [N]   | +$[X]/night| +$[X]     |
| Cleaning fee — initial                | 1     | $[X]       | $[X]      |
| Cleaning fee — mid-stay (per cycle)   | [N]   | $[X]       | $[X]      |
| (long-stays only — per BUSINESS CONFIG cadence)                          |
| Extra guest fee                       | [N]   | $[X]/night | $[X]      |
| (above max [X] booked — flagged in quote)                                |
| Pet fee                               | 1     | $[X]/stay  | $[X]      |
| Late check-out fee                    | 1     | $[X]       | $[X]      |
| (post-noon stays — agreed at time of request)                            |
| Linen exchange (long-stay)            | [N]   | $[X]       | $[X]      |
| Parking surcharge (additional vehicle)| [N]   | $[X]       | $[X]      |
| **Subtotal**                          |       |            | **$[X]**  |
| Lodging tax                           |       |            | $[X]      |
| ([GST 10% / VAT 20% / TOT X% / GET+TAT / state occupancy /              |
|   exempt — stay > 30 nights — see notes])                               |
| Repeat-guest discount                 |       |            | -$[X]     |
| Prepay discount (corporate, 100% upfront)|     |            | -$[X]     |
| Less deposit paid [date]              |       |            | -$[X]     |
| **TOTAL DUE**                         |       |            | **$[X]**  |

Note on security deposit (NOT a charge — see below):
$[X] held via Stripe authorisation on [date]. Will be released
[3 / 5 / 7] days post-checkout if no damage claim filed. The
authorisation does NOT appear on this invoice as a charge.

PAYMENT

Option 1 — Stripe (instant, card / Apple Pay / Google Pay / link):
[Stripe hosted invoice URL — generated per invoice]

Option 2 — EFT:
  [Bank name — from BUSINESS CONFIG]
  BSB / Sort code / Routing #: [from BUSINESS CONFIG]
  Account #: [from BUSINESS CONFIG]
  Ref: INV-[YYYYMM]-[N]

Corporate billing: PO# accepted if provided in advance. Net [14
/ 30] days from issue per agreement; deposit terms still apply
(see quote).

SECURITY DEPOSIT — TERMS

- Amount held: $[X]
- Hold method: Stripe authorisation against the card on file
  (NOT a charge — the bank reserves the amount, doesn't debit it)
- Hold date: [date — typically 48 hrs pre-arrival]
- Release date: [date — typically 3-7 days post-checkout, per
  BUSINESS CONFIG]
- Release condition: no damage claim filed, no extra-guest /
  unauthorised pet / smoking / party fees pending

If damages are assessed during turnover:
1. Cleaner / turnover lead reports + photographs the damage during
   the all-clear walkthrough.
2. Host reviews within 24 hrs of checkout.
3. Repair quote + photos sent to the guest by email + via the
   channel (if channel-booked).
4. Guest given [48] hrs to respond.
5. Deposit either:
   - released in full (no damage),
   - partially captured (damage assessed below deposit amount),
   - fully captured + separate damage invoice raised for the
     balance (damage assessed above deposit amount).
6. For channel bookings: claim filed via Airbnb Resolution
   Center / VRBO Damage Protection / Booking.com claim within
   the channel's window (Airbnb 14 days post-checkout; VRBO 14
   days; Booking.com 14 days).

DAMAGE CLAIM — SEPARATE INVOICE (if applicable)

If post-stay damages exceed the security deposit, a SEPARATE
invoice is issued — labelled INV-[YYYYMM]-[N]-DMG. That invoice
itemises:

| Item                                  | Qty   | Unit price | Total     |
|---|---|---|---|
| [Damaged item — e.g. "Replacement     | 1     | $[X]       | $[X]      |
|  mattress, queen, [brand model]"]                                       |
| [Repair labour — e.g. "Plasterer      | [hrs] | $[X]/hr    | $[X]      |
|  patch + paint wall hole"]                                              |
| [Extra cleaning — e.g. "Stain         | 1     | $[X]       | $[X]      |
|  treatment, carpet, professional"]                                      |
| Photo evidence reference              |       |            | DMG-[N]-PIC|
| Repair quote reference (if external)  |       |            | DMG-[N]-Q  |
| **Damage subtotal**                   |       |            | **$[X]**  |
| Less security deposit captured        |       |            | -$[X]     |
| **DAMAGE BALANCE DUE**                |       |            | **$[X]**  |

All damage claims include:
- Time-stamped photos from before-stay turnover (showing
  property condition at check-in)
- Time-stamped photos from post-stay turnover (showing damage)
- Repair quote / invoice from the tradesperson where external
- Reference to the house rule or stay condition that was
  breached (where applicable — e.g. smoking in non-smoking
  property → smoke-damage deep clean)

For channel-booked stays, the damage claim is filed via the
channel's resolution centre with the same evidence attached.
Channel adjudicates; host doesn't auto-bill the guest direct
for channel bookings.

WARRANTY / CONDITION ON DELIVERY

Property is delivered in clean + serviceable condition per the
listing photos + listing description. Any pre-existing condition
issues (chip in benchtop, scratched floorboard, etc.) are
documented in the turnover photos taken at the start of the
stay — these are NOT charged to the guest.

LATE PAYMENT

[Per BUSINESS CONFIG — e.g. "Net 7 from issue; 2% per month late
fee thereafter" or "Net 14, no late fee — please get in touch if
you need a payment plan"]

For corporate Net 14 / Net 30 agreements: late fees per the
signed agreement; otherwise per the above.

Thanks for the stay — and the review on [Airbnb / VRBO / direct]
when you have a moment.

[Operator name]
[Trading as]
[STR registration #]
[ABN / VAT / EIN]
[Email] · [Phone]
[Direct-booking site URL]
```
