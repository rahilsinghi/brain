---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:700792c
ingested_at: 2026-04-09T04:03:38.412Z
parsed_at: 2026-04-09T04:03:38.412Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
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
