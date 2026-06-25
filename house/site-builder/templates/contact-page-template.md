# Contact page template

The contact page is the conversion close. It needs to make replying
to a lead frictionless for the buyer AND make contacting the
business obvious + reassuring for the visitor.

## Structure

### H1

State what the page is for. "Contact Us" is fine but predictable.
Better:

- "Get a plumbing quote"
- "Tell us about your project"
- "Book a discovery call"
- "Say hi"
- "Get started"

### Brief intro (1-2 sentences)

What happens next. Set the SLA expectation honestly.

> Reply within 30 minutes business hours (7am-5pm weekdays). After
> hours, we read at 8am next morning. For genuine emergencies —
> burst pipes, sewage backing up, no hot water in winter — please
> call directly on (08) 1234 5678 any time.

### Form OR alternative contact methods

**For most small-biz sites: form + phone + email visible.**

Form structure (4-6 fields max):

```
Name *
Email *
Phone (optional)
What can we help with? *

[Anti-spam: hidden honeypot + Cloudflare Turnstile]

[Send button]
```

For multi-step or qualifying forms (lead-magnet, discovery
questionnaire) — use Tally or Typeform.

### Alongside the form

```
Other ways to reach us:

Phone:   (08) 1234 5678   [click-to-call on mobile]
Email:   hello@yourdomain.com
Hours:   Mon-Fri 7am-5pm, after-hours emergencies via phone
Address: [if relevant — e.g. trade pickup or studio visit]

[Map embed if location-based]
```

### Reply SLA (re-state)

Match the auto-reply. Match the form confirmation.

```
We reply within 30 mins business hours. After hours, by 8am next
morning.
```

## Form copy details

### Field labels

- **Name** — not "Full Name" unless you need it
- **Email** — not "Email Address"
- **Phone** — clarify if required or optional ("Phone (optional)"
  or "Phone *")
- **What can we help with?** — friendlier than "Message" or
  "Comments"
- **Address** (only if needed) — for trades quotes, useful;
  otherwise skip
- **Preferred contact method** (optional) — radio: phone / email /
  text
- **Best time to reach** (optional) — for trades, helps SLA
- **Urgency** (optional) — radio: this week / this month /
  flexible

Each label is a clear question, not a bureaucratic field name.

### Required vs optional

- Hard required: name, email or phone, message
- Soft required: address (trades), urgency (services)
- Optional: everything else

Each extra required field costs ~3-5% conversion. Be ruthless.

### Submit button

Verb-first, specific:

- "Send" (safe default)
- "Send my message"
- "Get my quote"
- "Book the call"
- "Request a callout"
- "Send the brief"

Never just "Submit."

### Confirmation message

After submit, friendly + sets next-step expectation:

> Got it. Reply within 30 minutes.

Or specific:

> Got it. I'll reply with a quote within an hour during business
> hours.

If the buyer left a phone, mention you might call:

> Got it. I'll call your number — usually within the hour during
> business hours.

### Error message

Plain English, identifies the field, doesn't shame:

> Looks like the email address isn't quite right — can you
> double-check?

Not:
> ValidationError: Field 'email' failed pattern validation.

## Form anti-spam (recap)

Three layers — see skill 10:

1. **Honeypot** — hidden field bots auto-fill
2. **Cloudflare Turnstile** — invisible challenge
3. **(Optional) reCAPTCHA v3** if Turnstile won't work

For most small-biz, honeypot + Turnstile catches 99%.

## Accessibility

- Every input has a visible `<label>` (don't rely on placeholder
  alone)
- `autoComplete` attribute correct (`name`, `email`, `tel`, etc.)
- `aria-required="true"` on required fields
- Error messages associated with inputs via `aria-describedby`
- Focus moves to error on failed validation
- Form works without JavaScript (HTML POST fallback)
- Submit button always reachable on mobile (above the soft
  keyboard)
- Tap targets 44px+ on mobile

## Visual layout

### Single column (default)

Form stacks vertically. Easy to fill on mobile, easy to scan on
desktop.

```
[H1]
[Intro]
[Form fields stacked]
[Send button]

[Other ways to reach us — sidebar or below the form]
```

### Two-column (for sites with map / address)

Form on the left, info on the right (or vice versa).

```
[H1]
[Intro]

[Form           ]    [Phone, email, hours]
[                ]    [Map embed         ]
[Send button    ]
```

