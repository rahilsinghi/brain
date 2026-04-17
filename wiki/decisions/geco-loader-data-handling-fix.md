---
title: GECO Loader Data Handling Fix
author: ai
created_at: 2026-04-10T22:12:22.070Z
last_ai_edit: 2026-04-10T22:12:22.070Z
last_human_edit: null
last_embedded_hash: ce7a504882b0f6eb
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-fix-data-handle-nan-words-and-numeric-string-coercion-cd1b39.md]]"
tags:
  - data cleaning
  - bug fix
  - python
  - pandas
  - geco corpus
  - data loading
  - type coercion
  - nan
---


# GECO Loader Data Handling Fix

This commit addresses critical data handling issues within the GECO corpus loader, specifically targeting NaN (Not a Number) values and incorrect numeric string coercion by Pandas. It ensures data integrity by explicitly converting relevant fields to strings and removing empty word entries.

## Key Concepts

NaN (Not a Number),Data Cleaning,Type Coercion,GECO Corpus,Pandas (Python library)

## Details

This commit implements a fix for data loading within the GECO (Groningen Eye-tracking Corpus) loader. The primary issues identified were:

*   **NaN Words:** The GECO corpus was found to contain 12 rows where the 'word' column had `NaN` (Not a Number) values, which could lead to errors in subsequent processing or analysis.
*   **Numeric String Coercion:** Pandas, the data manipulation library, was incorrectly parsing 205 numeric-looking words (e.g., the year "1984") as floating-point numbers instead of maintaining them as strings. This type coercion could cause inconsistencies and unexpected behavior.

The implemented solution involved two main steps:

1.  **Removing NaN Words:** A `dropna()` operation was added specifically for the 'word' column to eliminate rows containing `NaN` values, ensuring only valid word entries are processed.
2.  **Explicit String Coercion:** The `astype(str)` method was applied to ensure that both the XLSX processing path and the CSV reload paths explicitly convert the relevant data to string type. This prevents Pandas from inferring numeric types for string-formatted numbers.

This fix guarantees more robust and accurate data loading for the GECO corpus.

**Commit Details:**
*   **Repo:** `rahilsinghi/gaze-diffuse`
*   **SHA:** `7f4d82e`
*   **Date:** `2026-03-27T16:09:10Z`
*   **Author:** Rahil Singhi
*   **Co-Authored-By:** Claude Opus 4.6
*   **Files changed:** 1
*   **Additions:** +7
*   **Deletions:** -3

## Related

[[GECO Corpus]],[[Pandas (library)]],[[Data Cleaning]],[[Type Coercion]],[[Python]]
