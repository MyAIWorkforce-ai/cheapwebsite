---
name: site-launch-checklist
description: Final pre-launch QA — accessibility audit (axe, WAVE, Lighthouse a11y), performance pass (PageSpeed Insights, WebPageTest), security headers (CSP, HSTS), legal pack live, SEO sanity, broken-link sweep, mobile testing on real devices, soft launch plan. The "we ship today" checklist.
allowed_platforms: [claude, openclaw, chatgpt]
tools: [terminal]
---

# Launch checklist — final pass before going live

## Your job

Everything from skills 03 through 10 should be done. This is the
final QA pass — find what's broken before the buyer's customers do.
Then plan the soft launch (or hard launch if the buyer is impatient).

Don't skip a section. Each one catches a real failure mode the
agent has seen ship to production.

## The full checklist

Print it as a single document for the buyer, then walk it
section-by-section.

```
LAUNCH CHECKLIST — <Business name>
====================================

Section 1 — Accessibility
[ ] WCAG 2.1 AA passes axe DevTools (zero violations)
[ ] WAVE shows zero errors
[ ] Lighthouse Accessibility score 95+
[ ] Keyboard navigation works on every page (Tab through everything)
[ ] Skip-to-content link works
[ ] Focus states visible on every interactive element
[ ] Every image has alt text (decorative = alt="")
[ ] Forms have labels + autoComplete + aria-required
[ ] Color contrast: body 4.5:1, large 3:1 (checked with WAVE or
    DevTools)
[ ] Headings: one H1 per page, no skipped levels
[ ] Page rendered in screen reader (VoiceOver / NVDA) — at least
    home + contact
[ ] No "click here" / "read more" link text — descriptive labels
[ ] Reduced-motion respected (prefers-reduced-motion media query
    if there's any animation)

Section 2 — Performance
[ ] PageSpeed Insights Mobile score 90+ on home + 2 deep pages
[ ] PageSpeed Insights Desktop score 95+
[ ] LCP under 2.5s (lab + field if available)
[ ] INP under 200ms
[ ] CLS under 0.1
[ ] All images use next/image (or equivalent) with explicit
    width/height
[ ] Above-fold image priority loaded
[ ] Fonts use display:swap
[ ] No render-blocking JS above fold
[ ] No unused CSS / JS bundled
[ ] WebP / AVIF for images (Next.js auto)
[ ] Lazy-load off-screen images (Next.js auto)

Section 3 — SEO
[ ] sitemap.xml returns valid XML
[ ] robots.txt returns + allows everything
[ ] llms.txt returns
[ ] Every page has unique title + description
[ ] Every page has canonical URL pointing to itself
[ ] JSON-LD validates on Rich Results Test (home + key pages)
[ ] OG image renders correctly (metatags.io)
[ ] Twitter card renders correctly
[ ] Google Search Console verified + sitemap submitted
[ ] Bing Webmaster Tools verified + sitemap submitted
[ ] All internal links work (no 404s)
[ ] No mixed content (no http:// resources on https:// page)
[ ] Lighthouse SEO score 95+

Section 4 — Security
[ ] HTTPS active, padlock visible
[ ] HTTP redirects to HTTPS
[ ] HSTS header present (Strict-Transport-Security)
[ ] X-Content-Type-Options: nosniff
[ ] X-Frame-Options: SAMEORIGIN or DENY
[ ] Referrer-Policy: strict-origin-when-cross-origin
[ ] Permissions-Policy: locks unused APIs
[ ] CSP (optional but recommended; see step 4 below)
[ ] SSL Labs grade A or A+
[ ] securityheaders.com grade A or A+
[ ] No secrets in client code (grep -r "sk_live" — should return
    nothing)
[ ] .env.local in .gitignore
[ ] Dependabot or equivalent enabled on GitHub repo

Section 5 — Privacy / Legal
[ ] Privacy policy live + region-correct
[ ] Terms of service live
[ ] Cookie policy live (if consent banner present)
[ ] Refund policy live (if payments)
[ ] Accessibility statement live (if UK public sector, AU gov,
    Quebec, or as nice-to-have everywhere)
[ ] Consent banner active + blocks non-essential trackers until
    consent
[ ] Every form discloses data use + links to privacy
[ ] Company identifier in footer (ABN / VAT / Company # / etc.)
[ ] Contact details in footer
[ ] Region-specific compliance done (see regional reference)

Section 6 — Forms + analytics
[ ] Contact form submits, lands in inbox
[ ] Auto-reply fires to lead
[ ] Slack / CRM / email-list routes work (every destination
    tested)
[ ] Honeypot rejects bot fills
[ ] Turnstile (or alternative) validates
[ ] Analytics fires page views + custom events
[ ] Goals / conversions marked in analytics dashboard
[ ] Buyer can log in to analytics dashboard

Section 7 — Payments (if applicable)
[ ] Test mode → real card payment completes
[ ] Webhook fires + handler responds 200
[ ] Success page renders + fires conversion event
[ ] Receipt emailed
[ ] Statement descriptor set (Stripe → Settings)
[ ] Refund tested end-to-end (in test mode)
[ ] Switch to live mode + real $1 charge done + refunded
[ ] Stripe Tax configured (if applicable)
[ ] Customer Portal accessible (if subscriptions)

Section 8 — Content QA
[ ] Every page proofread (no typos, no broken sentences)
[ ] Regional spelling consistent (en-AU / en-NZ / en-GB / en-US
    / en-CA)
[ ] Phone numbers click-to-call on mobile
[ ] Email addresses are mailto: links
[ ] Addresses formatted per region
[ ] Currency + tax formatted per region
[ ] Dates formatted per region
[ ] No lorem ipsum anywhere (grep -r "lorem")
[ ] No placeholder text left in (grep -r "PLACEHOLDER")
[ ] All TODO comments resolved (grep -r "TODO")

Section 9 — Mobile + cross-browser
[ ] Tested on real iPhone (Safari)
[ ] Tested on real Android (Chrome)
[ ] Tested on desktop Chrome
[ ] Tested on desktop Safari
[ ] Tested on desktop Firefox
[ ] (Skip Edge unless buyer's audience uses it heavily; Edge =
    Chromium)
[ ] No horizontal scroll on mobile
[ ] Tap targets 44px+ on mobile
[ ] Sticky header / footer behaves on mobile
[ ] Forms work with mobile autofill

Section 10 — Backups + monitoring
[ ] GitHub repo backed up (the source IS the backup)
[ ] Vercel deployment is rollbackable (Deployments → past versions)
[ ] DNS records documented (saved snapshot in repo or password mgr)
[ ] Uptime monitoring set up (Better Stack, UptimeRobot, or
    Vercel's built-in)
[ ] Domain renewal date in calendar
[ ] SSL auto-renews (Vercel + Let's Encrypt = yes by default)
```

