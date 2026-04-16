---
status: quarantined
source_type: graphify-community
repo: maison-agent
community_id: 14
ingested_at: 2026-04-15T19:12:02.076Z
parsed_at: 2026-04-15T19:12:02.076Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca66Pc4sVyXuR7CggVK32"}
compile_progress: null
quarantined_at: 2026-04-15T19:16:46.212Z
---






# maison-agent — Community 14

## Files in this cluster

- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/services/clients.ts` — 17 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/test/services/clients.test.ts` — 8 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/routes/clients.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/services/clients.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/routes/clients.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/services/clients.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/routes/clients.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/services/clients.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/services/clients.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/services/clients.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/routes/clients.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/services/clients.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/routes/clients.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/test/routes/clients.test.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/test/services/clients.test.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/test/routes/clients.test.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/test/routes/clients.test.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/test/routes/clients.test.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/test/routes/clients.test.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/test/routes/clients.test.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/services/clients.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/routes/clients.ts` — 1 connection

## Internal relationships

- `clients_test` → `clients` (imports_from)
- `clients_test` → `clients_test_createapp` (contains)
- `clients_test` → `clients_test_setupreadauth` (contains)
- `clients_test` → `clients_test_setupwriteauth` (contains)
- `clients_test` → `clients_test_setupnoauth` (contains)
- `clients_test` → `clients_test_setupnopermission` (contains)
- `clients_test` → `clients_test_setupdenypermission` (contains)
- `clients_test` → `clients_test_makepool` (contains)
- `clients` → `clients_checkauth` (contains)
- `clients` → `clients_listclientshandler` (contains)
- `clients` → `clients_getclienthandler` (contains)
- `clients` → `clients_createclienthandler` (contains)
- `clients` → `clients_updateclienthandler` (contains)
- `clients` → `clients_deleteclienthandler` (contains)
- `clients` → `clients_encodecursor` (contains)
- `clients` → `clients_decodecursor` (contains)
- `clients` → `clients_listclients` (contains)
- `clients` → `clients_getclient` (contains)
- `clients` → `clients_createclient` (contains)
- `clients` → `clients_updateclient` (contains)
- `clients` → `clients_disableclient` (contains)

## External dependencies

- `clients` → `api` (imports_from) [community 1]
- `clients` → `auth` (imports_from) [community 5]
- `clients` → `telemetry` (imports_from) [community 1]