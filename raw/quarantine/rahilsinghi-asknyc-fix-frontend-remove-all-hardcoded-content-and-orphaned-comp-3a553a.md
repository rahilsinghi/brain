---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:8c17c69
ingested_at: 2026-04-10T02:04:52.500Z
parsed_at: 2026-04-10T02:04:52.500Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM49MCicpkef5Cxr9zT"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:32.419Z
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
