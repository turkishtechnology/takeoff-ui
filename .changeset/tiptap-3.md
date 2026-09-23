---
'@takeoff-ui/core': minor
---

`tk-editor` now runs on Tiptap 3 (3.31.3). This closes the `@tiptap/core`
advisory GHSA-cp6q-959q-f8rh together with the audit noise its stale metadata
kept producing on 2.x.

**Breaking for projects that pass their own Tiptap extensions or use
`getEditor()`:** install `@tiptap/*` 3.x alongside this version, mixing majors
is not supported. On the raw editor, `setContent(html, true)` is now
`setContent(html, { emitUpdate: true })` and `clearContent()` emits an update
(and therefore `tk-change`) by default. The Custom Extensions section of the
Editor docs lists the details.

Everything reachable through the component's own props, events and methods is
unchanged: Tiptap 3's new StarterKit defaults (TrailingNode, ListKeymap, bundled
Link and Underline) are switched off, so the emitted HTML and the keyboard
behaviour stay exactly as they were.
