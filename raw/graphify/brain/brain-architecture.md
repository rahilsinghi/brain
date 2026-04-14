# Graph Report - /Users/rahilsinghi/Desktop/brain  (2026-04-14)

## Corpus Check
- Large corpus: 3275 files · ~837,960 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 414 nodes · 353 edges · 143 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
1. `SeedLogger` - 12 edges
2. `VectorStore` - 8 edges
3. `appendDailyEntry()` - 5 edges
4. `JsonSyncStateStore` - 5 edges
5. `getAnthropicProvider()` - 4 edges
6. `getGeminiProvider()` - 4 edges
7. `getProvider()` - 4 edges
8. `generate()` - 4 edges
9. `generateCommunityDrop()` - 4 edges
10. `generateAllDrops()` - 4 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities

### Community 0 - "Community 0"
Cohesion: 0.12
Nodes (6): appendDailyEntry(), buildTemplate(), insertEntryIntoContent(), SeedLogger, timeStamp(), todayDate()

### Community 1 - "Community 1"
Cohesion: 0.18
Nodes (0): 

### Community 2 - "Community 2"
Cohesion: 0.36
Nodes (5): collectWikiFiles(), computeContentHash(), shouldReembed(), syncAll(), syncFile()

### Community 3 - "Community 3"
Cohesion: 0.33
Nodes (6): createGmailApiSource(), createGmailSource(), decodeBase64url(), extractBody(), findPart(), stripSignature()

### Community 4 - "Community 4"
Cohesion: 0.33
Nodes (1): VectorStore

### Community 5 - "Community 5"
Cohesion: 0.22
Nodes (2): LocalWhisperProvider, OpenAIWhisperProvider

### Community 6 - "Community 6"
Cohesion: 0.33
Nodes (4): backfillCommits(), commitToRawDrop(), fetchCommitsForRepo(), parseCommits()

### Community 7 - "Community 7"
Cohesion: 0.5
Nodes (6): createAnthropicProvider(), createGeminiProvider(), generate(), getAnthropicProvider(), getGeminiProvider(), getProvider()

### Community 8 - "Community 8"
Cohesion: 0.38
Nodes (3): eventTypeKey(), parseEvents(), repoSlug()

### Community 9 - "Community 9"
Cohesion: 0.52
Nodes (6): communityOf(), connectionCounts(), generateAllDrops(), generateCommunityDrop(), groupNodesByCommunity(), slugify()

### Community 10 - "Community 10"
Cohesion: 0.47
Nodes (5): _edge_relation(), _file_hub_nodes(), main(), Yield (node_id, data) for file-level hub nodes (label == source filename)., Get edge relation safely, handling missing edges.

### Community 11 - "Community 11"
Cohesion: 0.33
Nodes (0): 

### Community 12 - "Community 12"
Cohesion: 0.53
Nodes (4): compileSinglePass(), getExistingTitles(), slugify(), walkWikiDir()

### Community 13 - "Community 13"
Cohesion: 0.47
Nodes (4): generateLintReport(), runLintHeal(), runSeed(), shouldRunStep()

### Community 14 - "Community 14"
Cohesion: 0.47
Nodes (1): JsonSyncStateStore

### Community 15 - "Community 15"
Cohesion: 0.7
Nodes (4): injectRawFrontmatter(), readFrontmatter(), updateFrontmatter(), writeFrontmatter()

### Community 16 - "Community 16"
Cohesion: 0.7
Nodes (4): checkSentinelCompletion(), collectRawFiles(), processQueue(), triggerGraphRebuild()

### Community 17 - "Community 17"
Cohesion: 0.4
Nodes (0): 

### Community 18 - "Community 18"
Cohesion: 0.6
Nodes (3): deepMerge(), loadConfig(), loadEnv()

### Community 19 - "Community 19"
Cohesion: 0.4
Nodes (0): 

### Community 20 - "Community 20"
Cohesion: 0.6
Nodes (3): chunkMarkdown(), extractText(), hashContent()

