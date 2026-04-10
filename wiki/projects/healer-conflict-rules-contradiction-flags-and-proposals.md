---
title: "Healer: Conflict Rules, Contradiction Flags, and Proposals"
author: ai
created_at: 2026-04-10T02:19:29.228Z
last_ai_edit: 2026-04-10T02:19:29.228Z
last_human_edit: null
last_embedded_hash: 6ba813996dc4e120
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-healer-with-conflict-rules-contradiction-flags-and-pro-3c673f.md]]"
tags:
  - healer
  - conflict-resolution
  - human-sovereignty
  - contradiction-flagging
  - brain-repo
  - ai-collaboration
  - proposals
  - append-synthesis
  - cooldown
  - rahilsinghi
---


# Healer: Conflict Rules, Contradiction Flags, and Proposals

The Healer component implements a 3-tier human sovereignty model for managing AI-generated and human-edited files in the brain repository. It introduces structured conflict resolution rules that prioritize human agency, ensuring contradictions are always flagged rather than automatically resolved. This system was co-developed with Claude Sonnet 4.6 and committed to the rahilsinghi/brain repo in April 2026.

## Key Concepts

- **3-Tier Human Sovereignty**: A hierarchical conflict resolution model with three distinct modes based on file edit history and recency
- **direct_edit**: Mode applied to files that have not been touched by a human, allowing AI to directly modify them
- **append_synthesis**: Mode for files containing stale human edits, where AI appends synthesized content rather than overwriting
- **skip (cooldown)**: Mode that prevents any modification to files edited by a human within the last 24 hours
- **flag_contradiction**: A non-negotiable outcome whenever contradictions are detected — the system never auto-resolves conflicts
- **Proposals**: The Healer can generate proposed changes rather than applying them directly, supporting human review
- **Conflict Rules**: Logic determining which tier applies to a given file based on authorship and recency metadata

## Details

## Overview

The Healer is a subsystem within the `rahilsinghi/brain` repository responsible for reconciling conflicts between AI-generated content and human-authored edits. Commit `779b295` (2026-04-04) introduced the foundational conflict rules, contradiction flagging behavior, and proposal generation in a net-new addition of 164 lines across 2 files.

## 3-Tier Human Sovereignty Model

The Healer categorizes every file into one of three tiers before deciding how to act:

| Tier | Trigger Condition | Healer Action |
|---|---|---|
| `direct_edit` | File has no human edits | AI may directly modify the file |
| `append_synthesis` | File has human edits older than 24 hours | AI appends a synthesized section without altering existing content |
| `skip` | File was human-edited within the last 24 hours | No action taken; cooldown respected |

This tiered approach ensures that the more recently a human has touched a file, the less autonomy the AI retains over it.

## Contradiction Handling

A core design principle of this implementation is that **contradictions are never auto-resolved**. Whenever the Healer detects a logical or factual contradiction between AI-proposed content and existing human content, it emits a `flag_contradiction` event. This places the decision firmly in human hands, preserving trust and auditability.

## Proposals

Rather than always writing changes directly, the Healer can emit structured proposals — candidate edits that await human approval before being applied. This is particularly relevant in `append_synthesis` mode, where human content is already present.

## Implementation Notes

- **Repo:** rahilsinghi/brain
- **Commit SHA:** 779b295
- **Date:** 2026-04-04T00:14:13Z
- **Author:** Rahil Singhi (Co-Authored-By: Claude Sonnet 4.6)
- **Scope:** +164 additions, 0 deletions, 2 files changed
- The 24-hour cooldown window for the `skip` tier is a configurable boundary protecting recent human work from immediate AI intervention.

## Related

- [[Brain Repository]]
- [[Human Sovereignty Model]]
- [[AI Conflict Resolution]]
- [[Contradiction Flagging]]
- [[Append Synthesis Pattern]]
- [[Cooldown Mechanisms]]
- [[AI-Human Collaboration Workflows]]
- [[Claude Sonnet 4.6]]
