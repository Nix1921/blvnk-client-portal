# Email Lifecycle System — Intus
**Department:** Distribution & Growth Engine
**Phase:** 5A | Launch Kit
**Date:** February 2026

---

## 1. Email Authentication Stack

**Non-negotiable pre-launch requirements:**

| Component | Configuration | Status |
|-----------|--------------|--------|
| **SPF** | Authorize Klaviyo + Shopify sending IPs in DNS TXT record | REQUIRED |
| **DKIM** | Enable Klaviyo DKIM signing with custom domain (intus.com.au) | REQUIRED |
| **DMARC** | Start at p=quarantine, move to p=reject within 30 days | REQUIRED |
| **Custom sending domain** | send.intus.com.au (separate from transactional) | REQUIRED |
| **Reply-to address** | hello@intus.com.au (never no-reply@) | REQUIRED |

**Verification:** Send test emails to Gmail, Outlook, Yahoo. Check SPF/DKIM/DMARC pass in email headers before any campaign.

---

## 2. Lifecycle Flows (Klaviyo)

### Flow 1: Welcome Sequence (Trigger: Email signup / "Join the Circle")

| Email | Timing | Subject | Content | CTA |
|-------|--------|---------|---------|-----|
| 1 | Immediate | "This isn't another activewear brand." | Welcome to the circle. Introduce Intentional Movement. | Explore The Kits |
| 2 | Day 3 | "What do you do between workouts?" | The POV question. Introduce the "other 23 hours" philosophy. | See The Kits |
| 3 | Day 7 | "Wear it. Live in it. Return it if we're wrong." | 60-day guarantee. Social proof (reviews/UGC). | Get Your Kit |

*Full copy in Deliverable 6.*

### Flow 2: Kit Quiz Follow-Up (Trigger: Quiz completion)

| Email | Timing | Subject | Content | CTA |
|-------|--------|---------|---------|-----|
| 1 | Immediate | "Your Kit: The [Reformer/Street/Recovery] Kit" | Personalized result. Kit image + description. Price + Afterpay. | Get Your Kit |
| 2 | Day 2 | "Here's what a day in The [Kit Name] looks like" | Lifestyle vignette — 4 moments in one day with this Kit. | Get Your Kit |
| 3 | Day 5 | "60 days to decide. No pressure." | Guarantee reminder + one customer review. Soft close. | Complete Your Kit |

### Flow 3: Abandoned Cart (Trigger: Kit added to cart, no purchase within 1 hour)

| Email | Timing | Subject | Content | CTA |
|-------|--------|---------|---------|-----|
| 1 | 1 hour | "Your Kit is waiting." | Cart contents + image. "Still thinking about it?" | Complete Your Kit |
| 2 | 24 hours | "60 days. That's our promise." | Guarantee as the reassurance. One review. | Complete Your Kit |
| 3 | 72 hours | "Last reminder — then we'll leave you be." | Respectful close. "We won't keep asking." Kit image. | Complete Your Kit |

**Note:** No discount in abandoned cart flow. Ever. The guarantee IS the conversion tool, not a coupon.

### Flow 4: Post-Purchase (Trigger: Order confirmed)

| Email | Timing | Subject | Content | CTA |
|-------|--------|---------|---------|-----|
| 1 | Immediate | "Your Kit is on its way." | Order confirmation + delivery estimate. "Your Kit is almost yours." | Track Your Kit |
| 2 | Day 3 (post-delivery) | "Welcome to Intentional Movement." | How to wear The Kit for your full day. Care instructions. Community invite. | Share Your Kit (#MyIntusKit) |
| 3 | Day 14 | "How's The Kit treating you?" | Request for review. UGC prompt. "Show us your Kit in action." | Leave a Review |
| 4 | Day 30 | "Your Kit has a companion." | Cross-sell: "Complete Your Kit" with Eclipse Layer or second Kit. | Explore Layers |
| 5 | Day 55 | "Your 60-day guarantee is almost up." | Gentle reminder — "Still love it? We thought so." If not, easy return link. | [No hard sell] |

### Flow 5: Reactivation (Trigger: No open/click for 60 days)

| Email | Timing | Subject | Content | CTA |
|-------|--------|---------|---------|-----|
| 1 | Day 60 | "Still moving with intention?" | Recognition: "We noticed you've been quiet." Brief brand reminder. | See What's New |
| 2 | Day 75 | "We're still here if you are." | One new Kit or content piece. Relevance check. | Explore |
| 3 | Day 90 | "Should we keep in touch?" | Explicit opt-in request. "If we don't hear from you, we'll assume you'd rather not." | Stay in the Circle / Unsubscribe |

**Day 90+ with no response → Sunset (remove from active list).** Inactive subscribers damage sender reputation.

---

## 3. Segmentation Strategy

### Primary Segments (Klaviyo)

| Segment | Definition | Content Focus |
|---------|-----------|---------------|
| **Kit Persona: Reformer** | Quiz result = Reformer Kit OR purchased Reformer Kit | Studio content, Pilates partnerships, morning routines |
| **Kit Persona: Street** | Quiz result = Street Kit OR purchased Street Kit | Urban content, run clubs, everyday transitions |
| **Kit Persona: Recovery** | Quiz result = Recovery Kit OR purchased Recovery Kit | Evening content, mindfulness, stretching |
| **VIP (2+ purchases)** | Purchased 2+ Kits or $200+ lifetime spend | Early access to new colorways, founder content, studio events |
| **US-Based** | Shipping address or signup location = United States | US-specific messaging, STAX gap positioning, USD pricing |
| **Studio Members** | Acquired via studio partnership QR code | Studio-specific content, instructor features, community events |

### Personalization Rules

- Subject lines: Include Kit persona name where possible ("Your Reformer Kit just got a new colorway")
- Product recommendations: Based on Kit persona (don't show Recovery Kit content to Reformer persona)
- Timing: Test send times per segment (studio members may prefer early morning; US segment on different timezone)

---

## 4. Campaign Calendar (Monthly)

| Week | Campaign | Segment | Type |
|------|----------|---------|------|
| 1 | Movement Philosophy content | All subscribers | Educational (Sage) |
| 2 | Kit spotlight / styling guide | Kit persona segments | Product (Magician) |
| 3 | Community feature / UGC roundup | All subscribers | Social proof |
| 4 | New content / founder update | VIP + engaged | Relationship |

**Sending frequency:** Maximum 2 campaigns/week + triggered flows. Never exceed 3 emails/week total to any subscriber.

**Volume ramp:** Start at <5K/day, increase by max 50% per day. Never spike volume.

---

## 5. KPI Targets

| Metric | Target | Action if Below |
|--------|--------|----------------|
| Open rate | >25% | Subject line test, sender name check, deliverability audit |
| Click rate | >3.5% | Content relevance, CTA clarity, design audit |
| Triggered flow CTR | >10% | Flow timing, personalization, offer relevance |
| Unsubscribe rate | <0.3% | Frequency check, content value audit |
| Spam complaint rate | <0.1% | List hygiene, authentication check |
| Revenue per email | Track baseline in month 1 | Segment performance, product rec accuracy |

---

*Deliverable 12 of 16 — Intus Launch Kit*