### Community 21 - "Community 21"
Cohesion: 0.6
Nodes (3): b64url(), makeMultipartMessage(), makePlainMessage()

### Community 22 - "Community 22"
Cohesion: 0.4
Nodes (0): 

### Community 23 - "Community 23"
Cohesion: 0.5
Nodes (1): SyncOrchestrator

### Community 24 - "Community 24"
Cohesion: 0.83
Nodes (3): collectWikiFiles(), scanForIssues(), slugify()

### Community 25 - "Community 25"
Cohesion: 0.83
Nodes (3): defaultClaudeFn(), defaultExecFn(), generatePlot()

### Community 26 - "Community 26"
Cohesion: 0.67
Nodes (2): collectWikiFiles(), discoverConnections()

### Community 27 - "Community 27"
Cohesion: 0.67
Nodes (2): classifyCluster(), detectPrefix()

### Community 28 - "Community 28"
Cohesion: 0.5
Nodes (0): 

### Community 29 - "Community 29"
Cohesion: 0.83
Nodes (3): defaultClaudeFn(), defaultExecFn(), generateSlides()

### Community 30 - "Community 30"
Cohesion: 0.83
Nodes (3): normalizeTarget(), scanWiki(), walkDir()

### Community 31 - "Community 31"
Cohesion: 0.83
Nodes (3): countFiles(), countPending(), getHealthStats()

### Community 32 - "Community 32"
Cohesion: 0.83
Nodes (3): embed(), embedBatch(), getExtractor()

### Community 33 - "Community 33"
Cohesion: 0.83
Nodes (3): formatReport(), main(), runSync()

### Community 34 - "Community 34"
Cohesion: 0.67
Nodes (0): 

### Community 35 - "Community 35"
Cohesion: 0.67
Nodes (0): 

### Community 36 - "Community 36"
Cohesion: 0.67
Nodes (0): 

### Community 37 - "Community 37"
Cohesion: 0.67
Nodes (0): 

### Community 38 - "Community 38"
Cohesion: 0.67
Nodes (0): 

### Community 39 - "Community 39"
Cohesion: 0.67
Nodes (0): 

### Community 40 - "Community 40"
Cohesion: 0.67
Nodes (0): 

### Community 41 - "Community 41"
Cohesion: 0.67
Nodes (0): 

### Community 42 - "Community 42"
Cohesion: 1.0
Nodes (2): slugify(), uniqueSlug()

### Community 43 - "Community 43"
Cohesion: 0.67
Nodes (0): 

### Community 44 - "Community 44"
Cohesion: 1.0
Nodes (2): generateGraphCache(), seedRandom()

### Community 45 - "Community 45"
Cohesion: 1.0
Nodes (2): formatChunksForPrompt(), synthesize()

### Community 46 - "Community 46"
Cohesion: 1.0
Nodes (2): generateCrossLayerEdges(), matchRepoName()

### Community 47 - "Community 47"
Cohesion: 0.67
Nodes (1): MockOAuth2

### Community 48 - "Community 48"
Cohesion: 1.0
Nodes (2): loadGraphifyGraphs(), stripFrontmatter()

### Community 49 - "Community 49"
Cohesion: 0.67
Nodes (0): 

### Community 50 - "Community 50"
Cohesion: 0.67
Nodes (0): 

### Community 51 - "Community 51"
Cohesion: 1.0
Nodes (2): backfillLinks(), walkDir()

### Community 52 - "Community 52"
Cohesion: 0.67
Nodes (0): 

### Community 53 - "Community 53"
Cohesion: 0.67
Nodes (0): 

### Community 54 - "Community 54"
Cohesion: 0.67
Nodes (0): 

### Community 55 - "Community 55"
Cohesion: 1.0
Nodes (2): firstLine(), ingestContent()

### Community 56 - "Community 56"
Cohesion: 1.0
Nodes (2): cosineSimilarity(), noveltyScore()

