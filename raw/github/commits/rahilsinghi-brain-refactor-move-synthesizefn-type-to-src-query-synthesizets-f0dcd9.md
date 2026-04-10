---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:22107b8
ingested_at: 2026-04-10T06:04:07.615Z
parsed_at: 2026-04-10T06:04:07.615Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuav14YF778DoHVwNADA"}
compile_progress: null
---



# refactor: move SynthesizeFn type to src/query/synthesize.ts

- **Repo:** rahilsinghi/brain
- **SHA:** 22107b8
- **Date:** 2026-04-08T18:24:41Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +10
- **Deletions:** -8

Domain type belongs alongside the function it describes, not in Fastify
type augmentation. fastify.d.ts re-exports for backward compatibility.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
