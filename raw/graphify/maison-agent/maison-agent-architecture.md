# Graph Report - /Users/rahilsinghi/Desktop/maison-agent  (2026-04-15)

## Corpus Check
- Large corpus: 766 files · ~505,955 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 1686 nodes · 1870 edges · 263 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
1. `LoginPage` - 40 edges
2. `createElement()` - 24 edges
3. `ChatWidgetPage` - 19 edges
4. `initShell()` - 14 edges
5. `PineconeDatasource` - 13 edges
6. `DocsPage` - 13 edges
7. `StatusPagePage` - 12 edges
8. `DemoSitePage` - 11 edges
9. `computeClientFields()` - 11 edges
10. `postRenderSetup()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `onTableChange()` --calls--> `update()`  [EXTRACTED]
  /Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/src/datasource/dynamodb/QueryEditor.tsx → /Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/src/datasource/pinecone/QueryEditor.tsx
- `onIndexChange()` --calls--> `update()`  [EXTRACTED]
  /Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/src/datasource/dynamodb/QueryEditor.tsx → /Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/src/datasource/pinecone/QueryEditor.tsx
- `withBrowserSpan()` --calls--> `getTracer()`  [EXTRACTED]
  /Users/rahilsinghi/Desktop/maison-agent/packages/browser-telemetry/src/tracer.ts → /Users/rahilsinghi/Desktop/maison-agent/packages/telemetry/src/tracer.ts
- `POST()` --calls--> `GET()`  [EXTRACTED]
  /Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/app/api/users/[id]/resend-invite/route.ts → /Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/app/api/users/route.ts
- `POST()` --calls--> `escapeRegex()`  [EXTRACTED]
  /Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/app/api/users/[id]/resend-invite/route.ts → /Users/rahilsinghi/Desktop/maison-agent/apps/quality-dashboard/src/app/api/tests/run/rerun/route.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.02
Nodes (20): checkCookieSession(), deobfuscateUserId(), fromBase64Url(), generateApiKey(), getFirebaseApp(), getFirebaseAuth(), getJwtSecret(), getToken() (+12 more)

### Community 1 - "Community 1"
Cohesion: 0.02
Nodes (22): AgentDatabaseStack, ObservabilityBackendStack, BastionStack, DashboardDistributionStack, ObservabilityDatabaseStack, DistributionStack, DocsStack, EmailUtilStack (+14 more)

### Community 2 - "Community 2"
Cohesion: 0.03
Nodes (6): DynamoDBDataSource, PineconeDataSource, S3DataSource, onIndexChange(), onTableChange(), update()

### Community 3 - "Community 3"
Cohesion: 0.03
Nodes (9): handleKeyDown(), handleSend(), flattenBodyProperties(), generateCurlExample(), generateExampleValue(), generateResponseExample(), resolveSchema(), applyTheme() (+1 more)

### Community 4 - "Community 4"
Cohesion: 0.07
Nodes (40): applyTheme(), buildInitialQuery(), buildMobileCards(), buildQueryParams(), clearPaginationLoading(), formatPageInfo(), getCurrentTheme(), handleSidebarClick() (+32 more)

### Community 5 - "Community 5"
Cohesion: 0.04
Nodes (0): 

### Community 6 - "Community 6"
Cohesion: 0.05
Nodes (2): S3Datasource, S3Query

### Community 7 - "Community 7"
Cohesion: 0.06
Nodes (17): disableChat(), hideLoadingBalls(), init(), logAnalyticsEvent(), requestStorageAccess(), broadcastAuthStatusUpdate(), getChatWindowStyle(), getIconStyle() (+9 more)

### Community 8 - "Community 8"
Cohesion: 0.05
Nodes (1): LoginPage

### Community 9 - "Community 9"
Cohesion: 0.07
Nodes (12): agentCdn(), apiBase(), baseDomain(), baseUrl(), consoleUrl(), subDomain(), subUrl(), applyTheme() (+4 more)

### Community 10 - "Community 10"
Cohesion: 0.07
Nodes (8): getLangfuseClient(), getPrompt(), App, AppSettings, getTracer(), startSpan(), withBrowserSpan(), withSpan()

### Community 11 - "Community 11"
Cohesion: 0.09
Nodes (11): attributeValueToString(), intPtr(), tryPrettifyJSON(), DynamoDBDatasource, DynamoDBQuery, IndexInfo, KeySchema, MultiHandler (+3 more)

### Community 12 - "Community 12"
Cohesion: 0.08
Nodes (6): getFromAddress(), sendInviteEmail(), sendPasswordResetEmail(), escapeRegex(), GET(), POST()

### Community 13 - "Community 13"
Cohesion: 0.13
Nodes (24): buildMenuTestDOM(), createElement(), makeActionsRow(), makeClientsTable(), makeModal(), makeSelect(), makeTableCard(), setupClientRow() (+16 more)

### Community 14 - "Community 14"
Cohesion: 0.13
Nodes (9): ensurePineconeIndex(), getWebsiteInfo(), main(), pushToPinecone(), transformRecord(), modelProvider(), PineconeDatasource, PineconeQuery (+1 more)

### Community 15 - "Community 15"
Cohesion: 0.09
Nodes (0): 

### Community 16 - "Community 16"
Cohesion: 0.1
Nodes (1): ChatWidgetPage

### Community 17 - "Community 17"
Cohesion: 0.1
Nodes (9): AgentPipelineTasksCodeBuildStack, BusinessConsoleCodeBuildStack, ChatWindowCodeBuildStack, DeploymentPropertiesStack, MonorepoAppCodeBuildStack, QAEditorCodeBuildStack, QualityCodeBuildStack, ServerBuildDeployPipelineStack (+1 more)

### Community 18 - "Community 18"
Cohesion: 0.15
Nodes (6): formatResponseBody(), highlightHtml(), highlightHtmlTags(), highlightJs(), highlightJson(), isHtmlOrXml()

### Community 19 - "Community 19"
Cohesion: 0.14
Nodes (4): AgentServerECSStack, isIBucket(), isIBucket(), QualityECSStack

### Community 20 - "Community 20"
Cohesion: 0.27
Nodes (14): buildClaudeCodeDashboard(), buildMaisonAwsDashboard(), cwCf(), cwInsights(), cwMetric(), promInstantQuery(), promPiePanel(), promQuery() (+6 more)

### Community 21 - "Community 21"
Cohesion: 0.24
Nodes (8): DbSessionReporter, generateSuggestion(), getFileSize(), inferBrowser(), joinLogEntries(), resolveArtifactType(), resolveSessionStatus(), resolveTestCaseStatus()

### Community 22 - "Community 22"
Cohesion: 0.14
Nodes (1): DocsPage

### Community 23 - "Community 23"
Cohesion: 0.17
Nodes (1): StatusPagePage

### Community 24 - "Community 24"
Cohesion: 0.29
Nodes (11): buildDemoUrl(), computeClientFields(), formatDate(), formatLastScraped(), formatScheduleLabel(), getClientSiteUrl(), getLastScrapeBulletClass(), getScrapeStatusIntent() (+3 more)

### Community 25 - "Community 25"
Cohesion: 0.37
Nodes (11): clientsCreate(), clientsDisable(), clientsGet(), clientsList(), clientsUpdate(), dispatch(), rpcError(), rpcResult() (+3 more)

### Community 26 - "Community 26"
Cohesion: 0.17
Nodes (2): AppPlugin, DataSourceWithBackend

### Community 27 - "Community 27"
Cohesion: 0.17
Nodes (2): SiteLoaderDistributionStack, SiteLoaderHostedZoneStack

### Community 28 - "Community 28"
Cohesion: 0.18
Nodes (1): SubscriptionManager

### Community 29 - "Community 29"
Cohesion: 0.17
Nodes (1): DemoSitePage

### Community 30 - "Community 30"
Cohesion: 0.29
Nodes (8): addStandardEventListeners(), cloneElement(), createBaseInput(), createFormGroup(), createLabel(), enhanceElement(), setInitialValue(), updateValidationState()

### Community 31 - "Community 31"
Cohesion: 0.24
Nodes (5): emitLog(), loadSchema(), loadSchemaWithParams(), recordFailure(), sendFailureNotification()

### Community 32 - "Community 32"
Cohesion: 0.18
Nodes (1): AdminPage

### Community 33 - "Community 33"
Cohesion: 0.38
Nodes (8): buildBreadcrumbNodes(), getPageContent(), injectCSS(), renderComponent(), renderPage(), segmentToLabel(), showPageLoader(), updateBreadcrumb()

### Community 34 - "Community 34"
Cohesion: 0.27
Nodes (3): cloneElement(), decorateElement(), getElementKey()

### Community 35 - "Community 35"
Cohesion: 0.22
Nodes (3): MockECSClient, MockRunTaskCommand, sendImpl()

### Community 36 - "Community 36"
Cohesion: 0.31
Nodes (4): analyzeSite(), detectFramework(), isPrivateIp(), isSafeUrl()

### Community 37 - "Community 37"
Cohesion: 0.33
Nodes (6): dispatch(), initRouter(), navigate(), patternToRegex(), registerRoute(), stripBase()

### Community 38 - "Community 38"
Cohesion: 0.22
Nodes (1): QualityJsonReporter

### Community 39 - "Community 39"
Cohesion: 0.25
Nodes (2): makeBrowserSpan(), randomHex()

### Community 40 - "Community 40"
Cohesion: 0.31
Nodes (4): hmacSha256(), hmacSha256Hex(), sha256(), signRequest()

### Community 41 - "Community 41"
Cohesion: 0.33
Nodes (1): EmailBuilder

### Community 42 - "Community 42"
Cohesion: 0.28
Nodes (1): EmailSender

### Community 43 - "Community 43"
Cohesion: 0.33
Nodes (2): generateRunId(), getGitSha()

### Community 44 - "Community 44"
Cohesion: 0.33
Nodes (2): getStoredTheme(), getThemeCookie()

### Community 45 - "Community 45"
Cohesion: 0.33
Nodes (1): LRUCache

### Community 46 - "Community 46"
Cohesion: 0.4
Nodes (2): bootstrap(), registerFilesystemRoutes()

### Community 47 - "Community 47"
Cohesion: 0.67
Nodes (5): accessDeniedCard(), escapeHtml(), getIconSvg(), mapComponent(), resolveGapClass()

### Community 48 - "Community 48"
Cohesion: 0.4
Nodes (0): 

### Community 49 - "Community 49"
Cohesion: 0.4
Nodes (0): 

### Community 50 - "Community 50"
Cohesion: 0.4
Nodes (0): 

### Community 51 - "Community 51"
Cohesion: 0.5
Nodes (2): getDefaultDepth(), getTestDepth()

### Community 52 - "Community 52"
Cohesion: 0.7
Nodes (4): createContainer(), createInputText(), createSelect(), initDevTools()

### Community 53 - "Community 53"
Cohesion: 0.6
Nodes (3): extractJsDocBefore(), parseSpecFile(), scanSuites()

### Community 54 - "Community 54"
Cohesion: 0.6
Nodes (3): getHierarchy(), hasAdequatePermission(), hasFeatureAccess()

### Community 55 - "Community 55"
Cohesion: 0.4
Nodes (0): 

### Community 56 - "Community 56"
Cohesion: 0.6
Nodes (3): createButton(), createIconButton(), createLoadingButton()

### Community 57 - "Community 57"
Cohesion: 0.4
Nodes (0): 

### Community 58 - "Community 58"
Cohesion: 0.67
Nodes (2): createValidationResult(), validateField()

### Community 59 - "Community 59"
Cohesion: 0.5
Nodes (0): 

### Community 60 - "Community 60"
Cohesion: 0.83
Nodes (3): processSegment(), retry(), updateItem()

### Community 61 - "Community 61"
Cohesion: 0.83
Nodes (3): createFieldSet(), createFormSection(), createLegend()

### Community 62 - "Community 62"
Cohesion: 0.83
Nodes (3): collectSubtree(), expandTemplates(), rewriteItemPaths()

### Community 63 - "Community 63"
Cohesion: 0.83
Nodes (3): deleteDynamoDBItems(), getAllPineconeIds(), main()

### Community 64 - "Community 64"
Cohesion: 0.5
Nodes (0): 

### Community 65 - "Community 65"
Cohesion: 0.83
Nodes (3): createDebugContainer(), createDebugSection(), initDebugTools()

### Community 66 - "Community 66"
Cohesion: 0.5
Nodes (0): 

### Community 67 - "Community 67"
Cohesion: 0.83
Nodes (3): resolvePointer(), resolveTemplateList(), resolveValue()

### Community 68 - "Community 68"
Cohesion: 0.5
Nodes (0): 

### Community 69 - "Community 69"
Cohesion: 0.5
Nodes (0): 

### Community 70 - "Community 70"
Cohesion: 0.67
Nodes (2): createLabel(), createLabeledInput()

### Community 71 - "Community 71"
Cohesion: 0.83
Nodes (3): cloneEmailInput(), createInputEmail(), enhanceEmailInput()

### Community 72 - "Community 72"
Cohesion: 0.83
Nodes (3): createForm(), createFormWizard(), createQuickForm()

### Community 73 - "Community 73"
Cohesion: 0.5
Nodes (0): 

### Community 74 - "Community 74"
Cohesion: 0.83
Nodes (3): cloneTextInput(), createInputText(), enhanceTextInput()

### Community 75 - "Community 75"
Cohesion: 1.0
Nodes (2): createInputTel(), createInternationalTel()

### Community 76 - "Community 76"
Cohesion: 0.67
Nodes (0): 

### Community 77 - "Community 77"
Cohesion: 0.67
Nodes (0): 

### Community 78 - "Community 78"
Cohesion: 0.67
Nodes (0): 

### Community 79 - "Community 79"
Cohesion: 0.67
Nodes (0): 

### Community 80 - "Community 80"
Cohesion: 0.67
Nodes (0): 

### Community 81 - "Community 81"
Cohesion: 0.67
Nodes (0): 

### Community 82 - "Community 82"
Cohesion: 0.67
Nodes (0): 

### Community 83 - "Community 83"
Cohesion: 0.67
Nodes (0): 

### Community 84 - "Community 84"
Cohesion: 0.67
Nodes (0): 

### Community 85 - "Community 85"
Cohesion: 1.0
Nodes (2): createImageUpload(), createInputFile()

### Community 86 - "Community 86"
Cohesion: 1.0
Nodes (2): createInputTime(), createTimeRange()

### Community 87 - "Community 87"
Cohesion: 0.67
Nodes (0): 

### Community 88 - "Community 88"
Cohesion: 0.67
Nodes (0): 

### Community 89 - "Community 89"
Cohesion: 0.67
Nodes (0): 

### Community 90 - "Community 90"
Cohesion: 0.67
Nodes (0): 

### Community 91 - "Community 91"
Cohesion: 0.67
Nodes (0): 

### Community 92 - "Community 92"
Cohesion: 0.67
Nodes (0): 

### Community 93 - "Community 93"
Cohesion: 0.67
Nodes (0): 

### Community 94 - "Community 94"
Cohesion: 0.67
Nodes (0): 

### Community 95 - "Community 95"
Cohesion: 0.67
Nodes (0): 

### Community 96 - "Community 96"
Cohesion: 0.67
Nodes (0): 

### Community 97 - "Community 97"
Cohesion: 0.67
Nodes (0): 

### Community 98 - "Community 98"
Cohesion: 0.67
Nodes (0): 

### Community 99 - "Community 99"
Cohesion: 0.67
Nodes (0): 

### Community 100 - "Community 100"
Cohesion: 0.67
Nodes (0): 

### Community 101 - "Community 101"
Cohesion: 0.67
Nodes (0): 

### Community 102 - "Community 102"
Cohesion: 0.67
Nodes (0): 

### Community 103 - "Community 103"
Cohesion: 0.67
Nodes (0): 

### Community 104 - "Community 104"
Cohesion: 0.67
Nodes (0): 

### Community 105 - "Community 105"
Cohesion: 0.67
Nodes (0): 

### Community 106 - "Community 106"
Cohesion: 0.67
Nodes (0): 

### Community 107 - "Community 107"
Cohesion: 1.0
Nodes (2): main(), streamToString()

### Community 108 - "Community 108"
Cohesion: 0.67
Nodes (0): 

### Community 109 - "Community 109"
Cohesion: 0.67
Nodes (0): 

### Community 110 - "Community 110"
Cohesion: 0.67
Nodes (0): 

### Community 111 - "Community 111"
Cohesion: 0.67
Nodes (0): 

### Community 112 - "Community 112"
Cohesion: 0.67
Nodes (0): 

### Community 113 - "Community 113"
Cohesion: 0.67
Nodes (1): S3UploaderReporter

### Community 114 - "Community 114"
Cohesion: 0.67
Nodes (0): 

### Community 115 - "Community 115"
Cohesion: 0.67
Nodes (0): 

### Community 116 - "Community 116"
Cohesion: 0.67
Nodes (0): 

### Community 117 - "Community 117"
Cohesion: 1.0
Nodes (2): createDateRange(), createInputDate()

### Community 118 - "Community 118"
Cohesion: 0.67
Nodes (0): 

### Community 119 - "Community 119"
Cohesion: 1.0
Nodes (2): createDualRange(), createInputRange()

### Community 120 - "Community 120"
Cohesion: 0.67
Nodes (0): 

### Community 121 - "Community 121"
Cohesion: 0.67
Nodes (0): 

### Community 122 - "Community 122"
Cohesion: 0.67
Nodes (0): 

### Community 123 - "Community 123"
Cohesion: 0.67
Nodes (0): 

### Community 124 - "Community 124"
Cohesion: 0.67
Nodes (0): 

### Community 125 - "Community 125"
Cohesion: 0.67
Nodes (0): 

### Community 126 - "Community 126"
Cohesion: 0.67
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

### Community 143 - "Community 143"
Cohesion: 1.0
Nodes (0): 

### Community 144 - "Community 144"
Cohesion: 1.0
Nodes (0): 

### Community 145 - "Community 145"
Cohesion: 1.0
Nodes (0): 

### Community 146 - "Community 146"
Cohesion: 1.0
Nodes (0): 

### Community 147 - "Community 147"
Cohesion: 1.0
Nodes (0): 

### Community 148 - "Community 148"
Cohesion: 1.0
Nodes (0): 

### Community 149 - "Community 149"
Cohesion: 1.0
Nodes (0): 

### Community 150 - "Community 150"
Cohesion: 1.0
Nodes (0): 

### Community 151 - "Community 151"
Cohesion: 1.0
Nodes (0): 

### Community 152 - "Community 152"
Cohesion: 1.0
Nodes (0): 

### Community 153 - "Community 153"
Cohesion: 1.0
Nodes (0): 

### Community 154 - "Community 154"
Cohesion: 1.0
Nodes (0): 

### Community 155 - "Community 155"
Cohesion: 1.0
Nodes (0): 

### Community 156 - "Community 156"
Cohesion: 1.0
Nodes (0): 

### Community 157 - "Community 157"
Cohesion: 1.0
Nodes (0): 

### Community 158 - "Community 158"
Cohesion: 1.0
Nodes (0): 

### Community 159 - "Community 159"
Cohesion: 1.0
Nodes (0): 

### Community 160 - "Community 160"
Cohesion: 1.0
Nodes (0): 

### Community 161 - "Community 161"
Cohesion: 1.0
Nodes (0): 

### Community 162 - "Community 162"
Cohesion: 1.0
Nodes (0): 

### Community 163 - "Community 163"
Cohesion: 1.0
Nodes (0): 

### Community 164 - "Community 164"
Cohesion: 1.0
Nodes (0): 

### Community 165 - "Community 165"
Cohesion: 1.0
Nodes (0): 

### Community 166 - "Community 166"
Cohesion: 1.0
Nodes (0): 

### Community 167 - "Community 167"
Cohesion: 1.0
Nodes (0): 

### Community 168 - "Community 168"
Cohesion: 1.0
Nodes (0): 

### Community 169 - "Community 169"
Cohesion: 1.0
Nodes (0): 

### Community 170 - "Community 170"
Cohesion: 1.0
Nodes (0): 

### Community 171 - "Community 171"
Cohesion: 1.0
Nodes (0): 

### Community 172 - "Community 172"
Cohesion: 1.0
Nodes (0): 

### Community 173 - "Community 173"
Cohesion: 1.0
Nodes (0): 

### Community 174 - "Community 174"
Cohesion: 1.0
Nodes (0): 

### Community 175 - "Community 175"
Cohesion: 1.0
Nodes (0): 

### Community 176 - "Community 176"
Cohesion: 1.0
Nodes (0): 

### Community 177 - "Community 177"
Cohesion: 1.0
Nodes (0): 

### Community 178 - "Community 178"
Cohesion: 1.0
Nodes (0): 

### Community 179 - "Community 179"
Cohesion: 1.0
Nodes (0): 

### Community 180 - "Community 180"
Cohesion: 1.0
Nodes (0): 

### Community 181 - "Community 181"
Cohesion: 1.0
Nodes (0): 

### Community 182 - "Community 182"
Cohesion: 1.0
Nodes (0): 

### Community 183 - "Community 183"
Cohesion: 1.0
Nodes (0): 

### Community 184 - "Community 184"
Cohesion: 1.0
Nodes (0): 

### Community 185 - "Community 185"
Cohesion: 1.0
Nodes (0): 

### Community 186 - "Community 186"
Cohesion: 1.0
Nodes (0): 

### Community 187 - "Community 187"
Cohesion: 1.0
Nodes (0): 

### Community 188 - "Community 188"
Cohesion: 1.0
Nodes (0): 

### Community 189 - "Community 189"
Cohesion: 1.0
Nodes (0): 

### Community 190 - "Community 190"
Cohesion: 1.0
Nodes (0): 

### Community 191 - "Community 191"
Cohesion: 1.0
Nodes (0): 

### Community 192 - "Community 192"
Cohesion: 1.0
Nodes (0): 

### Community 193 - "Community 193"
Cohesion: 1.0
Nodes (0): 

### Community 194 - "Community 194"
Cohesion: 1.0
Nodes (0): 

### Community 195 - "Community 195"
Cohesion: 1.0
Nodes (0): 

### Community 196 - "Community 196"
Cohesion: 1.0
Nodes (0): 

### Community 197 - "Community 197"
Cohesion: 1.0
Nodes (0): 

### Community 198 - "Community 198"
Cohesion: 1.0
Nodes (0): 

### Community 199 - "Community 199"
Cohesion: 1.0
Nodes (0): 

### Community 200 - "Community 200"
Cohesion: 1.0
Nodes (0): 

### Community 201 - "Community 201"
Cohesion: 1.0
Nodes (0): 

### Community 202 - "Community 202"
Cohesion: 1.0
Nodes (0): 

### Community 203 - "Community 203"
Cohesion: 1.0
Nodes (0): 

### Community 204 - "Community 204"
Cohesion: 1.0
Nodes (0): 

### Community 205 - "Community 205"
Cohesion: 1.0
Nodes (0): 

### Community 206 - "Community 206"
Cohesion: 1.0
Nodes (0): 

### Community 207 - "Community 207"
Cohesion: 1.0
Nodes (0): 

### Community 208 - "Community 208"
Cohesion: 1.0
Nodes (0): 

### Community 209 - "Community 209"
Cohesion: 1.0
Nodes (0): 

### Community 210 - "Community 210"
Cohesion: 1.0
Nodes (0): 

### Community 211 - "Community 211"
Cohesion: 1.0
Nodes (0): 

### Community 212 - "Community 212"
Cohesion: 1.0
Nodes (0): 

### Community 213 - "Community 213"
Cohesion: 1.0
Nodes (0): 

### Community 214 - "Community 214"
Cohesion: 1.0
Nodes (0): 

### Community 215 - "Community 215"
Cohesion: 1.0
Nodes (0): 

### Community 216 - "Community 216"
Cohesion: 1.0
Nodes (0): 

### Community 217 - "Community 217"
Cohesion: 1.0
Nodes (0): 

### Community 218 - "Community 218"
Cohesion: 1.0
Nodes (0): 

### Community 219 - "Community 219"
Cohesion: 1.0
Nodes (0): 

### Community 220 - "Community 220"
Cohesion: 1.0
Nodes (0): 

### Community 221 - "Community 221"
Cohesion: 1.0
Nodes (0): 

### Community 222 - "Community 222"
Cohesion: 1.0
Nodes (0): 

### Community 223 - "Community 223"
Cohesion: 1.0
Nodes (0): 

### Community 224 - "Community 224"
Cohesion: 1.0
Nodes (0): 

### Community 225 - "Community 225"
Cohesion: 1.0
Nodes (0): 

### Community 226 - "Community 226"
Cohesion: 1.0
Nodes (0): 

### Community 227 - "Community 227"
Cohesion: 1.0
Nodes (0): 

### Community 228 - "Community 228"
Cohesion: 1.0
Nodes (0): 

### Community 229 - "Community 229"
Cohesion: 1.0
Nodes (0): 

### Community 230 - "Community 230"
Cohesion: 1.0
Nodes (0): 

### Community 231 - "Community 231"
Cohesion: 1.0
Nodes (0): 

### Community 232 - "Community 232"
Cohesion: 1.0
Nodes (0): 

### Community 233 - "Community 233"
Cohesion: 1.0
Nodes (0): 

### Community 234 - "Community 234"
Cohesion: 1.0
Nodes (0): 

### Community 235 - "Community 235"
Cohesion: 1.0
Nodes (0): 

### Community 236 - "Community 236"
Cohesion: 1.0
Nodes (0): 

### Community 237 - "Community 237"
Cohesion: 1.0
Nodes (0): 

### Community 238 - "Community 238"
Cohesion: 1.0
Nodes (0): 

### Community 239 - "Community 239"
Cohesion: 1.0
Nodes (0): 

### Community 240 - "Community 240"
Cohesion: 1.0
Nodes (0): 

### Community 241 - "Community 241"
Cohesion: 1.0
Nodes (0): 

### Community 242 - "Community 242"
Cohesion: 1.0
Nodes (0): 

### Community 243 - "Community 243"
Cohesion: 1.0
Nodes (0): 

### Community 244 - "Community 244"
Cohesion: 1.0
Nodes (0): 

### Community 245 - "Community 245"
Cohesion: 1.0
Nodes (0): 

### Community 246 - "Community 246"
Cohesion: 1.0
Nodes (0): 

### Community 247 - "Community 247"
Cohesion: 1.0
Nodes (0): 

### Community 248 - "Community 248"
Cohesion: 1.0
Nodes (0): 

### Community 249 - "Community 249"
Cohesion: 1.0
Nodes (0): 

### Community 250 - "Community 250"
Cohesion: 1.0
Nodes (0): 

### Community 251 - "Community 251"
Cohesion: 1.0
Nodes (0): 

### Community 252 - "Community 252"
Cohesion: 1.0
Nodes (0): 

### Community 253 - "Community 253"
Cohesion: 1.0
Nodes (0): 

### Community 254 - "Community 254"
Cohesion: 1.0
Nodes (0): 

### Community 255 - "Community 255"
Cohesion: 1.0
Nodes (0): 

### Community 256 - "Community 256"
Cohesion: 1.0
Nodes (0): 

### Community 257 - "Community 257"
Cohesion: 1.0
Nodes (0): 

### Community 258 - "Community 258"
Cohesion: 1.0
Nodes (0): 

### Community 259 - "Community 259"
Cohesion: 1.0
Nodes (0): 

### Community 260 - "Community 260"
Cohesion: 1.0
Nodes (0): 

### Community 261 - "Community 261"
Cohesion: 1.0
Nodes (0): 

### Community 262 - "Community 262"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **9 isolated node(s):** `PineconeQuery`, `PineconeSettings`, `DynamoDBQuery`, `TableListResponse`, `KeySchema` (+4 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 127`** (2 nodes): `input-search.js`, `createInputSearch()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 128`** (2 nodes): `textarea.js`, `createTextarea()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 129`** (2 nodes): `input-url.js`, `createInputUrl()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 130`** (2 nodes): `copyPineconeClientToClient.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 131`** (2 nodes): `domains.test.ts`, `loadDomains()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 132`** (2 nodes): `validator.ts`, `validateSchema()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 133`** (2 nodes): `console-clients-batch6.spec.ts`, `loginAndGoToClients()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 134`** (2 nodes): `permissions.test.ts`, `makeComponent()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 135`** (2 nodes): `copyPineconeEnvToEnv.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 136`** (2 nodes): `test-local.js`, `runTest()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 137`** (2 nodes): `tracing.test.ts`, `loadTracingScript()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 138`** (2 nodes): `browsers.ts`, `getBrowserProjects()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 139`** (2 nodes): `copyPineconeIndexToIndex.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 140`** (2 nodes): `cache.test.ts`, `entry()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 141`** (2 nodes): `schemas.test.ts`, `loadJsonSchemas()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 142`** (2 nodes): `console-clients-table-inspect.spec.ts`, `loginAndGoToClients()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 143`** (2 nodes): `migrate.ts`, `runMigrations()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 144`** (2 nodes): `component-map.test.ts`, `makeComp()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 145`** (2 nodes): `copyClientFromEnvToEnvDynamo.js`, `copyRecord()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 146`** (2 nodes): `permissions-scenarios.test.ts`, `makePool()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 147`** (2 nodes): `input-number.js`, `createInputNumber()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 148`** (2 nodes): `test-email-send.ts`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 149`** (2 nodes): `select.js`, `createSelector()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 150`** (2 nodes): `validator.test.ts`, `makeValidSchema()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 151`** (2 nodes): `renderer.test.ts`, `makeSchema()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 152`** (1 nodes): `eslint.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 153`** (1 nodes): `vitest.config.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 154`** (1 nodes): `vitest.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 155`** (1 nodes): `agent-database-stack-ondemand.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 156`** (1 nodes): `ses-stack-fallback.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 157`** (1 nodes): `agent-database-stack-a2a-provisioned.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 158`** (1 nodes): `test-site-hosted-zone-stack-createzone.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 159`** (1 nodes): `webpack.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 160`** (1 nodes): `sanity.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 161`** (1 nodes): `batchScrapeWebsites.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 162`** (1 nodes): `copyTestsFromEnvToEnv.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 163`** (1 nodes): `updatePreviewSiteHost.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 164`** (1 nodes): `startDebugTask.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 165`** (1 nodes): `updateFirebaseUid.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 166`** (1 nodes): `disableNonMaisonUsers.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 167`** (1 nodes): `migrate.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 168`** (1 nodes): `enums.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 169`** (1 nodes): `users.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 170`** (1 nodes): `access.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 171`** (1 nodes): `analytics.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 172`** (1 nodes): `knowledge.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 173`** (1 nodes): `agent-client.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 174`** (1 nodes): `testing.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 175`** (1 nodes): `integrations.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 176`** (1 nodes): `v1.9-update-chat-log-analytics-subscribers.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 177`** (1 nodes): `mvp-transformations.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 178`** (1 nodes): `v1.2-dynamo-add-client-assets-property.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 179`** (1 nodes): `v1.1-sql-data.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 180`** (1 nodes): `copy-ef-sql-sql.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 181`** (1 nodes): `v1.14-update-client-knowledge-source-link.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 182`** (1 nodes): `v0.8-sql-data.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 183`** (1 nodes): `v1.14-feature-console-access.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 184`** (1 nodes): `v1.2-golden-check.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 185`** (1 nodes): `common.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 186`** (1 nodes): `enums.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 187`** (1 nodes): `knowledge.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 188`** (1 nodes): `integrations.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 189`** (1 nodes): `pms-integration.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 190`** (1 nodes): `kb-version-history.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 191`** (1 nodes): `scrape-snapshot.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 192`** (1 nodes): `access.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 193`** (1 nodes): `a2a-tasks.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 194`** (1 nodes): `users.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 195`** (1 nodes): `agent-client.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 196`** (1 nodes): `sessions.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 197`** (1 nodes): `helpers.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 198`** (1 nodes): `email-builder-load-error.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 199`** (1 nodes): `publisher.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 200`** (1 nodes): `channels.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 201`** (1 nodes): `notify.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 202`** (1 nodes): `client.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 203`** (1 nodes): `logger.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 204`** (1 nodes): `openai.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 205`** (1 nodes): `prompts.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 206`** (1 nodes): `gemini.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 207`** (1 nodes): `langfuse.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 208`** (1 nodes): `wordmark.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 209`** (1 nodes): `postcss.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 210`** (1 nodes): `mui-dev-tools.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 211`** (1 nodes): `global.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 212`** (1 nodes): `translations.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 213`** (1 nodes): `mcbsClosure.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 214`** (1 nodes): `mui-color-tools.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 215`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 216`** (1 nodes): `TracingInit.test.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 217`** (1 nodes): `layout.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 218`** (1 nodes): `vite.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 219`** (1 nodes): `vite-config.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 220`** (1 nodes): `router.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 221`** (1 nodes): `main.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 222`** (1 nodes): `playwright.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 223`** (1 nodes): `browsers.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 224`** (1 nodes): `depth.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 225`** (1 nodes): `environments.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 226`** (1 nodes): `sync-catalog.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 227`** (1 nodes): `pool.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 228`** (1 nodes): `s3-uploader.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 229`** (1 nodes): `artifacts.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 230`** (1 nodes): `screenshot.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 231`** (1 nodes): `wait-strategies.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 232`** (1 nodes): `api-health.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 233`** (1 nodes): `status-page-accessible.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 234`** (1 nodes): `chat-widget-loads.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 235`** (1 nodes): `status-page-rendering.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 236`** (1 nodes): `chat-widget-cls.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 237`** (1 nodes): `demo-site-layout.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 238`** (1 nodes): `login-wordmark.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 239`** (1 nodes): `message-endpoint.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 240`** (1 nodes): `client-fields-endpoint.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 241`** (1 nodes): `auth-endpoint.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 242`** (1 nodes): `translations-endpoint.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 243`** (1 nodes): `delivery-verification.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 244`** (1 nodes): `report-generation.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 245`** (1 nodes): `chat-locale-switching.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 246`** (1 nodes): `accept-invite-flow.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 247`** (1 nodes): `browser-tracing-verify.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 248`** (1 nodes): `admin-auth-flow.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 249`** (1 nodes): `chat-send-message.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 250`** (1 nodes): `chat-session-persistence.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 251`** (1 nodes): `login-flow.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 252`** (1 nodes): `docs-diagnostic-auth.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 253`** (1 nodes): `docs-navigation.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 254`** (1 nodes): `chat-receive-response.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 255`** (1 nodes): `templates.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 256`** (1 nodes): `execution-logs.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 257`** (1 nodes): `scenarios.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 258`** (1 nodes): `authenticated.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 259`** (1 nodes): `computed-fields.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 260`** (1 nodes): `data-resolver.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 261`** (1 nodes): `console-auth.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 262`** (1 nodes): `console.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `PineconeQuery`, `PineconeSettings`, `DynamoDBQuery` to the rest of the system?**
  _9 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.03 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.03 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._
- **Should `Community 5` be split into smaller, more focused modules?**
  _Cohesion score 0.04 - nodes in this community are weakly interconnected._