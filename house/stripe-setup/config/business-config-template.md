# Business config

Fill this in once. Every later skill reads from it. Re-edit
anytime your business model, country, accounting tool, or
payment-method appetite changes.

```
BUSINESS CONFIG
===============
Business name:        <e.g. Acme Coaching, Pty Ltd>
Trading as:           <e.g. Acme Coaching>
Owner / operator:     <your name>

REGION
  Region:             <Australia | New Zealand | United Kingdom | United States | Canada>
  State / Province:   <VIC | NSW | London | California | Ontario | ...>
  Timezone:           <e.g. Australia/Melbourne>

LEGAL + TAX
  Business structure: <Sole trader | Partnership | Pty Ltd / Ltd / Corp | LLC | C-Corp | Trust>
  Business number:    <ABN (AU) | NZBN (NZ) | Co# (UK) | EIN (US) | BN (CA)>
  Tax registration:   <GST-registered (AU/NZ/CA) | VAT-registered (UK) | Sales-tax-registered (US, per state) | Not yet registered (below threshold)>
  Tax number:         <if registered — GST# / VAT GB### / state seller's permit>
  Tax registration date: <when you registered — informs how far back invoices need to show tax>

  Cross-border:       <Are you selling into other countries?
                       AU: domestic only | also NZ | also UK | also US | also EU
                       UK: domestic only | also EU (post-Brexit nuance) | also US | also AU/NZ
                       US: domestic only | also CA | also UK | also AU/NZ | also EU>
  Plan to use Stripe Tax? <Yes / No / Decide later — Stripe Tax is 0.5%/txn>

BUSINESS MODEL
  Primary model:      <One-off services | One-off products (digital/physical) | Subscriptions / SaaS | Marketplace / two-sided | Mixed>
  Average sale price: <e.g. $99 | $1,500 | $39/mo>
  Currency you charge in: <AUD | NZD | GBP | USD | CAD | Multi-currency>
  Customer type:      <B2C only | B2B only | Both>
  Volume target:      <e.g. 50 transactions/mo | 5,000/mo | 50/yr but $20k each>

  Tax-inclusive or exclusive pricing?
                      <Inclusive (price the customer sees includes tax — common in AU/NZ/UK B2C)
                       Exclusive (price + tax added at checkout — common in US, B2B everywhere)>

WHAT YOU SELL (tick + name + price each)
  [ ] One-off service — name: _________ price: _________
  [ ] One-off digital download — name: _________ price: _________
  [ ] One-off physical product — name: _________ price: _________
  [ ] Subscription monthly — name: _________ price: _________
  [ ] Subscription annual — name: _________ price: _________
  [ ] Subscription with trial — name: _________ trial: ___ days
  [ ] Usage-based / metered — name: _________ unit price: _________
  [ ] Pay-what-you-want — name: _________ minimum: _________
  [ ] Marketplace transaction (Connect) — connected sellers
  [ ] Invoice-based (consulting, freelance — amount varies)
  [ ] Multi-tier (Starter / Pro / Enterprise)

PAYMENT MODEL
  Default payment methods you want enabled:
  [ ] Cards (always on)
  [ ] Apple Pay
  [ ] Google Pay
  [ ] Link (Stripe's saved-card network)
  [ ] BACS Direct Debit (UK)
  [ ] BECS Direct Debit (AU)
  [ ] ACH Direct Debit (US)
  [ ] ACSS Direct Debit (Canada)
  [ ] SEPA Direct Debit (EU, if you sell into EU)
  [ ] iDEAL (Netherlands)
  [ ] Bancontact (Belgium)
  [ ] Klarna (BNPL)
  [ ] Afterpay / Clearpay (BNPL)
  [ ] Affirm (US BNPL)
  [ ] WeChat Pay / Alipay
  [ ] BPay (AU — via Connect or third-party)
  [ ] PayID (AU — via add-on)
  [ ] Interac (Canada — limited support)
  [ ] Cash App Pay (US)

CONNECT (only if marketplace)
  Connect type:       <Standard | Express | Custom>
  Connected accounts: <are sellers / providers / partners getting their own onboarding?>
  Platform fee:       <% you charge per transaction>
  Pricing model:      <Platform absorbs Stripe fee | Connected account pays Stripe fee | Custom>
  Country of sellers: <same as platform | global>

WEBSITE + STACK
  Have a website?     <Yes / No / In progress>
  Platform:           <Next.js / WordPress / Squarespace / Shopify / Webflow / Wix / Framer / Custom / None — just a link>
  Hosting:            <Vercel / Netlify / Cloudflare / own server / managed>
  Domain:             <your domain>
  Buy-button surface: <Payment Link | Hosted Checkout (redirect) | Embedded Payment Element | Invoice>

WEBHOOK / FULFILLMENT
  Webhook receiver:   <Zapier | Make | n8n | own endpoint | none yet | Stripe → email only>
  CRM:                <HubSpot | Pipedrive | Salesforce | Zoho | None>
  Email tool:         <ConvertKit | Mailchimp | Customer.io | Postmark | Resend | Gmail | None>
  Digital delivery:   <SendOwl | Gumroad | Lemon Squeezy migrating | Custom URL | None — manual>

ACCOUNTING
  Accounting tool:    <Xero (AU/NZ/UK/US/CA/global) | MYOB (AU) | QuickBooks Online (US/UK/CA/AU) | FreeAgent (UK) | Sage Cloud (UK/global) | Wave (US/CA) | KashFlow (UK) | FreshBooks | Spreadsheet | None>
  Accounting org country: <AU | NZ | UK | US | CA — should match Region>
  Bank feed connected: <Yes / No>
  Stripe→accounting connector: <Native | Stripe by Xero | A2X | Synder | Manual export>
  Accountant email:   <your accountant's email — for monthly close emails>
  Reporting period:   <Monthly | Quarterly | Annual> 

SUBSCRIPTION SETUP (if recurring)
  Trial offered:      <Yes — ___ days | No>
  Free tier?          <Yes — what's free | No>
  Plan changes allowed: <Up/down at any time | End-of-cycle only | Customer service only>
  Proration:          <Stripe default (auto) | None | Custom logic>
  Dunning settings:   <Smart Retries (Stripe default) | Custom retry schedule | Cancel after N failed attempts>
  Failed-payment grace: <0 days | 3 days | 7 days | 14 days>
  Cancel-after attempts: <3 | 4 | 5 | manual>

FRAUD / RISK
  Risk appetite:      <Strict (low fraud, more false positives) | Balanced | Loose (let more through, accept some fraud)>
  Use Radar?          <Free tier — included | Radar for Fraud Teams — $0.05/txn | Radar Premium — custom>
  Custom Radar rules: <list any you know you want — e.g. "block CVC fails > 3 from same IP">
  3DS preference:     <Always | Risk-triggered (default) | Never>

DISPUTE / REFUND POLICY
  Refund policy:      <Free text — e.g. "Full refund within 14 days, no questions">
  Refund window:      <days>
  Refund exceptions:  <e.g. digital downloads after delivery — no refund>
  Dispute response:   <I'll handle each | Auto-respond with evidence | Just refund + walk away>

CUSTOMER PORTAL
  Will use Portal?    <Yes — for subscribers | No — one-off only>
  Customers can cancel? <Yes (self-serve) | No (contact us)>
  Customers can swap plans? <Yes | No | Up-only>
  Customers can see invoice history? <Yes | No>

BRANDING
  Statement descriptor: <max 22 chars — what shows on card statement, e.g. ACMECOACHING>
  Dynamic descriptor prefix: <max 10 chars — e.g. ACME*>
  Logo:               <uploaded to Stripe Branding settings — Y/N>
  Brand colour:       <hex>
  Receipt footer text: <e.g. "Tax invoice. ABN 12 345 678 901. Refund policy: ...">

NOTIFICATIONS
  Slack workspace:    <yes — channel name | no>
  Slack channel for sales: <#sales or similar>
  Slack channel for disputes: <#alerts or similar>
  Email for ops alerts: <your ops inbox>

LEARNINGS GOALS
  Target dispute rate: <under 0.5% — Stripe's red line>
  Target dunning recovery rate: <target % of failed payments recovered>
  Target fee leakage: <Stripe fees % of GMV — track and tune>
  Target time-to-money: <signup → first payout — for the operator's own habit>

BANNED PATTERNS (be explicit — the agent declines these)
  - <e.g. never email customer card details in plaintext>
  - <e.g. never disable webhook signature verification>
  - <e.g. never run business + personal through the same Stripe account>
  - <e.g. never quote tax-exclusive prices to AU consumers — illegal under ACL>
  - <e.g. never enable a payment method that doesn't suit our region without checking fee impact>
```

