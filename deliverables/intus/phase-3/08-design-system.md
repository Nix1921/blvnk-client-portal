# Design System — Intus
**Department:** Creative & Visual Arts Studio
**Phase:** 3B | Launch Kit
**Date:** February 2026

---

## 1. Grid System

### Digital Grid: 8pt System

All spacing, sizing, and layout values are multiples of 8px. This ensures visual consistency across all digital touchpoints.

| Token | Value | Use |
|-------|-------|-----|
| `space-xs` | 8px | Micro spacing (between icon and label) |
| `space-sm` | 16px | Component internal padding |
| `space-md` | 24px | Between related elements |
| `space-lg` | 32px | Between sections |
| `space-xl` | 48px | Major section breaks |
| `space-2xl` | 64px | Page section gaps |
| `space-3xl` | 96px | Hero section padding |

### Page Grid

| Breakpoint | Columns | Gutter | Margin | Max Width |
|------------|---------|--------|--------|-----------|
| Mobile (< 768px) | 4 | 16px | 16px | 100% |
| Tablet (768-1024px) | 8 | 24px | 32px | 100% |
| Desktop (1025-1440px) | 12 | 24px | 48px | 1200px |
| Wide (> 1440px) | 12 | 32px | auto | 1400px |

### Layout Patterns

| Pattern | Structure | Use Case |
|---------|-----------|----------|
| **Z-Pattern** | Hero image → headline → supporting text → CTA | Homepage, landing pages |
| **F-Pattern** | Header → left-aligned content → scan lines | Collection pages, blog |
| **Grid** | Equal-weight cards in 2/3/4 columns | Product grid, Kit selection |
| **Asymmetric Split** | 60/40 image-to-text ratio | Product pages, editorial |

---

## 2. Design Tokens

### Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `color-primary` | #2C2C2C (Within) | Text, logo, headers |
| `color-background` | #F5F0EB (Canvas) | Page backgrounds |
| `color-surface` | #D4C5B2 (Ground) | Cards, dividers, secondary bg |
| `color-accent` | #C4704E (Intention) | CTAs, highlights, interactive |
| `color-accent-secondary` | #7A8B7A (Thought) | Tags, educational, secondary accent |
| `color-surface-dark` | #2C2C2C (Within) | Dark sections, footer |
| `color-text-inverse` | #F5F0EB (Canvas) | Text on dark backgrounds |
| `color-error` | #C44E4E | Error states |
| `color-success` | #4E7A5E | Success states, in-stock |

### Typography Tokens

| Token | Font | Size | Weight | Line Height | Letter Spacing |
|-------|------|------|--------|-------------|----------------|
| `type-display` | Primary | 48px | 300 | 1.2 | -0.01em |
| `type-h1` | Primary | 38px | 400 | 1.2 | 0 |
| `type-h2` | Primary | 30px | 400 | 1.3 | 0 |
| `type-h3` | Primary | 24px | 500 | 1.3 | 0 |
| `type-body` | Secondary | 16px | 400 | 1.5 | 0 |
| `type-body-sm` | Secondary | 14px | 400 | 1.5 | 0 |
| `type-micro` | Secondary | 12px | 500 | 1.4 | +0.02em |
| `type-button` | Primary | 14px | 500 | 1 | +0.04em |

### Border & Radius Tokens

| Token | Value | Use |
|-------|-------|-----|
| `radius-none` | 0px | Product images (sharp, intentional) |
| `radius-sm` | 4px | Buttons, inputs, tags |
| `radius-md` | 8px | Cards, containers |
| `radius-lg` | 16px | Modal dialogs, featured cards |
| `radius-full` | 9999px | Avatar, pill badges |
| `border-default` | 1px solid #D4C5B2 | Subtle borders on Ground |
| `border-strong` | 1px solid #2C2C2C | Emphasis borders |

### Shadow Tokens

| Token | Value | Use |
|-------|-------|-----|
| `shadow-sm` | 0 1px 3px rgba(44,44,44,0.08) | Subtle lift (cards on hover) |
| `shadow-md` | 0 4px 12px rgba(44,44,44,0.1) | Elevated elements (dropdowns, modals) |
| `shadow-lg` | 0 8px 24px rgba(44,44,44,0.12) | Major overlays (cart drawer, lightbox) |

