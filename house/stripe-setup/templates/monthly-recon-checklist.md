# Monthly reconciliation checklist

Printable / pasteable version of skill 12. Use end of every month
(or first business day of the next).

Target: 30 minutes for a clean operator.

---

## Pre-flight (5 min)

- [ ] Open Stripe Dashboard
- [ ] Switch to Live mode
- [ ] Set date filter to "Last month" (or specific month)
- [ ] Open accounting tool (Xero / MYOB / QBO / FreeAgent / Sage
      / Wave) in another tab
- [ ] Open `config/learnings-template.md` (operator's working copy)
- [ ] Have last month's bank statement ready

---

## Step 1 — Top-line pull (3 min)

Dashboard → Reports → Reports overview, filtered to last month:

- [ ] Gross volume:        $______
- [ ] Refunds:             $______
- [ ] Net volume:          $______
- [ ] Stripe fees:         $______
- [ ] Net (after fees):    $______

Save screenshot. Note any anomaly vs previous month.

---

## Step 2 — Payouts to bank (5 min)

Dashboard → Balance → Payouts, last month:

| Payout date | Stripe amount | Bank received | Match? |
|---|---|---|---|
| [date]      | $______       | $______       | ☐ ✓ ☐ ✗ |
| [date]      | $______       | $______       | ☐ ✓ ☐ ✗ |
| [date]      | $______       | $______       | ☐ ✓ ☐ ✗ |
| [date]      | $______       | $______       | ☐ ✓ ☐ ✗ |

Total payouts: $______
Total bank receipts: $______

If any mismatch, investigate before moving on.

---

## Step 3 — Tax data (3 min, if Stripe Tax on)

Dashboard → Reports → Tax, last month:

| Jurisdiction | Tax collected | Tax owed (after expenses) |
|---|---|---|
| ___          | $___          | $___                       |
| ___          | $___          | $___                       |

Download CSV. Save for accountant.

---

## Step 4 — Accounting tool sync verify (5 min)

In Xero / MYOB / QBO / etc.:

- [ ] Sales for the month match Stripe gross (within 1-3%)
- [ ] Stripe fees match Stripe's fee total
- [ ] Refunds match
- [ ] Tax collected per jurisdiction matches Stripe Tax
- [ ] Stripe Clearing account balance ≈ $0 at month-end (plus
      in-flight payouts)
- [ ] No unmatched transactions in bank feed

If anything off by >5%: investigate (skill 10 troubleshooting).

---

## Step 5 — Fee leakage audit (3 min)

Total fees: $______ (___% of GMV)

| Fee category                | $        | % of GMV |
|---|---|---|
| Base card fees              | $___     | ___%     |
| International card surcharge | $___    | ___%     |
| Currency conversion         | $___     | ___%     |
| Stripe Tax (if on)          | $___     | ___%     |
| Instant Payouts             | $___     | ___%     |
| Dispute fees                | $___     | ___%     |
| Radar for Fraud Teams       | $___     | ___%     |
| Connect platform fees       | $___     | ___%     |

Compare vs previous month. Trend? Action:
______________________________________________

---

## Step 6 — Subscriptions (if applicable, 3 min)

Dashboard → Reports → Subscriptions, last month:

- [ ] MRR start of month:    $______
- [ ] New MRR:               +$______
- [ ] Upgrade MRR:           +$______
- [ ] Downgrade MRR:         -$______
- [ ] Churned MRR:           -$______
- [ ] Reactivated MRR:       +$______
- [ ] MRR end of month:      $______
- [ ] Net MRR delta:         ±$______ (___%)

- [ ] Trial → paid conv:     ___%
- [ ] Voluntary churn rate:  ___%
- [ ] Involuntary churn:     ___%
- [ ] Dunning recovery:      ___%

Targets met? If not, action:
______________________________________________

---

## Step 7 — Disputes + refunds (3 min)

Dashboard → Disputes, last month:

- [ ] Disputes filed:   ___
- [ ] Won:              ___
- [ ] Lost:             ___
- [ ] Pending:          ___
- [ ] Disputed total:   $______
- [ ] Lost total:       $______
- [ ] **Dispute rate**: ___% (Healthy <0.5% / Watch 0.5-0.75% /
      Warning >0.75%)

Refunds:
- [ ] Total refunds:    $______
- [ ] Refund rate:      ___% of sales
- [ ] Top reason:       ______________________________

---

## Step 8 — Update learnings.md (5 min)

Open `config/learnings-template.md` and update:

- [ ] Top-line table (add this month's row)
- [ ] Fee breakdown table
- [ ] Payment-method conversion (if changed)
- [ ] Currency mix
- [ ] Subscription metrics
- [ ] Product performance table
- [ ] Dispute root-cause table (any new this month)
- [ ] Refund patterns
- [ ] Webhook health (any failures?)
- [ ] Geographic / device patterns
- [ ] "What's lifting margin" section (any updates?)
- [ ] "What's hurting margin" section (any new?)
- [ ] Open experiments (any concluded?)
- [ ] Calendar / SLA tracking (anything due next month?)

---

## Step 9 — Email accountant (3 min)

Send the close summary email — use the template in skill 12:

```
Subject: Stripe close — [Month YYYY] — [Business Name]

Hi [accountant first name],

Monthly Stripe close. Numbers below; CSVs attached.

[TOP-LINE]
[SUBSCRIPTION METRICS]
[DISPUTES + REFUNDS]
[NOTES]

Attachments:
- stripe-income-[YYYY-MM].csv
- stripe-tax-[YYYY-MM].csv (if applicable)
- stripe-payouts-[YYYY-MM].csv

Thanks,
[Operator name]
```

- [ ] Send to accountant
- [ ] CC operator's own ops inbox

---

## Step 10 — Calendar reminders (2 min)

Set calendar reminders for next month:

- [ ] 1st: run monthly close again
- [ ] Tax filing due (BAS / VAT / sales tax / 1099-K) — date:
      ______
- [ ] Stripe KYC refresh anniversary — date: ______
- [ ] Domain certificate / SPF / DKIM check — date: ______
- [ ] Subscription contract renewals — list: ______
- [ ] Connect platform — annual TOS notification — date: ______

---

## Annual close additions (December / fiscal year-end)

For year-end month, ALSO do:

- [ ] Run Stripe annual report
- [ ] Reconcile Stripe Clearing to near-zero (annual)
- [ ] Document unrealised FX gains/losses (multi-currency)
- [ ] Confirm Stripe Tax registrations still valid
- [ ] (US) Expect 1099-K from Stripe by late January
- [ ] Year-end customer comms — send invoice summaries for B2B
      customers
- [ ] (Connect operators) Audit total platform fee revenue
- [ ] Plan next year's pricing changes using `learnings.md`

---

## Done

Month [YYYY-MM] closed in [time taken] mins.

Notable observations / actions:
______________________________________________
______________________________________________
______________________________________________

Next close: [first business day of next month]
