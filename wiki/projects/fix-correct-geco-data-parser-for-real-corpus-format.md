---
title: "Fix: Correct GECO Data Parser for Real Corpus Format"
author: ai
created_at: 2026-04-10T02:09:19.443Z
last_ai_edit: 2026-04-10T02:09:19.443Z
last_human_edit: null
last_embedded_hash: dcb0bf46755bd2a7
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-fix-correct-geco-data-parser-for-real-corpus-format-da67ea.md]]"
tags:
  - geco
  - eye-tracking
  - data-parsing
  - bug-fix
  - pandas
  - corpus
  - gaze-diffuse
  - nlp
  - reading-research
  - python
---


# Fix: Correct GECO Data Parser for Real Corpus Format

A bug fix commit (SHA: 9a0d81a) to the `rahilsinghi/gaze-diffuse` repository correcting the GECO data parser to properly handle the real corpus format. The fix addresses incorrect WORD_ID parsing, sentence ID computation, sentinel value handling, and row filtering for malformed entries. This change ensures compatibility with the actual GECO dataset structure rather than a previously assumed format.

## Key Concepts

- **WORD_ID Format:** The correct format is `PART-TRIAL-WORDPOS` (e.g., `"1-5-3"`), not the previously assumed `"w1.1"` format
- **Composite Sentence Key:** `sentence_id` is computed as `PART * 10000 + TRIAL` to create a unique composite key
- **Sentinel Value Handling:** Fixation columns may contain `"."` as a sentinel value, requiring `pd.to_numeric` with error coercion for proper parsing
- **Row Filtering:** Rows where `WORD_ID` does not match the expected regex pattern are filtered out to remove malformed or invalid entries
- **GECO Corpus:** A standardized eye-tracking dataset used in reading research, requiring strict format adherence for downstream analysis

## Details

## Overview

This commit fixes a data parser in the `gaze-diffuse` project that was incorrectly handling the GECO (Ghent Eye-tracking Corpus) dataset format. The parser previously assumed an incorrect structure for word identifiers and sentence groupings.

## Changes Made

### File Changes
- **Files changed:** 1
- **Additions:** +13 lines
- **Deletions:** -3 lines

### WORD_ID Format Correction
The parser previously expected WORD_ID values in the format `"w1.1"`. The real GECO corpus uses a three-part format: `PART-TRIAL-WORDPOS`, for example `"1-5-3"`. The parser has been updated to match and extract this structure using an appropriate regex pattern.

### Sentence ID Computation
Sentence identifiers are no longer derived from a simple field. Instead, a composite key is computed as:

```
sentence_id = PART * 10000 + TRIAL
```

This ensures unique sentence groupings across participants and trials.

### Sentinel Value Handling
Fixation-related columns in the GECO corpus may contain `"."` as a placeholder or missing-data sentinel. These values are now handled by applying `pd.to_numeric(..., errors='coerce')`, converting non-numeric sentinels to `NaN` for safe downstream processing.

### Row Filtering
Rows where the `WORD_ID` field does not conform to the expected `PART-TRIAL-WORDPOS` regex pattern are now filtered out. This guards against malformed or header-repeat rows that may appear in raw corpus exports.

## Metadata

| Field | Value |
|---|---|
| Repository | rahilsinghi/gaze-diffuse |
| Commit SHA | 9a0d81a |
| Date | 2026-03-15 |
| Author | Rahil Singhi |

## Related

- [[GECO Eye-Tracking Corpus]]
- [[Gaze Diffuse Project]]
- [[Eye-Tracking Data Processing]]
- [[Pandas Data Cleaning Techniques]]
- [[Composite Key Design in Data Pipelines]]
- [[Sentinel Value Handling in Tabular Data]]
- [[Reading Research Datasets]]
