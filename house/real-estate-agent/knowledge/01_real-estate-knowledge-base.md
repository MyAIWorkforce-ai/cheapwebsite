# Real Estate Knowledge Base

Domain knowledge the agent draws on. Read this when you need context on the process, the roles, the contract mechanics, the compliance frame, or the language that keeps outputs professional and legally safe.

This file is **region-aware**. Where the rules differ across markets, the universal principle is here and the region-specific detail is in `03_regional-reference.md`. Default rule: if you're producing client-facing output, you've already loaded the user's region.

---

## The residential sales process (listing → settlement)

The same skeleton runs everywhere, even though the words change:

1. **Lead generation** — enquiries from portals, signboards, referrals, the agent's database, socials, paid ads, door-knocks, cold outreach (expired listings, FSBOs/private sales).
2. **Qualification** — establish whether the lead is genuine, their timeframe, motivation, finance position, decision-maker status. Use BANT-R (see `02_frameworks.md`).
3. **Listing presentation / appraisal / valuation appointment (sellers)** — the agent visits, builds rapport, presents a price opinion + marketing plan + fee structure, and wins (or loses) the right to sell the home. This is the single highest-revenue conversation of the week.
4. **Pre-listing prep** — disclosure document (Section 32 / Material Information / Seller Disclosure / PDS — region-specific) signed by conveyancer, photography, copywriting, floor plan, portal upload prep, AML/CDD on the vendor.
5. **Campaign launch** — listing goes live on portals, signboard, socials, database alert, brochure.
6. **Open homes + private inspections** — capture every attendee, qualify on the spot, follow up same day.
7. **Vendor feedback rhythm** — weekly written report (views, enquiries, inspections, offers) with an honest read + recommendation.
8. **Offers & negotiation** — present every offer, negotiate, manage both sides to agreement.
9. **Under contract (conditional → unconditional)** — coordinate finance, building & pest, special conditions, deposit. Each condition has a due date.
10. **Settlement / completion / closing** — final inspection, key handover, money changes hands.
11. **Post-settlement** — thank-you, move-in week check-in, 30-day, 90-day referral ask, anniversary card.

The AI's job is to keep the agent moving through this loop without dropping balls.

---

## Roles in the deal — who's who

Real estate is full of people. Knowing who's in the conversation tells you what to say.

### The agent

- **Listing agent (selling agent)** — represents the vendor (seller). Owes them duty of care, honesty, and best price.
- **Buyer's agent (buyer's advocate)** — represents the buyer. Searches, inspects, negotiates on their behalf. Paid by buyer (UK / AU) or by listing-side commission split (US, pre-NAR-settlement; now post-settlement: buyer pays direct or per a separate agreement).
- **Dual agency / transaction broker** — represents both sides (legal in some US states, regulated; rare and risky in AU/NZ/UK).
- **Property manager** — leases + manages the property on the landlord's behalf. Different licensing in some regions.

### The principals

- **Vendor (seller)** — the owner selling.
- **Buyer / purchaser** — the person buying.
- **Co-vendors** — joint owners; both must sign agency agreement + contract.
- **Trustee / executor** — selling on behalf of an estate. Adds time + paperwork.

### The supporting cast

- **Conveyancer / solicitor / attorney** — handles the legal transfer of title. Some states/countries restrict to lawyers only (e.g. Quebec — notary; some US states — attorney-state).
- **Mortgage broker / lender** — buyer's finance.
- **Building & pest inspector** — typically buyer's expense, AU/NZ.
- **Home inspector / surveyor** — US (home inspector), UK (RICS Level 1 / 2 / 3 surveyor).
- **Strata manager / body corp / HOA** — for apartments / townhouses / condos / leasehold.
- **Auctioneer** — runs the auction (AU/NZ standard; UK + US rare for residential).

When the AI writes to one of these, it changes its register. To a buyer: warm, lifestyle-focused. To a buyer's agent: data-led, professional, terse. To a conveyancer: facts only, dates, conditions, no fluff.

---

## Listing vs buyer-side — which workflow

The bundle covers both but they're different jobs:

### Listing agent workflow (the agent represents the seller)

1. Listing presentation → win the listing
2. Disclosure document signed off (Section 32 etc.)
3. Photography, copywriting, marketing plan
4. Launch + open homes + private inspections
5. Weekly vendor reports
6. Manage offers + negotiate
7. Under contract → settlement
8. Post-settlement referral nurture

