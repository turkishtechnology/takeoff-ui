# @takeoff-ui/core

## 0.12.0

### Minor Changes

- 504e92a: Add animated button styling via the `animated` prop, with support
  across all variants for both filled and outlined types.
- 1e7c76d: Add a `purple` variant to `tk-button`, including its animated style.
- 60b46db: Add lazy loading to `tk-tree-view` via the `lazy` prop. Expanding a
  branch without children emits `tk-load`, and `loadingKeys` / `loadedKeys`
  drive the spinner and keep a branch from being requested twice. Branches that
  are not loaded yet are marked with `hasChildren: true`.
- 1e2ffe4: Add `firstSortOrder` to `ITableColumn` so a column's sort icon can
  start from `desc` instead of the default `asc`.
- 6ef5661: Add a `maskOptions` prop to `tk-select` that masks the text typed
  into the editable select input, using the same `IInputMaskOptions` as
  `tk-input` (Cleave.js options or a `regex` validated as the user types).
  Filtering runs on the masked text, and with `allowCustomValue` the masked text
  becomes the value. It has no effect in `multiple` mode, where the input
  renders chips instead of a text field.
- 685920e: Add a `tk-column-resize` event to `tk-table`, emitted once when a
  column resize drag ends. Its `ITableColumnResize` detail carries the resized
  column's `field` and `width` plus a `widths` map of every column, so apps can
  persist the layout and restore it by passing the saved values back as `width`
  on the column definitions.

  When every column has a width and they add up to less than the table, a filler
  column now takes the remaining space so the header, row lines and hover keep
  spanning the full width instead of stopping after the last cell.

- 2511afe: Add a `showCopyButton` prop to `tk-textarea` that renders a copy
  button next to the label to copy the current value to the clipboard.
- e0e3f07: Add `toggleTrigger` to `tk-tree-view`. With `toggleTrigger="icon"`
  only the arrow icon expands and collapses a branch, clicking the rest of the
  item just highlights it, so a branch no longer closes when it is clicked while
  one of its children is highlighted. Defaults to `item`, which keeps toggling
  from anywhere on the item.

  Only a click changes the highlight now, in both trigger modes. Collapsing a
  branch highlights that branch instead of clearing the highlight or leaving it
  on another item, so `tk-item-click` also fires when a click collapses a
  branch. Clicking the highlighted item again removes the highlight, except when
  that click also expands or collapses. No event is emitted for the removal.

  With `toggleTrigger="icon"` the arrow is the only expansion control in stepper
  mode as well, so clicking a leaf no longer closes the columns next to it.

  A collapse coming from the `expandedKeys` prop no longer clears the highlight
  either. It only hides the highlighted row along with its branch, and expanding
  that branch again brings the highlight back.

  This is the single active item, not the checkbox selection driven by
  `selectable`, `value` and `tk-change`.

  Also fixes a click on an expanded branch being ignored when nothing inside
  that branch was highlighted. `expandedPaths` was mutated in place, so no
  re-render was triggered and the collapse only became visible as a side effect
  of the highlight being cleared. Affects both basic and stepper mode.

  `tk-item-click` now reports a change of the highlighted item, so it fires once
  when the highlight moves and stays silent when a click leaves it where it was.
  Repeatedly toggling the same branch emits only on the first click.

  To migrate: the highlight rules apply to the default `toggleTrigger="item"` as
  well, so they reach consumers that never set the prop. Review every
  `tk-item-click` handler, because it now fires in two cases where it used to
  stay silent: collapsing a branch, and clicking a branch whose child was
  highlighted. Handlers that navigate, fetch, or reset a detail pane will run on
  those interactions. Nothing is emitted when a second click on the highlighted
  item removes the highlight, so a consumer mirroring the active item in its own
  state should clear it on the next `tk-item-click` rather than expect an event
  for the removal. No prop or event was renamed or removed, no event payload
  changed, and the `selected` CSS class is unchanged, so stylesheets targeting
  it keep working.

### Patch Changes

- e18aade: Add size-aware calendar and time picker controls to `tk-datepicker`.
- 0fa1cf1: Add keyboard handling for the chips of `tk-input`: the arrow keys
  walk the chips next to the text field, and Backspace or Delete removes the one
  they land on. Out of an empty text field the first Backspace only aims at the
  last chip, so no chip is ever removed before it has been pointed at. Chips
  that carry no remove button are stepped over, which covers disabled ones as
  well as indicator chips such as the `+2` of a collapsed `tk-select`.

  `tk-chips` gained a `focused` prop for this, drawing the same ring its pressed
  state uses. In `tk-select` the keys reach the selection through the chip
  removal path that was already there, so an `editable` `multiple` select can
  now be emptied from the keyboard.

- 8be73fc: Detect elements by `nodeType`/`tagName` instead of
  `instanceof HTMLElement` in `tk-select`'s `panelTopHtml` and `tk-table`'s
  row-click handler, so an element created in another realm — an iframe, or a
  different document — is still recognised. Previously `tk-select` stringified
  such an element into the panel and `tk-table` emitted `tk-row-click` for
  clicks that came from a `tk-popover` or `tk-dropdown` inside the row.
- 87e363a: Add a search box to the `tk-currency-input` dropdown, matching the
  one in `tk-phone-input`. Typing filters the currency list by code, name or
  symbol; the search term is cleared whenever the dropdown closes or a currency
  is selected.
