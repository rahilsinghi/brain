---
title: Maison-Agent Monorepo Architecture
author: ai
created_at: 2026-04-17T16:58:01.324Z
last_ai_edit: 2026-04-17T16:58:01.324Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/api/articles/maison-agent-monorepo-architecture-deep-exploration-april-1776444917484.md]]"
tags:
  - monorepo
  - architecture
  - nodejs
  - typescript
  - aws
  - cdk
  - database
  - dynamodb
  - postgresql
  - otel
  - langfuse
  - claudemd
---

# Maison-Agent Monorepo Architecture

Overview of the Maison-Agent monorepo structure, including apps, packages, services, and infrastructure, with details on database usage, CLAUDE.md rules, and current gaps in the V0 Content Layer.

## Key Concepts

- pnpm monorepo with Turborepo
- PostgreSQL (Neon) and DynamoDB for data storage
- Express backend services with REST, A2A, and MCP interfaces
- Langfuse and OTel for telemetry
- CLAUDE.md rules for code consistency
- A2UI no-code renderer for admin console

## Details

## Monorepo Structure
The Maison-Agent project uses a pnpm monorepo managed with Turborepo, utilizing Node 20 and pnpm 10.17.1. The structure includes:

- `apps/`: Contains 8 applications such as chat-window, console, quality-dashboard, and others.
- `packages/`: 9 shared packages including database, auth, pubsub, telemetry, and agent-core.
- `services/`: 3 backend services (api, a2ui-renderer, quality).
- `infra/`: AWS CDK stacks for infrastructure deployment.
- `prompts/`: LLM prompts synchronized with Langfuse.

### Key Apps
- **chat-window**: Embeddable chat widget built with Vite on port 8081.
- **console**: Admin console using A2UI no-code renderer, Vite on port 8087.
- **quality-dashboard**: QA test results dashboard built with Next.js on port 8090.

### Key Packages
- **@maison-labs/database**: PostgreSQL (Neon) with node-pg-migrate, 23 migrations.
- **@maison-labs/auth**: Firebase Auth and OIDC implementation.
- **@maison-labs/pubsub**: SQS/SNS helpers for message queuing.
- **@maison-labs/telemetry**: OpenTelemetry SDK and Langfuse integration.
- **@maison-labs/agent-core**: DynamoDB client for high-frequency operations.
- **@maison-labs/a2ui-schemas**: A2UI JSON schema types for form rendering.

### Backend Service
The `services/api/` directory contains an Express backend with three interfaces:
- REST (`/api`)
- A2A (`/a2a`)
- MCP (`/mcp`)

All interfaces must be synchronized as per CLAUDE.md rules. It runs on port 8083 (public) and 8583 (internal).

### Database
- **PostgreSQL (Neon)**: Used for relational data with migrations via node-pg-migrate.
- **DynamoDB**: Handles hot-path data such as client configuration, chat sessions, scrape snapshots, and kb-version-history.
- **S3**: Stores public client assets and private snapshots/analytics.
- **Pinecone**: Exclusively used by Python, not accessible from TypeScript.

### KB/Scraping Infrastructure
- PostgreSQL tables for websites, website_scrape_sessions, documents, document_versions, document_scrape_sessions, and client_knowledge_source_link.
- SQS queue `PIPELINE_REQUEST_TASK_QUEUE_NAME` triggers Python ECS tasks.
- EventBridge rules for website sync and chat analytics.

### DynamoDB Tables
- `{env}-agent-kb-version-history`: Tracks version history (PK: id, SK: version).
- `{env}-agent-scrape-snapshot-summary`: Tracks scrape sessions.

### CDK Stacks
- `agent-database-stack`, `agent-server-ecs-stack`, `code-build-stack`, `scheduled-tasks-stack`, `quality-ecs-stack`, `distribution-stack`, `observability stacks`, `pub-sub-stack` (AppSync WebSocket).

### CLAUDE.md Rules
1. New shared libraries should be placed in `packages/<name>/` as `@maison-labs/<name>`.
2. Tables are plural, TypeScript interfaces are singular.
3. All three interfaces (REST, A2A, MCP) must remain synchronized.
4. TypeScript owns DynamoDB, S3, and PostgreSQL. Python is restricted to Pinecone.
5. 100% test coverage with Vitest and TDD.
6. OpenTelemetry `withSpan()` on every service operation.
7. No empty catch blocks.
8. Neon PostgreSQL is used (not AWS RDS), requiring spec updates.

### V0 Content Layer Gaps
- No hotels/ or knowledge-graph/ directories.
- Missing PostGIS and pgvector Postgres extensions.
- No hotel entity schemas for Hotel, Room, Amenity, Policy, Offer, Experience, Media, Rates, FAQ, Event.
- No normalizer service.
- No CLIP/VLM media pipeline.
- No structured schema extraction from scraper output.

### Console (A2UI)
The admin console utilizes a no-code JSON schema renderer. New hotel management pages would be created as A2UI page schemas in `apps/console/src/pages/`, with the renderer service at port 8585 interpreting these schemas.

## Related

