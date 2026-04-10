---
title: "Next.js 15 Frontend: Karen Application — All Pages and Live Escalation UI"
author: ai
created_at: 2026-04-10T03:02:07.599Z
last_ai_edit: 2026-04-10T03:02:07.599Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-nextjs-15-frontend-all-6-pages-and-live-escalation-ui-efc025.md]]"
tags:
  - nextjs
  - frontend
  - react
  - sse
  - real-time
  - escalation
  - web-audio
  - hooks
  - karen
  - dashboard
  - onboarding
  - audio
---

# Next.js 15 Frontend: Karen Application — All Pages and Live Escalation UI

This commit introduces the complete Next.js 15 frontend for the Karen application, adding all six core pages and a live escalation interface powered by Server-Sent Events (SSE). The implementation includes 38 files with over 7,800 lines of new code, covering dashboards, escalation flows, onboarding, and lore. Key custom hooks handle real-time SSE communication, audio playback, and Web Audio API-based progressive distortion.

## Key Concepts

- **Live Escalation UI**: Real-time escalation view at `/escalation/[id]` driven by SSE for live updates
- **Server-Sent Events (SSE)**: Used in `useEscalation` hook with deduplication and `last_seq` reconnect logic
- **Escalation Timeline**: Visual component (`EscalationTimeline`) tracking the progression of escalation events
- **Karen Personality System**: Trigger form with personality preview, Karen lore page, and Karen sidebar component
- **Open Matters Registry**: Persistent registry of open matters accessible at `/open-matters`
- **Onboarding Flow**: Multi-step onboarding component (`OnboardingFlow`) served at `/join`
- **Web Audio Progressive Distortion**: `useBackgroundMusic` hook applies increasing audio distortion via Web Audio API
- **Autoplay Gate**: Browser autoplay policy compliance gate for audio features
- **Voice Playback Queue**: `useKarenAudio` hook manages sequential audio playback

## Details

## Overview

Commit `fdb9327` in the `rahilsinghi/karen` repository delivers the complete Next.js 15 frontend layer for the Karen application, authored by Rahil Singhi on 2026-04-04. The change introduces 38 new files totaling +7,866 lines with no deletions, representing a greenfield frontend build.

## Pages

| Route | Description |
|---|---|
| `/` | Circle dashboard — main landing view |
| `/escalation/[id]` | Live escalation view with real-time SSE updates |
| `/trigger` | Trigger form with Karen personality preview |
| `/open-matters` | Open Matters registry table |
| `/join` | Onboarding flow for new circle members |
| `/karen` | Karen lore and background page |

## Components

- **EscalationTimeline**: Visualizes the sequence and state of escalation events
- **KarenSidebar**: Persistent sidebar providing Karen context and controls
- **LevelCard**: Displays escalation level information
- **MemberCard**: Represents individual circle members
- **DeescalationSequence**: UI sequence for de-escalation steps
- **OpenMattersTable**: Tabular display of the Open Matters registry
- **OnboardingFlow**: Multi-step onboarding wizard for new members

## Hooks

### `useEscalation`
Manages SSE connection to the escalation stream. Features include:
- Event deduplication to prevent duplicate renders
- `last_seq` reconnect logic to resume from the last received sequence on reconnection

### `useCircle`
Provides circle state and member data to consuming components.

### `useKarenAudio`
Manages a voice playback queue for Karen audio clips, ensuring sequential and non-overlapping playback.

### `useBackgroundMusic`
Uses the Web Audio API to play background music with **progressive distortion** that intensifies over time or with escalation level. Paired with an **autoplay gate** to comply with browser autoplay restrictions.

## Technical Notes

- Built on **Next.js 15** with dynamic route segments (e.g., `/escalation/[id]`)
- SSE is used instead of WebSockets for unidirectional real-time data streaming
- Web Audio API integration enables programmatic audio manipulation beyond standard HTML5 audio
- Autoplay gate pattern defers audio initialization until a user gesture is detected

## Related

- [[Karen Application Overview]]
- [[Escalation System Architecture]]
- [[Server-Sent Events Integration]]
- [[Circle Dashboard]]
- [[Open Matters Registry]]
- [[Web Audio API Usage]]
- [[Onboarding Flow Design]]
- [[Rahil Singhi]]
