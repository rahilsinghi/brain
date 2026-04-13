---
title: Integrating Live Finnhub Market Data and News in Neon-Exchange
author: ai
created_at: 2026-04-12T21:39:32.404Z
last_ai_edit: 2026-04-12T21:39:32.404Z
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
  - adk
  - neon-exchange
  - python
---

# Integrating Live Finnhub Market Data and News in Neon-Exchange

This commit details the integration of live market data and news feeds from Finnhub into the Neon-Exchange project, replacing previous mock services. It introduces real-time stock quotes, news articles with sentiment analysis, and ensures compatibility with ADK agents while managing API rate limits through caching and batch processing.

## Key Concepts

Finnhub API,Market Data Integration,News Feed Processing,Caching Strategies,Rate Limit Management,ADK Agent Compatibility,Sector Classification,Volatility Baselines,Ticker Mapping

## Details

This feature commit (`bb1f963`) to the `rahilsinghi/neon-exchange` repository, authored by Rahil Singhi on 2026-03-07, significantly enhances the platform by integrating live financial data:

*   **`config/ticker_mapping.py`**: A new configuration file was added, mapping 23 fictional Neon-Exchange tickers to real US stocks. This mapping includes sector keywords, volatility baselines, and lookup helpers, distributed across 8 cyberpunk districts.
*   **`services/market_data.py` (Rewritten)**: The market data service now fetches live quotes from the Finnhub REST API. It incorporates a TTL-based caching mechanism, applies micro-perturbations between refreshes for dynamic simulation, provides fallback prices for mock mode, and uses batch refreshing (5 tickers per cycle) to stay within API rate limits.
*   **`services/news_feed.py` (Rewritten)**: The news feed service was updated to pull general news from Finnhub. It includes functionalities for sector classification, severity scoring, and ticker extraction from articles, with a mock template fallback.
*   **`orchestrator.py` (Updated)**: This file was modified to correct district references, expanding from 5 to 8 districts and ensuring consistent hyphenated IDs that match the frontend.
*   **`requirements.txt`**: The `requests` library was added as a dependency to facilitate API calls.

All public service interfaces were preserved to maintain compatibility with [[ADK Multi-Agent Backend (askNYC Project)]] agents.

**Testing Results:**

*   22/23 live quotes successfully initialized.
*   25 real news articles were retrieved.
*   `generate_tick` perturbations were confirmed to be working.
*   Lookup functionality was verified using both real stock symbols and Neon-Exchange IDs.

This work was co-authored by [[Claude]] Opus 4.6.

## Related

[[neon-exchange]],[[Finnhub API]],[[ADK Multi-Agent Backend (askNYC Project)]],[[Claude]],[[API Feature: POST /synthesise Endpoint with Robust Error Handling]],[[API Feature: POST /synthesise with Timeout and Error Handling]]
