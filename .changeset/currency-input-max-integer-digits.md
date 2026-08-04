---
'@takeoff-ui/core': patch
---

Add `maxIntegerDigits` prop to `tk-currency-input` for limiting how many digits
the integer part can hold, and re-clamp the value when `precision` changes so a
rounded value can no longer escape the configured bounds.
