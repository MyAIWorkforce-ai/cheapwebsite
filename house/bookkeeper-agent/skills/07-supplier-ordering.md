---
name: bookkeeper-client-tech-stack-setup
description: Set up the client's tech stack — Xero / QuickBooks Online / MYOB / Sage subscription via partner discount, Hubdoc / Dext receipt capture, bank feeds, A2X for Shopify/Amazon, payroll software (KeyPay / Gusto / ADP / Rippling / Employment Hero), practice management (Karbon / Ignition). The bookkeeper's "supplier ordering" equivalent — the backbone of every monthly engagement. Get this right or every later workflow skill suffers.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Client tech stack setup — Xero, Hubdoc, bank feeds, A2X, payroll

## Your job

When a new monthly engagement is signed, the agent runs the tech
stack setup. Three subroutines:

1. **Core accounting file** — Xero / QBO / MYOB / Sage subscription
   set up under firm's partner code (saves client 30-50%); firm
   added as adviser; bank feeds requested
2. **Receipt + bill capture** — Hubdoc / Dext / AutoEntry connected;
   rules set against existing supplier base
3. **Add-ons by industry** — A2X for eComm, payroll software for
   employers, Cin7 / Unleashed for inventory, Spotlight Reporting
   for Tier 3+, practice management (Karbon / Ignition)

This is the bookkeeper's equivalent of a plumber's "parts order to
the wholesaler" — except the parts run the engagement for the next
5 years. Getting this right is the single biggest leverage point
for capacity.

## When to trigger this skill

- New monthly engagement signed (full setup)
- Migration from another bookkeeper / accounting file (existing file
  cleanup + re-platforming)
- Client's industry changes (e.g. opens a Shopify store — needs
  A2X)
- Software switch (e.g. MYOB → Xero migration — major project)

## Step 1 — Core accounting subscription

### Xero (AU/NZ/UK/SG/CA — dominant outside US)

Xero offers partner subscriptions that pass through to the client
at 30-50% discount vs retail. The firm gets a partner status
upgrade based on subscription count.

```
XERO SUBSCRIPTION SETUP — [Client]
==================================
Region:               [AU/NZ/UK/CA]
Plan:                 [Starter / Standard / Premium]
                      (Premium for >100 employees + multi-currency)
Add-ons needed:       [Multi-currency / Expenses / Projects / Payroll]
Partner code:         [firm's Xero partner code]
Client billing:       [Direct from Xero to client / Pass-through
                       via firm — pick one in BUSINESS CONFIG]
File location:        [Region-specific data centre]

SETUP STEPS
☐ Subscription created via my.xero.com / Xero HQ
☐ Client signs subscription terms
☐ Firm added as Adviser user with full access
☐ Owner access remains with client (do not take this — the file
   belongs to the client)
☐ Multi-factor auth enabled for both firm + client users
☐ Organisation settings:
   - Legal name, ABN/VAT/BN, trading name
   - GST/VAT/HST registered? Cycle? Cash or accruals?
   - Financial year end (30 June AU, 5 April UK, calendar US/CA)
   - Currency
   - Time zone
   - Chart of accounts (industry-specific template, then tighten)
☐ Lock dates set (lock prior year if applicable)
☐ Branding theme set (firm or client logo on docs sent to
   customers)
```

### QuickBooks Online (US-dominant, also UK/CA/AU)

```
QBO SUBSCRIPTION SETUP — [Client]
==================================
Region:               [US/CA/UK/AU]
Plan:                 [Essentials / Plus / Advanced / Solopreneur]
                      (Plus is minimum for inventory + projects)
                      (Advanced for >25 users or batch invoicing)
ProAdvisor portal:    [firm's ProAdvisor account]
Wholesale billing:    [Y/N — firm bills client at margin]
File location:        [Country-specific data centre]

SETUP STEPS
☐ Client added via ProAdvisor portal
☐ Subscription tier confirmed + wholesale rate applied
☐ Firm added as accountant user
☐ Owner / Primary admin remains with client
☐ Multi-factor auth enabled
☐ Company settings:
   - Legal name + EIN
   - Sales tax setup (state-by-state US — link to Stripe Tax /
      TaxJar / Avalara if multi-state nexus)
   - Fiscal year end
   - Chart of accounts (US: cash vs accrual elected for tax)
☐ App marketplace integrations as needed (see steps below)
```

### MYOB (AU-only, declining but still has market share)

