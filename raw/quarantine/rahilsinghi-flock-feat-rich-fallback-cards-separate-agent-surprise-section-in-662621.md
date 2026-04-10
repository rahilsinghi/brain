---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:700792c
ingested_at: 2026-04-09T22:03:19.493Z
parsed_at: 2026-04-09T22:03:19.493Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM41MVav3hVp4mMiV7T"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:30.584Z
---






# feat: rich fallback cards + separate agent surprise section in reveal

- **Repo:** rahilsinghi/Flock
- **SHA:** 700792c
- **Date:** 2026-03-21T21:03:37Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +94
- **Deletions:** -36

Force-reveal fallback data:
- Each user card now has 3 detailed "won" items (specific hotel names,
  markets, constraint matches with percentages)
- Traded items are specific ("Skipped second city to keep budget")
- Surprise texts are 2-3 sentences each, referencing specific profile
  signals ("your photos", "your aesthetic fingerprint", "your food
  profile score predicted this")
- 6 distinct card templates so each participant gets unique content

SplitReveal UI:
- "What your agent won for you" section header
- Won items shown with green checkmarks, full text (not truncated)
- Traded items shown with swap icon
- Cards glow with agent color box-shadow
- NEW: "Something your agent found that you didn't ask for" section
  as a separate amber-glowing area below the personal cards
- Each surprise in its own card with participant name
- Full surprise text displayed (no truncation)

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
