---
name: stripe-account-setup
description: Take the user from no Stripe account (or partial setup) to an activated account that can accept real payments and route payouts to their bank. Handles KYC + business verification per country (AU ABN, NZ NZBN, UK Companies House, US EIN, CA BN), 2FA hardening, statement descriptor branding, and payout schedule.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Account setup

## Your job

Get the operator's Stripe account fully activated so payments can
be accepted and payouts can land. This is dashboard-only — no API
keys needed. By the end, the account is **live**, **branded**,
**2FA-hardened**, and **routing payouts to the right bank**.

This skill is usually the longest in the bundle (30-45 minutes
elapsed; mostly waiting on the operator to fill forms). Worth
doing properly — every later skill assumes this is done right.

## Steps

### 1. Account or sign-in

Ask: *"Do you have a Stripe account already?"*

**Yes** — tell them to log in at `dashboard.stripe.com` and confirm
they can see the dashboard. Have them screenshot or describe:
- Is there a yellow "Activate Account" banner at the top?
- Is the toggle at the top-right showing "Test mode" or no toggle
  visible (live)?
- Has any test payment been processed?

This tells you what state they're actually in.

**No** — walk them through `dashboard.stripe.com/register`:
1. Email — use the business email, not personal
2. Country — **critically important**, can't change later
3. Business type — Individual / Company / Non-profit
4. Password
5. Two-step verification — set up an authenticator (Google
   Authenticator, Authy, 1Password). SMS-only is allowed but
   weaker — recommend authenticator.

**Hard rule: the country chosen at signup determines fee structure,
payout currency, tax setup, and which payment methods are
available. It cannot be changed later.** If the operator's based
in AU but signs up under US (because the docs are easier), they'll
hit blocking issues later. Confirm Region from BUSINESS CONFIG
before they click create.

### 2. Activate the account — business details

