---
'@takeoff-ui/core': patch
---

Fix slot detection and two rendering defects surfaced while making these
components testable.

`tk-dialog`, `tk-card`, `tk-color-picker` and `tk-accordion-item` detected their
slots with `:scope > [slot="..."]`, which Stencil's mock-doc cannot parse, so
`componentWillLoad` threw under spec tests. They now use a `hasDirectSlot`
helper with identical direct-child semantics.

`tk-dialog` passed a boolean to `aria-modal`, which renders as `aria-modal=""`
and is invalid ARIA, so assistive technology did not treat the dialog as modal.

`tk-card` rendered an empty shell when `imageOptions.position` was `left` or
`right` without `horizontal`, or when `imageOptions` omitted `position`
entirely; both now fall back to the standard vertical stack.
