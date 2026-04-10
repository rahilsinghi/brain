---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:4551656
ingested_at: 2026-04-09T21:03:21.275Z
parsed_at: 2026-04-09T21:03:21.275Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM3GigmM5yF4x96dhNM"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:20.544Z
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
