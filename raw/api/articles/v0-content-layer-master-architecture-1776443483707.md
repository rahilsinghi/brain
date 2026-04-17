---
status: processed
source_type: api
channel: maison-travel-v0-spec
source_id: api/articles/v0-content-layer-master-architecture-1776443483707.md
ingested_at: 2026-04-17T16:31:23.707Z
parsed_at: null
compiled_to: "[[V0 Content Layer — Master Architecture]]"
processed_at: 2026-04-17T16:45:58.499Z
retry_count: 0
last_error: null
compile_progress: null
---



# V0 Content Layer — Master Architecture

> **Owner:** Rahil Singhi
> **Status:** Spec in progress — review with Kim, Noel, Fredrik before Friday (Apr 19, 2026)
> **Parent:** Maison.Travel POC (Notion)
> **Deadline:** Memorial Day (May 25, 2026) for end-to-end conversational booking

---

## What This Spec Covers

The **Content Layer** is Layer 1 of the Maison.Travel POC architecture. It turns raw hotel data from many sources into a **structured, schema.org-compliant knowledge graph** that powers:

- Conversational search ("romantic beach hotel under $500")
- Composite queries ("pet-friendly stay near the Taylor Swift concert Friday")
- Grounded, zero-hallucination answers in the chat concierge
- Rich visual carousels with images, videos, 360° tours
- MCP tools exposed to ChatGPT, WhatsApp, Instagram, any AI platform

Target: **100 East End properties for POC, every hotel in the world at scale.**

The goal is not the data itself — it's the **structure, schemas, and retrieval patterns** that make every subsequent layer (booking, payments, agent) reliable and fast.

---

## The Three Architectural Layers

```
┌──────────────────────────────────────────────────────────────────┐
│  LAYER 3: PAYMENTS (Stripe Connect)                               │
│  Payment Intents, Payment Links, multi-tenant hotel payouts,      │
│  commission split, webhook handling, refunds                      │
└──────────────────────────────┬───────────────────────────────────┘
                               │
┌──────────────────────────────┴───────────────────────────────────┐
│  LAYER 2: MCP TOOLS                                               │
│  searchHotels, getHotelRates, bookHotelOffer, getExperiences,     │
│  getMedia, getFAQ — all MCP/A2A, callable from any AI platform    │
└──────────────────────────────┬───────────────────────────────────┘
                               │
┌──────────────────────────────┴───────────────────────────────────┐
│  LAYER 1: CONTENT (Knowledge Graph) ← THIS SPEC                   │
│  10 schemas (Hotel, Room, Amenity, Policy, Offer, Experience,     │
│  Media, Rates, FAQ, Event), JSON-LD source of truth per hotel     │
│  + Postgres materialized view + pgvector + Redis cache            │
└───────────────────────────────────────────────────────────────────┘
```

---

## The Core Principle

**JSON is the source of truth. Everything else is derived.**

Per-hotel JSON folders are the "dockerized client" home — a dedicated filesystem where each hotel's schemas, media, provenance, and agent config live together. That folder is the contract.

From the JSON:
- Markdown is auto-generated (for Obsidian viewing, Git diffs)
- Postgres rows are materialized (for fast composite queries)
- Embeddings are generated (for semantic search)
- CDN-ready images are processed (for the chat UI)

If we switch databases, change vector stores, or migrate clouds — we regenerate from the JSON. Nothing is lost because nothing else is canonical.

This directly follows Kim's rule: *"JSON files as source of truth, markdown generated from JSON for Obsidian viewing, never the reverse."*

---

## High-Level Architecture

