---
status: processed
source_type: api
channel: claude-code
source_id: api/articles/maison-notion-architecture-overview-system-design-1776280299846.md
ingested_at: 2026-04-15T19:11:39.846Z
parsed_at: null
compiled_to: "[[Maison Architecture Overview]]"
processed_at: 2026-04-15T19:12:10.670Z
retry_count: 0
last_error: null
compile_progress: null
---



# Maison Architecture Overview
**Source:** Notion page "Architecture Overview" (under maison-agent monorepo)
**Retrieved:** April 15, 2026

## System Map (Mermaid)
```
Guest → Chat Window → POST /api/message → API Service (api.maison-labs.com)
Operator → Console (console.maison-labs.com) → A2UI Renderer → API
AI Agent/Integration → A2A or MCP → API

API → DynamoDB (session storage)
API → PostgreSQL/Neon (guest + operator data)
API → LLM Service → Pinecone (vector search)
API → AppSync Events/WebSocket (real-time push) → Chat Window
Login (login.maison-labs.com) → auth token → Console
```

## Three API Interfaces
| Interface | Path | Used by |
|---|---|---|
| REST API | /api/... | Console, chat widget, partner integrations |
| A2A | /a2a | AI agents using Agent-to-Agent JSON-RPC |
| MCP | /mcp | AI tools using Anthropic's Model Context Protocol |

**Core design principle:** Any capability via REST must also be available via A2A and MCP.

## Data Stores
| Store | Technology | Contents |
|---|---|---|
| Primary DB | PostgreSQL (Neon) | Users, clients, KBs, roles, analytics, sessions |
| Session & task store | DynamoDB | Live chat sessions, A2A task state, client config cache |
| Vector DB | Pinecone | Embeddings for KB semantic search |
| File storage | S3 | Client assets, quality test reports, prompt files |

## Infrastructure (AWS)
- **API and services** — ECS Fargate containers
- **Frontends** — CloudFront + S3 (static)
- **Real-time messaging** — AppSync Events (WebSocket)
- **Email** — SES
- **Background processing** — SQS queues + Lambda
- **Secrets** — AWS Secrets Manager
- **Observability** — OpenTelemetry → Grafana Tempo (traces) + Loki (logs)
- Three environment stacks (test/stg/prod) + shared observability stack
- All managed via AWS CDK in `infra/`

## Auth Model
1. **Operators** — Firebase Auth. Login app sets session cookie. Console verifies via `@maison-labs/auth` package.
2. **Programmatic access** — HMAC-signed API keys issued per operator account.

## How the Console Works (A2UI)
1. Console shell receives navigation request
2. Calls A2UI Renderer with schema ID + operator's auth context
3. Renderer looks up schema (from `packages/a2ui-schemas`), fetches data from API, returns HTML + CSS
4. Console shell displays result
**Adding/changing a console page = updating a JSON schema, not deploying frontend code.**

## Observability
- **Grafana Tempo** — distributed tracing
- **Grafana Loki** — structured logs
- **Langfuse** — LLM-specific tracing (prompt versions, token usage, latency)
- Local: grafana.local.maison-labs.com
- Production: grafana.maison-labs.com