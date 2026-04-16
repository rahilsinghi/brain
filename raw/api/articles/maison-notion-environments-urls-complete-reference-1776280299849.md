---
status: processed
source_type: api
channel: claude-code
source_id: api/articles/maison-notion-environments-urls-complete-reference-1776280299849.md
ingested_at: 2026-04-15T19:11:39.849Z
parsed_at: null
compiled_to: "[[Maison Environments & URLs]]"
processed_at: 2026-04-15T19:13:21.334Z
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca664y4eqUY2is9LXzSBT"}
compile_progress: null
---









# Maison Environments & URLs
**Source:** Notion page "Environments & URLs"
**Retrieved:** April 15, 2026

## Service URLs by Environment
| Service | Test | Staging | Production |
|---|---|---|---|
| API | api.test.maison-labs.com | api.stg.maison-labs.com | api.maison-labs.com |
| Console | console.test.maison-labs.com | console.stg.maison-labs.com | console.maison-labs.com |
| Login | login.test.maison-labs.com | login.stg.maison-labs.com | login.maison-labs.com |
| Docs | docs.test.maison-labs.com | docs.stg.maison-labs.com | docs.maison-labs.com |
| Status | status.test.maison-labs.com | status.stg.maison-labs.com | status.maison-labs.com |
| Quality | quality.test.maison-labs.com | quality.stg.maison-labs.com | quality.maison-labs.com |

## Local Development Ports
| Port | Service |
|---|---|
| 8081 | Chat window |
| 8082 | Demo hotel sites |
| 8083 | API (public) |
| 8087 | Operator console |
| 8090 | Quality dashboard |
| 8091 | Docs |
| 8092 | Login |
| 8089 | Status page |
| 8583 | API (internal, VPC-only) |
| 8585 | A2UI Renderer (internal) |
| 8586 | LLM service (internal) |
| 8581 | Langfuse |

## Deployment Pipeline
local → dev → test → stg → prod

Infrastructure config:
- `infra/config/default.json` — complete config (test baseline)
- `infra/config/stg.json` — staging overrides
- `infra/config/prod.json` — production overrides

Secrets via AWS Secrets Manager, injected at container startup.

## Public Domains
- **maison.cx** — Public business/marketing site
- **maison-labs.com** — All platform tooling and services
- Chat widgets embedded on **client hotel websites** directly