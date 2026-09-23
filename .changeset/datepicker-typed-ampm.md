---
'@takeoff-ui/core': patch
---

`tk-datepicker`: typing a 24-hour time such as `14:30` in 12-hour mode now moves
the AM/PM toggle immediately instead of leaving the meridiem seeded from the
wall clock until the input loses focus.
