---
name: stripe-accounting-integration
description: Wire Stripe into the operator's accounting tool — Xero (AU/NZ/UK/US/CA), MYOB (AU), QuickBooks Online (US/UK/CA/AU), FreeAgent (UK), Sage Cloud (UK/global), Wave (US/CA), KashFlow (UK), FreshBooks. Covers native connectors, third-party (A2X, Synder), tax-account mapping, fee splitting, refund handling, multi-currency, and reconciliation behaviour.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Accounting integration

## Your job

Wire Stripe into the operator's accounting tool so:

1. Every charge auto-creates a sales receipt / invoice
2. Stripe fees land in the right expense account
3. Refunds reverse cleanly
4. Tax (GST / VAT / sales tax) is allocated to the right tax
   account
5. Payouts to the operator's bank reconcile automatically against
   the bank feed
6. The monthly close (skill 12) takes 30 mins, not 3 hours

This skill is region- + tool-specific. Pull BUSINESS CONFIG
`Accounting tool` and route accordingly.

---

## Step 1 — pick the integration strategy

Three approaches, in increasing depth + cost:

| Strategy | When | Cost |
|---|---|---|
| **Native connector** (Stripe app in accounting tool) | Standard operators, want hands-off | Often free / included |
| **Third-party connector** (A2X, Synder, Stripe Connector by Xero, Bullhorn for Sage) | Complex needs: multi-currency, marketplace, deep fee splitting | $9-30/mo |
| **Manual CSV import** | Below ~$3k/mo revenue, simple model | Free; high time cost |

Recommendation tree:
- AU/NZ Xero/MYOB user, simple model → native connector
- Multi-currency or marketplace → A2X or Synder
- US QBO user, simple → native; complex → Synder
- UK FreeAgent user → native Stripe integration is solid
- Sage Cloud → consider Stripe by Sage or third-party
- Wave (free tier) → native; light on features but free
- Spreadsheet → migrate to a proper tool ASAP

---

## Step 2 — Xero integration (AU / NZ / UK / US / CA / global)

Xero has the most mature Stripe integration. Two paths:

### Path A — Stripe Feed (native, Xero's own integration)

Best for: SaaS, services, anything where each Stripe charge =
one Xero sales invoice.

**Setup:**

1. In Xero: **Business → Bank accounts → Add bank account**
2. Search "Stripe"
3. Click "Stripe Account Feed" → Connect
4. OAuth to Stripe → pick the Stripe account
5. Map Stripe fees to a Xero expense account (recommended: create
   "Stripe Fees" expense account or use "Bank fees"; codes vary
   per country)
6. Map Stripe Tax (if used) to the right tax account
7. Sync historical (last 12 months) or just forward

**What it does:**
- Each Stripe payment becomes a "Receive Money" transaction in
  Xero against the Stripe account
- Stripe payouts to bank → reconcile against the Xero "Stripe"
  bank account → matched automatically against the operator's
  real bank when the payout lands
- Fees and refunds auto-coded

**Limitations:**
- Doesn't create invoices, just bank transactions; some tax
  authorities want invoice records
- Subscription-style operators may want invoice-per-renewal —
  use A2X instead
- Multi-currency works but conversion rates use Stripe's date,
  may not match Xero default rates

### Path B — Stripe by Xero (newer; better for invoices)

Stripe by Xero (rebranded from "Stripe + Xero"):

1. Xero → **App marketplace → Stripe**
2. Connect
3. Configure: should each Stripe transaction create an invoice or
   just a receive-money?
   - Invoice: full audit trail; needed for AU/NZ/UK tax invoice
     compliance
   - Receive-money: simpler; bank-feed-only

For operators issuing tax invoices: Path B with invoice creation
is required.

### Path C — A2X for Xero (third-party, paid)

For complex / high-volume:

1. Sign up at `a2xaccounting.com` (~$19-49/mo)
2. Connect Stripe (read-only API key)
3. Connect Xero
4. A2X creates a **summary journal per payout** — debits Stripe
   clearing, credits revenue per product category, expenses for
   fees, allocates tax per jurisdiction
5. A2X posts to Xero on payout date; bank feed auto-matches

Why A2X:
- Marketplace operators (Connect) — A2X handles platform fees vs
  seller payouts separately
