---
title: "fix(backend): resolve WebSocket crash and Vertex AI connection – askNYC commit 01aae64"
author: ai
created_at: 2026-04-10T02:11:20.195Z
last_ai_edit: 2026-04-10T02:11:20.195Z
last_human_edit: null
last_embedded_hash: 16af2d8ab2914148
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-resolve-websocket-crash-and-vertex-ai-connectio-ed1456.md]]"
tags:
  - backend
  - bugfix
  - websocket
  - vertex-ai
  - gemini
  - adk
  - asknyc
  - python
  - session-management
  - api-key
  - real-time-audio
---


# fix(backend): resolve WebSocket crash and Vertex AI connection – askNYC commit 01aae64

This commit by Rahil Singhi to the rahilsinghi/askNYC repository addresses a series of backend stability issues including a WebSocket crash caused by a missing Request parameter, Vertex AI session management failures, and API key compatibility problems with the ADK framework. Four files were modified with 11 additions and 5 deletions. The changes collectively stabilize the real-time audio session pipeline using Gemini Live on Vertex AI.

## Key Concepts

- **WebSocket crash fix**: `dashboard_ws()` was missing a required `Request` parameter; resolved by switching to a module-level session service
- **API key aliasing**: `GOOGLE_GEMINI_API_KEY` is now aliased to `GOOGLE_API_KEY` to satisfy ADK compatibility requirements
- **SessionState schema update**: Added `ended_at` field to properly track session termination timestamps
- **ADK session pre-creation**: A session is now pre-created before calling `run_live()` to prevent 'session not found' runtime errors
- **Model switch**: Updated model to `gemini-live-2.5-flash-native-audio`, which is available on the Vertex AI platform

## Details

## Overview

**Commit SHA:** `01aae64`  
**Repository:** `rahilsinghi/askNYC`  
**Date:** 2026-03-28  
**Author:** Rahil Singhi  
**Diff stats:** +11 / -5 across 4 files

---

## Changes Breakdown

### 1. WebSocket Request Parameter Fix
The `dashboard_ws()` handler was crashing due to a missing `Request` parameter in its signature. The fix refactors the function to rely on a module-level session service instead, removing the dependency on passing the request object directly and improving handler stability.

### 2. API Key Aliasing for ADK Compatibility
The Google ADK (Agent Development Kit) expects the API key under the environment variable name `GOOGLE_API_KEY`, while the application was setting `GOOGLE_GEMINI_API_KEY`. An alias was introduced so that both names resolve to the same value, ensuring seamless ADK integration without breaking existing configurations.

### 3. SessionState Schema: `ended_at` Field
A new `ended_at` timestamp field was added to the `SessionState` schema. This allows the system to properly record when a session ends, supporting better lifecycle tracking and auditability of live audio sessions.

### 4. Pre-creation of ADK Session Before `run_live()`
The ADK's `run_live()` method was throwing a 'session not found' error because the session object did not exist at invocation time. The fix ensures the ADK session is explicitly created before `run_live()` is called, resolving the race condition or initialization gap.

### 5. Model Update to `gemini-live-2.5-flash-native-audio`
The previously configured Gemini model was not available on the Vertex AI backend. The model identifier was updated to `gemini-live-2.5-flash-native-audio`, which is confirmed available on Vertex AI and supports native audio streaming.

---

## Impact
These fixes collectively resolve a broken real-time audio session pipeline in the askNYC backend, restoring WebSocket connectivity, proper Vertex AI authentication, and stable ADK session lifecycle management.

## Related

- [[askNYC Project]]
- [[Rahil Singhi]]
- [[Google ADK (Agent Development Kit)]]
- [[Vertex AI Integration]]
- [[Gemini Live API]]
- [[WebSocket Backend Architecture]]
- [[SessionState Schema]]
- [[Environment Variable Configuration]]
