---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:f70c257
ingested_at: 2026-04-10T04:04:34.786Z
parsed_at: 2026-04-10T04:04:34.786Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuRp1PAxBP6Y1tnifWMW"}
compile_progress: null
---



# fix: switch all colors from broken HSL vars to solid hex values

- **Repo:** rahilsinghi/Flock
- **SHA:** f70c257
- **Date:** 2026-03-21T18:00:34Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +114
- **Deletions:** -188

The hsl(var(--...)) pattern broke when CSS vars contain space-separated
HSL values inside Tailwind utility classes. Switched entire color system
to hex values that always render correctly:

- Background: #0b0b14 (solid, no gradient that renders as white blob)
- Foreground: #e8ecf4 (bright enough to read)
- Primary: #2dd4a8 (teal)
- Muted: #7a85a0 (visible labels)
- All inline styles in host page use hex/rgba instead of hsl(var())
- Layout body uses inline style instead of Tailwind class

Also updates host page TravelerAura colors to hex.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
