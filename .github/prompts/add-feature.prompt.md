---
instructions: 
[copilot-instructions.md](../copilot-instructions.md)
[stencil-components.instructions.md](../instructions/stencil-components.instructions.md)
[component-file-structure.instructions.md](../instructions/component-file-structure.instructions.md)
[styling.instructions.md](../instructions/styling.instructions.md)
[component-tests.instructions.md](../instructions/component-tests.instructions.md)
---

## Input

Describe the feature in plain language (e.g. "datepicker loading prop", "table
filter").

Before doing anything else, read all existing files for the target component:

- `tk-[component].tsx`
- `tk-[component].scss`
- `interfaces.ts` (if present)
- `test/tk-[component].spec.tsx` and `test/tk-[component].e2e.ts` (if present)

Then infer what you can from the description. Ask only about what is genuinely
ambiguous before starting implementation.

---

## Implementation Steps

Work through the file top-to-bottom in this order. Skip any step the feature
doesn't need. For full rules see `stencil-components.instructions.md`.

1. **`@Component` metadata** — update only if `styleUrl` or shadow config
   changes
2. **`@Element()`** — add if not already present
3. **`constructor()`** — only if initialization logic is required
4. **`@AttachInternals()`** — form-associated components only
5. **File-level constants** — static values that never change at runtime
6. **Private instance variables** — mutable internal state that does NOT need to
   trigger re-render
7. **`@State()`** — internal state that DOES trigger re-render on change
8. **`@Prop()` + JSDoc + default** — one block per new public prop; use
   camelCase; always set a default
9. **`@Watch('[propName]')`** — place immediately after its `@Prop()`; name it
   `[prop]Changed`; prefer lifecycle hooks over watchers when possible
10. **`@Event()`** — use `tk-[eventType]` as `eventName` (e.g.
    `tk-loading-change`); strongly type the `EventEmitter` payload
11. **`@Listen()`** — only if the feature reacts to DOM events bubbling from
    children or the host
12. **Public `@Method()`** — programmatic API only; avoid unless the feature
    explicitly requires it
13. **Lifecycle methods** — `componentWillLoad`, `componentDidLoad`,
    `disconnectedCallback`, etc.; add only what setup/teardown the feature needs
14. **Private methods** — internal helpers; no naming constraint beyond clarity
15. **`handle*` handlers** — name: `handle{ElementName}{EventName}` (e.g.
    `handleButtonClick`); wire in JSX as `onClick={this.handleButtonClick}`
16. **`create*` factory methods** — name: `create{Element}` (e.g.
    `createLoadingSpinner`); return a JSX fragment; called from `render*`
    methods only, never from `render()` directly
17. **`render*` helpers** — compose UI sections by calling `create*` methods;
    one helper per logical UI region
18. **`render()`** — assemble `render*` helpers, apply conditional rendering,
    bind host attributes; keep it flat and readable

---

## File Checklist

Touch only the files the feature actually requires:

- `packages/core/src/components/tk-[component]/tk-[component].tsx` — main
  implementation
- `packages/core/src/components/tk-[component]/tk-[component].scss` — new visual
  states/modifiers
- `packages/core/src/components/tk-[component]/interfaces.ts` — new
  component-scoped types
- `packages/core/src/global/interfaces/` — only if the new types are shared
  across components
- `packages/core/src/global/sass/abstracts/_variables.scss` — only if new design
  tokens are needed
- `packages/core/src/components/tk-[component]/test/tk-[component].spec.tsx` —
  unit tests

---

## Styling Conventions

Follow conventions in
[styling.instructions.md](../instructions/styling.instructions.md).

---

## Testing Requirements

Follow conventions in
[component-tests.instructions.md](../instructions/component-tests.instructions.md).
Write both unit (`*.spec.tsx`) and E2E (`*.e2e.ts`) tests for the new feature.

---

## Verification

Once all files are written, run in order:

```bash
pnpm run build
pnpm run test
```

Fix any errors before considering the task done.
