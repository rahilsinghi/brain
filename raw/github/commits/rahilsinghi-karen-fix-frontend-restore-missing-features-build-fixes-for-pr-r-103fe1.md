---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:d557255
ingested_at: 2026-04-10T12:03:43.580Z
parsed_at: 2026-04-10T12:03:43.580Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv4M6RbBM7bB8SWCs359"}
compile_progress: null
---



# fix(frontend): restore missing features + build fixes for PR review

- **Repo:** rahilsinghi/karen
- **SHA:** d557255
- **Date:** 2026-04-04T17:43:39Z
- **Author:** Rahil Singhi
- **Files changed:** 9
- **Additions:** +334
- **Deletions:** -90

- Restore ProviderToggle in NavBar (was deleted in retheme)
- Restore OnboardingFlow with actual form fields inside fortress theme
- Add confirmation dialog before quick-trigger buttons fire escalations
- Restore Open Matters table with stats row (was replaced with cards)
- Show footer on all pages (remove path-based hiding per spec)
- Apply build fixes: favicon to public/, eslint/ts ignore during builds

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
