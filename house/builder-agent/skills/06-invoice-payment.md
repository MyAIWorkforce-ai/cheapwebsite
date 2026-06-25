---
name: builder-invoice-payment
description: Generate progress claim invoices at each contract stage (deposit, slab, frame, lock-up, fix-out, PC, retention). Adjust for PC item drawdowns + variations + retentions held. Embed Stripe link or format for Xero / MYOB / Buildxact paste-in. Track receipt against contract value. Chase politely. Retention release at 12 months from PC.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: [stripe.invoice.create, xero.invoice.create]
---

# Invoice + progress claims — the cash flow desk

## Your job

Generate the right invoice at the right stage, with the right
percentage, the right variations applied, the right PC item
adjustments, the right tax, the right retention held — and
embedded in the right payment system.

This is the cash flow of the business. If progress claims slip,
the business runs out of money to pay subbies. If retention isn't
tracked, you forget about $10k of your own money. If variations
aren't invoiced as they happen, they get lost.

## Invoice / claim types

| Type | Trigger | Skill flow |
|---|---|---|
| Deposit invoice | Contract signing | Generate, cap-aware (region max), send |
| Stage progress claim | Stage trigger met (e.g. slab inspection passed) | Generate, photos attached, send |
| Variation invoice | Variation order signed + work done | Add as line on next progress claim, or standalone if material |
| Cost-plus monthly invoice | End of cost-plus billing cycle | Pull cost report, format, send |
| PC claim | Practical Completion + defects schedule signed | Final pre-retention claim |
| Retention release request | 12 months from PC + defects sweep passed | Final invoice (5% retention) |
| Small-job invoice | Small-job completion | Single invoice from `02-quote-callout.md` |

## Step 1 — Deposit invoice (cap-aware)

Deposits are LEGALLY capped in some regions. The agent verifies
against BUSINESS CONFIG → Region:

- **AU NSW**: max 10% on contracts $20k+
- **AU VIC**: max 10% on contracts <$20k; max 5% on contracts $20k+
- **AU QLD**: max 5% on contracts where Builders Warranty Insurance
  applies
- **NZ**: no statutory cap (CCCS recommends max 10%)
- **UK**: no statutory cap (FMB recommends max 10%)
- **US**: varies by state (some have caps, e.g. CA 10% or $1,000
  whichever less for HIC work)
- **CA**: varies by province

If the contract deposit % exceeds the regional cap, agent FLAGS
and refuses to send until adjusted.

```
DEPOSIT INVOICE — INV-[YYYYMM]-[N]
====================================
Issued:        [date]
Due:           On contract signing

BILL TO
[Client name]
[Billing address]

PROJECT
[Project name + address]
Contract value:   $[X]
Deposit %:        [X]% (REGION CAP CHECK: [PASS / FAIL])
Deposit amount:   $[Y]

PAYMENT

Stripe:        [hosted invoice URL]
EFT:           [BSB / sort code / routing + acct]
               Ref: INV-[YYYYMM]-[N]

WHAT THE DEPOSIT COVERS
- Site set-up + insurance activation
- Initial materials order (long-lead items: cabinetry, windows,
  bi-folds)
- Programme lock-in (no calendar slipping after this point)

We don't start demo or any site work until this deposit clears.
The contract isn't binding until both parties sign + this is paid.

Thanks,
[your name]
[Business name]
[Builder licence # — region-specific]
[ABN / VAT / EIN]
```

## Step 2 — Stage progress claims

A progress claim is raised when a stage trigger is met. The trigger
isn't "the work is done" — it's the inspection passing + the
photographs being taken. No certifier sign-off = no progress claim.

