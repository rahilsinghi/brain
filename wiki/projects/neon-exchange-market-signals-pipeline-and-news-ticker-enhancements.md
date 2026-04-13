---
title: "Neon-Exchange: Market Signals Pipeline and News Ticker Enhancements"
author: ai
created_at: 2026-04-13T15:39:34.498Z
last_ai_edit: 2026-04-13T15:39:34.498Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-neon-exchange-feat-add-market-signals-pipeline-and-fix-news-ticker-223e8c.md]]"
tags:
  - neon-exchange
  - market signals
  - news extraction
  - api
  - data processing
  - correlation
  - volatility
  - market breadth
  - deduplication
  - regex
  - claude
---

# Neon-Exchange: Market Signals Pipeline and News Ticker Enhancements

This article details a significant update to the `rahilsinghi/neon-exchange` project, introducing a robust market signals pipeline for real-time market metric computation. It also outlines key improvements to news ticker extraction, enhancing accuracy through advanced symbol matching and headline deduplication.

## Key Concepts

Market Signals Pipeline,Pearson Correlation Matrix,Sector Strength Index,Volatility Regime Detection,Market Breadth (Advance/Decline Ratio),News Ticker Extraction,Word-Boundary Regex,Company Name Matching,Headline Deduplication,Jaccard Similarity,`GET /api/market/signals`

## Details

This update to `rahilsinghi/neon-exchange` implements two major phases of development:

**Phase 2 — Signal computation (`services/signals.py`)**:
*   **Pearson correlation matrix**: Calculated across 23 tickers and recomputed every 30 seconds to identify relationships between assets.
*   **Sector strength index**: Provides ranking and trend detection for various market sectors.
*   **Volatility regime detection**: Analyzes individual tickers and districts to classify their volatility as 'calm', 'normal', 'choppy', or 'stormy'.
*   **Market breadth**: Computes the advance/decline ratio and classifies the market's overall breadth.
*   All calculated signals are incorporated into the agent context during cache rebuilds.
*   A new API endpoint, `/api/market/signals`, is introduced to expose these computed signals.

**Phase 3 — News improvements**:
*   **Word-boundary regex**: Applied for ticker symbols with three or more characters to improve precision.
*   **Company-name matching**: Implemented for short, ambiguous symbols (e.g., T, DE, GS) to prevent false positives (e.g., "T" matching "Trump", "DE" matching "Defense") by matching against known company names.
*   **Headline deduplication**: Utilizes Jaccard similarity, skipping headlines with more than 50% token overlap to reduce redundancy.
*   **Simplified `district_id` assignment**: Now uses a direct lookup map for more efficient assignment.
*   The `COMPANY_NAMES` mapping was added to `ticker_mapping.py` to support accurate company-name matching.

## Related

[[rahilsinghi/neon-exchange]],[[Claude Opus 4.6]]
