---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:0aa635e
ingested_at: 2026-04-10T03:04:49.547Z
parsed_at: 2026-04-10T03:04:49.547Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuMEwMCNMcM1z65gd5uo"}
compile_progress: null
---



# Chore: Ignore output directories and add rescore utility

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 0aa635e
- **Date:** 2026-02-25T19:05:38Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +182
- **Deletions:** -0

- .gitignore: Added outputs/email_drafts, batch_generated, daily_reports, resume_variants
- cli/rescore_jobs.py: Utility to rescore jobs with updated criteria

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
