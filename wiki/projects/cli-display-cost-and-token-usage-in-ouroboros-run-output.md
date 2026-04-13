---
title: "CLI: Display Cost and Token Usage in Ouroboros Run Output"
author: ai
created_at: 2026-04-12T18:09:32.868Z
last_ai_edit: 2026-04-12T18:09:32.868Z
last_human_edit: null
last_embedded_hash: a0ba430bd8ce5e43
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-ouroboros-feat-cli-display-cost-and-token-usage-in-run-output-34a096.md]]"
tags:
  - cli
  - cost management
  - tokens
  - ouroboros
  - llm
  - feature
---


# CLI: Display Cost and Token Usage in Ouroboros Run Output

This feature update to the Ouroboros project enhances the command-line interface (CLI) to display a cost summary and token usage after each run. This is achieved by having the `LoopResult` object carry `total_cost_usd` and token counts, providing immediate feedback on resource consumption.

## Key Concepts

[[Ouroboros]] Project,Command-Line Interface (CLI),LLM Cost Tracking,Token Usage,LoopResult

## Details

This commit, identified by SHA `cf988be` and authored by Rahil Singhi on 2026-04-03, introduces a new feature to the `rahilsinghi/ouroboros` repository. The primary change involves modifying the `LoopResult` object to include `total_cost_usd` and token count metrics. Consequently, the command-line interface (CLI) for Ouroboros is updated to print a detailed cost summary following each execution. This enhancement provides users with immediate visibility into the financial and computational resources consumed by their runs, aiding in cost management and optimization of LLM interactions.

Changes include 8 additions across 2 files, with no deletions.

Co-Authored-By: [[Claude Opus 4.6]]

## Related

[[Ouroboros]],[[CLI: Display Cost and Token Usage in Ouroboros Run Output]],[[Ouroboros Run Output]],[[LLM Model Constants and Company Info Helper (Commit a9513cd)]],[[CLI: Display Cost and Token Usage in Ouroboros Run Output]],[[CLAUDE.md Update: Gemini Provider, Test Count, and Source Files]],[[CLI: Display Cost and Token Usage in Ouroboros Run Output]],[[Claude]]
