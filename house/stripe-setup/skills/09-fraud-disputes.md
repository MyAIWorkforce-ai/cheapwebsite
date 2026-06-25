---
name: stripe-fraud-disputes
description: Tune Stripe Radar to the operator's risk appetite, respond to disputes with evidence packs that actually win, monitor dispute rate against Stripe's 0.5/0.75/1.0% danger zones, and integrate Radar with the operator's risk tolerance.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Fraud + disputes

## Your job

Two related streams:

1. **Prevent fraud** — Radar rules, 3DS strategy, manual review,
   minimising both false positives (legitimate buyers blocked)
   and false negatives (fraud through)
2. **Respond to disputes** — when they happen, win them; track
   dispute rate against Stripe's danger thresholds; refund
   proactively when defending is more expensive than just paying

Most operators ignore both until disputes hit 0.75% and Stripe
sends a warning email. Don't be them.

## Step 1 — understand the cost structure

Disputes cost more than the disputed amount:

| Item | Cost |
|---|---|
| Disputed amount | $X (you lose if you can't prove the sale was valid) |
| Stripe dispute fee | $15 (always — won or lost) |
| Lost product / service | (cost of goods sold, time spent on service) |
| Time to respond | 30-90 min per dispute |
| Dispute rate impact | Approaches Stripe's 0.5% / 0.75% / 1.0% thresholds |
| If terminated by Stripe | Reserve, holds, account closure, no PSP for 6+ months |

A $100 disputed charge can cost the operator $200+ in real terms.

By contrast, a $100 refund:
- Lost $100 + $3 Stripe fee = $103
- 50% cheaper than even a won dispute

Operating principle: **refund liberally when the customer is
unhappy. Dispute defence is for clear fraud only.**

## Step 2 — Radar — Stripe's fraud engine

### Tiers

| Tier | Cost | What you get |
|---|---|---|
| **Radar (Free)** | Included | ML-based risk scoring; basic rules; auto-block obvious fraud |
| **Radar for Fraud Teams** | $0.05/txn | Custom rule engine; review queue; teams workflow; better insights |
| **Radar Premium** | Custom | Dedicated risk management; SLA; complex orgs |

Most operators: free tier is fine until ~$100k/mo volume.
Above that: Radar for Fraud Teams pays for itself.

Free Radar is on by default. Don't disable.

### Risk scores

Every charge gets a Radar risk score 0-100:

- 0-25: Normal
- 26-65: Elevated
- 66-75: Highest
- 76+: Fraud (Stripe auto-blocks)

Visible in Dashboard → Payments → [charge] → "Risk insights"
section.

### 3D Secure (3DS)

3DS adds an "Authenticate with your bank" step. Reduces fraud by
~50-80% for online transactions. But: adds friction; some
customers abandon checkout.

Stripe's default: 3DS only when required (PSD2 in EU, risk-based
elsewhere). You can force it always or never per Checkout
session:

```ts
payment_method_options: {
  card: {
    request_three_d_secure: 'any',  // 'automatic' (default) | 'any' | 'challenge'
  },
}
```

Recommendation by region:
- **EU operators**: 3DS forced for most online txns (PSD2)
- **UK operators**: same (PSR / FCA)
- **AU/NZ/US/CA**: risk-triggered (Stripe default) — best balance

For high-AOV products (>$500): consider forcing 3DS — reduces
dispute risk more than abandonment costs.

### Liability shift with 3DS

When 3DS succeeds, **dispute liability shifts to the card issuer**
— you cannot lose a 3DS-authenticated fraud dispute. This is the
single biggest reason to use 3DS on high-AOV products.

## Step 3 — Radar rules

For Free Radar: basic rules only. For Radar for Fraud Teams:
custom rule language.

### Built-in rules to confirm ON

- Block all payments if risk_score = 'highest'
- Block all payments from countries you don't sell to
- Block all payments using cards from specific BIN ranges (rare)

### Useful custom rules (Fraud Teams tier)

