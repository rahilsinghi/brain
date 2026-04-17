---
title: Fix Knowledge Base Loader YAML Key Mismatch
author: ai
created_at: 2026-04-10T17:25:02.905Z
last_ai_edit: 2026-04-10T17:25:02.905Z
last_human_edit: null
last_embedded_hash: def27275bd95e8eb
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-fix-knowledge-base-loader-to-use-correct-yaml-keys-f93e60.md]]"
tags:
  - yaml
  - loader
  - bugfix
  - refactoring
  - career-datacenter
  - co-authored
  - data-loading
---


# Fix Knowledge Base Loader YAML Key Mismatch

This commit addresses a bug in the knowledge base loader for the `rahilsinghi/Career-Datacenter` repository, where `education` and `experience` data were not being loaded due to incorrect YAML key assumptions. The fix involved updating the loader to correctly interpret the 'entries' key in the YAML files, resolving an issue that previously resulted in empty data lists.

## Key Concepts

- **YAML Configuration**: Using YAML files for data storage and configuration.,- **Data Loader**: Components responsible for reading and parsing data from external sources.,- **Key Mismatch**: An error occurring when a program expects a different key name than what is present in the data source.,- **Refactoring**: Modifying code without changing its external behavior, often to improve readability, maintainability, or correct bugs.,- **`load_education()` Function**: A specific function responsible for loading education data.

## Details

This commit (`c9569d8`) from 2026-02-14 by Rahil Singhi (co-authored by Claude Sonnet 4.5) implemented a critical fix for the knowledge base data loaders within the `rahilsinghi/Career-Datacenter` repository. The problem arose because the `education` and `experience` data loading functions were attempting to retrieve data using keys named `"education"` and `"experiences"` respectively.

However, the actual YAML file structure utilized a generic `"entries"` key to encapsulate these lists. This discrepancy led to the loaders returning empty lists, effectively failing to load any educational or experiential data. The fix involved modifying the relevant loader functions (e.g., `load_education()`) to correctly target the `"entries"` key, ensuring that the data is now parsed and loaded as intended.

**Commit Details:**
- **Repository:** `rahilsinghi/Career-Datacenter`
- **SHA:** `c9569d8`
- **Date:** `2026-02-14T16:20:51Z`
- **Author:** Rahil Singhi
- **Files Changed:** 1
- **Additions:** +2
- **Deletions:** -2

**Impact:**
- **Before:** `load_education()` (and similar functions) returned an empty list due to incorrect key usage.
- **After:** Education and experience entries are correctly loaded from their respective YAML files.

## Related

[[rahilsinghi/Career-Datacenter]],[[YAML]],[[Knowledge Base]],[[Data Loader]],[[Code Refactoring]]
