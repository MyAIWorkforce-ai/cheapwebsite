# Regional reference

The agent reads this once on first use, then any time the BUSINESS
CONFIG Region or State/Province changes. Maps every privacy law,
hosting option, registrar, accessibility regime, TLD requirement,
tax label, and language quirk across the five supported regions.

## Region quick lookup

### Australia

| Item | Detail |
|---|---|
| Primary privacy law | Privacy Act 1988 (Cth) + Australian Privacy Principles (APPs) |
| 2024 amendments | Privacy and Other Legislation Amendment Act 2024 — tightens notifiable data breaches, introduces statutory tort for serious invasions of privacy (commenced June 2025), uplifts penalties; further tranches of reform expected through 2026-2027 |
| Regulator | Office of the Australian Information Commissioner (OAIC) |
| Breach notification | Notifiable Data Breaches scheme — within 30 days of becoming aware of a likely-eligible breach; OAIC + affected individuals |
| APP coverage threshold | Businesses with annual turnover ≥ AUD $3M (with several carve-outs that catch smaller businesses too — health, credit, trading in PII) |
| Cookies / trackers | Not regulated by Privacy Act directly; APP 1 (open + transparent management) requires a privacy policy that names third-party trackers; ACMA enforces telemarketing under Spam Act |
| Anti-spam | Spam Act 2003 — express OR inferred consent; every commercial electronic message must identify the sender + offer unsubscribe; enforced by ACMA |
| Anti-discrimination + accessibility | Disability Discrimination Act 1992 (DDA) — case law (Maguire v SOCOG 2000) extends to websites; WCAG 2.1 AA is the de facto standard; Government Digital Service Standard mandates AA for federal/state sites |
| TLD body | auDA (.au Domain Administration) |
| `.com.au` / `.net.au` requirements | Active ABN, ACN, or trademark required; manual whois with registered business details; renewal annual |
| `.au` direct | Open to anyone with an Australian Presence (since 2022) — fastest to register |
| Tax | GST 10% (registration threshold AUD $75K turnover); ABN mandatory for invoicing |
| Currency | AUD |
| Default hosting | Vercel (US/EU/SG edge); local: SiteHost, VentraIP, Crucial, NetOrigin, Digital Pacific |
| Default registrar | Crazy Domains (.com.au), VentraIP (.com.au), Crucial (.com.au); Cloudflare for .com and other gTLDs |
| Date format | DD/MM/YYYY |
| Phone format | +61 4XX XXX XXX (mobile) / +61 (X) XXXX XXXX (landline) |
| Address format | "12 Smith St, Carlton VIC 3053" |
| Working hours norm | Mon-Fri 9-5 local; for trades sites lean to "24/7 emergency, 7am-5pm standard" |

### New Zealand

| Item | Detail |
|---|---|
| Primary privacy law | Privacy Act 2020 |
| Regulator | Office of the Privacy Commissioner (OPC) |
| Breach notification | Notifiable privacy breach scheme — as soon as practicable, no later than 72 hours where a breach has caused serious harm or is likely to |
| Privacy principles | 13 Information Privacy Principles (IPPs) under the Act |
| Cookies / trackers | Not specifically regulated; OPC guidance treats tracking cookies as personal information collection; transparency required |
| Anti-spam | Unsolicited Electronic Messages Act 2007 — consent + identification + unsubscribe; enforced by Department of Internal Affairs |
| Accessibility | Web Accessibility Standard 1.1 (government) — based on WCAG 2.1 AA; private-sector strong recommendation but not mandatory |
| TLD body | DNCL (Domain Name Commission Limited); .nz registry is InternetNZ |
| `.co.nz` / `.nz` requirements | Open; no presence requirement; second-level `.nz` available since 2014 |
| Tax | GST 15% (registration threshold NZD $60K); IRD number required for business |
| Currency | NZD |
| Default hosting | SiteHost (local), Vercel, Cloudflare Pages |
| Default registrar | Cloudflare (for .com), Discount Domains / 1st Domains / SiteHost (for .nz) |
| Date format | DD/MM/YYYY |
| Phone format | +64 2X XXX XXXX (mobile) / +64 X XXX XXXX (landline) |
| Working hours norm | Mon-Fri 8:30-5 local |