## Section 1 — accessibility deep-dive

### Run axe DevTools

1. Install axe DevTools Chrome extension
2. Open the deployed site
3. DevTools → axe → Scan all of my page
4. Fix every violation. Common ones:
   - Form input missing label
   - Image missing alt
   - Insufficient color contrast
   - Heading order skipped
   - Link with no text (icon-only link needs aria-label)

### Run WAVE

1. `wave.webaim.org/?url=<DOMAIN>`
2. Should show zero errors. Alerts are acceptable but review.
3. Run on every key page

### Lighthouse a11y

1. Chrome DevTools → Lighthouse → Accessibility category
2. Score 95+ on home + 2 deep pages
3. Read every "Failed audit" and fix

### Manual keyboard test

1. Tab through the home page
2. Focus indicator visible at every step?
3. Can reach the form + submit it with keyboard only?
4. Skip-to-content link reachable on first Tab?
5. Modal / drawer / dropdown all keyboard-operable?

### Screen reader spot-check

1. Mac: VoiceOver (Cmd-F5). Win: NVDA (free download)
2. Navigate the home page by heading (H key in NVDA, VO+Cmd+H in
   VO)
3. Are headings descriptive?
4. Form: are labels read?
5. Images: are alts read?

## Section 2 — performance deep-dive

### PageSpeed Insights

1. `pagespeed.web.dev/?url=<DOMAIN>`
2. Run Mobile + Desktop
3. Target Mobile 90+, Desktop 95+
4. Read CWV section: LCP, INP, CLS

### Debug LCP if slow

- DevTools → Performance → record a page load
- Find the LCP element (DevTools highlights it)
- If it's an image: add `priority` to `<Image>`, use WebP/AVIF,
  use right size