[[A2UI Console Authentication Tests]], [[A2UI Data Schema Validation Test Suite]], [[A2UI Renderer Console Authentication Testing]], [[A2UI Renderer Console Page Testing]], [[A2UI Renderer Console Testing]], [[A2UI Renderer Core]], [[A2UI Renderer Endpoint Integration Testing]], [[A2UI Renderer Permissions Test Suite]], [[A2UI Renderer Schema Testing]], [[A2UI Template Expansion and Data Path Rewriting]], [[A2UI Template Expansion Engine]], [[A2UI Template Expansion Test Suite]], [[API Server Factory with Graceful Shutdown]], [[API Translations Endpoint Test Suite]], [[API Translations Endpoint Testing]], [[Authentication API Endpoint Testing Suite]], [[Authentication Interface and User Management]], [[Authentication Documentation Diagnostics Suite]], [[Backend Fix: Add Vercel Production URL to CORS Origins (Karen Project)], [[Backend Fix: Reversed DOB Longitude Bounds and Session Complete Payload (askNYC)], [[Backend Fix: Socrata Timeout and Transcription Object Handling (askNYC)], [[Backend Fix: Socrata Tool Return Types for ADK Compatibility in askNYC]], [[Chat Message Sending Functional Tests]], [[Chat Response Functional Testing]], [[Chat Session Persistence Functional Testing]], [[Chat Widget Interaction Framework]], [[Chat Widget UI and Interaction Framework]], [[Chat Window Base Form Element Debugging]], [[Chat Window Button Component Framework]], [[Chat Window Button Component Library]], [[Chat Window Checkbox Input Management]], [[Chat Window Datetime Form Element Utilities]], [[Chat Window File and Image Input Management]], [[Chat Window Form Element Base Styling]], [[Chat Window Form Element Button Utilities]], [[Chat Window Form Element Decoration and Utilities]], [[Chat Window Form Element Grouping Utilities]], [[Chat Window Form Element Labeling and Grouping]], [[Chat Window Form Element Validation Framework]], [[Chat Window Form Generation Utilities]], [[Chat Window Global Type Definitions]], [[Chat Window Interaction and Analytics Framework]], [[Chat Window Interactive Switch Input Utilities]], [[Chat Window Material-UI Color Utilities]], [[Chat Window Material-UI DevTools Testing]], [[Chat Window MCBS Closure Type Declarations]], [[Chat Window MUI DevTools Testing]], [[Chat Window Numeric Input Component]], [[Chat Window Numeric Range Input Utilities]], [[Chat Window PostCSS Configuration]], [[Chat Window Progress Indicators]], [[Chat Window Radio Input Component]], [[Chat Window Radio Input Management]], [[Chat Window Search Input Utility]], [[Chat Window Select Input Management]], [[Chat Window Telephone Input Utilities]], [[Chat Window Text Input Utilities]], [[Chat Window Textarea Input Utilities]], [[Chat Window Time Input Utilities]], [[Chat Window UI Base Styling Utilities]], [[Chat Window URL Input Component]], [[Chat Window URL Input Utilities]], [[Chat Window Webpack Configuration]], [[Client Chat Log Status Migration]], [[Client Description Database Migration Module]], [[Client Knowledge Base Cleanup for Pinecone and DynamoDB]], [[Client Knowledge Source Link Database Migration]], [[Client Table Styling Test Utilities]], [[Client-Side Application Routing]], [[Client-Side Interactive Experience Orchestration]], [[Cloud Push Debugging Guide and User ID Requirements]], [[Codecademy Pro Discount Offer (50% Off, April 2026)], [[Configuration: Apollo Session Storage and Chrome User Data Exclusion]], [[Coro — Git Activity]], [[Coro: Key Drop Votes on Connection ID and Server-Sourced Countdown Fix]], [[Coro: Smooth Drop Transition with Gradual Build-Up]], [[Daily Digest — Thursday April 16, 2026]], [[Daily Knowledge Log Module Implementation]], [[Database Access Control Schema]], [[Database Access Control Table Definition]], [[Database Access Testing Suite]], [[Database Analytics Testing Suite]], [[Database Layer with PostgreSQL Models and Qdrant Collections for raag]], [[Database Migration Management]], [[Database Migration Validation]], [[Database Migration: Client ID Test Data Removal]], [[Database Migration: Client Knowledge Source Link Update]], [[Database Migration: Email Log Column Renaming]], [[Database Migration: Public Proposals and Tension Score]], [[Database MVP Transformations Utility]], [[Database Schema and Common Types Definition]], [[Database Schema Initialization for Maison Agent]], [[Database Schema Migration for Client Knowledge Source Links]], [[DynamoDB]], [[EventBridge]], [[Firebase Auth]], [[Langfuse]], [[Neon PostgreSQL]], [[Node.js]], [[OpenTelemetry]], [[OTel]], [[Pinecone]], [[PostgreSQL]], [[PostGIS]], [[pgvector]], [[Python]], [[S3]], [[SQS]], [[SNS]], [[Turborepo]], [[Vitest]], [[Vite.js]], [[AWS CDK]], [[Express.js]], [[TypeScript]]
