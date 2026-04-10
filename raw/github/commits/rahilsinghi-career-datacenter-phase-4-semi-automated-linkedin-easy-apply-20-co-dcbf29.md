---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:3d912f6
ingested_at: 2026-04-10T09:03:48.657Z
parsed_at: 2026-04-10T09:03:48.657Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZupcvyddWAKT2KRxYgvZ"}
compile_progress: null
---



# Phase 4: Semi-Automated LinkedIn Easy Apply (20 commits)

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 3d912f6
- **Date:** 2026-02-18T23:42:54Z
- **Author:** Rahil Singhi
- **Files changed:** 19
- **Additions:** +2123
- **Deletions:** -8

Foundation:
- Add easy_apply_enabled field to Job model + scraper_linkedin.py
- Create data/easy_apply_answers.yaml answer bank
- Extend applications.csv with easy_apply_available/submission_method/date_applied
- Add --easy-apply-only filter + [EASY APPLY] badge to job_review_cli.py
- Add Easy Apply count to apply_workflow.py show_pipeline()

Playwright Form Filler:
- cli/easy_apply_filler.py: EasyApplyFiller class (headless=False by default,
  deferred Playwright import, contact/resume/cover letter/question fill,
  3-signal review page detection, PAUSED banner, context manager)
- cli/answer_bank.py: AnswerBank fuzzy matcher (substring + difflib)

Workflow Integration:
- cli/easy_apply_workflow.py: Main CLI (--queue/--run/--job-id/--dry-run)
- Integrate Easy Apply offer into apply_workflow.py generate_and_review()
- scripts/setup_playwright.sh: one-time install script
- requirements.txt: playwright>=1.40.0
- batch_process_overnight.py: easy_apply_eligible stat + tip
- dashboard.py: /easy-apply route with stat cards + table

Tests & Docs:
- tests/test_easy_apply_answers.py: 11 AnswerBank tests (no Playwright)
- tests/test_easy_apply_filler.py: 13 EasyApplyFiller tests (mocked)
- README.md: Phase 4 setup guide + usage commands
- PHASE_4_SUMMARY.md: architecture, files, limitations

All 61 tests pass.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