```
SOURCES (V0)                      NORMALIZATION              STORAGE                RETRIEVAL
──────────                       ─────────────              ───────                ─────────

┌─ Hotel website                 ┌─────────────────┐        ┌─────────────────┐    ┌──────────────┐
│  (via existing Python          │ Normalizer      │        │ JSON files      │    │ MCP Tools    │
│  scraper, Stage 3.5 hook)  ───▶│ Service (TS)    │───────▶│ hotels/{slug}/  │◀───│ searchHotels │
│                                │                 │        │   data/*.json   │    │ getRates     │
├─ Google Places API             │ - schema.org    │        │   media/        │    │ bookOffer    │
│  (photos, hours, reviews)  ───▶│   extraction    │        │   markdown/     │    │ getExperienc │
│                                │ - LLM parsing   │        │   provenance/   │    │ getMedia     │
├─ EXA API                       │   (Claude 3.5)  │        │   skills/       │    │ getFAQ       │
│  (dynamic web diff)        ───▶│ - validation    │        │   tools/        │    │              │
│                                │   vs JSON       │        └────────┬────────┘    └──────┬───────┘
├─ Ticketmaster API              │   Schemas       │                 │                    │
│  (events for composite     ───▶│ - provenance    │                 │ sync on change     │
│   queries)                     │   tagging       │                 │                    │
│                                └─────────────────┘                 ▼                    │
├─ Matterport URLs from          ┌──────────────────────────────────────┐                │
│  hotel websites (tour)     ───▶│ Postgres RDS (materialized view)      │◀───────────────┤
│                                │ - Normalized tables (SQL filters)     │                │
├─ Existing Maison KB            │ - JSONB columns (full schema)         │                │
│  (chatbot QA + content     ───▶│ - PostGIS (geo queries)               │                │
│   snapshots, available         │ - pgvector (semantic search)          │                │
│   in Mongo)                    │ - tsvector (full-text search)         │                │
│                                └──────────────────┬───────────────────┘                │
└─ Supplier admin upload                            │                                    │
   (V1 — via Maison admin                           ▼                                    │
   console)                      ┌──────────────────────────────────────┐                │
                                 │ Redis cache (AWS ElastiCache)         │◀───────────────┘
                                 │ - Rates cache (TTL per PMS)           │
                                 │ - Hot query results                   │
                                 │ - Agent session state                 │
                                 └──────────────────────────────────────┘
```

Three layers of stored data, one source of truth (JSON), many access patterns.

---

## The 10 Schemas

Schema.org-compliant, with `maison:` namespace extensions where needed.

| # | Schema | schema.org base | Purpose |
|---|--------|----------------|---------|
| 1 | **Hotel** | `Hotel` + `LodgingBusiness` | Anchor entity — identity, location, contact, character |
| 2 | **Room** | `HotelRoom` + `Accommodation` | Room types, beds, occupancy |
| 3 | **Amenity** | Custom composite (with subtypes) | Pool/Gym/Spa/Restaurant/Bar/Pet/EV/Conference/Parking/Accessibility |
| 4 | **Policy** | Custom | Cancellation, pet, check-in/out, fees, min stay |
| 5 | **Offer** | `Offer` + `MonetaryAmount` | Promos, seasonal packages, recurring deals |
| 6 | **Experience** | `TouristAttraction` + `FoodEstablishment` | External — restaurants, wineries, attractions nearby |
| 7 | **Media** | `ImageObject` / `VideoObject` / `Place` | Single schema with `mediaType` discriminator |
| 8 | **Rates** | `Offer` + `PriceSpecification` | Live ARI, dual-source (PMS + aggregator), cached |
| 9 | **FAQ** | `FAQPage` + `Question` | Website FAQ scraped + operator additions |
| 10 | **Event** | `Event` + `Place` | Concerts, festivals, conferences (standalone index for composite queries) |

Full JSON-LD mocks and field dictionaries are in **[schemas.md](./schemas.md)**.

---

## V0 vs V1 Data Strategy

**V0 (Memorial Day POC):** Everything that can be obtained for free from public sources.

| Schema | V0 Source |
|--------|-----------|
| Hotel | Existing Maison scraper + Google Places API + EXA |
| Room | Scrape + JSON-LD extraction |
| Amenity | LLM-extracted from scrape + Places API |
| Policy | LLM-extracted from scrape + Places |
| Offer | Scraped from hotel websites + manual top-20 |
| Experience | Google Places + EXA + local guide scraping |
| Media | Website scrape + Google Places Photos |
| Rates | Hardcoded sample data for POC demo |
| FAQ | Scrape of hotel FAQ pages + existing Maison QA pairs |
| Event | Ticketmaster Discovery API (free tier) |

