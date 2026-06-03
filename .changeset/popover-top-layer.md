---
'@takeoff-ui/core': patch
---

fix(tk-popover): render the open panel in the browser top layer via the native
Popover API so it can no longer be hidden behind sticky `tk-table` cells. The
panel stays inside the component's shadow root, so slotted content, scoped
styles and click-outside dismissal are unaffected. No-ops on browsers without
the Popover API.
