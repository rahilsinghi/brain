---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:0839306
ingested_at: 2026-04-10T08:03:40.121Z
parsed_at: 2026-04-10T08:03:40.121Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuk2Phn1x1gBhiWLsDkA"}
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
