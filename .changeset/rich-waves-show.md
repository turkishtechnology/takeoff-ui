---
'@takeoff-ui/core': patch
---

Add min and max props to currency-input component. The value is clamped to the
range both when set via the `value` prop and on blur, the clamp respects
`precision` and `allowNegative`, and an inverted range (min > max) still honors
min.
