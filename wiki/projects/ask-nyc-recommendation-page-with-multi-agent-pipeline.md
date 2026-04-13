---
title: "Ask NYC: Recommendation Page with Multi-Agent Pipeline"
author: ai
created_at: 2026-04-13T15:06:06.824Z
last_ai_edit: 2026-04-13T15:06:06.824Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-ask-add-ask-recommendation-page-with-multi-agent-pipe-b4bf61.md]]"
tags:
  - asknyc
  - multi-agent
  - recommendation
  - socrata
  - gemini
  - frontend
  - backend
  - sse
  - pipeline
  - feature
---

# Ask NYC: Recommendation Page with Multi-Agent Pipeline

This article details the implementation of a new text-based recommendation experience at the `/ask` endpoint within the [[askNYC]] project. It enables users to ask open-ended questions about NYC, which are then processed by a multi-agent pipeline querying Socrata datasets in parallel. The system leverages Gemini for synthesizing scored recommendation cards with data-backed reasoning.

## Key Concepts

Multi-Agent Pipeline,Socrata Datasets,Gemini (LLM for Synthesis),Server-Sent Events (SSE),Frontend Components (AgentCard, RecommendationCard, QueryInput, ProgressTimeline),Backend Orchestration (`recommend_service.py`),Geocoding,Data-Backed Reasoning

## Details

The `feat(ask): add /ask recommendation page with multi-agent pipeline` commit introduces a significant new feature to the [[askNYC]] application. The `/ask` page provides a conversational interface where users can pose open-ended questions related to New York City. Upon query submission, a multi-agent pipeline is initiated, involving 6-8 distinct data agents that query various [[Socrata Datasets]] in parallel. The execution of these agents is visibly displayed to the user, enhancing transparency.

The backend architecture for this feature includes an SSE endpoint at `POST /api/recommend` which facilitates real-time updates to the frontend. The orchestration of the recommendation process is handled by `recommend_service.py`, which manages parsing of user queries, geocoding relevant locations, dispatching parallel queries to data agents, and finally synthesizing the results.

For synthesis, the [[Gemini]] large language model is utilized to generate scored recommendation cards. These cards are designed to provide recommendations grounded in the data retrieved by the agents, complete with explicit reasoning.

The frontend implementation comprises several key components:
*   `AgentCard/Grid`: Visualizes the parallel execution and results of individual data agents.
*   `RecommendationCard`: Displays the synthesized recommendations from Gemini.
*   `QueryInput`: The interface for users to enter their NYC-related questions.
*   `ProgressTimeline`: A visual indicator of the overall progress of the recommendation pipeline.
*   `useRecommend` hook: A custom React hook that manages the interaction with the backend, including handling 4 hardcoded demo fallback sequences for development and testing purposes.

This feature was introduced in the `rahilsinghi/askNYC` repository, under SHA `d7408ec` on 2026-03-28T16:52:35Z by Rahil Singhi, involving changes across 15 files with 1898 additions and 2 deletions.

## Related

[[/ask Recommendation Page]],[[askNYC]],[[askNYC: Mobile UI Enhancements & Pipeline Fixes]],[[askNYC Backend Hardening (ad6b409)]],[[AskNYC Recommendation Page with Multi-Agent Pipeline]],[[askNYC Frontend Backend Integration (March 2026)]],[[askNYC: Model Update to Gemini 2.5 Flash]],[[askNYC: Model Update to Gemini-2.5-Flash-Native-Audio-Latest]],[[ADK Multi-Agent Backend (askNYC Project)]]