### Community 57 - "Community 57"
Cohesion: 1.0
Nodes (2): slugify(), transformProfile()

### Community 58 - "Community 58"
Cohesion: 0.67
Nodes (0): 

### Community 59 - "Community 59"
Cohesion: 0.67
Nodes (0): 

### Community 60 - "Community 60"
Cohesion: 0.67
Nodes (0): 

### Community 61 - "Community 61"
Cohesion: 0.67
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

### Community 66 - "Community 66"
Cohesion: 1.0
Nodes (0): 

### Community 67 - "Community 67"
Cohesion: 1.0
Nodes (0): 

### Community 68 - "Community 68"
Cohesion: 1.0
Nodes (0): 

### Community 69 - "Community 69"
Cohesion: 1.0
Nodes (0): 

### Community 70 - "Community 70"
Cohesion: 1.0
Nodes (0): 

### Community 71 - "Community 71"
Cohesion: 1.0
Nodes (0): 

### Community 72 - "Community 72"
Cohesion: 1.0
Nodes (0): 

### Community 73 - "Community 73"
Cohesion: 1.0
Nodes (0): 

### Community 74 - "Community 74"
Cohesion: 1.0
Nodes (0): 

### Community 75 - "Community 75"
Cohesion: 1.0
Nodes (0): 

### Community 76 - "Community 76"
Cohesion: 1.0
Nodes (0): 

### Community 77 - "Community 77"
Cohesion: 1.0
Nodes (0): 

### Community 78 - "Community 78"
Cohesion: 1.0
Nodes (0): 

### Community 79 - "Community 79"
Cohesion: 1.0
Nodes (0): 

### Community 80 - "Community 80"
Cohesion: 1.0
Nodes (0): 

### Community 81 - "Community 81"
Cohesion: 1.0
Nodes (0): 

### Community 82 - "Community 82"
Cohesion: 1.0
Nodes (0): 

### Community 83 - "Community 83"
Cohesion: 1.0
Nodes (0): 

### Community 84 - "Community 84"
Cohesion: 1.0
Nodes (0): 

### Community 85 - "Community 85"
Cohesion: 1.0
Nodes (0): 

### Community 86 - "Community 86"
Cohesion: 1.0
Nodes (0): 

### Community 87 - "Community 87"
Cohesion: 1.0
Nodes (0): 

### Community 88 - "Community 88"
Cohesion: 1.0
Nodes (0): 

### Community 89 - "Community 89"
Cohesion: 1.0
Nodes (0): 

### Community 90 - "Community 90"
Cohesion: 1.0
Nodes (0): 

### Community 91 - "Community 91"
Cohesion: 1.0
Nodes (0): 

### Community 92 - "Community 92"
Cohesion: 1.0
Nodes (0): 

### Community 93 - "Community 93"
Cohesion: 1.0
Nodes (0): 

### Community 94 - "Community 94"
Cohesion: 1.0
Nodes (0): 

### Community 95 - "Community 95"
Cohesion: 1.0
Nodes (0): 

### Community 96 - "Community 96"
Cohesion: 1.0
Nodes (0): 

### Community 97 - "Community 97"
Cohesion: 1.0
Nodes (0): 

### Community 98 - "Community 98"
Cohesion: 1.0
Nodes (0): 

### Community 99 - "Community 99"
Cohesion: 1.0
Nodes (0): 

### Community 100 - "Community 100"
Cohesion: 1.0
Nodes (0): 

### Community 101 - "Community 101"
Cohesion: 1.0
Nodes (0): 

### Community 102 - "Community 102"
Cohesion: 1.0
Nodes (0): 

### Community 103 - "Community 103"
Cohesion: 1.0
Nodes (0): 

### Community 104 - "Community 104"
Cohesion: 1.0
Nodes (0): 

### Community 105 - "Community 105"
Cohesion: 1.0
Nodes (0): 

### Community 106 - "Community 106"
Cohesion: 1.0
Nodes (0): 

