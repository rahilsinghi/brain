# Graphify Phase 1 — Fork + CLI Entry Point

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fork Graphify, strip unnecessary modules, add a Brain-integrated CLI entry point, and validate end-to-end AST extraction on a real repo.

**Architecture:** Graphify runs as a standalone Python CLI (`graphify_cli.py`) invoked by Brain's TypeScript source layer. This phase establishes the fork, the CLI, the Python venv, and validates the pipeline independently before Brain integration (Phase 2).

**Tech Stack:** Python 3.11+, uv (package manager), tree-sitter (AST), NetworkX (graph), graspologic (community detection)

**Spec:** `docs/specs/2026-04-10-brain-graphify-fusion-design.md` — Sections 4.1-4.4, 15 (Phase 1)

---

### Task 1: Fork and clone Graphify

**Files:**
- New repo: `~/Desktop/graphify` (local clone of `github.com/rahilsinghi/graphify`)

- [ ] **Step 1: Fork on GitHub**

```bash
gh repo fork safishamsi/graphify --clone=false --fork-name graphify
```

If the fork already exists or needs to be private:

```bash
gh repo create rahilsinghi/graphify --private --clone
```

- [ ] **Step 2: Clone locally**

```bash
cd ~/Desktop
git clone git@github.com:rahilsinghi/graphify.git
```

- [ ] **Step 3: Verify clone**

```bash
ls ~/Desktop/graphify/graphify/
```

Expected: Python source files including `extract.py`, `build.py`, `cluster.py`, `analyze.py`, `report.py`, `detect.py`, `cache.py`, `export.py`, `validate.py`, `security.py`, `wiki.py`

---

### Task 2: Strip unnecessary modules from fork

**Files:**
- Delete: `skill.md`, `__main__.py`, `serve.py`, `watch.py`, `transcribe.py`
- Modify: `export.py` (keep only `to_json()`)

Per spec Section 4.2 — Brain orchestrates scheduling, serving, and transcription. Only the pure extraction/analysis library is needed.

- [ ] **Step 1: Remove files that Brain replaces**

```bash
cd ~/Desktop/graphify
rm -f skill.md
rm -f graphify/__main__.py
rm -f graphify/serve.py
rm -f graphify/watch.py
rm -f graphify/transcribe.py
```

- [ ] **Step 2: Strip `export.py` to `to_json()` only**

Open `graphify/export.py`. Remove all functions except `to_json()`, `attach_hyperedges()`, and their direct imports. Remove imports for HTML/SVG/Canvas/Neo4j rendering libraries (vis.js, matplotlib, neo4j).

Keep:
- `to_json(G, communities, output_path)`
- `attach_hyperedges(G, hyperedges)`

Remove all other export functions.

- [ ] **Step 3: Verify the library still imports cleanly**

```bash
cd ~/Desktop/graphify
python3 -c "from graphify import extract; print('extract OK')"
python3 -c "from graphify.export import to_json; print('to_json OK')"
```

Expected: Both print OK without ImportError.

- [ ] **Step 4: Commit**

```bash
cd ~/Desktop/graphify
git add -A
git commit -m "chore: strip modules replaced by Brain (serve, watch, transcribe, __main__, skill)"
```

---

### Task 3: Add CLI entry point — `graphify_cli.py`

**Files:**
- Create: `~/Desktop/graphify/graphify_cli.py`

The full implementation is provided in spec Section 4.3. This is a ~120-line script that chains: detect → extract → build → cluster → analyze → report → export.

- [ ] **Step 1: Create `graphify_cli.py` in the repo root**

Copy the full code from spec Section 4.3 verbatim. The file starts with the shebang `#!/usr/bin/env python3` and the docstring, then imports from the graphify package, defines `main()`, and ends with `if __name__ == "__main__": main()`.

Key pipeline stages:
1. `detect()` / `detect_incremental()` — find code files
2. `extract(paths)` — AST extraction (cached per SHA256)
3. `build_from_json(extractions)` — NetworkX graph
4. `cluster(G)` + `score_all(G, communities)` — community detection
5. `god_nodes()`, `surprising_connections()`, `suggest_questions()` — analysis
6. `generate_report()` → `{repo}-architecture.md`
7. `to_json()` → `{repo}-graph.json`
8. File-level summaries → `file-summaries/{slug}.md`

