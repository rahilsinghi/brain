---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:7d6957e
ingested_at: 2026-04-10T08:03:40.140Z
parsed_at: 2026-04-10T08:03:40.140Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuk2QUubUL4soAUzTZTz"}
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
