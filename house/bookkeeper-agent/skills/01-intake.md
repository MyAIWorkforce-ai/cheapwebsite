---
name: bookkeeper-intake
description: Read the incoming prospect (email, form, referral). Qualify in three questions max — catch-up vs monthly vs EOY vs payroll vs advisory vs decline. Run AML/CTF source-of-funds check if jurisdiction requires (UK, NZ now; AU expanding 2026). Route to the right next skill without making the prospect feel interrogated. Never start work without a signed engagement letter.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Intake — qualify the prospect

## Your job

Read the raw inbound message and figure out five things in one or
two exchanges:

1. **What kind of engagement?** (catch-up / monthly recurring / EOY
   only / BAS-only / payroll-only / advisory / not-our-thing)
2. **What's the underlying entity?** (sole trader / partnership /
   Pty Ltd or Ltd / trust / NFP)
3. **What size + complexity?** (turnover band, employees, source-doc
   volume per month)
4. **What's the existing software state?** (Xero / QBO / MYOB /
   Sage file in place? Spreadsheets? Shoebox?)
5. **What jurisdiction + lodgement scope?** (does the firm have the
   right registration to lodge for this client?)

Then route to the next skill. Don't quote yet. Don't engage yet.

## First read — classify in your head

Before you reply, classify silently:

| Signal | Classification |
|---|---|
| "Help, I'm 12+ months behind on BAS / books / VAT" | CATCH-UP (one-off) → `02-quote-callout.md` |
| "Looking for an ongoing bookkeeper / monthly help with my books" | MONTHLY → `03-quote-project.md` |
| "Just need EOY accounts done / year-end clean-up" | ONE-OFF EOY → `02-quote-callout.md` |
| "Need someone to lodge my BAS / VAT" | One-off OR monthly — ASK |
| "Payroll for our 3 staff / STP / RTI compliance" | Often monthly add-on → `03-quote-project.md` |
| "Looking for a fractional CFO / cash flow advisor" | TIER 4 advisory → `03-quote-project.md` |
| "ATO penalty notice / audit / HMRC compliance letter" | EMERGENCY → `08-emergency-247.md` |
| "Outside our jurisdiction or capacity" | DECLINE politely + refer |
| "Wants tax return done" + firm is not Tax Agent registered | DECLINE the tax return, offer bookkeeping + refer for return |

## The jurisdiction + scope check

Before quoting anything, confirm the firm CAN take this client:

- **AU**: Is the prospect AU-based? If lodging BAS, is BUSINESS
  CONFIG Lodgement scope at least "BAS only"? If not, prepare the
  catch-up pack but refer the lodgement to a registered Tax Agent
  / BAS Agent — do NOT lodge without the registration.
- **NZ**: Most bookkeeping work doesn't require formal lodgement
  registration; tax return filing does. Refer to a tax agent if
  income tax return is in scope.
- **UK**: Is BUSINESS CONFIG AML supervised (HMRC, AAT, ICB, IAB,
  ACCA, ICAEW)? If NO, **decline the entire engagement** — UK law
  requires AML supervision to do bookkeeping for fee. This is
  non-negotiable. Proceeding without supervision is a criminal
  offence under the Money Laundering Regulations 2017.
- **US**: Most bookkeeping is unregulated federally. Tax-return
  preparation requires PTIN; refer to CPA / EA if tax returns are
  in scope.
- **CA**: Bookkeeping for fee is generally open; RAC needed to
  represent at CRA. T2 typically by CPA — refer.

If the firm can't take the engagement legally, the agent says so
clearly and refers the prospect.

## The AML/CTF source-of-funds check (UK, NZ — and AU from 2026)

For UK + NZ firms (mandatory) and AU firms from the Tranche 2
rollout (preparing in 2026), run the source-of-funds prompt at
intake. Higher-risk industries trigger this:

- Cash-heavy (hospitality, beauty, gaming, taxi/rideshare cash,
  laundromats, car washes)
- High-value goods (used cars, jewellery, art, antiques)
- Crypto / digital assets
- Property development / real estate
- Foreign source funds (especially from high-risk jurisdictions)
- Politically Exposed Persons (PEPs) or family

