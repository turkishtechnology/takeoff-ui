---
'@takeoff-ui/core': patch
---

Keep the caret where the user is typing in a masked `tk-input`. Editing the
middle of a value no longer sends the caret to the end, neither when the mask
reformats the field on a keystroke nor when a consumer writes a normalised value
back into `value` while the field still has focus. The most visible case was
`tk-datepicker` in 12-hour date-time mode, where every successful parse echoed
back an " AM"/" PM" suffix and reset the caret a moment after each keystroke.
