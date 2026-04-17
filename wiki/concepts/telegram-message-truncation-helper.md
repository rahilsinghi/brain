---
title: Telegram Message Truncation Helper
author: ai
created_at: 2026-04-10T17:22:27.769Z
last_ai_edit: 2026-04-10T17:22:27.769Z
last_human_edit: null
last_embedded_hash: b4430270e958d3be
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-telegram-add-truncateatsentence-helper-014e2e.md]]"
tags:
  - telegram
  - truncation
  - helper
  - api
  - character-limit
  - sentence-boundary
  - rahilsinghi/brain
  - code
  - feature
---


# Telegram Message Truncation Helper

Introduces a `truncateAtSentence()` helper function to prevent Telegram messages from exceeding the 4096-character limit. This utility intelligently truncates text at sentence boundaries, falling back to a hard cut if no suitable boundary is found.

## Key Concepts

- [[truncateAtSentence()]],- Telegram API character limit,- Sentence boundary detection,- Text truncation

## Details

A new helper function, `truncateAtSentence()`, has been added to the `rahilsinghi/brain` repository. This function is designed to handle long text outputs, specifically for messages intended for Telegram, which has a strict 4096-character message limit.

The primary goal of `truncateAtSentence()` is to provide a more user-friendly truncation method by attempting to cut text at natural sentence boundaries (indicated by periods, exclamation marks, or question marks). If no such boundary can be found within the character limit, the function gracefully falls back to a hard cut to ensure the message still conforms to the size constraint.

This feature was implemented on 2026-04-08 by Rahil Singhi, with contributions from Claude Sonnet 4.6, and involved 59 additions across 2 changed files within the project.

## Related

[[Telegram API]],[[Text Truncation]],[[rahilsinghi/brain]],[[Claude Sonnet 4.6]]
