---
status: quarantined
source_type: graphify-community
repo: maison-agent
community_id: 16
ingested_at: 2026-04-15T19:12:02.071Z
parsed_at: 2026-04-15T19:12:02.071Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca66FjMTHhJfEqwXVCCFE"}
compile_progress: null
quarantined_at: 2026-04-15T19:14:59.529Z
---






# maison-agent — Community 16

## Files in this cluster

- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 13 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 9 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 5 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 5 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 4 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 4 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 4 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 1 connection

## Internal relationships

- `pinecone` → `plugin_pineconedatasource` (contains)
- `pinecone` → `plugin_pineconequery` (contains)
- `pinecone` → `plugin_pineconesettings` (contains)
- `pinecone` → `pinecone_newpineconedatasource` (contains)
- `pinecone` → `pinecone_modelprovider` (contains)
- `plugin_pineconedatasource` → `plugin_pineconedatasource_dispose` (method)
- `plugin_pineconedatasource` → `plugin_pineconedatasource_checkhealth` (method)
- `plugin_pineconedatasource` → `plugin_pineconedatasource_querydata` (method)
- `plugin_pineconedatasource` → `plugin_pineconedatasource_configuredproviders` (method)
- `plugin_pineconedatasource` → `plugin_pineconedatasource_handletextsearch` (method)
- `plugin_pineconedatasource` → `plugin_pineconedatasource_embed` (method)
- `plugin_pineconedatasource` → `plugin_pineconedatasource_embedopenai` (method)
- `plugin_pineconedatasource` → `plugin_pineconedatasource_embedgoogle` (method)
- `plugin_pineconedatasource` → `plugin_pineconedatasource_handlequery` (method)
- `plugin_pineconedatasource` → `plugin_pineconedatasource_handlefetch` (method)
- `plugin_pineconedatasource` → `plugin_pineconedatasource_handlelistnamespaces` (method)
- `plugin_pineconedatasource` → `plugin_pineconedatasource_dorequest` (method)
- `plugin_pineconedatasource_querydata` → `plugin_pineconedatasource_handlequery` (calls)
- `plugin_pineconedatasource_querydata` → `plugin_pineconedatasource_handletextsearch` (calls)
- `plugin_pineconedatasource_querydata` → `plugin_pineconedatasource_handlefetch` (calls)
- `plugin_pineconedatasource_querydata` → `plugin_pineconedatasource_handlelistnamespaces` (calls)
- `plugin_pineconedatasource_handletextsearch` → `pinecone_modelprovider` (calls)
- `plugin_pineconedatasource_handletextsearch` → `plugin_pineconedatasource_embed` (calls)
- `plugin_pineconedatasource_handletextsearch` → `plugin_pineconedatasource_handlequery` (calls)
- `plugin_pineconedatasource_embed` → `plugin_pineconedatasource_embedopenai` (calls)
- `plugin_pineconedatasource_embed` → `plugin_pineconedatasource_embedgoogle` (calls)
- `plugin_pineconedatasource_handlequery` → `plugin_pineconedatasource_dorequest` (calls)
- `plugin_pineconedatasource_handlefetch` → `plugin_pineconedatasource_dorequest` (calls)
- `plugin_pineconedatasource_handlelistnamespaces` → `plugin_pineconedatasource_dorequest` (calls)

## External dependencies

- `pinecone` → `context` (imports_from) [community 1]
- `pinecone` → `http` (imports_from) [community 4]
- `pinecone` → `data` (imports_from) [community 2]
- `pinecone` → `ma_741_migrate_mongo_pinecone` (imports_from) [community 4]