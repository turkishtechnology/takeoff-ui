---
'@takeoff-ui/core': patch
---

Add keyboard support to `tk-datepicker`: Enter confirms and closes the panel
when a value is selected (except in apply-button mode), and Escape dismisses it.
Closing works regardless of where focus is inside the panel, including nested
shadow roots.
