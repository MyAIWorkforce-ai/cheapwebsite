---
name: bookkeeper-invoice-payment
description: Generate the firm's invoices. Recurring direct debit on the 1st of every month (the spine). Ad-hoc for one-off engagements. Embed Stripe / GoCardless / Ignition link. Run the fortnightly receivables review. Chase politely but firmly. Bookkeepers are notoriously bad at billing themselves — this skill fixes that.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: [stripe.invoice.create, gocardless.subscription.create, ignition.billing.create]
---

# Invoice + payment — the firm's own billing

## Your job

Run the firm's billing cycle. Three categories:

1. **Recurring monthly fees** — debited via direct debit on the
   1st of every month, in advance. No invoices "sent" per se;
   client receives notification of the DD.
2. **Quarterly BAS / VAT lodgement fees** (for Tier 1 compliance-
   only clients) — invoiced on lodgement, paid Net 7.
3. **One-off / ad-hoc** — catch-up work, EOY pack, project
   variations, audit support — invoiced on milestone, deposit at
   engagement.

Bookkeepers are notoriously bad at billing their own clients —
they prioritise client lodgements, push their own billing to next
week, and end up with 60-90 day debtor cycles. The agent fixes
this. Billing runs the same day every month, no exceptions.

## Step 1 — The 1st-of-month recurring run

On the 1st (or business-day-equivalent) of every month, the agent
runs the recurring billing batch:

```
RECURRING BILLING RUN — [Month YYYY]
====================================

Date: 1 [Month] [Year]
Direct debit collection date: 1 [Month] (same day for GoCardless
                                          / Stripe DD)
                              or 3rd business day for BECS / SEPA

CLIENTS ON RECURRING DD
| Client            | Tier | Monthly fee | Add-ons | Total this run |
|---|---|---|---|---|
| Smith Plumbing    | T2   | $480        | -       | $480           |
| Café Lavender     | T3   | $980        | -       | $980           |
| Acme Consulting   | T3   | $980        | +$90 PR | $1,070         |
| Shopify Co        | T3   | $980        | +$200 A2X | $1,180       |
| FinPlan Co        | T4   | $2,400      | -       | $2,400         |
| Studio One        | T2   | $480        | +$30 HD | $510           |
| ...               |      |             |         |                |

Total recurring revenue this month: $XX,XXX

ADJUSTMENTS THIS RUN
- [Client]: tier change from T2 → T3 effective this month,
   new rate $720, agreed at annual review [date]
- [Client]: payroll headcount +1 (5 staff → 6 staff), $30 add-on
   triggered

NEW STARTS
- [Client]: first month, partial pro-rata $XXX (engaged mid-prev-month)

PAUSES / OFFBOARDS
- [Client]: paused for 1 month (medical leave); DD skip this month
- [Client]: disengaged effective [date]; final invoice already
   issued, no recurring this month

ISSUE SUMMARY
- [Client]: card expired notification from Stripe — chase update
- [Client]: insufficient funds last month; will retry [date]
```

Push the batch through GoCardless / Stripe / Ignition. The agent
captures success/failure and surfaces failures immediately.

## Step 2 — Recurring DD failure handling

If a DD fails:

```
DD FAILURE — [Client]
=====================
Reason:                [Insufficient funds / Card expired / Account
                        closed / Customer disputed]
Original amount:       $X
Retry scheduled:       [GoCardless retries 3 + 5 business days
                        automatically; Stripe retries 3 + 5 + 7]
Action:                Surface to operator

EMAIL TO CLIENT
Subject: DD didn't go through — [Firm name] [Month]

Hi [first name],

Quick admin one — the direct debit for your [Month] bookkeeping
fee ($X) didn't go through ([reason — e.g. "insufficient funds in
the account on the day"]). The bank will retry on [date].

If something needs to change (different account, pause, or you
want to chat about the fee), just hit reply.

Otherwise the retry should clear and we're all sorted.

[your name]
[Firm name]
```

Three failed retries in a row triggers partner review of the
engagement: is the client in genuine cash trouble (work with them,
maybe move to instalments), or is this an exit signal (start the
disengagement process)?

## Step 3 — Lodgement fee invoicing (Tier 1 / BAS-only)

For Tier 1 compliance-only clients, the BAS / VAT lodgement fee is
billed AS the lodgement happens. The agent generates the invoice
on lodgement day:

