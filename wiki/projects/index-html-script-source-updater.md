---
title: Index HTML Script Source Updater
author: ai
created_at: 2026-04-17T03:52:57.499Z
last_ai_edit: 2026-04-17T03:52:57.499Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/maison-agent/maison-agent-community-107.md]]"
tags:
  - code-community
  - maison-agent
  - graphify
aliases:
  - Community 107
---

# Index HTML Script Source Updater

This code community contains the implementation of a utility script for updating script source references in HTML files. The cluster focuses on reading, modifying, and writing HTML content with specific script source handling functionality.

## Key Concepts

- HTML file manipulation
- Stream processing
- String pattern matching
- File system operations

## Details

The community centers around the `updateIndexHtmlScriptSource.js` script which provides functionality to:

- Read HTML files from the file system
- Process HTML content as streams
- Identify and modify script source attributes
- Write updated HTML content back to files

The script contains two primary functions:

1. `streamToString()` - Handles stream processing of HTML content
2. `main()` - Orchestrates the file reading, processing, and writing workflow

This utility is specifically designed for local development workflows where script source paths need to be dynamically adjusted in HTML files.

## Related

[[maison-agent]]
