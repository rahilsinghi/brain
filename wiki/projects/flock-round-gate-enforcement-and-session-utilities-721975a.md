---
title: "Flock: Round Gate Enforcement and Session Utilities (721975a)"
author: ai
created_at: 2026-04-10T17:22:33.728Z
last_ai_edit: 2026-04-10T17:22:33.728Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-round-gate-enforcement-and-session-utilities-6bf93f.md]]"
tags:
  - flock
  - backend
  - game_logic
  - session_management
  - round_gates
  - commit
  - rahil_singhi
---

# Flock: Round Gate Enforcement and Session Utilities (721975a)

This commit introduces server-side round gate enforcement and utility functions for managing sessions in the Flock application. It ensures players adhere to specific input types for each game round and provides tools for room code generation and color assignment. The update enhances game integrity and session flow.

## Key Concepts

Round Gate Enforcement (`enforceRoundInput`),Session State Management (`checkAllReady`, `advanceRound`),Thematic Round Rules (Chips, Voice/Photo/Text, Dealbreaker/Delight),Ordered Color Assignment (`assignColor`),Room Code Generation (`generateRoomCode`)

## Details

This commit (`721975a`) by Rahil Singhi (co-authored by Claude Opus 4.6) for the `rahilsinghi/Flock` repository implements critical session and game logic utilities.

**Key functionalities introduced:**

-   **`round-gate.ts`**: Contains functions central to round management:
    -   `enforceRoundInput`: Implements 'thematic gates' to ensure players provide the correct input types for the current round. This is a server-side enforcement mechanism to prevent incorrect data submission.
    -   `checkAllReady`: A utility function to determine if all participants are ready to proceed.
    -   `advanceRound`: Handles the progression of rounds, or triggers a mediator if necessary.
-   **`colors.ts`**: Includes `assignColor`, which provides an ordered sequence of colors and their corresponding hex map for assignment to players or game elements.
-   **`room-code.ts`**: Features `generateRoomCode`, responsible for creating unique room codes in a `CITY-N` format.

**Thematic Round Enforcement Details:**

Server-side enforcement ensures that players' input strictly adheres to the rules defined for each round:

-   **Round 1**: Allows 'chips only' as input.
-   **Round 2**: Restricts input to 'voice/photo/text only'.
-   **Round 3**: Requires 'exactly dealbreaker + delight' as input.

This robust server-side validation prevents players from submitting wrong input types, maintaining the integrity and intended flow of the game.

## Related

[[Flock]],[[Server-Side Enforcement]],[[Game Session Management]]