```
INVOICE — [Firm name]
=====================
Invoice #:      INV-[YYYYMM]-[N]
Issued:         [date — lodgement day]
Due:            [date + 7] (Net 7)

BILL TO
[Client name]
[Client billing address]
[Client ABN / VAT / EIN]

ENGAGEMENT
Per engagement letter dated [date]

LINE ITEMS

| Item                                      | Qty  | Unit price | Total    |
|---|---|---|---|
| Quarterly BAS preparation + lodgement     | 1    | $450.00    | $450.00  |
| Period: Q[X] FY[year] ([start] - [end])   |      |            |          |
| Lodged: ATO Online Services [date]        |      |            |          |
| ATO receipt: [reference]                  |      |            |          |
| Subtotal                                  |      |            | $450.00  |
| GST (10%)                                 |      |            | $45.00   |
| TOTAL DUE                                 |      |            | $495.00  |

PAYMENT
Pay via Stripe (instant, covers card):
[Stripe payment link]

Or EFT:
  BSB:    [from BUSINESS CONFIG]
  Acct:   [from BUSINESS CONFIG]
  Ref:    INV-[YYYYMM]-[N]

For ongoing clients, recurring direct debit via [GoCardless /
Stripe DD] is available — drops the per-BAS cost to $35/mo on
Tier 2 and removes this invoicing altogether. Worth a 5-min chat
if interested.

Thanks for the work,
[your name]
[Firm name]
[TPB BAS Agent #]
[ABN]
```

## Step 4 — Project / one-off milestone invoicing

For catch-up, EOY, audit-support, and other project work:

- **30% deposit at engagement** — invoiced when the engagement
  letter is signed via Ignition; DD'd or paid by card same day
- **40% at midpoint** (or "rough-in complete" equivalent — first
  major deliverable)
- **30% at completion** (or "final pack delivered")

Or for smaller jobs (<$2k), 50/50 or due-on-completion is fine.

```
INVOICE — [Firm name]
=====================
Invoice #:      INV-[YYYYMM]-[N]
Issued:         [date]
Due:            [date — per terms]

BILL TO
[Client name]
[Client billing address]
[Client ABN / VAT / EIN]

ENGAGEMENT
Catch-up bookkeeping FY24-FY25, per engagement dated [date]
Total contract value: $4,560 + GST = $5,016

LINE ITEMS

| Item                                      | Qty  | Unit price | Total    |
|---|---|---|---|
| Catch-up bookkeeping — milestone 2 of 3   | 1    | $1,824.00  | $1,824.00|
|   (Reconciliation + BAS prep complete)    |      |            |          |
|                                           |      |            |          |
| Variation 1: additional supplier setup    | 1    | $240.00    | $240.00  |
|   (38 extra suppliers beyond review       |      |            |          |
|    estimate of 60 — agreed via email      |      |            |          |
|    [date], at $40/supplier)               |      |            |          |
|                                           |      |            |          |
| Subtotal                                  |      |            | $2,064.00|
| GST (10%)                                 |      |            | $206.40  |
| Less deposit credit (paid [date])         |      |            | -$1,505.00|
| TOTAL DUE                                 |      |            | $765.40  |

PAYMENT
[Stripe / EFT details]

VARIATION RECORD
Variation 1 — additional supplier setup, agreed by email [date],
              capped at $240 fixed
```

Variations are always called out clearly. Surprise charges on the
invoice destroy the relationship.

## Step 5 — Fortnightly receivables review

Every second Friday, the agent runs the receivables review:

```
RECEIVABLES REVIEW — [Date]
===========================

AGING SUMMARY
| Bucket          | Count | Total $     | Verdict |
|---|---|---|---|
| Current (≤7)    | 8     | $4,200      | OK      |
| 8-30 days       | 3     | $2,180      | OK      |
| 31-60 days      | 2     | $1,940      | Chase   |
| 61-90 days      | 1     | $1,050      | URGENT  |
| >90 days        | 1     | $2,400      | EXIT?   |
| **TOTAL**       | **15**| **$11,770** |         |

CHASE QUEUE THIS WEEK

  Tier 1 — gentle (8-30 days)
  - [Client A], invoice INV-202506-12, $720, 14 days
  - [Client B], invoice INV-202506-15, $480, 9 days
  - [Client C], invoice INV-202506-08, $980, 22 days

  Tier 2 — direct (31-60 days)
  - [Client D], invoice INV-202505-04, $1,200, 38 days
  - [Client E], invoice INV-202504-29, $740, 51 days

  Tier 3 — urgent + partner involvement (61-90 days)
  - [Client F], invoice INV-202503-22, $1,050, 78 days
    → Partner to call this week; if no payment by [date], pause
       work until cleared

  Tier 4 — disengagement review (>90 days)
  - [Client G], invoice INV-202503-09, $2,400, 96 days
    → Already paused. Disengagement letter drafted; partner to
       review before sending.

DD UPDATE CADENCE
- [Client H]: card expired, chase email sent [date], no update yet
- [Client I]: requested account change, new mandate sent

ACTION FOR OPERATOR THIS WEEK
- Approve 8 chase emails (drafted, in your inbox)
- Decide on [Client G] disengagement
- Schedule call with [Client F] this week
```

## Step 6 — Chase scripts (always polite, never accusatory)

### Tier 1 — gentle (8-30 days)

```
Subject: Just a nudge — invoice INV-[XXX]

Hi [first name],

[your name] from [Firm name] here. Invoice INV-[XXX] for $[X]
from [date] is on Net [terms] — gentle nudge that it's coming
up to due. Pay link from the original invoice still works:

[Stripe link]

Or EFT details same as the invoice. Let me know if anything's
holding it up.

[your name]
```

### Tier 2 — direct (31-60 days)

