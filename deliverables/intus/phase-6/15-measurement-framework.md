# Measurement Framework & Dashboards — Intus
**Department:** Market Intelligence & Analytics (with inputs from all departments)
**Phase:** 6A | Launch Kit
**Date:** February 2026

---

## 1. Measurement Architecture: Triangulated (Adapted for Early-Stage)

Intus is pre-launch with no historical data. The triangulated framework (MMM + MTA + Incrementality) must be adapted for the early-stage reality while building toward full implementation.

### Phase-Based Measurement Roadmap

| Phase | Timeline | Methodology | What It Measures |
|-------|----------|-------------|-----------------|
| **Phase A: Foundation** | Months 1-3 | Attribution + Event Tracking | What's happening? (baseline data collection) |
| **Phase B: Validation** | Months 4-6 | Attribution + Incrementality Testing | Is it real? (causal validation of channels) |
| **Phase C: Optimization** | Months 7-12+ | Full Triangulation (MMM + MTA + Incrementality) | How do we scale? (budget optimization) |

---

## 2. Phase A: Foundation (Months 1-3)

### Tracking Infrastructure

| Component | Implementation | Tool |
|-----------|---------------|------|
| Server-side events | Shopify + GA4 Measurement Protocol | GA4 + Shopify |
| Client-side pixel | GA4 gtag.js + Meta Pixel + TikTok Pixel | Browser |
| Email tracking | Klaviyo analytics + UTM parameters on all links | Klaviyo |
| Studio attribution | UTM-tagged QR codes per studio location | GA4 |
| Kit Quiz tracking | Event: quiz_start, quiz_complete, quiz_result | GA4 custom events |
| Social tracking | Platform analytics + UTM on bio links | Native + GA4 |

### Event Taxonomy

| Event | Trigger | Parameters |
|-------|---------|------------|
| `page_view` | Any page load | page_title, page_location |
| `view_item` | Product page view | item_id, item_name, item_category (Kit/Individual), price |
| `quiz_start` | Kit Quiz initiated | source (ad/organic/studio) |
| `quiz_complete` | Quiz result shown | kit_result (reformer/street/recovery) |
| `add_to_cart` | Kit or item added | item_id, item_name, value, kit_type |
| `begin_checkout` | Checkout started | value, items, payment_method |
| `purchase` | Order completed | transaction_id, value, items, new_vs_returning, source |
| `email_signup` | "Join the Circle" | source, segment |

### Attribution Model (Phase A)

**Model: Time Decay (7-day lookback)**

| Why Time Decay | Rationale |
|---------------|-----------|
| Short consideration cycle | Activewear is typically 7-14 day decision for new brand |
| Video-heavy channels | TikTok/Reels create awareness that decays toward conversion |
| Multiple touchpoints | Hybrid Athlete encounters brand across social, email, studio |

**Rules:**
- Track nROAS (new customer revenue / ad spend), not blended ROAS
- Never optimize on platform-reported conversions alone — cross-reference with Shopify
- Always layer CAC: Prospecting CAC vs. Retargeting CAC (per Deliverable 13)

---

## 3. KPI Dashboard

### Tier 1: Business Health (Weekly Review)

| KPI | Target (Month 1) | Target (Month 3) | Source |
|-----|-------------------|-------------------|--------|
| **Revenue** | $10K-15K | $25K-40K | Shopify |
| **Kit Sales** | 100-150 Kits | 250-400 Kits | Shopify |
| **New Customers** | 100+ | 200+ | Shopify (first-time orders) |
| **Average Order Value** | $100+ (Kit-anchored) | $110+ (Kit + add-on) | Shopify |
| **Customer Acquisition Cost (Prospecting)** | < $30 AUD | < $25 AUD | GA4 + Ad platforms |
| **nROAS (New Customer)** | > 3x | > 4x | Calculated |

### Tier 2: Channel Performance (Weekly Review)

| KPI | Target | Source |
|-----|--------|--------|
| **Meta ROAS** | > 3x | Meta Ads Manager + Shopify cross-ref |
| **TikTok CPM** | < $10 AUD | TikTok Ads Manager |
| **Email Revenue per Send** | Track baseline | Klaviyo |
| **Studio Conversions** | 15-20/month | UTM tracking |
| **Organic Traffic Growth** | +10% MoM | GA4 |
| **Kit Quiz Completion Rate** | > 60% | GA4 custom events |

