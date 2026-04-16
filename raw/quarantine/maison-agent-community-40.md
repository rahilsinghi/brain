---
status: quarantined
source_type: graphify-community
repo: maison-agent
community_id: 40
ingested_at: 2026-04-15T19:59:44.138Z
parsed_at: 2026-04-15T19:59:44.138Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca6APHhnX7R2RFp3vch6C"}
compile_progress: null
quarantined_at: 2026-04-15T20:09:09.175Z
---






# maison-agent — Community 40

## Files in this cluster

- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/publisher.ts` — 9 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/pubsub/src/publisher.ts` — 4 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/pubsub/src/publisher.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/pubsub/src/publisher.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/pubsub/src/publisher.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/pubsub/src/publisher.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/publisher.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/publisher.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/packages/pubsub/src/publisher.ts` — 1 connection

## Internal relationships

- `publisher` → `publisher_resolvecredentials` (contains)
- `publisher` → `publisher_sha256` (contains)
- `publisher` → `publisher_hmacsha256` (contains)
- `publisher` → `publisher_hmacsha256hex` (contains)
- `publisher` → `publisher_signrequest` (contains)
- `publisher` → `publisher_createpublisher` (contains)
- `publisher` → `publisher_getpublisher` (contains)
- `publisher` → `publisher_resetpublisher` (contains)
- `publisher_sha256` → `publisher_signrequest` (calls)
- `publisher_hmacsha256` → `publisher_signrequest` (calls)
- `publisher_hmacsha256hex` → `publisher_signrequest` (calls)

## External dependencies

- `publisher` → `telemetry` (imports_from) [community 0]