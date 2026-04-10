---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:5e9c92f
ingested_at: 2026-04-10T15:04:13.384Z
parsed_at: 2026-04-10T15:04:13.384Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat(voice): add Cluster type and transcription/voice config

- **Repo:** rahilsinghi/brain
- **SHA:** 5e9c92f
- **Date:** 2026-04-09T00:41:02Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +42
- **Deletions:** -0

Add TranscriptionConfig and VoiceConfig interfaces with Cluster union type
to types.ts, wire defaults into config.ts DEFAULTS, and add matching
sections to .brain/config.yaml.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
