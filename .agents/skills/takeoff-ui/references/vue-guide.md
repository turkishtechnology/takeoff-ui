# Takeoff UI - Vue 3 Integration Guide

## Overview

Takeoff UI is a Stencil.js web component library. The `@takeoff-ui/vue` package
provides Vue 3 wrappers that integrate cleanly with Vue's reactivity system,
template syntax, and plugin architecture.

All components use Shadow DOM encapsulation. Custom events carry the `tk-`
prefix and deliver data through `event.detail`.

---

## Installation

```bash
npm install @takeoff-ui/vue @takeoff-ui/core
```

---

## Setup

Register the Takeoff UI plugin and import core CSS in your `main.ts`:

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import { ComponentLibrary } from '@takeoff-ui/vue';
import '@takeoff-ui/core/dist/core/core.css';

const app = createApp(App);
app.use(ComponentLibrary);
app.mount('#app');
```

The `ComponentLibrary` plugin registers all Takeoff UI components globally so
they are available in every template without individual imports.

---

## Importing Components

### Option 1: Global Registration (Recommended)

After calling `app.use(ComponentLibrary)`, use components directly in templates:

```vue
<template>
  <tk-button variant="primary" type="filled">Click Me</tk-button>
</template>
```

### Option 2: Individual Imports

Import specific components for use in a single-file component:

```vue
<script setup lang="ts">
import { TkButton, TkInput } from '@takeoff-ui/vue';
</script>

<template>
  <TkButton variant="primary">Click Me</TkButton>
  <TkInput label="Name" />
</template>
```

---

## Props

Use **kebab-case** for props in templates. Use `:prop` (v-bind) for dynamic or
non-string values.

### Common Prop Patterns

| Prop      | Values                                                                                              | Description    |
| --------- | --------------------------------------------------------------------------------------------------- | -------------- |
| `size`    | `"small"` \| `"base"` \| `"large"`                                                                  | Component size |
| `variant` | `"primary"` \| `"secondary"` \| `"neutral"` \| `"danger"` \| `"warning"` \| `"success"` \| `"info"` | Color variant  |
| `type`    | `"filled"` \| `"elevated"` \| `"outlined"` \| `"text"`                                              | Visual style   |

```vue
<template>
  <!-- String props: no binding needed -->
  <tk-button size="large" variant="primary" type="filled"> Submit </tk-button>

  <!-- Dynamic props: use v-bind (colon shorthand) -->
  <tk-button :size="buttonSize" :variant="buttonVariant">
    Dynamic Button
  </tk-button>

  <!-- Boolean props -->
  <tk-input :disabled="isDisabled" label="Name" />
</template>
```

### Passing Complex Props

Use `:prop` binding for objects and arrays:

```vue
<script setup lang="ts">
import { ref } from 'vue';

const columns = ref([
  { field: 'name', header: 'Name' },
  { field: 'email', header: 'Email' },
]);

const data = ref([
  { name: 'Alice', email: 'alice@example.com' },
  { name: 'Bob', email: 'bob@example.com' },
]);
</script>

<template>
  <tk-table :columns="columns" :data="data" />
</template>
```

---

## Events

Takeoff UI custom events use the `@tk-event-name` format in Vue templates
(kebab-case). The handler receives a `CustomEvent`, and data is available on
`event.detail`.

### Event Naming Convention

| Web Component Event | Vue Template Binding |
| ------------------- | -------------------- |
| `tk-click`          | `@tk-click`          |
| `tk-change`         | `@tk-change`         |
| `tk-blur`           | `@tk-blur`           |
| `tk-focus`          | `@tk-focus`          |
| `tk-input`          | `@tk-input`          |
| `tk-select`         | `@tk-select`         |
| `tk-close`          | `@tk-close`          |

### Event Handler

```vue
<script setup lang="ts">
const handleChange = (e: CustomEvent) => {
  const value = e.detail;
  console.log('New value:', value);
};
</script>

<template>
  <tk-input @tk-change="handleChange" />
</template>
```

Inline handler shorthand:

```vue
<template>
  <tk-input @tk-change="e => (name = e.detail)" />
</template>
```

---

## v-model Support

The Vue wrappers support `v-model` on form components. This provides two-way
data binding:

```vue
<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
</script>

<template>
  <tk-input v-model="name" label="Name" placeholder="Enter your name" />
  <p>Hello, {{ name }}!</p>
</template>
```

If `v-model` does not work for a specific component, fall back to the manual
binding pattern with `:value` and `@tk-change`:

```vue
<template>
  <tk-input :value="name" @tk-change="e => (name = e.detail)" label="Name" />
</template>
```

---

## Slots

Use Vue's named slot syntax with `<template #slot-name>` or
`<template v-slot:slot-name>`:

```vue
<template>
  <tk-dialog :open="isOpen" @tk-close="isOpen = false">
    <template #header>Dialog Title</template>
    <template #content>
      <p>This is the dialog body content.</p>
    </template>
    <template #footer>
      <tk-button variant="primary" @tk-click="isOpen = false"
        >Confirm</tk-button
      >
      <tk-button variant="neutral" @tk-click="isOpen = false">Cancel</tk-button>
    </template>
  </tk-dialog>
</template>
```

