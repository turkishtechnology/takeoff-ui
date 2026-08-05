---
'@takeoff-ui/core': patch
---

Add `toggleTrigger` to `tk-tree-view`. With `toggleTrigger="icon"` only the
arrow icon expands and collapses a branch, clicking the rest of the item just
highlights it, so a branch no longer closes when it is clicked while one of its
children is highlighted. Defaults to `item`, which keeps toggling from anywhere
on the item.

The highlight now always follows the last clicked item, in both trigger modes.
Collapsing a branch highlights that branch instead of clearing the highlight or
leaving it on another item, so `tk-item-click` also fires when a click collapses
a branch. This is the single active item, not the checkbox selection driven by
`selectable`, `value` and `tk-change`.

Also fixes a click on an expanded branch being ignored when nothing inside that
branch was highlighted. `expandedPaths` was mutated in place, so no re-render
was triggered and the collapse only became visible as a side effect of the
highlight being cleared. Affects both basic and stepper mode.
