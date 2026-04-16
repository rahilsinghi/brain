---
status: processed
source_type: api
channel: claude-code
source_id: api/articles/maison-platform-architecture-local-dev-environment-1776280190023.md
ingested_at: 2026-04-15T19:09:50.023Z
parsed_at: null
compiled_to: "[[Maison Platform Architecture]]"
processed_at: 2026-04-15T19:10:07.333Z
retry_count: 0
last_error: null
compile_progress: null
---



# Maison Platform Architecture

**URL:** local.maison-labs.com

> AI-powered hotel concierge platform. Conversational guest service, knowledge management, and hospitality intelligence.

## Applications

| App | Description | URL |
|-----|-------------|-----|
| Console | Manage clients, knowledge bases, analytics, and configuration | /console/ |
| Login | Sign in, reset passwords, accept invitations | /login |
| Documentation | API reference, quickstart guides, widget SDK, and integration docs | docs.local.maison-labs.com |
| Status | Service health, uptime, and incident timeline | status.local.maison-labs.com |
| Quality Dashboard | Playwright test sessions, pass rates, and trend analysis | quality.local.maison-labs.com |
| Brand Styleguide | Colors, typography, voice, and component patterns | /brand |
| Dashboard | Grafana observability dashboards, metrics, and tracing | dashboard.local.maison-labs.com |
| Demo | Interactive demo of Maison conversational AI guest service | local.maison.cx |

## API and Machine Endpoints

| Endpoint | Protocol |
|----------|----------|
| /openapi.json | OpenAPI 3.1 specification |
| /.well-known/agent.json | A2A agent card for agent-to-agent discovery |
| /a2a | A2A JSON-RPC 2.0 endpoint |
| /mcp | MCP streamable HTTP transport |
| /api | REST API |
| /health | Health check |

## Key Observations
- Platform has its own MCP endpoint — can potentially connect Claude directly to Maison APIs
- A2A (Agent-to-Agent) protocol support — inter-agent communication built in
- Grafana for observability — professional monitoring stack
- Playwright for QA — automated test infrastructure
- OpenAPI spec available — full API documentation

**Source:** Screenshot of local.maison-labs.com, captured during Fredrik screen share, April 15 2026