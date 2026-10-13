---
'@takeoff-ui/core': minor
---

feat(tk-select): Add `hideDisabledChips` to keep selected options that
`optionDisabled` disables out of the chips in `multiple` mode. Hidden values
stay in `value`, keep their position when other chips change, survive clearing
and do not count towards `visibleItemCount`.
