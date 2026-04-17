---
title: V0 Content Layer — Session Handoff (2026-04-17)
author: ai
created_at: 2026-04-17T17:08:38.800Z
last_ai_edit: 2026-04-17T17:08:38.800Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/api/articles/v0-content-layer-session-handoff-april-17-2026-1776445637154.md]]"
tags:
  - maison
  - maison-travel
  - v0-content-layer
  - knowledge-graph
  - schemas
  - storage
  - media
  - integration
  - handoff
  - 2026-04-17
  - memorial-day
  - poc
  - schemas-specification
  - postgres-pgvector
---

# V0 Content Layer — Session Handoff (2026-04-17)

Technical specification for Maison.Travel's V0 Content Layer, including 10 schemas, storage architecture, data sources, media pipeline, and integration with existing systems. The session concluded with key decisions on schema design, media processing, and storage, along with next steps for implementation.

## Key Concepts

- V0 Content Layer architecture with 3-layer system,- 10 content schemas (Hotel, Room, Amenity, etc.) with JSON-LD examples,- Storage solution: JSON-first with Postgres materialized view and Redis cache,- Media pipeline using Cohere Embed v3 and Claude 3.5 Sonnet,- Integration via SQS hook in Python scraper and TypeScript normalizer service,- Schema versioning using `kb-version-history` DynamoDB pattern

## Details

## V0 Content Layer — Session Handoff (2026-04-17)

### Overview
The V0 Content Layer for Maison.Travel was fully specified in this session, with all artifacts committed, pushed, and ingested into the system. The specification includes 10 content schemas, storage architecture, data sources, media pipeline, and integration with existing systems.

### Key Components

#### Location
- Git branch: `feat/v0-content-layer-spec` on `origin` (brain repo)
- Folder: `docs/specs/v0-content-layer/` (7 markdown files)
- Ingested to brain: all 7 via `/ingest`
- Notion: User's other session is pushing these to Notion docs and integrating Kim's PRD-000 through PRD-006

#### The 7 Docs
1. `README.md` - Master architecture, 3-layer system, 10-schema summary, timeline (Memorial Day May 25, 2026), open questions
2. `schemas.md` - 10 schemas with full JSON-LD mocks using Baron's Cove Sag Harbor
3. `storage.md` - 7-option analysis with Option G chosen: JSON-first + Postgres + Redis
4. `data-sources.md` - V0 source matrix and V1 additions
5. `dockerized-client.md` - Per-hotel folder layout with Baron's Cove mock
6. `media-layer.md` - Image/video/360° tour pipeline
7. `integration.md` - SQS hook, TypeScript normalizer service, package reuse

#### Locked Decisions
| Area | Decision |
|------|------|
| Schemas | 10 schemas with schema.org + `maison:` extensions |
| Media | Single schema with `mediaType` discriminator |
| CLIP provider | Cohere Embed v3 (V0), OpenAI CLIP optional (V1) |
| VLM captioner | Claude 3.5 Sonnet |
| Event source | Ticketmaster Discovery API (V0), paid V1 |
| Tour 360° | Scrape Matterport URLs (V0), supplier uploads V1 |
| Vector store | Pinecone for chatbot QA, pgvector for travel KG |
| Normalizer | TypeScript in `services/normalizer/` |
| Integration | SQS event from Python Stage 3.5 |
| Storage | JSON-first + Postgres materialized view + Redis |
| Schema versioning | Reuse `kb-version-history` DynamoDB pattern |

#### Open Questions
1. JSON folder storage location (monorepo vs separate repo vs S3)
2. Redis provider (AWS ElastiCache vs Upstash)
3. Python scraper repo name
4. MongoDB collection name
5. Change-detection threshold
6. JSON-LD preservation
7. Scraper reliability for Beach View Hotel Clearwater

#### Critical Integration Facts
- Python scraper output is free-text QA pairs
- Best hook point is Stage 3.5 `content_snapshots`
- TS/Python data boundary is strict
- Scraper lives in separate Python repo
- `kb-version-history` DynamoDB table exists
- `agent-llm-service` exposes HTTP endpoints

#### Next Steps
1. Friday Apr 19 - Present V0 spec to Kim, Noel, Fredrik
2. Resolve 7 open questions
3. Week 1 (Apr 20) - Python SQS PR + normalizer scaffold + trigger scraper
4. Week 2 - Full normalizer extraction + media worker
5. Week 3-5 - MCP tools, Layer 2 booking, Stripe, end-to-end booking flow
6. Memorial Day (May 25) - Live conversational booking demo

### Related
- Meeting notes: `maison-poc-architecture-meeting-april-17-2026`
- Action items: `maison-poc-action-items-april-17-2026`
- Kim's PRDs at `maison-agent/docs/prd-maison-agent-os/` (PRD-000 through PRD-006)
- Parent Notion page: Maison.Travel PoC (3158b6104b1d80b99a20f357dc7227ec)

### Tags
maison, maison-travel, v0-content-layer, knowledge-graph, schemas, storage, media, integration, handoff, 2026-04-17, memorial-day, poc, schemas-specification, postgres-pgvector

## Related

[[maison-agent/docs/prd-maison-agent-os/]],[[Maison.Travel PoC (3158b6104b1d80b99a20f357dc7227ec)]],[[maison-poc-architecture-meeting-april-17-2026]],[[maison-poc-action-items-april-17-2026]],[[storage.md]],[[data-sources.md]],[[dockerized-client.md]],[[media-layer.md]],[[integration.md]],[[schemas.md]],[[README.md]]
