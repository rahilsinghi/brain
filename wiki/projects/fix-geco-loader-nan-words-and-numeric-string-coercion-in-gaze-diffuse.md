---
title: "Fix: GECO Loader NaN Words and Numeric String Coercion in Gaze-Diffuse"
author: ai
created_at: 2026-04-13T15:51:31.447Z
last_ai_edit: 2026-04-13T15:51:31.447Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-fix-data-handle-nan-words-and-numeric-string-coercion-cd1b39.md]]"
tags:
  - bugfix
  - data processing
  - gaze-diffuse
  - geco
  - pandas
  - data loading
  - type coercion
---

# Fix: GECO Loader NaN Words and Numeric String Coercion in Gaze-Diffuse

This commit addresses data parsing issues in the GECO corpus loader within the [[Gaze-Diffuse]] project. It resolves problems with 'NaN' words and numeric strings being incorrectly interpreted as floats by pandas, ensuring accurate data loading through explicit type coercion and null value handling.

## Key Concepts

GECO loader,NaN words,Numeric string coercion,Pandas data handling,Data validation,astype(str),dropna

## Details

This fix (SHA: `7f4d82e`) in the `rahilsinghi/gaze-diffuse` repository, authored by Rahil Singhi on 2026-03-27, targets a specific data loading challenge with the GECO corpus. The GECO corpus was found to contain 12 rows where the 'words' column had `NaN` values and approximately 205 instances of numeric-looking strings (e.g., "1984") that the `pandas` library incorrectly parsed as floating-point numbers instead of strings.

To resolve these issues, the commit introduces two main changes:
1.  `dropna` operation applied to the 'word' column to remove rows with `NaN` word entries.
2.  `astype(str)` coercion applied to ensure that both the XLSX processing path and the CSV reload paths consistently treat numeric-looking words as strings.

This enhancement improves the robustness and accuracy of data ingestion for the GECO corpus within [[Gaze-Diffuse]], ensuring that downstream analyses are based on correctly typed data. The change involved modifying 1 file, with 7 additions and 3 deletions. This commit was co-authored by [[Claude Opus 4.6]].

## Related

[[Gaze-Diffuse]],[[Add Smoke, Integration, and GECO Data Validation Tests]],[[Claude Opus 4.6]]