### Compact contact (for landing pages)

Just an email + phone, no form. For low-volume / high-touch
businesses.

```
[H1]
[Brief]

Email:   hello@yourdomain.com
Phone:   (08) 1234 5678

We reply within 4 hours business days.
```

## Local trades — extras

For local trades:

```
Service area: <list suburbs>
On-site usually within: 90 minutes for emergencies, same-day for
                         standard
Standard hours: Mon-Fri 7am-5pm
After-hours: Yes — call (08) 1234 5678 (surcharge applies)

[Embedded map showing service area]
```

Map embed: Google Maps embed or static screenshot. Google Maps
iframe is free but may need consent banner (it sets cookies). For
privacy-strict regions, use Mapbox / Leaflet with OpenStreetMap.

## Booking-led businesses — instead of form

For coaches, consultants, services where the next step is a
calendar booking, replace the form with a Cal.com / Calendly /
SavvyCal embed:

```
Book a discovery call

[Cal.com or Calendly embed — shows the calendar inline]
```

Or as a button to a hosted booking page:

```
[Book a discovery call →]
```

Defaults:
- **Cal.com** (open source, self-host or cloud, free tier
  generous) — preferred
- **Calendly** (ubiquitous, $12+/mo for the good features)
- **SavvyCal** ($12+/mo, polished UX)
- **TidyCal** (one-off $29 lifetime)

## Privacy disclosure

Below the form:

```
By submitting, you agree to our [Privacy Policy]. We'll only use
your details to reply to your message.
```

For UK / EU / Quebec — consider explicit consent checkbox:

```
[ ] I agree to my details being used to reply (see [Privacy]).
```

For email list signup (separate from contact form):

```
[ ] I'd like the monthly newsletter — typically 1 email per
    month, unsubscribe anytime.
```

Double opt-in for newsletter is best practice + mandatory under
CASL.

## Regional notes

### AU

- Phone numbers: (0X) XXXX XXXX or +61 X XXXX XXXX
- Address format: "12 Smith St, Carlton VIC 3053"
- Spam Act 2003 — express or inferred consent; one-click
  unsubscribe

### NZ

- Phone numbers: 0X XXX XXXX or +64 X XXX XXXX
- UEMA 2007 — express consent

### UK

- Phone numbers: 0XXXX XXXXXX or +44 XXXX XXXXXX
- Companies Act 2006 — Ltd / LLP / PLC must show registered office
  + company # somewhere (footer fine)
- PECR — express consent for marketing emails

### US

- Phone numbers: (XXX) XXX-XXXX
- ADA accessibility — form must be screen-reader friendly
- CAN-SPAM — opt-out, valid physical postal address
- TCPA — if SMS marketing, express prior written consent

### CA

- Phone numbers: (XXX) XXX-XXXX
- Quebec — French content required if reaching Quebec consumers
- CASL — express opt-in mandatory; severe fines for violations

## Tone

Match BUSINESS CONFIG → Brand voice. The contact page is a
conversion close — slightly warmer than the rest of the site is
fine. But still no "We can't WAIT to hear from you!"

### Tradie no-nonsense

> Get a quote.
>
> Send me a quick note on what's going on — I'll reply within 30
> mins business hours, or by 8am next morning.

### Calm + professional

> Tell us about your project.
>
> We'll respond within a business day. If you'd prefer to talk
> first, our number is (08) 1234 5678.

### Premium boutique

> Begin your enquiry.
>
> Each enquiry is read personally by the founder. You'll have a
> reply within 24 hours.

### Indie + warm

> Hey — send me a message.
>
> I read these myself. Usually reply within a few hours, sometimes
> longer if I'm on the tools.

## Common mistakes

- **"We will get back to you as soon as possible."** Vague.
  Commit to a real SLA.
- **Required fields the buyer doesn't expect** — address required
  on a coaching-business contact form is friction.
- **Generic confirmation: "Thank you for your submission."**
  Cold + bureaucratic.
- **No phone number visible.** For local trades, this is huge.
- **Map embeds that load 5 tracking cookies.** Use a static map
  image for privacy-strict regions.
- **"Send"-only button that says nothing about what'll happen.**
  Add a sub-text below: "We reply within 2 hours."
- **No alternative if the form breaks.** Always include an email
  link as fallback: "If the form is acting up, email
  hello@..."
