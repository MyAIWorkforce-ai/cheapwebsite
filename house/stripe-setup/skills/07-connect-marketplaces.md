---
name: stripe-connect-marketplaces
description: Set up Stripe Connect for a multi-seller marketplace or platform. Covers Standard vs Express vs Custom account types, onboarding flows, application fees, payout management, multi-currency, regional tax (especially marketplace-facilitator laws in US, GST/HST per province in CA, AU GST on platforms), and Connect-specific webhooks.
allowed_platforms: [claude, openclaw, chatgpt, gemini, grok, n8n, make, zapier]
tools: []
---

# Connect — marketplaces and platforms

## Your job

Wire up Stripe Connect for an operator running a multi-seller
platform. This is the most complex Stripe surface — get it wrong
once and you fight tax, dispute, and payout headaches for years.

Connect is for when:
- The operator is a **marketplace** (Etsy / Airbnb / Uber pattern
  — buyers pay, platform takes commission, sellers get the rest)
- The operator runs a **SaaS-on-behalf-of** (white-label billing
  for the operator's customers; e.g. Shopify-style)
- The operator is a **professional services platform** with
  payouts to independent providers (Substack, Patreon, OnlyFans
  pattern)
- The operator does **multi-party splits** (event ticketing
  splitting between venue + promoter + artist)

If the operator is just selling their own stuff: SKIP this skill.
Standard Stripe is right. Connect adds complexity without value.

## Step 1 — pick the Connect account type

Three flavours. Pick once — switching later is painful.

### Standard

- **Who fills out the form**: each seller signs up for their own
  Stripe account, then connects to the platform via OAuth
- **Who collects fees**: seller (platform doesn't see Stripe fees)
- **Who's liable for disputes**: seller
- **Onboarding UX**: redirects to Stripe-hosted signup; sellers
  see Stripe branding
- **When to choose**: lowest platform complexity; sellers are
  established businesses; platform is light-touch (e.g. a
  directory or affiliate-style platform)

### Express

- **Who fills out the form**: Stripe-hosted onboarding, branded
  with platform name; quick (5 min)
- **Who collects fees**: platform can absorb or pass through
- **Who's liable for disputes**: platform or seller (configurable)
- **Onboarding UX**: redirects briefly to Stripe Express
  onboarding; sellers see platform brand mostly
- **When to choose**: most common for marketplaces. Good balance
  of platform control vs Stripe handling KYC

### Custom

- **Who fills out the form**: platform builds the form; collects
  data; submits via API
- **Who collects fees**: platform
- **Who's liable for disputes**: platform
- **Onboarding UX**: 100% platform-branded; sellers never see
  Stripe
- **When to choose**: white-label SaaS; consumer-facing where
  Stripe branding would confuse; willing to build + maintain
  onboarding UI

| Dimension | Standard | Express | Custom |
|---|---|---|---|
| Platform complexity | Low | Medium | High |
| Stripe handles KYC | Yes | Yes (sellers see it briefly) | No (platform builds form, Stripe verifies via API) |
| Platform brand control | Low | Medium | Full |
| Stripe fees visible to seller | Yes (their account, their statements) | Configurable | Configurable |
| Dispute liability | Seller | Platform or seller | Platform |
| Dashboard for seller | Full Stripe dashboard | Stripe Express dashboard (limited) | Platform-built or none |
| Best for | Light marketplaces, established sellers | Most marketplaces | SaaS-on-behalf, full white-label |

Walk operator through the decision. Default for new
marketplaces: **Express**.

## Step 2 — activate Connect on the platform account

1. Dashboard → Settings → Connect → **Get started**
2. Fill platform details:
   - Platform name (shown in onboarding)
   - Platform website
   - Platform support email
   - Logo + brand colour (Connect inherits Branding settings)
3. Pick the account type(s) you'll support — can support multiple
4. Confirm pricing model:
   - Platform pays Stripe fees (absorbs)
   - Seller pays Stripe fees
   - Custom split
5. Activate

## Step 3 — onboarding flow

### Express flow

```ts
// app/api/connect/onboard/route.ts
import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const { sellerId, email, country } = await req.json()

  // 1. Create the connected account
  const account = await stripe.accounts.create({
    type: 'express',
    email,
    country,  // 'AU' / 'US' / 'GB' / 'NZ' / 'CA'
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
    business_type: 'individual',  // or 'company'
    metadata: { sellerId },  // Round-trip via webhook
  })

  // 2. Save account.id against the seller in your DB
  await db.sellers.update(sellerId, { stripeAccountId: account.id })

  // 3. Generate the onboarding link
  const link = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: 'https://yourplatform.com/connect/refresh',
    return_url: 'https://yourplatform.com/connect/done',
    type: 'account_onboarding',
  })

  return NextResponse.json({ url: link.url })
}
```

Then the frontend redirects the seller to `link.url`. Seller fills
in Stripe Express onboarding (5 min: personal details, ID upload,
bank account). Stripe redirects back to `return_url`.

On the platform's side:
- Listen for `account.updated` webhook
- When `account.details_submitted: true` and `charges_enabled: true`
  → seller is fully onboarded
- Until then, don't allow them to receive money (UI shows "Pending")

### Standard flow

Different — sellers create their own Stripe account first, then
authorise the platform via OAuth:

```ts
// Generate the OAuth link
const url = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${STRIPE_CONNECT_CLIENT_ID}&scope=read_write&state=${csrfToken}`
```

After they connect, you exchange the code for the access token:

```ts
const response = await stripe.oauth.token({
  grant_type: 'authorization_code',
  code: req.query.code,
})

// response.stripe_user_id is the connected account ID
```

### Custom flow

Platform builds the form. Submit data via `accounts.create` with
all required fields. Stripe verifies via the Identity API. Heavy.
Only use if Express won't fit the brand.

See `templates/connect-onboarding-email.md` for seller-facing comms.

## Step 4 — accepting payments + splitting money

Three patterns for the actual transaction.

### Pattern 1: Direct charges (Standard accounts)

Buyer pays seller directly. Platform takes an application_fee.
Settlement is on the seller's account.

```ts
const session = await stripe.checkout.sessions.create(
  {
    mode: 'payment',
    line_items: [{ price: 'price_ABC', quantity: 1 }],
    success_url: 'https://yourplatform.com/thanks',
    payment_intent_data: {
      application_fee_amount: 500,  // Platform gets $5 in cents
    },
  },
  {
    stripeAccount: sellerStripeAccountId,  // Acting on behalf of
  }
)
```

The `stripeAccount` header tells Stripe "this charge belongs to
that account." Money flows: buyer → seller; platform skims
application_fee.

### Pattern 2: Destination charges (Express / Custom)

Charge goes to platform first; platform transfers to seller. Most
common for Express.

```ts
const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  line_items: [{ price: 'price_ABC', quantity: 1 }],
  success_url: 'https://yourplatform.com/thanks',
  payment_intent_data: {
    application_fee_amount: 500,  // Platform takes $5
    transfer_data: {
      destination: sellerStripeAccountId,  // Rest goes to seller
    },
  },
})
```

Money flows: buyer → platform → seller. Platform sees the full
transaction; seller gets the remainder after platform fee.

### Pattern 3: Separate charges + transfers

For complex splits (3+ parties):

```ts
// 1. Charge the buyer
const charge = await stripe.charges.create({
  amount: 10000,  // $100
  currency: 'usd',
  source: 'tok_xxx',
  description: 'Event ticket',
})

