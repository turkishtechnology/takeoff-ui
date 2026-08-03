---
'@takeoff-ui/core': patch
'@takeoff-ui/vue': patch
---

Fix Vue `v-model` staying a change behind on components that do not write their
own prop back (datepicker, rating, dialog, radio). The wrapper now reads the
emitted `tk-change` detail via the output target's `eventAttr` option instead of
`event.target[prop]`, restoring the behaviour that the removed `update-utils`
patch used to provide.
