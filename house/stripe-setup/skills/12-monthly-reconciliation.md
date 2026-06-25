---
name: stripe-monthly-reconciliation
description: The monthly close routine — pull Stripe reports, reconcile payouts to bank, verify accounting tool sync, file tax (BAS / VAT / sales tax), update learnings.md, and email accountant. Designed to take 30 mins for a clean operator and surface issues early.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Monthly reconciliation

## Your job

Close each month cleanly:

1. **Reconcile Stripe payouts → bank → accounting tool**
2. **Verify tax collected = tax owed** (BAS / VAT / sales tax /
   1099-K filing prep)
3. **Audit fee leakage** (Stripe fees, currency conversion, paid
   add-ons)
4. **Track MRR / churn / dunning recovery** if subscription
   operator
5. **Update `learnings.md`** with the month's data
6. **Email accountant** with the summary

Target: 30 minutes for a clean operator. If it's taking 2+ hours
each month, the accounting integration (skill 10) isn't set up
right. Loop back.

## Monthly close checklist

Walk through these steps in order. See
`templates/monthly-recon-checklist.md` for a printable version.

---

## Step 1 — Pull the Stripe reports

End of every month (or first business day of next month):

### Top-line

Dashboard → **Reports → Reports overview** (filtered to "Last
month"):
- Gross volume
- Refunds
- Net volume
- Stripe fees
- Net (after fees)

Screenshot or note the numbers.

### Payouts to bank

Dashboard → **Balance → Payouts** (filtered to last month):
- Each payout: date, gross, fees, net
- Total payouts received in the month
- (For US ops) any reserves held

### Income detailed

Dashboard → **Reports → Income → Gross revenue**:
- Download CSV (per-transaction list)
- Useful for accountant deep-dive

### Tax (if Stripe Tax on)

Dashboard → **Reports → Tax**:
- Per-jurisdiction tax collected
- Download tax invoice list

### Subscriptions (if applicable)

Dashboard → **Reports → Subscriptions**:
- MRR start of month
- MRR end of month
- New, churned, upgraded, downgraded
- Trial conversions

### Disputes

Dashboard → **Disputes**:
- Filter to last month
- Total amount disputed, won, lost, pending
- Dispute rate this month

---

## Step 2 — Reconcile against bank statement

For each Stripe payout in the month:

1. Find the matching deposit in operator's bank account
2. Confirm amount matches Stripe's reported payout
3. Confirm date matches (allowing for processing time:
   typically T+1 to T+5 depending on Stripe schedule)

In Xero / MYOB / QBO / accounting tool:
- The Stripe Clearing account should have a balance close to
  zero at month-end (just float for in-flight payouts)
- Bank feed should auto-match payouts to Stripe transactions
- Any unmatched: investigate

If a payout from Stripe doesn't show in bank:
- Check Stripe → Payouts → status (sometimes "Paid" but
  in-transit)
- If older than 5 days "Paid" but not in bank: contact Stripe
  support
- If "Failed": investigate (bank rejected — re-check account
  details)

---

## Step 3 — Verify accounting tool sync

In Xero / MYOB / QBO / FreeAgent / Sage / Wave:

- Sales for the month should match Stripe's gross volume (approx
  — timing differences ok)
- Stripe fees should match Stripe's fee total
- Refunds should match
- Tax collected per jurisdiction should match Stripe Tax report

If anything's >5% off:
- Are some transactions not syncing? (Connector issue)
- Are some currencies converting at different rates? (FX timing)
- Are refunds counted differently? (e.g. as negative sales vs in
  Sales Returns)

Skill 10 has the troubleshooting flow.

---

## Step 4 — Audit fee leakage

Where is the month's fee going?

```
Total fees this month: $X (Y% of GMV)
Breakdown:
- Base card fees (2.9% + 30¢):    $___ (___%)
- International card surcharge:    $___ (___%)
- Currency conversion (2%):        $___ (___%)
- Stripe Tax (0.5%):               $___ (___%)
- Instant Payouts (1%):            $___ (___%)
- Dispute fees ($15 each):         $___ (___%)
- Radar for Fraud Teams:           $___ (___%)
- Connect platform fees absorbed:  $___ (___%)
TOTAL:                             $___ (___%)
```

