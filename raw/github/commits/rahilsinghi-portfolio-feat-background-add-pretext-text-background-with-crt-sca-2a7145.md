---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/portfolio:12207f1
ingested_at: 2026-04-10T09:03:48.635Z
parsed_at: 2026-04-10T09:03:48.635Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZupcp8NT5698jTL5vuzQ"}
compile_progress: null
---



# feat(background): add pretext text background with CRT scan line sync

- **Repo:** rahilsinghi/portfolio
- **SHA:** 12207f1
- **Date:** 2026-03-31T22:29:48Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +184
- **Deletions:** -0

Full-viewport translucent text background layer using @chenglou/pretext.
Text flows continuously and wraps around the CRT scan line by reading
its actual DOM position each frame via getBoundingClientRect().

- PretextBackground: fixed layer at z-1, DOM pool for 60fps
- Synced to CSS crt-sweep animation (no independent JS clock)
- Theme-aware opacity (dark: 0.035, light: 0.05)
- Responsive font sizing for mobile

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
