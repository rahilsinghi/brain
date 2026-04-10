---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:a255177
ingested_at: 2026-04-10T06:04:07.633Z
parsed_at: 2026-04-10T06:04:07.633Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuauxtp9bFT1ysWtTZ2Y"}
compile_progress: null
---



# fix: exclude H1 from preamble content, remove dead code branch

- **Repo:** rahilsinghi/brain
- **SHA:** a255177
- **Date:** 2026-04-03T23:59:55Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +8
- **Deletions:** -8

- Skip H1 heading node when building preamble section so content does not
  duplicate the heading field (changed `else { if (!currentSection) }` to
  `else if (node.type !== "heading")`)
- Remove unreachable inner `if (!currentSection)` guard — outer else already
  guaranteed null
- Add breadcrumb and not.toContain assertions to preamble test

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
