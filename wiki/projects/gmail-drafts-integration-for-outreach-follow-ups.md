---
title: Gmail Drafts Integration for Outreach Follow-ups
author: ai
created_at: 2026-04-12T22:00:52.580Z
last_ai_edit: 2026-04-12T22:00:52.580Z
last_human_edit: null
last_embedded_hash: 2d6a999deed8232d
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-gmail-drafts-integration-for-outreach-follow-u-bd8a6c.md]]"
tags:
  - gmail
  - email
  - outreach
  - follow-up
  - automation
  - cli
  - career-datacenter
  - imap
  - app password
  - python
---


# Gmail Drafts Integration for Outreach Follow-ups

This update introduces a Gmail Drafts integration within the Career-Datacenter project, enabling the creation of real Gmail drafts via IMAP using an App Password. This feature allows users to review follow-up emails in their Gmail UI before sending, bypassing OAuth setup for quick outreach.

## Key Concepts

[[Gmail Drafts]],[[IMAP]],[[App Password]],Outreach Follow-ups,[[Command Line Interface (CLI)]],Environment Variables (.env)

## Details

A new Python script, `cli/gmail_drafts.py`, has been developed to facilitate the creation of real Gmail drafts. This system leverages the Internet Message Access Protocol (IMAP) for communication with Gmail and authenticates using a specific App Password, eliminating the need for complex OAuth configurations.

The primary benefit of this approach is that generated drafts appear directly in the user's Gmail UI, allowing for a final review and personalization before they are sent. This ensures human oversight in the outreach process.

The integration extends to `hospitality_outreach.py`, providing several command-line functionalities:
*   `drafts-list`: To view available draft templates.
*   `draft <id>`: To generate a specific draft by its ID.
*   `drafts-all`: To generate all pending drafts.

An example usage demonstrated is `python cli/gmail_drafts.py --draft mews-rogers`, which would pre-load a follow-up draft for 'Rogers Leo (Mews)' due on 2026-03-06. The sensitive App Password is securely stored in a `.env` file, which is git-ignored to prevent accidental exposure.

## Related

[[Career-Datacenter]],[[Career-Datacenter Outreach Analysis: Hospitality Tech Job Search Campaign]],[[Automated Email Digest System]],[[weekly_report.py Script for Job Search Summary]],[[Add .env.example and tests/conftest.py for Onboarding Polish in Career-Datacenter]],[[Claude Opus]]