### Community 107 - "Community 107"
Cohesion: 1.0
Nodes (0): 

### Community 108 - "Community 108"
Cohesion: 1.0
Nodes (0): 

### Community 109 - "Community 109"
Cohesion: 1.0
Nodes (0): 

### Community 110 - "Community 110"
Cohesion: 1.0
Nodes (0): 

### Community 111 - "Community 111"
Cohesion: 1.0
Nodes (0): 

### Community 112 - "Community 112"
Cohesion: 1.0
Nodes (0): 

### Community 113 - "Community 113"
Cohesion: 1.0
Nodes (0): 

### Community 114 - "Community 114"
Cohesion: 1.0
Nodes (0): 

### Community 115 - "Community 115"
Cohesion: 1.0
Nodes (0): 

### Community 116 - "Community 116"
Cohesion: 1.0
Nodes (0): 

### Community 117 - "Community 117"
Cohesion: 1.0
Nodes (0): 

### Community 118 - "Community 118"
Cohesion: 1.0
Nodes (0): 

### Community 119 - "Community 119"
Cohesion: 1.0
Nodes (0): 

### Community 120 - "Community 120"
Cohesion: 1.0
Nodes (0): 

### Community 121 - "Community 121"
Cohesion: 1.0
Nodes (0): 

### Community 122 - "Community 122"
Cohesion: 1.0
Nodes (0): 

### Community 123 - "Community 123"
Cohesion: 1.0
Nodes (0): 

### Community 124 - "Community 124"
Cohesion: 1.0
Nodes (0): 

### Community 125 - "Community 125"
Cohesion: 1.0
Nodes (0): 

### Community 126 - "Community 126"
Cohesion: 1.0
Nodes (0): 

### Community 127 - "Community 127"
Cohesion: 1.0
Nodes (0): 

### Community 128 - "Community 128"
Cohesion: 1.0
Nodes (0): 

### Community 129 - "Community 129"
Cohesion: 1.0
Nodes (0): 

### Community 130 - "Community 130"
Cohesion: 1.0
Nodes (0): 

### Community 131 - "Community 131"
Cohesion: 1.0
Nodes (0): 

### Community 132 - "Community 132"
Cohesion: 1.0
Nodes (0): 

### Community 133 - "Community 133"
Cohesion: 1.0
Nodes (0): 

### Community 134 - "Community 134"
Cohesion: 1.0
Nodes (0): 

### Community 135 - "Community 135"
Cohesion: 1.0
Nodes (0): 

### Community 136 - "Community 136"
Cohesion: 1.0
Nodes (0): 

### Community 137 - "Community 137"
Cohesion: 1.0
Nodes (0): 

### Community 138 - "Community 138"
Cohesion: 1.0
Nodes (0): 

### Community 139 - "Community 139"
Cohesion: 1.0
Nodes (0): 

### Community 140 - "Community 140"
Cohesion: 1.0
Nodes (0): 

### Community 141 - "Community 141"
Cohesion: 1.0
Nodes (0): 

