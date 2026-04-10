---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:4551656
ingested_at: 2026-04-10T03:04:49.628Z
parsed_at: 2026-04-10T03:04:49.628Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuMEuZ3jq28da8yVaku1"}
compile_progress: null
---



# Add SalaryIntelligence - market rate analysis from scraped job data

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 4551656
- **Date:** 2026-02-17T22:42:12Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +314
- **Deletions:** -0

Aggregates salary_min/max from all scraped jobs, computes P25/median/P75
breakdowns by role type (ML, Data Eng, Backend etc.) and by experience level
(Junior/Mid/Senior). Highlights remote vs on-site premium. Lists top 10
highest-paying openings with fit scores. Supports --role and --save flags.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
