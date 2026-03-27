# New Component

Component name: `${component-name}`

Description: ${description}

## Step 1: Create directory and Folders

Create the directory structure according to `component-file-structure`
instruction. Decide whether a child component is required based on the nature of
the component.

## Step 2: TSX File

According to `stencil-components` instruction, write the
`tk-${component-name}.tsx` file.

- Before creating the type, if a similar type exists in `/global/interfaces/`,
  use that.

Within TSX: define @Element() as el: HTMLElement

- When creating the component API, proceed in parallel with the APIs of existing
  components.

- Create the `interfaces.ts`, `defaults.ts`, `helpers.ts`, and child component
  files according to the rules in the `component-file-structure` instructions.

## Step 3: SCSS File

According to the `styling` instructions, 'tk-${component-name}.write the `scss'
file.

## Step 4: Unit Testing

According to `component-tests` instructions, write the
`test/tk-${component-name}.spec.tsx` file.

## Step 5: Child Component

If there is a child component, repeat Steps 2–4 for the child component.

## Step 6: Stencil Config

If the component requires two-way binding (form element, v-model support, etc.);
Add the new component to `vueComponentModels` and `angularValueAccessorBindings`
directories in `packages/core/stencil.config.ts`,.

## Step 7: Build & Verification

```bash
cd packages/core && pnpm run build
```

After the build is succesful, update the `@Element() el: HTMLElement;`
definition in TSX to `@Element() el: HTMLTk${ComponentName}Element;` olarak
güncelle.

```bash
pnpm run test
pnpm run format
```
