---
title: "GECO Loader Fix: Handling NaN Words and Numeric String Coercion"
author: ai
created_at: 2026-04-13T17:19:36.641Z
last_ai_edit: 2026-04-13T17:19:36.641Z
last_human_edit: null
last_embedded_hash: 72cb36aed01204c8
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-fix-data-handle-nan-words-and-numeric-string-coercion-cd1b39.md]]"
tags:
  - fix
  - data
  - geco
  - loader
  - nan
  - numeric
  - string coercion
  - pandas
  - gaze-diffuse
  - data quality
---


# GECO Loader Fix: Handling NaN Words and Numeric String Coercion

This article details a data loading fix for the GECO corpus within the Gaze-Diffuse project. The update addresses issues where NaN values appeared in the 'word' column and numeric-looking strings were incorrectly parsed as floats by pandas, leading to data inconsistencies.

The solution involves implementing `dropna` for the word column and coercing relevant data to string type during both XLSX processing and CSV reloading, ensuring data integrity for subsequent analysis.

## Key Concepts

GECO Corpus,Data loading,NaN values,Numeric string coercion,Pandas data manipulation,XLSX processing,CSV data reloading

## Details

A critical data integrity fix was applied to the GECO (Gaze-contingent Eye-tracking Corpus) loader, which is part of the [[Gaze-Diffuse]] project. The primary issue stemmed from how the corpus data, particularly the 'word' column, was being processed.

Specifically, the following problems were identified:
*   **NaN Words**: Twelve rows within the GECO corpus were found to contain `NaN` (Not a Number) values in the 'word' column, indicating missing or unparseable text data.
*   **Numeric String Coercion**: Approximately 205 words that appeared numeric (e.g., "1984") were incorrectly parsed as floating-point numbers by the pandas library, rather than as strings. This type coercion could lead to errors in text-based analyses.

The implemented fix, identified by commit `7f4d82e` in the `rahilsinghi/gaze-diffuse` repository, addresses these issues by:
1.  Adding a `dropna` operation specifically for the 'word' column, which removes rows where the word value is `NaN`.
2.  Applying `astype(str)` during both the XLSX processing and CSV reload paths. This explicit type conversion ensures that numeric-looking words are correctly treated and stored as strings, preventing unintended float conversions.

This change significantly improves the reliability and accuracy of the GECO data used within the [[Gaze-Diffuse]] project.

**Commit Details:**
*   **Repo:** `rahilsinghi/gaze-diffuse`
*   **SHA:** `7f4d82e`
*   **Date:** 2026-03-27T16:09:10Z
*   **Author:** [[Rahil Singhi]]
*   **Co-Authored-By:** [[Claude Opus 4.6]]

## Related

[[Gaze-Diffuse]],[[GECO Corpus]],[[Rahil Singhi]],[[Claude Opus]],[[Large Language Models]]
