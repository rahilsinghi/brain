---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:dbfbaa6
ingested_at: 2026-04-10T11:03:33.630Z
parsed_at: 2026-04-10T11:03:33.630Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv3GkPbiyY8QrQcKaH7F"}
compile_progress: null
---



# feat: seed brain with career-datacenter content + schema fixes for real data

- **Repo:** rahilsinghi/brain
- **SHA:** dbfbaa6
- **Date:** 2026-04-08T14:54:41Z
- **Author:** Rahil Singhi
- **Files changed:** 99
- **Additions:** +7292
- **Deletions:** -15

- 84 wiki articles across people/, experience/, projects/, concepts/, companies/, tracking/
- 12 unstructured docs copied to raw/articles/ for batch compilation
- Fixed Zod schemas: nullable fields (valuation, careers_url, lead_investor),
  explicit string keys for z.record() (Zod v4 compatibility)
- Switched seed scripts from bun to tsx (bun not available in worktree)
- Added tsx as dev dependency

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
