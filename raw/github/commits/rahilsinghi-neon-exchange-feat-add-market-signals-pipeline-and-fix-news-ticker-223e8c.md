---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/neon-exchange:e977f8f
ingested_at: 2026-04-13T17:05:37.841Z
parsed_at: 2026-04-13T17:05:37.841Z
compiled_to: "[[Market Signals Pipeline and News Ticker Extraction Enhancements (Neon Exchange)]]"
processed_at: 2026-04-13T17:16:39.886Z
retry_count: 0
last_error: null
compile_progress: null
---



# feat: Add market signals pipeline and fix news ticker extraction

- **Repo:** rahilsinghi/neon-exchange
- **SHA:** e977f8f
- **Date:** 2026-03-07T22:43:22Z
- **Author:** Rahil Singhi
- **Files changed:** 5
- **Additions:** +406
- **Deletions:** -11

Phase 2 — Signal computation (services/signals.py):
- Pearson correlation matrix across 23 tickers (recalculated every 30s)
- Sector strength index with ranking and trend detection
- Volatility regime detection per ticker and district (calm/normal/choppy/storm)
- Market breadth: advance/decline ratio with signal classification
- All signals computed during cache rebuild and fed into agent context
- New endpoint: GET /api/market/signals

Phase 3 — News improvements:
- Word-boundary regex for symbols >=3 chars
- Company-name matching for short symbols (T, DE, GS) — eliminates false
  positives like "T" matching "Trump" or "DE" matching "Defense"
- Headline deduplication via Jaccard similarity (>50% token overlap = skip)
- Simplified district_id assignment with direct lookup map
- Added COMPANY_NAMES mapping to ticker_mapping.py

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
