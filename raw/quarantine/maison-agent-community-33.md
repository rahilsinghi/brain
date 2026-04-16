---
status: quarantined
source_type: graphify-community
repo: maison-agent
community_id: 33
ingested_at: 2026-04-15T19:12:02.084Z
parsed_at: 2026-04-15T19:12:02.084Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca66JijLCG5xPHJPEkLSZ"}
compile_progress: null
quarantined_at: 2026-04-15T19:15:39.994Z
---






# maison-agent — Community 33

## Files in this cluster

- `/Users/rahilsinghi/Desktop/maison-agent/apps/console/src/renderer-client.ts` — 9 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/console/src/renderer-client.ts` — 5 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/console/src/renderer-client.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/console/src/renderer-client.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/console/src/renderer-client.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/console/src/renderer-client.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/console/src/renderer-client.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/console/src/renderer-client.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/console/src/renderer-client.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/console/src/renderer-client.ts` — 1 connection

## Internal relationships

- `renderer_client` → `renderer_client_segmenttolabel` (contains)
- `renderer_client` → `renderer_client_buildbreadcrumbnodes` (contains)
- `renderer_client` → `renderer_client_getpagecontent` (contains)
- `renderer_client` → `renderer_client_showpageloader` (contains)
- `renderer_client` → `renderer_client_injectcss` (contains)
- `renderer_client` → `renderer_client_updatebreadcrumb` (contains)
- `renderer_client` → `renderer_client_fetchrender` (contains)
- `renderer_client` → `renderer_client_renderpage` (contains)
- `renderer_client` → `renderer_client_rendercomponent` (contains)
- `renderer_client_segmenttolabel` → `renderer_client_buildbreadcrumbnodes` (calls)
- `renderer_client_buildbreadcrumbnodes` → `renderer_client_updatebreadcrumb` (calls)
- `renderer_client_getpagecontent` → `renderer_client_showpageloader` (calls)
- `renderer_client_getpagecontent` → `renderer_client_renderpage` (calls)
- `renderer_client_showpageloader` → `renderer_client_renderpage` (calls)
- `renderer_client_injectcss` → `renderer_client_renderpage` (calls)
- `renderer_client_injectcss` → `renderer_client_rendercomponent` (calls)
- `renderer_client_updatebreadcrumb` → `renderer_client_renderpage` (calls)

## External dependencies

_none_