### United Kingdom

| Item | Detail |
|---|---|
| Primary privacy law | UK GDPR (post-Brexit retained EU regulation) + Data Protection Act 2018 |
| Cookies + electronic marketing | Privacy and Electronic Communications Regulations 2003 (PECR) — prior, freely-given, specific, informed, unambiguous consent for non-essential cookies; ICO enforces |
| Regulator | Information Commissioner's Office (ICO) |
| Breach notification | 72 hours to ICO; without undue delay to affected individuals if high risk |
| Lawful basis | Consent / contract / legal obligation / vital interests / public task / legitimate interests — must declare in privacy policy |
| Cookie banner | Mandatory for non-essential cookies (analytics, marketing, third-party). Must be opt-in (not pre-ticked), as easy to refuse as to accept. ICO enforces actively — see TPS Limited £200k fine (2023), the cookie sweep of 53 top UK sites (2023) |
| Anti-spam (B2C) | PECR — express consent for unsolicited electronic marketing to individuals; "soft opt-in" for existing customers with clear unsubscribe |
| Anti-spam (B2B) | Legitimate interests basis allowed for corporate addresses; not for sole traders / partnerships |
| Accessibility | Public sector: Public Sector Bodies (Websites and Mobile Apps) Accessibility Regulations 2018 — WCAG 2.1 AA + accessibility statement; private sector: Equality Act 2010 + DDA equivalents — claims-based |
| Advertising + claims | ASA (Advertising Standards Authority) + CMA (Competition and Markets Authority) — claims must be substantiated, no greenwashing, no fake reviews (CMA Digital Markets, Competition and Consumers Act 2024) |
| TLD body | Nominet (`.uk`, `.co.uk`, `.org.uk`, etc.) |
| `.uk` / `.co.uk` requirements | Open globally; no presence requirement |
| Tax | VAT 20% standard (registration threshold £90K turnover from April 2024); 5% reduced rate on energy/some domestic; 0% on most food/children's clothing |
| Currency | GBP |
| Default hosting | Krystal (UK-local), UKFast, Vercel, Cloudflare Pages |
| Default registrar | Cloudflare (for .com/.uk), 123-reg (UK heritage), Names.co.uk |
| Date format | DD/MM/YYYY |
| Phone format | +44 7XXX XXXXXX (mobile) / +44 (0)XX XXXX XXXX (landline) |
| Working hours norm | Mon-Fri 9-5 local |
| Companies House | Company name + number must appear on website if Ltd / LLP / PLC (Companies Act 2006 s82) |

### United States

