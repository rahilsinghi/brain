---
title: Finnhub Live Data and News Integration (neon-exchange)
author: ai
created_at: 2026-04-10T22:13:39.578Z
last_ai_edit: 2026-04-10T22:13:39.578Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-neon-exchange-feat-replace-mock-services-with-live-finnhub-market-d-37dc8a.md]]"
tags:
  - finnhub
  - market data
  - news feed
  - api integration
  - caching
  - rate limiting
  - python
  - neon-exchange
  - feature
  - orchestration
  - financial data
  - commit
  - ai-assisted
---

# Finnhub Live Data and News Integration (neon-exchange)

This significant feature update integrates live market data and news from the Finnhub API into the `neon-exchange` project, replacing existing mock services. It introduces real-time stock quotes with caching and rate limiting, alongside a classified news feed, all while maintaining compatibility with established interfaces.

## Key Concepts

Finnhub API,Market Data,News Feed,Caching (TTL-based),Rate Limiting,Micro-perturbations,Mock Services,API Integration,Ticker Mapping,Sector Classification,Volatility Baselines,Orchestration,ADK Agent Compatibility,Cyberpunk Districts

## Details

This feature update, committed under SHA `bb1f963` on `2026-03-07T21:36:39Z` by [[Rahil Singhi]], introduces live market data and news integration using the Finnhub API into the `neon-exchange` repository. This change involved 7 files, with +724 additions and -307 deletions, and was co-authored by [[Claude Opus 4.6]].

### Key Changes and Implementations:

*   **`config/ticker_mapping.py`**: A new configuration file was added, mapping 23 fictional tickers to real US stocks. This mapping incorporates 8 cyberpunk districts, sector keywords, volatility baselines, and helper functions for efficient lookups.
*   **`services/market_data.py`**: This service was rewritten to fetch Finnhub REST quotes. It includes:
    *   **TTL-based caching**: To efficiently manage data retrieval.
    *   **Micro-perturbations**: Applied between refreshes to simulate dynamic market movements.
    *   **Fallback prices**: For scenarios where the system operates in mock mode.
    *   **Batch refreshing**: Data is refreshed in batches of 5 tickers per cycle to adhere to API rate limits.
*   **`services/news_feed.py`**: This service was also rewritten to process general news from Finnhub, incorporating:
    *   **Sector classification**: Categorizing news articles by sector.
    *   **Severity scoring**: Assigning a score to indicate the impact of news.
    *   **Ticker extraction**: Identifying relevant stock tickers within news content.
    *   **Mock template fallback**: For when live news data is unavailable.
*   **`orchestrator.py`**: Updated to correct district references, expanding from 5 to 8 districts, and ensuring that hyphenated IDs align with the frontend requirements.
*   **`requirements.txt`**: The `requests` dependency was added to facilitate API calls.

### Compatibility and Testing:

All public service interfaces have been preserved to ensure full compatibility with [[ADK Agent]]s. Testing confirmed successful operation with 22/23 live quotes on initialization, 25 real news articles, functional `generate_tick` perturbations, and accurate lookups by both real stock symbols and neon IDs.

## Related

[[neon-exchange]],[[Finnhub API]],[[Rahil Singhi]],[[Claude Opus 4.6]],[[ADK Agent]]
