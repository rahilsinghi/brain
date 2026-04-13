---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/brain-explorer:91d8a2b
ingested_at: 2026-04-13T16:05:10.273Z
parsed_at: 2026-04-13T16:05:10.273Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24j5bNNbYNb78tqG7rr"}
compile_progress: null
quarantined_at: 2026-04-13T16:12:34.191Z
---






# fix(interaction): resolve node click/focus regression

- **Repo:** rahilsinghi/brain-explorer
- **SHA:** 91d8a2b
- **Date:** 2026-04-13T01:56:15Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +62
- **Deletions:** -18

Three bugs fixed:
- computeBoundingSphere never called on InstancedMesh after useFrame
  set instance matrices, so raycasts missed the stale bounding sphere
- useDrag used a stale indexToNodeId reverse map; now receives resolved
  nodeId directly from InstancedNodes/CodeNodes via onPointerDown arg
- onPointerMissed race: R3F fires it on native click (after pointerup
  sets focus), immediately clearing focus. Suppressed via timestamp guard
- readFocusParam deep-link effect ran on every nodes change, re-setting
  focus from stale URL after clearFocus. Now runs only on initial load

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
