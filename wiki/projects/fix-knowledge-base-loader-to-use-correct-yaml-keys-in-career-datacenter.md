---
title: Fix Knowledge Base Loader to Use Correct YAML Keys in Career-Datacenter
author: ai
created_at: 2026-04-13T16:11:17.507Z
last_ai_edit: 2026-04-13T16:11:17.507Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-fix-knowledge-base-loader-to-use-correct-yaml-keys-f93e60.md]]"
tags:
  - knowledge base
  - bug fix
  - yaml
  - career-datacenter
  - data loading
---

# Fix Knowledge Base Loader to Use Correct YAML Keys in Career-Datacenter

This commit addresses a bug in the `Career-Datacenter` project where education and experience data were not loading correctly. The fix involved updating the knowledge base loader to use the 'entries' YAML key, aligning it with the actual YAML file structure for education and experience data.

## Key Concepts

Knowledge Base Loader,YAML Configuration,Data Parsing,Bug Fix

## Details

Previously, the `Career-Datacenter` project's `load_education()` function returned an empty list because it was attempting to read from `education` and `experiences` YAML keys. The actual YAML file structure, however, stored these entries under a generic `entries` key. This change updates the education and experience loaders to correctly target the `entries` key, ensuring that educational qualifications and professional experiences are now loaded as intended.

**Repository:** `rahilsinghi/Career-Datacenter`
**Commit SHA:** `c9569d8`
**Date:** 2026-02-14T16:20:51Z
**Files changed:** 1
**Additions:** +2
**Deletions:** -2

## Related

[[Career-Datacenter: Fix Knowledge Base Loader YAML Keys]],[[Career-Datacenter]],[[Add Core Identity and Education Data]],[[Add Professional Experience Entries (Career-Datacenter)]],[[Career Datacenter: Initial Identity and Education Data Commit]]
