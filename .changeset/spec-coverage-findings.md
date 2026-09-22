---
'@takeoff-ui/core': patch
---

Fix the defects surfaced by the new component specs:

- `tk-datepicker`: a 12-hour value now loads with the matching AM/PM toggle
  (time-only mode no longer emits a spurious `tk-change` during load), a
  date-only value is accepted when `showTimePicker` is on and gets the default
  time, and `aria-expanded` renders `"true"`/`"false"`.
- `tk-accordion`: every initially `active` item stays open with `allowMultiple`,
  items appended after load are wired up, and `tk-active-index-change` /
  `tk-accordion-item-selected` fire once per user action (the deprecated
  selected event no longer reports the sibling being closed in single mode).
- `tk-carousel`: arrow buttons and arrow keys emit `tk-change` once per step.
- `tk-color-picker`: a colour typed into the trigger input is applied on
  blur/Enter.
- `tk-input`: `maskOptions: { letterOnly: true }` on its own no longer clears
  the field on every keystroke.
- `tk-phone-input`: an initial value without a country falls back to
  `defaultCountry`, and setting the value to `null` resets cleanly instead of
  throwing.
- `tk-select`: opening the dropdown after `options` was set to `null` no longer
  throws.
- `tk-table`: a `filterType: 'datepicker'` column without `filterElements`
  filters with the panel's `yyyy-MM-dd` default instead of throwing.
- `tk-org-chart`: changing `collapsible` after the element was removed no longer
  throws.
- Boolean
  `aria-disabled`/`aria-invalid`/`aria-readonly`/`aria-selected`/`aria-expanded`
  attributes render as the literal `"true"`/`"false"` strings across the form
  components. The matching stylesheet selectors now check for `'true'`, so an
  `aria-disabled="false"` element is no longer styled (and made unclickable) as
  if it were disabled.
