# Subscription comms pack — full lifecycle templates

Branded emails for each subscription lifecycle moment. Replace
Stripe's defaults where the operator's brand voice matters.

Sender: usually the operator (`hi@business.com`), not noreply@.
Reply-to: support inbox.

---

## 1. Welcome — subscription created (no trial)

```
Subject: Welcome to [Plan name]

Hi [first name],

You're in. Welcome to [Plan name].

Quick orientation (60 seconds):

→ Get started: [URL to docs / app]
→ Your dashboard: [URL]
→ Manage billing: [Stripe portal URL]

WHAT YOU'RE PAYING
[Plan name]:   $[X] / [month/year]
Next renews:   [date]
Card:          ending [last 4]

We charge automatically each [month/year]. Cancel any time from
your account.

The 3 things customers ask first:

1. [Common question 1, e.g. "How do I invite my team?"] —
   [answer or link]
2. [Common question 2] — [answer or link]
3. [Common question 3] — [answer or link]

Hit reply with anything. I read everything.

[Operator name]
[Business name]
```

---

## 2. Welcome — trial started (card upfront)

```
Subject: Your [Business name] trial — what you need to know

Hi [first name],

Welcome to your free [N]-day trial of [Plan name].

→ Get started: [URL]

TRIAL DETAILS
Trial length:   [N] days
Trial ends:     [date]
After trial:    $[X] / [month/year] charged to card ending [4]
You can cancel: any time before [date]

NO LOCK-IN
If you cancel during the trial, you won't be charged. Just go to
[settings URL] or reply to this email.

DAY 1 STARTER
Try [specific action they should take first — e.g. "creating
your first project"]. Should take 5 minutes and gives you a feel
for whether this is for you.

If anything's stuck, reply. I'll help.

[Operator name]
[Business name]
```

---

## 3. Trial ending — 7 days

```
Subject: 7 days left in your trial

Hi [first name],

Quick heads-up: 7 days left in your [Plan name] trial.

WHAT YOU'VE DONE SO FAR
[If trackable: "You've [done X] — that's most of the way there."
 If not: "Hope you've had a chance to try [key feature]."]

WHAT HAPPENS NEXT
On [date], $[X] will charge to card ending [4]. Then $[X]
every [month/year] until you cancel.

If [Business name] isn't for you: cancel at [URL]. No charges, no
hard feelings.

If you have any questions about the plan, the pricing, or
anything else — just reply.

[Operator name]
[Business name]
```

---

## 4. Trial ending — 2 days

```
Subject: Trial ends in 2 days

Hi [first name],

Your [Plan name] trial ends on [date] — 2 days away.

$[X] will charge to your card ending [4] then. To cancel before:
[URL]

I checked your usage and you've [observation — e.g. "shipped 3
proposals", "set up your team of 5", "completed your first
workflow"]. Looks like it's been useful.

If you have any questions or want to talk through the plan, reply.

[Operator name]
[Business name]
```

---

## 5. Trial ended, charged (success)

```
Subject: You're on [Plan name] — welcome

Hi [first name],

You're officially on [Plan name].

$[X] just charged to card ending [4]. Next renews on [date].

What's next:
- Your full feature set is unlocked
- [Specific Pro feature you couldn't use during trial]
- [Another]

Manage billing or invoices: [Stripe portal URL]

Anything you want to make better — reply, I read every email.

[Operator name]
[Business name]
```

---

## 6. Trial ended, payment failed

```
Subject: Your trial ended but payment didn't go through

Hi [first name],

Your [Business name] trial ended today, and we tried to charge
$[X] to your card ending [4]. The card declined.

To keep your account active:

→ UPDATE YOUR CARD: [one-click Stripe portal URL]

Takes 30 seconds.

We'll retry the charge automatically in 3 days. If you've decided
to cancel instead, just ignore — your account will pause after
a few retry attempts.

Or hit reply if you'd like help.

[Operator name]
[Business name]
```

---

## 7. Renewal succeeded — receipt

```
Subject: Renewal receipt — $[X] for [Plan name]

Hi [first name],

Quick receipt — your [Plan name] renewed today.

CHARGE
Amount:        $[X]
[Tax]:         $[X]
Total:         $[X]
Next renews:   [date]
Card:          ending [last 4]

Manage subscription: [Stripe portal URL]

Tax invoice attached.

Thanks for being a customer,
[Operator name]
[Business name]
```

---

## 8. Failed payment — attempt 1 (Day 0)

```
Subject: Payment didn't go through

Hi [first name],

Your [Plan name] payment of $[X] didn't go through. Card ending
[4] declined.

UPDATE CARD: [one-click Stripe portal URL]

Common reasons:
- Card expired
- Insufficient funds
- Bank security flag (it happens)

We'll retry in 3 days. The link above takes 30 seconds if you
want to fix it now.

Need help? Reply.

[Operator name]
[Business name]
```

---

## 9. Failed payment — attempt 2 (Day 3)

```
Subject: Second attempt — your card declined again

Hi [first name],

Second try, same result. Your card ending [4] declined for $[X].

Your [Plan name] access is still active for now. But if the next
attempt fails, we'll need to suspend your account.

UPDATE CARD: [one-click Stripe portal URL]

I'd rather you stay. If money's tight this month, reply — happy
to chat about pausing or switching to a smaller plan.

[Operator name]
[Business name]
```

---

## 10. Failed payment — final attempt (Day 14)

```
Subject: Last chance — your account closes in 24 hours

Hi [first name],

This is the final retry on your [Plan name] subscription. If
[date]'s attempt fails, your account will be cancelled
automatically at [time].

UPDATE CARD: [one-click Stripe portal URL]

Or reply — I can hold the cancellation while you sort it.

[Operator name]
[Business name]
```

