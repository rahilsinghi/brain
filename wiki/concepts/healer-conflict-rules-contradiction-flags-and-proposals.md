---
title: "Healer: Conflict Rules, Contradiction Flags, and Proposals"
author: ai
created_at: 2026-04-10T02:19:29.021Z
last_ai_edit: 2026-04-10T02:19:29.021Z
last_human_edit: null
last_embedded_hash: 1fa0ef2198be720e
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-healer-with-conflict-rules-contradiction-flags-and-pro-3c673f.md]]"
tags:
  - healer
  - conflict-resolution
  - human-sovereignty
  - contradiction-flags
  - proposals
  - ai-governance
  - brain-repo
  - cooldown
  - direct-edit
  - append-synthesis
  - knowledge-management
---


# Healer: Conflict Rules, Contradiction Flags, and Proposals

The healer component implements a 3-tier human sovereignty model for managing AI-generated file edits, ensuring human control over content changes. Contradictions between edits are never auto-resolved but always flagged for human review. This system enforces clear boundaries between direct AI edits, synthesis appending, and cooldown-based skipping.

## Key Concepts

- **3-Tier Human Sovereignty**: A conflict resolution hierarchy with three distinct modes — `direct_edit`, `append_synthesis`, and `skip`
- **direct_edit**: Applied to files that have not been touched by a human, allowing the AI to edit directly
- **append_synthesis**: Applied to files with stale human edits, where AI output is appended rather than overwriting
- **skip**: Applied to files edited within the last 24 hours (cooldown period), preventing any AI modification
- **flag_contradiction**: The mandatory outcome whenever a contradiction is detected — auto-resolution is explicitly prohibited
- **Contradiction Flags**: Markers raised when conflicting edits or content are detected, requiring human intervention to resolve
- **Proposals**: Suggested changes surfaced by the healer for human review rather than applied automatically

## Details

## Overview

This commit introduces the `healer` subsystem within the `rahilsinghi/brain` repository, adding 164 lines of new logic across 2 files. The healer is responsible for managing how AI-generated content interacts with human-edited files, prioritizing human oversight and avoiding silent overwrites or resolutions.

## 3-Tier Human Sovereignty Model

The healer enforces three distinct behaviors based on the state of a file:

| Tier | Mode | Condition | Behavior |
|------|------|-----------|----------|
| 1 | `direct_edit` | File has no prior human edits | AI may edit the file directly |
| 2 | `append_synthesis` | File has human edits older than 24 hours | AI output is appended, not merged |
| 3 | `skip` | File was edited by a human within the last 24 hours | File is left untouched (cooldown) |

## Contradiction Handling

A core design principle of the healer is that **contradictions are never auto-resolved**. Whenever conflicting content or intent is detected between an AI proposal and existing human content, the system raises a `flag_contradiction`. This flag surfaces the issue for human review and decision, preserving the integrity of human-authored content.

## Proposals

Rather than applying all changes silently, the healer generates proposals — structured suggestions that can be reviewed, accepted, or rejected by the human author. This ties directly into the sovereignty model, ensuring the human remains the final arbiter of content in the knowledge base.

## Implementation Notes

- **Files changed:** 2
- **Additions:** +164 lines
- **Deletions:** 0 (no existing logic removed)
- Co-authored with Claude Sonnet 4.6, reflecting the human-AI collaboration pattern this system is designed to govern.

## Related

- [[Human Sovereignty Model]]
- [[AI Content Management]]
- [[Contradiction Detection]]
- [[Cooldown and Edit Staleness]]
- [[Brain Repository]]
- [[Proposal Review Workflow]]
- [[append_synthesis Pattern]]
- [[AI-Human Collaboration Guardrails]]
