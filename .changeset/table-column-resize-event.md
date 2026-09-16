---
'@takeoff-ui/core': minor
---

Add a `tk-column-resize` event to `tk-table`, emitted once when a column resize
drag ends. Its `ITableColumnResize` detail carries the resized column's `field`
and `width` plus a `widths` map of every column, so apps can persist the layout
and restore it by passing the saved values back as `width` on the column
definitions.

When every column has a width and they add up to less than the table, a filler
column now takes the remaining space so the header, row lines and hover keep
spanning the full width instead of stopping after the last cell.
