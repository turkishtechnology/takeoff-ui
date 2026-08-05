---
'@takeoff-ui/core': patch
---

Add `toggleTrigger` to `tk-tree-view`. With `toggleTrigger="icon"` only the
arrow icon expands and collapses a branch, clicking the rest of the item just
highlights it, so a branch no longer closes when it is clicked while one of its
children is highlighted. Defaults to `item`, which keeps toggling from anywhere
on the item.

Collapsing a branch now keeps that branch highlighted instead of clearing the
highlight, in both trigger modes. Expanding already highlighted the branch, so
the same control no longer highlights on one click and clears it on the next. A
highlight outside the collapsed subtree is still left untouched. This is the
single active item behind `tk-item-click`, not the checkbox selection driven by
`selectable`, `value` and `tk-change`.

Also fixes a click on an expanded branch being ignored when nothing inside that
branch was highlighted. `expandedPaths` was mutated in place, so no re-render
was triggered and the collapse only became visible as a side effect of the
highlight being cleared. Affects both basic and stepper mode.

The class marking that item is renamed from `selected` to `highlighted`, so it
no longer reads as the checkbox selection. `tk-tree-view` renders without shadow
DOM, so any stylesheet targeting `.tk-tree-view.label.selected` or
`.node.selected` has to be updated to `.highlighted`.
