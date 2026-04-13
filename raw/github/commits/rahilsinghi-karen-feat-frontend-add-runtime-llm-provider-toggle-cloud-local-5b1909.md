---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:4ba42f5
ingested_at: 2026-04-13T17:05:37.806Z
parsed_at: 2026-04-13T17:05:37.806Z
compiled_to: "[[Runtime LLM Provider Toggle (Cloud/Local) in Karen Frontend]]"
processed_at: 2026-04-13T17:34:28.898Z
retry_count: 0
last_error: null
compile_progress: null
---



# feat(frontend): add runtime LLM provider toggle (Cloud/Local)

- **Repo:** rahilsinghi/karen
- **SHA:** 4ba42f5
- **Date:** 2026-04-04T15:36:27Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +120
- **Deletions:** -7

Dashboard header toggle switches between Anthropic API and local Ollama
at runtime. Disabled during active escalations. Resets to env var on restart.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