- If it's text: check the font is loading via display:swap
- If it's hero with background image: avoid CSS background-image,
  use `<Image>`

### Debug CLS if high

- Lighthouse shows "Avoid large layout shifts" — find the offending
  elements
- Most common: images without dimensions (add width/height)
- Second most: web fonts swapping (use display:swap + size-adjust)
- Third: above-fold content injecting (consent banner that
  pushes content down — anchor to viewport, not flow)

### Debug INP if high

- DevTools → Performance → record interaction
- Find long task in main thread
- Often a third-party script (chat widget, analytics, tag manager)
- Audit + remove or defer

### Lighthouse CI

For ongoing perf monitoring on every PR:

```bash
npm install -D @lhci/cli
```

`.lighthouserc.js`:

```js
module.exports = {
  ci: {
    collect: { url: ['https://<DOMAIN>'], numberOfRuns: 3 },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
      },
    },
  },
}
```

Add a GitHub Action that runs `lhci autorun` on every PR.

## Section 3 — SEO sanity

### Run linkinator

```bash
npx linkinator <DOMAIN> --recurse
```

Reports every broken internal link. Fix all.

### Run Screaming Frog (optional but good)

Free up to 500 URLs. Crawls + reports SEO issues page-by-page.

### Validate JSON-LD

Run Rich Results Test on:
- Home page
- One service page
- One blog post (if applicable)
- Contact page

Fix every error. Warnings can usually be ignored.

### Submit + request indexing

In Google Search Console:
1. URL Inspection → home page → Request indexing
2. Repeat for 3-5 key pages
3. Don't request 500+ at once — Google rate-limits

## Section 4 — security hardening

### Add CSP (if site is stable)

CSP is the strongest content security control. Add to
`next.config.js` only after every third-party script is known:

```js
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io https://challenges.cloudflare.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://plausible.io https://formspree.io;
  frame-src 'self' https://challenges.cloudflare.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://formspree.io;
`.replace(/\s{2,}/g, ' ').trim()

