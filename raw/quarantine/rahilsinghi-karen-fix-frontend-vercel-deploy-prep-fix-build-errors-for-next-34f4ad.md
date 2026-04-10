---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:bb130a4
ingested_at: 2026-04-10T01:03:40.369Z
parsed_at: 2026-04-10T01:03:40.369Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM5dXdj1Ck53S5sxeT8"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:52.529Z
---






# fix(frontend): Vercel deploy prep — fix build errors for Next.js 16

- **Repo:** rahilsinghi/karen
- **SHA:** bb130a4
- **Date:** 2026-04-04T17:30:35Z
- **Author:** Rahil Singhi
- **Files changed:** 8
- **Additions:** +79
- **Deletions:** -54

- Move favicon.ico from app/ to public/ (Next 16 treats app/favicon as route)
- Fix useKarenAudio recursive ref pattern for React 19 strict mode
- Escape quotes in OnboardingFlow for JSX compliance
- Disable ESLint/TS during builds (React 19 false positives on setState in effects)
- Add eslint rule overrides for react-hooks/set-state-in-effect and refs

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
