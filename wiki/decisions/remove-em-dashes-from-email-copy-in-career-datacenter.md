---
title: Remove Em Dashes from Email Copy in Career-Datacenter
author: ai
created_at: 2026-04-12T21:27:58.024Z
last_ai_edit: 2026-04-12T21:27:58.024Z
last_human_edit: null
last_embedded_hash: 3215bdebf2389ffe
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-remove-em-dashes-from-all-human-facing-email-copy-564bbd.md]]"
tags:
  - email
  - copywriting
  - career-datacenter
  - automation
  - llm-co-authored
  - stylistic-decision
---


# Remove Em Dashes from Email Copy in Career-Datacenter

This commit removed all em dashes from human-facing email copy within the Career-Datacenter project to achieve a more natural tone. Em dashes were replaced with period-space separators in `COMPANY_HOOKS`, static follow-up bodies, and the follow-up body builder function.

## Key Concepts

Email Copy Refinement,Em Dash Replacement,Natural Language Tone,Automated Email Generation,LLM Co-Authored Commit

## Details

This commit, `e07e19e`, made on 2026-03-04 by Rahil Singhi in the [[Career-Datacenter — Git Activity]] repository, focused on improving the readability and natural tone of automated email communications.

The primary change involved systematically replacing all instances of em dashes (—) with a period followed by a space (. ) in various parts of the email generation logic. Specifically, this modification was applied to:

*   `COMPANY_HOOKS`: This likely refers to predefined text snippets or templates used for company-specific outreach.
*   Static follow-up bodies: Pre-written content for email follow-ups.
*   Follow-up body builder function: The programmatic component responsible for constructing the final email body.

The change affected one file, resulting in 20 additions and 20 deletions, indicating a direct replacement operation. This commit was co-authored by [[Claude Sonnet 4.6]], suggesting AI assistance in identifying and implementing these stylistic changes for improved communication clarity.

## Related

[[Career-Datacenter — Git Activity]],[[Add SMTP Send Capability and Update Signature URLs (Career-Datacenter)]],[[Claude]],[[Application Tracking System (Career-Datacenter)]]
