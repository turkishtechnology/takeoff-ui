---
'@takeoff-ui/core': patch
---

`tk-table` with client pagination now counts only the filtered rows when new
data arrives while a filter is active, even if `totalItems` is bound to the full
data length.
