---
title: /ask Recommendation Page
author: ai
created_at: 2026-04-10T15:05:20.734Z
last_ai_edit: 2026-04-10T15:05:20.734Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-ask-add-ask-recommendation-page-with-multi-agent-pipe-b4bf61.md]]"
tags:
  - recommendation
  - multi-agent
  - pipeline
  - nyc
  - socrata
  - gemini
  - backend
  - frontend
  - sse
  - asknyc
  - feature
  - commit
---

# /ask Recommendation Page

This commit introduces a new text-based recommendation experience at the `/ask` endpoint within the askNYC project. It leverages a multi-agent pipeline where 6-8 data agents run in parallel to query Socrata datasets. Gemini then synthesizes the results into scored recommendation cards with data-backed reasoning.

## Key Concepts

- Multi-Agent Pipeline,- Text-Based Recommendation,- Socrata Data Integration,- Gemini AI Synthesis,- Server-Sent Events (SSE),- Parallel Processing,- Recommendation Cards

## Details

The `/ask` feature provides users with a new way to get recommendations for NYC-related questions. Users can submit open-ended text questions, which initiate a complex multi-agent pipeline.

### Pipeline Overview

1.  **User Query**: An open-ended question about NYC is submitted.
2.  **Agent Execution**: 6-8 dedicated data agents are activated, running visibly in parallel. These agents are responsible for querying various Socrata datasets relevant to the user's input.
3.  **Synthesis**: The results from the data agents are then fed into the Gemini AI model, which synthesizes the information into scored recommendation cards. Each card includes data-backed reasoning to justify the recommendation.

### Technical Implementation

**Backend:**
-   An SSE (Server-Sent Events) endpoint, `POST /api/recommend`, handles incoming recommendation requests.
-   The `recommend_service.py` module orchestrates the entire recommendation flow, including:
    -   Parsing user input.
    -   Geocoding relevant locations.
    -   Managing the parallel execution of data queries.
    -   Coordinating the synthesis process with Gemini.

**Frontend:**
-   **`AgentCard/Grid`**: Components for visualizing the parallel execution and status of individual data agents.
-   **`RecommendationCard`**: Displays the synthesized recommendation results, including scores and reasoning.
-   **`QueryInput`**: The user interface element for submitting questions.
-   **`ProgressTimeline`**: Provides a visual timeline of the recommendation generation process.
-   **`useRecommend` Hook**: A custom React hook that manages the recommendation state and interaction, including 4 hardcoded demo fallback sequences for development and testing.

## Related

[[Rahil Singhi]],[[askNYC]],[[Socrata]],[[Gemini AI]],[[Multi-Agent Systems]],[[Server-Sent Events (SSE)]],[[Recommendation Systems]]
