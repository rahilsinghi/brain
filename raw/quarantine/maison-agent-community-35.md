---
status: quarantined
source_type: graphify-community
repo: maison-agent
community_id: 35
ingested_at: 2026-04-15T19:59:44.130Z
parsed_at: 2026-04-15T19:59:44.130Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca6AMh2vrG9zCgAuUpNky"}
compile_progress: null
quarantined_at: 2026-04-15T20:08:47.529Z
---






# maison-agent — Community 35

## Files in this cluster

- `/Users/rahilsinghi/Desktop/maison-agent/infra/test/pipeline-trigger-lambda.test.ts` — 8 connections
- `/Users/rahilsinghi/Desktop/maison-agent/infra/test/pipeline-trigger-lambda.test.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/infra/test/pipeline-trigger-lambda.test.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/infra/test/pipeline-trigger-lambda.test.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/infra/test/pipeline-trigger-lambda.test.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/infra/test/pipeline-trigger-lambda.test.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/infra/test/pipeline-trigger-lambda.test.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/infra/test/pipeline-trigger-lambda.test.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/infra/test/pipeline-trigger-lambda.test.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/infra/test/pipeline-trigger-lambda.test.ts` — 1 connection

## Internal relationships

- `pipeline_trigger_lambda_test` → `pipeline_trigger_lambda_test_sendimpl` (contains)
- `pipeline_trigger_lambda_test` → `pipeline_trigger_lambda_test_mockecsclient` (contains)
- `pipeline_trigger_lambda_test` → `pipeline_trigger_lambda_test_mockruntaskcommand` (contains)
- `pipeline_trigger_lambda_test` → `pipeline_trigger_lambda_test_sqsrecord` (contains)
- `pipeline_trigger_lambda_test` → `pipeline_trigger_lambda_test_sqsevent` (contains)
- `pipeline_trigger_lambda_test` → `pipeline_trigger_lambda_test_getlastcommand` (contains)
- `pipeline_trigger_lambda_test` → `pipeline_trigger_lambda_test_getcontaineroverride` (contains)
- `pipeline_trigger_lambda_test_sendimpl` → `pipeline_trigger_lambda_test_mockecsclient_send` (calls)
- `pipeline_trigger_lambda_test_mockecsclient` → `pipeline_trigger_lambda_test_mockecsclient_send` (method)
- `pipeline_trigger_lambda_test_mockruntaskcommand` → `pipeline_trigger_lambda_test_mockruntaskcommand_constructor` (method)

## External dependencies

- `pipeline_trigger_lambda_test` → `module` (imports_from) [community 2]