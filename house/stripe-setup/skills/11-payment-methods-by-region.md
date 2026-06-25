---
name: stripe-payment-methods-by-region
description: Enable the right local payment methods per region. AU (PayID, BPay via partners, BECS DD, Apple/Google Pay). NZ (account2account). UK (BACS DD, Bank Redirect, Klarna). US (ACH DD, Cash App Pay, Affirm, Klarna). CA (ACSS DD, Interac). Plus BNPL (Afterpay/Clearpay, Klarna, Affirm) and the trade-offs for each method.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Payment methods by region

## Your job

Surface the right local payment methods for the operator's region.
Each method has different:

- **Conversion lift / drag** — does it bring more buyers or lose
  them?
- **Fee structure** — card-equivalent or different
- **Settlement timing** — instant or T+N days
- **Refund behaviour** — varies wildly
- **Dispute risk** — varies wildly
- **Customer expectation** — buyers expect their local methods

Get this right and conversion goes up 5-15 points. Get it wrong
and conversion craters or fees eat margin.

## Method selection framework

Ask:
1. **Where are buyers physically?** (Their card BIN tells you)
2. **What price points?** (BNPL works for $50-2000; less elsewhere)
3. **B2B or B2C?** (B2B wants bank-rail methods; B2C wants cards)
4. **One-off or recurring?** (Recurring loves Direct Debit; one-off
   loves cards + BNPL)

---

## Universal methods (enable for everyone)

These work across all regions:

### Cards (always on)

- Visa, Mastercard, AmEx (some regions), Discover (US/CA)
- Fee: 2.9% + 30¢ (typical US/AU); regional variations
- Refund: instant on Stripe side; 3-10 days for customer
- Dispute risk: standard

### Apple Pay

- Available on iOS Safari + Mac Safari
- Fee: same as card (no surcharge from Stripe)
- Conversion lift: +10-15 pts on mobile
- Setup: domain verification (skill 03)
- **Enable for every operator**

### Google Pay

- Available on Android Chrome + desktop Chrome
- Fee: same as card
- Conversion lift: +8-12 pts on Android
- **Enable for every operator**

### Link (Stripe's saved-card network)

- Auto-enabled — customers who've used Link elsewhere on Stripe
  get one-click checkout
- Fee: same as card
- Conversion lift: +13 pts on average
- Free for the operator
- **Enable for every operator**

These four together typically deliver 25-40% of mobile checkouts.
Don't skip any.

---

## Australia 🇦🇺

### BECS Direct Debit (B2B / subscriptions)

- Bank-account-based recurring debit
- Fee: 1% + $0.30 (capped at $3.50) — much cheaper than card for
  large recurring
- Settlement: T+3 to T+5
- Refund: 3-5 days back to bank
- Best for: B2B subscriptions, high-AOV recurring
- Setup: enable in Stripe Settings → Payment methods → BECS

Customer flow:
1. Customer enters BSB + account number on Checkout
2. Stripe verifies via direct-debit authorisation
3. Recurring debits happen automatically

Limitations:
- Not great for one-off (slow settlement)
- Australia-only
- Mandate required (Direct Debit Authorisation form — Stripe
  generates)

Recommend for: SaaS subs >$50/mo, B2B contracts, retainer billing.

### PayID

- Real-time bank-account-to-bank-account transfers
- Fee: low (varies by acquiring bank)
- Settlement: instant
- Refund: instant
- Best for: high-value B2B one-off where instant settlement
  matters

Stripe's PayID support is via add-on partners (BPAY Group, NPP
participants). Not native Stripe Direct yet.

For most operators: stick with card + BECS DD; PayID is
nice-to-have.

### BPay

- Australian bill payment system
- Customer pays from their internet banking using a biller code +
  reference
- Settlement: 1-2 days
- Best for: B2B invoicing, ongoing customer relationships

Stripe doesn't natively support BPay — requires Connect partners
(Pinpayments + BPay, Zai, others) or your own BPay biller code +
manual reconciliation.

For most: don't bother. EFT and BECS DD cover the use cases.

### PayTo (NPP-based)

- Newer than BECS DD
- Real-time mandate authorisation via customer's banking app
- Lower fees than BECS, faster
- Stripe support: rolling out (check current status)

If available in dashboard: recommend over BECS for new operators.

### Afterpay (BNPL)

