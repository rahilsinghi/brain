---
status: processed
source_type: api
channel: claude-code
source_id: api/articles/maison-notion-getting-started-full-onboarding-guide-1776280299838.md
ingested_at: 2026-04-15T19:11:39.838Z
parsed_at: null
compiled_to: "[[Maison: Getting Started Guide for AI Agent Platform]]"
processed_at: 2026-04-15T19:12:27.543Z
retry_count: 1
last_error: |
  JSON Parse error: Invalid escape character 
compile_progress: null
---





# Maison Getting Started — Full Onboarding Guide
**Source:** Notion page "Getting Started" (under maison-agent monorepo)
**Retrieved:** April 15, 2026

## What Maison Is Building
Maison deploys an AI agent across any surface — hotel websites, mobile apps, SMS, WhatsApp, email, and internal tools. Guests interact naturally — asking questions, checking availability, making requests — and the AI handles it in real time. Hotel operators manage their properties, knowledge bases, and settings through a purpose-built console.

**Two domains:**
- **maison.cx** — public-facing business and marketing site
- **maison-labs.com** — the API, operator consoles, and all internal tooling

## The Big Picture
1. **A chat widget** deployable across any surface (`apps/chat-window`)
2. **An AI API** that processes messages and coordinates with hotel systems (`apps/api`)
3. **An operator console** for hotel teams to configure and manage their AI agent (`apps/console`)

## Environments
| Environment | Base domain | Notes |
|---|---|---|
| local | local.maison-labs.com | Your own machine |
| dev | dev.maison-labs.com | Active development |
| test | test.maison-labs.com | Integration testing |
| stg | stg.maison-labs.com | Pre-production staging |
| prod | maison-labs.com | Live platform |

## Key Services
| Service | URL pattern | Who uses it |
|---|---|---|
| Chat window | Embedded on hotel websites | Hotel guests |
| API | api.{env}.maison-labs.com | Every other service |
| Operator Console | console.{env}.maison-labs.com | Hotel operators |
| Login | login.{env}.maison-labs.com | Hotel operators |
| Docs | docs.{env}.maison-labs.com | All team members |
| Status page | status.{env}.maison-labs.com | All team members |
| Quality dashboard | quality.{env}.maison-labs.com | Engineering & QA |

## Key Terminology
- **Client** — a hotel (or hotel group) using Maison
- **Knowledge base (KB)** — facts, FAQs, policies the AI draws on
- **Chat session** — conversation between guest and AI agent (stored in DynamoDB)
- **A2A (Agent-to-Agent)** — JSON-RPC protocol for AI agents to interact with Maison
- **MCP (Model Context Protocol)** — Anthropic's open standard; Maison exposes an MCP endpoint
- **A2UI** — Maison's internal schema-driven UI system (console renders pages from JSON schemas)

## The Monorepo
```
maison-agent/
├── apps/       ← Deployable services (API, chat widget, console, login, etc.)
├── packages/   ← Shared libraries used across apps
├── infra/      ← AWS cloud infrastructure (CDK)
├── prompts/    ← AI prompt source files
├── docs/       ← All documentation, architecture records
└── scripts/    ← Local dev scripts and helpers
```

Uses **pnpm workspaces + Turborepo**. Primary task runner is `make`.
- `make bootstrap` on fresh clone
- `make dev` to run everything locally
- Detailed setup in `docs/` and `.claude/docs/make-commands.md`

## How a Guest Message Flows
1. Guest types in chat window → sends message to API
2. API looks up client's KB and configuration
3. Calls LLM service → generates response using KB + conversation history
4. Response stored in DynamoDB, published via AppSync (WebSocket)
5. Guest sees reply — typically under 2 seconds

## How an Operator Manages Their Hotel
1. Operator logs in through Login app
2. Redirected to Console showing hotel dashboard
3. Console pages rendered dynamically by A2UI Renderer (schema → live data from API → HTML)
4. Operator updates KB, reviews chat sessions, configures integrations, monitors performance

## Bootstrap Notes for Engineers
- `make bootstrap` scripts were written on Sandeep's machine — may have gaps
- If bootstrap fails: ask Claude to fix, push fixes to branch named after you
- Flag in Slack — Sandeep consolidates fixes into main

## Working with Claude Tips (from team)
- Be specific, don't be verbose
- One task per session — switch topics = start fresh chat
- Use screenshots when words aren't enough
- Ask Claude to open browser and test
- If stuck after 2 sessions, start fresh
- If still stuck, paste conversation into Claude.ai/Gemini/ChatGPT to diagnose