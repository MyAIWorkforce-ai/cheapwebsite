# Dispute response pack — evidence checklist + cover letter

When a dispute hits, the operator has ~7 days to submit
evidence. Use this pack to assemble the response. See skill 09
for the underlying strategy.

## Step 1 — read the dispute

In Stripe Dashboard → Disputes → [dispute]:

- **Amount**: $[X]
- **Reason code**: [fraudulent / unrecognized / product_not_received
  / subscription_canceled / product_unacceptable / duplicate /
  credit_not_processed / general]
- **Evidence due by**: [date]
- **Customer's message**: [pulled from the dispute]

Decide first: **defend or refund?**

Use the decision tree from skill 09. If the amount is small
(<$50), the dispute reason is fair, or evidence is weak: refund
instead. Saves time and counts against win-rate stats less harshly.

If defending, continue.

## Step 2 — assemble evidence by reason code

### `fraudulent` — "I didn't make this purchase"

The strongest defence is 3DS authentication. Without it, fraud
disputes are hard to win.

Required:
- [ ] **3DS authentication record** — Stripe Dashboard → Payments
      → [charge] → "Authentication" section → screenshot
- [ ] **AVS check result** — pass/partial/fail (from charge details)
- [ ] **CVC check result** — pass/fail
- [ ] **IP address** of customer at purchase
- [ ] **Geolocation of IP** — does it match billing country?
- [ ] **Customer email** (and any prior purchases from this email)
- [ ] **Customer's communication history** — any emails / chat /
      support tickets confirming the customer made the purchase

Strong adds:
- [ ] Customer's prior successful purchases with you (longstanding
      = legitimate)
- [ ] Customer's account creation date (vs charge date — recent
      account + charge = riskier; old account = legitimate)
- [ ] Activity log showing the customer's session on your site
- [ ] Screenshot of the customer's order confirmation page
- [ ] Photo / signature of physical delivery (if applicable)

### `unrecognized` — "I don't recognise this charge"

This is the #1 dispute category for many operators. Almost always
preventable with a clear statement descriptor (skill 01).

Required:
- [ ] **Receipt sent to customer** — screenshot of the email
      Stripe sent + delivery confirmation
- [ ] **Statement descriptor** — confirm it matches the operator's
      brand name (Settings → Business → Public details)
- [ ] **Customer's order details** — date, product, amount
- [ ] **Customer's IP** at order time

Strong adds:
- [ ] Customer's name + email confirming the purchase
- [ ] Past purchase history from the same customer
- [ ] Marketing material that uses the same brand name

### `product_not_received` — "I never got it"

Required for physical:
- [ ] **Shipping tracking URL** + status: "Delivered"
- [ ] **Delivery date + time + location**
- [ ] **Customer signature** (if signature required)
- [ ] **Customer's confirmed shipping address** vs billing address

Required for digital:
- [ ] **Download log** — IP + time + file name showing customer
      downloaded
- [ ] **Email delivery confirmation** for the download link
- [ ] **Open event** of the delivery email (if your ESP tracks)
- [ ] **Login log** if it's an SaaS access — showing customer
      logged in

Required for service:
- [ ] **Booking confirmation** — email or in-app
- [ ] **Service delivery log** — when, where, by whom
- [ ] **Communication log** — texts, emails confirming attendance
- [ ] **Customer's calendar acceptance** (if calendar invite)
- [ ] **Photos / receipts** where applicable (event ticket
      scanned, parking permit issued, etc.)

### `subscription_canceled` — "I cancelled, you charged me anyway"

Required:
- [ ] **Subscription history** — Stripe Dashboard →
      Subscriptions → [sub] → "Activity" tab → screenshot
- [ ] **No cancellation event** in the log
- [ ] **Customer Portal access log** (if available) — customer
      didn't visit cancel page
- [ ] **Terms of Service** screenshot showing renewal terms
- [ ] **Renewal reminder email** that Stripe / you sent before
      the charge

Strong adds:
- [ ] Marketing material confirming auto-renewal disclosure
- [ ] Customer's first purchase confirmation (showed renewal
      terms?)

### `product_unacceptable` — "It was bad / not as described"

Hardest to win. The card network often sides with the customer
because they have the product and aren't using it.

Required:
- [ ] **Product page screenshot** — what was promised
- [ ] **Customer's communication** indicating actual issue (often
      they didn't email you before disputing — that's a win
      argument)
- [ ] **Quality assurance evidence** — testing / inspection
      records
- [ ] **Other customers' positive reviews** for the same product
- [ ] **Return policy** — was the customer offered a return?

Honestly: if the product was defective, refund. Disputing this is
often a losing position even with strong evidence.

### `duplicate` — "I was double-charged"

Required:
- [ ] **Charge details for both transactions** — one is the
      original, second is the disputed
- [ ] **Time gap** — if minutes apart, customer may have legitimate
      claim (button double-click); if hours/days apart, two
      separate purchases
- [ ] **Order IDs** — different products / different sessions?
- [ ] **Customer's order history**

If genuinely a duplicate (button double-click): refund. Don't fight.

### `credit_not_processed` — "I should have got a refund"

Required:
- [ ] **Original charge details**
- [ ] **Refund attempt** — show you issued the refund (if you
      did)
- [ ] **Refund timing** — refunds take 3-10 days; customer may have
      filed dispute prematurely
