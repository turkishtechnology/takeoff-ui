---
applyTo: '**/*.scss'
---

# Styling Standards

## Design Variables

Use Figma variables. Source:
`packages/core/src/global/sass/abstracts/_variables.scss`

- Usage with no fallback `var(--primary-sub-base)`, `var(--neutral-100)`,
  `var(--desktop-body-m-base-size)`
- When adding new colors or spacing, add them to \_variables.scss

## Class Naming Convention

- Component classes with prefix `tk-`: `.tk-button`, `.tk-accordion`,
  `.tk-accordion-item`
- Modifiers: `.tk-component-large`, `.tk-component-active`,
  `.tk-component-label`
- Class names should be descriptive in non-shadow components (to avoid styling
  conflicts )

## Mixins

- Common mixins are under the `packages/core/src/global/sass/mixins/`
- Usage: Add `@use '../../global/sass/mixins' as *;` to top of the file.
- When adding new mixin, create `name.scss` file under `mixins/`, and add it to
  `mixins/index.scss` with `@forward`

## Example

```scss
.tk-component {
  color: var(--static-white);
  &.tk-component-large {
    font-size: var(--desktop-body-m-base-size);
  }
  &.tk-component-active {
    background: var(--primary-sub-base);
  }
}
```
