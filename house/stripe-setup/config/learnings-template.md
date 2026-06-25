# learnings.md

The running log of what's working and what's leaking for *this*
Stripe operation. Updated end-of-month by `12-monthly-reconciliation.md`.
Read by every later skill so the agent gets sharper across months,
not just month-by-month.

```
LEARNINGS — <Business name>
===========================
Updated: <YYYY-MM-DD>

## Top-line — last 3 months
| Month     | GMV      | Net    | Stripe fees | Fee % | Refunds | Disputes | Dunning recovered |
|---|---|---|---|---|---|---|---|
| 2026-04   | $24,800  | $23,650 | $1,150     | 4.6%  | $400    | 1        | $620             |
| 2026-05   | $28,100  | $26,800 | $1,300     | 4.6%  | $260    | 2        | $1,140           |
| 2026-06   | $31,400  | $29,950 | $1,450     | 4.6%  | $310    | 0        | $1,820           |

## Fee leakage breakdown (last month)
| Fee category                  | $       | % of GMV |
|---|---|---|
| Base card fees (2.9% + 30¢)   | $X      | X%       |
| International card surcharge  | $X      | X%       |
| Currency conversion (2%)      | $X      | X%       |
| Stripe Tax (0.5%)             | $X      | X%       |
| Instant Payouts (1%)          | $X      | X%       |
| Dispute fees (lost $15 each)  | $X      | X%       |
| Refund fees (not refunded)    | $X      | X%       |
| Radar for Fraud Teams         | $X      | X%       |
| Connect platform fees absorbed | $X     | X%       |
| **Total fee load**            | **$X**  | **X%**   |

→ Action: <e.g. "Switch standard payouts for non-urgent volume —
   the $480/mo Instant Payout cost isn't justified by cash-flow
   benefit, weekly schedule cuts it to $0">

## Payment-method conversion (last month)
| Method        | Sessions | Completions | Conv % | Avg sale |
|---|---|---|---|---|
| Card          | 1,200    | 980         | 81.6%  | $99      |
| Apple Pay     | 340      | 318         | 93.5%  | $99      |
| Google Pay    | 180      | 162         | 90.0%  | $99      |
| Link          | 95       | 91          | 95.7%  | $99      |
| BACS DD (UK)  | 12       | 11          | 91.6%  | $230     |
| Klarna        | 80       | 64          | 80.0%  | $115     |

→ Action: <e.g. "Apple Pay + Link are converting WAY above card.
   Surface them higher in Checkout, A/B test order in next month">

## Currency mix (last month, by GMV)
| Currency | GMV     | % | Avg buyer country |
|---|---|---|---|
| AUD      | $18,400 | 58.5% | AU |
| USD      | $9,200  | 29.3% | US |
| NZD      | $2,400  | 7.6%  | NZ |
| GBP      | $1,400  | 4.5%  | UK |

→ Action: <e.g. "USD is 29%. Should we be presenting USD-native
   prices to US buyers instead of converting AUD? Test next month">

## Subscriptions (if applicable)
- MRR start of month:        $X
- MRR end of month:          $X
- Net MRR delta:             +/- $X
- New sub MRR:               $X
- Upgrade MRR:               $X
- Downgrade MRR:             -$X
- Churned MRR:               -$X
- Reactivated MRR:           $X
- Trial → paid conv rate:    X% (target: __%)
- Voluntary churn rate:      X% (target: <__%)
- Involuntary (failed pay) churn rate: X% (target: <__%)
- Dunning success rate:      X% of failed payments recovered

→ Action: <e.g. "Involuntary churn at 1.8% is too high. Check
   smart-retry schedule + add card-update reminder 14 days pre-expiry">

## Top products by revenue + margin
| Product            | Sales | GMV   | Net (after fees) | Refund rate | Verdict |
|---|---|---|---|---|---|
| Coaching session   | 84    | $12.6k| $12.0k          | 0.2%        | Win — push |
| Annual membership  | 12    | $5.7k | $5.4k           | 1.1%        | Steady |
| Pay-what-you-want tip | 240| $4.8k | $4.4k           | 0.0%        | Steady |
| One-off workshop   | 18    | $3.6k | $3.4k           | 5.5%        | Refund-heavy — investigate |

→ Action: <e.g. "Workshop refund rate is 5.5% — chase the customers,
   ask why. Likely confused about format. Update product page copy.">

## Quote / cart abandonment (Checkout)
- Sessions created:           X
- Sessions completed:         X
- Conversion rate:            X% (target: __%)
- Top abandonment reason (from Stripe insights):
  - <e.g. "Cart abandoned after seeing tax line item — 14% of sessions">
  - <e.g. "Address fails to validate — 3%, likely Canada postal code format">

→ Action: <e.g. "Make tax-inclusive prices the headline; tax line
   item then shows as a breakdown not a surprise">

## Disputes — root cause analysis
| Dispute date | Amount | Reason code        | Outcome | What we learned |
|---|---|---|---|---|
| 2026-06-12   | $250   | Fraudulent          | Lost    | Card-not-present, no 3DS — turn 3DS on for >$100 |
| 2026-05-30   | $89    | Product not received | Won    | Had email receipt + download log + IP match |
| 2026-05-12   | $1,200 | Quality / not as described | Lost  | No clear refund policy on page; weak evidence |

→ Action: <e.g. "Add refund policy to checkout footer link; enable
   3DS challenge for sales >$100; ship a per-product download log
   automatically via webhook for the digital-download line">

Dispute rate this month: X% (target: <0.5% — Stripe warn at 0.75%
threshold, suspend at 1%)

## Refund patterns
- Refund volume: $X (X% of GMV)
- Refund reasons (operator-tagged):
  - Buyer remorse: X%
  - Product issue: X%
  - Duplicate purchase: X%
  - Friendly fraud (then re-buy): X%
- Average days from purchase → refund: X days
- Within-window vs out-of-policy: X% / X%

→ Action: <e.g. "Buyer-remorse refunds spiking on workshop product;
   add a 'preview the format' video to the product page">

## Webhook health
- Events sent: X
- Events succeeded (2xx): X
- Events failed (4xx + 5xx): X
- Average retry attempts: X
- Failing event type (if any): <e.g. "checkout.session.completed —
   timeout on Vercel function, 3% failure rate">

→ Action: <e.g. "Increase Vercel function timeout to 30s; or move
   fulfillment logic to a queued worker">

## Geographic / device patterns
- Buyer countries: <top 5 by GMV>
- Mobile vs desktop conversion:
  Mobile:   X% conversion (avg $X)
  Desktop:  X% conversion (avg $X)
- Time-of-day pattern: <e.g. "9-11am AEST peak — most AU sales">

→ Action: <e.g. "Mobile conv 8 pts lower than desktop. Test
   Stripe's mobile-optimised Checkout next month">

## Accounting reconciliation friction
- Bank-feed-to-Stripe match rate: X%
- Manual journal entries needed last month: X
- Most-common discrepancy: <e.g. "fee allocation — Xero not splitting
  Stripe fee per invoice automatically">

→ Action: <e.g. "Switch to A2X connector — auto-splits fees by transaction">

## What's lifting margin (keep doing)
- "<specific tactic e.g. enabling Apple Pay surfaced higher in the
   Checkout — bumped conversion 4 points>"
- "<e.g. switching to weekly payouts saved $480/mo Instant Payout
   fees>"
- "<e.g. tax-inclusive AU pricing reduced cart abandonment from 22%
   to 14%>"
- ...

## What's hurting margin (stop doing)
- "<e.g. accepting international card without 3DS — disputes from
   non-AU cards up 3x last quarter>"
- "<e.g. running buy-now-pay-later by default for under-$50 sales —
   fees 6% vs 2.9% card, no conversion lift>"
- "<e.g. issuing refunds via the API without an internal approval
   step — staff issued $1,200 in non-policy refunds last month>"
- ...

## Open experiments
- [ ] <e.g. test Stripe Link in surface order: top vs after Apple Pay
       — week 2 of 4>
- [ ] <e.g. trialling 7-day vs 14-day trial on Pro plan — measure
       trial → paid conv lift>
- [ ] <e.g. testing dunning schedule: smart retries vs custom 1/3/7/14
       day cadence>

## Calendar / SLA tracking
- Tax filing due: <e.g. BAS Q3 due 28-Jul>
- Stripe annual KYC refresh: <date>
- VAT MOSS quarterly (UK selling into EU): <date>
- 1099-K filing (US): <Jan 31 — pulled from Stripe Reports>
- Connect platform — annual updated TOS to connected accounts: <date>

## Banned, refined
(patterns added to the banned list because they backfired)
- "<e.g. 'free trial' badge bigger than CTA — users churned at end
   of trial, didn't read>"
- "<e.g. blanket 'no refund after 24 hours' — got dispute rate up;
   softened to 'no refund after content fully consumed'>"
```

## How to use it

Every refund, every monthly close, every Radar rule tweak, every
quarterly review: the agent reads this file FIRST and uses it
before generic best-practice.

- If "Apple Pay converts WAY above card" is in the Win column, the
  agent prioritises Apple Pay placement in future Checkout tweaks.
- If "Workshop refund rate 5.5%" is in the Hurt column, the agent
  flags new workshop launches for extra refund-policy clarity.
- If a dispute root-cause says "weak evidence", the agent makes
  the dispute-response pack template more aggressive about
  evidence collection on next dispute.

Every month: `12-monthly-reconciliation.md` updates this file with
the month's data.

## Quarterly review

End of every quarter, the agent runs:

1. Read full `learnings.md`
2. Re-quantify fee leakage — has it moved?
3. Re-check dispute rate against Stripe's 0.5% target
4. Re-check dunning recovery rate
5. Surface 1-3 actions for the next quarter
6. Email a summary to operator + accountant

Don't let this file get stale. A 6-month-old `learnings.md` is
worse than nothing — the agent will use bad data.
