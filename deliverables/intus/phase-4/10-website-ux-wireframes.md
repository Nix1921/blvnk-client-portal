# Website UX Wireframes & Digital Architecture — Intus
**Department:** Digital & Systems Architecture
**Phase:** 4A | Launch Kit
**Date:** February 2026

---

## 1. Audience Cognitive Profile

**Primary:** Gen Z + Millennials (18-35), digital natives
- 8-second attention filter
- Video-first, visual dominance
- Mobile-primary (expect 65-70% mobile traffic)
- UGC > polished visuals for trust
- BNPL expectation (Afterpay/Klarna)

**Design implications:** Mobile-first, thumb zone CTAs, progressive disclosure, visual-dominant layouts, video integration, social proof via UGC.

---

## 2. Information Architecture

### Site Map

```
HOME
├── THE KITS (primary navigation)
│   ├── The Reformer Kit
│   ├── The Street Kit
│   ├── The Recovery Kit
│   └── Kit Quiz ("Which Kit is yours?")
├── WOMEN
│   ├── Zyra (Leggings)
│   ├── Core (Essentials)
│   ├── Eclipse (Outerwear)
│   └── All Women's
├── MEN
│   ├── Unity
│   ├── Agility
│   └── All Men's
├── THE MOVEMENT (content hub)
│   ├── Movement Philosophy (Sage content)
│   ├── What's In My Kit (UGC gallery)
│   └── Studio Partners
├── ABOUT
│   ├── The Within Story
│   └── Our Commitment (sustainability)
├── ACCOUNT
│   ├── Orders
│   ├── Returns (60-day guarantee)
│   └── Saved Kits
└── [FOOTER]
    ├── Shipping & Returns
    ├── Size Guide
    ├── Contact
    ├── Privacy Policy
    └── Terms of Service
```

### Navigation Hierarchy

| Priority | Item | Rationale |
|----------|------|-----------|
| 1 | **The Kits** | The hero product. First in nav. Identity purchase, not product browse. |
| 2 | Women / Men | Standard category navigation for individual piece shopping. |
| 3 | The Movement | Content hub — Sage expression. Builds understanding + SEO. |
| 4 | About | Brand story — activates "Intus" Latin origin for Magician signified. |
| Nav CTA | **Get Your Kit** | Always visible. Primary button in nav (Intention color). |

---

## 3. Page Wireframes

### 3.1 Homepage

**Layout Pattern:** Z-Pattern (visual/minimal with single goal: Kit discovery)

```
┌──────────────────────────────────────────────────┐
│ NAV: Logo (left) | Kits | Women | Men | Movement | [Get Your Kit] │
├──────────────────────────────────────────────────┤
│                                                  │
│            HERO (Full-width video/image)          │
│                                                  │
│   "Your day doesn't happen in segments.          │
│    Neither should your clothes."                  │
│                                                  │
│              [Get Your Kit]                       │
│                                                  │
│         ↓ scroll indicator (prevents IoC)         │
├──────────────────────────────────────────────────┤
│                                                  │
│  THE KITS — 3 cards side by side                 │
│  ┌──────┐  ┌──────┐  ┌──────┐                   │
│  │Reform│  │Street│  │Recov │                   │
│  │  Kit │  │  Kit │  │  Kit │                   │
│  │ $100 │  │ $100 │  │ $100 │                   │
│  └──────┘  └──────┘  └──────┘                   │
│                                                  │
│  "Not sure? [Take the Kit Quiz]"                 │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  SOCIAL PROOF STRIP                              │
│  "X Kits claimed this month"                     │
│  ★★★★★ "Finally, one outfit for my whole day"    │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  THE POV (Split: 60% image / 40% text)           │
│                                                  │
│  Image: Transition moment        "What do you do │
│  (leaving studio, coffee in hand)  between        │
│                                    workouts?"     │
│                                                  │
│                            [Read the Manifesto]   │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  TRUST SIGNALS (3-column)                        │
│  [60-day guarantee] [Free shipping >$150] [Afterpay] │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  UGC CAROUSEL: "What's In My Kit"                │
│  Instagram/TikTok embeds from #MyIntusKit         │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  EMAIL SIGNUP                                    │
│  "Join the Circle"                               │
│  [email field] [Join]                            │
│                                                  │
├──────────────────────────────────────────────────┤
│  FOOTER                                          │
└──────────────────────────────────────────────────┘
```

