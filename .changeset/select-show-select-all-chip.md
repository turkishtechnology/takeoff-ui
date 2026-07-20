---
'@takeoff-ui/core': patch
---

Add `showSelectAllChip` prop to `tk-select` that collapses the selection into a
single chip labelled with `selectAllLabel` once every option is selected, and
keeps selected disabled options intact when that chip is removed (including when
`optionValueKey` is set). It has no effect when `allowCustomValue` is enabled.
