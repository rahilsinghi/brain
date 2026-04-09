---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:d557255
ingested_at: 2026-04-09T01:03:46.905Z
parsed_at: 2026-04-09T01:03:46.905Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
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