Compare to last month. If trending up:
- Adding more international cards? (Geographic expansion)
- More disputes? (Investigate root causes)
- Switched on Instant Payouts unnecessarily?
- Currency conversion creeping in because USD-priced products
  attracting non-US buyers?

This single audit catches the slow-fee-creep that erodes margins
over years.

---

## Step 5 — Subscription metrics (if applicable)

For SaaS / subscription operators:

```
MRR Start of Month:  $___
+ New MRR:           $___
+ Upgrade MRR:       $___
- Downgrade MRR:     $___
- Churned MRR:       $___
+ Reactivated MRR:   $___
= MRR End of Month:  $___

Net MRR delta:       +/- $___ (___%)
Churn rate:          ___%
Trial → paid:        ___%
Dunning recovery:    ___%
```

Compare against targets in BUSINESS CONFIG.

If churn rising:
- Audit cancellation reasons (from Customer Portal data)
- Audit dunning failures (skill 08)
- Check card-expired patterns

If dunning recovery <30%:
- Email deliverability issue (check SPF/DKIM)
- Subject lines unclear
- Card-update link broken

---

## Step 6 — Tax obligations

Region-specific. Pull from Stripe Tax (if on) or manual rates:

### Australia

- **BAS (Business Activity Statement)** — quarterly (Jan/Apr/Jul/
  Oct due 28th of next month) for most; monthly for >$20M
- Sum: GST collected in Stripe = GST you owe
- File via ATO online portal or via accountant
- Pay difference (GST collected - GST on expenses) by due date

### New Zealand

- **GST return** — 2-monthly or 6-monthly cycle (set with IRD)
- File via IRD myIR portal

### United Kingdom

- **VAT return** — quarterly cycle, due 1 month + 7 days after
  quarter end
- File via HMRC MTD-compatible software (Xero / QBO / FreeAgent
  / Stripe-connected accounting tool)

### United States

- **State sales tax** — varies by state (monthly / quarterly /
  annual)
- **1099-K** — Stripe issues annually if operator hits threshold
  ($5k for 2024, lower thresholds coming)
- File via each state's portal (or use Avalara/TaxJar)

### Canada

- **GST/HST return** — monthly / quarterly / annual depending on
  revenue
- **Provincial sales tax** — separate per province where collected
- File via CRA portal

Stripe Tax handles calculation + provides per-jurisdiction
reports. Filing is still the operator's job (or accountant's).

---

## Step 7 — Disputes + refunds review

For the month:

- Disputes filed: N
- Disputes won: N
- Disputes lost: N
- Disputes pending: N
- Total $ disputed: $X
- Total $ lost to disputes: $Y

Dispute rate = disputes / charges:
- <0.5% → Healthy ✓
- 0.5-0.75% → Watch
- 0.75-1.0% → Warning
- 1.0%+ → Action required (skill 09)

Refunds:
- Total refunds issued: $X
- Refund rate = refunds / sales: __%
- Top refund reason: ___
- Patterns? (e.g. one product dominating refunds)

Log to `learnings.md`.

---

## Step 8 — Update `learnings.md`

