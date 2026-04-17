---
status: failed
source_type: api
channel: maison-travel-v0-spec
source_id: api/articles/v0-content-layer-integration-with-existing-maison-infrastr-1776443484373.md
ingested_at: 2026-04-17T16:31:24.373Z
parsed_at: null
compiled_to: null
processed_at: null
retry_count: 1
last_error: The operation timed out.
compile_progress: null
---



# Integration with Existing Maison Infrastructure

> **Parent:** [V0 Content Layer — Master Architecture](./README.md)
> **Purpose:** Define exactly how V0 hooks into Maison's existing scraper, LLM service, databases, and operator console — without duplicating infrastructure or violating the TS/Python data boundary.

---

## Constraints From the Exploration Report

The pre-V0 exploration of the Maison codebase surfaced hard architectural rules that bound our design:

1. **TS/Python data ownership is strict**
   - Python owns: Pinecone, MongoDB, LLM service (`agent-llm-service`)
   - TS owns: Postgres, DynamoDB, S3
   - **No cross-boundary database access.** TS cannot query Mongo. Python cannot query Postgres directly.
   - Communication across the boundary: SQS events or HTTP calls to `agent-llm-service`.

2. **The scraper is not in the monorepo yet**
   - Lives in a separate Python repo (likely `agent-pipeline-tasks` — confirm with Sandeep)
   - Sandeep is currently consolidating repos into `maison-agent` (next week target)
   - Our design must work regardless of repo location

3. **Scraper output is free-text QA pairs, not structured data**
   - MongoDB `qadump` collection is the scraper's primary output
   - No schema.org extraction exists today — **V0's normalizer IS the gap-filler**

4. **The best hook point is Stage 3.5 (content_snapshots), not Stage 7**
   - QA pairs are LLM-paraphrased and lossy
   - Cleaned markdown with `<!-- SOURCE: url -->` annotations preserves structured signals
   - `content_snapshots` collection has the pre-QA content archive

5. **Existing packages must be reused, not duplicated**
   - `@maison-labs/database`, `@maison-labs/auth`, `@maison-labs/telemetry`, `@maison-labs/pubsub`
   - CLAUDE.md in the monorepo requires OTel spans on every service

6. **Scraper reliability is not-yet-operational today**
   - Noel is blocked on scraper infra this week
   - Beach View Hotel Clearwater crashes the entire pipeline
   - Client name hallucination being fixed today (pass canonical name at invocation)
   - Plan assumes scraper stabilizes by Week 1

---

## Integration Architecture

