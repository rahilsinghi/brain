---
title: Round Gate Enforcement and Session Utilities (Flock Project)
author: ai
created_at: 2026-04-12T17:42:59.514Z
last_ai_edit: 2026-04-12T17:42:59.514Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-round-gate-enforcement-and-session-utilities-6bf93f.md]]"
tags:
  - flock
  - backend
  - session management
  - game logic
  - room codes
  - input enforcement
  - server-side validation
  - typescript
  - claude opus
---

# Round Gate Enforcement and Session Utilities (Flock Project)

This commit introduces server-side round gate enforcement and session management utilities for the Flock project. It defines specific input rules for different rounds, ensures proper round advancement, and handles the generation of unique room codes for game sessions.

## Key Concepts

Round Gate Enforcement,Session Utilities,Room Code Generation,Thematic Gates,Server-Side Validation

## Details

This feature, implemented in the `rahilsinghi/Flock` repository (SHA: `721975a`), focuses on robust session management and rule enforcement. Key changes are distributed across three files:

*   `round-gate.ts`: Implements `enforceRoundInput` to apply thematic gates, `checkAllReady` to determine player readiness, and `advanceRound` to progress the game or trigger a mediator. The `enforceRoundInput` function is critical for server-side validation, preventing players from submitting incorrect input types for the current round.
*   `colors.ts`: Contains the `assignColor` function, which uses an ordered color sequence and a hexadecimal color map to assign unique colors within game sessions.
*   `room-code.ts`: Provides the `generateRoomCode` utility, creating distinct room identifiers in a `CITY-N` format (e.g., NYC-123).

**Specific Round Rules:**

*   **Round 1:** Chips only allowed as input.
*   **Round 2:** Only voice, photo, or text inputs are permitted.
*   **Round 3:** Requires exactly 'dealbreaker' and 'delight' inputs.

These rules are strictly enforced server-side to maintain game integrity. The commit was co-authored by [[Rahil Singhi]] and [[Claude Opus 4.6]].

## Related

[[Flock Project]],[[Chore: Add QR Code for Judges (Flock Project)]],[[Aishwarya Session Prompt Update – Flock Backend State Snapshot]],[[Chore: Remove @clerk/nextjs Dependency and Implement Dynamic Agent Labels]],[[Claude Code Vault Integration]]
