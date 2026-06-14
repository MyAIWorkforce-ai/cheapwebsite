---
name: stripe-tax-refunds
description: Set up Stripe Tax (GST / VAT / sales tax) for the user's country, plus a clean refund + dispute workflow.
allowed_platforms: [claude, openclaw, chatgpt]
tools: []
---

# Tax + refunds

## Your job

Two things the user MUST get right before they're at any scale:
1. Charging the correct tax automatically
2. Handling refunds + disputes without panicking

## Part one — tax

### Step 1 — decide if they need Stripe Tax

Stripe Tax is a paid add-on (0.5% per transaction, with a free tier
for small accounts). Worth it if:
- They sell to more than one country
- They're hitting a tax threshold (varies by country — GST
  registration in AU/NZ is $75k/$60k turnover, EU VAT is more
  complex)
- They want automated tax compliance and clean reporting

Skip Stripe Tax (use manual tax rates) if:
- They sell only locally
- Volume is small
- Their accountant handles compliance separately

Ask the user about their situation before pushing Stripe Tax.

### Step 2 — set up the tax origin

Either way, Stripe needs to know where the user's business is based:

- Dashboard → Settings → Tax → Origin address
- Enter the registered business address
- For sole traders, this is usually their home address

### Step 3a — enable Stripe Tax

If they want the automated path:

1. Settings → Tax → Get started
2. Enter business details, confirm pricing
3. Add tax registrations in countries where they're registered
4. Enable Stripe Tax on Payment Links / Checkout / Subscriptions:
   - Each Product → enable "Automatically calculate tax"
   - Existing Payment Links: edit → toggle "Collect tax"

Stripe handles the rest — calculates correct tax per buyer location,
shows it on Checkout, reports it in a tax dashboard.

### Step 3b — manual tax rates

If they don't want Stripe Tax:

1. Products → each Product → Tax behavior → "Exclusive" or "Inclusive"
2. Settings → Tax → Tax rates → Add tax rate
3. Apply tax rates to Payment Links / Checkout manually

Less automatic but free.

### Step 4 — tax-inclusive vs exclusive pricing

Important to get right. Ask the user:

> *"Is the price you quote to customers tax-INCLUSIVE or tax-EXCLUSIVE?
> In Australia, retail is usually inclusive ($110 means $100 + $10
> GST). In the US, B2B is usually exclusive ($100 + tax on top)."*

Set the same on every Product. Mixing them confuses receipts and
accounting.

### Step 5 — tax invoices

For business buyers in some countries (EU, AU) you need to issue tax
invoices automatically:
- Settings → Tax → Invoices → enable

Stripe attaches a compliant tax invoice to every receipt.

---

## Part two — refunds

### When to refund

Set a clear policy with the user:
- Faulty digital product → refund automatic, no questions
- Service not delivered → refund automatic
- Buyer's remorse → depends on user's policy. Common: "Refunds
  within 7 days if the file hasn't been opened" or similar.

Have them document their refund policy ONCE — they'll paste it into
Settings → Branding → Footer text and link from their site.

### How to refund

Manual (from dashboard):
1. Payments → find the payment → Refund
2. Choose full or partial amount
3. Optionally choose "reason" (Stripe asks; affects dispute defence)
4. Confirm

The refund hits the customer card in 3–10 business days. Stripe emails
the customer automatically.

### Automated refund triggers (advanced)

If they have a self-service refund button on their site:
- Use the Stripe API: `stripe.refunds.create({ payment_intent })`
- Always require auth (signed-in user, valid order ownership)
- Hook to the webhook `charge.refunded` to update downstream systems
  (Skip if Zapier path)

### Refund fees

Stripe doesn't return the original processing fee on refunds. The
user eats the ~30¢ + 2.9% on every refund. Tell them this so they
don't get surprised.

---

## Part three — disputes (chargebacks)

A dispute happens when a customer's bank reverses the charge — usually
because the customer claims they didn't recognise it or didn't receive
what they paid for.

### Set up dispute alerts

- Settings → Customer emails → Disputes → confirm alerts are ON
  (default is yes)
- Slack/email alerts via Zapier on event `charge.dispute.created`

### When a dispute happens

1. Dashboard → Disputes → click the dispute
2. Stripe shows what the customer claimed
3. The user has ~7 days to submit evidence
4. Evidence Stripe wants:
   - Receipt
   - Customer communication (emails, support tickets)
   - Proof of delivery (download log, shipping tracking)
   - Customer's IP address + matched billing address
   - Refund policy (showed before purchase)
5. Submit → bank decides (takes 30–90 days)

### Loss rate

Most disputes are lost when the user has weak evidence — primarily
because they didn't keep proof of delivery. Tell them: log every
download / delivery event with customer IP, time, and product.
This single habit wins most disputes.

### When to just refund

If a dispute is small (<$30) and the user knows they're going to
lose, refund BEFORE the dispute escalates — they save the $15 dispute
fee and avoid the late-payment hit on their account.

## Done condition

- Tax setup is configured (Stripe Tax OR manual rates)
- The user knows how to refund (you've walked through one if any
  test charges exist)
- Dispute alerts are confirmed ON
- The user has a written refund policy (even if just one sentence)

When done, say: *"Tax + refunds handled. Last step — let your
subscribers manage themselves."* and load `06-portal-reporting.md`.
