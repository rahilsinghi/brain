---
title: raag — Git Activity
status: current
author: ai
source_type: git-commits
created_at: 2026-04-08T23:10:00.202Z
updated_at: 2026-04-08T23:10:00.202Z
tags:
  - git-activity
  - raag
category: projects
last_embedded_hash: 2d2d7f5f74543322
---


# raag — Git Activity

## Summary

**raag** is a full-stack music intelligence platform focused on South Asian hip-hop, built around the discography of SM (Seedhe Maut). The platform combines audio ML, NLP, and vector search to enable semantic exploration of lyrics, rhyme schemes, and thematic content. It exposes this intelligence through an agentic chat interface, an interactive 3D universe map, and a synchronized lyric viewer with color-coded rhyme annotation.

---

## Key Developments

### Backend Foundation & Data Infrastructure
The project launched with a complete backend scaffold on March 4, including [[proj-marketpulse-ai|FastAPI]]-style service architecture, PostgreSQL models, Qdrant vector collections, and Celery for async task processing (`9da373c`, `36da824`, `4d5fdda`). A multi-source data ingestion pipeline pulls from Genius (lyrics), YouTube (audio), and LRCLIB (timing data), with discography seeding and smart download scripts added shortly after (`dfd3f36`, `486d124`).

### Audio & Lyrics ML Pipelines
Two parallel ML pipelines were built: one for audio using CLAP embeddings and librosa feature extraction, and one for lyrics using sentence-transformer embeddings with chunking (`4c1f836`, `a0a08c8`). An NLP pipeline handles topic classification, named entity extraction, and bar-level annotation (`84dc0c2`). A Claude-powered word-level rhyme annotator was added later with its own DB schema (`10f5be8`).

### Agentic Chat & MCP Server
An MCP (Model Context Protocol) server exposes search tools and powers an agentic chat API (`9c7cd77`). Chat was later upgraded to full streaming via SSE (`5813edc`, `ae9ec14`), with persistent conversation history, a sidebar UI, and JWT-authenticated sessions (`ae8eed5`, `f334d97`). Chat output was progressively enriched with distinct card types per tool, bar chunk display, and universe deep-linking (`609077a`, `2673597`).

### Interactive Universe Map
A graph data API and interactive 3D Universe Map were built at `/universe`, visualizing relationships between songs, albums, artists, and themes (`616db32`, `df63e54`). The map was later enhanced with a starfield background, auto-rotation, hover cards, an animated side panel with navigation history, and deep-link buttons from song cards (`d231edb`, `08e5d88`, `52dc23b`).

### Spotify Integration & Playback
Full Spotify OAuth, track matching, and the Spotify Web Playback SDK were integrated to enable in-app audio playback (`d977528`, `436129a`). The mini player became event-driven and accessible (`a91a008`), then gained a draggable bubble UI (`2b5f9e9`). A bug preventing player re-creation on token refresh was patched in mid-March (`c591332`).

### RhymeSheet & Lyric Timing
A lyric timing system synced via LRCLIB was combined with the rhyme annotator to produce the RhymeSheet — a color-coded lyric panel supporting both synced (time-locked) and static modes (`7618ef9`, `0a01cdf`). RhymeSheet was wired into the player, song cards, and the ingestion pipeline (`f900bf2`).

### Song Deep Dive
A full-page lyric explorer at `/song/[id]` was built as a dedicated deep dive experience (`cca23b0`). It received a visual overhaul with a hero background, animated stats panels, and smooth bar expansion (`b09d238`).

### UI, Branding & Polish
The frontend used Next.js with shadcn/ui and Zustand from the start (`2e6c13f`). SM brand assets and a red/white/black glassmorphism theme were applied across the interface (`639d681`, `1eeaec7`). Multiple polish passes added a preloader, mouse glow, mobile responsiveness, Hindi/romanized lyric toggling, Framer Motion animations, page transitions, a unified `AppHeader`, and glass skeleton loaders (`53269df`, `746b05e`, `8788161`, `087a04d`, `ac53f04`).

### Discography Browse
A dedicated discography browse page was added with album detail views, topic listings, and entity reference panels (`def26a1`).

---

## Timeline

### March 4, 2026
The most intensive single day of development. The entire project was scaffolded and built out in one session: backend (FastAPI, Celery, PostgreSQL, Qdrant), data ingestion (Genius, YouTube, LRCLIB), ML pipelines (CLAP audio embeddings, sentence-transformer lyrics embeddings), NLP pipeline, MCP server, Next.js frontend, chat UI, SM branding, Spotify integration, RhymeSheet, and the 3D Universe Map — 32 commits total. This reflects the kind of rapid, AI-assisted full-stack build documented across [[rahil-singhi|Rahil's builder profile]] and related [[decision-framework-what-to-build-first-for-job-search-automation|project decision frameworks]].

### March 6, 2026
Six commits refining the user experience: streaming chat (SSE client and server), a draggable Spotify mini player bubble, Universe side panel with navigation history, chat grid layout improvements, and frontend HTTPS/Turbopack configuration cleanup.

### March 7, 2026
User authentication (JWT login/register with frontend auth store), persistent chat history with conversation sidebar, Song Deep Dive page at `/song/[id]`, and project documentation (`CLAUDE.md` and session briefing). An `everything-claude-code` submodule was added.

### March 15, 2026
A visual polish sprint: page transitions, unified `AppHeader`, glass skeleton loaders, waveform typing indicator, animated chat messages via Framer Motion, Song Deep Dive hero overhaul, animated Universe starfield and side panel, animated login modal and chat sidebar transitions, and a Spotify token-refresh bug fix.

### March 16, 2026
Final recorded commit: discography browse page with album detail, topic display, and entity reference integration.
