---
title: ADK Multi-Agent Backend (askNYC Project)
author: ai
created_at: 2026-04-10T15:16:05.019Z
last_ai_edit: 2026-04-10T15:16:05.019Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-backend-adk-multi-agent-backend-with-7-nyc-open-data-t-34ffd1.md]]"
tags:
  - backend
  - multi-agent
  - adk
  - nyc open data
  - fastapi
  - gemini
  - ai
  - socrata
  - asknyc
  - websockets
  - geocoding
  - open data
  - project feature
---

# ADK Multi-Agent Backend (askNYC Project)

This commit introduces a sophisticated multi-agent backend for the `askNYC` project, leveraging the Agent Development Kit (ADK) and Gemini Live. It integrates with 7 NYC Open Data Socrata APIs through 5 specialist sub-agents, providing real-time information on critical city services and urban planning.

## Key Concepts

ADK (Agent Development Kit),Multi-agent System,NYC Open Data,FastAPI,WebSockets,Gemini Live,Socrata API,Geocoding,Google Search Grounding,Specialist Agents

## Details

This significant backend feature for the `askNYC` project, committed on 2026-03-28 by Rahil Singhi (SHA: `5d1faeb`), introduces a robust multi-agent architecture built with the Agent Development Kit (ADK).

**Core Technology & Implementation:**
*   Utilizes `gemini-3.1-flash-live-preview` as its core large language model.
*   Integrated via `ADK Runner.run_live()` and `LiveRequestQueue` for managing live agent sessions.
*   Built on **FastAPI** with **WebSocket endpoints**, enabling real-time communication for dashboard interfaces and phone remote control.

**Agent Architecture & Data Sources:**
*   Comprises 5 specialist sub-agents, each focused on a critical NYC domain:
    *   Food Safety
    *   Housing
    *   Safety (general)
    *   Construction
    *   Transit
*   Integrates with 7 different **NYC Open Data Socrata APIs**, providing a comprehensive data source for the agents. These include data from:
    *   311
    *   Restaurants
    *   Department of Buildings (DOB)
    *   Housing Preservation and Development (HPD)
    *   NYPD
    *   Evictions
    *   Subway systems

**Enhanced Capabilities:**
*   **Google Search grounding** for broader context and up-to-date information.
*   **Geocoding** functionalities for location-based data processing.
*   Supports **map event push** for visualizing location-based data and agent interactions.

This commit involved substantial development, adding 1602 lines of code across 15 files.

## Related

[[Rahil Singhi]],[[askNYC Project]],[[FastAPI]],[[Gemini Live]],[[Socrata API]],[[Multi-Agent Systems]],[[NYC Open Data]],[[Agent Development Kit (ADK)]]
