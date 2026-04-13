---
title: "Portfolio Site V2 Feature Update: RAG Chat and Visual Enhancements"
author: ai
created_at: 2026-04-10T18:17:10.079Z
last_ai_edit: 2026-04-10T18:17:10.079Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-complete-portfolio-site-with-animations-rag-chat-a-096d68.md]]"
tags:
  - portfolio
  - frontend
  - fullstack
  - rag
  - llm
  - gemini
  - d3js
  - animations
  - ui/ux
  - web development
  - personal project
  - rahil singhi
  - brutalist
  - typescript
---

# Portfolio Site V2 Feature Update: RAG Chat and Visual Enhancements

This significant update to Rahil Singhi's portfolio site introduces a refined brutalist design and a suite of interactive features. Key additions include an interactive D3.js knowledge graph and a RAG-powered terminal chat utilizing Gemini embeddings for intelligent responses. The update also integrates various scroll-triggered animations and UI effects to enhance user engagement and visual appeal.

## Key Concepts

D3.js,Retrieval-Augmented Generation (RAG),Gemini (LLM),ScrollReveal,Brutalist Design,Semantic Search,Knowledge Graph,Frontend Development,UI/UX Design,API Design,Content Management

## Details

This feature update (`feat: complete portfolio site with animations, RAG chat, and visual upgrades`) for the `rahilsinghi/portfolio` repository (SHA: `b9be641`, commit date: `2026-03-11T22:31:48Z`) by Rahil Singhi involved 34 file changes, adding approximately 3600 lines of code and removing 84.

Key features and enhancements introduced in this update include:

*   **Design & Aesthetics**:
    *   **Editorial Brutalist Design**: Characterized by a stark black background with striking green accents, utilizing `Outfit` and `JetBrains Mono` fonts for a distinct and modern visual identity.
*   **Interactive Features**:
    *   **Interactive D3.js Knowledge Graph**: A dynamically rendered knowledge graph on a canvas, showcasing over 40 skill nodes, providing a visual and interactive representation of the author's expertise.
    *   **Terminal Chat with RAG**: An innovative chat interface designed like a terminal, powered by Gemini embeddings for Retrieval-Augmented Generation (RAG) and Gemini Flash for efficient answer generation. The `/api/chat` endpoint is robustly rate-limited and integrates semantic search with LLM capabilities.
*   **Animations & UI Effects**:
    *   **Scroll-Triggered Animations**: Implemented using the **ScrollReveal** system, featuring 6 distinct animation types to create an engaging and dynamic scrolling experience.
    *   **Text Scramble Decode Effect**: A unique visual effect applied to section headers, where text appears to decode as it comes into view.
    *   **Persistent Bottom Marquee Ticker**: A continuously scrolling ticker at the bottom of the page displaying key skills and keywords.
    *   **Cursor Glow Follow Effect**: A desktop-only visual enhancement where a glowing effect follows the user's cursor.
    *   **Scroll Progress Bar**: A visual indicator that tracks the user's reading progress through the page.
*   **Site Structure & Content**:
    *   **Mobile Hamburger Navigation**: Features a full-screen overlay for an intuitive and responsive navigation experience on mobile devices.
    *   **LinkedIn Posts Section**: A dedicated area for showcasing recent content and activity from LinkedIn.
    *   **Content Architecture**: All textual content across the site is centrally managed and organized within `/src/content/*.ts` files for easy updates and maintenance.

## Related

[[Rahil Singhi]],[[Portfolio Site]],[[Retrieval-Augmented Generation (RAG)]],[[Gemini (LLM)]],[[D3.js]],[[ScrollReveal.js]],[[Brutalist Web Design]]
