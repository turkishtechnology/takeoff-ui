# Documentation Demo Guidelines

This document outlines the standards for creating demo code examples in the
Takeoff UI documentation.

## Simple Demo Code Standards

### File Structure

All demo files should follow this structure:

```
docs/src/docs-files/
└── tk-{component-name}/
    └── Examples/
        ├── Basic.tsx
        ├── Variant.tsx
        ├── Size.tsx
        └── [FeatureName].tsx
```

### Component Template

Every demo file must follow this exact template structure:

```tsx
import { TkComponentName } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const DemoName = () => {
  const reactCode = `{/* React code string */}`;

  const vueCode = `{/* Vue code string */}`;

  const angularCode = `{/* Angular code string */}`;

  const demo = {
    /* JSX demo component */
  };

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={angularCode}
    ></FeatureDemo>
  );
};

export default DemoName;
```

### Required Elements

#### 1. Imports

```tsx
import { TkComponentName } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';
```

- Always import the component from `@takeoff-ui/react`
- Always import `FeatureDemo` from the relative path
  `../../../components/FeatureDemo`
- Always import `React`
- Add `useState` or other hooks only when needed for stateful demos

#### 2. Component Declaration

```tsx
const DemoName = () => {
  // Component body
};
```

- Use PascalCase for the component name
- Name should match the file name (e.g., `Basic.tsx` → `const Basic = ()`)
- Use arrow function syntax

#### 3. Code Strings

Define separate code strings for each framework:

```tsx
const reactCode = `{/* Component code */}`;
const vueCode = `{/* Component code */}`;
const angularCode = `{/* Component code */}`;
```

**Rules:**

- Use template literals (backticks)
- Code should be clean, formatted, and ready to copy-paste
- React code should match the actual demo JSX as closely as possible
- Vue code should use Vue 3 syntax with proper binding (`:prop` for
  boolean/number, `@event` for events)
- Angular code should use Angular syntax (`[prop]` for inputs, `(event)` for
  outputs)
- Keep code examples minimal and focused on the feature being demonstrated
- Include only relevant props, avoid unnecessary clutter

**Framework-Specific Syntax:**

| Aspect              | React                     | Vue                      | Angular                        |
| ------------------- | ------------------------- | ------------------------ | ------------------------------ |
| Component names     | `<TkBadge />`             | `<TkBadge />`            | `<tk-badge />`                 |
| String props        | `label="Text"`            | `label="Text"`           | `label="Text"`                 |
| Multi-word props    | `expandIcon="add"`        | `expandIcon="add"`       | `expand-icon="add"`            |
| Boolean props       | `disabled={true}`         | `:disabled="true"`       | `[disabled]="true"`            |
| Number props        | `maxLength={100}`         | `:maxLength="100"`       | `[maxLength]="100"`            |
| Arrays              | `items={[...]}`           | `:items="[...]"`         | `[items]="[...]"`              |
| Objects             | `icon={{name: 'home'}}`   | `:icon="{name: 'home'}"` | `[icon]="{name: 'home'}"`      |
| Functions/Callbacks | `filter={(text) => ...}`  | `:filter="handler"`      | `[filter]="handler"`           |
| Events              | `onTkChange={(e) => ...}` | `@tk-change="handler"`   | `(tkChange)="handler($event)"` |

**Important Notes:**

- **Vue Component Names:** Use PascalCase for component names (e.g.,
  `<TkBadge>`), following Vue 3 style guide
- **Vue Props:** Use camelCase for all prop names (e.g., `expandIcon`,
  `maxLength`, `allowMultiple`)
  - ✅ Correct: `expandIcon="add"` (string)
  - ✅ Correct: `:maxLength="100"` (number)
  - ✅ Correct: `:allowMultiple="true"` (boolean)
  - ✅ Correct: `:activeIndex="[0,1]"` (array)
  - ❌ Wrong: `expand-icon="add"` (kebab-case)
- **Angular:** Use kebab-case for both component names and props (follows web
  component standard)
- **React:** Use PascalCase for components and camelCase for props (standard JSX
  convention)

#### 4. Demo Component

```tsx
const demo = (
  <div className="flex justify-center gap-2">
    {/* Your component demo here */}
  </div>
);
```

**Rules:**

- Wrap demo content in a container `<div>`
- Use Tailwind utility classes for layout
- Common patterns:
  - `flex justify-center gap-2` - horizontal centered layout
  - `flex flex-col gap-2` - vertical stacked layout
  - `flex items-end gap-2` - align items to bottom
  - `flex flex-wrap gap-2` - wrapping items
- Keep demos visually clean and centered
- Ensure demos are responsive

#### 5. Return Statement

```tsx
return (
  <FeatureDemo
    demo={demo}
    reactCode={reactCode}
    vueCode={vueCode}
    angularCode={angularCode}
  ></FeatureDemo>
);
```

**Rules:**

