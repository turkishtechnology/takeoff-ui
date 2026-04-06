---
applyTo:
  - docs/src/docs-files/**
  - docs/docs/Components/**
---

# Takeoff UI Docs Structure

## General Structure

- Component documentations are under the `docs/docs/Components`. e.g.:
  `docs/docs/Components/Button.mdx`, `docs/docs/Components/Accordion.mdx`.
- The fields used in component documentation are located under
  `docs/src/docs-files/tk-[component-name]/`.

## Component documentation structure

For each component, a `docs/docs/Components/[ComponentName].mdx` file is
created. This file contains the following sections:

- **Sidebar position**: The `sidebar_position` metadata that specifies the order
  in which the component appears in the documentation.

- **HeadContent**: The component's general introduction and framework-specific
  import examples

- **BodyContent**: Contains playground, usage examples, and explanations.

- **API**: Detailed description of the component's props and properties.

- **Subcomponent APIs**: Used in components with subcomponents. The APIs of the
  sub-components are located here.

### `generate-docs` command

`head.mdx` and `api.mdx` files that are in the
`docs/src/docs-files/tk-[component-name]/` are created automatically. These
files should definitely not be edited manually.

## `tk-[component-name]` directory structure

For each component, the following files are located in the
`docs/src/docs-files/tk-[component-name]/` folder:

- **`Examples/` folder**: TSX files containing examples of the component's use.

- **`[ComponentName]PlaygroundConfig.json`**: JSON file containing the
  component-specific playground configuration

- **`api.mdx`**: Contains the component's API documentation.

- **`head.mdx`**: Contains the component's introduction and import examples.

- **`body.mdx`**: The main content file containing the playground and use cases
  of the component.

-**Child component folders**: For child components only `api.mdx` and `head.mdx`
files are present; `body.mdx` is not.

## Content of `body.mdx`

`body.mdx` defines the "usage" side of the component documentation:

- **Playground**: The area where the component can be interactively experienced.
  Examples in the Playground configuration file are shown here.

- **Usage examples**: Examples demonstrating different usage scenarios of the
  component. These examples are imported from TSX files in the `Examples` folder
  and called directly within `body.mdx`; `<FeatureDemo>` is not used.

- **Descriptions**: The component's features, usage tips, and important points
  to note are listed here.

- **Alerts / informational components**: `TkAlert` and similar components can be
  used to inform the user about specific features or usage cases. A space is
  left between the alert and the example using the `<br />` tag.

### Order in body.mdx

The body.mdx file is structured in the following order:

- Imports are at the top (Examples, Playground, config JSON, `@takeoff-ui/react'
  components).
- Imports are followed by the `### Playground' section; it is always the first
  content section

- After Playground, usage examples are listed. General order: Basic → (Examples
  of props common to every component) → Other props → More complex scenarios →
  Subcomponent examples.

## TSX files in Examples

`docs/src/docs-files/tk-[component-name]/Examples/*.tsx` files use fields below:

| Field         | Required | Description                                        |
| ------------- | -------- | -------------------------------------------------- |
| `featureDemo` | Yes      | Main react component rendered on the page          |
| `demo`        | No       | Short examples (`@takeoff-ui/react`)               |
| `reactCode`   | Yes      | React equivalent of the example in `demo` (string) |
| `vueCode`     | Yes      | Vue equivalent of same example (string)            |
| `angularCode` | Yes      | Angular equivalent of same example (string)        |
| `Example`     | No       | Longer / complex examples                          |

- Default export is mandatory.
- External hooks (`useState`, `useEffect` etc.) can be added if needed.
- camelCase props in `angularCode` are converted to dash-case. (such as
  `badgeStatus` → `badge-status`, `[dot]="true"` binding syntax).
- return syntax with feature demo is: return
  <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;

## Dosya isimlendirme kuralları

| File                                 | Format                             | Example                        |
| ------------------------------------ | ---------------------------------- | ------------------------------ |
| PlaygroundConfig JSON                | `[camelCase]PlaygroundConfig.json` | `dialogPlaygroundConfig.json`  |
| Example TSX                          | PascalCase, prop or feature name   | `Variant.tsx`, `FullWidth.tsx` |
| Component MDX                        | PascalCase                         | `Button.mdx`                   |
| docs-files directory                 | `tk-[dash-case]`                   | `tk-button`, `tk-color-picker` |
| Child component docs-files directory | `tk-[parent]-[child]`              | `tk-accordion-item`            |
