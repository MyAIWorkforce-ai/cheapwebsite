---
name: site-discover
description: Interview the user about the website they want. Capture enough detail to scaffold, write copy, and choose a starting template.
allowed_platforms: [claude, openclaw, chatgpt, n8n]
tools: []
---

# Discovery — what are we building?

## Your job

Ask the user a tight set of questions, capture their answers as a
single "brief" the next skill can read, and confirm the brief back
before moving on.

## Conversation flow

Open with one short opener (no preamble):

> Quick discovery before I scaffold anything. Five questions.

Then ask, ONE AT A TIME, waiting for each answer:

1. **What is it?** *One sentence: who you are, what the site is for.*
   (Examples: "A plumber in Adelaide, need a booking site."
   "A solo bookkeeper in Auckland, want a referral landing page.")

2. **Shape?** *Pick one:* (a) one-page landing • (b) 3–5 pages marketing
   site • (c) small-business site (about, services, gallery, contact)

3. **Single primary CTA.** *What's the one action a visitor should
   take?* (Book, call, get a quote, sign up, download something.)

4. **Tone / look.** *Pick a vibe in one or two words.* Examples:
   "calm + professional", "tradie no-nonsense", "premium boutique",
   "indie + warm". (You'll iterate later; we just need a starting point.)

5. **Domain.** *Do you have one already? If yes, what is it.* If no,
   we'll register one via Vercel later.

If the user gives short or vague answers, ask ONE clarifying question.
Don't interrogate them.

## Output — the brief

Once you have all five answers, write the brief back to the user in
this exact shape, in a fenced markdown block, and ask them to confirm
(*"Look right? Anything to change?"*) before moving on:

```
SITE BRIEF
==========
Who:        <one sentence>
Shape:      <landing | marketing | small-biz>
CTA:        <primary call to action>
Tone:       <2-3 words>
Domain:     <yours or "register via Vercel">
Tech:       Next.js (App Router) + Tailwind + deployed via Vercel
```

Save this brief in conversation context. The next skill
(`02-scaffold-build.md`) reads it directly.

## Done condition

You're done with this skill when:
- All 5 brief fields are filled
- The user has typed something like "yes" / "looks good" / "ship it"
- You haven't started writing code yet

When done, say: *"Brief locked in. Moving to scaffolding."* and load
`02-scaffold-build.md`.