```
MYOB SUBSCRIPTION SETUP — [Client]
==================================
Plan:                 [Business Lite / Business Pro /
                       AccountRight Standard / Plus / Premier]
Partner:              [MYOB Partner Network code]

CRITICAL: If migrating MYOB → Xero or MYOB → QBO, this is a real
project. Quote separately as catch-up / migration work (typically
$1,200-$3,500 fixed-fee depending on file size and date range).
Don't absorb into a monthly engagement.
```

### Sage (UK / CA)

```
SAGE SETUP — [Client]
=====================
Plan:                 [Sage Accounting Start / Standard / Plus]
                      OR Sage Business Cloud Accounting
                      OR Sage 50 / 50cloud (desktop, legacy)
Partner:              [Sage Accountant Cloud]

Note: Sage 50cloud requires desktop install + sync. For new
engagements, recommend Sage Accounting (cloud) instead.
```

## Step 2 — Bank feeds

Bank feeds are the single biggest time-saver in monthly bookkeeping.
A working feed = bank rec in 20 mins. A broken feed = 2 hours of
manual import + categorisation.

```
BANK FEED REQUESTS — [Client]
==============================

For each business account + credit card:
| Bank             | Account type   | Last 4 | Status         |
|---|---|---|---|
| NAB              | Business Tran  | 1234   | Yodlee feed via Xero |
| NAB              | Visa Business  | 5678   | Yodlee feed via Xero |
| Westpac          | Business Acct  | 9012   | Direct feed via Xero |
| AmEx             | Business Gold  | 3456   | Manual import — no direct feed available (AU AmEx) |

PROCESS PER FEED
☐ Bank feed authorisation form signed by client (paper or e-sign)
☐ Form lodged with Xero / QBO / MYOB
☐ Lead time: NAB / CBA / ANZ / Westpac direct feeds 3-5 business
   days; Yodlee feeds 1-2 days; some smaller banks 10+ days
☐ First sync verified (transactions appear in bank statement
   feed, matching online banking)
☐ Backlog imported if starting mid-period

REGIONAL BANK FEED NOTES
- AU: Big 4 (CBA, NAB, ANZ, Westpac) all support direct feeds via
   Xero; Macquarie + ME Bank + Ubank Yodlee
- NZ: ANZ, BNZ, ASB, Westpac, Kiwibank — all supported via Xero
- UK: HSBC, Lloyds, NatWest, Barclays, Santander via Open Banking
   API (PSD2); 90-day re-auth required (Strong Customer
   Authentication)
- US: Most banks via Plaid / Yodlee; QBO has native Direct Connect
   with major banks; some small community banks manual-only
- CA: RBC, BMO, Scotiabank, TD, CIBC, National via direct feed;
   credit unions often Plaid only
```

UK Open Banking 90-day re-auth is a recurring pain point — set a
quarterly calendar reminder per client to re-authorise. The agent
flags this on its Monday sweep.

## Step 3 — Receipt + bill capture (Hubdoc / Dext / AutoEntry)

This is the layer that turns the bookkeeper's hours from 20/mo to
10/mo on a typical client. Source-doc discipline lives or dies
here.

### Hubdoc (free with Xero subscription)

```
HUBDOC SETUP — [Client]
=======================
☐ Hubdoc account created (auto with Xero, or via hubdoc.com)
☐ Linked to client's Xero org
☐ Email forwarding address activated:
   [client-name]@hubdoc.com → client uses this address to
   forward supplier invoices
☐ Mobile app installed on client's phone (iOS / Android) —
   "snap a receipt, it lands in Hubdoc"
☐ Supplier auto-fetch enabled where applicable:
   - Telstra / Vodafone / Optus (AU)
   - AGL / Origin / EnergyAustralia
   - Officeworks / Bunnings (limited)
   - Amazon (varies by region)
☐ Rules set:
   - Supplier → Xero contact mapping (auto-publish where
      consistent)
   - Default GST treatment per supplier
   - Default account code per supplier
   - Default tracking categories (if used)
☐ Auto-publish enabled for high-confidence suppliers (saves the
   bookkeeper a click per receipt)
☐ Client trained:
   - Snap receipts at point of purchase (don't accumulate)
   - Forward email invoices to [client-name]@hubdoc.com
   - Don't pre-categorise — leave the rules to do the work
```

### Dext (formerly Receipt Bank — works with Xero, QBO, Sage)

