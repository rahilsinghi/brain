---
status: processed
source_type: graphify-community
repo: maison-agent
community_id: 10
ingested_at: 2026-04-15T19:59:44.132Z
parsed_at: 2026-04-15T19:59:44.132Z
compiled_to: "[[Distributed Telemetry and LLM Observability]]"
processed_at: 2026-04-15T20:16:12.190Z
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca6AJaeNo77UAnrRp4EKg"}
compile_progress: null
---





# maison-agent — Community 10

## Files in this cluster

- `/Users/rahilsinghi/Desktop/maison-agent/packages/telemetry/src/tracer.ts` — 12 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/app.go` — 8 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/telemetry/src/middleware/http.ts` — 8 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/a2ui-renderer/src/pages/health.ts` — 6 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/telemetry/src/llm/langfuse.ts` — 6 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/telemetry/src/llm/openai.ts` — 6 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/telemetry/src/llm/gemini.ts` — 5 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/app.go` — 5 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/telemetry/test/middleware/http.test.ts` — 4 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/telemetry/src/tracer.ts` — 4 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/telemetry/test/health.test.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/telemetry/src/llm/langfuse.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/telemetry/src/llm/langfuse.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/telemetry/src/tracer.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/telemetry/test/tracer.test.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/browser-telemetry/src/tracer.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/telemetry/src/tracer.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/app.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/app.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/packages/telemetry/src/llm/gemini.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/packages/telemetry/src/health.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/a2ui-renderer/src/pages/health.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/packages/telemetry/src/health.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/packages/telemetry/test/health.test.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/packages/telemetry/src/middleware/http.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/packages/telemetry/test/middleware/http.test.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/packages/telemetry/src/llm/openai.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/app.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/app.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/app.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/app.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/app.go` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/packages/browser-telemetry/src/tracer.ts` — 1 connection

## Internal relationships

- `app` → `http` (imports_from)
- `app` → `plugin_app` (contains)
- `app` → `plugin_appsettings` (contains)
- `app` → `app_newapp` (contains)
- `app` → `app_getappsettings` (contains)
- `plugin_app` → `plugin_app_dispose` (method)
- `plugin_app` → `plugin_app_checkhealth` (method)
- `plugin_app` → `plugin_app_handleaiproxy` (method)
- `plugin_app` → `plugin_app_handlesettings` (method)
- `tracer` → `tracer_gettracer` (contains)
- `tracer` → `tracer_injecttraceheaders` (contains)
- `tracer` → `tracer_withbrowserspan` (contains)
- `tracer` → `tracer_test` (imports_from)
- `tracer` → `http_test` (imports_from)
- `tracer` → `tracer_startspan` (contains)
- `tracer` → `tracer_withspan` (contains)
- `tracer` → `health` (imports_from)
- `tracer` → `http` (imports_from)
- `tracer` → `openai` (imports_from)
- `tracer` → `gemini` (imports_from)
- `tracer_gettracer` → `tracer_withbrowserspan` (calls)
- `tracer_gettracer` → `tracer_startspan` (calls)
- `tracer_gettracer` → `tracer_withspan` (calls)
- `health_test` → `health` (imports_from)
- `health_test` → `health_test_makemockspan` (contains)
- `http_test` → `http` (imports_from)
- `http_test` → `http_test_makespan` (contains)
- `health` → `health_recordhealthcheck` (contains)
- `health` → `health_createhealthcheckspan` (contains)
- `health` → `health_get` (contains)
- `http` → `http_httptracemiddleware` (contains)
- `openai` → `langfuse` (imports_from)
- `openai` → `openai_tracedopenaichat` (contains)
- `gemini` → `langfuse` (imports_from)
- `gemini` → `gemini_tracedgeminichat` (contains)
- `langfuse` → `langfuse` (imports_from)
- `langfuse` → `langfuse_getlangfuseclient` (contains)
- `langfuse` → `langfuse_getprompt` (contains)
- `langfuse_getlangfuseclient` → `langfuse_getprompt` (calls)

## External dependencies

- `pinecone` → `http` (imports_from) [community 14]
- `pinecone_test` → `http` (imports_from) [community 6]
- `multi` → `http` (imports_from) [community 11]
- `app` → `context` (imports_from) [community 6]
- `app` → `agent_inject` (imports_from) [community 7]
- `app` → `auth` (imports_from) [community 0]
- `types` → `openai` (imports_from) [community 2]
- `types` → `gemini` (imports_from) [community 2]
- `ma_741_migrate_mongo_pinecone` → `openai` (imports_from) [community 14]
- `tracer` → `api` (imports_from) [community 0]
- `tracer_test` → `api` (imports_from) [community 0]
- `http_test` → `api` (imports_from) [community 0]
- `health` → `api` (imports_from) [community 0]
- `http` → `api` (imports_from) [community 0]
- `openai` → `api` (imports_from) [community 0]
- `gemini` → `api` (imports_from) [community 0]