---
name: site-deploy-vercel
description: Push the project to GitHub and deploy it via Vercel. End state — the site is live at a vercel.app URL the user can share.
allowed_platforms: [claude, openclaw, chatgpt]
tools: [terminal]
---

# Deploy to Vercel

## Your job

Get the project from the user's machine to a live URL on Vercel,
through GitHub. Hold their hand through every command and click.

## Pre-flight

Confirm with the user:
- Project builds locally (from skill `02-scaffold-build.md`)
- They have a GitHub account (free)
- They have a Vercel account, signed up WITH GitHub (so the connection
  is already authorised)

If either is missing, pause and walk them through signup at
`github.com/join` and `vercel.com/signup`.

## Steps

### 1. Initialise git locally

Inside the project folder:

```bash
git init
git add -A
git commit -m "Initial site"
```

### 2. Create the GitHub repo

Two options — let the user pick:

**A. GitHub CLI (faster)** — if they have `gh` installed:

```bash
gh repo create <project-name> --public --source=. --push
```

This creates the repo AND pushes in one go.

**B. Browser (works for everyone)** — give these steps:

1. Open `github.com/new` in the browser
2. Repo name: `<project-name>` — leave "Add README" unticked
3. Click Create
4. GitHub shows a "push an existing repository" command — copy those
   three lines back to the terminal:

```bash
git remote add origin git@github.com:<username>/<project-name>.git
git branch -M main
git push -u origin main
```

Wait for "Branch main set up to track..." before moving on.

### 3. Import the repo into Vercel

Walk them through:

1. Open `vercel.com/new`
2. Click **Import** next to their new repo
3. Project name: keep the default
4. Framework: should auto-detect as **Next.js**
5. Click **Deploy** — wait ~60 seconds

Vercel will show "Congratulations" and a `<project-name>.vercel.app`
URL. Have the user open it and confirm the site loads.

### 4. Note the production URL

Save the live URL to conversation context (the SEO skill needs it):

```
PRODUCTION_URL: https://<project-name>.vercel.app
```

## Common stumbles

- **"Build failed."** Open the Vercel deployment, click "Build logs",
  paste the actual error to you. Most common: a forgotten `package.json`
  field, a missing `tailwind.config.js`. Fix locally, commit, push —
  Vercel re-deploys automatically.
- **GitHub permission error on push.** Run `gh auth login` (if using
  CLI) or generate an SSH key and add it to GitHub.
- **"Wrong root directory."** In Vercel project settings → Build &
  Output, set Root Directory to `./`.

## Done condition

- The `.vercel.app` URL loads the site
- Pushing to `main` re-deploys (mention this — they'll need it later)
- The user has bookmarked the URL

When done, ask: *"Want to wire up a custom domain now, or skip to SEO?"*
- Custom domain → load `04-connect-domain.md`
- Skip → load `05-seo.md`
