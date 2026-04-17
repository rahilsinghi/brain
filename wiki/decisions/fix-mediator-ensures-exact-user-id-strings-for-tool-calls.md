---
title: "Fix: Mediator Ensures Exact User ID Strings for Tool Calls"
author: ai
created_at: 2026-04-10T21:43:52.716Z
last_ai_edit: 2026-04-10T21:43:52.716Z
last_human_edit: null
last_embedded_hash: 42db144cef685d9c
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-mediator-passes-exact-userid-strings-to-tools-not-displa-589b3a.md]]"
tags:
  - fix
  - mediator
  - userid
  - tool-calls
  - error
  - flock
  - commit
---


# Fix: Mediator Ensures Exact User ID Strings for Tool Calls

This commit addresses a critical bug in the Flock project where the mediator was passing user display names instead of exact user IDs to tool calls, resulting in 'Participant not found' errors. The fix explicitly instructs the underlying model to use the precise userId string for all subsequent tool interactions.

## Key Concepts

Mediator Pattern,User ID (userId string),Tool Calls,Constraint Checking,Error Handling

## Details

This commit (`b76e9c0`) for the `rahilsinghi/Flock` repository resolves an issue where the mediator component was incorrectly invoking `check_constraints` with user display names (e.g., "rahil") instead of their exact `userId` strings (e.g., "demo_rahil"). This discrepancy led to "Participant not found" errors.

The fix, implemented on 2026-03-21 by Rahil Singhi, modifies the user message to explicitly instruct the model to utilize the exact `userId` string for all tool calls. The change involved 1 file, with 6 additions and 2 deletions. This update was co-authored by Claude Opus 4.6.

## Related

[[Flock (Project)]],[[Mediator Pattern]],[[Tool Integration]],[[Error Troubleshooting]],[[User Management]]
