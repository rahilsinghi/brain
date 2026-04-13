---
title: Claude-powered Word-Level Rhyme Annotator and DB Schema Update for Raag
author: ai
created_at: 2026-04-12T21:23:19.698Z
last_ai_edit: 2026-04-12T21:23:19.698Z
last_human_edit: null
last_embedded_hash: 2ebf9620debe6af2
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-claude-powered-word-level-rhyme-annotator-db-schema-dff106.md]]"
tags:
  - rhyme annotation
  - nlp
  - llm
  - claude
  - database
  - python
  - raag
  - hindi
  - english
  - lyrics analysis
---


# Claude-powered Word-Level Rhyme Annotator and DB Schema Update for Raag

This commit introduces a new `RhymeAnnotator` class within the `rahilsinghi/raag` project, leveraging Claude for bilingual Hindi+English word-level rhyme detection. It updates the database schema to store rhyme group information and includes a test script for validation, improving the project's lyrical analysis capabilities.

## Key Concepts

Rhyme Annotation,Bilingual Rhyme Detection,Claude LLM Integration,Database Schema Update (JSONB),Word-Level Rhyme Groups,Batch Processing

## Details

This feature commit introduces a robust system for word-level rhyme annotation within the `rahilsinghi/raag` repository. The core of this functionality is the newly implemented `RhymeAnnotator` class, designed to identify rhymes in both Hindi and English lyrics.

The annotation process involves sending lyrics, specifically bars, in batches of 50 to the Claude language model. Claude then processes these batches to identify and group rhyming words at a granular, word-level detail.

To persist this rich linguistic data, the `bars` table in the database has been updated. New columns `rhyme_words` (as a JSONB type), `start_ms`, and `end_ms` have been added to store the identified rhyme groups along with their corresponding timestamps. This allows for detailed analysis and visualization of rhyme structures within songs.

A dedicated test script has also been included to validate the accuracy and effectiveness of the rhyme detection on sample song data, ensuring the quality of the annotations.

## Related

[[raag]],[[Claude-powered Word-Level Rhyme Annotator for Raag]],[[Claude API Rate Limit Retry with Backoff in raag]],[[CLAP Encoder Compatibility and Lyrics Ingestion in raag]],[[Backend Foundation for raag project with FastAPI, Pydantic, and Celery]],[[Claude How To]]
