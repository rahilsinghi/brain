---
status: quarantined
source_type: graphify
source_id: graphify:portfolio:portfolio_pretext_src_analysis_ts
ingested_at: 2026-04-13T16:05:19.417Z
parsed_at: 2026-04-13T16:05:19.417Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca253Vq8v9bh8hBDVaEh1"}
compile_progress: null
quarantined_at: 2026-04-13T16:16:43.999Z
---






---
title: "analysis.ts"
source_file: "/Users/rahilsinghi/Desktop/portfolio/pretext/src/analysis.ts"
repo: "portfolio"
community: 3
file_type: code
author: ai
tags: [code-architecture, portfolio]
---

# analysis.ts

**Repository:** portfolio
**File:** `/Users/rahilsinghi/Desktop/portfolio/pretext/src/analysis.ts`
**Community:** 3

## Imports
- (none)

## Contains
- `getWhiteSpaceProfile()`
- `normalizeWhitespaceNormal()`
- `normalizeWhitespacePreWrap()`
- `getSharedWordSegmenter()`
- `clearAnalysisCaches()`
- `setAnalysisLocale()`
- `containsArabicScript()`
- `isCJK()`
- `isLeftStickyPunctuationSegment()`
- `isCJKLineStartProhibitedSegment()`
- `isForwardStickyClusterSegment()`
- `isEscapedQuoteClusterSegment()`
- `splitTrailingForwardStickyCluster()`
- `isRepeatedSingleCharRun()`
- `endsWithArabicNoSpacePunctuation()`
- `endsWithMyanmarMedialGlue()`
- `splitLeadingSpaceAndMarks()`
- `endsWithClosingQuote()`
- `classifySegmentBreakChar()`
- `splitSegmentByBreakKind()`
- `isTextRunBoundary()`
- `isUrlLikeRunStart()`
- `isUrlQueryBoundarySegment()`
- `mergeUrlLikeRuns()`
- `mergeUrlQueryRuns()`
- `segmentContainsDecimalDigit()`
- `isNumericRunSegment()`
- `mergeNumericRuns()`
- `mergeAsciiPunctuationChains()`
- `splitHyphenatedNumericRuns()`
- `mergeGlueConnectedTextRuns()`
- `carryTrailingForwardStickyAcrossCJKBoundary()`
- `buildMergedSegmentation()`
- `compileAnalysisChunks()`
- `analyzeText()`

## Calls
- (none)
