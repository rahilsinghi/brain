---
title: AskNYC Recommendation Page with Multi-Agent Pipeline
author: ai
created_at: 2026-04-13T17:07:01.596Z
last_ai_edit: 2026-04-13T17:07:01.596Z
last_human_edit: null
last_embedded_hash: 318ce7144e279059
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-ask-add-ask-recommendation-page-with-multi-agent-pipe-b4bf61.md]]"
tags:
  - asknyc
  - recommendation
  - multi-agent
  - sse
  - gemini
  - socrata
  - backend
  - frontend
  - feature
  - pipeline
---


# AskNYC Recommendation Page with Multi-Agent Pipeline

This article details the implementation of a new text-based recommendation page at `/ask` within the AskNYC project. It leverages a multi-agent pipeline where 6-8 data agents query Socrata datasets in parallel, with Gemini synthesizing scored recommendation cards backed by data-driven reasoning. The feature includes a robust backend SSE endpoint and interactive frontend components for a dynamic user experience.

## Key Concepts

Multi-Agent System,Recommendation Engine,Server-Sent Events (SSE),Data Synthesis,Socrata Datasets,Gemini Model,Frontend Components (AgentCard, RecommendationCard, QueryInput, ProgressTimeline),API Endpoint (POST /api/recommend)

## Details

The `rahilsinghi/askNYC` repository, specifically at SHA `d7408ec` (dated 2026-03-28T16:52:35Z by Rahil Singhi), introduced a significant feature: a new text-based recommendation experience accessible at the `/ask` endpoint. This feature allows users to pose open-ended questions about New York City, which are then processed by a sophisticated multi-agent pipeline.

Upon a user query, 6-8 specialized data agents are visibly dispatched to query various Socrata datasets in parallel. The results from these agents are then synthesized by the Gemini model, which generates scored recommendation cards. Each recommendation card is presented with data-backed reasoning, providing transparency and credibility to the suggestions.

**Technical Implementation:**

*   **Backend:** A Server-Sent Events (SSE) endpoint at `POST /api/recommend` orchestrates the recommendation process. The `recommend_service.py` module handles the core logic, which includes parsing user input, geocoding relevant locations, managing parallel queries to Socrata, and finally, synthesizing the agent outputs into coherent recommendations.
*   **Frontend:** The user interface is built with interactive components such as `AgentCard` and `AgentGrid` to visualize agent activity, `RecommendationCard` to display the final suggestions, `QueryInput` for user interaction, and a `ProgressTimeline` to show the state of the recommendation generation. A `useRecommend` React hook integrates these components, initially supporting 4 hardcoded demo fallback sequences for development and testing.

This enhancement involved changes across 15 files, adding 1898 lines of code and deleting 2.

## Related

[[/ask Recommendation Page]],[[AskNYC Recommendation Page with Multi-Agent Pipeline]],[[ADK Multi-Agent Backend for askNYC with NYC Open Data]],[[AskNYC Model Update: Gemini 2.5 Flash Native Audio]],[[Backend Fix: Socrata Tool Return Types for ADK Compatibility]],[[API Feature: POST /synthesise Endpoint with Robust Error Handling]],[[askNYC: Next.js 15 Dashboard with Real-time WebSocket UI]],[[askNYC: Functional Splash Page, Dashboard Query Params, and Settings Panel]]