```
DEXT SETUP — [Client]
=====================
Tier:                 [Standard / Streamline / Optimise]
                      (Streamline adds AP automation; Optimise adds
                       practice-management features)
Cost:                 ~$30-$80/mo per client — usually absorbed in
                      Tier 2 / 3 package, or passed through

☐ Client + firm added to Dext workspace
☐ Linked to Xero / QBO / Sage
☐ Email forwarding address activated
☐ Mobile app installed on client
☐ Supplier fetch (Dext has stronger supplier coverage than Hubdoc
   in UK + Europe)
☐ Rules + auto-publish set (same logic as Hubdoc)
☐ AP automation rules if Streamline+ (approve → schedule →
   pay via integrated Plooto / Bill.com / Wise)
☐ Client trained
```

### AutoEntry (Sage-bundled, also QBO / Xero compatible)

```
AUTOENTRY SETUP — [Client]
==========================
Tier:                 [Standard / Pro]
Cost:                 Per-credit pricing; ~$20-$50/mo per client

☐ Linked to Sage / QBO / Xero
☐ Email + mobile app activated
☐ Rules set
☐ Client trained
```

## Step 4 — A2X for e-commerce (Shopify / Amazon / eBay / Etsy / Walmart)

Mandatory for any eComm client. Direct Shopify-to-Xero coding is
NEVER clean — A2X (or Link My Books / Synder / Webgility) reconciles
payouts to sales, fees, refunds, taxes by jurisdiction.

```
A2X SETUP — [Client]
====================
Channel:              [Shopify / Amazon Seller / Amazon Vendor /
                       eBay / Etsy / Walmart / BigCommerce]
A2X plan:             Based on transaction volume:
                      - Mini (<200 orders/mo): $19/mo
                      - Starter (200-1k): $49/mo
                      - Standard (1k-2.5k): $79/mo
                      - Premium (2.5k-10k): $179/mo
                      - Premium Plus (>10k): $279/mo

☐ A2X account created
☐ Channel connected (Shopify partner / Amazon MWS / etc.)
☐ Linked to Xero or QBO
☐ Sales tax mapping configured:
   - AU GST (10% on AU sales; 0% on exports if registered)
   - NZ GST
   - UK VAT (20% standard, 5% reduced, 0% zero-rated, Out of Scope)
   - US sales tax — by state nexus (link to Stripe Tax / TaxJar /
      Avalara if multi-state; A2X reports the gross + tax for the
      bookkeeper to allocate)
   - CA HST/GST/PST — by province
☐ Bank account / clearing account set up in Xero / QBO for
   payouts
☐ First-month reconciliation done (verify A2X payouts match
   Shopify back-end + Stripe / PayPal payouts)
☐ Bookkeeper monthly process documented:
   - A2X generates settlement journals end of month
   - Bookkeeper publishes journals to Xero / QBO
   - Reconcile payout deposit against settlement journal
   - Variance investigation (refunds, chargebacks, currency
      conversion)
```

## Step 5 — Payroll software

### Australia — STP Phase 2 mandatory

```
PAYROLL SETUP — [Client] (AU)
==============================
Software:             [Xero Payroll / KeyPay (Employment Hero) /
                       MYOB AccountRight / QuickBooks Payroll /
                       Deputy (rostering only — pair with above)]
Staff count:          [n] employees, [n] casuals
Pay cycle:            [Weekly / Fortnightly / Monthly]
STP Phase 2:          MANDATORY — confirm enabled

☐ Employees migrated from prior payroll
☐ TFN declarations on file (digital or paper)
☐ Super fund details per employee (SuperStream-compliant)
☐ Award + agreement classifications set per employee
☐ Allowances + deductions configured:
   - Tool allowance (trades)
   - Vehicle allowance (sales)
   - Meal allowance
   - Salary sacrifice (super / EV / etc.)
☐ Leave balances opening — verify against prior employer / prior
   period
☐ Working holiday maker flag if applicable
☐ Higher Education Loan (HELP) flag if applicable
☐ STP submission to ATO confirmed first pay run
☐ SuperStream lodgement gateway confirmed (Beam / SuperChoice /
   QuickSuper / direct)
☐ FBT applicability reviewed (March year-end)
```

### UK — RTI + Auto-Enrolment