```
╔═══════════════════════════════════════════════════════════════════════╗
║  PYTHON (existing — unchanged)                                         ║
║  Lives in: agent-pipeline-tasks repo (pending rename/migration)        ║
║                                                                         ║
║  ┌──────────────────────────────────────────────────────────────┐      ║
║  │  main.py scrape-website --website-id X --client-name Y       │      ║
║  │                                                                │      ║
║  │  Stage 1: URL Discovery (run_url_discovery)                  │      ║
║  │  Stage 2: crawl4ai scrape (scrape_urls)                      │      ║
║  │  Stage 3: chunk_merged_markdown                              │      ║
║  │  Stage 3.5: content_snapshot_manager.create_content_snapshot │      ║
║  │       │                                                        │      ║
║  │       ├─── [EXISTING]: diff vs. previous → skip/proceed      │      ║
║  │       │                                                        │      ║
║  │       └─── [NEW]: emit SQS event to TS normalizer            │      ║
║  │            (~20-line Python PR — single action item)          │      ║
║  │       │                                                        │      ║
║  │  Stage 4: QA generation (generate_qa_pairs)                  │      ║
║  │  Stage 5: QA evaluation                                       │      ║
║  │  Stage 6: Embedding generation                                │      ║
║  │  Stage 7: qadump MongoDB insert                               │      ║
║  └──────────────────────────────────────────────────────────────┘      ║
║                                                                         ║
╚═════════════════╤═════════════════════════════════════════════════════╝
                  │
                  │ SQS message (JSON)
                  │
                  ▼
╔═══════════════════════════════════════════════════════════════════════╗
║  TS (new — lives in maison-agent monorepo)                             ║
║                                                                         ║
║  services/normalizer/ (new Lambda, SQS-triggered)                      ║
║                                                                         ║
║  ┌──────────────────────────────────────────────────────────────┐      ║
║  │  SQS message arrives with:                                    │      ║
║  │    { website_id, client_id, snapshot_id, mongo_collection,    │      ║
║  │      stage_3_5_timestamp }                                     │      ║
║  │                                                                │      ║
║  │  Step 1: Fetch markdown from MongoDB content_snapshots         │      ║
║  │          (via ONE-TIME cross-boundary call — see below)       │      ║
║  │                                                                │      ║
║  │  Step 2: Fetch Google Places data for enrichment              │      ║
║  │                                                                │      ║
║  │  Step 3: Normalize: LLM extract → 10 schemas                  │      ║
║  │          Call agent-llm-service via HTTP (Python, existing)   │      ║
║  │          Langfuse prompt: maison-travel/normalizer-v1          │      ║
║  │                                                                │      ║
║  │  Step 4: Validate against JSON Schema                         │      ║
║  │          Reject + alert if invalid                            │      ║
║  │                                                                │      ║
║  │  Step 5: Write JSON files to hotels/{slug}/data/*.json        │      ║
║  │          (Git commit or S3 depending on scale)                │      ║
║  │                                                                │      ║
║  │  Step 6: Upsert to Postgres                                   │      ║
║  │          Normalized rows + JSONB + tsvector                    │      ║
║  │                                                                │      ║
║  │  Step 7: Generate + store embeddings (pgvector, NEW store,    │      ║
║  │          separate from Pinecone chatbot)                      │      ║
║  │                                                                │      ║
║  │  Step 8: Emit media worker SQS events (one per image URL)     │      ║
║  │          Media worker handles the media pipeline              │      ║
║  │                                                                │      ║
║  │  Step 9: Invalidate Redis cache                               │      ║
║  │                                                                │      ║
║  │  Step 10: Write version to DynamoDB kb-version-history        │      ║
║  │           (reuse existing pattern)                            │      ║
║  └──────────────────────────────────────────────────────────────┘      ║
║                                                                         ║
╚═══════════════════════════════════════════════════════════════════════╝
```

---

## The Python Change — Exactly What Sandeep Needs

### File: `app/common/knowledge_sync/content_snapshot_manager.py`

### Change: After successful `create_content_snapshot()`, emit SQS event.

```python
# At the top of the file
import boto3
import os
import json

SQS = boto3.client("sqs", region_name=os.environ.get("AWS_REGION", "us-east-1"))
NORMALIZER_QUEUE_URL = os.environ.get("MAISON_TRAVEL_NORMALIZER_QUEUE_URL")

# Inside ContentSnapshotManager, after snapshot creation:
async def create_content_snapshot(self, website_id, scraped_content, discovered_urls):
    # ... existing code ...
    snapshot_id = await self._write_snapshot(website_id, scraped_content, discovered_urls)

    # NEW: emit event to normalizer (no-op if queue URL not set)
    if NORMALIZER_QUEUE_URL:
        try:
            SQS.send_message(
                QueueUrl=NORMALIZER_QUEUE_URL,
                MessageBody=json.dumps({
                    "version": 1,
                    "event": "content_snapshot_created",
                    "websiteId": str(website_id),
                    "clientId": str(client_id),              # from scrape context
                    "clientName": str(client_name),           # canonical, passed at invocation
                    "snapshotId": str(snapshot_id),
                    "mongoCollection": "content_snapshots",
                    "discoveredUrlCount": len(discovered_urls),
                    "contentLength": len(scraped_content),
                    "snapshottedAt": datetime.utcnow().isoformat() + "Z",
                }),
                MessageAttributes={
                    "eventType": {
                        "StringValue": "content_snapshot_created",
                        "DataType": "String",
                    },
                },
            )
        except Exception as e:
            # Don't fail the scrape if event emission fails — log and continue
            logger.warning(f"Failed to emit normalizer SQS event: {e}")

    return snapshot_id
```

### Change size: ~25 lines in one function. No new dependencies.

