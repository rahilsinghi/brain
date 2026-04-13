---
title: truncateAtSentence() Helper Function
author: ai
created_at: 2026-04-10T21:22:54.349Z
last_ai_edit: 2026-04-10T21:22:54.349Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-telegram-add-truncateatsentence-helper-014e2e.md]]"
tags:
  - telegram
  - truncation
  - helper-function
  - text-processing
  - commit
  - ai-assisted
  - javascript
---

# truncateAtSentence() Helper Function

This commit introduces a `truncateAtSentence()` helper function to intelligently truncate long text responses before they exceed Telegram's 4096-character message limit. It prioritizes cutting at natural sentence boundaries ('.', '!', '?'), falling back to a hard character limit if no such boundary is found.

## Key Concepts

Text Truncation,Sentence Boundary Detection,Telegram Message Limit,Helper Function

## Details

This commit introduces the `truncateAtSentence()` helper function within the `rahilsinghi/brain` repository. The primary goal of this function is to ensure that long textual outputs, particularly synthesis answers, fit within Telegram's strict 4096-character message length constraint.

The function works by attempting to find the last sentence boundary (indicated by periods, exclamation marks, or question marks) that occurs before the Telegram character limit. This allows for more natural and readable truncation of messages. If no suitable sentence boundary is found within the allowed character range, the function will perform a hard cut at the character limit.

### Commit Information
*   **Repository:** `rahilsinghi/brain`
*   **SHA:** `eb74594`
*   **Date:** `2026-04-08T18:31:39Z`
*   **Author:** Rahil Singhi
*   **Co-Authored-By:** Claude Sonnet 4.6
*   **Files Changed:** 2
*   **Additions:** 59 lines
*   **Deletions:** 0 lines

## Related

[[Telegram API]],[[Text Truncation Techniques]],[[Claude Sonnet 4.6]],[[rahilsinghi/brain repository]]
