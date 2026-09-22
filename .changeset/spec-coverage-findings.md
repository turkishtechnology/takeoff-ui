---
'@takeoff-ui/core': patch
---

Fix the defects surfaced by the new component specs:

- `tk-datepicker`: a 12-hour value now loads with the matching AM/PM toggle
  (time-only mode no longer emits a spurious `tk-change` during load), a
  date-only value is accepted when `showTimePicker` is on and gets the default
  time, and `aria-expanded` renders `"true"`/`"false"`. The AM/PM toggle now
  always follows the time it governs (the range end once one is picked,
  otherwise the start), so blurring the input or restarting a range no longer
  shifts a time by twelve hours.
- `tk-accordion`: every initially `active` item stays open with `allowMultiple`
  (without it the last one wins, as `activeIndex` already did), items appended
  after load are wired up even when they start `active`, keyless items stay
  clickable after items before them are removed, and `tk-active-index-change` /
  `tk-accordion-item-selected` fire once per user action (the deprecated
  selected event no longer reports the sibling being closed in single mode).
- `tk-carousel`: arrow buttons and arrow keys emit `tk-change` once per step.
- `tk-color-picker`: a colour typed into the trigger input is applied on
  blur/Enter.
- `tk-input`: `maskOptions` with only `letterOnly`, `numericOnly`, `uppercase`
  or `lowercase` no longer clears the field on every keystroke; these options
  are applied by the input itself when Cleave is not needed.
- `tk-phone-input`: an initial value without a country falls back to
  `defaultCountry`, setting the value to `null` resets cleanly (without moving
  focus) instead of throwing, and the country list's `aria-selected` renders
  `"true"`/`"false"`.
- `tk-select`: opening, typing into, blurring or clicking the dropdown after
  `options` was set to `null` no longer throws.
- `tk-table`: a `filterType: 'datepicker'` column filters with the same
  `dateFormat`/`timeFormat`/`showTimePicker` defaults the filter panel gives its
  datepicker (exported as `DEFAULT_FILTER_DATEPICKER_PROPS`), unparsable values
  are filtered out instead of throwing, and a `selectionRowDisabled` predicate
  returning a non-boolean still disables the row.
- `tk-org-chart`: changing `collapsible` after the element was removed no longer
  throws.
- Boolean
  `aria-disabled`/`aria-invalid`/`aria-readonly`/`aria-selected`/`aria-expanded`
  attributes render as the literal `"true"`/`"false"` strings across the form
  components. The matching stylesheet selectors now check for `'true'`, so an
  `aria-disabled="false"` element is no longer styled (and made unclickable) as
  if it were disabled.
