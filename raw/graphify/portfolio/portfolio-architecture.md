# Graph Report - /Users/rahilsinghi/Desktop/portfolio  (2026-04-17)

## Corpus Check
- Large corpus: 190 files · ~821,893 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 674 nodes · 1029 edges · 62 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
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

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (0): 

### Community 1 - "Community 1"
Cohesion: 0.12
Nodes (33): addDiagnostics(), buildFont(), buildReadyReport(), classifyBreakMismatch(), configureControls(), estimateBrowserLineCount(), getBrowserLinesFromRange(), getBrowserLinesFromSpans() (+25 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (0): 

### Community 3 - "Community 3"
Cohesion: 0.12
Nodes (33): analyzeText(), buildMergedSegmentation(), carryTrailingForwardStickyAcrossCJKBoundary(), classifySegmentBreakChar(), compileAnalysisChunks(), containsArabicScript(), endsWithArabicNoSpacePunctuation(), endsWithClosingQuote() (+25 more)

### Community 4 - "Community 4"
Cohesion: 0.11
Nodes (24): buildLayout(), commitFrame(), easeSpin(), evaluateLayout(), fitHeadlineFontSize(), getLogoAnimation(), getLogoProjection(), getObstacleIntervals() (+16 more)

### Community 5 - "Community 5"
Cohesion: 0.14
Nodes (24): buildLineTextFromRange(), clearCache(), createEmptyPrepared(), createLayoutLine(), getInternalPrepared(), getLineTextCache(), getSegmentGraphemes(), getSharedGraphemeSegmenter() (+16 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (0): 

### Community 7 - "Community 7"
Cohesion: 0.17
Nodes (17): buildReport(), classifyBreakMismatch(), describeBoundary(), getBrowserLines(), getFirstBreakMismatch(), getJoinedTextDiff(), getJoinedTextMismatchOffset(), getOurLines() (+9 more)

### Community 8 - "Community 8"
Cohesion: 0.17
Nodes (20): acquireBrowserAutomationLock(), canReachUrl(), connectFirefoxBidi(), createBrowserSession(), createChromeSession(), createFirefoxSession(), createSafariSession(), ensurePageServer() (+12 more)

### Community 9 - "Community 9"
Cohesion: 0.19
Nodes (19): buildCanvasColumnFrame(), buildDemoFrame(), buildMeasuredLineFromCandidateRange(), buildMeasuredLineFromLayoutResult(), computeMetrics(), finalizeMeasuredLine(), getDisplaySpacing(), getLineStatsFromBreakCandidates() (+11 more)

### Community 10 - "Community 10"
Cohesion: 0.17
Nodes (16): carveTextLineSlots(), circleIntervalForBand(), clearQueuedPointerEvents(), enterTextSelectionMode(), fitHeadline(), hasActiveTextSelection(), hitTestOrbs(), isTextSelectionInteractionActive() (+8 more)

### Community 11 - "Community 11"
Cohesion: 0.18
Nodes (20): applyColumnWidths(), applyControls(), createCanvasSurface(), createCssParagraphs(), createDomCache(), createMetricPanel(), createMetricRow(), ensureRiverMarkCount() (+12 more)

### Community 12 - "Community 12"
Cohesion: 0.24
Nodes (13): countEmojiGraphemes(), getCorrectedSegmentWidth(), getEmojiCorrection(), getEmojiCount(), getFontMeasurementState(), getMeasureContext(), getSegmentGraphemePrefixWidths(), getSegmentGraphemeWidths() (+5 more)

### Community 13 - "Community 13"
Cohesion: 0.3
Nodes (11): canBreakAfter(), countPreparedLines(), countPreparedLinesSimple(), findChunkIndexForStart(), getTabAdvance(), isSimpleCollapsibleSpace(), layoutNextLineRange(), layoutNextLineRangeSimple() (+3 more)

### Community 14 - "Community 14"
Cohesion: 0.27
Nodes (11): classifyBreakMismatch(), getBrowserLines(), getBrowserLinesFromRange(), getBrowserLinesFromSpans(), getFirstBreakMismatch(), getPublicLines(), init(), publishReport() (+3 more)

### Community 15 - "Community 15"
Cohesion: 0.21
Nodes (6): embedText(), embedTexts(), getContentEmbeddings(), semanticSearch(), checkRateLimit(), POST()

### Community 16 - "Community 16"
Cohesion: 0.21
Nodes (6): cross(), getPolygonIntervalForBand(), getPolygonXsAtY(), getWrapHull(), makeConvexHull(), makeWrapHull()

### Community 17 - "Community 17"
Cohesion: 0.26
Nodes (8): bucketMismatches(), hasFlag(), parseBrowser(), parseNumberFlag(), parseOptionalNumberFlag(), parseOptions(), parseStringFlag(), printSummary()

### Community 18 - "Community 18"
Cohesion: 0.26
Nodes (8): cursorsMatch(), layoutInlineItems(), measureCollapsedSpaceWidth(), measureSingleLineWidth(), prepareInlineItems(), render(), renderBody(), scheduleRender()

### Community 19 - "Community 19"
Cohesion: 0.21
Nodes (5): createFieldStamp(), getSpriteCanvas(), render(), splatFieldStamp(), spriteAlphaAt()

### Community 20 - "Community 20"
Cohesion: 0.26
Nodes (8): formatRanges(), formatSignedInt(), hasFlag(), parseBrowser(), parseNumberFlag(), parseOptions(), parseStringFlag(), printSummary()

### Community 21 - "Community 21"
Cohesion: 0.4
Nodes (10): bench(), buildCorpusBenchmarks(), buildRichBenchmarks(), median(), nextFrame(), publishNavigationReport(), renderBenchmarkTable(), run() (+2 more)

### Community 22 - "Community 22"
Cohesion: 0.33
Nodes (9): boot(), getAccordionItemNodes(), getFontFromStyles(), getRequiredElement(), initializeStaticContent(), parsePx(), refreshPrepared(), render() (+1 more)

### Community 23 - "Community 23"
Cohesion: 0.27
Nodes (5): isWideCharacter(), measureWidth(), parseFontSize(), TestCanvasRenderingContext2D, TestOffscreenCanvas

### Community 24 - "Community 24"
Cohesion: 0.24
Nodes (3): render(), scheduleRender(), updateBubbles()

### Community 25 - "Community 25"
Cohesion: 0.24
Nodes (3): parseNumberFlag(), parseOptionalNumberFlag(), parseStringFlag()

### Community 26 - "Community 26"
Cohesion: 0.36
Nodes (7): bucketMismatches(), parseBrowser(), parseNumberFlag(), parseOptionalNumberFlag(), parseOptions(), parseStringFlag(), printSummary()

### Community 27 - "Community 27"
Cohesion: 0.24
Nodes (3): parseNumberFlag(), parseOptionalNumberFlag(), parseStringFlag()

### Community 28 - "Community 28"
Cohesion: 0.31
Nodes (6): getBrowserLines(), publishReport(), render(), runSweep(), toNavigationReport(), withRequestId()

### Community 29 - "Community 29"
Cohesion: 0.31
Nodes (5): canReachServer(), formatDiff(), printReport(), sleep(), waitForServer()

### Community 30 - "Community 30"
Cohesion: 0.39
Nodes (6): buildProbeUrl(), parseNumberFlag(), parseStringFlag(), printCaseResult(), reportIsExact(), runBrowser()

### Community 31 - "Community 31"
Cohesion: 0.57
Nodes (7): createProject(), installTarball(), packPackage(), run(), smokeJavaScriptEsm(), smokeTypeScript(), tscBinaryName()

### Community 32 - "Community 32"
Cohesion: 0.29
Nodes (0): 

### Community 33 - "Community 33"
Cohesion: 0.43
Nodes (3): collectWrapMetrics(), computeBubbleRender(), findTightWrapMetrics()

### Community 34 - "Community 34"
Cohesion: 0.47
Nodes (3): parseNumberFlag(), parseStringFlag(), requireFlag()

### Community 35 - "Community 35"
Cohesion: 0.47
Nodes (3): getHashParams(), readNavigationPhaseState(), readNavigationReportText()

### Community 36 - "Community 36"
Cohesion: 0.33
Nodes (0): 

### Community 37 - "Community 37"
Cohesion: 0.4
Nodes (0): 

### Community 38 - "Community 38"
Cohesion: 0.7
Nodes (4): clearNavigationReport(), publishNavigationPhase(), publishNavigationReport(), replaceNavigationHash()

### Community 39 - "Community 39"
Cohesion: 0.5
Nodes (2): parseNumberFlag(), parseStringFlag()

### Community 40 - "Community 40"
Cohesion: 0.5
Nodes (2): parseNumberFlag(), parseStringFlag()

### Community 41 - "Community 41"
Cohesion: 0.7
Nodes (4): computeLayout(), getOrCreateCardNode(), render(), scheduleRender()

### Community 42 - "Community 42"
Cohesion: 0.7
Nodes (4): moveBuiltHtml(), rebaseRelativeAssetUrls(), resolveBuiltHtmlPath(), rewriteDemoLinksForStaticRoot()

### Community 43 - "Community 43"
Cohesion: 0.83
Nodes (3): classifyChar(), computeBidiLevels(), computeSegmentLevels()

### Community 44 - "Community 44"
Cohesion: 0.83
Nodes (3): render(), scheduleCssOverlaySync(), scheduleRender()

### Community 45 - "Community 45"
Cohesion: 0.83
Nodes (3): formatSegmentMarkers(), formatWidth(), printReport()

### Community 46 - "Community 46"
Cohesion: 1.0
Nodes (0): 

### Community 47 - "Community 47"
Cohesion: 1.0
Nodes (0): 

### Community 48 - "Community 48"
Cohesion: 1.0
Nodes (0): 

### Community 49 - "Community 49"
Cohesion: 1.0
Nodes (0): 

### Community 50 - "Community 50"
Cohesion: 1.0
Nodes (0): 

### Community 51 - "Community 51"
Cohesion: 1.0
Nodes (0): 

### Community 52 - "Community 52"
Cohesion: 1.0
Nodes (0): 

### Community 53 - "Community 53"
Cohesion: 1.0
Nodes (0): 

### Community 54 - "Community 54"
Cohesion: 1.0
Nodes (0): 

### Community 55 - "Community 55"
Cohesion: 1.0
Nodes (0): 

### Community 56 - "Community 56"
Cohesion: 1.0
Nodes (0): 

### Community 57 - "Community 57"
Cohesion: 1.0
Nodes (0): 

### Community 58 - "Community 58"
Cohesion: 1.0
Nodes (0): 

### Community 59 - "Community 59"
Cohesion: 1.0
Nodes (0): 

### Community 60 - "Community 60"
Cohesion: 1.0
Nodes (0): 

### Community 61 - "Community 61"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **Thin community `Community 46`** (2 nodes): `sitemap.ts`, `sitemap()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 47`** (2 nodes): `TiltCard.tsx`, `TiltCard()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 48`** (2 nodes): `CursorGlow.tsx`, `CursorGlow()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 49`** (2 nodes): `MagneticButton.tsx`, `MagneticButton()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 50`** (2 nodes): `robots.ts`, `robots()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 51`** (2 nodes): `report-server.ts`, `startPostedReportServer()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 52`** (2 nodes): `not-found.tsx`, `NotFound()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 53`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 54`** (1 nodes): `next.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 55`** (1 nodes): `svg.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 56`** (1 nodes): `justification-comparison.data.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 57`** (1 nodes): `dynamic-layout-text.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 58`** (1 nodes): `text-modules.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 59`** (1 nodes): `test-data.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 60`** (1 nodes): `bio.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 61`** (1 nodes): `MorphingNumber.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
- **Should `Community 5` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._
- **Should `Community 6` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._