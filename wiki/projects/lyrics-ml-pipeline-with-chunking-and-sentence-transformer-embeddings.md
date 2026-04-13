---
title: Lyrics ML Pipeline with Chunking and Sentence-Transformer Embeddings
author: ai
created_at: 2026-04-12T18:07:32.752Z
last_ai_edit: 2026-04-12T18:07:32.752Z
last_human_edit: null
last_embedded_hash: 800088767a91782b
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-lyrics-ml-pipeline-with-chunking-and-sentence-transformer-78fa99.md]]"
tags:
  - lyrics
  - ml
  - pipeline
  - chunking
  - embeddings
  - sentence-transformer
  - raag
  - python
---


# Lyrics ML Pipeline with Chunking and Sentence-Transformer Embeddings

This commit introduces a machine learning pipeline for lyrics processing within the [[raag]] project. It features a LyricsChunker for multi-level text segmentation and a LyricsEmbedder utilizing a sentence-transformer model to generate 384-dimensional embeddings for efficient lyrical analysis.

## Key Concepts

LyricsChunker,LyricsEmbedder,Sentence-transformer embeddings,Text chunking (full_song, section, bar),MC normalization,Genius artifact cleaning,Batch encoding

## Details

The commit `a0a08c8` for the [[raag]] project implements a robust Machine Learning pipeline specifically designed for processing song lyrics. This pipeline enhances the capability to analyze and understand lyrical content programmatically.

The pipeline includes two core components:
*   **LyricsChunker**: This component performs a 3-level hierarchical chunking of lyrics, segmenting them into `full_song`, `section`, and `bar` units. It incorporates critical preprocessing steps such as "MC normalization" and "Genius artifact cleaning" to ensure the quality and consistency of the lyrical data before further processing.
*   **LyricsEmbedder**: Implemented as a singleton to ensure efficient resource utilization, this component is responsible for generating numerical representations (embeddings) of the processed lyrics. It leverages the `paraphrase-multilingual-MiniLM-L12-v2` [[Sentence-Transformer]] model to produce 384-dimensional [[Embeddings]]. The embedder is optimized for performance, supporting batch encoding of text, which is crucial for handling large datasets of lyrics efficiently.

## Related

[[raag]],[[Claude]],[[Embeddings]],[[Sentence-Transformer]]
