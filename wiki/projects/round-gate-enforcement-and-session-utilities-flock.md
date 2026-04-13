---
title: Round Gate Enforcement and Session Utilities (Flock)
author: ai
created_at: 2026-04-12T21:43:20.416Z
last_ai_edit: 2026-04-12T21:43:20.416Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-round-gate-enforcement-and-session-utilities-6bf93f.md]]"
tags:
  - flock
  - game logic
  - session management
  - round management
  - server-side enforcement
  - room codes
  - color assignment
  - claude opus
---

# Round Gate Enforcement and Session Utilities (Flock)

This update introduces server-side round gate enforcement and utility functions for session management within the [[Flock Project]]. It defines specific input rules for each game round, manages room codes, and handles color assignment for participants.

## Key Concepts

**Round Gate Enforcement**: Server-side logic (`enforceRoundInput`) to ensure thematic input types per game round.,**Round Advancement**: Functions (`checkAllReady`, `advanceRound`) to manage game flow between rounds.,**Color Assignment**: Utility (`assignColor`) for orderly color distribution to participants.,**Room Code Generation**: Utility (`generateRoomCode`) for creating unique session identifiers in 'CITY-N' format.

## Details

The `round-gate.ts` file is central to enforcing game logic across different rounds. It includes `enforceRoundInput` to validate player input based on the current round's theme, `checkAllReady` to determine if all players are prepared for the next stage, and `advanceRound` to progress the game or trigger mediator actions. Specific round rules are defined:

*   **Round 1**: Only 'chips' (likely a game currency or token) are permitted as input.
*   **Round 2**: Input is restricted to 'voice', 'photo', or 'text'.
*   **Round 3**: Players must provide exactly both 'dealbreaker' and 'delight' inputs.

This server-side enforcement mechanism prevents invalid input types, maintaining game integrity. Additionally, the `colors.ts` file now includes `assignColor`, which uses an ordered sequence and a hex map for consistent color assignment. The `room-code.ts` file provides `generateRoomCode` to create unique session identifiers following a 'CITY-N' format. This commit was co-authored by [[Claude Opus]].

## Related

[[Flock Project]],[[Aishwarya Session Prompt Update – Flock Backend State Snapshot]],[[Audio Layer Implementation for Flock Project]],[[Chore: Add QR Code for Judges (Flock Project)]],[[Chore: Remove @clerk/nextjs Dependency and Dynamic Agent Labels (Flock)]],[[Claude Opus]]
