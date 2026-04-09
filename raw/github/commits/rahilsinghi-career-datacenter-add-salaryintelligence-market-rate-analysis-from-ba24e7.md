---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:4551656
ingested_at: 2026-04-09T03:18:47.781Z
parsed_at: 2026-04-09T03:18:47.781Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
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
