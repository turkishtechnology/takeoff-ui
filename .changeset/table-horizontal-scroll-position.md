---
'@takeoff-ui/core': patch
---

Add `horizontalScrollPosition` prop to `tk-table` for placing the horizontal
scrollbar above the table, so it stays reachable without scrolling to the bottom
of a long table. It defaults to `bottom`, `top` moves the bar above the table
and drops the table's own one, and `both` keeps a bar on each side. The two bars
stay in sync in either direction, and the top one is hidden while there is
nothing to scroll horizontally.

In `top` and `both` the table is wrapped in a frame that carries its border, so
the top scrollbar sits inside the table the way the bottom one does.
