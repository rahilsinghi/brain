---
title: Gmail Drafts Integration for Outreach Follow-ups (Career-Datacenter)
author: ai
created_at: 2026-04-11T01:25:37.825Z
last_ai_edit: 2026-04-11T01:25:37.825Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-gmail-drafts-integration-for-outreach-follow-u-bd8a6c.md]]"
tags:
  - gmail
  - drafts
  - outreach
  - follow-ups
  - career-datacenter
  - automation
  - imap
  - python
  - cli
  - email
---

# Gmail Drafts Integration for Outreach Follow-ups (Career-Datacenter)

This integration introduces a new Python CLI tool within the Career-Datacenter project to create real Gmail drafts via IMAP. It allows users to review and send pre-populated follow-up emails, such as for job applications, directly from their Gmail UI without requiring OAuth setup. The system was used to pre-load a follow-up draft for Rogers Leo (Mews).

## Key Concepts

[[Gmail Drafts]],[[IMAP]],[[App Passwords]],[[Outreach Automation]],[[Career-Datacenter]],[[CLI Tools]]

## Details

A new CLI utility, `cli/gmail_drafts.py`, has been added to the [[Career-Datacenter]] project to facilitate automated outreach follow-ups. This script leverages IMAP with an application-specific password to create drafts directly in a user's Gmail account.

The key features of this integration include:

*   **Real Gmail Draft Creation**: The script generates actual Gmail drafts, which then appear in the user's Gmail UI for review and final sending. This approach eliminates the need for complex OAuth configurations, relying instead on a simpler App Password stored securely in a `.env` file (which is `git-ignored`).
*   **Review Before Sending**: By creating drafts rather than sending directly, the system ensures human oversight, allowing users to review and customize messages before they are dispatched.
*   **Integrated with Outreach Workflow**: The functionality is integrated into the `hospitality_outreach.py` script, providing commands like `drafts-list`, `draft <id>`, and `drafts-all` to manage the creation and viewing of drafts.
*   **Pre-loaded Drafts**: An example of a pre-loaded draft includes a follow-up for Rogers Leo (Mews), scheduled for 2026-03-06, demonstrating the system's ability to prepare time-sensitive communications.

**Usage Example:**
To generate a specific draft, the command `python cli/gmail_drafts.py --draft mews-rogers` can be used.

This enhancement, co-authored by Claude Opus 4.6, significantly streamlines the follow-up process for job applications and professional networking within the [[Career-Datacenter]] ecosystem.

## Related

[[Career-Datacenter]],[[CLAUDE.md Agent Instructions and Hospitality Outreach Playbook]],[[Career Applications and Outreach Log (2026-03-04)]],[[Career-Datacenter Outreach Analysis: Hospitality Tech Job Search Campaign]],[[Mews]],[[Claude How To]]