```
# Block if card was recently disputed
Block if :card_recently_used_disputed:

# Block if CVC fails more than once
Block if :cvc_check: = 'fail' and :card:has_recent_cvc_fail:

# Challenge if from country mismatch
3DS if :card_country: != :ip_country: and :amount: > 100

# Block high-risk countries (case-by-case)
Block if :ip_country: in ('NG', 'PK', 'XK')  # adjust per region

# Block disposable email domains
Block if :email_domain: in (
  'mailinator.com', 'tempmail.com', '10minutemail.com'
)

# Manual review for high-AOV from new customer
Review if :amount: > 500 and :customer:age_days: < 7

# Allow trusted customers (returning, no past disputes)
Allow if :customer:successful_charges_count: > 5
       and :customer:dispute_count: = 0
```

Adjust per the operator's business. A B2C-Asian-imports business
has different patterns from a B2B-EU-SaaS business.

### Rule tuning workflow

1. Start with Stripe's defaults + the "Block from disposable
   emails" rule
2. Monitor Dashboard → Radar → "Reviews" tab for ambiguous cases
3. After 30 days: analyse Radar metrics — false positive rate?
   missed fraud?
4. Tune rules; A/B test changes (Radar Teams supports rule
   versioning)
5. Update `learnings.md` quarterly

## Step 4 — manual review queue (Radar for Fraud Teams)

For Fraud Teams tier: enable manual review for ambiguous
transactions. Workflow:

1. Charge captured but held in review
2. Stripe dashboard shows the charge in Radar → Reviews
3. Operator reviews customer details, message history, order
   pattern
4. Operator: Approve (capture funds, deliver product) or Reject
   (refund, no delivery)

For high-AOV / one-off product operators: this catches the 1-2%
of fraud that ML misses. Worth the per-transaction Radar fee at
high volume.

For SaaS subscribers: less useful — first month's $29 isn't
worth manually reviewing.

## Step 5 — proactive fraud signals

Beyond Radar, watch for:

- **Sudden burst of new signups from one IP / one card BIN** —
  bot probe
- **Same email signing up with multiple cards** — testing stolen
  cards
- **Geo-IP mismatch** (IP from VPN; card from country X) — not
  always fraud but elevated
- **AVS / CVC mismatches** — partial address match without CVC is
  suspicious; full mismatch is blocking signal
- **High-velocity charges from same card** — burst pattern

Stripe Radar surfaces these automatically. For Fraud Teams users:
write rules.

For early fraud signals: Stripe's `radar.early_fraud_warning` event
(skill 04 webhook). When a card issuer flags a charge as
suspicious BEFORE the customer disputes, you get an early warning.
**Refund immediately** — saves the dispute + $15 fee.

```ts
case 'radar.early_fraud_warning.created': {
  const warning = event.data.object
  await stripe.refunds.create({
    charge: warning.charge,
    reason: 'fraudulent',
  })
  // Log + alert operator
  break
}
```

This single hook saves operators thousands per year if they have
any fraud signal at all.

## Step 6 — disputes — when they happen

Dispute flow:

1. Customer disputes a charge with their bank
2. Bank reverses charge, debits operator's Stripe balance
3. Stripe creates a `charge.dispute.created` event (webhook fires)
4. Operator has ~7 days to submit evidence
5. Stripe submits evidence to card network
6. Card network decides (30-90 days)
7. Win: charge restored to operator's balance, $15 dispute fee
   STILL charged
8. Lose: charge stays reversed, $15 dispute fee, no refund

### Reasons for disputes

Customers (and banks) categorise disputes:

| Reason code | Description | Win rate (general) |
|---|---|---|
| `fraudulent` | Customer didn't make this purchase | Hard to win without 3DS |
| `subscription_canceled` | Customer thought they cancelled | Win with cancellation log |
| `product_not_received` | Customer didn't get what they paid for | Win with delivery proof |
| `product_unacceptable` | Customer received but wrong / broken | Hard to win |
| `unrecognized` | Customer doesn't recognise charge | Win with descriptor proof |
| `duplicate` | Customer thinks they were double-charged | Win with one-charge proof |
| `credit_not_processed` | Customer expected refund not received | Hard to win; just refund |
| `general` | Customer dispute, no specific reason | Variable |

