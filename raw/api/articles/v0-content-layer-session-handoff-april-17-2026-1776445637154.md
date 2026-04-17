---
status: processed
source_type: api
channel: maison-travel-session-handoff
source_id: api/articles/v0-content-layer-session-handoff-april-17-2026-1776445637154.md
ingested_at: 2026-04-17T17:07:17.154Z
parsed_at: null
compiled_to: "[[V0 Content Layer — Session Handoff (2026-04-17)]]"
processed_at: 2026-04-17T17:08:38.800Z
retry_count: 0
last_error: null
compile_progress: null
---



# V0 Content Layer — Session Handoff (2026-04-17)

Complete technical spec for Maison.Travel V0 Content Layer produced in this session. All artifacts are committed, pushed, and ingested.

## Location

- **Git branch:** `feat/v0-content-layer-spec` on `origin` (brain repo)
- **Folder:** `docs/specs/v0-content-layer/` (7 markdown files)
- **Ingested to brain:** all 7 via `/ingest` — queryable via `brain_query`
- **Notion:** user's other session is pushing these to Notion docs + integrating Kim's PRD-000 through PRD-006 from `maison-agent/docs/prd-maison-agent-os/`

## The 7 Docs

1. `README.md` — Master architecture, 3-layer system, 10-schema summary, timeline (Memorial Day May 25, 2026), open questions
2. `schemas.md` — All 10 schemas (Hotel, Room, Amenity, Policy, Offer, Experience, Media, Rates, FAQ, Event) with full JSON-LD mocks using Baron's Cove Sag Harbor, field dictionaries, sub-type specs (Pool/Restaurant/Pet/Bar/Gym/Spa/Conference/Parking/Accessibility)
3. `storage.md` — 7-option analysis. **Option G chosen**: JSON-first source of truth + Postgres materialized view (JSONB + PostGIS + pgvector + tsvector) + Redis cache. Arguments for Kim, Noel, Fredrik. Scale path 100 → 500K hotels.
4. `data-sources.md` — Per-schema V0 source matrix (existing Maison scraper + Google Places + EXA + Ticketmaster), V1 additions (Preferred CMS + operator admin + paid event APIs). Confidence scoring, freshness policies, fallback cascade.
5. `dockerized-client.md` — Per-hotel folder layout (`hotels/{slug}/` with data/markdown/media/provenance/skills/tools/.meta), complete Baron's Cove mock (~800KB per hotel, 100 hotels = 80MB in Git).
6. `media-layer.md` — Image/video/360° tour pipeline. Cohere Embed v3 multimodal (CLIP), Claude 3.5 Sonnet captions, S3 + CloudFront, carousel UX for chat. Full pipeline steps 1-12.
7. `integration.md` — SQS hook at Python scraper Stage 3.5 (~20-line Python PR for Sandeep), TypeScript normalizer service, existing package reuse (`@maison-labs/database`, `/auth`, `/telemetry`, `/pubsub`), TS/Python data boundary respected.

## Locked Decisions

| Area | Decision |
|------|----------|
| Schemas | 10 schemas, schema.org + `maison:` extensions |
| Media | Single schema with `mediaType` discriminator (image/video/tour_360) |
| CLIP provider | Cohere Embed v3 multimodal (V0), OpenAI CLIP optional V1 |
| VLM captioner | Claude 3.5 Sonnet |
| Event source | Ticketmaster Discovery API (V0), paid V1 |
| Tour 360° | Scrape Matterport URLs (V0), supplier uploads V1 |
| Vector store | Hybrid — Pinecone stays for chatbot QA, pgvector for travel KG |
| Normalizer | TypeScript, lives in `services/normalizer/` |
| Integration | SQS event from Python Stage 3.5 |
| Storage | JSON-first + Postgres materialized view + Redis |
| Schema versioning | Reuse `kb-version-history` DynamoDB pattern |

## Open Questions Needing Team Input

1. JSON folder storage location — monorepo vs separate repo vs S3 (3 options documented)
2. Redis provider — AWS ElastiCache vs Upstash
3. Python scraper repo name — likely `agent-pipeline-tasks`, confirm with Sandeep
4. MongoDB collection — `qa` (old docs) vs `qadump` (new docs)
5. Change-detection threshold — what % change triggers re-process
6. JSON-LD preservation — does `remove_url_lines` strip `<script type="application/ld+json">`? Ask Sandeep to preserve.
7. Scraper reliability — Beach View Hotel Clearwater crashes pipeline; need skip-list support before Week 1 scrape of 100 properties

## Critical Integration Facts from Maison Codebase Exploration

- Python scraper output is **free-text QA pairs** (not structured) — V0 normalizer fills this gap
- Best hook point is **Stage 3.5 `content_snapshots`** (not Stage 7 QA pairs — lossy)
- **TS/Python data boundary is strict**: Python owns Pinecone + MongoDB, TS owns Postgres + DynamoDB + S3
- Scraper lives in separate Python repo (likely `agent-pipeline-tasks`), migration to monorepo in progress
- `kb-version-history` DynamoDB table exists — reuse pattern for our schema versioning
- `agent-llm-service` (Python) exposes HTTP endpoints for LLM + embeddings — reuse, don't duplicate

## Next Steps

1. Friday Apr 19 — present V0 spec to Kim, Noel, Fredrik
2. Resolve 7 open questions
3. Week 1 (Apr 20) — Python SQS PR + normalizer scaffold + trigger scraper on all 100 East End properties
4. Week 2 — full normalizer extraction + media worker
5. Week 3-5 — MCP tools, Layer 2 booking, Stripe, end-to-end booking flow
6. Memorial Day (May 25) — live conversational booking demo

## Related

- Meeting notes: `maison-poc-architecture-meeting-april-17-2026`
- Action items: `maison-poc-action-items-april-17-2026`
- Kim's PRDs at `maison-agent/docs/prd-maison-agent-os/` (PRD-000 through PRD-006) — the other session is integrating these with our V0 spec
- Parent Notion page: Maison.Travel PoC (3158b6104b1d80b99a20f357dc7227ec)

## Tags
maison, maison-travel, v0-content-layer, knowledge-graph, schemas, storage, media, integration, handoff, 2026-04-17, memorial-day, poc, schemas-specification, postgres-pgvector
