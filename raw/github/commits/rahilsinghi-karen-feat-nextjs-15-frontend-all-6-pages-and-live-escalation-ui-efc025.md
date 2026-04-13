---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:fdb9327
ingested_at: 2026-04-13T17:05:37.812Z
parsed_at: 2026-04-13T17:05:37.812Z
compiled_to: "[[Next.js 15 Frontend for Karen Project: Six Pages and Live Escalation UI]]"
processed_at: 2026-04-13T17:13:17.437Z
retry_count: 0
last_error: null
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