### Sandeep's action items:
1. Add environment variable `MAISON_TRAVEL_NORMALIZER_QUEUE_URL` (SQS URL)
2. Grant IAM permission for `sqs:SendMessage` to the pipeline-tasks ECS task role
3. Deploy the scraper with this change

### Backward compatibility: If `NORMALIZER_QUEUE_URL` env var is not set, the code no-ops. **Zero risk to existing functionality.**

---

## The Cross-Boundary MongoDB Fetch

The normalizer needs to fetch cleaned markdown from `content_snapshots`. This crosses the TS/Python data boundary — Python owns Mongo.

### Option A: Direct MongoDB access from TS (discouraged)
- Would violate the boundary
- Team would object
- Operational risk if Python changes Mongo schema

### Option B: Python API endpoint (preferred) ⭐
- Add a lightweight REST endpoint to `agent-llm-service` or `agent-server`:
  ```
  GET /api/kb/content-snapshots/:snapshotId
  → { website_id, scraped_content, discovered_urls, ... }
  ```
- TS normalizer calls this endpoint
- Auth: internal-only, via existing `internal_call_allowed` middleware

### Option C: Include markdown in SQS message
- Bulky for 50KB+ scrapes
- SQS has 256KB limit
- **Risk**: some hotels exceed limit — would fail silently

### Recommendation: **Option B** — 10-line endpoint addition to `agent-server`. Maintains boundary. Auditable. Versionable.

Sandeep's secondary action item: add this endpoint (small).

---

## Existing Packages We Reuse

### @maison-labs/database

Our new tables live in `packages/database/migrations/`:
- `hotels` table + `rooms`, `amenities`, `policies`, `offers`, `experiences`, `media_items`, `faqs`, `events`
- Auto-generated TypeScript types in `packages/database/src/tables/*.ts`
- Migration runner via `Makefile` targets (existing pattern)

Schema version tracking uses the same migration mechanism as existing tables.

### @maison-labs/database (DynamoDB tables)

Reuse the existing `kb-version-history` pattern from the chatbot:

```typescript
// Existing pattern for chatbot QA versions
{ PK: "{clientId}:{kbItemId}", SK: "v{version}", source: "website", ... }

// Our adaptation for hotel schemas
{ PK: "{clientId}:hotel:{slug}", SK: "v{version}", source: "normalizer", ... }
{ PK: "{clientId}:amenity:{slug}:{subtype}:{name}", SK: "v{version}", source: "normalizer", ... }
```

Same DynamoDB table, same access patterns. No new table.

### @maison-labs/auth

Every normalizer admin endpoint and operator-facing API uses:
- `getAuthContext()` for request auth
- `buildPermissionSet()` for RBAC
- Feature flags via existing feature-access helpers

For the operator console integration (V1), leverage existing permissions:
- `kb.read` → view hotel folder
- `kb.write` → edit via admin
- `kb.admin` → approve conflicts, merge changes

### @maison-labs/telemetry

**Required per CLAUDE.md.** Every normalizer operation wraps in OTel spans:
- Parent span: `normalizer.process_snapshot`
- Child spans: `normalizer.fetch_markdown`, `normalizer.llm_extract`, `normalizer.validate_schema`, `normalizer.write_json`, `normalizer.upsert_postgres`, `normalizer.generate_embeddings`
- `span.recordException` on any error
- Attributes: `client.id`, `website.id`, `snapshot.id`, `extraction.schema`, `llm.model`, `llm.latency_ms`

### @maison-labs/pubsub

SQS helpers already exist. We publish media events via:
```typescript
import { publish } from "@maison-labs/pubsub";
await publish({
  queueName: "maison-travel-media-normalizer",
  payload: { /* media event */ },
});
```

And subscribe the normalizer via the same helpers.

### @maison-labs/email-utils

Add `SCHEMA_NORMALIZER_REPORT` to the existing email template enum. Operator receives a weekly summary:
- Hotels processed
- Fields updated
- Conflicts requiring review
- Missing data flagged

### agent-llm-service (Python)

All LLM calls go through the existing service. **We do not instantiate our own OpenAI/Anthropic clients.** Reasons:
- Langfuse prompts (central prompt management)
- Cost tracking
- Rate limit management
- Existing billing tags

