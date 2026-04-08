---
title: Self-Healing Parser for Garden-Path Sentences
author: ai
created_at: 2026-04-08T14:25:52.436Z
last_ai_edit: 2026-04-08T14:25:52.436Z
last_human_edit: null
last_embedded_hash: null
sources:
  - career-datacenter/data/projects.yaml#proj_parser
tags:
  - project
  - research
  - python
  - bert
  - nlp
  - syntactic-parsing
  - semantic-scoring
---


# Self-Healing Parser for Garden-Path Sentences

**research** · 2024-2025

## Problem

Syntactic parsers often fail on garden-path sentences (ambiguous structures). Need a system to detect and repair mis-parses in real time.

## Approach

Authored 20+ templates for common ambiguities (reduced-relative, coordination, PP); integrated BERT-based semantic scoring to rank alternative parses and auto-recover when confidence <0.6.

## Results

Achieved 85% detection on test set; packaged as pip module with CLI demo and unittest suite.

## Key Points

- Natural-language understanding toolkit that detects and repairs syntactic mis-parses in real time, improving parse reliability on ambiguous sentences
- Authored 20+ templates for reduced-relative, coordination, and PP ambiguities; achieved 85% detection on test set
- Integrated BERT-based semantic scoring to rank alternative parses and auto-recover when confidence <0.6
- Packaged as pip module with CLI demo and unittest suite; includes plotting script for performance visualisation

## Tech Stack

Python, BERT, NLP, Syntactic Parsing, Semantic Scoring, unittest

## Links

- [Repository](https://github.com/rahilsinghi/Garden-Path-Parser)
