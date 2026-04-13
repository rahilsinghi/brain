---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:4011045
ingested_at: 2026-04-13T18:05:31.406Z
parsed_at: 2026-04-13T18:05:31.406Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# Add apply_workflow.py - complete apply workflow with pipeline tracking

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 4011045
- **Date:** 2026-02-17T22:38:41Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +215
- **Deletions:** -0

New cli/apply_workflow.py:
- generate_and_review(job_id): generates pack, auto-opens PDFs for review,
  prompts to mark as applied
- batch_generate(approved_only, min_score): calls ApplicationBatchRunner in batch
- mark_applied(job_id): updates status in both applications.csv + scraped_jobs.csv
- show_pipeline(): terminal view of application pipeline by status

Usage:
  python cli/apply_workflow.py --job-id linkedin_xxx   # single job + review
  python cli/apply_workflow.py --batch --approved-only  # batch for approved
  python cli/apply_workflow.py --batch --min-score 8.5  # batch by score
  python cli/apply_workflow.py --mark-applied <id>      # mark as applied
  python cli/apply_workflow.py --pipeline               # show pipeline status

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
