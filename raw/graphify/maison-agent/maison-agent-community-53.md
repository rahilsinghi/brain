---
status: failed
source_type: graphify-community
repo: maison-agent
community_id: 53
ingested_at: 2026-04-15T19:59:44.146Z
parsed_at: 2026-04-15T19:59:44.146Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca6A4yd6tmk3acjqpZ2Bo"}
compile_progress: null
---



# maison-agent — Community 53

## Files in this cluster

- `/Users/rahilsinghi/Desktop/maison-agent/services/quality/src/scripts/sync-catalog.ts` — 4 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/quality/src/scripts/sync-catalog.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/quality/src/scripts/sync-catalog.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/quality/src/scripts/sync-catalog.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/quality/src/scripts/sync-catalog.ts` — 1 connection

## Internal relationships

- `sync_catalog` → `sync_catalog_extractjsdocbefore` (contains)
- `sync_catalog` → `sync_catalog_parsespecfile` (contains)
- `sync_catalog` → `sync_catalog_scansuites` (contains)
- `sync_catalog` → `sync_catalog_synctodatabase` (contains)
- `sync_catalog_extractjsdocbefore` → `sync_catalog_parsespecfile` (calls)
- `sync_catalog_parsespecfile` → `sync_catalog_scansuites` (calls)

## External dependencies

_none_