**V1 (post-POC):** Integrations that require paid APIs, partner agreements, or operator participation.

| Schema | V1 Addition |
|--------|-------------|
| Hotel | Preferred Hotels headless CMS, Maison operator admin |
| Room | Direct PMS for room configs + CMS |
| Amenity | Operator-verified + CMS |
| Policy | Operator-verified + direct CMS |
| Offer | Real-time operator admin app |
| Experience | Curated partner network |
| Media | Operator uploads + Matterport 360° tours |
| Rates | Nuitee/Derbysoft aggregator + direct PMS + Stripe-backed live booking |
| FAQ | Operator admin via Maison console |
| Event | SerpAPI Google Events, local calendars, hotel event feeds |

Full source matrix + fallback logic is in **[data-sources.md](./data-sources.md)**.

---

## Storage Architecture (Summary)

**Option G: JSON-first + Postgres materialized view + Redis cache**

```
┌───────────────────────────────────────────────────┐
│ SOURCE OF TRUTH: Per-hotel JSON folders           │
│ hotels/{slug}/data/{hotel,rooms,amenities,...}    │
│ + provenance + markdown + media + skills + tools  │
└────────────────┬──────────────────────────────────┘
                 │ sync on hash change
                 ▼
┌───────────────────────────────────────────────────┐
│ MATERIALIZED VIEW: Postgres (AWS RDS)             │
│ - Normalized tables (hotels, rooms, amenities…)   │
│ - JSONB columns (full schema per row)             │
│ - PostGIS (geo indexes)                           │
│ - pgvector (semantic embeddings — NEW, not        │
│   shared with chatbot Pinecone)                   │
│ - tsvector (full-text)                            │
└────────────────┬──────────────────────────────────┘
                 │
                 ▼
┌───────────────────────────────────────────────────┐
│ HOT CACHE: Redis (AWS ElastiCache or Upstash)     │
│ - Rates (TTL per PMS)                             │
│ - Hot search queries                              │
│ - Agent session state                             │
└───────────────────────────────────────────────────┘
```

Full 7-option analysis in **[storage.md](./storage.md)**.

**Why Option G wins:**
- Kim keeps the JSON source of truth + dockerized client vision
- Noel gets Postgres materialized view for scale (100 → 500K hotels without rewrite)
- Fredrik gets a clean boundary between our KG and the existing chatbot's Pinecone-backed RAG
- No cross-boundary violations — TS services own Postgres, Python services own Pinecone

---

## Dockerized Client Folder (Per Hotel)

Every hotel is a first-class filesystem entity. Agents can `cd` into it.

```
hotels/baron-s-cove-sag-harbor/
├── CLAUDE.md                    # hotel-specific agent system prompt
├── data/
│   ├── hotel.json               # Hotel schema
│   ├── rooms.json               # Room[]
│   ├── amenities.json           # Amenity[] with sub-types
│   ├── policies.json            # Policy[]
│   ├── offers.json              # Offer[]
│   ├── experiences.json         # Experience[] (nearby, graph-linked)
│   ├── media.json               # Media[] with tags + embeddings ref
│   └── faq.json                 # FAQ[]
├── markdown/                    # generated FROM json (Obsidian-viewable)
│   ├── hotel.md
│   ├── rooms.md
│   ├── amenities.md
│   └── ...
├── media/                       # binary assets (hashed, deduped)
│   ├── hero/
│   ├── gallery/
│   └── manifest.json            # filename → schema ID mapping
├── provenance/
│   ├── sources.json             # per-field source + confidence + freshness
│   ├── last-scrape.json         # latest Maison scraper run metadata
│   └── exa-snapshots/           # daily EXA diff results
├── skills/                      # hotel-specific agentic workflows
│   ├── check-availability.md
│   └── recommend-experiences.md
└── tools/                       # hotel-specific integrations
    ├── pms-config.json          # PMS type + property ID for rates
    └── stripe-account.json      # Stripe Connect account ID
```

Full conventions, file examples, and complete mock in **[dockerized-client.md](./dockerized-client.md)**.

---

## Media & Visual Layer

