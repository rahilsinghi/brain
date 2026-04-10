---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:0839306
ingested_at: 2026-04-10T02:04:52.480Z
parsed_at: 2026-04-10T02:04:52.480Z
compiled_to: "[[TranscriptionProvider: Local Whisper.cpp and OpenAI Implementations]]"
processed_at: 2026-04-10T02:47:31.600Z
retry_count: 1
last_error: "429 {\"type\":\"error\",\"error\":{\"type\":\"rate_limit_error\",\"message\":\"This request would exceed your organization's rate limit of 8,000 output tokens per minute (org: 9bdecd1f-f807-4ccd-b7ed-13c62f0e8eaf, model: claude-sonnet-4-6). For details, refer to: https://docs.claude.com/en/api/rate-limits. You can see the response headers for current usage. Please reduce the prompt length or the maximum tokens requested, or try again later. You may also contact sales at https://claude.com/contact-sales to discuss your options for a rate limit increase.\"},\"request_id\":\"req_011CZuKtPzdFRCdid8c9UM7w\"}"
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