```
Subject: Invoice INV-[XXX] — outstanding

Hi [first name],

[your name] from [Firm name]. Following up on invoice INV-[XXX]
for $[X], issued [date]. It's now [N days] overdue.

Could you let me know either:

(a) When it'll be paid (a date is fine; "in the next 7 days" is
    fine)
(b) If something's holding it up (cash flow, dispute, change of
    bank account)

We can usually find a way through any of those. The thing that
doesn't work is silence — bookkeeping for a client whose own
invoices aren't being paid means I'm in a tricky spot too.

[your name]
[Firm name]
```

### Tier 3 — urgent + partner (61-90 days)

```
Subject: Invoice INV-[XXX] — needs to clear this week

Hi [first name],

[your name] / [Partner name] from [Firm name]. Invoice INV-[XXX]
for $[X] from [date] is now [N days] overdue and despite two
previous notes I haven't heard back.

To be straight: we can't keep doing the bookkeeping work for
[Client] when our own fees aren't being paid. If we don't have a
payment plan in writing by EOD [date + 7], we'll pause your
work — no monthly close for [next month], no source-doc chasing,
no BAS prep — until the account clears.

If there's something we need to know (cash flow event, business
change, dispute with the work), I'd much rather have the
conversation. Reply or call [phone] today.

[Partner name]
[Firm name]
```

### Tier 4 — disengagement letter (>90 days, prior tiers ignored)

This is a formal letter, sent by registered post (AU/UK) or
certified email + read receipt (US/CA), copied to the firm's PM
system for record:

```
[Firm letterhead]
[Date]

[Client name]
[Client address]

RE: Disengagement — [Client name] bookkeeping engagement
    Outstanding fees: $[total] across [N invoices]

Dear [name],

Despite multiple requests for payment of overdue fees, no payment
has been received and no payment plan has been agreed.

Effective [date — 14 days from this letter], we are formally
disengaging from the bookkeeping services for [Client name]. From
that date:

- No further work will be performed
- The Xero / QBO file will be transferred back to your sole
  control (firm user access removed)
- All workpapers, source documents, and lodgement confirmations
  for the engagement period will be made available to you or your
  next bookkeeper
- Outstanding fees of $[total] remain payable per the original
  engagement terms

If you wish to settle the outstanding balance and resume the
engagement, contact me by [date] to discuss terms. Otherwise this
disengagement takes effect on [date].

For your records, your most recent lodged BAS was Q[X] FY[year]
on [date]. Your next BAS is due [date] and we will not be
preparing or lodging it.

Yours sincerely,

[Partner name]
[BAS Agent # / Tax Agent #]
[Firm name]
```

## Step 7 — Reading the learnings.md

Open `learnings.md`. If:

- "C clients" in tiering have payment delays — flag at next
  annual review for re-tier or disengagement
- Specific industries show pattern of late payment (e.g.
  hospitality, restaurants, construction) — tighten DD attach for
  these on new engagements
- Same client repeatedly DD-fails — partner conversation about
  whether the relationship is still viable
- Average days from invoice to paid (DSO) creeping up — review
  the chase cadence; maybe Tier 1 nudge needs to move to day 5,
  not day 8

## Hard rules

- **Recurring monthly fees on DD, not invoice.** Always. Bookkeeper
  who invoices their own monthly fee = bookkeeper still chasing
  60 days later.
- **DD on the 1st of the month, in advance.** Not the 15th. Not
  the 28th. The 1st. Sets the rhythm.
- **Failed DDs trigger immediate, warm chase.** Same day.
- **Variations on the invoice = surprise — bad.** Variations get a
  separate email + acceptance BEFORE they hit the invoice.
- **Tier 3 chase pauses the work.** Doing work for a non-paying
  client is how firms go broke.
- **>90 days = disengagement on the table.** Partner decides; agent
  drafts.
- **Lodgement fee invoiced on lodgement day**, not weeks later.
- **Receivables review every second Friday.** Locked.
- **Direct debit attach rate target: 90%+** of recurring clients.
- **Never embarrass a client in front of their accountant or
  staff** with a chase email cc'd to a third party. Disengagement
  is private.
- **Never alter an invoice after issue.** Issue a credit note +
  new invoice if a correction is needed.

## Reading the receivables learnings

Track:

- Days Sales Outstanding (DSO) — target ≤30 for non-DD;
  ≤2 for DD
- DD attach rate (recurring fees on DD)
- DD failure rate (target ≤3% — higher = signal of client
  trouble or weak attach process)
- Disengagements per quarter (target ≤1 — more = intake quality
  problem)
- Average $ written off per quarter (target <0.5% of revenue)

## Confirm + handoff

> *"Monthly billing run complete: $[X] DD'd across [N] clients,
> [Y] failures (chase emails drafted). Receivables review: $[Z]
> outstanding across [M] invoices — [N1] Tier 1 chases drafted,
> [N2] Tier 2, [N3] Tier 3, [N4] disengagement letter awaiting
> partner review. Loading `12-weekly-report.md` for the
> firm-wide picture."*
