---
status: failed
source_type: graphify-community
repo: maison-agent
community_id: 62
ingested_at: 2026-04-15T19:59:44.148Z
parsed_at: 2026-04-15T19:59:44.148Z
compiled_to: "[[A2UI Template Expansion and Data Path Rewriting]]"
processed_at: 2026-04-15T20:00:28.284Z
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca6AM6neofM2UwCCMmnjA"}
compile_progress: null
---





# maison-agent — Community 62

## Files in this cluster

- `/Users/rahilsinghi/Desktop/maison-agent/services/a2ui-renderer/src/lib/template-expander.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/a2ui-renderer/src/lib/template-expander.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/a2ui-renderer/src/lib/template-expander.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/a2ui-renderer/src/lib/template-expander.ts` — 2 connections

## Internal relationships

- `template_expander` → `template_expander_collectsubtree` (contains)
- `template_expander` → `template_expander_rewriteitempaths` (contains)
- `template_expander` → `template_expander_expandtemplates` (contains)
- `template_expander_collectsubtree` → `template_expander_expandtemplates` (calls)
- `template_expander_rewriteitempaths` → `template_expander_expandtemplates` (calls)

## External dependencies

_none_