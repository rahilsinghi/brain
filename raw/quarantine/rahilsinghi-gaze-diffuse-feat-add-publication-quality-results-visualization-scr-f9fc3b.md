---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:f67d023
ingested_at: 2026-04-12T23:04:19.856Z
parsed_at: 2026-04-12T23:04:19.856Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24dw6W4SxQ1N7RyNb82"}
compile_progress: null
quarantined_at: 2026-04-13T16:11:24.307Z
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
