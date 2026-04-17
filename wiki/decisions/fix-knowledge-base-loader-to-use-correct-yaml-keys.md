---
title: Fix Knowledge Base Loader to Use Correct YAML Keys
author: ai
created_at: 2026-04-10T21:25:49.133Z
last_ai_edit: 2026-04-10T21:25:49.133Z
last_human_edit: null
last_embedded_hash: 565cf2e121cbb82d
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-fix-knowledge-base-loader-to-use-correct-yaml-keys-f93e60.md]]"
tags:
  - bugfix
  - yaml
  - data-loading
  - knowledge-base
  - commit
  - career-datacenter
  - co-authored
---


# Fix Knowledge Base Loader to Use Correct YAML Keys

This commit addresses a critical bug in the knowledge base loaders for education and experience data, where they failed to correctly parse YAML files due to expecting incorrect top-level keys. The fix updates the loaders to use the 'entries' key, aligning with the actual YAML file structure, thereby enabling proper data loading.

## Key Concepts

YAML Parsing,Data Loaders,Knowledge Base,Repository Commit,Co-authored Development

## Details

This commit, identified by SHA `c9569d8` in the `rahilsinghi/Career-Datacenter` repository, implements a fix for the knowledge base loaders responsible for ingesting education and experience data. Previously, the `load_education()` and `load_experience()` functions were attempting to retrieve data using top-level keys named `"education"` and `"experiences"` respectively.

However, the actual YAML file structure utilized a generic `"entries"` key for both types of data. This mismatch led to the loaders returning empty lists, effectively failing to load any educational or experiential records.

Authored by Rahil Singhi on 2026-02-14T16:20:51Z, with a contribution from Claude Sonnet 4.5, the fix involved modifying the relevant loader functions to correctly target the `"entries"` key. This change affected 1 file, with 2 additions and 2 deletions, resolving the parsing issue. As a result, the knowledge base can now accurately load and process education entries from `education.yaml` and experience entries from `experiences.yaml`.

## Related

[[YAML]],[[Data Loader]],[[Knowledge Base]],[[Commit]],[[rahilsinghi/Career-Datacenter]]
