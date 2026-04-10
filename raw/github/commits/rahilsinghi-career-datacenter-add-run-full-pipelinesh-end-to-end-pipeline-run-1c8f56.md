---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:52ed0b5
ingested_at: 2026-04-10T03:04:49.556Z
parsed_at: 2026-04-10T03:04:49.556Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuMEWbuzWLbfobSXubdd"}
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
