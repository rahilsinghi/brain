---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:0839306
ingested_at: 2026-04-10T15:04:13.383Z
parsed_at: 2026-04-10T15:04:13.383Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat(voice): add TranscriptionProvider with local whisper.cpp and OpenAI implementations

- **Repo:** rahilsinghi/brain
- **SHA:** 0839306
- **Date:** 2026-04-09T00:43:47Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +160
- **Deletions:** -0

Implements LocalWhisperProvider (shells to whisper-cpp binary) and OpenAIWhisperProvider
(calls OpenAI Whisper API) with dependency-injected exec/fetch for full testability.
Adds createTranscriptionProvider factory. 4 tests, all passing.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
