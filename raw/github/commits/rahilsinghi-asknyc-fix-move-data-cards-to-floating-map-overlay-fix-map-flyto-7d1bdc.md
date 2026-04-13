---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:202fec2
ingested_at: 2026-04-13T17:05:37.819Z
parsed_at: 2026-04-13T17:05:37.819Z
compiled_to: "[[askNYC: Floating Data Cards & Map FlyTo Fix (Commit 202fec2)]]"
processed_at: 2026-04-13T17:22:06.546Z
retry_count: 0
last_error: null
compile_progress: null
---



# fix: move data cards to floating map overlay + fix map flyTo

- **Repo:** rahilsinghi/askNYC
- **SHA:** 202fec2
- **Date:** 2026-03-28T15:20:15Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +76
- **Deletions:** -78

- Moved data cards out of cramped sidebar into FloatingCards component
  that overlays the map (bottom-left, scrollable, max 50vh)
- Fixed map flyTo: removed centerLat/centerLng from init effect deps
  which was destroying and recreating the entire map on every center
  change instead of smoothly flying
- Fixed QrBridge runtime error: moved function above default export
- Removed cards/onSendQuery/hasImage props from IntelligenceBrief
  (sidebar is now just transcript + tools + footer)