TS normalizer calls it via HTTP:
```
POST https://internal-agent-server/llm/extract
Body: { prompt_id, inputs, schema (JSON Schema for validation) }
```

Prompts we need to add to Langfuse:
- `maison-travel/normalizer-hotel-v1`
- `maison-travel/normalizer-rooms-v1`
- `maison-travel/normalizer-amenities-v1`
- `maison-travel/normalizer-policies-v1`
- etc., one per schema

### Embeddings

Use the existing embedding endpoint in `agent-llm-service`:
```
POST https://internal-agent-server/llm/embed
Body: { texts: [...], model: "text-embedding-3-small" }
```

1536-dim embeddings. Stored in pgvector (NEW, not Pinecone — our own store for the travel KG).

For **multimodal (CLIP)** embeddings, we add Cohere Embed v3 as a new call in `agent-llm-service`:
```
POST https://internal-agent-server/llm/embed-multimodal
Body: { imageUrl | text, model: "cohere-embed-v3" }
```

Cohere API key lives in AWS Secrets Manager, accessed by the Python service.

### AWS Secrets Manager

Per CLAUDE.md, never `.env` in deployed code. Secrets:
- `maison/travel/cohere-api-key`
- `maison/travel/stripe-platform-account-key`
- Per-hotel: `maison/travel/pms/{hotelSlug}/{pmsType}`
- Per-hotel: `maison/travel/stripe/{hotelSlug}` (Connect account tokens)

Local dev: `.local/credentials.env` for developer-specific overrides.

---

## New Monorepo Structure

Here's what we add to `maison-agent`:

```
maison-agent/
├── apps/
│   ├── api/                    # existing
│   ├── chat-window/            # existing
│   ├── console/                # existing (V1 integration point)
│   ├── travel/                 # NEW (Week 3+) — Next.js web app for maison.travel
│   └── exchange-api/           # NEW — MCP/A2A server exposing searchHotels, getRates, etc.
│
├── services/
│   ├── normalizer/             # NEW — SQS consumer, LLM extraction, JSON + Postgres writer
│   ├── media-worker/           # NEW — SQS consumer for image pipeline
│   └── event-sync/             # NEW — daily Ticketmaster sync cron
│
├── packages/
│   ├── knowledge-graph/        # NEW
│   │   ├── schemas/            # JSON Schema files (one per schema type)
│   │   ├── src/types.ts        # TypeScript types (generated from schemas)
│   │   ├── src/validator.ts    # JSON Schema validator
│   │   └── src/client.ts       # Read/write API for hotel folders
│   │
│   ├── pms-adapters/           # NEW (Layer 2, Week 4+) — CloudBeds, Muse, etc.
│   ├── payments/               # NEW (Layer 3, Week 5+) — Stripe Connect
│   ├── auth/                   # existing
│   ├── database/               # existing — ADD migrations for new tables
│   ├── telemetry/              # existing
│   ├── pubsub/                 # existing
│   └── email-utils/            # existing — ADD SCHEMA_NORMALIZER_REPORT enum
│
├── infra/
│   ├── cdk/                    # existing — ADD stacks for normalizer, media-worker, RDS extensions
│   └── config/*.json           # existing
│
└── hotels/                     # NEW (V0 location, may move to S3 at scale)
    ├── baron-s-cove-sag-harbor/
    │   ├── data/
    │   ├── markdown/
    │   ├── media/
    │   ├── provenance/
    │   ├── skills/
    │   ├── tools/
    │   └── CLAUDE.md
    ├── gurneys-montauk/
    └── ... (98 more East End properties)
```

---

## Postgres Extensions & New Tables

Migrations to add (`packages/database/migrations/`):

### Extensions

```sql
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pgvector;
CREATE EXTENSION IF NOT EXISTS pg_trgm;  -- for fuzzy text matching
```

### New tables (one per schema type)

