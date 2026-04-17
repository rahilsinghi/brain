# Data Sources & V0 → V1 Strategy

> **Parent:** [V0 Content Layer — Master Architecture](./README.md)
> **Purpose:** Define per-schema data sources, fallback logic, confidence scoring, and the evolution path from public-data-only (V0) to integrated/dynamic (V1+).

---

## Strategy Summary

**V0 = Everything obtainable from public or cheap sources, normalized with LLM extraction.**
Zero paid API spend beyond embedding/LLM inference. No operator participation required.

**V1 = Operator-hydrated and partner-integrated.**
Direct CMS feeds (Preferred Hotels), operator admin uploads, paid event APIs, premium data sources.

**Every field has a confidence score and a freshness timestamp.** Agents know what to trust. Low-confidence fields get surfaced for operator review.

---

## Source Matrix — Per Schema

Primary sources listed first. Fallback sources in priority order.

### 1. Hotel

| Field category | V0 primary source | V0 fallback | V1 addition |
|----------------|-------------------|-------------|-------------|
| Name, URL, contact | Google Places API | Scrape website homepage | Preferred CMS |
| Address, geo | Google Places API | Website + geocoding | Preferred CMS |
| Description | LLM-generated from scrape | Hotel Places description | Operator-authored (admin console) |
| Character tags, vibe | LLM inference from scrape + reviews | Fallback: controlled defaults by property type | Operator-verified |
| Price range/tier | LLM from website rate mentions + reviews | Google Places price level | Real rate data (Layer 2) |
| Aggregate rating | Google Places | TripAdvisor scrape | Integrated review systems |
| Hero media | Image pipeline (highest quality + categorized) | Places Photos API | Operator uploads |

### 2. Room

| Field category | V0 primary | V0 fallback | V1 addition |
|----------------|-----------|-------------|-------------|
| Room list, names | Scrape hotel's /rooms or /accommodations pages | JSON-LD extraction if available | Direct PMS |
| Bed configuration | LLM-extract from room page text | Room page tables | PMS structured data |
| Floor size, view | LLM-extract from room descriptions | Photo analysis (VLM) | PMS structured data |
| In-room amenities | LLM + VLM (photos) | Controlled-vocab matching on text | PMS + operator verification |
| Base price indicator | LLM from rate mentions on website | Show "contact hotel" fallback | Real rates from Layer 2 |
| PMS mappings | — (empty) | — | PMS onboarding: Maison client hotels |

### 3. Amenity (with sub-types)

| Field category | V0 primary | V0 fallback | V1 addition |
|----------------|-----------|-------------|-------------|
| Amenity list | LLM-extract from website + Places `types` field | Inferred from room photos (VLM) | Operator admin |
| Pool specs | Website + photos | Place POI subtype | Operator verification |
| Restaurant specs (hours, cuisine) | Google Places (structured) + website | Menu scraping | Direct CMS |
| Pet policy | Website Pet/Dog policy page + Places tags | Contact page scrape | Operator mandatory entry (legal) |
| Spa services | Website menu page + Places | LLM inference | Direct spa CMS |
| Bar specs | Website + Places | LLM inference | Operator |
| Conference | Website Events page + Places | LLM inference | Operator |
| Gym | Website + Places | VLM from photos | Operator |
| Parking | Website + Places | Contact page | Operator |
| Accessibility | **Always conservative** — only claim ADA compliance if explicitly stated | `accessibilitySpec.adaCompliant: false` unless verified | **Operator mandatory + third-party verification** |
| EV charging | Places (Tesla/EV charging POI) + website | Scrape | ChargePoint/Tesla API direct |

**Critical**: Accessibility claims have legal implications. V0 uses conservative fallbacks. If unsure, mark `accessibilitySpec.adaCompliant: null` (unknown) rather than false (claim of non-compliance). V1 requires operator verification.

### 4. Policy