| Item | Detail |
|---|---|
| Primary privacy law | No federal omnibus — state patchwork |
| State laws (as of 2026) | CCPA + CPRA (California), VCDPA (Virginia), CPA (Colorado), CTDPA (Connecticut), UCPA (Utah), Iowa CDPA, Indiana CDPA, Tennessee TIPA, Texas TDPSA, Montana CDPA, Oregon CPA, Delaware DPDPA, Maryland MODPA, New Hampshire DPA, Minnesota CDPA, New Jersey, plus health-specific (Washington My Health My Data); more states coming — assume any state-level rule applies if it could apply |
| CCPA / CPRA highlights | Right to know / delete / correct / opt-out of sale or sharing; "Do Not Sell or Share My Personal Information" link required; California Consumer Privacy Rights Act expanded enforcement to CPPA (California Privacy Protection Agency) |
| Children's privacy | COPPA (Children's Online Privacy Protection Act) — strict parental consent for users under 13; FTC enforces |
| Health data | HIPAA if covered entity; My Health My Data Act (WA) if any WA resident's consumer health data |
| Cookie banner | Required in CA / CO / VA / CT / many states for "sale or sharing" of data; recommended everywhere as a "covers all bases" default |
| Anti-spam | CAN-SPAM Act 2003 — opt-out (not opt-in) is enough at federal level; identify sender, no deceptive headers, valid physical address, clear unsubscribe processed within 10 business days; CASL/UK rules apply if reaching CA/UK residents |
| Accessibility | Americans with Disabilities Act (ADA) Title III — Department of Justice has stated websites of public accommodations are covered; WCAG 2.1 AA is the de facto standard; lawsuits have surged (~4,000+/year); Robles v Domino's (2019) reinforced applicability |
| State accessibility laws | California Unruh Civil Rights Act ($4K per violation statutory damages); New York State + City Human Rights Law; many state-level lawsuits piggyback on the ADA |
| Section 508 | Federal agency sites + federal contractors — WCAG 2.0 AA |
| TLD body | NeuStar (now GoDaddy Registry) for `.us`; Verisign for `.com`/`.net` |
| `.us` requirements | US nexus required (citizen, resident, organisation, foreign entity with bona fide presence) |
| Tax | Federal: no sales tax; state-by-state — 45 states + DC have sales tax (rates 4-7.25% state + city/county add-ons); economic nexus thresholds (e.g. South Dakota v Wayfair Inc. 2018) trigger sales tax obligation when revenue or transactions cross thresholds in a state |
| Sales tax on digital goods | Highly variable — about 35 states tax SaaS or digital goods now; use Stripe Tax or TaxJar/Avalara to handle |
| Currency | USD |
| Default hosting | Vercel, Netlify, AWS Amplify, Cloudflare Pages, DigitalOcean App Platform, Render, Fly.io |
| Default registrar | Cloudflare, Porkbun, Namecheap; avoid GoDaddy unless buyer already has it |
| Date format | MM/DD/YYYY |
| Phone format | +1 (XXX) XXX-XXXX |
| Working hours norm | Mon-Fri 9-5 local time zone — varies; ET / CT / MT / PT clearly labelled |

### Canada

