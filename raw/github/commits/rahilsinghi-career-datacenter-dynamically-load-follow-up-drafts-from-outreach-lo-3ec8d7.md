---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:3904495
ingested_at: 2026-04-10T09:03:48.654Z
parsed_at: 2026-04-10T09:03:48.654Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZupcs7To26Ex1c1terab"}
compile_progress: null
---



# Dynamically load follow-up drafts from outreach_log.csv

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 3904495
- **Date:** 2026-03-04T21:39:42Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +234
- **Deletions:** -69

- gmail_drafts.py now reads all sent, unreplied, non-Mews contacts
  from tracking/outreach_log.csv automatically
- Company-specific follow-up hooks for 9 companies (Canary, Actabl,
  Duetto, HiJiffy, Conduit, Apaleo, Selfbook, Cloudbeds, Lighthouse)
- Role-aware CTAs: recruiter vs eng_mgr/founder variants
- Grouped output in --list, silent mode in --draft-all for clean logging
- 19/19 drafts pushed to Gmail Drafts on first run

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
