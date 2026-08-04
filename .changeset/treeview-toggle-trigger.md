---
'@takeoff-ui/core': patch
---

Add `toggleTrigger` to `tk-tree-view`. With `toggleTrigger="icon"` only the
arrow icon expands and collapses a branch, clicking the rest of the item just
selects it, so a branch no longer closes when it is clicked while one of its
children is selected. Defaults to `item`, which keeps toggling from anywhere on
the item.

Collapsing a branch now keeps that branch selected instead of clearing the
selection, in both trigger modes. Expanding already selected the branch, so the
same control no longer selects and deselects on alternating clicks. A selection
outside the collapsed subtree is still left untouched.

Also fixes a click on an expanded branch being ignored when nothing inside that
branch was selected. `expandedPaths` was mutated in place, so no re-render was
triggered and the collapse only became visible as a side effect of the selection
being cleared. Affects both basic and stepper mode.
