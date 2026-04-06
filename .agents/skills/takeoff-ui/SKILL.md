---
name: takeoff-ui
description:
  Use Takeoff UI components correctly in React, Vue, and Angular projects.
  Activate when the user mentions any tk-* component, references @takeoff-ui
  packages, asks about Stencil.js web components in this design system, or wants
  to build UI using Takeoff UI.
compatibility: Requires Node.js >= 20.12.2 and pnpm >= 8.0.0
argument-hint: '[component-name or question]'
license: Apache-2.0
metadata:
  author: turkishtechnology
  version: '0.9.4'
  homepage: 'https://takeoffui.com'
---

# Takeoff UI Component Guide

You are helping a developer use **Takeoff UI**, a production design system built
with Stencil.js web components. It provides 48 components with first-class
wrappers for React, Vue, and Angular.

## Key Facts

- **Architecture**: Stencil.js web components with Shadow DOM encapsulation
- **Packages**: `@takeoff-ui/core` (web components), `@takeoff-ui/react`,
  `@takeoff-ui/vue`, `@takeoff-ui/angular` (framework wrappers),
  `@takeoff-ui/tailwind` (design tokens)
- **Version**: 0.9.4
- **All events** use `tk-` prefix (e.g., `tk-click`, `tk-change`)
- **All components** use `tk-` prefix (e.g., `tk-button`, `tk-input`)

> **Common naming differences:** Some Takeoff UI component names differ from
> widely used conventions. When a user refers to a component by its common name,
> map it to the correct Takeoff UI tag:
>
> | User might say              | Correct Takeoff UI tag   | Note                                           |
> | --------------------------- | ------------------------ | ---------------------------------------------- |
> | date-picker, date picker    | `tk-datepicker`          | No hyphen between "date" and "picker"          |
> | text-area, text area        | `tk-textarea`            | No hyphen, single word                         |
> | color picker                | `tk-color-picker`        | Has hyphen (unlike datepicker)                 |
> | switch                      | `tk-toggle`              | Takeoff UI uses "toggle", not "switch"         |
> | loader, loading             | `tk-spinner`             | Takeoff UI uses "spinner"                      |
> | modal                       | `tk-dialog`              | Takeoff UI uses "dialog", not "modal"          |
> | sidebar, side panel         | `tk-drawer`              | Takeoff UI uses "drawer"                       |
> | popup                       | `tk-popover`             | Takeoff UI uses "popover"                      |
> | tag, chip (singular)        | `tk-chips`               | Always plural: `tk-chips`                      |
> | rich text editor, wysiwyg   | `tk-editor`              | Simply "editor"                                |
> | tab (singular)              | `tk-tabs-item`           | Individual tab is `tk-tabs-item`, not `tk-tab` |
> | org chart, orgchart         | `tk-org-chart`           | Has hyphen between "org" and "chart"           |
> | tree, treeview              | `tk-tree-view`           | Has hyphen between "tree" and "view"           |
> | phone input, phone number   | `tk-phone-input`         | Not "phone-number-input"                       |
> | money input, currency field | `tk-currency-input`      | Uses "currency-input"                          |
> | button group                | `tk-toggle-button-group` | Full name includes "toggle"                    |
> | star rating, stars          | `tk-rating`              | Simply "rating"                                |
> | avatar stack                | `tk-avatar-group`        | Uses "group", not "stack"                      |

---

## Framework Detection

Detect the user's framework from file context and apply the correct patterns:

| File Extension             | Framework | Import From           | Guide                         |
| -------------------------- | --------- | --------------------- | ----------------------------- |
| `.tsx`, `.jsx`             | React     | `@takeoff-ui/react`   | `references/react-guide.md`   |
| `.vue`                     | Vue       | `@takeoff-ui/vue`     | `references/vue-guide.md`     |
| `.ts` + Angular decorators | Angular   | `@takeoff-ui/angular` | `references/angular-guide.md` |

**If framework is unclear**, ask the user. Default to React if working in `.tsx`
files.

---

## Quick Import Patterns

### React

```tsx
import { TkButton, TkInput, TkSelect } from '@takeoff-ui/react';
import '@takeoff-ui/core/dist/core/core.css'; // once in app entry
```

### Vue

```ts
// main.ts - register plugin once
import { ComponentLibrary } from '@takeoff-ui/vue';
import '@takeoff-ui/core/dist/core/core.css';
app.use(ComponentLibrary);

// In components
import { TkButton, TkInput, TkSelect } from '@takeoff-ui/vue';
```

### Angular

```ts
import { TkButton, TkInput, TkSelect } from '@takeoff-ui/angular';

@Component({
  imports: [TkButton, TkInput, TkSelect],
  // ...
})
```

---

## Event Naming Across Frameworks

| Web Component | React Prop   | Vue Template | Angular Template |
| ------------- | ------------ | ------------ | ---------------- |
| `tk-click`    | `onTkClick`  | `@tk-click`  | `(tkClick)`      |
| `tk-change`   | `onTkChange` | `@tk-change` | `(tkChange)`     |
| `tk-blur`     | `onTkBlur`   | `@tk-blur`   | `(tkBlur)`       |
| `tk-focus`    | `onTkFocus`  | `@tk-focus`  | `(tkFocus)`      |

