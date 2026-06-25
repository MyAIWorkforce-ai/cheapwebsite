---
name: site-deploy-vercel
description: Push the project to GitHub and deploy it via Vercel (or Netlify / Cloudflare Pages if the brief calls for it). Set up preview branches, environment variables, build log debugging. End state — the site is live at a vercel.app (or equivalent) URL.
allowed_platforms: [claude, openclaw, chatgpt]
tools: [terminal]
---

# Deploy to Vercel

## Your job

Get the project from the user's machine to a live URL on Vercel,
through GitHub, with preview branches working. Hold their hand
through every command and click.

For Cloudflare Pages, Netlify, Render — covered at the end. Default
is Vercel.

## Pre-flight

Confirm with the user:
- Project builds locally (from skill 03 + skill 04)
- They have a GitHub account (free)
- They have a Vercel account, signed up *with GitHub* (so the
  connection is already authorised)

If either is missing:
- GitHub: walk them through `github.com/join` (free, 1 min)
- Vercel: `vercel.com/signup` → "Continue with GitHub"

Don't proceed without both.

## Step 1 — initialise git locally (if not already)

Inside the project folder:

```bash
git status
```

If git's not initialised:

```bash
git init
git add -A
git commit -m "Initial site"
```

Otherwise check `git status` is clean. If there are uncommitted
changes:

```bash
git add -A
git commit -m "Content + skeleton ready for deploy"
```

## Step 2 — set up .gitignore + sensitive files

Confirm `.gitignore` exists. Next.js scaffold includes one; sanity-
check it contains:

```
node_modules/
.next/
.vercel/
.env
.env.local
.env.production
.DS_Store
*.log
```

Critical: any `.env.local` or `.env.production` with secrets must be
gitignored. If a secret is already committed, stop and rotate the
secret before pushing.

## Step 3 — create the GitHub repo

Two options — let the user pick.

### Option A — GitHub CLI (faster, if they have `gh` installed)

```bash
gh auth status   # confirms logged in
gh repo create <project-name> --public --source=. --push
```

This creates the repo and pushes in one go. Default to **private**
if the buyer is sensitive about open source; `--private` instead of
`--public`.

Public repos can get unwanted scrape attention but have no
practical disadvantage for a small-biz marketing site.

### Option B — Browser (works for everyone)

1. Open `github.com/new` in the browser
2. Repo name: `<project-name>` — leave "Add README" unticked
3. Choose Public or Private
4. Click Create
5. GitHub shows "push an existing repository" — copy those three
   lines back to the terminal:

```bash
git remote add origin git@github.com:<username>/<project-name>.git
git branch -M main
git push -u origin main
```

For HTTPS auth (no SSH key set up):

```bash
git remote add origin https://github.com/<username>/<project-name>.git
git push -u origin main
```

Wait for "Branch main set up to track..." before moving on.

### If GitHub push fails

| Error | Fix |
|---|---|
| `Permission denied (publickey)` | Generate an SSH key + add to GitHub: `ssh-keygen -t ed25519 -C "email"`, then add `~/.ssh/id_ed25519.pub` at `github.com/settings/keys` |
| `403 Forbidden` (HTTPS) | Use a personal access token; `github.com/settings/tokens` → Generate; use as password |
| `repository not found` | Check repo name matches; check you're logged in as the right user (`gh auth status` or `git config user.name`) |
| `failed to push some refs` | `git pull --rebase origin main` then push again |

## Step 4 — import the repo into Vercel

Walk them through:

1. Open `vercel.com/new` in the browser
2. They should see their newly created GitHub repo listed
3. Click **Import** next to it
4. Project name: keep the default (matches the repo name)
5. Framework Preset: should auto-detect as **Next.js**
6. Build Command: leave default (`npm run build`)
7. Output Directory: leave default (`.next`)
8. Install Command: leave default (`npm install`)
9. Environment Variables: skip for now (we'll add in step 6)
10. Click **Deploy**

Vercel runs the build (~60 seconds). When done, you see
"Congratulations" + a confetti animation + a
`<project-name>.vercel.app` URL.

Have the user open the URL and confirm the site loads.

## Step 5 — set up preview branches

By default, Vercel deploys every branch + every PR to a unique
preview URL. Confirm this is on:

1. Vercel project → **Settings** → **Git**
2. **Production Branch**: `main`
3. **Preview Deployments**: ON for all other branches
4. **Comments**: ON (Vercel posts the preview URL to the GitHub PR)

This is what unlocks the iterative shipping pattern: every change
gets a preview URL the buyer can click on, before going to
production.

### Using preview branches in practice

For any non-trivial change, branch off:

```bash
git checkout -b feature/new-pricing-page
# make changes
git add -A
git commit -m "Pricing page"
git push -u origin feature/new-pricing-page
```

Open a PR on GitHub. Vercel comments with a preview URL like
`<project-name>-git-feature-new-pricing-page-<user>.vercel.app`.
The buyer reviews the preview, you merge to main, production
deploys automatically.

Hot fixes can still go straight to main.

## Step 6 — environment variables

If the site uses any third-party API key (Stripe publishable key,
Plausible domain, GA4 measurement ID, Formspree endpoint), set
them in Vercel:

1. Vercel project → **Settings** → **Environment Variables**
2. Add the key + value
3. Pick which envs it applies to: Production, Preview, Development

Common ones for this bundle:

| Variable | Used by | Notes |
|---|---|---|
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible analytics | The site's domain |
| `NEXT_PUBLIC_GA_ID` | GA4 | Measurement ID (G-XXXXXXXXXX) |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Formspree contact form | The form ID |
| `STRIPE_SECRET_KEY` | Server-side Stripe | NEVER prefix with NEXT_PUBLIC_ |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook handler | Server-side only |
| `NEXT_PUBLIC_STRIPE_PUB_KEY` | Stripe Checkout client | Publishable key, safe in browser |

**Rules:**
- Anything with `NEXT_PUBLIC_` prefix is bundled into the client
  JS — only put non-secrets here
- Secrets without the prefix are server-only (API routes,
  middleware) — never accessible from the browser
- Re-deploy after adding env vars (Vercel auto-redeploys if you
  trigger one; you can also Redeploy from the Deployments tab)

## Step 7 — note the production URL

Save the live URL to conversation context (the SEO + domain skills
need it):

```
PRODUCTION_URL: https://<project-name>.vercel.app
```

## Step 8 — confirm preview deployments work

Have the user create a tiny test branch:

```bash
git checkout -b test-preview
# edit any visible text in src/app/page.tsx
git add -A
git commit -m "Test preview"
git push -u origin test-preview
```

Open the PR on GitHub. Within ~60 seconds, Vercel comments with a
preview URL. Confirm the user can click it and see the change.

Then close the PR without merging:

```bash
git checkout main
git push origin --delete test-preview
git branch -D test-preview
```

## Common build failures + fixes

### "Build failed: Module not found"

A package is imported but not installed. Run `npm install` locally,
commit `package.json` + `package-lock.json`, push.

### "Build failed: TypeScript error"

Strict TypeScript caught something. Open the Vercel build log,
find the file + line, fix locally:

```bash
npm run build
```

If `npm run build` succeeds locally, push and Vercel will succeed
too.

### "Build failed: Tailwind not found"

`tailwind.config.js` or `postcss.config.js` missing. Check both
exist in repo root. The Next.js scaffold creates them; if they're
missing, re-run `create-next-app` and copy them over.

### "Build succeeded but 500 / blank page"

Most often an environment variable is missing in production. Check
Vercel → Settings → Environment Variables.

### "Build is slow / timed out"

Vercel Hobby plan has a 45-minute build limit. If the build's
hitting that, something's wrong — `next/font` loading too many
fonts, an infinite loop in `getStaticProps`. Get the build log
and diagnose specifically.

### "Build succeeded but old version shows"

Browser caching. Hard-refresh (Cmd-Shift-R / Ctrl-Shift-F5). If
still old, check the Vercel Deployments tab to confirm the new
build is "Ready" + assigned to Production.

## Stack alternatives

### Cloudflare Pages

For static or very lean Next.js / Astro builds:

1. `dash.cloudflare.com` → **Workers & Pages** → **Create
   application** → **Pages** → **Connect to Git**
2. Pick the repo
3. Build command: `npm run build`
4. Build output directory: `.next` (Next.js with Pages adapter) or
   `dist` (Astro) or `out` (static export)
5. Deploy

Cloudflare Pages free tier: unlimited bandwidth, unlimited
requests, 500 builds/month, 100 custom domains. Better than
Vercel for very-high-traffic sites that get rate-limited on the
Hobby plan.

Trade-off: less plug-and-play for Next.js App Router (some edge
features need adapters); Astro / Hugo / Eleventy work out of the
box.

### Netlify

Similar to Vercel:

1. `app.netlify.com` → **Add new site** → **Import existing project**
2. Pick repo, framework auto-detects
3. Deploy

Netlify Forms is a built-in alternative to Formspree (handy if
your buyer wants one less moving part).

### Render

For full-stack apps with a database:

1. `dashboard.render.com` → **New** → **Web Service**
2. Pick repo
3. Pick instance type (free tier sleeps after 15 min idle)
4. Deploy

Best when the site needs a real backend (Postgres, Redis); Vercel/
Netlify are friendlier for the marketing site half.

### Self-host (Render, Railway, Fly.io, VPS)

Out of scope for this skill — buyer needs DevOps skills. Mention
it exists; route to a server-ops-savvy operator if they ask.

## Hard rules

- **Always test with the user before claiming success.** Open the
  URL, refresh, scroll. Don't assume Vercel's "Ready" status means
  the site works.
- **Never commit secrets.** Pause everything if you see one in a
  diff. Rotate first.
- **Preview branches are the default for non-trivial change.**
  Direct-to-main only for type/copy edits.
- **Don't bypass the build error.** Fix the cause, don't disable
  the check.
- **Hobby tier is fine.** Don't push the buyer to Pro unless
  they're hitting actual limits (10K requests/day on Hobby is
  generous for small biz; bandwidth 100 GB/mo).

## Done condition

You're done with this skill when:
- The `.vercel.app` URL loads the site
- Pushing to `main` re-deploys (mention this — they'll need it
  later)
- Preview branches work — test branch deployed + preview comment
  appeared on the PR
- Environment variables (if any) are set in Vercel
- The user has bookmarked the URL
- Production URL is captured in conversation context

When done, ask: *"Want to wire up the custom domain now, or skip
to SEO and do domain later?"*

- Custom domain → load `06-connect-domain.md`
- Skip → load `07-seo-onpage.md` (recommend doing domain before
  SEO so canonical URLs are right from the start)
