# Regional reference

The agent reads this once on first use, then any time BUSINESS
CONFIG Region or State/Province changes. Maps every Stripe-
relevant term — tax registration, accounting tools, payment
methods, regulatory reporting, statement descriptor rules,
KYC requirements — across the five supported regions.

## Region quick lookup

### Australia 🇦🇺

| Item | Detail |
|---|---|
| Stripe country | Australia |
| Currency (default) | AUD |
| Tax label | GST |
| Tax rate | 10% (standard); 0% (GST-free: most food, exports, education, healthcare) |
| Tax registration threshold | AUD $75,000 annual turnover (non-profit $150k) |
| Tax registration body | Australian Taxation Office (ATO) |
| Business identifier | ABN (Australian Business Number) — 11 digits, format XX XXX XXX XXX |
| Tax invoice required for B2B | Yes if >AUD $82.50 inc. GST; must include "Tax Invoice" header, ABN, GST amount |
| Tax filing | BAS (Business Activity Statement) — quarterly for most (Q1 due 28 Oct, Q2 28 Feb, Q3 28 May, Q4 28 Aug); monthly for high-revenue (>$20M); annual for some small biz |
| Cross-border GST | AU GST applies to digital services + low-value imported goods to AU consumers if supplier exceeds AUD $75k aggregate |
| Stripe Tax support | Full (AU GST handled natively) |
| Date format | DD/MM/YYYY |
| Time zone (common) | AEST/AEDT (Sydney, Melbourne, Brisbane no DST), ACST/ACDT (Adelaide), AWST (Perth) |
| Common consumer law | Australian Consumer Law (ACL) — refunds for faulty goods, not-as-described |
| 1099-K equivalent | Stripe issues annual tax summaries; no formal 1099 equivalent |
| Statement descriptor | Max 22 chars; ASCII only; appears on customer card statement |
| 2FA requirement | TOS-required; authenticator app recommended over SMS |
| Bank account format | BSB (6 digits) + Account number (variable) |
| Common acquiring banks | NAB, CBA, Westpac, ANZ, Macquarie, Bendigo |

### New Zealand 🇳🇿

| Item | Detail |
|---|---|
| Stripe country | New Zealand |
| Currency (default) | NZD |
| Tax label | GST |
| Tax rate | 15% (standard) |
| Tax registration threshold | NZD $60,000 annual turnover |
| Tax registration body | Inland Revenue Department (IRD) |
| Business identifier | NZBN (13 digits) — register at `nzbn.govt.nz`; GST number issued separately by IRD |
| Tax invoice required for B2B | Yes if >NZD $50; must include "Tax Invoice" header, GST registration #, GST amount |
| Tax filing | GST return: 2-monthly (default), 6-monthly (<NZD $500k), or monthly (>NZD $24M); annual income tax separate |
| Cross-border GST | NZ GST applies to digital services to NZ consumers (overseas suppliers register if >NZD $60k) |
| Stripe Tax support | Full |
| Date format | DD/MM/YYYY |
| Time zone | NZST/NZDT (Auckland) |
| Common consumer law | Consumer Guarantees Act (CGA); Fair Trading Act |
| Bank account format | NZ bank account number (XX-XXXX-XXXXXXX-XXX) |
| Common acquiring banks | ANZ, BNZ, ASB, Westpac, Kiwibank |

### United Kingdom 🇬🇧

