---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:2f3461d
ingested_at: 2026-04-09T22:03:19.548Z
parsed_at: 2026-04-09T22:03:19.548Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM6FCz35nAQ6CsD3Rnq"}
compile_progress: null
quarantined_at: 2026-04-10T03:03:00.889Z
---






# feat: personal_context.md compiler pipeline

- **Repo:** rahilsinghi/Flock
- **SHA:** 2f3461d
- **Date:** 2026-03-21T14:22:54Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +466
- **Deletions:** -0

schemas.ts — Zod schemas for intent extraction, chip field map
intent-extractor.ts — Gemini 2.5 Flash JSON schema extraction
merger.ts — confidence-weighted merge with token cap enforcement
compiler.ts — orchestrates fetch → route → extract → merge → write

Chip inputs are deterministic (no model call). Voice/text inputs
go through Gemini intent extraction. All changes versioned in
context_diffs table.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
