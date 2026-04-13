---
title: "Career-Datacenter: Fix Knowledge Base Loader YAML Keys"
author: ai
created_at: 2026-04-12T21:48:18.478Z
last_ai_edit: 2026-04-12T21:48:18.478Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-fix-knowledge-base-loader-to-use-correct-yaml-keys-f93e60.md]]"
tags:
  - career-datacenter
  - bugfix
  - yaml
  - data loading
  - knowledge base
  - education
  - experience
  - configuration
---

# Career-Datacenter: Fix Knowledge Base Loader YAML Keys

This commit addresses a critical bug in the [[Career-Datacenter]] project where the education and experience data loaders were failing due to incorrect YAML key assumptions. The fix involved updating the loaders to correctly use the "entries" key, resolving data ingestion issues for educational and professional experience records.

## Key Concepts

[[Career-Datacenter]],YAML Configuration,Data Loading,Knowledge Base Structure

## Details

The commit `c9569d8` in the `rahilsinghi/Career-Datacenter` repository resolved a significant issue concerning the application's ability to load core identity data. Previously, the internal knowledge base loaders responsible for ingesting education and experience data were hardcoded to look for top-level keys named `"education"` and `"experiences"` within their respective YAML configuration files (e.g., `education.yaml`).

However, the actual structure of these YAML files used a single `"entries"` key to encapsulate the list of records. This mismatch led to the loaders, specifically `load_education()`, returning an empty list, rendering the education and experience sections of the knowledge base non-functional.

The fix involved modifying the `education` and `experience` loaders to correctly target the `"entries"` key. As a result, the application now successfully parses and loads the education and experience data as intended, ensuring the integrity and completeness of the knowledge base.

## Related

[[Career-Datacenter]],[[Add Core Identity and Education Data to Career-Datacenter]],[[Add Professional Experience Entries (Career-Datacenter)]],[[Add Original LaTeX Resume Source to Career-Datacenter]]