```
PROGRESS CLAIM — INV-[YYYYMM]-[N]
====================================
Issued:        [date]
Stage:         [N] of [N total] — [stage name, e.g. "Slab"]
Trigger:       [E.g. "Slab inspection passed [date] by certifier
                 [name + #]; photos attached"]
Due:           7 days from issue (per contract)

BILL TO
[Client name]
[Billing address]

PROJECT
[Project name + address]
Contract value:                   $[X]
Total claimed to date (incl. this): $[Y]
% of contract claimed to date:    [Z]%

THIS CLAIM

| Item                                  | Detail              | Amount    |
|---|---|---|
| Stage [N] — [name] (% of contract)   | [X]% × $[Contract]  | $[X]      |
| Variation #[N] [description]         | Signed [date]       | $[X]      |
| Variation #[N+1] [description]       | Signed [date]       | $[X]      |
| PC item adjustment [item — over/under allowance]| [details]| $[X] (+/-) |
| Sub-total                             |                     | $[X]      |
| Tax ([10%/15%/20%])                  |                     | $[X]      |
| Less retention (held)                 | [%] of stage value  | -$[X]     |
| **AMOUNT DUE THIS CLAIM**             |                     | **$[X]** |

TOTAL CONTRACT TRACKER
| Stage                          | %    | Claimed | Status |
|---|---|---|---|
| Deposit                        | 5%   | $[X]    | PAID [date] |
| Slab                           | 10%  | $[X]    | THIS CLAIM |
| Frame                          | 15%  | $0      | upcoming |
| Lock-up                        | 20%  | $0      | upcoming |
| Fix-out                        | 25%  | $0      | upcoming |
| PC                             | 20%  | $0      | upcoming |
| Retention                      | 5%   | $0      | held    |
| **Total contract**             | 100% | $[X]    |         |

VARIATIONS TO DATE
| #  | Date signed | Description | Amount |
|---|---|---|---|
| 1  | [date]      | [scope]     | $[X]   |
| 2  | [date]      | [scope]     | $[X]   |
| Total variations               | $[X]   |

(Variations are billed as added to each progress claim. Each
variation listed here corresponds to a signed Variation Order
on file.)

PC ITEM TRACKER
| Item              | Allowance | Selected | Diff | Status |
|---|---|---|---|---|
| Bi-fold doors     | $12,500   | $14,200  | +$1,700 | Variation #2 signed |
| Tile              | $1,440    | $1,200   | -$240   | Credit applied this claim |
| (etc.)            |           |          |        |        |

PAYMENT

Stripe:        [hosted invoice URL]
EFT:           [BSB / sort code / routing + acct]
               Ref: INV-[YYYYMM]-[N]

PROOF OF STAGE COMPLETION
- Slab inspection card (passed [date]) — [link to photo]
- Slab photos (steel, formwork, post-pour) — [link to folder]
- Concrete delivery docket — [link]
- Engineer's pre-pour sign-off note (if any) — [link]

WHAT'S NEXT
- Frame start: [date] — assuming this claim cleared by [date]
- Frame inspection target: [date]
- Stage [N+1] claim raises after frame inspection passes

(For cost-plus invoices, see `Cost-plus monthly` template below.)

Thanks,
[your name]
[Business name]
```

## Step 3 — Cost-plus monthly invoice

For cost-plus contracts (HIA Cost Plus / AIA A102 / CCDC 3), the
billing cycle is monthly with full transparency:

```
COST-PLUS INVOICE — INV-[YYYYMM]-[N]
=====================================
Period:        [date] to [date]
Issued:        [date]
Due:           7 days from issue (per contract)

BILL TO
[Client name]
[Billing address]

PROJECT
[Project name + address]
Estimated contract: $[X] — $[Y]
Total claimed to date (incl. this): $[Z]
% of estimate:      [%]

THIS PERIOD'S COSTS

LABOUR
| Date | Worker | Hrs | Rate | $ |
|---|---|---|---|---|
| [date] | [your name — lead] | 6.0 | $95 | $570 |
| [date] | [apprentice]       | 6.0 | $50 | $300 |
| (etc.)                                  |
| **Sub-total labour** |                     | **$[X]** |

SUB-TRADES (invoice + agreed markup [%])
| Sub | Invoice ref | Net | Markup | Total |
|---|---|---|---|---|
| Tewksbury Electrical | TE-2025-44 | $4,200 | $420 (10%) | $4,620 |
| Smith Plumbing       | SP-2025-31 | $2,800 | $280       | $3,080 |
| (etc.)                                                     |
| **Sub-total sub-trades** |                                 | **$[X]** |

MATERIALS (supplier invoice + agreed markup [%])
| Supplier | Invoice ref | Net | Markup | Total |
|---|---|---|---|---|
| Bunnings Trade | BT-998877  | $1,840 | $276 (15%) | $2,116 |
| Eurolinea     | EL-2025-12 | $18,400| $2,760     | $21,160 |
| (etc.)                                                      |
| **Sub-total materials** |                                  | **$[X]** |

ADMIN / OVERHEAD ([%] of direct cost)
- Project management time at $[X]/hr capped at 8% of total:
                                                  $[X]
- Site setup amortised:                           $[X]
- Total                                           **$[X]**

MARGIN ([%] on direct cost)
- Total                                           **$[X]**

THIS INVOICE TOTAL
| Item               | Amount    |
|---|---|
| Direct cost (labour + subs + materials) | $[X] |
| Admin / overhead                        | $[X] |
| Margin                                  | $[X] |
| Sub-total                               | $[X] |
| Tax ([10%/15%/20%])                     | $[X] |
| **TOTAL DUE THIS INVOICE**              | **$[X]** |

ATTACHED FOR YOUR INSPECTION
- All sub-trade invoices (4 PDFs)
- All material invoices (8 PDFs)
- My time sheet for the period (PDF)
- Cumulative running cost report (Google Sheet link)

Any questions on any line — just reply or call.

[your name]
[Business name]
```

