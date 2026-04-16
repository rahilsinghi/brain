---
status: processed
source_type: graphify-community
repo: maison-agent
community_id: 18
ingested_at: 2026-04-15T19:59:44.142Z
parsed_at: 2026-04-15T19:59:44.142Z
compiled_to: "[[Documentation Code Highlighting and Display]]"
processed_at: 2026-04-15T20:01:21.515Z
retry_count: 0
last_error: null
compile_progress: null
---



# maison-agent — Community 18

## Files in this cluster

- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/lib/syntax.ts` — 11 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/components/docs/CodeBlock.tsx` — 6 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/lib/syntax.ts` — 4 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/lib/syntax.ts` — 4 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/test/lib/syntax.test.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/lib/syntax.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/lib/syntax.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/lib/syntax.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/lib/syntax.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/components/docs/CodeBlock.tsx` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/components/docs/CodeBlock.tsx` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/test/components/docs/CodeBlock.test.tsx` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/test/components/docs/CodeBlockNullRef.test.tsx` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/lib/syntax.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/src/lib/syntax.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/test/lib/syntax.test.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/apps/docs/test/lib/syntax.test.ts` — 1 connection

## Internal relationships

- `codeblocknullref_test` → `codeblock` (imports_from)
- `codeblock_test` → `codeblock` (imports_from)
- `syntax_test` → `syntax` (imports_from)
- `syntax_test` → `syntax_test_textcontent` (contains)
- `syntax_test` → `syntax_test_spansbycolor` (contains)
- `codeblock` → `syntax` (imports_from)
- `codeblock` → `codeblock_recalc` (contains)
- `codeblock` → `codeblock_handlecopy` (contains)
- `syntax` → `syntax_highlightjson` (contains)
- `syntax` → `syntax_highlightbash` (contains)
- `syntax` → `syntax_highlighthtmltags` (contains)
- `syntax` → `syntax_highlighthtml` (contains)
- `syntax` → `syntax_highlightjs` (contains)
- `syntax` → `syntax_highlightcode` (contains)
- `syntax` → `syntax_ishtmlorxml` (contains)
- `syntax` → `syntax_formatresponsebody` (contains)
- `syntax_highlightjson` → `syntax_formatresponsebody` (calls)
- `syntax_highlighthtmltags` → `syntax_highlighthtml` (calls)
- `syntax_highlighthtml` → `syntax_highlightjs` (calls)
- `syntax_highlighthtml` → `syntax_formatresponsebody` (calls)
- `syntax_ishtmlorxml` → `syntax_formatresponsebody` (calls)

## External dependencies

- `page` → `codeblock` (imports_from) [community 3]
- `page` → `syntax` (imports_from) [community 3]