### Community 142 - "Community 142"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **2 isolated node(s):** `Yield (node_id, data) for file-level hub nodes (label == source filename).`, `Get edge relation safely, handling missing edges.`
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 62`** (2 nodes): `gmail-auth.ts`, `createGmailClient()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 63`** (2 nodes): `format.ts`, `formatForTelegram()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 64`** (2 nodes): `ingest.test.ts`, `buildApp()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 65`** (2 nodes): `health.ts`, `healthRoute()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 66`** (2 nodes): `graph-export.test.ts`, `buildApp()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 67`** (2 nodes): `passthrough.ts`, `parsePassthrough()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 68`** (2 nodes): `export.test.ts`, `makeEmbed()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 69`** (2 nodes): `positioning.ts`, `transformPositioning()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 70`** (2 nodes): `tracking.ts`, `transformTracking()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 71`** (2 nodes): `html-parser.ts`, `parseHtml()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 72`** (2 nodes): `index-updater.ts`, `updateIndex()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 73`** (2 nodes): `snapshot.ts`, `takePreHealSnapshot()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 74`** (2 nodes): `skills.ts`, `transformSkills()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 75`** (2 nodes): `save.ts`, `saveRoute()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 76`** (2 nodes): `github.test.ts`, `makeEvent()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 77`** (2 nodes): `load-graphify.test.ts`, `writeRepoGraph()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 78`** (2 nodes): `answers.ts`, `transformAnswers()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 79`** (2 nodes): `voice-parser.ts`, `parseVoice()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 80`** (2 nodes): `scan-wiki.test.ts`, `writeArticle()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 81`** (2 nodes): `graph-export.ts`, `graphExportRoute()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 82`** (2 nodes): `synthesis-cache.test.ts`, `makeSynthesis()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 83`** (2 nodes): `router.ts`, `routeAndParse()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 84`** (2 nodes): `gmail-api.test.ts`, `b64url()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 85`** (2 nodes): `compile-pending.ts`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 86`** (2 nodes): `watcher.ts`, `startWatchers()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 87`** (2 nodes): `synthesise.test.ts`, `buildApp()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 88`** (2 nodes): `stories.ts`, `transformStories()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 89`** (2 nodes): `cache.test.ts`, `writeArticle()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 90`** (2 nodes): `markpush.ts`, `createMarkpushSource()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 91`** (2 nodes): `backfill-links.test.ts`, `writeArticle()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 92`** (2 nodes): `embeddings.ts`, `aggregateEmbeddings()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 93`** (2 nodes): `graph-push.test.ts`, `buildApp()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 94`** (2 nodes): `git-commits.test.ts`, `makeDeps()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 95`** (2 nodes): `graph-push.ts`, `graphPushRoute()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 96`** (2 nodes): `ingest.ts`, `ingestRoute()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 97`** (2 nodes): `truncate.ts`, `truncateAtSentence()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 98`** (1 nodes): `frontmatter.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 99`** (1 nodes): `quarantine.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 100`** (1 nodes): `config.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 101`** (1 nodes): `healer.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 102`** (1 nodes): `runner.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 103`** (1 nodes): `scanner.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 104`** (1 nodes): `schemas.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 105`** (1 nodes): `unstructured.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 106`** (1 nodes): `log.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 107`** (1 nodes): `wiki-helpers.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 108`** (1 nodes): `yaml-loader.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 109`** (1 nodes): `profile.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 110`** (1 nodes): `remaining.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 111`** (1 nodes): `projects.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 112`** (1 nodes): `experience.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 113`** (1 nodes): `community-drops.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 114`** (1 nodes): `push.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 115`** (1 nodes): `embeddings.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 116`** (1 nodes): `plots.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 117`** (1 nodes): `slides.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 118`** (1 nodes): `vector-store.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 119`** (1 nodes): `sync.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 120`** (1 nodes): `chunker.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 121`** (1 nodes): `router.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 122`** (1 nodes): `classify.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 123`** (1 nodes): `transcribe.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 124`** (1 nodes): `format.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 125`** (1 nodes): `truncate.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 126`** (1 nodes): `slug.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 127`** (1 nodes): `state.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 128`** (1 nodes): `github-integration.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 129`** (1 nodes): `markpush.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 130`** (1 nodes): `cli.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 131`** (1 nodes): `health-core.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 132`** (1 nodes): `ingest-core.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 133`** (1 nodes): `server.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 134`** (1 nodes): `health.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 135`** (1 nodes): `synthesize.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 136`** (1 nodes): `novelty.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 137`** (1 nodes): `queue.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 138`** (1 nodes): `compile.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 139`** (1 nodes): `types.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 140`** (1 nodes): `schemas.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 141`** (1 nodes): `calendar.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 142`** (1 nodes): `fastify.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `Yield (node_id, data) for file-level hub nodes (label == source filename).`, `Get edge relation safely, handling missing edges.` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._