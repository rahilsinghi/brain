---
title: "Fix: Mediator Passes Exact User IDs to Tools"
author: ai
created_at: 2026-04-10T17:40:45.871Z
last_ai_edit: 2026-04-10T17:40:45.871Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-mediator-passes-exact-userid-strings-to-tools-not-displa-589b3a.md]]"
tags:
  - fix
  - mediator
  - userid
  - tool_calls
  - error
  - flock
  - bugfix
  - model_instruction
---

# Fix: Mediator Passes Exact User IDs to Tools

This commit addresses a critical bug where the system's mediator component was incorrectly passing user display names instead of exact user IDs to tool calls, leading to 'Participant not found' errors. The fix ensures that the model is explicitly instructed to use the precise `userId` string for all tool interactions, resolving participant identification issues.

## Key Concepts

- [[Mediator Pattern]],- [[User ID]],- [[Tool Calls]],- [[Error Handling]],- [[Model Instruction]]

## Details

This fix (SHA: `b76e9c0`) for the `rahilsinghi/Flock` repository, committed on 2026-03-21 by Rahil Singhi, resolves an issue where the mediator component was failing to correctly identify participants during tool calls. Specifically, the `check_constraints` function was being invoked with a user's display name (e.g., "rahil") rather than their exact `userId` string (e.g., "demo_rahil"). This discrepancy resulted in "Participant not found" errors.

The resolution involved modifying the user message to explicitly instruct the underlying model to utilize the exact `userId` string for all subsequent tool calls. This change primarily focused on clarifying the input requirements for the model to ensure proper participant identification. The commit involved 6 additions and 2 deletions across a single file.

Co-Authored-By: Claude Opus 4.6 (1M context)

## Related

[[Flock Project]],[[User Identification in Systems]],[[Tooling Integration Best Practices]],[[Error Handling Strategies]],[[Mediator Pattern in Software Architecture]]
