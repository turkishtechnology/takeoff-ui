---
instructions:
  - ../instructions/component-file-structure.instructions.md
---

## User Input

Extract the following two informations from user input:

- **componentName** — Stencil component name (e.g. `tk-avatar`, `avatar`,
  `button`)
- **feature** — feature to be added (e.g. Loading Prop)

Before doing anything else, read all existing files for the target component:

- `tk-[component].tsx`
- `tk-[component].scss`
- `types.ts` (if present)
- `test/tk-[component].spec.tsx` and `test/tk-[component].e2e.ts` (if present)

## Rules

- Ask only about what is genuinely ambiguous before starting implementation.
- Only work on the current component and its internal linked components.(e.g
  tk-input is linked inside tk-select)
- Implement the new feature with the minimum possible code addition, while
  ensuring it does not affect other features of the component.
- Make sure that the newly added feature will not cause backward compatibility
  issues.
- Component development happens in `packages/core`

## Implementation Steps

Follow the conventions in `stencil-components.instructions.md`. Skip any step
the feature doesn't need.

## Styling Conventions

Follow conventions in
[styling.instructions.md](../instructions/styling.instructions.md).

## Testing Requirements

Follow conventions in
[component-tests.instructions.md](../instructions/component-tests.instructions.md).
Write both unit (`*.spec.tsx`) and E2E (`*.e2e.ts`) tests for the new feature.

## Verification

Once all files are written, run in order:

```bash
pnpm run build --filter=@takeoff-ui/core
cd packages/core && pnpm run test
```

Fix any errors before considering the task done.
