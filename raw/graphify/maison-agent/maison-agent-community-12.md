---
status: processed
source_type: graphify-community
repo: maison-agent
community_id: 12
ingested_at: 2026-04-15T19:59:44.142Z
parsed_at: 2026-04-15T19:59:44.142Z
compiled_to: "[[User Management and Email Notification Infrastructure]]"
processed_at: 2026-04-17T02:55:53.423Z
retry_count: 0
last_error: null
compile_progress: null
---






# maison-agent — Community 12

## Files in this cluster

- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/app/api/users/[id]/resend-invite/route.ts` — 13 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/mcp/server.ts` — 9 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/lib/require-auth.ts` — 7 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/lib/email.ts` — 5 connections
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/db.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/lib/email.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/lib/executor-ecs.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/lib/executor-local.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/test/lib/require-auth.test.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/app/api/users/[id]/resend-invite/route.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/lib/email.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/lib/email.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/middleware.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/app/api/tests/run/rerun/route.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/app/api/users/route.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/lib/db.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/test/lib/db.test.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/test/lib/email.test.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/lib/executor-ecs.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/test/lib/executor-ecs.test.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/lib/executor-local.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/test/lib/executor-local.test.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/middleware.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/lib/require-auth.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/lib/require-auth.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/app/api/users/[id]/route.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/app/api/sessions/[id]/route.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/server.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/mcp/server.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/src/server.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/services/api/test/mcp/server.test.ts` — 1 connection

## Internal relationships

- `db_test` → `db` (imports_from)
- `email_test` → `email` (imports_from)
- `executor_ecs_test` → `executor_ecs` (imports_from)
- `executor_local_test` → `executor_local` (imports_from)
- `require_auth_test` → `server` (imports_from)
- `require_auth_test` → `require_auth` (imports_from)
- `middleware` → `server` (imports_from)
- `middleware` → `middleware_middleware` (contains)
- `route` → `server` (imports_from)
- `route` → `require_auth` (imports_from)
- `route` → `db` (imports_from)
- `route` → `route_get` (contains)
- `route` → `route_post` (contains)
- `route` → `executor_local` (imports_from)
- `route` → `executor_ecs` (imports_from)
- `route` → `route_escaperegex` (contains)
- `route` → `route_patch` (contains)
- `route` → `email` (imports_from)
- `route` → `route_delete` (contains)
- `route_get` → `route_post` (calls)
- `route_post` → `route_escaperegex` (calls)
- `require_auth` → `server` (imports_from)
- `require_auth` → `require_auth_requireauth` (contains)
- `require_auth` → `require_auth_isauthenticated` (contains)
- `executor_ecs` → `executor_ecs_executeecs` (contains)
- `email` → `email_getfromaddress` (contains)
- `email` → `email_sendinviteemail` (contains)
- `email` → `email_sendpasswordresetemail` (contains)
- `email_getfromaddress` → `email_sendinviteemail` (calls)
- `email_getfromaddress` → `email_sendpasswordresetemail` (calls)
- `executor_local` → `executor_local_executelocal` (contains)
- `db` → `db_getpool` (contains)
- `server_test` → `server` (imports_from)
- `server` → `server_createapp` (contains)
- `server` → `server_origin` (contains)
- `server` → `server_createmcpserver` (contains)

## External dependencies

- `types` → `route` (imports_from) [community 2]
- `types` → `require_auth` (imports_from) [community 2]
- `auth` → `require_auth_test` (imports_from) [community 0]
- `auth` → `route` (imports_from) [community 0]
- `auth` → `require_auth` (imports_from) [community 0]
- `telemetry` → `server` (imports_from) [community 0]