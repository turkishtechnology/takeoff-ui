---
'@takeoff-ui/core': patch
---

Improve `tk-table` checkbox selection across client-side and server-side
pagination. The new `preserveSelectionOnPagination` behavior keeps selections
from other pages while keeping header select-all actions scoped to the current
page, and clears selection when the dataset is replaced outside a pagination
request.
