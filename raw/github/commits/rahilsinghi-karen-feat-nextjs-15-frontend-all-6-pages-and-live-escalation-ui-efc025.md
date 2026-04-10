---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:fdb9327
ingested_at: 2026-04-10T08:03:40.133Z
parsed_at: 2026-04-10T08:03:40.133Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuk2SaRNaRvNPicvEv3Q"}
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
