---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:7d6957e
ingested_at: 2026-04-10T02:04:52.500Z
parsed_at: 2026-04-10T02:04:52.500Z
compiled_to: "[[fix: resolve merge conflicts and fix critical issues from PR #5 — askNYC]]"
processed_at: 2026-04-10T02:52:44.159Z
retry_count: 1
last_error: "429 {\"type\":\"error\",\"error\":{\"type\":\"rate_limit_error\",\"message\":\"This request would exceed your organization's rate limit of 8,000 output tokens per minute (org: 9bdecd1f-f807-4ccd-b7ed-13c62f0e8eaf, model: claude-sonnet-4-6). For details, refer to: https://docs.claude.com/en/api/rate-limits. You can see the response headers for current usage. Please reduce the prompt length or the maximum tokens requested, or try again later. You may also contact sales at https://claude.com/contact-sales to discuss your options for a rate limit increase.\"},\"request_id\":\"req_011CZuLGT4XqN2hsxsVHarNc\"}"
compile_progress: null
---













# fix: resolve merge conflicts and fix critical issues from PR #5

- **Repo:** rahilsinghi/askNYC
- **SHA:** 7d6957e
- **Date:** 2026-03-28T14:04:25Z
- **Author:** Rahil Singhi
- **Files changed:** 18
- **Additions:** +669
- **Deletions:** -312

- Merge main (with PR #4 camera capture) into cinematic map branch
- Fix MiniMap: add MAPBOX_TOKEN guard + CSS fallback, dynamic import
  (no SSR breakage), restore backend pin syncing + flyTo behavior,
  clean up React roots on unmount
- Fix MapEvidenceCard: replace dynamic Tailwind classes with lookup map
- Fix SearchInput: add missing `cn` import
- Fix dashboard: use displayImage (captured + uploaded) for CameraFeed
- Fix globals.css: keep flash + pulse-cyan keyframes from PR #4
- Remove unused packages: three, @types/three, @googlemaps/js-api-loader
- Remove redundant autoprefixer, dead webpack config, global mapbox CSS
