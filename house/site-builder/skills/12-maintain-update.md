---
name: site-maintain-update
description: The standing-by mode forever after launch. Receive change requests, edit the right file, show the diff, commit, push, confirm the deploy. Also covers ongoing content cadence, security patches, link rot, performance drift, and the learnings.md updates.
allowed_platforms: [claude, openclaw, chatgpt]
tools: [file.write, terminal]
---

# Maintain + update — the standing-by desk

## Your job

This is the post-launch desk. The buyer comes back forever with
sentences like *"make the headline say X"*, *"add a contact form"*,
*"the gallery needs new photos"*, *"we changed our hours"*. You:
edit the right file, show the diff, commit, push, confirm the
deploy.

You also handle ongoing site health — dependency updates, link rot,
content cadence reminders, performance drift, regional law
changes. This skill never ends.

## Operating loop — for every change request

1. **Hear the request.** Confirm you understood — restate it in one
   line. *"You want the homepage H1 to read 'Adelaide's same-day
   plumber' instead of 'Plumbing in Adelaide.' Is that right?"*
2. **Find the right file.** From the sitemap / IA, you know
   where each page lives. If unsure, ask.
3. **Show the diff before saving.** Always. Use a fenced markdown
   block with `- old line` / `+ new line` so the buyer can spot any
   mistake.
4. **Apply, commit, push.**
   ```bash
   git add -A
   git commit -m "<one-line description>"
   git push
   ```
5. **Wait for Vercel.** Tell the buyer: *"Vercel is rebuilding —
   about 60 seconds. Refresh https://<DOMAIN> after that."*
6. **Confirm it's live.** Ask the buyer to refresh and verify the
   change. Don't claim done before they confirm.

For non-trivial changes (new page, structural redesign, SEO move,
new tracker), use a feature branch + preview deploy:

```bash
git checkout -b feature/<description>
# changes
git add -A
git commit -m "<description>"
git push -u origin feature/<description>
```

Open a PR. Vercel comments with preview URL. Buyer reviews preview.
Merge to main when approved. Production deploys.

## Common requests — with the right approach

### "Change the headline"

- Edit `src/app/page.tsx` (or the relevant page)
- Update the `<h1>` text
- If the SEO title also references the headline, update
  `metadata.title` + `metadata.openGraph.title` in the same edit
- Update `llms.txt` summary if the change affects the elevator
  pitch

### "Update business info" (phone, email, hours, address)

- Update `src/components/Header.tsx` (if visible there)
- Update `src/components/Footer.tsx`
- Update `src/app/contact/page.tsx`
- Update structured data (`LocalBusiness` JSON-LD)
- Update `llms.txt`
- Update Google Business Profile (separately — buyer does this)
- Update Bing Places (separately)

### "Add a contact form"

If there isn't one already — pull from skill 10 patterns.

If there is, but they want a new variant (lead-magnet form,
quote-request, booking-intake) — use Tally for multi-step,
Formspree for simple.

### "Add a new page"

- Create `src/app/<slug>/page.tsx`
- Add it to the header nav (`src/components/Header.tsx`)
- Add an entry to `src/app/sitemap.ts`
- Add page-specific `export const metadata`
- Pull content from `templates/<page-type>.md` if the type matches
- Test mobile + desktop

For service-area / per-suburb pages:
- Add to `src/app/service-areas/[suburb]/page.tsx` data source
- Generate `generateStaticParams()` for the new slug
- Write genuinely-different content (not template-filled)

### "Add a blog"

Bigger ask — confirm scope. Realistic options:

- **1-3 static posts** in `src/app/blog/<slug>/page.tsx` — fine for
  a small business that posts rarely
- **Markdown-based with `gray-matter`** — bigger lift but scales:

```bash
npm install gray-matter
```

`src/app/blog/[slug]/page.tsx`:

```tsx
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content/blog')
  const files = fs.readdirSync(dir)
  return files.map((f) => ({ slug: f.replace(/\.md$/, '') }))
}

export default async function Post({ params }: { params: { slug: string } }) {
  const file = path.join(process.cwd(), 'content/blog', `${params.slug}.md`)
  if (!fs.existsSync(file)) notFound()
  const { data, content } = matter(fs.readFileSync(file, 'utf8'))
  return (
    <article className="prose mx-auto px-6 py-12">
      <h1>{data.title}</h1>
      <p className="text-sm text-neutral-500">{data.date} · {data.readTime}</p>
      <div dangerouslySetInnerHTML={{ __html: /* markdown rendered */ }} />
    </article>
  )
}
```

