---
status: processed
source_type: api
channel: claude-code
source_id: api/articles/maison-travel-v0-content-layer-notion-pages-published-apri-1776444917398.md
ingested_at: 2026-04-17T16:55:17.398Z
parsed_at: null
compiled_to: "[[Maison Travel V0 Content Layer — Notion Pages]]"
processed_at: 2026-04-17T16:56:18.125Z
retry_count: 0
last_error: null
compile_progress: null
---



# Maison Travel V0 Content Layer — Notion Pages

## Summary
On April 17, 2026, Rahil designed and published the full V0 Content Layer spec to Notion under the Maison.Travel PoC page. 7 technical spec documents were pushed as child pages.

## Parent Page
- **Maison.Travel PoC**: https://www.notion.so/3158b6104b1d80b99a20f357dc7227ec

## Published Pages (all under V0 Content Layer — Master Architecture)

| Page | Notion ID | URL |
|------|-----------|-----|
| V0 Content Layer — Master Architecture | 3458b610-4b1d-81f9-b792-e40dd3d5d57f | https://www.notion.so/3458b6104b1d81f9b792e40dd3d5d57f |
| Schemas — All 10 Entity Types | 3458b610-4b1d-812d-a317-c51c73a57b11 | https://www.notion.so/3458b6104b1d812da317c51c73a57b11 |
| Storage Architecture | 3458b610-4b1d-8147-8c29-ea62df12e410 | https://www.notion.so/3458b6104b1d81478c29ea62df12e410 |
| Data Sources & V0→V1 Strategy | 3458b610-4b1d-8181-a303-d63bc12cc474 | https://www.notion.so/3458b6104b1d8181a303d63bc12cc474 |
| Dockerized Client Folder Model | 3458b610-4b1d-81d2-9844-e52b23808755 | https://www.notion.so/3458b6104b1d81d29844e52b23808755 |
| Media & Visual Layer | 3458b610-4b1d-8100-9460-f5ac87a4732d | https://www.notion.so/3458b6104b1d81009460f5ac87a4732d |
| Integration with Existing Maison Infrastructure | 3458b610-4b1d-81bb-845f-c82cba6e2b95 | https://www.notion.so/3458b6104b1d81bb845fc82cba6e2b95 |

## What the Spec Covers
- 10 JSON-LD schemas: Hotel, Room, Amenity (10 sub-types), Policy, Offer, Experience, Media, Rates, FAQ, Event
- Storage: JSON-first + Postgres materialized view + Redis cache (Option G)
- Per-hotel "dockerized client" folder: hotels/{slug}/data/*.json is source of truth
- Media pipeline: CLIP embeddings via Cohere Embed v3, VLM captions via Claude 3.5 Sonnet
- Integration hook: Stage 3.5 SQS emit from Python scraper → TS normalizer Lambda
- Deadline: Memorial Day May 25, 2026

## Spec file location
`/Users/rahilsinghi/Desktop/brain/.claude/worktrees/laughing-beaver/docs/specs/v0-content-layer/`
