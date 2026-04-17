---
title: Maison Travel V0 Content Layer — Notion Pages
author: ai
created_at: 2026-04-17T16:56:18.125Z
last_ai_edit: 2026-04-17T16:56:18.125Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/api/articles/maison-travel-v0-content-layer-notion-pages-published-apri-1776444917398.md]]"
tags:
  - specification
  - content-layer
  - json-ld
  - storage-architecture
  - media-processing
  - integration
---

# Maison Travel V0 Content Layer — Notion Pages

On April 17, 2026, Rahil published the complete V0 Content Layer specification for Maison.Travel in Notion, including 7 technical documents covering architecture, schemas, storage, media, and integration plans. The spec outlines JSON-LD schemas for 10 entity types, storage strategies, media processing pipelines, and integration with existing infrastructure.

## Key Concepts

- 10 JSON-LD entity schemas (Hotel, Room, Amenity, Policy, etc.),- JSON-first storage with Postgres materialized views,- Redis caching for performance optimization,- Dockerized client folder structure for hotel data,- CLIP embeddings for media processing,- Claude 3.5 Sonnet for visual language modeling,- SQS integration with Python scraper and TS normalizer

## Details

The V0 Content Layer specification for Maison.Travel was published as a set of 7 Notion pages under the Maison.Travel PoC page. The architecture covers:

1. **Schemas**: 10 entity types defined in JSON-LD format including Hotel, Room, Amenity (10 sub-types), Policy, Offer, Experience, Media, Rates, FAQ, and Event
2. **Storage**: Option G architecture with JSON-first approach, Postgres materialized views for analytical queries, and Redis for caching
3. **Client Folder Model**: Per-hotel 'dockerized' directory structure at `hotels/{slug}/data/*.json` serving as source of truth
4. **Media Processing**: CLIP embeddings via Cohere Embed v3 for media indexing and Claude 3.5 Sonnet for generating VLM captions
5. **Integration**: Stage 3.5 SQS emit from Python scraper to TS normalizer Lambda for data processing
6. **Timeline**: Project deadline set for Memorial Day (May 25, 2026)

The specification documents were published under the V0 Content Layer — Master Architecture section with dedicated pages for schemas, storage architecture, data sources, client folder model, media/visual layer, and integration with existing Maison infrastructure.

## Related

[[Maison.Travel PoC]],[[Data Sources & V0→V1 Strategy]],[[Dockerized Client Folder Model]],[[Media & Visual Layer]],[[Integration with Existing Maison Infrastructure]],[[Storage Architecture]],[[Schemas — All 10 Entity Types]]
