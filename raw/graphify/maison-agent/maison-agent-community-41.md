---
status: processed
source_type: graphify-community
repo: maison-agent
community_id: 41
ingested_at: 2026-04-15T19:59:44.138Z
parsed_at: 2026-04-15T19:59:44.138Z
compiled_to: "[[Email Template Building and Rendering Utility]]"
processed_at: 2026-04-15T20:16:23.229Z
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca6AJd5ixjPhpqKRu5Xnx"}
compile_progress: null
---





# maison-agent — Community 41

## Files in this cluster

- `/Users/rahilsinghi/Desktop/maison-agent/packages/email-utils/src/email-builder.ts` — 7 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/email-utils/src/email-builder.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/email-utils/src/email-builder.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/email-utils/src/email-builder.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/email-utils/src/email-builder.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/email-utils/src/email-builder.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/email-utils/src/email-builder.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/email-utils/src/email-builder.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/email-utils/test/email-builder.test.ts` — 1 connection

## Internal relationships

- `email_builder_test` → `email_builder` (imports_from)
- `email_builder` → `email_builder_emailbuilder` (contains)
- `email_builder_emailbuilder` → `email_builder_emailbuilder_constructor` (method)
- `email_builder_emailbuilder` → `email_builder_emailbuilder_loadtemplate` (method)
- `email_builder_emailbuilder` → `email_builder_emailbuilder_render` (method)
- `email_builder_emailbuilder` → `email_builder_emailbuilder_injecttheme` (method)
- `email_builder_emailbuilder` → `email_builder_emailbuilder_generatethemestyles` (method)
- `email_builder_emailbuilder` → `email_builder_emailbuilder_striphtml` (method)
- `email_builder_emailbuilder_constructor` → `email_builder_emailbuilder_loadtemplate` (calls)
- `email_builder_emailbuilder_render` → `email_builder_emailbuilder_injecttheme` (calls)
- `email_builder_emailbuilder_render` → `email_builder_emailbuilder_striphtml` (calls)
- `email_builder_emailbuilder_injecttheme` → `email_builder_emailbuilder_generatethemestyles` (calls)

## External dependencies

_none_