**Bias:** maximise the vendor's net result and certainty of sale.

### Buyer's agent workflow (the agent represents the buyer)

1. Buyer engagement agreement signed (mandatory now in US post-NAR; standard in AU/NZ buyer agency)
2. Brief: budget, must-haves, timeline, locations
3. Search: portals + off-market + agent network
4. Inspect on the buyer's behalf (or with them)
5. CMA + due diligence on shortlist
6. Negotiate / offer / auction-bid on buyer's behalf
7. Manage conditions to unconditional
8. Settlement + handover

**Bias:** minimise the buyer's purchase price + maximise their certainty + protect them on terms.

### In the US (post-2024)

Most US agents do BOTH at different times — they're "transactional" agents. Each new client = either listing or buyer engagement, with a different agreement.
The agent must KNOW which side they're on at all times to avoid breaching fiduciary duty.

### In AU / UK

Listing-side dominates. Buyer's agents are a smaller specialism. UK has "buying agents" mostly at the prime / super-prime end.

**The AI's job:** ask at conversation start *"are you representing the seller or the buyer on this one?"* if it's not obvious. Adjust every output's bias accordingly.

---

## Property type & deal type — scope check

The bundle is built primarily for **residential sales**. Scope check at conversation start:

| Type | In-scope | Notes |
|---|---|---|
| Residential sales (existing) | ✅ Yes | Core focus. |
| New build / off-the-plan | ✅ With caveats | Sunset clauses, project marketing, builder coordination — flag where region-specific. |
| Apartments / strata / condo / leasehold | ✅ Yes | Add body-corp / HOA / leasehold disclosure to checklist. |
| Land / vacant blocks | ✅ Yes | Different DD: zoning, services, easements. |
| Commercial | ⚠️ Limited | Different legal frame, leasing focus. The bundle handles residential investment, not commercial. |
| Rural / farm | ⚠️ Limited | Water rights, livestock, land use. Defer to specialist. |
| Property management / leasing | ⚠️ Limited | Different licence + workflow. Bundle is sales-focused; PM is a separate role. |
| Auction | ✅ Yes (AU/NZ deep) | See `templates/auction-day-script.md`. |
| Tender / EOI | ✅ Yes (NZ deep) | See SOPs. |
| Best & Final / sealed bid | ✅ Yes (UK + parts CA) | See `templates/best-and-final-script.md`. |
| Off-market | ✅ Yes | "Discretionary" or "pocket" listings. Check MLS clear-cooperation rules in US. |

If the agent works mostly in PM or commercial, flag that the bundle is sales-leaning and offer the relevant sales-side help.

---

## Sale mechanisms — which structure

The mechanism for arriving at a price changes the entire campaign:

### Private treaty (negotiated sale)

- Asking price advertised.
- Buyers make offers; agent presents; vendor accepts / counters / declines.
- Standard in US, UK, parts of AU (esp. lower-tier metro + regional), most of CA.
- Cooling-off applies (see regional reference).

### Auction (public sale)

- 3–6 week campaign with a fixed auction date.
- Reserve price set in writing on the day.
- Sells to highest bidder above reserve (knocked down).
- If below reserve = "passed in" — highest bidder gets first negotiation rights.
- AU/NZ metro standard. UK rare for resi (used for probate / distressed). US rare for resi (mostly courthouse / distressed).
- **No cooling-off** for buyer at auction.

### Tender / Expressions of Interest (EOI)

- Sealed offers due by a date.
- Vendor reviews all at once.
- Offers can be conditional.
- Common in NZ.

### Best & Final (sealed bids)

- Used when multiple offers received and agent asks all buyers for highest & best.
- Common in UK + Scotland (closing date system) + occasionally CA.
- Process must be transparent — equal info to all bidders.

### Off-market / discretionary

- Property not listed publicly. Agent shows to qualified buyer database first.
- Vendor wants discretion or to test demand.
- US: clear-cooperation rules of most MLSs restrict this — listing must usually be entered within 24–72 hours of marketing publicly.

---

## Key terms (plain English)

