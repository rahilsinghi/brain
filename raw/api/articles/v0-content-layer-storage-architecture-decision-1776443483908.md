---
status: failed
source_type: api
channel: maison-travel-v0-spec
source_id: api/articles/v0-content-layer-storage-architecture-decision-1776443483908.md
ingested_at: 2026-04-17T16:31:23.908Z
parsed_at: null
compiled_to: null
processed_at: null
retry_count: 1
last_error: The operation timed out.
compile_progress: null
---



# Storage Architecture Decision

> **Parent:** [V0 Content Layer — Master Architecture](./README.md)
> **Purpose:** Evaluate all viable storage options, present pros/cons, and argue for the recommendation that serves both POC and scale to 500K+ hotels.

---

## The Decision to Make

Where does the Maison.Travel knowledge graph data actually live, and how do we serve all query patterns at speed without creating an unmaintainable multi-system mess?

The answer must satisfy conflicting goals:
- **Kim**: JSON as source of truth. Agents reason over per-hotel folders. Markdown generated from JSON, never reverse.
- **Noel**: Don't derail the POC on storage architecture. Keep engineering lean. Avoid systems we'll have to rip out.
- **Fredrik**: Scale to every hotel in the world. Global concurrency. Operable by any AI model.
- **The architecture**: Must respect the existing TS/Python data boundary (TS owns Postgres + S3 + DynamoDB; Python owns Pinecone + MongoDB).

---

## What We Need to Optimize For