- Always use self-closing tag syntax with `></FeatureDemo>`
- Pass props in this exact order: `demo`, `reactCode`, `vueCode`, `angularCode`
- For demos with custom CSS or data, add `cssCode` or `dataExample` props

#### 6. Export Statement

```tsx
export default DemoName;
```

- Use default export
- Export the component name

### Common Demo Patterns

#### Static Demo (No State)

- Simple component rendering without state
- Example: `tk-spinner/Examples/Default.tsx`

#### Stateful Demo (With useState)

- Uses `useState` for interactive demos
- Include state declaration in code strings
- Show complete event handling in all frameworks
- Example: `tk-accordion/Examples/ActiveIndex.tsx`

#### Multiple Variants Demo

- Shows different variants side by side
- Use `flex flex-col gap-2` for vertical layout
- Example: `tk-alert/Examples/Variant.tsx`

#### Data/Object Props Demo

- For components accepting arrays/objects
- Define data before code strings
- Include data definition in all framework code strings
- Example: `tk-breadcrumb/Examples/CustomIcons.tsx`

### Naming Conventions

#### File Names

- Use PascalCase (e.g., `Basic.tsx`, `ActiveIndex.tsx`, `CustomHeight.tsx`)
- Be descriptive and concise
- Common names:
  - `Basic.tsx` - Basic usage example
  - `Default.tsx` - Default component state
  - `Variant.tsx` - Different visual variants
  - `Size.tsx` - Different sizes
  - `Type.tsx` - Different types
  - `State.tsx` - Different states (disabled, readonly, etc.)
  - `[Feature]Slot.tsx` - Examples with slots (e.g., `ContentSlot.tsx`)

#### Component Names

- Must match file name
- Use PascalCase
- Examples: `Basic`, `ActiveIndex`, `CustomHeight`

### Code Style Guidelines

#### Formatting

- Use 2-space indentation
- Keep consistent spacing in JSX attributes
- Break long component declarations across multiple lines
- Align props vertically when breaking across lines

#### Props

- Keep props on the same line if it fits within reasonable width
- Break to multiple lines for components with many props:

#### String Content

- Use placeholder text that is relevant to the component
- For alerts/messages: Use "Lorem Ipsum" or contextual messages
- For labels: Use descriptive text like "Text Input", "Option 1"
- Keep text concise but meaningful

### Quality Checklist

Before committing a demo file, verify:

- [ ] File is in correct location:
      `docs/src/docs-files/tk-{component}/Examples/`
- [ ] All required imports are present
- [ ] Component name matches file name
- [ ] All three code strings present (react, vue, angular)
- [ ] Code strings syntax is correct for each framework
- [ ] Demo component is properly wrapped in container div
- [ ] Tailwind classes are used for layout
- [ ] FeatureDemo component receives all required props
- [ ] Component has default export
- [ ] Code is formatted consistently
- [ ] Demo is visually centered and clean
- [ ] No console errors when rendering

### Common Mistakes to Avoid

1. ❌ **Don't** forget framework-specific syntax in code strings
2. ❌ **Don't** use inconsistent spacing or formatting
3. ❌ **Don't** include `{/* ... */}` placeholder comments in code strings
4. ❌ **Don't** forget to import `useState` when using state
5. ❌ **Don't** use class component syntax (always use functional components)
6. ❌ **Don't** leave empty angular code (`angularCode={''}` should have proper
   code)
7. ❌ **Don't** forget to wrap demo in container div
8. ❌ **Don't** use inline styles (use Tailwind classes instead)

### Additional Props for FeatureDemo

For advanced demos, you can use additional props:

```tsx
<FeatureDemo
  demo={demo}
  reactCode={reactCode}
  vueCode={vueCode}
  angularCode={angularCode}
  cssCode={cssCode} // Optional: Custom CSS code
  dataExample={dataExample} // Optional: JSON data example
/>
```

---

## Dynamic/Interactive Demo Pattern

For demos that need interactive controls to dynamically change component
properties:

### Structure Overview

```tsx
import React, { useState, useEffect } from 'react';
import { TkComponent, TkRadioGroup, TkRadio } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const DemoName = () => {
  // State for the property being controlled
  const [propertyValue, setPropertyValue] = useState<'option1' | 'option2'>(
    'option1',
  );

  // State for dynamic code strings
  const [codeSampleReact, setCodeSampleReact] = useState('');
  const [codeSampleVue, setCodeSampleVue] = useState('');

  // 3. Options data
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
  ];

  // Event handler
  const handleChange = event => {
    setPropertyValue(event.detail);
  };

  // Update code strings when state changes
  useEffect(() => {
    const reactCode = `<TkComponent propertyName="${propertyValue}" />`;
    const vueCode = `<TkComponent propertyName="${propertyValue}" />`;

    setCodeSampleReact(reactCode);
    setCodeSampleVue(vueCode);
  }, [propertyValue]);

  const demo = (
    <div className="flex flex-col items-start gap-2">
      <TkRadioGroup
        label="Select Option"
        value={propertyValue}
        onTkChange={handleChange}
      >
        {options.map((option, index) => (
          <TkRadio label={option.label} key={index} value={option.value} />
        ))}
      </TkRadioGroup>
      <TkComponent propertyName={propertyValue} />
    </div>
  );

  return (
    <FeatureDemo
      demo={demo}
      reactCode={codeSampleReact}
      vueCode={codeSampleVue}
      angularCode={''}
    />
  );
};

export default DemoName;
```

