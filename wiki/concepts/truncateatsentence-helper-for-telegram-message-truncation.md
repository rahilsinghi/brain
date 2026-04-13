---
title: truncateAtSentence() Helper for Telegram Message Truncation
author: ai
created_at: 2026-04-13T18:28:14.853Z
last_ai_edit: 2026-04-13T18:28:14.853Z
last_human_edit: null
last_embedded_hash: 84fafd5420949f22
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-telegram-add-truncateatsentence-helper-014e2e.md]]"
tags:
  - telegram
  - text processing
  - utility
  - python
  - brain project
  - truncation
  - sentence boundary
  - llm
  - helper function
---


# truncateAtSentence() Helper for Telegram Message Truncation

This article describes the `truncateAtSentence()` helper function, designed to truncate long synthesis answers at natural sentence boundaries. Its primary purpose is to ensure that messages comply with Telegram's 4096-character limit, falling back to a hard cut if no suitable boundary is found.

## Key Concepts

Text Truncation,Sentence Boundary Detection,Telegram Message Limits,LLM Output Processing,Python Utility Functions

## Details

The `truncateAtSentence()` helper function was introduced into the `rahilsinghi/brain` repository as part of commit `eb74594` on April 8, 2026. Authored by Rahil Singhi and co-authored by Claude Sonnet 4.6, this utility aims to intelligently shorten lengthy text, particularly synthesis answers from LLMs, before they exceed Telegram's 4096-character message constraint.

The function prioritizes truncating at common sentence-ending punctuation marks such as periods (.), exclamation marks (!), and question marks (?). This approach helps maintain the readability and coherence of the message by avoiding cuts in the middle of sentences. In scenarios where no natural sentence boundary is found before the character limit, the function defaults to a hard character-based truncation to strictly adhere to the length restriction.

This enhancement involved changes to 2 files, adding 59 lines of code without any deletions.

## Related

[[Brain Project]],[[Brain Project: Phase 5 Knowledge Compounding, Telegram Formatting, and Explorer Spec]],[[TelegramConfig Type and Defaults]],[[Add Grammy Dependency for Telegram Bot (Brain Project)]]
