---
status: processed
source_type: graphify-community
repo: maison-agent
community_id: 9
ingested_at: 2026-04-15T19:59:44.142Z
parsed_at: 2026-04-15T19:59:44.142Z
compiled_to: "[[Core Frontend Infrastructure and Service Endpoint Configuration]]"
processed_at: 2026-04-15T20:06:48.629Z
retry_count: 0
last_error: null
compile_progress: null
---



# maison-agent — Community 9

## Files in this cluster

- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/components/layout/TopNav.tsx` — 14 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/lib/domains.ts` — 13 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/app/layout.tsx` — 6 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/lib/use-auth-status.ts` — 5 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/lib/domains.ts` — 4 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/components/TracingInit.tsx` — 4 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/lib/domains.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/components/layout/Sidebar.tsx` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/components/layout/TopNav.tsx` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/lib/domains.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/lib/domains.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/lib/domains.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/lib/domains.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/lib/domains.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/lib/nav.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/components/layout/TopNav.tsx` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/components/layout/TopNav.tsx` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/components/layout/TopNav.tsx` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/components/layout/TopNav.tsx` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/lib/domains.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/app/(docs)/layout.tsx` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/app/layout.tsx` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/app/layout.tsx` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/test/lib/nav.test.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/test/components/layout/Sidebar.test.tsx` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/components/layout/TopNav.tsx` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/components/layout/TopNav.tsx` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/components/layout/TopNav.tsx` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/components/layout/TopNav.tsx` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/test/components/layout/TopNav.test.tsx` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/components/layout/TopNav.tsx` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/components/TracingInit.tsx` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/components/TracingInit.tsx` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/components/TracingInit.tsx` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/test/lib/use-auth-status.test.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/lib/use-auth-status.ts` — 1 connection

## Internal relationships

- `layout` → `tracinginit` (imports_from)
- `layout` → `layout_rootlayout` (contains)
- `layout` → `topnav` (imports_from)
- `layout` → `layout_themescript` (contains)
- `layout` → `sidebar` (imports_from)
- `layout` → `layout_docslayout` (contains)
- `tracinginit` → `tracinginit_deriveenv` (contains)
- `tracinginit` → `tracinginit_otlpendpoint` (contains)
- `tracinginit` → `tracinginit_tracinginit` (contains)
- `sidebar_test` → `sidebar` (imports_from)
- `topnav_test` → `topnav` (imports_from)
- `use_auth_status_test` → `use_auth_status` (imports_from)
- `nav_test` → `nav` (imports_from)
- `sidebar` → `nav` (imports_from)
- `topnav` → `use_auth_status` (imports_from)
- `topnav` → `domains` (imports_from)
- `topnav` → `topnav_getthemecookie` (contains)
- `topnav` → `topnav_setthemecookie` (contains)
- `topnav` → `topnav_getstoredtheme` (contains)
- `topnav` → `topnav_getsystemtheme` (contains)
- `topnav` → `topnav_applytheme` (contains)
- `topnav` → `topnav_menuicon` (contains)
- `topnav` → `topnav_moonicon` (contains)
- `topnav` → `topnav_sunicon` (contains)
- `topnav` → `topnav_toggle` (contains)
- `topnav` → `topnav_togglesidebar` (contains)
- `topnav_getthemecookie` → `topnav_getstoredtheme` (calls)
- `topnav_setthemecookie` → `topnav_toggle` (calls)
- `topnav_applytheme` → `topnav_toggle` (calls)
- `use_auth_status` → `domains` (imports_from)
- `use_auth_status` → `use_auth_status_useauthstatus` (contains)
- `domains` → `domains_basedomain` (contains)
- `domains` → `domains_subdomain` (contains)
- `domains` → `domains_baseurl` (contains)
- `domains` → `domains_suburl` (contains)
- `domains` → `domains_apibase` (contains)
- `domains` → `domains_agentcdn` (contains)
- `domains` → `domains_consoleurl` (contains)
- `domains` → `domains_apikeyprefix` (contains)
- `domains_basedomain` → `domains_baseurl` (calls)
- `domains_subdomain` → `domains_suburl` (calls)
- `domains_baseurl` → `domains_apibase` (calls)
- `domains_suburl` → `domains_agentcdn` (calls)
- `domains_suburl` → `domains_consoleurl` (calls)

## External dependencies

- `page` → `domains` (imports_from) [community 3]
- `page` → `use_auth_status` (imports_from) [community 3]
- `domains` → `chat_client` (imports_from) [community 3]
- `domains` → `site_check_client` (imports_from) [community 3]