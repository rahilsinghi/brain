---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:f212dce
ingested_at: 2026-04-13T17:05:37.826Z
parsed_at: 2026-04-13T17:05:37.826Z
compiled_to: "[[Composite `investigate_location` Tool for askNYC Backend]]"
processed_at: 2026-04-13T17:14:48.338Z
retry_count: 0
last_error: null
compile_progress: null
---



# feat(backend): composite investigate_location tool for reliable Gemini Live

- **Repo:** rahilsinghi/askNYC
- **SHA:** f212dce
- **Date:** 2026-03-28T02:45:02Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +310
- **Deletions:** -131

Gemini Live can only reliably make one tool call per turn. Replaced
multi-agent sub-delegation with a single investigate_location() tool that
geocodes, queries relevant Socrata datasets, and pushes data cards + map
pins to the dashboard in one shot.

- Flatten agent hierarchy to single root agent
- Add auto-reconnect for Gemini Live idle timeout
- Defer session start until first input (saves API credits)
- Add comprehensive event logging for debugging
