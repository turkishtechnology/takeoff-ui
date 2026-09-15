---
'@takeoff-ui/core': patch
---

Fix floating panels rendered in Shadow DOM (`tk-popover`, `tk-tooltip`,
`tk-datepicker`, `tk-color-picker`) so the panel and its slotted content are
hidden when the trigger leaves the viewport, and clear the hidden state during
cleanup.
