---
title: Maison.Travel POC — Action Items & Sprint Plan (April 17, 2026)
author: ai
created_at: 2026-04-17T02:53:34.382Z
last_ai_edit: 2026-04-17T02:53:34.382Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/api/articles/maisontravel-poc-action-items-sprint-plan-april-17-20-1776393868155.md]]"
tags:
  - maison
  - poc
  - action-items
  - sprint-plan
  - 2026-04-17
  - memorial-day
  - east-end
  - v0-v1
  - schemas
  - rahil-tasks
  - fredrik-tasks
  - sandeep-tasks
---

# Maison.Travel POC — Action Items & Sprint Plan (April 17, 2026)

This wiki article outlines the action items and sprint plan for the Maison.Travel Proof of Concept (POC) meeting held on April 17, 2026. The POC aims to create a conversational booking experience for East End hotels (100 properties) with a hard deadline of Memorial Day (May 25, 2026).

## Key Concepts

- **V0**: Surface-level publicly available data (scraper output, Places API, Google reviews/photos)
- **V1**: Integrated, dynamic data (PMS, CMS feeds, Preferred headless CMS)
- **Hybrid Content Model**: Combining scraper baseline with EXA evaluation
- **JSON-LD, schema.org compliant data format**: Uniform naming across hotels
- **Dockerized client pattern**: One per hotel (Hermes/KELO model)
- **Layered Architecture**: Three layers - Content/Knowledge Graph, MCP Tools, and Payments
- **Timeboxing Strategy**: Prioritizing end-to-end flow before deepening content layer

## Details

## Overview
The Maison.Travel POC aims to create a conversational booking experience for East End hotels (100 properties) with a hard deadline of Memorial Day (May 25, 2026). The architecture meeting on April 17, 2026, outlined the action items and sprint plan for the project.

## Key Tasks
### Rahil's Next Tasks
1. **Revise Architecture Document**
   - Expand the Content Layer section
   - Define V0 and V1 data formats
   - Decide on schemas per concept (amenity, rates, room types, FAQ, events, offers)
   - Specify ingestion pipeline per data source
   - Specify knowledge graph node types and relationships

2. **Trigger East End Scrape**
   - Run existing Maison ingestion pipeline on all ~100 East End properties
   - Learn the pipeline while doing so
   - Output becomes baseline V0 data for POC

3. **Schema-First Design**
   - Deliverable: 6-7 JSON schemas covering primary hotel data concepts
   - Model after Hermes / KELO / Claude Code folder structures

### Fredrik's Tasks
- Create corporate EXA account (the search API Perplexity uses)
- Invite Rahil, Kim, Noel to the EXA org account
- Continue architecting agent workflows (hydrates skills folder per Kim's dockerized-client model)

### Sandeep's Tasks
- Deploy scraper and ingestion pipeline to the monorepo
- Website sync / diffing infrastructure at scale

## Architecture Decisions
| Decision | Resolution |
|----------|------------|
| Full-ownership vs lean content | **Hybrid** - scraper baseline + EXA evaluation |
| Data format | **JSON-LD, schema.org compliant**, uniform naming across hotels |
| Source of truth | **JSON files**, markdown generated from JSON |
| Agent pattern | **Dockerized client** per hotel (Hermes/KELO model) |
| Content assumption | Don't assume operators fill gaps - do heavy lifting from public data |
| Ingestion vs IP | **IP is not ingestion** - it's what we do with the data |

## POC Layer Plan
### Layer 1: Content / Knowledge Graph
- V0: scraped + EXA + public APIs
- V1 (later): CMS integrations, PMS, operator admin
- Schemas grounded in JSON to prevent LLM context drift
- Per-hotel "dockerized client" folder structure

### Layer 2: MCP Tools
- `search_hotel` - query the KB
- `get_rates` - PMS (Derbysoft) primary, third-party fallback
- `book_offer` - booking execution

### Layer 3: Payments
- Stripe integration

## Critical Timeboxing Note
Noel flagged: timebox each layer. Don't spend 4 weeks on content and leave booking hanging.

Fredrik pushback: Rahil's "2-3 weeks for data + read MCP" should be "two days" - booking execution deserves more time.

Agreed: get end-to-end flow working first, then deepen content layer.

## Next Meeting
Friday (April 19, 2026) - Rahil presents revised architecture + V0/V1 schemas

## Related

Maison.Travel POC Architecture Meeting April 17 2026,EXA,Hermes,KELO,Claude Code,Derbysoft,Stripe,schema.org,JSON-LD,Maison.Travel
