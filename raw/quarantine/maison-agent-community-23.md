---
status: quarantined
source_type: graphify-community
repo: maison-agent
community_id: 23
ingested_at: 2026-04-15T19:12:02.089Z
parsed_at: 2026-04-15T19:12:02.089Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca66KiVikW8RynCR1oGkR"}
compile_progress: null
quarantined_at: 2026-04-15T19:15:53.493Z
---






# maison-agent — Community 23

## Files in this cluster

- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/a2a/methods.ts` — 13 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/a2a/methods.ts` — 10 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/a2a/methods.ts` — 9 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/a2a/methods.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/a2a/methods.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/a2a/methods.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/a2a/methods.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/a2a/methods.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/a2a/methods.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/a2a/methods.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/a2a/methods.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/a2a/methods.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/test/a2a/methods.test.ts` — 2 connections

## Internal relationships

- `methods_test` → `methods` (imports_from)
- `methods` → `methods_rpcresult` (contains)
- `methods` → `methods_rpcerror` (contains)
- `methods` → `methods_taskssend` (contains)
- `methods` → `methods_tasksget` (contains)
- `methods` → `methods_taskscancel` (contains)
- `methods` → `methods_clientslist` (contains)
- `methods` → `methods_clientsget` (contains)
- `methods` → `methods_clientscreate` (contains)
- `methods` → `methods_clientsupdate` (contains)
- `methods` → `methods_clientsdisable` (contains)
- `methods` → `methods_dispatch` (contains)
- `methods_rpcresult` → `methods_taskssend` (calls)
- `methods_rpcresult` → `methods_tasksget` (calls)
- `methods_rpcresult` → `methods_taskscancel` (calls)
- `methods_rpcresult` → `methods_clientslist` (calls)
- `methods_rpcresult` → `methods_clientsget` (calls)
- `methods_rpcresult` → `methods_clientscreate` (calls)
- `methods_rpcresult` → `methods_clientsupdate` (calls)
- `methods_rpcresult` → `methods_clientsdisable` (calls)
- `methods_rpcerror` → `methods_taskssend` (calls)
- `methods_rpcerror` → `methods_tasksget` (calls)
- `methods_rpcerror` → `methods_taskscancel` (calls)
- `methods_rpcerror` → `methods_clientslist` (calls)
- `methods_rpcerror` → `methods_clientsget` (calls)
- `methods_rpcerror` → `methods_clientscreate` (calls)
- `methods_rpcerror` → `methods_clientsupdate` (calls)
- `methods_rpcerror` → `methods_clientsdisable` (calls)
- `methods_rpcerror` → `methods_dispatch` (calls)

## External dependencies

- `types` → `methods_test` (imports_from) [community 2]
- `telemetry` → `methods` (imports_from) [community 1]