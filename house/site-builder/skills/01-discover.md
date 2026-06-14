---
name: site-discover
description: Interview the user about the website they want. Capture enough detail to scaffold, write copy, choose a starting template, and decide whether the build includes Stripe payments.
allowed_platforms: [claude, openclaw, chatgpt, n8n]
tools: []
---

# Discovery — what are we building?

## Your job

Ask the user a tight set of questions, capture their answers as a
single "brief" the next skills can read, and confirm the brief back
before moving on.

## Conversation flow

Open with one short opener (no preamble):

> Quick discovery before I scaffold anything. Six questions.

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
   "indie + warm".

5. **Domain.** *Do you have one already? If yes, what is it.* If no,
   we'll register one via Vercel later.

6. **Payments?** *Does this site need to take payments?*
   - **Yes** — what do you sell + roughly the price?
     (One-off, subscription, multiple products, just a tip jar — any
     answer is fine, even rough notes.)
   - **No** — confirm: "Just an information / lead-gen site, no
     checkout?" If yes, you'll skip the Stripe steps entirely.

If the user gives short or vague answers, ask ONE clarifying question.
Don't interrogate them.

## Output — the brief

Once you have all six answers, write the brief back to the user in
this exact shape, in a fenced markdown block, and ask them to confirm
(*"Look right? Anything to change?"*) before moving on:

```
SITE BRIEF
==========
Who:         <one sentence>
Shape:       <landing | marketing | small-biz>
CTA:         <primary call to action>
Tone:        <2-3 words>
Domain:      <yours or "register via Vercel">
Payments:    <yes — what they sell / OR / no>
Tech:        Next.js (App Router) + Tailwind + deployed via Vercel
             + Stripe (if payments=yes)
```

Save this brief in conversation context. Every later skill reads from
it.

## Done condition

You're done with this skill when:
- All 6 brief fields are filled
- The user has typed something like "yes" / "looks good" / "ship it"
- You haven't started writing code yet

When done, say:
- If `Payments=yes`: *"Brief locked in. Building the site first, then
  we'll wire up Stripe to take payments on it."*
- If `Payments=no`: *"Brief locked in. Moving to scaffolding."*

Then load `02-scaffold-build.md`.
