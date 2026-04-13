---
title: Composite `investigate_location` Tool for Gemini Live
author: ai
created_at: 2026-04-10T15:09:22.976Z
last_ai_edit: 2026-04-10T15:09:22.976Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-backend-composite-investigate-location-tool-for-reliab-a62c73.md]]"
tags:
  - backend
  - gemini live
  - tooling
  - agent system
  - geocoding
  - socrata
  - asknyc
  - reliability
  - optimization
  - logging
  - api
  - composite tool
---

# Composite `investigate_location` Tool for Gemini Live

This development introduces a composite `investigate_location` tool for the `askNYC` project, designed to improve the reliability of Gemini Live by consolidating multiple actions into a single tool call. It addresses the limitation of Gemini Live's ability to reliably execute only one tool call per turn, streamlining the process of geocoding, data querying, and dashboard updates.

## Key Concepts

Gemini Live,`investigate_location` tool,Tool Calls,Multi-agent sub-delegation,Geocoding,Socrata datasets,Dashboard,API Credits,Event Logging,Agent Hierarchy Flattening

## Details

The primary motivation for this change, authored by [[Rahil Singhi]] for the [[askNYC]] project, was the observation that [[Gemini Live]] could only reliably execute a single [[Tool Calls|tool call]] per turn. To overcome this limitation and enhance the system's reliability, a new composite `investigate_location()` tool was implemented.

This `investigate_location()` tool now performs a sequence of operations in one atomic call, replacing the previous [[Multi-agent Systems|multi-agent sub-delegation]] approach:
*   **Geocoding**: It handles the process of converting location descriptions into geographic coordinates.
*   **Data Querying**: It queries relevant [[Socrata]] datasets to retrieve necessary information.
*   **Dashboard Updates**: It pushes retrieved data cards and [[Map Pins]] to the user [[Dashboard]].

Further improvements included in this change are:
*   **Flattened Agent Hierarchy**: The complex multi-agent sub-delegation system was replaced with a single root agent architecture, simplifying control flow and improving reliability.
*   **Auto-reconnect for Gemini Live**: A mechanism was added to automatically reconnect Gemini Live sessions after idle timeouts, ensuring continuous operation.
*   **Deferred Session Start**: The session start is now deferred until the first user input, which helps in saving [[API Credits]] by only initiating resources when actively needed.
*   **Comprehensive Event Logging**: Enhanced event logging was introduced to aid in debugging and monitoring system behavior, providing better insights into operations.

## Related

[[Gemini Live]],[[Tool Calls]],[[Socrata]],[[Multi-agent Systems]],[[Geocoding]],[[API Credits]],[[askNYC]],[[Dashboard]],[[Map Pins]],[[Rahil Singhi]]
