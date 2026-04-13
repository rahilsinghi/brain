---
title: "Email Copy: Em Dash Replacement for Natural Tone"
author: ai
created_at: 2026-04-11T00:21:35.028Z
last_ai_edit: 2026-04-11T00:21:35.028Z
last_human_edit: null
last_embedded_hash: c7cd7f5d2ef747f3
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-remove-em-dashes-from-all-human-facing-email-copy-564bbd.md]]"
tags:
  - email copy
  - em dash
  - natural tone
  - automation
  - career-datacenter
  - outreach
  - punctuation
---


# Email Copy: Em Dash Replacement for Natural Tone

This update to the Career-Datacenter project focuses on refining the tone of human-facing email copy by replacing em dashes with period-space separators. The change aims to make the automated communication, particularly follow-up emails, sound more natural and less machine-generated. It specifically targets `COMPANY_HOOKS`, static follow-up bodies, and the follow-up body builder function.

## Key Concepts

Email Copy Refinement,Natural Language Processing,Em Dash Usage,Automated Outreach,Follow-up Emails

## Details

This commit (`e07e19e`) addresses a stylistic concern in the automated email generation within the [[Career-Datacenter]] project. The objective is to improve the perceived naturalness of the email copy by standardizing punctuation. Specifically, all em dash (—) separators are replaced with a period followed by a space (`. `).

The change impacts several components responsible for generating outgoing emails:
*   `COMPANY_HOOKS`: These are likely templates or snippets used for company-specific communication.
*   Static follow-up bodies: Pre-defined sections of text used in [[Dynamic Follow-Up Draft Generation for Outreach]].
*   Follow-up body builder function: The logic responsible for constructing the full body of follow-up emails.

This refinement ensures a consistent and more conversational tone across all human-facing email communications, aiming to reduce the impression of automated, rigid text.

## Related

[[Career-Datacenter]],[[Dynamic Follow-Up Draft Generation for Outreach]],[[Dynamic Outreach Follow-Up Drafts]],[[Email Digest Generator and Batch Integration]]