- **CMA / appraisal / market appraisal** — agent's opinion of likely sale price. NOT a bank valuation.
- **Bank valuation / mortgage valuation** — lender's valuer's number for security purposes. Often conservative.
- **Comp** — a recently sold property similar to the subject.
- **DOM (days on market)** — how long a listing has been advertised. Climbing DOM = pricing or marketing issue.
- **Sale-to-list ratio** — sale price ÷ asking. Tells you the market's negotiation tightness.
- **Conditional vs unconditional** — whether a contract still has conditions (finance, inspection, sale of another property).
- **Subject to finance / mortgage offer** — buyer's loan approval pending.
- **Subject to building & pest / inspection / survey** — buyer's inspection report pending.
- **Cooling-off** — buyer's right to walk away within a window after signing (region-specific).
- **Exchange / mutual acceptance / firm agreement** — the moment the contract becomes binding (region-specific).
- **Settlement / completion / closing** — handover day.
- **VPA (Vendor Paid Advertising)** — marketing spend the vendor agrees to (AU standard; included in commission in UK + US).
- **Reserve** — minimum price the vendor will accept (auction).
- **Knocked down** — sold at auction.
- **Passed in** — auction didn't reach reserve.
- **Gazumping** — seller accepts a higher offer from another buyer after accepting yours (UK E&W).
- **Gazundering** — buyer drops their offer just before exchange (UK).
- **Chain** — buyer needs to sell to fund purchase; seller needs to find onward purchase (UK).
- **Off-the-plan / pre-construction** — buying before built.
- **EOI** — Expressions of Interest (closed-date sale).
- **HOA / body corp / strata / leasehold service charge** — communal fees on apartments / townhouses / condos.
- **Section 32 / Form 1 / Material Information / Seller Disclosure** — pre-contract disclosure documents (region-specific).
- **AML / CDD / KYC** — Anti-Money-Laundering / Customer Due Diligence / Know Your Customer.
- **Trust account / escrow** — regulated account where deposits live.

---

## What "good" looks like

- **Listing copy** that leads with the property's single strongest hook, paints a lifestyle in 1–2 lines, lists features in scannable form, names the location in concrete terms (cafés, transport, parks — not "ideal buyer"), and ends with a call to action. Compliant in the local regime. No invented facts.
- **Lead replies** that are fast (< 1 hour), personal, answer the question asked, qualify gently, and propose a specific next step (a time to view, a call booked).
- **Vendor communication** that is honest about market feedback, framed constructively, and always paired with a recommendation. Numbers first, opinion second.
- **Negotiation messages** that stay calm, protect the relationship, and keep momentum. Never desperate; never combative.
- **CRM notes** that capture WHO + WHAT-HAPPENED + WHEN + OUTCOME + NEXT-ACTION in 5 lines or fewer.

---

## Compliance guardrails (always-on)

Real estate marketing is regulated everywhere. The principle is universal: **describe the property, never the buyer; don't invent facts; don't overclaim.** The regional reference details the local rule; here are the universal commitments:

### 1. Fair Housing / equality

Describe the *property and its features*, never the type of person who "should" live there.

- ✅ "Close to parks and cafés." — describes location.
- ✅ "Spacious primary bedroom with built-in robes." — describes feature.
- ✅ "Walking distance to elementary school." — describes location.
- ❌ "Perfect for a young Christian family." — religion + familial status.
- ❌ "Ideal for empty-nesters / first-time buyers." — age + life stage.
- ❌ "Quiet neighbourhood — no kids around." — familial status.
- ❌ "Walking distance to St Mary's Catholic Church." — could imply religious targeting (depends on context).

Protected characteristics (federal in each region):
- **US Fair Housing Act:** race, color, national origin, religion, sex (incl. gender identity, sexual orientation), familial status, disability. Many states add age, source of income, military.
- **UK Equality Act 2010:** age, disability, gender reassignment, marriage/civil partnership, pregnancy/maternity, race, religion/belief, sex, sexual orientation.
- **AU Racial Discrimination Act + state anti-discrimination Acts:** race, age, sex, disability, religion, etc.
- **NZ Human Rights Act 1993.**
- **CA Human Rights Codes (federal + provincial).**

**The AI's rule:** never propose copy that targets buyer demographics. If the user asks for "first-home-buyer focused" copy, reframe to *property features* that suit lower price points, not buyer identity.

### 2. No invented facts

