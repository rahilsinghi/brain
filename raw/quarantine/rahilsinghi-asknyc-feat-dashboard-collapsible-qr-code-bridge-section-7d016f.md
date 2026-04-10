---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:c3e6207
ingested_at: 2026-04-10T02:04:52.499Z
parsed_at: 2026-04-10T02:04:52.499Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM4HnDKfZ24zPAhjCGV"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:34.331Z
---






# feat(dashboard): collapsible QR code bridge section

- **Repo:** rahilsinghi/askNYC
- **SHA:** c3e6207
- **Date:** 2026-03-28T15:15:29Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +41
- **Deletions:** -19

QR code now hidden by default behind a SHOW/HIDE toggle button.
Saves sidebar space when the remote phone isn't needed.
