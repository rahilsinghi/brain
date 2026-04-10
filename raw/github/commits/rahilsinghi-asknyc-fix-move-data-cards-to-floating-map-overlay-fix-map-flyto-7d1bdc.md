---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:202fec2
ingested_at: 2026-04-10T08:03:40.139Z
parsed_at: 2026-04-10T08:03:40.139Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuk2hA1Zs4pQsBXbuwKG"}
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