The defining feature of cost-plus is that EVERY supplier and
sub-trade invoice is attached. Transparency is what makes
cost-plus work.

## Step 4 — PC claim + retention held

At Practical Completion, the second-last claim is raised:

```
PRACTICAL COMPLETION CLAIM — INV-[YYYYMM]-[N]
==============================================
Issued:        [date]
Stage:         PC (final pre-retention)
Trigger:       Practical Completion achieved [date]
               Defects schedule signed [date]
               OC / CCC / CofO issued [date]
Due:           7 days from issue (per contract)

BILL TO
[Client name]

PROJECT
[Project name + address]
Contract value (incl. variations):  $[X]
Total claimed to date (incl. this): $[Y]
% of contract claimed to date:      [Z]%
Retention held (5%):                $[W]

THIS CLAIM
| Item                                  | Amount    |
|---|---|
| PC stage (% of contract)              | $[X]      |
| Outstanding variations (V#[N], V#[N+1])| $[X]     |
| PC item final adjustments             | $[X]      |
| Sub-total                             | $[X]      |
| Tax                                   | $[X]      |
| Less retention (5%)                   | -$[X]     |
| **AMOUNT DUE THIS CLAIM**             | **$[X]** |

RETENTION
Held: $[X] (5% of contract value)
Held until: [date — 12 months from PC]
Released after: 11-month defects sweep complete + final
                 retention release request

HANDOVER PACK
Attached:
- Occupation Certificate / CCC / CofO
- Sub-trade compliance certificates
- Warranties index + manufacturer registrations
- Defects schedule (signed at PC walk-through)
- Maintenance instructions
- Project photo folder link

CONGRATULATIONS
[Plain-English note. E.g.: "It's been a good project, [client].
Thanks for trusting us with it. The new space looks the part —
hope you enjoy the first dinner in there."]

[your name]
[Business name]
```

## Step 5 — Retention release request (at 12 months)

The single most-forgotten invoice in the building business. The
agent calendars this at PC + sends 11 months later:

```
RETENTION RELEASE — INV-[YYYYMM]-[N]
=====================================
Issued:        [date]
For project:   [name + address]
PC date:       [date 12 months ago]
Retention amount: $[X] (5% of contract value)
Due:           7 days from issue (per contract)

BILL TO
[Client name]

CONTEXT

Twelve months ago at Practical Completion of [project], 5% of the
contract value ($[X]) was retained per contract clause [X]. The
defects liability period ends [date — 12 months from PC].

We've completed the 11-month defects sweep on [date], and:

- [E.g. "The minor defects identified at the sweep have been
  rectified (photo evidence attached)" OR
- "No defects identified at the sweep — property in excellent
  condition"]
- The defects schedule from PC has been worked through and signed
  off complete

This invoice requests release of the retention.

THIS CLAIM
| Item                       | Amount  |
|---|---|
| Retention release          | $[X]    |
| Tax (already paid at PC)   | $0      |
| **AMOUNT DUE**             | **$[X]** |

PAYMENT
Stripe / EFT (same details as previous claims)

Thanks for a great project [name]. If anything comes up post the
12-month mark, you've still got the structural warranty
([region-specific period]) and all the manufacturer warranties on
materials. We're around if you ever need us.

[your name]
[Business name]
```

## Step 6 — Variations invoiced inline

Variations are added as line items on the next progress claim,
NOT as standalone invoices (unless very material — over $10k or
so).

Each variation order has a signed sign-off (date + client
signature) — those references go into the invoice line.

## Stripe / Xero / Buildxact integration

If BUSINESS CONFIG has Stripe connected for smaller claims:

```json
{
  "customer": "[client email]",
  "description": "Progress claim [N] for [project] - [stage]",
  "amount_due": [total in cents],
  "currency": "[from BUSINESS CONFIG]",
  "collection_method": "send_invoice",
  "days_until_due": 7
}
```

For Xero / MYOB / QuickBooks: the agent formats the invoice for
paste-in (line items match Xero/MYOB's structure — invoice number,
date, due date, line items with account codes if BUSINESS CONFIG
has them).

