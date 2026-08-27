---
'@takeoff-ui/core': patch
---

Add Enter key and trailing chevron icon as apply triggers for the
`tk-pagination` page input, and gate the existing blur behaviour behind the new
`applyPageOnBlur` prop (defaults to `true`). `tk-table` forwards the same prop
to its pagination.