| Item | Detail |
|---|---|
| Primary privacy law (federal) | PIPEDA (Personal Information Protection and Electronic Documents Act) |
| Provincial laws | Quebec: Loi 25 (Law 25) — GDPR-equivalent, strict, French content required for any Quebec-facing site; BC: Personal Information Protection Act (PIPA); Alberta: PIPA; Ontario: covered by PIPEDA for commercial; specific health/youth/employment rules elsewhere |
| Quebec Law 25 highlights | Privacy officer mandatory; privacy impact assessments; transparency; explicit consent for sensitive PII; mandatory breach notification; access + correction + erasure rights (since Sep 2023); cross-border transfer assessment required |
| Regulator | Office of the Privacy Commissioner of Canada (federal); Commission d'accès à l'information (Quebec); other provincial commissioners |
| Anti-spam | CASL (Canada's Anti-Spam Legislation) — opt-in by default (express or implied), identify sender, unsubscribe in every commercial electronic message; massive fines (up to CAD $10M/violation for organisations); CRTC enforces |
| Accessibility (federal) | Accessible Canada Act 2019 — federal jurisdiction, public sector, federally regulated; WCAG 2.1 AA |
| Accessibility (Ontario) | AODA — Accessibility for Ontarians with Disabilities Act 2005; WCAG 2.0 AA mandatory for private sector ≥ 50 employees; reports due to province |
| Accessibility (Quebec) | Standard SGQRI 008 — government standard, WCAG 2.0 AA; broader Charter of the French Language extends accessibility expectations |
| Quebec language law | Charter of the French Language (Bill 96 amendments) — French must be predominant; web content for Quebec consumers must be in French (with English as optional secondary); company name must appear in French |
| TLD body | CIRA (Canadian Internet Registration Authority) |
| `.ca` requirements | Canadian Presence Requirements — Canadian citizen, permanent resident, corporation, trademark holder, etc. (CIRA verifies) |
| Tax | GST 5% federal + PST (varies by province: BC 7%, SK 6%, MB 7%, QC 9.975%, ON HST 13%, Atlantic HST 15%) |
| Currency | CAD |
| Default hosting | Vercel, Cloudflare Pages, AWS Amplify, DigitalOcean (Toronto region) |
| Default registrar | Cloudflare (verifies CPR), Porkbun (verifies CPR), Hover (Canadian) |
| Date format | DD/MM/YYYY or YYYY-MM-DD (ISO); written: "1 January 2026" universal |
| Phone format | +1 (XXX) XXX-XXXX (NANP, same as US) |
| Working hours norm | Mon-Fri 9-5 local; ET / CT / MT / PT / AT / NT clearly labelled |

## Hosting decisions — cross-region comparison

| Need | Best default | Notes |
|---|---|---|
| Next.js / Astro / Remix / SvelteKit | Vercel | Free Hobby plan, fast edge, easy DNS, automatic SSL |
| Static-only or super-cheap | Cloudflare Pages | Free unlimited bandwidth, fast |
| Buyer wants control / VPS | Render, Railway, Fly.io | Pay-as-you-go, simpler than AWS |
| Big WordPress | Kinsta, WP Engine | Premium WP-specific, ~$30-50/mo |
| Solo WordPress | SiteGround | ~$5-15/mo entry tier |
| All-in-one (CMS + host) | Webflow, Framer, Squarespace, Wix, Shopify | Cheaper for non-technical users in the long run; locked in |
| AU-local hosting (data sovereignty) | SiteHost, VentraIP, Crucial | AU/NZ-based; ~AUD $10-30/mo |
| UK-local hosting | Krystal, UKFast | UK-based; GBP £5-25/mo |
| US-local + AWS-native | AWS Amplify, AWS S3+CloudFront | Pay-as-you-go; complex setup |
| Headless CMS | Sanity, Contentful, DatoCMS, Storyblok, Hygraph | All have free tiers; pair with Vercel/Netlify |

## Registrar decisions

| Need | Registrar |
|---|---|
| `.com` / `.net` / `.org` cheap default | Cloudflare Registrar (at-cost, no upsells) or Porkbun |
| `.com.au` / `.net.au` (AU) | Crazy Domains, VentraIP, Crucial, NetRegistry — ABN required |
| `.co.nz` / `.nz` (NZ) | Discount Domains, 1st Domains, SiteHost |
| `.co.uk` / `.uk` (UK) | 123-reg, Names.co.uk, Cloudflare (now sells .uk) |
| `.ca` (CA) | Cloudflare, Porkbun, Hover, RebelDomains (Canadian Presence verified) |
| `.us` (US) | Cloudflare, Porkbun, NameSilo (US nexus required) |
| Avoid by default | GoDaddy (aggressive upsells, dated DNS UI), Squarespace Domains (was Google Domains — fine but UI is locked into Squarespace flow), Network Solutions |

## Privacy policy decisions

| Region | Generator | Hand-written | Use template |
|---|---|---|---|
| AU | Iubenda (handles APPs) | For complex businesses (>$3M turnover, health) | `templates/legal-pages-pack.md` for small business |
| NZ | Iubenda, Termly | For complex | Template fine for small business |
| UK | Iubenda, Termly | For complex (health, finance, kids) | Template fine for small business; ICO has model wording |
| US | Termly (CCPA toggle), Iubenda | If any sensitive data (health, finance) | Template fine for non-sensitive small business |
| CA | Iubenda (Quebec Law 25 toggle), or lawyer | If Quebec-facing or health data | Template + French translation required for Quebec |

## Consent banner decisions

| Region | Required? | Free option | Paid option |
|---|---|---|---|
| AU | Recommended (APP 1 transparency); essential if using GA4 or Meta Pixel | CookieYes (free) | Cookiebot ($14/mo) |
| NZ | Recommended | CookieYes | Cookiebot |
| UK | Mandatory for non-essential cookies | CookieYes free | Cookiebot, OneTrust |
| US | Required for CA / CO / VA / CT residents; recommended everywhere | Termly free | OneTrust, Cookiebot |
| CA | Mandatory for Quebec; recommended elsewhere | CookieYes | Cookiebot, OneTrust |
| If only Plausible / Fathom / Simple Analytics | Not required (cookieless) | – | – |

## Accessibility — region-by-region targets

| Region | Standard | Mandatory for | De facto for everyone |
|---|---|---|---|
| AU | WCAG 2.1 AA | Federal + state gov sites (Digital Service Standard) | Yes — DDA case law |
| NZ | WCAG 2.1 AA | Govt sites (Web Accessibility Standard 1.1) | Strong recommendation |
| UK | WCAG 2.1 AA + accessibility statement | Public sector (Accessibility Regs 2018) | Yes — Equality Act 2010 |
| US | WCAG 2.1 AA (de facto) | Federal contractors (Section 508 AA) | Yes — ADA Title III lawsuit risk |
| CA | WCAG 2.1 AA | Federal (ACA), Ontario (AODA), Quebec (SGQRI 008) | Yes everywhere |

Bake WCAG 2.1 AA into every build, every region. Use axe DevTools,
WAVE, and Lighthouse a11y for automated checks; manual keyboard
navigation + screen reader spot-check for the launch checklist.

## Analytics — by region default

| Region | Default | Why |
|---|---|---|
| AU | Plausible | Cookieless; sidesteps APP 1 transparency complexity around third-party trackers |
| NZ | Plausible | Same |
| UK | Plausible | Sidesteps PECR consent for non-essential cookies |
| EU (UK adjacent) | Plausible | GDPR friendliness |
| US | GA4 | Ubiquitous; advertisers expect it; pair with consent banner |
| CA | Plausible if Quebec-facing | Quebec Law 25 — explicit consent for trackers |

Operator can override based on buyer preference. Plausible is the
safer default for non-US; GA4 the safer default for US.

## Tax + currency on payment pages

| Region | Currency on the site | Tax label | Inclusive or exclusive |
|---|---|---|---|
| AU | AUD | GST 10% (inc.) | Inclusive is the norm for B2C |
| NZ | NZD | GST 15% (inc.) | Inclusive for B2C |
| UK | GBP | VAT 20% (inc.) | Inclusive for B2C; B2B can be exclusive |
| US | USD | "+ tax at checkout" | Exclusive; Stripe Tax calculates at checkout |
| CA | CAD | "+ GST + PST/HST at checkout" | Exclusive; Stripe Tax calculates at checkout |

For multi-region selling, use Stripe Tax automatic calculation; for
single-region small business, hard-code the rate.

## Form / lead capture choices

| Volume | Free option | Paid option |
|---|---|---|
| <50/mo | Formspree free, Web3Forms free, Basin free | – |
| 50-500/mo | Basin paid ($10/mo), Formspree paid ($10/mo) | – |
| 500+ | Tally + Webhook | Typeform ($25+/mo), HubSpot Free CRM forms |
| With CRM | Use the CRM's native form (HubSpot, Pipedrive) | – |

## Email + CRM choices

| Need | Free option | Paid option |
|---|---|---|
| Basic CRM + lead pipeline | HubSpot Free | Pipedrive ($14/mo) |
| Modern CRM (sole founders) | Folk (limited free) | Folk $19/mo, Attio $34/mo |
| Newsletter / email list | MailerLite free, ConvertKit free up to 10k | Mailchimp, Loops |
| E-commerce email | Mailchimp free, Klaviyo free | Klaviyo (e-comm gold standard) |

## Language requirements summary

| Region | English ok | Other language considerations |
|---|---|---|
| AU | en-AU | Indigenous languages — acknowledge but not required for compliance |
| NZ | en-NZ | Te Reo Māori — increasingly expected for gov, charity, public-facing; not mandatory for private business but a strong cultural recommendation |
| UK | en-GB | Welsh content required for Welsh public sector (Welsh Language Standards 2018) |
| US | en-US | Spanish for many US markets — strong recommendation, not law (some healthcare exceptions) |
| CA | en-CA or fr-CA | French mandatory for Quebec under Bill 96; federal services bilingual; private businesses with Quebec customers must offer French |

## Defaults the agent uses when info is missing

- Region missing → ask. Don't guess.
- State/Province missing within a region → ask. Don't guess for
  Canada (Quebec is a different legal regime); for others default
  to most-populous unless flagged.
- Domain registrar preferred → default to Cloudflare for `.com`;
  region-specific registrar for ccTLDs.
- Hosting → default to Vercel unless WordPress or Webflow chosen.
- Analytics → Plausible for AU/NZ/UK/CA, GA4 for US, both unless
  buyer is privacy-allergic.
- Consent banner → CookieYes free tier (covers all regions).
- Form provider → Formspree free tier.
- Legal pack → use templates with region-specific clauses; flag
  to lawyer for anything beyond small-business marketing site.

## When the customer is multi-region

E.g. an Australian coach selling to UK + US clients. Pull privacy
policy obligations from EVERY region the customer reaches into —
strictest wins. Practically: UK GDPR + DPA 2018 is the strictest
baseline; meeting it usually means meeting AU + NZ + most US states.

For Quebec specifically: if the customer reaches Quebec consumers
at all, add French content + Quebec privacy clauses, regardless of
where the business is based. Cheaper to do up front than to remediate.

## When standards update

Re-check this file every 12 months for changes:

- AU: Privacy Act reform — tranches expected through 2026-2027;
  watch OAIC guidance on the statutory tort that commenced 2025
- NZ: Privacy Act 2020 — stable; watch OPC guidance on AI + data
- UK: UK GDPR — stable; watch ICO enforcement direction; DPDI Bill
  ('Data Protection and Digital Information Bill') was paused —
  if it revives, re-check
- US: state laws — assume +2-4 new state privacy laws per year;
  re-check before every US build
- CA: Quebec Law 25 — fully in force; watch federal CPPA (Consumer
  Privacy Protection Act) if it passes

When a standard updates, the agent flags it to the operator at
the next project's discovery phase.

## Hard-rule summary by region

| Rule | AU | NZ | UK | US | CA |
|---|---|---|---|---|---|
| Privacy policy mandatory if collecting PII | Yes (APP 1) | Yes | Yes | Yes (CA + others) | Yes |
| Consent banner for trackers | Recommended | Recommended | Yes | Yes (state-by-state) | Yes (Quebec); recommended elsewhere |
| Anti-spam law | Spam Act 2003 | UEMA 2007 | PECR | CAN-SPAM | CASL |
| Anti-spam consent default | Express or inferred | Express | Express | Opt-out | Express opt-in |
| Accessibility de facto standard | WCAG 2.1 AA | WCAG 2.1 AA | WCAG 2.1 AA | WCAG 2.1 AA | WCAG 2.1 AA |
| Breach notification | OAIC + individuals | OPC + individuals | ICO + individuals | State AG (varies) | OPC + Quebec CAI + individuals |
| Bilingual required | No | Te Reo recommended | Welsh (public sector) | No (Spanish recommended) | Yes (Quebec) |
| TLD requires presence | `.com.au` ABN | No | No | `.us` US nexus | `.ca` CPR |
| Cookie banner for GA4 | Required for compliance | Required for compliance | Required for compliance | Required CA + 5+ states | Required Quebec |

Default to "the strictest of any region the buyer reaches" — it's
cheaper than remediating later.
