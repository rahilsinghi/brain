---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:43d9fed
ingested_at: 2026-04-09T03:18:47.670Z
parsed_at: 2026-04-09T03:18:47.670Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# fix(training): add MPS support, fix macOS DataLoader, portable checkpoints

- **Repo:** rahilsinghi/gaze-diffuse
- **SHA:** 43d9fed
- **Date:** 2026-03-27T16:09:17Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +22
- **Deletions:** -8

- Added MPS device fallback (CUDA > MPS > CPU) in training and loading
- Changed num_workers=2 to 0 in DataLoaders (macOS fork hangs)
- Save config as asdict() instead of pickled dataclass for cross-module
  checkpoint loading compatibility

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
