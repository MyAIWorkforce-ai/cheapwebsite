# Skillzy — Supabase email templates

Skillzy-branded HTML for the four Supabase auth emails. Paste each one
into **Supabase Dashboard → Authentication → Email Templates**.

For every template:
1. Pick the matching template from the dropdown (top of the page).
2. Replace the **Subject heading** with the one listed below.
3. Replace the **Message body (HTML)** with the entire contents of the
   `.html` file in this folder (copy from the first `<!doctype html>`
   line through `</html>`).
4. Click **Save changes**.

Test by triggering each flow once — signing up a throwaway address,
requesting a magic link, etc. — and confirm the email renders right
in Gmail and Apple Mail.

---

## Template ↔ file ↔ subject

| Supabase template name | File | Subject line to use |
|---|---|---|
| **Confirm signup** | `confirm-signup.html` | `Verify your Skillzy account` |
| **Magic Link** | `magic-link.html` | `Your Skillzy sign-in link` |
| **Reset Password** | `reset-password.html` | `Reset your Skillzy password` |
| **Change Email Address** | `change-email.html` | `Confirm your new Skillzy email` |

---

## Variables used

All four templates use `{{ .ConfirmationURL }}` — Supabase fills this in
with the unique action URL for the recipient. Don't rename or remove it.

If you ever want to add the user's email into the copy, you can also
reference `{{ .Email }}`. Site root is `{{ .SiteURL }}`.

---

## Brand palette used inline

- Background: `#E8ECF0`
- Card: `#F2F4F8` with `1px solid #CCD2DD`
- Ink (body): `#0F1729`
- Gold (accents, button, italic em): `#C19E50`
- Muted (helper text): `#5F6B7E`
- Display font fallback: `'Fraunces', 'Times New Roman', Georgia, serif`
- Body font fallback: system stack (Apple/Segoe/Roboto)

If you tweak the colours later, search-and-replace these hex codes
across all four files and re-paste.
