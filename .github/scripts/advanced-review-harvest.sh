#!/usr/bin/env bash
# Deterministic pre-analysis for the advanced PR review (runbook phases A+B).
# Everything free-and-certain runs here, before any model:
#   - effective diff size (regenerated artefacts excluded)
#   - lane hints from changed paths
#   - mechanical checks: missing changeset, cross-framework wrapper drift,
#     new public prop without docs, hardcoded colour outside the token layer
# Emits GitHub step outputs (effective_size, generated_size, total_size, lane_hints,
# mechanical) and ::warning annotations for mechanical hits, so these findings surface
# even if the model step fails.
#
# Usage: advanced-review-harvest.sh <pr-number>   (needs GH_TOKEN, a full checkout with
# origin/develop fetched)
set -euo pipefail

PR_NUMBER="${1:?usage: advanced-review-harvest.sh <pr-number>}"
OUT="${GITHUB_OUTPUT:-/dev/stdout}"

FILES_JSON=$(gh pr view "$PR_NUMBER" --json files --jq '.files')

# --- Phase A: effective size -------------------------------------------------
# Generated/regenerated artefacts carry no review signal in this repo: the Stencil
# output targets rewrite the framework wrappers wholesale on every build.
GEN_RE='pnpm-lock\.yaml|components\.d\.ts|interfaces\.d\.ts|packages/vue/lib/components\.ts|packages/react/lib/components/stencil-generated/|packages/angular/projects/library/src/directives/|/dist/|__snapshots__|\.snap$|docs\.json|docs\.d\.ts|/llmstxt-files/|CHANGELOG\.md$'
read -r GEN TOT <<<"$(jq -r --arg re "$GEN_RE" '
  ([.[] | select(.path | test($re)) | .additions + .deletions] | add // 0) as $gen
  | ([.[] | .additions + .deletions] | add // 0) as $tot
  | "\($gen) \($tot)"' <<<"$FILES_JSON")"
EFF=$((TOT - GEN))
{
  echo "generated_size=$GEN"
  echo "total_size=$TOT"
  echo "effective_size=$EFF"
} >>"$OUT"
echo "Diff size — total: $TOT, generated: $GEN, effective: $EFF"

PATHS=$(jq -r '.[].path' <<<"$FILES_JSON")

# --- Phase B: lane hints from paths -----------------------------------------
# Descriptive hints only — the orchestrator may add lanes, never remove one because a
# hint is absent.
hints=""
grep -qE 'packages/core/src/components/' <<<"$PATHS" && hints+="1-component-contract "
grep -qE 'packages/(react|vue|angular)/' <<<"$PATHS" && hints+="2-framework-parity "
grep -qE '\.(scss|css)$|packages/tailwind/|/global/|tokens' <<<"$PATHS" && hints+="3-styling-theming "
grep -qE 'e2e|\.spec\.|__tests__|test/' <<<"$PATHS" && hints+="4-test-integrity "
grep -qE '^docs/|\.mdx$|README' <<<"$PATHS" && hints+="5-docs-api "
grep -qE 'package\.json$|turbo\.json|pnpm-workspace|\.github/|tsconfig' <<<"$PATHS" && hints+="6-build-release "
echo "lane_hints=${hints:-none}" >>"$OUT"
echo "Lane hints: ${hints:-none}"

# --- Phase B: mechanical checks ----------------------------------------------
MECH=""

# 1. Publishable source changed without a changeset. The repo gates releases on
#    changesets (changeset-check.yml); a missing one silently ships nothing.
SRC_CHANGED=$(grep -E '^packages/(core|react|vue|angular|tailwind)/src/' <<<"$PATHS" | grep -vE '(test|spec|__tests__)' || true)
CHANGESET_ADDED=$(grep -E '^\.changeset/.*\.md$' <<<"$PATHS" || true)
LABELS=$(gh pr view "$PR_NUMBER" --json labels --jq '[.labels[].name] | join(",")' || echo "")
if [ -n "$SRC_CHANGED" ] && [ -z "$CHANGESET_ADDED" ] && ! grep -q 'skip-changelog' <<<"$LABELS"; then
  MECH+="MISSING CHANGESET: publishable source changed but no .changeset/*.md was added (and no skip-changelog label)"$'\n'
  echo "::warning::Publishable source changed with no changeset and no skip-changelog label"
fi

# 2. A new public @Prop on a core component with no matching docs page update.
NEW_PROPS=$(gh pr diff "$PR_NUMBER" -- 'packages/core/src/components/**' 2>/dev/null \
  | grep -E '^\+' | grep -oE '@Prop\(\)[[:space:]]+[a-zA-Z0-9_]+' \
  | awk '{print $NF}' | sort -u || true)
if [ -n "$NEW_PROPS" ]; then
  DOCS_TOUCHED=$(grep -E '^docs/' <<<"$PATHS" || true)
  if [ -z "$DOCS_TOUCHED" ]; then
    for p in $NEW_PROPS; do
      MECH+="NEW PROP UNDOCUMENTED: @Prop() $p added but no docs/ file changed in this PR"$'\n'
      echo "::warning::New @Prop() $p added with no docs/ change"
    done
  fi
fi

# 3. Hardcoded hex colour added outside the token/theme layer.
HEX_HITS=$(gh pr diff "$PR_NUMBER" -- 'packages/core/src/components/**' 2>/dev/null \
  | grep -E '^\+' | grep -oE '#[0-9a-fA-F]{3,8}\b' | sort -u | head -5 || true)
if [ -n "$HEX_HITS" ]; then
  MECH+="HARDCODED COLOUR: $(echo "$HEX_HITS" | tr '\n' ' ')— added in component styles; the theme layer expects CSS variables"$'\n'
  echo "::warning::Hardcoded colour(s) added in component styles: $(echo "$HEX_HITS" | tr '\n' ' ')"
fi

# 4. Core component added/removed without the framework wrappers following.
#    The wrappers are generated, but their index/exports are committed.
CORE_COMPONENT_FILES=$(grep -E '^packages/core/src/components/[^/]+/[^/]+\.tsx$' <<<"$PATHS" || true)
if [ -n "$CORE_COMPONENT_FILES" ]; then
  NEW_COMPONENT=$(gh pr diff "$PR_NUMBER" --name-status 2>/dev/null \
    | awk '$1=="A"{print $2}' | grep -E '^packages/core/src/components/[^/]+/[^/]+\.tsx$' || true)
  if [ -n "$NEW_COMPONENT" ]; then
    WRAPPER_TOUCHED=$(grep -E '^packages/(react|vue|angular)/' <<<"$PATHS" || true)
    if [ -z "$WRAPPER_TOUCHED" ]; then
      MECH+="NEW COMPONENT, NO WRAPPER CHANGE: $(echo "$NEW_COMPONENT" | tr '\n' ' ')added but no packages/react|vue|angular file changed — check the wrappers export it"$'\n'
      echo "::warning::New core component added with no framework wrapper change"
    fi
  fi
fi

{
  echo "mechanical<<MECH_EOF"
  echo "${MECH:-none}"
  echo "MECH_EOF"
} >>"$OUT"
echo "Mechanical checks:"; echo "${MECH:-none}"
