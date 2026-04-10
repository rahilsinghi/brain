---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:5e9c92f
ingested_at: 2026-04-10T08:03:40.122Z
parsed_at: 2026-04-10T08:03:40.122Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuk2Q66SGAUZqxYPAxbs"}
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