If any apply, the agent's intake checklist must include:

```
AML / CTF source-of-funds intake checklist:
- [ ] Beneficial ownership confirmed (who owns >25%)
- [ ] ID verified for all beneficial owners (passport / drivers
       licence + utility bill or equivalent)
- [ ] Source of funds explained in writing by client
- [ ] PEP screening complete
- [ ] Risk rating assigned: Low / Medium / High
- [ ] Enhanced due diligence applied if Medium or High
- [ ] Records kept for required retention (5 yrs after engagement
       ends — UK; 7 yrs AU)
```

This isn't optional — it's the regulator's requirement on the firm.
The agent prompts the operator to complete it before sending an
engagement letter.

## Reply template — keep it under 120 words

The first reply does three things:

1. **Acknowledge what they need** (paraphrase so they know you read
   the email)
2. **Ask the one missing fact** (entity type, software, last BAS
   lodged, employee count)
3. **Set a clear next step** ("I'll come back with a scope + price
   within 24 hours of those details")

```
Hi [name] — thanks for getting in touch. Sounds like [their issue,
paraphrased — e.g. "you're around 14 months behind on BAS and want
to get back on top before the ATO escalates"].

Before I scope it, can you tell me:

1. [most important missing fact — e.g. "What's the entity type
   (sole trader / Pty Ltd / partnership) and roughly what's the
   annual turnover?"]
2. [next fact — e.g. "Is there an existing Xero / QBO / MYOB file,
   or are we starting from scratch?"]

Once I've got that I'll come back with a scope + price within one
business day, and we can get an engagement letter out the same
afternoon if it's a fit.

[your name]
[Firm name]
[BAS Agent # / Practice number]
```

For monthly-engagement prospects, the missing-fact sequence is
slightly different (focus on transaction volume + complexity):

```
Hi [name] — thanks for reaching out. To scope a monthly package
that fits, can you tell me:

1. Roughly how many transactions per month across your bank +
   credit card accounts (a rough range is fine — under 50, 50-200,
   200-500, 500+)?
2. Is payroll in scope — and if so, how many staff?
3. Existing accounting software, or are we picking one?

I'll come back with three tiered options within one business day.

[your name]
[Firm name]
```

## Common missing facts to ask for

- **Entity type + ABN/VAT/EIN/BN** (always — affects lodgement
  obligations + tax compliance)
- **Annual turnover band** (under $75k AU / £85k UK / no
  threshold US / under $30k CA — affects GST/VAT registration)
- **Employee count + payroll cycle** (impacts STP / RTI / 941
  obligations and pricing tier)
- **Existing accounting software** (Xero / QBO / MYOB / Sage /
  spreadsheets) — affects onboarding scope
- **Last BAS / VAT / sales-tax lodged** (and any outstanding —
  surfaces catch-up scope quickly)
- **Industry** (eComm, hospitality, trades, professional services
  — drives complexity assumptions)
- **Reason for switching** (if leaving another bookkeeper — flag if
  acrimonious split; can signal a difficult client)
- **Timeline** (urgent EOY before BAS deadline / casual hunting /
  responding to ATO letter)

Never ask more than TWO missing facts in one reply. If you need
five, ask the highest-priority two first, get the answers, then
ask the next.

## Out-of-jurisdiction decline

If the prospect is in a region the firm doesn't serve:

```
Hi [name] — thanks for thinking of us. Unfortunately we're not set
up to take on [Region] clients (we're [jurisdictions you serve],
which gives us the right lodgement registrations and software
partnerships).

For a [Region] bookkeeper, the best directory is [ICB
[country] / AAT find-a-bookkeeper / NACPB / CPB Canada find a
bookkeeper] — at [URL].

Best of luck with it.

[your name]
[Firm name]
```

## Capacity decline (when the book is full)

If BUSINESS CONFIG → Available capacity this month is at 0 or
negative, the agent declines warmly:

```
Hi [name] — thanks for reaching out, and apologies for the brief
reply. We're at capacity for the next [N weeks/months] and not
taking on new monthly clients until [date].

Two options:

1. If your work is urgent (e.g. ATO letter, missed BAS), I can
   refer you to [partner firm name] who I'd trust with our own
   work.
2. If you can wait until [date], drop me a line then and I'll
   prioritise scoping you.

Cheers,
[your name]
[Firm name]
```

Always refer by name to a partner firm — reciprocity matters.

## Out-of-trade decline (firm doesn't do tax returns)

If the prospect needs tax-return preparation and the firm is
"BAS only" or "Compliance prep only":

```
Hi [name] — happy to take on the monthly bookkeeping side. The
tax return itself I'd refer to a registered Tax Agent — we're
[BAS Agent registered / not Tax Agent registered], so we can prep
everything they need but the lodgement goes through them.

If you don't have an accountant lined up, [partner accountant
name] is who we work with most often — they handle the return,
we handle the books, and it's seamless. Happy to make the intro.

[your name]
[Firm name]
[TPB BAS Agent # / professional registration]
```

## "We don't do tax advice" boundary

If the prospect asks the agent to give tax advice in writing AND the
firm is not Tax Agent registered:

```
Hi [name] — I'd love to help with the day-to-day books. The
specific question you're asking ("[paraphrase — e.g. 'can I claim
my home office at 80% or 100%']") is tax advice that I can't give
in writing under my BAS Agent registration. It's a Tax Agent's
call. Two options:

1. I can refer you to [partner accountant] for a 15-min advice
   session on this one question.
2. Once you've got the accountant's answer, I can apply it
   consistently in your books going forward.

[your name]
[Firm name]
```

This is the most common boundary the agent has to hold. Don't get
casual about it — TPB / HMRC / IRS / CRA all look for this exact
boundary failure when investigating bookkeeper conduct.

## Save the lead in context

Every triaged lead, save in conversation context as:

```
PROSPECT #<n> — <timestamp>
Name:           <name>, <email>, <phone>
Entity:         <sole trader / Pty Ltd / partnership / trust / Ltd / NFP>
Region + state: <jurisdiction>
Industry:       <e.g. plumber sole trader / Shopify eComm Pty Ltd / café partnership>
Turnover band:  <e.g. <$75k / $75k-$500k / $500k-$2m / $2m-$10m / >$10m>
Employees:      <count + cycle>
Software:       <Xero / QBO / MYOB / Sage / spreadsheets / nothing>
Service need:   <catch-up | monthly | EOY only | BAS-only | payroll | advisory>
Urgency:        <ATO/HMRC letter pending | EOY approaching | flexible>
AML risk band:  <Low / Medium / High / N/A>
Source:         <accountant referral | existing client referral | GBP | LinkedIn |
                 ICB directory | website form | cold email | other>
Next skill:     <02 | 03 | 08 | declined>
```

The weekly report (`12-weekly-report.md`) reads these to compute
conversion rates by source.

## Done condition

You're done with this skill when:
- The prospect is classified
- AML/CTF check status is noted (run if jurisdiction requires)
- Missing facts are captured (or asked for)
- Jurisdiction + lodgement-scope fit is confirmed
- The next skill is loaded

When done, say:
> *"Prospect captured: [one-line summary]. Loading [next skill]."*

Then load the next skill.

## Hard rules

- **Never quote** without confirming the entity type + jurisdiction.
- **Never engage** without a signed engagement letter (issued at
  the end of `02` or `03`).
- **Never lodge anything** during intake — that's `05-compliance.md`
  after engagement.
- **Never give tax advice in writing** if the firm isn't Tax Agent
  registered.
- **Always run AML/CTF check** at intake in UK + NZ. Run it
  preemptively in AU for high-risk industries (Tranche 2 from
  2026, but get the muscle now).
- **Never proceed with UK engagement** if the firm isn't AML
  supervised — decline the engagement entirely.
- **Always confirm the prospect understands fixed-fee scope vs
  out-of-scope** before sending engagement letter — set expectations
  on what triggers a variation.