- Multi-currency clean
- Per-product revenue category mapping
- Better tax allocation across jurisdictions

### Xero — tax-account mapping (region-specific)

When configuring Xero's Stripe integration, map tax accounts:

**Xero AU:**
- Sales: "Sales" (or specific revenue accounts per product type)
- GST: tax_rate "GST on Income" (10%)
- Stripe fees: "Bank Fees" or new expense "Stripe Fees" (Code 404
  default)
- Refunds: "Sales" (negative) or new "Sales Returns"

**Xero NZ:**
- GST: "GST on Income" (15%)
- Same structure

**Xero UK:**
- VAT: "VAT 20%" tax rate for standard; "VAT 5%" reduced; "Zero
  Rated" or "Exempt" as needed
- Stripe fees: "Bank Charges" expense

**Xero US:**
- Sales tax: per state — map by jurisdiction (often complex; use
  A2X or Synder)
- Stripe fees: "Merchant Service Fees"

**Xero CA:**
- GST: 5%
- HST: 13% (ON/NB/NL) / 15% (NS/PEI)
- PST/QST: depending on province
- Stripe fees: "Bank Charges"

### Multi-currency on Xero

If the operator charges in multiple currencies:
- Xero must have Multi-currency enabled (paid tier)
- Each currency = separate Stripe "bank account" in Xero
- Conversion happens automatically; FX gains/losses in P&L

For operators with significant FX volume: A2X handles this more
cleanly.

---

## Step 3 — MYOB integration (AU primarily)

MYOB AccountRight / MYOB Business:

### Path A — MYOB Stripe Direct (native)

1. MYOB → **Banking → Bank feeds → Add bank feed → Stripe**
2. OAuth Stripe → MYOB
3. Map accounts:
   - Sales: "4-1000 Sales" (or product-specific)
   - GST: "GST Collected (2-2120)" tax code
   - Stripe fees: "6-2200 Bank Fees" or new "Stripe Fees"
   - Refunds: "Sales Returns" or "Sales" (negative)
4. Enable auto-allocation rules

### Path B — A2X for MYOB

Same as Xero — `a2xaccounting.com` supports MYOB.

### MYOB known limitations

- Older MYOB AccountRight desktop versions don't support live
  Stripe sync — operator must upgrade to MYOB Business (cloud) or
  use CSV import
- Multi-currency in MYOB requires MYOB Premier / AccountRight
  Plus

---

## Step 4 — QuickBooks Online integration

### QBO US (most common)

