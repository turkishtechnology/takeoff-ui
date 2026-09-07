---
'@takeoff-ui/core': patch
---

Fix floating panels rendered in Shadow DOM so slotted content is hidden when the
trigger leaves the viewport, and clear the hidden state during cleanup.
