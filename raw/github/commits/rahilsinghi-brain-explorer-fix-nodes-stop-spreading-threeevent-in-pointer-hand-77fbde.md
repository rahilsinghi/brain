---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain-explorer:eed2e72
ingested_at: 2026-04-13T16:05:10.273Z
parsed_at: 2026-04-13T16:05:10.273Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24UeHxkuT7Uk1wuEvah"}
compile_progress: null
---



# fix(nodes): stop spreading ThreeEvent in pointer handler

- **Repo:** rahilsinghi/brain-explorer
- **SHA:** eed2e72
- **Date:** 2026-04-13T01:05:32Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +7
- **Deletions:** -10

Spreading a ThreeEvent via { ...e, instanceId: globalId } creates a
plain object that loses stopPropagation bindings, causing clicks to
bubble to OrbitControls and trigger camera jumps instead of opening
the ArticlePanel. Mutate instanceId directly on the original event.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