Images, videos, 360° tours are first-class. The chat UI delivers carousels that make Maison.Travel feel like a best-in-class product (Airbnb/Booking/Mindtrip parity).

Pipeline:
1. **Ingest** — website scrape, Google Places Photos, Matterport URLs
2. **Normalize** — dedup (perceptual hash), resize (4 sizes), WebP+AVIF, blurhash placeholder, quality score
3. **Understand** — Cohere Embed v3 multimodal (CLIP-style embeddings), Claude 3.5 Sonnet captions + categorization
4. **Store** — S3 originals + CloudFront CDN + Postgres metadata + pgvector embeddings
5. **Retrieve** — by hotel, by category, by CLIP semantic search ("sunset pool photo"), by visual similarity
6. **Deliver** — structured JSON to UI → responsive carousel with blurhash placeholders, swipeable on mobile

V0 handles images only (scraped + Places). V1 adds operator uploads, Matterport integration, video transcription for search.

Full pipeline, CLIP architecture, and carousel UX spec in **[media-layer.md](./media-layer.md)**.

---

## Integration with Existing Maison Infrastructure

**The Python scraper stays unchanged.** We hook in at Stage 3.5 (after content_snapshot) with a single SQS emit — a ~20-line Python PR. Our normalizer lives in TypeScript inside the monorepo, consuming the SQS event and producing structured JSON + Postgres rows.

```
Python (existing)              TS (new)
─────────────────              ────────

Stage 1: URL discovery
Stage 2: crawl4ai scrape
Stage 3: chunk + annotate
Stage 3.5: content_snapshot
    └─ EMIT SQS ────────▶    services/normalizer (Lambda)
Stage 4: QA gen                 ├─ fetch markdown from Mongo
Stage 5: QA eval                ├─ LLM extract → 10 schemas
Stage 6: embed                  ├─ validate vs JSON Schema
Stage 7: qadump (MongoDB)       ├─ write to Postgres
                                ├─ write JSON files per hotel
                                └─ emit embeddings to pgvector
```

**Existing packages we reuse (no duplication):**
- `@maison-labs/database` — Postgres, migrations, DynamoDB `kb-version-history`
- `@maison-labs/auth` — permissions for admin console integration
- `@maison-labs/telemetry` — OTel spans (CLAUDE.md requirement)
- `@maison-labs/pubsub` — SQS publisher/subscriber
- `agent-llm-service` (Python, existing) — LLM calls + embeddings via Langfuse prompts

**TS/Python data boundary respected:**
- Python owns Pinecone + MongoDB (existing chatbot)
- TS owns Postgres + pgvector + DynamoDB (our new KG)
- No cross-boundary database access
- Bridge only via SQS events or LLM service HTTP calls

Full integration strategy, SQS message format, normalizer architecture, and migration plan in **[integration.md](./integration.md)**.

---

## Query Patterns We Enable

With 10 schemas + Postgres materialized view + pgvector + PostGIS, these query patterns all work:

| Pattern | Example | How |
|---------|---------|-----|
| **Filter** | "hotels with pool under $500/night" | Postgres SQL on normalized tables |
| **Geo** | "within 10 miles of X" | PostGIS ST_DWithin |
| **Semantic** | "cozy beach vibe for two" | pgvector cosine similarity |
| **Visual** | "sunset pool photo" | CLIP embeddings on media |
| **Full-text** | "rainfall shower" | tsvector GIN index |
| **Composite** | "pet-friendly hotel near Taylor Swift concert Friday" | All of the above joined |
| **Graph** | "experiences near this hotel, preferred partners" | Postgres FKs + recursive CTEs |

All composite queries work in sub-second latency because the materialized view has the right indexes. No scan of 500K JSON files needed.

---

## Success Criteria

Per the April 17 meeting + Fredrik's Memorial Day success criteria:

### Hard requirements

1. **End-to-end booking works** — Guest chats → KG search → ARI check → Stripe payment → PMS write-back → confirmation email. At least one real booking completes in the POC demo.
2. **Live URL** on `maison.travel` — public, mobile-friendly, on-brand.
3. **MCP server callable** from ChatGPT or any MCP client.
4. **100 East End properties in KG** — all with hero image + KB content above quality threshold.
5. **Zero-hallucination concierge** — passes 50-question red-team test with no fabricated amenities, policies, or availability.

