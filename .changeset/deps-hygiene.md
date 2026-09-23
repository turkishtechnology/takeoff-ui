---
'@takeoff-ui/core': patch
---

Trim what the package drags into consumer projects, without changing any
component API:

- `json-server` is no longer a runtime dependency (it was never imported) and
  `@types/cleave.js` moved to devDependencies; together they pulled 45 packages
  into every install.
- `tk-table` now loads `jspdf`, `jspdf-autotable`, `exceljs` and the embedded
  PDF fonts on demand inside `exportFile()`, so pages that never export no
  longer download about 4.6 MB of export code with the table.
- The Material Symbols `@font-face` rules are declared once in the global
  stylesheet instead of being duplicated into every component's own stylesheet
  (141 copies across 35 components).
- The country-flag sprite used by `tk-phone-input` and `tk-currency-input` ships
  inside the package (`assets/img/flags.png`) instead of being fetched from
  cdn.turkishairlines.com at runtime.
- The published tarball no longer contains a second copy of the font files under
  `dist/collection/assets`.