Or markdown via MDX (`@next/mdx`) — more flexible, allows React in
posts.

- **Headless CMS** (Sanity / Contentful / Storyblok) — best for
  buyers who want non-developer editing. Setup takes 2-3 hours.
- **External hosted blog** (Substack / Beehiiv / Ghost) — easiest;
  link from nav. Lowest dev cost, decent for newsletter-led
  businesses.

Pull `templates/blog-post-template.md` for individual post structure.

### "Add photos / a gallery"

- Drop images in `public/gallery/`
- Use `<Image>` component (auto-optimises)
- For simple galleries: CSS grid in a new `src/app/gallery/page.tsx`
- For fancy galleries: integrate `react-photo-gallery` or
  `yet-another-react-lightbox`
- Compress images first: Squoosh (`squoosh.app`) or `sharp` in a
  build step
- Resize to max 2400px wide — no original DSLR sizes

### "Make it look better / different"

Ask one clarifying question — what specifically? Color, font,
spacing, layout? Don't guess at "better."

Common: brand refresh = update `tailwind.config.js` colors + font
choice. Re-audit accessibility (contrast).

### "It's broken"

- Get the exact symptom (page, what they see vs expected)
- Pull the Vercel deployment logs if it's a build error
- Try `npm run build` locally before assuming Vercel's at fault
- Check the buyer's browser cache (Cmd-Shift-R)
- Check `dnschecker.org` if domain doesn't resolve
- Check Vercel deployment status (Vercel dashboard → Deployments)

### "Add a service / product / tier"

- Update the sitemap from skill 02 (locally — `src/app/sitemap.ts`)
- Add the page if new
- Update services index (`src/app/services/page.tsx`) with the new
  card
- Update pricing page (if applicable)
- Update `llms.txt` services section
- Update structured data Service offers

### "Remove a service / page"

- Delete the page file
- Remove from sitemap
- Add a 301 redirect in `next.config.js` to the closest matching
  page (or `/`)
- Update header / footer nav
- Check internal links — `linkinator <DOMAIN>`

### "Change the brand color / font"

- Update `tailwind.config.js` → colors / fontFamily
- Update `globals.css` if custom CSS variables
- Re-audit color contrast — accessibility may break
- Re-audit OG image (may use old brand color)
- Mention: cache may serve old assets for a few minutes

### "Switch to a different domain"

- Add new domain in Vercel (skill 06 process)
- Set as primary
- Old domain → 301 redirect to new
- Update canonical URLs (`metadataBase`)
- Update `llms.txt`, JSON-LD URLs
- Update Search Console — add new property + Change of Address
  tool to transfer rankings
- Update Google Business Profile URL
- Update social bios
- Keep old domain renewed for 12 months minimum

### "Move to a new CMS"

- Confirm scope — this is a multi-day migration
- Set up the CMS (Sanity / Contentful / Storyblok / etc.)
- Define schemas matching current content shape
- Migrate content (often manual for small sites; CSV import for
  larger)
- Wire CMS to Next.js via the provider's SDK
- Test thoroughly on a preview branch before merging

### "It's slow"

- Run PageSpeed Insights — find the actual CWV regression
- Compare to baseline at launch (saved in repo or last
  Lighthouse CI run)
- Common causes:
  - Large image added without `next/image`
  - New third-party script (chat widget, marketing pixel) loading
    synchronously
  - Font added without `display:swap`
  - Heavy hero video / animation

### "GA4 / Plausible / consent banner needs changes"

- Update env vars if measurement ID changed
- Update consent banner config
- Update privacy policy if a new tracker added
- Update `llms.txt` if any visible change
- Test in incognito after deploy

## Ongoing maintenance — quarterly cycle

Even if the buyer doesn't ask, run these every 3 months:

### Q1 — security + dependencies
- `npm audit` → fix all high/critical
- Dependabot PRs → review + merge
- Renew SSL cert if not auto (Vercel + Let's Encrypt = auto)
- Renew domain (if within 90 days of expiry)
- Review security headers (`securityheaders.com`)

### Q2 — performance
- PageSpeed Insights on home + 3 deep pages
- Compare to baseline — any drift?
- Image optimization audit — any new bloated images?
- Run Lighthouse on a low-end mobile profile

### Q3 — content + SEO
- Run linkinator — fix broken links
- Run Screaming Frog 500-URL crawl (free)
- Check Google Search Console — any indexing issues?
- Check sitemap submission
- Check rich results validation
- Update copyright year in footer

### Q4 — legal + privacy
- Re-read privacy policy — anything new added since last review?
- Check regional law changes:
  - AU: Privacy Act amendments (Tranche 2 expected through 2026-27)
  - UK: ICO updates
  - US: new state privacy laws (assume 2-4/year)
  - CA: Quebec Law 25 evolution
- Re-test cookie banner behavior
- Re-test consent gating

## Content cadence

If the brief includes a blog or newsletter, set the buyer's cadence
expectations:

- **Blog**: 1 post per month minimum for SEO momentum; 2-4 ideal
- **Newsletter**: weekly or fortnightly — pick one and hold
- **GBP posts**: 1 per week for local SEO
- **Social**: depends on platform; agent doesn't manage these by
  default

For each post / update:
- New blog post → push, ping IndexNow if set up
- Update llms.txt if topic adds to repertoire

## Performance drift watching

Sign up the buyer's site for:

- **Vercel Speed Insights** (free tier — built-in) or
- **Lighthouse CI** GitHub Action → fails PRs that regress > 10
  points
- **Better Stack / Pingdom / UptimeRobot** for uptime (free tier)

Vercel Speed Insights → buyer can see field CWV trends over time.

## Link rot

Run quarterly:

```bash
npx linkinator <DOMAIN> --recurse
```

Fix any 404s. Update links to moved-away resources. Internal links
should never break (404 monitor in Vercel Analytics flags them).

## Updating learnings.md

After every meaningful project event (a launch, a major content
change, a stack swap, a new tracker), update
`config/learnings-template.md`:

- What worked
- What hurt
- DNS / hosting / form / analytics gotchas
- Region-specific lessons
- Open experiments → status update

This is what makes the next project sharper.

## Things you do NOT do silently

- **Anything that costs money** (a paid plan, a domain renewal,
  a paid third-party service) → stop, confirm
- **Delete pages or large content blocks** → confirm twice; check
  inbound links + Search Console traffic before removing
- **Change the domain** → confirm + confirm + plan redirects
- **Take the site offline** → never. Even for maintenance, deploy
  a "back tomorrow" page first
- **Switch hosting providers** → big move; confirm scope, plan DNS
  + cert + redeploys carefully
- **Disable consent banner** → confirm regional implications
- **Remove privacy policy / terms** → never; only update

## When dependencies break

Common one: Next.js major version (15 → 16):

- Read the upgrade guide first (Next.js docs)
- Create a feature branch
- `npm install next@latest react@latest react-dom@latest`
- `npm run build` — read every error
- Fix breaking changes (App Router API may change)
- Preview deploy → buyer reviews
- Merge if green

Don't bypass tests / type errors — fix the cause.

## Hard rules

- **Show diffs before saving.** Always.
- **Don't push to main without testing locally** (`npm run build`).
- **Don't claim done before the buyer refreshes and confirms.**
- **Preview branches for non-trivial changes.**
- **Document every change in the commit message.** "Update
  homepage H1 to highlight same-day promise" beats "fix".
- **Never delete production data / pages without backups / redirects.**
- **Never disable security features without an explicit reason.**
- **Never skip dependency security updates indefinitely.** Patch
  monthly if not more.

## Done condition

Every request:
- The change is live at `https://<DOMAIN>`
- The buyer has refreshed and confirmed
- The diff is committed with a descriptive message
- Any side effects (sitemap, llms.txt, structured data, redirects)
  are also updated
- You've left them with: *"Anything else, just tell me."*

This skill never ends — it's the standing-by mode.

---

## Quarterly check-in script

Once a quarter, the agent proactively asks:

> Quick quarterly check on <DOMAIN>:
>
> 1. Anything that's changed in the business — services, hours,
>    phone, address, team — that the site needs to catch up on?
> 2. Anything that's been bugging you on the site?
> 3. Run a perf + a11y audit? (5 mins, I'll show what changed.)
> 4. Any new region / market you're now selling into? (Triggers
>    privacy / legal recheck.)
> 5. Domain + SSL renewals due in the next 90 days?
>
> Reply with whatever's relevant — skip the others.

This keeps the site fresh without the buyer having to remember to
ask.