Never fabricate:
- Land size, floor area, room dimensions
- School catchment / zoning (zones shift — always say `[CONFIRM with [school authority]]`)
- Sold prices / median prices (unless user provides them)
- Body corp / strata / HOA fees
- Build year / age of major systems
- Easements / encumbrances
- Pool / spa / outbuildings — describe only if user confirmed

Flag missing facts with `[CONFIRM: …]` and let the agent fill them.

### 3. No guarantees about value or growth

Avoid: "guaranteed investment," "will go up in value," "can't lose money on this one." Use measured language: "well-positioned in a sought-after pocket," "comparable sales support the guide."

### 4. Honesty in condition

Don't conceal material defects. "Renovator's delight," "ready to refresh," "scope to add value" are fair when the property needs work. Don't write "in immaculate condition" if it isn't. Don't suggest a kitchen has been renovated when it hasn't.

### 5. Respect privacy

Don't expose a vendor's personal circumstances in public copy: "Must sell — divorce." "Owner relocating urgently." These weaken negotiating position and may breach the vendor's instructions or privacy.

### 6. Disclosure BEFORE marketing

Listings should not go live without the regional disclosure document signed off:
- **VIC AU:** Section 32 prepared by conveyancer.
- **NSW AU:** Contract for Sale prepared with all required attachments.
- **QLD AU:** Form 6 (appointment) + Disclosure Statement (from Aug 2025).
- **SA AU:** Form 1 + Form R3.
- **NZ:** REINZ/ADLS agreement + (optional) LIM.
- **UK:** Material Information Parts A confirmed; Parts B + C disclosed where known.
- **US:** State seller disclosure form; Lead-Based Paint Disclosure if pre-1978.
- **CA:** PDS / SPIS election noted.

**Push back on the vendor who says "let's launch and finish paperwork later."** Marketing without disclosure = misleading conduct claims.

### 7. AML / source-of-funds checks

- **NZ + UK + CA: MANDATORY.** No exceptions. Conduct CDD on every vendor (and buyer where required) before listing / proceeding.
- **AU:** Tranche 2 from 2026 — start preparing your CDD process now.
- **US:** Patchwork — high-value all-cash deals are reported (FinCEN Geographic Targeting Orders in major metros). Flag any unusual structures.

If the user asks for shortcuts on AML ("don't worry about CDD, the vendor's a mate"), refuse and remind them of the fines.

### 8. Trust account / escrow discipline

The deposit belongs to no one until the contract settles. It lives in the licensed brokerage's trust account / escrow. Never:
- Suggest releasing deposit early.
- Use deposit to pay marketing or commission before settlement.
- Hold deposit outside trust.

If the user proposes any of this, refuse and redirect to the conveyancer.

### 9. Underquoting / price guide honesty

Especially live in VIC + NSW (AU), but a universal principle. Price guide must reflect:
- The agent's reasonable estimate of value, AND
- The vendor's reserve / minimum acceptable.

You can't advertise a guide below either. Update guide if reserve changes. Statement of Information (VIC) must accompany every advertisement.

---

## Tone defaults

- **Warm-professional.** Confident, never pushy. Mirror the agent's voice if they give you examples.
- **Concise + mobile-friendly.** Agents read + send on their phones. Tight paragraphs, no walls of text.
- **Match the locale's spelling + register.** Australian, NZ, UK, US, CA English.
- **Always end client-facing messages with a clear, specific next step** — see `02_frameworks.md` section 5.
- **No marketing fluff with vendors.** "We'll get you the best price!" is what every losing agent says. Speak in data + plan.

---

## Region quick-pivot

If at any point the user mentions they've switched markets (a new agent working a different state, or expanding into a new country), re-ask the region question and reload `03_regional-reference.md`.

Most agents work one market for life. But a portfolio firm might run AU + NZ; a US team might cross state lines; a UK firm might do E&W + Scotland. The AI handles this by treating each new conversation thread as a clean region prompt.

---

## What this knowledge base does NOT cover

To be honest about scope:

- **Tax & financial advice.** "Will I pay capital gains?" → conveyancer / accountant. Don't draft tax advice.
- **Mortgage / lending advice.** Refer to broker.
- **Legal advice.** Refer to conveyancer / solicitor / attorney.
- **Strata / body-corp specifics.** Refer to strata manager.
- **Valuations** (the bank kind — RICS Red Book / formal valuation). Refer to a registered valuer.

The agent's job is to keep the deal moving with great communication + sharp process. Anything that needs a different licence → refer.
