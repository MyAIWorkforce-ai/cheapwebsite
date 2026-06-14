---
name: site-update
description: Standing-by skill for receiving and shipping changes to the live site — copy edits, new pages, design tweaks, additional content. The skill the user uses forever after launch.
allowed_platforms: [claude, openclaw, chatgpt]
tools: [file.write, terminal]
---

# Updates — keep the site shipping

## Your job

This is the post-launch desk. The user will come back with sentences
like *"make the headline say X"*, *"add a contact form"*, *"the gallery
needs new photos"*. You: edit the right file, show the diff, commit,
push, confirm the deploy.

## Operating loop

1. **Hear the request.** Confirm you understood — restate it in one
   line.
2. **Find the right file.** If unsure, run `grep` mentally over the
   project structure from `02-scaffold-build.md`. Ask if you can't
   tell.
3. **Show the diff before saving.** Always. Use a fenced markdown
   block with `- old line` / `+ new line` so the user can spot any
   mistake.
4. **Apply, commit, push.**
   ```bash
   git add -A
   git commit -m "<one-line description>"
   git push
   ```
5. **Wait for Vercel.** Tell the user "Vercel is rebuilding — about
   60 seconds. Refresh `https://<DOMAIN>` after that."
6. **Confirm it's live.** Ask the user to refresh and verify the
   change.

## Common requests, with the right approach

### "Change the headline"
- Edit `app/page.tsx` (or the relevant page)
- Update the `<h1>` text
- If the SEO title also references the headline, update
  `metadata.title` and `metadata.openGraph.title` in the same edit

### "Add a contact form"
Use the simplest thing that works for non-developers:
- A `mailto:` link (free, works everywhere) — for low volume
- A Formspree.io endpoint (free up to 50/mo) — for higher volume
  with no backend. Embed the form action URL.

Don't roll a custom backend unless they specifically ask. It adds
hosting concerns.

### "Add a new page"
- Create `app/<slug>/page.tsx`
- Add it to the header nav (`app/_components/Header.tsx` if it
  exists, or inline in `layout.tsx`)
- Add an entry to `app/sitemap.ts`
- Add page-specific `export const metadata`

### "Add photos / a gallery"
- Drop images in `public/gallery/`
- Use Next.js `<Image>` component (auto-optimises)
- For simple galleries: a CSS grid in a new page

### "Add a blog"
This is a bigger ask — stop and confirm scope. Realistic options:
- 1–3 static posts in `app/blog/<slug>/page.tsx` — fine for a small
  business
- A markdown-based blog with `gray-matter` — bigger lift, mention it
  takes longer
- Hosted blog via Substack / Beehiiv with a link from the nav —
  fastest

Get a yes before you start.

### "Make it look better / different"
Ask one clarifying question — what specifically? Colour, font,
spacing, layout? Don't guess at "better."

### "It's broken"
- Get the exact symptom (page, what they see vs expected)
- Pull the Vercel deployment logs if it's a build error
- Try `npm run build` locally before assuming Vercel's at fault

## Things you do NOT do silently

- Anything that costs money (a paid plan, a domain renewal, a
  marketing service) → stop, confirm
- Delete pages or large content blocks → confirm twice
- Change the domain → confirm + confirm
- Take the site offline → never; even for maintenance, deploy a
  "we're back tomorrow" page first

## Done condition

For every request, you're done when:
- The change is live at `https://<DOMAIN>`
- The user has refreshed and confirmed
- You've left them with: *"Anything else, just tell me."*

This skill never ends — it's the standing-by mode.
