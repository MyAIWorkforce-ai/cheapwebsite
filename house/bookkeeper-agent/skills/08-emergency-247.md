---
name: bookkeeper-urgent-deadline-rescue
description: Deadline-rescue triage — ATO penalty notice, missed BAS, ATO / HMRC / IRS / CRA audit notification, payroll emergency (terminated employee + missed STP, allowance error), lost data (Xero file restore, bank statement gap), client's previous bookkeeper has disappeared with the file. Triage fast, surface to partner, draft the regulator response, never lodge under pressure without sign-off.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Emergency — deadline-rescue + regulator triage

## Your job

When a client message arrives marked URGENT or signals one of the
emergency categories, the agent triages within minutes:

1. **Real emergency?** (ATO / HMRC garnishee threat, audit
   commencement, missed BAS already past deadline, payroll error
   with money flow impact) → immediate partner involvement
2. **Urgent but not crisis?** (penalty notice received, BAS due
   in 3 days, client just sent a confusing letter) → respond
   today
3. **Routine "client thinks it's urgent"?** (general worry, "the
   ATO sent me something") → calm + scope + handle in next 24
   hours

Bookkeeping emergencies have a slower clock than plumbing
emergencies (no burst pipe) BUT the consequences last longer (ATO
penalties compound; audit findings stick for years; payroll
errors damage employee trust). The agent's job is to NOT panic,
get the facts straight, and surface the right response within
hours.

## Triage rules

| Signal | Classification | Action |
|---|---|---|
| ATO Garnishee / Director Penalty Notice | EMERGENCY | Same-day partner + Tax Agent involvement; surface to client; do not lodge or pay anything without Tax Agent direction |
| HMRC / IRS / CRA formal audit / investigation | EMERGENCY | Same-day partner + registered Tax Agent / CPA / EA / CA; bookkeeper supports, doesn't lead |
| Missed BAS / VAT / payroll lodgement | URGENT (today) | Lodge same-day if firm registered; calculate penalty exposure; respond to regulator |
| Penalty notice received | URGENT (24h) | Read carefully; categorise; draft response or objection; refer if outside scope |
| Payroll emergency — wrong pay, missed STP, termination pack | URGENT (today, same-pay-day) | Fix the pay calc first; STP correction second; communication to employee third |
| Lost data / file corruption / Xero file restore | URGENT (24h) | Engage Xero/QBO support; restore from latest backup; assess data gap |
| Previous bookkeeper gone with file | URGENT (this week) | Demand transfer per professional body code of conduct; lodge complaint if ignored |
| Client's bank feed broken | NOT URGENT (this week) | Re-auth process; manual import gap fill |
| Generic worry — "the ATO sent something" | NOT URGENT (calm + 24h) | Ask for the letter; categorise; respond |

## Step 1 — Acknowledge fast, panic never

Even if it's a real emergency, the first reply is calm. Bookkeeping
clients panic; the bookkeeper holds the line. Send within 30
minutes of receipt:

```
Hi [first name],

Got your message about [issue]. Stay calm — these are usually
fixable, and even the ones that have a cost attached can almost
always be reduced through the right process.

Before I jump in, I need to see:

1. The letter / notice from [ATO / HMRC / IRS / CRA / payroll
   system] — full document, both sides, including reference
   numbers
2. [If payroll] The employee's last 3 payslips + termination
   details if applicable
3. [If file issue] What you were doing when the issue started,
   and roughly when

Send those through and I'll come back with a plan within [2
hours / EOD today / first thing tomorrow morning].

If the letter has a "respond by" date in the next 7 days, tell me
the date now so I can prioritise.

[your name]
[Firm name]
```

## Step 2 — ATO Garnishee / Director Penalty Notice (DPN)

The most serious AU compliance event a bookkeeper sees. The ATO
can:

- Issue a Garnishee Notice to the client's bank, debtors, or
  employer — the bank then redirects funds to the ATO
- Issue a DPN to directors personally, making them liable for
  unpaid PAYG-W or super (sometimes locked DPN with 21 days; some
  with 21 days lockdown; some non-lockdown)

The agent triages:

```
DPN / GARNISHEE TRIAGE — [Client]
==================================
Type:                 [Garnishee / Lockdown DPN / Non-lockdown DPN]
Date issued:          [date on notice]
Date received by client: [date]
Response window:      [21 days for DPN; immediate for Garnishee]
Amount:               $[X]

IMMEDIATE ACTIONS (today)
1. Confirm notice is genuine (call ATO on official 13 28 66 to
   verify; don't call the number on the letter)
2. Surface to firm partner immediately
3. Notify the client's Tax Agent (if separate from firm) — they
   lead any objection
4. Do NOT pay anything until Tax Agent advises strategy
5. Do NOT lodge a quick BAS to "look compliant" without scope
   review — partial lodgement can lock the DPN

NEXT 7 DAYS
6. Reconcile underlying liability — is the amount correct?
7. Confirm payment plan negotiation eligibility (Lockdown DPN has
   limited remedies)
8. Tax Agent prepares objection if grounds exist (genuine
   underlying error, insolvency timing, etc.)
9. Director may need personal advice from insolvency practitioner
   if amounts >$50k

BOOKKEEPER'S SCOPE
- Reconcile the underlying liability (yours)
- Provide workpapers + lodgement history (yours)
- Document the bookkeeper's communication to client about
  outstanding lodgements (yours — protect the firm if client
  claims they "weren't told")
- Do NOT negotiate with the ATO (not yours — Tax Agent's)
- Do NOT advise on insolvency / personal liability (not yours —
  Tax Agent / Insolvency Practitioner / Lawyer)
```

The agent renders a draft client email surfacing the seriousness:

```
Hi [first name],

I've reviewed the notice. This is a [Garnishee / Lockdown DPN /
Non-lockdown DPN] from the ATO — they are serious notices that
need a coordinated response.

Here's where we are:

- [Plain explanation of what the notice is and what triggers it,
   in 2-3 sentences]
- The underlying ATO debt is $[X], relating to [PAYG-W /
   superannuation guarantee charge / GST] for [period]
- Response window: [date]

What needs to happen this week:

1. Call with [Tax Agent name] + me + you — they lead the
   negotiation strategy. I'll set this up by EOD today.
2. I'll reconcile the underlying ATO position from my side —
   confirm the amount is accurate.
3. [Tax Agent] will assess objection grounds and / or
   payment-plan negotiation options.

What you should NOT do:

- Pay the amount immediately to "make it go away" without the
  strategy call — payment can preclude options.
- Ignore it — the consequences escalate fast.
- Call the ATO yourself and try to negotiate — that's [Tax
  Agent]'s job and frankly they'll handle it better.

Confirm you've got the notice, share it with me as a PDF if you
haven't already, and I'll book the call.

[your name]
[Firm name]
[BAS Agent #]
```

## Step 3 — Missed BAS / VAT lodgement

Less catastrophic but common. The agent calculates the penalty
exposure and lodges immediately (if registered):

```
MISSED LODGEMENT TRIAGE — [Client]
===================================
Lodgement:            [BAS Q[X] FY[year] / VAT Q[X] / 941 Q[X]]
Original due:         [date]
Days overdue:         [N]
Penalty regime:       [AU FTL penalty + GIC; UK MTD penalty
                        regime; US Form 941 5% + interest]

PENALTY EXPOSURE (estimate)
- AU Failure-to-Lodge (FTL): 1 unit = $313 (1 Jul 2025 onward),
   accruing each 28 days late, max 5 units
- General Interest Charge (GIC) on outstanding tax: 11.34%
   (compounded daily — check current ATO rate)
- UK MTD penalty points: 1 point per missed VAT return; 4
   points (quarterly cycle) = £200 penalty; further points each
   £200
- US Form 941: 5% of unpaid tax per month late, max 25%; plus
   failure-to-pay 0.5% / month
- CA GST/HST: 1% + 25% × (number of months late, max 12)

IMMEDIATE
1. Reconcile the lodgement quickly (the closer to the original
   liability, the lower the penalty exposure)
2. Lodge same-day if firm is registered
3. Calculate the actual liability + interest accrued
4. Email client with: amount, penalty likely, remission grounds
   if any
5. Lodge remission request if there are grounds (genuine first
   offence, technical hardship, ATO/HMRC system issues)
```

Lodgement remission request (AU example):

```
Subject: Remission of FTL penalty + GIC, [Client] BAS Q[X]
         FY[year]

Dear ATO Officer,

We refer to BAS for [Client], ABN [X], for the quarter ending
[date], lodged [date — N days late].

We respectfully request remission of the failure-to-lodge (FTL)
penalty of $[X] and the General Interest Charge accrued of $[Y]
on the grounds:

[Choose one or more genuine grounds — DO NOT FABRICATE]
- This is the client's first lodgement default in [N] years of
   regular lodgements; the client has otherwise excellent
   compliance history
- The delay was caused by [specific genuine reason — e.g. ATO
   portal access issues during the lodgement window between [date]
   and [date]; bank fraud event disrupting reconciliation; primary
   contact health event]
- The lodgement was prepared by the deadline; the lodgement
   itself was delayed by [N] days due to [reason]
- The underlying tax position is correct (no GST shortfall, no
   PAYG-W shortfall)

We attach evidence supporting the above and confirm:

- The BAS is now lodged ([receipt #])
- Payment is in train via [direct debit / BPAY] on [date]
- Steps have been put in place to prevent recurrence (e.g.
   automated calendar reminder via Karbon 14 days before each
   future lodgement)

[Partner name]
[BAS Agent #]
For: [Client name + ABN]
```

## Step 4 — Audit / formal investigation

Different from a "compliance check letter" (which is routine and
covered in `05-compliance.md`). A formal audit triggers different
protocol:

```
AUDIT TRIAGE — [Client]
========================
Auditor:              [ATO / HMRC / IRS / CRA + officer name]
Audit reference:      [as per letter]
Period under review:  [year / years]
Scope:                [specific items / general]
Response window:      [as per letter, usually 21-30 days
                       initial response]

IMMEDIATE
1. Acknowledge audit to officer within 5 business days,
   confirming the client's registered Tax Agent / CPA / EA / CA
   will lead the response
2. Notify Tax Agent within 24 hours; arrange handover meeting
3. Stop any in-progress non-emergency client work — divert
   capacity to audit prep
4. Quote the audit-support pack (`02-quote-callout.md`)
   separately — most monthly engagements explicitly exclude
   audit response work

BOOKKEEPER ROLE
- Workpaper preparation
- Source-doc reconciliation
- Lodgement history extraction
- Workings explanation (e.g. "this GST treatment was applied
   because XYZ")
- Document control during the audit

NOT BOOKKEEPER ROLE
- Negotiating with the auditor
- Settling tax position
- Making technical arguments on the law
- Representing client at meetings (Tax Agent / lawyer)
```

## Step 5 — Payroll emergencies

The most common emergency category. Time-sensitive because
employees feel them immediately.

### Wrong pay (over or under)

```
WRONG PAY — [Client] — pay period ending [date]
================================================
Employee:             [name]
Issue:                [Underpaid / Overpaid / Wrong tax / Missing
                       allowance / Missed leave loading]
Amount:               $[X]
Discovered:           [Pre-pay / Post-pay]

IF PRE-PAY (catch before submission)
1. Recalculate correct pay
2. Reissue payslip
3. Resubmit STP / RTI / 941 with correct amount
4. Email employee with the correction

IF POST-PAY (after submission + bank transfer)
1. Recalculate correct pay
2. Determine variance $
3. UNDERPAYMENT: Process top-up pay run for the variance (with
   tax + super treated as supplementary income); reissue
   payslip; resubmit STP correction
4. OVERPAYMENT: Discuss with client owner — recover from next
   pay period (with employee written consent in AU under Fair
   Work Act), or write off if small
5. STP / RTI correction submitted same day
6. Super recalculation if applicable
7. Email employee with explanation + apology + corrected
   payslip
8. Document in payroll register for EOY reconciliation
9. Identify root cause — log in `learnings.md` to prevent
   recurrence
```

### Termination pack (employee leaves)

```
TERMINATION PACK — [Client] — [Employee] — last day [date]
==========================================================
Type:                 [Resignation / Termination / Redundancy /
                       Dismissal]
Last day worked:      [date]
Notice period:        [paid out / worked]
Payment date:         [usually next pay run, or earlier on
                       request]

PROCESS
1. Final pay calculation:
   - Wages to last day
   - Outstanding leave (annual + LSL if applicable)
   - Notice payment (worked or paid out)
   - Redundancy payment (if applicable, taxed concessionally)
   - Termination payment (TOFA / golden handshake — if any,
      Tax Agent's call on classification)
2. Tax treatment:
   - AU: Employment Termination Payment (ETP) cap; concessional
      withholding rate; lump sum reporting via STP Phase 2
   - UK: PAYE on notice + final pay; £30k tax-free redundancy
      threshold
   - US: Final pay laws vary by state (CA = same day for
      involuntary; some states = within X days)
   - CA: ROE (Record of Employment) within 5 days of last pay
3. Super / pension finalisation:
   - AU: Final super contribution at next quarterly SG
   - UK: Final pension contribution + scheme leaver notice
   - US: 401(k) final contribution + COBRA notification
   - CA: Final CPP / EI contribution + ROE
4. Employee documents:
   - Payslip for final pay
   - PAYG payment summary / W-2 / T4 generated at EOY
   - Reference letter (HR side, not bookkeeper)
5. STP / RTI / 941 final submission with finalisation flag
6. Remove from active employee list in payroll system
```

### Missed STP (AU)

STP Phase 2 requires each pay event reported on or before pay
date. Missed STP:

```
MISSED STP — [Client] — pay date [date]
========================================
Pay run lodged via:   [Xero Payroll / KeyPay / MYOB / QBO]
STP submission status: NOT SUBMITTED

IMMEDIATE
1. Submit STP for the pay event same-day
2. If portal error: re-attempt; if still failing, log support
   ticket with payroll software; submit via ATO portal manually
   if needed
3. Document the delay (for ATO if asked later)
4. Confirm SG (super guarantee) calc isn't affected (super
   reporting is separate; check quarterly SG lodgement)

PENALTY RISK
- ATO has been lenient on STP penalties since Phase 2 commencement
- Repeated missed STP can escalate to Failure to Withhold
   penalty — refer to Tax Agent if pattern
```

## Step 6 — Lost data / file corruption

```
DATA EMERGENCY — [Client]
==========================
Type:                 [Xero file inaccessible / QBO corruption /
                       Bank feed broken with gap / Client deleted
                       transactions / Cyber incident]

IMMEDIATE (today)
1. Stop further changes to the file (lock if possible)
2. Engage software vendor support:
   - Xero: support.xero.com — file restore from snapshot
      possible within 90 days
   - QBO: support.intuit.com — file rollback to last good state
   - MYOB: file backup restore (desktop) / cloud snapshot
3. Restore from latest known-good backup (firm should be backing
   up Xero / QBO monthly to PDF + JSON via tools like Joiin /
   Movemybooks / native exports)
4. Assess data gap — what's missing, what date range
5. Reconstruct from source:
   - Bank statements (bank can re-issue)
   - Hubdoc / Dext receipt archive
   - Email exports for sales invoices
   - Stripe / Square / Shopify exports for revenue
6. Quote the reconstruction work (this is catch-up — separate
   fee, not in monthly engagement)

CYBER INCIDENT-SPECIFIC
- Client confirms suspected unauthorised access to file
- Force MFA reset on all users
- Run audit log in Xero / QBO for last 90 days
- Identify any altered transactions
- Notify Tax Agent if lodged returns are affected
- Consider notifiable data breach reporting:
   - AU: Notifiable Data Breaches scheme (OAIC)
   - UK: ICO within 72 hours
   - US: state-by-state breach notification laws
   - CA: PIPEDA + provincial
```

## Step 7 — Previous bookkeeper has disappeared with the file

A recurring intake pattern. Client comes to the new firm with no
file access, no recent statements, often no recent BAS lodged:

```
ABANDONED BOOKKEEPER — [Client]
================================

IMMEDIATE
1. Request file transfer from previous bookkeeper formally —
   client signs request letter
2. Reference professional body code of conduct:
   - AU ICB Code of Conduct: bookkeepers must return client
      records on request
   - AU TPB Code of Professional Conduct: BAS Agents must
      return client property
   - UK ICB / AAT / ACCA: equivalent obligation
   - US AICPA Code: equivalent
   - CA CPB: equivalent
3. Lodge complaint with professional body if previous
   bookkeeper refuses / doesn't respond within 14 days

WORKAROUND IF FILE UNRECOVERABLE
1. Engage client to provide:
   - Bank statements (re-issue from bank if needed)
   - Tax File Number / GST registration / payroll cycle info
   - Last lodged BAS / VAT for opening balances
   - List of suppliers and customers
2. Set up clean Xero / QBO file
3. Quote the reconstruction work separately (catch-up rates)
4. Reference last lodged BAS as opening position; reconstruct
   forward
5. Flag the gap to client's Tax Agent — they may need to
   estimate the gap period in the income tax return
```

## Hard rules

- **Never lodge under pressure without partner sign-off.** Speed
  is necessary; recklessness is not.
- **Never pay an ATO / HMRC notice on the client's behalf without
  Tax Agent input.** Some payments are strategic; some are
  defaults.
- **Never argue with the regulator** — disagreement comes via
  formal objection, not email tone.
- **Same-day acknowledgement on every emergency**, even if the
  solve takes longer.
- **Always confirm notice is genuine.** Phishing letters
  impersonating the ATO / HMRC / IRS / CRA are common. Call the
  regulator on the official published number.
- **Audit / formal investigation = Tax Agent leads.** Bookkeeper
  supports. Never lead the negotiation.
- **Payroll errors fixed same day they're discovered.** Don't
  delay employee comms.
- **Cyber incident? Escalate to client's owner FIRST, not just
  the contact you usually talk to.** Owner decides on disclosure.

## Reading the learnings.md

Track emergencies in `learnings.md`:

- Frequency of each emergency type (target: trending down)
- Clients with multiple emergencies (signal — review tier or
  disengage)
- Common root causes (e.g. "Missed STP 3 times this quarter, all
  from same payroll software bug — replace tool")
- Time to first response (target: ≤30 min for URGENT)
- Penalty exposure avoided through fast lodgement / remission
  (track in $ — surface in monthly client report; reinforces
  value of the engagement)

## Confirm + handoff

> *"Emergency triaged for [Client]: [type — e.g. ATO DPN]. Partner
> notified. Tax Agent contacted. Client acknowledgement sent.
> Action plan: [3 next steps]. Loading [05 / 06 / 04 as needed]
> for follow-through. I'll update at [time]."*
