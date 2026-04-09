---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:8788161
ingested_at: 2026-04-09T04:03:38.429Z
parsed_at: 2026-04-09T04:03:38.429Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat: page transitions, unified header, glass skeletons, waveform typing indicator

- **Repo:** rahilsinghi/raag
- **SHA:** 8788161
- **Date:** 2026-03-15T20:04:24Z
- **Author:** Rahil Singhi
- **Files changed:** 15
- **Additions:** +837
- **Deletions:** -147

Phase 1 visual overhaul:
- Add framer-motion with AnimatePresence route transitions (template.tsx)
- Create unified AppHeader replacing per-page headers (chat/universe/deep-dive)
- Add glass shimmer skeleton components for loading states
- Replace 3-dot bounce with waveform typing indicator showing active tool name
- Add CSS: glass shimmer animation, sonner toast overrides, tool shimmer
- Add FadeIn + StaggerChildren transition utilities with reduced-motion support
- Fix: handleDescribe uses api.ts describeBar instead of hardcoded URL
- Fix: handleDescribe uses ref+state pattern for stable callback
