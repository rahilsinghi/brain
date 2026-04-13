---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:a255177
ingested_at: 2026-04-13T17:05:37.760Z
parsed_at: 2026-04-13T17:05:37.760Z
compiled_to: "[[Fix: Exclude H1 from Preamble Content and Remove Dead Code in Brain Project]]"
processed_at: 2026-04-13T17:12:45.693Z
retry_count: 0
last_error: null
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
