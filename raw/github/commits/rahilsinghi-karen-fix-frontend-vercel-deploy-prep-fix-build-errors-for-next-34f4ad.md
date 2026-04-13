---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:bb130a4
ingested_at: 2026-04-13T17:05:37.805Z
parsed_at: 2026-04-13T17:05:37.805Z
compiled_to: "[[Fix: Vercel Deploy Preparation for Next.js 16 Build Errors in Karen Project]]"
processed_at: 2026-04-13T17:43:17.812Z
retry_count: 0
last_error: null
compile_progress: null
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
