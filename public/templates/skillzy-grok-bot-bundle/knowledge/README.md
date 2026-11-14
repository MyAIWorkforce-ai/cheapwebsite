# Knowledge files

Drop any PDFs, docs, Markdown files, or data your bot needs to do its
job into this folder. The buyer will upload everything here into
Grok Studio's **Knowledge** panel during setup — Grok chunks and
indexes them automatically.

## What belongs in here

- Reference docs the bot needs to answer domain questions
- Procedures / SOPs the bot should follow
- FAQs the bot should know
- Price lists, product catalogues, menus, rate cards
- Policy documents (returns, bookings, insurance codes, etc.)
- Anything else the bot shouldn't have to look up on the fly

## What DOES NOT belong in here

- Your system prompt — that goes in `system-prompt.md` at the root
- Tool configuration — that goes in `tool-permissions.md`
- Setup instructions — those are already in `SETUP.md`
- Buyer licence terms — those go in `LICENCE.md`

## Size limits

Keep individual files under 20 MB. Grok Studio's upload UI gets grumpy
above that. Total knowledge for a single bot is best kept under
~50 files / ~100 MB — bigger than that and retrieval quality drops.

## Before you ship

Delete this README before you zip the bundle for upload to Skillzy.
Buyers don't need to read instructions meant for you.