---

## 11. Card expiring — 30 days notice

```
Subject: Your card expires next month

Hi [first name],

Your [Brand] card ending [last 4] expires on [MM/YY] — about 30
days away.

To keep your [Plan name] subscription running without
interruption:

→ UPDATE CARD: [one-click Stripe portal URL]

30 seconds. Takes a new card or updates with same one if you got
a reissue.

If you're planning to cancel: do nothing. Your card will expire,
the renewal will fail, and the subscription will close after a
few retries.

[Operator name]
[Business name]
```

---

## 12. Plan changed — upgrade

```
Subject: You're on [New plan name] — welcome to the upgrade

Hi [first name],

You're now on [New plan name]. Welcome.

Effective today.

Pro-rated charge today: $[X]
Next full renewal: $[New X] on [date]

What you unlocked:
- [Feature 1 from new plan]
- [Feature 2 from new plan]
- [Feature 3 from new plan]

If anything looks off, reply.

Thanks for the trust,
[Operator name]
[Business name]
```

---

## 13. Plan changed — downgrade

```
Subject: You're on [New plan name]

Hi [first name],

You've switched to [New plan name]. Confirmation below.

EFFECTIVE
From [date — end of current period]
Until then: still on [Current plan name]

NEXT CHARGE
$[X] on [date]

WHAT CHANGES
You'll lose access to:
- [Pro feature 1]
- [Pro feature 2]
You keep:
- [Things still in new plan]

If you ever want to come back to [Old plan]: [URL] — one click.

Thanks,
[Operator name]
[Business name]
```

---

## 14. Cancellation — confirmed

```
Subject: Sorry to see you go

Hi [first name],

Confirmed — your [Plan name] subscription will end on [date].
Until then, you have full access. After that, your account moves
to view-only [or "deactivated", depending on operator policy].

WHY YOU'RE LEAVING (if customer told us)
"[reason from cancellation form]"
[response if appropriate]

YOUR DATA
You can [export your data / re-subscribe to restore / etc.] at
any time before [date].

If you ever want to come back: [URL] — your account picks up where
you left off.

If there's anything I could've done differently — really —
reply. I read every one.

[Operator name]
[Business name]
```

---

## 15. Cancellation — "before you go" rescue

```
Subject: Wait — before you cancel

Hi [first name],

Saw you're about to cancel [Plan name]. Before you do:

OPTION 1 — STAY FOR 50% OFF NEXT 3 MONTHS
Click here: [URL applying coupon code SAVE50_3MO]

OPTION 2 — PAUSE FOR UP TO 3 MONTHS
Click here: [URL to pause]
Coming back later is one click.

OPTION 3 — SWITCH TO [LOWER PLAN]
Click here: [URL]
Keep the basics for $[X]/mo instead of $[X]/mo.

OPTION 4 — STILL CANCEL
No hard feelings. Click here: [URL]

(Don't reply — just click whichever fits.)

[Operator name]
[Business name]
```

---

## 16. Win-back — 90 days after cancellation

```
Subject: Hey, [Business name] has changed a lot

Hi [first name],

Three months since you cancelled [Plan name]. Wanted to share
what's new:

- [Specific shipped feature 1]
- [Specific shipped feature 2]
- [Specific shipped feature 3]

If any of these would've changed your decision: come back at
[URL] — your old data is still there.

We've also added a [discount / new plan / etc.] that wasn't
around when you left.

Not interested? No worries — this is the only one of these I'll
send.

[Operator name]
[Business name]
```

---

## 17. Annual upgrade pitch — for monthly customers

Send to monthly subs around day 90 of being a paid customer.

```
Subject: Save 2 months — switch to annual?

Hi [first name],

You've been on [Plan name] monthly for 3 months. You're getting
real value out of it.

If you'd like to lock in lower pricing:

ANNUAL: $[X]/year (=$[X/12]/mo — 17% off monthly)
You save $[X] per year.

Switch in one click: [URL with annual upgrade flow]

Cancel any time — pro-rata refund within first 30 days.

If you'd rather stay monthly: nothing to do.

[Operator name]
[Business name]
```

---

## How to send these

Three approaches:

### A. Stripe's built-in emails

Settings → Customer emails — turn on:
- Trial ending
- Receipts
- Refund confirmations
- Failed payment retries
- Cancellation confirmations

Stripe sends these automatically. Customise via the "Template
override" (Stripe Premium plans for fuller HTML control; otherwise
limited brand colour + logo).

### B. Custom emails via your ESP

Webhook → ESP:
- Listen for `invoice.payment_failed` → trigger Customer.io /
  Postmark / Resend campaign
- Same for `customer.subscription.trial_will_end`, etc.

Better brand control. More setup.

### C. Hybrid

Stripe sends the legal/compliance receipts (essential, can't go
wrong). Your custom emails layer on top for marketing nudges +
brand voice (welcome, win-back, rescue, annual pitch).

This is the most common pattern. Stripe handles transactional;
operator's ESP handles relational.

## Brand voice notes

- Use "you" / "we" — not "the customer" / "the company"
- Sign with operator's first name when possible
- Keep paragraphs short. Mobile reading.
- Single CTA per email
- Reply-to = monitored inbox, not noreply@
- Always include unsubscribe (legal) — except for transactional
  (receipts, payment failures)

## Track metrics

In `learnings.md`:
- Trial-ending email open rate (target >40%)
- Failed-payment email open rate (target >50%)
- Card-update click-through (target >20%)
- Rescue offer take-up (target >10% of cancellations)
- Win-back conversion (target 5-10% at 90 days)

Tune templates based on data. The templates above are starting
points, not gospel.
