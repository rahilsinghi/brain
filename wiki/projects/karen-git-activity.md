---
title: karen — Git Activity
status: current
author: ai
source_type: git-commits
created_at: 2026-04-08T23:08:31.282Z
updated_at: 2026-04-08T23:08:31.282Z
tags:
  - git-activity
  - karen
category: projects
last_embedded_hash: 7a3f264544e512ed
---


# karen — Git Activity

## Summary

`rahilsinghi/karen` is a humorous escalation-engine web application that automates increasingly aggressive complaint campaigns against businesses or individuals across multiple communication channels. Built in a single intensive sprint, the system combines a FastAPI backend, Next.js 15 frontend, and an AI "Karen" personality that escalates through a configurable ladder of channels — from Slack messages to voice calls to physical FedEx letters — while tracking satisfaction scores and narrating the chaos with ElevenLabs text-to-speech audio. See [[rahil-singhi]] for broader context on the builder.

---

## Key Developments

### Project Scaffold & Core Architecture
The project was stood up from scratch with Docker configuration, a FastAPI backend, and Pydantic models defining the domain. An OpenClaw agent configuration was added early to power the AI decision-making layer. The backend was containerized and structured for both local and cloud deployment from day one.

### Escalation Ladder (v1 → v2)
The central feature is the "escalation ladder" — a sequenced, multi-channel pressure campaign. The initial implementation was followed rapidly by a v2 redesign based on user feedback, which rewrote the channel order, added Slack, email CC, and calendar integrations, removed LinkedIn and Twitter steps, and introduced machine detection on voice calls. De-escalation logic (Slack/Calendar deletion) was added symmetrically. This connects thematically to the automation and agentic tooling interests visible in [[proj-marketpulse-ai]] and [[mechanize-rl-environment-company-for-frontier-ai-labs]].

### Channel Integrations & Services
A suite of backend services was built to power the ladder: Slack messaging, Google Calendar invite creation, FedEx rate/shipping API for physical letters (with QR codes embedded in PDFs), and a research cache service for pre-checking targets before escalating. This mirrors the multi-integration architecture seen in [[proj-imessage-scheduler]] and [[proj-parser]].

### Personality & AI Layer
A personality service drives tone and language across channels, with channel-specific rules and level-aware context injected into prompts. A runtime LLM provider toggle allows switching between Anthropic API (cloud) and local Ollama, reflecting the same cost/latency tradeoff thinking present in [[decision-framework-what-to-build-first-for-job-search-automation]].

### Audio Integration
ElevenLabs TTS was integrated for spoken quips and commentary, with background music, level-aware ad-libs, and synchronized commentary timing. A shared audio context was established to prevent overlapping playback across components.

### Frontend (Next.js 15)
All six frontend pages were built in a single commit block, including a live escalation UI with SSE streaming, a satisfaction score display, a research animation component, a LevelTimeline for game mode, and a CommentaryLog for standard view. The EventSource API was later replaced with a fetch-based SSE implementation for ngrok compatibility during development.

### Game Mode & UI Polish
A `PixelArenaGame` component and `TransmissionFeed` were merged from a collaborator's PR, adding a gamified view of escalation progress. Additional polish passes fixed visual contrast, personality button affordance, level completion animations, a vibration animation on the "unleash" modal, and scrollable panels. Level 10 skip and de-escalation display bugs were resolved late in the sprint.

### Deployment & Infrastructure
CORS origins were updated to include the Vercel production URL, ngrok browser-warning headers were added to all API calls, and build errors for Next.js 16 compatibility were resolved for the Vercel deploy. A `pretext` submodule was added, suggesting shared tooling with other projects in the ecosystem.

### Documentation
Multiple documentation commits captured the architecture, design specs, escalation ladder rationale, and a comprehensive README. Team member details were stripped from the README the following day, suggesting a public release cleanup.

---

## Timeline

### April 2026

**April 4, 2026** — The entire project was conceived, scaffolded, built, iterated, and polished in a single day. The commit sequence tells the story clearly:

- **Morning:** Project scaffold, Docker config, spec document, OpenClaw agent config, FastAPI backend, Pydantic models, circle members CRUD, channel integrations, and personality service.
- **Midday:** Escalation ladder v1, SSE streaming, payment webhooks, ElevenLabs audio integration, and the full six-page Next.js frontend. The first PR (`#1`) was merged.
- **Afternoon:** Escalation ladder v2 design spec and implementation — new channel types, Slack/Calendar/FedEx services, rewritten ladder logic, de-escalation, and frontend type updates. Research animation and LLM provider toggle added.
- **Evening:** Satisfaction score display, FedEx rate UI, runtime provider toggle, calendar service fixes, Vercel build fixes, CORS and ngrok header patches. PRs `#2` through `#5` merged in sequence, adding PixelArenaGame, TransmissionFeed, unleash modal polish, and vibration animation.
- **Late night:** Audio sync fixes, level derivation from SSE events, level 10 bug fix, de-escalation UI corrections, scrollable panels, and a comprehensive README.

**April 5, 2026** — README updated to remove team member details ahead of public visibility.
