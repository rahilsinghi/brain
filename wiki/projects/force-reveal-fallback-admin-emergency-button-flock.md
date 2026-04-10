---
title: Force-Reveal Fallback & Admin Emergency Button (Flock)
author: ai
created_at: 2026-04-10T02:26:49.553Z
last_ai_edit: 2026-04-10T02:26:49.553Z
last_human_edit: null
last_embedded_hash: ac762d9349a3799c
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-force-reveal-fallback-admin-emergency-button-e68d77.md]]"
tags:
  - flock
  - force-reveal
  - fallback
  - admin
  - api
  - demo-reliability
  - trip-decision
  - mediator
  - session-management
  - lisbon
  - rahil-singhi
  - feature
---



# Force-Reveal Fallback & Admin Emergency Button (Flock)

This commit introduces a force-reveal fallback mechanism to the Flock application, ensuring demo sessions always produce a trip reveal even if the AI mediator fails or times out. A new POST endpoint pre-populates a Lisbon trip decision with personalized user cards, and an admin emergency button triggers the reveal animation on demand. This safeguards demo reliability by bypassing mediator dependencies when necessary.

## Key Concepts

- **Force-Reveal Fallback:** A safety mechanism that injects a pre-built trip decision into a session when the AI mediator fails to call `finalize_trip`
- **POST /api/session/force-reveal:** New API endpoint that writes a hardcoded Lisbon trip decision to the session and auto-generates personalized participant cards
- **Pre-built Trip Decision:** A curated Lisbon 5-day itinerary (Alfama, Mercado da Ribeira, Sintra, Comporta, LX Factory) with a real hotel photo used as demo fallback content
- **Personalized User Cards:** Auto-generated per-participant cards showing match percentage, won items, traded items, and a surprise line derived from session data
- **Admin Emergency Button:** An amber 'Force Reveal' button on the admin page, visible when session state is `negotiating` or `complete`, that triggers the pre-built reveal in one click
- **Host Page Polling:** The host page continuously polls for a `trip_decision` write to the session, then triggers the reveal animation upon detection
- **Demo Reliability:** The pattern ensures a visually complete reveal animation always fires during demos, decoupling presentation success from mediator uptime

## Details

## Overview

Commit `8996f38` to **rahilsinghi/Flock** (2026-03-21) adds a two-part fallback system to guarantee that Flock demo sessions always culminate in a trip reveal animation, regardless of whether the AI mediator successfully calls `finalize_trip`.

---

## API Endpoint: POST /api/session/force-reveal

This new endpoint performs the following steps:

1. **Injects a pre-built Lisbon trip decision** into the active session, complete with a real hotel photo.
2. **Generates personalized user cards** for each session participant, including:
   - Match percentage
   - Won items
   - Traded items
   - A surprise/delight line
3. **Writes `trip_decision` to the session store**, which the host page polls and uses to trigger the reveal animation.

### Lisbon Itinerary (5 Days)
| Day | Destination |
|-----|-------------|
| 1 | Alfama |
| 2 | Mercado da Ribeira |
| 3 | Sintra |
| 4 | Comporta |
| 5 | LX Factory |

---

## Admin Page: Force Reveal Button

- An **amber 'Force Reveal' button** is rendered on the admin page.
- The button is **conditionally visible** only when the session is in `negotiating` or `complete` state.
- One click calls `POST /api/session/force-reveal`, which writes the trip decision and causes the host page to fire the reveal animation.

---

## Motivation

The mediator (an AI agent) is responsible for calling `finalize_trip` at the conclusion of negotiation. However, due to timeouts or tool-call failures, this may not always happen during live demos. This fallback ensures:

- The demo presentation is never stranded without a reveal.
- The admin has a single, low-friction escape hatch.
- No manual database edits or code changes are needed mid-demo.

---

## Change Stats
- **Files changed:** 2
- **Additions:** +109
- **Deletions:** -4
- **Co-authored with:** Claude Opus 4.6 (1M context)

## Related

- [[Flock Application]]
- [[AI Mediator - finalize_trip Tool]]
- [[Session State Management]]
- [[Host Page Reveal Animation]]
- [[Admin Dashboard]]
- [[Trip Decision Data Model]]
- [[Demo Reliability Patterns]]
- [[Lisbon Trip Itinerary]]
