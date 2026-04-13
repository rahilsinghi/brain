---
title: Display Cost and Token Usage in Ouroboros CLI Output
author: ai
created_at: 2026-04-11T01:34:11.817Z
last_ai_edit: 2026-04-11T01:34:11.817Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-ouroboros-feat-cli-display-cost-and-token-usage-in-run-output-34a096.md]]"
tags:
  - cli
  - cost tracking
  - token usage
  - ouroboros
  - feature
  - llm
---

# Display Cost and Token Usage in Ouroboros CLI Output

This feature enhances the `Ouroboros` project's command-line interface (CLI) to display a comprehensive summary of total cost in USD and token usage after each run. This provides immediate feedback on resource consumption for agent operations.

## Key Concepts

`LoopResult`,Cost tracking,Token usage,CLI output,LLM

## Details

The `Ouroboros` project, specifically through commit `cf988be` by Rahil Singhi (co-authored by Claude Opus 4.6), introduced a significant enhancement to its command-line interface. This update integrates cost and token usage tracking directly into the CLI output for each run.

The core of this feature involves the `LoopResult` object, which now explicitly carries `total_cost_usd` and token counts. Following the completion of an agent run, the CLI leverages this data to print a detailed cost summary, offering users transparent insight into the financial and computational resources consumed by their operations.

### Commit Details:
- **Repository**: `rahilsinghi/ouroboros`
- **SHA**: `cf988be`
- **Date**: 2026-04-03T15:06:30Z
- **Author**: Rahil Singhi
- **Co-Authored-By**: Claude Opus 4.6
- **Files Changed**: 2
- **Additions**: 8 lines
- **Deletions**: 0 lines

## Related

[[Ouroboros]],[[Cost Tracking in LoopResult and Agent Failure Attribution (Ouroboros)]],[[CLAUDE.md Update: Ouroboros Phase 2 Results]],[[CLAUDE.md Update: Phase 1.5 Results in Ouroboros]],[[CLI: Display Cost and Token Usage in Ouroboros Run Output]]
