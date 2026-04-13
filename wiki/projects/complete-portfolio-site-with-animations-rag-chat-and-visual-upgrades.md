---
title: Complete Portfolio Site with Animations, RAG Chat, and Visual Upgrades
author: ai
created_at: 2026-04-12T21:58:13.471Z
last_ai_edit: 2026-04-12T21:58:13.471Z
last_human_edit: null
last_embedded_hash: 89d0879bdd9184bd
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-complete-portfolio-site-with-animations-rag-chat-a-096d68.md]]"
tags:
  - portfolio
  - website
  - frontend
  - design
  - d3.js
  - rag
  - gemini
  - llm
  - animation
  - brutalism
  - chat
  - interactive
---


# Complete Portfolio Site with Animations, RAG Chat, and Visual Upgrades

This commit details the completion of a personal portfolio website featuring a brutalist design with green accents. Key functionalities include an interactive D3.js knowledge graph, a terminal-based RAG chat system powered by Gemini, and various scroll-triggered animations.
The site integrates a persistent skill ticker, cursor glow effects, and a mobile-friendly hamburger navigation, with all content managed through a structured architecture and an API for chat interactions.

## Key Concepts

[[Editorial Brutalist Design]],[[D3.js]] Knowledge Graph,Canvas Rendering,[[RAG (Retrieval Augmented Generation)]],[[Gemini Embeddings]],[[Gemini Flash]],Scroll-Triggered Animations ([[ScrollReveal]]),Text Scramble Decode Effect,Marquee Ticker,Cursor Glow Effect,Mobile Hamburger Navigation,Scroll Progress Bar,Content Architecture,Rate-Limited API,[[Semantic Search]],[[LLM Generation]]

## Details

This commit (SHA: `b9be641`) by Rahil Singhi on 2026-03-11 introduces the complete personal portfolio site with a focus on interactive elements and a distinct visual style.

### Core Features and Design:

*   **Editorial Brutalist Design**: The site sports a black background with striking green accents, utilizing `Outfit` and `JetBrains Mono` fonts for a modern, functional aesthetic.
*   **Interactive D3.js Knowledge Graph**: A dynamically rendered D3.js knowledge graph on a canvas displays over 40 skill nodes, providing a visual representation of professional expertise.
*   **Terminal Chat**: An interactive chat interface, styled as a terminal, leverages [[Gemini Embeddings]] for retrieval-augmented generation (RAG) and uses [[Gemini Flash]] for generating responses.
*   **Scroll-Triggered Animations**: A comprehensive [[ScrollReveal]] system is implemented, featuring six distinct animation types that activate as the user scrolls through the content.
*   **Text Scramble Decode Effect**: Section headers incorporate a text scramble and decode effect, adding a dynamic visual flair.
*   **Persistent Bottom Marquee Ticker**: A continuous marquee ticker at the bottom of the screen cycles through skills and keywords.
*   **Cursor Glow Follow Effect**: On desktop devices, the user's cursor is accompanied by a subtle glow effect.
*   **Mobile Hamburger Navigation**: A responsive hamburger menu provides full-screen overlay navigation for mobile users.
*   **Scroll Progress Bar**: A visual indicator tracks the user's scroll progress through the page.
*   **LinkedIn Posts Section**: Dedicated section to showcase LinkedIn posts.

### Technical Implementation:

*   **Content Architecture**: All textual content is centrally managed within `/src/content/*.ts` files, promoting maintainability and organization.
*   **Rate-Limited Chat API**: The `/api/chat` endpoint is rate-limited and integrates [[semantic search]] with [[LLM Generation]] for robust and efficient chat interactions.

**Repository**: [[rahilsinghi/portfolio]]
**SHA**: `b9be641`
**Date**: `2026-03-11T22:31:48Z`
**Author**: [[Rahil Singhi]]
**Files changed**: 34
**Additions**: +3600
**Deletions**: -84

## Related

[[rahilsinghi/portfolio]],[[Portfolio]],[[D3.js]],[[RAG (Retrieval Augmented Generation)]],[[Gemini Embeddings]],[[Gemini Flash]],[[ScrollReveal]],[[LLM Generation]],[[Semantic Search]],[[Terminal Easter Eggs to Portfolio]],[[Add 3D Tilt Effect on Featured Project Cards]],[[Animated Login Modal and Chat Sidebar Transitions (raag)]],[[Add Code Typing Background and Morphing Numbers to Hackathon Section (Portfolio)]],[[Add Education Section with NYU and SSN Cards to Portfolio]],[[Adding Pretext Submodule and Dependency to Portfolio]],[[Adding Resume PDFs to Public Directory]],[[AskNYC Model Update: Gemini 2.5 Flash Native Audio]],[[Gemini Provider with Dual-Key Rotation and Auto-Fallback]],[[LLM Model Constants and Company Info Helper (Commit a9513cd)]],[[Chat History Feature (RAAG Project)]],[[Chat UI Animations with Framer Motion]],[[Brain Explorer Completion: Deep-Linking and Wikilink Navigation]],[[Brain-Explorer: Force Simulation & Node Dragging Design Specification]],[[Add UMAP-js for Graph Position Computation]],[[Scroll Velocity Effects to Portfolio]],[[Add Circuit Dividers, Magnetic Nav, Particle Field, Scroll-Draw Timeline, Scroll Velocity Effects to Portfolio]],[[LinkedIn Posts Section]]
