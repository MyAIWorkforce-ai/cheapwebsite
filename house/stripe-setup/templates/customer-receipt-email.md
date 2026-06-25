# Customer receipt email — variations

Stripe's default receipt is fine. These are upgrades for operators
who care about the buyer touch — applied via Settings → Customer
emails → Receipts → custom template.

## Default — one-off purchase (consumer)

```
Subject: Your receipt from [Business name]

Thanks for your purchase!

ORDER
[Product name]
[Date of purchase]

Amount:        $[X]
[Tax 10%/15%/20%]:  $[X]
Total:         $[X]

PAYMENT
Card ending [last 4]
Transaction ID: [ch_xxx]

Need help? Reply to this email.

[Business name]
[ABN / VAT / EIN]
[Website]
```

## Service business — coaching, freelance, agency

```
Subject: Tax invoice — [service description] from [Business name]

Hi [first name],

Thanks for booking [service]. Here's your tax invoice.

INVOICE
Invoice number:  [auto-generated]
Date:            [date]
Service:         [name]
Service date:    [scheduled date]

Subtotal:        $[X]
[Tax 10%/15%/20%]: $[X]
Total paid:      $[X]

NEXT STEPS
[1-line instruction — e.g. "I'll send the prep questionnaire 24
hours before our session" or "I'll be in touch by Tuesday with
the project plan"]

If anything changes, reply directly to this email.

Thanks,
[Operator name]
[Business name]
[ABN / VAT / EIN]
```

## SaaS — first month / sub started

```
Subject: Welcome to [Plan name]

Hi [first name],

You're in. Welcome to [Plan name].

Quick orientation:

→ Get started: [URL to docs / app]
→ Your account: [URL to settings]
→ Manage billing: [Stripe portal URL]

YOUR PLAN
[Plan name]:   $[X]/month (or year)
Next renews:   [date]
Card:          ending [last 4]

We charge automatically each [month/year] until you cancel.
You can cancel any time from your account.

Tax invoice attached.

Hit reply with anything you need.

[Operator name]
[Business name]
```

## SaaS — recurring renewal

```
Subject: Receipt — your [Business name] renewal

Hi [first name],

Your [Plan name] subscription renewed today.

CHARGE
Amount:        $[X]
[Tax]:         $[X]
Total:         $[X]
Next renews:   [date]
Card:          ending [last 4]

Tax invoice attached.

Manage your subscription: [Stripe portal URL]
Need help? Just reply.

[Business name]
[ABN / VAT / EIN]
```

## Digital download

```
Subject: Your [product name] is ready to download

Hi [first name],

Your purchase is ready. Download below — link is valid for 24
hours, or you can request a fresh link from your purchase
confirmation.

DOWNLOAD
[Product name] (PDF, 12MB)
[Direct download URL — fingerprinted to this customer]

ORDER
Amount paid:   $[X]
[Tax]:         $[X]
Total:         $[X]
Order #:       [ID]

If the download doesn't work, reply and we'll resend.

Thanks for your purchase!

[Operator name]
[Business name]
```

## Refund issued

```
Subject: Refund processed — [original product]

Hi [first name],

Your refund is processed. Details below.

REFUND
Original purchase: [Product name]
Original amount:   $[X]
Refund amount:     $[X]
Reason:            [as supplied]
Date refunded:     [date]

The refund will appear on your card statement in 3-10 business
days. The original line item may remain visible alongside the
refund credit.

If you need anything else, reply directly.

Thanks,
[Operator name]
[Business name]
```

## Trial ending (subscription)

```
Subject: Your trial ends in 3 days

Hi [first name],

Your free trial of [Plan name] ends on [date].

On [date], we'll charge $[X] to your card ending [last 4]. After
that, you'll be charged $[X] every [month/year] until you cancel.

KEEP YOUR ACCESS
Nothing to do. You're already set up.

CANCEL INSTEAD
Manage your subscription: [Stripe portal URL]
Or just reply to this email — we'll handle it.

[Operator name]
[Business name]
```

## Card expiring

```
Subject: Your card expires soon — update before [date]

Hi [first name],

Your [Brand] card ending [last 4] expires on [MM/YY]. To avoid an
interruption to your [Plan name] subscription, update your card.

Update card: [one-click Stripe portal URL]

Takes 30 seconds. Your access continues uninterrupted.

If you're planning to cancel anyway, no action needed — but if
the card expires we'll cancel your subscription automatically
after a few retry attempts.

[Operator name]
[Business name]
```

## Failed payment — first attempt

```
Subject: Your payment didn't go through

Hi [first name],

Your [Plan name] payment for $[X] didn't go through. The card
ending [last 4] declined.

This usually means:
- Card has expired
- Insufficient funds
- Bank flagged the charge (it happens — they're being cautious)

UPDATE CARD: [one-click Stripe portal URL]

We'll automatically retry in 3 days. If you want to fix it now
or use a different card, the link above takes 30 seconds.

Reply if you need help.

[Operator name]
[Business name]
```

## Failed payment — final attempt

```
Subject: Last chance to update your card

Hi [first name],

Your [Plan name] payment has failed [N] times. This is the final
retry — if [date]'s attempt fails, your subscription will be
cancelled automatically.

UPDATE CARD: [one-click Stripe portal URL]

Or reply — we can hold the cancellation for 24 hours while you
sort it.

[Operator name]
[Business name]
```

## Connect platform — payout received (to connected seller)

```
Subject: $[X] in your bank account — [Business name] payout

Hi [first name],

We've sent $[X] to your bank account ending [last 4] for your
[Business name] sales last week.

PAYOUT
Gross sales:     $[X]
Platform fee:    -$[X]
Stripe fees:     -$[X]
Total payout:    $[X]

The funds should land in your bank in 1-2 business days.

See your full activity in your seller dashboard: [URL]

Thanks for selling with us.

[Business name]
```

## How to wire these in Stripe

Stripe's receipt template doesn't accept fully custom HTML, but
does accept:
- Brand logo (Settings → Branding)
- Brand colour
- Footer text (Settings → Branding → Footer text)
- "From" name + reply-to (Settings → Customer emails → "From"
  name)
- Inclusion of tax invoice fields (auto if tax registration
  details filled in)

For deeper customisation (full custom HTML):
- Send via your own ESP (Postmark, Resend, ConvertKit, SendGrid)
- Listen for webhook `checkout.session.completed` (skill 04)
- Generate + send custom branded email
- Disable Stripe's default receipt (Settings → Customer emails →
  Receipts → OFF)
- WARNING: don't disable Stripe's default unless your custom is
  reliably sending — customer expects a receipt within minutes

## Compliance reminders by region

For AU + NZ tax invoices: must include "Tax Invoice" header + ABN
or NZBN + GST amount. Default Stripe receipt includes these if
the operator filled in tax settings.

For UK VAT invoices: must include VAT number + VAT amount per line
+ VAT rate.

For US: receipt is sufficient for B2C; for B2B with sales tax
collected, show sales tax breakdown.

For CA: GST/HST/PST amounts broken out.

Stripe's default template handles these correctly when:
- Settings → Branding → Public details has business legal name
  and tax IDs
- Stripe Tax is on, OR manual tax rates are correctly assigned
- Tax behaviour (inclusive/exclusive) matches region norm

## Multi-language

For operators selling across regions:
- Stripe receipts auto-localise based on buyer's locale (English /
  French / German / Spanish / etc.)
- Custom emails: use a templating tool (Postmark templates,
  Customer.io) with locale variants

For QC Canada operators: French version of receipt is required for
QC consumers. Stripe handles automatically when buyer locale = fr-CA.