- "4 equal payments, every 2 weeks, no interest"
- Available for AU + NZ purchases (B2C only)
- Fee: 4-6% to the operator (much higher than card)
- Settlement: T+1 (operator gets full amount upfront)
- Risk: Afterpay bears it
- Conversion lift on $50-2000 B2C sales: +20-30%
- Reduces dispute rate (Afterpay handles refunds)

When to enable: B2C goods $50-2000, e-commerce, lifestyle/fitness/
beauty. NOT for SaaS, B2B, or services.

When NOT to: high-AOV (>$2k — Afterpay caps), B2B, services that
can't be returned.

### GST + AU

For domestic AU sales: charge GST 10% if registered. Stripe Tax
handles automatically.

For cross-border: AU GST applies to digital services to AU
consumers if you exceed AUD $75k aggregate.

---

## New Zealand 🇳🇿

### Account2Account / POLi

- Bank transfer at checkout via online banking redirect
- Used to be POLi (sunsetted in NZ 2023)
- Replacement: real-time bank rails via NPP-equivalent
- Stripe support: limited — most NZ operators stick with cards +
  Apple Pay

### NZ specifics

- GST 15% — Stripe Tax handles
- IRD reporting via accounting tool

For most NZ operators: cards + Apple Pay + Google Pay + Link is
enough. The NZ payment landscape is card-dominated.

---

## United Kingdom 🇬🇧

### BACS Direct Debit

- UK bank-rail recurring debit
- Fee: 1% capped at £4 — significantly cheaper than card for large
  recurring
- Settlement: T+3
- Refund: 1-3 days
- Best for: subscriptions, B2B contracts, repeat customers
- Setup: enable in Stripe Settings → Payment methods → BACS DD

Customer flow:
1. Customer enters sort code + account number
2. Stripe verifies via Direct Debit Guarantee
3. Recurring debits

Limitations:
- 3-day clearing window means first charge delayed
- UK only
- Direct Debit Guarantee — customer can dispute easily
  (consumer protection)

For SaaS subs >£30/mo: BACS DD saves significant fees vs card
over time. Worth offering as a payment option in Checkout.

### Bank Redirect (UK)

- Customer redirected to their banking app to authorise
- Used for "pay by bank" buttons
- Stripe support: GBP one-off only (limited)
- Best for: high-AOV B2B one-off

### Klarna (UK BNPL)

- "Pay later", "Pay in 3", "Pay in 30 days"
- Fee: ~4-6% to operator
- Settlement: T+1 (operator gets full amount)
- Conversion lift on £50-2000 B2C: +15-25%

Enable for B2C goods + services. Not for B2B or SaaS.

### Clearpay (UK = Afterpay equivalent)

- Same as Afterpay AU/NZ, AU-owned company branded "Clearpay" in UK
- Same use cases, similar fees

### UK VAT

