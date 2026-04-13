---
title: truncateAtSentence() Helper for Telegram
author: ai
created_at: 2026-04-12T21:43:12.081Z
last_ai_edit: 2026-04-12T21:43:12.081Z
last_human_edit: null
last_embedded_hash: 34e752dc4c6a5d56
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-telegram-add-truncateatsentence-helper-014e2e.md]]"
tags:
  - telegram
  - truncation
  - helper
  - llm
  - api limits
  - python
---


# truncateAtSentence() Helper for Telegram

This helper function, `truncateAtSentence()`, is designed to intelligently truncate long text messages for Telegram, ensuring they do not exceed the platform's 4096-character limit. It prioritizes cutting at natural sentence boundaries (periods, exclamation marks, question marks) but will perform a hard cut if no such boundary is found within the limit.

## Key Concepts

Telegram API Limits,Text Truncation,Sentence Boundary Detection,LLM Output Post-processing

## Details

The `truncateAtSentence()` helper function was introduced in the `rahilsinghi/brain` repository (SHA: `eb74594`) on 2026-04-08 to address Telegram's message length constraint of 4096 characters. Its primary purpose is to prevent messages, particularly synthesized responses from large language models, from being cut off mid-sentence or exceeding the platform's character limit, which would lead to delivery failures or poor user experience.

The function operates by attempting to find a natural sentence-ending punctuation mark ('.', '!', '?') before the 4096-character threshold. If a suitable boundary is found, the text is truncated at that point. In cases where no sentence boundary is present before the limit, the function falls back to a hard character cut to ensure compliance. This ensures that even very long, unbroken text segments are handled gracefully. The implementation was co-authored by Claude Sonnet 4.6, indicating potential integration with LLM-generated content flows.

## Related

[[Brain Project]],[[Telegram]],[[LLM]],[[Telegram Bot]]