**Key Design Decisions:**

| Decision | Rationale |
|----------|-----------|
| Hero = video/image, not product grid | Magician: transformation experience, not a catalog. Z-pattern for single-goal pages. |
| Scroll indicator below fold | Prevents Illusion of Completeness. Teases Kit section below. |
| Kit cards before individual products | The Kit is the identity purchase. Individual pieces are secondary. |
| Social proof after Kits | Validates the Kit concept before asking for deeper engagement. |
| POV section mid-page | Mid-scroll engagement point. Sage content builds understanding. |
| Trust signals as distinct strip | DTC trust gap (from Phase 1A) — 60-day guarantee is the #1 signal. |
| UGC before email signup | Social proof → trust → willingness to subscribe. |

### 3.2 Kit Product Page

**Layout Pattern:** Asymmetric Split (60% visual / 40% content)

```
┌──────────────────────────────────────────────────┐
│ NAV                                               │
├──────────────────────────────────────────────────┤
│                                                  │
│  ┌─────────────────┐  THE REFORMER KIT           │
│  │                 │                              │
│  │  Kit Image      │  Zyra Tank + Core Shorts    │
│  │  (both pieces   │                              │
│  │  styled as one) │  $100 AUD                    │
│  │                 │  or $25/fortnight with        │
│  │  [thumbnails    │  Afterpay                    │
│  │   below for     │                              │
│  │   angle views]  │  Color: [swatches]            │
│  │                 │  Size:  [selector]            │
│  └─────────────────┘                              │
│                      [Get This Kit]               │
│                                                  │
│                      60-day guarantee.             │
│                      Wear it. Live in it.          │
│                      Return if we're wrong.        │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  THE INTENTION (accordion)                        │
│  ▸ What's in this Kit?                           │
│  ▸ Who is the Reformer Kit for?                  │
│  ▸ Fabric & care                                 │
│  ▸ Shipping & returns                            │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  "DESIGNED FOR YOUR FULL DAY"                     │
│  4-panel lifestyle strip:                         │
│  [Studio] [Coffee] [Walking] [Evening]           │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  REVIEWS (UGC)                                   │
│  ★★★★★ "One Kit, no more outfit changes"          │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  COMPLETE YOUR KIT                               │
│  Suggested additions: Eclipse Layer, accessories  │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Key Design Decisions:**

| Decision | Rationale |
|----------|-----------|
| Kit image shows BOTH pieces styled together | Magician: The Kit is one product, not two items. |
| Price shows Afterpay breakdown immediately | Mental accounting: "$25/fortnight" = daily essentials framing. |
| Accordion for details (Progressive Disclosure) | Reduces cognitive load. Key info (price, CTA, guarantee) visible first. |
| 4-panel lifestyle strip | Proves the POV: one Kit, four contexts. Shows the full day. |
| "Complete Your Kit" cross-sell | Sunk cost: once invested in one Kit, extensions feel natural. |

### 3.3 Kit Quiz

**Layout Pattern:** Single Column (linear, focused)

```
┌──────────────────────────────────────────────────┐
│ NAV (minimal — logo + close only)                 │
├──────────────────────────────────────────────────┤
│                                                  │
│  WHICH KIT IS YOURS?                             │
│                                                  │
│  Step 1 of 3                                     │
│  ━━━━━━━━░░░░░░░░░░░░░                           │
│                                                  │
│  "What does your typical morning look like?"      │
│                                                  │
│  ┌────────────────────────────┐                   │
│  │ 🧘 Studio class first      │                   │
│  └────────────────────────────┘                   │
│  ┌────────────────────────────┐                   │
│  │ 🏃 A run or walk outside   │                   │
│  └────────────────────────────┘                   │
│  ┌────────────────────────────┐                   │
│  │ ☕ Straight to coffee       │                   │
│  └────────────────────────────┘                   │
│                                                  │
│                    [Next →]                       │
│                                                  │
└──────────────────────────────────────────────────┘

→ Result Page:

┌──────────────────────────────────────────────────┐
│                                                  │
│  YOUR KIT: THE REFORMER KIT                      │
│                                                  │
│  [Kit image — both pieces together]              │
│                                                  │
│  "Based on how you move, The Reformer Kit is     │
│   designed for your day."                         │
│                                                  │
│  $100 AUD | 60-day guarantee                     │
│                                                  │
│  [Get Your Kit]                                  │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Key Design Decisions:**

| Decision | Rationale |
|----------|-----------|
| 3 questions max | Hick's Law — fewer choices, faster decision. Low friction. |
| Stripped navigation | Focus. No distractions. Single task: find your Kit. |
| Progress bar | Reduces uncertainty (cognitive load management). |
| Result framed as personal | Magician: "Your Kit" — the quiz reveals what was already yours. |

### 3.4 Checkout Flow

**Optimized Checkout: 7 fields, guest-first**

```
Step 1: Contact
┌──────────────────────────────────────────────────┐
│ YOUR KIT IS ALMOST YOURS                          │
│                                                  │
│ Email: [                    ]                     │
│ ☐ Join the Circle (email updates)                 │
│                                                  │
│ [Continue to Shipping →]                          │
│                                                  │
│ Already have an account? [Sign in]                │
└──────────────────────────────────────────────────┘

Step 2: Shipping
┌──────────────────────────────────────────────────┐
│ WHERE SHOULD WE SEND YOUR KIT?                    │
│                                                  │
│ Full Name:    [                    ]              │
│ Address:      [auto-complete enabled]             │
│ City:         [          ] State: [   ]           │
│ Postcode:     [      ]                            │
│ Phone:        [                    ]              │
│                                                  │
│ Shipping: FREE (orders over $150 AUD)             │
│ Estimated: 2-5 business days                      │
│                                                  │
│ [Continue to Payment →]                           │
└──────────────────────────────────────────────────┘

Step 3: Payment
┌──────────────────────────────────────────────────┐
│ COMPLETE YOUR KIT                                 │
│                                                  │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│ │  Card    │ │ Afterpay │ │  Klarna  │          │
│ └──────────┘ └──────────┘ └──────────┘          │
│                                                  │
│ Card Number: [                    ]               │
│ Expiry:      [     ] CVC: [    ]                  │
│                                                  │
│ ORDER SUMMARY                                    │
│ The Reformer Kit (S)     $100.00                 │
│ Shipping                  FREE                    │
│ ─────────────────────────                        │
│ Total                    $100.00 AUD              │
│                                                  │
│ [Complete Your Kit — $100.00]                     │
│                                                  │
│ 🔒 Secure checkout | 60-day guarantee             │
└──────────────────────────────────────────────────┘
```

**Key Design Decisions:**

| Decision | Rationale |
|----------|-----------|
| Guest checkout default | Forced account creation = 24% abandonment. Email captures for CRM anyway. |
| 3-step checkout | Minimum viable steps. Progress is visible. |
| Shipping cost visible early | Hidden costs = #1 cart abandonment driver. "FREE" is immediate trust signal. |
| BNPL prominent | Gen Z/Millennial expectation. Mental accounting: $25/fortnight. |
| "Complete Your Kit" not "Place Order" | Magician: you're completing something, not transacting. |
| Security + guarantee signals at payment | Peak-End Rule: reassurance at the highest-anxiety moment. |

---

## 4. Conversion Funnel Optimization

### Trust Gap Remediation (DTC Priority from Phase 1A)

| Trust Signal | Implementation | Location |
|-------------|---------------|----------|
| **60-day guarantee** | Prominent badge + explainer on every product page. Full policy page. | Product pages, cart, checkout, footer |
| **Sizing tool** | Interactive size guide with body measurements + fit photos from real customers | Product pages (accordion section) |
| **Reviews/UGC** | Shopify reviews app (Judge.me or similar). Photo reviews prioritized. | Product pages, homepage carousel |
| **Studio partnerships** | "Worn by [Studio Name] instructors" badge | Kit product pages, About page |
| **Shipping transparency** | Estimated delivery shown before checkout. Free shipping threshold visible. | Product pages, cart, checkout |
| **BNPL integration** | Afterpay/Klarna/Zip Pay with installment breakdown on product pages | Product pages, checkout |

