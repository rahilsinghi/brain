---
title: Live Finnhub Market Data and News Integration in Neon Exchange
author: ai
created_at: 2026-04-13T17:21:47.363Z
last_ai_edit: 2026-04-13T17:21:47.363Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-neon-exchange-feat-replace-mock-services-with-live-finnhub-market-d-37dc8a.md]]"
tags:
  - finnhub
  - market data
  - news feed
  - neon exchange
  - api integration
  - caching
  - python
  - adk
  - data services
---

# Live Finnhub Market Data and News Integration in Neon Exchange

This article details the integration of live market data and news feeds from Finnhub into the `rahilsinghi/neon-exchange` project, replacing previous mock services. The update introduces real-time stock quotes with caching, sector-classified news with sentiment analysis, and a comprehensive mapping of fictional in-game tickers to real-world stocks, enhancing the project's realism and data fidelity.

## Key Concepts

Finnhub API Integration,Market Data Services,News Feed Processing,Data Caching (TTL-based),Rate Limiting,Ticker Mapping (Fictional to Real),Micro-perturbations (Stock Price Simulation),ADK Agent Compatibility,Cyberpunk Districts,Sentiment Analysis (News Severity Scoring)

## Details

This feature update, with commit SHA `bb1f963` by Rahil Singhi on 2026-03-07, significantly overhauls the data backbone of the `rahilsinghi/neon-exchange` project by replacing mock data sources with live information from the [[Finnhub]] API.

**Key Changes and Enhancements:**

*   **`config/ticker_mapping.py` Added:** Introduces a comprehensive mapping for 23 fictional in-game tickers to real US stocks. This mapping also categorizes stocks across 8 distinct cyberpunk districts, defines sector keywords, sets volatility baselines, and provides helper functions for lookup. This configuration is crucial for bridging the fictional game world with real market data.
*   **`services/market_data.py` Rewritten:** The market data service now fetches live stock quotes from the [[Finnhub]] REST API. To manage API usage and provide a dynamic experience, it implements TTL-based caching for efficiency and micro-perturbations between refreshes to simulate continuous market activity. A fallback mechanism is included to provide mock prices if live data is unavailable. Batch refreshing (5 tickers per cycle) is used to adhere to [[Finnhub]]'s rate limits.
*   **`services/news_feed.py` Rewritten:** The news feed service now integrates with [[Finnhub]]'s general news API. It performs sector classification, assigns a severity score to news articles, extracts relevant tickers, and includes a mock template fallback for periods without live news. This allows for dynamic and contextually relevant news within the game.
*   **`orchestrator.py` Updated:** This file was modified to correctly reference the expanded 8 cyberpunk districts, ensuring that district IDs match the frontend's hyphenated format.
*   **`requirements.txt` Updated:** The `requests` library was added to handle HTTP requests for the [[Finnhub]] API.

All public service interfaces were preserved to maintain compatibility with [[ADK Multi-Agent Backend]] agents, ensuring a smooth transition to live data without breaking existing integrations.

**Testing Results:**

Initial testing confirmed successful integration, with 22 out of 23 live quotes being fetched on initialization, 25 real news articles retrieved, `generate_tick` perturbations functioning as expected, and lookups performing correctly using both real stock symbols and Neon Exchange's fictional IDs.

**Co-Authored-By:** [[Claude Opus 4.6]]

## Related

[[Finnhub]],[[ADK Multi-Agent Backend]],[[Claude Opus 4.6]],[[Neon Exchange Orchestrator]],[[requirements.txt]],[[Neon Exchange]]
