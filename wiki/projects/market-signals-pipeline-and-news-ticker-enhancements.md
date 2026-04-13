---
title: Market Signals Pipeline and News Ticker Enhancements
author: ai
created_at: 2026-04-10T18:10:07.824Z
last_ai_edit: 2026-04-10T18:10:07.824Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-neon-exchange-feat-add-market-signals-pipeline-and-fix-news-ticker-223e8c.md]]"
tags:
  - market signals
  - pipeline
  - news ticker
  - feature
  - pearson correlation
  - volatility
  - market breadth
  - regex
  - jaccard similarity
  - neon-exchange
  - signal computation
  - news extraction
  - api
---

# Market Signals Pipeline and News Ticker Enhancements

This article details a feature implementation that introduces a new market signals computation pipeline and significantly improves news ticker extraction within the `rahilsinghi/neon-exchange` project. Key additions include Pearson correlation, sector strength, volatility regime detection, and market breadth analysis, alongside advanced news processing techniques like word-boundary regex and Jaccard similarity for deduplication.

## Key Concepts

Pearson Correlation,Sector Strength Index,Volatility Regime Detection,Market Breadth (Advance/Decline Ratio),Agent Context,Word-Boundary Regex,Jaccard Similarity

## Details

This commit (`e977f8f`) to the `rahilsinghi/neon-exchange` repository, authored by [[Rahil Singhi]] on 2026-03-07, introduces significant feature enhancements for market signal computation and news ticker extraction. The changes involved 5 files, adding 406 lines and deleting 11 lines.

### Phase 2 — Signal Computation (`services/signals.py`)
This phase implemented a new pipeline for real-time market signal generation:

*   **Pearson Correlation Matrix**: Calculated across 23 tickers and recomputed every 30 seconds to identify relationships between assets.
*   **Sector Strength Index**: Provides ranking and trend detection for various market sectors.
*   **Volatility Regime Detection**: Determines the volatility state (calm, normal, choppy, storm) for individual tickers and districts.
*   **Market Breadth**: Computes the advance/decline ratio and classifies its signal.
*   **Integration**: All computed signals are fed into the agent context during cache rebuilds.
*   **New Endpoint**: A new API endpoint `GET /api/market/signals` was added to expose these signals.

### Phase 3 — News Improvements
Enhancements were made to the news extraction and processing logic:

*   **Word-Boundary Regex**: Implemented for symbol detection, specifically for symbols with 3 or more characters, to improve accuracy.
*   **Company-Name Matching**: Introduced for short symbols (e.g., 'T', 'DE', 'GS') to prevent false positives where common words might match a symbol (e.g., 'T' matching 'Trump' instead of 'AT&T').
*   **Headline Deduplication**: Utilizes Jaccard similarity; headlines with greater than 50% token overlap are skipped to reduce redundancy.
*   **Simplified `district_id` Assignment**: Direct lookup maps are now used for more efficient assignment.
*   **`COMPANY_NAMES` Mapping**: Added to `ticker_mapping.py` to support accurate company-name matching.

This feature was co-authored by [[Claude Opus 4.6]].

## Related

[[Project: neon-exchange]],[[Rahil Singhi]],[[Claude Opus 4.6]]
