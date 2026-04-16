---
status: quarantined
source_type: graphify-community
repo: maison-agent
community_id: 21
ingested_at: 2026-04-15T19:59:44.146Z
parsed_at: 2026-04-15T19:59:44.146Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca6APR2payR9jAYL91abz"}
compile_progress: null
quarantined_at: 2026-04-15T20:09:11.119Z
---






# maison-agent — Community 21

## Files in this cluster

- `/Users/rahilsinghi/Desktop/maison-agent/services/quality/src/reporters/db-session.ts` — 8 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/quality/src/reporters/db-session.ts` — 8 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/quality/src/reporters/db-session.ts` — 6 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/quality/src/reporters/db-session.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/quality/src/reporters/db-session.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/quality/src/reporters/db-session.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/quality/src/reporters/db-session.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/quality/src/reporters/db-session.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/quality/src/reporters/db-session.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/quality/src/reporters/db-session.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/quality/src/reporters/db-session.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/quality/src/reporters/db-session.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/quality/src/reporters/db-session.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/quality/src/reporters/db-session.ts` — 2 connections

## Internal relationships

- `db_session` → `db_session_inferbrowser` (contains)
- `db_session` → `db_session_resolvesessionstatus` (contains)
- `db_session` → `db_session_resolvetestcasestatus` (contains)
- `db_session` → `db_session_generatesuggestion` (contains)
- `db_session` → `db_session_resolveartifacttype` (contains)
- `db_session` → `db_session_getfilesize` (contains)
- `db_session` → `db_session_joinlogentries` (contains)
- `db_session` → `db_session_dbsessionreporter` (contains)
- `db_session_inferbrowser` → `db_session_dbsessionreporter_writeresult` (calls)
- `db_session_resolvesessionstatus` → `db_session_dbsessionreporter_onend` (calls)
- `db_session_resolvetestcasestatus` → `db_session_dbsessionreporter_writeresult` (calls)
- `db_session_generatesuggestion` → `db_session_dbsessionreporter_writeresult` (calls)
- `db_session_resolveartifacttype` → `db_session_dbsessionreporter_writeresult` (calls)
- `db_session_getfilesize` → `db_session_dbsessionreporter_writeresult` (calls)
- `db_session_joinlogentries` → `db_session_dbsessionreporter_writeresult` (calls)
- `db_session_dbsessionreporter` → `db_session_dbsessionreporter_onbegin` (method)
- `db_session_dbsessionreporter` → `db_session_dbsessionreporter_createsession` (method)
- `db_session_dbsessionreporter` → `db_session_dbsessionreporter_ontestend` (method)
- `db_session_dbsessionreporter` → `db_session_dbsessionreporter_writeresult` (method)
- `db_session_dbsessionreporter` → `db_session_dbsessionreporter_onend` (method)
- `db_session_dbsessionreporter_onbegin` → `db_session_dbsessionreporter_createsession` (calls)
- `db_session_dbsessionreporter_ontestend` → `db_session_dbsessionreporter_writeresult` (calls)

## External dependencies

_none_