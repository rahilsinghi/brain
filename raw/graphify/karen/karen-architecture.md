# Graph Report - /Users/rahilsinghi/Desktop/karen  (2026-04-17)

## Corpus Check
- Large corpus: 264 files · ~484,114 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 840 nodes · 1384 edges · 66 communities detected
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 101 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
1. `Personality` - 23 edges
2. `buildMergedSegmentation()` - 22 edges
3. `Escalation` - 20 edges
4. `Member` - 17 edges
5. `loadCorpus()` - 14 edges
6. `ChannelResult` - 13 edges
7. `GrievanceType` - 12 edges
8. `EscalationSpeed` - 12 edges
9. `EscalationStatus` - 12 edges
10. `TriggerRequest` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Return channels Karen can reach this member on.      Skips any contact field tha` --uses--> `Member`  [INFERRED]
  /Users/rahilsinghi/Desktop/karen/backend/services/channel_service.py → /Users/rahilsinghi/Desktop/karen/backend/models/schemas.py
- `Dispatch a message to the appropriate channel.` --uses--> `Member`  [INFERRED]
  /Users/rahilsinghi/Desktop/karen/backend/services/channel_service.py → /Users/rahilsinghi/Desktop/karen/backend/models/schemas.py
- `Call the configured LLM provider.` --uses--> `Personality`  [INFERRED]
  /Users/rahilsinghi/Desktop/karen/backend/services/personality_service.py → /Users/rahilsinghi/Desktop/karen/backend/models/schemas.py
- `Load and cache the personality markdown file.` --uses--> `Personality`  [INFERRED]
  /Users/rahilsinghi/Desktop/karen/backend/services/personality_service.py → /Users/rahilsinghi/Desktop/karen/backend/models/schemas.py
- `Strip markdown code fences from LLM output.` --uses--> `Personality`  [INFERRED]
  /Users/rahilsinghi/Desktop/karen/backend/services/personality_service.py → /Users/rahilsinghi/Desktop/karen/backend/models/schemas.py

## Communities

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (85): generate_commentary_audio(), generate_tts(), _get_client(), get_music_url(), get_random_quip(), _get_voice_id(), Generate commentary TTS for a specific level. Returns relative URL path., Pick a random pre-recorded quip mp3. Returns URL path or None if no quips exist. (+77 more)

### Community 1 - "Community 1"
Cohesion: 0.03
Nodes (0): 

### Community 2 - "Community 2"
Cohesion: 0.12
Nodes (33): addDiagnostics(), buildFont(), buildReadyReport(), classifyBreakMismatch(), configureControls(), estimateBrowserLineCount(), getBrowserLinesFromRange(), getBrowserLinesFromSpans() (+25 more)

### Community 3 - "Community 3"
Cohesion: 0.12
Nodes (33): analyzeText(), buildMergedSegmentation(), carryTrailingForwardStickyAcrossCJKBoundary(), classifySegmentBreakChar(), compileAnalysisChunks(), containsArabicScript(), endsWithArabicNoSpacePunctuation(), endsWithClosingQuote() (+25 more)

### Community 4 - "Community 4"
Cohesion: 0.11
Nodes (24): buildLayout(), commitFrame(), easeSpin(), evaluateLayout(), fitHeadlineFontSize(), getLogoAnimation(), getLogoProjection(), getObstacleIntervals() (+16 more)

### Community 5 - "Community 5"
Cohesion: 0.12
Nodes (24): buildLineTextFromRange(), clearCache(), createEmptyPrepared(), createLayoutLine(), getInternalPrepared(), getLineTextCache(), getSegmentGraphemes(), getSharedGraphemeSegmenter() (+16 more)

### Community 6 - "Community 6"
Cohesion: 0.17
Nodes (17): buildReport(), classifyBreakMismatch(), describeBoundary(), getBrowserLines(), getFirstBreakMismatch(), getJoinedTextDiff(), getJoinedTextMismatchOffset(), getOurLines() (+9 more)

### Community 7 - "Community 7"
Cohesion: 0.17
Nodes (20): acquireBrowserAutomationLock(), canReachUrl(), connectFirefoxBidi(), createBrowserSession(), createChromeSession(), createFirefoxSession(), createSafariSession(), ensurePageServer() (+12 more)

### Community 8 - "Community 8"
Cohesion: 0.19
Nodes (19): buildCanvasColumnFrame(), buildDemoFrame(), buildMeasuredLineFromCandidateRange(), buildMeasuredLineFromLayoutResult(), computeMetrics(), finalizeMeasuredLine(), getDisplaySpacing(), getLineStatsFromBreakCandidates() (+11 more)

### Community 9 - "Community 9"
Cohesion: 0.17
Nodes (16): carveTextLineSlots(), circleIntervalForBand(), clearQueuedPointerEvents(), enterTextSelectionMode(), fitHeadline(), hasActiveTextSelection(), hitTestOrbs(), isTextSelectionInteractionActive() (+8 more)

### Community 10 - "Community 10"
Cohesion: 0.18
Nodes (20): applyColumnWidths(), applyControls(), createCanvasSurface(), createCssParagraphs(), createDomCache(), createMetricPanel(), createMetricRow(), ensureRiverMarkCount() (+12 more)

### Community 11 - "Community 11"
Cohesion: 0.14
Nodes (14): ABC, AnthropicProvider, get_provider(), get_provider_name(), LLMProvider, OllamaProvider, LLM provider abstraction for Karen's personality service.  Toggle between Anthro, Switch the active provider at runtime. Takes effect on next generate() call. (+6 more)

### Community 12 - "Community 12"
Cohesion: 0.24
Nodes (13): countEmojiGraphemes(), getCorrectedSegmentWidth(), getEmojiCorrection(), getEmojiCount(), getFontMeasurementState(), getMeasureContext(), getSegmentGraphemePrefixWidths(), getSegmentGraphemeWidths() (+5 more)

### Community 13 - "Community 13"
Cohesion: 0.22
Nodes (15): ChannelResult, get_available_channels(), _is_filled(), Return channels Karen can reach this member on.      Skips any contact field tha, Dispatch a message to the appropriate channel., _send_calendar(), send_channel(), _send_discord() (+7 more)

### Community 14 - "Community 14"
Cohesion: 0.3
Nodes (11): canBreakAfter(), countPreparedLines(), countPreparedLinesSimple(), findChunkIndexForStart(), getTabAdvance(), isSimpleCollapsibleSpace(), layoutNextLineRange(), layoutNextLineRangeSimple() (+3 more)

### Community 15 - "Community 15"
Cohesion: 0.27
Nodes (11): classifyBreakMismatch(), getBrowserLines(), getBrowserLinesFromRange(), getBrowserLinesFromSpans(), getFirstBreakMismatch(), getPublicLines(), init(), publishReport() (+3 more)

### Community 16 - "Community 16"
Cohesion: 0.21
Nodes (12): _build_commentary_prompt(), _build_message_prompt(), _generate(), generate_message(), GeneratedMessage, _load_personality(), Result of personality service generation., Call the configured LLM provider. (+4 more)

### Community 17 - "Community 17"
Cohesion: 0.26
Nodes (8): bucketMismatches(), hasFlag(), parseBrowser(), parseNumberFlag(), parseOptionalNumberFlag(), parseOptions(), parseStringFlag(), printSummary()

### Community 18 - "Community 18"
Cohesion: 0.26
Nodes (8): cursorsMatch(), layoutInlineItems(), measureCollapsedSpaceWidth(), measureSingleLineWidth(), prepareInlineItems(), render(), renderBody(), scheduleRender()

### Community 19 - "Community 19"
Cohesion: 0.26
Nodes (8): formatRanges(), formatSignedInt(), hasFlag(), parseBrowser(), parseNumberFlag(), parseOptions(), parseStringFlag(), printSummary()

### Community 20 - "Community 20"
Cohesion: 0.21
Nodes (5): createFieldStamp(), getSpriteCanvas(), render(), splatFieldStamp(), spriteAlphaAt()

### Community 21 - "Community 21"
Cohesion: 0.4
Nodes (10): bench(), buildCorpusBenchmarks(), buildRichBenchmarks(), median(), nextFrame(), publishNavigationReport(), renderBenchmarkTable(), run() (+2 more)

### Community 22 - "Community 22"
Cohesion: 0.25
Nodes (6): cross(), getPolygonIntervalForBand(), getPolygonXsAtY(), getWrapHull(), makeConvexHull(), makeWrapHull()

### Community 23 - "Community 23"
Cohesion: 0.33
Nodes (9): boot(), getAccordionItemNodes(), getFontFromStyles(), getRequiredElement(), initializeStaticContent(), parsePx(), refreshPrepared(), render() (+1 more)

### Community 24 - "Community 24"
Cohesion: 0.18
Nodes (0): 

### Community 25 - "Community 25"
Cohesion: 0.24
Nodes (3): render(), scheduleRender(), updateBubbles()

### Community 26 - "Community 26"
Cohesion: 0.24
Nodes (3): parseNumberFlag(), parseOptionalNumberFlag(), parseStringFlag()

### Community 27 - "Community 27"
Cohesion: 0.24
Nodes (3): parseNumberFlag(), parseOptionalNumberFlag(), parseStringFlag()

### Community 28 - "Community 28"
Cohesion: 0.29
Nodes (6): delete_member(), get_member(), get_member_by_id(), get_member_channels(), load_members(), update_member()

### Community 29 - "Community 29"
Cohesion: 0.36
Nodes (7): bucketMismatches(), parseBrowser(), parseNumberFlag(), parseOptionalNumberFlag(), parseOptions(), parseStringFlag(), printSummary()

### Community 30 - "Community 30"
Cohesion: 0.27
Nodes (5): isWideCharacter(), measureWidth(), parseFontSize(), TestCanvasRenderingContext2D, TestOffscreenCanvas

### Community 31 - "Community 31"
Cohesion: 0.31
Nodes (5): canReachServer(), formatDiff(), printReport(), sleep(), waitForServer()

### Community 32 - "Community 32"
Cohesion: 0.31
Nodes (6): getBrowserLines(), publishReport(), render(), runSweep(), toNavigationReport(), withRequestId()

### Community 33 - "Community 33"
Cohesion: 0.57
Nodes (7): createProject(), installTarball(), packPackage(), run(), smokeJavaScriptEsm(), smokeTypeScript(), tscBinaryName()

### Community 34 - "Community 34"
Cohesion: 0.39
Nodes (6): buildProbeUrl(), parseNumberFlag(), parseStringFlag(), printCaseResult(), reportIsExact(), runBrowser()

### Community 35 - "Community 35"
Cohesion: 0.29
Nodes (6): ManualPaymentConfirm, payment_confirm(), Receive Venmo payment notification.      Checks active escalations to see if the, Manual payment confirmation from the dashboard., venmo_webhook(), VenmoWebhookPayload

### Community 36 - "Community 36"
Cohesion: 0.29
Nodes (0): 

### Community 37 - "Community 37"
Cohesion: 0.43
Nodes (3): collectWrapMetrics(), computeBubbleRender(), findTightWrapMetrics()

### Community 38 - "Community 38"
Cohesion: 0.43
Nodes (6): get_research(), get_research_steps(), _load_cache(), Look up pre-cached research for a target member., Return (step_text, pause_ms_after) pairs for the research animation.      Defaul, ResearchResult

### Community 39 - "Community 39"
Cohesion: 0.47
Nodes (3): parseNumberFlag(), parseStringFlag(), requireFlag()

### Community 40 - "Community 40"
Cohesion: 0.47
Nodes (3): getHashParams(), readNavigationPhaseState(), readNavigationReportText()

### Community 41 - "Community 41"
Cohesion: 0.33
Nodes (0): 

### Community 42 - "Community 42"
Cohesion: 0.7
Nodes (4): clearNavigationReport(), publishNavigationPhase(), publishNavigationReport(), replaceNavigationHash()

### Community 43 - "Community 43"
Cohesion: 0.5
Nodes (4): get_auth_token(), get_rate_quote(), Get OAuth token from FedEx sandbox., Get overnight delivery rate from Karen's address to target.      Returns (rate,

### Community 44 - "Community 44"
Cohesion: 0.5
Nodes (2): parseNumberFlag(), parseStringFlag()

### Community 45 - "Community 45"
Cohesion: 0.7
Nodes (4): moveBuiltHtml(), rebaseRelativeAssetUrls(), resolveBuiltHtmlPath(), rewriteDemoLinksForStaticRoot()

### Community 46 - "Community 46"
Cohesion: 0.7
Nodes (4): computeLayout(), getOrCreateCardNode(), render(), scheduleRender()

### Community 47 - "Community 47"
Cohesion: 0.5
Nodes (2): parseNumberFlag(), parseStringFlag()

### Community 48 - "Community 48"
Cohesion: 0.4
Nodes (4): delete_message(), post_message(), Post a message to #karen-escalations.      Returns (success, detail, message_ts), Delete a Slack message by its timestamp.

### Community 49 - "Community 49"
Cohesion: 0.5
Nodes (4): generate_letter_pdf(), generate_qr_code(), Generate a QR code as a base64-encoded PNG data URI., Render the formal letter template to a print-ready PDF with QR code.

### Community 50 - "Community 50"
Cohesion: 0.4
Nodes (0): 

### Community 51 - "Community 51"
Cohesion: 0.4
Nodes (4): create_event(), delete_event(), Create a Google Calendar event inviting the target.      Returns (success, detai, Delete a Google Calendar event.

### Community 52 - "Community 52"
Cohesion: 0.83
Nodes (3): render(), scheduleCssOverlaySync(), scheduleRender()

### Community 53 - "Community 53"
Cohesion: 0.83
Nodes (3): formatSegmentMarkers(), formatWidth(), printReport()

### Community 54 - "Community 54"
Cohesion: 0.83
Nodes (3): classifyChar(), computeBidiLevels(), computeSegmentLevels()

### Community 55 - "Community 55"
Cohesion: 0.67
Nodes (2): Serve audio files (quips, commentary, music)., serve_audio()

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

### Community 62 - "Community 62"
Cohesion: 1.0
Nodes (0): 

### Community 63 - "Community 63"
Cohesion: 1.0
Nodes (0): 

### Community 64 - "Community 64"
Cohesion: 1.0
Nodes (0): 

### Community 65 - "Community 65"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **20 isolated node(s):** `Receive Venmo payment notification.      Checks active escalations to see if the`, `Manual payment confirmation from the dashboard.`, `Serve audio files (quips, commentary, music).`, `Look up pre-cached research for a target member.`, `Return (step_text, pause_ms_after) pairs for the research animation.      Defaul` (+15 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 56`** (2 nodes): `generate_quips.py`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 57`** (2 nodes): `report-server.ts`, `startPostedReportServer()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 58`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 59`** (1 nodes): `next.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 60`** (1 nodes): `__init__.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 61`** (1 nodes): `svg.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 62`** (1 nodes): `justification-comparison.data.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 63`** (1 nodes): `dynamic-layout-text.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 64`** (1 nodes): `text-modules.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 65`** (1 nodes): `test-data.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Personality` connect `Community 0` to `Community 16`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `Member` connect `Community 0` to `Community 13`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Are the 20 inferred relationships involving `Personality` (e.g. with `Push an SSE event to all subscribers and buffer in event history.` and `Create a new subscriber queue for SSE streaming.`) actually correct?**
  _`Personality` has 20 INFERRED edges - model-reasoned connections that need verification._
- **Are the 18 inferred relationships involving `Escalation` (e.g. with `Push an SSE event to all subscribers and buffer in event history.` and `Create a new subscriber queue for SSE streaming.`) actually correct?**
  _`Escalation` has 18 INFERRED edges - model-reasoned connections that need verification._
- **Are the 15 inferred relationships involving `Member` (e.g. with `Called once at startup to hydrate the in-memory store.` and `Used by other services to look up a member.`) actually correct?**
  _`Member` has 15 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Receive Venmo payment notification.      Checks active escalations to see if the`, `Manual payment confirmation from the dashboard.`, `Serve audio files (quips, commentary, music).` to the rest of the system?**
  _20 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._