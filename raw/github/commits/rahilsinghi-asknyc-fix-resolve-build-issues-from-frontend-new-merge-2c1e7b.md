---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:49d45cc
ingested_at: 2026-04-09T01:03:46.916Z
parsed_at: 2026-04-09T01:03:46.916Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
compile_progress: null
---



# fix: resolve build issues from frontend/new merge

- **Repo:** rahilsinghi/askNYC
- **SHA:** 49d45cc
- **Date:** 2026-03-28T03:49:24Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +13
- **Deletions:** -10

- Add qrcode.react back (needed by old dashboard components)
- Fix PostCSS config for Tailwind v4 (@tailwindcss/postcss)
- Update next.config.ts for Turbopack (Next.js 16)
