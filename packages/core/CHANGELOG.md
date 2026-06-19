# @takeoff-ui/core

## 0.11.9

### Patch Changes

- 75ba2ba: Update asterisk style in currency input.
- fa6c5dc: Add min and max props to currency-input component. The value is
  clamped to the range both when set via the `value` prop and on blur, the clamp
  respects `precision` and `allowNegative`, and an inverted range (min > max)
  still honors min.
- 603c6a5: Fix and extend the `tk-input` `maskOptions.regex` mask. Typing an
  invalid character no longer wipes the field; input is now validated
  incrementally so anchored, full-value patterns (e.g. `/^[0-9,]{1,10}$/`),
  alternation, groups, and quantifiers all work as the user types, with length
  limits enforced. Unsupported syntax (lookarounds, back-references) and invalid
  patterns safely disable the mask instead of throwing.

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
