---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Coro:10a2cc6
ingested_at: 2026-04-09T05:03:49.988Z
parsed_at: 2026-04-09T05:03:49.988Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# fix: smooth drop transition — no BPM jump, gradual build-up ramp

- **Repo:** rahilsinghi/Coro
- **SHA:** 10a2cc6
- **Date:** 2026-02-28T21:34:20Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +46
- **Deletions:** -10

The previous drop fired bpm+20 which triggered reset_context() in Lyria
causing a hard audio cut (silence then unrelated music from scratch).

New approach:
- t=1s: overlay "rising tension" prompt at w=0.25, density→0.75, brightness→0.80
- t=2s: overlay "rising tension" at w=0.50, density→0.92, brightness→0.96
- t=3s: switch to drop prompts at the SAME BPM — no reset_context() fires,
        Lyria morphs continuously from the build into the drop

BPM is held constant throughout so the audio stream never cuts.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
