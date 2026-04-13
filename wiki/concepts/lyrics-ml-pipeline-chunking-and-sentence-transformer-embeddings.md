---
title: "Lyrics ML Pipeline: Chunking and Sentence-Transformer Embeddings"
author: ai
created_at: 2026-04-13T17:40:24.649Z
last_ai_edit: 2026-04-13T17:40:24.649Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-lyrics-ml-pipeline-with-chunking-and-sentence-transformer-78fa99.md]]"
tags:
  - machine learning
  - nlp
  - lyrics
  - embeddings
  - chunking
  - raag
  - python
  - data processing
  - sentence-transformers
---

# Lyrics ML Pipeline: Chunking and Sentence-Transformer Embeddings

This article details the implementation of a Machine Learning pipeline for processing song lyrics within the `raag` repository. It introduces a `LyricsChunker` for hierarchical lyric segmentation and a `LyricsEmbedder` utilizing a `sentence-transformer` model to generate 384-dimensional embeddings, supporting efficient batch encoding.

## Key Concepts

LyricsChunker,LyricsEmbedder,Sentence-Transformer Embeddings,Lyrics Chunking,Batch Encoding,MC Normalization,Genius Artifact Cleaning

## Details

A new Machine Learning pipeline has been integrated into the `raag` repository to enhance the processing and understanding of song lyrics. The pipeline comprises two primary components:

*   **LyricsChunker**: This component is responsible for segmenting song lyrics into a hierarchical structure. It performs a 3-level chunking process, allowing for granular analysis at the full song, section, and individual bar levels. Key features include MC (likely referring to 'meter and count' or similar musical structure) normalization and the removal of common artifacts found in lyrics scraped from sources like Genius.
*   **LyricsEmbedder**: Implemented as a singleton, the `LyricsEmbedder` uses the `paraphrase-multilingual-MiniLM-L12-v2` sentence-transformer model to generate dense, 384-dimensional embeddings for textual data. This allows for semantic representation of lyrics, facilitating tasks such as similarity search or clustering. The embedder is optimized to support batch encoding, enabling efficient processing of multiple lyric segments simultaneously.

This pipeline was developed and committed to the `raag` repository (SHA: `a0a08c8`) on March 4, 2026, with contributions from Rahil Singhi and Claude Opus 4.6.

## Related

[[raag]],[[Claude Opus 4.6]],[[Machine Learning Pipeline]],[[Sentence-Transformer]],[[Text Embeddings]]
