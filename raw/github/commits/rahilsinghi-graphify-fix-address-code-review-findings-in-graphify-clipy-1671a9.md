---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/graphify:5ddc923
ingested_at: 2026-04-13T18:05:31.388Z
parsed_at: 2026-04-13T18:05:31.388Z
compiled_to: "[[Fix: Address Code Review Findings in `graphify_cli.py`]]"
processed_at: 2026-04-13T18:08:30.107Z
retry_count: 0
last_error: null
compile_progress: null
---



# fix: address code review findings in graphify_cli.py

- **Repo:** rahilsinghi/graphify
- **SHA:** 5ddc923
- **Date:** 2026-04-10T23:41:59Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +40
- **Deletions:** -11

- Fix --incremental to use "new_files" key from detect_incremental (was no-op)
- Pass cached hyperedges to semantic extraction dict (were silently dropped)
- Wrap detect() and extract() in try/except to prevent one bad repo aborting all
- Guard empty graph after extraction (skip meaningless pipeline)
- Use relative paths for file-summary slugs (were absolute machine-local paths)
- Apply --anthropic-key to env var when provided (was parsed but unused)
- Remove unused collect_files import
- Document undirected graph neighbor ambiguity as known v1 limitation

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
