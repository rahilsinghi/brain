---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:1d92c56
ingested_at: 2026-04-09T01:03:46.916Z
parsed_at: 2026-04-09T01:03:46.916Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
compile_progress: null
---



# feat(frontend): functional splash page, settings panel, dashboard query params

- **Repo:** rahilsinghi/askNYC
- **SHA:** 1d92c56
- **Date:** 2026-03-28T04:26:41Z
- **Author:** Rahil Singhi
- **Files changed:** 7
- **Additions:** +771
- **Deletions:** -143

Splash page (/) is now a standalone entry point:
- Search bar with text + voice input (Web Speech API)
- Session history cards (or demo scenarios for first-time users)
- EvidenceCard "Explore" button navigates to dashboard with query
- Settings gear opens slide-out panel
- "Go straight to dashboard" escape link
- No more auto-redirect

Dashboard query param support:
- ?q=... auto-submits text query on load
- ?location=... pre-loads location context
- ?demo=all|restaurant|building|construction auto-triggers demos
- ?voice=true placeholder for voice mode

Settings panel (shared splash + dashboard):
- RUN FULL DEMO button (chains all 3 scenarios)
- Individual scenario buttons
- Volume slider + mute toggle (localStorage persisted)

New files: SettingsPanel.tsx, useSettings.ts