**Pattern**: Web component event `tk-foo-bar` becomes:

- React: `onTkFooBar`
- Vue: `@tk-foo-bar`
- Angular: `(tkFooBar)`

**All events are CustomEvent** — access data via `event.detail` (not
`event.target.value`).

---

## Common Prop Patterns

### size

Most components accept: `"small"` | `"base"` | `"large"`. Default: `"base"`.

### variant

Color variant: `"primary"` | `"secondary"` | `"neutral"` | `"danger"` |
`"warning"` | `"success"` | `"info"`.

### type (Button/Card)

Visual type: `"filled"` | `"elevated"` | `"outlined"` | `"text"`. Default:
`"filled"`.

### disabled

Boolean. Disables interaction. Available on all form components.

### label

String. Display text for buttons, inputs, and form components.

---

## Component Quick Reference

### Form Components

| Tag                      | Import Name           | Description                                              |
| ------------------------ | --------------------- | -------------------------------------------------------- |
| `tk-input`               | `TkInput`             | Text input with mask, chips, password strength support   |
| `tk-textarea`            | `TkTextarea`          | Multi-line text input with auto-resize                   |
| `tk-select`              | `TkSelect`            | Dropdown select with single/multi select, search, groups |
| `tk-checkbox`            | `TkCheckbox`          | Checkbox with label and indeterminate state              |
| `tk-radio`               | `TkRadio`             | Single radio button                                      |
| `tk-radio-group`         | `TkRadioGroup`        | Radio button group with horizontal/vertical layout       |
| `tk-toggle`              | `TkToggle`            | Toggle/switch control                                    |
| `tk-toggle-button`       | `TkToggleButton`      | Toggle button                                            |
| `tk-toggle-button-group` | `TkToggleButtonGroup` | Group of toggle buttons                                  |
| `tk-datepicker`          | `TkDatepicker`        | Date/range picker with calendar                          |
| `tk-currency-input`      | `TkCurrencyInput`     | Currency formatted input                                 |
| `tk-phone-input`         | `TkPhoneInput`        | Phone number input with country code                     |
| `tk-upload`              | `TkUpload`            | File upload with drag-and-drop                           |
| `tk-color-picker`        | `TkColorPicker`       | Color picker with palette and custom input               |
| `tk-slider`              | `TkSlider`            | Range slider                                             |
| `tk-editor`              | `TkEditor`            | Rich text editor                                         |
| `tk-rating`              | `TkRating`            | Star rating input/display                                |
| `tk-button`              | `TkButton`            | Action button                                            |

### Data Display Components

| Tag                | Import Name      | Description                                              |
| ------------------ | ---------------- | -------------------------------------------------------- |
| `tk-table`         | `TkTable`        | Data table with sorting, filtering, pagination, grouping |
| `tk-pagination`    | `TkPagination`   | Page navigation control                                  |
| `tk-chart`         | `TkChart`        | Chart component (bar, line, pie, etc.)                   |
| `tk-org-chart`     | `TkOrgChart`     | Organization chart                                       |
| `tk-tree-view`     | `TkTreeView`     | Hierarchical tree view                                   |
| `tk-badge`         | `TkBadge`        | Status badge/tag                                         |
| `tk-avatar`        | `TkAvatar`       | User avatar with image/initials                          |
| `tk-avatar-group`  | `TkAvatarGroup`  | Grouped avatars with overflow                            |
| `tk-carousel`      | `TkCarousel`     | Image/content carousel                                   |
| `tk-chips`         | `TkChips`        | Tag/chip display                                         |
| `tk-icon`          | `TkIcon`         | Icon display                                             |
| `tk-timeline`      | `TkTimeline`     | Timeline container                                       |
| `tk-timeline-item` | `TkTimelineItem` | Timeline entry                                           |

### Feedback Components

| Tag          | Import Name | Description             |
| ------------ | ----------- | ----------------------- |
| `tk-alert`   | `TkAlert`   | Alert message banner    |
| `tk-dialog`  | `TkDialog`  | Modal dialog            |
| `tk-drawer`  | `TkDrawer`  | Side panel overlay      |
| `tk-spinner` | `TkSpinner` | Loading spinner         |
| `tk-tooltip` | `TkTooltip` | Hover tooltip           |
| `tk-popover` | `TkPopover` | Click-triggered popover |

### Navigation Components

| Tag                  | Import Name        | Description                     |
| -------------------- | ------------------ | ------------------------------- |
| `tk-tabs`            | `TkTabs`           | Tab container                   |
| `tk-tabs-item`       | `TkTabsItem`       | Individual tab                  |
| `tk-stepper`         | `TkStepper`        | Step progress indicator         |
| `tk-step`            | `TkStep`           | Individual step                 |
| `tk-breadcrumb`      | `TkBreadcrumb`     | Breadcrumb navigation container |
| `tk-breadcrumb-item` | `TkBreadcrumbItem` | Breadcrumb link                 |
| `tk-dropdown`        | `TkDropdown`       | Dropdown menu                   |

