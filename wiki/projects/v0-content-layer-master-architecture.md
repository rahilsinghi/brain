---
title: V0 Content Layer — Master Architecture
author: ai
created_at: 2026-04-17T16:45:58.499Z
last_ai_edit: 2026-04-17T16:45:58.499Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/api/articles/v0-content-layer-master-architecture-1776443483707.md]]"
tags:
  - architecture
  - knowledge-graph
  - hotel-data
  - content-layer
  - schema.org
  - json-source-of-truth
  - dockerized-client
  - postgres
  - redis
  - mcp-tools
  - query-patterns
---

# V0 Content Layer — Master Architecture

The V0 Content Layer is the first layer of the Maison.Travel POC architecture, turning raw hotel data into a structured, schema.org-compliant knowledge graph. It enables conversational search, composite queries, grounded answers, and visual carousels while maintaining JSON as the source of truth. The architecture includes 10 schemas, a dockerized client folder structure, and integration with existing infrastructure.

## Key Concepts

- JSON as source of truth for hotel data
- 10 schema.org-compliant schemas for hotel knowledge graph
- Dockerized client folder structure per hotel
- Postgres materialized view with pgvector and PostGIS
- Redis cache for hot queries and session state
- Normalizer service for data transformation
- Integration with existing Maison infrastructure
- Query patterns for filtering, geo, semantic, and composite searches

## Details

The V0 Content Layer is the foundation of the Maison.Travel POC architecture, transforming raw hotel data from various sources into a structured, schema.org-compliant knowledge graph. This layer powers conversational search, composite queries, grounded answers in the chat concierge, and visual carousels with rich media. The key principles include maintaining JSON as the source of truth and using a dockerized client folder structure for each hotel.

### Architectural Layers

The architecture consists of three layers:

1. **Layer 3: Payments** - Stripe Connect integration for payment processing, multi-tenant hotel payouts, commission splits, and webhook handling.
2. **Layer 2: MCP Tools** - APIs for search, booking, and media retrieval that are callable from any AI platform.
3. **Layer 1: Content** - The knowledge graph layer with 10 schemas (Hotel, Room, Amenity, Policy, Offer, Experience, Media, Rates, FAQ, Event) stored as JSON files, materialized in Postgres with pgvector and PostGIS, and cached in Redis.

### Core Principle

JSON files are the source of truth, with Markdown generated from JSON for Obsidian viewing. From the JSON, other artifacts like Postgres rows, embeddings, and CDN-ready images are derived. This ensures data consistency and facilitates easy migration between systems.

### High-Level Architecture

The data flow includes normalization of sources (hotel websites, Google Places API, EXA API, Ticketmaster API) into JSON files. These files are then materialized in Postgres for fast querying and cached in Redis for hot queries and session state. The pipeline handles media ingestion, normalization, understanding, storage, and retrieval with CLIP embeddings and visual similarity search.

### 10 Schemas

The 10 schema.org-compliant schemas include Hotel, Room, Amenity, Policy, Offer, Experience, Media, Rates, FAQ, and Event. Each schema has a specific purpose and is designed to support various query patterns.

### V0 vs V1 Data Strategy

The V0 strategy focuses on free public sources for the Memorial Day POC, while V1 will integrate paid APIs and partner agreements post-POC. The source matrix and fallback logic are documented in the data-sources.md file.

### Storage Architecture

Option G is chosen for storage, featuring JSON-first with Postgres materialized view and Redis cache. This option maintains JSON as the source of truth, allows Postgres scaling, and keeps a clean boundary between the knowledge graph and the chatbot's Pinecone-backed RAG.

### Dockerized Client Folder

Each hotel is represented as a first-class filesystem entity with specific files for data, markdown, media, provenance, skills, and tools. This structure enables agents to work with hotel data in a modular and organized manner.

### Media & Visual Layer

The media pipeline ingests, normalizes, understands, and delivers images and videos through a structured JSON interface. V0 handles images, while V1 will add video and Matterport integration.

### Integration with Existing Infrastructure

The Python scraper is extended with a Stage 3.5 hook to emit SQS events to a new TypeScript normalizer service. This integration respects the existing data boundary and reuses packages like @maison-labs/database, @maison-labs/auth, and @maison-labs/telemetry.

### Query Patterns

The architecture supports various query patterns including filtering, geo, semantic, visual, full-text, composite, and graph queries. These are enabled through Postgres materialized views, pgvector, and PostGIS.

### Success Criteria

The success criteria include end-to-end booking functionality, a live URL on maison.travel, MCP server availability, 100 East End properties in the knowledge graph, and a zero-hallucination concierge passing a red-team test.

### Timeline

The 6-week timeline includes development of the Content Layer in Weeks 1-2, followed by MCP tool layer and booking functionality in Weeks 3-5, with a Memorial Day demo on May 25, 2026.

### Open Questions

Several open questions need resolution before implementation, including JSON folder storage location, Redis provider, Python scraper repository name, MongoDB collection name, change-detection threshold, JSON-LD preservation, and scraper reliability.

### Related Documents

The spec is part of the larger Maison.Travel POC and references several documents, including the technical spec, PRD, KB sync design doc, and meeting summaries.

## Related

[[Maison.Travel POC]]
