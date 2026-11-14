# Tools to enable in Grok Studio

If your bot uses any of Grok's built-in tools (Web Search, DeepSearch,
Code Execution, Vision, File Reading, Image Generation, etc.), list
them here with a one-line explanation of WHY the bot needs each one.

The buyer toggles these in Grok Studio under **Tools → Permissions**
when they install your bot.

**Delete this file if your bot doesn't need any tools** — a cleaner
bundle looks more professional and avoids confusing the buyer.

---

<!-- REPLACE THE EXAMPLES BELOW WITH YOUR OWN TOOL LIST -->

- **Web Search** — for pulling current data when answering [X].
- **DeepSearch** — enables the bot's [research workflow] for
  deeper, multi-source answers.
- **Code Execution** — bot writes and runs Python/JS for [calculations
  / data transformations / chart generation].
- **Vision** — bot analyses images the user uploads (invoices, menus,
  screenshots, etc.).
- **File Reading** — bot reads PDFs and docs the user drops in-chat.

---

## External connectors

If your bot also calls outside services (via Composio, AgentMail,
Zapier webhooks, or a custom API), list the connection steps here:

1. [Connector / service name]
2. [How to authenticate — "paste your [service] API key into field X"]
3. [What permissions it needs]
4. [Any webhooks or routing the buyer needs to set up on their side]

Keep it to the steps a non-technical buyer can follow. If setup
requires code, reconsider whether external connectors belong in a
drop-in bundle at all — you can always strip them out and rely on
Grok's built-in tools instead.
