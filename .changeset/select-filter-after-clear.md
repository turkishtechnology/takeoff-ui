---
'@takeoff-ui/core': patch
---

fix(tk-select): In `multiple` + `editable` + `clearable` mode, typing to filter
works again after the last chip is removed. `tk-input` now keeps the same native
input element when its chips or clear button appear and disappear, so focus and
outside listeners survive.