```
PAYROLL SETUP — [Client] (UK)
==============================
Software:             [Xero Payroll UK / Sage Payroll UK /
                       BrightPay / QuickBooks Payroll UK / Moneysoft]
PAYE reference:       [from HMRC]
Accounts Office ref:  [from HMRC]
Pension scheme:       [NEST / People's Pension / Smart Pension /
                       The People's Pension / Standard Life /
                       provider]

☐ Employees migrated
☐ HMRC reference + EAS (Employer Alignment Submission) lodged if
   new payroll
☐ FPS (Full Payment Submission) configured for each pay date
   (RTI)
☐ EPS (Employer Payment Submission) configured monthly
☐ Auto-Enrolment minimum contributions:
   - Employer 3%+ of qualifying earnings
   - Employee 5%+ of qualifying earnings
   (Total 8% minimum; pension scheme details + opt-out window
   confirmed)
☐ P11Ds (benefits in kind) — if applicable, July following tax
   year
☐ P60s — by 31 May following tax year
☐ Statutory Sick Pay (SSP), Statutory Maternity / Paternity Pay
   configured
☐ Apprenticeship Levy (if PAYE bill >£3m) flagged
```

### US — Federal + state

```
PAYROLL SETUP — [Client] (US)
==============================
Software:             [Gusto / ADP RUN / Rippling / QuickBooks
                       Payroll / Paychex / Patriot / OnPay /
                       Square Payroll]
EIN:                  [federal]
State payroll ID(s):  [per state where employees work]

☐ Employees with W-4 / state W-4 on file
☐ I-9 verification on file (HR side; bookkeeper confirms)
☐ Federal tax withholding (income + FICA) configured
☐ State income tax withholding (varies by state — TX/FL/WA no
   state income tax; CA / NY / IL etc. yes)
☐ State Unemployment Insurance (SUI) rate per state
☐ Workers Comp insurance class codes (per state regulator)
☐ 401(k) / 403(b) / IRA deductions if applicable
☐ Garnishments + child support deductions
☐ Pre-tax benefits (health, dental, vision, HSA)
☐ Form 941 filing schedule confirmed (Gusto / ADP auto-file)
☐ Form 940 (FUTA) annual schedule confirmed
☐ State new-hire reporting per state requirement
```

### Canada — federal + provincial

```
PAYROLL SETUP — [Client] (CA)
==============================
Software:             [PaymentEvolution / Wagepoint / Knit /
                       QuickBooks Payroll CA / ADP Canada /
                       Ceridian / Rise / Humi]
BN with RP0001:       [9 digits + RP0001 for payroll]
Provincial WSIB / CSST / WCB account:  [per province]

☐ Employees with TD1 federal + provincial on file
☐ SIN verified for each employee
☐ Federal income tax withholding
☐ Provincial income tax (varies — QC has separate)
☐ CPP / QPP contributions (5.95% employee + 5.95% employer 2025,
   max earnings $68,500)
☐ EI premiums (1.66% employee + 1.66% × 1.4 employer)
☐ Source deduction remittance schedule (regular / accelerated
   threshold 1 / threshold 2 / quarterly small employer)
☐ T4 + T4 Summary by last day of February following tax year
☐ T4A for contractors (if employer-employee relationship grey area)
☐ Provincial WSIB / CSST / WCB premiums + reporting
☐ ROE (Record of Employment) on termination — through ROE Web
```

## Step 6 — Practice management

The firm's PM tool ties everything together. Set up the client
record:

### Karbon (gold standard)

```
KARBON SETUP — [Client]
========================
☐ Client record created (with billing entity, contacts, services)
☐ Engagement created per service tier (Tier 2 / 3 / 4)
☐ Recurring work items templated:
   - Monthly bank rec + close
   - Quarterly BAS / VAT prep + lodge
   - Annual EOY / EOFY
   - Annual review meeting
☐ Email triage rules:
   - Client emails route to client thread
   - Source-doc forwards route to "Source docs" bucket
   - ATO / HMRC / IRS / CRA letters flag URGENT
☐ Client portal access (Karbon Document Sharing) confirmed
☐ Budget per engagement (hours by role) set for capacity tracking
```

### Ignition (engagement + billing focus)

```
IGNITION SETUP — [Client]
==========================
☐ Client record created
☐ Service catalogue items added per tier
☐ Engagement letter template selected (region + tier specific)
☐ Engagement letter sent for e-signature
☐ Recurring billing schedule configured (1st of month)
☐ Direct debit mandate captured (BECS AU / SEPA UK / ACH US /
   PAD CA)
☐ First invoice scheduled
☐ Annual price increase rule set (e.g. CPI + 2% at engagement
   anniversary)
```

### Jetpack Workflow / Senta / FYI / Iconic / IRIS Star

