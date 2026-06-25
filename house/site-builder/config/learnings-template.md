# learnings.md

The running log of what works and what doesn't for *this* website
builder (or this business's website). Updated after every project
launch and every major change. Read by every later skill so the
agent gets sharper, not just faster.

If you're building one site, this is the post-launch journal for
that site. If you're a freelance designer or web shop shipping
multiple client sites, this tracks patterns across all of them.

```
LEARNINGS — <Operator / Business name>
===========================
Updated: <YYYY-MM-DD>

## Site shape decisions (what shipped vs what was briefed)
| Project | Briefed shape | Shipped shape | Why the change | Outcome |
|---|---|---|---|---|
| <Client A> | small-biz 7 pages | 3-page marketing | Scope creep — narrowed to bookings, services, contact | +12% conversion vs old site |
| <Client B> | landing | landing + about | Trust signal needed (high-ticket coaching) | n/a |
| <Client C> | catalog | small-biz + content hub | Catalog was over-scoped for 8 products | Faster ship, no SKU mgmt |

## Conversion by page type (last N launches)
| Page | Avg time on page | Bounce | Primary CTA click | Notes |
|---|---|---|---|---|
| Home (landing) | 45s | 62% | 8% | Strong if hero answers "what is this" in 5 secs |
| About | 1:30 | 28% | – | Trust-building, low CTA but raises later conversion |
| Services | 1:10 | 35% | 4% | Add per-service CTA; aggregate CTA on services page loses to per-service |
| Pricing | 2:00 | 20% | 12% | Highest-intent page; if hidden, conversion drops |
| Contact | 0:40 | 15% | 22% | Form on the page beats "Contact us → modal" by 3-4x |
| Blog post | 3:00 | 70% | 1.5% | SEO play; not direct conversion |
| FAQ | 1:45 | 25% | 5% | Surprisingly strong CTA driver if FAQ ends with CTA |

## Stack decisions that paid off
- "<specific tactic — e.g. defaulting to Plausible for AU/NZ/UK
   buyers saved every project a cookie-banner negotiation; no buyer
   has asked to switch back to GA4>"
- "<e.g. Cloudflare Registrar over Namecheap — at-cost pricing,
   no upsells, sane DNS UI, never had to re-explain whois proxy>"
- "<e.g. Formspree over a custom email backend — zero buyers have
   hit the 50/mo limit on a small-biz site>"
- ...

## Stack decisions that hurt
- "<e.g. Vercel domain transfer to .com.au — auDA requires ABN
   which Vercel doesn't surface in the buy flow; now we steer
   .com.au buyers to Crucial or VentraIP first>"
- "<e.g. defaulted Webflow for a buyer who later wanted dynamic
   CMS content — should have asked about content frequency up
   front>"
- ...

## DNS gotchas (the same ones keep showing up)
- "<e.g. Cloudflare proxied DNS (orange cloud) breaks Vercel SSL
   provisioning; always set DNS-only (grey cloud) for the apex +
   www CNAMEs pointing at Vercel — switch to proxied after SSL
   is live if buyer wants CF caching>"
- "<e.g. ANAME / ALIAS records at the apex — some registrars (eg.
   GoDaddy older accounts) don't support them; fall back to A
   record with Vercel's 76.76.21.21 IP>"
- "<e.g. CAA records blocking Let's Encrypt — buyer's old CAA
   record from a previous Sectigo cert blocks Vercel's issuer;
   add letsencrypt.org or remove the CAA record entirely>"
- ...

## Content patterns that win for which audiences
| Audience | Pattern | Note |
|---|---|---|
| Local trades (plumbers/sparkies/HVAC) | H1 = "<service> in <suburb>" + visible phone + "On-the-way ETA" promise | Highest local search conversion |
| Coaches / consultants | H1 = transformation promise + 1 case study + price clarity | Pricing visibility doubled conversion |
| SaaS marketing | H1 = job-to-be-done outcome + free trial + 3 logos above fold | Logos crucial for trust |
| E-commerce / catalog | H1 = product category + product grid + free-shipping bar | Free-shipping bar lifts AOV |
| Content hub / blog-led | H1 = topic + lead magnet + recent posts | Lead magnet drives email signups |

## SEO patterns that worked
- "<e.g. for local trades, JSON-LD LocalBusiness with areaServed
   and per-suburb landing pages outperforms one generic 'service
   areas' page by ~2x on Google Maps appearance>"
- "<e.g. llms.txt at root — Claude / ChatGPT / Perplexity searches
   started citing the client's site within 2 weeks for two local
   trade queries; classic SEO equivalents took ~6 weeks>"
- "<e.g. FAQPage schema on home page surfaced 'People also ask'
   for half of our local-business launches>"
- ...

## Analytics patterns
- "<e.g. Plausible's 'no cookie banner needed' pitch wins every
   AU/NZ/UK buyer who's been bitten by GDPR scope creep>"
- "<e.g. Vercel Analytics is enough for buyers who never check;
   GA4 for buyers who want to share with a marketer>"
- "<e.g. setting up custom conversion events for phone clicks and
   email clicks — most buyers don't think about these, but they
   surface ~3x more conversions than form-only tracking>"

## Form / lead-capture patterns
- "<e.g. Formspree honeypot field stopped 95% of spam; Cloudflare
   Turnstile caught the remaining 5% without a captcha image>"
- "<e.g. Sending leads to email + Slack outperforms email-only on
   reply-time by ~4x for buyers who actually pay attention>"
- "<e.g. reCAPTCHA v3 quietly broke conversion for one buyer's
   older Safari users — switched to Turnstile, conversion came
   back>"

## Launch checklist gaps that bit us
- "<e.g. forgot to set canonical on the www → apex redirect for
   one client; sat in Google Search Console as duplicate content
   for 3 weeks>"
- "<e.g. shipped without a robots.txt and lost a week of Google
   indexing for two pages>"
- "<e.g. accessibility audit caught contrast on the brand teal
   too late — had to refactor the design system after launch>"

## Region-specific learnings
### AU
- "<e.g. .com.au requires ABN; Vercel Domains doesn't sell .com.au;
   route every AU buyer to Crucial or VentraIP first>"
- "<e.g. Privacy Act 2024 amendments — buyers asking about the new
   statutory tort for serious invasions of privacy; we point them
   at OAIC guidance and recommend a lawyer>"
- "<e.g. GA4 + consent: ACMA hasn't been aggressive but APP 1
   transparency requires a privacy policy that names third-party
   trackers — buyers forget this all the time>"

### NZ
- "<e.g. SiteHost is the default for NZ buyers who want a local
   host; Vercel works fine but some NZ buyers prefer 'data stays
   in NZ' messaging for their own users>"

### UK
- "<e.g. ICO consent enforcement is rigorous — every UK launch
   gets a Cookiebot or Iubenda banner, no exceptions>"
- "<e.g. WCAG 2.1 AA for public-sector buyers is mandatory under
   Accessibility Regs 2018; private-sector is a strong nice-to-
   have>"

### US
- "<e.g. CCPA — even non-CA buyers should add the privacy banner
   if any CA visitor might land; the cost of a banner is low, the
   cost of a complaint is real>"
- "<e.g. ADA accessibility — Title III lawsuits are a real threat;
   axe + Lighthouse a11y + WAVE on every launch>"

### CA
- "<e.g. Quebec Law 25 + French content — if any Quebec resident
   might visit a buyer's site, bilingual EN+FR is the safer
   default; underspend here costs more later>"
- "<e.g. CASL fines are real — express consent before any
   automated email; double-opt-in for newsletter signups>"

## Open experiments
- [ ] <e.g. testing Astro vs Next.js for content-heavy sites —
       2 builds in, Astro faster on Lighthouse but devs less
       familiar; measure 3-month maintenance overhead>
- [ ] <e.g. trialling Cookieyes free tier as default vs Iubenda
       paid — measure buyer support requests over 60 days>
- [ ] <e.g. trying SavvyCal vs Calendly for coaching-business
       bookings — measure no-show rate>

## Banned, refined
(decisions that backfired enough that the agent shouldn't repeat them)
- "<e.g. never default to GoDaddy registrar — every buyer who came
   with one ended up needing a tutorial just to find the DNS panel>"
- "<e.g. never recommend an embedded payment element for a buyer
   who can't write API routes — Payment Link or hosted Checkout
   instead>"
- "<e.g. never start a build without confirming the buyer has an
   ABN / business number — for any region where the TLD requires
   one>"
- "<e.g. never accept 'I'll write the copy myself' without a
   deadline — buyers who say this ship 3-6 weeks late>"
```

## How to use it

Every project, every quote, every weekly check-in: the agent reads
this file FIRST and uses it before generic best-practice. If
"Plausible default for AU buyers" is in the Win column, the agent
proposes Plausible without re-debating; the buyer can still override.

After every launch, update the file with what worked, what bit you,
and which DNS gotchas you'd warn the next buyer about.

After every major content / SEO / analytics change, log the before
and after if measurable.

Quarterly: re-read the whole file. If a "Win" pattern has been
stale for two quarters (no new data points), demote it. If a
"Banned" pattern has had a new tooling solution (e.g. GoDaddy
launched a better DNS panel), un-ban with a note.
