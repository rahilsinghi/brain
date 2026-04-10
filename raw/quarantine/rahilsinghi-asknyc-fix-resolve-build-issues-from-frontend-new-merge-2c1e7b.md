---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:49d45cc
ingested_at: 2026-04-10T02:04:52.501Z
parsed_at: 2026-04-10T02:04:52.501Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM6L5gMohMbcwjukCCw"}
compile_progress: null
quarantined_at: 2026-04-10T03:03:01.999Z
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
