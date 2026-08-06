---
'@takeoff-ui/core': patch
---

Add `maxIntegerDigits` prop to `tk-currency-input` for limiting how many digits
the integer part can hold, and re-clamp the value when `precision` changes so a
rounded value can no longer escape the configured bounds.

The limit is capped at 15 significant digits (integer plus decimal) so its bound
stays exactly representable as a JavaScript number; beyond that the bound
rounded up and admitted one digit more than configured. When `allowNegative` is
false, an over-limit negative `value` now clamps to the positive bound instead
of storing a negative number the field can neither display nor produce.
