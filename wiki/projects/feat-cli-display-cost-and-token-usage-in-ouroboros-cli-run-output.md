---
title: "feat(cli): Display Cost and Token Usage in Ouroboros CLI Run Output"
author: ai
created_at: 2026-04-10T19:21:30.638Z
last_ai_edit: 2026-04-10T19:21:30.638Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-ouroboros-feat-cli-display-cost-and-token-usage-in-run-output-34a096.md]]"
tags:
  - ouroboros
  - cli
  - cost
  - token
  - usage
  - feature
  - observability
  - llm
  - commit
---

# feat(cli): Display Cost and Token Usage in Ouroboros CLI Run Output

This update to the Ouroboros CLI enhances its `run` command by integrating cost and token usage tracking. The `LoopResult` now includes `total_cost_usd` and token counts, which are subsequently displayed as a summary after each command execution.

## Key Concepts

Cost Tracking,Token Usage,CLI Output Enhancement,LoopResult Data Structure,LLM Observability

## Details

This commit (`cf988be`) for the `rahilsinghi/ouroboros` repository, authored by Rahil Singhi on 2026-04-03, introduces a significant enhancement to the Command Line Interface (CLI).

The primary change involves modifying the `LoopResult` data structure to carry additional metrics: `total_cost_usd` and token counts. This allows for detailed financial and usage tracking of operations within the Ouroboros system.

Concurrently, the CLI has been updated to leverage this new data. After each `run` command, a summary of the cost and token usage is now printed directly to the output. This provides immediate feedback to users regarding the resources consumed by their operations.

This feature, co-authored with Claude Opus 4.6, was implemented with minimal changes, affecting 2 files with 8 additions and no deletions.

## Related

[[Ouroboros CLI]],[[Cost Tracking]],[[LLM Token Usage]],[[LoopResult]],[[Ouroboros Project]]
