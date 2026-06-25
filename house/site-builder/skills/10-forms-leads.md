---
name: site-forms-leads
description: Wire up the contact form (Formspree / Basin / Web3Forms / Tally / React Hook Form), add anti-spam (honeypot + Cloudflare Turnstile / reCAPTCHA v3), route leads to email + Slack + CRM (HubSpot Free / Pipedrive / Folk / Attio), set the auto-reply and SLA.
allowed_platforms: [claude, openclaw, chatgpt]
tools: [file.write]
---

# Forms + lead capture

## Your job

The contact form is the second-most-important conversion path
after the phone number (for service businesses) or the buy button
(for commerce). Get it working, anti-spam'd, and routing to
wherever the buyer actually reads.

## Step 1 — pick the form provider

Decision tree:

| Buyer signal | Recommend |
|---|---|
| <50 leads/mo, wants free + zero backend | **Formspree free** or **Web3Forms** (free) or **Basin free** |
| 50-500/mo, wants simple | **Formspree paid** ($10/mo) or **Basin paid** ($10/mo) |
| 500+/mo or wants conditional logic / multi-step | **Tally** (forms + light DB, free tier generous) or **Typeform** ($25+/mo) |
| Already on **HubSpot Free CRM** | Use HubSpot Forms — auto-syncs to CRM |
| Buyer wants full custom backend | **React Hook Form** + Vercel function or **Resend** for email |
| Buyer uses **Netlify** for hosting | **Netlify Forms** — built-in, free 100/mo |
| WordPress | **WPForms Lite** (free) or **Fluent Forms** |
| Webflow | Webflow's built-in form handler or Formspree |

Default for this bundle: **Formspree** (50/mo free, fastest setup,
no backend, works in every framework).

Confirm before wiring.

## Step 2 — wire Formspree (default)

### Set up account + form

1. `formspree.io/register` (free, sign in with GitHub or email)
2. Dashboard → "+ New Form"
3. Form name (e.g. "Acme Plumbing — Contact")
4. Submission email (where leads go)
5. Get the endpoint URL: `https://formspree.io/f/<form-id>`

### Add to the contact page

`src/app/contact/page.tsx`:

```tsx
'use client'
import { useState } from 'react'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const formData = new FormData(e.currentTarget)
    const res = await fetch('https://formspree.io/f/<form-id>', {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    })
    setStatus(res.ok ? 'sent' : 'error')
    if (res.ok) {
      e.currentTarget.reset()
      // fire conversion event
      // event('form_submit', { form_id: 'contact' })
    }
  }

  return (
    <section className="px-6 py-20">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-semibold tracking-tight">
          {/* Contact H1 — from skill 04 */}
        </h1>
        <p className="mt-4 text-neutral-600">
          {/* Brief — "Reply within X" */}
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          {/* honeypot — anti-spam */}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div>
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="mt-1 w-full border border-neutral-300 rounded px-3 py-2 focus:ring focus:ring-neutral-300"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1 w-full border border-neutral-300 rounded px-3 py-2 focus:ring focus:ring-neutral-300"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium">Phone (optional)</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className="mt-1 w-full border border-neutral-300 rounded px-3 py-2 focus:ring focus:ring-neutral-300"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium">What can we help with?</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="mt-1 w-full border border-neutral-300 rounded px-3 py-2 focus:ring focus:ring-neutral-300"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="bg-neutral-900 text-white px-6 py-3 font-semibold hover:bg-neutral-700 disabled:opacity-50"
          >
            {status === 'sending' ? 'Sending…' : 'Send'}
          </button>

          {status === 'sent' && (
            <p className="text-sm text-green-700">Got it. Reply within [SLA].</p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-700">
              Something broke — please email <a href="mailto:hello@yourdomain.com" className="underline">hello@yourdomain.com</a>.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
```

### Form UX rules

- **Max 5 fields.** Name + email + message is enough for 90% of
  small biz. Add phone, address, urgency only if needed.
- **Label every input.** `<label for="">` — accessibility + UX.
- **`required` HTML attribute.** Native browser validation works fine.
- **`autoComplete` correct.** `name`, `email`, `tel`, `address-line1`,
  `postal-code`. Helps password managers + accessibility.
- **Submit button label is a verb.** "Send" / "Get a quote" /
  "Book the call" — never just "Submit."
- **Show status clearly.** Sending → Sent → Error states.
- **Confirmation text is honest.** "Reply within 2 hours business
  hours" beats "Thank you for your submission."

## Step 3 — anti-spam

Three layers, ordered by friction (lowest first):

### Layer 1 — honeypot (always)

A hidden `<input>` real users never fill. Bots auto-fill anything
named "name" or "email" — they fill the honeypot too.

Formspree's built-in honeypot field is `_gotcha`:

```html
<input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
```

If `_gotcha` is non-empty in the submission, Formspree silently
drops it. Bot doesn't know.

For other providers, name it `botcheck` / `phone2` / `address2` —
whatever's plausible-looking but actually hidden.

### Layer 2 — Cloudflare Turnstile (default for visible challenge)

