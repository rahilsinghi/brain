---
status: pending
source_type: api
source_id: maison-poc-action-items-2026-04-17
ingested_at: 2026-04-17T00:00:00Z
parsed_at: 2026-04-17T00:00:00Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# Maison.Travel POC — Action Items & Sprint Plan (April 17, 2026)

**Source meeting:** [[Maison.Travel POC Architecture Meeting April 17 2026]]
**Hard deadline:** Memorial Day (May 25, 2026)
**POC goal:** Conversational booking experience for East End hotels (100 properties)

## Rahil's Next Tasks (Immediate)

### 1. Revise Architecture Document
- Expand the Content Layer section
- Define **V0** (surface-level publicly available data): scraper output, Places API, Google reviews/photos
- Define **V1** (integrated, dynamic data): PMS, CMS feeds, Preferred headless CMS
- Decide on schemas per concept: amenity (gym/restaurant/conference), rates, room types, FAQ, events, offers
- Specify ingestion pipeline per data source
- Specify knowledge graph node types and relationships

### 2. Trigger East End Scrape
- Run existing Maison ingestion pipeline on all ~100 East End properties
- Learn the pipeline while doing so (not building from scratch)
- Output becomes baseline V0 data for POC

### 3. Schema-First Design
- Critical insight from Kim: "the actual generation of this stuff is like, once you have six or seven of these schemas written out in great detail, you just give it to Ultron/Hermes and go to bed and it's done in the morning"
- Deliverable: 6-7 JSON schemas covering the primary hotel data concepts
- Model after Hermes / KELO / Claude Code folder structures

## Fredrik's Tasks

- Create corporate EXA account (the search API Perplexity uses)
- Invite Rahil, Kim, Noel to the EXA org account
- Continue architecting agent workflows (hydrates skills folder per Kim's dockerized-client model)

## Sandeep's Tasks

- Deploy scraper and ingestion pipeline to the monorepo (currently not there)
- Website sync / diffing infrastructure at scale — "Sandeep-level engineering"

## Architecture Decisions Locked

| Decision | Resolution |
|----------|------------|
| Full-ownership vs lean content | **Hybrid** — scraper baseline + EXA evaluation |
| Data format | **JSON-LD, schema.org compliant**, uniform naming across hotels |
| Source of truth | **JSON files**, markdown generated from JSON (not reverse) |
| Agent pattern | **Dockerized client** per hotel (Hermes/KELO model) |
| Content assumption | Don't assume operators fill gaps — do heavy lifting from public data |
| Ingestion vs IP | **IP is not ingestion** — it's what we do with the data |

## POC Layer Plan

### Layer 1: Content / Knowledge Graph
- V0: scraped + EXA + public APIs
- V1 (later): CMS integrations, PMS, operator admin
- Schemas grounded in JSON to prevent LLM context drift
- Per-hotel "dockerized client" folder structure

### Layer 2: MCP Tools
- `search_hotel` — query the KB
- `get_rates` — PMS (Derbysoft) primary, third-party fallback
- `book_offer` — booking execution

### Layer 3: Payments
- Stripe integration

## Critical Timeboxing Note

Noel flagged: timebox each layer. Don't spend 4 weeks on content and leave booking hanging.

Fredrik pushback: Rahil's "2-3 weeks for data + read MCP" should be "two days" — booking execution deserves more time.

Agreed: get end-to-end flow working first, then deepen content layer.

## Next Meeting

Friday (April 19, 2026) — Rahil presents revised architecture + V0/V1 schemas

## Tags
maison, poc, action-items, sprint-plan, 2026-04-17, memorial-day, east-end, v0-v1, schemas, rahil-tasks, fredrik-tasks, sandeep-tasks
