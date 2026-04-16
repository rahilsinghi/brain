---
status: failed
source_type: graphify-community
repo: maison-agent
community_id: 36
ingested_at: 2026-04-15T19:59:44.149Z
parsed_at: 2026-04-15T19:59:44.149Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca6A5717AkSuxJQnBbeQW"}
compile_progress: null
---



# maison-agent — Community 36

## Files in this cluster

- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/tools/site-analyzer.ts` — 6 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/test/routes/tools.test.ts` — 4 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/tools/site-analyzer.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/tools/site-analyzer.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/tools/site-analyzer.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/tools/site-analyzer.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/test/tools/site-analyzer.test.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/test/tools/site-analyzer.test.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/test/routes/tools.test.ts` — 1 connection

## Internal relationships

- `site_analyzer_test` → `site_analyzer` (imports_from)
- `site_analyzer_test` → `site_analyzer_test_mockfetchresponse` (contains)
- `tools_test` → `site_analyzer` (imports_from)
- `tools_test` → `tools_test_nexttestip` (contains)
- `site_analyzer` → `site_analyzer_isprivateip` (contains)
- `site_analyzer` → `site_analyzer_issafeurl` (contains)
- `site_analyzer` → `site_analyzer_detectframework` (contains)
- `site_analyzer` → `site_analyzer_analyzesite` (contains)
- `site_analyzer_isprivateip` → `site_analyzer_issafeurl` (calls)
- `site_analyzer_issafeurl` → `site_analyzer_analyzesite` (calls)
- `site_analyzer_detectframework` → `site_analyzer_analyzesite` (calls)

## External dependencies

- `auth` → `tools_test` (imports_from) [community 0]
- `tools_test` → `tools` (imports_from) [community 0]