---
'@takeoff-ui/core': patch
---

Add keyboard handling for the chips of `tk-input`: the arrow keys walk the chips
next to the text field, and Backspace or Delete removes the one they land on.
Out of an empty text field the first Backspace only aims at the last chip, so no
chip is ever removed before it has been pointed at. Chips that carry no remove
button are stepped over, which covers disabled ones as well as indicator chips
such as the `+2` of a collapsed `tk-select`.

`tk-chips` gained a `focused` prop for this, drawing the same ring its pressed
state uses. In `tk-select` the keys reach the selection through the chip removal
path that was already there, so an `editable` `multiple` select can now be
emptied from the keyboard.
