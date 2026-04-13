---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:52ed0b5
ingested_at: 2026-04-13T18:05:31.404Z
parsed_at: 2026-04-13T18:05:31.404Z
compiled_to: "[[`run_full_pipeline.sh` Script for End-to-End Job Application Workflow]]"
processed_at: 2026-04-13T18:05:58.110Z
retry_count: 0
last_error: null
compile_progress: null
---



# Add run_full_pipeline.sh - end-to-end pipeline runner with 5 stages

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 52ed0b5
- **Date:** 2026-02-18T15:01:56Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +110
- **Deletions:** -0

Master shell script that chains the full workflow:
  1. Overnight batch (scrape + score + deduplicate)
  2. Job review (interactive or skipped with --auto)
  3. Application generation (approved jobs only)
  4. Skills gap analysis (auto-saved to outputs/)
  5. Weekly progress report

Supports --auto (skip review, auto-approve ≥ min-score) and
--min-score N flags. Activates venv automatically if present.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
