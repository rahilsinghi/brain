---
title: Market Signals Pipeline and News Ticker Extraction Enhancements (Neon Exchange)
author: ai
created_at: 2026-04-13T17:16:39.886Z
last_ai_edit: 2026-04-13T17:16:39.886Z
last_human_edit: null
last_embedded_hash: 13da3170f8620b05
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-neon-exchange-feat-add-market-signals-pipeline-and-fix-news-ticker-223e8c.md]]"
tags:
  - neon-exchange
  - market signals
  - news ticker
  - financial data
  - correlation
  - volatility
  - market breadth
  - data processing
  - nlp
  - ai
  - llm
  - api
---


# Market Signals Pipeline and News Ticker Extraction Enhancements (Neon Exchange)

This commit introduces a comprehensive market signals pipeline and significantly improves news ticker extraction within the `rahilsinghi/neon-exchange` project. Key features include the computation of various financial signals like Pearson correlation, sector strength, volatility regimes, and market breadth, alongside robust news headline processing with symbol matching, company name resolution, and deduplication.

## Key Concepts

Market Signals Pipeline,News Ticker Extraction,Pearson Correlation Matrix,Sector Strength Index,Volatility Regime Detection,Market Breadth (Advance/Decline Ratio),Headline Deduplication,Jaccard Similarity,Agent Context,Ticker Mapping

## Details

This commit (`e977f8f`) to the `rahilsinghi/neon-exchange` repository, authored by [[Rahil Singhi]] on March 7, 2026, focuses on two major areas: a new market signals pipeline and enhancements to news ticker extraction. Five files were changed, with 406 additions and 11 deletions.

### Phase 2 — Signal Computation (`services/signals.py`)
This phase introduces a robust pipeline for generating market signals, which are recalculated every 30 seconds during a cache rebuild and fed into the agent context. A new API endpoint, `GET /api/market/signals`, was added to expose these computations. The implemented signals include:

*   **[[Pearson Correlation]] Matrix**: Calculated across 23 different financial tickers to identify relationships between their movements.
*   **[[Sector Strength Index]]**: Provides ranking and trend detection for various market sectors.
*   **[[Volatility Regime Detection]]**: Analyzes and categorizes the volatility of individual tickers and market districts into states like calm, normal, choppy, or storm.
*   **[[Market Breadth]] (Advance/Decline Ratio)**: Measures the overall market sentiment by classifying signals based on the ratio of advancing to declining stocks.

### Phase 3 — News Improvements
Significant improvements were made to the news processing capabilities, particularly concerning ticker and company name extraction, and headline management:

*   **Word-Boundary Regex for Symbols**: Enhanced regular expressions now accurately identify symbols of three or more characters, ensuring precise matching.
*   **Company-Name Matching for Short Symbols**: Addressed false positives for common short symbols (e.g., 'T' for AT&T, 'DE' for Deere & Company, 'GS' for Goldman Sachs) by implementing company-name matching. This prevents incorrect associations like 'T' matching 'Trump' or 'DE' matching 'Defense'.
*   **[[Headline Deduplication]]**: Implemented a mechanism to prevent duplicate headlines using [[Jaccard Similarity]]. Headlines with greater than 50% token overlap are now skipped.
*   **Simplified District ID Assignment**: The process for assigning `district_id` was streamlined with a direct lookup map.
*   **`COMPANY_NAMES` Mapping**: A new `COMPANY_NAMES` mapping was added to `ticker_mapping.py` to support more accurate company name resolution.

This commit was co-authored by [[Claude Opus 4.6]].

## Related

[[Rahil Singhi]],[[Add Project Overrides for Ticker Enrichment]],[[Agent System Prompt Loading with PromptStore Integration in Ouroboros]],[[Neon Exchange Project]],[[Market Signals Pipeline]],[[News Ticker Extraction]],[[Pearson Correlation]],[[Sector Strength Index]],[[Volatility Regime Detection]],[[Market Breadth]],[[Jaccard Similarity]],[[Headline Deduplication]],[[Ticker Mapping]],[[Claude Opus 4.6]]
