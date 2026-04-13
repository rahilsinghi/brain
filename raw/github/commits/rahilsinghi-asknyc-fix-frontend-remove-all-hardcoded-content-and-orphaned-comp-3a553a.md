---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:8c17c69
ingested_at: 2026-04-13T17:05:37.823Z
parsed_at: 2026-04-13T17:05:37.823Z
compiled_to: "[[askNYC Frontend Fix: Hardcoded Content and Orphaned Component Removal]]"
processed_at: 2026-04-13T17:26:36.683Z
retry_count: 0
last_error: null
compile_progress: null
---



# fix(frontend): remove all hardcoded content and orphaned components

- **Repo:** rahilsinghi/askNYC
- **SHA:** 8c17c69
- **Date:** 2026-03-28T04:15:48Z
- **Author:** Rahil Singhi
- **Files changed:** 10
- **Additions:** +49
- **Deletions:** -395

- IntelligenceBrief: replace hardcoded "High Line"/"Chelsea Market"
  with real session data, remove non-functional settings gear button
- CameraFeed: replace hardcoded GPS coords with dynamic mapCenter prop
- dashboard/page: pass sessionSummary + mapCenter to child components
- AnswerPanel: replace gibberish lorem ipsum with real venue descriptions
- SearchInput: remove non-functional mic button
- EvidenceCard: remove non-functional buttons prop
- Delete orphaned: IdentityHeader, GlowingLandmarkOverlay, SessionCard
