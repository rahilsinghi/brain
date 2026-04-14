---
title: Graph Report for Portfolio Project (2026-04-13)
author: ai
created_at: 2026-04-13T19:02:16.001Z
last_ai_edit: 2026-04-13T19:02:16.001Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/portfolio/portfolio/portfolio-architecture.md]]"
tags:
  - graph report
  - portfolio
  - code analysis
  - software development
  - project structure
  - god nodes
  - communities
  - knowledge gaps
---

# Graph Report for Portfolio Project (2026-04-13)

This graph report provides an analysis of the `portfolio` project's codebase, identifying 674 nodes, 1029 edges, and 62 communities. It notes a large corpus of ~821,893 words, suggesting that semantic extraction would be expensive, and highlights 'God Nodes' representing core abstractions within the project. The report also points out areas of low cohesion and 'thin communities' that may indicate noise or a need for further connection extraction.

## Key Concepts

Graph Report,Corpus Check,Semantic Extraction,AST-only Analysis,Nodes (Graph Theory),Edges (Graph Theory),Communities (Graph Theory),Cohesion (Graph Theory),God Nodes,Knowledge Gaps,Thin Community

## Details

This graph report was generated for the `/Users/rahilsinghi/Desktop/portfolio` project on 2026-04-13.

### Corpus Check
The project contains a large corpus of 190 files with approximately 821,893 words. The report warns that semantic extraction from such a large corpus would be expensive in terms of Claude tokens. It suggests considering running the analysis on a subfolder or using the `--no-semantic` flag to perform AST-only analysis.

### Summary
- **Nodes:** 674
- **Edges:** 1029
- **Communities Detected:** 62
- **Extraction:** 100% EXTRACTED, 0% INFERRED, 0% AMBIGUOUS
- **Token Cost:** 0 input, 0 output (indicating AST-only or cached analysis)

### God Nodes (most connected - core abstractions)
The most connected nodes, indicating core abstractions or highly utilized functions/modules, are:
1. `buildMergedSegmentation()` - 22 edges
2. `loadCorpus()` - 14 edges
3. `measureWidth()` - 9 edges
4. `commitFrame()` - 9 edges
5. `render()` - 9 edges
6. `addDiagnostics()` - 8 edges
7. `runSweep()` - 8 edges
8. `init()` - 8 edges
9. `buildReport()` - 8 edges
10. `run()` - 8 edges

### Surprising Connections
No surprising connections were detected; all identified connections are within the same source files.

### Communities
The report identifies 62 communities, with varying levels of cohesion. A selection of these communities and their key nodes include:

- **Community 1 (Cohesion: 0.12):** `addDiagnostics()`, `buildFont()`, `buildReadyReport()`, `classifyBreakMismatch()`, `configureControls()`, `estimateBrowserLineCount()`, `getBrowserLinesFromRange()`, `getBrowserLinesFromSpans()` (and 25 more nodes). This community appears to relate to diagnostic and browser-line estimation functionalities.
- **Community 3 (Cohesion: 0.12):** `analyzeText()`, `buildMergedSegmentation()`, `carryTrailingForwardStickyAcrossCJKBoundary()`, `classifySegmentBreakChar()`, `compileAnalysisChunks()`, `containsArabicScript()`, `endsWithArabicNoSpacePunctuation()`, `endsWithClosingQuote()` (and 25 more nodes). This community focuses on text analysis and segmentation, particularly for various script types.
- **Community 4 (Cohesion: 0.11):** `buildLayout()`, `commitFrame()`, `easeSpin()`, `evaluateLayout()`, `fitHeadlineFontSize()`, `getLogoAnimation()`, `getLogoProjection()`, `getObstacleIntervals()` (and 16 more nodes). This community is likely involved in layout building and animation.
- **Community 7 (Cohesion: 0.17):** `acquireBrowserAutomationLock()`, `canReachUrl()`, `connectFirefoxBidi()`, `createBrowserSession()`, `createChromeSession()`, `createFirefoxSession()`, `createSafariSession()`, `ensurePageServer()` (and 12 more nodes). This community suggests browser automation and session management.
- **Community 17 (Cohesion: 0.21):** `embedText()`, `embedTexts()`, `getContentEmbeddings()`, `semanticSearch()`, `checkRateLimit()`, `POST()`. This community clearly indicates a semantic search and embedding functionality, possibly involving external API calls.
- **Community 21 (Cohesion: 0.40):** `bench()`, `buildCorpusBenchmarks()`, `buildRichBenchmarks()`, `median()`, `nextFrame()`, `publishNavigationReport()`, `renderBenchmarkTable()`, `run()` (and 2 more nodes). This community points to benchmarking and reporting functionalities.

### Knowledge Gaps
Several 'thin communities' were identified as potential noise or areas needing more connections:
- **Community 46 (2 nodes):** `TiltCard.tsx`, `TiltCard()`
- **Community 47 (2 nodes):** `not-found.tsx`, `NotFound()`
- **Community 48 (2 nodes):** `sitemap.ts`, `sitemap()`
- **Community 49 (2 nodes):** `report-server.ts`, `startPostedReportServer()`
- **Community 50 (2 nodes):** `MagneticButton.tsx`, `MagneticButton()`
- **Community 51 (2 nodes):** `robots.ts`, `robots()`
- **Community 52 (2 nodes):** `CursorGlow.tsx`, `CursorGlow()`
- **Community 53 (1 node):** `next-env.d.ts`
- **Community 54 (1 node):** `next.config.ts`
- **Community 55 (1 node):** `svg.d.ts`
- **Community 56 (1 node):** `justification-comparison.data.ts`
- **Community 57 (1 node):** `dynamic-layout-text.ts`
- **Community 58 (1 node):** `text-modules.d.ts`
- **Community 59 (1 node):** `test-data.ts`
- **Community 60 (1 node):** `bio.ts`
- **Community 61 (1 node):** `MorphingNumber.tsx`

### Suggested Questions
The report suggests investigating several communities with low cohesion to determine if they should be split into smaller, more focused modules. These include:
- `Community 0` (Cohesion: 0.06)
- `Community 1` (Cohesion: 0.12)
- `Community 2` (Cohesion: 0.06)
- `Community 3` (Cohesion: 0.12)
- `Community 4` (Cohesion: 0.11)
- `Community 5` (Cohesion: 0.08)
- `Community 6` (Cohesion: 0.14)

## Related

[[rahilsinghi/portfolio]],[[Add 3D Tilt Effect on Featured Project Cards]],[[Custom Cursor with Expanding Ring (Portfolio)]],[[dynamic-layout-text.ts]],[[browser-automation.ts]],[[embedText]],[[semanticSearch]],[[API: POST /graph-push Endpoint for Graph Cache Rebuild and Explorer Update]],[[Graphify Venv Setup Script]],[[chore: update next-env.d.ts and tsconfig.json for Next.js 16]]
