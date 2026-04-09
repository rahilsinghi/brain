---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:4ba42f5
ingested_at: 2026-04-09T01:03:46.906Z
parsed_at: 2026-04-09T01:03:46.906Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
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