Open `config/learnings-template.md` (operator's working file).

Update:
- Top-line numbers (3-month rolling table)
- Fee breakdown
- Payment-method conversion table
- Currency mix
- Subscription metrics (if applicable)
- Product performance
- Dispute root-cause analysis
- Refund patterns
- Webhook health
- Geographic patterns
- What's lifting / hurting margin
- Open experiments status
- Calendar tracker (tax filings, KYC refresh, etc.)

This single habit, done monthly, makes the agent's quote +
operational suggestions 10x sharper after 6 months.

---

## Step 9 — Email accountant + operator summary

Generate a structured email. Template:

```
Subject: Stripe close — [Month YYYY] — [Business Name]

Hi [accountant first name],

Monthly Stripe close. Numbers below; attaching the detailed CSV
from Stripe Reports.

TOP-LINE
========
Gross volume:      $___
Refunds:           $___
Stripe fees:       $___
Net (after fees):  $___

Tax collected:     $___ (per-jurisdiction breakdown in CSV)
Payouts to bank:   $___ (matches bank deposits)

[SUBSCRIPTION METRICS if relevant]
MRR end of month:  $___
MRR delta:         +/- $___ (___%)
Churn rate:        ___%

DISPUTES + REFUNDS
==================
Disputes this month: N (rate: ___%)
Refunds:             $___ (rate: ___%)

NOTES
=====
- [Anything unusual this month — fee spike, big refund, dispute
   pattern, currency shift]
- [Any tax filing reminder upcoming — BAS Q3 due 28-Jul, etc.]
- [Any operator action you flagged for the accountant]

Attachments:
- stripe-income-2026-06.csv (per-transaction list)
- stripe-tax-2026-06.csv (per-jurisdiction tax)
- stripe-payouts-2026-06.csv (payout reconciliation)

Any questions, reply or call.

Thanks,
[Operator name]
```

Send to accountant + cc operator's own ops inbox for record.

---

## Step 10 — Calendar the next month's reminders

Set calendar reminders for:

- 1st of next month: run monthly close
- Tax filing due date (BAS Q3, VAT return, sales tax, 1099-K)
- Stripe annual KYC refresh (~1 year anniversary)
- Domain certificate renewal (if Stripe webhook URL has cert
  expiring)
- Subscription contract renewals with key customers
- Connect platform — annual TOS update reminder to connected
  accounts

---

## Annual close (December / fiscal year-end)

Once a year, the monthly process expands:

1. Run normal monthly close for the final month
2. Year-end specials:
   - **Stripe annual report** — Dashboard → Reports → Annual
     summary
   - Confirm Stripe Clearing in accounting tool is reconciled to
     near-zero
   - Document any unrealised FX gains/losses (multi-currency
     operators)
3. **Tax filings** — annual return (varies by region)
4. **1099-K issuance** (US — Stripe sends to operator's email
   late January)
5. **Year-end customer comms** — send invoices summary for B2B
   customers who want their annual spend for their own books
6. **Audit Connect platform fees** — total platform revenue for
   the year (for Connect operators)
7. **Renew Stripe Tax registrations** if anything expired
8. **Plan next year's pricing changes** based on `learnings.md`

---

## Common gotchas

- **Bank feed showing payouts but Stripe says "Pending"** →
  timing; wait 1-2 days, then investigate
- **Stripe fees in accounting tool look wrong** → connector
  mis-mapped; refer to skill 10
- **Currency conversion creating P&L noise** → multi-currency
  operator without A2X; FX gain/loss is real, document
- **Refunds in wrong period** → refund of last month's sale
  in this month; document; accountant may need to adjust
- **Dispute lost in subsequent month** → original sale was prior
  month; loss is current month; track separately
- **Stripe Tax data doesn't match accounting tool's tax data** →
  one source of truth; usually Stripe Tax is correct, accounting
  tool sync may be lagging
- **Tax filing late** → register for ATO / HMRC / IRS reminders;
  don't rely on memory; penalties compound
- **Sub paid mid-month for the prior month's service** →
  defer revenue if cash basis vs accrual; check with accountant
- **Connect platform fees recorded as revenue when they should
  be commission income** → different tax treatment; A2X helps;
  ask accountant
- **1099-K threshold confusion (US)** → $5k for 2024; $2.5k for
  2025; $600 eventually; stay aware

---

## Done condition

You're done with this skill when ALL of these are true:

- [ ] Top-line numbers pulled + recorded
- [ ] Payouts reconciled to bank
- [ ] Accounting tool sync verified
- [ ] Fee leakage audited + logged
- [ ] (If subs) MRR / churn / dunning recovery tracked
- [ ] Tax obligations confirmed + filing-due-date noted
- [ ] Disputes + refunds reviewed
- [ ] `learnings.md` updated
- [ ] Email to accountant sent
- [ ] Next month's reminders calendared

When done, say:

> *"Month closed. Gross $X. Net $Y. Fee leakage X%. [Subs delta if
> applicable]. Accountant emailed. Learnings updated. Next close:
> [date]."*

Operator can now go back to running the business. Agent stands by
for the next operational ask.
