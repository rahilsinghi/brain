---
status: processed
source_type: graphify-community
repo: maison-agent
community_id: 19
ingested_at: 2026-04-15T19:59:44.130Z
parsed_at: 2026-04-15T19:59:44.130Z
compiled_to: "[[AWS ECS Agent and Quality Service Infrastructure]]"
processed_at: 2026-04-15T20:04:20.045Z
retry_count: 0
last_error: null
compile_progress: null
---



# maison-agent — Community 19

## Files in this cluster

- `/Users/rahilsinghi/Desktop/maison-agent/infra/lib/agent-server-ecs-stack.ts` — 5 connections
- `/Users/rahilsinghi/Desktop/maison-agent/infra/lib/quality-ecs-stack.ts` — 5 connections
- `/Users/rahilsinghi/Desktop/maison-agent/infra/lib/helpers/firelens.ts` — 4 connections
- `/Users/rahilsinghi/Desktop/maison-agent/infra/lib/agent-server-ecs-stack.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/infra/lib/agent-server-ecs-stack.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/infra/lib/agent-server-ecs-stack.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/infra/test/agent-server-ecs-stack.test.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/infra/test/helpers/firelens.test.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/infra/lib/quality-ecs-stack.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/infra/lib/quality-ecs-stack.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/infra/lib/quality-ecs-stack.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/infra/test/quality-ecs-stack.test.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/infra/test/agent-server-ecs-stack.test.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/infra/lib/helpers/firelens.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/infra/test/helpers/firelens.test.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/infra/test/quality-ecs-stack.test.ts` — 1 connection

## Internal relationships

- `quality_ecs_stack_test` → `quality_ecs_stack` (imports_from)
- `quality_ecs_stack_test` → `quality_ecs_stack_test_makestack` (contains)
- `agent_server_ecs_stack_test` → `agent_server_ecs_stack` (imports_from)
- `agent_server_ecs_stack_test` → `agent_server_ecs_stack_test_makestack` (contains)
- `firelens_test` → `firelens` (imports_from)
- `firelens_test` → `firelens_test_maketaskdef` (contains)
- `quality_ecs_stack` → `firelens` (imports_from)
- `quality_ecs_stack` → `quality_ecs_stack_isibucket` (contains)
- `quality_ecs_stack` → `quality_ecs_stack_qualityecsstack` (contains)
- `quality_ecs_stack_isibucket` → `quality_ecs_stack_qualityecsstack_constructor` (calls)
- `quality_ecs_stack_qualityecsstack` → `quality_ecs_stack_qualityecsstack_constructor` (method)
- `agent_server_ecs_stack` → `firelens` (imports_from)
- `agent_server_ecs_stack` → `agent_server_ecs_stack_isibucket` (contains)
- `agent_server_ecs_stack` → `agent_server_ecs_stack_agentserverecsstack` (contains)
- `agent_server_ecs_stack_isibucket` → `agent_server_ecs_stack_agentserverecsstack_constructor` (calls)
- `agent_server_ecs_stack_agentserverecsstack` → `agent_server_ecs_stack_agentserverecsstack_constructor` (method)
- `firelens` → `firelens_addfirelenstoloki` (contains)

## External dependencies

- `agent_infrastructure` → `agent_server_ecs_stack` (imports_from) [community 1]
- `agent_infrastructure` → `quality_ecs_stack` (imports_from) [community 1]