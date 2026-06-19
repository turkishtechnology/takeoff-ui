---
'@takeoff-ui/docs': patch
---

docs(tk-table): add a server-side multi-sort example. With `multiSort` and
`paginationMethod="server"` combined, the table emits the full `sorts` array (in
priority order) on the `tk-request` event and skips internal sorting, so the
backend can sort by multiple columns. No component change required.
