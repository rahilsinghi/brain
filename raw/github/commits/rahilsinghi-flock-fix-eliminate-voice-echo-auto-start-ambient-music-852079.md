---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:3238684
ingested_at: 2026-04-13T18:05:31.412Z
parsed_at: 2026-04-13T18:05:31.412Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
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
