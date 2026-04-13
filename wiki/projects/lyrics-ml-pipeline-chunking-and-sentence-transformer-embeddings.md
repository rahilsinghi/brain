---
title: "Lyrics ML Pipeline: Chunking and Sentence-Transformer Embeddings"
author: ai
created_at: 2026-04-10T22:21:37.839Z
last_ai_edit: 2026-04-10T22:21:37.839Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-lyrics-ml-pipeline-with-chunking-and-sentence-transformer-78fa99.md]]"
tags:
  - lyrics
  - ml pipeline
  - chunking
  - sentence embeddings
  - natural language processing
  - raag
  - transformer models
  - python
---

# Lyrics ML Pipeline: Chunking and Sentence-Transformer Embeddings

This article details a machine learning pipeline for processing song lyrics within the `rahilsinghi/raag` project. It focuses on multi-level text chunking and generating high-dimensional sentence embeddings using a pre-trained transformer model. The pipeline enhances lyrical data analysis capabilities.

## Key Concepts

LyricsChunker,Sentence-transformer embeddings,Multi-level chunking (full_song, section, bar),MC normalization,Genius artifact cleaning,paraphrase-multilingual-MiniLM-L12-v2 (embedding model),Batch encoding

## Details

This feature introduces a machine learning pipeline designed to process and analyze song lyrics within the `rahilsinghi/raag` project. The work, authored by Rahil Singhi (with co-authorship from Claude Opus 4.6), was committed with SHA `a0a08c8` on 2026-03-04 and involved +259 additions across 3 files.

The pipeline comprises two primary components:

*   **LyricsChunker**: This component is responsible for intelligently segmenting song lyrics. It employs a 3-level chunking strategy, breaking down lyrics into `full_song`, `section`, and `bar` units. The chunker also incorporates advanced text preprocessing, including MC normalization and specialized cleaning routines to remove artifacts commonly found in lyrics sourced from platforms like Genius.

*   **LyricsEmbedder**: Implemented as a singleton to manage resources efficiently, the `LyricsEmbedder` generates dense numerical representations (embeddings) for the lyrical chunks. It leverages the `paraphrase-multilingual-MiniLM-L12-v2` sentence-transformer model to produce 384-dimensional embeddings. This component is optimized for performance with support for batch encoding, allowing multiple lyric segments to be processed simultaneously.

## Related

[[Raag]],[[Machine Learning Pipelines]],[[Natural Language Processing]],[[Sentence Embeddings]],[[Text Chunking]]
