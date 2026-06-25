---
name: stripe-tax-refunds
description: Set up Stripe Tax for the operator's region (GST AU 10% / GST NZ 15% / VAT UK 20% / state-by-state US SUTS / GST+PST/HST Canada). Plus refund workflow, refund-policy text by region, partial refunds, and refund-vs-cancel reasoning.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Tax + refunds

## Your job

Two things the operator MUST get right before they're at any
scale:

1. **Charging the correct tax automatically** — wrong tax causes
   ATO / IRD / HMRC / CRA / state-tax-board headaches you don't
   want to acquire.
2. **Handling refunds without panicking** — a clean refund process
   prevents disputes (which are 30x more expensive than refunds).

This skill is region-heavy. Read `knowledge/regional-reference.md`
for the operator's region before quoting any tax rules.

---

## Part one — tax

### Step 1 — decide if they need Stripe Tax

Stripe Tax is a paid add-on (**0.5% per transaction**, with a free
tier for low-volume — first $X/month free, varies by region).

Worth it if:
- They sell to more than one country (multi-jurisdiction tax)
- They've hit a registration threshold (see regional table below)
- They want automated tax compliance and clean reporting that
  matches what their accountant needs
- They're on subscriptions (renewals need tax calculated correctly
  every cycle)

Skip Stripe Tax (use manual rates) if:
- Sell only locally AND below threshold (sole trader making
  AUD <$75k, NZD <$60k, GBP <£90k, US under nexus, CAD <$30k)
- Volume is tiny (<10 transactions/month) — manual is fine
- Their accountant explicitly handles tax outside Stripe (some
  larger operators use Avalara, TaxJar, Quaderno instead)

### Registration thresholds (when tax registration becomes mandatory)

| Region | Threshold for mandatory tax registration |
|---|---|
| AU | GST: AUD $75,000 annual turnover (non-profit $150k); register at `business.gov.au` |
| NZ | GST: NZD $60,000 annual turnover; register at IRD |
| UK | VAT: GBP £90,000 (24/25; was £85k); register at HMRC; voluntary registration possible below |
| US | State-by-state. Most common nexus: $100,000 sales OR 200 transactions per year per state (varies — California $500k, NY $500k or 100 txns, Wash. $100k, FL $100k or 200 txns). Stripe Tax computes per-state. |
| EU | OSS / MOSS registration for cross-border digital services to consumers; €10,000 distance-selling threshold per year across EU |
| CA | GST: CAD $30,000 over four consecutive quarters; HST/PST/QST vary by province |

Ask the operator: **"What's your annual revenue, and which
country/state are you and your buyers in?"**

If they're approaching or over threshold: register first, then
turn on Stripe Tax. **Don't enable Stripe Tax without being
registered** — Stripe Tax calculates and collects; the operator
has to remit. Collecting without being registered is illegal.

### Step 2 — set up the tax origin

Either way (Stripe Tax or manual), Stripe needs to know where the
operator's business is based:

- Dashboard → **Settings → Tax → Origin address**
- Enter the registered business address
- For sole traders / proprietors: home address is usually fine
- This is what Stripe uses to determine "from" jurisdiction for
  every transaction

### Step 3a — enable Stripe Tax (automated path)

If the operator wants the automated path:

1. **Settings → Tax → Get started**
2. Confirm region + tax origin
3. Enter business details (business number, tax registration #s)
4. Add **tax registrations** in countries / states where they're
   registered:
   - AU: GST registration → enter ABN
   - NZ: GST → enter GST #
   - UK: VAT → enter VAT GB number
   - US: each state where they have nexus → enter state tax ID
   - CA: GST + PST/HST per province
   - EU: OSS / MOSS / IOSS (different products for different
     cross-border scenarios)
5. Enable Stripe Tax on:
   - **Each Product** → Edit → "Automatically calculate tax: ON"
   - **Existing Payment Links** → Edit → toggle "Collect tax"
   - **Checkout Sessions** in code: `automatic_tax: { enabled: true }`
   - **Subscriptions**: Edit each subscription product → tax
     enabled

Stripe handles the rest — calculates correct tax per buyer
location, shows it on Checkout, reports it in a tax dashboard,
generates tax invoices.

### Step 3b — manual tax rates (if not using Stripe Tax)

For operators below threshold or with simple needs:

1. **Products → each Product → Tax behavior**: "Exclusive" or
   "Inclusive" (skill 02 covers this — pick one consistently)
2. **Settings → Tax → Tax rates → Add tax rate**:
   - Display name: "GST" / "VAT" / "Sales tax"
   - Percentage: 10 / 15 / 20 / etc.
   - Inclusive vs Exclusive (matches product setting)
   - Region — leave as "All" unless segmenting
   - Tax type — VAT / GST / SUTS / Other
3. Apply tax rates to Payment Links / Checkout manually:
   - Payment Link: edit → "Tax: collect" → pick rate
   - Checkout Sessions: `tax_rates: ['txr_ABC...']` per line item
   - Invoices: pick tax rate when creating

Less automatic but free. Suitable for: single-jurisdiction
operators below registration threshold, or operators whose
accountant is doing the heavy lifting outside Stripe.

### Step 4 — tax-inclusive vs exclusive pricing

Critical to get right. Different by region:

| Region | Norm |
|---|---|
| AU (B2C) | INCLUSIVE — Australian Consumer Law requires display of total price including GST |
| AU (B2B) | EXCLUSIVE often acceptable if both parties registered |
| NZ (B2C) | INCLUSIVE — Fair Trading Act |
| NZ (B2B) | EXCLUSIVE often acceptable |
| UK (B2C) | INCLUSIVE — Consumer Rights Act |
| UK (B2B) | EXCLUSIVE acceptable when both VAT-registered |
| US | EXCLUSIVE almost always (sales tax added at checkout) |
| CA (B2C) | EXCLUSIVE typical (tax added at checkout) — varies by province retail norms |

Set this consistently across all Products. Mixing creates weird
receipts.

Ask the operator: **"Is the price you tell customers tax-INCLUSIVE
or tax-EXCLUSIVE?"** Then verify it matches their region's legal
norm.

For AU/NZ/UK B2C operators selling exclusive: that's potentially
illegal. Flag it. Even if not enforced, customers complain.

### Step 5 — tax invoices

Many regions require a formal "tax invoice" for B2B buyers:

| Region | Requirements |
|---|---|
| AU | Must be labelled "Tax Invoice" if GST registered. Must show: ABN, supplier name, date, description, GST amount, total |
| NZ | Must be "Tax Invoice" if GST registered. Show: supplier name, GST registration #, date, description, GST amount, total |
| UK | Must be "VAT Invoice" for B2B. Show: VAT GB#, supplier, customer, date, description, net + VAT + gross, VAT rate |
| US | Receipt sufficient for B2C; B2B may want detailed invoice with sales tax broken out per state |
| CA | Show: legal name, BN, GST/HST/PST amounts, date, description, total |

Stripe receipts ARE compliant tax invoices in most jurisdictions
IF you've:
- Enabled Stripe Tax (or set tax rates correctly)
- Filled in business legal details (tax registration #) in
  Settings → Branding → Public details → tax IDs section
- Set the receipt template to include "Tax Invoice" wording
  (Settings → Customer emails → Receipts → edit template)

For UK operators: **enable invoice generation on subscription
charges** specifically — Settings → Billing → "Invoice settings".
Stripe auto-issues a numbered VAT invoice on every subscription
renewal.

See `templates/tax-invoice-template.md` for region-specific copy.

### Step 6 — special cases

**Digital goods sold cross-border:**
- AU operator selling to EU consumers → EU VAT applies if over
  €10,000 threshold; register OSS or use Stripe Tax
- US operator selling to AU consumers → AU GST applies to digital
  services if AU customers >AUD $75k aggregate; register for AU
  GST (simplified registration) or use Stripe Tax
- UK operator post-Brexit → EU digital services need OSS for EU
  customers; UK domestic still UK VAT

**Stripe Tax handles all this automatically** when registrations
are configured.

**Manual VAT MOSS (UK pre-2025) / OSS (EU now):**
- File quarterly with the operator's home tax authority for
  digital services to consumers across EU
- Stripe Tax produces the report

**Reverse charge (B2B VAT in EU/UK):**
- B2B sales between VAT-registered businesses across countries
  are reverse-charged — supplier doesn't charge VAT; customer
  self-accounts
- Stripe Tax handles this when the customer's VAT number is
  provided + verified at Checkout
- Requires VAT number collection on Checkout (toggle in Settings)

**Marketplace tax (Connect — skill 07):**
- Platforms with Connect get more complex tax rules
- Some jurisdictions (US "marketplace facilitator" laws, EU
  platform-of-record rules) require the platform to collect tax on
  behalf of sellers
- Stripe Tax for Platforms is the product; skill 07 covers it

---

## Part two — refunds

### When to refund — set a policy

Set a clear policy with the operator. Pull from BUSINESS CONFIG.
Common shapes:

**Simple "no-questions" policy** — best for high-trust brands,
boosts conversion:
> "Full refund within 14 days, no questions. Email us."

**Standard SaaS policy**:
> "Refund within 7 days for monthly plans. Annual plans pro-rata
> refund within 30 days. After that, no refund — cancel any time
> and stop being billed at end of period."

**Service / consulting policy**:
> "Refund available within 48 hours of booking. After service
> delivered, no refund — but if you're unhappy, let me know what
> went wrong."

**Digital download policy** (strictest):
> "By accepting these terms, you waive your statutory right to
> withdraw under [CRA/ACL/EU consumer rights]. No refund after
> download."

For digital downloads, **the operator MUST get explicit pre-
purchase consent to waive right of withdrawal** in EU + UK + AU
(if to consumer). Otherwise refund within 14 days even for
delivered digital.

See `templates/refund-policy-text.md` for region-specific copy.

Have the operator document their policy ONCE — they'll paste it
into:
- Settings → Branding → Footer text
- Their own site (link from Checkout footer / FAQ)
- Reference it in receipts (Settings → Customer emails → Receipts
  → footer)

### How to refund — manual

From dashboard:
1. **Payments → find the payment → click → Refund**
2. Choose:
   - **Full refund** — entire amount
   - **Partial** — pick amount (Stripe allows multiple partials)
3. Optionally choose **reason**:
   - Duplicate
   - Fraudulent
   - Requested by customer
4. Optionally add a note (internal — not customer-facing)
5. Confirm

The refund hits the customer card in 3-10 business days. Stripe
auto-emails the customer the refund confirmation.

### Refund fees

**Stripe doesn't return the original processing fee on refunds.**
The operator eats the 2.9% + 30¢ on every refund. So:

- $100 sale → Stripe fee $3.20 → operator nets $96.80
- Refund $100 → Stripe NOT refunded → operator out $3.20

Tell them. Operators get surprised by this — it's not obvious in
the UI.

(Exception: in some regions Stripe refunds fees if you refund
within 24-48h. Check current policy in dashboard footer fine
print.)

### Partial refunds

Common scenarios:
- Customer wants 50% back because half the deliverable was
  acceptable
- Subscription cancelled mid-cycle, refund unused portion
- Sale included a separate add-on customer wants to return

Stripe allows multiple partial refunds on the same charge until
the original amount is reached. Track each.

For subscriptions cancelled mid-cycle, Stripe's standard practice
is "end-of-period cancellation" — no refund, just stop billing.
If the operator wants pro-rata refund:
1. Cancel sub with `prorate: true`
2. Issue manual refund for the credit balance
3. Or use `cancel_at` (future date) + manual refund

### Automated refund triggers (advanced)

If the operator has a self-service refund button on their site
(SaaS with "cancel + refund last month" UX):

```ts
// API: refund the last invoice on a subscription
const invoice = await stripe.invoices.retrieve(invoiceId)
const charge = await stripe.charges.retrieve(invoice.charge as string)
await stripe.refunds.create({
  payment_intent: charge.payment_intent as string,
  amount: invoice.amount_paid,  // full or partial
  reason: 'requested_by_customer',
  metadata: { initiated_by: 'self_service', user_id: userId },
})
```

Always:
- Require auth (signed-in user, valid order ownership)
- Rate limit (max 1 refund/hour per customer to prevent abuse)
- Log to internal system (for audit)
- Hook to `charge.refunded` webhook to update downstream systems
  (skill 04)

### Refund vs cancel (subscriptions)

These are different actions:

| Action | What it does |
|---|---|
| **Cancel** | Stops future billing. Customer keeps access until period end (or immediate if `invoice_now: true`) |
| **Refund** | Money goes back to card. Customer access usually revoked. |
| **Cancel + Refund** | Both — stop billing AND give money back |
| **Pause** | Subscription paused — no billing, customer pauses access |

For SaaS, the right default:
- Customer cancels → access until end of period, no refund
- Customer asks for refund → refund + revoke access immediately

Hard rule: don't refund without cancelling the sub (will bill again
next cycle and look stupid).

---

## Part three — disputes (chargebacks)

A dispute happens when a customer's bank reverses the charge —
usually because:
- "I didn't recognise this charge" (statement descriptor unclear)
- "I didn't receive the product"
- "Product was not as described"
- "Subscription I forgot about / didn't authorise renewal"
- Actual fraud (stolen card)

Skill 09 covers disputes in depth. Quick summary here:

### Set up dispute alerts (do this NOW)

- Settings → **Customer emails → Disputes** → confirm ON
- Slack / email alert via webhook event `charge.dispute.created`
  (skill 04, Path B)
- Alert should be high-urgency — operator has only ~7 days to
  respond

### Refund-before-dispute

If a customer emails saying "this isn't what I expected, want a
refund":
- **Refund. Don't wait. Don't argue.**
- Cost of refund: ~$3 in lost Stripe fee
- Cost of dispute lost: $15 dispute fee + chargeback fee + dispute
  rate increase + admin time
- Net: refund is 5x cheaper than fighting

The operator's instinct will be "but the customer's wrong." Yes
they are. Refund anyway. Save the fight for the big ones.

### Dispute rate — the danger zone

Stripe watches your **dispute rate** (disputes / total charges):
- **<0.5%** — fine
- **0.75%** — Stripe sends a warning email
- **1.0%** — Stripe may suspend the account
- **1.5%** — Stripe likely terminates

If approaching 0.75%, refund proactively for a month to bring the
rate down. Skill 09 covers this in depth.

---

## Part four — receipts + branding

Branded receipts close the loop with the customer:

- Settings → **Branding → upload logo + brand colour**
- Settings → **Customer emails → Receipts**:
  - "Send receipts to customers": ON
  - Include refund policy footer
  - Include link to Customer Portal (if subs)

For tax invoices:
- Settings → **Customer emails → Receipts** → edit template
- Add region-appropriate header:
  - AU: "Tax Invoice"
  - UK: "VAT Invoice"
  - US: "Receipt"

See `templates/customer-receipt-email.md` for variations.

---

## Common gotchas

- **Operator under threshold but enabled Stripe Tax** → charging
  tax on prices that should be tax-free; reverse and disable until
  registered
- **Operator over threshold but not registered** → register
  IMMEDIATELY; ATO/HMRC/etc can backdate registration and demand
  unpaid tax + penalties
- **Mixing tax-inclusive and exclusive across products** → weird
  receipt math; pick one and convert
- **US operator with multi-state nexus, manual rates** → near
  impossible to track; enable Stripe Tax
- **EU OSS thresholds confused with VAT thresholds** → different
  rules: VAT registration is your home country; OSS is for
  selling across borders; both can apply
- **Operator refunds a subscription charge without cancelling** →
  bills again next month, customer livid
- **Refund issued via wrong currency** → if buyer paid in USD but
  refund processed via different mechanism, foreign exchange
  losses
- **No refund policy posted anywhere** → customer disputes win;
  Stripe sides with customer if no policy was visible at purchase
- **Pre-Stripe-Tax invoices not retroactive** → invoices issued
  before turning on Stripe Tax don't get tax added retrospectively;
  accept the gap, document

---

## Reporting (for skill 12 monthly close)

Once Stripe Tax is on:

- Dashboard → **Reports → Tax** (only visible when Stripe Tax
  enabled)
- Download monthly per-jurisdiction breakdown
- Hand to accountant for BAS / VAT return / sales tax filing

Manual rates:
- Dashboard → **Reports → Income** → filter by tax rate
- Or use Sigma SQL (Stripe data warehouse access — paid add-on)

Skill 12 covers the full monthly reconciliation routine.

## Done condition

You're done with this skill when ALL of these are true:

- [ ] Tax origin address set
- [ ] Tax setup matches operator's actual situation (Stripe Tax
      OR manual rates OR no-tax-needed-yet)
- [ ] Tax registrations entered (if Stripe Tax enabled)
- [ ] Tax-inclusive vs exclusive consistent across all products
- [ ] Tax invoices generating with correct format for region
- [ ] Refund policy documented + linked from receipt footer
- [ ] Operator has refunded one test charge (walks them through if
      first time)
- [ ] Dispute alerts confirmed ON
- [ ] (If approaching dispute danger zone) Operator briefed on
      proactive refund strategy

When done, say:

> *"Tax + refunds handled. Stripe Tax: [enabled / manual / not
> yet]. Refund policy documented. Dispute alerts on. Now let's
> let your customers manage themselves."*

Load `06-portal-reporting.md`.