```sql
CREATE TABLE hotels (
  id                TEXT PRIMARY KEY,         -- "maison:hotel:baron-s-cove-sag-harbor"
  client_id         UUID REFERENCES clients(id),
  slug              TEXT UNIQUE NOT NULL,
  name              TEXT NOT NULL,
  area              TEXT,
  sub_area          TEXT,
  geo               GEOMETRY(POINT, 4326),     -- PostGIS
  price_tier        TEXT,
  vibe_primary      TEXT,
  character_tags    TEXT[],
  quality_score     REAL,
  content_status    TEXT,
  hero_media_id     TEXT,
  maison_client     BOOLEAN DEFAULT FALSE,
  pms_type          TEXT,
  pms_property_id   TEXT,
  stripe_account_id TEXT,

  text_search       TSVECTOR GENERATED ALWAYS AS (
                      to_tsvector('english',
                        COALESCE(name, '') || ' ' ||
                        COALESCE(description, '') || ' ' ||
                        COALESCE(array_to_string(character_tags, ' '), '')
                      )) STORED,

  semantic_vec      vector(1536),               -- OpenAI text-embedding-3-small

  jsonb_blob        JSONB NOT NULL,             -- full Hotel schema
  sync_hash         TEXT NOT NULL,              -- SHA-256 of JSON file
  sync_version      INT DEFAULT 1,

  created_at        TIMESTAMP DEFAULT NOW(),
  updated_at        TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_hotels_geo        ON hotels USING GIST (geo);
CREATE INDEX idx_hotels_area       ON hotels(area, sub_area);
CREATE INDEX idx_hotels_vibe       ON hotels(vibe_primary);
CREATE INDEX idx_hotels_tags       ON hotels USING GIN (character_tags);
CREATE INDEX idx_hotels_text       ON hotels USING GIN (text_search);
CREATE INDEX idx_hotels_semantic   ON hotels USING hnsw (semantic_vec vector_cosine_ops);
CREATE INDEX idx_hotels_client     ON hotels(client_id);
```

Similar tables for `rooms`, `amenities`, `policies`, `offers`, `experiences`, `media_items`, `faqs`, `events`, `rate_cache`.

All with `jsonb_blob` for the full schema + extracted fields for indexed filtering.

---

## SQS Queues to Provision

Via CDK in `infra/cdk/stacks/travel-normalizer-stack.ts`:

```typescript
// 1. Main normalizer queue — receives events from Python scraper
const normalizerQueue = new Queue(this, "MaisonTravelNormalizerQueue", {
  queueName: "maison-travel-normalizer",
  visibilityTimeout: Duration.seconds(300),   // 5 min max per normalization
  retentionPeriod: Duration.days(14),
  deadLetterQueue: {
    queue: normalizerDLQ,
    maxReceiveCount: 3,
  },
});

// 2. Media worker queue — receives events for image processing
const mediaQueue = new Queue(this, "MaisonTravelMediaQueue", {
  queueName: "maison-travel-media",
  visibilityTimeout: Duration.seconds(120),
  retentionPeriod: Duration.days(14),
  deadLetterQueue: {
    queue: mediaDLQ,
    maxReceiveCount: 3,
  },
});

// 3. EXA diff queue — daily cron emits events here for gap-fill
const exaQueue = new Queue(this, "MaisonTravelExaQueue", {
  queueName: "maison-travel-exa-diff",
  // ...
});
```

Python scraper's env var `MAISON_TRAVEL_NORMALIZER_QUEUE_URL` points to queue #1.

---

## Operator Console Integration

### V0 (minimal)
- Read-only view of hotel folder in console
- Lists hotels, click → shows schemas
- No editing in V0

### V1 (admin)
- Edit forms per schema (A2UI-rendered from JSON Schema)
- Media uploader
- Conflict resolution UI
- Diff viewer for proposed changes
- Re-scrape button
- PMS onboarding wizard
- Stripe Connect onboarding

### Adding KB Explorer panels
The existing KB Explorer PRD already defines structure for the chatbot's KB. Our hotel folders appear as a new section:
- `/knowledge/hotels/:slug` route
- Sources tab (our provenance folder contents)
- Schema tabs (one per schema type)
- Version history (from DynamoDB)

---

## Coexistence with Chatbot QA Pipeline

The existing chatbot QA pipeline is **untouched**. It continues:
- Running the scraper's Stage 4-7 (QA generation → Mongo qadump → Pinecone embeddings)
- Serving the chatbot widget queries via Python
- Using its own Pinecone + MongoDB stack

