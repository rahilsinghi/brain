---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/portfolio:92ca7f6
ingested_at: 2026-04-10T12:03:43.559Z
parsed_at: 2026-04-10T12:03:43.559Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv4LCUwoxg3rJ66Gvf3k"}
compile_progress: null
---



# fix: move glitch styles to globals.css, fix hydration mismatches

- **Repo:** rahilsinghi/portfolio
- **SHA:** 92ca7f6
- **Date:** 2026-04-08T22:17:29Z
- **Author:** Rahil Singhi
- **Files changed:** 5
- **Additions:** +240
- **Deletions:** -280

- Move 404 glitch keyframes from inline <style jsx> to globals.css
- Fix ProjectsTicker hydration mismatch by computing isNew in useEffect
- Add suppressHydrationWarning to <html> for theme flash prevention
- Fix ticker overflow with overflow-x-clip

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
