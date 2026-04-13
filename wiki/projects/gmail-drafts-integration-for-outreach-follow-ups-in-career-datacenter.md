---
title: Gmail Drafts Integration for Outreach Follow-ups in Career Datacenter
author: ai
created_at: 2026-04-10T17:30:01.213Z
last_ai_edit: 2026-04-10T17:30:01.213Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-gmail-drafts-integration-for-outreach-follow-u-bd8a6c.md]]"
tags:
  - gmail
  - drafts
  - imap
  - app-password
  - cli
  - outreach
  - follow-ups
  - python
  - career-datacenter
  - automation
---

# Gmail Drafts Integration for Outreach Follow-ups in Career Datacenter

This commit introduces a new command-line interface (CLI) tool within the `rahilsinghi/Career-Datacenter` repository to create and manage Gmail drafts via IMAP. It enables users to prepare outreach follow-up emails, which appear directly in the Gmail UI for review before sending, bypassing the need for OAuth.

## Key Concepts

IMAP,Gmail App Passwords,Command Line Interface (CLI),Outreach Automation,Email Draft Management,Secure Credential Storage (.env)

## Details

This integration, committed to the `rahilsinghi/Career-Datacenter` repository (SHA: `5f98407`) by Rahil Singhi on 2026-03-04, significantly enhances the outreach capabilities of the system. It introduces a new Python script located at `cli/gmail_drafts.py`.

**Key Features and Implementation:**
-   **Real Gmail Draft Creation:** The `gmail_drafts.py` script facilitates the creation of actual Gmail drafts using IMAP, ensuring they are visible and editable within the standard Gmail web interface or app.
-   **App Password Authentication:** Authentication is handled securely via a Gmail App Password, eliminating the need for complex OAuth 2.0 setups for programmatic access. The App Password is stored in a `.env` file, which is git-ignored for security.
-   **User Review Workflow:** Drafts are created for manual review and sending by the user, providing a crucial human-in-the-loop step for critical outreach communications.
-   **Pre-loaded Follow-up:** A specific follow-up draft for 'Rogers Leo (Mews)' was pre-loaded as an example, scheduled for 2026-03-06.
-   **Integration with `hospitality_outreach.py`:** The draft management functionality is integrated into `hospitality_outreach.py`, offering commands like `drafts-list`, `draft <id>`, and `drafts-all` for seamless management.

**Usage Example:**
To create a specific draft, such as the pre-loaded Mews Rogers follow-up, the command is:
`python cli/gmail_drafts.py --draft mews-rogers`

This functionality was developed with assistance from Claude Opus 4.6.

## Related

[[Career Datacenter]],[[Rahil Singhi]],[[Outreach Automation]],[[Hospitality Outreach]]
