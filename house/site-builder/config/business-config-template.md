# Business config

Fill this in once. Every later skill reads from it. Re-edit anytime
the brief evolves (rebrand, scope creep, new pricing tier, region
change for an expanding business).

```
BUSINESS CONFIG
===============
Business name:        <e.g. Smith Plumbing, Pty Ltd>
Trading as:           <e.g. Smith Plumbing & Gas>
Project name:         <slug for repo + folder — e.g. smith-plumbing>
Owner / decision maker: <who's signing off on launch>

Region:               <Australia | New Zealand | United Kingdom | United States | Canada | Other>
State / Province:     <VIC | NSW | Auckland | London | California | Ontario | Quebec | ...>
Timezone:             <e.g. Australia/Melbourne>
Primary language:     <en-AU | en-NZ | en-GB | en-US | en-CA | fr-CA | bilingual>

THE ONE THING
  Primary CTA:        <single most-important action a visitor takes —
                       e.g. "Book a callout", "Get a quote", "Buy
                       course", "Subscribe to newsletter", "Download
                       ebook", "Call now">
  Secondary CTA:      <only if the primary fails — e.g. "Read about
                       us", "See pricing">
  Conversion goal:    <what success looks like — e.g. "1 booking per
                       100 visitors", "10 newsletter signups/week">

AUDIENCE
  Primary persona:    <one or two sentences — e.g. "Homeowners 35-65
                       in inner Melbourne who Google 'plumber near me'
                       when something's leaking">
  Awareness level:    <unaware | problem-aware | solution-aware |
                       product-aware | most-aware>
  Decision driver:    <e.g. trust, speed, price, expertise, locality,
                       availability>
  Devices:            <mobile-first | desktop-first | both equally>
  Reading level:      <plain English / specialist / technical>

SITE SHAPE
  Type:               <landing | marketing (3-5 pages) | small-biz
                       (6-10 pages) | catalog | content hub | SaaS
                       marketing | e-commerce>
  Pages:              <home, about, services, pricing, contact, blog
                       — tick what's in scope>
  Has blog?           <yes | no | later>
  Has gallery?        <yes | no>
  Has booking?        <yes — via Calendly / Cal.com / SavvyCal / etc.>
  Has chat?           <yes — Crisp / Tidio / Intercom / no>
  Has search?         <yes — Algolia / Typesense / no>

BRAND
  Voice:              <2-3 words — e.g. "tradie no-nonsense" /
                       "calm + professional" / "premium boutique" /
                       "indie + warm" / "expert + dry">
  Tone don'ts:        <e.g. no emoji, no exclamation marks, no
                       "we're passionate about...">
  Primary color:      <#hex or name — e.g. #1A1A1A or "deep navy">
  Secondary color:    <#hex or accent>
  Typography:         <serif / sans / mono / mix — e.g. "Inter for
                       body, Fraunces for display">
  Logo:               <provided file / TBD / agent generates word-mark>
  Imagery style:      <photos / illustration / minimal / none>

DOMAIN
  Existing domain?    <yes — what is it / no — to be registered>
  Preferred TLD:      <.com / .com.au / .co.nz / .co.uk / .ca / other>
  Registrar:          <Cloudflare / Namecheap / Porkbun / GoDaddy /
                       Vercel Domains / Crazy Domains AU / 123-reg UK
                       / NameSilo / 101domain — or "register fresh">
  Email at domain?    <yes — Google Workspace / Microsoft 365 /
                       Fastmail / no>
  Redirect from www?  <www → apex | apex → www | both work>

TECH STACK
  Framework:          <Next.js App Router (default) | Astro | Webflow
                       | WordPress | Framer | Squarespace | Shopify
                       | Other>
  CSS:                <Tailwind (default) | CSS modules | Plain CSS>
  CMS:                <none (default for static) | Sanity | Contentful
                       | DatoCMS | Storyblok | Hygraph | WordPress
                       | Markdown files>
  Hosting:            <Vercel (default) | Netlify | Cloudflare Pages
                       | Render | Railway | Fly.io | AWS Amplify |
                       DigitalOcean App Platform | Cloudways |
                       Kinsta / WP Engine / SiteGround (for WP)>
  Image optimization: <Vercel Image (default for Next.js) | Cloudinary
                       | Imgix | manual Squoosh>
  CDN (if not Vercel): <Cloudflare (default) | Fastly | BunnyCDN |
                        AWS CloudFront>

ANALYTICS + TRACKING
  Analytics:          <Plausible (default for AU/NZ/UK/EU) | GA4
                       (default for US/global) | Vercel Analytics |
                       Fathom | Simple Analytics | PostHog | Mixpanel
                       | Heap | None>
  Tag manager:        <GTM | Segment | RudderStack | None (default)>
  Consent banner:     <Cookiebot | Iubenda | Termly | CookieYes (default
                       for free tier) | OneTrust | Osano | Termageddon
                       | Cookieconsent.io | None (default if only
                       Plausible)>
  Conversion events:  <list — e.g. "form_submit, cta_click_book,
                       phone_click, email_click, scroll_50,
                       scroll_90">

PAYMENTS
  Payments needed?    <yes | no | later>
  If yes — what:      <one-off / subscription / multiple products /
                       custom invoices / booking deposits>
  Stripe Setup bundle installed? <yes — defer to that bundle | no —
                                   site-builder skill 09 will point
                                   you at it>
  Currency:           <AUD / NZD / GBP / USD / CAD / multi>
  Tax handling:       <Stripe Tax automatic | manual | tax-inclusive
                       pricing | tax-exclusive pricing>

LEAD CAPTURE
  Form provider:      <Formspree (default — 50/mo free) | Basin (free
                       100/mo) | Web3Forms (free, no account) | Tally
                       | Typeform | React Hook Form + own backend>
  Anti-spam:          <honeypot (default) + reCAPTCHA v3 | Cloudflare
                       Turnstile | hCaptcha | none for low-volume>
  Where leads go:     <inbox / CRM / Slack / email + Slack — list every
                       destination>
  CRM:                <HubSpot Free | Pipedrive | Folk | Attio | Notion
                       database | Google Sheet | none>
  Email list?         <Mailchimp | ConvertKit (Kit) | ActiveCampaign |
                       Klaviyo | MailerLite | Loops | none>

LEGAL + COMPLIANCE
  Privacy policy:     <Iubenda generator | Termly generator | written
                       by lawyer | use template from legal-pages-pack.md>
  Terms of service:   <as above>
  Cookie policy:      <as above>
  Refund policy:      <as above — only needed if payments=yes>
  Accessibility statement: <required for public sector + Quebec; nice
                            to have everywhere>
  Region-specific:
    AU:  Privacy Act 1988 + APP 1 + Notifiable Data Breaches scheme
         + Spam Act 2003 mandatory if collecting any PII
    NZ:  Privacy Act 2020 + OPC scheme mandatory
    UK:  UK GDPR + DPA 2018 + PECR + (if public sector) Accessibility
         Regs 2018 — privacy policy mandatory; consent banner
         mandatory for non-essential cookies
    US:  CCPA + state laws mandatory if any CA / VA / CO / CT / UT /
         etc. resident might visit; ADA accessibility threat (a real
         lawsuit risk)
    CA:  PIPEDA + Quebec Law 25 (if any Quebec resident might visit);
         if Quebec, French content mandatory + clearly marked
         data-handling

CONTENT NOTES
  Existing content:   <do they have copy already? what files? are
                       there photos? case studies? testimonials?>
  Content blockers:   <e.g. "no testimonials yet", "logo not final",
                       "need product photos">
  Word count targets: <e.g. hero ~30 words, about ~300, services ~150
                       per service, blog posts ~800-1200>

SEO TARGETS
  Primary keyword:    <e.g. "plumber Adelaide" — local search>
  Secondary keywords: <list 3-5 — e.g. "emergency plumber Norwood",
                       "blocked drain Adelaide", "hot water replacement
                       Adelaide">
  Geo target:         <e.g. Adelaide + 25km radius>
  Competitors to look at: <list 3-5 by URL>

BUDGET + TIMELINE
  Budget for paid tools: <e.g. $50/mo | $0 — all-free stack>
  Launch deadline:    <date>
  Soft launch:        <yes — invite-only first | no, just go live>

BANNED PHRASES / TONE
  - <e.g. never say "passionate about plumbing">
  - <e.g. never use exclamation marks in body copy>
  - <e.g. never use "synergy", "leverage", "best-in-class">
  - <e.g. never claim "the best plumber in Adelaide" — provable claim,
    or no claim>
  - <e.g. no stock photos that obviously look like stock>

REGIONAL TERMS (auto-filled by the agent based on Region above)
  Privacy law:        <Privacy Act 1988 / Privacy Act 2020 / UK GDPR
                       + DPA 2018 / CCPA + state patchwork / PIPEDA +
                       Quebec Law 25>
  Anti-spam law:      <Spam Act 2003 / UEMA 2007 / PECR / CAN-SPAM /
                       CASL>
  TLD body:           <auDA / DNCL / Nominet / NeuStar / CIRA>
  Tax label:          <GST 10% / GST 15% / VAT 20% / state sales tax
                       / GST + PST/HST>
  Date format:        <DD/MM/YYYY default, MM/DD/YYYY for US>
  Currency symbol:    <$ / NZ$ / £ / US$ / C$>
```