VAT 20% on most. Reduced 5% on energy + some domestic. Zero-rated
on essentials (food, kids' clothing). MTD VAT — Stripe Tax + Xero/
QBO/FreeAgent handle.

---

## United States 🇺🇸

### ACH Direct Debit

- US bank-rail recurring debit
- Fee: 0.8% capped at $5 — cheap for recurring
- Settlement: T+4 (slow)
- Refund: 3-5 days
- Best for: B2B subscriptions, large recurring
- Setup: enable in Stripe → Payment methods → ACH Direct Debit

Customer flow:
1. Customer enters routing + account number
2. Stripe verifies via Plaid (instant) or micro-deposits (slow)
3. Recurring debits

Limitations:
- 4-day settlement = no instant gratification for one-off
- US only
- ACH return codes are real risk (R01 insufficient funds, R03
  account closed) — operator gets debited for the chargeback
  amount

Recommend for: SaaS subs >$100/mo, B2B contracts.

### Cash App Pay

- US-only, by Block (formerly Square)
- Customer's Cash App balance / linked debit card
- Fee: similar to card
- Conversion: +15% on Gen-Z/millennial-skewing audiences
- Best for: B2C, consumer products

Enable if: target customers are <35, US, lifestyle/digital goods.

### Affirm (BNPL)

- "Pay over time" — typically 3-36 months with interest
- Fee: ~5-7% to operator (Affirm bears credit risk)
- Settlement: T+2
- Best for: $200-30,000 B2C goods

Enable for: e-commerce $200-2000, luxury, electronics, home goods.

### Klarna (US)

- "Pay in 4" + "Pay later"
- Fee: ~4-6%
- Settlement: T+1
- Best for: $50-1000 B2C

### Afterpay (US)

- Same as Afterpay AU
- US market

Pick one BNPL. Adding 3 dilutes per-method conversion gain.

### Sales tax (US)

- State-by-state nexus rules
- Stripe Tax handles automatically — don't try manually
- 1099-K reporting: Stripe issues if operator hits IRS threshold

---

## Canada 🇨🇦

### ACSS Direct Debit (Canada PAD — Pre-Authorized Debit)

- Canadian bank-rail recurring
- Fee: 1% + $0.30 — cheaper than card for recurring
- Settlement: T+3 to T+5
- Refund: 3-5 days
- Best for: subscriptions, B2B
- Setup: Stripe → Payment methods → Pre-authorized debit

### Interac

- Canada's instant payment + bank-rail network
- Stripe support: very limited (e-Transfer not natively
  integrated)
- For Interac e-Transfer: usually requires third-party PSP or
  custom integration

For most CA operators: stick with cards + Apple Pay + Google Pay
+ ACSS DD for recurring.

### Provincial tax

- GST 5% federal
- HST: ON 13%, NB/NL 15%, NS/PEI 15%
- PST: BC 7%, SK 6%, MB 7% (RST), QC 9.975% (QST)
- Stripe Tax handles all of these per buyer province

### CA BNPL

- Klarna available in Canada
- Afterpay limited Canadian support
- Most CA buyers prefer card + DD

---

## Cross-region: EU customers

If operator sells into EU (even occasionally):

- **iDEAL** (Netherlands) — 30%+ of NL e-commerce; enable if
  selling to NL
- **Bancontact** (Belgium) — same for BE
- **giropay** (Germany — sunsetting; previously bank redirect)
- **EPS** (Austria)
- **Sofort** (Germany, Austria — bank redirect, sunsetting)
- **SEPA Direct Debit** (EU-wide, like BACS but cross-border)
- **Klarna** (multi-country)

Stripe lets you enable these per Checkout session. The right
default for an EU-facing operator: SEPA DD + iDEAL + Klarna +
cards.

EU VAT: OSS via Stripe Tax.

---

## BNPL — when to enable, when to skip

Buy Now Pay Later (Afterpay/Clearpay, Klarna, Affirm, Cash App
Pay Later) generally:

### Pro

- Conversion lift +15-25% in B2C goods $50-2000
- Operator paid in full upfront — BNPL eats credit risk
- Reduces own dispute rate (BNPL handles refunds via partner)
- Younger buyers strongly prefer

### Con

- Fees 4-7% vs card 2.9% — eats margin if AOV is low and you
  weren't going to lose the sale anyway
- Brand association concerns ("we don't want our brand associated
  with BNPL")
- Customer service overhead — buyers email you about BNPL
  questions, BNPL emails them
- Not for B2B or SaaS

### Decision

- $50-2000 B2C goods, target audience <35 → enable one BNPL
- B2B, SaaS, services >$2k → skip
- Operator brand-sensitive → skip
- Operator already at >50% conversion → skip (gains marginal)

For consumer e-commerce: pick the BNPL with highest target-
audience share. AU/NZ youth: Afterpay. UK/EU: Klarna. US young
adults: Affirm or Klarna.

---

## How to enable a method in Stripe

For Checkout / Payment Links:
1. Settings → **Payment methods**
2. Toggle ON the methods you want
3. Stripe checks eligibility (some require approval, e.g. Afterpay)
4. Apply

For Checkout Sessions in code:
```ts
payment_method_types: ['card', 'apple_pay', 'google_pay',
                        'link', 'afterpay_clearpay'],
```
OR omit to let Stripe pick based on buyer location:
```ts
// Auto: Stripe picks the right local methods
// (preferred — keeps Checkout adaptive)
```

For Payment Element:
```ts
const options = {
  layout: 'tabs',  // shows method tabs
  paymentMethodOrder: ['card', 'apple_pay', 'klarna'],
  // ...
}
```

## Settlement timing — set expectations

Operators should know when money lands:

| Method | Operator-side settlement | Customer-side refund |
|---|---|---|
| Card (Visa/MC/AmEx) | T+2 to T+7 | 3-10 days |
| Apple Pay / Google Pay | Same as underlying card | Same |
| Link | Same as card | Same |
| BECS DD (AU) | T+3 to T+5 | 3-5 days |
| BACS DD (UK) | T+3 | 1-3 days |
| ACH DD (US) | T+4 | 3-5 days |
| ACSS DD (CA) | T+3 to T+5 | 3-5 days |
| SEPA DD (EU) | T+4 to T+5 | 3-5 days |
| Klarna | T+1 | Via Klarna |
| Afterpay/Clearpay | T+1 | Via Afterpay |
| Affirm | T+2 | Via Affirm |
| iDEAL | T+1 to T+2 | T+1 |
| Bank redirect (UK/EU) | T+1 to T+3 | T+1 |

This matters for the operator's cash flow.

## Fee comparison

For an operator processing $50k/month, picking the right mix:

| Method | Fee structure | $50k volume cost |
|---|---|---|
| Card (avg) | 2.9% + 30¢ × N | ~$1,500 (300 txns @ $167 avg) |
| BACS DD | 1% capped £4 | ~$200 |
| ACH DD | 0.8% capped $5 | ~$200 |
| BECS DD | 1% capped $3.50 | ~$700 (cap kicks in often) |
| Klarna | ~5% | ~$2,500 |
| Afterpay | ~5% | ~$2,500 |

For high-recurring B2B: DD methods are 5-10x cheaper than card.
Worth the friction. For low-AOV B2C: card is fine; BNPL is a
conversion tool, not a cost-saver.

## Dispute behaviour by method

- **Cards**: standard dispute mechanism (skill 09)
- **DD methods**: customer-initiated reversal — usually 8 weeks
  in UK / 8 weeks AU / 60 days US ACH — operator gets debited;
  evidence pack required
- **BNPL**: minimal disputes; BNPL handles
- **Bank Redirect / iDEAL**: very low dispute rate
- **Apple/Google Pay**: same as underlying card

For dispute-prone industries: bias toward bank-rail methods over
card.

## Currency selection by method

Each method supports specific currencies:

| Method | Currencies |
|---|---|
| Card | All Stripe-supported (135+) |
| Apple/Google Pay | Same as card |
| BACS DD | GBP only |
| ACH DD | USD only |
| BECS DD | AUD only |
| ACSS DD | CAD only |
| SEPA DD | EUR only |
| Klarna | EUR, GBP, USD, DKK, SEK, NOK, AUD (varies by country) |
| Afterpay | AUD, NZD, USD, GBP, CAD |
| Affirm | USD only |
| iDEAL | EUR only |

For multi-currency operators: each method limits you to its
currencies.

## Common gotchas

- **Enabling BNPL on B2B sales** → BNPL declines B2B; legitimate
  customers blocked
- **BACS DD with no Direct Debit Guarantee compliance** → UK
  customers can reverse for 8 weeks; need clear mandate
- **ACH refunds taking >7 days** → customer complains; set
  expectation
- **Apple Pay not showing on Android** → Apple Pay is iOS/Mac
  only; Google Pay is the Android equivalent
- **Multi-currency BNPL** → some BNPLs only support local
  currency
- **Mandates lost** → DD mandates are subject to record-keeping
  rules (BACS = 13 months minimum); store them
- **Tax behaviour with BNPL** → BNPL is just a payment method;
  tax still applies as usual; some operators wrongly assume BNPL
  is tax-free
- **Settlement timing on first DD charge** → first BACS/ACH/BECS
  charge takes longer; second onwards faster; tell customer

## Done condition

You're done with this skill when ALL of these are true:

- [ ] Universal methods enabled (Cards, Apple Pay, Google Pay,
      Link)
- [ ] Region-appropriate methods enabled per BUSINESS CONFIG
- [ ] BNPL decision made (enable specific one OR skip)
- [ ] Direct Debit methods enabled if recurring B2B / >$50/mo subs
- [ ] Apple Pay domain verification done (skill 03)
- [ ] Fee impact understood by operator
- [ ] Settlement timing communicated to customer-facing copy
      where relevant
- [ ] (If multi-currency) currency × method matrix understood

When done, say:

> *"Payment methods optimised. [N] methods enabled covering
> [region(s)]. Estimated fee load [X%] of GMV based on current
> mix. Next: monthly close routine."*

Load `12-monthly-reconciliation.md`.