// 2. Transfer slices to multiple sellers
await stripe.transfers.create({
  amount: 5000,
  currency: 'usd',
  destination: venueAccountId,
})
await stripe.transfers.create({
  amount: 3000,
  currency: 'usd',
  destination: promoterAccountId,
})
// Platform keeps the remaining 2000
```

Most ops can stick with Pattern 2.

## Step 5 — application fees

The platform takes its cut via `application_fee_amount`. Set based
on BUSINESS CONFIG.

Common models:
- **% of transaction**: e.g. 5% — `application_fee_amount = amount * 0.05`
- **Flat fee**: $1 per transaction
- **Tiered**: $0.50 + 2.9% (mirroring Stripe's own model)

Considerations:
- Stripe's fees come OFF the platform's cut (in destination
  charges) — so a 2.9% + 30¢ Stripe fee + 5% platform fee on a
  $100 sale leaves platform with ~$2.40, seller with $94.71
- Sometimes platforms absorb Stripe fees (look more generous);
  sometimes pass through to seller — `on_behalf_of` parameter
  controls
- Check tax implications — application_fees count as platform
  revenue (taxable to platform); transfers are not platform
  revenue

## Step 6 — payouts to connected accounts

By default, each connected account has its own payout schedule.
Stripe automatically pays out to their bank.

Configure on platform side:
- Settings → Connect → "Default payout schedule for new
  accounts": daily / weekly / monthly / manual

For sellers:
- Express: they configure their own payout schedule via Express
  dashboard
- Custom: platform configures via API

```ts
await stripe.accounts.update(sellerAccountId, {
  settings: {
    payouts: {
      schedule: {
        interval: 'weekly',
        weekly_anchor: 'monday',
      },
    },
  },
})
```

Common patterns:
- Marketplace: weekly payout Monday, so Friday-Sunday weekend
  sales settle together
- Subscription platform: monthly aligned to invoice cycle
- Instant payouts: opt-in per seller, 1% fee

## Step 7 — Connect-specific webhooks

Subscribe in your endpoint (skill 04) to:

| Event | What to do |
|---|---|
| `account.updated` | Seller onboarding state changed — update DB |
| `account.application.authorized` | Standard account just authorised | 
| `account.application.deauthorized` | Standard account disconnected — handle |
| `capability.updated` | Seller can/can't accept cards now |
| `payout.created` | Seller has a payout scheduled |
| `payout.paid` | Seller's bank received the payout |
| `payout.failed` | Seller payout bounced — investigate |
| `application_fee.created` | Platform fee booked — for accounting |
| `transfer.created` | Money sent to a connected account |
| `transfer.failed` | Transfer bounced — investigate |
| `charge.dispute.created` | Dispute against a connected charge — assign to seller or platform per policy |

The platform also needs to listen for events on the connected
accounts:

```ts
// In your webhook handler
if (event.account) {
  // This event is for a connected account, not the platform
  const connectedAccountId = event.account
  await handleConnectedAccountEvent(connectedAccountId, event)
} else {
  // Platform-level event
  await handlePlatformEvent(event)
}
```

Don't get tripped up: you can register one webhook endpoint and
configure it to receive events from both platform AND connected
accounts (Dashboard → Webhooks → Add endpoint → "Listen to events
on Connected accounts" toggle).

## Step 8 — disputes on Connect

Default: dispute liability falls on whoever has the funds at
dispute time.

- **Direct charges (Standard)**: dispute against seller; seller's
  funds debited; platform fee reversed automatically
- **Destination charges**: dispute against platform (charge is on
  platform); platform's funds debited; platform decides whether
  to reverse the transfer to seller
- **Separate charges + transfers**: dispute against platform; same
  as above

For destination charge marketplaces:
- Decide policy: does the platform eat dispute losses, or chase
  the seller?
- If chasing seller: reverse the transfer when dispute is filed,
  let seller fight it
- If eating it: platform handles dispute response, doesn't reverse
  transfer

```ts
// Reverse a transfer (claw back from seller after dispute)
await stripe.transfers.createReversal(transferId, {
  amount: 10000,
  metadata: { reason: 'dispute_filed', dispute_id: disputeId },
})
```

Skill 09 covers dispute response in depth.

## Step 9 — regional tax for marketplaces

This is where Connect gets hairy. Several jurisdictions hold the
**platform** responsible for collecting + remitting tax on
behalf of sellers — "marketplace facilitator" laws.

### United States — marketplace facilitator laws

Since 2018, most states require platforms to collect + remit sales
tax when:
- Platform reaches state-level economic nexus (varies — $100k or
  200 transactions per state typical)
- Platform processes payments on behalf of sellers

This means: **the platform** must register for sales tax in each
state, collect the right rate at checkout, remit monthly /
quarterly.

Stripe Tax for Platforms handles this:
- Settings → Tax → "Platform tax" → enable
- Configure: which countries / states are covered
- Per transaction, Stripe calculates the right tax, attributes
  to platform's registration, files via Stripe Tax filings

If platform isn't using Stripe Tax for Platforms:
- Operator must register for sales tax in every nexus state
- Build tax calculation engine OR use Avalara / TaxJar
- File returns per state

This is the #1 reason Connect marketplaces choose Stripe Tax for
Platforms.

### EU — VAT for marketplaces

Since 2021, EU requires marketplaces facilitating sales of goods
(from outside EU) to consumers to act as "deemed supplier" —
platform charges + remits VAT.

For digital services across EU: OSS / MOSS rules can apply to the
platform if sellers are small.

### Australia / NZ — GST on digital services via platform

If platform facilitates >AUD $75,000 / NZD $60,000 of low-value
imported goods or digital services to AU/NZ consumers, the
platform must register for GST.

### Canada — GST/HST per province

Marketplace operators with >CAD $30,000 facilitation must register
for GST. PST varies — BC, MB, SK, QC have separate sales tax.

### Recommendation

**Use Stripe Tax for Platforms** unless the operator has a tax
person already handling marketplace tax across jurisdictions.
Manual cross-jurisdiction tax for a marketplace is a full-time
job.

## Step 10 — KYC / KYB on connected accounts

Stripe handles KYC for connected accounts (one of Connect's main
values). But the platform has obligations too:

- **Sanctions screening**: Stripe screens against OFAC, EU
  sanctions, etc. But platform should also do its own check on
  business activity (some industries Stripe won't touch even with
  Connect)
- **Underage sellers**: platforms in some jurisdictions need to
  verify seller age (e.g. AU — sellers must be 18+)
- **Beneficial ownership** (Custom): platform must collect for
  >25% owners
- **Source-of-funds questions**: high-value Connect platforms
  occasionally need to provide flow of funds documentation to
  Stripe; have it ready

Stripe occasionally restricts a connected account (capability
removed). Webhook `account.updated` fires. Investigate fast — the
seller can't accept money until resolved.

## Step 11 — onboarding email + ongoing comms

When a seller first connects:
1. Welcome email (see `templates/connect-onboarding-email.md`)
2. Confirm bank linked + test payout amount expected
3. Set expectations: "First payout in 7-14 days; next on
   [schedule]"
4. Link to Express dashboard (Express accounts)

Quarterly: send sellers a summary of their volume + fees.

## Step 12 — multi-currency Connect

If sellers in different countries take payments in different
currencies:

- Platform can accept charges in any currency
- Funds settle to connected account's home currency (with
  conversion)
- Or use Stripe's multi-currency settlement (advanced — sellers
  hold balances in multiple currencies)

Be aware: currency conversion is 2% Stripe fee. For high-volume
cross-border platforms, this matters.

## Common gotchas

- **Wrong account type chosen** → can't switch later without
  re-onboarding all sellers. Pick carefully.
- **Application fee = 0 by mistake** → platform earns nothing.
  Always set per transaction.
- **No webhook for `account.updated`** → seller is "onboarded" in
  platform DB but Stripe says they can't take cards. Platform
  needs to check `charges_enabled` before showing seller as live.
- **Currency mismatch on transfer** → if buyer paid in AUD and
  seller's account is USD, transfer needs explicit currency
  conversion handling.
- **Disputed charges not reverse-transferred** → platform eats the
  loss without realising. Add transfer reversal to dispute
  webhook.
- **Marketplace tax obligations missed** → platform thinks
  "seller's problem" but is legally liable. Use Stripe Tax for
  Platforms.
- **Express seller misses verification email** → onboarding stalls
  for weeks. Platform should re-prompt every 3 days via own email.
- **Standard sellers using their own Stripe accounts for non-
  platform sales** → no platform visibility; reporting blind spot.
  Acceptable for Standard but design for it.

## Done condition

You're done with this skill when ALL of these are true:

- [ ] Connect activated on platform account
- [ ] Account type chosen + documented in BUSINESS CONFIG
- [ ] Onboarding flow live (test seller onboarded end-to-end)
- [ ] Application fee structure set + tested on a real transaction
- [ ] Connect-specific webhooks subscribed in skill 04
- [ ] Dispute liability policy decided + reversal logic wired (if
      applicable)
- [ ] Regional tax handled (Stripe Tax for Platforms enabled or
      explicit decision to handle elsewhere)
- [ ] Seller welcome email template adapted from
      `templates/connect-onboarding-email.md`
- [ ] Test transaction with real money has run through end-to-end
      (platform fee, seller transfer, payout)

When done, say:

> *"Connect's live. [Standard/Express/Custom] accounts. Application
> fee [X%/$Y flat]. Stripe Tax for Platforms [on/off]. Sellers can
> onboard."*

Next, decide based on operator's situation:
- Subscription marketplace → `08-subscriptions-recurring.md`
- Dispute risk → `09-fraud-disputes.md`
- Accounting sync → `10-accounting-integration.md`
