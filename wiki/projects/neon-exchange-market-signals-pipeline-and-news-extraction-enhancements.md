---
title: "Neon-Exchange: Market Signals Pipeline and News Extraction Enhancements"
author: ai
created_at: 2026-04-12T17:26:51.292Z
last_ai_edit: 2026-04-12T17:26:51.292Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-neon-exchange-feat-add-market-signals-pipeline-and-fix-news-ticker-223e8c.md]]"
tags:
  - neon-exchange
  - market signals
  - financial data
  - news processing
  - data analysis
  - pipeline
  - correlation
  - volatility
  - deduplication
  - regex
  - api
---

# Neon-Exchange: Market Signals Pipeline and News Extraction Enhancements

This update to the `neon-exchange` repository introduces a comprehensive market signals computation pipeline, including Pearson correlation matrices, sector strength indices, and volatility regime detection. It also significantly refines news headline processing through word-boundary regex for symbols, company-name matching, and Jaccard similarity-based deduplication.

## Key Concepts

Market Signals Pipeline,Pearson Correlation Matrix,Sector Strength Index,Volatility Regime Detection,Market Breadth (Advance/Decline Ratio),News Headline Extraction,Headline Deduplication,Jaccard Similarity,Word-Boundary Regex,Company Name Matching

## Details

This commit, authored by [[Rahil Singhi]] and co-authored by [[Claude Opus 4.6]], implements significant enhancements to the `neon-exchange` project. These improvements are categorized into two main phases:

**Phase 2 — Signal computation (`services/signals.py`):**
*   **Pearson Correlation Matrix**: Calculates correlations across 23 tickers, recomputing every 30 seconds to provide real-time market insights.
*   **Sector Strength Index**: Introduces a system for ranking sector strength and detecting trends, aiding in broader market analysis.
*   **Volatility Regime Detection**: Implements per-ticker and per-district volatility analysis, classifying market conditions as 'calm,' 'normal,' 'choppy,' or 'storm.'
*   **Market Breadth**: Computes advance/decline ratios and applies signal classification to gauge overall market participation.
*   All computed signals are integrated into the agent context during cache rebuilds.
*   A new endpoint, `GET /api/market/signals`, is added to expose these market signals.

**Phase 3 — News improvements:**
*   **Word-Boundary Regex**: Enhances symbol extraction from news headlines by using regex specifically for symbols with 3 or more characters, reducing false positives.
*   **Company-Name Matching**: Addresses issues with short symbols (e.g., 'T', 'DE', 'GS') by matching them against a `COMPANY_NAMES` mapping to `ticker_mapping.py`, preventing incorrect associations (e.g., 'T' matching 'Trump' instead of a stock ticker).
*   **Headline Deduplication**: Implements a mechanism to deduplicate news headlines using [[Jaccard Similarity]]. Headlines with more than 50% token overlap are skipped, ensuring unique and relevant news delivery.
*   **Simplified District ID Assignment**: Streamlines the process of assigning `district_id` through a direct lookup map.
*   The `COMPANY_NAMES` mapping is now integrated into `ticker_mapping.py` for better organization and accuracy.

## Related

[[Neon-Exchange]],[[Rahil Singhi]],[[Claude Opus 4.6]],[[Pearson correlation matrix]],[[Jaccard similarity]],[[Regex]],[[API]]
