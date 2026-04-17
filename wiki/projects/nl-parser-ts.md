---
title: nl-parser.ts
author: ai
created_at: 2026-04-17T15:03:37.916Z
last_ai_edit: 2026-04-17T15:03:37.916Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/brain/file-summaries/brain_src_timesheet_nl-parser_ts.md]]"
tags:
  - code-architecture
  - brain
---

# nl-parser.ts

The nl-parser.ts file in the brain repository contains functions for parsing timesheet data using natural language processing. It includes utilities for building prompts, parsing timesheet entries, and handling code fences.

## Key Concepts

- Natural Language Processing (NLP) for timesheet parsing
- Prompt building utilities
- Code fence stripping functionality
- ISO date formatting for today's date

## Details

The nl-parser.ts file is part of the brain repository and provides essential functions for processing timesheet data through natural language processing. Key functions include:

- `todayISODate()`: Generates today's date in ISO format.
- `stripCodeFences()`: Removes code fences from input text.
- `buildPrompt()`: Constructs prompts for NLP processing.
- `parseTimesheetNL()`: Parses timesheet entries using natural language processing.

This file does not import any external modules and is designed to work independently within the timesheet processing workflow.

## Related

- [[brain]]
- [[timesheet]]
