---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/portfolio:d10a46b
ingested_at: 2026-04-13T00:04:31.078Z
parsed_at: 2026-04-13T00:04:31.078Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24e4VkHexkj33AvoKu7"}
compile_progress: null
quarantined_at: 2026-04-13T16:11:26.237Z
---






# feat(theme): add light/dark mode system with CSS variable architecture

- **Repo:** rahilsinghi/portfolio
- **SHA:** d10a46b
- **Date:** 2026-03-25T02:41:08Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +217
- **Deletions:** -34

Add ThemeProvider (React context + localStorage + prefers-color-scheme),
anti-flash inline script, and theme-colors utility for canvas components.
Remap all Tailwind color tokens to CSS custom properties that swap via
[data-theme] attribute. Light mode uses warm off-white #F0EDE6 bg,
dark green #00802A accent, #E8E4DC surfaces. Grain, scanlines, grid
drift, aurora, CRT sweep, cursor, and scrollbar all adapt to theme.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
