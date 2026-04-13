---
title: Claude-powered Word-Level Rhyme Annotator for raag
author: ai
created_at: 2026-04-13T15:35:21.069Z
last_ai_edit: 2026-04-13T15:35:21.069Z
last_human_edit: null
last_embedded_hash: 33016859e8a612b9
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-claude-powered-word-level-rhyme-annotator-db-schema-dff106.md]]"
tags:
  - rhyme detection
  - nlp
  - ai
  - claude
  - database
  - python
  - raag
  - bilingual
  - annotation
  - llm
---


# Claude-powered Word-Level Rhyme Annotator for raag

This feature introduces a `RhymeAnnotator` class to the `raag` repository, capable of detecting word-level rhymes in both Hindi and English. It leverages Claude for its advanced language processing capabilities, sending text in batches for analysis. The detected rhyme groups are then stored in the database by updating the `bars` table with new `rhyme_words` (JSONB), `start_ms`, and `end_ms` columns.

## Key Concepts

[[RhymeAnnotator]],[[Claude]],Word-level rhyme detection,Bilingual (Hindi+English) processing,[[Database Schema]] updates,Batch processing

## Details

The `RhymeAnnotator` class is a new component designed for the `raag` project, focusing on identifying word-level rhymes within song lyrics. It supports a bilingual context, handling both Hindi and English text.

The core functionality involves sending batches of up to 50 'bars' (lines of lyrics) to a [[Claude]] LLM instance. Claude then performs the word-level rhyme grouping, providing a structured output that indicates which words rhyme.

To persist this rhyme information, the existing `bars` database table is enhanced with three new columns: `rhyme_words` (a JSONB column to store the detected rhyme groups as structured data), `start_ms`, and `end_ms` (for timing information related to the bars).

A dedicated test script is included to validate the accuracy and effectiveness of the rhyme detection process against sample songs, ensuring the feature performs as expected.

## Related

[[raag]],[[Claude]],[[Database Schema]],[[Testing]]
