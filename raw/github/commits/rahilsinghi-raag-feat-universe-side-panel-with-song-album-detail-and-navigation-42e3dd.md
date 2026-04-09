---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:08e5d88
ingested_at: 2026-04-09T05:03:49.971Z
parsed_at: 2026-04-09T05:03:49.971Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat: Universe side panel with song/album detail and navigation history

- **Repo:** rahilsinghi/raag
- **SHA:** 08e5d88
- **Date:** 2026-03-06T22:39:46Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +771
- **Deletions:** -270

Replace modal NodeDetailPanel with persistent GraphSidePanel (380px
right panel). Song mode shows lyrics, stats, topics, entities. Album
mode shows tracklist with click-to-zoom. Panel tracks navigation
history with back button. ForceGraph now opens panels on node click
and supports external zoom via pendingZoomNodeId for deep linking.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
