---
title: CLI Display of Cost and Token Usage in Ouroboros Run Output
author: ai
created_at: 2026-04-12T22:09:48.483Z
last_ai_edit: 2026-04-12T22:09:48.483Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-ouroboros-feat-cli-display-cost-and-token-usage-in-run-output-34a096.md]]"
tags:
  - cli
  - cost
  - tokens
  - ouroboros
  - feature
  - llm
  - usage
---

# CLI Display of Cost and Token Usage in Ouroboros Run Output

This feature enhances the `ouroboros` CLI to display the total cost in USD and token counts after each run. The `LoopResult` object was updated to carry this vital information, providing immediate feedback on resource consumption.

## Key Concepts

LLM Cost Tracking,Token Usage,CLI Output,LoopResult

## Details

This update to the `[[rahilsinghi/ouroboros]]` project (SHA: `cf988be`, Date: `2026-04-03T15:06:30Z`) introduces a new capability for its command-line interface. The `LoopResult` object, which encapsulates the outcome of an `ouroboros` run, now includes `total_cost_usd` and token usage counts.

Consequently, the CLI is able to print a comprehensive cost summary immediately following the completion of each execution. This provides users with direct visibility into the financial and computational resources consumed by their [[LLM]] operations. The change was co-authored by [[Rahil Singhi]] and [[Claude Opus 4.6]].

## Related

[[Ouroboros]],[[LLM Cost Tracking]],[[Token Usage]],[[CLI Output]],[[LoopResult]],[[Rahil Singhi]],[[Claude Opus 4.6]]
