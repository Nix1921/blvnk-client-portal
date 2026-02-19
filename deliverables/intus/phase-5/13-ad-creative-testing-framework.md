# Ad Creative Testing Framework — Intus
**Department:** Distribution & Growth Engine
**Phase:** 5A | Launch Kit
**Date:** February 2026

---

## 1. Testing Architecture: 3-Phase System

### Phase 1: Pre-Flight (New vs. New)

**Purpose:** Find winning concepts from a pool of untested creatives.

| Parameter | Setting |
|-----------|---------|
| Campaign type | ABO (Ad Set Budget Optimization) or ASC+ |
| Budget | $20-30/day per ad set |
| Duration | 3-5 days |
| Ad sets | 3-5 ad sets, each with 1-2 creatives |
| Audience | Broad targeting (let algorithm find the Hybrid Athlete) |
| Optimization | Purchase or Add to Cart (not link clicks — vanity metric) |

**Creative concepts to test at launch:**

| Concept | Hook | Format | Archetype |
|---------|------|--------|-----------|
| A: "The Question" | "What do you wear between workouts?" | Text overlay → Kit reveal | Sage |
| B: "POV Transition" | "POV: One outfit, your whole day" | Day-in-the-life video | Magician |
| C: "The Kit" | "This is The Reformer Kit. $100." | Product showcase, lifestyle context | Magician |
| D: "Guarantee" | "Wear it for 60 days. Return if we're wrong." | UGC-style, direct-to-camera | Sage |
| E: "The Math" | "Your day is 24 hours. Your workout is 1." | Text-heavy, typography-forward | Sage |

**Decision rule after 3-5 days:**
- CPA < target → Winner (advance to Phase 2)
- CPA = target → Neutral (backup pool)
- CPA > 2x target → Kill

### Phase 2: New vs. BAU (Winners vs. Evergreen)

**Purpose:** Validate that new winners outperform current best performers.

| Parameter | Setting |
|-----------|---------|
| Campaign type | ABO or CBO |
| Budget | $30-50/day per ad set |
| Duration | 5-7 days |
| Structure | 2 ad sets: Phase 1 winners vs. current best performers |

**Decision rule:**
- New ad CPA < BAU CPA → New winner confirmed → advance to Phase 3
- New ad CPA ≈ BAU CPA → Add to rotation (creative diversity)
- New ad CPA > BAU CPA → Return to backup pool, don't scale

### Phase 3: Scaling

**Purpose:** Put validated winners into high-budget campaigns for acquisition.

| Parameter | Setting |
|-----------|---------|
| Campaign type | CBO or ASC+ |
| Budget | Scale gradually (increase 20-30% every 3-4 days) |
| Monitoring | Daily CPA check. If CPA rises >30% for 3 consecutive days → reduce budget or rotate creative. |
| Creative refresh | Every 3-4 weeks (or when frequency > 3-4 per user per week) |

---

## 2. Runoff Testing (Hidden Unicorn Discovery)

**Problem:** Meta's algorithm sometimes gives zero spend to ads that could be winners — it just never tested them.

**Solution:**
1. After Phase 1, identify any ads with $0 or <$5 spend
2. Move them to a dedicated "Runoff" ad set with forced equal budget distribution
3. Run for 3 days at $20/day
4. Check for hidden winners that the algorithm overlooked

**This has historically surfaced 15-20% of eventual top performers that would have been killed as "losers."**

---

## 3. Ad Fatigue Detection & Response

### Fatigue Signals

| Signal | Threshold | Action |
|--------|-----------|--------|
| CTR declining consistently | 3+ days of decline | Rotate creative |
| CPM/CPC rising | >20% increase over baseline | Expand audience or rotate |
| Frequency | >3-4 per user per week | Rotate creative, implement frequency caps |
| CPA rising | >30% above target for 3+ days | Reduce budget, test new creative |

### Creative Refresh Protocol

**Monthly cycle:**
- Week 1: Launch 3-5 new concepts (Phase 1 Pre-Flight)
- Week 2: Test winners vs. BAU (Phase 2)
- Week 3-4: Scale winners, monitor fatigue
- End of month: Kill fatigued creative, prepare next batch

**Creative diversity rule:** Always have 3+ active creatives in scaling campaigns. Never rely on a single ad.

---

## 4. Platform-Specific Ad Specs

### Meta (Instagram + Facebook)

| Placement | Format | Dimensions | Duration |
|-----------|--------|------------|----------|
| Feed | Video | 1:1 (1080x1080) or 4:5 (1080x1350) | 15-30s |
| Stories/Reels | Video | 9:16 (1080x1920) | 15-30s |
| Feed | Image | 1:1 (1080x1080) | Static |

### TikTok

| Placement | Format | Dimensions | Duration |
|-----------|--------|------------|----------|
| In-Feed | Video | 9:16 (1080x1920) | 15-60s |
| TopView | Video | 9:16 | 5-60s |

### YouTube

| Placement | Format | Dimensions | Duration |
|-----------|--------|------------|----------|
| Shorts ads | Video | 9:16 | 15-60s |
| In-stream (skippable) | Video | 16:9 | 15-30s (hook in first 5s before skip) |

---

## 5. Budget Allocation (Launch Month)

### Recommended Monthly Budget: $2,000-$3,000 AUD

| Channel | Allocation | Purpose |
|---------|-----------|---------|
| Meta (IG + FB) | 50% ($1,000-1,500) | Primary acquisition. Kit Quiz traffic + retargeting. |
| TikTok | 30% ($600-900) | Discovery. Broad awareness. POV content amplification. |
| YouTube | 10% ($200-300) | Retargeting only at launch. Scale post-month-3 with long-form. |
| Testing reserve | 10% ($200-300) | Phase 1 Pre-Flight and Runoff testing. |

### CAC Targets

| Metric | Target | Rationale |
|--------|--------|-----------|
| Prospecting CAC (new customer) | < $30 AUD | Kit AOV = $100. 30% margin = $30 contribution. CAC must be below this. |
| Retargeting CAC | < $15 AUD | Warm audience should convert at ~2x efficiency. |
| Blended CAC | Track but don't optimize on | Blended hides true channel performance. Always layer. |
| nROAS (new customer) | > 3x | New customer revenue / ad spend. The metric that matters. |

---

## 6. Creative Rules (Brand Compliance)

| Rule | Rationale |
|------|-----------|
| No discount language in ads | Magician rule: you don't discount magic. |
| 60-day guarantee is the hook, not a coupon | The guarantee IS the conversion tool. |
| Always show Kit as one product, not "2 items for $100" | Bundle-as-identity, not bundle-as-discount. |
| UGC-style > polished studio | Gen Z trusts authenticity over production value. |
| Transition moments in video, not gym footage | Brand photography direction (Deliverable 7). |
| "Get Your Kit" CTA, not "Shop Now" | Consistent across all touchpoints (Deliverable 6). |

---

*Deliverable 13 of 16 — Intus Launch Kit*
