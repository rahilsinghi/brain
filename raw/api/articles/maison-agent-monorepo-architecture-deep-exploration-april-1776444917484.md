---
status: processed
source_type: api
channel: claude-code
source_id: api/articles/maison-agent-monorepo-architecture-deep-exploration-april-1776444917484.md
ingested_at: 2026-04-17T16:55:17.484Z
parsed_at: null
compiled_to: "[[Maison-Agent Monorepo Architecture]]"
processed_at: 2026-04-17T16:58:01.324Z
retry_count: 0
last_error: null
compile_progress: null
---



# Maison-Agent Monorepo Architecture

**Repo:** `/Users/rahilsinghi/Desktop/maison-agent`
**Explored:** April 17, 2026

## Monorepo Structure
pnpm monorepo with Turborepo. Node 20, pnpm 10.17.1.

```
apps/        # 8 apps (chat-window, console, login, demo-sites, home, quality-dashboard, docs, status)
packages/    # 9 shared packages
services/    # 3 backend services (api, a2ui-renderer, quality)
infra/       # AWS CDK stacks
prompts/     # LLM prompts synced to Langfuse
```

## Key Apps
- **chat-window** (Vite, port 8081) — embeddable chat widget
- **console** (Vite, port 8087) — admin console using A2UI no-code renderer
- **quality-dashboard** (Next.js, port 8090) — QA test results

## Key Packages
- **@maison-labs/database** — PostgreSQL (Neon) + node-pg-migrate. 23 migrations. No PostGIS/pgvector yet.
- **@maison-labs/auth** — Firebase Auth + OIDC
- **@maison-labs/pubsub** — SQS/SNS helpers
- **@maison-labs/telemetry** — OTel SDK + Langfuse (required on ALL services)
- **@maison-labs/agent-core** — DynamoDB client (hot-path ops)
- **@maison-labs/a2ui-schemas** — A2UI JSON schema types

## Backend Service (services/api/)
Express + TypeScript. Three interfaces: REST (/api), A2A (/a2a), MCP (/mcp). All must be in sync per CLAUDE.md rule.
Port 8083 (public), 8583 (internal).

## Database
- **PostgreSQL (Neon)** — NOT AWS RDS. Relational data, migrations via node-pg-migrate.
- **DynamoDB** — hot-path: client config, chat sessions, scrape snapshots, kb-version-history, a2a-tasks
- **S3** — public client assets + private snapshots/analytics
- **Pinecone** — Python-ONLY. TS cannot touch it.

## Existing KB/Scraping Infrastructure
- `websites`, `website_scrape_sessions`, `documents`, `document_versions`, `document_scrape_sessions`, `client_knowledge_source_link` tables in Postgres
- SQS queue: `PIPELINE_REQUEST_TASK_QUEUE_NAME` triggers Python ECS tasks
- EventBridge scheduled rules for website sync + chat analytics
- No hotel-specific schema exists yet

## DynamoDB Tables
- `{env}-agent-kb-version-history` — (PK: id, SK: version) — can reuse for hotel schema versioning
- `{env}-agent-scrape-snapshot-summary` — scrape tracking

## CDK Stacks
agent-database-stack, agent-server-ecs-stack, code-build-stack, scheduled-tasks-stack, quality-ecs-stack, distribution-stack, observability stacks, pub-sub-stack (AppSync WebSocket)

## CLAUDE.md Rules (critical for V0 Content Layer)
1. New shared lib → packages/<name>/ as @maison-labs/<name>
2. Tables plural, TS interfaces singular
3. All 3 interfaces (REST + A2A + MCP) must stay in sync
4. TS owns DynamoDB + S3 + PostgreSQL. Python owns Pinecone ONLY.
5. 100% test coverage (Vitest + TDD)
6. OTel withSpan() on EVERY service operation
7. No empty catch blocks
8. Neon Postgres (NOT AWS RDS) — spec needs updating

## What DOESN'T Exist Yet (V0 Content Layer gaps)
- No hotels/ or knowledge-graph/ directories
- No PostGIS or pgvector Postgres extensions
- No hotel entity schemas (Hotel, Room, Amenity, Policy, Offer, Experience, Media, Rates, FAQ, Event)
- No normalizer service
- No CLIP/VLM media pipeline
- No structured schema extraction from scraper output

## Console (A2UI)
Admin console uses no-code JSON schemas to render forms. New hotel management pages would be A2UI page schemas in `apps/console/src/pages/`. The renderer service at :8585 interprets these.