All supported — agent formats the same client record + recurring
work item structure into whichever PM tool the firm uses.

## Step 7 — Reporting + advisory tools (Tier 3+)

For Tier 3 + CFO-lite engagements:

```
REPORTING TOOLS — [Client]
==========================
Tool:                 [Spotlight Reporting / Fathom / Float /
                       Futrli / Joiin / LivePlan]

☐ Linked to Xero / QBO
☐ Monthly management report template selected (P&L variance,
   Balance Sheet trend, Cash position, KPIs)
☐ KPI library configured (gross margin %, customer acquisition
   cost, MRR for SaaS, debtor days, current ratio)
☐ For CFO-lite: 12-week rolling cash forecast in Float, refresh
   weekly
☐ For multi-entity: consolidation in Spotlight or Joiin
☐ Client portal access to dashboard confirmed
```

## Step 8 — Inventory / industry-specific

```
INVENTORY (eComm / wholesale / manufacturing)
☐ Cin7 / Unleashed / DEAR / TradeGecko linked to Xero / QBO
☐ Stock-on-hand reconciled at setup
☐ COGS journal automation reviewed

POS (hospitality / retail)
☐ Square / Lightspeed / Vend / Toast → Xero/QBO via Synder /
   native
☐ Daily sales journal reconciliation set up
☐ Tip reconciliation (US — important for payroll + tax)
☐ Cash-handling AML check (hospitality high-risk)

PROPERTY MANAGEMENT
☐ PropertyMe / Console / Re-Leased trust accounting setup
☐ Tenant ledger → Xero / QBO sync rules
☐ Trust account vs operating account separation enforced
```

## Step 9 — Document the stack in BUSINESS CONFIG

Every client's setup is captured in their record so any team
member can resume:

```
CLIENT TECH STACK RECORD — [Client]
====================================
Core file:            Xero Standard (AU)
Receipt capture:      Hubdoc (linked, auto-publish for 47
                                                suppliers)
Bank feeds:           NAB Business (Yodlee), NAB Visa, AmEx
                      manual import (no AU AmEx direct feed)
Payroll:              Xero Payroll, 4 staff, fortnightly, STP
                      Phase 2 active
Inventory:            N/A
POS:                  N/A
eComm:                N/A
Practice mgmt:        Karbon engagement #[X]
Billing:              Ignition recurring DD $720/mo from
                      [client account]
Reporting:            None (Tier 2)
Setup completed:      [date]
Setup by:             [name]
```

## Hard rules

- **Always set up under firm's partner code** (where applicable) —
  Xero, QBO ProAdvisor, MYOB Partner. Saves client 30-50% on
  subscription; firm gets partner tier credit.
- **Firm is ADVISER, client is OWNER.** Never take owner access.
  The file belongs to the client; we work in it.
- **MFA mandatory** for both firm + client users.
- **Bank feeds requested same day** as engagement — they take days
  to activate.
- **Hubdoc / Dext rules set within first 7 days.** Without rules,
  the bookkeeper is doing the work the tool should do.
- **A2X mandatory for any eComm client.** No direct Shopify → Xero
  coding.
- **Payroll setup never skipped.** Migrating opening balances
  wrong = 12 months of payroll errors.
- **PM tool record created.** Engagement without a Karbon /
  Ignition / Jetpack record is engagement that disappears.
- **MTD-compatible software in UK** — mandatory. No "we'll do it in
  a spreadsheet" — that's a regulatory breach for VAT-registered
  clients.
- **STP Phase 2 enabled in AU** — mandatory since 1 Jan 2022.
  Pre-Phase 2 setup means non-compliant payroll.

## Reading the learnings.md

Track:

- Average days from engagement signed to fully onboarded (target:
  ≤21 days)
- % of clients on Hubdoc / Dext (target: 100% of Tier 2+)
- % of clients with all bank feeds active (target: 100%)
- % of eComm clients with A2X (target: 100% — exceptions are
  catch-up-only)
- Most common setup pain points (e.g. "UK Open Banking 90-day
  re-auth eats 2 hrs/qtr") — surface fixes (set Karbon recurring
  task)

## Confirm + handoff

> *"Tech stack setup for [Client] in progress: Xero subscribed +
> firm added as adviser, Hubdoc connected, bank feeds requested
> ([X] business days to activate), [payroll / A2X / Spotlight] in
> [progress/queued]. Onboarding complete target: [date — 21 days
> from engagement]. Loading `04-dispatch.md` to lock the monthly
> close calendar."*