### Key Elements

#### State Management

- Property state with TypeScript types
- Separate state for each framework's code string

#### Dynamic Code Generation

- Use `useEffect` to regenerate code when state changes
- Include dependency array with relevant state

**Advanced: Multiple Properties**

```tsx
useEffect(() => {
  const attributes = `
    headerType="${headerType}"
    size="${size}"
    ${disabled ? 'disabled' : ''}
  `.trim();

  const reactCode = `<TkComponent ${attributes} />`;
  setCodeSampleReact(reactCode);
}, [headerType, size, disabled]);
```

For conditional props:

```tsx
useEffect(() => {
  const props = [];
  if (showIcon) props.push(`icon="${iconName}"`);
  if (disabled) props.push('disabled');

  const attributes = props.join(' ');
  const reactCode = `<TkComponent ${attributes} />`;
  setCodeSampleReact(reactCode);
}, [showIcon, iconName, disabled]);
```

#### Control Components

- **RadioGroup:** Mutually exclusive options
- **Checkbox:** Boolean toggles
- **Select:** Dropdown options

#### Demo Layout

```tsx
<div className="flex flex-col items-start gap-2">
  {/* Controls */}
  <TkRadioGroup>...</TkRadioGroup>
  {/* Demo Component */}
  <TkComponent {...props} />
</div>
```

### When to Use

✅ **Use when:**

- Component has multiple variants to compare interactively
- Users benefit from seeing live property changes
- Demonstrating different states (loading, disabled, etc.)

❌ **Don't use when:**

- Simple static examples are sufficient
- Only demonstrating 2-3 variants (use Multiple Variants pattern)
- Basic usage examples
- The interaction adds unnecessary complexity

### Best Practices

1. **Keep It Simple:** Don't add controls for every property—focus on the most
   important ones
2. **Meaningful Defaults:** Start with sensible default values
3. **Clear Labels:** Use descriptive labels for controls
4. **Organized Layout:** Group related controls together
5. **Performance:** Use `useEffect` dependencies correctly to avoid unnecessary
   re-renders
6. **Code Clarity:** Generate clean, readable code strings
7. **TypeScript:** Use types for state values when possible

---

## Complex Demo Pattern (Separate Example Component)

For demos with complex logic, multiple handlers, or imperative APIs (like
`createToast`, `showDialog`).

### Structure Overview

```tsx
// Separate Example component with demo logic
const Example = () => {
  const handleAction = (param: string) => {
    ComplexAPI.doSomething({ param } as IType);
  };

  return (
    <div className="flex gap-2">
      <TkButton label="Action 1" onTkClick={() => handleAction('value1')} />
      <TkButton label="Action 2" onTkClick={() => handleAction('value2')} />
    </div>
  );
};

// Main component with code strings
const DemoName = () => {
  const reactCode = `import { ComplexAPI } from "@takeoff-ui/core";

const handleAction = (param: string) => {
  ComplexAPI.doSomething({ param });
};

return (
  <TkButton onTkClick={() => handleAction('value1')} />
);`;

  const vueCode = `<script setup>
import { ComplexAPI } from "@takeoff-ui/core";

const handleAction = (param) => {
  ComplexAPI.doSomething({ param });
};
</script>

<template>
  <TkButton @tkClick="() => handleAction('value1')" />
</template>`;

  const angularCode = `import { ComplexAPI } from '@takeoff-ui/core';

@Component({...})
export class AppComponent {
  handleAction(param: string) {
    ComplexAPI.doSomething({ param });
  }
}`;

  const demo = <Example />;

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={angularCode}
    />
  );
};
```

### Key Rules

- **Example Component:** Always name it `Example`, keep all demo logic inside
- **Main Component:** Only handles code strings and rendering
- **Code Strings:** Include necessary imports and complete handler
  implementations
- **Export:** Export the main component (not Example)

### When to Use

✅ **Use when:**

- Using imperative APIs (createToast, showDialog, openModal)
- Multiple complex event handlers needed
- Demo needs useEffect or complex state management

❌ **Don't use when:**

- Simple static demos
- Basic property demonstrations
- Single event handler is sufficient

### Common Use Cases

- Toast/Modal/Dialog systems
- Form validation with complex logic
- Multi-step wizards
- WebSocket connections
