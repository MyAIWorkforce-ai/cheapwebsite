# Pricing page template

A pricing page reduces friction for buyers who'd otherwise leave to
find someone with public pricing. Even pricing bands beat "contact
us for a quote."

## When to have a pricing page

- **Yes**: standard services with knowable prices, productized
  services, subscriptions, SaaS, courses, packaged offerings
- **Maybe**: bespoke services with strong price bands (renovations
  with typical scope)
- **No**: highly bespoke services where range is enormous
  (enterprise consulting, custom development)

Even when "No", consider a pricing band or starting point on
/services or /contact.

## Structure

### H1

State the philosophy, not just "Pricing":

| Bad | Good |
|---|---|
| Pricing | Honest pricing, on the website where it belongs |
| Our Plans | Three plans. One fits most agencies. |
| Pricing Plans | Fixed monthly fee. No timesheet billing. |
| Plans & Pricing | What you pay, what you get. |

### Brief intro (1-2 sentences)

State the pricing philosophy:

- "Same rates every customer. No 'special quote' games."
- "All plans include unlimited users. Pricing scales with locations."
- "Fixed monthly fee, billed in advance. Cancel anytime."
- "Price bands below cover ~90% of jobs. Site inspection if scope
  changes."

### The pricing table

Two common patterns: **tiers** (SaaS, subscriptions, productized
services) and **bands** (variable per-customer pricing).

### Pattern A — tiers

```
[Tier 1]                  [Tier 2]                  [Tier 3]
[Description ≤10 words]   [Description]             [Description]

[Price / period]          [Price / period]          [Price / period]
                          [Most popular badge]

What's included:          What's included:          What's included:
- Feature 1               - Everything in Tier 1    - Everything in Tier 2
- Feature 2               - Feature 4               - Feature 7
- Feature 3               - Feature 5               - Feature 8
                          - Feature 6               - Feature 9

[CTA button]              [CTA button]              [CTA button]
```

#### Example — SaaS

```
Starter                   Pro                       Enterprise
For 1-5 stores            For 5-50 stores           Custom retail

$99/month                 $299/month                Talk to us
Billed annually           Billed annually

What's included:          What's included:          What's included:
- Up to 5 locations       - Everything in Starter   - Everything in Pro
- Real-time stock         - Up to 50 locations      - Unlimited locations
- 1 POS + 1 e-comm        - 5 POS + 5 e-comm        - Custom integrations
- Email support           - Cycle count tools       - Dedicated CSM
                          - API + webhooks          - SOC 2 reporting
                          - Forecasting             - Custom SLAs

[Start free trial]        [Start free trial]        [Talk to sales]
```

#### Example — productized service

```
Quarterly                 Steady                    Premium
BAS cycle only            Weekly Xero               Steady + CFO

$400/month                $1,200/month              $3,500/month
Billed monthly            Billed monthly            Billed monthly

What's included:          What's included:          What's included:
- Quarterly recon         - Weekly recon            - Everything in Steady
- BAS lodgement           - AR + AP management      - 13-week cash forecast
- 1 forecast review/qtr   - Cashflow summary        - Monthly board pack
- Year-end pack           - BAS lodgement           - Quarterly business
- Email support           - Year-end pack             review (90 mins)
                          - Slack support           - Tax planning

[Book discovery call]     [Book discovery call]     [Book discovery call]
```

### Pattern B — bands (variable / trades / project work)

```
Service                    Typical price band         What changes the price
-------------------------- -------------------------- ----------------------
[Service 1]                 [From $X. Most $X-Y]        [Factors]
[Service 2]                 [From $X. Most $X-Y]        [Factors]
[Service 3]                 [From $X. Most $X-Y]        [Factors]
```

#### Example — plumber

```
Service                       Typical price band         What changes the price
----------------------------- -------------------------- ---------------------------
Callout (first 30 mins)        $130 inc GST               After-hours: $280 callout
Standard hourly                 $110/hr inc GST           Saturday +50%; Sunday +100%
Leaking tap / mixer cartridge   $185-$280 all-in          Brand + age of tap
Blocked toilet (single)         $250-$420 all-in          Severity, locator needed
Blocked drain (jetter)          $380-$650 all-in          Jetter time, locator, depth
Burst pipe (callout)            $280-$550 inc parts       Repair access, pipe type
Hot water replacement           $1,800-$3,400             Gas/electric/heat pump, size
Toilet install                  $450-$700                 Brand, accessibility
Bathroom rough-in + fit-off     $4,000-$8,500             Layout, fixtures, access
Backflow test (annual)          $180-$280                 Number of preventers
After-hours surcharge           +$150 over standard       6pm-7am, weekends, holidays
```

#### Example — coach / consultant

```
Engagement                    Price                       Notes
----------------------------- --------------------------- ----------------------
Discovery call (1 × 30 min)    Free                        Pre-qualifier
Strategy intensive (1 × 90 min) $850 USD                   One-off, paid in advance
Eight-week coaching            $4,800 USD                  Paid weekly or upfront
Three-month retainer           $2,200 USD/month            Includes 4 calls + Slack
Full-stage advisor             $5,000 USD/month            6-month minimum
Speaking engagement            $4,000 USD + travel         Half-day; conferences
```

#### Example — bookkeeper

```
Plan                          Monthly price               What changes the price
----------------------------- --------------------------- ----------------------
Quarterly                      $400 inc GST                Number of transactions
Steady                         $1,200 inc GST              Volume, AR/AP load
Premium                        $3,500 inc GST              CFO time, board reporting
One-off cleanup                $80/hr                      Scope (estimated upfront)
```

### Per-tier CTA

Each tier's CTA matches the buyer's stage:

- "Start free trial" — for SaaS with self-serve
- "Buy now" — for one-off products
- "Book discovery call" — for services with qualification
- "Talk to sales" — for enterprise
- "Get a quote" — for variable bespoke services

Match the language to the friction:
- Low-friction (e.g. self-serve) — "Start" / "Buy" / "Sign up"
- Higher-friction (e.g. sales call) — "Talk to us" / "Book a call"

### What's NOT in each tier

Critical for tier-based pricing. Show what's excluded so the upsell
path is clear.

For tiers, the upper tier has "Everything in <lower tier>" — saves
list duplication.

For bands, list explicit exclusions:

```
Not included in standard plumbing rates:
- Solar HW (we don't do this)
- High-rise commercial (we don't do this)
- Sewer line excavation (separate quote — typically $3,500-$8,000)
- Council easement work (council quotes; we facilitate)
```

### FAQ on pricing

3-5 common pricing questions. Examples:

```
Q: Do prices include tax?
A: All prices on this page include GST (10% in Australia). Quotes
   will show GST separately on the line item.

Q: What if my job needs more than the price band?
A: We'll inspect first and quote in writing before starting. If
   our on-site quote exceeds the band by more than 20%, we explain
   why and you can decide whether to proceed.

Q: Do you offer payment plans?
A: Yes — for projects over $2,000. 50% on acceptance, 50% on
   completion. Or we can split monthly via Stripe.

Q: Can I cancel my subscription?
A: Yes — cancel anytime in your account. We don't pro-rate the
   current month but you keep access through it.

Q: Why don't you publish enterprise pricing?
A: Custom integrations, dedicated CSM, custom SLAs — different
   for every customer. Email sales@... for a quote.
```

### Closing CTA

Repeat the primary CTA at the bottom of the page.

```
Ready to start?

[Primary CTA]

Not sure which plan? Email <email> and we'll help you pick.
```

## Pricing copy rules

- **Lead with the price band.** Don't bury it behind a form.
- **Be honest about exclusions.** Materials extra? Say so.
- **Currency clearly disclosed.** "$1,200 USD" or "AUD $1,200 inc
  GST" — don't leave it ambiguous.
- **Tax disclosure matches region.** Inclusive for AU/NZ/UK B2C;
  exclusive for US/CA + B2B.
- **Period clearly stated.** /month, /year, one-off, per session.
- **"Most popular" badge** on the recommended tier (visual highlight)
  — buyers anchor on it.
- **Annual / monthly toggle** if both billing cycles offered.
  Annual usually discounted.
- **Discount disclosure** — "Save 20% with annual billing" — show
  the math.
- **Strikethrough on launch pricing** if applicable, but don't fake
  it. Real strikethrough beats fake "was $X, now $Y."

## Currency + tax by region

| Region | Display format | Example |
|---|---|---|
| AU | inclusive | $1,200 inc GST |
| NZ | inclusive | $1,200 inc GST |
| UK B2C | inclusive | £1,200 inc VAT |
| UK B2B | exclusive | £1,000 ex VAT (20%) |
| US | exclusive | $1,200 + tax at checkout |
| CA | exclusive | $1,200 + GST + PST/HST at checkout |
| Multi-region | exclusive or dynamic | Use Stripe Tax + locale detect |

## Layout patterns

### Three-tier (SaaS classic)

Most common SaaS pricing. Three columns, middle one highlighted as
"Most popular."

### Cards (services / productized)

Each tier as a card with consistent height + visual weight. Same
structure across all cards (description / price / inclusions /
CTA).

### Table (bands / trades / variable)

Service table with price band column + factors column. Best for
trades and bespoke services where buyers want to scan options.

### Single column (premium / boutique)

One service / one price. Used by very high-ticket offerings where
each tier deserves its own real estate (consulting retainers,
enterprise SaaS, premium services).

## Currency switching (multi-region selling)

If selling globally, options:
- **Detect locale** — geo-IP shows AUD to AU visitors, USD to US
  visitors, etc.
- **Manual toggle** — buyer picks currency (top-right of pricing
  page)
- **USD default + footnote** — "Prices in USD. AUD ~1.55× / NZD
  ~1.65× / GBP ~0.80×."

For trades / local services: don't bother. Buyer is local.

## What to NOT include

- **Hidden fees revealed at checkout.** Show all-in price up front.
- **"Contact for pricing" on every tier.** If the basic tier has a
  knowable price, show it.
- **Comparison tables 30 features deep.** Pick 5-7 critical
  features. Anything more belongs on a comparison sub-page.
- **Discount countdown timers** unless real. Fake urgency erodes
  trust.
- **"Get 50% off our actual price" tactics.** Set real prices.
- **Per-user / per-seat pricing without an example.** Show what
  a 5-user / 10-user / 50-user team would pay.
- **Long pricing footnotes that change the actual cost.** If a
  tier really costs $X + something, $X is misleading.

## Region-specific notes

### AU

- Consumer rights under Australian Consumer Law mean refunds may
  apply regardless of refund policy — be careful with "non-
  refundable" language
- GST always disclosed
- BPAY mention if accepting bank transfer

### NZ

- Consumer Guarantees Act similar to ACL
- GST always disclosed

### UK

- Consumer Rights Act 2015 — non-refundable digital goods after
  download is OK if disclosed up-front
- VAT registration threshold £90K — small businesses below it can
  show prices without VAT (state "VAT not chargeable")

### US

- State sales tax patchwork — Stripe Tax handles automatically
- "Subscription" pricing — auto-renewal must be clearly disclosed
  (CARD Act + state laws)

### CA

- Consumer protection by province
- Quebec — French pricing display mandatory
- HST / GST + PST disclosure per province