- [ ] **Communication** with customer about the refund

If the customer asked for refund and you legitimately denied it,
provide refund policy + reason for denial.

### `general` — no specific reason

Stripe Dashboard usually has more detail. Treat as the closest
reason fits the customer's complaint.

## Step 3 — write the cover statement

Stripe's evidence form has a free-text field. This is your closing
argument. Keep it tight, factual, and emotion-free.

### Template — product not received (digital)

```
Customer [name] (email [email]) purchased [Product] on [date] for
$[X]. Transaction confirmed via 3DS authentication. Receipt
delivered to [email] at [time] (delivery confirmation attached).

Download link was sent immediately upon purchase. Our download log
(attached) shows the file was downloaded from IP [IP] at [time],
matching the customer's order IP [IP] (same network).

Customer did not contact our support email [support] before
filing this dispute. We were not given the opportunity to resolve
any issue directly.

We've also attached:
- Order confirmation page screenshot
- Email delivery + open tracking
- Download log with IP + timestamp + file
- Customer's prior successful purchases ([N] orders, $[X] lifetime)

We respectfully request this dispute be resolved in our favour.
```

### Template — subscription canceled

```
Customer [name] (email [email]) subscribed to [Plan] on [date].
The subscription was active at the time of the $[X] charge on
[charge date].

The customer never cancelled prior to the charge. Subscription
activity log (attached) shows no cancellation event between
signup and the disputed charge.

Renewal terms were disclosed at signup: [link to ToS screenshot].
A renewal reminder was emailed to [email] on [date] (delivery
confirmation attached) before the charge.

The customer cancelled AFTER the disputed charge (on [date]).
This indicates the customer was aware of the subscription at the
time of dispute but had not actioned cancellation before the
billing date.

We respectfully request this dispute be resolved in our favour.
```

### Template — unrecognized

```
Customer [name] (email [email]) purchased [Product] on [date] for
$[X]. Stripe statement descriptor for this transaction was
"[descriptor]" — matching our trading name (Settings screenshot
attached).

Receipt was emailed to [email] at [time of charge] showing the
business name, product, and amount (receipt + delivery
confirmation attached).

Customer's order details: [Product], [date], [amount]. Customer's
IP at order time: [IP]. Customer has [N] prior successful
purchases with us ($[Total] lifetime).

We respectfully request this dispute be resolved in our favour.
```

### Template — fraudulent (with 3DS)

```
The disputed charge of $[X] on [date] was authenticated via 3D
Secure (3DS) by the customer's card issuer. Authentication record
attached.

Under card network rules, 3DS authentication shifts dispute
liability to the issuing bank. We respectfully request this
dispute be resolved accordingly.

Additional evidence:
- AVS check: [pass / partial / fail]
- CVC check: [pass / fail]
- IP address: [IP] ([geolocation])
- Billing country: [country] (matches IP country)
- Customer email: [email] ([N] prior purchases, $[X] lifetime)

We have not received any prior customer service contact regarding
this charge.

We respectfully request this dispute be resolved in our favour.
```

## Step 4 — submit

In Stripe Dashboard → Disputes → [dispute]:

1. Click "Submit evidence"
2. Fill EVERY relevant field — even if it seems redundant; Stripe
   forwards everything you provide
3. Upload supporting documents (PDFs of screenshots, communication
   logs, delivery receipts) — combine into one PDF if you can
4. Paste cover statement
5. Submit

Stripe forwards to the card network. You wait 30-90 days for
outcome.

## Step 5 — log the outcome to learnings.md

Whether you win or lose:

```
2026-06-12 — Dispute $[X], reason: [code], outcome: [won/lost]
- Cause: [e.g. "Statement descriptor unclear before update"]
- Lesson: [e.g. "Update statement descriptor; reduces future
  unrecognized disputes"]
- Action: [e.g. "Done 2026-06-15"]
```

This is what makes the operator's dispute response sharper across
months. See `config/learnings-template.md`.

## When to surrender mid-dispute

You can give up the dispute partway through — Stripe lets you
issue a refund post-dispute-filed.

Cost: $15 dispute fee (already charged) + refund amount. You
don't recover the $15.

Benefit: dispute won't show as "lost" in stats; doesn't impact
your dispute rate as harshly; saves operator time.

When to do this:
- Realised after starting evidence that you'll lose anyway
- Customer reaches out post-dispute saying "actually, I'd take
  the refund"
- Pre-emptive courtesy to maintain customer relationship

How: Dashboard → Disputes → [dispute] → "Accept dispute" or
process refund on the underlying charge.

## Common mistakes

- **Submitting evidence without 3DS for a fraud dispute** → almost
  certain loss
- **Vague cover statement** → "Customer is wrong" without evidence
  links → loss
- **Missing the deadline** → automatic loss
- **Submitting only the order confirmation** → not enough; need
  delivery proof + communication context
- **Aggressive tone in cover statement** → networks are
  bureaucracy; calm, factual wording wins
- **Defending a clearly bad customer experience** → networks side
  with customer when product was genuinely bad; refund instead

## Dispute alerts — make sure they're loud

(Already in skill 04 — repeat reminder)

- Slack channel: #disputes-urgent — @here
- Email to ops mailbox: dispute@business.com
- Twilio SMS to operator if amount >$500
- Calendar reminder for evidence-due-date

7 days seems long until day 6.