**v1 limitation:** The `--semantic` flag only returns previously cached results. Fresh semantic inference on uncached files is deferred to v2.

- [ ] **Step 2: Make it executable**

```bash
chmod +x ~/Desktop/graphify/graphify_cli.py
```

- [ ] **Step 3: Verify it parses without syntax errors**

```bash
cd ~/Desktop/graphify
python3 -c "import ast; ast.parse(open('graphify_cli.py').read()); print('syntax OK')"
```

- [ ] **Step 4: Commit**

```bash
cd ~/Desktop/graphify
git add graphify_cli.py
git commit -m "feat: add Brain-integrated CLI entry point (graphify_cli.py)"
```

---

### Task 4: Add `requirements-graphify.txt` to Brain repo

**Files:**
- Create: `~/Desktop/brain/requirements-graphify.txt`

Per spec Section 4.4 — the deps file lives in the Brain repo since Brain orchestrates installation.

- [ ] **Step 1: Create `requirements-graphify.txt`**

```
networkx>=3.0
tree-sitter>=0.23
tree-sitter-python>=0.23
tree-sitter-javascript>=0.23
tree-sitter-typescript>=0.23
tree-sitter-go>=0.23
tree-sitter-rust>=0.23
tree-sitter-java>=0.23
tree-sitter-c>=0.23
tree-sitter-cpp>=0.23
tree-sitter-ruby>=0.23
tree-sitter-c-sharp>=0.23
graspologic>=3.0
```

- [ ] **Step 2: Commit**

```bash
cd ~/Desktop/brain
git add requirements-graphify.txt
git commit -m "chore: add Python requirements for Graphify CLI"
```

---

### Task 5: Create setup script and persistent venv

**Files:**
- Create: `~/Desktop/brain/scripts/graphify/setup.sh`

Per spec Section 5.1 — Brain uses a persistent venv at `scripts/graphify/.venv` rather than inline `--with` flags. The setup script creates the venv and installs deps once.

- [ ] **Step 1: Create the directory structure**

```bash
mkdir -p ~/Desktop/brain/scripts/graphify
```

- [ ] **Step 2: Create `setup.sh`**

```bash
#!/usr/bin/env bash
# Setup persistent Python venv for Graphify CLI
# Run once after clone, or after updating requirements-graphify.txt
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BRAIN_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
VENV_DIR="$SCRIPT_DIR/.venv"

echo "[graphify] Creating venv at $VENV_DIR..."
uv venv "$VENV_DIR"

echo "[graphify] Installing deps from requirements-graphify.txt..."
uv pip install --python "$VENV_DIR/bin/python" -r "$BRAIN_ROOT/requirements-graphify.txt"

# Install the local graphify fork in editable mode
GRAPHIFY_REPO="$HOME/Desktop/graphify"
if [ -d "$GRAPHIFY_REPO" ]; then
    echo "[graphify] Installing graphify fork from $GRAPHIFY_REPO..."
    uv pip install --python "$VENV_DIR/bin/python" -e "$GRAPHIFY_REPO"
else
    echo "[graphify] WARNING: Graphify repo not found at $GRAPHIFY_REPO"
    echo "[graphify] Clone it first: git clone git@github.com:rahilsinghi/graphify.git ~/Desktop/graphify"
    exit 1
fi

echo "[graphify] Setup complete. venv at: $VENV_DIR"
echo "[graphify] Test with: $VENV_DIR/bin/python -c 'from graphify import extract; print(\"OK\")'"
```

- [ ] **Step 3: Make it executable**

```bash
chmod +x ~/Desktop/brain/scripts/graphify/setup.sh
```

- [ ] **Step 4: Add `.venv` to `.gitignore`**

```bash
echo "scripts/graphify/.venv/" >> ~/Desktop/brain/.gitignore
```

- [ ] **Step 5: Run the setup script**

```bash
~/Desktop/brain/scripts/graphify/setup.sh
```

Expected: venv created, deps installed, graphify fork installed in editable mode.

- [ ] **Step 6: Verify the venv works**

```bash
~/Desktop/brain/scripts/graphify/.venv/bin/python -c "from graphify import extract; print('OK')"
~/Desktop/brain/scripts/graphify/.venv/bin/python -c "from graphify.export import to_json; print('OK')"
~/Desktop/brain/scripts/graphify/.venv/bin/python -c "import networkx; print('networkx', networkx.__version__)"
```