Default slot content needs no template wrapper:

```vue
<template>
  <tk-button variant="primary">
    Click Me
    <!-- default slot -->
  </tk-button>
</template>
```

---

## Form Integration

### Using ref and reactive

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue';

const form = reactive({
  name: '',
  email: '',
  role: '',
});

const handleSubmit = () => {
  console.log('Form data:', form);
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <tk-input v-model="form.name" label="Name" placeholder="Enter your name" />

    <tk-input
      v-model="form.email"
      label="Email"
      placeholder="Enter your email"
    />

    <tk-select
      :value="form.role"
      @tk-change="e => (form.role = e.detail)"
      label="Role"
      :options="[
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
        { label: 'Guest', value: 'guest' },
      ]"
    />

    <tk-button variant="primary" type="filled" @tk-click="handleSubmit">
      Submit
    </tk-button>
  </form>
</template>
```

---

## Common Examples

### Button

```vue
<script setup lang="ts">
const handleClick = (e: CustomEvent) => {
  console.log('Button clicked');
};
</script>

<template>
  <tk-button variant="primary" type="filled" @tk-click="handleClick">
    Primary Action
  </tk-button>

  <tk-button variant="secondary" type="outlined" size="small">
    Secondary
  </tk-button>

  <tk-button variant="danger" type="filled" disabled> Disabled </tk-button>
</template>
```

### Input with v-model

```vue
<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const email = ref('');
</script>

<template>
  <tk-input v-model="name" label="Name" placeholder="Enter your name" />

  <tk-input v-model="email" label="Email" placeholder="Enter your email" />

  <p>Hello, {{ name }}! Your email is {{ email }}.</p>
</template>
```

### Select

```vue
<script setup lang="ts">
import { ref } from 'vue';

const selected = ref('');

const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];
</script>

<template>
  <tk-select
    label="Choose an option"
    :options="options"
    :value="selected"
    @tk-change="e => (selected = e.detail)"
  />

  <p>Selected: {{ selected }}</p>
</template>
```

### Table

```vue
<script setup lang="ts">
import { ref } from 'vue';

const columns = ref([
  { field: 'id', header: 'ID' },
  { field: 'name', header: 'Name' },
  { field: 'status', header: 'Status' },
]);

const data = ref([
  { id: 1, name: 'Task A', status: 'Active' },
  { id: 2, name: 'Task B', status: 'Completed' },
  { id: 3, name: 'Task C', status: 'Pending' },
]);

const handleRowSelect = (e: CustomEvent) => {
  console.log('Selected row:', e.detail);
};
</script>

<template>
  <tk-table :columns="columns" :data="data" @tk-select="handleRowSelect" />
</template>
```

### Dialog

```vue
<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);
</script>

<template>
  <tk-button variant="primary" @tk-click="isOpen = true">
    Open Dialog
  </tk-button>

  <tk-dialog :open="isOpen" @tk-close="isOpen = false">
    <template #header>Confirm Action</template>
    <template #content>
      <p>Are you sure you want to proceed?</p>
    </template>
    <template #footer>
      <tk-button variant="primary" @tk-click="isOpen = false">
        Confirm
      </tk-button>
      <tk-button variant="neutral" @tk-click="isOpen = false">
        Cancel
      </tk-button>
    </template>
  </tk-dialog>
</template>
```

---

## Gotchas and Common Mistakes

### 1. Must register ComponentLibrary plugin

Without calling `app.use(ComponentLibrary)`, globally used components will not
be recognized. Either register the plugin or import components individually in
each file.

```ts
// main.ts - Do not forget this line
app.use(ComponentLibrary);
```

### 2. Use `:prop` for non-string values

Without `v-bind` (`:` shorthand), all attribute values are treated as strings:

```vue
<!-- WRONG - passes the string "true" -->
<tk-input disabled="true" />

<!-- CORRECT - passes the boolean true -->
<tk-input :disabled="true" />

<!-- WRONG - passes the string "[{...}]" -->
<tk-table columns="[{ field: 'name' }]" />

<!-- CORRECT - passes the actual array -->
<tk-table :columns="columns" />
```

### 3. v-model may not work on all components

Not every Takeoff UI component supports `v-model` through the Vue wrapper. If
`v-model` does not work for a specific component, use the explicit binding
pattern:

```vue
<!-- Fallback when v-model is not supported -->
<tk-select
  :value="selectedValue"
  @tk-change="e => (selectedValue = e.detail)"
/>
```

### 4. Always access `event.detail` for event data

Takeoff UI events are `CustomEvent` instances. Do **not** use
`event.target.value`:

```vue
<!-- WRONG -->
<tk-input @tk-change="e => (name = e.target.value)" />

<!-- CORRECT -->
<tk-input @tk-change="e => (name = e.detail)" />
```

### 5. CSS import is required

Without the core CSS import, components will render but appear unstyled:

```ts
// This MUST be in your main.ts
import '@takeoff-ui/core/dist/core/core.css';
```

### 6. Shadow DOM encapsulation

Components use Shadow DOM. You cannot target internal elements with global CSS
or scoped styles. Use the component's props (e.g., `variant`, `size`, `type`)
and CSS custom properties to customize appearance.
