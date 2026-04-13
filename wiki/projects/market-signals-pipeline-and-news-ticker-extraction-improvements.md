---
title: Market Signals Pipeline and News Ticker Extraction Improvements
author: ai
created_at: 2026-04-10T22:09:51.247Z
last_ai_edit: 2026-04-10T22:09:51.247Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-neon-exchange-feat-add-market-signals-pipeline-and-fix-news-ticker-223e8c.md]]"
tags:
  - market signals
  - pipeline
  - news extraction
  - financial data
  - correlation
  - volatility
  - market breadth
  - feature
  - neon-exchange
  - python
  - api
  - commit
---

# Market Signals Pipeline and News Ticker Extraction Improvements

This article details a significant update to the `neon-exchange` project, introducing a robust market signals pipeline for real-time analytics and implementing critical improvements to news ticker extraction logic. These enhancements aim to provide more accurate and timely market insights within the platform by refining data computation and improving information filtering.

## Key Concepts

[[Market Signals Pipeline]],[[News Ticker Extraction]],[[Pearson Correlation Matrix]],[[Sector Strength Index]],[[Volatility Regime Detection]],[[Market Breadth]],[[Jaccard Similarity]],[[neon-exchange]]

## Details

This commit, identified by SHA `e977f8f` and authored by [[Rahil Singhi]] on 2026-03-07, introduces significant feature enhancements to the `rahilsinghi/neon-exchange` repository. The changes, co-authored by [[Claude Opus 4.6]], involved modifying 5 files, adding 406 lines, and deleting 11.

### Phase 2 — Market Signals Pipeline (services/signals.py)

A new pipeline for computing market signals has been integrated, providing real-time analytical capabilities:

*   **Pearson Correlation Matrix**: Calculates correlations across 23 financial tickers, recalculated every 30 seconds to capture dynamic relationships.
*   **Sector Strength Index**: Computes and ranks sector strength, incorporating trend detection to identify emerging or declining sectors.
*   **Volatility Regime Detection**: Analyzes volatility for individual tickers and districts, classifying them into states like `calm`, `normal`, `choppy`, or `storm` to indicate market conditions.
*   **Market Breadth**: Implements an advance/decline ratio with integrated signal classification, offering insights into overall market participation and sentiment.
*   All computed signals are generated during cache rebuilds and then fed directly into the agent context for subsequent processing or decision-making.
*   **New API Endpoint**: A new endpoint, `GET /api/market/signals`, has been added to expose these computed market signals.

### Phase 3 — News Improvements

Significant improvements have been made to the news processing and ticker extraction logic to enhance accuracy and relevance:

*   **Word-boundary Regex**: Enhanced symbol matching to use word-boundary regular expressions for symbols of 3 characters or more, ensuring precise identification.
*   **Company Name Matching**: Introduced company-name matching for short symbols (e.g., "T", "DE", "GS") to eliminate false positives. This prevents generic terms like "T" matching "Trump" or "DE" matching "Defense" when the intention is to identify specific companies.
*   **Headline Deduplication**: Implemented a deduplication mechanism using Jaccard similarity. Headlines with more than 50% token overlap are now skipped, reducing redundancy.
*   **Simplified `district_id` Assignment**: Streamlined the assignment of `district_id` using a direct lookup map, improving efficiency and accuracy.
*   **`COMPANY_NAMES` Mapping**: Added a `COMPANY_NAMES` mapping to `ticker_mapping.py` to support more robust company identification.

## Related

[[neon-exchange]],[[Rahil Singhi]],[[Claude Opus 4.6]],[[Financial Market Analysis]],[[Algorithmic Trading]]
