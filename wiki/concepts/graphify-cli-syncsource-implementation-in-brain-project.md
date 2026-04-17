---
title: Graphify CLI SyncSource Implementation in Brain Project
author: ai
created_at: 2026-04-13T18:35:54.437Z
last_ai_edit: 2026-04-13T18:35:54.437Z
last_human_edit: null
last_embedded_hash: 2fab37baa4500314
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-graphify-implement-syncsource-that-shells-out-to-graphi-2af73c.md]]"
tags:
  - graphify
  - cli
  - syncsource
  - braindata
  - knowledgeextraction
  - rawdrops
  - vitest
  - testing
  - child_process
  - esm
---


# Graphify CLI SyncSource Implementation in Brain Project

This feature introduces a `SyncSource` that integrates the `graphify` command-line interface (CLI) into the Brain Project's data ingestion pipeline. It allows the system to execute the `graphify` CLI, then collect and process its output (architecture reports and file summaries) as `RawDrops` for subsequent knowledge processing. The implementation includes necessary testing setup for `vitest` to properly mock `child_process` functions.

## Key Concepts

[[SyncSource]],[[graphify CLI]],[[RawDrops]],[[vitest]],[[child_process module]],[[ECMAScript Modules (ESM)]]

## Details

The `feat(graphify): implement SyncSource that shells out to graphify CLI` commit (`2b42cf1`) introduces `src/sources/graphify.ts` which provides a `createGraphifySource()` factory. This factory is responsible for executing the [[Brain-integrated CLI Entry Point (graphify_cli.py)|graphify CLI]] and then walking its output directory. The goal is to collect structured data, such as architecture reports and file summaries, which are then represented as [[RawDrops]] within the Brain Project's knowledge base.

A key part of this implementation involves setting up [[vitest]] test environment correctly. A `vitest setupFiles` shim was added to ensure that `vi.spyOn` can effectively mock functions within the [[Node.js child_process module|child_process]] ESM namespace, which is crucial for testing interactions with external CLI commands.

This enhancement facilitates automated knowledge extraction from codebase structures, integrating the detailed analysis capabilities of `graphify` directly into the Brain Project's continuous ingestion workflow. It was developed in collaboration with Claude Sonnet 4.6.

## Related

[[Brain Project]],[[Brain-integrated CLI Entry Point (graphify_cli.py)]],[[RawDrops]],[[Add Zod and CSV-Parse Dependencies, Implement Seed Source Types]],[[API: POST /ingest Route for Fire-and-Forget Raw Data Ingestion]]
