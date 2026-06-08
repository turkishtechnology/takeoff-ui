# @takeoff-ui/core

## 0.11.8

### Patch Changes

- 83e9012: fix(tk-popover): render the open panel in the browser top layer via
  the native Popover API so it can no longer be hidden behind sticky `tk-table`
  cells. The panel stays inside the component's shadow root, so slotted content,
  scoped styles and click-outside dismissal are unaffected. No-ops on browsers
  without the Popover API.

## 0.11.7

### Patch Changes

- fab25d6: Fix Turkish character rendering in PDF export in table component
- 796a712: Fix security findings (turbo, ws, brace-expansion)