### Conversion Targets

| Metric | Target | Benchmark |
|--------|--------|-----------|
| E-commerce conversion rate | 2-3% (early stage) → 3-5% (month 6+) | Industry average 2.5% |
| Cart abandonment | < 65% | Industry average 70% |
| Kit Quiz completion rate | > 60% | Quiz funnels average 40-60% |
| Email signup rate | > 3% | DTC average 2-3% |
| Mobile conversion | > 1.5% | Mobile typically 50% of desktop |
| Average order value | $100+ (Kit-anchored) | Driven by Kit as default purchase |

---

## 5. Core Web Vitals Targets

| Metric | Target | Implementation |
|--------|--------|---------------|
| **LCP** | ≤ 2.5s | Hero image/video: WebP format, preloaded, CDN-served. Lazy load below-fold images. |
| **INP** | ≤ 200ms | Minimize JavaScript. Defer non-critical scripts. No render-blocking resources. |
| **CLS** | ≤ 0.1 | Define image dimensions in HTML. Font swap: optional. Reserve space for dynamic content. |

### Performance Checklist

- [ ] All images served as WebP with srcset for responsive sizes
- [ ] Hero image/video preloaded in `<head>`
- [ ] Fonts loaded with `font-display: swap` or `optional`
- [ ] Third-party scripts (Afterpay, analytics, chat) deferred or async
- [ ] Shopify theme: remove unused apps/scripts from theme.liquid
- [ ] CDN enabled for all static assets
- [ ] Gzip/Brotli compression enabled

---

## 6. Accessibility Audit (WCAG AA)

### Compliance Requirements

| Requirement | Standard | Status |
|-------------|----------|--------|
| Text contrast | 4.5:1 minimum (Within on Canvas = 11.2:1) | Designed to pass |
| Large text contrast | 3:1 minimum | Designed to pass |
| Touch targets | 44x44px minimum | Specified in Design System |
| Alt text | All product and lifestyle images | Required |
| Heading hierarchy | h1 → h2 → h3, no skips | Specified in wireframes |
| Keyboard navigation | All interactive elements Tab-accessible | Required |
| Focus indicators | 2px Intention color outline | Specified in Design System |
| Form labels | Visible labels (not placeholder-only) | Specified in Design System |
| Screen reader | Semantic HTML, ARIA where needed | Required |
| Reduced motion | Respect prefers-reduced-motion | Specified in Design System |

---

## 7. Shopify-Specific Recommendations

| Area | Recommendation |
|------|---------------|
| **Theme** | Use a lightweight, performant theme (Dawn-based or minimal custom). Avoid bloated multipurpose themes. |
| **Apps** | Minimize app count — each app adds JavaScript. Essential: Reviews (Judge.me), BNPL (Afterpay), Email (Klaviyo), Analytics (GA4 + server-side). |
| **Product structure** | Create "Kit" products as bundles (not individual items in cart). Customer sees and buys ONE Kit product. |
| **Metafields** | Use Shopify metafields for Kit-specific data: Kit name, included items, lifestyle context, recommended for. |
| **URL structure** | /kits/reformer-kit, /women/zyra-leggings — clean, descriptive, SEO-friendly. |
| **Checkout** | Use Shopify Checkout Extensibility (not checkout.liquid). Customize with brand colors and "Complete Your Kit" CTA. |
| **Returns** | Integrate return portal (Loop or Returnly) with 60-day policy. Self-service to reduce support load. |
| **Tracking** | Server-side events via Shopify + GA4 Measurement Protocol. Don't rely solely on client-side pixels. |

---

## 8. Integration Outputs to Downstream Departments

| To | Output |
|----|--------|
| **Distribution & Growth** | Site structure for SEO. Content hub ("/the-movement") for organic. Email signup placement for list building. Kit Quiz for lead generation. |
| **Narrative & Verbal** | All microcopy implemented per Deliverable 6. UX copy confirmed across wireframes. |
| **Creative & Visual** | Design System tokens implemented per Deliverable 8. Photography placement defined per wireframes. |

---

*Deliverable 10 of 16 — Intus Launch Kit*
*Next: Gate 4 — Digital Review*
