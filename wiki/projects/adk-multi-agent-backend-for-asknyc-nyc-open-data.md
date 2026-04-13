---
title: ADK Multi-Agent Backend for AskNYC (NYC Open Data)
author: ai
created_at: 2026-04-11T01:25:35.671Z
last_ai_edit: 2026-04-11T01:25:35.671Z
last_human_edit: null
last_embedded_hash: 72326149468bf4ee
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-backend-adk-multi-agent-backend-with-7-nyc-open-data-t-34ffd1.md]]"
tags:
  - backend
  - multi-agent
  - asknyc
  - fastapi
  - websockets
  - gemini
  - socrata
  - nyc open data
  - geocoding
  - llm
---


# ADK Multi-Agent Backend for AskNYC (NYC Open Data)

This article describes the implementation of a multi-agent backend for the [[askNYC]] project, utilizing FastAPI and WebSockets for real-time interaction. It integrates [[Gemini Live]] sessions with five specialist sub-agents and connects to seven [[NYC Open Data]] tools via [[Socrata API]]s, enhanced by [[Google Search]] and geocoding capabilities.

## Key Concepts

ADK Multi-Agent Backend,FastAPI,WebSocket,Gemini Live,LiveRequestQueue,Specialist Sub-Agents,Socrata API,NYC Open Data,Google Search Grounding,Geocoding,Map Event Push,Large Language Model (LLM)

## Details

This significant backend feature for the [[askNYC]] project introduces a robust multi-agent architecture. The system is built on **[[FastAPI]]**, providing **[[WebSocket]]** endpoints for real-time interaction with both a dashboard and phone remote.

At its core, the system leverages **[[Gemini Live]]** sessions, orchestrated through `ADK Runner.run_live()` and a `LiveRequestQueue`, enabling dynamic and responsive AI interactions. A key component is the implementation of five specialized sub-agents covering critical urban domains: food safety, housing, safety, construction, and transit.

These agents are empowered by integrating with **seven [[Socrata API]] tools**, accessing extensive **[[NYC Open Data]]** from sources like 311, restaurant inspections, Department of Buildings (DOB), Housing Preservation and Development (HPD), NYPD incident data, eviction records, and subway information. Further enhancing its intelligence, the backend incorporates **[[Google Search grounding]]** for factual verification and **[[geocoding]]** capabilities, alongside a **[[map event push]]** mechanism for location-based services.

The primary [[Large Language Model]] driving these interactions is `gemini-3.1-flash-live-preview`.

## Related

[[askNYC]],[[ADK Multi-Agent Backend (askNYC Project)]],[[FastAPI]],[[WebSocket]],[[AskNYC Model Update: Gemini 2.5 Flash Native Audio]],[[askNYC: Model Update to Gemini-2.5-Flash-Native-Audio-Latest]],[[askNYC: Update to Gemini-Live-2.5-Flash-Native-Audio Model and Vertex AI Env Vars]],[[Backend Socrata Tool Return Type Refactor for ADK Compatibility]],[[Google Search]],[[Geocoding]],[[Large Language Model]],[[ADK Runner.run_live()]],[[LiveRequestQueue]],[[Specialist Sub-Agents]],[[Map Event Push]]