*Note: Shadows are warm-toned (based on Within #2C2C2C), never cool/blue.*

---

## 3. Component Specifications

### Buttons

| Variant | Background | Text | Border | Radius | Padding | Use |
|---------|-----------|------|--------|--------|---------|-----|
| **Primary** | Intention (#C4704E) | Canvas (#F5F0EB) | none | 4px | 16px 32px | "Get Your Kit", main CTAs |
| **Secondary** | transparent | Within (#2C2C2C) | 1px solid Within | 4px | 16px 32px | "Take the Kit Quiz", secondary actions |
| **Ghost** | transparent | Within (#2C2C2C) | none | 0 | 16px 0 | Text links, inline actions (underline on hover) |
| **Inverse** | Canvas (#F5F0EB) | Within (#2C2C2C) | none | 4px | 16px 32px | CTAs on dark backgrounds |

**Button States:**

| State | Change |
|-------|--------|
| Hover | Darken background 10%, cursor: pointer |
| Active | Darken 15%, scale(0.98) |
| Disabled | Opacity 0.4, cursor: not-allowed |
| Focus | 2px outline offset, Intention color |

**Button sizing:** Minimum height 44px, minimum width 120px (Fitts's Law compliance).

### Cards

**Product Card:**

```
┌─────────────────────────┐
│                         │
│      Product Image      │  ← radius-none (sharp edges)
│      (3:4 ratio)        │
│                         │
├─────────────────────────┤
│  Collection Name        │  ← type-micro, Thought color
│  Product Name           │  ← type-h3
│  $XX AUD                │  ← type-body
│  [2 color swatches]     │  ← 24px circles
└─────────────────────────┘
```

**Kit Card (Featured):**

```
┌─────────────────────────────────────┐
│                                     │
│        Kit Image (2 pieces          │  ← radius-none
│        styled together)             │
│                                     │
├─────────────────────────────────────┤
│  THE REFORMER KIT                   │  ← type-micro, uppercase
│  [Tank Name] + [Short Name]         │  ← type-body
│  $100 AUD | $25/fortnight           │  ← type-body, Intention color for price
│                                     │
│  [Get This Kit]  [See Details]      │  ← Primary + Ghost buttons
│                                     │
│  60-day guarantee                   │  ← type-micro, Thought color
└─────────────────────────────────────┘
```

### Navigation

| Element | Specification |
|---------|---------------|
| Height | 64px (desktop), 56px (mobile) |
| Background | Canvas (#F5F0EB) at 95% opacity, backdrop-blur: 12px |
| Logo | Left-aligned, wordmark only |
| Links | type-body-sm, Within color, no underline. Underline on hover. |
| CTA | Primary button "Get Your Kit" — always visible in nav |
| Mobile menu | Full-screen overlay, Canvas background, centered links |
| Sticky behavior | Sticky on scroll, subtle shadow-sm appears after 100px scroll |

### Form Inputs

| State | Border | Background | Text |
|-------|--------|------------|------|
| Default | border-default | Canvas | Within |
| Focus | 2px Intention | Canvas | Within |
| Error | 2px color-error | Canvas | color-error label |
| Disabled | border-default at 50% opacity | Ground at 50% | Within at 50% |

Input height: 48px. Label: type-body-sm above field. Placeholder: Within at 40% opacity.

---

## 4. Responsive Breakpoints

| Breakpoint | Width | Behavior |
|------------|-------|----------|
| Mobile S | 320px | Minimum supported width |
| Mobile | 375px | Primary mobile target |
| Mobile L | 428px | Large phones |
| Tablet | 768px | Grid switches to 8-col |
| Desktop | 1024px | Grid switches to 12-col, navigation expands |
| Desktop L | 1440px | Max content width reached |
| Wide | 1920px | Content centered, margins increase |

### Responsive Rules

- **Mobile-first:** Design for mobile, enhance for desktop
- **Touch targets:** Minimum 44x44px on all interactive elements
- **Typography:** Display drops to 32px on mobile, body stays at 16px
- **Images:** Serve WebP with srcset for responsive image loading
- **Kit cards:** 1-column on mobile, 2 on tablet, 3 on desktop

---

## 5. Animation & Motion

### Motion Principles

| Principle | Expression | Duration |
|-----------|-----------|----------|
| **Intentional** | Every animation has purpose. No decorative motion. | — |
| **Smooth** | Ease-in-out curves. Never jarring. | — |
| **Subtle** | Motion supports content, never distracts. | — |

### Motion Tokens

| Token | Duration | Easing | Use |
|-------|----------|--------|-----|
| `motion-fast` | 150ms | ease-out | Button hover, micro-interactions |
| `motion-base` | 250ms | ease-in-out | Page transitions, card reveals |
| `motion-slow` | 400ms | ease-in-out | Modal open/close, drawer slide |
| `motion-gentle` | 600ms | ease-out | Hero image fade-in, scroll reveals |

### Specific Animations

| Element | Animation | Trigger |
|---------|-----------|---------|
| Product images | Subtle scale(1.02) | Hover |
| Page sections | Fade-up (20px translate + opacity) | Scroll into view |
| Cart drawer | Slide from right, 400ms | Add to Kit / cart icon click |
| Kit counter | Count-up animation | Page load (if "Kits claimed" feature active) |
| Navigation | Shadow appears, 250ms | Scroll past 100px |

### Reduced Motion

Respect `prefers-reduced-motion: reduce`:
- Replace all transforms with opacity-only transitions
- Disable scroll-triggered animations
- Keep page-functional animations (drawer, modal) but simplify

---

## 6. Accessibility Standards

### WCAG AA Compliance (Minimum)

| Requirement | Specification |
|-------------|---------------|
| Color contrast (text) | Minimum 4.5:1 (verified in Brand Identity System) |
| Color contrast (large text) | Minimum 3:1 |
| Touch targets | Minimum 44x44px |
| Focus indicators | 2px outline, Intention color, 2px offset |
| Alt text | Required on all images. Descriptive, not "image of..." |
| Heading hierarchy | Sequential (h1 → h2 → h3), no skipped levels |
| Keyboard navigation | All interactive elements reachable via Tab |
| Screen reader | Semantic HTML, ARIA labels where needed |
| Reduced motion | Respect prefers-reduced-motion |
| Form labels | Visible labels (not placeholder-only) |

---

## 7. Integration Outputs

| To | Output |
|----|--------|
| **Digital & Systems** | Complete token system for implementation. Component specs for Shopify theme build. Responsive breakpoints. Accessibility requirements. |
| **Distribution & Growth** | Social media templates built on this grid. Ad creative specs. |
| **Narrative & Verbal** | Button copy alignment confirmed. Microcopy styling defined. |

---

*Deliverable 8 of 16 — Intus Launch Kit*
*Next: Semiotic Dictionary (Deliverable 9)*
