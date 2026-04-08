---
title: askNYC — Git Activity
status: current
author: ai
source_type: git-commits
created_at: 2026-04-08T23:08:56.635Z
updated_at: 2026-04-08T23:08:56.635Z
tags:
  - git-activity
  - asknyc
category: projects
last_embedded_hash: 45dbc68f06e07111
---


# askNYC — Git Activity

## Summary

askNYC is a voice- and text-driven urban intelligence assistant that lets users query New York City open data through a conversational multi-agent interface. The application combines a Google ADK backend with seven NYC Open Data (Socrata) tools and a Next.js 15 frontend featuring real-time WebSocket communication, an interactive map, and audio/image input. The entire stack deploys to Google Cloud Run with automated CI/CD via Cloud Build. This project is part of [[rahil-singhi]]'s broader engineering portfolio.

---

## Key Developments

### Multi-Agent Backend Architecture
The core backend was built around Google's ADK (Agent Development Kit) framework, integrating seven NYC Open Data tools via the Socrata API. A composite `investigate_location` tool was introduced specifically to improve reliability with Gemini Live's function-calling patterns. Backend hardening work (merged from `chinmay/backend-hardening`) addressed Socrata tool return types, which were changed from lists to dicts for ADK compatibility, and increased timeouts to handle slow open-data responses. The model was updated across the project lifecycle from `gemini-live-2.5-flash-native-audio` to `gemini-2.5-flash-native-audio-latest`, and ultimately to `gemini-2.5-flash` when preview variants were retired.

### Real-Time WebSocket Frontend
The Next.js 15 dashboard communicates with the backend over WebSocket, streaming voice transcripts and agent responses in real time. Key frontend work included wiring all pages to the live backend (removing hardcoded placeholder content), implementing session state management, fixing React root unmount timing in map component cleanup, and resolving audio queuing and transcript text extraction bugs. A `/sessions` endpoint was added at the root level after it was discovered to only be accessible under the `/ws` prefix.

### Map and Visualization Layer
A cinematic map overhaul (merged from `chinmay/3d-map-dashboard-redesign`) introduced animated flyTo transitions and floating data card overlays positioned directly on the map canvas. Subsequent fixes repositioned cards as a floating panel with staggered animations, added a collapsible sidebar, and guarded the `MapCanvas` component against a missing Mapbox token to prevent hard crashes.

### Image and Voice Input
Image upload capability was added to both the splash page search input and the main dashboard's `SearchInput` component, with thumbnails displayed inline. Voice input support was developed in the `bharath/voice` branch and merged with concurrent bug fixes. A collapsible QR code bridge section was added to the dashboard to allow mobile-to-desktop session handoff for camera and voice input.

### /ask Recommendation Page
A dedicated `/ask` route was built as a multi-agent recommendation pipeline, providing 3–4 distinct, geographically varied NYC recommendations per query. The Gemini model reference on this route was updated when the preview model was removed from the API.

### Deployment and CI/CD
The backend and frontend were deployed to Google Cloud Run, with environment variable documentation updated for Vertex AI credentials. Cloud Build was configured for automatic deploys on push to `main`. A dev script and full README were added for local onboarding.

### Documentation
Architecture docs, a team task breakdown, and a data source reference were committed alongside the initial build. Task specs for individual contributors (Sariya for frontend UI, Bharath for deployment and live camera testing) were tracked as docs commits. `CLAUDE.md` served as a running architecture reference throughout development and was ultimately removed from the repository before the final state.

---

## Timeline

### March 2026

All 53 commits landed on **2026-03-28**, indicating a concentrated hackathon-style development sprint completed in a single day (or squash-merged from a short development period). The work proceeded roughly as follows:

- **Foundation:** ADK multi-agent backend scaffolded with seven NYC Open Data tools; Next.js 15 frontend created with WebSocket dashboard; README, dev script, and architecture docs added.
- **Stabilization:** WebSocket crash and Vertex AI connection bugs resolved; Socrata tool return types fixed for ADK compatibility; model string updated to `gemini-live-2.5-flash-native-audio`.
- **Feature expansion:** Composite `investigate_location` tool added; image upload pipeline built for both splash and dashboard; backend hardening PR (#1) merged.
- **Frontend wiring:** All pages connected to live backend; hardcoded content removed; splash page, settings panel, and dashboard query params made functional; sessions API response handling fixed.
- **Map overhaul:** Cinematic 3D map redesign merged (PR #7); floating data card overlays added; map flyTo and animation bugs fixed; MapCanvas Mapbox token guard added.
- **Voice and camera:** `bharath/voice` and `bharath/camera` branches merged; audio queuing, transcript extraction, and session_complete payload bugs resolved; QR code bridge section added.
- **Deployment:** Backend and frontend deployed to Cloud Run; Cloud Build CI/CD pipeline configured; all docs updated to reflect deployed state.
- **Polish:** `/ask` recommendation page shipped; Gemini model references updated to stable `gemini-2.5-flash`; build errors from PR merges resolved; `CLAUDE.md` removed from repo.
