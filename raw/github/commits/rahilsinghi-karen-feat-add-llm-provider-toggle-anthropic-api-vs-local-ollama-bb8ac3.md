---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:37f37b3
ingested_at: 2026-04-13T17:05:37.807Z
parsed_at: 2026-04-13T17:05:37.807Z
compiled_to: "[[LLM Provider Toggle (Anthropic API vs Local Ollama) in Karen Project]]"
processed_at: 2026-04-13T17:41:25.172Z
retry_count: 0
last_error: null
compile_progress: null
---



# feat: add LLM provider toggle (Anthropic API vs local Ollama)

- **Repo:** rahilsinghi/karen
- **SHA:** 37f37b3
- **Date:** 2026-04-04T15:28:19Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +1439
- **Deletions:** -0

- Add backend/services/llm_provider.py with AnthropicProvider + OllamaProvider
- Add ollama service to docker-compose.yml with named volume
- Add AI_PROVIDER, LOCAL_MODEL env vars to .env.example
- Add docs/FRONTEND_SPEC_FOR_SARIYA.md (1325-line frontend spec)

Set AI_PROVIDER=local in .env to use Ollama instead of Claude API.
Default remains anthropic (no behavior change without explicit opt-in).

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
