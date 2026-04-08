---
title: MarketPulse AI – Real-Time Financial News Q&A
author: ai
created_at: 2026-04-08T14:25:52.437Z
last_ai_edit: 2026-04-08T14:25:52.437Z
last_human_edit: null
last_embedded_hash: da020b088fcf1222
sources:
  - career-datacenter/data/projects.yaml#proj_marketpulse_ai
tags:
  - project
  - hackathon
  - python
  - openai-gpt-4o
  - pathway-streaming-
  - faiss
  - numpy
---



# MarketPulse AI – Real-Time Financial News Q&A

**hackathon** · 2025

## Problem

Financial analysts need real-time answers grounded in the latest market news, but LLMs lack live context and can hallucinate stale information.

## Approach

Built a RAG pipeline that streams financial headlines via Finnhub WebSocket into a dynamically updating vector index (OpenAI embeddings + FAISS), with time-decay weighted ranking and LRU-cached semantic search, served through a Streamlit chat interface.

## Results

Cached queries in 0.1-0.3s, cold queries in 1.5-3s. FAISS search <20ms at 1k docs. LRU embedding cache >60% hit rate. Covers real tickers (AAPL, TSLA, MSFT, GOOGL).

## Key Points

- Built a real-time RAG system that streams financial news via Finnhub WebSocket and answers market questions using GPT-4o grounded in live context
- Implemented hybrid vector search with linear cosine similarity for <1K docs and FAISS auto-switch for scale; tuned similarity threshold (0.30) for precision/recall balance
- Designed time-decay weighted ranking combining semantic similarity (80%) and temporal recency (20%) for relevance scoring
- Added LRU embedding cache (512 slots, >60% hit rate) and async query handling; cached queries resolve in 0.1-0.3s
- Built Streamlit UI with live news sidebar, latency badges, and performance metrics display

## Tech Stack

Python, OpenAI GPT-4o, Pathway (streaming), FAISS, NumPy, Streamlit, Finnhub WebSocket, RAG, Cosine Similarity, asyncio

## Links

- [Repository](https://github.com/rahilsinghi/MarketPulse-AI)
