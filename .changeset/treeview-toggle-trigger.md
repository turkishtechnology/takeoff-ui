---
'@takeoff-ui/core': patch
---

Add `toggleTrigger` to `tk-tree-view`. With `toggleTrigger="icon"` only the
arrow icon expands and collapses a branch, clicking the rest of the item just
highlights it, so a branch no longer closes when it is clicked while one of its
children is highlighted. Defaults to `item`, which keeps toggling from anywhere
on the item.

Only a click changes the highlight now, in both trigger modes. Collapsing a
branch highlights that branch instead of clearing the highlight or leaving it on
another item, so `tk-item-click` also fires when a click collapses a branch.
Clicking the highlighted item again removes the highlight, except for a branch
click with the `item` trigger, where the click expands or collapses instead. No
event is emitted for the removal.

A collapse coming from the `expandedKeys` prop no longer clears the highlight
either. It only hides the highlighted row along with its branch, and expanding
that branch again brings the highlight back.

This is the single active item, not the checkbox selection driven by
`selectable`, `value` and `tk-change`.

Also fixes a click on an expanded branch being ignored when nothing inside that
branch was highlighted. `expandedPaths` was mutated in place, so no re-render
was triggered and the collapse only became visible as a side effect of the
highlight being cleared. Affects both basic and stepper mode.
