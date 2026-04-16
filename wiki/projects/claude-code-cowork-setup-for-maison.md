---
title: Claude Code & Cowork Setup for Maison
author: ai
created_at: 2026-04-15T19:44:23.264Z
last_ai_edit: 2026-04-15T19:44:23.264Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/api/articles/maison-notion-claude-code-cowork-setup-account-structur-1776280632892.md]]"
tags:
  - claude
  - ai
  - maison
  - setup
  - anthropic
  - coding
  - cowork
  - teams
  - engineering
  - commercial
  - github
---

# Claude Code & Cowork Setup for Maison

This article outlines the strategy and infrastructure for integrating Claude AI tools, specifically Claude Code and Claude Cowork, within Maison. It details the account structure, key benefits of the Teams Plan, engineering strategy for AI coding, and commercial team strategy for automating workflows.

## Key Concepts

[[Claude Code]],[[Claude Cowork]],Anthropic API,Mono-repo,SSO (Single Sign-On),CLAUDE.md

## Details

This document details the setup and strategy for utilizing Claude AI services within Maison, encompassing both development and commercial operations.

### Account Structure
Maison employs a tiered account structure for Claude AI services:

*   **Tier 1: Claude Teams Plan**
    *   Cost: ~$25/person/month + $25 premium add-on.
    *   Users: Approximately 5-6 people.
    *   Management: Via claude.ai Org Settings.
    *   Authentication: [[SSO]] with `@maison.cx` domain.
*   **Tier 2: Individual Pro**
    *   Cost: $20/person/month.
    *   Expensed by Maison.
*   **Total Monthly Cost**: ~$400-500 for approximately 9 people.

### Key Benefits of Teams Plan
The Claude Teams Plan offers several advantages for Maison:

*   Centralized billing.
*   Admin controls (with [[Fredrik Sjoberg]] designated as admin).
*   [[SSO]] and domain capture, ensuring all `@maison.cx` users automatically join the organization.
*   Guaranteed no model training on confidential company content.
*   Integrations with [[Slack]] and Microsoft 365.
*   Comprehensive usage visibility.

### Engineering Strategy
The engineering team at Maison adopts the following strategy for AI integration:

*   **Primary AI Coding Tool**: [[Claude Code]].
*   **Repository Setup**: A mono-repo setup facilitated by Sandeep.
*   **API Migration**: Evaluate and migrate from [[OpenAI]] to [[Anthropic API]] on a case-by-case basis.
*   **Usage Tracking**: Monitor usage through Claude Organization Settings.

### Commercial Team Strategy (Cowork)
The commercial team leverages [[Claude Cowork]] for various business functions:

*   **Application**: Install the Claude Cowork desktop application.
*   **Use Cases**: Automating client setup, streamlining sales outreach, summarizing materials, and enhancing communication workflows.
*   **Reporting**: Share weekly wins and blockers via [[Slack]].

### Sales-Skills Repository
A dedicated `sales-skills` [[GitHub]] repository serves as the single source of truth for Cowork skills:

*   **Workflow**: Changes are described to [[Claude Code]], which then creates a new branch, pushes changes to [[GitHub]], and awaits review and merge by team members.
*   **Safety Mechanism**: A [[CLAUDE.md]] file instructs Claude to always create branches and never commit directly to the `main` branch.
*   **Pulling Latest Changes**: Users can simply instruct Claude Code to "pull the latest from [[GitHub]]".
*   **Infrastructure**: Comprises one [[GitHub]] repository, local clones on each machine, and a `CLAUDE.md` file at the root.

### Claude Apps Ecosystem
Claude services are accessible through various applications:

*   **Desktop App**: Integrates Chat, Cowork, and Code modes.
*   **Web**: claude.ai.
*   **Mobile**: iOS & Android applications.
*   **Developer Console**: console.anthropic.com for API keys, usage monitoring, and workbench access.
*   **Connectors**: Integrations with [[Notion]], [[Google Workspace]], Linear, [[Slack]], and Chrome.

## Related

[[Call Preparation for Maison and Fredrik Sjoberg]],[[CLAUDE.md]],[[Slack]],[[GitHub]],[[Anthropic API]],[[Fredrik Sjoberg]],[[Notion]],[[Google Workspace]],[[SSO]],[[OpenAI]]
