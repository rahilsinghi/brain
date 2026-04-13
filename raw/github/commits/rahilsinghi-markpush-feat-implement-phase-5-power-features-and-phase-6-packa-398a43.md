---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/MarkPush:825f1f9
ingested_at: 2026-04-13T18:05:31.399Z
parsed_at: 2026-04-13T18:05:31.399Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat: implement Phase 5 (power features) and Phase 6 (packaging)

- **Repo:** rahilsinghi/MarkPush
- **SHA:** 825f1f9
- **Date:** 2026-03-17T00:54:59Z
- **Author:** Rahil Singhi
- **Files changed:** 8
- **Additions:** +392
- **Deletions:** -14

- cmd/watch: fsnotify directory watcher with configurable debounce,
  auto-pushes .md/.markdown/.mdown files on write/create events,
  supports --dry-run, --tag, --source flags
- Fix data race in mDNS discovery by copying entry before processing
- iOS Library feature: search, filter (all/unread/pinned/archived),
  sort (newest/oldest/title), SwiftData query integration
- App TabView updated to 3 tabs: Feed, Library, Settings
- Release script for tagged releases via GoReleaser
- Updated CHANGELOG with all features
