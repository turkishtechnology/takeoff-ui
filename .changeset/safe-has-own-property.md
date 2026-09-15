---
'@takeoff-ui/core': patch
---

Read `hasOwnProperty` through `Object.prototype` in `tk-datepicker`,
`tk-dropdown` and `tk-input`, so an option or chip object that carries its own
`hasOwnProperty` key — or that was created with `Object.create(null)` — no
longer throws or reports the wrong answer.
