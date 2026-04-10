---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:5707175
ingested_at: 2026-04-10T02:04:52.475Z
parsed_at: 2026-04-10T02:04:52.475Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM3iUVUGowoVJKSL2eQ"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:26.539Z
---






# feat(telegram): add /slides and /plot commands with two-message pattern

- **Repo:** rahilsinghi/brain
- **SHA:** 5707175
- **Date:** 2026-04-09T01:02:54Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +157
- **Deletions:** -1

Registers bot.command("slides") and bot.command("plot"), exports handleSlidesCommand and handlePlotCommand with auth guard, empty-input validation, immediate "Generating..." reply, InputFile delivery via replyWithDocument/replyWithPhoto, and error fallback. Extends HandlerDeps and TelegramBotDeps with optional generateSlidesFn/generatePlotFn. 7 new tests, all 271 pass.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
