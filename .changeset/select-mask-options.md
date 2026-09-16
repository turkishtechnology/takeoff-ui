---
'@takeoff-ui/core': minor
---

Add a `maskOptions` prop to `tk-select` that masks the text typed into the
editable select input, using the same `IInputMaskOptions` as `tk-input`
(Cleave.js options or a `regex` validated as the user types). Filtering runs on
the masked text, and with `allowCustomValue` the masked text becomes the value.
It has no effect in `multiple` mode, where the input renders chips instead of a
text field.
