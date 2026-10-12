---
'@takeoff-ui/core': patch
---

`tk-pagination` (and so `tk-table`) no longer keeps a minus or any other
non-digit on screen when it is typed in front of the page number in the page
input; the field only ever shows digits.