1. QBO → **Apps → Find apps → Stripe** (Intuit's official app)
2. Connect → authorise
3. Map accounts:
   - Sales income account
   - Stripe processing fees → expense ("Merchant Service Charges")
   - Sales tax → mapped per state (use Stripe Tax data if on)
   - Refunds → "Refunds from Customers" account
4. Enable: "Auto-create invoices" YES if you want per-sale records;
   NO if just bank-feed reconciliation

### QBO UK

- Tax: standard 20% VAT; configure "VAT on Sales" rate
- "Making Tax Digital" (MTD): QBO is HMRC-recognised; sync to
  MTD VAT submissions
- Stripe by QBO works

### QBO Canada

- GST/HST/PST: configure tax rates per province
- Provincial tax mapping must be exact; use A2X or Synder if
  selling across provinces

### QBO Australia (global edition)

- GST 10%: configure
- BAS reporting: QBO has BAS report; pulls from Stripe data
- Native Stripe app exists; coverage less mature than Xero

### Path B — Synder for QBO

`synder.com` — `$25-50/mo`. Better for:
- High-volume (>1000 transactions/mo)
- Multi-currency
- Marketplace / Connect
- Complex fee allocation per channel

### QBO — when native fails

Common QBO Stripe issues:
- Stripe sync only the last 30 days at first (request full
  history manually or via API)
- Fees lumped in instead of per-transaction split
- Multi-currency conversion using QBO's exchange rates (may
  differ from Stripe's)

Synder fixes most. A2X also supports QBO.

---

## Step 5 — FreeAgent integration (UK primarily)

FreeAgent is popular with UK sole traders + contractors.

1. FreeAgent → **Banking → Add new bank account → Stripe**
2. OAuth → connect
3. Map: VAT 20% standard, "Bank charges" for fees
4. Auto-import: turn ON

FreeAgent's Stripe integration is mature for UK ops. Limitations:
- No invoice generation per Stripe charge (just bank txns)
- Multi-currency limited to FreeAgent's supported currencies
- For UK Limited Companies on quarterly VAT MTD: confirmed
  HMRC-recognised

---

## Step 6 — Sage Cloud + Sage Business Cloud (UK + global)

Sage has multiple products:
- **Sage Business Cloud Accounting** (small biz)
- **Sage 50** (mid-market)
- **Sage Intacct** (enterprise)

### Sage Business Cloud + Stripe

1. Sage app marketplace → Stripe
2. Auto-pulls charges as bank transactions
3. Map tax codes (T1 standard VAT in UK, etc.)
4. Refunds + fees handled

### Stripe by Sage (Sage's direct integration)

In Stripe Dashboard → Apps → Sage. Pushes from Stripe → Sage.

For Sage Intacct / Sage 50: usually need Synder, A2X, or a custom
mapper.

---

## Step 7 — Wave Accounting integration (US / CA, free tier)

Wave is free and popular with US/CA solo operators.

1. Wave → **Banking → Add a bank account → Stripe**
2. OAuth connect
3. Map: "Sales", "Merchant Account Fees", "Sales Tax"
4. Sync

Limitations:
- US only / CA only (no AU/NZ/UK)
- Lighter on multi-currency
- Tax mapping less granular than Xero / QBO

For US operators under $50k/yr: Wave is great. Above: move to
QBO + Stripe Tax.

---

## Step 8 — KashFlow integration (UK)

KashFlow is IRIS / Sage-owned, popular with UK sole traders.

1. KashFlow → Settings → Integrations → Stripe
2. OAuth
3. Map VAT and fee accounts
4. Sync

Mature integration for UK domestic. Multi-currency limited.

---

## Step 9 — FreshBooks integration (global)

FreshBooks is popular with service businesses.

1. FreshBooks → **Apps → Stripe**
2. OAuth
3. Configure: client invoicing via Stripe; receipts auto-generated
4. Map fees

FreshBooks integrates Stripe as a payment method on invoices
they send. So workflow:
- FreshBooks creates invoice
- Customer pays via Stripe (link in invoice)
- Stripe charges → FreshBooks marks invoice paid → fees deducted

Different from Xero/QBO flows where Stripe is the system of
record. With FreshBooks, the FreshBooks invoice is.

---

## Step 10 — third-party connector deep dive

### A2X

- `a2xaccounting.com`
- $19-49/mo per channel (Stripe = one channel; Shopify = another)
- Generates summary journals per payout
- Strong for: marketplaces, multi-currency, accurate tax
- Supports Xero + QBO + Sage Intacct
- Free trial

### Synder

- `synder.com`
- $25-200+/mo (volume-based)
- Per-transaction sync (vs A2X's per-payout summary)
- Strong for: high-velocity e-commerce, refund-heavy ops
- Supports Xero + QBO + Sage + Zoho

### Bullhorn (rare)

For Sage Intacct + enterprise — usually consultant-installed.

### Pick-the-tool decision tree

```
Multi-currency? → A2X
Marketplace (Connect)? → A2X
Need invoice-per-transaction? → Synder
High volume + simple? → Native connector
Just starting? → Native; reassess at 3 months
```

---

## Step 11 — common reconciliation patterns

### The clearing account pattern

In any decent integration:

1. Each Stripe charge → debit "Stripe Clearing" (asset), credit
   "Sales" + tax accounts
2. Stripe fee → debit "Merchant Fees" (expense), credit "Stripe
   Clearing"
3. Refund → debit "Sales Returns", credit "Stripe Clearing"
4. Payout to bank → debit "Bank", credit "Stripe Clearing"
5. End of period: Stripe Clearing should reconcile to Stripe
   Balance ≈ 0 (just float for in-flight payouts)

If Stripe Clearing doesn't zero out (after accounting for
in-flight): something's miscoded.

### Multi-currency journal example

For an AU operator selling in USD:

```
Day 1: Sale $100 USD (worth $148 AUD at Stripe's rate)
  Dr Stripe Clearing USD       $100 USD (= $148 AUD)
  Cr Sales                              $148 AUD
  Cr GST Collected                      $0 (out-of-country B2B)
  Dr Merchant Fees (3% USD)    $3 USD (= $4.45 AUD)
  Cr Stripe Clearing USD        $3 USD

Day 8: Payout $97 USD (worth $144 AUD at conversion rate that day)
  Dr Bank (AUD)                $144 AUD
  Cr Stripe Clearing USD        $97 USD (= $144 AUD)
  FX gain/loss: difference if rates moved
```

This level of detail is what A2X / Synder do automatically.
Manual = error-prone.

---

## Step 12 — historical sync

When wiring the integration for the first time, sync history:

- Most native connectors: pull last 30-90 days
- A2X: configurable, can pull back as far as needed
- Synder: configurable

Choose the right starting date:
- Start of current fiscal year (clean books)
- Start of last reconciled month (no gap)
- Date you went live (if you've been on Stripe + spreadsheet
  until now)

**Don't double-record.** If you've manually entered prior Stripe
sales in the accounting tool, syncing history will create
duplicates. Reconcile + delete manual entries before sync.

---

## Step 13 — testing the integration

After setup:

1. Run a $1 live charge
2. Wait for sync (immediate to 1 hour)
3. Confirm in accounting tool:
   - Sale appears in Sales account
   - Stripe fee appears in expense
   - Tax allocated correctly (if Stripe Tax on)
   - Bank feed (when payout lands) reconciles
4. Refund the $1
5. Confirm refund appears as negative sale or in Sales Returns
6. Confirm Stripe fee NOT reversed (operator absorbed)

If anything's mis-mapped, fix before going to scale.

---

## Step 14 — ongoing maintenance

Quarterly:
- Confirm Stripe Clearing reconciles (per pattern above)
- Confirm Stripe Tax data matches accounting tool tax accounts
- Audit category mapping — if you've added new Products in
  Stripe, are they hitting the right Sales sub-account?

Annually:
- Year-end close — confirm Stripe payouts to bank match Stripe
  reports
- Confirm tax remitted = tax collected (BAS / VAT / 1099-K)
- Rotate API keys used by connector (good security hygiene)

---

## Common gotchas

- **Stripe fees lumped with sales** → integration mis-mapped;
  fees should be expense, not negative sales
- **Tax double-counted** → if both Stripe Tax AND accounting tool's
  tax rates are applying; reconcile one source of truth
- **Multi-currency conversion drift** → use A2X or accept FX
  noise in P&L
- **Connect platform fees recorded as revenue** → for Connect
  operators, distinguish app fees (your revenue) from sales
  (seller's revenue); A2X handles this
- **Refunds creating new sales lines instead of reversing** →
  some connectors do this; check
- **Historical sync overlapping manual entries** → duplicate
  records; delete manual before sync
- **MYOB AccountRight desktop on old version** → no sync; upgrade
  or move to MYOB Business
- **FreeAgent / KashFlow MTD VAT — operator hits Boris-era
  thresholds without realising** → confirm MTD compliance
- **Year-end with Stripe Clearing not zero** → unmatched payouts
  in flight at year-end; document the year-end balance for
  reconciliation across years

## Done condition

You're done with this skill when ALL of these are true:

- [ ] Accounting tool selected from BUSINESS CONFIG
- [ ] Connector chosen (native vs A2X vs Synder vs manual)
- [ ] Stripe connected to accounting tool
- [ ] Account mapping confirmed:
  - Sales → Revenue account(s)
  - Stripe fees → Expense
  - Tax → Tax account(s)
  - Refunds → Sales Returns or negative Sales
- [ ] (If multi-currency) FX strategy confirmed
- [ ] Historical sync window chosen + completed
- [ ] $1 live test charge synced correctly end-to-end
- [ ] $1 refund synced correctly
- [ ] Bank feed reconciles against Stripe Clearing
- [ ] Operator knows the quarterly maintenance routine

When done, say:

> *"Accounting wired. Stripe → [Xero/MYOB/QBO/FreeAgent/Sage/
> Wave/etc.] flowing. Fees, refunds, tax all mapped. Monthly
> close is in [skill 12]."*

Load `12-monthly-reconciliation.md` if operator is ready, OR
`11-payment-methods-by-region.md` to add local methods.
