---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:e939983
ingested_at: 2026-04-10T06:04:07.620Z
parsed_at: 2026-04-10T06:04:07.620Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuavRtXjPiUGscersuUD"}
compile_progress: null
---



# fix: approve sharp/esbuild/protobufjs build scripts for pnpm 10

- **Repo:** rahilsinghi/brain
- **SHA:** e939983
- **Date:** 2026-04-08T15:25:34Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +7
- **Deletions:** -0

pnpm 10 blocks native module build scripts by default. Without this,
sharp fails to load and embedding sync breaks.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