### Build the evidence pack

For each dispute, the operator must submit evidence. Stripe's
form has fields; **fill every relevant one**.

See `templates/dispute-response-pack.md` for the full checklist.
Summary:

For `product_not_received`:
- Order confirmation (email + screenshot)
- Shipping tracking (URL + delivered proof)
- Customer signature (if applicable)
- Customer IP at order time

For digital download:
- Order confirmation
- Download log showing IP / time / file
- Email opens showing customer accessed link
- ToS acknowledgment

For service:
- Booking confirmation
- Service delivery log (when, where, by whom)
- Communication log (texts, emails confirming attendance)
- Photos / receipts where applicable

For `subscription_canceled`:
- Sub history showing customer never cancelled
- ToS showing renewal terms
- Auto-renewal email Stripe sent before charge

For `unrecognized`:
- Receipt showing statement descriptor matches what customer saw
- Customer email / phone confirming they bought
- Order details (date, product, amount)

For `fraudulent`:
- 3DS authentication proof (single biggest factor)
- AVS / CVC pass details
- Customer IP geo matches billing address
- Customer's prior purchase history with you (longstanding =
  legitimate)

### Submitting evidence

1. Dashboard → Disputes → [dispute]
2. "Submit evidence"
3. Fill EVERY relevant field — even if it seems redundant
4. Upload supporting docs (PDFs of receipts, screenshots, etc.)
5. Write a clear cover statement: "Customer bought X on Y. Receipt
   attached. Customer used card ending Z, IP A.B.C.D from
   [country]. 3DS authenticated. Product delivered to email
   E@example.com on date Y; delivery log attached. No prior
   communication from customer."
6. Submit

Stripe forwards to the card network.

### Operator workflow

- Webhook `charge.dispute.created` → Slack alert → operator
  reviews dispute
- Decide: defend or surrender (refund)
- Surrender if: small ($<50), weak evidence, customer is right
- Defend if: clear fraud, strong evidence, amount worth the time

Defending takes 30-90 min. If you don't have evidence ready
(delivery log, sub history, comms), it's faster to refund.

## Step 7 — dispute rate monitoring

Stripe's danger zones:

| Rate | Status |
|---|---|
| <0.5% | Healthy |
| 0.5-0.75% | Watch list — Stripe may send a notice |
| 0.75-1.0% | Warning email — Stripe asks for a remediation plan |
| 1.0%+ | Restrictions — Stripe may pause card payments, require remediation |
| 1.5%+ | Termination — Stripe may close the account |

Card networks (Visa, Mastercard) also have their own thresholds.
Hitting them gets the operator on the network's monitoring
program (VAMP / VDMP) — high friction, hard to escape.

### Proactive dispute-rate management

If approaching 0.75%:
1. Audit recent disputes — what's the common cause?
2. Refund proactively for any borderline case in the next month
   to bring the rate down
3. Tighten Radar rules — block more
4. Force 3DS on high-risk segments
5. Improve statement descriptor (often the cause of "unrecognized"
   disputes)
6. Make refund policy more visible
7. If on subs: improve trial → paid flow (subscription disputes
   often stem from "I didn't know it would charge")

### Numerator vs denominator strategies

Bringing dispute rate down has two paths:
1. **Reduce numerator** — fewer disputes (the right way)
2. **Increase denominator** — more transactions (numerical
   dilution; works in the short term)

Both are valid. Path 1 is sustainable. Path 2 buys time while
path 1 is being implemented.

## Step 8 — refund-vs-defend decision tree

For each dispute:

