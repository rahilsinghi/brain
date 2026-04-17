---
title: "feat(telegram): add truncateAtSentence() helper"
author: ai
created_at: 2026-04-11T00:30:01.462Z
last_ai_edit: 2026-04-11T00:30:01.462Z
last_human_edit: null
last_embedded_hash: 4df377533eabe746
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-telegram-add-truncateatsentence-helper-014e2e.md]]"
tags:
  - telegram
  - truncation
  - text processing
  - helper function
  - rahilsinghi/brain
  - claude
  - commit
---


# feat(telegram): add truncateAtSentence() helper

This feature introduces a `truncateAtSentence()` helper function to the `rahilsinghi/brain` repository. Its primary purpose is to truncate long synthesis answers at natural sentence boundaries, ensuring messages adhere to Telegram's 4096-character limit. If no sentence boundary is found within the limit, it gracefully falls back to a hard character cut.

## Key Concepts

Text Truncation,Sentence Boundary Detection,Telegram Message Limits,Helper Functions

## Details

The `truncateAtSentence()` helper function was added to the `rahilsinghi/brain` repository on April 8, 2026, by Rahil Singhi (SHA: eb74594). This change involved modifications to 2 files, adding 59 lines of code. The function is designed to prevent messages from exceeding Telegram's 4096-character limit by intelligently truncating text at the nearest sentence-ending punctuation (. ! ?). A fallback mechanism ensures that if no sentence boundary is found before the character limit, the text is hard-truncated. This commit was co-authored by Claude Sonnet 4.6.

## Related

[[rahilsinghi/brain]],[[CLAUDE.md Telegram Bot Documentation Update (rahilsinghi/brain)]],[[CLAUDE.md Update: Telegram Bot Documentation]],[[CLAUDE.md Telegram Bot Documentation Update]]
