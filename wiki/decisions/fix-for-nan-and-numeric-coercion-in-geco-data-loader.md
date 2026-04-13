---
title: Fix for NaN and Numeric Coercion in GECO Data Loader
author: ai
created_at: 2026-04-10T18:12:36.804Z
last_ai_edit: 2026-04-10T18:12:36.804Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-fix-data-handle-nan-words-and-numeric-string-coercion-cd1b39.md]]"
tags:
  - fix
  - data
  - nan
  - geco
  - pandas
  - coercion
  - bugfix
  - gazediffuse
  - data_cleaning
---

# Fix for NaN and Numeric Coercion in GECO Data Loader

This commit addresses data quality issues in the GECO corpus loader within the `gaze-diffuse` repository. It resolves problems with `NaN` words and numeric strings being incorrectly parsed as floats by pandas, ensuring proper data typing.

## Key Concepts

* `NaN` (Not a Number),* `Type Coercion`,* `GECO Corpus`,* `Data Cleaning`,* `Pandas library`

## Details

This commit, identified by SHA `7f4d82e` and authored by Rahil Singhi (co-authored by Claude Opus 4.6), implemented a fix for data parsing anomalies encountered in the GECO corpus loader within the `rahilsinghi/gaze-diffuse` repository.

Specifically, it targeted two issues:

1.  **`NaN` Words**: The GECO corpus was found to have 12 rows containing `NaN` values in the word column, which needed to be handled.
2.  **Numeric String Coercion**: Approximately 205 words that appeared numeric (e.g., "1984") were erroneously parsed as floating-point numbers by the pandas library, leading to incorrect data types.

To resolve these, the fix introduced `dropna` specifically for the word column to remove `NaN` entries and applied `astype(str)` to ensure correct string typing for both the XLSX processing and CSV reload paths. This ensures data integrity and consistency for downstream processing.

## Related

[[GECO Corpus]],[[Data Preprocessing]],[[Pandas (Software)]],[[Type Coercion]],[[Gaze-Diffuse Project]]