Our new travel KG pipeline is **parallel**:
- Stage 3.5 SQS fan-out (one consumer each)
- Our normalizer builds structured JSON + Postgres + pgvector
- MCP tools serve `apps/travel` + external AI platforms

**Zero disruption to existing production chatbot.**

---

## Deployment Plan

### Week 1

1. **Python PR**: Stage 3.5 SQS emit + internal API endpoint (Sandeep, ~2 hours)
2. **Postgres migrations**: new tables, extensions, indexes (new engineer, ~1 day)
3. **SQS queue + Lambda scaffold**: normalizer Lambda empty stub, receives events, logs (~1 day)
4. **JSON Schema definitions**: commit 10 JSON Schemas to `packages/knowledge-graph/schemas/` (~1 day)
5. **Trigger Maison scraper for all 100 East End properties** — generate content snapshots ahead of normalizer development

### Week 2

1. **Normalizer LLM extraction**: Langfuse prompts, `agent-llm-service` internal endpoints (~2 days)
2. **Normalizer write path**: JSON files + Postgres upsert + embeddings (~2 days)
3. **Media worker scaffold**: SQS + image download + S3 upload (~1 day)

### Week 3

1. **Media worker full pipeline**: Cohere embeddings, Claude captions, derivatives, CDN (~3 days)
2. **MCP exchange-api stub**: searchHotels with geo + filter + semantic (~2 days)

### Week 4+

- Layer 2 (PMS adapters, rates cache)
- Layer 3 (Stripe Connect)
- Layer 4 (web app, admin console integration)

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Scraper unreliable, Beach View crashes | Skip-list support in normalizer; nightly health check reports failed hotels |
| Python team unable to ship SQS PR in Week 1 | Fallback: TS normalizer polls MongoDB `content_snapshots` directly (violates boundary, but unblocks) — treat as last resort |
| LLM extraction quality insufficient for confidence ≥0.8 | Iterate on Langfuse prompts; add human-verify step for low-confidence fields |
| Cohere API rate limits | Batch requests (up to 96 images per batch); fallback to OpenAI CLIP if sustained issue |
| Postgres doesn't scale in POC | Unlikely at 100 hotels; if becomes issue, add read replica |
| Git + hotels/ folder conflicts | Keep normalizer writes atomic; admins queue their edits through the console (V1) |

---

## Open Questions Specific to Integration

1. **Scraper repo name** (blocking for SQS PR) — likely `agent-pipeline-tasks`. Confirm with Sandeep.
2. **MongoDB collection name** (blocking for fetch endpoint) — `qa` vs `qadump`. Confirm with Sandeep.
3. **JSON-LD preservation** — does `remove_url_lines` strip `<script type="application/ld+json">`? If yes, ask for a preservation patch (free schema.org data).
4. **Change-detection threshold** — what `change_percentage` triggers snapshot → SQS emit? Current doc doesn't say. Assume 0% (always emit) for V0; tune later.
5. **Client name canonicalization** — today's hallucination fix passes canonical name at invocation. Confirm this is live by Week 1 so our normalizer can trust the `clientName` field in SQS messages.
6. **Scraper deployment location** — still in legacy repo or migrated to monorepo? Affects where SQS PR goes.

---

## Success Criteria for Integration

✅ Python scraper runs untouched (beyond 20-line PR)
✅ Normalizer receives events via SQS within seconds of Stage 3.5 completion
✅ Hotel JSON files appear in `hotels/{slug}/` folder within 60 seconds of snapshot
✅ Postgres + embeddings updated within 90 seconds of snapshot
✅ MCP tools can query hotels end-to-end within 10 minutes of initial scrape
✅ Zero changes to existing chatbot QA pipeline
✅ No violation of TS/Python data boundary
✅ All OTel spans present on normalizer operations
✅ Auth/permissions respected on all operator-facing endpoints
✅ Existing packages used, no duplicates

---

## Related Documents

- [Schema Specifications](./schemas.md) — what the normalizer produces
- [Storage Architecture](./storage.md) — where the output goes
- [Dockerized Client Model](./dockerized-client.md) — the JSON folder layout
- [Media Layer](./media-layer.md) — separate media worker that receives fan-out events
- [Data Sources](./data-sources.md) — what sources the normalizer pulls from