### Layout Components

| Tag                 | Import Name       | Description                   |
| ------------------- | ----------------- | ----------------------------- |
| `tk-accordion`      | `TkAccordion`     | Collapsible section container |
| `tk-accordion-item` | `TkAccordionItem` | Collapsible section           |
| `tk-card`           | `TkCard`          | Content card container        |
| `tk-divider`        | `TkDivider`       | Visual separator line         |

---

## Reference Routing

Load the appropriate reference file based on what the user needs:

| User Needs                                                                | Load Reference                        |
| ------------------------------------------------------------------------- | ------------------------------------- |
| React-specific patterns, imports, events                                  | `references/react-guide.md`           |
| Vue-specific patterns, v-model, events                                    | `references/vue-guide.md`             |
| Angular-specific patterns, NgModule, events                               | `references/angular-guide.md`         |
| Form component APIs (input, select, datepicker, button, rating, etc.)     | `references/components-form.md`       |
| Data component APIs (table, chart, carousel, chips, icon, timeline, etc.) | `references/components-data.md`       |
| Feedback component APIs (alert, dialog, drawer, spinner, etc.)            | `references/components-feedback.md`   |
| Navigation component APIs (tabs, stepper, breadcrumb, etc.)               | `references/components-navigation.md` |
| Layout component APIs (accordion, card, divider)                          | `references/components-layout.md`     |
| All components quick list                                                 | `references/component-index.md`       |
| Design tokens, colors, spacing, Tailwind classes                          | `references/tailwind-tokens.md`       |

---

## Getting Detailed Component API

For the most up-to-date and complete component API, use the extraction script:

```bash
node .agents/skills/takeoff-ui/scripts/get-component-api.mjs <tag-name>
```

Example:

```bash
node .agents/skills/takeoff-ui/scripts/get-component-api.mjs tk-table
```

This reads from the build-generated `docs.json` and returns:

- All props with types, defaults, and descriptions
- All events with detail types
- All methods with signatures
- All slots
- Framework event name mappings
- Component dependencies

**Use this script when**:

- The reference files don't have enough detail
- You need the exact type signature for a complex prop
- You want to verify the API is current

---

## Common Usage Examples

### Button (React)

```tsx
<TkButton
  label="Save"
  variant="primary"
  size="base"
  icon="check"
  onTkClick={() => handleSave()}
/>
```

### Input with Controlled State (React)

```tsx
const [name, setName] = useState('');

<TkInput
  value={name}
  label="Full Name"
  placeholder="Enter your name"
  onTkChange={e => setName(e.detail)}
/>;
```

### Select (React)

```tsx
<TkSelect
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
  ]}
  value={country}
  onTkChange={e => setCountry(e.detail)}
/>
```

### Table (React)

```tsx
<TkTable
  data={data}
  columns={[
    { field: 'name', header: 'Name', sortable: true },
    { field: 'email', header: 'Email' },
    { field: 'role', header: 'Role', filterable: true },
  ]}
  rowsPerPage={10}
  onTkRowClick={e => handleRowClick(e.detail)}
/>
```

### Dialog (React)

```tsx
<TkDialog
  visible={isOpen}
  header="Confirm Action"
  onTkClose={() => setIsOpen(false)}
>
  <p>Are you sure you want to proceed?</p>
</TkDialog>
```

### Drawer (Vue)

```vue
<TkDrawer :open="isOpen" position="right" @tk-drawer-close="isOpen = false">
  <template #content>
    <p>Drawer content here</p>
  </template>
</TkDrawer>
```

---

## Slot Patterns

### React

```tsx
<TkDrawer open={isOpen}>
  <div slot="content">Content here</div>
  <div slot="footer">Footer here</div>
</TkDrawer>
```

### Vue

```vue
<TkDrawer :open="isOpen">
  <template #content>Content here</template>
  <template #footer>Footer here</template>
</TkDrawer>
```

### Angular

```html
<tk-drawer [open]="isOpen">
  <div slot="content">Content here</div>
  <div slot="footer">Footer here</div>
</tk-drawer>
```

---

## Important Gotchas

1. **Always import CSS**: Add `import '@takeoff-ui/core/dist/core/core.css'` in
   your app entry point. Without this, components will have no styles.

2. **Event detail, not target.value**: All Takeoff UI events use `event.detail`
   for data. Do NOT use `event.target.value`.

3. **Object/array props by reference**: When passing objects or arrays as props,
   changes to the reference trigger re-renders. Create new objects/arrays for
   updates.

4. **Shadow DOM**: Components use Shadow DOM. You cannot style internal elements
   with global CSS. Use the component's props and CSS custom properties.

5. **Vue plugin registration**: In Vue, you must call
   `app.use(ComponentLibrary)` before using any component.

6. **Angular imports**: Each component must be added to the `imports` array in
   the component decorator.

7. **Method calls**: To call component methods, get a ref to the element first:
   - React: `useRef()` + `ref.current.methodName()`
   - Vue: template ref + `ref.value.methodName()`
   - Angular: `@ViewChild()` + `this.element.methodName()`
