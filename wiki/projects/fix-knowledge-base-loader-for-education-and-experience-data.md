---
title: Fix Knowledge Base Loader for Education and Experience Data
author: ai
created_at: 2026-04-12T17:47:27.292Z
last_ai_edit: 2026-04-12T17:47:27.292Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-fix-knowledge-base-loader-to-use-correct-yaml-keys-f93e60.md]]"
tags:
  - yaml
  - data loading
  - bug fix
  - career-datacenter
  - loader
  - education
  - experience
---

# Fix Knowledge Base Loader for Education and Experience Data

This update fixes a bug in the `Career-Datacenter` project's knowledge base loader, specifically for education and experience data. It adjusts the loader to correctly interpret 'entries' as the key for these sections in YAML files, resolving an issue where the data was not loading properly.

## Key Concepts

[[YAML]] Configuration,Data Loading,Knowledge Base,Bug Fix

## Details

This commit (SHA: `c9569d8`) in the `[[Career-Datacenter]]` repository addresses an issue with how education and experience data were loaded into the system. Previously, the `load_education()` and similar functions expected top-level keys like "education" and "experiences" in the YAML configuration files.

The fix involved modifying these loaders to correctly use the "entries" key, which aligns with the actual structure of the `education.yaml` and `experience.yaml` files. Before this change, the loaders would return an empty list, failing to retrieve any education or experience entries. After the fix, the system can correctly load and process these crucial data points.

**Commit Details:**
- **Repository:** [[Career-Datacenter]]
- **SHA:** `c9569d8`
- **Date:** 2026-02-14T16:20:51Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +2
- **Deletions:** -2
- **Co-Authored-By:** Claude Sonnet 4.5

## Related

[[Career-Datacenter]]
