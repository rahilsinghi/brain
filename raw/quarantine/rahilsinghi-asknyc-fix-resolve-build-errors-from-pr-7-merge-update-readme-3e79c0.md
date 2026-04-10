---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:82f5fdc
ingested_at: 2026-04-10T02:04:52.497Z
parsed_at: 2026-04-10T02:04:52.497Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM6REVJ23LpAwp3Tzuk"}
compile_progress: null
quarantined_at: 2026-04-10T03:03:03.210Z
---






# fix: resolve build errors from PR #7 merge + update README + add architecture docs

- **Repo:** rahilsinghi/askNYC
- **SHA:** 82f5fdc
- **Date:** 2026-03-28T17:55:37Z
- **Author:** Rahil Singhi
- **Files changed:** 7
- **Additions:** +1707
- **Deletions:** -102

- Replace CinematicMap with MiniMap in dashboard and splash pages
- Fix DataCard.tsx type error (card.status not on DataCard type)
- Rewrite README with full team info, architecture, local dev guide
- Add animated architecture diagram (HTML), Mermaid diagram, Google products viz
