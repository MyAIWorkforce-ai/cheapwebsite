# Sitemap template

Copy this template into a working sitemap during skill 02. Customize
the shape, then lock the URLs before scaffold.

## Output shape — what skill 02 should produce

```
SITEMAP — <Business name>
==========================

/                              <Job in one line>
                               → primary CTA: <CTA>

/about                         <Job in one line>
                               → secondary CTA: <CTA>

/services                      <Job in one line>
                               → secondary CTA: <CTA>

/services/<slug>               <Job in one line>
                               → primary CTA: <CTA>

/service-areas                 <Job in one line>
                               → primary CTA: <CTA>

/service-areas/<suburb>        <Job in one line>
                               → primary CTA: <CTA>

/gallery                       <Job in one line>
                               → secondary CTA: <CTA>

/pricing                       <Job in one line>
                               → primary CTA: <CTA>

/blog                          <Job in one line>
/blog/<slug>                   <Job in one line>

/faq                           <Job in one line>

/contact                       <Job in one line>
                               → primary CTA: form submit

/privacy                       Privacy policy (region-specific)
/terms                         Terms of service
/cookies                       Cookie policy (if consent banner present)
/refund                        Refund policy (if payments)
/accessibility-statement       Accessibility statement (if required)

/thanks                        Post-checkout / post-form thank-you
                               (robots: noindex)

Header nav:  About · Services · <…> · Contact   [Primary CTA button]
Footer:      [Business + ABN/VAT] [Sitemap] [Legal] [© year] [Phone]
```

## Sitemap by shape — drop-ins

### Landing one-pager

```
/                              Single scrolling page — Hero + Proof + Features + Pricing + FAQ + CTA
                               → primary CTA: <CTA>

/privacy
/terms
/cookies   (if banner present)
```

### Marketing 3-5 page

```
/                              Hero, value prop, social proof, CTAs
/about                         Story + trust signals
/services    OR  /work         What you do
/contact                       Form + phone + hours

/blog        (optional)
/privacy
/terms
/cookies
```

### Small-biz

```
/                              Hero + services preview + CTA
/about                         Story + licensing + insurance + photo
/services                      All services index
/services/<slug>               Per-service page (one per offering)
/service-areas                 List of suburbs (local trades only)
/service-areas/<suburb>        Per-suburb local SEO page
/gallery                       Photo grid / case studies
/pricing                       Public pricing
/faq                           Frequently asked
/contact                       Form + phone + map + hours

/blog        (optional)
/privacy
/terms
/cookies
/refund      (if payments)
```

### Catalog (small e-commerce, <20 products)

```
/                              Featured products + brand story
/shop                          Product grid (all products)
/shop/<product>                Product detail
/collections                   Category index
/collections/<category>        Category page
/cart
/checkout
/account     (if user accounts)
/about
/contact

/privacy
/terms
/refund
/shipping
/cookies
```

### Content hub / publication

```
/                              Featured posts + newsletter signup
/articles                      All posts
/articles/<slug>               Post detail
/topics                        Topic index
/topics/<topic>                Topic landing
/authors
/authors/<name>
/about
/subscribe
/contact

/privacy
/terms
/cookies
```

### SaaS marketing

```
/                              Hero + outcome + 3 logos + features preview
/product   OR  /features       Detailed product / feature pages
/pricing                       Tiers
/customers OR /case-studies    Logos + case studies
/case-studies/<slug>           Individual case study
/docs                          Link to docs subdomain or external
/changelog
/about
/contact

/login                         External — usually app.subdomain
/signup                        External — usually app.subdomain

/blog
/privacy
/terms
/cookies
/security    (if enterprise selling)
/dpa         (data processing agreement — EU/UK B2B)
```

### Portfolio

```
/                              Gallery-first homepage
/work                          All work
/work/<slug>                   Individual project / case study
/about                         Bio + process
/services    OR  /process      How you work
/contact

/privacy
/terms
```

## Page-job examples (so each page has a real reason)

| Page | Job | Bad example | Good example |
|---|---|---|---|
| Home | Make 1 promise + 1 CTA | "About our company" | "What we fix, who we are, how to book" |
| About | Build trust | "Mission and values" | "Solo plumber, gas-ticketed, since 2014" |
| Services | Inventory + per-service CTA | "What we offer" | "Each service: scope, time, price band, CTA" |
| Services/<slug> | Deep-dive + per-service CTA | "Read more about [service]" | "Scope, includes, price band, time, FAQ, CTA" |
| Service-areas/<suburb> | Local SEO + suburb-specific trust | "We serve [suburb]" | "Suburb-specific work, housing stock, ETA, CTA" |
| Pricing | Reduce friction to buy | "Contact us for pricing" | "Price band, what's included, what changes price, CTA" |
| FAQ | Reduce contact-page friction | Generic Q&As | Real customer questions answered honestly |
| Contact | Close the deal | "Get in touch" | "Form + phone + hours + SLA" |
| Blog | SEO + trust | "Industry news" | "Specific buyer-search-query answers" |
| Gallery | Visual trust | "Our work" | "Before/after with permission + dates" |
| Privacy | Compliance + trust | Generic boilerplate | Region-specific + names every tracker |

## URL conventions checklist

- [ ] All lowercase
- [ ] Hyphens between words (`service-areas`, not `service_areas`)
- [ ] No `.html` / `.php` extensions
- [ ] No trailing slash (consistently)
- [ ] Short over clever (`/about` not `/about-us-the-team`)
- [ ] No verbs (`/contact` not `/contact-us`)
- [ ] Stable forever (or 301-redirected)
- [ ] English in URLs (use i18n routing for other languages)
- [ ] Hierarchical (parent / child relationship reflected in path)

## Header nav rules

- Max 5 main nav items
- Primary CTA is a button (visual weight), not a link
- Phone number visible (for local trades) — sticky on mobile
- Logo links to home
- Active page highlighted

## Footer rules

- 3 columns: brand / sitemap / legal
- Footer is the safety net — everything that doesn't fit the
  header
- Company identifier (ABN / VAT / Company number) per region
- Contact details (phone, email, address if applicable)
- Copyright + year (auto-update with `new Date().getFullYear()`)
- Optional: newsletter signup, social links
