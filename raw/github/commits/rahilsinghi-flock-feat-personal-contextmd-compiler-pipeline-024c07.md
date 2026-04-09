---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:2f3461d
ingested_at: 2026-04-09T04:03:38.427Z
parsed_at: 2026-04-09T04:03:38.427Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
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