### Secondary signals

6. **10+ hotel partners express interest** after seeing demo — validates supplier-side pitch.
7. **Reusable `packages/knowledge-graph`, `packages/pms-adapters`, `packages/payments`** shipped as production-grade, in use by both `apps/travel` and `apps/exchange-api`.

### Anti-patterns (explicit NOT success)

- Impressive UI with mocked ARI data
- ChatGPT GPT querying a spreadsheet instead of live KG
- Any flow that works in demo but requires manual intervention to complete a booking

---

## Timeline (6-week window)

Memorial Day is May 25, 2026. Today is April 17. That's **5.5 weeks including partial weeks**.

| Week | Dates | Focus |
|------|-------|-------|
| 1 | Apr 20 – 26 | Content Layer foundation: trigger existing scraper for 100 properties, build normalizer service (Stage 3.5 SQS subscriber), Schema 1-3 end-to-end (Hotel, Room, Amenity) |
| 2 | Apr 27 – May 3 | Schema 4-7 (Policy, Offer, Experience, Media), image pipeline, embeddings, dockerized client folder structure shipped |
| 3 | May 4 – 10 | MCP tool layer (`searchHotels`, `getHotelRates` cache-only, `getMedia`, `getFAQ`), web app scaffold, chat concierge wired to MCP |
| 4 | May 11 – 17 | Layer 2 booking (PMS adapter interface, CloudBeds + Nuitee/Derbysoft integration for rates), Stripe Connect onboarding for 5 pilot properties |
| 5 | May 18 – 24 | End-to-end booking flow live, payment → PMS write-back, confirmation email, zero-hallucination test, polish + demo prep |
| 5.5 | May 25 | **Memorial Day demo** |

Content Layer work (this spec) must complete in **Weeks 1-2**, or booking+payments get squeezed.

---

## Open Questions (blocking)

Must resolve before implementation starts:

1. **JSON folder storage location** — monorepo `packages/knowledge-graph/hotels/` vs separate `maison-hotels` repo vs S3-only from day 1. Asking team.
2. **Redis provider** — AWS ElastiCache (AWS-native, consistent) vs Upstash (serverless, faster to set up). Asking team.
3. **Python scraper repo name** — likely `agent-pipeline-tasks`, needs confirmation from Sandeep or Noel.
4. **MongoDB collection name** — `qa` (June 2025 docs) vs `qadump` (October 2025 docs). Needs confirmation from Sandeep.
5. **Change-detection threshold** — what `change_percentage` counts as "significant" for re-processing? Not in docs.
6. **JSON-LD preservation** — does the scraper's `remove_url_lines` strip `<script type="application/ld+json">`? Needs confirmation + patch if yes.
7. **Scraper reliability** — Beach View Hotel Clearwater crashes the whole pipeline today. Need skip-list support + health check before Week 1 scrape of all 100 properties.

---

## Related Documents

- **Parent:** [Maison.Travel POC](https://www.notion.so/3158b6104b1d80b99a20f357dc7227ec)
- **Sibling:** [Technical Spec — Infrastructure POC](https://www.notion.so/3448b6104b1d81d6a1dced978281c89d)
- **Referenced:**
  - [Maison Exchange PRD](https://www.notion.so/2608b6104b1d8024a70dccd713796560) — Phase 0 foundation
  - [KB Sync Design Doc](https://www.notion.so/2928b6104b1d8025ae5ff355227e22ef) — existing scraper pipeline spec
  - [maison-agent monorepo overview](https://www.notion.so/3418b6104b1d81029759d05039ce0f88)
  - [Maison.Travel POC Architecture Meeting April 17 2026](meeting summary in brain)

---

## Next Steps

1. **This week:** Review spec with Kim, Noel, Fredrik; resolve open questions
2. **Friday Apr 19:** Present V0 architecture at scheduled meeting
3. **Week 1 (Apr 20):** Start with Normalizer service stub + trigger existing scraper for all 100 East End properties
4. **Throughout:** Update spec as decisions land; keep it the single source of truth for Content Layer design
