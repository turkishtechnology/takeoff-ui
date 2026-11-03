---
'@takeoff-ui/core': patch
---

fix(tk-tree-view): In `stepper` mode the `selectAll` row now heads the first
column with the root items nested under it, instead of standing beside the
columns as a lone item. Rows and the `selectAll` row also keep their padding
inside their width, so the highlight no longer overflows its column in apps
without a global `box-sizing: border-box` reset.