const securityHeaders = [
  // ... HSTS, X-Content-Type-Options, etc.
  { key: 'Content-Security-Policy', value: cspHeader },
]
```

Add domains for every third party (Stripe → `js.stripe.com`,
`api.stripe.com`; GA4 → `www.googletagmanager.com`, `www.google-
analytics.com`; etc.). Test thoroughly — CSP often breaks
inline scripts.

For first launches, skip CSP. Add post-launch when scripts are
stable.

### Run securityheaders.com

`securityheaders.com/?q=<DOMAIN>` → expect A grade.

### Run SSL Labs

`ssllabs.com/ssltest/?d=<DOMAIN>` → expect A or A+ grade.

### Dependabot

GitHub repo → Settings → Security → Dependabot alerts + version
updates → enable. Auto-PRs for vulnerable dependencies.

## Section 5 — legal pack

For each region the buyer reaches, confirm:

### Privacy policy

- Names every data collected (form fields, analytics, cookies,
  trackers, server logs)
- Names every third-party processor (Vercel, Plausible, Formspree,
  HubSpot, etc.)
- Names the legal basis (AU: APPs / NZ: IPPs / UK: GDPR lawful
  basis / US: state-by-state / CA: PIPEDA)
- States retention period
- States user rights (access, correction, deletion, opt-out)
- Names the regulator + complaint path
- Is dated (last updated)

Use `templates/legal-pages-pack.md` as starter; lawyer-review for
non-trivial businesses.

### Terms of service

- Scope (what the service is)
- Acceptable use
- Liability disclaimer (region-specific)
- Governing law + jurisdiction
- Modification + termination
- Contact + complaint path

### Cookie policy (if banner present)

- Lists every cookie + duration + purpose
- Auto-generated from CookieYes / Cookiebot / Iubenda usually

### Refund policy (if payments)

- Refund window (e.g. 30 days for digital, varies for services)
- Process to request refund
- Exceptions (e.g. completed services)
- Region-specific consumer rights:
  - AU: Australian Consumer Law — minimum guarantees apply
  - NZ: Consumer Guarantees Act
  - UK: Consumer Rights Act 2015 + Consumer Contracts Regulations
  - US: state-by-state; FTC Cooling-Off Rule for some sales
  - CA: provincial consumer protection acts

### Accessibility statement (if applicable)

- Standard targeted (WCAG 2.1 AA)
- Conformance status (fully / partially / not)
- Known issues + workarounds
- Contact path for accessibility feedback
- Last reviewed date

Required for: UK public sector, AU government, Quebec government,
US federal. Strongly recommended for everyone else.

## Section 6 — content QA

### Proofread pass

Walk every page slowly. Look for:
- Typos (browser spell-check + your eyes)
- Broken sentences
- Inconsistent capitalization
- Mismatched regional spelling
- Phone/email/address format

### Search for placeholders

```bash
grep -r "lorem ipsum" src/
grep -r "PLACEHOLDER" src/
grep -r "TODO" src/
grep -r "FIXME" src/
grep -r "XXX" src/
```

Fix all.

### Check the obvious

- Business name spelled right everywhere
- ABN / VAT / Company # is the real one
- Phone number is the right one
- Email goes to a real address that's monitored
- Address is the right one (or omitted if no physical address)
- Hours are the real hours

## Section 7 — soft launch plan

Don't go from preview branch to "tell everyone" in one step.

### Day -7 to -1: Internal review

1. Buyer reviews every page on their own
2. 2-3 trusted friends or staff review on real devices
3. Compile feedback + fix
4. Test forms again after fixes

### Day 0: Soft launch

1. Site goes live at the real domain
2. Don't tell anyone yet
3. Submit to Google + Bing Search Console
4. Monitor analytics for unexpected errors (404s, broken forms)
5. Monitor Vercel deployments for errors

### Day 1-3: Test cohort

1. Send to 5-10 trusted customers / prospects
2. Ask: "Find anything broken? Anything confusing?"
3. Fix what they find

### Day 4-7: Wider launch

1. Update Google Business Profile with new URL
2. Update social media bio links
3. Update email signature
4. Update business cards / print
5. Tell the list (newsletter / customers)

### Day 7+: Monitor

1. Search Console → indexing status
2. Analytics → traffic patterns, bounce rate, conversion rate
3. Uptime monitoring → no outages
4. Form submissions arriving
5. Adjust based on data

## Section 8 — emergency rollback plan

If something is wrong post-launch:

### Roll back a deploy

Vercel → Deployments → previous green deploy → "Promote to
Production". Done in 30 seconds.

### Roll back DNS

If the new site is broken at the DNS level, repoint A/CNAME to the
old site's IP. Documented snapshot from skill 06.

### Take the site offline

Don't take fully offline. Deploy a static "we'll be back" page:

```tsx
// src/app/page.tsx — temporary
export default function Maintenance() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-semibold">Back tomorrow morning.</h1>
        <p className="mt-4 text-neutral-600">
          We're updating the site. For urgent matters, call (08)
          1234 5678 or email <a className="underline" href="mailto:hello@yourdomain.com">hello@yourdomain.com</a>.
        </p>
      </div>
    </main>
  )
}
```

Push, deploys in 60s. Buyer is never "down."

## Hard rules

- **Don't skip any section.** Each one has caught a real launch
  failure.
- **Test on real devices, not just emulators.** iOS Safari has its
  own quirks; Android Chrome too.
- **Don't soft-launch and hard-launch in the same hour.** Give a
  buffer to catch issues.
- **Don't ship Friday afternoon.** No support window for the
  weekend.
- **Document the DNS records before launch.** Screenshot or copy
  to a snapshot in the repo. If DNS breaks, you need to recover
  fast.
- **Notify the buyer's email + phone provider if doing email DNS
  changes.** SPF/DKIM/DMARC changes can delay outbound mail.
- **Update the privacy policy date** when any tracker / service
  is added. Audit liability flag.

## Done condition

You're done with this skill when:
- Every checkbox in the checklist is checked OR explicitly
  deferred with a reason
- Buyer has reviewed the live site on their own device
- 2-3 trusted reviewers have given thumbs up
- Soft launch is complete
- No critical issues outstanding
- Uptime monitoring is on
- Rollback path is documented

When done, say:
> *"Launched + monitored. Moving to maintain mode — any change
> from now on, just tell me what you want and I'll ship it."*

Then load `12-maintain-update.md`.
