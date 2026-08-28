#!/usr/bin/env bash
# Deterministic risk gate for the advanced review's auto-approve path.
#
# Decides whether an AI-approved PR may additionally receive an automated GitHub
# approval. Model output plays NO part in this decision — this is the hard
# boundary that keeps the agent away from protected surfaces and from widening
# its own permissions.
#
# Usage: risk-gate.sh <pr-number>
#   exit 0 → eligible (summary on stdout)
#   exit 1 → not eligible (one reason per line on stdout)
#
# Thresholds are overridable for experiments, not for bypass:
#   RISK_GATE_MAX_LINES (default 300), RISK_GATE_MAX_FILES (default 15)
set -euo pipefail

PR="${1:?usage: risk-gate.sh <pr-number>}"
MAX_LINES="${RISK_GATE_MAX_LINES:-300}"
MAX_FILES="${RISK_GATE_MAX_FILES:-15}"

# Paths where an unreviewed-by-human approval is never acceptable.
PROTECTED_PATTERNS=(
  '.github/'          # the agent must not widen its own cage
  'package.json'      # dependency + publish config changes
  'pnpm-lock.yaml'
  'pnpm-workspace.yaml'
  'turbo.json'
  'tsconfig'
  'Dockerfile'
  '.env'
  'packages/core/src/global/'   # theme/global side effects reach every component
  'eslint.config'
)

PR_JSON=$(gh pr view "$PR" --json files,additions,deletions,headRefName,labels,isDraft)

REASONS=()

if [ "$(jq -r '.isDraft' <<<"$PR_JSON")" = "true" ]; then
  REASONS+=("PR is a draft")
fi

FILE_COUNT=$(jq '.files | length' <<<"$PR_JSON")
# Size is measured on PRODUCTION code only: tests lower risk, they don't raise
# it. The file-count cap still counts every file.
PROD_LINES=$(jq '[.files[]
  | select((.path | test("(\\.spec\\.|\\.e2e\\.|__tests__/|(^|/)test/)")) | not)
  | select((.path | test("(pnpm-lock\\.yaml|components\\.d\\.ts|stencil-generated/|CHANGELOG\\.md$)")) | not)
  | .additions + .deletions] | add // 0' <<<"$PR_JSON")

if [ "$PROD_LINES" -gt "$MAX_LINES" ]; then
  REASONS+=("production diff is $PROD_LINES lines (cap $MAX_LINES)")
fi
if [ "$FILE_COUNT" -gt "$MAX_FILES" ]; then
  REASONS+=("touches $FILE_COUNT files (cap $MAX_FILES)")
fi

PATHS=$(jq -r '.files[].path' <<<"$PR_JSON")
for pat in "${PROTECTED_PATTERNS[@]}"; do
  HIT=$(grep -F "$pat" <<<"$PATHS" || true)
  if [ -n "$HIT" ]; then
    REASONS+=("touches protected path matching '$pat': $(echo "$HIT" | head -3 | tr '\n' ' ')")
  fi
done

# A PR carrying no changeset while changing publishable source is a release
# hazard; never auto-approve it.
SRC_CHANGED=$(grep -E '^packages/(core|react|vue|angular|tailwind)/src/' <<<"$PATHS" | grep -vE '(spec|e2e|__tests__|/test/)' || true)
CHANGESET_ADDED=$(grep -E '^\.changeset/.*\.md$' <<<"$PATHS" || true)
LABELS=$(jq -r '[.labels[].name] | join(",")' <<<"$PR_JSON")
if [ -n "$SRC_CHANGED" ] && [ -z "$CHANGESET_ADDED" ] && ! grep -q 'skip-changelog' <<<"$LABELS"; then
  REASONS+=("publishable source changed with no changeset and no skip-changelog label")
fi

if [ ${#REASONS[@]} -gt 0 ]; then
  echo "NOT ELIGIBLE for automated approval:"
  printf '  - %s\n' "${REASONS[@]}"
  exit 1
fi

echo "ELIGIBLE for automated approval:"
echo "  - production diff: $PROD_LINES lines (cap $MAX_LINES)"
echo "  - files touched: $FILE_COUNT (cap $MAX_FILES)"
echo "  - no protected path touched"
echo "  - changeset present or explicitly skipped"
exit 0