| Field category | V0 primary | V0 fallback | V1 addition |
|----------------|-----------|-------------|-------------|
| Cancellation | Hotel's /policies or /terms page | T&Cs at booking confirm | Operator + booking engine source of truth |
| Check-in/out | Website + Places | Booking engine inherited | Operator verification |
| Pet (legal text) | Website Pet Policy page | Cross-reference with Amenity.petSpec | Operator |
| Smoking | Website + Places `smoking` tag | Safe default: `smokingAllowed: false` | Operator |
| Age restrictions | Website | LLM from guidelines | Operator |
| Fees | Website fees page + booking engine final price | Contact | Booking engine (real) |
| Deposits, min-stay | Website + LLM | Booking engine | Booking engine |

**Fallback priority**: If a policy field can't be confirmed with confidence ≥0.8, we emit `maison:contentStatus: "unknown"` and the agent tells the user to contact the hotel directly rather than fabricating.

### 5. Offer

| Field category | V0 primary | V0 fallback | V1 addition |
|----------------|-----------|-------------|-------------|
| Active offers | Hotel's /offers or /specials page | Email newsletter scrape | Operator admin app |
| Seasonal packages | LLM from homepage | EXA targeted searches | Operator |
| Promo codes | Website + social scan | LLM inference | Operator (real-time) |
| Recurring deals | Website patterns + year-over-year matching | — | Operator schedule |

**EXA special role here:** EXA is evaluated in V0 specifically to catch offer freshness. Hotels update offers without changing sitemap.xml. EXA daily search `"[Hotel Name] summer special offer"` can flag new content that sitemap diffing misses.

### 6. Experience

| Field category | V0 primary | V0 fallback | V1 addition |
|----------------|-----------|-------------|-------------|
| Nearby places (restaurants, shops, beaches) | Google Places API (within geo radius) | EXA "things to do near X" | Curated partner network |
| Experience details (cuisine, hours) | Places | Web scrape restaurant sites | Restaurant POS integrations (V2) |
| Photos | Places Photos | Website scrape | Operator uploads |
| Reservation URLs | LLM-extract from Places/website | Direct lookup (Resy, OpenTable) | OTA-style partnerships |
| Walking distance to hotels | PostGIS ST_Distance + routing API | straight-line distance | Google Routes API (accurate walk time) |
| Preferred partner flag | V0: always false (not yet curated) | — | Operator admin marks partners |

### 7. Media

| Field category | V0 primary | V0 fallback | V1 addition |
|----------------|-----------|-------------|-------------|
| Hotel hero image | Highest-quality from scrape, categorized | Google Places Photos | Operator uploaded, professional |
| Gallery | Website photo gallery scrape | Places Photos | Professional photographer uploads |
| Room photos | Room pages scrape | Website "Gallery" section | Operator upload per room |
| Amenity photos | Website amenity pages | Places | Operator |
| Experience photos | Google Places Photos | Website scrape | Operator uploads from partners |
| Tours | Scrape Matterport URLs from website | — | Operator uploads |
| Videos | Scrape YouTube/Vimeo embeds | — | Operator uploads, hosted via Mux |

### 8. Rates

| Field category | V0 primary | V0 fallback | V1 addition |
|----------------|-----------|-------------|-------------|
| **V0 POC**: hardcoded mock rates for demo flow | — | — | **Nuitee/Derbysoft aggregator** + direct PMS for Maison client hotels |

V0 POC does NOT have live rates. Booking flow uses synthetic data for demo. Layer 2 wires live rates in Week 4 of the timeline.

### 9. FAQ

| Field category | V0 primary | V0 fallback | V1 addition |
|----------------|-----------|-------------|-------------|
| Q&A pairs | Existing Maison `qadump` MongoDB collection | — | Operator admin can add/edit |
| Categorization | LLM-classify each QA into (amenities/policies/booking/local/general) | Uncategorized default | Operator-tagged |
| Source linking | Cross-reference QA text to amenity/policy IDs | Ungrounded | Direct references |
| Deduplication | Embedding-based clustering | Levenshtein fallback | Operator curation |

