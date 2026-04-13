---
title: "Ouroboros Loop Adjustment: Noise Tolerance and Max Tokens"
author: ai
created_at: 2026-04-11T00:32:36.789Z
last_ai_edit: 2026-04-11T00:32:36.789Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-ouroboros-fix-loop-lower-noise-tolerance-and-increase-implementer-1dad06.md]]"
tags:
  - ouroboros
  - llm
  - agentic workflow
  - configuration
  - bug fix
  - error handling
  - performance improvement
---

# Ouroboros Loop Adjustment: Noise Tolerance and Max Tokens

This update to the Ouroboros project significantly lowers the `noise_tolerance` threshold from 0.02 to 0.005 to prevent premature rejection of valid agent iterations, observed to improve real-world outcomes. Concurrently, it doubles the `max_tokens` for the implementer agent's JSON output to 16384, allowing for more extensive responses. Additionally, the change introduces explicit retry logic to handle empty LLM responses before attempting JSON parsing, enhancing robustness.

## Key Concepts

Noise Tolerance,Max Tokens,LLM Responses,Agentic Workflow,Ouroboros Loop,JSON Parsing,Error Handling

## Details

This commit (SHA `ce0a9b3`) from the `rahilsinghi/ouroboros` repository introduces crucial adjustments to the Ouroboros agentic loop to refine its performance and resilience.

**Key Changes:**

1.  **Noise Tolerance Reduction**: The `noise_tolerance` parameter, which dictates the acceptable deviation for an iteration to be considered valid, has been reduced from `0.02` to `0.005`. This change was motivated by observations where an iteration (specifically, iteration #10) significantly improved real-world performance by `+0.012` but was nonetheless rejected due to exceeding the previous `0.02` threshold. Lowering this tolerance aims to allow more nuanced improvements to pass the validation stage, preventing potentially beneficial iterations from being discarded.

2.  **Implementer `max_tokens` Increase**: The `max_tokens` allocated for the implementer agent's JSON output has been increased from `8192` to `16384`. This provides the implementer with more capacity to generate comprehensive and detailed JSON responses, which is critical for complex tasks requiring extensive structured output.

3.  **Empty LLM Response Handling**: A new mechanism has been implemented to explicitly handle empty LLM responses. This involves adding a retry step before attempting to parse the LLM's output as JSON, which improves the robustness of the system against transient LLM output issues or blank responses.

## Related

[[Ouroboros]],[[LLM Model Constants and Company Info Helper (Commit a9513cd)]],[[Agent System Prompt Loading with PromptStore Integration in Ouroboros]],[[Robust Error Handling and Safety Path Awareness in Ouroboros Loop]],[[Cost Tracking in LoopResult and Agent Failure Attribution (Ouroboros)]],[[CLAUDE.md Update: Ouroboros Phase 2 Results]],[[CLAUDE.md Update: Phase 1.5 Results in Ouroboros]]
