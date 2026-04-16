---
status: processed
source_type: graphify-community
repo: maison-agent
community_id: 11
ingested_at: 2026-04-15T19:59:44.131Z
parsed_at: 2026-04-15T19:59:44.131Z
compiled_to: "[[Grafana DynamoDB Integration and Multi-Source Data Handling]]"
processed_at: 2026-04-15T20:09:08.553Z
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca6AMognSYoJQQNUQTnng"}
compile_progress: null
---





# maison-agent — Community 11

## Files in this cluster

- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/dynamodb.go` — 12 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/multi.go` — 10 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/dynamodb.go` — 9 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/multi.go` — 8 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/dynamodb.go` — 7 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/dynamodb.go` — 5 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/multi.go` — 4 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/dynamodb.go` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/dynamodb.go` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/dynamodb.go` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/dynamodb.go` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/multi.go` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/dynamodb.go` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/dynamodb.go` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/dynamodb.go` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/dynamodb.go` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/multi.go` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/multi.go` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/dynamodb.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/multi.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/dynamodb.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/dynamodb.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/multi.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/multi.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/multi.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/multi.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/multi.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/multi.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/multi.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/multi.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/multi.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/multi.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/multi.go` — 1 connection

## Internal relationships

- `dynamodb` → `dynamodb` (imports_from)
- `dynamodb` → `plugin_dynamodbdatasource` (contains)
- `dynamodb` → `plugin_dynamodbquery` (contains)
- `dynamodb` → `dynamodb_newdynamodbdatasource` (contains)
- `dynamodb` → `dynamodb_attributevaluetostring` (contains)
- `dynamodb` → `dynamodb_tryprettifyjson` (contains)
- `dynamodb` → `dynamodb_intptr` (contains)
- `dynamodb` → `multi` (imports_from)
- `plugin_dynamodbdatasource` → `plugin_dynamodbdatasource_dispose` (method)
- `plugin_dynamodbdatasource` → `plugin_dynamodbdatasource_checkhealth` (method)
- `plugin_dynamodbdatasource` → `plugin_dynamodbdatasource_querydata` (method)
- `plugin_dynamodbdatasource` → `plugin_dynamodbdatasource_handlegetitem` (method)
- `plugin_dynamodbdatasource` → `plugin_dynamodbdatasource_handlequery` (method)
- `plugin_dynamodbdatasource` → `plugin_dynamodbdatasource_handlescan` (method)
- `plugin_dynamodbdatasource` → `plugin_dynamodbdatasource_handlepartiql` (method)
- `plugin_dynamodbdatasource` → `plugin_dynamodbdatasource_itemstodataresponse` (method)
- `plugin_dynamodbdatasource_checkhealth` → `dynamodb_intptr` (calls)
- `plugin_dynamodbdatasource_querydata` → `plugin_dynamodbdatasource_handlegetitem` (calls)
- `plugin_dynamodbdatasource_querydata` → `plugin_dynamodbdatasource_handlequery` (calls)
- `plugin_dynamodbdatasource_querydata` → `plugin_dynamodbdatasource_handlescan` (calls)
- `plugin_dynamodbdatasource_querydata` → `plugin_dynamodbdatasource_handlepartiql` (calls)
- `plugin_dynamodbdatasource_handlegetitem` → `plugin_dynamodbdatasource_itemstodataresponse` (calls)
- `plugin_dynamodbdatasource_handlequery` → `plugin_dynamodbdatasource_itemstodataresponse` (calls)
- `plugin_dynamodbdatasource_handlescan` → `plugin_dynamodbdatasource_itemstodataresponse` (calls)
- `plugin_dynamodbdatasource_handlepartiql` → `plugin_dynamodbdatasource_itemstodataresponse` (calls)
- `plugin_dynamodbdatasource_itemstodataresponse` → `dynamodb_attributevaluetostring` (calls)
- `plugin_dynamodbdatasource_itemstodataresponse` → `dynamodb_tryprettifyjson` (calls)
- `multi` → `plugin_multihandler` (contains)
- `multi` → `plugin_multiprovider` (contains)
- `multi` → `multi_newmultihandler` (contains)
- `multi` → `plugin_tablelistresponse` (contains)
- `multi` → `plugin_keyschema` (contains)
- `multi` → `plugin_indexinfo` (contains)
- `multi` → `plugin_tabledescriberesponse` (contains)
- `plugin_multihandler` → `plugin_multihandler_querydata` (method)
- `plugin_multihandler` → `plugin_multihandler_checkhealth` (method)
- `plugin_multihandler` → `plugin_multihandler_callresourcehandler` (method)
- `plugin_multihandler` → `plugin_multihandler_getdynamodbinstance` (method)
- `plugin_multihandler` → `plugin_multihandler_handlelisttables` (method)
- `plugin_multihandler` → `plugin_multihandler_handledescribetable` (method)
- `plugin_multihandler` → `plugin_multihandler_handleembeddingconfig` (method)
- `plugin_multiprovider` → `plugin_multiprovider_getkey` (method)
- `plugin_multiprovider` → `plugin_multiprovider_needsupdate` (method)
- `plugin_multiprovider` → `plugin_multiprovider_newinstance` (method)
- `plugin_multihandler_getdynamodbinstance` → `plugin_multihandler_handlelisttables` (calls)
- `plugin_multihandler_getdynamodbinstance` → `plugin_multihandler_handledescribetable` (calls)

## External dependencies

- `dynamodb` → `context` (imports_from) [community 6]
- `dynamodb` → `types` (imports_from) [community 2]
- `dynamodb` → `data` (imports_from) [community 2]
- `multi` → `context` (imports_from) [community 6]
- `multi` → `http` (imports_from) [community 10]