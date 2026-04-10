---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/neon-exchange:bb1f963
ingested_at: 2026-04-10T06:04:07.638Z
parsed_at: 2026-04-10T06:04:07.638Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuavG7QrGtdu9rzURpa5"}
compile_progress: null
---



# feat: Replace mock services with live Finnhub market data and news

- **Repo:** rahilsinghi/neon-exchange
- **SHA:** bb1f963
- **Date:** 2026-03-07T21:36:39Z
- **Author:** Rahil Singhi
- **Files changed:** 7
- **Additions:** +724
- **Deletions:** -307

- Add config/ticker_mapping.py: 23 fictional tickers mapped to real US
  stocks across 8 cyberpunk districts with sector keywords, volatility
  baselines, and lookup helpers
- Rewrite services/market_data.py: Finnhub REST quotes with TTL-based
  caching, micro-perturbations between refreshes, fallback prices for
  mock mode, batch refresh (5 tickers/cycle) to stay under rate limits
- Rewrite services/news_feed.py: Finnhub general news with sector
  classification, severity scoring, ticker extraction, and mock
  template fallback
- Update orchestrator.py: Fix district references from 5 to 8 districts
  with correct hyphenated IDs matching frontend
- Add requests dependency to requirements.txt
- All public service interfaces preserved for ADK agent compatibility

Tested: 22/23 live quotes on init, 25 real news articles, generate_tick
perturbations working, lookup by both real symbol and neon ID confirmed.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
