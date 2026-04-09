---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:6abc2aa
ingested_at: 2026-04-09T00:04:28.483Z
parsed_at: 2026-04-09T00:04:28.483Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
compile_progress: null
---



# fix(sources): address spec review findings

- **Repo:** rahilsinghi/brain
- **SHA:** 6abc2aa
- **Date:** 2026-04-07T03:58:21Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +6
- **Deletions:** -4

- Gmail: add "label:Brain OR is:starred" to search query (was missing label filter)
- GitHub: fix DEFAULT_MIN_STARS from 50 to 100 (spec says 100)
- CLI: main() accepts sources as parameter instead of empty no-op array

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