### Tier 3: Brand Health (Monthly Review)

| KPI | Target | Source |
|-----|--------|--------|
| **Share of Search** | Baseline → growing | Google Search Console |
| **"Intentional Movement" search volume** | 0 → measurable | Google Trends |
| **Social Mentions** | 50+ UGC/month | Social listening |
| **Email List Size** | +2K/month | Klaviyo |
| **NPS** | Baseline (survey at Day 30 post-purchase) | Post-purchase survey |
| **Kit Reorder Rate (90-day)** | Track (benchmark: Flexlara's 64%) | Shopify cohort analysis |

### Tier 4: FROTOS Measurement (Quarterly Review)

| Audience | Belief to Measure | Method |
|----------|------------------|--------|
| Hybrid Athlete Female (AU) | "Intus understands how I actually live" | Post-purchase survey + social sentiment |
| Conscious Male (AU) | "There's a brand between gym-bro and premium that fits me" | Segment-specific survey |
| AU-Aesthetic Seeker (US) | "The Australian aesthetic I want is available" | US customer survey + search data |

---

## 4. Phase B: Incrementality Testing (Months 4-6)

Once 3 months of baseline data exist, validate channel effectiveness causally.

### Test 1: Geo-Lift Test (Meta Ads)

| Parameter | Setting |
|-----------|---------|
| Test market | Melbourne |
| Control market | Sydney (similar demographics, no Meta ads) |
| Duration | 4 weeks |
| Measurement | Sales lift in Melbourne vs. Sydney, controlling for organic |
| Purpose | Does Meta ad spend actually cause incremental purchases, or would they have bought anyway? |

### Test 2: Holdout Test (Email)

| Parameter | Setting |
|-----------|---------|
| Test group | 90% of email list receives campaigns |
| Holdout group | 10% receives no campaigns (automated flows only) |
| Duration | 4 weeks |
| Measurement | Revenue difference between test and holdout |
| Purpose | What is the incremental value of email campaigns beyond automated flows? |

### Test 3: Studio Channel Validation

| Parameter | Setting |
|-----------|---------|
| Test studios | 3 studios with active Intus displays |
| Control studios | 2 matched studios with no Intus presence |
| Duration | 4 weeks |
| Measurement | Local area purchase lift near test studios vs. control |
| Purpose | Do studio partnerships drive incremental purchases? |

---

## 5. Phase C: Full Triangulation (Months 7-12+)

At 6+ months with sufficient data:

| Layer | Tool | Purpose |
|-------|------|---------|
| **MMM** | Lightweight MMM (Robyn or similar) | Top-down: How should total budget be allocated across channels? |
| **MTA** | GA4 Data-Driven Attribution | Bottom-up: Which touchpoints drive individual conversions? |
| **Incrementality** | Ongoing geo-lift and holdout tests | Validation: Are the other two models telling the truth? |

**MMM Data Requirement:** 6+ months minimum, ideally 12+ months for seasonal effects. Updates monthly.

---

## 6. Reporting Cadence

| Frequency | Report | Audience | Content |
|-----------|--------|----------|---------|
| **Daily (Strike only)** | Triage Dashboard | Growth team | Ad CTR, spend, site sessions, Kit sales velocity |
| **Weekly** | Performance Report | Founder + Growth | Tier 1 + Tier 2 KPIs, Stoplight (Green/Yellow/Red), actions |
| **Monthly** | Brand Health Report | Founder | Tier 3 KPIs, competitive check, content performance |
| **Quarterly** | Strategic Review | Founder + AntiGravity | FROTOS measurement, channel mix evaluation, incrementality results |

### Stoplight Triage System

| Signal | Status | Action |
|--------|--------|--------|
| KPI above target | GREEN | Scale: increase budget, expand audience, replicate |
| KPI borderline (within 15%) | YELLOW | Monitor: check sub-metrics (CTR, CPM, CVR), identify root cause |
| KPI below target (>15% miss) | RED | Fix or Kill: diagnose → pivot creative/channel/targeting or cut spend |

---

*Deliverable 15 of 16 — Intus Launch Kit*
