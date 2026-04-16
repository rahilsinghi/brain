---
status: processed
source_type: graphify-community
repo: maison-agent
community_id: 14
ingested_at: 2026-04-15T19:59:44.131Z
parsed_at: 2026-04-15T19:59:44.131Z
compiled_to: "[[Pinecone Vector Database Integration and Grafana Plugin]]"
processed_at: 2026-04-15T20:11:15.817Z
retry_count: 0
last_error: null
compile_progress: null
---





# maison-agent — Community 14

## Files in this cluster

- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 13 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 9 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/database/scripts/ma-741-migrate-mongo-pinecone.js` — 8 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 5 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 5 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/database/scripts/ma-741-migrate-mongo-pinecone.js` — 4 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 4 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 4 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 4 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/database/scripts/ma-741-migrate-mongo-pinecone.js` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/database/scripts/ma-741-migrate-mongo-pinecone.js` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/database/scripts/ma-741-migrate-mongo-pinecone.js` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/database/scripts/ma-741-migrate-mongo-pinecone.js` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/database/scripts/ma-741-migrate-mongo-pinecone.js` — 1 connection
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
- `pinecone` → `ma_741_migrate_mongo_pinecone` (imports_from)
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
- `ma_741_migrate_mongo_pinecone` → `ma_741_migrate_mongo_pinecone_main` (contains)
- `ma_741_migrate_mongo_pinecone` → `ma_741_migrate_mongo_pinecone_ensurepineconeindex` (contains)
- `ma_741_migrate_mongo_pinecone` → `ma_741_migrate_mongo_pinecone_getwebsiteinfo` (contains)
- `ma_741_migrate_mongo_pinecone` → `ma_741_migrate_mongo_pinecone_transformrecord` (contains)
- `ma_741_migrate_mongo_pinecone` → `ma_741_migrate_mongo_pinecone_pushtopinecone` (contains)
- `ma_741_migrate_mongo_pinecone` → `ma_741_migrate_mongo_pinecone_updateallrecords` (contains)
- `ma_741_migrate_mongo_pinecone_main` → `ma_741_migrate_mongo_pinecone_ensurepineconeindex` (calls)
- `ma_741_migrate_mongo_pinecone_main` → `ma_741_migrate_mongo_pinecone_transformrecord` (calls)
- `ma_741_migrate_mongo_pinecone_main` → `ma_741_migrate_mongo_pinecone_pushtopinecone` (calls)
- `ma_741_migrate_mongo_pinecone_getwebsiteinfo` → `ma_741_migrate_mongo_pinecone_transformrecord` (calls)

## External dependencies

- `pinecone` → `context` (imports_from) [community 6]
- `pinecone` → `http` (imports_from) [community 10]
- `pinecone` → `data` (imports_from) [community 2]
- `ma_741_migrate_mongo_pinecone` → `openai` (imports_from) [community 10]