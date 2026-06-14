---
name: stripe-account-setup
description: Take the user from no Stripe account (or partial setup) to an activated account that can accept payments and route payouts to their bank.
allowed_platforms: [claude, openclaw, chatgpt]
tools: []
---

# Account setup

## Your job

Get the user's Stripe account fully activated so payments can be
accepted and payouts can land. This is dashboard-only — no API keys
needed.

## Steps

### 1. Account or sign-in

Ask: *"Do you have a Stripe account already?"*

- **Yes** → tell them to log in at `dashboard.stripe.com` and confirm
  they can see the dashboard.
- **No** → walk them through `dashboard.stripe.com/register`. Use a
  business email. After signup, Stripe asks for the country and
  business type — let them pick before moving on.

### 2. Activate the account

Stripe accounts start in "test mode" until activated. To accept real
money, the user fills out **Activate Account** (top of the dashboard
banner). They'll need:

- Business details (legal name, address, ABN/EIN/tax ID if applicable)
- Personal identity for the account representative (gov ID upload)
- Bank account for payouts

Walk them through ONE section at a time. Confirm each saved before
the next.

Common stumbles to call out before they happen:
- **Business name** must match the legal entity exactly (sole trader
  uses their personal legal name)
- **Tax IDs** — if confused on format, link them to Stripe's docs for
  their country
- **Bank routing/BSB/sort code** — get the user to copy-paste from
  their banking app; manual entry trips a lot of people up

### 3. Statement descriptor

This is what shows up on the customer's card statement after they
buy. Defaults are bad ("STRIPE * <RANDOM>"). Set it explicitly:

- Settings → Business → Public details → Statement descriptor
- Use the brand name (max 22 chars). Example: `ACMEPLUMBING`
- Add a **prefix for dynamic descriptors** — Stripe appends the
  product name when allowed

Confirm with the user that the descriptor matches what their buyers
will recognise. If it doesn't, they'll see chargebacks.

### 4. Brand the dashboard / receipts

- Settings → Branding → upload logo + icon + brand colour
- Settings → Customer emails → Receipts → confirm "send receipts" is
  ON
- Optionally tweak the receipt template (small businesses usually
  skip — defaults are fine)

### 5. Two-factor on the Stripe account

This is non-negotiable for live accounts. Walk them to:
- Settings → Personal → Two-step authentication → set up via app
  (Authy/Google Authenticator, not SMS — SMS gets sim-swapped)

### 6. Switch off test mode

Top of the dashboard there's a **Test mode** toggle. Confirm with the
user before flipping it off — explain that from this point on, any
charges are real money.

### 7. Confirm payouts schedule

- Settings → Payouts → Schedule
- Default is daily 7-day rolling for most countries — fine.
- Adjust to weekly if they want a fixed payout day.

Tell the user when to expect their first payout — usually 7 business
days after the first sale.

## Done condition

You're done with this skill when:
- Activate Account banner is gone (account is live)
- Statement descriptor is set
- 2FA is on
- Test mode is off
- The user can see "Payments" tab and the dashboard reads "Live"

When done, say: *"Account live. Time to set up what you actually
sell."* and load `07-stripe-products.md`.