Privacy-first vs reCAPTCHA. Free for everyone.

1. `dash.cloudflare.com` → Turnstile → Add site
2. Get sitekey (public) + secret key (server-side)
3. Add to form:

```tsx
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />

<div
  className="cf-turnstile"
  data-sitekey="<your-sitekey>"
  data-theme="light"
/>
```

For Formspree, Turnstile token goes as `cf-turnstile-response` field —
Formspree validates it automatically if you've connected Turnstile
in dashboard settings.

For other providers, validate on the server side using the secret
key. Cloudflare's docs walk through it.

### Layer 3 — reCAPTCHA v3 (alternative)

Use only if Turnstile doesn't work (rare). Google's reCAPTCHA v3:

```html
<script src="https://www.google.com/recaptcha/api.js?render=<sitekey>" async defer />
```

```tsx
async function handleSubmit(e) {
  const token = await grecaptcha.execute('<sitekey>', { action: 'submit' })
  // include token in form submission
}
```

Trade-off: reCAPTCHA tracks users heavily; consent banner has to
disclose it (PECR / GDPR). Turnstile doesn't track. Default to
Turnstile.

### Honeypot + Turnstile catches 99% of spam

Don't add more layers unless spam starts getting through. Each
layer = more friction for real users.

## Step 4 — route leads to where the buyer actually reads

Default route from any form provider: email. Add more destinations
as needed.

### Slack (for teams)

Formspree → Settings → Integrations → Slack → connect workspace +
channel.

Or use a Slack webhook directly:

```tsx
await fetch('https://hooks.slack.com/services/XXX/YYY/ZZZ', {
  method: 'POST',
  body: JSON.stringify({
    text: `New lead from ${formData.get('name')}:\n${formData.get('message')}\nPhone: ${formData.get('phone')}\nEmail: ${formData.get('email')}`,
  }),
})
```

### CRM — HubSpot Free

Default for solo founders + small biz. Free forever for the
basics.

1. `app.hubspot.com` → sign up free
2. Settings → Integrations → connect Formspree (or use HubSpot's
   own form embed)
3. Map form fields to HubSpot contact properties

HubSpot Form embed:

```tsx
<script charSet="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js" />

<div id="hubspotForm" />
<script>
{`
hbspt.forms.create({
  portalId: "<portal>",
  formId: "<form-id>",
  target: "#hubspotForm",
})
`}
</script>
```

Trade-off: HubSpot embed is heavier (~80kb) than Formspree. For
buyers actively using HubSpot, worth it. For others, Formspree +
Zapier-to-HubSpot is lighter.

### CRM — Pipedrive

Similar pattern. Use Pipedrive's Web Forms or pipe Formspree
submissions via Zapier.

### CRM — Folk / Attio

Modern CRMs. Both have form integrations or API. Use Formspree +
webhook to their API endpoint.

### Email list signup (separate form)

For newsletter / lead magnet:

- **ConvertKit (Kit)** — free up to 10K subscribers; embed via
  `<script>` snippet
- **MailerLite** — free up to 1K; similar embed
- **Mailchimp** — older but ubiquitous
- **Loops** — modern, dev-friendly, free tier

Embed code from the provider. Match the brand styling via custom
CSS.

### Zapier / Make / n8n bridge

If the buyer wants to chain leads through multiple destinations
(form → CRM → Slack → email → Notion → etc.), use Zapier or n8n:

- Formspree webhook → Zapier
- Zapier fans out to each destination

Free Zapier tier: 100 tasks/month. Beyond that ~$20/mo. n8n is
free if self-hosted.

## Step 5 — auto-reply

Send a confirmation email to the lead so they know it landed.
Formspree does this automatically; configure:

Formspree → Form → Autoresponder → enable, customise subject +
body.

Auto-reply rules:

- **Send within seconds.** Reassures the lead.
- **From a real reply-to address.** Not noreply@.
- **Includes what happens next.** "We'll reply within X. If
  urgent, call (08) 1234 5678."
- **Sound like the brand.** Match BUSINESS CONFIG → Brand voice.
- **No marketing pitch.** Just acknowledgement + SLA.

Example auto-reply for a plumber:

```
Subject: Got your message — Smith Plumbing

Hi [name],

Thanks for reaching out. I've got your message about [their
message] and I'll reply within 30 minutes during business hours
(7am-5pm weekdays), or by 8am next morning otherwise.

If it's urgent — burst pipe, sewage backing up, no hot water —
please call me directly on (08) 1234 5678 any time, day or night.

— [your name]
Smith Plumbing
```

## Step 6 — set the SLA on the contact page

Whatever the auto-reply promises, the contact page text matches.
Both fields must agree:

```
Contact page lead: "Reply within 30 mins business hours, or by
                   8am next morning."
Auto-reply: same wording.
Form confirmation: "Got it. Reply within 30 mins."
```

Mismatch reads sloppy.

## Step 7 — accessibility on the form

Beyond labels + autoComplete (already covered):

- **`aria-required="true"`** on required fields (in addition to
  HTML `required`)
