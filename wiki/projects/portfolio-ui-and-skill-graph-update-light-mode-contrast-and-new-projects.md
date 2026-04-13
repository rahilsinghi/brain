---
title: "Portfolio UI and Skill Graph Update: Light Mode Contrast and New Projects"
author: ai
created_at: 2026-04-12T22:18:11.590Z
last_ai_edit: 2026-04-12T22:18:11.590Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-fix-ui-boost-light-mode-contrast-add-new-projects-to-sk-2ff941.md]]"
tags:
  - portfolio
  - ui
  - ux
  - light mode
  - contrast
  - accessibility
  - skill graph
  - data visualization
  - projects
  - technologies
  - commit
---

# Portfolio UI and Skill Graph Update: Light Mode Contrast and New Projects

This commit enhances the portfolio's UI by boosting contrast in light mode for better readability and visual appeal. It also updates the skill graph to include new project nodes and associated technologies, reflecting recent work and expanded technical expertise.

## Key Concepts

[[User Interface (UI)]] Improvements,[[Light Mode]] Contrast,[[Accessibility]] (Contrast),[[Data Visualization]] (Skill Graph),[[Project Management]],[[Technology Stack]]

## Details

This commit (`ca944fc`) to the [[rahilsinghi/portfolio]] repository focuses on two main areas:

### Light Mode Enhancements
Improvements were made to increase contrast and readability in the portfolio's light mode:

*   **CSS Variables Darkening**: Muted and border CSS variables were darkened to ensure visible section dividers and text.
*   **Accent Green Deepening**: The accent green color was changed from `#00802A` to `#006B22` for increased vibrancy.
*   **Ticker Cards Inversion**: Ticker cards now feature a black background and light text to provide better contrast against a light page.
*   **KnowledgeGraph Label Fix**: Labels within the [[KnowledgeGraph]] canvas were made theme-aware, moving from a hardcoded `#F0EDE6`.
*   **Graph Edge and Node Outline Boost**: The alpha of graph edges and the visibility of node outlines were boosted in light mode.
*   **Hackathon Detail Text Opacity**: The opacity of hackathon detail text was increased from `/50-/65` to `/70-/90` for improved legibility.

### Skill Graph Updates
The skill graph was updated to reflect new projects and associated technologies:

*   **New Project Nodes Added**: [[Karen Project]], [[Flock Project]], [[Ask NYC]], and [[MarkPush]] project nodes were added to the graph.
*   **New Technology Nodes Added**: [[ElevenLabs]], [[Google ADK]], [[Vercel AI SDK]], [[Gemini Vision]], [[Twilio]], and [[Next.js]] technology nodes were incorporated.
*   **Wiring Project-to-Tech Edges**: All new project nodes were connected to their relevant technology nodes, along with new cross-skill relationships.

## Related

[[rahilsinghi/portfolio]],[[Rahil Singhi]],[[Claude Opus]],[[Karen Project]],[[Flock Project]],[[Ask NYC]],[[MarkPush]],[[ElevenLabs]],[[Google ADK]],[[Vercel AI SDK]],[[Gemini Vision]],[[Twilio]],[[Next.js]],[[KnowledgeGraph]]
