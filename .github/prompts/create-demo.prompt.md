---
instructions:
  - docs-structure.instructions.md
---

# New Demo

It adds a new usage to an existing demo, adds a new demo to a component, or
builds the component's documentation skeleton from scratch.

## User Input

Extract these 2 info from user input:

- **componentName** — Stencil component name (e.g. `tk-avatar`, `avatar`,
  `button`)
- **feature** — feature to be added / demo name (e.g. `WithBadges`, `Sizes`)

## Context collection

The component source is read before starting to write code:

- `packages/core/src/components/${componentName}/${componentName}.tsx`

## Pre-check — decide what to do

### Is there a document template?

Check `docs/docs/Components/${ComponentName}.mdx` file (PascalCase; e.g.
`Avatar.mdx`).

- **If doesnt't exist** → Component is documented for the first time. Go to
  "Build a component skeleton from scratch" section
- **If exists** → go to next control.

### Is there a matching example TSX?

List `docs/src/docs-files/${componentName}/Examples/` folder.

- It could be an example that satisfies the same condition
  (e.g.${feature}`=`WithBadges`while`Badges.tsx`or`Badge.tsx` already exist,
  this file would match).
- **If there is a matching TSX** → Go to the "Update existing example" section.
- **If there is no matching TSX** → Go to the "Add new example" section.

## Update existing example

A new file is not created when the `${feature}.tsx` already exists. The existing
TSX file is opened, and the desired change (new variant, additional property
display, etc.) is added to the `demo`, `reactCode`, `vueCode`, `angularCode`
variables within the file.

## Add new example

### Step 1 — Create example TSX file

`docs/src/docs-files/${componentName}/Examples/${feature}.tsx` file is created
and its content is populated.

### Step 2 — Update body.mdx

## Build a component skeleton from scratch

Following steps are applied respectively:

1. Create the main page file `docs/docs/Components/${ComponentName}.mdx`

2. Create the `docs/src/docs-files/${componentName}/` folder.

3. Run the `pnpm run generate-docs` command in the `docs/` directory.

4. Create the `body.mdx` file.

5. Create the PlaygroundConfig JSON file.

6. Create the `Examples/` subfolder.

7. Create the first TSX demo file — it should be the basic usage ("Add new
   example" → Step 1).

8. Import the body.mdx file, don't forget to add headers and components ("Add
   new instance" → Step 2).

9. Run the `pnpm run format` command in the root directory to format.
