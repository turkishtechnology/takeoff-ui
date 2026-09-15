---
'@takeoff-ui/core': patch
---

Detect elements by `nodeType`/`tagName` instead of `instanceof HTMLElement` in
`tk-select`'s `panelTopHtml` and `tk-table`'s row-click handler, so an element
created in another realm — an iframe, or a different document — is still
recognised. Previously `tk-select` stringified such an element into the panel
and `tk-table` emitted `tk-row-click` for clicks that came from a `tk-popover`
or `tk-dropdown` inside the row.