- [ ] **Step 7: Commit**

```bash
cd ~/Desktop/brain
git add scripts/graphify/setup.sh .gitignore
git commit -m "feat: add Graphify venv setup script (scripts/graphify/setup.sh)"
```

---

### Task 6: Symlink CLI into Brain scripts directory

**Files:**
- Create: `~/Desktop/brain/scripts/graphify/graphify_cli.py` (symlink)

The source in spec Section 5.1 shows `venvPython` invoking `join(vaultRoot, "scripts", "graphify", "graphify_cli.py")`. Brain needs a symlink to the fork.

- [ ] **Step 1: Symlink the CLI into Brain's scripts dir**

```bash
ln -s ~/Desktop/graphify/graphify_cli.py ~/Desktop/brain/scripts/graphify/graphify_cli.py
```

- [ ] **Step 2: Verify the symlink resolves**

```bash
~/Desktop/brain/scripts/graphify/.venv/bin/python ~/Desktop/brain/scripts/graphify/graphify_cli.py --help
```

Expected: prints usage/help from argparse (or errors on missing `--repos`).

- [ ] **Step 3: Commit**

```bash
cd ~/Desktop/brain
git add scripts/graphify/graphify_cli.py
git commit -m "chore: symlink graphify_cli.py into brain scripts dir"
```

---

### Task 7: End-to-end validation — run CLI on karen repo

- [ ] **Step 1: Run the CLI on karen**

```bash
~/Desktop/brain/scripts/graphify/.venv/bin/python \
    ~/Desktop/brain/scripts/graphify/graphify_cli.py \
    --repos ~/Desktop/karen \
    --output-dir /tmp/graphify-test
```

Expected: `[graphify] karen: N nodes, M edges, C communities → /tmp/graphify-test/karen`

- [ ] **Step 2: Verify output structure**

```bash
ls -la /tmp/graphify-test/karen/
```

Expected:
- `karen-architecture.md` — the GRAPH_REPORT markdown
- `karen-graph.json` — the NetworkX graph JSON
- `file-summaries/` — directory with per-file markdown summaries

- [ ] **Step 3: Verify the architecture report is valid markdown**

```bash
head -30 /tmp/graphify-test/karen/karen-architecture.md
```

- [ ] **Step 4: Verify the graph JSON is valid**

```bash
python3 -c "
import json
with open('/tmp/graphify-test/karen/karen-graph.json') as f:
    data = json.load(f)
print(f'nodes: {len(data.get(\"nodes\", []))}, edges: {len(data.get(\"edges\", data.get(\"links\", [])))}')
"
```

- [ ] **Step 5: Verify file summaries exist**

```bash
ls /tmp/graphify-test/karen/file-summaries/ | head -5
```

- [ ] **Step 6: Test incremental mode (second run should be fast)**

```bash
time ~/Desktop/brain/scripts/graphify/.venv/bin/python \
    ~/Desktop/brain/scripts/graphify/graphify_cli.py \
    --repos ~/Desktop/karen \
    --output-dir /tmp/graphify-test \
    --incremental
```

Expected: completes faster than the first run due to SHA256 cache hits.

- [ ] **Step 7: Clean up test output**

```bash
rm -rf /tmp/graphify-test
```

---

### Task 8: Push fork to GitHub

- [ ] **Step 1: Push the graphify fork**

```bash
cd ~/Desktop/graphify
git push -u origin main
```

- [ ] **Step 2: Verify on GitHub**

```bash
gh repo view rahilsinghi/graphify
```

---

## Summary

| Task | Time Est. | What |
|------|-----------|------|
| 1. Fork + clone | 2 min | GitHub fork, local clone |
| 2. Strip modules | 3 min | Remove serve/watch/transcribe/__main__/skill, trim export.py |
| 3. CLI entry point | 4 min | Create graphify_cli.py from spec Section 4.3 |
| 4. Requirements file | 2 min | requirements-graphify.txt in brain repo |
| 5. Setup script + venv | 5 min | setup.sh, create venv, install deps |
| 6. Symlink CLI | 2 min | Link CLI into brain scripts dir |
| 7. E2E validation | 5 min | Run on karen, verify all outputs |
| 8. Push | 2 min | Push both repos |
| **Total** | **~25 min** | |

**Next:** Phase 2 — Brain source (`src/sources/graphify.ts`), config wiring, cron integration, wiki article compilation.