Top of dashboard: **Activate Account** (or "Complete your
profile"). Fill section by section.

**Business details** — collect from BUSINESS CONFIG:

| Region | What Stripe asks for |
|---|---|
| AU | Business type, ABN (11 digits), registered business name + trading name, business address |
| NZ | NZBN (13 digits), GST registration status, registered name + address |
| UK | Companies House number (8 digits), VAT number if registered, registered office address, SIC code |
| US | Business type (LLC / C-Corp / Sole Prop), EIN (or SSN if sole prop), DBA if used, state of formation, business address |
| CA | Business Number (9 digits), legal name, business address, province of operation |

Tell the operator: **enter the legal name exactly as it's registered**.
Slight mismatches (extra space, "Ltd" vs "Limited", "Pty Ltd" vs "Pty.
Ltd.") cause delays — Stripe re-verifies against the official
registry.

Common stumbles:
- AU: ABN must be active and current. Check at `abr.business.gov.au`
  before entering.
- UK: Companies House number is 8 digits including leading zeros.
  Don't strip.
- US: EIN is `XX-XXXXXXX` format (9 digits, hyphen at position 3).
- CA: BN is 9 digits, often shown as `123456789RT0001` — Stripe
  wants just the 9-digit root.

### 3. Activate the account — representative + owners

Stripe requires identity verification on:
- The **account representative** (the person operating Stripe)
- Each **beneficial owner** with >25% ownership
- The **director(s)** if a company

For each:
- Full legal name (matching ID)
- Date of birth
- Home address
- Government ID — driver's licence, passport, or national ID
- (US) SSN last 4 digits at minimum; sometimes full SSN
- (UK/AU/NZ) sometimes a selfie + ID upload

**The ID upload step is where most operators get stuck.** Tell them:
- Use a phone, not a scanner (Stripe wants the angles / glints to
  prove it's real)
- Make sure all 4 corners are visible
- No glare on the photo
- If rejected, take a fresh photo in better light — don't re-submit
  the same one

Verification usually clears in minutes; can take 1-5 business days
for company structures. The operator can keep building products and
test charges while waiting.

### 4. Activate the account — bank account for payouts

Stripe needs the bank where payouts land. By country:

| Region | What Stripe asks for |
|---|---|
| AU | BSB (6 digits) + account number |
| NZ | NZ bank account number (XX-XXXX-XXXXXXX-XXX format) |
| UK | Sort code (XX-XX-XX) + account number (8 digits) |
| US | Routing number (9 digits) + account number — must be ACH-capable; some online banks need a separate ACH routing |
| CA | Institution (3 digits) + Transit (5 digits) + Account number |

Common stumbles:
- **Don't use a credit-card-only bank**. The destination must accept
  ACH / BECS / BACS / EFT credits.
- **Personal vs business**. Personal accounts work for sole traders.
  For companies, Stripe usually requires a business account with
  matching legal name.
- **Test deposits**. In US + some regions, Stripe sends two micro-
  deposits ($0.01) for verification. Watch the bank for these and
  confirm in dashboard.
- **AU**: BSB-account combinations occasionally bounce on first
  payout. If first payout fails, Stripe emails — re-check digits.

### 5. Set the statement descriptor — high impact

This is what shows up on the customer's card statement after they
buy. Defaults are bad ("STRIPE * SQUARE FOOT RAND12345").

**Why it matters:** customers who don't recognise the descriptor
file disputes. Every dispute costs $15 + admin time + Stripe's
dispute rate ratio (0.5% is the danger zone). One bad descriptor
can cost an operator $100s/mo in chargebacks they could've prevented.

Set it explicitly:
- Settings → Business → Public details → **Statement descriptor**
- Use the brand name customers recognise (max 22 chars)
- Plus a **prefix for dynamic descriptors** (max 10 chars) so Stripe
  can append the product name

Examples:
- `ACMECOACHING` (static) → all charges show "ACMECOACHING"
- `ACME*` (dynamic prefix) → charges show "ACME* COACHING SESSION",
  "ACME* MEMBERSHIP" etc.

For a service business: static descriptor is fine. For e-commerce
with multiple SKUs: dynamic prefix wins.

Confirm: *"What do your customers recognise you as? That's your
descriptor."*

### 6. Brand the dashboard + receipts

- Settings → **Branding**:
  - Upload logo (PNG, transparent background, square — Stripe uses
    it on receipts, Checkout, Customer Portal)
  - Upload icon (smaller — used in Checkout favicon area)
  - Brand colour (hex — matches the operator's site)
- Settings → **Customer emails → Receipts**:
  - Confirm "Send receipts" is ON (default yes)
  - Receipt template — small businesses leave default; preview it
- Settings → **Customer emails → Refund emails** — ON
- Settings → **Customer emails → Failed payment emails** — ON if
  recurring

The branded receipt lands in the buyer's inbox within seconds of
payment. If the operator runs a high-trust brand (consultants,
agencies), a branded receipt closes the "did I really just pay?"
loop and reduces inbound support volume.

### 7. Two-factor authentication — non-negotiable

For live accounts handling real money, 2FA is required by Stripe
TOS for the account owner.

- Settings → **Personal → Two-step authentication**
- Set up via authenticator app (Google Authenticator, Authy,
  1Password, Bitwarden) — NOT SMS-only
- Save backup codes in a password manager (1Password / Bitwarden)
- For teams: each team member sets up their own 2FA

**Why not SMS:** SIM-swap attacks are real. SMS 2FA on a Stripe
account is the #1 vector for "someone drained my Stripe" stories.
Authenticator-only.

Hardware key (YubiKey) is even better if the operator has one.

### 8. Switch off test mode

Top of the dashboard there's a **Test mode** toggle (in newer UI,
the switch in top-right). Test mode lets the operator try
everything without moving money. Live mode is real.

**Before flipping live, confirm:**
- KYC has cleared (no red banners on Home)
- Bank account is verified (no "pending" status on Settings →
  Payouts)
- Statement descriptor is set
- 2FA is on
- At least one test charge has completed successfully (so the
  operator knows the flow works)

Then flip the switch and explain: **from this point on, any
charges are real money. Real cards. Real customers. Real refunds
cost.**

### 9. Confirm payout schedule

- Settings → **Payouts → Schedule**
- Default: daily on a 7-day rolling delay for most countries.
  First payout sometimes longer (Stripe risk review)
- Options:
  - **Daily** — default; cash flow friendly but admin-heavy
  - **Weekly** — pick a day (Monday is common); cleaner monthly
    reconciliation
  - **Monthly** — pick a date; matches accounting cycles but
    biggest cash gap
  - **Manual** — operator triggers each payout; rare; useful for
    Connect platforms

Tell the operator when to expect first payout:
- AU / NZ / UK / CA: 7 business days after first sale
- US: 7-14 days for new accounts (Stripe risk review)
- Sometimes faster after track record (~30 days)

If they need money sooner: **Instant Payouts** option exists (1%
fee) — flag the cost; not worth for non-urgent volume.

### 10. Test the full flow before declaring done

**Critical** — never advance to skill 02 without confirming this:

1. Test mode OFF
2. Operator creates a $1 Payment Link (skill 02-03 territory but
   worth doing now as proof of life)
3. Operator pays $1 from their own card to their own account
4. Charge appears in Dashboard → Payments
5. Branded receipt arrives in operator's email inbox
6. Operator refunds the $1 from the dashboard
7. Refund email arrives

If any step fails, debug before moving on:
- Charge succeeds but no receipt → email settings
- Charge fails → KYC / bank issue, contact Stripe
- Receipt comes from "noreply@stripe.com" without brand → Branding
  settings not saved

## Common gotchas — flag before they hit

- **AU operators**: if Stripe asks for a "secondary representative"
  for an Australian Pty Ltd, that's because they detected multiple
  directors via ASIC. Have the second director's details ready.
- **UK operators**: if you're a sole trader (no Companies House #),
  pick "Individual" not "Company" on signup. Switching later is
  painful.
- **US LLC operators**: if you operate in a state with no state
  income tax (Wyoming, Delaware, Florida, Texas), Stripe still
  wants your operating state for sales tax nexus reasons. Don't
  fudge.
- **CA Quebec operators**: French-language requirements on
  receipts may apply. Stripe has bilingual receipt options —
  enable in Branding.
- **Operators with multiple businesses**: each legal entity gets
  its own Stripe account. Don't combine.

## When KYC fails or stalls

Stripe is conservative on KYC. Some triggers:
- Document photo unclear or expired ID
- Name mismatch between submitted name and bank account holder
- Business address doesn't match registry record
- Sanctions list match (very rare false positive)

If stuck >5 business days:
- Settings → **Verification details** for the exact ask
- Contact: support.stripe.com → Account verification
- Quote your "Account ID" (visible in Settings → Account details,
  starts `acct_...`)
- Don't open multiple tickets — slows down review

If genuinely rejected (e.g. business type not allowed in your
country — adult content, certain gambling, crypto): Stripe will
say. At that point, the operator either changes business model
or finds an alternative PSP (Adyen, Paddle, Lemon Squeezy).
Don't fight it.

## Done condition

You're done with this skill when ALL of these are true:

- [ ] Activate Account banner is gone (account is live)
- [ ] KYC verification cleared
- [ ] Bank account verified, payout schedule set
- [ ] Statement descriptor is set (and matches brand)
- [ ] Branding (logo, colour) uploaded
- [ ] Customer emails configured (receipts ON)
- [ ] 2FA on, authenticator app — NOT SMS
- [ ] Test mode off
- [ ] $1 live test charge completed AND refunded successfully
- [ ] Operator can see "Payments" tab and dashboard reads "Live"

When done, say:

> *"Account live and hardened. Statement descriptor `[X]`, 2FA on,
> payouts going to [bank]. Time to set up what you actually sell."*

Load `02-products-prices.md`.