## Fill rules

- **Be honest about scope.** A "small-biz site with a blog and
  bookings and gallery and case studies and a portal" isn't a
  small-biz site — that's a multi-week build. The agent will
  rescope on your behalf if you tick everything.
- **Pick a single primary CTA.** A homepage with three equally
  weighted CTAs converts worse than a homepage with one. The agent
  defers to whatever's in `Primary CTA:`.
- **Audience trumps brand.** If the brand voice says "premium
  boutique" but the audience is homeowners in panic with a burst
  pipe, audience wins. The content skill will surface this conflict.
- **Region is non-negotiable.** Wrong region = wrong privacy
  policy = enforceable liability. Fill it correctly the first time.
- **Banned phrases matter.** This is what stops the agent sounding
  like every other small-business website.

## When the brief evolves

Tell the agent: *"Update business config — change <field> to <new
value>."* The agent re-reads the file and all later outputs respect
the change. Common updates:

- New pricing tier added → update sitemap (skill 02) → update
  pricing page (skill 04)
- Rebrand → update Brand fields → audit all copy (skill 04)
- Region change (business moved or now sells into a new region) →
  update privacy policy + consent banner (skill 08) + legal pack
  (templates)
- New language requirement (started selling into Quebec) → trigger
  bilingual build (skill 04 with i18n patterns)

## Defaults if a field is empty

If a field is empty, the agent uses these defaults — but **always
flags** that it's using a default, so the operator can correct:

| Field | Default | Why |
|---|---|---|
| Framework | Next.js App Router | Best balance of DX, perf, SEO, AI-readability |
| CSS | Tailwind | Fastest to ship with consistent design |
| Hosting | Vercel | Pre-wired for Next.js, free tier covers small sites |
| Analytics | Plausible (AU/NZ/UK/CA), GA4 (US) | Privacy-first first, ubiquity second |
| Consent | CookieYes free tier | Free, friendly UX, covers AU/NZ/UK/EU/CA |
| Form provider | Formspree free tier | 50/mo free, no backend |
| Anti-spam | Honeypot + Cloudflare Turnstile | Free, privacy-friendly (vs reCAPTCHA) |
| Image optimization | Vercel Image (Next.js default) | Pre-wired, auto-format, auto-resize |
| Currency | Region default (AUD/NZD/GBP/USD/CAD) | Matches BUSINESS CONFIG → Region |
| Date format | DD/MM/YYYY (everywhere except US) | Universal default |

If the operator wants to lock these in permanently, edit the
defaults section above.