| Requirement | Why |
|-------------|-----|
| **Source of truth clarity** | One place data lives. No "which copy is right" debates. |
| **LLM/agent operability** | Any model reads, reasons, writes. No SQL literacy required. |
| **Composite query support** | "Pet-friendly + pool + under $500 + near Taylor Swift concert" |
| **Semantic search** | "Romantic boutique with beach vibe" |
| **Visual search** | "Sunset pool photo" (CLIP) |
| **Geospatial queries** | "Within 10 miles of X" |
| **Full-text search** | "Hotel with rainfall shower" |
| **Temporal joins** | "Available on Apr 24, near Taylor Swift concert" |
| **Write throughput** | V0: 100 hotels × 9 schemas → ~900 objects. V1+: 500K × 9 = 4.5M objects. |
| **Update patterns** | Diff-based, daily/hourly, operator real-time |
| **Freshness + versioning** | Audit trail, rollback, "when was this field verified?" |
| **Operations burden** | Solo engineer → small team. No exotic systems. |
| **Cost at scale** | AWS-native preferred (Maison's existing stack) |
| **Migration flexibility** | Switch vector stores / add graph DB later without re-ingestion |

---

## Options Considered

Seven real options. Evaluated honestly, including the ones I'm not recommending.

### Option A — JSON Files Only (Kim's pure form)

**What it is:** Every hotel is a directory of JSON files. Queries scan directories. No database. No indexes beyond filesystem.

| Pros | Cons |
|------|------|
| Single source of truth — zero sync issues | **No composite queries at scale.** Filter + geo + semantic at once is impossible without scanning every file. |
| Git-versionable, full audit trail | No geospatial queries without custom indexing |
| Human-readable, human-editable | No semantic search — would require loading every embedding into memory |
| Perfect dockerized client model (Kim's vision) | No graph traversal |
| LLM-native (just `cat hotels/{slug}/data/*.json`) | Query latency unacceptable past ~1K hotels |
| Zero ops burden | Concurrent writes tricky (file locking, Git conflicts) |
| Every field has provenance next to it | No SQL filtering — "hotels with pool AND pet-friendly" scans everything |

**Scale ceiling:** ~1,000 hotels. Breaks at 10K.

**Verdict:** Perfect for V0 POC, **fatal at scale**. Unacceptable even for our 500-hotel near-term target if composite queries matter.

---

### Option B — Postgres Only (JSONB-heavy)

**What it is:** Every entity is a Postgres row. Full JSON in a JSONB column. PostGIS for geo. pgvector extension for embeddings. No JSON files on disk.

| Pros | Cons |
|------|------|
| Mature, reliable, team already runs RDS | **Loses Kim's dockerized client vision** — no per-hotel filesystem |
| PostGIS + pgvector + tsvector all native | No Git-like versioning without custom `history` tables |
| Already in Maison's AWS stack | Schema migrations can be painful at scale |
| JSONB gives schema flexibility | Agents can't "cd into a hotel's folder" and explore |
| Scales to 100M+ rows | Provenance tracking requires explicit schema |
| ACID transactions | No human-editable workflow |
| Composite queries trivially fast | |

**Scale ceiling:** 10M+ rows per table (with indexes). Horizontal scaling via sharding at 100M+.

**Verdict:** Scales well, but **loses Kim's architectural vision**. Agents lose their filesystem. Not our answer alone.

---

### Option C — Neo4j / Dedicated Graph DB

**What it is:** A true graph database with Cypher query language. Nodes = hotels/amenities/etc. Edges = `NEAR`, `PREFERRED_PARTNER`, `BOOKED_WITH`, etc. Native graph traversal.

| Pros | Cons |
|------|------|
| Graph traversal is first-class | Another system to operate (alongside Postgres) |
| Cypher is expressive for multi-hop queries | Team has no experience, steep learning curve |
| Relationships are primary, not joined | Weaker vector search |
| Good for recommendations ("guests like you booked") | Not JSON-native |
| | Expensive at scale (licensed) |
| | Our graph is mostly 1-2 hops — overkill |

**Reality check:** Our "graph" is Hotel→Amenity (1-hop), Hotel→Experience (1-hop via geo), Experience→Event (1-hop via geo). Three-hop traversals are rare in travel queries. **Postgres foreign keys + occasional recursive CTEs handle this fine.**

**Verdict:** Solves a problem we don't have. Adds ops cost and team learning curve. **Not recommended.**

---

### Option D — TerminusDB (JSON-LD Native)

**What it is:** A database designed around JSON-LD and schema.org. Git-like versioning built in. Schema validation native. Designed for exactly the use case we're describing.

| Pros | Cons |
|------|------|
| JSON-LD native — schema.org out of the box | Small community |
| Git-like branch/commit/merge on data | Operational unknowns |
| Schema validation built-in | Team has zero experience |
| **Conceptually perfect fit** | Less tooling ecosystem |
| | Risky to bet POC on |
| | Unclear horizontal scale story |

**Verdict:** Perfect on paper, **risky in practice**. Worth a research spike later, not betting the Memorial Day deadline on it.

---

### Option E — ElasticSearch / OpenSearch + JSON Files

**What it is:** JSON files as source of truth. ElasticSearch index for all query patterns (text, geo, semi-structured).

| Pros | Cons |
|------|------|
| Best-in-class full-text search | **Not a system of record** — eventual consistency issues |
| Geospatial built-in | Expensive at scale (memory-heavy) |
| Vector search in 8.x+ | Operational overhead significant |
| JSON-native | Schema evolution has gotchas |
| | Another AWS service (or self-hosted) to run |

**Verdict:** **Layer in later** if text search becomes a bottleneck. Not primary.

---

### Option F — DuckDB + JSON Files

**What it is:** JSON files plus DuckDB (in-process analytical DB) for queries. Can read JSON directly with SQL. No server.

| Pros | Cons |
|------|------|
| Query JSON directly with SQL | **Single-process** — not a DB server |
| Incredibly fast analytical queries | Concurrent writes tricky |
| No separate DB infra to manage | Weaker geospatial (extension exists but young) |
| Great for embedded/local queries | No built-in vector search |
| | Not for production serving at scale |

**Verdict:** **Brilliant for local development + offline analytics jobs**. Not primary store.

---

### Option G — Hybrid: JSON-as-source + Postgres Materialized View + Redis Cache ⭐

**What it is:**

```
┌─────────────────────────────────────────────────────┐
│  SOURCE OF TRUTH: Per-hotel JSON folders            │
│  hotels/{slug}/data/*.json                          │
│  Git-versioned (V0, 100 hotels) or S3-backed (V1+)  │
│  Full provenance per field                          │
│  Dockerized client filesystem per hotel             │
└────────────────────┬────────────────────────────────┘
                     │ sync on hash change (idempotent)
                     ▼
┌─────────────────────────────────────────────────────┐
│  MATERIALIZED VIEW: Postgres (AWS RDS)               │
│  - Normalized tables per schema (hotels, rooms,      │
│    amenities, policies, offers, experiences,         │
│    media, events)                                    │
│  - JSONB column in each row: full schema blob        │
│  - PostGIS spatial index (geo queries)               │
│  - pgvector index (semantic search) — NEW, not       │
│    shared with chatbot Pinecone                      │
│  - tsvector GIN index (full-text)                    │
│  - Composite B-tree indexes on common filter combos  │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│  HOT CACHE: Redis (AWS ElastiCache or Upstash)       │
│  - Rates: rate:{hotelId}:{ci}:{co}:{guests} (TTL)    │
│  - Hot search results (60-second cache)              │
│  - Agent session state                               │
│  - Event index (for composite queries, refreshed     │
│    nightly)                                          │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  IMMUTABLE ARCHIVE: S3 (media, raw scrapes)          │
│  - Original images → /media/originals/               │
│  - Derived sizes → /media/derivatives/               │
│  - Raw scrape snapshots → /scrapes/                  │
└─────────────────────────────────────────────────────┘
```

| Pros | Cons |
|------|------|
| **Kim's dockerized client vision preserved** | Sync pipeline to build (~1 week of work) |
| **Noel's scale concerns addressed** — Postgres handles every query pattern | Eventual consistency between JSON and Postgres (seconds-level lag) |
| **All query patterns work at speed** | Redundant storage (JSON + Postgres) — but JSON is archival |
| **Fredrik's scale path is clear** (100 → 10K → 500K without rewrite) | Three systems to maintain — but all AWS-native, all understood |
| **Agents read JSON directly** (dockerized client) | |
| **Postgres for cross-hotel queries** (composite) | |
| **AWS-native** — CDK deployment, existing auth, Secrets Manager | |
| **Clear scale path:** JSON in Git → S3 at scale; Postgres sharding later if needed | |
| **Backups are free** — JSON files are the backup; Postgres regenerates from them | |
| **Auditable** — every JSON change is a Git diff or S3 version | |
| **TS/Python boundary respected** — Postgres is TS's territory; Pinecone (Python) untouched | |

---

## Why Option G Wins — The Case Against Each Alternative

**Against Option A (JSON only):** Our "Taylor Swift query" is dead in the water. No way to filter by pet-friendly + geo + rating + availability in one query without scanning every file. At 500K hotels, every query is a full scan.

**Against Option B (Postgres only):** We lose Kim's architectural anchor. Agents can't read a hotel as a cohesive folder. No Git diff per hotel. Operator admin becomes a SQL UI. Kim will fight it, and she'll be right.

**Against Option C (Neo4j):** Solves a multi-hop traversal problem we don't have. Our Hotel↔Amenity↔Policy relationships are shallow. Adds ops burden.

**Against Option D (TerminusDB):** Perfect fit conceptually. Too risky operationally for a Memorial Day deadline. Worth a research spike in Q3.

**Against Option E (ElasticSearch):** Layer it in when text search becomes a bottleneck. We don't need it for V0 — tsvector in Postgres is plenty for 500K rows.

**Against Option F (DuckDB):** Use it for analytical batch jobs, not serving. We'll likely reach for it for scraper validation or bulk export scripts.

---

## Option G in Detail

### Write path

```
Normalizer Service (TS Lambda)
    │
    ├── 1. Extract from Maison scraper output (Stage 3.5 markdown + Google Places)
    ├── 2. Call LLM with JSON Schema constraint (Claude 3.5 Sonnet)
    ├── 3. Validate result against JSON Schema → fail fast if invalid
    ├── 4. Compare against previous JSON → hash diff
    │       └── If unchanged → no-op, update last_verified_at only
    │       └── If changed → continue
    │
    ├── 5. Write JSON file to hotels/{slug}/data/{schema}.json
    │       (Git commit with structured commit message)
    │
    ├── 6. Upsert to Postgres (normalized rows + JSONB + embeddings)
    │       - Normalized: fields extracted for indexed filtering
    │       - JSONB: full schema for single-hotel load
    │       - Embeddings: generate via agent-llm-service, write to pgvector
    │       - tsvector: auto-computed via Postgres GENERATED column
    │
    ├── 7. Invalidate affected Redis cache keys
    │
    └── 8. Emit audit event (DynamoDB kb-version-history)
           (reuse existing chatbot pattern)
```

### Read path (composite query)

```
Query: "pet-friendly stay near Taylor Swift concert Friday"

Step 1: Parse query via LLM → structured intent
    { event: "Taylor Swift", date: "2026-04-24",
      amenity_required: "pet_friendly" }

Step 2: Redis lookup — cached results?
    → Miss → continue

Step 3: Event lookup (Postgres)
    SELECT location FROM events
    WHERE name ILIKE 'Taylor Swift%'
      AND start_date::date = '2026-04-24'
    → location = (lat, lng) of MetLife

Step 4: Hotel filter query (Postgres with PostGIS + JSONB)
    SELECT h.*, a.jsonb_blob as pet_data,
           ST_Distance(h.geo::geography, $event_geo::geography) AS distance_m
    FROM hotels h
    JOIN amenities a ON a.hotel_id = h.id AND a.sub_type = 'Pet'
    WHERE a.jsonb_blob->'ext'->'petSpec'->>'allowed' = 'true'
      AND ST_DWithin(h.geo::geography, $event_geo::geography, 32000)
    ORDER BY distance_m ASC
    LIMIT 20;
    → returns 12 hotels

Step 5: Semantic rerank (optional, for "best" queries)
    For each hotel, compute cosine similarity of
    [user_vibe_preference] × [hotel_embedding]
    via pgvector
    → reranked list

Step 6: Availability filter (Rates schema via Redis cache)
    For each candidate:
        getHotelRates(hotelId, check_in=2026-04-24, check_out=2026-04-25)
    → drops hotels with zero rooms available

Step 7: Write result to Redis (60-sec cache)

Step 8: Generate "Why this" explanations via LLM (grounded in JSON)

Step 9: Return to MCP client with media IDs → UI renders carousel
```

End-to-end: under 2 seconds for 20 candidates. Cached: under 200ms.

### Sync strategy (JSON → Postgres)

**Trigger:** JSON file change detected. Possible triggers:
- Normalizer writes a new JSON (self-triggered after upsert)
- Git commit to the `hotels/` tree (webhook or CI job)
- Operator admin writes a JSON via console (V1)

**Process:**
1. Compute SHA-256 of JSON file
2. Compare to `hotels.sync_hash` in Postgres
3. If different → upsert row, regenerate embeddings, bump `sync_version`
4. Atomic — single transaction

**Failure handling:** If Postgres write fails, JSON is still correct (it's source of truth). Retry the sync idempotently. No data loss.

### Scale path

| Stage | Hotels | JSON storage | Postgres | Redis |
|-------|--------|--------------|----------|-------|
| **V0 POC** | 100 | Git monorepo (`packages/knowledge-graph/hotels/`) | Single RDS db.t3.medium | ElastiCache t3.small |
| **V1 launch** | 1K-10K | S3 bucket, CloudFront for CDN | db.m5.large + read replicas | ElastiCache m5.large cluster |
| **V2 scale** | 10K-100K | S3 + per-region caching | Postgres read replicas per region; consider partitioning by region | Global ElastiCache cluster |
| **V3 global** | 100K-500K+ | S3 sharded by region | Citus / Aurora partitioned; or hybrid OpenSearch + Postgres | Global Redis |

**Key insight:** **No fundamental rewrite** at any stage. We add replicas, shard, or introduce caches — but JSON stays source of truth and Postgres stays the query engine.

### Migration flexibility

If we decide in 2027 that we want Neo4j for recommendations, or TerminusDB for full JSON-LD compliance, or a self-hosted vector store — **we regenerate from JSON.** No re-ingestion from websites. No lost provenance. No rewrites.

The JSON files are the contract.

---

## The Argument for Kim

> "JSON stays the source of truth — you still own the data layer and every hotel is still a dockerized client. Postgres is a read-optimized *materialized view* of the JSON, auto-rebuilt on every JSON change. You never write to Postgres directly. When we eventually add a graph DB or switch stores, we regenerate from JSON. The JSON files are the contract.
>
> Your schema-first principle is preserved: JSON Schemas validate every emitted object. Normalizer refuses to write if validation fails. Agents operate on JSON folders with full `CLAUDE.md`-style hydration. Markdown is generated from JSON, never reverse. Nothing changes about your vision."

## The Argument for Noel

> "Postgres materialized view means we don't scan 500K JSON files for every query. pgvector + PostGIS + JSONB + tsvector handle every query pattern we need at scale. One AWS service the team already runs. No exotic systems.
>
> We don't over-engineer the content layer — the normalizer is ~1 week of work, scraper integration is a 20-line Python PR. Rates live in Redis (separate from the KG) so volatile data doesn't pollute the graph.
>
> The JSON source-of-truth isn't a second database — it's an archive. Writing JSON is the same operation as writing Postgres (the normalizer does both in one transaction)."

## The Argument for Fredrik

> "Option G scales to every hotel in the world without a rewrite. AWS-native, same CDK pipeline as all other Maison apps. The Content Layer is the IP foundation of Maison Exchange — having it structured, versioned, and queryable at sub-second latency is the actual moat, not scraping technology.
>
> Every AI platform (ChatGPT, Instagram, WhatsApp) can call the MCP tools that sit on top of this storage. The data is operable by any model."

---

## Open Questions

1. **JSON folder storage location** — three options, documented, team decides:
   - **(a)** Monorepo `packages/knowledge-graph/hotels/` — Git-versioned, PR-reviewable, fits existing monorepo workflow
   - **(b)** Separate repo `maison-hotels` — cleaner separation; repo can be public for partner discovery
   - **(c)** S3 from day 1 with versioning — scale-native but no Git diff UX for the team
   - **My lean (per team review):** (a) for V0, migrate to (c) at ~5K hotels

2. **Redis provider** — two options, documented, team decides:
   - **(a)** AWS ElastiCache — fits existing CDK, AWS-native auth
   - **(b)** Upstash — serverless, no cluster management, faster to provision
   - **My lean:** ElastiCache for V0 consistency; revisit at scale

3. **pgvector dimensions** — 1536 (OpenAI `text-embedding-3-small`, matches existing scraper) or 1024 (Cohere Embed v3). Decision: **1536 for text embeddings** (matches existing infra) + **1024 for CLIP multimodal** (Cohere). Two pgvector columns.

---

## Implementation Phases

### Phase 1 (Week 1): Postgres schema + indexes
- Migrations in `packages/database/migrations/` for 10 schemas
- PostGIS extension + indexes
- pgvector extension + indexes (both 1536 and 1024 dim)
- tsvector GENERATED columns for full-text

### Phase 2 (Week 1-2): JSON → Postgres sync
- Normalizer service writes JSON files
- Sync handler detects JSON changes, upserts Postgres
- Embedding generation via `agent-llm-service`
- Redis cache invalidation

### Phase 3 (Week 2): Read APIs
- MCP tools query Postgres
- Redis cache layer
- Composite query examples tested

### Phase 4 (Week 3+): Admin console integration
- `apps/console` reads hotel folders from JSON
- Operators can view/edit via A2UI schema renderer
- Writes back to JSON → triggers sync

---

## Related Documents

- [Schema Specifications](./schemas.md)
- [Dockerized Client Folder Model](./dockerized-client.md)
- [Integration with Existing Maison Infrastructure](./integration.md)
- [Media & Visual Layer](./media-layer.md) (for S3 + CloudFront details)
