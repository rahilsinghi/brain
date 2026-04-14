#!/bin/bash
set -euo pipefail

BRAIN_API="http://127.0.0.1:3577"

# --- Usage ---
if [ $# -lt 1 ]; then
  echo "Usage: brain-connect <repo-path>"
  echo "  Onboards a repo into the brain knowledge graph."
  echo ""
  echo "Example: brain-connect ~/Desktop/maison"
  exit 1
fi

REPO_PATH="$(cd "$1" && pwd)"
REPO_NAME="$(basename "$REPO_PATH")"

# --- Validate ---
if [ ! -d "$REPO_PATH/.git" ]; then
  echo "Error: $REPO_PATH is not a git repository (no .git directory found)."
  exit 1
fi

echo "Connecting $REPO_NAME to brain..."
echo ""

# --- Step 1: Post-commit hook ---
HOOK_FILE="$REPO_PATH/.git/hooks/post-commit"
HOOK_MARKER="# Brain auto-sync"
HOOK_BODY='
# Brain auto-sync: re-graphify on each commit
curl -s -X POST http://127.0.0.1:3577/graphify \
  -H "Content-Type: application/json" \
  -d "{\"repo_path\": \"$(git rev-parse --show-toplevel)\"}" > /dev/null 2>&1 &'

if [ -f "$HOOK_FILE" ] && grep -q "$HOOK_MARKER" "$HOOK_FILE"; then
  echo "  Post-commit hook: already installed (skipped)"
else
  if [ -f "$HOOK_FILE" ]; then
    # Append to existing hook
    echo "$HOOK_BODY" >> "$HOOK_FILE"
    echo "  Post-commit hook: appended to existing hook"
  else
    # Create new hook
    echo "#!/bin/bash" > "$HOOK_FILE"
    echo "$HOOK_BODY" >> "$HOOK_FILE"
    echo "  Post-commit hook: installed"
  fi
  chmod +x "$HOOK_FILE"
fi

# --- Step 2: CLAUDE.md brain context ---
CLAUDE_MD="$REPO_PATH/CLAUDE.md"
BRAIN_SECTION="## Brain Context
This repo is connected to the brain knowledge graph via graphify.
When you need architectural context, call brain_query with questions about this repo.
Use brain_graphify to refresh the graph if you've made significant structural changes.
The brain has community-level wiki articles, cross-project connections, and historical context."

if [ -f "$CLAUDE_MD" ]; then
  if grep -q "## Brain Context" "$CLAUDE_MD"; then
    echo "  CLAUDE.md: brain context already present (skipped)"
  else
    printf "\n\n%s\n" "$BRAIN_SECTION" >> "$CLAUDE_MD"
    echo "  CLAUDE.md: brain context appended"
  fi
else
  printf "# %s\n\n%s\n" "$REPO_NAME" "$BRAIN_SECTION" > "$CLAUDE_MD"
  echo "  CLAUDE.md: created with brain context"
fi

# --- Step 3: Initial graphify ---
echo "  Graphify: starting extraction..."
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BRAIN_API/graphify" \
  -H "Content-Type: application/json" \
  -d "{\"repo_path\": \"$REPO_PATH\"}" 2>&1) || true

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "202" ] || [ "$HTTP_CODE" = "200" ]; then
  echo "  Graphify: extraction started"
else
  echo "  Graphify: request failed (HTTP $HTTP_CODE) - is the brain daemon running?"
  echo "           Start it with: cd ~/Desktop/brain && pnpm start"
fi

# --- Summary ---
echo ""
echo "Done! Brain connected to $REPO_NAME"
echo "  - Post-commit hook: installed"
echo "  - CLAUDE.md: brain context added"
echo "  - Deep link: https://brain.rahilsinghi.com/?focus=project:$REPO_NAME&depth=2"
