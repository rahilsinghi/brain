---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain-explorer:94706f0
ingested_at: 2026-04-13T17:05:37.785Z
parsed_at: 2026-04-13T17:05:37.785Z
compiled_to: "[[Brain-Explorer: Static Export Build Fixes]]"
processed_at: 2026-04-13T17:11:52.506Z
retry_count: 0
last_error: null
compile_progress: null
---



# fix: static export build — remove next/font, fix NODE_ENV, add error pages

- **Repo:** rahilsinghi/brain-explorer
- **SHA:** 94706f0
- **Date:** 2026-04-10T18:28:29Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +34
- **Deletions:** -7

next/font/google Inter() caused useContext null error during prerendering
in Next.js 16 static export. Replaced with Tailwind font-sans system stack.
Added explicit NODE_ENV=production to build script. Added global-error.tsx
and not-found.tsx for proper error handling.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