**Reuse, don't rebuild**: The existing scraper pipeline already produces QA pairs. Our FAQ schema **wraps** them with metadata. No new ingestion path.

### 10. Event

| Field category | V0 primary | V0 fallback | V1 addition |
|----------------|-----------|-------------|-------------|
| Concerts, sports | Ticketmaster Discovery API (free tier) | — | SerpAPI Google Events (paid) |
| Festivals | EXA targeted search | Google Events scrape | Local calendars partnerships |
| Local events | Scrape Hamptons.com, Sag Harbor Patch, etc. | — | EXA + curated feeds |
| Hotel-hosted events (weddings, retreats) | — | — | Operator admin |
| Geographic scope | East End region + NYC metro | — | Nationwide, then global |

---

## Fallback Logic (Generic)

For every field, extraction follows this cascade:

```
Primary source → confidence check
    │
    ├── confidence ≥ 0.85 → emit field with source+confidence
    │
    ├── confidence < 0.85 → try fallback source
    │       │
    │       ├── confidence ≥ 0.85 → emit with secondary source
    │       │
    │       └── confidence < 0.85 → emit {value: null, status: "unknown"}
    │                              + flag for V1 operator review
    │
    └── No source returns data → emit {value: null, status: "missing"}
                                  + flag for V1 operator review
```

**Never fabricate.** If no source has the data, the field is explicitly `unknown` or `missing` — not hallucinated. This drives the zero-hallucination concierge guarantee.

---

## Confidence Scoring (How We Compute It)

Confidence is a continuous 0.0-1.0 score per field. Inputs:

| Signal | Weight | How computed |
|--------|--------|--------------|
| **Source type** | 40% | Places API = 0.95; Operator-verified = 1.0; Scrape + LLM = 0.80; EXA = 0.75; LLM inference only = 0.60 |
| **LLM self-reported confidence** | 30% | We ask the LLM to rate its confidence; calibrated against ground truth on a sample |
| **Cross-source agreement** | 20% | If 2+ sources agree → +0.15; conflict → -0.2 |
| **Freshness** | 10% | `verifiedAt` within 30 days → 1.0; ≥90 days → 0.7 |

**Thresholds used by agents:**
- `≥ 0.90` → surface directly in responses
- `0.70 - 0.89` → surface with hedge ("typically", "reported")
- `< 0.70` → don't surface; either skip the fact or redirect to contact hotel

---

## Freshness Tracking

Every field gets:
- `maison:provenance.fields.<fieldName>.verifiedAt` — last time source was checked
- `maison:provenance.fields.<fieldName>.source` — where it came from

**Freshness policies:**

| Schema | Max age before re-verify |
|--------|-------------------------|
| Hotel (name, address, contact) | 90 days |
| Amenity (facility basics) | 180 days |
| Policy (cancellation, fees) | 60 days |
| Offer (promos) | 14 days (volatile) |
| Experience (hours, status) | 30 days |
| Media | No expiry (images are durable) |
| Event | 7 days (fast-changing) |
| FAQ | 90 days |
| Rates | TTL-based (15 min cached) |

The daily EXA diff + weekly scraper run together maintain freshness. Operator edits override expiry and mark `verifiedAt: now`.

---

## The EXA Role (V0 Evaluation)

Fredrik's action item: set up corporate EXA account and evaluate. Here's the scoped evaluation criteria:

### What we want EXA to do in V0

1. **Offer freshness** — catch new promos a hotel launches without updating sitemap. Daily search: `"[Hotel Name] offer"` → diff against known offers → flag new content for LLM extraction.
2. **Event coverage** — supplement Ticketmaster for long-tail events (local festivals, private events not on TM).
3. **Gap-fill** — when scraping produces low-confidence fields (e.g. amenity hours), query EXA with a targeted question: `"What are the restaurant hours at Baron's Cove Sag Harbor?"` → retrieve + LLM extract.

