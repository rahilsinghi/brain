---
title: askNYC /ask Recommendation Page with Multi-Agent Pipeline
author: ai
created_at: 2026-04-10T02:06:10.275Z
last_ai_edit: 2026-04-10T02:06:10.275Z
last_human_edit: null
last_embedded_hash: 732d407ce52d1098
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-ask-add-ask-recommendation-page-with-multi-agent-pipe-b4bf61.md]]"
tags:
  - asknyc
  - multi-agent
  - sse
  - gemini
  - socrata
  - nyc-open-data
  - recommendation
  - react
  - python
  - orchestration
  - llm
  - feature
---


# askNYC /ask Recommendation Page with Multi-Agent Pipeline

The /ask feature introduces a text-based recommendation experience for askNYC, allowing users to pose open-ended questions about New York City. A multi-agent pipeline of 6-8 data agents queries Socrata datasets in parallel, with Gemini synthesizing the results into scored, data-backed recommendation cards. The implementation spans a full-stack SSE-driven architecture with a structured orchestration service and a rich React frontend.

## Key Concepts

- **Multi-Agent Pipeline:** 6-8 specialized data agents run visibly and in parallel to query NYC Socrata datasets in response to a user prompt
- **Server-Sent Events (SSE):** Backend streams agent progress and results to the frontend via a POST /api/recommend SSE endpoint
- **Gemini Synthesis:** Google Gemini LLM scores and synthesizes agent query results into structured recommendation cards with reasoning
- **recommend_service.py Orchestration:** Backend service managing the full pipeline: prompt parsing → geocoding → parallel dataset queries → synthesis
- **AgentCard/Grid:** Frontend components that visibly display each agent's status and progress during query execution
- **RecommendationCard:** Frontend component rendering a single scored recommendation with data-backed reasoning
- **useRecommend Hook:** Custom React hook managing recommendation state, SSE subscription, and 4 hardcoded demo fallback sequences
- **ProgressTimeline:** Frontend component visualizing the sequential and parallel steps of the pipeline as it runs
- **QueryInput:** Frontend component for capturing open-ended user questions about NYC

## Details

## Overview

Commit `d7408ec` (2026-03-28) by Rahil Singhi introduces the `/ask` route to the **askNYC** project. This feature adds a conversational, text-driven recommendation experience backed by a fully orchestrated multi-agent data pipeline.

## Backend Architecture

### SSE Endpoint
- **Route:** `POST /api/recommend`
- Streams real-time agent status updates and final results to the client using Server-Sent Events (SSE)
- Allows the frontend to reactively display agent progress as it happens

### recommend_service.py
The core orchestration module executes the following pipeline stages:
1. **Parse** – Extracts intent and parameters from the user's natural language question
2. **Geocode** – Resolves any location references to geographic coordinates
3. **Parallel Queries** – Dispatches 6-8 data agents concurrently against NYC Socrata open datasets
4. **Synthesize** – Passes aggregated agent results to Gemini, which scores and formats them into recommendation cards with data-backed reasoning

## Frontend Architecture

| Component | Role |
|---|---|
| `QueryInput` | Captures open-ended user questions |
| `AgentCard` / `AgentGrid` | Displays each agent's identity, status, and progress |
| `ProgressTimeline` | Visualizes pipeline stages in real time |
| `RecommendationCard` | Renders a single scored recommendation with supporting data |
| `useRecommend` | Custom hook managing SSE lifecycle, state, and 4 demo fallback sequences |

### Demo Fallback Sequences
The `useRecommend` hook includes 4 hardcoded demo sequences, enabling the UI to function and be demonstrated without a live backend connection.

## Change Statistics
- **Files changed:** 15
- **Additions:** +1,898 lines
- **Deletions:** -2 lines

The large addition count reflects a greenfield feature spanning new backend service logic, API routing, and multiple new frontend components and hooks.

## Related

- [[askNYC Project]]
- [[Multi-Agent AI Systems]]
- [[Server-Sent Events (SSE)]]
- [[Socrata Open Data API]]
- [[Gemini LLM Integration]]
- [[NYC Open Data]]
- [[React Custom Hooks]]
- [[Recommendation Systems]]
