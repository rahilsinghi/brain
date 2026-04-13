---
title: "Neon-Exchange: Live Finnhub Market Data and News Integration"
author: ai
created_at: 2026-04-13T15:59:02.156Z
last_ai_edit: 2026-04-13T15:59:02.156Z
last_human_edit: null
last_embedded_hash: 794e9ee9d53dab03
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-neon-exchange-feat-replace-mock-services-with-live-finnhub-market-d-37dc8a.md]]"
tags:
  - finnhub
  - market data
  - news
  - api
  - integration
  - caching
  - neon-exchange
  - adk
  - python
  - services
  - mock services
  - rate limiting
  - ticker mapping
---


# Neon-Exchange: Live Finnhub Market Data and News Integration

This feature update for the `rahilsinghi/neon-exchange` project replaces mock data services with live Finnhub API integrations for market data and news. It includes a comprehensive ticker mapping, implements TTL-based caching with micro-perturbations for market data, and enriches news feeds with sector classification and ticker extraction, all while maintaining compatibility with [[ADK Multi-Agent Backend (askNYC Project)]] agents.

## Key Concepts

[[Finnhub API]],Market Data,News Feed,Mock Services,Caching,Rate Limiting,API Integration,Ticker Mapping,Sector Classification,Volatility Baselines,[[ADK Agent]] Compatibility

## Details

This commit (`bb1f963`) by [[Rahil Singhi]] on March 7, 2026, significantly enhances the `rahilsinghi/neon-exchange` project by transitioning from mock data to live market data and news. The changes were co-authored by [[Claude Opus 4.6]].

**Key changes include:**

*   **`config/ticker_mapping.py`**: Added 23 fictional tickers mapped to real US stocks. This mapping spans 8 cyberpunk districts, incorporating sector keywords, volatility baselines, and lookup helpers.
*   **`services/market_data.py`**: Rewritten to integrate with Finnhub REST for real-time quotes. Features include:
    *   TTL-based caching to manage API requests.
    *   Micro-perturbations between refreshes to simulate dynamic market changes.
    *   Fallback prices for 'mock mode' operation.
    *   Batch refreshing (5 tickers per cycle) to adhere to Finnhub API rate limits.
*   **`services/news_feed.py`**: Rewritten to fetch Finnhub general news. Enhancements include:
    *   Sector classification for news articles.
    *   Severity scoring for impact assessment.
    *   Ticker extraction to link news to specific assets.
    *   Mock template fallback for development or API failures.
*   **`orchestrator.py`**: Updated to correct district references from 5 to 8 districts, ensuring consistent hyphenated IDs matching the frontend.
*   **`requirements.txt`**: Added `requests` dependency to support new API integrations.

All public service interfaces were preserved to ensure compatibility with [[ADK Multi-Agent Backend (askNYC Project)]] agents.

**Testing results confirmed:**
*   22 out of 23 live quotes successfully initialized.
*   25 real news articles were retrieved.
*   `generate_tick` perturbations functioned as expected.
*   Lookup functionality by both real stock symbols and Neon IDs was verified.

## Related

[[neon-exchange]],[[Finnhub API]],[[ADK Multi-Agent Backend (askNYC Project)]],[[Rahil Singhi]],[[Claude Opus 4.6]]