### What we measure (to decide if EXA ships to V1)

| Metric | Target |
|--------|--------|
| Gap-fill success rate | ≥60% of low-confidence fields resolved by EXA to confidence ≥0.80 |
| Offer freshness | Detected within 24 hours of website update |
| Event coverage | ≥80% of East End local events detected within 7 days |
| Cost per hotel per month | < $1 |

If it hits these, EXA becomes part of the daily sync pipeline in V1. If it doesn't, we rely on scraper + operator admin.

### EXA integration architecture

```
Daily cron (EventBridge at 02:00 UTC)
    │
    └── For each hotel in the catalog:
        ├── EXA search: "[Hotel] offer" → compare to offers.json → flag diffs
        ├── EXA search: "events in [city] [next 14 days]" → write to events table
        └── For each null/low-confidence field in hotel.json:
            EXA question → LLM extract → update if confidence ≥0.80
```

---

## Agentic Automation (V1+)

At scale, we can't manually curate 500K hotels. Automation strategies:

### Auto-scrape new hotels
- Detect new East End properties via Places API monthly sweep
- Auto-trigger scraper for any new property
- Human review of first-crawl output via operator console

### Auto-refresh stale data
- Nightly job: find fields with `verifiedAt > 90 days` → requeue for scraper/EXA
- Flag major changes (name change, URL change) for human review

### Agentic investigators
- "Ultron" agent per hotel: reads the hotel's JSON folder, identifies gaps, initiates targeted queries (EXA, web search), proposes updates with confidence scores
- Operator reviews proposed updates in admin console before merging

### Conflict resolution
- When two sources disagree (Places says check-in 3pm, website says 4pm): confidence-weighted arbitration, flag for human if delta is material (e.g. for policy fields)

---

## Operator Onboarding Flow (V1)

```
Hotel signs up (Basic tier = free)
    │
    ├── Existing scrape data pre-hydrates their "dockerized client" folder
    ├── Operator console shows: "We have 87 fields populated. 12 need your review. 4 are missing."
    │
    ├── Operator reviews low-confidence fields → verifies or corrects
    ├── Operator uploads hero images + gallery (replaces scraped)
    ├── Operator adds pet policy, accessibility details (legal verification)
    ├── Operator connects PMS (if on supported list) → rates go live
    │
    └── Hotel becomes a "verified" client — confidence scores jump, full feature set enabled
```

---

## Free Tier Source Cost Summary

| Source | V0 Cost | V1+ Cost (at scale) |
|--------|---------|---------------------|
| Google Places API | Free tier: $200/month credit (~28K lookups) | ~$17/1K detail lookups — $500/month for 30K hotels |
| Google Places Photos | Included in above | Bandwidth covered by CloudFront |
| Ticketmaster Discovery | Free (5K calls/day) | Free tier probably sufficient through V1 |
| EXA | POC credits (Fredrik setting up) | TBD — evaluating pricing |
| Existing Maison scraper | $ (shared LLM budget; Noel's ticket to optimize) | $ — Noel's optimization work applies |
| Claude 3.5 Sonnet (normalizer LLM) | ~$0.50/hotel/scrape (estimated) | $0.20/hotel/month recurring |
| Cohere Embed v3 multimodal | ~$0.003 per 100 tokens text; similar for images | Still cheap |

**V0 total LLM+API cost for 100 East End hotels: ~$100-200 initial + $50/month recurring.** Negligible for POC.

---

## Related Documents

- [Schema Specifications](./schemas.md) — what we're populating
- [Integration](./integration.md) — how scraper output feeds into the normalizer
- [Storage](./storage.md) — where normalized data lives
- [Media Layer](./media-layer.md) — image/video pipeline details
