---
applyTo: 'packages/core/**/*'
---

# Component File Structure

## General Directory Structure

```
packages/core/src/
├── utils/                    # Helpers that are used by multiple components
│   └── icon-utils.ts
├── global/
│   ├── interfaces/           # Shared type/interfaces
│   └── sass/abstracts/_variables.scss
└── components/
    └── tk-[component]/
        ├── tk-[component].tsx
        ├── tk-[component].scss
        ├── interfaces.ts     # Only specific to this component
        ├── defaults.ts      # Long default values
        ├── helpers.ts       # Helpers specific to this component
        ├── tk-[component]-item/   # Child/group components
        └── test/
            ├── tk-[component].spec.tsx
            └── tk-[component].e2e.tsx
```

## Rules

- **utils/**: Methods used by more than one component (e.g.: icon-utils.ts)
- **global/interfaces/**: The type and interfaces shared by more than one
  component
- **components/tk-[component]/interfaces.ts**: Types and interfaces exported
  only for that component
- **components/tk-[component]/defaults.ts**: Long default values
- **components/tk-[component]/helpers.ts**: Helper methods used only in that
  component
- **Child components**: `tk-[component]-item/tk-[component]-item.tsx` in the
  same directory with this format
- **Test files**: `test/tk-[component].spec.tsx` and
  `test/tk-[component].e2e.tsx`
