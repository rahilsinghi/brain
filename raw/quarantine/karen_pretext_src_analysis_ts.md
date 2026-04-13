---
status: quarantined
source_type: graphify
source_id: graphify:karen:karen_pretext_src_analysis_ts
ingested_at: 2026-04-13T16:05:19.402Z
parsed_at: 2026-04-13T16:05:19.402Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24xGHutPwm1ZssP3jNH"}
compile_progress: null
quarantined_at: 2026-04-13T16:15:33.005Z
---






---
title: "analysis.ts"
source_file: "/Users/rahilsinghi/Desktop/karen/pretext/src/analysis.ts"
repo: "karen"
community: 4
file_type: code
author: ai
tags: [code-architecture, karen]
---

# analysis.ts

**Repository:** karen
**File:** `/Users/rahilsinghi/Desktop/karen/pretext/src/analysis.ts`
**Community:** 4

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