| Item | Detail |
|---|---|
| Stripe country | United Kingdom |
| Currency (default) | GBP |
| Tax label | VAT |
| Tax rate | 20% (standard); 5% (reduced — energy efficiency, some domestic); 0% (zero-rated — children's clothing, books, food essentials) |
| Tax registration threshold | GBP £90,000 annual turnover (was £85k pre-2024) |
| Tax registration body | HM Revenue & Customs (HMRC) |
| Business identifier | Companies House number (8 digits, with leading zeros) for Ltd companies; UTR for sole traders; VAT number GB### (9 digits) |
| Tax invoice required for B2B | Yes for VAT-registered B2B; must include "VAT Invoice" header, VAT GB#, VAT rate per line, VAT amount, tax point date |
| Tax filing | VAT return: quarterly (most); Making Tax Digital (MTD) compulsory since 2022 — must file via HMRC-compatible software (Xero / QBO / FreeAgent / Sage / Stripe-connected) |
| Cross-border VAT | UK VAT on UK-domestic; EU VAT for sales into EU (post-Brexit complex); IOSS for low-value imports |
| Stripe Tax support | Full; UK + EU |
| Date format | DD/MM/YYYY |
| Time zone | GMT/BST (London) |
| Common consumer law | Consumer Rights Act 2015; Consumer Contracts Regulations 2013 (14-day cooling off); GDPR (data protection) |
| Bank account format | Sort code (XX-XX-XX) + Account number (8 digits) |
| Common acquiring banks | Barclays, HSBC, Lloyds, NatWest, Monzo, Starling, Tide, Revolut |
| FCA regulation | E-money + payments under PSD2; Strong Customer Authentication (SCA) — 3DS for most online card payments |

### United States 🇺🇸

| Item | Detail |
|---|---|
| Stripe country | United States |
| Currency (default) | USD |
| Tax label | Sales Tax |
| Tax rate | State-by-state: 0% (NH, MT, OR, DE, AK*) to ~10% (TN, LA, AR, AL); plus county + city in some states |
| Tax registration threshold | "Economic nexus" — per state, typically $100k in sales OR 200 transactions per year; some states stricter (CA $500k, NY $500k or 100 txns, FL $100k or 200) |
| Tax registration body | State Department of Revenue (each state separately) |
| Business identifier | EIN (Federal Employer Identification Number) — XX-XXXXXXX; SSN for sole proprietors; state contractor / seller permit per state |
| Tax invoice required | Not federally; B2B sometimes wants formal invoice; receipt usually sufficient for B2C |
| Tax filing | State sales tax: monthly / quarterly / annual depending on volume per state; 1099-K from Stripe annually if exceeding threshold ($5k for 2024 → $2.5k for 2025 → eventually $600); federal income tax separate |
| Cross-border tax | US-domestic only at state level; international = no US tax for non-US buyers (B2C and B2B) |
| Stripe Tax support | Full per-state including SUTS (Streamlined Sales and Use Tax) participating states |
| Date format | MM/DD/YYYY |
| Time zone | EST/PST/CST/MST (operator-dependent) |
| Common consumer law | Federal Trade Commission (FTC) Act; state-level consumer protection laws |
| 1099-K (Stripe issues) | If gross >$X (threshold dropping yearly): for tax filing |
| Bank account format | Routing (9 digits) + Account (variable) — must be ACH-capable |
| Common acquiring banks | Chase, Bank of America, Wells Fargo, Citi, regional banks |
| 3DS / SCA | Risk-triggered (not mandatory like EU PSD2) |

### Canada 🇨🇦

| Item | Detail |
|---|---|
| Stripe country | Canada |
| Currency (default) | CAD |
| Tax label | GST + HST + PST (varies by province) |
| Tax rates | GST 5% federal; HST 13% (ON, NB, NL) or 15% (NS, PEI); PST 6% (SK), 7% (BC, MB), 9.975% QST (QC) |
| Tax registration threshold | CAD $30,000 in four consecutive quarters |
| Tax registration body | Canada Revenue Agency (CRA) for GST/HST; provincial bodies for PST/QST |
| Business identifier | BN (Business Number) — 9 digits; format 123456789RT0001 for GST/HST account; provincial registration separate |
| Tax invoice required for B2B | Yes for GST/HST-registered suppliers selling >$30 to GST-registered buyer; must include BN |
| Tax filing | GST/HST return: monthly / quarterly / annual; provincial separately |
| Cross-border tax | GST on digital services to Canadian consumers (overseas suppliers register simplified-mode if exceeding threshold); USMCA / CETA may affect cross-border physical goods |
| Stripe Tax support | Full (federal GST + provincial HST/PST/QST) |
| Date format | YYYY-MM-DD (official) or DD/MM/YYYY |
| Time zone | EST/CST/MST/PST (operator-dependent) |
| Common consumer law | Federal: Competition Act; provincial consumer protection acts (Quebec especially robust) |
| Bank account format | Institution (3 digits) + Transit (5 digits) + Account |
| Common acquiring banks | RBC, TD, Scotiabank, BMO, CIBC, Desjardins (QC) |

## Stripe pricing by region (as of latest published rates)

| Region | Card present rate | Online card rate | International card surcharge |
|---|---|---|---|
| AU | 1.75% + $0.30 | 1.75% + $0.30 (domestic), 2.9% + $0.30 (international) | +1.1% on international |
| NZ | 2.7% + NZ $0.30 (online card) | Similar | +1% international |
| UK | 1.5% + £0.20 (domestic), 3.25% + £0.20 (intl) | Same | (built into "international") |
| US | 2.9% + $0.30 | Same | +1.5% on international |
| CA | 2.9% + $0.30 | Same | +0.8% on international (USD card) |

Other Stripe fees (universal):
- Stripe Tax: 0.5% per transaction (after free tier)
- Currency conversion: 2%
- Instant Payouts: 1% (minimum $0.50)
- Disputes (chargebacks): $15 per dispute (won or lost)
- ACH Direct Debit (US): 0.8% capped at $5
- BACS Direct Debit (UK): 1% capped at £4
- BECS Direct Debit (AU): 1% capped at $3.50
- ACSS Direct Debit (CA): 1% + $0.30
- Radar for Fraud Teams: +$0.05/transaction (above free Radar)

**Rates change.** Verify in Stripe dashboard or `stripe.com/pricing/[country]`.

## Accounting tools by region

| Region | Native Stripe connector with... |
|---|---|
| AU | Xero AU (best), MYOB AccountRight + MYOB Business, QuickBooks Online AU |
| NZ | Xero NZ (best), MYOB Essentials |
| UK | Xero UK, FreeAgent, QuickBooks Online UK, Sage Cloud, KashFlow |
| US | QuickBooks Online US (most common), Xero US, Wave (free), FreshBooks |
| CA | QuickBooks Online CA, Xero CA, Wave (free) |

Third-party (multi-region): A2X, Synder, Bullhorn (Sage Intacct).

## Payment methods by region

### AU
- Cards (Visa, MC, AmEx) — Apple Pay, Google Pay, Link
- BECS Direct Debit (recurring B2B)
- Afterpay (BNPL B2C)
- PayID (limited Stripe native)
- BPay (via partners only — not native Stripe)
- PayTo (NPP — rolling out)

### NZ
- Cards — Apple Pay, Google Pay, Link
- Afterpay
- Account-to-account (limited; POLi sunset)

### UK
- Cards — Apple Pay, Google Pay, Link
- BACS Direct Debit (recurring)
- Bank Redirect (high-AOV one-off)
- Klarna (BNPL)
- Clearpay (Afterpay's UK brand)

### US
- Cards — Apple Pay, Google Pay, Link
- ACH Direct Debit (recurring B2B)
- Cash App Pay
- Affirm (BNPL high-value)
- Klarna (BNPL)
- Afterpay (BNPL)

### CA
- Cards — Apple Pay, Google Pay, Link
- ACSS Direct Debit (recurring)
- Klarna (limited)
- Interac (very limited native Stripe — usually need third-party)

## Statement descriptor rules

| Region | Max length | Notes |
|---|---|---|
| AU | 22 chars | ASCII only; capitalised on most card statements |
| NZ | 22 chars | Same |
| UK | 22 chars | Same |
| US | 22 chars | Same |
| CA | 22 chars | Same |

All regions support dynamic prefix (up to ~10 chars) + product
suffix. E.g. "ACME*" prefix + "PROPLAN" appended.

## 3DS / SCA strategy by region

| Region | Default | Recommendation |
|---|---|---|
| AU | Risk-triggered | Force for >$500; otherwise risk |
| NZ | Risk-triggered | Same |
| UK | Mandatory (SCA / PSD2) | Compliance — must |
| EU (if selling into) | Mandatory (SCA / PSD2) | Compliance — must |
| US | Risk-triggered | Force for >$1000 or high-risk products |
| CA | Risk-triggered | Same as US |

## KYC requirements summary

| Region | Typical asks |
|---|---|
| AU | ABN active, business address (registered), gov ID for representative, bank account |
| NZ | NZBN, business address, gov ID, bank account |
| UK | Companies House # for Ltd or UTR for sole trader, registered address, gov ID + sometimes selfie, bank account |
| US | EIN (or SSN for sole prop), state of formation, business address, gov ID (DL or passport), SSN last 4 for representative |
| CA | BN, business address, gov ID, bank account |

For all: KYC review usually clears within minutes; can take 1-5
days for complex structures.

## Annual reporting calendar by region

| Region | Key dates |
|---|---|
| AU | BAS due 28th month after quarter end; annual income tax by 31 Oct (or 15 May next year via tax agent) |
| NZ | GST return due last day of month after period; income tax by 7 July (or via tax agent) |
| UK | VAT return due 1 month + 7 days after quarter end (digital MTD); corporation tax 9 months after fiscal year end; PSA 22 July |
| US | State sales tax varies; federal Form 1040 / 1120 by 15 April; 1099-K issued late January |
| CA | GST/HST varies by frequency; federal income tax by 30 April (sole prop) or 6 months after fiscal year (corp); QC separate filing |

## Consumer law refund obligations (digital products / services)

| Region | "Change of mind" right? | Waivable? |
|---|---|---|
| AU | No statutory cooling off for digital downloads (delivered) | N/A |
| NZ | Consumer Guarantees Act covers faulty / not-as-described; no cooling off for digital | N/A |
| UK | 14 days under Consumer Contracts Regs 2013 | Yes — explicit consent at purchase |
| EU | 14 days under Consumer Rights Directive 2011/83/EU | Yes — explicit consent at purchase |
| US | No federal cooling off (FTC); state laws vary | N/A typically |
| CA | Provincial — Quebec strict; most provinces no cooling off for digital | Provincial varies |

For UK/EU: digital goods need explicit pre-purchase consent OR
honour 14-day right. Templates in `templates/refund-policy-text.md`.

## Marketplace facilitator laws (Connect operators)

| Region | Status |
|---|---|
| AU | Platform GST obligations if facilitating >AUD $75k for non-resident sellers + low-value imports |
| NZ | Similar — platform responsible for GST on digital services + low-value imports |
| UK | Platform deemed supplier for some imports (post-Brexit); EU OSS may apply for EU customers |
| US | Marketplace facilitator laws in ~46 states — platform collects + remits sales tax for sellers |
| CA | Platform GST/HST obligations under specific rules; QC has marketplace registry |

Use Stripe Tax for Platforms (skill 07) to handle this.

## Connect availability by region

Stripe Connect platforms can be based in: AU, NZ, UK, US, CA, EU,
JP, SG, BR, MX, IN (and growing).

Connected accounts can be onboarded in 30+ countries (varies by
account type — Standard has widest, Custom narrowest).

If platform is AU and seller is in say Brazil: cross-border
Connect — possible but more complex; check Stripe's matrix at
`stripe.com/connect/locations`.

## Other Stripe products by region availability

| Product | Available |
|---|---|
| Stripe Tax | AU, NZ, UK, US, CA, most EU |
| Radar Premium | All regions |
| Atlas (company formation) | US only |
| Issuing (card programs) | US, UK, EU, AU (limited) |
| Treasury | US only (banking-as-a-service) |
| Capital (operator loans) | US, UK |
| Climate (carbon removal) | All |
| Identity (KYC product) | US, UK, EU, AU, CA |
| Terminal (in-person POS) | US, UK, AU, NZ, CA, EU |

## Operating norms by region

| Region | Common work patterns |
|---|---|
| AU | Mon-Fri 9-5; payouts arrive within 7 days of first sale; BAS lodging is the rhythm |
| NZ | Similar to AU; GST 2-monthly the norm |
| UK | Mon-Fri 9-5 + MTD VAT quarterly the rhythm; HMRC strict on deadlines |
| US | Mon-Fri (operator timezone varies); 1099-K landing late Jan triggers tax season |
| CA | Mon-Fri; provincial tax adds complexity; QC operators often run separate accounting |

## Defaults the agent uses when info is missing

- Region missing → ask. Don't guess.
- State/Province missing within a region → ask. Don't guess.
- Tax registration status missing → ask. If under threshold,
  recommend not enabling Stripe Tax yet.
- Accounting tool missing → ask. Default suggestion based on
  region (Xero AU, Xero NZ, FreeAgent UK, QBO US, QBO CA).
- Currency missing → use Region's default (AUD / NZD / GBP / USD
  / CAD).
- Subscription cadence missing → ask if recurring is monthly,
  annual, both.

## How to keep this updated

Rates and thresholds change. Re-check this file every 12 months:

- AU GST threshold: stable at $75k for years, but check ATO
- UK VAT threshold: was £85k for years, jumped to £90k in 2024
- US sales tax nexus rules: state-by-state evolution
- 1099-K threshold: dropping — was $20k, now $5k, going to $2.5k
  to $600
- Stripe pricing: published on stripe.com/pricing per country
- Stripe Tax fee structure: free tier vs paid varies

When a regional rule changes, the agent flags it to the operator
at next monthly close.
