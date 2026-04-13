---
title: ADK Multi-Agent Backend for askNYC with NYC Open Data
author: ai
created_at: 2026-04-13T17:34:08.914Z
last_ai_edit: 2026-04-13T17:34:08.914Z
last_human_edit: null
last_embedded_hash: 6f08eaa6ffb55ac4
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-backend-adk-multi-agent-backend-with-7-nyc-open-data-t-34ffd1.md]]"
tags:
  - backend
  - asknyc
  - multi-agent
  - fastapi
  - websocket
  - gemini
  - adk
  - socrata
  - nyc open data
  - urban intelligence
---


# ADK Multi-Agent Backend for askNYC with NYC Open Data

This commit introduces a multi-agent backend for the [[askNYC]] project, leveraging FastAPI with WebSocket endpoints and Gemini Live. It integrates 7 NYC Open Data tools via the Socrata API, enabling specialist sub-agents for various urban intelligence queries.

## Key Concepts

[[Multi-Agent System]],[[FastAPI]],[[WebSocket]],[[Gemini Live]],[[ADK Runner]],[[NYC Open Data]],[[Socrata API]],[[Geocoding]],[[Google Search]]

## Details

This significant backend enhancement for the [[askNYC]] project, implemented in the `rahilsinghi/askNYC` repository (SHA `5d1faeb`, dated `2026-03-28T00:31:28Z` by Rahil Singhi), establishes a robust multi-agent architecture.

Key features include:
*   **FastAPI Framework**: Provides the core backend structure with WebSocket endpoints for real-time communication with dashboards and remote phone interfaces.
*   **Gemini Live Integration**: Utilizes the `gemini-3.1-flash-live-preview` model through `ADK Runner.run_live()` and a `LiveRequestQueue` for dynamic, real-time agent interactions.
*   **Specialist Sub-Agents**: Five dedicated sub-agents are implemented to handle specific urban domains:
    *   Food Safety
    *   Housing
    *   Safety
    *   Construction
    *   Transit
*   **NYC Open Data Tools**: Integration with 7 Socrata API tools provides access to critical municipal data, including:
    *   311 service requests
    *   Restaurant inspections
    *   Department of Buildings (DOB) data
    *   Housing Preservation and Development (HPD) data
    *   New York Police Department (NYPD) data
    *   Evictions records
    *   Subway data
*   **Grounding and Mapping**: Includes [[Google Search]] for general information grounding, geocoding services for location-based queries, and functionality to push map events.

## Related

[[ADK Multi-Agent Backend for AskNYC (NYC Open Data)]],[[ADK Multi-Agent Backend for askNYC with NYC Open Data]],[[ADK Multi-Agent Backend (askNYC Project)]],[[askNYC]],[[askNYC Backend Hardening (ad6b409)]],[[askNYC CLAUDE.md Update: Composite Tool Architecture and Session Persistence]],[[askNYC: Model Update to Gemini-2.5-Flash-Native-Audio-Latest]],[[askNYC Backend Fix: DOB Longitude Bounds and Session Complete Payload]]
