---
status: quarantined
source_type: graphify-community
repo: maison-agent
community_id: 32
ingested_at: 2026-04-15T19:12:02.072Z
parsed_at: 2026-04-15T19:12:02.072Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca66FbXfDSp5f4n7dgaQm"}
compile_progress: null
quarantined_at: 2026-04-15T19:14:57.585Z
---






# maison-agent — Community 32

## Files in this cluster

- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/s3.go` — 7 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/s3.go` — 7 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/s3.go` — 4 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/s3.go` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/s3.go` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/s3.go` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/s3.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/s3.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/s3.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/s3.go` — 1 connection

## Internal relationships

- `s3` → `s3` (imports_from)
- `s3` → `plugin_s3datasource` (contains)
- `s3` → `plugin_s3query` (contains)
- `s3` → `s3_news3datasource` (contains)
- `plugin_s3datasource` → `plugin_s3datasource_dispose` (method)
- `plugin_s3datasource` → `plugin_s3datasource_checkhealth` (method)
- `plugin_s3datasource` → `plugin_s3datasource_querydata` (method)
- `plugin_s3datasource` → `plugin_s3datasource_handlelistobjects` (method)
- `plugin_s3datasource` → `plugin_s3datasource_handlegetobject` (method)
- `plugin_s3datasource` → `plugin_s3datasource_handleobjectmetadata` (method)
- `plugin_s3datasource_querydata` → `plugin_s3datasource_handlelistobjects` (calls)
- `plugin_s3datasource_querydata` → `plugin_s3datasource_handlegetobject` (calls)
- `plugin_s3datasource_querydata` → `plugin_s3datasource_handleobjectmetadata` (calls)

## External dependencies

- `s3` → `context` (imports_from) [community 1]
- `s3` → `data` (imports_from) [community 2]