- 10fe86d: Add `maxIntegerDigits` prop to `tk-currency-input` for limiting how
  many digits the integer part can hold, and re-clamp the value when `precision`
  changes so a rounded value can no longer escape the configured bounds.

  The limit is capped at 15 significant digits (integer plus decimal) so its
  bound stays exactly representable as a JavaScript number; beyond that the
  bound rounded up and admitted one digit more than configured. When
  `allowNegative` is false, an over-limit negative `value` now clamps to the
  positive bound instead of storing a negative number the field can neither
  display nor produce.

- f02ab84: Add `addedLabel`, `loadingLabel`, and `failedLabel` props to
  `tk-upload` for customizing the file status labels.
- d8202aa: Add keyboard support to `tk-datepicker`: Enter confirms and closes
  the panel when a value is selected (except in apply-button mode), and Escape
  dismisses it. Closing works regardless of where focus is inside the panel,
  including nested shadow roots. Escape dismisses rather than reverts — outside
  apply-button mode changes are emitted as they happen, so they are kept.
- 533ea3c: Fix slot detection and two rendering defects surfaced while making
  these components testable.

  `tk-dialog`, `tk-card`, `tk-color-picker` and `tk-accordion-item` detected
  their slots with `:scope > [slot="..."]`, which Stencil's mock-doc cannot
  parse, so `componentWillLoad` threw under spec tests. They now use a
  `hasDirectSlot` helper with identical direct-child semantics.

  `tk-dialog` passed a boolean to `aria-modal`, which renders as `aria-modal=""`
  and is invalid ARIA, so assistive technology did not treat the dialog as
  modal.

  `tk-card` rendered an empty shell when `imageOptions.position` was `left` or
  `right` without `horizontal`, or when `imageOptions` omitted `position`
  entirely; both now fall back to the standard vertical stack.

- f6a13c8: Fix Editor swallowing the first user edit after an external value
  update by emitting Tiptap's update event on programmatic `setContent`.
- 2300cd3: Fix icon-only button dimensions to render as square controls for each
  size.
- 2ed2a17: Fix floating panels rendered in Shadow DOM (`tk-popover`,
  `tk-tooltip`, `tk-datepicker`, `tk-color-picker`) so the panel and its slotted
  content are hidden when the trigger leaves the viewport, and clear the hidden
  state during cleanup.
- d06799a: Fix TreeView select-all badge visibility to respect `showBadge` and
  `showZeroCountBadges`.
- c21818a: Fix `tk-select` keyboard navigation after opening the dropdown from
  the chevron icon.
- 8745db9: Fix currency input paste handling for comma decimal values.
- 176ac3c: Update header type colors across header-capable components.
- 34e33bc: Add `label` slot support to `tk-input`.
- 83890e2: Add containerStyle prop to button component
- 40e774a: Keep the caret where the user is typing in a masked `tk-input`.
  Editing the middle of a value no longer sends the caret to the end, neither
  when the mask reformats the field on a keystroke nor when a consumer writes a
  normalised value back into `value` while the field still has focus. The most
  visible case was `tk-datepicker` in 12-hour date-time mode, where every
  successful parse echoed back an " AM"/" PM" suffix and reset the caret a
  moment after each keystroke.
- a7d61c9: Add Enter key and trailing chevron icon as apply triggers for the
  `tk-pagination` page input, and gate the existing blur behaviour behind the
  new `applyPageOnBlur` prop (defaults to `true`). `tk-table` forwards the same
  prop to its pagination.
- e9d8093: Fix `tk-pagination` page input clipping page numbers longer than
  three digits by sizing it from the digit count of the total page number.
- c26fad1: Read `hasOwnProperty` through `Object.prototype` in `tk-datepicker`,
  `tk-dropdown` and `tk-input`, so an option or chip object that carries its own
  `hasOwnProperty` key — or that was created with `Object.create(null)` — no
  longer throws or reports the wrong answer.
- 14738bf: Add `showSelectAllChip` prop to `tk-select` that collapses the
  selection into a single chip labelled with `selectAllLabel` once every option
  is selected, and keeps selected disabled options intact when that chip is
  removed (including when `optionValueKey` is set). It has no effect when
  `allowCustomValue` is enabled.
- b23bd0c: Add `horizontalScrollPosition` prop to `tk-table` for placing the
  horizontal scrollbar above the table, so it stays reachable without scrolling
  to the bottom of a long table. It defaults to `bottom`, `top` moves the bar
  above the table and drops the table's own one, and `both` keeps a bar on each
  side. The two bars stay in sync in either direction, and the top one is hidden
  while there is nothing to scroll horizontally.

  In `top` and `both` the table is wrapped in a frame that carries its border,
  so the top scrollbar sits inside the table the way the bottom one does.

- 8573bc1: Improve `tk-table` checkbox selection across client-side and
  server-side pagination. The new `preserveSelectionOnPagination` behavior keeps
  selections from other pages while keeping header select-all actions scoped to
  the current page, and clears selection when the dataset is replaced outside a
  pagination request.
- 5e37b16: Fix Vue `v-model` staying a change behind on components that do not
  write their own prop back (datepicker, rating, dialog, radio). The wrapper now
  reads the emitted `tk-change` detail via the output target's `eventAttr`
  option instead of `event.target[prop]`, restoring the behaviour that the
  removed `update-utils` patch used to provide.

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
