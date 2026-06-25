# Blog post template

The blog post template is for SEO + trust building. Each post
answers a specific buyer question or addresses a specific use case
the niche cares about.

## Structure

### Front matter (if Markdown / MDX)

```yaml
---
title: <Post title — clear, scannable, includes the primary keyword>
slug: <url-slug>
date: 2026-01-15
updated: 2026-01-15
author: <Name>
category: <Category>
tags: [tag1, tag2, tag3]
readTime: 5 min
description: <140-160 chars — used as meta description + OG>
heroImage: /blog/<slug>/hero.jpg
heroAlt: <Descriptive alt text>
---
```

### H1 (post title)

The H1 is the post title. Rules:

- **50-70 characters** — fits in search results
- **Front-load the keyword**
- **Specific over clever** ("How to find your main water shut-off
  valve and why it matters at 2am" > "When pipes go bump in the
  night")
- **Numbers + lists allowed** ("3 reasons your dishwasher pump
  burned out")
- **Question format works for FAQ-style posts** ("Why does my hot
  water keep cutting out?")

### Meta block (sub-H1)

Below H1, small metadata: date, author, read time.

```
Published 15 Jan 2026 · <Author> · 5 min read
```

If updated significantly, add `(Updated 2 Jun 2026)`.

### Hero image (optional)

A relevant image, real not stock. Width 1600px, optimized to WebP/
AVIF via `next/image`. Alt text describes what's shown.

For posts that don't need a hero image, skip it. Don't add stock
photos for the sake of it.

### Lead paragraph (TL;DR)

50-100 words. The answer up-front. Tells the visitor (and AI
search) what the post is about.

Examples:

> Your main water shut-off valve is the single most useful thing
> in your home plumbing system you don't think about — until 2am
> on a Tuesday when a flexi hose lets go under the kitchen sink
> and water's pouring across the floor. Knowing where it is
> (usually under the kitchen sink, at the front meter box, or in
> the garage) and which way to turn it (clockwise — righty-tighty,
> like all valves) cuts the difference between a $200 plumber bill
> and a $20,000 water-damage claim.

> Cash-flow forecasts go stale in two weeks. The reason most
> agency owners hate them isn't the math — it's that by the time
> you've finished a quarterly forecast, it's already wrong. A
> 13-week rolling forecast, updated weekly, gives you the same
> visibility without the staleness. Here's the template and the
> 30-minute weekly process.

### Body (H2 sections)

Each H2 is a sub-claim or sub-topic. Use sub-sections to make the
post scannable.

```
## H2 — First sub-topic

[2-4 paragraphs of body content. Short paragraphs, max 3 lines.]

[List or table where helpful.]

## H2 — Second sub-topic

[More body.]

### H3 — Sub-sub-topic (if needed)

[Body.]

## H2 — Third sub-topic

[More body.]
```

### Practical takeaway

End the body with a clear takeaway — what to do with the
information.

```
## What to do next

[Bullet list of 2-4 concrete actions the reader should take.]
```

### Closing CTA

End with a CTA relevant to the post. Don't try to convert the
reader on the first scroll — but offer the next step.

```
[Closing line that bridges to the CTA — e.g. "If you'd rather we
just locate yours on the next callout, free of charge"]

[Primary CTA button]
```

## Post types — patterns

### Type 1 — "How to" / instructional

For DIY / educational content the buyer's audience searches.

```
H1: How to <do specific thing>
Lead: Why this matters + when to call a pro.
H2: Tools / materials needed
H2: Step 1 — <first step>
H2: Step 2 — <second step>
H2: Step 3 — ...
H2: When to stop and call a pro
H2: Common mistakes
Closing: When DIY isn't safe / not within scope, call us.
CTA: Book a callout.
```

Example titles:
- "How to find your main water shut-off valve (and why it matters
  at 2am)"
- "How to unclog a toilet without calling a plumber (for the
  85% of times you actually can)"
- "How to read your Xero P&L (in 5 mins)"

### Type 2 — "X vs Y" comparison

For solution-aware audiences comparing options.

```
H1: <Option A> vs <Option B> — which is right for <use case>?
Lead: TL;DR — <one-sentence answer>.
H2: When <Option A> is the right call
H2: When <Option B> is the right call
H2: Cost comparison (with real numbers)
H2: Time / effort comparison
H2: Common questions
Closing: How we'd decide.
CTA: Get a quote for <option>.
```

Example titles:
- "Gas vs electric vs heat pump hot water — which makes sense in
  2026?"
- "Xero vs MYOB vs QuickBooks for an Australian creative agency"

### Type 3 — "Why does X happen" / explainer

For problem-aware audiences trying to diagnose.

```
H1: Why does <symptom> happen?
Lead: Short version — usually <most common cause>.
H2: Most common cause + how to spot it
H2: Less common cause #1
H2: Less common cause #2
H2: When to call a pro
Closing: If you've ruled these out and it's still happening...
CTA: Get a diagnostic visit.
```

Example titles:
- "Why does my hot water keep cutting out?"
- "Why does my cashflow forecast keep being wrong?"

### Type 4 — case study / customer story

For trust-building. Story of a specific customer outcome.

```
H1: How <Customer> <achieved outcome>
Lead: Before / after summary.
H2: The situation — what was wrong
H2: The diagnosis — what we found
H2: The fix — what we did
H2: The result — specific numbers / outcomes
H2: What we learned / would do differently
Closing: If you're in a similar spot...
CTA: Talk to us about <similar situation>.
```

Always: customer permission. Anonymise if needed.

### Type 5 — list / round-up

For SEO + lighter content.

```
H1: <N> <things> for <audience> in <year>
Lead: Why we made this list + how we picked.
H2: <Item 1>
H2: <Item 2>
...
H2: How we chose
H2: What we'd skip (if you have a strong opinion)
Closing: Want help picking? Get in touch.
CTA: Contact us.
```

Example titles:
- "7 hot water cylinder brands worth considering in Australia"
- "5 Notion templates worth stealing for solo founders"

## Writing rules

### Voice + tone

- Match BUSINESS CONFIG → Brand voice
- First-person if a single operator; first-person plural for teams
- Regional English

### Paragraph length

- Max 3 lines (web-rendered)
- Break before any sub-claim
- Use lists for parallel content
- Use tables for comparison content

### Sentence length

- Mix short and long
- A short sentence after a long one packs punch
- Avoid sentences over 30 words

### Specific over generic

| Bad | Good |
|---|---|
| "Hot water systems use a lot of energy." | "An older electric storage HWS uses 4-5kWh/day standby, even when nobody's home." |
| "Cashflow forecasts are important." | "When you're 60 days from running out of cash, a 13-week forecast tells you 14 weeks earlier than a P&L will." |
| "Many homes have leaks." | "About 10% of homes have plumbing leaks wasting 90 gallons or more daily — EPA estimate." |

Specifics earn trust. Generics lose attention.

### Avoid

- "In today's fast-paced world..."
- "We all know that..."
- "Industry experts agree..."
- Anything that could be the first paragraph of any blog post on
  the topic
- Padding sentences ("In this post, we'll explore...")
- "Stay tuned" / "We hope you enjoyed this post"

## SEO checklist for each post

- [ ] Title 50-70 chars, includes primary keyword
- [ ] Description 140-160 chars
- [ ] H1 matches title (in `<h1>`, not styled with CSS)
- [ ] H2 sub-sections logical
- [ ] Primary keyword in H1 + first paragraph + ~2 H2s naturally
- [ ] Internal link to 1-2 related pages (services, other posts)
- [ ] External link to 1 authoritative source (if relevant)
- [ ] Image with alt text
- [ ] OG image (the hero image or a custom one)
- [ ] Article JSON-LD schema
- [ ] Date published + date updated visible
- [ ] Author byline + link to /authors/<name>

## Word count guide

| Post type | Words |
|---|---|
| News / update | 200-400 |
| Quick explainer | 400-700 |
| How-to | 800-1200 |
| Comparison | 1000-1500 |
| Deep dive | 1500-2500 |
| Case study | 600-1200 |

Don't pad to hit a word count. Don't trim a complete answer. Length
serves the reader, not the SEO tool's word counter.

## Structured data — Article

Add Article JSON-LD on every post:

```tsx
const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: post.description,
  image: `https://<DOMAIN>${post.heroImage}`,
  datePublished: post.date,
  dateModified: post.updated,
  author: {
    '@type': 'Person',
    name: post.author,
    url: `https://<DOMAIN>/authors/${authorSlug}`,
  },
  publisher: {
    '@type': 'Organization',
    name: '<Business name>',
    logo: {
      '@type': 'ImageObject',
      url: 'https://<DOMAIN>/logo.png',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://<DOMAIN>/blog/${post.slug}`,
  },
}
```

For instructional content, also add `HowTo` schema for the steps.

For Q&A posts, also add `FAQPage` schema for the embedded Q&As.

## Comments

Don't enable comments by default. Most small-biz blogs don't get
enough engagement to justify the moderation cost + spam exposure.

If buyer insists: **Giscus** (GitHub Discussions-based, free,
spam-resistant) is the cleanest. **Disqus** is heavy + tracks
users. **Hyvor Talk** is paid but privacy-respecting.

Default: contact form CTA at the end instead of comments.

## Social sharing

Optional share buttons (Twitter, LinkedIn, email). Use plain links
or a privacy-friendly lib like `react-share` — avoid AddThis /
ShareThis (heavy + ad-tech).

For most small-biz blogs, skip share buttons. Visitors who share
already know how to copy the URL.

## Categories + tags

Keep it minimal:
- **Categories**: 3-7 max. Each post in exactly one category.
- **Tags**: 3-5 per post. Reuse, don't proliferate.

For very small blogs (under 30 posts), skip tags entirely.

## Related posts

End each post with 2-3 related posts. Drives session depth.

```
Related reading:
- [Post 1 title]
- [Post 2 title]
- [Post 3 title]
```

Pick by tag overlap or manual curation. Automated "related"
algorithms on small blogs usually pick weak matches.

## Newsletter signup at the end

For content-led businesses, every blog post ends with a newsletter
CTA. Use the same form provider as the contact page.

```
Get plumbing tips that don't insult your intelligence

One short email per month. Things worth knowing about plumbing in
Adelaide.

[Email field]  [Subscribe]
```

## Hard rules

- **Real answers. Not SEO bait.** If the post can't answer the
  question well, don't write it.
- **One primary keyword.** Don't try to rank for 5 different
  queries in one post.
- **Internal links matter.** Each post links to at least one
  service / page / other post.
- **Update dates honestly.** "Updated 2026" means actually
  re-checked + revised.
- **Permission for customer stories.** Always.
- **No clickbait titles.** "You'll never believe what we found
  under this sink..." — out.
- **No fake AI-generated authors.** Real bylines or "the team".
