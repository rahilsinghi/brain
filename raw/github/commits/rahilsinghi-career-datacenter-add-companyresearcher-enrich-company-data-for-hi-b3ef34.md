---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:0e28655
ingested_at: 2026-04-13T18:05:31.405Z
parsed_at: 2026-04-13T18:05:31.405Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
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