## Fill rules

- **Be honest about region.** Stripe behaves very differently
  between AU / NZ / UK / US / CA. Don't pick "US" if you're really
  AU just because the docs are easier — fees, tax, accounting all
  break.
- **Be honest about model.** "One-off + subscriptions" is fine,
  but if it's really 95% one-off and you've added one subscription
  for a single customer, treat it as one-off + special-case the
  one.
- **List what you DON'T do.** "I don't sell to consumers" or "I
  don't offer refunds after delivery" lets the agent decline cleanly
  instead of building flows you'll never use.
- **Update after tax registration.** The day you cross your
  country's GST/VAT/sales-tax threshold and register, update this
  file and re-run the tax skill. Tax retroactive corrections are
  painful.
- **Update when you add a country.** Selling cross-border changes
  the tax + payment-method picture. New region = re-run skills 05
  + 11.

## When the business evolves

Tell the agent: *"Update business config — change <field> to <new
value>."* The agent re-reads the file and all later outputs
respect the change. Common updates:

- **Just hit GST/VAT/sales-tax registration threshold** — register,
  update file, run `05-tax-refunds.md` again to enable Stripe Tax
  + retroactive customer comms
- **Migrating from PayPal / Square / Lemon Squeezy / Paddle to
  Stripe** — flag in the file; agent runs the migration with care
  (subscriptions in particular)
- **Adding a second product line** — run `02-products-prices.md`
  again
- **Adding a country** — run `11-payment-methods-by-region.md` for
  the new region
- **Switching accounting tool** — run `10-accounting-integration.md`
  for the new tool
- **Adding Connect / marketplace dimension to an existing
  Standard account** — note: usually requires upgrading the account
  type; run `07-connect-marketplaces.md` first
