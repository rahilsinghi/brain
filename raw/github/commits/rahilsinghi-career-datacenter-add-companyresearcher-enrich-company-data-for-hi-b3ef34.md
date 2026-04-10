---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:0e28655
ingested_at: 2026-04-10T03:04:49.623Z
parsed_at: 2026-04-10T03:04:49.623Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuMF8Vv7rne5cKmqz7e3"}
compile_progress: null
---



# Add CompanyResearcher - enrich company data for high-fit jobs

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 0e28655
- **Date:** 2026-02-17T22:43:01Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +306
- **Deletions:** -0

Scrapes basic company info (employee count, funding stage, founding year,
Glassdoor rating) from public web results for each company found in scraped
jobs. Caches results in tracking/companies.yaml with 30-day TTL. Supports
--from-jobs (batch), --company (single), and --list (view cache) modes.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
