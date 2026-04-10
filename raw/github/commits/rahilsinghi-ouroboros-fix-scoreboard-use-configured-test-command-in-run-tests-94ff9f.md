---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/ouroboros:2795977
ingested_at: 2026-04-10T12:03:43.577Z
parsed_at: 2026-04-10T12:03:43.577Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv4Lzokc7Ssw2LfdqHi5"}
compile_progress: null
---



# fix(scoreboard): use configured test_command in _run_tests()

- **Repo:** rahilsinghi/ouroboros
- **SHA:** 2795977
- **Date:** 2026-04-03T14:53:05Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +63
- **Deletions:** -5

Correctness was always 0.0 because _run_tests() ignored the test_command
parameter and hardcoded a pytest path that didn't find any tests.
Now uses the configured command and runs from target_path. Also improved
fallback parsing (summary line, exit code) and changed token counting
from stdout word count to actual source file character count.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
