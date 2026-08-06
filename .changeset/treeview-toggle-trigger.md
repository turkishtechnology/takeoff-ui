---
'@takeoff-ui/core': minor
---

Add `toggleTrigger` to `tk-tree-view`. With `toggleTrigger="icon"` only the
arrow icon expands and collapses a branch, clicking the rest of the item just
highlights it, so a branch no longer closes when it is clicked while one of its
children is highlighted. Defaults to `item`, which keeps toggling from anywhere
on the item.

Only a click changes the highlight now, in both trigger modes. Collapsing a
branch highlights that branch instead of clearing the highlight or leaving it on
another item, so `tk-item-click` also fires when a click collapses a branch.
Clicking the highlighted item again removes the highlight, except when that
click also expands or collapses. No event is emitted for the removal.

With `toggleTrigger="icon"` the arrow is the only expansion control in stepper
mode as well, so clicking a leaf no longer closes the columns next to it.

A collapse coming from the `expandedKeys` prop no longer clears the highlight
either. It only hides the highlighted row along with its branch, and expanding
that branch again brings the highlight back.

This is the single active item, not the checkbox selection driven by
`selectable`, `value` and `tk-change`.

Also fixes a click on an expanded branch being ignored when nothing inside that
branch was highlighted. `expandedPaths` was mutated in place, so no re-render
was triggered and the collapse only became visible as a side effect of the
highlight being cleared. Affects both basic and stepper mode.

To migrate: the highlight rules apply to the default `toggleTrigger="item"` as
well, so they reach consumers that never set the prop. Review every
`tk-item-click` handler, because it now fires in three cases where it used to
stay silent: collapsing a branch, clicking a branch whose child was highlighted,
and clicking the arrow icon of an already highlighted branch. Handlers that
navigate, fetch, or reset a detail pane will run on those interactions. Nothing
is emitted when a second click on the highlighted item removes the highlight, so
a consumer mirroring the active item in its own state should clear it on the
next `tk-item-click` rather than expect an event for the removal. No prop or
event was renamed or removed, no event payload changed, and the `selected` CSS
class is unchanged, so stylesheets targeting it keep working.
