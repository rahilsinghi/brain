---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:f67d023
ingested_at: 2026-04-10T01:03:40.347Z
parsed_at: 2026-04-10T01:03:40.347Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM52VEKHpQGH2AghmsV"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:44.345Z
---






# feat: add publication-quality results visualization script

- **Repo:** rahilsinghi/gaze-diffuse
- **SHA:** f67d023
- **Date:** 2026-03-15T23:37:13Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +838
- **Deletions:** -0

- FKGL vs lambda curve with error bars (primary result figure)
- FK sentence variance grouped bar chart (global coherence claim)
- MAUVE preservation bar chart across lambda values
- Readability radar chart comparing all methods
- Demo mode with synthetic data (--demo flag)
- Colorblind-friendly palette, 300 DPI, PDF output
- Supports both real results directory and programmatic API
