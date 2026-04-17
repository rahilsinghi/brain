---
title: Brain-integrated CLI Entry Point (graphify_cli.py)
author: ai
created_at: 2026-04-12T21:06:25.465Z
last_ai_edit: 2026-04-12T21:06:25.465Z
last_human_edit: null
last_embedded_hash: 11ecaa6785dea8bd
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-graphify-feat-add-brain-integrated-cli-entry-point-graphify-clipy-b0b613.md]]"
tags:
  - graphify
  - cli
  - brain
  - automation
  - pipeline
  - code analysis
  - lancedb
  - daemon
  - python
---


# Brain-integrated CLI Entry Point (graphify_cli.py)

This commit introduces `graphify_cli.py`, a command-line interface entry point that orchestrates the entire Graphify pipeline. It is designed to be called by the Brain's daemon, producing structured reports and data for repository analysis and embedding. The tool generates architecture reports, graph data, and per-file summaries, with an option to use cached results via a `--semantic` flag.

## Key Concepts

[[Graphify pipeline]],[[CLI]],[[Brain's daemon]],[[LanceDB embedding]],[[Semantic flag]],[[Code analysis]]

## Details

This commit introduces `graphify_cli.py`, a central command-line interface (CLI) entry point within the `rahilsinghi/graphify` repository. Its primary function is to chain together the full [[Graphify pipeline]], encompassing the following stages:
1.  **Detect**: Identification of relevant code components.
2.  **Extract**: Extraction of information from detected components.
3.  **Build**: Construction of graph structures from extracted data.
4.  **Cluster**: Grouping related entities.
5.  **Analyze**: In-depth examination of the graph.
6.  **Report**: Generation of human-readable summaries.
7.  **Export**: Outputting data for external systems.

This CLI tool is specifically designed to be callable by [[Brain's daemon]], facilitating automated repository analysis.

Upon execution, `graphify_cli.py` generates the following outputs per processed repository:
*   `architecture.md` report: A markdown document detailing the repository's architecture.
*   `graph.json`: A JSON representation of the generated graph.
*   Per-file summary markdown files: These are created for [[LanceDB embedding]], enabling efficient storage and retrieval of code-related data.

A key feature is the `--semantic` flag. When used, this flag instructs the pipeline to only utilize cached results. This is noted as a v1 limitation, and a warning is logged if uncached files are encountered when this flag is active.

The commit was authored by [[Rahil Singhi]] and co-authored by [[Claude Opus 4.6 (1M context)]], indicating an LLM-assisted development process.

## Related

[[Graphify]],[[Brain's daemon]],[[LanceDB embedding]],[[CLI Entry Point for PNPM Seed]],[[Chore: Add Python Requirements for Graphify CLI]],[[Chore: Install LanceDB, Transformers.js, and Apache-Arrow for Brain Project Phase 2]],[[Brain Project Phase 2 Hardening: Partial Embed Safety and Connection Discovery]],[[Brain Project: Phase 3 Completion and Next-Phase Assessment]],[[CLAUDE.md for Project Context and Session Persistence]],[[Rahil Singhi]],[[Claude Opus 4.6 (1M context)]]
