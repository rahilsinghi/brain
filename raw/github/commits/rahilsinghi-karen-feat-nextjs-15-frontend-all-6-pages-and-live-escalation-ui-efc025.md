---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:fdb9327
ingested_at: 2026-04-09T01:03:46.910Z
parsed_at: 2026-04-09T01:03:46.910Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
compile_progress: null
---



# feat: Next.js 15 frontend — all 6 pages and live escalation UI

- **Repo:** rahilsinghi/karen
- **SHA:** fdb9327
- **Date:** 2026-04-04T13:30:56Z
- **Author:** Rahil Singhi
- **Files changed:** 38
- **Additions:** +7866
- **Deletions:** -0

Circle dashboard (/), live escalation view with SSE (/escalation/[id]),
trigger form with personality preview (/trigger), Open Matters registry
(/open-matters), onboarding flow (/join), and Karen lore page (/karen).

Components: EscalationTimeline, KarenSidebar, LevelCard, MemberCard,
DeescalationSequence, OpenMattersTable, OnboardingFlow.

Hooks: useEscalation (SSE with dedup + last_seq reconnect), useCircle,
useKarenAudio (voice playback queue), useBackgroundMusic (Web Audio
progressive distortion). Autoplay gate for audio.
