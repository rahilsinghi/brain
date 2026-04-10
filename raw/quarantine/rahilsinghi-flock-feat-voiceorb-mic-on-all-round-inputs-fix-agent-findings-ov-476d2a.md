---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:33f8183
ingested_at: 2026-04-09T22:03:19.497Z
parsed_at: 2026-04-09T22:03:19.497Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM5aJASJY72K6UTogDs"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:51.816Z
---






# feat: VoiceOrb mic on all round inputs + fix agent findings overlay

- **Repo:** rahilsinghi/Flock
- **SHA:** 33f8183
- **Date:** 2026-03-21T19:02:42Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +118
- **Deletions:** -211

QuestionCard rewrite:
- VoiceOrb mic button added to ALL 3 rounds (constraints, vision, dealmakers)
- Round 1: mic next to text override field, voice appends to text
- Round 2: mic next to vision textarea
- Round 3: separate mic for dealbreaker and delight fields
- Teal primary buttons (glow-teal) replacing old gold
- Better text contrast with hex colors
- Chip pre-selection works with more budget patterns

AgentFindings bottom sheet fix:
- Fixed: text was overflowing and hiding dismiss button
- Content area now scrolls independently (overflow-y-auto)
- Fixed bottom section with dismiss button always visible
- Max height capped at 60vh
- "Travelling..." label instead of generic "working"
- Proper dark background with backdrop blur

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
