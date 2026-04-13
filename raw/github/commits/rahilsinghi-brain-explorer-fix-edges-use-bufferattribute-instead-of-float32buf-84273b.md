---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain-explorer:6deaca9
ingested_at: 2026-04-13T18:05:31.379Z
parsed_at: 2026-04-13T18:05:31.379Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# fix(edges): use BufferAttribute instead of Float32BufferAttribute for shared position array

- **Repo:** rahilsinghi/brain-explorer
- **SHA:** 6deaca9
- **Date:** 2026-04-12T17:47:56Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +4
- **Deletions:** -1

Float32BufferAttribute copies the input array, so edgePositionsRef and
the geometry's position buffer were different objects. useFrame wrote to
the original but the GPU uploaded the untouched copy. BufferAttribute
stores the array by reference, so dynamic updates propagate correctly.
