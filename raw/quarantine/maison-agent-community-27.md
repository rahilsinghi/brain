---
status: quarantined
source_type: graphify-community
repo: maison-agent
community_id: 27
ingested_at: 2026-04-15T19:59:44.130Z
parsed_at: 2026-04-15T19:59:44.130Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca6ANsxXqm73ZfwyiMnpe"}
compile_progress: null
quarantined_at: 2026-04-15T20:09:03.635Z
---






# maison-agent — Community 27

## Files in this cluster

- `/Users/rahilsinghi/Desktop/maison-agent/infra/lib/site-loader/site-loader-distribution-stack.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/infra/test/site-loader/site-loader-distribution-stack.test.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/infra/lib/site-loader/site-loader-hosted-zone-stack.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/infra/lib/site-loader/site-loader-distribution-stack.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/infra/lib/site-loader/site-loader-hosted-zone-stack.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/infra/test/site-loader/site-loader-hosted-zone-stack.test.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/infra/bin/site-loader-infrastructure.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/infra/lib/site-loader/site-loader-distribution-stack.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/infra/test/site-loader/site-loader-distribution-stack.test.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/infra/test/site-loader/site-loader-distribution-stack.test.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/infra/lib/site-loader/site-loader-hosted-zone-stack.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/infra/test/site-loader/site-loader-hosted-zone-stack.test.ts` — 1 connection

## Internal relationships

- `site_loader_hosted_zone_stack_test` → `site_loader_hosted_zone_stack` (imports_from)
- `site_loader_hosted_zone_stack_test` → `site_loader_hosted_zone_stack_test_makestack` (contains)
- `site_loader_distribution_stack_test` → `site_loader_distribution_stack` (imports_from)
- `site_loader_distribution_stack_test` → `site_loader_distribution_stack_test_makestackwithhostedzone` (contains)
- `site_loader_distribution_stack_test` → `site_loader_distribution_stack_test_makestackwithouthostedzone` (contains)
- `site_loader_infrastructure` → `site_loader_hosted_zone_stack` (imports_from)
- `site_loader_infrastructure` → `site_loader_distribution_stack` (imports_from)
- `site_loader_distribution_stack` → `site_loader_distribution_stack_siteloaderdistributionstack` (contains)
- `site_loader_distribution_stack_siteloaderdistributionstack` → `site_loader_distribution_stack_siteloaderdistributionstack_constructor` (method)
- `site_loader_hosted_zone_stack` → `site_loader_hosted_zone_stack_siteloaderhostedzonestack` (contains)
- `site_loader_hosted_zone_stack_siteloaderhostedzonestack` → `site_loader_hosted_zone_stack_siteloaderhostedzonestack_constructor` (method)

## External dependencies

_none_