- **Error messages associated with inputs** — `aria-describedby`
- **Don't rely on color alone for error states** — show text +
  icon + colour
- **Focus moves to the error** on submit if validation fails
- **Submit button has a `type="submit"`** explicitly (not
  default `<button>`)
- **Form usable without JavaScript** — submit POST direct to
  Formspree as a fallback if JS fails

For HTML-only fallback (no JS):

```html
<form action="https://formspree.io/f/<form-id>" method="POST">
  <!-- same fields -->
</form>
```

Formspree handles the redirect to their thank-you page; not as
pretty as JS but reaches every user.

## Step 8 — privacy + consent for forms

The form collects PII (name, email, phone). The privacy policy
must disclose:

- What's collected
- What it's used for
- How long it's stored
- Whether it's shared (form provider, CRM, email tool)
- The lead's rights (access, correction, deletion — varies by
  region)

Below the form, add a consent line:

```html
<p className="text-xs text-neutral-500">
  By submitting, you agree to our <Link href="/privacy">Privacy
  Policy</Link>. We'll only use your details to reply.
</p>
```

For UK / EU / Quebec + sensitive data — consider a checkbox:

```html
<label className="flex gap-2 items-start text-sm">
  <input type="checkbox" name="consent" required />
  <span>I agree to my details being used to reply (see <Link href="/privacy">Privacy</Link>).</span>
</label>
```

For email list signups (marketing emails), double opt-in is best
practice + mandatory under CASL (Canada) + CAN-SPAM (US has more
flexibility but still recommended).

## Step 9 — testing

1. Open the live site in incognito
2. Fill the form genuinely → submit
3. Confirm the buyer's inbox got the lead
4. Confirm Slack / CRM / email list got it (each destination)
5. Confirm auto-reply email arrived
6. Confirm conversion event fired in analytics
7. Try filling the honeypot (DevTools → show hidden field → fill it)
   — submission should be silently dropped
8. Try a known spam payload (multiple URLs, gibberish) — Turnstile
   should block

Then on mobile:

- Form scrolls correctly
- Native mobile keyboard shows the right kind (email shows @,
  phone shows numeric)
- Submit button is reachable above the soft keyboard
- Tap targets are 44px+ tall

## Step 10 — alternative form providers (when Formspree isn't right)

### Basin

`usebasin.com` — free 100/mo. Similar to Formspree, slightly
better UX in the dashboard, similar pricing.

### Web3Forms

`web3forms.com` — free, no account needed. Send to an access key.
For ultra-minimal setups; less control.

### Tally

`tally.so` — forms-as-app. Multi-step, conditional logic, light
database, free for most use cases. Use when the form is more than
a contact box (lead-magnet funnel, intake questionnaire,
self-qualifying quiz).

### Native (React Hook Form + Resend)

Total control, more work:

```bash
npm install react-hook-form resend
```

```tsx
// src/app/api/contact/route.ts
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(req: Request) {
  const data = await req.json()
  await resend.emails.send({
    from: 'leads@yourdomain.com',
    to: 'inbox@yourdomain.com',
    subject: `New lead: ${data.name}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
  })
  return Response.json({ ok: true })
}
```

Plus DNS records for the sending domain (SPF, DKIM, DMARC — see
skill 06).

Trade-off: more code, more moving parts, more upkeep. Worth it for
buyers who need fine control or have privacy / data sovereignty
constraints.

### WordPress

WPForms Lite (free) or Fluent Forms (free + Pro). Both have honeypot
+ reCAPTCHA built in. Drag-and-drop builder.

### Webflow

Webflow's native form handler. Submissions land in Webflow
dashboard + can be emailed. Limit 50/mo on free Site plan, 500/mo
on basic.

## Hard rules

- **Every form has anti-spam.** Honeypot at minimum.
- **Auto-reply within seconds.** Reassures the lead, sets the
  SLA.
- **SLA on the page = SLA in the auto-reply = SLA the buyer
  actually meets.** No empty promises.
- **PII disclosure in the privacy policy.** Forms collecting any
  contact info = privacy policy mention.
- **Don't add reCAPTCHA without disclosure.** Google tracks; PECR
  / GDPR / Quebec Law 25 require consent or clear notice.
- **Forms must work without JavaScript.** HTML form action +
  POST as fallback.
- **Max 5 fields by default.** Each extra field cuts conversion.
- **Mobile-first.** Test on real iOS + Android.
- **Don't auto-subscribe to marketing.** Separate consent for
  newsletter vs reply-to-this-message. CASL + GDPR + AU Spam
  Act.

## Done condition

You're done with this skill when:
- Form is live on the contact page
- Form submits → buyer receives lead in inbox
- Auto-reply fires to the lead
- Anti-spam layers active (honeypot + Turnstile)
- Conversion event fires in analytics on submit
- Privacy policy mentions the form provider + data flow
- Mobile + desktop both work
- Form works with JS disabled (graceful fallback)
- Buyer can demo the form end-to-end with confidence

When done, say:
> *"Forms live. Moving to the launch checklist — final QA before
> we tell people the site exists."*

Then load `11-launch-checklist.md`.