```
Is the dispute amount <$50?
 → Yes → REFUND (cost of defending > likely win value)
 → No →
   Is the customer clearly right / has a fair complaint?
    → Yes → REFUND (defending is unethical + loses anyway)
    → No →
      Do we have strong evidence (delivery log, 3DS, sub history)?
       → Yes → DEFEND with full evidence pack
       → No →
         Is this clearly fraud (stolen card pattern)?
          → Yes → DEFEND (set precedent + report to Radar)
          → No → REFUND (sunk cost reasoning)
```

## Step 9 — chargeback insurance (optional)

For high-volume operators, Stripe offers **Chargeback Protection**
(US, UK, some EU) — for a per-transaction premium (~0.4%), Stripe
covers chargebacks on eligible transactions.

When it makes sense:
- Operator processes >$50k/mo
- Dispute rate is structurally elevated (industry: travel,
  ticketing, digital goods)
- Operator wants predictable cost

When it doesn't:
- Low dispute rate (<0.3%) — premium > saved disputes
- Most disputes are in non-eligible categories

Decision: walk operator through math based on their actual
dispute history.

## Step 10 — Sift / Signifyd / Riskified (third-party fraud)

Beyond Radar, dedicated fraud platforms exist:

- **Sift** — ML-based fraud + trust scoring; subscription pricing
- **Signifyd** — fraud + chargeback guarantee; "approve every
  good order" promise
- **Riskified** — similar to Signifyd; e-commerce focused

When to consider:
- High-volume e-commerce (>$1M GMV)
- High-value goods (electronics, luxury)
- Operating in fraud-heavy regions
- Radar Premium not enough

Most operators of this bundle: stay on Stripe Radar. The
third-party platforms are right when fraud is >5% of GMV or you're
operating cross-border at scale.

## Step 11 — fraud + dispute monitoring in `learnings.md`

Track monthly:
- Dispute count
- Dispute rate (disputes / charges)
- Dispute reasons breakdown
- Win rate on defended disputes
- Refund-to-prevent-dispute count
- False-positive Radar blocks (legitimate customers blocked) —
  customer complaints
- Stripe's status email tier (Healthy / Watch / Warning)

If win rate <60% on defended disputes: evidence packs aren't
strong. Tighten data collection at sale time.

## Common gotchas

- **No 3DS on EU sales** → high fraud disputes; PSD2 requires 3DS;
  Stripe enforces but operator can mistakenly disable
- **Statement descriptor wrong** → "unrecognized" disputes
  dominate; skill 01 covers
- **Sub disputes "I didn't know it would renew"** → improve
  trial-end emails (skill 08); be clearer about renewal
- **High-AOV products without manual review** → catch-22; ML
  alone misses sophisticated fraud
- **Refunding after dispute filed** → still costs $15 dispute
  fee; refund BEFORE filing (when customer emails first)
- **Defending obviously losing disputes** → wastes time; dilutes
  win rate stat
- **Not tracking dispute reasons** → no improvement possible
- **Account suspension surprise** → operator ignored warning
  emails; check Stripe inbox + dashboard banners weekly

## Done condition

You're done with this skill when ALL of these are true:

- [ ] Radar tier chosen (Free / Fraud Teams / Premium) and
      activated
- [ ] Basic Radar rules confirmed enabled (high-risk block,
      country block if applicable)
- [ ] 3DS strategy decided (default risk-triggered, forced for
      high-AOV, or per-region requirement)
- [ ] `radar.early_fraud_warning` webhook handler implemented
      (auto-refund on flag)
- [ ] Dispute alert Slack / email is loud and immediate
- [ ] Operator has the dispute response template
      (`templates/dispute-response-pack.md`)
- [ ] Operator knows the refund-vs-defend decision tree
- [ ] Dispute rate is being tracked in `learnings.md`
- [ ] (If approaching danger zone) Active remediation plan in
      place

When done, say:

> *"Radar tuned. Dispute response ready. Currently at [X%]
> dispute rate — [Healthy / Watch / Warning]. Next: accounting."*

Load `10-accounting-integration.md`.
