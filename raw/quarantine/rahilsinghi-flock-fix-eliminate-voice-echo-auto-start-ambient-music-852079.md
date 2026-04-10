---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:3238684
ingested_at: 2026-04-09T22:03:19.495Z
parsed_at: 2026-04-09T22:03:19.495Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM4WHHoWkn1sgKS1Zwv"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:37.282Z
---






# fix: eliminate voice echo + auto-start ambient music

- **Repo:** rahilsinghi/Flock
- **SHA:** 3238684
- **Date:** 2026-03-21T20:00:14Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +32
- **Deletions:** -8

Voice echo fix:
- Replaced count-based proposal detection (prevProposalCount) with
  ID-based Set (voicedProposalIds). Each proposal ID is tracked —
  even if polling detects the same proposals twice, voice/effects
  only fire once per proposal.
- Increased voice stagger from 4s to 6s between readings
- Increased sound effect stagger from 500ms to 800ms

Ambient music:
- Auto-starts on first click/keypress anywhere on the host page
  (browser autoplay policy requires user gesture)
- Volume set to 0.08 (subtle background, not distracting)
- Music was previously only startable by clicking FLOCK logo

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
