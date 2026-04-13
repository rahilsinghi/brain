---
title: "Fix: Mediator Passes Exact User IDs to Tools in Flock Project"
author: ai
created_at: 2026-04-12T22:21:00.814Z
last_ai_edit: 2026-04-12T22:21:00.814Z
last_human_edit: null
last_embedded_hash: 9cc94ca8e5be5e71
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-mediator-passes-exact-userid-strings-to-tools-not-displa-589b3a.md]]"
tags:
  - fix
  - flock
  - mediator
  - tooling
  - user_id
  - bug_fix
  - commit
---


# Fix: Mediator Passes Exact User IDs to Tools in Flock Project

This commit resolves a bug in the Flock Project's mediator component where it was passing display names instead of exact user IDs to internal tools, leading to 'Participant not found' errors. The fix ensures that the mediator explicitly instructs the model to use precise `userId` strings for all tool calls, guaranteeing correct participant identification.

## Key Concepts

Mediator Pattern,User ID Management,Tool Calls,Error Handling,Flock Project

## Details

This commit (SHA: b76e9c0), authored by [[Rahil Singhi]] on 2026-03-21, addresses a critical bug within the [[Flock Project]]'s mediator component. The core issue stemmed from the mediator incorrectly using human-readable display names (e.g., "rahil") instead of the exact, internal `userId` strings (e.g., "demo_rahil") when making `check_constraints` tool calls. This discrepancy resulted in "Participant not found" errors.

The fix involves an explicit modification to the user message provided to the underlying model, instructing it to consistently use the precise `userId` string for all subsequent tool calls. This ensures accurate participant identification and prevents the previous errors. The change involved 6 additions and 2 deletions across 1 file. This work was co-authored by [[CLAUDE.md|Claude Opus 4.6 (1M context)]].

## Related

[[Flock Project]],[[Rahil Singhi]],[[CLAUDE.md]]