For Buildxact / CoConstruct / Buildertrend / Procore: the agent
formats the progress claim breakdown to import.

For EFT only: include the BSB / sort code / routing + account
+ invoice ref.

## Send the invoice

Email is the default for project invoices (paper trail + photos).

```
EMAIL SUBJECT: Progress Claim [N] — [stage] — [project] — $[X]

Hi [name],

Progress claim [N] for [project] attached. Stage [N] — [stage
name] — is complete and signed off by [certifier / inspector].

Total this claim: $[X] (retention $[Y] held; net $[Z])

Photos of the stage progress in the project folder: [link]

Stripe link / EFT details in the invoice. Due [date].

Stage [N+1] starts [date], assuming clear funds. If anything
delays, just give me a yell.

Thanks,
[your name]
```

## Payment tracking

For each progress claim sent:

```
CLAIM #<n> — <timestamp>
Project:         [name]
Stage:           [N of total]
Amount:          $[X]
Retention held:  $[Y]
Variations applied: $[Z]
Due date:        [date]
Payment method:  [Stripe link sent / EFT only / Xero / Buildxact]
Status:          [SENT | PAID | OVERDUE | DISPUTED]
Paid date:       [when]
Photos attached: [link]
Inspection card: [link / pending]
```

## Chase polite, chase predictable

If progress claim is overdue by 3 days:

```
Hi [name] — quick bump on progress claim [INV-XXX] from [date].
Total $[X] still outstanding. Next stage starts [date] which
depends on this clearing — let me know if there's anything
holding it up.

— [your name]
```

If overdue by 7 days:

```
Hi [name] — progress claim [INV-XXX] now 7 days overdue. Per
the contract, we can't progress past [stage X] until this clears.
The crew is on standby for [date] — if it's not cleared by [date],
we'll have to push the stage back.

Let me know what's going on.

— [your name]
```

If overdue by 14 days, surface to operator — don't auto-send
debt-collection language. Operator decides next step (which often
includes a phone call + a "let's chat about cash flow" conversation
rather than a legal letter).

## Special case — owner-builder / non-traditional client

Some clients have unusual financing (self-managed super fund,
trust, business name, owner-builder permit). Adjust:

- Bill-to address checked: is it the right entity?
- ABN/VAT/EIN reflected on the invoice (for B2B)
- If client is an owner-builder hiring you on a labour-only basis,
  invoice structure is different (more like trade invoice — hours
  + day rate + materials reimbursement)

## Special case — insurance work

Insurance work has a different cash flow. The assessor's scope is
the "contract"; the insurer pays the builder direct. Adjust:

- Bill-to is the insurer (with policy + claim # quoted)
- Net payment terms usually 14-30 days
- Insurance work doesn't pay retention typically
- Out-of-scope work / variations need client approval AND insurer
  re-scoping (or client pays separately)

## Hard rules

- **Never raise a progress claim before the stage trigger is
  met.** No inspection card = no claim. No photo evidence = no
  claim.
- **Always show the deposit + retention tracker.** Clients want
  to know running totals.
- **Always show outstanding variations** with sign-off dates.
- **Always show PC item adjustments** — over/under allowance,
  with variation reference.
- **Always include photos** with the claim (link or attached).
- **Always show stage % vs contract %.**
- **Always check deposit cap before raising.**
- **Always retention 5% (or per contract) until 12 months from
  PC + defects sweep complete.**
- **Never silently add charges the client didn't agree to via
  written variation.**
- **Tax label correct for region** (GST, VAT, sales tax).
- **Builder licence + ABN/VAT/EIN at the bottom** of every claim.
- **Always reference the inspection card / sign-off** that
  triggers the claim.
- **Retention release invoice raised at 11-month sweep, not at
  12 months** — gives the client time to verify defects are
  resolved before paying out final 5%.

## Reading the learnings.md

Open `learnings.md`. If:
- Client is a repeat → mention it ("good to be working with you
  again on this one")
- Client was slow-pay on a previous job → tighten the chase
  cadence, consider higher deposit if region allows
- Client is a developer → expect slower payment cycle; build
  contingency
- Client is high-net-worth owner-occupier reno → fast payment
  expected; chase tighter on the rare delay

## Confirm + handoff

> *"Progress claim [N] for [project] drafted: $[X] (stage [X]% +
> variations + PC item adjustments). Photos attached. Inspection
> card referenced. Review before sending?"*

After PC:
> *"Retention release calendared for [date — 11 months from PC].
> 11-month defects sweep cue queued. Loading
> `09-recurring-maintenance.md` for defects period management."*
