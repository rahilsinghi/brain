---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/MarkPush:825f1f9
ingested_at: 2026-04-10T09:03:48.648Z
parsed_at: 2026-04-10T09:03:48.648Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZupcS7oG6ecWZbCqhyG6"}
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
