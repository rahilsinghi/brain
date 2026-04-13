---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:08e5d88
ingested_at: 2026-04-13T16:05:10.313Z
parsed_at: 2026-04-13T16:05:10.313Z
compiled_to: "[[Universe Side Panel: Song/Album Detail and Navigation History]]"
processed_at: 2026-04-13T16:07:08.560Z
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
