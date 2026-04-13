---
title: "Coro: Drop Votes Fix and Server-Sourced Countdown (Commit ee546c2)"
author: ai
created_at: 2026-04-13T17:40:46.874Z
last_ai_edit: 2026-04-13T17:40:46.874Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-merge-pull-request-17-from-rahilsinghi-fix-drop-connection-id-d04a01.md]]"
tags:
  - coro
  - fix
  - voting
  - backend
  - connection_id
  - countdown
  - serverside
  - commit
---

# Coro: Drop Votes Fix and Server-Sourced Countdown (Commit ee546c2)

This commit to the Coro repository introduces a fix for how 'drop votes' are keyed, now utilizing `connection_id` for improved accuracy. It also implements a server-sourced countdown mechanism, enhancing the reliability of the voting system within the [[Coro Backend]].

## Key Concepts

Drop Votes,Connection ID,Server-Sourced Countdown,Coro Backend,Commit Management

## Details

This update (SHA: `ee546c2`), pushed to the `rahilsinghi/Coro` repository on February 28, 2026, by [[Rahil Singhi]], addresses key improvements in the application's voting functionality.

The primary fix ensures that 'drop votes' are now accurately keyed based on the `connection_id`. This change is crucial for maintaining proper state and preventing cross-connection interference in voting, making the system more robust and reliable for individual users or sessions.

Additionally, the commit introduces a 'server-sourced countdown' mechanism. This means that the countdown timer, likely related to voting or other time-sensitive actions, is now managed and synchronized by the server. Moving the countdown logic to the server improves its accuracy and consistency across all clients, reducing the potential for client-side manipulation or discrepancies.

The changes involved modifications across 4 files, with an addition of 158 lines of code and deletion of 66 lines.

## Related

[[Coro Backend]],[[Rahil Singhi]],[[Drop Votes]],[[Connection ID]],[[Server-Sourced Countdown]]
